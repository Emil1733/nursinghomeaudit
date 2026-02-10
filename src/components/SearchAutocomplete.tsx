
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
    <div className="relative max-w-lg mx-auto mb-16 group" ref={dropdownRef}>
      <div className="absolute inset-0 bg-rose-200 blur-xl opacity-30 group-hover:opacity-50 transition-opacity rounded-full"></div>
      
      <div className="relative flex items-center bg-white shadow-xl shadow-slate-200/50 rounded-full border border-slate-200 pl-4 pr-2 py-2">
        <div className="ml-2">
          {isSearching ? (
            <Loader2 className="text-rose-500 animate-spin" size={20} />
          ) : (
            <Search className="text-slate-500" size={20} />
          )}
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Search facility name or city..." 
          aria-label="Search facilities"
          className="flex-1 bg-transparent border-none outline-none ring-0 px-4 text-slate-700 placeholder:text-slate-500"
        />
        <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-slate-800 transition-colors">
          Audit
        </button>
      </div>

      {/* Results Dropdown */}
      {isOpen && (matches.length > 0 || !isSearching) && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            {matches.length > 0 ? (
              matches.map((facility) => (
                <Link
                  key={facility.id}
                  href={`/facility/${facility.id}`}
                  className="flex items-center justify-between p-4 hover:bg-rose-50 rounded-2xl transition-colors group/item"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-slate-100 rounded-lg group-hover/item:bg-white transition-colors">
                      <MapPin size={16} className="text-slate-500" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 group-hover/item:text-rose-600 transition-colors capitalize">
                        {facility.name.toLowerCase()}
                      </div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                        {facility.city}, TX • #{facility.license_number}
                      </div>
                    </div>
                  </div>
                  <MoveRight size={18} className="text-slate-200 group-hover/item:text-rose-400 group-hover/item:translate-x-1 transition-all" />
                </Link>
              ))
            ) : query.length >= 2 && !isSearching ? (
              <div className="p-8 text-center text-slate-500 text-sm italic">
                No facilities found matching "{query}"
              </div>
            ) : null}
          </div>
          
          {matches.length > 0 && (
            <div className="bg-slate-50/50 p-3 text-center border-t border-slate-100">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                 Showing top results for "{query}"
               </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
