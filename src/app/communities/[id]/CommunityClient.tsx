"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/frontend/components/layout/Navbar";
import { Footer } from "@/frontend/components/layout/Footer";
import { CommunityHeader } from "@/frontend/components/community/CommunityHeader";
import { CommunityFilters } from "@/frontend/components/community/CommunityFilters";
import { CommunityFeed } from "@/frontend/components/community/CommunityFeed";
import { CommunityPagination } from "@/frontend/components/community/CommunityPagination";
import { NewSnippetModal } from "@/frontend/components/snippets/NewSnippetModal";
import { QuickNotesModal } from "@/frontend/components/notes/QuickNotesModal";
import { CommunityItem } from "@/frontend/types/community";
import { SnippetItem } from "@/frontend/types/snippet";

export function CommunityClient({ id }: { id: string }) {
  const [community, setCommunity] = useState<CommunityItem | null>(null);
  const [snippets, setSnippets] = useState<SnippetItem[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 6, total: 0, totalPages: 1, hasNext: false, hasPrev: false });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const fetchCommunity = useCallback(() => {
    fetch(`/api/communities/${id}`).then((r) => r.json()).then((d) => d.success && setCommunity(d.data));
  }, [id]);

  const fetchSnippets = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "6", sort, ...(category ? { category } : {}), ...(search ? { q: search } : {}) });
    fetch(`/api/communities/${id}/snippets?${params}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) { setSnippets(d.data); setPagination(d.pagination); } })
      .finally(() => setLoading(false));
  }, [id, page, sort, category, search]);

  useEffect(() => { fetchCommunity(); }, [fetchCommunity]);
  useEffect(() => { fetchSnippets(); }, [fetchSnippets]);

  if (!community && !loading) {
    return <div className="min-h-screen flex items-center justify-center font-mono font-bold">Space not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Navbar onOpenNewSnippet={() => setIsNewOpen(true)} onOpenQuickNotes={() => setIsNotesOpen(true)} />
      {community && (
        <CommunityHeader
          community={community}
          onOpenNewSnippet={() => setIsNewOpen(true)}
          onRefreshCommunity={fetchCommunity}
        />
      )}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        <CommunityFilters
          searchQuery={search} onSearchChange={(q) => { setSearch(q); setPage(1); }}
          selectedCategory={category} onCategoryChange={(c) => { setCategory(c); setPage(1); }}
          sortBy={sort} onSortChange={(s) => { setSort(s); setPage(1); }}
        />
        <CommunityFeed
          snippets={snippets} loading={loading}
          onOpenNewSnippet={() => setIsNewOpen(true)}
          hashtag={community?.hashtag || `#${community?.slug || "space"}`}
        />
        <CommunityPagination
          currentPage={pagination.page} totalPages={pagination.totalPages}
          hasNext={pagination.hasNext} hasPrev={pagination.hasPrev}
          onPageChange={(p) => setPage(p)}
        />
      </main>
      <Footer />
      <NewSnippetModal
        isOpen={isNewOpen} onClose={() => setIsNewOpen(false)}
        onCreated={() => { fetchCommunity(); fetchSnippets(); }}
        defaultTag={community?.hashtag || `#${community?.slug || "space"}`}
      />
      <QuickNotesModal isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)} />
    </div>
  );
}

