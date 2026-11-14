"use client";

import React, { useState } from "react";
import { TopicFilter, SnippetScope } from "@/frontend/types/snippet";
import { SnippetTopicsFilter } from "./filters/SnippetTopicsFilter";
import { SnippetDifficultyFilter } from "./filters/SnippetDifficultyFilter";
import { SnippetScopeFilter } from "./filters/SnippetScopeFilter";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";

interface SnippetFilterSidebarProps {
  selectedTopic: TopicFilter;
  onSelectTopic: (topic: TopicFilter) => void;
  selectedLevel: string;
  onSelectLevel: (level: string) => void;
  selectedScope: SnippetScope;
  onSelectScope: (scope: SnippetScope) => void;
  topicCounts: Record<string, number>;
  levelCounts: Record<string, number>;
  totalCount: number;
}

export const SnippetFilterSidebar: React.FC<SnippetFilterSidebarProps> = ({
  selectedTopic, onSelectTopic, selectedLevel, onSelectLevel,
  selectedScope, onSelectScope, topicCounts, levelCounts, totalCount,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <aside className="w-full lg:w-64 space-y-4 lg:sticky lg:top-20 shrink-0 self-start">
      {/* Mobile Accordion Toggle */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="w-full lg:hidden flex items-center justify-between p-3 bg-white border-2 border-black shadow-[3px_3px_0px_#000] neo-press cursor-pointer"
      >
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black">
          <Filter className="w-4 h-4 text-[#7C3AED]" />
          <span>Filter Vault: {selectedTopic} {selectedLevel ? `• ${selectedLevel}` : ""}</span>
        </div>
        {isMobileOpen ? <ChevronUp className="w-4 h-4 stroke-[3]" /> : <ChevronDown className="w-4 h-4 stroke-[3]" />}
      </button>

      {/* Filter Body - Always open on lg, collapsible on mobile */}
      <div className={`space-y-4 ${isMobileOpen ? "block" : "hidden lg:block"}`}>
        <SnippetTopicsFilter
          selectedTopic={selectedTopic}
          onSelectTopic={(t) => { onSelectTopic(t); setIsMobileOpen(false); }}
          topicCounts={topicCounts}
          totalCount={totalCount}
        />
        <SnippetDifficultyFilter
          selectedLevel={selectedLevel}
          onSelectLevel={onSelectLevel}
          levelCounts={levelCounts}
        />
        <SnippetScopeFilter
          selectedScope={selectedScope}
          onSelectScope={onSelectScope}
        />
      </div>
    </aside>
  );
};
