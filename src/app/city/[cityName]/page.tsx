import { notFound } from 'next/navigation';
import { getAllCities, getCityData } from '@/lib/city-utils';
import CityHero from '@/components/city/CityHero';
import FacilityRankingList from '@/components/city/FacilityRankingList';
import { Metadata } from 'next';
import { FacilityCard } from '@/components/facility/FacilityCard';

export const revalidate = 3600; // Revalidate every hour (or set to 0 for dev)

interface PageProps {
  params: Promise<{
    cityName: string;
  }>;
}

// 1. Generate Static Params for all 550+ cities
export async function generateStaticParams() {
  const cities = await getAllCities();
  return cities.map((city) => ({
    cityName: encodeURIComponent(city.toLowerCase()),
  }));
}

// 2. Dynamic Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cityName: rawCityName } = await params;
  const cityName = decodeURIComponent(rawCityName);
  const cityData = await getCityData(cityName);

  if (!cityData) return {};

  return {
    title: `Best & Worst Nursing Homes in ${cityData.name}, TX | 2026 Audit`,
    description: `User-friendly safety guide for ${cityData.total_facilities} nursing homes in ${cityData.name}. See who passed, who failed, and which facilities have the most safety violations.`,
    alternates: {
        canonical: `https://eldershield.ai/city/${rawCityName}`
    }
  };
}

export default async function CityPage({ params }: PageProps) {
  const { cityName: rawCityName } = await params;
  const cityName = decodeURIComponent(rawCityName);
  
  const cityData = await getCityData(cityName);

  if (!cityData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 relative selection:bg-blue-100">
      
      {/* City Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <CityHero cityData={cityData} />
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        
        {/* Rankings Section */}
        <FacilityRankingList facilities={cityData.facilities} />

        {/* Full Directory Section */}
        <div className="mt-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">
                All {cityData.total_facilities} Facilities in {cityData.name}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cityData.facilities.map((fac, idx) => (
                     <FacilityCard
                        key={fac.id}
                        id={fac.id}
                        name={fac.name}
                        city={fac.city}
                        state={fac.state}
                        violationCount={fac.intelligence.violation_count}
                        total_beds={fac.total_beds}
                        index={idx}
                  />
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}
