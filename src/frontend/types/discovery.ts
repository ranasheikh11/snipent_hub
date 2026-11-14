export type DiscoveryMode = "ALL" | "TRENDING" | "POPULAR" | "PACKAGES" | "LEADERBOARD";

export interface LeaderboardEntry {
  rank: number;
  author: string;
  authorId?: string;
  avatar?: string;
  githubUsername?: string;
  totalStars: number;
  totalCopies: number;
  snippetCount: number;
  topTech: string[];
  score: number;
  badge: string;
}

export interface PackageItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  technology: string;
  category: string;
  tags: string[];
  author: string;
  starsCount: number;
  snippetIds?: string[];
}

