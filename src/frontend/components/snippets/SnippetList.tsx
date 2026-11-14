"use client";

import React, { useState, useEffect } from "react";
import { SnippetItem, SortOption } from "@/frontend/types/snippet";
import { SnippetCard } from "./SnippetCard";
import { SnippetPagination } from "./SnippetPagination";
import { Sparkles } from "lucide-react";

interface SnippetListProps {
  snippets: SnippetItem[];
  isLoading: boolean;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  onOpenDetails: (snippet: SnippetItem) => void;
  onResetFilters: () => void;
}

const PAGE_SIZE = 6;

export const SnippetList: React.FC<SnippetListProps> = ({
  snippets,
  isLoading,
  sortOption,
  onSortChange,
  onOpenDetails,
  onResetFilters,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [snippets.length, sortOption]);

  const pagedSnippets = snippets.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex-1 w-full">
      <div className="border-b-2 border-black pb-3 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="font-black text-xl uppercase tracking-wider text-black">RESULTS</h2>
          <span className="bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] px-2.5 py-0.5 rounded-full text-xs font-mono font-bold">
            ({snippets.length} available)
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-neutral-600">
          <span>Sort:</span>
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="bg-white border-2 border-black px-2.5 py-1 text-xs font-black uppercase shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <option value="STARS">Most Starred</option>
            <option value="LATEST">Latest</option>
            <option value="COPIES">Most Copied</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center font-mono font-bold text-neutral-600 border-2 border-black bg-white shadow-[3px_3px_0px_#000]">
          Loading snippets from vault...
        </div>
      ) : snippets.length === 0 ? (
        <div className="p-12 text-center border-2 border-black bg-white shadow-[4px_4px_0px_#000] space-y-3">
          <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="font-black text-lg uppercase">No snippets found</h3>
          <p className="text-xs font-mono text-neutral-600">
            Try clearing search queries or selecting another topic filter.
          </p>
          <button
            onClick={onResetFilters}
            className="px-4 py-2 bg-black text-white font-black text-xs uppercase border-2 border-black neo-press cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pagedSnippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>

          <SnippetPagination
            currentPage={currentPage}
            totalItems={snippets.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};
