"use client";

import React from "react";
import { TopicFilter } from "@/frontend/types/snippet";
import { Star } from "lucide-react";

interface SnippetTopicsFilterProps {
  selectedTopic: TopicFilter;
  onSelectTopic: (topic: TopicFilter) => void;
  topicCounts: Record<string, number>;
  totalCount: number;
}

const TOPICS_CONFIG: { id: TopicFilter; label: string; dotColor: string }[] = [
  { id: "FLUTTER", label: "FLUTTER", dotColor: "bg-blue-500" },
  { id: "BACKEND", label: "BACKEND", dotColor: "bg-emerald-500" },
  { id: "REACT", label: "REACT", dotColor: "bg-sky-500" },
  { id: "NEXTJS", label: "NEXT.JS", dotColor: "bg-black" },
  { id: "FULLSTACK", label: "FULL STACK", dotColor: "bg-purple-500" },
];

export const SnippetTopicsFilter: React.FC<SnippetTopicsFilterProps> = ({
  selectedTopic,
  onSelectTopic,
  topicCounts,
  totalCount,
}) => {
  return (
    <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] p-3 space-y-2">
      <div className="flex items-center justify-between pb-1">
        <span className="font-black text-xs uppercase tracking-wider text-black">TOPICS</span>
        <span className="text-[10px] font-mono text-neutral-500 font-bold uppercase">{totalCount} RESULTS</span>
      </div>

      <button
        onClick={() => onSelectTopic("ALL")}
        className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black cursor-pointer transition-all ${
          selectedTopic === "ALL" ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-50"
        }`}
      >
        <span>ALL</span>
        <span className={`text-[10px] px-1.5 py-0.2 font-mono font-bold border border-current ${
          selectedTopic === "ALL" ? "bg-neutral-800 text-white" : "bg-neutral-100 text-black"
        }`}>{totalCount}</span>
      </button>

      {TOPICS_CONFIG.map((t) => {
        const isSelected = selectedTopic === t.id;
        const count = topicCounts[t.id] ?? 0;
        return (
          <button
            key={t.id}
            onClick={() => onSelectTopic(t.id)}
            className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black cursor-pointer transition-all ${
              isSelected ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${t.dotColor} border border-black/40`} />
              <span>{t.label}</span>
            </span>
            <span className={`text-[10px] px-1.5 py-0.2 font-mono font-bold border border-current ${
              isSelected ? "bg-neutral-800 text-white" : "bg-neutral-100 text-black"
            }`}>{count}</span>
          </button>
        );
      })}

      <button
        onClick={() => onSelectTopic("FAVORITES")}
        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-black uppercase tracking-wider border-2 border-black cursor-pointer transition-all ${
          selectedTopic === "FAVORITES" ? "bg-amber-400 text-black" : "bg-amber-100 hover:bg-amber-200 text-black"
        }`}
      >
        <span className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-black stroke-black" />
          <span>FAVORITES</span>
        </span>
        <span className="text-[10px] px-1.5 py-0.2 font-mono font-bold border border-black bg-white text-black">
          {topicCounts["FAVORITES"] ?? 0}
        </span>
      </button>
    </div>
  );
};

