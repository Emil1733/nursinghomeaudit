
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export interface FacilityDetails {
  id: string;
  name: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
  address: string;
  cms_region: string;
  provider_type: string;
  ownership_type: string;
  number_of_certified_beds: number;
  average_number_of_residents_per_day: number;
  provider_resides_in_hospital: boolean;
  date_first_approved_to_provide_medicare_and_medicaid: string;
  continuing_care_retirement_community: boolean;
  special_focus_status: string;
  abuse_icon: boolean;
  most_recent_health_inspection_more_than_2_years_ago: boolean;
  provider_changed_ownership_in_last_12_months: boolean;
  with_a_resident_and_family_council: boolean;
  automatic_sprinkler_systems_in_all_required_areas: boolean;
  overall_rating: string;
  health_inspection_rating: string;
  qm_rating: string;
  staffing_rating: string;
  rn_staffing_rating: string;
  fine_amount: number;
  total_number_of_penalties: number;
  location: any;
  processing_date: string;
  adjusted_total_score: number;
  total_beds?: number;
  violations?: any[];
}

export async function getFacilityById(id: string) {
  const { data: facility, error } = await supabase
    .from("facilities")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !facility) {
    console.error("Error fetching facility:", error);
    return null;
  }

  const { data: violations } = await supabase
    .from("violations")
    .select("*")
    .eq("facility_id", id)
    .order("citation_date", { ascending: false });

  return {
    ...facility,
    violations: violations || [],
  };
}
