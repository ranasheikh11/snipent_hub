"use client";

import React from "react";
import { Search, Flame, Clock, MessageSquare, Filter } from "lucide-react";

interface CommunityFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const CATEGORIES = ["ALL", "UI Components", "Authentication", "Payment Gateway", "Backend API", "State Management"];

export const CommunityFilters: React.FC<CommunityFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="w-full space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search code, title, or tags in this space..."
            className="w-full pl-9 pr-4 py-2 bg-white border-2 border-black font-mono text-xs focus:outline-none focus:border-[#7C3AED] shadow-[2px_2px_0px_#000]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold uppercase text-neutral-600 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 bg-white border-2 border-black text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_#000] cursor-pointer focus:outline-none"
          >
            <option value="latest">⚡ Latest Posts</option>
            <option value="popular">⭐ Most Starred</option>
            <option value="discussed">💬 Most Discussed</option>
          </select>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = (cat === "ALL" && !selectedCategory) || selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat === "ALL" ? "" : cat)}
              className={`px-3 py-1 text-[11px] font-mono font-bold uppercase border-2 border-black whitespace-nowrap cursor-pointer transition-all ${
                isSelected
                  ? "bg-black text-white shadow-[2px_2px_0px_#7C3AED]"
                  : "bg-white text-black hover:bg-[#F5F3FF] shadow-[2px_2px_0px_#000]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

