"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  ArrowLeft, ExternalLink, Target, Zap, LayoutDashboard,
  ShieldCheck, BrainCircuit, BarChart, Server, Database,
  Share2, Check,
} from "lucide-react";
import { ProjectCaseStudy } from "@/types/project";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface TocItem { id: string; title: string; }

export function ProjectPageContent({ project }: { project: ProjectCaseStudy }) {
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [isTocOpen, setIsTocOpen] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const headings = useMemo<TocItem[]>(() => {
    const arr = [
      { id: "problem", title: "The Problem" },
      { id: "architecture", title: "Architecture" },
    ];
    if (project.mlDeepDive) arr.push({ id: "ml-deep-dive", title: "ML Deep Dive" });
    arr.push({ id: "features", title: "Core Features" });
    arr.push({ id: "results", title: "Results & Impact" });
    arr.push({ id: "learnings", title: "Learnings" });
    arr.push({ id: "tech-stack", title: "Tech Stack" });
    return arr;
  }, [project]);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.35;
      let cur = "";
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= threshold + 50) cur = h.id;
      }
      if (!cur && headings[0]) {
        const el = document.getElementById(headings[0].id);
        if (el && el.getBoundingClientRect().top > threshold) cur = headings[0].id;
      }
      if (cur && cur !== activeId) setActiveId(cur);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const tm = setTimeout(() => handleScroll(), 150);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(tm);
    };
  }, [headings, activeId]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (tocRef.current && !tocRef.current.contains(e.target as Node)) setIsTocOpen(false);
    };
    if (isTocOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isTocOpen]);

  const scrollToHeading = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveId(id);
    setIsTocOpen(false);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    } else {
      const el = document.createElement("input");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* Back to Projects — white pill, hover black */}
      <Link
        href="/projects"
        className="fixed top-5 left-8 z-40 flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-black hover:text-white hover:border-black text-gray-800 text-sm font-semibold rounded-full shadow-sm transition-all"
      >
        <ArrowLeft size={14} />
        Back to Projects
      </Link>

      {/* Share — white pill, hover black */}
      <button
        onClick={handleShare}
        className={`fixed top-5 right-8 z-40 flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full shadow-sm border transition-all ${
          copied
            ? "bg-green-50 border-green-200 text-green-700"
            : "bg-white border-gray-200 text-gray-700 hover:bg-black hover:text-white hover:border-black"
        }`}
      >
        {copied ? <><Check size={14} /> Copied!</> : <><Share2 size={14} /> Share</>}
      </button>

      {/* Hero Image Background */}
      <div className="relative">
        {project.heroImage && (
          <div className="absolute top-0 left-0 w-full h-[50vh] md:h-[60vh] z-0 pointer-events-none overflow-hidden">
            <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover object-top opacity-80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafa]/80 to-[#fafafa] pointer-events-none" />
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-20 pb-32">

          {/* SECTION 1: HERO */}
          <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mb-24 mt-8">
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-xs font-mono tracking-widest uppercase text-gray-700">
                {project.type}
              </span>
              <span className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-mono tracking-widest uppercase text-emerald-700">
                {project.status}
              </span>
            </div>

            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-black tracking-tighter leading-tight">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-light max-w-4xl leading-relaxed mb-10">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-4">
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noreferrer" className="px-6 py-3 bg-black text-white border border-black rounded-full font-bold hover:bg-gray-900 transition-colors flex items-center gap-2 text-base">
                  Live Deployment <ExternalLink size={18} />
                </a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noreferrer" className="px-6 py-3 bg-white text-black border border-gray-300 rounded-full font-bold hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center gap-2 text-base">
                  GitHub Repo <ExternalLink size={18} />
                </a>
              )}
            </div>
          </motion.div>

          {/* SECTION 2: PROBLEM STATEMENT */}
          <motion.div id="problem" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-16 pt-16 border-t border-gray-200 scroll-mt-24">
            <h3 className="text-red-500 font-mono tracking-widest uppercase text-xs font-bold mb-8 flex items-center gap-3">
              <Target size={16} /> The Problem
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              <h4 className="text-2xl md:text-3xl text-black font-medium leading-relaxed font-outfit">
                {project.problemStatement.problem}
              </h4>
              <div className="flex flex-col gap-6">
                <div>
                  <h5 className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-2">Why it matters</h5>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">{project.problemStatement.whyItMatters}</p>
                </div>
                <div>
                  <h5 className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-2">Who is affected</h5>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">{project.problemStatement.affected}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SECTION 3: ARCHITECTURE */}
          <motion.div id="architecture" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-16 pt-16 border-t border-gray-200 scroll-mt-24">
            <h3 className="text-blue-600 font-mono tracking-widest uppercase text-xs font-bold mb-8 flex items-center gap-3">
              <Server size={16} /> Architecture & System Design
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {project.architecture.frontend && (
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <LayoutDashboard className="text-gray-400 mb-4" size={24} />
                  <h5 className="text-black font-outfit text-xl font-bold mb-3">Frontend</h5>
                  <p className="text-gray-500 text-base leading-relaxed">{project.architecture.frontend}</p>
                </div>
              )}
              {project.architecture.backend && (
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <Server className="text-gray-400 mb-4" size={24} />
                  <h5 className="text-black font-outfit text-xl font-bold mb-3">Backend Processing</h5>
                  <p className="text-gray-500 text-base leading-relaxed">{project.architecture.backend}</p>
                </div>
              )}
              {project.architecture.mlPipeline && (
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <BrainCircuit className="text-gray-400 mb-4" size={24} />
                  <h5 className="text-black font-outfit text-xl font-bold mb-3">ML Pipeline</h5>
                  <p className="text-gray-500 text-base leading-relaxed">{project.architecture.mlPipeline}</p>
                </div>
              )}
            </div>
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h5 className="text-black font-outfit text-xl font-bold mb-3">Architectural Reasoning</h5>
                  <p className="text-gray-500 text-base leading-relaxed">{project.architecture.reasoning}</p>
                </div>
                <div>
                  <h5 className="text-black font-outfit text-xl font-bold mb-3">Alternatives Considered</h5>
                  <p className="text-gray-500 text-base leading-relaxed">{project.architecture.alternatives}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SECTION 4: ML DEEP DIVE */}
          {project.mlDeepDive && (
            <motion.div id="ml-deep-dive" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-16 pt-16 border-t border-gray-200 scroll-mt-24">
              <h3 className="text-violet-600 font-mono tracking-widest uppercase text-xs font-bold mb-8 flex items-center gap-3">
                <Database size={16} /> ML & Technical Deep Dive
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                <div className="lg:col-span-8 bg-violet-50 p-8 rounded-3xl border border-violet-100 flex flex-col justify-center">
                  <h5 className="text-black font-outfit text-2xl font-bold mb-5">Model Selection & Training</h5>
                  <div className="mb-5">
                    <span className="text-violet-500 font-mono text-xs uppercase tracking-widest">Core Architecture</span>
                    <p className="text-xl text-black font-medium mt-1">{project.mlDeepDive.model}</p>
                  </div>
                  <div>
                    <span className="text-violet-500 font-mono text-xs uppercase tracking-widest">Training Methodology</span>
                    <p className="text-base text-gray-600 mt-1 leading-relaxed">{project.mlDeepDive.training}</p>
                  </div>
                </div>
                <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-center">
                  <h5 className="text-black font-outfit text-xl font-bold mb-3">Dataset</h5>
                  <p className="text-gray-500 text-base leading-relaxed">{project.mlDeepDive.dataset}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                  <h5 className="text-black font-outfit text-xl font-bold mb-5">Preprocessing Pipeline</h5>
                  <ul className="flex flex-col gap-3">
                    {project.mlDeepDive.preprocessing.map((step, idx) => (
                      <li key={idx} className="flex gap-4 text-gray-600 items-start">
                        <span className="text-gray-300 font-mono text-sm font-bold mt-1">.0{idx + 1}</span>
                        <span className="leading-relaxed text-base">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                  <h5 className="text-black font-outfit text-xl font-bold mb-6">Evaluation Metrics</h5>
                  <div className="grid grid-cols-2 gap-6">
                    {project.mlDeepDive.metrics.map((metric, idx) => (
                      <div key={idx}>
                        <h4 className="font-outfit text-3xl md:text-4xl font-black text-black mb-2">{metric.value}</h4>
                        <span className="text-gray-400 font-mono text-[10px] uppercase tracking-widest">{metric.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-red-50 p-8 rounded-3xl border border-red-100 mt-6">
                <h5 className="text-black font-outfit text-xl font-bold mb-6 flex items-center gap-3">
                  <Zap size={20} className="text-red-500" /> Technical Challenges
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.mlDeepDive.challenges.map((challenge, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <div className="text-red-600 font-bold text-base">Problem: {challenge.problem}</div>
                      <div className="text-gray-600 leading-relaxed text-base">
                        <strong className="text-black">Solution:</strong> {challenge.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* SECTION 5: FEATURES */}
          <motion.div id="features" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-16 pt-16 border-t border-gray-200 scroll-mt-24">
            <h3 className="text-gray-400 font-mono tracking-widest uppercase text-xs font-bold mb-8 flex items-center gap-3">
              <LayoutDashboard size={16} /> Core Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.features.map((feature, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition-all">
                  <h5 className="text-black font-outfit text-xl font-bold mb-3">{feature.name}</h5>
                  <p className="text-gray-500 text-base leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SECTION 6: RESULTS */}
          <motion.div id="results" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-16 pt-16 border-t border-gray-200 scroll-mt-24">
            <h3 className="text-emerald-600 font-mono tracking-widest uppercase text-xs font-bold mb-8 flex items-center gap-3">
              <BarChart size={16} /> Results & Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <h4 className="text-3xl md:text-5xl text-black font-medium leading-tight font-outfit mb-6">
                  {project.results.beforeAfter}
                </h4>
                <p className="text-gray-500 text-lg leading-relaxed">{project.results.realWorld}</p>
              </div>
              <div className="flex flex-col gap-6">
                {project.results.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
                    <h4 className="text-xl md:text-2xl font-outfit font-bold text-black leading-tight">{metric}</h4>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* SECTION 7: LEARNINGS */}
          <motion.div id="learnings" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-16 pt-16 border-t border-gray-200 scroll-mt-24">
            <h3 className="text-amber-600 font-mono tracking-widest uppercase text-xs font-bold mb-8 flex items-center gap-3">
              <ShieldCheck size={16} /> Takeaways & Learnings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                <h5 className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-3">What I Learned</h5>
                <p className="text-gray-600 text-base leading-relaxed">{project.learnings.learned}</p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                <h5 className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-3">Trade-Offs Made</h5>
                <p className="text-gray-600 text-base leading-relaxed">{project.learnings.tradeoffs}</p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                <h5 className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-3">Future Improvements</h5>
                <p className="text-gray-600 text-base leading-relaxed">{project.learnings.improveNext}</p>
              </div>
            </div>
          </motion.div>

          {/* SECTION 8: TECH STACK */}
          <motion.div id="tech-stack" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-16 pt-16 border-t border-gray-200 scroll-mt-24">
            <h3 className="text-gray-400 font-mono tracking-widest uppercase text-xs font-bold mb-8 flex items-center gap-3">
              <Database size={16} /> Tech Stack Foundation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.techStack.map((group, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <h5 className="text-black font-outfit text-lg font-bold mb-4">{group.category}</h5>
                  <ul className="flex flex-col gap-3">
                    {group.items.map((tech, tIdx) => (
                      <li key={tIdx} className="text-gray-500 font-medium text-base flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SECTION 9: FOOTER CTA */}
          <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="pt-16 pb-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-outfit text-2xl md:text-4xl font-bold mb-2 text-black">Interested in this architecture?</h2>
              <p className="text-gray-500">Let&apos;s talk about how I can build something similar for your team.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/projects" className="px-6 py-3 bg-white text-black border border-gray-300 rounded-full font-bold hover:bg-gray-50 transition-all flex items-center gap-2 whitespace-nowrap">
                <ArrowLeft size={16} /> All Projects
              </Link>
              <Link href="/#contact" className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-red-600 transition-all flex items-center gap-2 whitespace-nowrap shadow-xl">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Bottom Navigator */}
      <div ref={tocRef} className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[150] flex flex-col items-center">
        <AnimatePresence>
          {isTocOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-[320px] md:w-[360px] mb-3 bg-[#0a0a0a] text-gray-400 border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col font-outfit"
            >
              <div className="px-6 py-4 text-[11px] font-bold tracking-widest text-[#777] uppercase border-b border-white/5">
                Navigate Section
              </div>
              <div className="overflow-y-auto p-2 flex flex-col gap-1 max-h-[50vh]">
                <button
                  onClick={() => scrollToHeading(headings[0]?.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm ${
                    !activeId ? "bg-[#222] text-white font-medium" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }`}
                >
                  Top
                </button>
                {headings.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => scrollToHeading(h.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm ${
                      activeId === h.id
                        ? "bg-red-600 text-white font-bold shadow-lg"
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                    }`}
                  >
                    {h.title}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsTocOpen(!isTocOpen)}
          className="bg-[#0a0a0a] hover:bg-black border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] text-white rounded-full h-12 px-5 flex items-center justify-between gap-6 transition-all duration-300 min-w-[280px] font-outfit"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-1.5 h-1.5 bg-white rounded-full shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="text-sm font-medium truncate max-w-[200px]">
              {activeId ? headings.find(h => h.id === activeId)?.title : "Sections"}
            </span>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" className={`shrink-0 transition-transform duration-500 ${isTocOpen ? "rotate-90" : "-rotate-90"}`}>
            <circle cx="10" cy="10" r="8" stroke="#4b5563" strokeWidth="2" fill="none" />
            <motion.circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" style={{ pathLength: scrollYProgress }} />
          </svg>
        </button>
      </div>
    </div>
  );
}
