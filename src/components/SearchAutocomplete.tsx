
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, Loader2, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FacilityMatch {
  id: string;
  name: string;
  city: string;
  license_number: string;
}

export function SearchAutocomplete() {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<FacilityMatch[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      if (query.length < 2) {
        setMatches([]);
        setIsOpen(false);
        return;
      }

      setIsSearching(true);
      try {
        const resp = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await resp.json();
        setMatches(data);
        setIsOpen(true);
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(fetchMatches, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="relative max-w-lg mx-auto mb-16 intelligence-grid" ref={dropdownRef}>
      <div className="relative flex items-center bg-white border-2 border-slate-900 px-4 py-3">
        <div className="mr-3">
          {isSearching ? (
            <Loader2 className="text-heritage-blue animate-spin" size={18} />
          ) : (
            <Search className="text-slate-400" size={18} />
          )}
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="ENTER FACILITY NAME OR REGION..." 
          aria-label="Search database"
          className="flex-1 bg-transparent border-none outline-none ring-0 px-2 text-sm font-black mono-data text-ink placeholder:text-slate-300 uppercase tracking-widest"
        />
        <button className="bg-slate-900 text-white px-8 py-3 font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-slate-800">
          Search
        </button>
      </div>

      {/* Results Dropdown */}
      {isOpen && (matches.length > 0 || !isSearching) && (
        <div className="absolute top-full left-0 right-0 mt-px bg-white border-x border-b border-slate-900 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="max-h-[400px] overflow-y-auto">
            {matches.length > 0 ? (
              matches.map((facility) => (
                <Link
                  key={facility.id}
                  href={`/facility/${facility.id}`}
                  className="flex items-center justify-between p-6 border-b border-slate-50 last:border-none hover:bg-slate-50 transition-colors group/item"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-slate-50 border border-slate-100 text-slate-400 group-hover/item:text-heritage-blue transition-colors">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <div className="serif-heading font-black text-ink group-hover/item:text-heritage-blue transition-colors capitalize text-lg leading-tight">
                        {facility.name.toLowerCase()}
                      </div>
                      <div className="mono-data text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">
                        Region: {facility.city}, TX • UID: {facility.license_number}
                      </div>
                    </div>
                  </div>
                  <MoveRight size={16} className="text-slate-200 group-hover/item:text-ink group-hover/item:translate-x-1 transition-all" />
                </Link>
              ))
            ) : query.length >= 2 && !isSearching ? (
              <div className="p-12 text-center text-slate-400 font-black uppercase tracking-widest text-[10px]">
                No matching records found for "{query}"
              </div>
            ) : null}
          </div>
          
          {matches.length > 0 && (
            <div className="bg-slate-900 p-3 text-center">
               <span className="mono-data text-[8px] font-black text-white uppercase tracking-[0.3em]">
                 Data Source: CMS Federal Registry
               </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
