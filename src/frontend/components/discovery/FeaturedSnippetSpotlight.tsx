"use client";

import React, { useState } from "react";
import { SnippetItem } from "@/frontend/types/snippet";
import { Trophy, Copy, Check, ArrowRight, Star, Flame } from "lucide-react";

interface FeaturedSpotlightProps {
  snippet: SnippetItem | null;
  onOpenDetails: (snippet: SnippetItem) => void;
}

export const FeaturedSnippetSpotlight: React.FC<FeaturedSpotlightProps> = ({
  snippet,
  onOpenDetails,
}) => {
  const [copied, setCopied] = useState(false);
  if (!snippet) return null;

  const handleQuickCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const code = snippet.files?.map((f) => f.code).join("\n\n") || "";
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      fetch(`/api/snippets/${snippet.id}/copy`, { method: "POST" }).catch(() => null);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      onClick={() => onOpenDetails(snippet)}
      className="w-full mb-8 bg-gradient-to-r from-amber-200 via-purple-100 to-amber-100 border-3 border-black p-5 sm:p-6 shadow-[6px_6px_0px_#000] cursor-pointer group transition-all hover:translate-x-[-1px] hover:translate-y-[-1px]"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1 bg-amber-400 text-black text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000]">
              <Trophy className="w-3.5 h-3.5" /> Snippet of the Week
            </span>
            <span className="bg-[#7C3AED] text-white text-[10px] font-black uppercase px-2 py-0.5 border border-black">
              {snippet.technology}
            </span>
            <span className="bg-white text-black text-[10px] font-bold uppercase px-2 py-0.5 border border-black">
              {snippet.category}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight group-hover:text-[#7C3AED] transition-colors line-clamp-1">
            {snippet.title}
          </h3>
          <p className="text-xs font-mono text-neutral-700 mt-1 line-clamp-2 max-w-2xl">
            {snippet.description || "Curated production-ready snippet for developers."}
          </p>

          <div className="flex items-center gap-4 mt-3 text-xs font-mono font-bold text-neutral-800">
            <span>By {snippet.author}</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {snippet.starsCount || 0}</span>
            <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-red-500" /> {snippet.copyCount || 0} copies</span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleQuickCopy}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white text-black text-xs font-mono font-black uppercase border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-neutral-50 active:translate-x-[1px] active:translate-y-[1px]"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied!" : "1-Click Copy"}</span>
          </button>
          <div className="p-2.5 bg-black text-white border-2 border-black shadow-[3px_3px_0px_#7C3AED] group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

