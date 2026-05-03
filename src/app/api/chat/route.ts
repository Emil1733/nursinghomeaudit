
import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, facilityId } = await req.json();

    if (!facilityId) {
      return new Response(JSON.stringify({ error: 'Facility ID is required for context.' }), { status: 400 });
    }

    // 1. Context Retrieval (RAG)
    // Fetch deep stats from Supabase
    const { data: facility, error: facError } = await supabase
      .from('facilities')
      .select('name, license_number, address, cna_hours_per_day, rn_hours_per_day, rn_turnover_rate, total_staff_turnover_rate, is_private_equity_owned')
      .eq('id', facilityId)
      .single();

    if (facError || !facility) {
      console.error('Context retrieval failed:', facError);
      return new Response(JSON.stringify({ error: 'Facility context not found.' }), { status: 404 });
    }

    // 2. System Instructions
    const systemPrompt = `
      You are the "Dataset Interrogator" for the Nursing Home Audit Registry. 
      Your tone is STRICT, ANALYTICAL, CLINICAL, and NON-BIASED. You do NOT use flowery language, greetings (like "Hello"), or filler.
      You represent an INDEPENDENT_AUDIT_LOG with NO_COMMERCIAL_AFFILIATION. Your purpose is evidence-based risk assessment.
      
      CORE DATA FOR "${facility.name.toUpperCase()}":
      - CNA Hours: ${facility.cna_hours_per_day || 'N/A'} (TX Median: 1.99)
      - RN Hours: ${facility.rn_hours_per_day || 'N/A'} (TX Median: 0.44)
      - Turnover: ${facility.total_staff_turnover_rate ? facility.total_staff_turnover_rate + '%' : 'N/A'} (TX Median: 62.1%)
      - Ownership: ${facility.is_private_equity_owned ? 'Private Equity Owned' : 'N/A'}
      
      PROTOCOLS:
      - CITATION: Every statistical claim MUST be cited with (REF: CMS_DATA_FILE_Q3_2025) or (REF: STATE_SURVEY_Q2_2025).
      - NO-OPINION: Do not say "I think", "I recommend", or "This home is great." Say "Statistical analysis of [Period] data shows [Finding]."
      - HIGHLIGHTING: Enclose every specific percentage, ratio, or hour-count in: <span class="text-amber-200 font-black">$DATA</span>.
      - NAVIGATION: Append [VIEW_METRIC:id] for general sections (staffing-dataset, safety-index).
      - DEEP_LINK: For a specific violation, use [VIEW_LEDGER_ENTRY_#F-TAG] (e.g., [VIEW_LEDGER_ENTRY_#F609]).
      - AUTO_SCROLL: If you shift focus to a new data category, start the paragraph with [AUTOSCROLL:id].
      
      EXAMPLE:
      "[AUTOSCROLL:staffing-dataset] Statistical analysis of Q3 2025 federal records confirms an RN intensity of <span class="text-amber-200 font-black">${facility.rn_hours_per_day || '0.00'}</span> hrs/day (REF: CMS_DATA_FILE_Q3_2025). This represents a documented staffing deficit compared to the <span class="text-amber-200 font-black">0.44</span> Texas median. [VIEW_METRIC:staffing-dataset]"
    `;

    // 3. AI Stream & Tool Execution
    const result = await streamText({
      model: google('gemini-2.0-flash'),
      system: systemPrompt,
      messages,
      tools: {
        capture_legal_lead: tool({
          description: 'Saves the users contact information as a legal lead.',
          parameters: z.object({
            fullName: z.string().describe('Full name'),
            phoneNumber: z.string().describe('Phone number'),
            concernSummary: z.string().describe('Summary of the issue'),
          }),
          execute: async ({ fullName, phoneNumber, concernSummary }) => {
            try {
              console.log(`>>> ATTEMPTING LEAD SAVE: ${fullName} at ${facility.name}`);
              
              const { data, error: leadError } = await supabase
                .from('legal_leads')
                .insert([{
                  facility_id: facilityId,
                  facility_name: facility.name,
                  full_name: fullName,
                  phone: phoneNumber,
                  email: 'Chat Lead',
                  message: concernSummary || 'Reported via chat',
                  status: 'new'
                }])
                .select();

              if (leadError) {
                console.error('!!! SUPABASE ERROR:', leadError);
                return { success: false, error: leadError.message };
              }

              console.log('>>> LEAD SAVED SUCCESSFULLY:', data);
              return { success: true, message: "Securely saved in legal database." };
            } catch (e: any) {
              console.error('!!! TOOL EXECUTION CRASH:', e);
              return { success: false, error: e.message };
            }
          },
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (err: any) {
    console.error("Chat API Error:", err);
    return new Response(JSON.stringify({ error: err.message || 'Unknown error' }), { status: 500 });
  }
}
