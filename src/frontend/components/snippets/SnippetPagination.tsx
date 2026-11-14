"use client";

import React from "react";

interface SnippetPaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const SnippetPagination: React.FC<SnippetPaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  if (totalItems === 0) return null;

  return (
    <div className="border-t-2 border-black/30 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="font-mono text-xs text-neutral-700 font-bold">
        Showing {startItem} to {endItem} of {totalItems} Snippets
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] transition-colors ${
            currentPage <= 1
              ? "bg-neutral-100 text-neutral-400 border-neutral-300 shadow-none cursor-not-allowed"
              : "bg-white text-black hover:bg-neutral-100 cursor-pointer neo-press"
          }`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 flex items-center justify-center text-xs font-black border-2 border-black transition-colors cursor-pointer ${
                isActive
                  ? "bg-black text-white shadow-[2px_2px_0px_#000]"
                  : "bg-white text-black hover:bg-neutral-100 shadow-[2px_2px_0px_#000] neo-press"
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] transition-colors ${
            currentPage >= totalPages
              ? "bg-neutral-100 text-neutral-400 border-neutral-300 shadow-none cursor-not-allowed"
              : "bg-white text-black hover:bg-neutral-100 cursor-pointer neo-press"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

