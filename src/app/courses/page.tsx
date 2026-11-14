"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/frontend/components/layout/Navbar";
import { Footer } from "@/frontend/components/layout/Footer";
import { CourseFilterSidebar } from "@/frontend/components/courses/CourseFilterSidebar";
import { CourseCard } from "@/frontend/components/courses/CourseCard";
import { CourseItem } from "@/frontend/types/course";
import { Sparkles } from "lucide-react";
import { YouTubeIcon } from "@/frontend/components/ui/YouTubeIcon";

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tech, setTech] = useState("ALL");
  const [level, setLevel] = useState("");
  const [search, setSearch] = useState("");

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (tech !== "ALL") q.set("tech", tech);
      if (level) q.set("difficulty", level);
      if (search) q.set("q", search);
      const res = await fetch(`/api/courses?${q.toString()}`);
      const data = await res.json();
      if (data.success) setCourses(data.data || []);
    } finally { setLoading(false); }
  }, [tech, level, search]);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Navbar onOpenNewSnippet={() => {}} onOpenQuickNotes={() => {}} />
      <div className="bg-[#FFEAEA] border-b-2 border-black py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 border border-black shadow-[2px_2px_0px_#000] mb-2">
              <YouTubeIcon className="w-3.5 h-3.5 text-white" /> YouTube-Powered Developer Courses
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase text-black tracking-tight">
              Dev <span className="bg-white px-2 py-0.5 border-2 border-black shadow-[3px_3px_0px_#000]">Courses</span>
            </h1>
          </div>
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses, frameworks, playlists..."
            className="w-full sm:w-80 bg-white border-2 border-black px-3 py-2 text-xs font-mono font-bold focus:outline-none shadow-[3px_3px_0px_#000]"
          />
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <CourseFilterSidebar selectedTech={tech} onSelectTech={setTech} selectedLevel={level} onSelectLevel={setLevel} />
          <div className="flex-1 w-full">
            <div className="border-b-2 border-black pb-3 mb-6 flex items-center justify-between">
              <h2 className="font-black text-xl uppercase tracking-wider text-black">
                COURSES <span className="text-red-600">({courses.length})</span>
              </h2>
            </div>

            {loading ? (
              <div className="p-12 text-center font-mono font-bold text-neutral-600 border-2 border-black bg-white shadow-[3px_3px_0px_#000]">
                Loading developer courses...
              </div>
            ) : courses.length === 0 ? (
              <div className="p-12 text-center border-2 border-black bg-white shadow-[4px_4px_0px_#000] space-y-3">
                <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
                <h3 className="font-black text-lg uppercase">No courses found</h3>
                <p className="text-xs font-mono text-neutral-600">Be the first developer to publish a course from your YouTube playlist!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course._id || course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
