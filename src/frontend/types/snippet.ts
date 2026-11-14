export interface SnippetFile {
  filename: string;
  language: string;
  code: string;
  purpose?: string;
}

export interface SnippetItem {
  id: string;
  title: string;
  description: string;
  category: string;
  technology: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  files: SnippetFile[];
  author: string;
  authorId?: string;
  isPublic: boolean;
  copyCount: number;
  starsCount: number;
  starredBy?: string[];
  questions?: any[];
  createdAt: string;
}

export type TopicFilter = "ALL" | "FLUTTER" | "BACKEND" | "REACT" | "NEXTJS" | "FULLSTACK" | "FAVORITES";
export type SnippetScope = "ALL" | "SINGLE" | "MULTI";
export type SortOption = "STARS" | "LATEST" | "COPIES";
