"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CommunityPaginationProps {
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPageChange: (page: number) => void;
}

export const CommunityPagination: React.FC<CommunityPaginationProps> = ({
  currentPage,
  totalPages,
  hasPrev,
  hasNext,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 pt-8 pb-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className="flex items-center gap-1 px-4 py-2 bg-white text-black text-xs font-mono font-bold uppercase border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Prev
      </button>

      <div className="px-4 py-2 bg-black text-white text-xs font-mono font-black uppercase border-2 border-black shadow-[3px_3px_0px_#7C3AED]">
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="flex items-center gap-1 px-4 py-2 bg-white text-black text-xs font-mono font-bold uppercase border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        Next <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

