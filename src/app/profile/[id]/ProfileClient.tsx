"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/frontend/components/layout/Navbar";
import { Footer } from "@/frontend/components/layout/Footer";
import { ProfileHeader } from "@/frontend/components/profile/ProfileHeader";
import { ProfileContent } from "@/frontend/components/profile/ProfileContent";
import { NewSnippetModal } from "@/frontend/components/snippets/NewSnippetModal";
import { QuickNotesModal } from "@/frontend/components/notes/QuickNotesModal";

function ProfileInner({
  userId,
  refreshKey,
}: {
  userId?: string;
  refreshKey: number;
}) {
  const params = useParams();
  const activeId = userId || (params?.id as string);
  const [profileData, setProfileData] = useState<any>(null);

  const fetchProfile = useCallback(() => {
    if (!activeId) return;
    fetch(`/api/profile/${activeId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          const snippets = d.data.snippets || [];
          const blogs = d.data.blogs || [];
          const totalStars = snippets.reduce((sum: number, s: any) => sum + (s.stars || 0), 0);
          setProfileData({
            ...d.data.user,
            snippetCount: snippets.length,
            blogCount: blogs.length,
            totalStars,
          });
        }
      });
  }, [activeId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile, refreshKey]);

  return (
    <>
      <ProfileHeader profileUser={profileData} />
      <ProfileContent userId={activeId} refreshKey={refreshKey} />
    </>
  );
}

export function ProfileClient({ userId }: { userId?: string }) {
  const [isNewSnippetOpen, setIsNewSnippetOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreated = () => {
    setIsNewSnippetOpen(false);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Navbar
        onOpenNewSnippet={() => setIsNewSnippetOpen(true)}
        onOpenQuickNotes={() => setIsNotesOpen(true)}
      />
      <Suspense fallback={<div className="p-8 text-center font-mono">Loading profile...</div>}>
        <ProfileInner userId={userId} refreshKey={refreshKey} />
      </Suspense>
      <Footer />
      <NewSnippetModal
        isOpen={isNewSnippetOpen}
        onClose={() => setIsNewSnippetOpen(false)}
        onCreated={handleCreated}
      />
      <QuickNotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
      />
    </div>
  );
}
