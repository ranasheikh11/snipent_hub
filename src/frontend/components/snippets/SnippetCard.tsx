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
  ADVANCED: "bg-red-500 text-white",
  INTERMEDIATE: "bg-amber-500 text-black",
  BEGINNER: "bg-emerald-500 text-black",
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
    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between transition-all duration-150 hover:-translate-y-1 hover:shadow-[5px_5px_0px_#7C3AED]">
      <div className="bg-neutral-900 border-b-2 border-black px-3.5 py-2 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
          <span className="text-xs font-mono font-black text-neutral-100">{snippet.technology}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleStar} className="flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 border border-black cursor-pointer bg-amber-400 text-black hover:bg-amber-300 active:scale-95">
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
            <span className="bg-[#F5F3FF] text-[#7C3AED] text-[10px] font-bold uppercase px-2 py-0.5 border border-black">{snippet.files.length} {snippet.files.length === 1 ? "FILE" : "FILES"}</span>
          </div>

          <h3 onClick={() => onOpenDetails(snippet)} className="font-black text-sm uppercase text-black line-clamp-1 hover:text-[#7C3AED] cursor-pointer transition-colors">
            {snippet.title}
          </h3>
          <p className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">BY {snippet.author.toUpperCase()}</p>
          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">{snippet.description}</p>

          {previewCode && (
            <div className="bg-[#0D1117] border-2 border-black shadow-[2px_2px_0px_#000] overflow-hidden select-none">
              <div className="bg-[#161B22] border-b border-black px-2.5 py-1 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF5F56] border border-black/40" />
                  <span className="w-2 h-2 rounded-full bg-[#FFBD2E] border border-black/40" />
                  <span className="w-2 h-2 rounded-full bg-[#27C93F] border border-black/40" />
                </div>
                <span className="text-[9px] font-mono font-bold text-neutral-400">{snippet.files[0]?.filename || "snippet"}</span>
              </div>
              <pre className="p-2.5 font-mono text-[11px] leading-snug text-emerald-400 overflow-hidden line-clamp-3 whitespace-pre-wrap">
                {previewCode}
              </pre>
            </div>
          )}
        </div>

        <div>
          <div className="border-t-2 border-black mb-3" />
          <div className="flex items-center gap-2">
            <CopyButton textToCopy={primaryCode} snippetId={snippet.id} label="COPY CODE" className="flex-1 justify-center py-2" />
            <button onClick={() => onOpenDetails(snippet)} className="w-9 h-9 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center neo-press hover:bg-[#F5F3FF] hover:border-[#7C3AED] cursor-pointer shrink-0" title="Open Snippet">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
