"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Code, ExternalLink, X, ChevronRight, Activity, Database, Server } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

const projects = [
  {
    title: "AI-Canvas",
    tech: "LangChain, LangGraph, Socket.IO, Next.js",
    description: "Production-grade AI SaaS platform that automates end-to-end LinkedIn content workflows. Features multi-layer AI orchestration for intent-aware generation and real-time streaming.",
    metrics: "LangSmith Tracing, Human-in-the-loop, Real-time event streaming",
    deepDive: {
      problem: "Creating high-converting LinkedIn content requires understanding user intent, adapting to brand voice, and structuring multi-stage agentic workflows without hallucinations.",
      architecture: [
        "Backend: LangGraph orchestrates a multi-step workflow (Research -> Draft -> Review -> Refine).",
        "LLMs: GPT-4o for complex reasoning, Claude 3.5 Sonnet for creative final pass.",
        "Streaming: WebSockets (Socket.IO) push token-by-token generation to the Next.js client for perceived zero-latency."
      ],
      results: "Reduced content creation time by 80%. Achieved high coherence using LangSmith to trace and debug agent hallucination loops.",
      link: "#"
    }
  },
  {
    title: "TalentoAI",
    tech: "LLMs, Resume Intelligence, Next.js",
    description: "End-to-end AI-driven platform for interview preparation. Structured LLM workflows evaluate candidate responses across technical and communication domains with ATS scoring.",
    metrics: "Resume Parsing, Analytics Dashboards",
    deepDive: {
      problem: "Candidates lack objective, metrics-driven feedback on interview preparation. Existing tools are rule-based and fail to understand contextual nuances in technical answers.",
      architecture: [
        "Ingestion: PyPDF2 / OCR pipeline extracts structured semantics from raw candidate resumes.",
        "Evaluation: RAG pipeline retrieves expected benchmark answers and strictly evaluates user input against technical rigor matrices.",
        "Frontend: Next.js App Router with heavily state-managed interactive dashboarding."
      ],
      results: "Generated 500+ structured evaluation reports. Improved candidate ATS pass rates by utilizing highly deterministic LLM prompts.",
      link: "#"
    }
  },
  {
    title: "T20 Match Predictor",
    tech: "MLOps, Docker, Python",
    description: "End-to-end machine learning pipeline predicting match outcomes using historical cricket data. Robust data engineering workflows with experiment tracking.",
    metrics: "Data Ingestion pipelines, Automated Retraining",
    deepDive: {
      problem: "Cricket match predictions rely on highly volatile features (weather, toss, stadium history). Static models decay rapidly as new seasons begin.",
      architecture: [
        "Data Engineering: Automated scraping and processing of 10+ years of ball-by-ball T20 data.",
        "Model: XGBoost / Random Forest trained on rolling aggregate features.",
        "MLOps: Dockerized inference endpoints. MLflow utilized for strict hyperparameter tracking and model registry."
      ],
      results: "Achieved 72% prediction accuracy on unseen datasets. Pipeline supports automated retraining cron jobs yielding model decay resilience.",
      link: "#"
    }
  },
  {
    title: "Retinal Screening",
    tech: "MobileNetV3Large, Transfer Learning",
    description: "Designed a deep learning classification model using MobileNetV3Large to identify 4 retinal conditions. Engineered an evaluation framework with ROC/AUC curves.",
    metrics: "Mixed precision training, Grad-CAM interpretability",
    deepDive: {
      problem: "Ophthalmologists require rapid, interpretable second-opinions for identifying conditions like Diabetic Retinopathy from OCT scans.",
      architecture: [
        "Model: MobileNetV3Large utilizing Transfer Learning from ImageNet, optimized for edge-inference speed.",
        "Interpretability: Implemented Grad-CAM to generate visual heatmaps, explicitly showing doctors which retinal features triggered the classification.",
        "Optimization: Mixed precision (FP16) training reduced VRAM usage by 40%."
      ],
      results: "Categorical Accuracy of 96.4%. ROC/AUC proved clinical viability. Built deployment-ready ONNX graph.",
      link: "#"
    }
  }
];

export type ProjectData = typeof projects[0];

function TiltCard({ project, onClick }: { project: ProjectData, onClick: (p: ProjectData) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onClick={() => onClick(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="group relative bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-white/5 hover:border-red-500/30 overflow-hidden flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <span className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-mono tracking-widest uppercase shadow-sm">
            {project.tech}
          </span>
          
          <div className="flex gap-3">
            <button className="p-3 bg-white/5 hover:bg-white text-gray-400 hover:text-black rounded-full transition-all duration-300 pointer-events-auto">
              <Code size={20} />
            </button>
            <button className="p-3 bg-white/5 hover:bg-red-600 text-gray-400 hover:text-white rounded-full transition-all duration-300 pointer-events-auto">
              <ExternalLink size={20} />
            </button>
          </div>
        </div>

        <h3 className="font-outfit text-3xl md:text-4xl font-bold mb-4 group-hover:text-red-50 transition-colors" style={{ transform: "translateZ(60px)" }}>
          {project.title}
        </h3>
        
        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-auto pb-8" style={{ transform: "translateZ(30px)" }}>
          {project.description}
        </p>

        <div className="border-t border-white/10 pt-6 mt-auto" style={{ transform: "translateZ(20px)" }}>
          <p className="text-sm font-medium text-gray-300">
            <span className="text-red-500 mr-2">✦</span>
            {project.metrics}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#0a0a0a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* HEADER SECTION */}
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-outfit text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6"
          >
            Selected Work<span className="text-red-500">.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl"
          >
            Production AI Systems & Research. Click any project to view architectural deep dives and model evaluations.
          </motion.p>
        </div>

        {/* 2x2 PROJECT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full cursor-pointer">
          {projects.map((project, index) => (
            <TiltCard key={index} project={project} onClick={setSelectedProject} />
          ))}
        </div>

      </div>

      {/* DEEP DIVE MODAL SYSTEM */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 backdrop-blur-md bg-black/60"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              data-lenis-prevent="true"
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#111] border border-white/10 rounded-[2rem] shadow-2xl custom-scrollbar"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white text-gray-300 hover:text-black rounded-full transition-all duration-300 z-50"
              >
                <X size={24} />
              </button>

              <div className="p-8 md:p-14">
                <span className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-xs font-mono tracking-widest uppercase mb-8 inline-block">
                  Case Study
                </span>
                
                <h2 className="font-outfit text-4xl md:text-6xl font-bold mb-6 text-white">
                  {selectedProject.title}
                </h2>
                
                <p className="text-xl text-gray-400 font-light max-w-3xl mb-12 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                  
                  {/* Left Column: Problem & Results */}
                  <div className="lg:col-span-2 flex flex-col gap-10">
                    <div className="bg-white/5 border border-white/5 rounded-3xl p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Activity className="text-red-500" size={24} />
                        <h3 className="text-2xl font-bold font-outfit">The Problem</h3>
                      </div>
                      <p className="text-gray-400 leading-relaxed text-lg">
                        {selectedProject.deepDive?.problem}
                      </p>
                    </div>

                    <div className="bg-green-500/5 border border-green-500/10 rounded-3xl p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Database className="text-green-500" size={24} />
                        <h3 className="text-2xl font-bold font-outfit">Metrics & Results</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-lg font-medium">
                        {selectedProject.deepDive?.results}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Architecture */}
                  <div className="bg-white/5 border border-white/5 rounded-3xl p-8 lg:col-span-1 h-fit">
                    <div className="flex items-center gap-3 mb-6">
                      <Server className="text-blue-400" size={24} />
                      <h3 className="text-2xl font-bold font-outfit">Architecture</h3>
                    </div>
                    
                    <ul className="flex flex-col gap-4">
                      {selectedProject.deepDive?.architecture.map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-gray-400 items-start">
                          <ChevronRight className="text-red-500 mt-1 flex-shrink-0" size={18} />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <a 
                      href={selectedProject.deepDive?.link}
                      className="mt-10 px-6 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition-colors flex justify-center items-center gap-2 w-full shadow-lg"
                    >
                      View Live Deployment <ExternalLink size={18} />
                    </a>
                  </div>
                  
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
