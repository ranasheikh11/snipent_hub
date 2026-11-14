"use client";

import React, { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/frontend/components/layout/Navbar";
import { HeroBanner } from "@/frontend/components/layout/HeroBanner";
import { Footer } from "@/frontend/components/layout/Footer";
import { CommandPalette } from "@/frontend/components/layout/CommandPalette";
import { SnippetFilterSidebar } from "@/frontend/components/snippets/SnippetFilterSidebar";
import { SnippetList } from "@/frontend/components/snippets/SnippetList";
import { SnippetDetailModal } from "@/frontend/components/snippets/SnippetDetailModal";
import { NewSnippetModal } from "@/frontend/components/snippets/NewSnippetModal";
import { QuickNotesModal } from "@/frontend/components/notes/QuickNotesModal";
import { SnippetDiscoveryBar } from "@/frontend/components/snippets/SnippetDiscoveryBar";
import { FeaturedSnippetSpotlight } from "@/frontend/components/discovery/FeaturedSnippetSpotlight";
import { LeaderboardView } from "@/frontend/components/discovery/LeaderboardView";
import { PackagesView } from "@/frontend/components/discovery/PackagesView";
import { SnippetItem, TopicFilter, SnippetScope, SortOption } from "@/frontend/types/snippet";
import { DiscoveryMode } from "@/frontend/types/discovery";
import { getTopicCounts, getLevelCounts, filterSnippets } from "@/frontend/components/snippets/snippetFiltersHelper";

function HomeContent() {
  const [allSnippets, setAllSnippets] = useState<SnippetItem[]>([]);
  const [featured, setFeatured] = useState<SnippetItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [discoveryMode, setDiscoveryMode] = useState<DiscoveryMode>("ALL");
  const [selectedTopic, setSelectedTopic] = useState<TopicFilter>("ALL");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedScope, setSelectedScope] = useState<SnippetScope>("ALL");
  const [sortOption, setSortOption] = useState<SortOption>("STARS");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSnippet, setActiveSnippet] = useState<SnippetItem | null>(null);
  const [highlightQuestionId, setHighlightQuestionId] = useState<string | null>(null);
  const [isNewSnippetOpen, setIsNewSnippetOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const searchParams = useSearchParams();

  const fetchAllSnippets = useCallback(async () => {
    setIsLoading(true);
    try {
      const [resAll, resFeat] = await Promise.all([
        fetch("/api/snippets?topic=ALL").then((r) => r.json()),
        fetch("/api/snippets/featured").then((r) => r.json()).catch(() => ({ data: null })),
      ]);
      if (resAll.success) setAllSnippets(resAll.data);
      if (resFeat?.success) setFeatured(resFeat.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchAllSnippets(); }, [fetchAllSnippets]);

  const openSnippet = (id: string, qId?: string) => {
    if (qId) setHighlightQuestionId(qId);
    const existing = allSnippets.find((s) => s.id === id);
    if (existing) setActiveSnippet(existing);
    else fetch(`/api/snippets/${id}`).then((r) => r.json()).then((d) => d.success && setActiveSnippet({ ...d.data, id: d.data._id }));
  };

  useEffect(() => {
    const sId = searchParams?.get("snippetId");
    if (sId) openSnippet(sId, searchParams?.get("questionId") || undefined);
  }, [searchParams]);

  const topicCounts = useMemo(() => getTopicCounts(allSnippets), [allSnippets]);
  const levelCounts = useMemo(() => getLevelCounts(allSnippets), [allSnippets]);
  const displayed = useMemo(() => {
    const list = filterSnippets(allSnippets, selectedTopic, selectedLevel, selectedScope, searchQuery, sortOption);
    if (discoveryMode === "TRENDING") return [...list].sort((a, b) => ((b.copyCount || 0) * 3 + (b.starsCount || 0) * 5) - ((a.copyCount || 0) * 3 + (a.starsCount || 0) * 5));
    if (discoveryMode === "POPULAR") return [...list].sort((a, b) => ((b.copyCount || 0) * 2 + (b.starsCount || 0) * 3) - ((a.copyCount || 0) * 2 + (a.starsCount || 0) * 3));
    return list;
  }, [allSnippets, selectedTopic, selectedLevel, selectedScope, searchQuery, sortOption, discoveryMode]);

  const resetFilters = () => {
    setSelectedTopic("ALL");
    setSelectedLevel("");
    setSelectedScope("ALL");
    setSearchQuery("");
    setDiscoveryMode("ALL");
    setSortOption("STARS");
  };

  return (
    <>
      <Navbar onOpenNewSnippet={() => setIsNewSnippetOpen(true)} onOpenQuickNotes={() => setIsNotesOpen(true)} onSelectSnippetNotification={openSnippet} />
      <HeroBanner searchQuery={searchQuery} onSearchChange={setSearchQuery} onSubmitSearch={(e) => e.preventDefault()} />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-16 w-full">
        {discoveryMode === "ALL" && !searchQuery && <FeaturedSnippetSpotlight snippet={featured} onOpenDetails={setActiveSnippet} />}
        <SnippetDiscoveryBar activeMode={discoveryMode} onChangeMode={setDiscoveryMode} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        {discoveryMode === "LEADERBOARD" ? <LeaderboardView /> : discoveryMode === "PACKAGES" ? <PackagesView /> : (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <SnippetFilterSidebar selectedTopic={selectedTopic} onSelectTopic={setSelectedTopic} selectedLevel={selectedLevel} onSelectLevel={setSelectedLevel} selectedScope={selectedScope} onSelectScope={setSelectedScope} topicCounts={topicCounts} levelCounts={levelCounts} totalCount={allSnippets.length} />
            <SnippetList snippets={displayed} isLoading={isLoading} sortOption={sortOption} onSortChange={setSortOption} onOpenDetails={(s) => { setHighlightQuestionId(null); setActiveSnippet(s); }} onResetFilters={resetFilters} />
          </div>
        )}
      </main>
      <Footer />
      <SnippetDetailModal snippet={activeSnippet} onClose={() => { setActiveSnippet(null); setHighlightQuestionId(null); }} onForked={fetchAllSnippets} initialOpenQA={Boolean(highlightQuestionId)} highlightQuestionId={highlightQuestionId} />
      <NewSnippetModal isOpen={isNewSnippetOpen} onClose={() => setIsNewSnippetOpen(false)} onCreated={fetchAllSnippets} />
      <QuickNotesModal isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)} />
      <CommandPalette snippets={allSnippets} onSelectSnippet={setActiveSnippet} onOpenNewSnippet={() => setIsNewSnippetOpen(true)} />
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Suspense fallback={<div className="p-8 text-center font-mono">Loading SnippetHub...</div>}><HomeContent /></Suspense>
    </div>
  );
}
