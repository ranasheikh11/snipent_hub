"use client";

import React from "react";
import { SnippetScope } from "@/frontend/types/snippet";

interface SnippetScopeFilterProps {
  selectedScope: SnippetScope;
  onSelectScope: (scope: SnippetScope) => void;
}

export const SnippetScopeFilter: React.FC<SnippetScopeFilterProps> = ({
  selectedScope,
  onSelectScope,
}) => {
  const options: { id: SnippetScope; label: string; sub: string }[] = [
    { id: "SINGLE", label: "Single File", sub: "(1 FILE)" },
    { id: "MULTI", label: "Multi-File Module", sub: "(2+ FILES)" },
  ];

  return (
    <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] p-3 space-y-2">
      <div className="font-black text-xs uppercase tracking-wider text-black pb-1.5 border-b-2 border-black">
        SNIPPET SCOPE
      </div>
      <div className="space-y-2 pt-1">
        {options.map((opt) => {
          const isSelected = selectedScope === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectScope(isSelected ? "ALL" : opt.id)}
              className="w-full flex items-center gap-2.5 px-2 py-1 text-left cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <div
                className={`w-4 h-4 rounded-full border-2 border-black flex items-center justify-center shrink-0 ${
                  isSelected ? "bg-black" : "bg-white"
                }`}
              >
                {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <span className="text-xs font-bold text-black flex items-center gap-1">
                <span>{opt.label}</span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">{opt.sub}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

