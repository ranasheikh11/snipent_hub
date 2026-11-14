"use client";

import React from "react";
import { TopicFilter, SnippetScope } from "@/frontend/types/snippet";
import { SnippetTopicsFilter } from "./filters/SnippetTopicsFilter";
import { SnippetDifficultyFilter } from "./filters/SnippetDifficultyFilter";
import { SnippetScopeFilter } from "./filters/SnippetScopeFilter";

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
  selectedTopic,
  onSelectTopic,
  selectedLevel,
  onSelectLevel,
  selectedScope,
  onSelectScope,
  topicCounts,
  levelCounts,
  totalCount,
}) => {
  return (
    <aside className="w-full lg:w-64 space-y-4 lg:sticky lg:top-20 shrink-0 self-start">
      <SnippetTopicsFilter
        selectedTopic={selectedTopic}
        onSelectTopic={onSelectTopic}
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
    </aside>
  );
};
