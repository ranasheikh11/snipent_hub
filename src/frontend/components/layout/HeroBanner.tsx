"use client";

import React from "react";
import { Search, Sparkles } from "lucide-react";

interface HeroBannerProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSubmitSearch: (e: React.FormEvent) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery, onSearchChange, onSubmitSearch,
}) => {
  return (
    <div className="w-full bg-[#F5F3FF] border-b-3 border-black py-8 sm:py-12 px-3 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#7C3AED] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5" /> Save • Organize • Reuse • Share
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white text-black text-[10px] sm:text-[11px] font-mono font-bold uppercase px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Developer Vault
            </span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-black uppercase leading-none pt-1">
            EXPLORE
            <span className="block mt-1 sm:mt-2">
              <span className="inline-block bg-white text-black px-2.5 py-1 border-3 border-black shadow-[5px_5px_0px_#7C3AED]">
                SNIPPETS
              </span>
            </span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-neutral-600 max-w-xl pt-1">
            Curated battle-tested code snippets, Flutter widgets, APIs, and YouTube developer courses.
          </p>
        </div>

        <form onSubmit={onSubmitSearch} className="w-full md:w-96 flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="SEARCH FLUTTER, WEB, API..."
            className="flex-1 min-w-0 bg-white text-black font-mono text-xs uppercase px-3.5 sm:px-4 py-3 border-2 border-r-0 border-black focus:outline-none placeholder:text-neutral-500 shadow-[3px_3px_0px_#000]"
          />
          <button
            type="submit"
            aria-label="Search snippets"
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-3 border-2 border-black shadow-[3px_3px_0px_#000] neo-press flex items-center justify-center cursor-pointer shrink-0"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
};
