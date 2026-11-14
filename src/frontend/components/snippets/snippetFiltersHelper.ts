import { SnippetItem, TopicFilter, SnippetScope, SortOption } from "@/frontend/types/snippet";

export function getTopicCounts(all: SnippetItem[]): Record<string, number> {
  const c: Record<string, number> = {
    ALL: all.length, FLUTTER: 0, BACKEND: 0, REACT: 0, NEXTJS: 0, FULLSTACK: 0, FAVORITES: 0,
  };
  all.forEach((s) => {
    const tech = (s.technology || "").toUpperCase();
    const cat = (s.category || "").toUpperCase();
    const tags = (s.tags || []).map((t) => t.toUpperCase());

    if (tech.includes("FLUTTER") || tags.some((t) => t.includes("FLUTTER"))) c.FLUTTER++;
    if (tech.includes("BACKEND") || tech.includes("NODE") || tech.includes("PYTHON") || cat.includes("BACKEND") || tags.includes("BACKEND")) c.BACKEND++;
    if (tech.includes("REACT") && !tech.includes("NEXT") || tags.includes("REACT")) c.REACT++;
    if (tech.includes("NEXT") || tags.some((t) => t.includes("NEXT"))) c.NEXTJS++;
    if (tech.includes("FULL") || cat.includes("FULL") || tags.includes("FULLSTACK")) c.FULLSTACK++;
    if ((s.starsCount || 0) > 0) c.FAVORITES++;
  });
  return c;
}

export function getLevelCounts(all: SnippetItem[]): Record<string, number> {
  const counts: Record<string, number> = { BEGINNER: 0, INTERMEDIATE: 0, ADVANCED: 0 };
  all.forEach((s) => {
    const lvl = (s.level || "BEGINNER").toUpperCase();
    if (counts[lvl] !== undefined) counts[lvl]++;
    else counts.BEGINNER++;
  });
  return counts;
}

export function filterSnippets(
  all: SnippetItem[],
  topic: TopicFilter,
  level: string,
  scope: SnippetScope,
  search: string,
  sort: SortOption = "STARS"
): SnippetItem[] {
  const filtered = all.filter((s) => {
    const sTech = (s.technology || "").toUpperCase();
    const sCat = (s.category || "").toUpperCase();
    const sTags = (s.tags || []).map((t) => t.toUpperCase());

    let matchTopic = true;
    if (topic === "ALL") matchTopic = true;
    else if (topic === "FAVORITES") matchTopic = (s.starsCount || 0) > 0;
    else if (topic === "FLUTTER") matchTopic = sTech.includes("FLUTTER") || sTags.some((t) => t.includes("FLUTTER"));
    else if (topic === "BACKEND") matchTopic = sTech.includes("BACKEND") || sTech.includes("NODE") || sTech.includes("PYTHON") || sCat.includes("BACKEND") || sTags.includes("BACKEND");
    else if (topic === "REACT") matchTopic = (sTech.includes("REACT") && !sTech.includes("NEXT")) || sTags.includes("REACT");
    else if (topic === "NEXTJS") matchTopic = sTech.includes("NEXT") || sTags.some((t) => t.includes("NEXT"));
    else if (topic === "FULLSTACK") matchTopic = sTech.includes("FULL") || sCat.includes("FULL") || sTags.includes("FULLSTACK");

    const matchLevel = !level || (s.level || "BEGINNER").toUpperCase() === level.toUpperCase();
    const matchScope = scope === "ALL" || (scope === "SINGLE" ? s.files.length === 1 : s.files.length >= 2);
    const q = search.toLowerCase().trim();
    const matchSearch = !q || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.technology.toLowerCase().includes(q) || s.files.some((f) => f.filename.toLowerCase().includes(q) || f.code.toLowerCase().includes(q));

    return matchTopic && matchLevel && matchScope && matchSearch;
  });

  return filtered.sort((a, b) => {
    if (sort === "LATEST") return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    if (sort === "COPIES") return (b.copyCount || 0) - (a.copyCount || 0);
    return (b.starsCount || 0) - (a.starsCount || 0);
  });
}
