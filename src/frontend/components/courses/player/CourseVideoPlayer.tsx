"use client";

import React from "react";
import { LectureItem } from "@/frontend/types/course";
import { YouTubeIcon } from "@/frontend/components/ui/YouTubeIcon";
import { ExternalLink } from "lucide-react";

interface Props {
  lecture: LectureItem | null;
  courseTitle: string;
}

export const CourseVideoPlayer: React.FC<Props> = ({ lecture, courseTitle }) => {
  if (!lecture) {
    return (
      <div className="aspect-video w-full bg-neutral-900 border-3 border-black shadow-[6px_6px_0px_#000] flex items-center justify-center text-white font-mono text-xs">
        Select a lecture from the curriculum to start learning.
      </div>
    );
  }

  const youtubeUrl = `https://www.youtube.com/watch?v=${lecture.videoId}`;

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

      <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_#000] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] font-mono font-bold text-red-600 uppercase flex items-center gap-1.5 mb-1">
            <YouTubeIcon className="w-3.5 h-3.5 text-red-600" />
            <span>Lesson #{lecture.position} • {courseTitle}</span>
          </span>
          <h2 className="text-base sm:text-lg font-black uppercase text-black leading-snug line-clamp-2">
            {lecture.title}
          </h2>
          <p className="text-[10px] font-mono text-neutral-500 mt-1">
            💡 If video shows &quot;Private&quot;, change its setting to <strong>Unlisted</strong> in YouTube Studio to play here.
          </p>
        </div>

        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] neo-press cursor-pointer shrink-0"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>YouTube</span>
        </a>
      </div>
    </div>
  );
};
