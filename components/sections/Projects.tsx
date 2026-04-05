"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "TalentoAI",
    tech: "LangChain, Next.js",
    description: "An AI orchestration tool leveraging LangChain and Next.js for scalable AI workflows.",
  },
  {
    title: "FlowMind",
    tech: "LangGraph, n8n",
    description: "Multi-agent autonomous system built using LangGraph and workflow automation via n8n.",
  },
  {
    title: "SENTINEL",
    tech: "Python, Scikit-learn",
    description: "Financial fraud detection ML pipeline trained on massive anonymized transaction datasets.",
  },
  {
    title: "T20 Match Predictor",
    tech: "MLOps, Docker",
    description: "End-to-end MLOps pipeline using Docker to predict ICC T20 World Cup Match outcomes.",
  },
  {
    title: "Retinal Screening",
    tech: "MobileNetV3Large, Grad-CAM",
    description: "Deep learning model utilizing MobileNetV3Large and Grad-CAM for explainable retinal disease screening.",
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 bg-[#111] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="font-outfit text-5xl md:text-7xl font-extrabold tracking-tighter">
            Selected <br className="hidden md:block"/> Work<span className="text-red-500">.</span>
          </h2>
          <p className="text-gray-400 max-w-md text-lg">
            A showcase of my recent explorations in machine learning, agentic AI, and scalable engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative bg-[#1a1a1a] p-8 md:p-12 rounded-[2rem] border border-white/10 hover:border-red-500/50 transition-colors overflow-hidden ${index === 0 ? "md:col-span-2" : ""}`}
            >
              {/* Hover effect background reveal */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">
                      {project.tech}
                    </span>
                    <button className="p-3 bg-white/5 rounded-full group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                      <ArrowUpRight size={20} />
                    </button>
                  </div>
                  <h3 className="font-outfit text-3xl md:text-4xl font-bold mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                    {project.description}
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
