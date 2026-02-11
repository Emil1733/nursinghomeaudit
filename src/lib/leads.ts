
import { supabase } from './supabase';

export interface LegalLead {
  facility_id: string;
  facility_name: string;
  full_name: string;
  phone: string;
  email: string;
  message: string;
  status?: 'new' | 'contacted' | 'qualified' | 'disqualified';
}

/**
 * Saves a legal inquiry lead to the database.
 * This table (legal_leads) needs to be created in the Supabase dashboard.
 */
export async function saveLegalLead(lead: LegalLead) {
  const { data, error } = await supabase
    .from('legal_leads')
    .insert([
      {
        facility_id: lead.facility_id,
        facility_name: lead.facility_name,
        full_name: lead.full_name,
        phone: lead.phone,
        email: lead.email,
        message: lead.message,
        status: 'new'
      },
    ])
    .select();

  if (error) {
    console.error('Error saving lead:', error);
    throw error;
  }

  return data;
}
