"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Code2, BookOpen, Star } from "lucide-react";
import { GithubIcon } from "@/frontend/components/ui/GithubIcon";
import { useAuth } from "@/frontend/hooks/useAuth";

interface ProfileUserData {
  name?: string;
  email?: string;
  avatar?: string;
  bio?: string;
  githubUsername?: string;
  snippetCount?: number;
  blogCount?: number;
  totalStars?: number;
  createdAt?: string;
}

export const ProfileHeader: React.FC<{ profileUser: ProfileUserData | null }> = ({ profileUser }) => {
  const { user: currentUser } = useAuth();
  const name = profileUser?.name || "Developer";
  const isOwner = Boolean(
    currentUser?.id &&
      (currentUser.id === (profileUser as any)?._id || currentUser.id === (profileUser as any)?.id)
  );
  const avatarSrc =
    profileUser?.avatar && profileUser.avatar.length > 0
      ? profileUser.avatar
      : `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}&backgroundColor=7c3aed`;

  const joinYear = profileUser?.createdAt
    ? new Date(profileUser.createdAt).getFullYear()
    : null;

  return (
    <div className="w-full bg-[#F5F3FF] border-b-2 border-black py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-black hover:text-[#7C3AED] border border-black bg-white px-2.5 py-1 shadow-[2px_2px_0px_#000] mb-5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Explore
        </Link>

        <div className="bg-white border-2 border-black shadow-[6px_6px_0px_#000] p-6">
          {/* Top row: avatar + info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-xl bg-[#F5F3FF] border-2 border-black relative overflow-hidden shrink-0 shadow-[3px_3px_0px_#7C3AED]">
              <Image
                src={avatarSrc}
                alt={name}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-black uppercase text-black leading-none tracking-tight">
                {name}
              </h1>
              {isOwner && profileUser?.email && (
                <p className="text-xs font-mono text-neutral-500 mt-1 flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {profileUser.email}
                </p>
              )}
              {profileUser?.githubUsername && (
                <a
                  href={`https://github.com/${profileUser.githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#7C3AED] hover:underline mt-1"
                >
                  <GithubIcon className="w-3 h-3" /> @{profileUser.githubUsername}
                </a>
              )}
              {profileUser?.bio && (
                <p className="text-xs font-mono mt-2 text-neutral-700 bg-[#F5F3FF] px-3 py-2 border border-black/20 max-w-lg">
                  {profileUser.bio}
                </p>
              )}
            </div>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t-2 border-black/10">
            <StatBadge icon={<Code2 className="w-3.5 h-3.5" />} label="Snippets" value={profileUser?.snippetCount ?? 0} color="bg-[#7C3AED] text-white" />
            <StatBadge icon={<BookOpen className="w-3.5 h-3.5" />} label="Blogs" value={profileUser?.blogCount ?? 0} color="bg-black text-white" />
            <StatBadge icon={<Star className="w-3.5 h-3.5" />} label="Stars" value={profileUser?.totalStars ?? 0} color="bg-amber-400 text-black" />
            {joinYear && (
              <div className="flex items-center gap-1.5 px-3 py-1 border border-black/20 bg-neutral-50 text-xs font-mono text-neutral-600">
                Member since {joinYear}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function StatBadge({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black uppercase ${color}`}>
      {icon} {value} {label}
    </div>
  );
}
