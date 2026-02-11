import { supabase } from "./supabase";
import intelligenceRaw from "./intelligence.json";

// Type definitions
export interface FacilityIntelligence {
  summary: {
    bullets: string[];
    tone: "positive" | "neutral" | "warning";
  };
  safety_score: number;
  violation_count: number;
  city: string; // From JSON (might be UPPERCASE)
}

export interface Facility {
  id: string;
  name: string;
  city: string; // From DB (might be UPPERCASE)
  state: string;
  total_beds?: number;
}

export interface CityStats {
  name: string;
  slug: string;
  total_facilities: number;
  avg_safety_score: number;
  avg_violations: number;
  facilities: EnhancedFacility[];
}

export interface EnhancedFacility extends Facility {
  intelligence: FacilityIntelligence;
}

const intelligence = intelligenceRaw as unknown as {
  facilities: Record<string, FacilityIntelligence>;
};

// Helper: Title Case (e.g., "SAN ANTONIO" -> "San Antonio")
export function toTitleCase(str: string) {
  if (!str) return "";
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}

// Fetch all raw facilities from Supabase
async function fetchAllFacilities(): Promise<Facility[]> {
  const { data, error } = await supabase
    .from("facilities")
    .select("id, name, city, state, total_beds")
    .eq("state", "TX"); // Ensure only TX for now

  if (error) {
    console.error("Error fetching facilities:", error);
    return [];
  }
  return data || [];
}

// Core Function: Aggregate Data by City
export async function getCityHubData(): Promise<Record<string, CityStats>> {
  const facilities = await fetchAllFacilities();
  const cityMap: Record<string, EnhancedFacility[]> = {};

  // 1. Merge DB data with Intelligence JSON & Group by City
  for (const fac of facilities) {
    const intel = intelligence.facilities[fac.id];

    // Skip if we don't have intelligence (though we should have 100%)
    if (!intel) continue;

    const normalizedCity = toTitleCase(fac.city || intel.city || "Unknown");

    if (!cityMap[normalizedCity]) {
      cityMap[normalizedCity] = [];
    }

    cityMap[normalizedCity].push({
      ...fac,
      intelligence: intel,
    });
  }

  // 2. Calculate Stats for each City
  const cityHubs: Record<string, CityStats> = {};

  for (const [city, facs] of Object.entries(cityMap)) {
    const total = facs.length;
    const totalScore = facs.reduce(
      (sum, f) => sum + (f.intelligence.safety_score || 0),
      0,
    );
    const totalViolations = facs.reduce(
      (sum, f) => sum + (f.intelligence.violation_count || 0),
      0,
    );

    cityHubs[city] = {
      name: city,
      slug: city.toLowerCase().replace(/\s+/g, '-'), // Hyphenated slug strategy
      total_facilities: total,
      avg_safety_score: Math.round(totalScore / total),
      avg_violations: Math.round((totalViolations / total) * 10) / 10,
      facilities: facs.sort(
        (a, b) =>
          (b.intelligence.safety_score || 0) -
          (a.intelligence.safety_score || 0),
      ), // Default sort: Best first
    };
  }

  return cityHubs;
}

// Get list of all cities for Static Paths
export async function getAllCities(): Promise<string[]> {
  const hubs = await getCityHubData();
  return Object.keys(hubs);
}

// Get specific city data
export async function getCityData(
  cityNameDecoded: string,
): Promise<CityStats | null> {
  const hubs = await getCityHubData();
  // Case-insensitive lookup
  const cityKey = Object.keys(hubs).find(
    (c) => c.toLowerCase().replace(/\s+/g, '-') === cityNameDecoded.toLowerCase().replace(/\s+/g, '-'),
  );
  return cityKey ? hubs[cityKey] : null;
}
