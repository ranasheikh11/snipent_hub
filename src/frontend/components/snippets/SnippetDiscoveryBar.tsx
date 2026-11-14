"use client";

import React from "react";
import { DiscoveryMode } from "@/frontend/types/discovery";
import { Flame, Star, Package, Trophy, Search, X, Square } from "lucide-react";

interface SnippetDiscoveryBarProps {
  activeMode: DiscoveryMode;
  onChangeMode: (mode: DiscoveryMode) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const TABS: { id: DiscoveryMode; label: string; icon: React.ReactNode }[] = [
  { id: "ALL", label: "All Snippets", icon: <Square className="w-3.5 h-3.5 fill-current" /> },
  { id: "TRENDING", label: "Trending", icon: <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> },
  { id: "POPULAR", label: "Most Popular", icon: <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> },
  { id: "PACKAGES", label: "Packages", icon: <Package className="w-3.5 h-3.5 text-amber-700" /> },
  { id: "LEADERBOARD", label: "Leaderboard", icon: <Trophy className="w-3.5 h-3.5 text-amber-500" /> },
];

export const SnippetDiscoveryBar: React.FC<SnippetDiscoveryBarProps> = ({
  activeMode,
  onChangeMode,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
        {TABS.map((tab) => {
          const isActive = activeMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeMode(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-black uppercase tracking-wider border-2 border-black whitespace-nowrap cursor-pointer transition-all ${
                isActive
                  ? "bg-black text-white shadow-[2px_2px_0px_#000]"
                  : "bg-white text-black hover:bg-neutral-50 shadow-[2px_2px_0px_#000]"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center">
        <div className="relative flex-1 sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="SEARCH FLUTTER, WEB, API..."
            className="w-full bg-white text-black font-mono text-[11px] font-bold uppercase px-3 py-2 border-2 border-r-0 border-black focus:outline-none placeholder:text-neutral-400 shadow-[2px_2px_0px_#000]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black cursor-pointer text-xs font-mono font-bold"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <button
          type="button"
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white p-2 border-2 border-black shadow-[2px_2px_0px_#000] neo-press cursor-pointer flex items-center justify-center shrink-0"
        >
          <Search className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};

