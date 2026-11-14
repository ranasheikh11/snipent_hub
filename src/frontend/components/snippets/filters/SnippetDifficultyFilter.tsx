"use client";

import React from "react";
import { Check } from "lucide-react";

interface SnippetDifficultyFilterProps {
  selectedLevel: string;
  onSelectLevel: (level: string) => void;
  levelCounts: Record<string, number>;
}

const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

export const SnippetDifficultyFilter: React.FC<SnippetDifficultyFilterProps> = ({
  selectedLevel,
  onSelectLevel,
  levelCounts,
}) => {
  return (
    <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] p-3 space-y-2">
      <div className="font-black text-xs uppercase tracking-wider text-black pb-1.5 border-b-2 border-black">
        DIFFICULTY LEVEL
      </div>
      <div className="space-y-1.5 pt-1">
        {LEVELS.map((lvl) => {
          const isChecked = selectedLevel.toUpperCase() === lvl;
          const count = levelCounts[lvl] ?? 0;
          return (
            <button
              key={lvl}
              type="button"
              onClick={() => onSelectLevel(isChecked ? "" : lvl)}
              className="w-full flex items-center justify-between px-2.5 py-1.5 hover:bg-neutral-50 transition-colors cursor-pointer text-left group"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 border-2 border-black flex items-center justify-center transition-colors ${
                    isChecked ? "bg-black text-white" : "bg-white group-hover:bg-neutral-100"
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="font-black text-xs uppercase tracking-wider text-black">
                  {lvl}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-neutral-500">
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

