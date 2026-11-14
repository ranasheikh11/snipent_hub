"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SnippetItem } from "@/frontend/types/snippet";
import { CopyButton } from "@/frontend/components/snippets/CopyButton";
import { CodeTabsViewer } from "@/frontend/components/snippets/CodeTabsViewer";
import { SnippetQABox } from "@/frontend/components/snippets/SnippetQABox";
import { useAuth } from "@/frontend/hooks/useAuth";
import { Star, MessageSquare, User, Clock, ChevronDown, ChevronUp } from "lucide-react";

export const CommunitySnippetCard: React.FC<{ snippet: SnippetItem }> = ({ snippet }) => {
  const { user } = useAuth();
  const currentKey = user?.id || user?.email || "";
  const [isStarred, setIsStarred] = useState(Boolean(currentKey && snippet.starredBy?.includes(currentKey)));
  const [stars, setStars] = useState(snippet.starsCount || 0);
  const [isCodeOpen, setIsCodeOpen] = useState(true);
  const [isQAOpen, setIsQAOpen] = useState(false);

  const handleStar = async () => {
    const next = !isStarred;
    setIsStarred(next);
    setStars((prev) => Math.max(0, prev + (next ? 1 : -1)));
    try {
      const res = await fetch(`/api/snippets/${snippet.id}/star`, { method: "POST" });
      const data = await res.json();
      if (data.success) { setIsStarred(Boolean(data.starred)); setStars(data.starsCount); }
    } catch {
      setIsStarred(!next);
      setStars((prev) => Math.max(0, prev + (next ? -1 : 1)));
    }
  };

  const timeStr = snippet.createdAt
    ? new Date(snippet.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
    : "Recently";

  return (
    <div className="bg-white border-3 border-black shadow-[5px_5px_0px_#000] p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b-2 border-black/10 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] border-2 border-black flex items-center justify-center">
            <User className="w-4 h-4 text-[#7C3AED]" />
          </div>
          <div>
            {snippet.authorId ? (
              <Link href={`/profile/${snippet.authorId}`} className="font-mono font-black text-xs text-black uppercase hover:underline">
                {snippet.author}
              </Link>
            ) : (
              <span className="font-mono font-black text-xs text-black uppercase">{snippet.author}</span>
            )}
            <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-500">
              <Clock className="w-2.5 h-2.5" /> <span>{timeStr}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono font-bold uppercase bg-[#7C3AED] text-white px-2 py-0.5 border border-black">{snippet.technology}</span>
          <span className="text-[10px] font-mono font-bold uppercase bg-neutral-100 text-black px-2 py-0.5 border border-black/20">{snippet.category}</span>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-black uppercase text-black leading-snug">{snippet.title}</h3>
        {snippet.description && <p className="text-xs font-mono text-neutral-600 mt-1 line-clamp-2">{snippet.description}</p>}
      </div>

      {isCodeOpen && (
        <div className="border-2 border-black">
          <CodeTabsViewer files={snippet.files} snippetId={snippet.id} />
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t-2 border-black/10 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleStar}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer ${
              isStarred ? "bg-amber-400 text-black" : "bg-white text-black hover:bg-neutral-100"
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isStarred ? "fill-black" : ""}`} /> <span>{stars} Stars</span>
          </button>
          <button
            onClick={() => setIsQAOpen(!isQAOpen)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] bg-white hover:bg-[#F5F3FF] cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Discussion ({snippet.questions?.length || 0})</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCodeOpen(!isCodeOpen)}
            className="px-2.5 py-1.5 text-xs font-mono border-2 border-black bg-neutral-100 hover:bg-neutral-200 cursor-pointer flex items-center gap-1"
          >
            {isCodeOpen ? <><ChevronUp className="w-3 h-3" /> Hide</> : <><ChevronDown className="w-3 h-3" /> View Code</>}
          </button>
          <CopyButton textToCopy={snippet.files[0]?.code || ""} snippetId={snippet.id} label="Copy Code" />
        </div>
      </div>

      {isQAOpen && (
        <div className="pt-3 border-t-2 border-black">
          <SnippetQABox snippetId={snippet.id} initialOpen={true} />
        </div>
      )}
    </div>
  );
};
