import { supabase } from './supabaseClient';
import { notFound } from 'next/navigation';

export type FacilityDetails = {
  id: string;
  name: string;
  address: string | null;
  city: string;
  state: string;
  total_beds: number | null;
  owner_name: string | null;
  score: number;
  grade: string;
  citations: Violation[];
};

export type Violation = {
  id: string;
  date: string; // YYYY-MM-DD
  tagCode: string;
  severity: string;
  description: string;
};

export async function getFacilityById(id: string): Promise<FacilityDetails | null> {
  // 1. Fetch Facility
  // We use "maybeSingle" because the ID might be invalid
  const { data: facility, error: facilityError } = await supabase
    .from('facilities')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (facilityError) {
    console.error('Error fetching facility:', facilityError);
    return null;
  }

  if (!facility) {
    return null;
  }

  // 2. Fetch Violations
  const { data: violations, error: violationError } = await supabase
    .from('violations')
    .select('*')
    .eq('facility_id', id)
    .order('citation_date', { ascending: false });

  if (violationError) {
    console.error('Error fetching violations:', violationError);
  }

  // 3. Fetch Score (or default to 0/Pending)
  const { data: scoreData } = await supabase
    .from('safety_scores')
    .select('*')
    .eq('facility_id', id)
    .order('created_at', { ascending: false }) // Get latest
    .limit(1)
    .maybeSingle();

  // 4. Combine Data
  return {
    id: facility.id,
    name: facility.name,
    address: facility.address,
    city: facility.city,
    state: facility.state,
    total_beds: facility.total_beds,
    owner_name: facility.owner_name,
    score: scoreData?.score_value ?? 0,
    grade: scoreData?.grade_letter ?? 'N/A',
    citations: (violations || []).map((v: any) => ({
      id: v.id,
      date: v.citation_date,
      tagCode: v.citation_code,
      severity: v.severity_scope || 'Unknown',
      description: v.description || 'No description available.',
    })),
  };
}

export async function searchFacilities(query: string): Promise<FacilityDetails[]> {
  if (!query) return [];

  // MVP Search: ILIKE on name or city
  const { data: facilities, error } = await supabase
    .from('facilities')
    .select('*')
    .or(`name.ilike.%${query}%,city.ilike.%${query}%`)
    .limit(20);

  if (error) {
    console.error("Search error:", error);
    return [];
  }

  if (!facilities) return [];

  // For the search results, we just need basic info + score.
  // We'll fetch scores in a separate efficient query or join if we had a view.
  // For MVP, let's just fetch scores for these facilities.
  const facilityIds = facilities.map(f => f.id);
  
  const { data: scores } = await supabase
    .from('safety_scores')
    .select('facility_id, score_value, grade_letter')
    .in('facility_id', facilityIds)
    .order('created_at', { ascending: false });

  // Map scores to facilities
  const results = facilities.map(f => {
    const scoreRec = scores?.find(s => s.facility_id === f.id);
    return {
      id: f.id,
      name: f.name,
      address: f.address,
      city: f.city,
      state: f.state,
      total_beds: f.total_beds,
      owner_name: f.owner_name,
      score: scoreRec?.score_value ?? 0, // Default to 0 if no score yet
      grade: scoreRec?.grade_letter ?? 'N/A',
      citations: [] // Don't need full citations for list view
    };
  });

  return results;
}
