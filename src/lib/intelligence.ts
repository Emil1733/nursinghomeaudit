
import intelligenceData from './intelligence.json';

export interface AISummary {
  bullets: string[];
  tone: 'positive' | 'neutral' | 'warning';
}

export interface FacilityIntel {
  summary: AISummary;
  safety_score: number;
  violation_count: number;
  city: string;
}

export interface Benchmark {
  avg_violations: number;
  facility_count: number;
}

export interface IntelligenceStore {
  benchmarks: Record<string, Benchmark>;
  facilities: Record<string, FacilityIntel>;
}

const store = intelligenceData as IntelligenceStore;

export function getFacilityIntel(id: string): FacilityIntel | null {
  return store.facilities[id] || null;
}

export function getCityBenchmark(city: string): Benchmark | null {
  // Normalize city name to match JSON keys (usually uppercase from scraper)
  const normalizedCity = city.toUpperCase();
  return store.benchmarks[normalizedCity] || null;
}
