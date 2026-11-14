"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { YouTubeIcon } from "@/frontend/components/ui/YouTubeIcon";
import { useAuth } from "@/frontend/hooks/useAuth";

interface Props {
  connected: boolean;
  channelTitle?: string;
}

export const YouTubeConnectBanner: React.FC<Props> = ({ connected, channelTitle }) => {
  const { user } = useAuth();
  const token = typeof window !== "undefined" ? (localStorage.getItem("devvault_token") || localStorage.getItem("token") || "") : "";
  const authUrl = `/api/auth/youtube?token=${encodeURIComponent(token)}&returnTo=${encodeURIComponent("http://localhost:3000/courses/create")}`;

  return (
    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-red-600 border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000]">
          <YouTubeIcon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 className="font-black text-sm uppercase text-black flex items-center gap-2">
            <span>YouTube Account Connection</span>
            {connected && <span className="bg-emerald-200 text-emerald-900 text-[10px] px-2 py-0.5 border border-black flex items-center gap-1 font-mono font-bold"><CheckCircle2 className="w-3 h-3" /> CONNECTED</span>}
          </h3>
          <p className="text-xs font-mono text-neutral-600">
            {connected ? `Channel: ${channelTitle || user?.name || "Connected"} (Auto-syncs your playlists)` : "Connect your YouTube channel to load and select your video playlists directly."}
          </p>
        </div>
      </div>

      <div>
        <a
          href={authUrl}
          className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] neo-press inline-flex items-center gap-1.5 cursor-pointer ${
            connected ? "bg-neutral-100 hover:bg-neutral-200 text-black" : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          <YouTubeIcon className="w-4 h-4 text-white" />
          <span>{connected ? "Reconnect Account" : "Connect YouTube Account"}</span>
        </a>
      </div>
    </div>
  );
};
