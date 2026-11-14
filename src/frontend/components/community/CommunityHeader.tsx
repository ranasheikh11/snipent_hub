"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CommunityItem } from "@/frontend/types/community";
import { useAuth } from "@/frontend/hooks/useAuth";
import { ArrowLeft, Users, Hash, Plus, Check, LogOut, Loader2 } from "lucide-react";

interface CommunityHeaderProps {
  community: CommunityItem;
  onOpenNewSnippet: () => void;
  onRefreshCommunity?: () => void;
}

export const CommunityHeader: React.FC<CommunityHeaderProps> = ({
  community,
  onOpenNewSnippet,
  onRefreshCommunity,
}) => {
  const { user } = useAuth();
  const [isMember, setIsMember] = useState(
    Boolean(user?.email && community.members?.includes(user.email))
  );
  const [membersCount, setMembersCount] = useState(community.membersCount || 1);
  const [loadingJoin, setLoadingJoin] = useState(false);

  const handleToggleJoin = async () => {
    setLoadingJoin(true);
    try {
      const res = await fetch(`/api/communities/${community.id}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user?.email }),
      });
      const data = await res.json();
      if (data.success) {
        setIsMember(data.isMember);
        setMembersCount(data.membersCount);
        onRefreshCommunity?.();
      }
    } finally {
      setLoadingJoin(false);
    }
  };

  return (
    <div className="w-full bg-[#F5F3FF] border-b-2 border-black py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <div>
          <Link
            href="/communities"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-black hover:text-[#7C3AED] border border-black bg-white px-2.5 py-1 shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" /> Back to Dev Spaces
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border-3 border-black p-5 sm:p-6 shadow-[6px_6px_0px_#000]">
          <div className="flex items-start gap-4">
            <span className="text-4xl p-2.5 bg-[#F5F3FF] border-2 border-black shadow-[3px_3px_0px_#000] shrink-0">
              {community.icon}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-mono font-bold bg-[#7C3AED] text-white px-2.5 py-0.5 border border-black flex items-center gap-1">
                  <Hash className="w-3 h-3" /> {community.hashtag?.replace(/^#/, "") || community.slug}
                </span>
                <span className="text-[11px] font-mono text-neutral-600 uppercase">Created by {community.creatorName}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-black leading-tight">{community.name}</h1>
              {community.description && (
                <p className="text-xs font-mono text-neutral-700 mt-1 max-w-2xl">{community.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-mono font-bold">
              <Users className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>{membersCount} Devs</span>
            </div>
            <button
              onClick={handleToggleJoin}
              disabled={loadingJoin}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-bold uppercase border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer transition-colors ${
                isMember ? "bg-red-500 text-white hover:bg-red-600" : "bg-black text-white hover:bg-neutral-800"
              }`}
            >
              {loadingJoin ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : isMember ? <><LogOut className="w-3.5 h-3.5" /> Leave</> : <><Check className="w-3.5 h-3.5" /> Join Space</>}
            </button>
            <button
              onClick={onOpenNewSnippet}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-400 text-black text-xs font-black uppercase border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-emerald-300 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Post Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

