"use client";

import React from "react";
import { BrutalistButton } from "@/frontend/components/ui/BrutalistButton";
import { BrutalistInput } from "@/frontend/components/ui/BrutalistInput";

interface Props {
  title: string;
  onTitleChange: (v: string) => void;
  technology: string;
  onTechChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  onDiffChange: (v: "Beginner" | "Intermediate" | "Advanced") => void;
  submitting: boolean;
  error?: string;
  onSubmit: (e: React.FormEvent) => void;
}

const TECHS = ["Flutter", "React", "Next.js", "Node.js", "Python", "Go", "TypeScript", "Full Stack"];
const CATS = ["Frontend", "Backend", "Mobile", "Full Stack", "DevOps", "AI & ML"];

export const CourseMetadataForm: React.FC<Props> = ({
  title, onTitleChange, technology, onTechChange, category, onCategoryChange,
  difficulty, onDiffChange, submitting, error, onSubmit,
}) => {
  return (
    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] p-5 space-y-4">
      <h3 className="font-black text-sm uppercase text-black">Step 2: Course Details & Metadata</h3>
      <BrutalistInput placeholder="COURSE TITLE" value={title} onChange={(e) => onTitleChange(e.target.value)} required />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <select value={technology} onChange={(e) => onTechChange(e.target.value)} className="bg-white border-2 border-black px-2.5 py-2 text-xs font-mono font-bold">
          {TECHS.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)} className="bg-white border-2 border-black px-2.5 py-2 text-xs font-mono font-bold">
          {CATS.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={difficulty} onChange={(e) => onDiffChange(e.target.value as any)} className="bg-white border-2 border-black px-2.5 py-2 text-xs font-mono font-bold">
          <option value="Beginner">🟢 Beginner</option><option value="Intermediate">🟡 Intermediate</option><option value="Advanced">🔴 Advanced</option>
        </select>
      </div>

      <div className="bg-[#FFFBEB] border-2 border-black p-3 text-xs font-mono text-neutral-800 space-y-1">
        <span className="font-bold text-black flex items-center gap-1">
          💡 YouTube Video Privacy Tip:
        </span>
        <p className="text-[11px] text-neutral-700 leading-relaxed">
          Ensure your playlist videos are set to <strong>Unlisted</strong> or <strong>Public</strong> in YouTube Studio. YouTube strictly blocks <strong>Private</strong> videos from embedding on external websites.
        </p>
      </div>

      {error && <div className="p-2 text-xs font-mono font-bold bg-red-100 text-red-800 border border-red-400">{error}</div>}
      <div className="pt-2 flex justify-end">
        <BrutalistButton type="button" onClick={onSubmit} variant="primary" disabled={submitting}>
          {submitting ? "Publishing Course..." : "🚀 Publish Course to SnippetHub"}
        </BrutalistButton>
      </div>
    </div>
  );
};
