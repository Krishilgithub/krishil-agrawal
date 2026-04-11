"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ArrowLeft, Clock, Calendar, BrainCircuit, Share2, Check, ExternalLink } from "lucide-react";
import { BlogArticle } from "@/types/blog";
import { GraphRagDiagram1 } from "@/components/blogs/GraphRagDiagram1";
import { GraphRagDiagram2 } from "@/components/blogs/GraphRagDiagram2";
import { GraphRagDiagram3 } from "@/components/blogs/GraphRagDiagram3";
import { LlmMemoryDiagram } from "@/components/blogs/LlmMemoryDiagram";
import {
  OneHotDiagram,
  EmbeddingSpaceDiagram,
  DecisionFlowchart,
  VecEmbTable,
  EvoTimeline,
  VecEmbOpinion,
} from "@/components/blog/VecEmbDiagrams";

interface TocItem { id: string; title: string; level: number; }

export function BlogPageContent({ blog }: { blog: BlogArticle }) {
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [isTocOpen, setIsTocOpen] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Extract headings from content
  const headings = useMemo<TocItem[]>(() => {
    if (typeof blog.content !== "string") return [];
    const blocks = blog.content.split("\n\n");
    const out: TocItem[] = [];
    blocks.forEach(block => {
      const t = block.trim();
      if (t.startsWith("## ") || t.startsWith("### ")) {
        const first = t.split("\n")[0];
        const title = first.replace(/#/g, "").trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        out.push({ id, title, level: first.startsWith("### ") ? 3 : 2 });
      }
    });
    return out;
  }, [blog]);

  // Track active heading on scroll
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
    // Run once on mount to establish initial
    const tm = setTimeout(() => handleScroll(), 150);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(tm);
    };
  }, [headings, activeId]);

  // Close TOC on outside click
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
    const url = `${window.location.origin}/blogs/${blog.id}`;
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

  const formatText = (text: string) => {
    let t = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    t = t.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    return t.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-red-600 font-mono text-sm">$1</code>');
  };

  const renderContent = (text: string) => {
    const codeBlocks: string[] = [];
    const textWithoutCode = text.replace(/```[\s\S]*?```/g, (match) => {
      codeBlocks.push(match);
      return `__CODEBLOCK_${codeBlocks.length - 1}__`;
    });

    const blocks = textWithoutCode.trim().split("\n\n");

    return blocks.map((block, index) => {
      const trimmedBlock = block.trim();

      const codeMatch = trimmedBlock.match(/^__CODEBLOCK_(\d+)__$/);
      if (codeMatch) {
        const codeIndex = parseInt(codeMatch[1], 10);
        const actualCodeBlock = codeBlocks[codeIndex];
        const lines = actualCodeBlock.split("\n");
        const codeText = lines.slice(1, lines.length - 1).join("\n");
        return (
          <div key={index} className="my-8 rounded-2xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl">
            <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/5 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <pre className="p-6 text-sm md:text-base text-gray-300 font-mono overflow-x-auto">
              <code>{codeText}</code>
            </pre>
          </div>
        );
      }

      if (trimmedBlock === "__STAT_BAR__") {
        return (
          <div key={index} className="bg-[#1a1916] text-white p-8 rounded-2xl flex flex-col md:flex-row gap-8 overflow-x-auto my-12">
            {[["80%","RAG failures trace back to ingestion & chunking, not the LLM"],["87%","Accuracy from adaptive chunking vs 13% for fixed-size baselines (MDPI, 2025)"],["70%","Retrieval lift from semantic chunking over naive baselines"],["2,500","Token \"context cliff\" where response quality drops sharply (Chroma, 2025)"]].map(([val, desc], i) => (
              <div key={i} className="flex-1 min-w-[160px] md:border-r last:border-r-0 border-white/10 md:pr-8">
                <div className="font-outfit text-4xl md:text-5xl font-bold text-red-500 mb-2">{val}</div>
                <div className="text-sm text-white/50 leading-relaxed tracking-wide">{desc}</div>
              </div>
            ))}
          </div>
        );
      }

      if (trimmedBlock === "__STRATEGY_GRID__") {
        return (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            {[
              { level: "Level 1", color: "bg-gray-100 text-gray-500", bar: "bg-gray-400", title: "Fixed-Size / Recursive", desc: "Split by token count. The default in LangChain. Add 10-20% overlap to preserve cross-boundary context.", when: "Homogeneous content — news articles, support tickets, FAQ entries." },
              { level: "Level 2", color: "bg-blue-50 text-blue-600", bar: "bg-blue-500", title: "Semantic Chunking", desc: "Embed every sentence and split on cosine distance drops. Groups by meaning, not character count.", when: "Technical docs, knowledge bases, research papers." },
              { level: "Level 3", color: "bg-green-50 text-green-600", bar: "bg-green-500", title: "Structural / Propositional", desc: "Split on document structure (headers, sections) or use an LLM to extract atomic propositions.", when: "Markdown docs, PDFs with logical sections, legal documents." },
              { level: "Level 4", color: "bg-red-50 text-red-600", bar: "bg-red-500", title: "Agentic Chunking", desc: "An LLM agent inspects the full document, decides the optimal strategy, executes it, and enriches chunks.", when: "Heterogeneous corpora, high-stakes retrieval, enterprise knowledge management." },
            ].map((card, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-[3px] ${card.bar}`} />
                <div className={`${card.color} text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded inline-block mb-3`}>{card.level}</div>
                <h4 className="font-outfit text-lg font-bold text-black mb-2">{card.title}</h4>
                <p className="text-sm text-gray-500 mb-3">{card.desc}</p>
                <div className="text-xs text-gray-400"><strong className="uppercase tracking-widest text-[#9e9b93] font-bold">Use when:</strong> {card.when}</div>
              </div>
            ))}
          </div>
        );
      }

      if (trimmedBlock === "__GRAPHRAG_DIAGRAM_1__") return <GraphRagDiagram1 key={index} />;
      if (trimmedBlock === "__GRAPHRAG_DIAGRAM_2__") return <GraphRagDiagram2 key={index} />;
      if (trimmedBlock === "__GRAPHRAG_DIAGRAM_3__") return <GraphRagDiagram3 key={index} />;

      if (trimmedBlock === "__LLM_MEMORY_DIAGRAM__") return <LlmMemoryDiagram key={index} />;

      if (trimmedBlock === "__VEC_EMB_ONEHOT__") return <OneHotDiagram key={index} />;
      if (trimmedBlock === "__VEC_EMB_SPACE__") return <EmbeddingSpaceDiagram key={index} />;
      if (trimmedBlock === "__VEC_EMB_TIMELINE__") return <EvoTimeline key={index} />;
      if (trimmedBlock === "__VEC_EMB_TABLE__") return <VecEmbTable key={index} />;
      if (trimmedBlock === "__VEC_EMB_FLOWCHART__") return <DecisionFlowchart key={index} />;
      if (trimmedBlock === "__VEC_EMB_OPINION__") return <VecEmbOpinion key={index} />;

      if (trimmedBlock === "__GRAPHRAG_OPINION__") return (
        <div key={index} className="bg-[#13161e] border border-[#252a38] rounded-xl p-8 md:p-10 my-16 relative shadow-lg">
          <div className="absolute -top-[35px] left-8 font-outfit text-8xl text-[#7c6fff] opacity-40 leading-none">&quot;</div>
          <p className="font-outfit text-xl font-light text-[#e8eaf0] leading-relaxed italic mb-4">
            GraphRAG will become the default architecture for enterprise RAG within 18 months — but not because it&apos;s always better. It&apos;ll win because the questions enterprises actually care about are almost all relationship questions. Vector RAG was built for the internet. GraphRAG is built for the enterprise.
          </p>
          <div className="font-outfit text-sm text-[#7a8099] font-bold tracking-wide mt-6">— Author&apos;s Take · April 2026</div>
        </div>
      );

      if (trimmedBlock === "__LLM_MEMORY_OPINION__") return (
        <div key={index} className="relative my-14 p-8 md:p-10 bg-white border border-[#d4d4d8] rounded-xl shadow-sm">
          <div className="absolute top-3 left-6 font-serif text-8xl text-[#6366f1] opacity-20 leading-none select-none">&quot;</div>
          <p className="font-serif text-xl italic text-[#18181b] leading-relaxed mb-4 pt-4">
            The entire memory industry around LLMs exists because of one architectural fact: the context window is the model&apos;s only sense organ. Memory architecture is competitive advantage disguised as plumbing.
          </p>
          <div className="text-[13px] text-[#a1a1aa] font-medium">— Personal take · Based on production AI system patterns through Q1 2026</div>
        </div>
      );

      if (trimmedBlock.startsWith("## ")) {
        const lines = trimmedBlock.split("\n");
        const titleLine = lines[0].replace("## ", "").trim();
        const id = titleLine.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const restOfBlock = lines.slice(1).join("\n").trim();
        return (
          <React.Fragment key={index}>
            <h2 id={id} className="font-outfit text-3xl md:text-4xl font-bold mt-16 mb-6 text-black tracking-tight scroll-mt-24">{titleLine}</h2>
            {restOfBlock && <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: formatText(restOfBlock) }} />}
          </React.Fragment>
        );
      }

      if (trimmedBlock.startsWith("### ")) {
        const lines = trimmedBlock.split("\n");
        const titleLine = lines[0].replace("### ", "").trim();
        const id = titleLine.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const restOfBlock = lines.slice(1).join("\n").trim();
        return (
          <React.Fragment key={index}>
            <h3 id={id} className="font-outfit text-2xl font-bold mt-10 mb-4 text-gray-800 scroll-mt-24">{titleLine}</h3>
            {restOfBlock && <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: formatText(restOfBlock) }} />}
          </React.Fragment>
        );
      }

      if (trimmedBlock.startsWith("> ")) {
        const text = trimmedBlock.replace(/^>\s?/gm, "");
        return (
          <blockquote key={index} className="my-8 border-l-4 border-red-500 bg-red-50 p-6 rounded-r-2xl">
            <p className="text-lg text-gray-700 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: formatText(text) }} />
          </blockquote>
        );
      }

      if (trimmedBlock.startsWith("- ")) {
        const items = trimmedBlock.split("\n").filter(l => l.trim().startsWith("- ")).map(l => l.replace(/^-\s/, "").trim());
        return (
          <ul key={index} className="my-6 space-y-3 pl-2">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 text-lg">
                <span className="mt-2 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: formatText(item) }} />
              </li>
            ))}
          </ul>
        );
      }

      if (trimmedBlock.match(/^\d+\. /)) {
        const items = trimmedBlock.split("\n").filter(l => l.trim().match(/^\d+\./)).map(l => l.replace(/^\d+\.\s/, "").trim());
        return (
          <ol key={index} className="my-6 space-y-3 pl-2">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 text-lg">
                <span className="font-bold text-red-500 shrink-0 min-w-[20px]">{i + 1}.</span>
                <span dangerouslySetInnerHTML={{ __html: formatText(item) }} />
              </li>
            ))}
          </ol>
        );
      }

      if (trimmedBlock === "") return null;

      return (
        <p key={index} className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: formatText(trimmedBlock) }} />
      );
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <motion.div className="h-full bg-red-600 origin-left" style={{ scaleX: scrollYProgress }} />
      </div>

      {/* Back to Blogs — white pill, hover black */}
      <Link
        href="/blogs"
        className="fixed top-5 left-8 z-40 flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-black hover:text-white hover:border-black text-gray-800 text-sm font-semibold rounded-full shadow-sm transition-all"
      >
        <ArrowLeft size={14} />
        Back to Blogs
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

      {/* Article Content */}
      <article className="w-full max-w-[800px] mx-auto px-6 pt-20 pb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Tags */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {blog.tags.map(tag => (
              <span key={tag} className="px-4 py-1.5 bg-red-50 text-red-600 font-bold text-xs uppercase tracking-widest rounded-full border border-red-100">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-outfit text-4xl md:text-6xl font-black mb-8 text-black tracking-tighter leading-tight">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 pb-12 border-b border-gray-200 text-gray-500 font-medium mb-12">
            <div className="flex items-center gap-2"><Calendar size={18} /> {blog.publishedAt}</div>
            <div className="flex items-center gap-2"><Clock size={18} /> {blog.readTime}</div>
            <div className="flex items-center gap-2 text-red-500"><BrainCircuit size={18} /> Deep Dive</div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="prose prose-lg max-w-none">
          {typeof blog.content === "string" ? renderContent(blog.content) : blog.content}
        </motion.div>

        {/* Footer CTA */}
        {blog.githubLink && (
          <div className="mt-24 pt-12 border-t border-gray-200">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 border border-gray-100">
              <div>
                <h4 className="font-outfit text-2xl font-bold text-black mb-2">Want to see the code?</h4>
                <p className="text-gray-500">Dive into the repository to see this system running in production.</p>
              </div>
              <a href={blog.githubLink} target="_blank" rel="noreferrer" className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-red-600 transition-colors flex items-center gap-3 whitespace-nowrap shadow-xl">
                <ExternalLink size={20} /> View Repository
              </a>
            </div>
          </div>
        )}
      </article>

      {/* Floating Bottom TOC */}
      {headings.length > 0 && (
        <div ref={tocRef} className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[150] flex flex-col items-center">
          <AnimatePresence>
            {isTocOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-[320px] md:w-[360px] mb-3 bg-[#0a0a0a] text-gray-400 border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col max-h-[60vh] font-outfit"
              >
                <div className="px-6 py-4 text-[11px] font-bold tracking-widest text-[#777] uppercase border-b border-white/5">
                  Table of Contents
                </div>
                <div className="overflow-y-auto p-2 flex flex-col gap-1">
                  <button
                    onClick={() => scrollToHeading(headings[0]?.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm ${
                      !activeId ? "bg-[#222] text-white font-medium" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                    }`}
                  >
                    TL;DR
                  </button>
                  {headings.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => scrollToHeading(h.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm ${
                        activeId === h.id
                          ? "bg-red-600 text-white font-bold shadow-lg"
                          : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                      } ${h.level === 3 ? "pl-8 text-xs" : ""}`}
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
                {activeId ? headings.find(h => h.id === activeId)?.title : "Table of Contents"}
              </span>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" className={`shrink-0 transition-transform duration-500 ${isTocOpen ? "rotate-90" : "-rotate-90"}`}>
              <circle cx="10" cy="10" r="8" stroke="#4b5563" strokeWidth="2" fill="none" />
              <motion.circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" style={{ pathLength: scrollYProgress }} />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
