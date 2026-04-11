"use client";

import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Search, Clock, ArrowUpRight, BookOpen, Zap, Target,
  TrendingUp, Shield, Layers, ChevronRight, X, ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { blogsData } from "@/data/blogs";
import { BlogCategory, BlogArticle } from "@/types/blog";

/* ── Categories ─────────────────────────────────────────────────── */
const categories: BlogCategory[] = [
  "All",
  "Machine Learning",
  "Deep Learning",
  "GenAI / LLMs",
  "System Design",
  "Case Studies",
  "Agentic AI",
  "Security",
  "Deep Dive",
];

const categoryIcons: Partial<Record<BlogCategory, React.ReactNode>> = {
  "All":             <Layers size={12} />,
  "Machine Learning":<TrendingUp size={12} />,
  "GenAI / LLMs":   <Zap size={12} />,
  "System Design":   <Layers size={12} />,
  "Agentic AI":      <Zap size={12} />,
  "Security":        <Shield size={12} />,
  "Deep Dive":       <BookOpen size={12} />,
};

/* ── Tag colours ─────────────────────────────────────────────────── */
const tagColorMap: Record<string, string> = {
  "Agentic AI":      "bg-violet-50 text-violet-700 border-violet-200",
  "GenAI / LLMs":   "bg-indigo-50 text-indigo-700 border-indigo-200",
  "System Design":   "bg-sky-50 text-sky-700 border-sky-200",
  "Security":        "bg-rose-50 text-rose-700 border-rose-200",
  "Deep Dive":       "bg-amber-50 text-amber-700 border-amber-200",
  "Machine Learning":"bg-emerald-50 text-emerald-700 border-emerald-200",
  "Deep Learning":   "bg-teal-50 text-teal-700 border-teal-200",
  "Case Studies":    "bg-orange-50 text-orange-700 border-orange-200",
};
const tagCls = (tag: string) =>
  tagColorMap[tag] ?? "bg-gray-100 text-gray-600 border-gray-200";

/* ── Authority Pillars ───────────────────────────────────────────── */
const pillars = [
  {
    icon: <Layers size={18} />,
    title: "System-Level Thinking",
    body: "Every article covers the full engineering stack — not just the model API, but the retrieval layer, the memory architecture, and the deployment constraints.",
  },
  {
    icon: <Zap size={18} />,
    title: "Production Constraints First",
    body: "Topics are chosen based on failure modes in real systems — the gaps between demos and deployments that most tutorials never address.",
  },
  {
    icon: <Shield size={18} />,
    title: "Grounded in Research",
    body: "When numbers appear — token costs, latency figures, accuracy deltas — they come from cited sources and real benchmarks, not intuition.",
  },
];

/* ── Blog Card ───────────────────────────────────────────────────── */
function BlogCard({
  blog,
  index,
}: {
  blog: BlogArticle;
  index: number;
}) {
  const router = useRouter();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.07 }}
      layout
      onClick={() => router.push(`/blogs/${blog.id}`)}
      className="group cursor-pointer bg-white border border-gray-200 rounded-3xl flex flex-col h-full overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
      {/* Hover accent bar */}
      <div className="h-[3px] bg-gradient-to-r from-red-500 via-red-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-7 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${tagCls(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-outfit text-[1.15rem] font-bold text-black mb-3 leading-snug group-hover:text-red-600 transition-colors line-clamp-3">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed mb-auto line-clamp-3">
          {blog.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 mt-6 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1.5 font-semibold">
              <Clock size={12} /> {blog.readTime}
            </span>
            <span className="text-gray-300">·</span>
            <span>{blog.publishedAt}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all duration-300">
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Featured Card ───────────────────────────────────────────────── */
function FeaturedCard({
  blog,
}: {
  blog: BlogArticle;
}) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => router.push(`/blogs/${blog.id}`)}
      className="group cursor-pointer mb-12"
    >
      <div className="relative bg-[#0a0a0a] rounded-[2rem] p-8 md:p-12 border border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/15 via-transparent to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-600/5 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-full">
                Featured
              </span>
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-white/5 text-gray-400 border border-white/10 text-[11px] font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="font-outfit text-3xl md:text-4xl xl:text-[2.75rem] font-extrabold text-white mb-5 leading-tight tracking-tight group-hover:text-red-50 transition-colors">
              {blog.title}
            </h2>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              {blog.description}
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Clock size={14} className="text-red-500" />
                {blog.readTime}
              </span>
              <span className="text-gray-700">·</span>
              <span>{blog.publishedAt}</span>
            </div>
          </div>

          <div className="shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white group-hover:scale-105 transition-all duration-300">
              <ArrowUpRight size={28} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   FULL BLOGS PAGE COMPONENT
════════════════════════════════════════════════════════════════ */
export function BlogsPageContent() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const pillarsRef = useRef(null);
  const pillarsInView = useInView(pillarsRef, { once: true });

  /* ── Filter logic ─────────────────────────────────────────── */
  const filteredBlogs = useMemo(() => {
    return blogsData.filter((blog) => {
      const matchesCategory =
        activeCategory === "All" || blog.tags.includes(activeCategory);
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.description.toLowerCase().includes(q) ||
        blog.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredBlog = blogsData.find((b) => b.isFeatured);
  const isDefaultView = activeCategory === "All" && searchQuery === "";
  const gridBlogs = isDefaultView && featuredBlog
    ? filteredBlogs.filter((b) => b.id !== featuredBlog.id)
    : filteredBlogs;

  return (
    <div
      className="min-h-screen bg-[#fafafa]"
      itemScope
      itemType="https://schema.org/Blog"
    >
      <meta
        itemProp="name"
        content="Krishil Agrawal — AI & ML Engineering Insights"
      />
      <meta
        itemProp="description"
        content="Technical deep-dives on ML systems, RAG architectures, agentic AI, and production engineering by Krishil Agrawal, ML Engineer."
      />

      {/* ── TOP NAV BAR ──────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>

          {/* Inline search — desktop */}
          <div className="hidden md:flex relative w-72">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={15}
            />
            <input
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-black pl-10 pr-9 py-2 rounded-full text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-gray-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={13} />
              </button>
            )}
          </div>

          <span className="text-xs font-medium text-gray-400 hidden sm:block">
            {blogsData.length} articles published
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-32">

        {/* ── PAGE HERO ────────────────────────────────────────── */}
        <div className="mb-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <BookOpen size={12} /> AI & ML Insights
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-outfit text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tighter text-black mb-6 leading-[1.05]"
            itemProp="headline"
          >
            AI & ML Insights by{" "}
            <span className="text-red-500">Krishil Agrawal</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Deep dives into real-world machine learning systems, AI
            architectures, and engineering challenges — written for engineers
            who build, not just read.
          </motion.p>
        </div>

        {/* ── QUICK STATS ROW ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-6 mb-16 pb-16 border-b border-gray-200"
        >
          {[
            { v: `${blogsData.length}+`, l: "Technical deep dives" },
            { v: "100%", l: "Production-focused" },
            { v: "0", l: "Beginner tutorials" },
            { v: "2026", l: "Current & up-to-date" },
          ].map((s) => (
            <div key={s.l} className="flex items-baseline gap-2">
              <span className="font-outfit text-2xl font-extrabold text-black">
                {s.v}
              </span>
              <span className="text-xs text-gray-500 font-medium">{s.l}</span>
            </div>
          ))}
        </motion.div>

        {/* ── CONTROLS ─────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-10">
          {/* Category filter pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-black text-white border-black shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:shadow-sm"
                }`}
              >
                {categoryIcons[cat]}
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile search */}
          <div className="flex md:hidden relative w-full lg:w-72 shrink-0">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={15}
            />
            <input
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 text-black pl-10 pr-9 py-2.5 rounded-full text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-gray-400 shadow-sm font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Active filter pill */}
        <AnimatePresence>
          {(activeCategory !== "All" || searchQuery) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 mb-8 overflow-hidden"
            >
              <span className="text-sm text-gray-500">
                <span className="font-bold text-black">
                  {filteredBlogs.length}
                </span>{" "}
                article{filteredBlogs.length !== 1 ? "s" : ""} found
              </span>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 border border-red-200 rounded-full px-3 py-1 bg-red-50 hover:bg-red-100 transition-colors"
              >
                <X size={10} /> Clear
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FEATURED CARD ───────────────────────────────────── */}
        <AnimatePresence>
          {isDefaultView && featuredBlog && (
            <FeaturedCard
              blog={featuredBlog}
            />
          )}
        </AnimatePresence>

        {/* ── GRID SECTION LABEL ───────────────────────────────── */}
        {gridBlogs.length > 0 && (
          <div className="flex items-center gap-4 mb-8">
            <span className="font-outfit text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
              {isDefaultView ? "All Articles" : "Results"}
            </span>
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium text-gray-400">
              {gridBlogs.length} article{gridBlogs.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* ── BLOG GRID ────────────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
        >
          <AnimatePresence mode="popLayout">
            {gridBlogs.map((blog, i) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── EMPTY STATE ──────────────────────────────────────── */}
        {filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24 text-center flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-5">
              <Target size={28} className="text-gray-300" />
            </div>
            <h3 className="font-outfit text-2xl font-bold text-black mb-2">
              No articles found.
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search terms or clearing the category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-red-600 transition-colors"
            >
              <X size={14} /> Clear filters
            </button>
          </motion.div>
        )}

        {/* ── AUTHORITY PILLARS ────────────────────────────────── */}
        <motion.div ref={pillarsRef} className="mb-24">
          <div className="mb-10">
            <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-red-500 mb-2">
              Why Read
            </div>
            <h2 className="font-outfit text-3xl md:text-4xl font-extrabold text-black tracking-tight">
              What Makes These Articles Different
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-white border border-gray-200 rounded-3xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-5 border border-red-100">
                  {p.icon}
                </div>
                <h3 className="font-outfit text-lg font-bold text-black mb-3">
                  {p.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── NEWSLETTER CTA ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#0a0a0a] rounded-[2rem] p-10 md:p-14 border border-white/5 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-violet-600/10 pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-red-600/5 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-red-500 mb-3">
                Stay Sharp
              </div>
              <h2 className="font-outfit text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
                New AI Engineering deep-dives —
                <br className="hidden md:block" /> every month.
              </h2>
              <p className="text-gray-500 text-sm">
                RAG systems. Agentic architectures. LLM deployment patterns. No filler.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto shrink-0">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-white/5 border border-white/10 text-white placeholder:text-gray-600 rounded-xl px-5 py-3 text-sm outline-none focus:border-red-500 transition-colors w-full sm:w-60"
              />
              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-500 transition-colors whitespace-nowrap">
                Subscribe <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── SEO BLOCK (hidden, for crawlers) ─────────────────── */}
        <div className="sr-only" aria-hidden="true">
          <p>
            Krishil Agrawal is a ML Engineer and AI Developer publishing
            technical deep-dives on machine learning systems, production RAG
            pipelines, agentic AI frameworks, and LLM deployment challenges.
            Articles cover real-world ML engineering topics including GraphRAG,
            vector databases, chunking strategies, Agentic AI security, and
            context engineering — written for engineers building AI systems at
            scale.
          </p>
          <p>
            Keywords: ML Engineer blog, AI engineering articles, RAG system
            design, agentic AI development, LLM memory architecture, production
            machine learning, Krishil Agrawal AI projects.
          </p>
        </div>
      </div>

    </div>
  );
}
