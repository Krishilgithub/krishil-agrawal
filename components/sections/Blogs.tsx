"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Clock, ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { blogsData } from "@/data/blogs";
import { BlogArticle } from "@/types/blog";
import { BlogDetailModal } from "./BlogDetailModal";

/* ── Tag colour map ─────────────────────────────────────────── */
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

/* ── Grid BlogCard ──────────────────────────────────────────── */
function BlogCard({
  blog,
  index,
  onClick,
}: {
  blog: BlogArticle;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      onClick={onClick}
      className="group cursor-pointer bg-white border border-gray-200 rounded-3xl flex flex-col h-full overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative"
    >
      {/* Hover accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-red-500 via-red-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
        <h3 className="font-outfit text-[1.2rem] font-bold text-black mb-3 leading-snug group-hover:text-red-600 transition-colors line-clamp-3">
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

/* ════════════════════════════════════════════════════════════
   LANDING PAGE TEASER — shows 1 featured + 3 grid + CTA
════════════════════════════════════════════════════════════ */
export function Blogs() {
  const [selectedBlog, setSelectedBlog] = useState<BlogArticle | null>(null);

  const featuredBlog = blogsData.find((b) => b.isFeatured);
  // 3 non-featured blogs sorted by popularity
  const gridBlogs = blogsData
    .filter((b) => !b.isFeatured)
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 3);

  return (
    <section
      id="blogs"
      className="bg-[#fafafa] py-28 md:py-36 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest mb-5"
            >
              <BookOpen size={12} /> Insights & Writings
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-outfit text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tighter text-black leading-[1.05]"
            >
              Insights &{" "}
              <span className="text-red-500">Writings</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-gray-500 text-lg max-w-xl leading-relaxed"
            >
              Deep dives into real-world ML systems, AI architectures, and
              engineering challenges — written for engineers who build.
            </motion.p>
          </div>

          {/* "View all" — desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block shrink-0"
          >
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-black text-black text-sm font-bold hover:bg-black hover:text-white transition-all duration-200"
            >
              View all articles
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </div>

        {/* ── FEATURED CARD ──────────────────────────────────── */}
        {featuredBlog && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedBlog(featuredBlog)}
            className="group cursor-pointer mb-10"
          >
            <div className="relative bg-[#0a0a0a] rounded-[2rem] p-8 md:p-12 border border-white/5 overflow-hidden">
              {/* glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/15 via-transparent to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-600/5 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-full">
                      Featured
                    </span>
                    {featuredBlog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white/5 text-gray-400 border border-white/10 text-[11px] font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-outfit text-3xl md:text-4xl xl:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight group-hover:text-red-50 transition-colors">
                    {featuredBlog.title}
                  </h3>

                  <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                    {featuredBlog.description}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <Clock size={14} className="text-red-500" />
                      {featuredBlog.readTime}
                    </span>
                    <span className="text-gray-700">·</span>
                    <span>{featuredBlog.publishedAt}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                    <ArrowUpRight size={28} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── SECTION DIVIDER ────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-outfit text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
            Latest Articles
          </span>
          <span className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-medium text-gray-400">
            {blogsData.length} published
          </span>
        </div>

        {/* ── 3-CARD GRID ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gridBlogs.map((blog, i) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              index={i}
              onClick={() => setSelectedBlog(blog)}
            />
          ))}
        </div>

        {/* ── VIEW ALL CTA ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-black text-white text-sm font-bold hover:bg-red-600 transition-colors duration-200"
          >
            Explore all {blogsData.length} articles
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </Link>
          <span className="text-xs text-gray-400 font-medium">
            RAG · Agentic AI · LLM Engineering · System Design
          </span>
        </motion.div>
      </div>

      <BlogDetailModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />
    </section>
  );
}
