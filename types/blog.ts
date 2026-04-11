export type BlogCategory = 
  | "All" 
  | "Machine Learning" 
  | "Deep Learning" 
  | "GenAI / LLMs" 
  | "System Design" 
  | "Case Studies"
  | "Agentic AI"
  | "Security"
  | "Deep Dive";

export interface BlogArticle {
  id: string;
  title: string;
  description: string;
  tags: BlogCategory[];
  readTime: string;
  publishedAt: string;
  popularityScore: number;
  isFeatured: boolean;
  content: React.ReactNode | string;
  coverImage?: string;
  githubLink?: string;
  substackLink?: string;
  mediumLink?: string;
}
