"use client";

import React from "react";
import Image from "next/image";
import { YouTubePlaylistSummary } from "@/frontend/types/course";
import { Check, ListVideo } from "lucide-react";

interface Props {
  playlists: YouTubePlaylistSummary[];
  selectedId: string;
  onSelect: (p: YouTubePlaylistSummary) => void;
  loading: boolean;
}

export const PlaylistGrid: React.FC<Props> = ({ playlists, selectedId, onSelect, loading }) => {
  if (loading) {
    return (
      <div className="p-8 text-center font-mono font-bold text-neutral-600 border-2 border-black bg-white shadow-[2px_2px_0px_#000]">
        Loading your YouTube playlists...
      </div>
    );
  }

  if (playlists.length === 0) {
    return (
      <div className="p-6 text-center border-2 border-black bg-white shadow-[2px_2px_0px_#000] text-xs font-mono text-neutral-600">
        No public playlists found on this channel. Make sure you have at least one playlist on YouTube.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {playlists.map((p) => {
        const isSelected = selectedId === p.id;
        return (
          <div
            key={p.id}
            onClick={() => onSelect(p)}
            className={`border-2 border-black p-3 bg-white transition-all cursor-pointer flex flex-col justify-between ${
              isSelected ? "shadow-[4px_4px_0px_#EF4444] ring-2 ring-red-500" : "shadow-[3px_3px_0px_#000] hover:-translate-y-0.5"
            }`}
          >
            <div>
              <div className="relative aspect-video w-full bg-neutral-100 border border-black mb-2 overflow-hidden">
                {p.thumbnail ? (
                  <Image src={p.thumbnail} alt={p.title} fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs">No Thumbnail</div>
                )}
                <div className="absolute top-1.5 right-1.5 bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold border border-white/50 flex items-center gap-1">
                  <ListVideo className="w-3 h-3" /> {p.itemCount} Videos
                </div>
              </div>
              <h4 className="font-black text-xs uppercase text-black line-clamp-2 leading-snug">{p.title}</h4>
            </div>

            <div className="pt-2 mt-2 border-t border-neutral-200 flex items-center justify-between">
              <span className="text-[10px] font-mono text-neutral-500 font-bold uppercase">{p.channelTitle}</span>
              <div className={`w-4 h-4 border-2 border-black flex items-center justify-center ${isSelected ? "bg-red-600 text-white" : "bg-white"}`}>
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

