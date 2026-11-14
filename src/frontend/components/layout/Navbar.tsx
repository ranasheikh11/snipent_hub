"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../../public/logo-full.png";
import { BrutalistButton } from "@/frontend/components/ui/BrutalistButton";
import { useAuth } from "@/frontend/hooks/useAuth";
import { AuthModal } from "@/frontend/components/auth/AuthModal";
import { QuestionNotificationBell } from "./QuestionNotificationBell";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { Plus, Terminal, BookOpen, Users, LogOut, User, Video, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenNewSnippet: () => void;
  onOpenQuickNotes: () => void;
  onSelectSnippetNotification?: (snippetId: string, questionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNewSnippet, onOpenQuickNotes, onSelectSnippetNotification,
}) => {
  const { user, logout } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b-2 border-black sticky top-0 z-50 shadow-[0_2px_0px_#000]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 border-2 border-black bg-white shadow-[2px_2px_0px_#000] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
          </button>

          <Link href="/" className="flex items-center group py-1" title="SnippetHub">
            <Image
              src={logoImg} alt="SnippetHub" priority
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-5">
          <Link href="/" className="text-xs font-black uppercase tracking-wider text-black hover:text-[#7C3AED]">
            Snippets
          </Link>
          <Link href="/blogs" className="text-xs font-black uppercase tracking-wider text-black hover:text-[#7C3AED] flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> Blogs
          </Link>
          <Link href="/communities" className="text-xs font-black uppercase tracking-wider text-black hover:text-[#7C3AED] flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> Communities
          </Link>
          <Link href="/courses" className="text-xs font-black uppercase tracking-wider text-black hover:text-[#7C3AED] flex items-center gap-1">
            <Video className="w-3.5 h-3.5 text-red-600" /> Courses
          </Link>
          <button onClick={onOpenQuickNotes} className="text-xs font-black uppercase tracking-wider text-black hover:text-[#7C3AED] flex items-center gap-1 cursor-pointer">
            <Terminal className="w-3.5 h-3.5" /> Notes
          </button>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {user ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <QuestionNotificationBell onSelectNotification={onSelectSnippetNotification} />
              <Link
                href={`/profile/${user.id}`}
                className="hidden sm:flex text-xs font-mono font-bold uppercase bg-neutral-100 hover:bg-[#F5F3FF] px-2.5 py-1 border border-black items-center gap-1 cursor-pointer"
                title="View My Profile"
              >
                <User className="w-3 h-3 text-[#7C3AED]" /> <span className="max-w-[100px] truncate">{user.name}</span>
              </Link>
              <button onClick={() => logout()} title="Logout" className="hidden sm:block p-1.5 border border-black hover:bg-neutral-100 cursor-pointer">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsAuthOpen(true)} className="text-xs font-mono font-bold uppercase hover:underline cursor-pointer px-1.5 sm:px-2">
              Log In
            </button>
          )}

          <BrutalistButton
            variant="primary" size="sm"
            onClick={() => { if (!user) { setIsAuthOpen(true); return; } onOpenNewSnippet(); }}
            className="flex items-center gap-1 bg-[#7C3AED] text-white hover:bg-[#6D28D9] px-2 sm:px-3 text-[11px] sm:text-xs"
          >
            <Plus className="w-3.5 h-3.5" /> <span className="hidden xs:inline sm:inline">Post Code</span><span className="inline xs:hidden sm:hidden">Post</span>
          </BrutalistButton>
        </div>
      </div>

      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenNewSnippet={() => { if (!user) { setIsAuthOpen(true); return; } onOpenNewSnippet(); }}
        onOpenQuickNotes={onOpenQuickNotes}
        onOpenLogin={() => setIsAuthOpen(true)}
      />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
};
