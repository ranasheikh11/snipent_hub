"use client";

import React from "react";
import { SnippetItem } from "@/frontend/types/snippet";
import { CommunitySnippetCard } from "./CommunitySnippetCard";
import { Loader2, Code2, Plus } from "lucide-react";

interface CommunityFeedProps {
  snippets: SnippetItem[];
  loading: boolean;
  onOpenNewSnippet: () => void;
  hashtag: string;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  snippets,
  loading,
  onOpenNewSnippet,
  hashtag,
}) => {
  if (loading) {
    return (
      <div className="p-16 border-2 border-black bg-white shadow-[4px_4px_0px_#000] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin" />
        <span className="font-mono font-bold text-xs uppercase tracking-wider">Loading space feed...</span>
      </div>
    );
  }

  if (snippets.length === 0) {
    return (
      <div className="p-12 border-3 border-dashed border-black bg-white text-center space-y-4 shadow-[4px_4px_0px_#000]">
        <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] border-2 border-black mx-auto flex items-center justify-center">
          <Code2 className="w-6 h-6 text-[#7C3AED]" />
        </div>
        <div>
          <h3 className="font-black text-lg uppercase text-black">No Code Posted in this Space Yet</h3>
          <p className="font-mono text-xs text-neutral-600 mt-1 max-w-md mx-auto">
            Be the first developer to share production-ready snippets tagged with {hashtag}!
          </p>
        </div>
        <button
          onClick={onOpenNewSnippet}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7C3AED] text-white font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#6D28D9] cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Share First Snippet
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {snippets.map((snip) => (
        <CommunitySnippetCard key={snip.id} snippet={snip} />
      ))}
    </div>
  );
};

