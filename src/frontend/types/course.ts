export interface LectureItem {
  title: string;
  videoId: string;
  thumbnail: string;
  duration?: string;
  position: number;
}

export interface CourseItem {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  technology: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  youtubePlaylistId: string;
  channelTitle: string;
  author: string;
  authorId: string;
  lectures: LectureItem[];
  studentsCount: number;
  tags: string[];
  createdAt: string;
}

export interface YouTubePlaylistSummary {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  itemCount: number;
  channelTitle: string;
}

