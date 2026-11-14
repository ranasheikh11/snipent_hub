"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { Navbar } from "@/frontend/components/layout/Navbar";
import { Footer } from "@/frontend/components/layout/Footer";
import { CourseVideoPlayer } from "@/frontend/components/courses/player/CourseVideoPlayer";
import { CourseLecturesList } from "@/frontend/components/courses/player/CourseLecturesList";
import { CourseItem, LectureItem } from "@/frontend/types/course";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [course, setCourse] = useState<CourseItem | null>(null);
  const [activeLecture, setActiveLecture] = useState<LectureItem | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data) {
          setCourse(d.data);
          if (d.data.lectures?.length) setActiveLecture(d.data.lectures[0]);
        }
      })
      .finally(() => setLoading(false));

    const saved = localStorage.getItem(`course_progress_${id}`);
    if (saved) {
      try { setCompletedIds(JSON.parse(saved)); } catch {}
    }
  }, [id]);

  const toggleComplete = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedIds((prev) => {
      const next = prev.includes(videoId) ? prev.filter((v) => v !== videoId) : [...prev, videoId];
      localStorage.setItem(`course_progress_${id}`, JSON.stringify(next));
      return next;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
        <Navbar onOpenNewSnippet={() => {}} onOpenQuickNotes={() => {}} />
        <div className="flex-1 flex items-center justify-center font-mono text-xs">Loading course dashboard...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
        <Navbar onOpenNewSnippet={() => {}} onOpenQuickNotes={() => {}} />
        <div className="flex-1 max-w-xl mx-auto py-16 text-center space-y-3">
          <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
          <h2 className="text-xl font-black uppercase">Course Not Found</h2>
          <Link href="/courses" className="text-xs font-mono font-bold underline">Back to Courses</Link>
        </div>
      </div>
    );
  }

  const percent = course.lectures.length ? Math.round((completedIds.length / course.lectures.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Navbar onOpenNewSnippet={() => {}} onOpenQuickNotes={() => {}} />
      <div className="bg-white border-b-2 border-black py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/courses" className="p-1 border border-black hover:bg-neutral-100 cursor-pointer">
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </Link>
            <div>
              <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">{course.technology} • {course.difficulty}</span>
              <h1 className="text-lg font-black uppercase text-black line-clamp-1">{course.title}</h1>
            </div>
          </div>
          <div className="w-full sm:w-48 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold">
              <span>PROGRESS</span>
              <span>{percent}%</span>
            </div>
            <div className="w-full bg-neutral-200 border border-black h-2 overflow-hidden">
              <div className="bg-emerald-500 h-full transition-all" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <CourseVideoPlayer lecture={activeLecture} courseTitle={course.title} />
          </div>
          <div className="lg:col-span-1">
            <CourseLecturesList
              lectures={course.lectures}
              activeVideoId={activeLecture?.videoId || ""}
              onSelectLecture={setActiveLecture}
              completedIds={completedIds}
              onToggleComplete={toggleComplete}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

