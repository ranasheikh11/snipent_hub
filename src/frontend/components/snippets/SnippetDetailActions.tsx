"use client";

import React, { useState } from "react";
import { SnippetItem } from "@/frontend/types/snippet";
import { GithubIcon } from "@/frontend/components/ui/GithubIcon";
import { useAuth } from "@/frontend/hooks/useAuth";
import { Download, GitFork } from "lucide-react";

interface Props {
  snippet: SnippetItem;
  onForked?: () => void;
  onNotify: (msg: string, isError?: boolean) => void;
}

export const SnippetDetailActions: React.FC<Props> = ({ snippet, onForked, onNotify }) => {
  const { user } = useAuth();
  const [forking, setForking] = useState(false);
  const [gisting, setGisting] = useState(false);

  const getToken = () => typeof window !== "undefined" ? (localStorage.getItem("devvault_token") || localStorage.getItem("token") || "") : "";

  const handleFork = async () => {
    if (!user) return onNotify("Please log in first to fork this snippet.", true);
    setForking(true);
    try {
      const res = await fetch(`/api/snippets/${snippet.id}/fork`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (data.success) {
        onNotify("Snippet forked! It is now saved in your profile.");
        onForked?.();
      } else {
        onNotify(data.message || "Failed to fork", true);
      }
    } catch {
      onNotify("Network error while forking", true);
    } finally { setForking(false); }
  };

  const handleExportGist = async () => {
    setGisting(true);
    try {
      const res = await fetch(`/api/snippets/${snippet.id}/gist`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (data.isDirect && data.gistUrl) {
        window.open(data.gistUrl, "_blank");
        await navigator.clipboard.writeText(data.gistUrl).catch(() => null);
        onNotify("Gist created on GitHub! Link copied to clipboard.");
      } else {
        await navigator.clipboard.writeText(data.fallbackCode || snippet.files[0]?.code || "").catch(() => null);
        window.open("https://gist.github.com/", "_blank");
        onNotify("Code copied! Paste on GitHub Gist to save.");
      }
    } catch {
      onNotify("Error preparing Gist export", true);
    } finally { setGisting(false); }
  };

  const handleDownload = () => {
    snippet.files.forEach((f) => {
      const blob = new Blob([f.code], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = f.filename; a.click();
      URL.revokeObjectURL(url);
    });
    onNotify(`Downloaded ${snippet.files.length} file(s).`);
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleFork} disabled={forking} className="flex items-center gap-1 px-3 py-1.5 bg-amber-400 text-black text-xs font-bold border-2 border-black shadow-[2px_2px_0px_#000] neo-press cursor-pointer">
        <GitFork className="w-3.5 h-3.5" /> {forking ? "Forking..." : "Fork"}
      </button>
      <button onClick={handleExportGist} disabled={gisting} className="flex items-center gap-1 px-3 py-1.5 bg-black text-white text-xs font-bold border-2 border-black shadow-[2px_2px_0px_#000] neo-press cursor-pointer">
        <GithubIcon className="w-3.5 h-3.5" /> {gisting ? "Creating Gist..." : "Gist"}
      </button>
      <button onClick={handleDownload} className="flex items-center gap-1 px-3 py-1.5 bg-white text-black text-xs font-bold border-2 border-black shadow-[2px_2px_0px_#000] neo-press cursor-pointer hover:bg-neutral-100">
        <Download className="w-3.5 h-3.5" /> Save
      </button>
    </div>
  );
};

