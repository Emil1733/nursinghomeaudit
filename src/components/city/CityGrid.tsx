
"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { CityStats } from '@/lib/city-utils';

interface CityGridProps {
  initialCities: CityStats[];
}

export function CityGrid({ initialCities }: CityGridProps) {
  const [filter, setFilter] = useState("");

  const filteredCities = useMemo(() => {
    if (!filter.trim()) return initialCities;
    const lowerFilter = filter.toLowerCase().trim();
    return initialCities.filter(city => 
      city.name.toLowerCase().includes(lowerFilter)
    );
  }, [filter, initialCities]);

  return (
    <div className="space-y-12">
      {/* City Filter Input */}
      <div className="relative max-w-xl mx-auto mb-20 group">
        <div className="flex items-center gap-4 border-b-2 border-slate-900 pb-4 focus-within:border-heritage-blue transition-colors">
          <Search size={20} className="text-slate-400 group-focus-within:text-heritage-blue transition-colors" />
          <input 
            type="text"
            placeholder="FILTER BY CITY NAME (E.G. HOUSTON)..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-grow bg-transparent outline-none border-none mono-data text-sm font-black uppercase tracking-widest text-ink placeholder:text-slate-200"
          />
          {filter && (
            <button 
              onClick={() => setFilter("")}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={16} className="text-slate-400" />
            </button>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="mono-data text-[9px] font-black text-slate-300 uppercase tracking-widest">
            {filteredCities.length} Jurisdictions Found
          </span>
          {filter && (
            <span className="mono-data text-[9px] font-black text-heritage-blue uppercase tracking-widest animate-pulse">
              Active Filter Applied
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredCities.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 animate-in fade-in duration-500">
          {filteredCities.map((city) => (
            <Link 
              key={city.slug} 
              href={`/city/${city.slug}`}
              className="group block border-b border-slate-100 pb-8 hover:border-slate-900 transition-all hover:translate-x-1"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="serif-heading text-2xl font-black text-ink uppercase group-hover:text-heritage-blue transition-colors">
                  {city.name}
                </h3>
                <span className="mono-data text-[10px] font-bold text-slate-400">
                  {city.total_facilities} FACILITIES
                </span>
              </div>
              
              <div className="flex gap-6">
                <div>
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Safety Index</span>
                  <span className={`text-lg font-black mono-data ${city.avg_safety_score < 60 ? 'text-red-600' : city.avg_safety_score < 75 ? 'text-orange-600' : 'text-emerald-600'}`}>
                    {city.avg_safety_score}
                  </span>
                </div>
                <div>
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg. Violations</span>
                  <span className="text-lg font-black mono-data text-ink">
                    {city.avg_violations}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-slate-50 border-2 border-dashed border-slate-200">
          <p className="mono-data text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Zero matching jurisdictions in our registry</p>
          <button 
            onClick={() => setFilter("")}
            className="text-[10px] font-black uppercase tracking-widest text-heritage-blue hover:underline"
          >
            [ Clear Search ]
          </button>
        </div>
      )}
    </div>
  );
}
