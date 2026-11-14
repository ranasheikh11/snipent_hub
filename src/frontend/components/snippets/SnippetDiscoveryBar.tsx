"use client";

import React from "react";
import { DiscoveryMode } from "@/frontend/types/discovery";
import { Flame, Star, Package, Trophy, Square, X } from "lucide-react";

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
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar w-full sm:w-auto">
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

      {searchQuery && (
        <div className="flex items-center gap-2 bg-[#F5F3FF] border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000] shrink-0">
          <span className="text-xs font-mono font-bold text-black">
            Search: <span className="text-[#7C3AED] uppercase font-black">&quot;{searchQuery}&quot;</span>
          </span>
          <button
            onClick={() => onSearchChange("")}
            className="p-0.5 bg-black text-white hover:bg-neutral-800 cursor-pointer"
            title="Clear search filter"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
