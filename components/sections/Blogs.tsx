"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, ArrowUpRight, Target } from "lucide-react";

import { blogsData } from "@/data/blogs";
import { BlogCategory, BlogArticle } from "@/types/blog";
import { BlogDetailModal } from "./BlogDetailModal";

const categories: BlogCategory[] = [
  "All", 
  "Machine Learning", 
  "Deep Learning", 
  "GenAI / LLMs", 
  "System Design", 
  "Case Studies"
];

export function Blogs() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<BlogArticle | null>(null);

  // Filter Logic
  const filteredBlogs = blogsData.filter(blog => {
    const matchesCategory = activeCategory === "All" || blog.tags.includes(activeCategory);
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = blogsData.find(b => b.isFeatured);
  const isDefaultView = activeCategory === "All" && searchQuery === "";

  // The grid gets everything EXCEPT the featured blog if we are in default view.
  const gridBlogs = isDefaultView && featuredBlog
    ? filteredBlogs.filter(b => b.id !== featuredBlog.id) 
    : filteredBlogs;

  return (
    <section id="blogs" className="py-32 px-6 md:px-12 bg-[#fafafa] relative min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-16 md:mb-20 flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-outfit text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-black"
          >
            Insights & <span className="text-red-500">Writings</span>.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg md:text-xl max-w-2xl"
          >
            Breaking down complex AI concepts, real-world constraints, and rigorous engineering architecture.
          </motion.p>
        </div>

        {/* CONTROLS (SEARCH & FILTER) */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-16">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full lg:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                  activeCategory === cat 
                    ? "bg-black text-white border border-black" 
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 text-black px-12 py-3 rounded-full outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-medium placeholder:text-gray-400 shadow-sm"
            />
          </div>
        </div>

        {/* FEATURED BLOG (Only in default view) */}
        {isDefaultView && featuredBlog && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setSelectedBlog(featuredBlog)}
            className="mb-12 group cursor-pointer"
          >
            <div className="relative bg-[#111] rounded-[2.5rem] p-8 md:p-14 border border-gray-200 shadow-2xl overflow-hidden flex flex-col md:flex-row gap-10 items-center justify-between">
              {/* Subtle Red glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 w-full md:w-3/5">
                <div className="flex gap-3 mb-6 flex-wrap">
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                    Featured
                  </span>
                  {featuredBlog.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/10 text-gray-300 border border-white/10 text-xs font-semibold rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="font-outfit text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight group-hover:text-red-50 transition-colors">
                  {featuredBlog.title}
                </h3>
                
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
                  {featuredBlog.description}
                </p>

                <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
                  <span className="flex items-center gap-2"><Clock size={16} /> {featuredBlog.readTime}</span>
                  <span className="flex items-center gap-2">• {featuredBlog.publishedAt}</span>
                </div>
              </div>

              <div className="relative z-10 w-full md:w-auto flex justify-end">
                <div className="h-20 w-20 md:h-28 md:w-28 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:scale-110 group-hover:text-white text-gray-400 transition-all duration-500">
                  <ArrowUpRight size={40} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STANDARD GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {gridBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedBlog(blog)}
                className="group cursor-pointer bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <h4 className="font-outfit text-2xl font-bold text-black mb-4 group-hover:text-red-600 transition-colors leading-tight">
                  {blog.title}
                </h4>

                <p className="text-gray-500 text-base leading-relaxed mb-auto pb-8">
                  {blog.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>{blog.readTime}</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredBlogs.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center">
            <Target size={48} className="text-gray-300 mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No algorithms found.</h3>
            <p className="text-gray-500">Try adjusting your search terms or category filters.</p>
          </div>
        )}

      </div>

      <BlogDetailModal 
        blog={selectedBlog} 
        onClose={() => setSelectedBlog(null)} 
      />
    </section>
  );
}
