export interface MLDeepDive {
  dataset: string;
  preprocessing: string[];
  model: string;
  training: string;
  metrics: { name: string; value: string }[];
  challenges: { problem: string; solution: string }[];
}

export interface ArchitectureData {
  frontend?: string;
  backend?: string;
  mlPipeline?: string;
  diagramLayout?: string[];
  reasoning: string;
  alternatives: string;
}

export interface TechStackGroup {
  category: "Frontend" | "Backend" | "ML / AI" | "Tools" | "Data" | "Deployment" | "MLOps";
  items: string[];
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  tagline: string;
  type: string;
  status: string;
  category: "AI" | "Web";
  heroImage?: string;
  links: {
    demo?: string;
    github?: string;
    docs?: string;
  };
  problemStatement: {
    problem: string;
    whyItMatters: string;
    affected: string;
  };
  architecture: ArchitectureData;
  mlDeepDive?: MLDeepDive;
  features: { name: string; description: string }[];
  results: { metrics: string[]; beforeAfter: string; realWorld: string };
  learnings: { learned: string; improveNext: string; tradeoffs: string };
  techStack: TechStackGroup[];
  
  // Legacy fields to feed the minimalist TiltCard grid in Projects.tsx
  shortTech: string;
  shortDescription: string;
  shortMetrics: string;
}
