import { notFound, redirect } from 'next/navigation';
import { getAllCities, getCityData } from '@/lib/city-utils';
import CityHero from '@/components/city/CityHero';
import FacilityRankingList from '@/components/city/FacilityRankingList';
import { Metadata } from 'next';
import { FacilityCard } from '@/components/facility/FacilityCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Link from 'next/link';

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
    cityName: city.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// 2. Dynamic Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cityName: rawCityName } = await params;
  const cityName = decodeURIComponent(rawCityName);
  const cityData = await getCityData(cityName);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nursinghomeaudit.com';

  if (!cityData) return {};

  const score = cityData.avg_safety_score;
  const isSafe = score >= 75;

  const description = isSafe 
    ? `${cityData.name} nursing homes have a Safe Rating (${score}/100). Compare ${cityData.total_facilities} top-rated facilities, view inspection reports, and find the best care near you.`
    : `Warning: ${cityData.name} nursing homes average a Critical Score (${score}/100). Review violations for all ${cityData.total_facilities} facilities before making a decision.`;

  return {
    title: `Best & Worst Nursing Homes in ${cityData.name}, TX | 2026 Audit`,
    description: description,
    alternates: {
        canonical: `${baseUrl}/city/${rawCityName.toLowerCase().replace(/\s+/g, '-')}`
    }
  };
}

export default async function CityPage({ params }: PageProps) {
  const { cityName: rawCityName } = await params;
  const decodedName = decodeURIComponent(rawCityName);
  
  // SEO CLEANUP: Enforce hyphenated, lowercase URLs
  const cleanSlug = decodedName.toLowerCase().replace(/\s+/g, '-');
  const currentSlug = rawCityName;

  if (currentSlug !== cleanSlug) {
     redirect(`/city/${cleanSlug}`);
  }
  
  const cityData = await getCityData(cleanSlug);

  if (!cityData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 relative selection:bg-blue-100">
      
      {/* City Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumbs 
            items={[
                { label: 'Directory', href: '/directory' },
                { label: cityData.name, href: `/city/${cityData.slug}` }
            ]} 
        />
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

        {/* Horizontal Linking Footer */}
        <div className="mt-32 pt-16 border-t border-slate-200">
           <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8 text-center">
             Compare With Other Texas Cities
           </h3>
           
           <div className="grid md:grid-cols-2 gap-12">
              {/* Major Hubs */}
              <div>
                 <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    Major Metros
                 </h4>
                 <div className="flex flex-wrap gap-3">
                    {["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth"].map(hub => {
                        if (hub === cityData.name) return null;
                        return (
                            <Link 
                                key={hub} 
                                href={`/city/${hub.toLowerCase().replace(/\s+/g, '-')}`}
                                className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-colors"
                            >
                                {hub}
                            </Link>
                        )
                    })}
                 </div>
              </div>

              {/* Neighbors (Alphabetical Context) */}
              <div>
                 <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Nearby & Related
                 </h4>
                 <div className="flex flex-wrap gap-3">
                    <RelatedCities currentCity={cityData.name} />
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

// Client Component or Server Helper (Done inline for simplicity as Server Component logic)
async function RelatedCities({ currentCity }: { currentCity: string }) {
    const allCities = await getAllCities();
    const sorted = allCities.sort();
    const currentIndex = sorted.indexOf(currentCity);
    
    // Get next 6 cities (looping)
    const neighbors: string[] = [];
    for (let i = 1; i <= 6; i++) {
        const nextIndex = (currentIndex + i) % sorted.length;
        if (sorted[nextIndex] !== currentCity) {
            neighbors.push(sorted[nextIndex]);
        }
    }

    return (
        <>
            {neighbors.map(city => (
                <Link 
                    key={city} 
                    href={`/city/${city.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 transition-colors"
                >
                    {city}
                </Link>
            ))}
        </>
    )
}
