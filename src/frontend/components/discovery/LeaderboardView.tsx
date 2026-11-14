"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LeaderboardEntry } from "@/frontend/types/discovery";
import { Trophy, Star, Copy, Code2, Award, ExternalLink } from "lucide-react";

export const LeaderboardView: React.FC = () => {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((d) => d.success && setLeaders(d.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-12 text-center font-mono font-bold border-2 border-black bg-white">Loading Leaderboard...</div>;
  }

  const top3 = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  return (
    <div className="w-full space-y-8">
      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {top3.map((dev, i) => {
          const colors = [
            "bg-amber-300 border-amber-500 shadow-[5px_5px_0px_#000]",
            "bg-slate-200 border-slate-400 shadow-[4px_4px_0px_#000]",
            "bg-orange-200 border-orange-400 shadow-[4px_4px_0px_#000]",
          ];
          const rankIcons = ["🥇 1ST", "🥈 2ND", "🥉 3RD"];
          const avatar = dev.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(dev.author)}&backgroundColor=7c3aed`;

          return (
            <div key={dev.authorId || `${dev.author}-${i}`} className={`border-3 border-black p-5 flex flex-col items-center text-center ${colors[i]}`}>
              <span className="font-black text-xs uppercase px-2.5 py-0.5 bg-black text-white border border-black mb-3">{rankIcons[i]}</span>
              <div className="w-16 h-16 rounded-xl border-2 border-black relative overflow-hidden bg-white mb-2 shadow-[2px_2px_0px_#000]">
                <Image src={avatar} alt={dev.author} fill unoptimized className="object-cover" />
              </div>
              <h3 className="font-black text-lg uppercase text-black line-clamp-1">{dev.author}</h3>
              <span className="text-[10px] font-mono font-bold uppercase bg-white px-2 py-0.5 border border-black my-1">{dev.badge}</span>
              <div className="flex gap-3 text-xs font-mono font-bold mt-2">
                <span className="flex items-center gap-0.5"><Star className="w-3 h-3 fill-current" /> {dev.totalStars}</span>
                <span className="flex items-center gap-0.5"><Copy className="w-3 h-3" /> {dev.totalCopies}</span>
                <span className="flex items-center gap-0.5"><Code2 className="w-3 h-3" /> {dev.snippetCount}</span>
              </div>
              {dev.authorId && (
                <Link href={`/profile/${dev.authorId}`} className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono font-black uppercase text-[#7C3AED] hover:underline">
                  View Profile <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Ranks Table */}
      {rest.length > 0 && (
        <div className="border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
          <div className="p-3 bg-black text-white font-mono font-black text-xs uppercase flex justify-between">
            <span>Rank &amp; Developer</span>
            <span>Stats (Stars • Copies • Snippets)</span>
          </div>
          <div className="divide-y-2 divide-black/10">
            {rest.map((dev) => (
              <div key={dev.authorId || `${dev.author}-${dev.rank}`} className="p-3.5 flex items-center justify-between hover:bg-[#F5F3FF]">
                <div className="flex items-center gap-3">
                  <span className="w-6 font-mono font-black text-xs">#{dev.rank}</span>
                  <div>
                    <h4 className="font-black text-sm uppercase text-black">{dev.author}</h4>
                    <span className="text-[10px] font-mono text-neutral-500">{dev.badge}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono font-bold">
                  <span>★ {dev.totalStars}</span>
                  <span>📋 {dev.totalCopies}</span>
                  <span>⚡ {dev.snippetCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

