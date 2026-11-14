"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/frontend/hooks/useAuth";
import { BookOpen, Users, Video, Terminal, User, LogOut, Plus } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenNewSnippet: () => void;
  onOpenQuickNotes: () => void;
  onOpenLogin: () => void;
}

export const MobileNavDrawer: React.FC<Props> = ({
  isOpen, onClose, onOpenNewSnippet, onOpenQuickNotes, onOpenLogin,
}) => {
  const { user, logout } = useAuth();
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-b-3 border-black bg-[#F5F3FF] p-4 space-y-4 shadow-[0_6px_0px_#000] animate-in slide-in-from-top-2 duration-150">
      <nav className="grid grid-cols-2 gap-2">
        <Link
          href="/"
          onClick={onClose}
          className="p-2.5 bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#FDFBF7]"
        >
          <span>⚡</span> <span>Snippets</span>
        </Link>
        <Link
          href="/courses"
          onClick={onClose}
          className="p-2.5 bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#FDFBF7]"
        >
          <Video className="w-4 h-4 text-red-600" /> <span>Courses</span>
        </Link>
        <Link
          href="/communities"
          onClick={onClose}
          className="p-2.5 bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#FDFBF7]"
        >
          <Users className="w-4 h-4 text-[#7C3AED]" /> <span>Spaces</span>
        </Link>
        <Link
          href="/blogs"
          onClick={onClose}
          className="p-2.5 bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#FDFBF7]"
        >
          <BookOpen className="w-4 h-4 text-amber-600" /> <span>Blogs</span>
        </Link>
      </nav>

      <div className="flex items-center gap-2">
        <button
          onClick={() => { onClose(); onOpenQuickNotes(); }}
          className="flex-1 p-2 bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Terminal className="w-3.5 h-3.5" /> <span>Quick Notes</span>
        </button>
        <button
          onClick={() => { onClose(); onOpenNewSnippet(); }}
          className="flex-1 p-2 bg-[#7C3AED] text-white border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> <span>Post Code</span>
        </button>
      </div>

      <div className="border-t-2 border-black pt-3 flex items-center justify-between">
        {user ? (
          <>
            <Link
              href={`/profile/${user.id}`}
              onClick={onClose}
              className="text-xs font-mono font-bold uppercase bg-white px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span className="line-clamp-1 max-w-[150px]">{user.name}</span>
            </Link>
            <button
              onClick={() => { onClose(); logout(); }}
              className="text-xs font-mono font-bold uppercase bg-neutral-100 hover:bg-red-50 text-red-600 px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> <span>Logout</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => { onClose(); onOpenLogin(); }}
            className="w-full py-2 bg-black text-white text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            Log In / Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

