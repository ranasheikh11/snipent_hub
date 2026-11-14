"use client";

import React, { useState } from "react";
import { SnippetItem } from "@/frontend/types/snippet";
import { CopyButton } from "./CopyButton";
import { useAuth } from "@/frontend/hooks/useAuth";
import { ArrowRight, Code2, Star } from "lucide-react";

interface SnippetCardProps {
  snippet: SnippetItem;
  onOpenDetails: (snippet: SnippetItem) => void;
}

const LEVEL_COLORS: Record<string, string> = {
  ADVANCED: "bg-red-600 text-white",
  INTERMEDIATE: "bg-orange-500 text-white",
  BEGINNER: "bg-emerald-600 text-white",
};

export const SnippetCard: React.FC<SnippetCardProps> = ({ snippet, onOpenDetails }) => {
  const { user } = useAuth();
  const currentKey = user?.id || user?.email || "";
  const [stars, setStars] = useState(snippet.starsCount || 0);
  const [isStarred, setIsStarred] = useState(Boolean(currentKey && snippet.starredBy?.includes(currentKey)));

  const primaryCode = snippet.files[0]?.code || "";
  const previewCode = primaryCode.split("\n").slice(0, 3).join("\n");
  const levelKey = (snippet.level || "BEGINNER").toUpperCase();
  const levelBadgeClass = LEVEL_COLORS[levelKey] || LEVEL_COLORS.BEGINNER;

  const handleStar = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isStarred;
    setIsStarred(next);
    setStars((prev) => Math.max(0, prev + (next ? 1 : -1)));
    try {
      const res = await fetch(`/api/snippets/${snippet.id}/star`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setIsStarred(Boolean(data.starred));
        setStars(data.starsCount);
      }
    } catch {
      setIsStarred(!next);
      setStars((prev) => Math.max(0, prev + (next ? -1 : 1)));
    }
  };

  return (
    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]">
      <div className="bg-neutral-900 border-b-2 border-black px-4 py-2.5 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
          <span className="text-xs font-mono font-bold text-neutral-200">{snippet.technology}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleStar} className="flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 border border-black cursor-pointer bg-amber-400 text-black hover:bg-amber-300">
            <Star className={`w-3 h-3 ${isStarred ? "fill-black stroke-black" : "fill-none stroke-black"}`} />
            <span>{stars}</span>
          </button>
          <span className={`text-[10px] font-black uppercase px-2 py-0.5 border border-black ${levelBadgeClass}`}>
            {levelKey}
          </span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 border border-black">{snippet.category}</span>
            <span className="bg-white text-black text-[10px] font-bold uppercase px-2 py-0.5 border border-black">{snippet.files.length} {snippet.files.length === 1 ? "FILE" : "FILES"}</span>
          </div>

          <h3 onClick={() => onOpenDetails(snippet)} className="font-black text-sm uppercase text-black line-clamp-1 hover:text-[#7C3AED] cursor-pointer">
            {snippet.title}
          </h3>
          <p className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">BY {snippet.author.toUpperCase()}</p>
          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">{snippet.description}</p>

          {previewCode && (
            <div className="bg-[#F9FAFB] border border-black/30 p-2.5 font-mono text-[11px] leading-tight text-neutral-800 line-clamp-3 select-none overflow-hidden">
              <pre className="whitespace-pre-wrap font-mono text-[11px] text-purple-900">{previewCode}</pre>
            </div>
          )}
        </div>

        <div>
          <div className="border-t-2 border-black mb-3" />
          <div className="flex items-center gap-2">
            <CopyButton textToCopy={primaryCode} snippetId={snippet.id} label="COPY CODE" className="flex-1 justify-center py-2" />
            <button onClick={() => onOpenDetails(snippet)} className="w-9 h-9 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center neo-press hover:bg-neutral-100 cursor-pointer shrink-0" title="Open Snippet">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
