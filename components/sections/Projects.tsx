"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code, ExternalLink, ArrowUpRight, Briefcase } from "lucide-react";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { ProjectCaseStudyModal } from "./ProjectCaseStudyModal";
import { ProjectCaseStudy } from "@/types/project";
import { projectsData } from "@/data/projects";

/* ── Tag colour maps ─────────────────────────────────────────────── */
const catClsDark: Record<string, string> = {
  AI:  "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Web: "bg-sky-500/10 text-sky-400 border-sky-500/20",
};
const catClsLight: Record<string, string> = {
  AI:  "bg-violet-50 text-violet-700 border-violet-200",
  Web: "bg-sky-50 text-sky-700 border-sky-200",
};

/* ════════════════════════════════════════════════════════════════
   TILT CARD — dual theme (dark = /projects page, light = landing)
════════════════════════════════════════════════════════════════ */
export function TiltCard({
  project,
  onClick,
  dark = true,
}: {
  project: ProjectCaseStudy;
  onClick: (p: ProjectCaseStudy) => void;
  dark?: boolean;
}) {
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
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };
  const hasModal = project.problemStatement?.problem?.length > 0;

  // ── Theme token objects ────────────────────────────────────────
  const t = dark
    ? {
        card:    "bg-[#111] border-white/5 hover:border-red-500/30",
        glow:    "from-red-600/5 to-transparent",
        tech:    "bg-red-500/10 text-red-400 border-red-500/20",
        catCls:  catClsDark,
        title:   "text-white group-hover:text-red-50",
        type:    "text-gray-500",
        desc:    "text-gray-400",
        divider: "border-white/10",
        metric:  "text-gray-300",
        arrow:   "text-gray-500 group-hover:text-red-400",
        btnGh:   "bg-white/5 hover:bg-white text-gray-400 hover:text-black",
        btnDm:   "bg-white/5 hover:bg-red-600 text-gray-400 hover:text-white",
      }
    : {
        card:    "bg-white border-gray-200 hover:border-red-400/40 shadow-sm hover:shadow-xl",
        glow:    "from-red-600/5 to-transparent",
        tech:    "bg-red-50 text-red-600 border-red-200",
        catCls:  catClsLight,
        title:   "text-black group-hover:text-red-600",
        type:    "text-gray-400",
        desc:    "text-gray-500",
        divider: "border-gray-100",
        metric:  "text-gray-700",
        arrow:   "text-gray-400 group-hover:text-red-500",
        btnGh:   "bg-gray-50 hover:bg-black text-gray-500 hover:text-white border border-gray-200",
        btnDm:   "bg-gray-50 hover:bg-red-600 text-gray-500 hover:text-white border border-gray-200",
      };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35 }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        onClick={() => hasModal && onClick(project)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group relative p-8 md:p-10 rounded-[2.5rem] border overflow-hidden flex flex-col h-full transition-all duration-300 ${t.card} ${hasModal ? "cursor-pointer" : "cursor-default"}`}
      >
        {/* top accent bar on hover */}
        <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 via-red-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        <div className={`absolute inset-0 bg-gradient-to-br ${t.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

        <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
          {/* Top row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1.5 border rounded-full text-xs font-bold tracking-widest uppercase ${t.catCls[project.category] ?? ""}`}>
                {project.category}
              </span>
              <span className={`px-3 py-1.5 border rounded-full text-xs font-mono tracking-widest uppercase ${t.tech}`}>
                {project.shortTech.split(",")[0].trim()}
              </span>
            </div>
            <div className="flex gap-2.5 shrink-0">
              {project.links.github && project.links.github !== "#" && (
                <button
                  onClick={(e) => { e.stopPropagation(); window.open(project.links.github, "_blank"); }}
                  className={`p-2.5 rounded-full transition-all duration-300 ${t.btnGh}`}
                >
                  <Code size={17} />
                </button>
              )}
              {project.links.demo && project.links.demo !== "#" && (
                <button
                  onClick={(e) => { e.stopPropagation(); window.open(project.links.demo, "_blank"); }}
                  className={`p-2.5 rounded-full transition-all duration-300 ${t.btnDm}`}
                >
                  <ExternalLink size={17} />
                </button>
              )}
            </div>
          </div>

          {/* Type label */}
          <p className={`text-xs font-bold uppercase tracking-[0.15em] mb-3 ${t.type}`} style={{ transform: "translateZ(30px)" }}>
            {project.type}
          </p>

          {/* Title */}
          <h3
            className={`font-outfit text-2xl md:text-3xl font-bold mb-4 transition-colors ${t.title}`}
            style={{ transform: "translateZ(60px)" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className={`text-base leading-relaxed mb-auto pb-8 ${t.desc}`} style={{ transform: "translateZ(30px)" }}>
            {project.shortDescription}
          </p>

          {/* Metric stripe */}
          <div className={`border-t pt-5 mt-auto flex items-center justify-between ${t.divider}`} style={{ transform: "translateZ(20px)" }}>
            <p className={`text-sm font-medium ${t.metric}`}>
              <span className="text-red-500 mr-2">✦</span>
              {project.shortMetrics}
            </p>
            {hasModal && (
              <span className={`text-xs font-semibold flex items-center gap-1 transition-colors ${t.arrow}`}>
                Case Study <ArrowUpRight size={12} />
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   LANDING PAGE TEASER — LIGHT THEME
   Top 3 projects + "View all X" CTA
════════════════════════════════════════════════════════════════ */
export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const teaserProjects = projectsData.slice(0, 3);

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest mb-5"
            >
              <Briefcase size={12} /> Projects
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-outfit text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-black leading-[1.05]"
            >
              Projects<span className="text-red-500">.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-gray-500 text-lg max-w-xl leading-relaxed"
            >
              Production AI systems &amp; research. Click any project to explore
              full architectural case studies.
            </motion.p>
          </div>

          {/* View all — desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block shrink-0"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-black text-black text-sm font-bold hover:bg-black hover:text-white transition-all duration-200"
            >
              View all projects
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </div>

        {/* 3-card DARK grid on light bg */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 w-full mb-14">
          {teaserProjects.map((project) => (
            <TiltCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
              dark={false}
            />
          ))}
        </div>

        {/* View all CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-black text-white text-sm font-bold hover:bg-red-600 transition-colors duration-200"
          >
            Explore all {projectsData.length} projects
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </Link>
          <span className="text-xs text-gray-400 font-medium">
            AI Agents · RAG Systems · ML Pipelines · LLM Engineering
          </span>
        </motion.div>
      </div>

      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
