"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SnippetItem } from "@/frontend/types/snippet";
import { CopyButton } from "@/frontend/components/snippets/CopyButton";
import { CodeTabsViewer } from "@/frontend/components/snippets/CodeTabsViewer";
import { ChevronDown, ChevronUp, User, Clock, Star } from "lucide-react";

interface CommunitySnippetListProps {
  snippets: SnippetItem[];
  loading: boolean;
}

export const CommunitySnippetList: React.FC<CommunitySnippetListProps> = ({ snippets, loading }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (loading) {
    return <div className="p-4 text-center font-mono text-xs text-neutral-500">Loading community snippets...</div>;
  }

  if (snippets.length === 0) {
    return (
      <div className="p-6 text-center font-mono text-xs border border-dashed border-black bg-neutral-50">
        No snippets posted to this space yet. Be the first to share code!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {snippets.map((snip) => {
        const isExpanded = expandedId === snip.id;
        const timeStr = snip.createdAt
          ? new Date(snip.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            }) + " at " +
            new Date(snip.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Recently";

        return (
          <div key={snip.id} className="border-2 border-black bg-white shadow-[3px_3px_0px_#000] p-3.5 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  <span className="text-[10px] font-mono font-bold bg-[#7C3AED] text-white px-1.5 py-0.5 border border-black uppercase">
                    {snip.technology}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-neutral-500 flex items-center gap-1 bg-neutral-100 px-1.5 py-0.5 border border-black/20">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" /> {snip.starsCount || 0}
                  </span>
                </div>
                <h4 className="font-mono font-black text-sm text-black uppercase">{snip.title}</h4>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <CopyButton textToCopy={snip.files[0]?.code || ""} snippetId={snip.id} label="Copy" />
                <button
                  onClick={() => setExpandedId(isExpanded ? null : snip.id)}
                  className="p-1 border border-black bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
                  title="Toggle Code"
                >
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {snip.description && (
              <p className="text-[11px] font-mono text-neutral-600 line-clamp-2">{snip.description}</p>
            )}

            {/* Author & Timestamp meta bar */}
            <div className="flex items-center justify-between pt-1 border-t border-black/10 text-[10px] font-mono text-neutral-600">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 text-[#7C3AED]" />
                {snip.authorId ? (
                  <Link href={`/profile/${snip.authorId}`} className="font-bold hover:underline text-black">
                    {snip.author}
                  </Link>
                ) : (
                  <span className="font-bold text-black">{snip.author}</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-neutral-500">
                <Clock className="w-3 h-3" />
                <span>{timeStr}</span>
              </div>
            </div>

            {isExpanded && (
              <div className="pt-2">
                <CodeTabsViewer files={snip.files} snippetId={snip.id} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
