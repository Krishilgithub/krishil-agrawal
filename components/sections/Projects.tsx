"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Code, ExternalLink } from "lucide-react";
import React, { useRef, useState } from "react";

import { ProjectCaseStudyModal } from "./ProjectCaseStudyModal";
import { ProjectCaseStudy } from "@/types/project";
import { projectsData } from "@/data/projects";

function TiltCard({ project, onClick }: { project: ProjectCaseStudy, onClick: (p: ProjectCaseStudy) => void }) {
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
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        onClick={() => {
          // Only open modal if it has a problem statement (deep dive)
          if(project.problemStatement.problem.length > 0) {
            onClick(project);
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className={`group relative bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-white/5 hover:border-red-500/30 overflow-hidden flex flex-col h-full ${project.problemStatement.problem.length > 0 ? "cursor-pointer" : "cursor-default"}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <span className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-mono tracking-widest uppercase shadow-sm">
              {project.shortTech}
            </span>
            
            <div className="flex gap-3">
              {project.links.github && project.links.github !== "#" && (
                <button 
                  onClick={(e) => { e.stopPropagation(); window.open(project.links.github, "_blank"); }}
                  className="p-3 bg-white/5 hover:bg-white text-gray-400 hover:text-black rounded-full transition-all duration-300 pointer-events-auto"
                >
                  <Code size={20} />
                </button>
              )}
              {project.links.demo && project.links.demo !== "#" && (
                <button 
                  onClick={(e) => { e.stopPropagation(); window.open(project.links.demo, "_blank"); }}
                  className="p-3 bg-white/5 hover:bg-red-600 text-gray-400 hover:text-white rounded-full transition-all duration-300 pointer-events-auto"
                >
                  <ExternalLink size={20} />
                </button>
              )}
            </div>
          </div>

          <h3 className="font-outfit text-3xl md:text-4xl font-bold mb-4 group-hover:text-red-50 transition-colors" style={{ transform: "translateZ(60px)" }}>
            {project.title}
          </h3>
          
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-auto pb-8" style={{ transform: "translateZ(30px)" }}>
            {project.shortDescription}
          </p>

          <div className="border-t border-white/10 pt-6 mt-auto" style={{ transform: "translateZ(20px)" }}>
            <p className="text-sm font-medium text-gray-300">
              <span className="text-red-500 mr-2">✦</span>
              {project.shortMetrics}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [filterCategory, setFilterCategory] = useState<"All" | "AI" | "Web">("All");

  const filteredProjects = projectsData.filter((project) => {
    if (filterCategory === "All") return true;
    return project.category === filterCategory;
  });

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#0a0a0a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* HEADER SECTION */}
        <div className="mb-12 md:mb-16 flex flex-col items-center text-center">
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

        {/* FILTER TOGGLES */}
        <div className="flex justify-center gap-3 md:gap-4 mb-16 flex-wrap">
          {(["All", "AI", "Web"] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all shadow-sm ${
                filterCategory === cat 
                  ? "bg-white text-black border border-white" 
                  : "bg-[#111] text-gray-400 border border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat} Projects
            </button>
          ))}
        </div>

        {/* 2x2 PROJECT GRID */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <TiltCard key={project.id || index} project={project} onClick={setSelectedProject} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* DEEP DIVE MODAL SYSTEM */}
      <ProjectCaseStudyModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
