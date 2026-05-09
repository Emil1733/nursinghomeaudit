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

// Special cases for city name normalization
const CITY_OVERRIDES: Record<string, string> = {
  'mcallen': 'McAllen',
  'new braunfels': 'New Braunfels',
  'el paso': 'El Paso',
  'san antonio': 'San Antonio',
  'fort worth': 'Fort Worth',
  'round rock': 'Round Rock',
  'corpus christi': 'Corpus Christi',
  'the woodlands': 'The Woodlands',
  'north richland hills': 'North Richland Hills',
  'mount pleasant': 'Mount Pleasant',
  'college station': 'College Station',
  'sugar land': 'Sugar Land',
  'league city': 'League City',
  'wichita falls': 'Wichita Falls',
  'san marcos': 'San Marcos',
  'san angelo': 'San Angelo',
  'flower mound': 'Flower Mound',
  'texas city': 'Texas City',
  'cedar hill': 'Cedar Hill',
  'la grange': 'La Grange',
  'el campo': 'El Campo',
  'missouri city': 'Missouri City',
  'glen rose': 'Glen Rose',
};

// Helper: Standardized Title Case with Overrides
export function toTitleCase(str: string) {
  if (!str) return "";
  const lower = str.toLowerCase().trim();
  if (CITY_OVERRIDES[lower]) return CITY_OVERRIDES[lower];
  
  return lower.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}

// Fetch all raw facilities from Supabase
async function fetchAllFacilities(): Promise<Facility[]> {
  const { data, error } = await supabase
    .from("facilities")
    .select("id, name, city, state, total_beds")
    .eq("state", "TX")
    .limit(2000); // Explicit limit — Supabase default cap is 1,000, we have 1,177+

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
  // Normalize the incoming slug fully before comparison to handle any
  // case/spacing/encoding mismatch that would cause a silent null return
  const normalizedInput = cityNameDecoded
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/%20/g, '-');
  const cityKey = Object.keys(hubs).find(
    (c) => c.toLowerCase().trim().replace(/\s+/g, '-') === normalizedInput,
  );
  if (!cityKey) {
    console.warn(`[getCityData] No match found for: "${cityNameDecoded}" (normalized: "${normalizedInput}")`);
  }
  return cityKey ? hubs[cityKey] : null;
}
