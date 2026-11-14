"use client";

import React, { useState } from "react";
import { SnippetItem } from "@/frontend/types/snippet";
import { CodeTabsViewer } from "./CodeTabsViewer";
import { SnippetQABox } from "./SnippetQABox";
import { SnippetDetailActions } from "./SnippetDetailActions";
import { X, Calendar, User, Eye } from "lucide-react";

interface SnippetDetailModalProps {
  snippet: SnippetItem | null;
  onClose: () => void;
  onForked?: () => void;
  initialOpenQA?: boolean;
  highlightQuestionId?: string | null;
}

export const SnippetDetailModal: React.FC<SnippetDetailModalProps> = ({
  snippet, onClose, onForked, initialOpenQA, highlightQuestionId,
}) => {
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  if (!snippet) return null;

  const showMsg = (text: string, isError = false) => {
    setStatusMsg({ text, isError });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] w-full max-w-4xl max-h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="border-b-2 border-black p-3 sm:p-4 bg-[#FFEAE5] flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
              <span className="bg-black text-white text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 border border-black">{snippet.technology}</span>
              <span className="bg-white text-black text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 border border-black">{snippet.category}</span>
            </div>
            <h2 className="font-black text-base sm:text-xl text-black uppercase leading-tight line-clamp-1">{snippet.title}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center neo-press hover:bg-neutral-100 cursor-pointer shrink-0">
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        <div className="p-3.5 sm:p-5 overflow-y-auto space-y-4">
          <p className="text-sm font-mono text-neutral-800 bg-neutral-100 p-3 border border-black">{snippet.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {snippet.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {snippet.createdAt.substring(0, 10)}</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> Copied {snippet.copyCount} times</span>
            </div>
            <SnippetDetailActions snippet={snippet} onForked={onForked} onNotify={showMsg} />
          </div>

          {statusMsg && (
            <div className={`p-2.5 text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] ${statusMsg.isError ? "bg-red-200 text-red-900" : "bg-emerald-200 text-emerald-900"}`}>
              {statusMsg.isError ? "⚠️ " : "✅ "} {statusMsg.text}
            </div>
          )}

          <CodeTabsViewer files={snippet.files} snippetId={snippet.id} />
          <SnippetQABox snippetId={snippet.id} initialOpen={initialOpenQA} highlightQuestionId={highlightQuestionId} />
          <div className="flex flex-wrap gap-1.5 pt-2">
            {snippet.tags.map((tag, idx) => (
              <span key={idx} className="bg-neutral-200 text-black text-[11px] font-mono px-2 py-0.5 border border-black">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
