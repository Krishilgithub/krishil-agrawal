"use client";

import { motion } from "framer-motion";
import { Code, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "AI-Canvas",
    tech: "LangChain, LangGraph, Socket.IO, Next.js",
    description: "Production-grade AI SaaS platform that automates end-to-end LinkedIn content workflows. Features multi-layer AI orchestration for intent-aware generation and real-time streaming.",
    metrics: "LangSmith Tracing, Human-in-the-loop, Real-time event streaming",
  },
  {
    title: "TalentoAI",
    tech: "LLMs, Resume Intelligence, Next.js",
    description: "End-to-end AI-driven platform for interview preparation. Structured LLM workflows evaluate candidate responses across technical and communication domains with ATS scoring.",
    metrics: "Resume Parsing, Analytics Dashboards",
  },
  {
    title: "T20 Match Predictor",
    tech: "MLOps, Docker, Python",
    description: "End-to-end machine learning pipeline predicting match outcomes using historical cricket data. Robust data engineering workflows with experiment tracking.",
    metrics: "Data Ingestion pipelines, Automated Retraining",
  },
  {
    title: "Retinal Screening",
    tech: "MobileNetV3Large, Transfer Learning",
    description: "Designed a deep learning classification model using MobileNetV3Large to identify 4 retinal conditions. Engineered an evaluation framework with ROC/AUC curves.",
    metrics: "Mixed precision training, Grad-CAM interpretability",
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-32 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* LEFT COLUMN: Sticky Header */}
        <div className="lg:col-span-4 flex flex-col h-full relative">
          <div className="sticky top-32 lg:pb-32">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-outfit text-5xl md:text-7xl font-extrabold tracking-tighter mb-6"
            >
              Selected <br /> Work<span className="text-red-500">.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg max-w-sm"
            >
              A showcase of my recent explorations in machine learning, agentic AI, and scalable engineering.
            </motion.p>
          </div>
        </div>

        {/* RIGHT COLUMN: Scrolling Cards */}
        <div className="lg:col-span-8 flex flex-col gap-12 md:gap-24 pt-10 lg:pt-0">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7 }}
              className="group relative bg-[#111] p-8 md:p-14 rounded-[2.5rem] border border-white/5 hover:border-red-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Card Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <span className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-mono tracking-widest uppercase">
                    {project.tech}
                  </span>
                  
                  <div className="flex gap-3">
                    {/* Placeholder for Source Code/Demo */}
                    <button className="p-3 bg-white/5 hover:bg-white text-gray-400 hover:text-black rounded-full transition-all duration-300 pointer-events-auto">
                      <Code size={20} />
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-red-600 text-gray-400 hover:text-white rounded-full transition-all duration-300 pointer-events-auto">
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </div>

                <h3 className="font-outfit text-3xl md:text-5xl font-bold mb-6 group-hover:text-red-50 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="border-t border-white/10 pt-6">
                  <p className="text-sm font-medium text-gray-300">
                    <span className="text-red-500 mr-2">✦</span>
                    {project.metrics}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
