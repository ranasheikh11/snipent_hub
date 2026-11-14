"use client";

import React from "react";
import { LectureItem } from "@/frontend/types/course";
import { Check, Play } from "lucide-react";

interface Props {
  lectures: LectureItem[];
  activeVideoId: string;
  onSelectLecture: (l: LectureItem) => void;
  completedIds: string[];
  onToggleComplete: (videoId: string, e: React.MouseEvent) => void;
}

export const CourseLecturesList: React.FC<Props> = ({
  lectures, activeVideoId, onSelectLecture, completedIds, onToggleComplete,
}) => {
  return (
    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col h-[580px] overflow-hidden">
      <div className="p-3 border-b-2 border-black bg-neutral-100 flex items-center justify-between">
        <span className="font-black text-xs uppercase tracking-wider text-black">COURSE LECTURES</span>
        <span className="text-[10px] font-mono font-bold bg-black text-white px-2 py-0.5 border border-black">
          {completedIds.length}/{lectures.length} DONE
        </span>
      </div>

      <div className="overflow-y-auto divide-y-2 divide-neutral-100 flex-1">
        {lectures.map((l) => {
          const isActive = l.videoId === activeVideoId;
          const isDone = completedIds.includes(l.videoId);

          return (
            <div
              key={l.videoId}
              onClick={() => onSelectLecture(l)}
              className={`p-3 flex items-start gap-2.5 transition-colors cursor-pointer ${
                isActive ? "bg-black text-white" : "hover:bg-neutral-50 text-black"
              }`}
            >
              <button
                type="button"
                onClick={(e) => onToggleComplete(l.videoId, e)}
                title={isDone ? "Mark as uncompleted" : "Mark as completed"}
                className={`w-4 h-4 mt-0.5 border-2 border-current flex items-center justify-center shrink-0 cursor-pointer ${
                  isDone ? (isActive ? "bg-white text-black" : "bg-emerald-500 text-white border-emerald-600") : ""
                }`}
              >
                {isDone && <Check className="w-3 h-3 stroke-[3]" />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-mono opacity-60">#{l.position}</span>
                  {isActive && <Play className="w-3 h-3 fill-current text-red-500" />}
                </div>
                <h4 className="text-xs font-bold leading-tight line-clamp-2">{l.title}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

