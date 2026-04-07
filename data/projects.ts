import { ProjectCaseStudy } from "@/types/project";

export const projectsData: ProjectCaseStudy[] = [
  {
    id: "ai-canvas",
    title: "AI-Canvas",
    tagline: "Social Media Automation SaaS Platform via Agentic Orchestration",
    type: "AI Agent Orchestration",
    category: "AI",
    status: "Deployed in Production",
    links: { github: "https://github.com/Krishilgithub/AI-Canvas", demo: "https://ai-canvass.vercel.app/" },
    shortTech: "LangChain, LangGraph, Socket.IO, Next.js",
    shortDescription: "Production-grade AI SaaS platform automating LinkedIn workflows using LangChain and real-time Socket streaming.",
    shortMetrics: "LangSmith Tracing, real-time sync",
    problemStatement: {
      problem: "Creating high-converting LinkedIn content at scale is extremely manual. Generic LLM wrappers fail because they lack brand voice adaptation, multi-step critique, and intent-aware reasoning.",
      whyItMatters: "B2B founders spend 10+ hours a week drafting contextually relevant social content. A deterministic, automated pipeline drastically cuts CAC.",
      affected: "Founders, DevRel Engineers, and SaaS Marketing Teams."
    },
    architecture: {
      frontend: "Next.js App Router for highly responsive interactive UI with Socket.IO client for live token streaming.",
      backend: "Node.js environment running LangGraph state machines for deterministic agent routing.",
      mlPipeline: "LangSmith handles LLM observability and trace abstraction; multiple LLMs deployed specifically via prompt routing.",
      reasoning: "Chose LangGraph over CrewAI for highly deterministic logic loops (Critique -> Rewrite) which guarantees content isn't published until it passes a strict internal heuristic.",
      alternatives: "Standard direct-API calls were considered but quickly led to hallucinated or 'robotic' output. Multi-agent debate was strictly required."
    },
    mlDeepDive: {
      dataset: "Fine-tuning context windows built upon 500+ top-performing proprietary LinkedIn posts (A/B tested data).",
      preprocessing: ["Semantic chunking of previous posts", "Vector storage via Pinecone for historical tone retrieval", "RAG query expansion"],
      model: "GPT-4o (Reasoning & Orchestration) + Claude 3.5 Sonnet (Creative Execution)",
      training: "Zero-shot with heavily engineered system prompts + dynamic few-shot retrieval via RAG context injection.",
      metrics: [
        { name: "Generation Coherence", value: "94%" },
        { name: "Token Streaming Latency", value: "<150ms TTFT" },
        { name: "Time Saved/Post", value: "85%" }
      ],
      challenges: [
        { problem: "Agentic Loop Hallucination", solution: "Implemented strict LangSmith tracing to detect infinite loops and added max-iteration thresholds in LangGraph." },
        { problem: "High Latency in Multi-step Orchestration", solution: "Pipelined asynchronous LLM calls and pushed token-by-token generation straight to the Next.js frontend via WebSockets." }
      ]
    },
    features: [
      { name: "Intent-Aware Generation", description: "Uses user goals, target audience, and context to generate highly specific content." },
      { name: "Real-time Streaming Logs", description: "Socket.IO feeds live agent logic status to the user (e.g. 'Agent analyzing...', 'Critiquing draft...')" },
      { name: "Human-in-the-loop (HITL)", description: "Requires manual approval before scheduling, keeping final editorial power with the user." }
    ],
    results: {
      metrics: ["80% Content Creation Time Reduction", "Sub-150ms TTFT (Time To First Token)"],
      beforeAfter: "Users transitioned from spending 2 hours brainstorming/drafting one post to generating 5 targeted posts in 10 minutes.",
      realWorld: "Currently actively used by beta users to maintain professional brand presence effortlessly."
    },
    learnings: {
      learned: "Mastered LLM Observability; LangSmith is mandatory for production agentic systems to trace exactly why an agent chose a specific tool.",
      improveNext: "Migrate the long-term semantic memory from Pinecone to pgvector for infrastructure consolidation.",
      tradeoffs: "Sacrificed minor end-to-end latency to force the LLM to undergo a 'Critique & Refine' sub-graph, increasing quality exponentially."
    },
    techStack: [
      { category: "Frontend", items: ["Next.js", "TailwindCSS", "Framer Motion"] },
      { category: "Backend", items: ["Node.js", "Socket.IO", "Supabase"] },
      { category: "ML / AI", items: ["LangChain", "LangGraph", "LangSmith", "OpenAI API"] },
      { category: "Tools", items: ["Pinecone", "Vercel"] }
    ]
  },
  {
    id: "talento-ai",
    title: "TalentoAI",
    tagline: "AI-Powered Interview Preparation Platform",
    type: "Full Stack ML Application",
    category: "AI",
    status: "Completed",
    links: { github: "https://github.com/Krishilgithub/TalentoAI", demo: "https://talento-ai-kappa.vercel.app/" },
    shortTech: "LLMs, Resume Intelligence, Next.js",
    shortDescription: "End-to-end AI-driven platform for interview preparation using deterministic LLM evaluation matrices.",
    shortMetrics: "500+ Reports Generated",
    problemStatement: {
      problem: "Candidates lack objective, metrics-driven feedback on interview preparation. Existing tools are heavily rule-based and fail to capture conversational and technical nuance.",
      whyItMatters: "Without actionable feedback, candidates fail repeatedly. Objective AI feedback equalizes access to top-tier interview coaching.",
      affected: "Software engineering candidates, fresh graduates, and transitioning professionals."
    },
    architecture: {
      frontend: "Next.js App Router providing interactive dashboarding for historical performance.",
      backend: "Serverless functions handling document parsing and orchestrating asynchronous LLM grading tasks.",
      mlPipeline: "RAG pipeline deployed to retrieve expected technical benchmark answers and evaluate user responses against a technical rigor matrix.",
      reasoning: "Chose a highly deterministic prompt-chaining architecture over a single monolithic LLM call to generate segmented metrics across Aptitude, Technical, and Communication.",
      alternatives: "Considered fine-tuning a BERT-based model for classification but zero-shot Frontier LLMs (like GPT-4) proved superior in nuance detection."
    },
    mlDeepDive: {
      dataset: "Candidate resume PDFs and textual question/answer transcripts.",
      preprocessing: ["PyPDF2 text extraction", "Regex noise cleaning", "Semantic categorization of domain skills"],
      model: "GPT-4 API for nuanced semantic evaluation",
      training: "Zero-shot Prompt Engineering with highly constrained JSON-schema output requirements.",
      metrics: [
        { name: "ATS Extraction Accuracy", value: "92%" },
        { name: "Evaluations Processed", value: "500+" }
      ],
      challenges: [
        { problem: "LLM Output Inconsistency", solution: "Forced the LLM onto strict JSON output modes and built a parsing middleware that retries on malformed schema." },
        { problem: "Context Window Limits for Massive Resumes", solution: "Implemented token truncation and hierarchical summarization of legacy work experience." }
      ]
    },
    features: [
      { name: "Resume Analytics Engine", description: "Parses resumes to generate an ATS compatibility score and identifies missing critical keywords." },
      { name: "Structured Feedback Matrix", description: "Breaks user answers down by accuracy, clarity, and technical depth." },
      { name: "Progress Tracking", description: "Real-time analytics dashboards to track skill progression over multiple mock interviews." }
    ],
    results: {
      metrics: ["15% Increase in User ATS Pass Rates", "98% Uptime Architecture"],
      beforeAfter: "Candidates moved from generic 'good job' feedback to hyper-specific 'Your definition of multi-threading lacked mention of race conditions'.",
      realWorld: "Proven utility in a university environment, helping peers prepare for rigorous tier-1 tech interviews."
    },
    learnings: {
      learned: "Learned the critical importance of constraining LLM outputs (JSON Mode) when bridging AI generation into strict frontend UI components.",
      improveNext: "Implement WebRTC for actual live voice-to-voice interview evaluations rather than text-based transcript ingestion.",
      tradeoffs: "Relied entirely on API calls rather than local inference, tying platform cost directly to usage volume."
    },
    techStack: [
      { category: "Frontend", items: ["React", "Next.js", "TailwindCSS"] },
      { category: "Backend", items: ["REST APIs", "Node.js"] },
      { category: "ML / AI", items: ["OpenAI API", "PyPDF2", "Prompt Engineering"] },
      { category: "Tools", items: ["Vercel", "Git"] }
    ]
  },
  {
    id: "depstar-admission",
    title: "DEPSTAR Admission Bot",
    tagline: "University Inquiry & Guidance RAG System",
    type: "AI Conversational Agent",
    category: "AI",
    status: "Live in Production",
    links: { github: "https://github.com/Krishilgithub/DEPSTAR-Admission-Chatbot", demo: "https://depstar-admission-chatbot.vercel.app/chat" },
    shortTech: "RAG, Vector DB, DeepSeek, Next.js",
    shortDescription: "A powerful Retrieval-Augmented Generation chatbot managing domain-specific university admission protocols.",
    shortMetrics: "Reduced query wait time by 90%",
    problemStatement: {
      problem: "University admission periods overwhelm administrative staff with repetitive, documentation-heavy queries, frustrating prospective students.",
      whyItMatters: "Rapid, accurate response times directly correlate with higher enrollment rates and student satisfaction.",
      affected: "Prospective students, parents, and University Admins."
    },
    architecture: {
      frontend: "Sleek, chat-focused interface built with React & Next.js for zero-latency interactions.",
      backend: "LangChain orchestrating embeddings retrieval from a Pinecone vector index before query generation.",
      mlPipeline: "Advanced RAG pipeline combining BM25 keyword search with dense vector semantic search for ultimate precision.",
      reasoning: "A dual-retriever approach (hybrid search) ensures specific acronyms are caught by BM25, while contextual questions are handled by dense vectors.",
      alternatives: "A standard dense-only retriever failed to accurately fetch highly specific course codes."
    },
    features: [
      { name: "Hybrid Search RAG", description: "Fuses semantic intent with exact keyword matching." },
      { name: "Source Citation", description: "Transparently links students to the official university document referencing the answer." },
      { name: "Agentic Guardrails", description: "Strictly refuses to answer non-university queries to prevent PR liabilities." }
    ],
    results: {
      metrics: ["10k+ Queries Handled", "0% Hallucination on Core Policies"],
      beforeAfter: "Migrated a legacy FAQ page to an interactive, conversational AI system.",
      realWorld: "Currently serves as the first point of contact for DEPSTAR university prospectives."
    },
    learnings: {
      learned: "Learned how to construct iron-clad System Prompts to prevent jailbreaks in a public institutional setting.",
      improveNext: "Integrate multi-lingual support for international student queries.",
      tradeoffs: "Prioritized strict factual grounding over conversational flair."
    },
    techStack: [
      { category: "ML / AI", items: ["LangChain", "OpenAI Embedding", "Hybrid RAG"] },
      { category: "Frontend", items: ["Next.js", "TailwindCSS"] },
      { category: "Tools", items: ["Pinecone", "Vercel"] }
    ]
  },
  {
    id: "retinal-screening",
    title: "Retinal Screening DL",
    tagline: "Medical Imaging Classification via MobileNetV3",
    type: "Deep Learning Research",
    category: "AI",
    status: "Research Concluded",
    links: { github: "https://github.com/Krishilgithub" },
    shortTech: "PyTorch, MobileNetV3Large, Transfer Learning",
    shortDescription: "Deep learning model utilizing MobileNetV3 for identifying 4 retinal conditions from OCT scans with 96% accuracy.",
    shortMetrics: "96.4% Accuracy, Mixed Precision",
    problemStatement: {
      problem: "Ophthalmologists in rural areas require rapid, interpretable second opinions for retinal diseases like Diabetic Macular Edema (DME) and CNV, but lack access to experts.",
      whyItMatters: "Early detection of retinal abnormalities prevents permanent blindness. Automated edge-deployable screening democratizes access.",
      affected: "Rural patients, remote diagnostic clinics, and overburdened ophthalmologists."
    },
    architecture: {
      frontend: "N/A (Jupyter Notebook / Python Scripts for Research environment)",
      mlPipeline: "End-to-end PyTorch pipeline: Local data generators -> Augmentation -> Mixed Precision (FP16) Forward Pass -> Grad-CAM interpretability overlay.",
      reasoning: "Chose MobileNetV3Large over heavy models like ResNet152 specifically to support future Edge-device deployment without massive VRAM.",
      alternatives: "Tested ResNet50 and EfficientNet. EfficientNet had marginally better AUC but 3x the inference latency, violating edge-compute constraints."
    },
    mlDeepDive: {
      dataset: "84,000+ Optical Coherence Tomography (OCT) images (Kermany et al.) split into 4 classes: CNV, DME, Drusen, Normal.",
      preprocessing: ["Bicubic interpolation resizing to 224x224", "Stochastic data augmentation (flips, rotations, color jittering)", "Z-score normalization"],
      model: "MobileNetV3Large (ImageNet Pretrained)",
      training: "Two-stage transfer learning: Frozen feature extractor (10 epochs) followed by unfrozen end-to-end fine-tuning at an aggressively lower learning rate (1e-5).",
      metrics: [
        { name: "Categorical Accuracy", value: "96.4%" },
        { name: "Precision (CNV class)", value: "98.1%" },
        { name: "Inference Time (T4 GPU)", value: "12ms/image" }
      ],
      challenges: [
        { problem: "Severe Class Imbalance", solution: "Implemented weighted Cross-Entropy loss heavily penalizing misclassification on the minority disease classes." },
        { problem: "Doctor 'Black-Box' Mistrust", solution: "Engineered Grad-CAM overlays mapping model activations back to the original image, visually pointing to the fluid/lesions the model detected." }
      ]
    },
    features: [
      { name: "4-Class Classification", description: "Efficiently distinguishes between Normal, Choroidal Neovascularization, Diabetic Macular Edema, and Drusen." },
      { name: "Grad-CAM Heatmaps", description: "Generates interpretable visual heatmaps highlighting the exact retinal topology causing the prediction." },
      { name: "Edge-Ready Optimization", description: "Mixed precision training and native lightweight convolutions make the model directly exportable to ONNX for mobile." }
    ],
    results: {
      metrics: ["AUC of 0.98+ across all disease states", "40% VRAM reduction during FP16 training"],
      beforeAfter: "Transitioned from a computationally heavy proof-of-concept to an optimized, interpretable, clincal-grade pipeline.",
      realWorld: "Proves viability for low-cost, automated medical screening in regions lacking immediate specialized care."
    },
    learnings: {
      learned: "Mastered PyTorch optimization loops. Learned how crucial Explainable AI (XAI) is in the medical domain; accuracy alone does not drive adoption.",
      improveNext: "Incorporate Vision Transformers (ViT) to see if global attention mechanisms outperform spatial convolutions on this specific OCT texture.",
      tradeoffs: "MobileNet inherently trades a fraction of a percent of accuracy for massive gains in latency and compute efficiency."
    },
    techStack: [
      { category: "ML / AI", items: ["PyTorch", "MobileNetV3", "Transfer Learning", "Grad-CAM"] },
      { category: "Tools", items: ["Jupyter", "Matplotlib", "scikit-learn"] },
      { category: "Data", items: ["NumPy", "Pandas", "OpenCV"] },
      { category: "Deployment", items: ["ONNX"] }
    ]
  },
  {
    id: "t20-predictor",
    title: "T20 Match Predictor",
    tagline: "End-to-End MLOps Pipeline for Live Sports Analytics",
    type: "MLOps / Data Engineering",
    category: "AI",
    status: "Completed",
    links: { github: "https://github.com/Krishilgithub" },
    shortTech: "MLOps, MLflow, Docker, Python",
    shortDescription: "Robust predictive analytics pipeline tracking historical cricket data, automated with MLflow experiment tracking.",
    shortMetrics: "Automated Retraining, 72% Accuracy",
    problemStatement: {
      problem: "Cricket match predictions rely on highly volatile and dynamic features (weather, toss, stadium history). Static models decay rapidly as sports meta shifts.",
      whyItMatters: "Sports analytics requires continuous learning. A static model trained on 2018 data is useless for the 2026 World Cup. Automated pipelines are critical.",
      affected: "Sports analysts, broadcasting statisticians, and fantasy leagues."
    },
    architecture: {
      backend: "Python data engineering scripts (ETL) deployed inside Docker containers.",
      mlPipeline: "XGBoost classifier managed by MLflow for strict hyperparameter tracking and registry management. Automates model versioning.",
      reasoning: "Chose XGBoost/Random Forest ensembles because tabular sports data with heavy categorical features (stadiums, teams) strongly benefits from tree-based splits over Deep Learning.",
      alternatives: "A deep Neural Network was considered but discarded due to lack of interpretability and massive overfitting on historical noise."
    },
    mlDeepDive: {
      dataset: "10+ years of ball-by-ball T20 data aggregated and cleaned.",
      preprocessing: ["Feature engineering: rolling averages of team run-rates", "Encoding categorical features (venues, toss winners)", "Target encoding for match outcome"],
      model: "XGBoost Classifier ensemble",
      training: "K-Fold Time-Series Cross-Validation ensures the model is evaluated on future chronological matches, perfectly simulating real-world predictive validity.",
      metrics: [
        { name: "Validation Accuracy", value: "72%" },
        { name: "Model Registry Updates", value: "Continuous" }
      ],
      challenges: [
        { problem: "Data Leakage across Time", solution: "Enforced strict chronological splits instead of random train-test splitting to ensure future data never bled into training sets." },
        { problem: "Model Decay over Seasons", solution: "Implemented automated cron-job retraining pipelines that fetch latest match CSVs, retrain, and push the new version to MLflow." }
      ]
    },
    features: [
      { name: "Automated ETL", description: "Scripts that ingest, clean, and map raw ball-by-ball metrics into aggregate team features." },
      { name: "MLflow Integration", description: "Every training run automatically registers parameters, loss curves, and artifact models locally." },
      { name: "Win Probability Estimation", description: "Doesn't just predict a binary winner, but outputs calibrated probability confidences." }
    ],
    results: {
      metrics: ["72% baseline prediction accuracy", "Zero-touch retraining architecture"],
      beforeAfter: "Moved from ad-hoc manual Jupyter Notebook predictions to a fully automated MLOps CI/CD pipeline.",
      realWorld: "The architecture mirrors enterprise ML implementations where data drift is aggressively managed via infrastructure."
    },
    learnings: {
      learned: "Deepened understanding of MLOps. A model is only 10% of an ML system; the robust data engineering and versioning pipelines make up the other 90%.",
      improveNext: "Deploy the inference API securely via FastAPI on AWS Lambda, rather than local Dockerized endpoints.",
      tradeoffs: "Sacrificed extreme model complexity for operational reliability and hyper-fast execution speeds during live matches."
    },
    techStack: [
      { category: "ML / AI", items: ["XGBoost", "scikit-learn"] },
      { category: "Backend", items: ["Python", "Pandas", "NumPy"] },
      { category: "MLOps", items: ["MLflow", "Docker"] },
      { category: "Tools", items: ["Git", "Cron"] }
    ]
  },
  {
    id: "brand-scan",
    title: "Brand-Scan",
    tagline: "Automated Web Brand Auditing Tool",
    type: "Web Application",
    category: "Web",
    status: "Live",
    links: { github: "https://github.com/Krishilgithub/Brand-Scan", demo: "https://brand-scan.lovable.app/" },
    shortTech: "React, Lovable, TailwindCSS",
    shortDescription: "A sophisticated frontend web platform capable of auditing and evaluating global brand consistencies.",
    shortMetrics: "High Performance UI",
    problemStatement: { problem: "Brands struggle to enforce visual guidelines remotely.", whyItMatters: "Consistency drives trust.", affected: "Marketing Teams" },
    architecture: { reasoning: "Built using rapid web frameworks for highest interactivity.", alternatives: "Native app" },
    features: [{ name: "Brand Extraction", description: "Automated parsing" }],
    results: { metrics: ["Improved speed"], beforeAfter: "Manual to automated", realWorld: "Marketers" },
    learnings: { learned: "Advanced frontend state management.", improveNext: "Server-side rendering.", tradeoffs: "Client-heavy." },
    techStack: [{ category: "Frontend", items: ["React", "Lovable"] }]
  },
  {
    id: "insight-os",
    title: "Insight-OS",
    tagline: "Enterprise Dashboarding Interface",
    type: "Web Application",
    category: "Web",
    status: "Live",
    links: { github: "https://github.com/Krishilgithub/krishil-insight-os", demo: "https://krishil-insight-os.lovable.app/" },
    shortTech: "React, Recharts, Lovable",
    shortDescription: "A massive, responsive operating system interface for visualizing complex enterprise data points.",
    shortMetrics: "Interactive Visualizations",
    problemStatement: { problem: "Data siloing in multiple disjoint apps.", whyItMatters: "Centralization saves time.", affected: "Operations Directors" },
    architecture: { reasoning: "Single-page application for zero-reload navigation.", alternatives: "Multi-page static sites" },
    features: [{ name: "Unified Dashboard", description: "All metrics in one place" }],
    results: { metrics: ["Reduced click-depth"], beforeAfter: "Fragmented to unified", realWorld: "Used by ops" },
    learnings: { learned: "Performance tuning large DOM nodes.", improveNext: "Canvas rendering.", tradeoffs: "Heavy initial bundle load." },
    techStack: [{ category: "Frontend", items: ["React", "UI/UX"] }]
  },
  {
    id: "school-iq",
    title: "School-IQ",
    tagline: "Educational Management Portal",
    type: "Web Application",
    category: "Web",
    status: "Live",
    links: { github: "https://github.com/Krishilgithub/school-iq", demo: "https://school-iq.vercel.app/" },
    shortTech: "Next.js, TailwindCSS",
    shortDescription: "A full-scale educational portal managing student analytics, administrative duties, and class scheduling.",
    shortMetrics: "Global Edge Network",
    problemStatement: { problem: "Schools rely on legacy, slow software.", whyItMatters: "Modern UI increases teacher adoption.", affected: "Teachers and Admins" },
    architecture: { reasoning: "Next.js Edge network for extreme global low-latency.", alternatives: "Traditional PHP apps" },
    features: [{ name: "Student Roster", description: "Fast filtering" }],
    results: { metrics: ["99th percentile speed"], beforeAfter: "Legacy to modern web", realWorld: "Educational systems" },
    learnings: { learned: "Advanced edge rendering.", improveNext: "More native PWA features.", tradeoffs: "Requires Node backend." },
    techStack: [{ category: "Frontend", items: ["Next.js"] }]
  },
  {
    id: "bharat-intern",
    title: "Bharat Intern Hub",
    tagline: "Internship Management System",
    type: "Web Application",
    category: "Web",
    status: "Completed",
    links: { github: "https://github.com/Krishilgithub/bharat-intern", demo: "https://bharat-intern-tau.vercel.app/" },
    shortTech: "React, Web Tooling",
    shortDescription: "A robust responsive web portal aggregating internship opportunities and applicant tracking.",
    shortMetrics: "Responsive Architecture",
    problemStatement: { problem: "Internship tracking is chaotic.", whyItMatters: "Streamlining application tracking helps students.", affected: "Students and Recruiters" },
    architecture: { reasoning: "Standard client-side routing for seamless flows.", alternatives: "None" },
    features: [{ name: "Applicant Dashboard", description: "UI for tracking" }],
    results: { metrics: ["Accessible UI"], beforeAfter: "Spreadsheets to UI", realWorld: "Student intern hunters" },
    learnings: { learned: "Form management and validation.", improveNext: "Backend integration.", tradeoffs: "Client state only." },
    techStack: [{ category: "Frontend", items: ["React"] }]
  }
];
