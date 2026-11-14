"use client";

import React from "react";
import { DiscoveryMode } from "@/frontend/types/discovery";
import { Zap, Flame, Star, Package, Trophy } from "lucide-react";

interface DiscoveryTabBarProps {
  activeMode: DiscoveryMode;
  onChangeMode: (mode: DiscoveryMode) => void;
}

export const DiscoveryTabBar: React.FC<DiscoveryTabBarProps> = ({
  activeMode,
  onChangeMode,
}) => {
  const tabs: { id: DiscoveryMode; label: string; icon: React.ReactNode }[] = [
    { id: "ALL", label: "All Snippets", icon: <Zap className="w-3.5 h-3.5" /> },
    { id: "TRENDING", label: "Trending", icon: <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> },
    { id: "POPULAR", label: "Most Popular", icon: <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> },
    { id: "PACKAGES", label: "Packages", icon: <Package className="w-3.5 h-3.5" /> },
    { id: "LEADERBOARD", label: "Leaderboard", icon: <Trophy className="w-3.5 h-3.5 text-amber-500" /> },
  ];

  return (
    <div className="w-full flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeMode === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChangeMode(tab.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-black uppercase tracking-wider border-2 border-black whitespace-nowrap transition-all cursor-pointer ${
              isActive
                ? "bg-black text-white shadow-[3px_3px_0px_#7C3AED] translate-x-[-1px] translate-y-[-1px]"
                : "bg-white text-black hover:bg-[#F5F3FF] shadow-[2px_2px_0px_#000]"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

