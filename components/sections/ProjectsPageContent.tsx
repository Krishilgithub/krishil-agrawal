"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, ArrowLeft, Search, X, Layers, Zap, Globe,
} from "lucide-react";
import Link from "next/link";
import { TiltCard } from "./Projects";
import { ProjectCaseStudy } from "@/types/project";
import { projectsData } from "@/data/projects";

type FilterCat = "All" | "AI" | "Web";

const filters: { label: string; value: FilterCat; icon: React.ReactNode }[] = [
  { label: "All Projects", value: "All", icon: <Layers size={13} /> },
  { label: "AI / ML",      value: "AI",  icon: <Zap size={13} /> },
  { label: "Web",          value: "Web", icon: <Globe size={13} /> },
];

const stats = [
  { v: `${projectsData.length}+`,                                                        l: "Projects built" },
  { v: `${projectsData.filter(p => p.category === "AI").length}`,                        l: "AI / ML systems" },
  { v: `${projectsData.filter(p => p.status?.includes("Production")).length}+`,          l: "In production" },
  { v: "2026",                                                                            l: "Most recent" },
];

export function ProjectsPageContent() {
  const [filterCat, setFilterCat]   = useState<FilterCat>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return projectsData.filter((p) => {
      const matchCat = filterCat === "All" || p.category === filterCat;
      const q = searchQuery.toLowerCase();
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.shortTech.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [filterCat, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* ── STICKY TOP NAV ──────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>

          {/* Inline search — desktop */}
          <div className="hidden md:flex relative w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-black pl-10 pr-9 py-2 rounded-full text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-gray-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X size={13} />
              </button>
            )}
          </div>

          <span className="text-xs font-medium text-gray-400 hidden sm:block">
            {projectsData.length} projects
          </span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-32">

        {/* ── PAGE HERO ───────────────────────────────────────────── */}
        <div className="mb-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Briefcase size={12} /> Selected Work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-outfit text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tighter text-black mb-6 leading-[1.05]"
          >
            All Projects by{" "}
            <span className="text-red-500">Krishil Agrawal</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Production AI systems, ML pipelines, agentic workflows, and full-stack
            builds — each with a full architectural case study.
          </motion.p>
        </div>

        {/* ── STATS ROW ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-6 mb-16 pb-16 border-b border-gray-200"
        >
          {stats.map((s) => (
            <div key={s.l} className="flex items-baseline gap-2">
              <span className="font-outfit text-2xl font-extrabold text-black">{s.v}</span>
              <span className="text-xs text-gray-500 font-medium">{s.l}</span>
            </div>
          ))}
        </motion.div>

        {/* ── CONTROLS ────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-10">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilterCat(f.value)}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-bold border transition-all duration-200 ${
                  filterCat === f.value
                    ? "bg-black text-white border-black shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:shadow-sm"
                }`}
              >
                {f.icon} {f.label}
              </button>
            ))}
          </div>

          {/* Mobile search */}
          <div className="flex md:hidden relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 text-black pl-10 pr-9 py-2.5 rounded-full text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-gray-400 shadow-sm font-medium"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Active filter badge */}
        <AnimatePresence>
          {(filterCat !== "All" || searchQuery) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 mb-8 overflow-hidden"
            >
              <span className="text-sm text-gray-500">
                <span className="font-bold text-black">{filtered.length}</span>{" "}
                project{filtered.length !== 1 ? "s" : ""} found
              </span>
              <button
                onClick={() => { setFilterCat("All"); setSearchQuery(""); }}
                className="flex items-center gap-1 text-xs font-semibold text-red-600 border border-red-200 rounded-full px-3 py-1 bg-red-50 hover:bg-red-100 transition-colors"
              >
                <X size={10} /> Clear
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid divider */}
        {filtered.length > 0 && (
          <div className="flex items-center gap-4 mb-8">
            <span className="font-outfit text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
              {filterCat === "All" ? "All Projects" : `${filterCat} Projects`}
            </span>
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium text-gray-400">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* ── LIGHT-THEME PROJECT GRID ─────────────────────────────── */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 mb-24">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <TiltCard
                key={project.id}
                project={project}
                dark={false}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── EMPTY STATE ─────────────────────────────────────────── */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24 text-center flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-5">
              <Briefcase size={28} className="text-gray-300" />
            </div>
            <h3 className="font-outfit text-2xl font-bold text-black mb-2">No projects found.</h3>
            <p className="text-gray-500 mb-6">Try a different category or clear your search.</p>
            <button
              onClick={() => { setFilterCat("All"); setSearchQuery(""); }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-red-600 transition-colors"
            >
              <X size={14} /> Clear filters
            </button>
          </motion.div>
        )}

        {/* ── BOTTOM CTA ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#0a0a0a] rounded-[2rem] p-10 md:p-14 border border-white/5 overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-violet-600/10 pointer-events-none" />
          <div className="relative z-10">
            <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-red-500 mb-4">
              Open to Collaborate
            </div>
            <h2 className="font-outfit text-2xl md:text-3xl font-extrabold text-white mb-4">
              Interested in working together?
            </h2>
            <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
              I&apos;m always looking for interesting ML engineering, agentic AI, or RAG system challenges. Let&apos;s build something production-grade.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-red-600 text-white text-sm font-bold hover:bg-red-500 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </motion.div>

        {/* SEO hidden block */}
        <div className="sr-only" aria-hidden="true">
          <p>
            Krishil Agrawal&apos;s AI and ML project portfolio. Production AI systems including agentic workflows,
            RAG pipelines, LLM engineering, and full-stack ML applications. Keywords: ML Engineer projects, AI portfolio,
            RAG system, agentic AI, LangGraph, LangChain, computer vision, Krishil Agrawal projects.
          </p>
        </div>
      </div>

    </div>
  );
}
