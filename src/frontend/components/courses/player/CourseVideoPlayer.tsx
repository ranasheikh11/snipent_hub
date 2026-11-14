"use client";

import React from "react";
import { LectureItem } from "@/frontend/types/course";
import { YouTubeIcon } from "@/frontend/components/ui/YouTubeIcon";

interface Props {
  lecture: LectureItem | null;
  courseTitle: string;
}

export const CourseVideoPlayer: React.FC<Props> = ({ lecture, courseTitle }) => {
  if (!lecture) {
    return (
      <div className="aspect-video w-full bg-neutral-900 border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center text-white font-mono text-xs">
        Select a lecture from the list to start watching.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-video w-full bg-black border-3 border-black shadow-[6px_6px_0px_#000] overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${lecture.videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={lecture.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>

      <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_#000] flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-red-600 uppercase flex items-center gap-1 mb-1">
            <YouTubeIcon className="w-3.5 h-3.5 text-red-600" /> Lesson #{lecture.position} • {courseTitle}
          </span>
          <h2 className="text-lg font-black uppercase text-black leading-snug">{lecture.title}</h2>
        </div>
      </div>
    </div>
  );
};
