import React, { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { X, Clock, ExternalLink, Calendar, BrainCircuit, Share2, Check, ArrowUpRight } from "lucide-react";
import { BlogArticle } from "@/types/blog";
import { GraphRagDiagram1 } from "../blogs/GraphRagDiagram1";
import { GraphRagDiagram2 } from "../blogs/GraphRagDiagram2";
import { GraphRagDiagram3 } from "../blogs/GraphRagDiagram3";
import { LlmMemoryDiagram } from "../blogs/LlmMemoryDiagram";
import {
  OneHotDiagram,
  EmbeddingSpaceDiagram,
  DecisionFlowchart,
  VecEmbTable,
  EvoTimeline,
  VecEmbOpinion,
} from "../blog/VecEmbDiagrams";

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

  return (
    <AnimatePresence>
      {blog && <BlogDetailModalContent blog={blog} onClose={onClose} />}
    </AnimatePresence>
  );
}

function BlogDetailModalContent({ blog, onClose }: { blog: BlogArticle, onClose: () => void }) {
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });

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

  const handleScroll = () => {
    // We don't need requestAnimationFrame for synthetic onScroll in React 18, it applies batching natively
    const threshold = window.innerHeight * 0.35; // 35% from top
    let currentActiveId = "";

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold + 50) { // Slight padding to ensure smooth handover
          currentActiveId = heading.id;
        }
      }
    }

    if (!currentActiveId && headings.length > 0) {
      const firstEl = document.getElementById(headings[0].id);
      if (firstEl && firstEl.getBoundingClientRect().top > threshold) {
        currentActiveId = headings[0].id;
      }
    }

    if (currentActiveId && currentActiveId !== activeId) {
      setActiveId(currentActiveId);
    }
  };

  // Run once on mount to establish initial active state
  useEffect(() => {
    const tm = setTimeout(() => handleScroll(), 150);
    return () => clearTimeout(tm);
  }, [headings]);

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
      
      if (trimmedBlock === "__STAT_BAR__") {
        return (
          <div key={index} className="bg-[#1a1916] text-white p-8 rounded-2xl flex flex-col md:flex-row gap-8 overflow-x-auto my-12">
            <div className="flex-1 min-w-[160px] md:border-r border-white/10 md:pr-8">
              <div className="font-outfit text-4xl md:text-5xl font-bold text-red-500 mb-2">80%</div>
              <div className="text-sm text-white/50 leading-relaxed tracking-wide">RAG failures trace back to ingestion & chunking, not the LLM</div>
            </div>
            <div className="flex-1 min-w-[160px] md:border-r border-white/10 md:pr-8">
              <div className="font-outfit text-4xl md:text-5xl font-bold text-red-500 mb-2">87%</div>
              <div className="text-sm text-white/50 leading-relaxed tracking-wide">Accuracy from adaptive chunking vs 13% for fixed-size baselines (MDPI, 2025)</div>
            </div>
            <div className="flex-1 min-w-[160px] md:border-r border-white/10 md:pr-8">
              <div className="font-outfit text-4xl md:text-5xl font-bold text-red-500 mb-2">70%</div>
              <div className="text-sm text-white/50 leading-relaxed tracking-wide">Retrieval lift from semantic chunking over naive baselines</div>
            </div>
            <div className="flex-1 min-w-[160px]">
              <div className="font-outfit text-4xl md:text-5xl font-bold text-red-500 mb-2">2,500</div>
              <div className="text-sm text-white/50 leading-relaxed tracking-wide">Token &quot;context cliff&quot; where response quality drops sharply (Chroma, 2025)</div>
            </div>
          </div>
        );
      }

      if (trimmedBlock === "__STRATEGY_GRID__") {
        return (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gray-400" />
              <div className="bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded inline-block mb-3">Level 1</div>
              <h4 className="font-outfit text-lg font-bold text-black mb-2">Fixed-Size / Recursive</h4>
              <p className="text-sm text-gray-500 mb-3">Split by token count. The default in LangChain. Add 10-20% overlap to preserve cross-boundary context.</p>
              <div className="text-xs text-gray-400"><strong className="uppercase tracking-widest text-[#9e9b93] font-bold">Use when:</strong> Homogeneous content — news articles, support tickets, FAQ entries.</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-500" />
              <div className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded inline-block mb-3">Level 2</div>
              <h4 className="font-outfit text-lg font-bold text-black mb-2">Semantic Chunking</h4>
              <p className="text-sm text-gray-500 mb-3">Embed every sentence and split on cosine distance drops. Groups by meaning, not character count.</p>
              <div className="text-xs text-gray-400"><strong className="uppercase tracking-widest text-[#9e9b93] font-bold">Use when:</strong> Technical docs, knowledge bases, research papers.</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-green-500" />
              <div className="bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded inline-block mb-3">Level 3</div>
              <h4 className="font-outfit text-lg font-bold text-black mb-2">Structural / Propositional</h4>
              <p className="text-sm text-gray-500 mb-3">Split on document structure (headers, sections) or use an LLM to extract atomic propositions.</p>
              <div className="text-xs text-gray-400"><strong className="uppercase tracking-widest text-[#9e9b93] font-bold">Use when:</strong> Markdown docs, PDFs with logical sections, legal documents.</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-500" />
              <div className="bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded inline-block mb-3">Level 4</div>
              <h4 className="font-outfit text-lg font-bold text-black mb-2">Agentic Chunking</h4>
              <p className="text-sm text-gray-500 mb-3">An LLM agent inspects the full document, decides the optimal strategy, executes it, and enriches chunks.</p>
              <div className="text-xs text-gray-400"><strong className="uppercase tracking-widest text-[#9e9b93] font-bold">Use when:</strong> Heterogeneous corpora, high-stakes retrieval, enterprise knowledge management.</div>
            </div>
          </div>
        );
      }

      if (trimmedBlock === "__BENCHMARK_TABLE__") {
        return (
          <div key={index} className="overflow-x-auto my-8 border border-gray-200 rounded-xl bg-white shadow-sm">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-[#1a1916] text-white">
                  <th className="px-6 py-4 font-semibold tracking-wider uppercase text-xs">Strategy</th>
                  <th className="px-6 py-4 font-semibold tracking-wider uppercase text-xs">Retrieval Accuracy</th>
                  <th className="px-6 py-4 font-semibold tracking-wider uppercase text-xs">Indexing Cost</th>
                  <th className="px-6 py-4 font-semibold tracking-wider uppercase text-xs">Chunk Consistency</th>
                  <th className="px-6 py-4 font-semibold tracking-wider uppercase text-xs">Best Document Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 font-bold text-black">Fixed-size recursive</td>
                  <td className="px-6 py-4 text-blue-600">69% (Vecta)</td>
                  <td className="px-6 py-4 text-green-600 font-medium">Very low</td>
                  <td className="px-6 py-4 text-green-600 font-medium">High — predictable</td>
                  <td className="px-6 py-4 text-gray-500">Homogeneous text</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-bold text-black">Semantic chunking</td>
                  <td className="px-6 py-4 text-green-600 font-medium">Up to ~70% lift vs naive</td>
                  <td className="px-6 py-4 text-blue-600">Medium (embed per sentence)</td>
                  <td className="px-6 py-4 text-blue-600">Variable chunk size</td>
                  <td className="px-6 py-4 text-gray-500">Knowledge bases, tech docs</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-black">Structural / header-based</td>
                  <td className="px-6 py-4 text-green-600 font-medium">High for structured docs</td>
                  <td className="px-6 py-4 text-green-600 font-medium">Very low</td>
                  <td className="px-6 py-4 text-green-600 font-medium">High — inherits doc structure</td>
                  <td className="px-6 py-4 text-green-600 font-medium">Markdown, HTML, PDFs with headers</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-bold text-black">Propositional</td>
                  <td className="px-6 py-4 text-green-600 font-medium">Highest precision</td>
                  <td className="px-6 py-4 text-gray-400">High (LLM per paragraph)</td>
                  <td className="px-6 py-4 text-green-600 font-medium">Very consistent (1 idea/chunk)</td>
                  <td className="px-6 py-4 text-gray-500">Legal, medical, research</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-black">Agentic chunking</td>
                  <td className="px-6 py-4 text-red-600 font-bold">87% adaptive (MDPI, 2025)</td>
                  <td className="px-6 py-4 text-gray-400">Highest (LLM per document)</td>
                  <td className="px-6 py-4 text-green-600 font-medium">Optimal per doc type</td>
                  <td className="px-6 py-4 text-green-600 font-medium">Heterogeneous corpora</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-bold text-black">Page-level</td>
                  <td className="px-6 py-4 text-gray-500">0.648 accuracy — NVIDIA 2024</td>
                  <td className="px-6 py-4 text-green-600 font-medium">Very low</td>
                  <td className="px-6 py-4 text-green-600 font-medium">Consistent</td>
                  <td className="px-6 py-4 text-gray-500">Paginated PDFs only</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }

      if (trimmedBlock === "__PIPELINE_SVG__") {
        return (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 my-10 overflow-x-auto shadow-sm">
            <div className="font-outfit text-[11px] font-bold tracking-[0.1em] text-gray-400 uppercase mb-5">Agentic RAG Pipeline — Ingestion and Retrieval Flow</div>
            <div className="min-w-[650px]">
              <svg width="100%" viewBox="0 0 680 310" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="#9e9b93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                  <marker id="arr-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="#c44b2b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                  <marker id="arr-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="#1a6b4a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                  <marker id="arr-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                     <path d="M2 1L8 5L2 9" fill="none" stroke="#7a3b8c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                </defs>

                {/* INGESTION ROW */}
                <text fontFamily="'Outfit',sans-serif" fontSize="10" fill="#9e9b93" letterSpacing="0.1" x="40" y="30" fontWeight="600">INGESTION PIPELINE</text>

                <rect x="40" y="42" width="100" height="48" rx="4" fill="#fcfcfc" stroke="#e5e5e5" strokeWidth="1"/>
                <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#1a1916" font-weight="600" x="90" y="62" textAnchor="middle">Raw Docs</text>
                <text fontFamily="'Outfit',sans-serif" fontSize="10" fill="#9e9b93" x="90" y="79" textAnchor="middle">PDF, MD, HTML</text>

                <line x1="140" y1="66" x2="158" y2="66" stroke="#c44b2b" strokeWidth="1.5" markerEnd="url(#arr-red)"/>

                <rect x="160" y="36" width="108" height="60" rx="4" fill="#c44b2b" stroke="#c44b2b" strokeWidth="0"/>
                <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#fff" fontWeight="700" x="214" y="60" textAnchor="middle">Chunking</text>
                <text fontFamily="'Outfit',sans-serif" fontSize="10" fill="rgba(255,255,255,0.7)" x="214" y="77" textAnchor="middle">← You are here</text>

                <line x1="268" y1="66" x2="286" y2="66" stroke="#c44b2b" strokeWidth="1.5" markerEnd="url(#arr-red)"/>

                <rect x="288" y="42" width="100" height="48" rx="4" fill="#fcfcfc" stroke="#e5e5e5" strokeWidth="1"/>
                <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#1a1916" fontWeight="600" x="338" y="62" textAnchor="middle">Embedding</text>
                <text fontFamily="'Outfit',sans-serif" fontSize="10" fill="#9e9b93" x="338" y="79" textAnchor="middle">text-emb-3</text>

                <line x1="388" y1="66" x2="406" y2="66" stroke="#9e9b93" strokeWidth="1.5" markerEnd="url(#arr2)"/>

                <rect x="408" y="42" width="100" height="48" rx="4" fill="#fcfcfc" stroke="#e5e5e5" strokeWidth="1"/>
                <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#1a1916" fontWeight="600" x="458" y="62" textAnchor="middle">Vector Store</text>
                <text fontFamily="'Outfit',sans-serif" fontSize="10" fill="#9e9b93" x="458" y="79" textAnchor="middle">Pinecone/Qdrant</text>

                {/* RETRIEVAL ROW */}
                <text fontFamily="'Outfit',sans-serif" fontSize="10" fill="#9e9b93" letterSpacing="0.1" x="40" y="150" fontWeight="600">QUERY / RETRIEVAL PIPELINE</text>

                <rect x="40" y="162" width="100" height="48" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1"/>
                <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#1a1916" fontWeight="600" x="90" y="182" textAnchor="middle">User Query</text>
                <text fontFamily="'Outfit',sans-serif" fontSize="10" fill="#9e9b93" x="90" y="199" textAnchor="middle">natural language</text>

                <line x1="140" y1="186" x2="158" y2="186" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arr-green)"/>

                <rect x="160" y="162" width="100" height="48" rx="4" fill="#fcfcfc" stroke="#e5e5e5" strokeWidth="1"/>
                <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#1a1916" fontWeight="600" x="210" y="182" textAnchor="middle">Rewrite</text>
                <text fontFamily="'Outfit',sans-serif" fontSize="10" fill="#9e9b93" x="210" y="199" textAnchor="middle">HyDE / expand</text>

                <line x1="260" y1="186" x2="278" y2="186" stroke="#9e9b93" strokeWidth="1.5" markerEnd="url(#arr2)"/>

                <rect x="280" y="162" width="100" height="48" rx="4" fill="#fcfcfc" stroke="#e5e5e5" strokeWidth="1"/>
                <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#1a1916" font-weight="600" x="330" y="182" textAnchor="middle">Retrieval</text>
                <text fontFamily="'Outfit',sans-serif" fontSize="10" fill="#9e9b93" x="330" y="199" textAnchor="middle">hybrid search</text>

                <line x1="380" y1="186" x2="398" y2="186" stroke="#9e9b93" strokeWidth="1.5" markerEnd="url(#arr2)"/>

                <rect x="400" y="162" width="100" height="48" rx="4" fill="#fcfcfc" stroke="#e5e5e5" strokeWidth="1"/>
                <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#1a1916" fontWeight="600" x="450" y="182" textAnchor="middle">Rerank</text>
                <text fontFamily="'Outfit',sans-serif" fontSize="10" fill="#9e9b93" x="450" y="199" textAnchor="middle">cross-encoder</text>

                <line x1="500" y1="186" x2="518" y2="186" stroke="#9e9b93" strokeWidth="1.5" markerEnd="url(#arr2)"/>

                <rect x="520" y="162" width="100" height="48" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1"/>
                <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#1a1916" fontWeight="600" x="570" y="182" textAnchor="middle">Generate</text>
                <text fontFamily="'Outfit',sans-serif" fontSize="10" fill="#9e9b93" x="570" y="199" textAnchor="middle">LLM + context</text>

                {/* Agentic loop arrow */}
                <path d="M570 210 Q570 260 330 260 Q200 260 130 230" fill="none" stroke="#7a3b8c" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arr-purple)" opacity="0.7"/>
                <text fontFamily="'Outfit',sans-serif" fontSize="10" fontStyle="italic" fill="#7a3b8c" x="340" y="278" textAnchor="middle">Agentic loop — re-retrieve if answer quality fails</text>

                {/* Context limit note */}
                <rect x="40" y="248" width="175" height="28" rx="3" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1"/>
                <text fontFamily="'Outfit',sans-serif" fontSize="11" fill="#b45309" x="128" y="266" textAnchor="middle">Keep context &lt; 8K tokens</text>
              </svg>
            </div>
          </div>
        );
      }

      if (trimmedBlock === "__GRAPHRAG_DIAGRAM_1__") return <GraphRagDiagram1 key={index} />;
      if (trimmedBlock === "__GRAPHRAG_DIAGRAM_2__") return <GraphRagDiagram2 key={index} />;
      if (trimmedBlock === "__GRAPHRAG_DIAGRAM_3__") return <GraphRagDiagram3 key={index} />;
      
      if (trimmedBlock === "__GRAPHRAG_TABLE__") {
        return (
          <div key={index} className="overflow-x-auto my-8 border border-gray-200 rounded-xl bg-white shadow-sm">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-[#1a1e2a] text-[#4fffb0]">
                  <th className="px-6 py-4 font-bold tracking-wider uppercase text-xs border-b-2 border-[#252a38]">Dimension</th>
                  <th className="px-6 py-4 font-bold tracking-wider uppercase text-xs border-b-2 border-[#252a38]">Vector RAG</th>
                  <th className="px-6 py-4 font-bold tracking-wider uppercase text-xs border-b-2 border-[#252a38]">GraphRAG</th>
                  <th className="px-6 py-4 font-bold tracking-wider uppercase text-xs border-b-2 border-[#252a38]">Winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-[#0d0f14]">
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold text-white">Setup Complexity</td>
                  <td className="px-6 py-4 text-[#c8ccda]">Low — embed and store</td>
                  <td className="px-6 py-4 text-[#c8ccda]">High — LLM extraction needed</td>
                  <td className="px-6 py-4"><span className="inline-block px-2 py-1 rounded-md text-[11px] font-bold tracking-widest uppercase bg-[#4fffb0]/15 text-[#4fffb0]">Vector</span></td>
                </tr>
                <tr className="hover:bg-white/5 bg-[#13161e]/50">
                  <td className="px-6 py-4 font-semibold text-white">Index Cost</td>
                  <td className="px-6 py-4 text-[#c8ccda]">~$0.002 / 1K tokens</td>
                  <td className="px-6 py-4 text-[#c8ccda]">~$2–$8 / 1M tokens (GPT-4o)</td>
                  <td className="px-6 py-4"><span className="inline-block px-2 py-1 rounded-md text-[11px] font-bold tracking-widest uppercase bg-[#4fffb0]/15 text-[#4fffb0]">Vector</span></td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold text-white">Query Latency</td>
                  <td className="px-6 py-4 text-[#c8ccda]">20–80ms (ANN search)</td>
                  <td className="px-6 py-4 text-[#c8ccda]">100–600ms (graph traverse)</td>
                  <td className="px-6 py-4"><span className="inline-block px-2 py-1 rounded-md text-[11px] font-bold tracking-widest uppercase bg-[#4fffb0]/15 text-[#4fffb0]">Vector</span></td>
                </tr>
                <tr className="hover:bg-white/5 bg-[#13161e]/50">
                  <td className="px-6 py-4 font-semibold text-white">Multi-hop Reasoning</td>
                  <td className="px-6 py-4 text-[#c8ccda]">Poor — loses chain logic</td>
                  <td className="px-6 py-4 text-[#c8ccda]">Excellent — native traversal</td>
                  <td className="px-6 py-4"><span className="inline-block px-2 py-1 rounded-md text-[11px] font-bold tracking-widest uppercase bg-[#ffd66b]/15 text-[#ffd66b]">Graph</span></td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold text-white">Relationship Queries</td>
                  <td className="px-6 py-4 text-[#c8ccda]">Fails on implicit links</td>
                  <td className="px-6 py-4 text-[#c8ccda]">First-class citizen</td>
                  <td className="px-6 py-4"><span className="inline-block px-2 py-1 rounded-md text-[11px] font-bold tracking-widest uppercase bg-[#ffd66b]/15 text-[#ffd66b]">Graph</span></td>
                </tr>
                <tr className="hover:bg-white/5 bg-[#13161e]/50">
                  <td className="px-6 py-4 font-semibold text-white">Answer Traceability</td>
                  <td className="px-6 py-4 text-[#c8ccda]">Chunk references only</td>
                  <td className="px-6 py-4 text-[#c8ccda]">Full entity path</td>
                  <td className="px-6 py-4"><span className="inline-block px-2 py-1 rounded-md text-[11px] font-bold tracking-widest uppercase bg-[#ffd66b]/15 text-[#ffd66b]">Graph</span></td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold text-white">Open-Domain QA</td>
                  <td className="px-6 py-4 text-[#c8ccda]">Excellent</td>
                  <td className="px-6 py-4 text-[#c8ccda]">Moderate</td>
                  <td className="px-6 py-4"><span className="inline-block px-2 py-1 rounded-md text-[11px] font-bold tracking-widest uppercase bg-[#4fffb0]/15 text-[#4fffb0]">Vector</span></td>
                </tr>
                <tr className="hover:bg-white/5 bg-[#13161e]/50">
                  <td className="px-6 py-4 font-semibold text-white">Hallucination Risk</td>
                  <td className="px-6 py-4 text-[#c8ccda]">Moderate</td>
                  <td className="px-6 py-4 text-[#c8ccda]">Lower (entity-grounded)</td>
                  <td className="px-6 py-4"><span className="inline-block px-2 py-1 rounded-md text-[11px] font-bold tracking-widest uppercase bg-[#ffd66b]/15 text-[#ffd66b]">Graph</span></td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold text-white">Incremental Updates</td>
                  <td className="px-6 py-4 text-[#c8ccda]">Easy — add chunks</td>
                  <td className="px-6 py-4 text-[#c8ccda]">Requires re-extraction</td>
                  <td className="px-6 py-4"><span className="inline-block px-2 py-1 rounded-md text-[11px] font-bold tracking-widest uppercase bg-[#4fffb0]/15 text-[#4fffb0]">Vector</span></td>
                </tr>
                <tr className="hover:bg-white/5 bg-[#13161e]/50">
                  <td className="px-6 py-4 font-semibold text-white">Best For</td>
                  <td className="px-6 py-4 text-[#c8ccda]">FAQ, summarization, general QA</td>
                  <td className="px-6 py-4 text-[#c8ccda]">Legal, medical, financial, org data</td>
                  <td className="px-6 py-4"><span className="inline-block px-2 py-1 rounded-md text-[11px] font-bold tracking-widest uppercase bg-[#ffd66b]/15 text-[#ffd66b]">Depends</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }

      if (trimmedBlock === "__GRAPHRAG_OPINION__") {
        return (
          <div key={index} className="bg-[#13161e] border border-[#252a38] rounded-xl p-8 md:p-10 my-16 relative shadow-lg">
            <div className="absolute -top-[35px] left-8 font-outfit text-8xl text-[#7c6fff] opacity-40 leading-none">&quot;</div>
            <p className="font-outfit text-xl font-light text-[#e8eaf0] leading-relaxed italic mb-4">
              GraphRAG will become the default architecture for enterprise RAG within 18 months — but not because it&apos;s always better. It&apos;ll win because the questions enterprises actually care about are almost all relationship questions. &quot;Which regulations apply to which products in which markets?&quot; &quot;Which employees have access to which systems?&quot; &quot;Which clients share risk exposure through shared counterparties?&quot; Vector RAG was built for the internet. GraphRAG is built for the enterprise.
            </p>
            <div className="font-outfit text-sm text-[#7a8099] font-bold tracking-wide mt-6">— Author&apos;s Take · April 2026</div>
          </div>
        );
      }

      if (trimmedBlock === "__LLM_MEMORY_DIAGRAM__") return <LlmMemoryDiagram key={index} />;

      if (trimmedBlock === "__LLM_LETTA_LAYERS__") {
        return (
          <div key={index} className="border border-[#d4d4d8] rounded-xl overflow-hidden my-8 shadow-sm">
            {[
              { tier: "Hot / RAM", tierColor: "#ef4444", name: "Message Buffer", desc: "Most recent messages from the current conversation. In-context, instant access. Like CPU cache.", size: "~last 10–20 msgs", active: false },
              { tier: "Warm / Core", tierColor: "#6366f1", name: "Core Memory", desc: "Key persistent facts the agent manages itself — user name, preferences, ongoing task state. In-context but explicitly managed.", size: "~2,000 tokens", active: true },
              { tier: "Cool / SSD", tierColor: "#0ea5e9", name: "Recall Memory", desc: "Full raw conversation history stored externally. Retrieved on demand. Like fast disk — searchable but not always in-context.", size: "Unlimited", active: false },
              { tier: "Cold / HDD", tierColor: "#10b981", name: "Archival Memory", desc: "Explicitly stored knowledge — facts, summaries, documents the agent has decided to remember permanently. Vector-indexed for semantic retrieval.", size: "Unlimited", active: false },
            ].map((layer, i) => (
              <div key={i} className={`flex flex-wrap md:flex-nowrap items-start gap-4 md:gap-6 px-6 py-4 border-b last:border-b-0 border-[#e4e4e7] ${layer.active ? "bg-indigo-50/60" : "bg-white"}`}>
                <span className="font-mono text-[11px] font-medium tracking-wide w-28 shrink-0 mt-0.5" style={{ color: layer.tierColor }}>{layer.tier}</span>
                <span className="font-semibold text-[#18181b] w-40 shrink-0 text-sm">{layer.name}</span>
                <span className="text-[#71717a] text-sm leading-relaxed flex-1">{layer.desc}</span>
                <span className="font-mono text-[11px] text-[#a1a1aa] shrink-0 self-center">{layer.size}</span>
              </div>
            ))}
          </div>
        );
      }

      if (trimmedBlock === "__LLM_MEMORY_TABLE__") {
        const rows = [
          { approach: "Full history injection", persists: "Session only", cross: "No", cost: "Linear growth", scales: "Short sessions", bestFor: "Prototypes, demos", good: [false,false,false], },
          { approach: "Summarization + window", persists: "Session only", cross: "No", cost: "Bounded", scales: "Long single sessions", bestFor: "Long chatbot sessions", good: [false,false,null], },
          { approach: "External vector store", persists: "Permanent", cross: "Yes", cost: "Low + bounded", scales: "Millions of memories", bestFor: "Production assistants", good: [true,true,true], },
          { approach: "Letta tiered OS model", persists: "Permanent", cross: "Yes", cost: "Medium", scales: "Long-horizon agents", bestFor: "Persistent AI agents", good: [true,true,null], },
          { approach: "Agentic memory (A-MEM)", persists: "Permanent + evolving", cross: "Yes", cost: "High (LLM per memory)", scales: "Complex knowledge work", bestFor: "Research, enterprise AI", good: [true,true,false], },
          { approach: "Long context window only", persists: "Session only", cross: "No", cost: "Very high at scale", scales: "Single large docs", bestFor: "One-shot deep analysis", good: [false,false,false], },
        ];
        const cellCls = (val: boolean | null) => val === true ? "text-[#10b981] font-medium" : val === false ? "text-[#ef4444]" : "text-[#f59e0b]";
        return (
          <div key={index} className="overflow-x-auto my-8 border border-[#d4d4d8] rounded-xl shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#18181b] text-white">
                  {["Approach","Persists?","Cross-session?","Cost","Scales to?","Best For"].map(h => (
                    <th key={h} className="px-5 py-3.5 font-bold tracking-wider uppercase text-xs border-b-2 border-[#27272a] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={i % 2 === 1 ? "bg-[#fafaf9]" : "bg-white"}>
                    <td className="px-5 py-3 font-semibold text-[#18181b] whitespace-nowrap">{r.approach}</td>
                    <td className={`px-5 py-3 whitespace-nowrap ${cellCls(r.good[0])}`}>{r.persists}</td>
                    <td className={`px-5 py-3 whitespace-nowrap ${cellCls(r.good[1])}`}>{r.cross}</td>
                    <td className={`px-5 py-3 whitespace-nowrap ${cellCls(r.good[2])}`}>{r.cost}</td>
                    <td className="px-5 py-3 text-[#3f3f46] whitespace-nowrap">{r.scales}</td>
                    <td className="px-5 py-3 text-[#3f3f46] whitespace-nowrap">{r.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      if (trimmedBlock === "__LLM_MEMORY_OPINION__") {
        return (
          <div key={index} className="relative my-14 p-8 md:p-10 bg-white border border-[#d4d4d8] rounded-xl shadow-sm">
            <div className="absolute top-3 left-6 font-serif text-8xl text-[#6366f1] opacity-20 leading-none select-none">&quot;</div>
            <p className="font-serif text-xl italic text-[#18181b] leading-relaxed mb-4 pt-4">
              The entire memory industry around LLMs exists because of one architectural fact: the context window is the model&apos;s only sense organ. Every framework — LangChain, LlamaIndex, Letta, Mem0 — is fundamentally in the business of deciding what 1% of the available information to put in front of the model&apos;s face. The teams that win at production AI are not the ones with the smartest models. They are the ones with the most disciplined context engineering. Memory architecture is competitive advantage disguised as plumbing.
            </p>
            <div className="text-[13px] text-[#a1a1aa] font-medium">— Personal take · Based on production AI system patterns through Q1 2026</div>
          </div>
        );
      }

      if (trimmedBlock === "__VEC_EMB_ONEHOT__") {
        return <OneHotDiagram key={index} />;
      }
      if (trimmedBlock === "__VEC_EMB_SPACE__") {
        return <EmbeddingSpaceDiagram key={index} />;
      }
      if (trimmedBlock === "__VEC_EMB_TIMELINE__") {
        return <EvoTimeline key={index} />;
      }
      if (trimmedBlock === "__VEC_EMB_TABLE__") {
        return <VecEmbTable key={index} />;
      }
      if (trimmedBlock === "__VEC_EMB_FLOWCHART__") {
        return <DecisionFlowchart key={index} />;
      }
      if (trimmedBlock === "__VEC_EMB_OPINION__") {
        return <VecEmbOpinion key={index} />;
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
        <motion.div
           ref={scrollContainerRef}
           onScroll={handleScroll}
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
            
            {/* TOP ACTIONS: SHARE + CLOSE */}
            <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[120] flex items-center gap-2">
              <button
                onClick={handleShare}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-full transition-all shadow-md border ${
                  copied
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-white border-gray-200 hover:border-gray-400 text-gray-700 hover:text-black"
                }`}
              >
                {copied ? <><Check size={14} /> Copied!</> : <><Share2 size={14} /> Share</>}
              </button>
              <button
                onClick={onClose}
                className="p-3 bg-gray-100 hover:bg-black text-black hover:text-white rounded-full transition-all group shadow-md"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

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
                              ? "bg-red-600 text-white font-bold shadow-lg" 
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
                
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  className={`flex-shrink-0 transition-transform duration-500 ${isMobileTocOpen ? 'rotate-90' : '-rotate-90'}`}
                >
                  <circle cx="10" cy="10" r="8" stroke="#4b5563" strokeWidth="2" fill="none" />
                  <motion.circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    style={{ pathLength: scrollYProgress }}
                  />
                </svg>
              </button>
            </div>
          )}
        </motion.div>
  );
}
