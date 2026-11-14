"use client";

import React from "react";
import { Search } from "lucide-react";

interface HeroBannerProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSubmitSearch: (e: React.FormEvent) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  onSearchChange,
  onSubmitSearch,
}) => {
  return (
    <div className="w-full bg-[#F5F3FF] border-b-2 border-black py-6 sm:py-10 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6">
        <div>
          <div className="inline-block bg-[#7C3AED] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 mb-2.5 sm:mb-3 border-2 border-black shadow-[2px_2px_0px_#000]">
            Save • Organize • Reuse • Share
          </div>

          <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-black uppercase leading-none">
            EXPLORE
            <span className="block mt-1">
              <span className="inline-block bg-white text-black px-2 py-0.5 border-3 border-black shadow-[4px_4px_0px_#7C3AED]">
                SNIPPETS
              </span>
            </span>
          </h1>
        </div>

        <form onSubmit={onSubmitSearch} className="w-full md:w-96 flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="SEARCH FLUTTER, WEB, API..."
            className="flex-1 min-w-0 bg-white text-black font-mono text-xs uppercase px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-r-0 border-black focus:outline-none placeholder:text-neutral-500 shadow-[3px_3px_0px_#000]"
          />
          <button
            type="submit"
            aria-label="Search snippets"
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-black shadow-[3px_3px_0px_#000] neo-press flex items-center justify-center cursor-pointer shrink-0"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
};
