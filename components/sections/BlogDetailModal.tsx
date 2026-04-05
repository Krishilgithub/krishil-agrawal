import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, ExternalLink, Calendar, BrainCircuit } from "lucide-react";
import { BlogArticle } from "@/types/blog";

interface BlogDetailModalProps {
  blog: BlogArticle | null;
  onClose: () => void;
}

export function BlogDetailModal({ blog, onClose }: BlogDetailModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (blog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [blog]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!blog) return null;

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Simple custom renderer to style basic markdown structures
  const renderContent = (text: string) => {
    const blocks = text.trim().split("\n\n");
    return blocks.map((block, index) => {
      // Code blocks
      if (block.startsWith("\`\`\`")) {
        const lines = block.split("\n");
        const codeText = lines.slice(1, lines.length - 1).join("\n");
        return (
          <div key={index} className="my-8 rounded-2xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl">
            <div className="bg-[#1a1a1a] px-4 py-2 border-b border-white/5 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <pre className="p-6 text-sm md:text-base text-gray-300 font-mono overflow-x-auto">
              <code>{codeText}</code>
            </pre>
          </div>
        );
      }
      
      // H2 Headers
      if (block.startsWith("## ")) {
        return (
          <h2 key={index} className="font-outfit text-3xl md:text-4xl font-bold mt-16 mb-6 text-black tracking-tight">
            {block.replace("## ", "")}
          </h2>
        );
      }
      
      // H3 Headers
      if (block.startsWith("### ")) {
        return (
          <h3 key={index} className="font-outfit text-2xl font-bold mt-10 mb-4 text-gray-800">
            {block.replace("### ", "")}
          </h3>
        );
      }

      // Ordered Lists
      if (block.match(/^\d+\.\s/)) {
        const items = block.split("\n");
        return (
          <ul key={index} className="my-6 space-y-4">
            {items.map((item, i) => (
              <li key={i} className="flex gap-4 items-start text-gray-600 text-lg leading-relaxed">
                <span className="font-mono font-bold text-red-500 shrink-0 mt-1">{item.split(".")[0]}.</span>
                <span>{item.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</span>
              </li>
            ))}
          </ul>
        );
      }

      // Bold text replacement generic paragraph
      let formattedText = block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formattedText = formattedText.replace(/\`(.*?)\`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-red-600 font-mono text-sm">$1</code>');

      return (
        <p key={index} className="text-lg md:text-xl text-gray-600 leading-relax mb-6" dangerouslySetInnerHTML={{ __html: formattedText }} />
      );
    });
  };

  return (
    <AnimatePresence>
      {blog && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.3 }}
           className="fixed inset-0 z-[100] bg-white overflow-y-auto"
           data-lenis-prevent="true"
        >
          {/* Progress / Reading Status line */}
          <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-[110]">
            <motion.div 
               className="h-full bg-red-600"
               initial={{ width: "0%" }}
               animate={{ width: "100%" }}
               transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          <div className="max-w-[800px] mx-auto px-6 py-24 md:py-32">
            
            {/* CLOSE BUTTON */}
            <button 
              onClick={onClose}
              className="fixed top-8 right-8 z-[120] p-4 bg-gray-100 hover:bg-black text-black hover:text-white rounded-full transition-all group backdrop-blur-md"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mb-16">
              <div className="flex gap-3 mb-8 flex-wrap">
                {blog.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-red-50 text-red-600 font-bold text-xs uppercase tracking-widest rounded-full border border-red-100">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="font-outfit text-4xl md:text-6xl font-black mb-8 text-black tracking-tighter leading-tight">
                {blog.title}
              </h1>

              <div className="flex items-center gap-6 pb-12 border-b border-gray-200 text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar size={18} /> {blog.publishedAt}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} /> {blog.readTime}
                </div>
                <div className="flex items-center gap-2 text-red-500">
                  <BrainCircuit size={18} /> Deep Dive
                </div>
              </div>
            </motion.div>

            {/* CONTENT RENDERER */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="prose prose-lg max-w-none">
               {typeof blog.content === "string" ? renderContent(blog.content) : blog.content}
            </motion.div>
            
            {/* FOOTER METRICS AND CTA */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="mt-24 pt-12 border-t border-gray-200">
              <div className="bg-gray-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 border border-gray-100">
                <div>
                  <h4 className="font-outfit text-2xl font-bold text-black mb-2">Want to see the code?</h4>
                  <p className="text-gray-500">Dive into the repository to see this system running in production.</p>
                </div>
                
                {blog.githubLink && (
                  <a href={blog.githubLink} className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-red-600 transition-colors flex items-center gap-3 whitespace-nowrap shadow-xl">
                    <ExternalLink size={20} /> View Repository
                  </a>
                )}
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
