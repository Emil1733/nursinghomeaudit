'use client';

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function FacilitySearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    // In a real app, we would search via Supabase or a search API.
    // For MVP V1, we simply redirect to a search results page (to be built)
    // or specifically navigation if we knew the ID. 
    // For now, let's implement a "Search Results" redirect.
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative flex items-center shadow-lg rounded-full overflow-hidden border border-muted-foreground/20 bg-white transition-all hover:shadow-xl focus-within:ring-2 focus-within:ring-secondary/50">
        <div className="pl-6 text-muted-foreground">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Enter facility name, city, or zip code..."
          className="w-full py-4 px-4 text-lg outline-none text-foreground placeholder:text-muted-foreground/50 bg-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isSearching}
        />
        <button 
            type="submit" 
            disabled={isSearching}
            className="bg-primary text-primary-foreground font-bold py-4 px-8 hover:bg-primary/90 transition-colors disabled:opacity-70"
        >
            {isSearching ? "Searching..." : "Search Records"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
           Search <strong>1,200+</strong> Texas facilities. Data updated daily from HHS.
        </p>
      </div>
    </div>
  );
}
