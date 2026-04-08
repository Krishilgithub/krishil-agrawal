import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { X, Clock, ExternalLink, Calendar, BrainCircuit } from "lucide-react";
import { BlogArticle } from "@/types/blog";

interface BlogDetailModalProps {
  blog: BlogArticle | null;
  onClose: () => void;
}

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export function BlogDetailModal({ blog, onClose }: BlogDetailModalProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });

  // Handle click outside to close TOC
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tocRef.current && !tocRef.current.contains(event.target as Node)) {
        setIsMobileTocOpen(false);
      }
    }
    if (isMobileTocOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileTocOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (blog) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [blog]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Generate TOC items from markdown content
  const headings = useMemo<TocItem[]>(() => {
    if (!blog || typeof blog.content !== "string") return [];
    const blocks = blog.content.split("\n\n");
    const extracted: TocItem[] = [];
    
    blocks.forEach(block => {
      const trimmedBlock = block.trim();
      if (trimmedBlock.startsWith("## ") || trimmedBlock.startsWith("### ")) {
        const firstLine = trimmedBlock.split("\n")[0];
        const title = firstLine.replace(/#/g, "").trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const level = firstLine.startsWith("### ") ? 3 : 2;
        extracted.push({ id, title, level });
      }
    });
    return extracted;
  }, [blog]);

  // Intersection Observer for Scroll Spy
  useEffect(() => {
    if (!blog) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        root: scrollContainerRef.current,
        rootMargin: "-10% 0px -70% 0px" 
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings, blog]);

  if (!blog) return null;

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
      setIsMobileTocOpen(false);
    }
  };

  const formatText = (text: string) => {
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    return formattedText.replace(/\`(.*?)\`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-red-600 font-mono text-sm">$1</code>');
  };

  // Simple custom renderer to style basic markdown structures
  const renderContent = (text: string) => {
    const codeBlocks: string[] = [];
    // Extract code blocks first to prevent \n\n splitting from breaking them
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
      
      if (trimmedBlock.startsWith("## ")) {
        const lines = trimmedBlock.split("\n");
        const titleLine = lines[0].replace("## ", "").trim();
        const id = titleLine.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const restOfBlock = lines.slice(1).join("\n").trim();
        
        return (
          <React.Fragment key={index}>
            <h2 id={id} className="font-outfit text-3xl md:text-4xl font-bold mt-16 mb-6 text-black tracking-tight scroll-mt-24">
              {titleLine}
            </h2>
            {restOfBlock && (
              <p className="text-lg md:text-xl text-gray-600 leading-relax mb-6" dangerouslySetInnerHTML={{ __html: formatText(restOfBlock) }} />
            )}
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
            <h3 id={id} className="font-outfit text-2xl font-bold mt-10 mb-4 text-gray-800 scroll-mt-24">
              {titleLine}
            </h3>
            {restOfBlock && (
              <p className="text-lg md:text-xl text-gray-600 leading-relax mb-6" dangerouslySetInnerHTML={{ __html: formatText(restOfBlock) }} />
            )}
          </React.Fragment>
        );
      }

      if (trimmedBlock.startsWith("> ")) {
        // Handle blockquotes
        const text = trimmedBlock.replace(/^>\s?/gm, "");
        return (
          <blockquote key={index} className="my-8 border-l-4 border-red-500 bg-red-50 p-6 rounded-r-2xl">
            <p className="text-lg text-gray-700 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: formatText(text) }} />
          </blockquote>
        );
      }

      if (trimmedBlock.match(/^\d+\.\s/)) {
        const items = trimmedBlock.split("\n");
        return (
          <ul key={index} className="my-6 space-y-4">
            {items.map((item, i) => (
              <li key={i} className="flex gap-4 items-start text-gray-600 text-lg leading-relaxed">
                <span className="font-mono font-bold text-red-500 shrink-0 mt-1">{item.split(".")[0]}.</span>
                <span dangerouslySetInnerHTML={{ __html: formatText(item.replace(/^\d+\.\s/, "")) }} />
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p key={index} className="text-lg md:text-xl text-gray-600 leading-relax mb-6" dangerouslySetInnerHTML={{ __html: formatText(trimmedBlock) }} />
      );
    });
  };

  return (
    <AnimatePresence>
      {blog && (
        <motion.div
           ref={scrollContainerRef}
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
               className="h-full bg-red-600 origin-left"
               style={{ scaleX: scrollYProgress }}
            />
          </div>

          <div className="w-full max-w-[800px] mx-auto px-6 py-24 md:py-32 relative min-h-screen pb-48">
            
            {/* CLOSE BUTTON */}
            <button 
              onClick={onClose}
              className="fixed top-6 right-6 md:top-8 md:right-8 z-[120] p-4 bg-gray-100 hover:bg-black text-black hover:text-white rounded-full transition-all group shadow-md"
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

          {/* FLOATING BOTTOM TOC */}
          {headings.length > 0 && (
            <div ref={tocRef} className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[150] flex flex-col items-center">
              <AnimatePresence>
                {isMobileTocOpen && (
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
                    <div className="overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-800 flex flex-col gap-1">
                      {/* Optional default TL;DR jump to top */}
                      <button
                        onClick={() => scrollToHeading(headings[0]?.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm ${
                          !activeId 
                            ? "bg-[#222] text-white font-medium" 
                            : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                        }`}
                      >
                        TL;DR
                      </button>

                      {headings.map((heading) => (
                        <button
                          key={heading.id}
                          onClick={() => scrollToHeading(heading.id)}
                          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm ${
                            activeId === heading.id 
                              ? "bg-[#22a222] bg-[#222] text-white font-medium" 
                              : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                          } ${heading.level === 3 ? "pl-8 text-xs" : ""}`}
                        >
                          {heading.title}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                className="bg-[#0a0a0a] hover:bg-black border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] text-white rounded-full h-12 px-5 flex items-center justify-between gap-6 transition-all duration-300 min-w-[280px] font-outfit group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-1.5 h-1.5 bg-white rounded-full shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                  <span className="text-sm font-medium truncate max-w-[200px]">
                    {activeId ? headings.find(h => h.id === activeId)?.title : "Table of Contents"}
                  </span>
                </div>
                
                <div className={`w-5 h-5 border-[2px] border-gray-600 border-t-white rounded-full flex-shrink-0 transition-transform duration-500 ${isMobileTocOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
