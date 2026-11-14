"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CourseItem } from "@/frontend/types/course";
import { PlayCircle } from "lucide-react";
import { YouTubeIcon } from "@/frontend/components/ui/YouTubeIcon";

interface Props {
  course: CourseItem;
}

const LEVEL_COLORS: Record<string, string> = {
  ADVANCED: "bg-red-600 text-white",
  INTERMEDIATE: "bg-orange-500 text-white",
  BEGINNER: "bg-emerald-600 text-white",
};

export const CourseCard: React.FC<Props> = ({ course }) => {
  const levelKey = (course.difficulty || "BEGINNER").toUpperCase();
  const levelClass = LEVEL_COLORS[levelKey] || LEVEL_COLORS.BEGINNER;
  const courseUrl = `/courses/${course.slug || course._id || course.id}`;

  return (
    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] overflow-hidden">
      <div className="bg-neutral-900 border-b-2 border-black px-4 py-2.5 text-white flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-200">
          <YouTubeIcon className="w-4 h-4 text-red-500" />
          <span>{course.technology}</span>
        </div>
        <span className={`text-[10px] font-black uppercase px-2 py-0.5 border border-black ${levelClass}`}>
          {levelKey}
        </span>
      </div>

      <div className="relative aspect-video w-full bg-neutral-100 border-b-2 border-black overflow-hidden group">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-200 text-neutral-400 font-mono text-xs">
            No Preview
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold border border-white/40">
          {course.lectures?.length || 0} Lectures
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <Link href={courseUrl}>
            <h3 className="font-black text-base uppercase text-black line-clamp-2 hover:text-[#7C3AED] leading-snug">
              {course.title}
            </h3>
          </Link>
          <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wide">
            BY {course.author} {course.channelTitle ? `• ${course.channelTitle}` : ""}
          </p>
          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
            {course.description || "Interactive developer video course directly linked to YouTube."}
          </p>
        </div>

        <div>
          <div className="border-t-2 border-black mb-3" />
          <Link
            href={courseUrl}
            className="w-full py-2 px-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] neo-press flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Start Learning Course</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
