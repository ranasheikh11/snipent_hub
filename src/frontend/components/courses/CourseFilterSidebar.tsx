"use client";

import React from "react";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { YouTubeIcon } from "@/frontend/components/ui/YouTubeIcon";

interface Props {
  selectedTech: string;
  onSelectTech: (tech: string) => void;
  selectedLevel: string;
  onSelectLevel: (lvl: string) => void;
}

const TECHS = ["ALL", "FLUTTER", "REACT", "NEXT.JS", "BACKEND", "PYTHON", "FULL STACK"];
const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

export const CourseFilterSidebar: React.FC<Props> = ({
  selectedTech, onSelectTech, selectedLevel, onSelectLevel,
}) => {
  return (
    <aside className="w-full lg:w-64 space-y-4 shrink-0 self-start">
      <Link
        href="/courses/create"
        className="w-full py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] neo-press flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <YouTubeIcon className="w-4 h-4 text-white" />
        <Plus className="w-3.5 h-3.5" />
        <span>Create Course</span>
      </Link>

      <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] p-3 space-y-2">
        <span className="font-black text-xs uppercase tracking-wider text-black block pb-1 border-b-2 border-black">
          TECHNOLOGY
        </span>
        <div className="space-y-1">
          {TECHS.map((tech) => {
            const isSelected = selectedTech.toUpperCase() === tech;
            return (
              <button
                key={tech}
                onClick={() => onSelectTech(tech)}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black cursor-pointer transition-all ${
                  isSelected ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-50"
                }`}
              >
                <span>{tech}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] p-3 space-y-2">
        <span className="font-black text-xs uppercase tracking-wider text-black block pb-1 border-b-2 border-black">
          DIFFICULTY
        </span>
        <div className="space-y-1">
          {LEVELS.map((lvl) => {
            const isChecked = selectedLevel.toUpperCase() === lvl;
            return (
              <button
                key={lvl}
                onClick={() => onSelectLevel(isChecked ? "" : lvl)}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 hover:bg-neutral-50 cursor-pointer text-left"
              >
                <div className={`w-4 h-4 border-2 border-black flex items-center justify-center ${isChecked ? "bg-black text-white" : "bg-white"}`}>
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="font-black text-xs uppercase tracking-wider text-black">{lvl}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
