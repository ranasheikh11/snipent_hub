"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/frontend/components/layout/Navbar";
import { Footer } from "@/frontend/components/layout/Footer";
import { YouTubeConnectBanner } from "@/frontend/components/courses/create/YouTubeConnectBanner";
import { PlaylistGrid } from "@/frontend/components/courses/create/PlaylistGrid";
import { CourseMetadataForm } from "@/frontend/components/courses/create/CourseMetadataForm";
import { YouTubePlaylistSummary } from "@/frontend/types/course";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateCoursePage() {
  const router = useRouter();
  const [connected, setConnected] = useState(false);
  const [channelTitle, setChannelTitle] = useState("");
  const [playlists, setPlaylists] = useState<YouTubePlaylistSummary[]>([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState<YouTubePlaylistSummary | null>(null);
  const [title, setTitle] = useState("");
  const [technology, setTechnology] = useState("Flutter");
  const [category, setCategory] = useState("Mobile");
  const [difficulty, setDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchPlaylists = useCallback(async () => {
    setLoadingPlaylists(true);
    try {
      const token = localStorage.getItem("devvault_token") || localStorage.getItem("token") || "";
      const res = await fetch("/api/courses/youtube/playlists", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setConnected(data.connected);
        setChannelTitle(data.channelTitle || "");
        setPlaylists(data.playlists || []);
      }
    } finally { setLoadingPlaylists(false); }
  }, []);

  useEffect(() => { fetchPlaylists(); }, [fetchPlaylists]);

  const handleSelectPlaylist = (p: YouTubePlaylistSummary) => {
    setSelectedPlaylist(p);
    if (!title) setTitle(p.title);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlaylist) return setError("Please select a YouTube playlist first.");
    setSubmitting(true);
    setError("");
    try {
      const token = localStorage.getItem("devvault_token") || localStorage.getItem("token") || "";
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          playlistId: selectedPlaylist.id, title, technology, category, difficulty,
          thumbnail: selectedPlaylist.thumbnail, channelTitle: selectedPlaylist.channelTitle,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        router.push(`/courses/${data.data.slug || data.data._id}`);
      } else { setError(data.message || "Failed to publish course"); }
    } catch { setError("Network error creating course"); } finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Navbar onOpenNewSnippet={() => {}} onOpenQuickNotes={() => {}} />
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full space-y-6">
        <Link href="/courses" className="text-xs font-mono font-bold flex items-center gap-1 hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Courses
        </Link>
        <div>
          <h1 className="text-3xl font-black uppercase text-black">Create YouTube Course</h1>
          <p className="text-xs font-mono text-neutral-600">Select any playlist from your connected YouTube account to generate an interactive course.</p>
        </div>
        <YouTubeConnectBanner connected={connected} channelTitle={channelTitle} />

        {connected && (
          <div className="space-y-6">
            <div>
              <h3 className="font-black text-sm uppercase text-black mb-2">Step 1: Select a YouTube Playlist</h3>
              <PlaylistGrid playlists={playlists} selectedId={selectedPlaylist?.id || ""} onSelect={handleSelectPlaylist} loading={loadingPlaylists} />
            </div>

            {selectedPlaylist && (
              <CourseMetadataForm
                title={title} onTitleChange={setTitle} technology={technology} onTechChange={setTechnology}
                category={category} onCategoryChange={setCategory} difficulty={difficulty} onDiffChange={setDifficulty}
                submitting={submitting} error={error} onSubmit={handlePublish}
              />
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
