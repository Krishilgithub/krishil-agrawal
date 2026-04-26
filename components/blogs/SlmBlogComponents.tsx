"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Activity,
  MessageSquare,
  Globe,
  Search,
  PieChart,
  Settings,
  Lightbulb,
  FileText,
  UserCheck
} from "lucide-react";

/* ── HERO STATS ── */
export function SlmHeroStats() {
  const stats = [
    { val: "85%", desc: "Cost reduction achieved by routing routine customer service queries to local SLMs instead of cloud LLMs." },
    { val: "60ms", desc: "Average inference latency for an 8B parameter SLM on edge hardware, compared to 800ms+ for frontier APIs." },
    { val: "100%", desc: "Data privacy guarantee. SLMs run inside your VPC or air-gapped environment; no PII ever hits an external API." },
    { val: "0.2", desc: "The temperature you should use for Semantic Routers — classification requires determinism, not creativity." },
  ];
  return (
    <div className="bg-[#0a0a0a] text-white p-8 rounded-2xl flex flex-col md:flex-row gap-8 my-12 shadow-xl">
      {stats.map(({ val, desc }, i) => (
        <div key={i} className="flex-1 min-w-[160px] md:border-r last:border-r-0 border-white/10 md:pr-8">
          <div className="font-outfit text-4xl md:text-5xl font-bold text-violet-500 mb-2">{val}</div>
          <div className="text-sm text-white/60 leading-relaxed">{desc}</div>
        </div>
      ))}
    </div>
  );
}

/* ── ROUTER ARCHITECTURE DIAGRAM ── */
export function RouterArchitectureDiagram() {
  return (
    <div className="my-12 p-6 md:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm">
      <div className="mb-8">
        <h3 className="font-outfit text-xl font-bold text-gray-900">The Semantic Router Pattern</h3>
        <p className="text-sm text-gray-500">How enterprises cut API costs by 80% without losing reasoning capabilities.</p>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* User Query */}
        <div className="bg-gray-50 border border-gray-200 px-6 py-3 rounded-xl text-sm font-medium text-gray-700 shadow-sm">
          Incoming User Query
        </div>

        {/* Arrow down */}
        <div className="w-px h-8 bg-gray-300"></div>

        {/* Semantic Router */}
        <div className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-center shadow-lg w-full max-w-sm relative">
          <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Gatekeeper
          </div>
          <div className="font-outfit font-bold text-lg">Semantic Router</div>
          <div className="text-indigo-100 text-xs mt-1">Embeds query & checks complexity</div>
        </div>

        {/* Split arrows */}
        <div className="flex w-full max-w-lg justify-between relative mt-2">
          {/* Left path */}
          <div className="w-1/2 flex flex-col items-center border-t-2 border-l-2 border-indigo-200 rounded-tl-xl pt-6 mt-[-2px]">
            <div className="bg-white border-2 border-emerald-500 px-5 py-3 rounded-xl text-center shadow-sm -mt-10 mb-4 bg-emerald-50">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">Routine Task</span>
              <span className="text-sm text-emerald-600">FAQ, Summarization, Extraction</span>
            </div>
            <div className="bg-emerald-600 text-white px-6 py-4 rounded-xl w-48 text-center shadow-md">
              <div className="font-outfit font-bold">Local SLM</div>
              <div className="text-emerald-100 text-[10px] mt-1">Llama 3 8B / Phi-4</div>
              <div className="mt-2 text-xs font-mono bg-emerald-800/50 rounded py-1">Cost: $0.00</div>
              <div className="text-xs font-mono bg-emerald-800/50 rounded py-1 mt-1">Lat: ~50ms</div>
            </div>
          </div>

          {/* Right path */}
          <div className="w-1/2 flex flex-col items-center border-t-2 border-r-2 border-indigo-200 rounded-tr-xl pt-6 mt-[-2px]">
            <div className="bg-white border-2 border-rose-500 px-5 py-3 rounded-xl text-center shadow-sm -mt-10 mb-4 bg-rose-50">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-widest block mb-1">Complex Task</span>
              <span className="text-sm text-rose-600">Reasoning, Coding, Synthesis</span>
            </div>
            <div className="bg-gray-900 text-white px-6 py-4 rounded-xl w-48 text-center shadow-md">
              <div className="font-outfit font-bold">Frontier LLM</div>
              <div className="text-gray-400 text-[10px] mt-1">GPT-4o / Claude 3.5</div>
              <div className="mt-2 text-xs font-mono bg-gray-800 rounded py-1">Cost: High</div>
              <div className="text-xs font-mono bg-gray-800 rounded py-1 mt-1">Lat: ~800ms+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SLM VS LLM COMPARISON TABLE ── */
export function SlmVslLlmTable() {
  const rows = [
    { feature: "Parameters", slm: "1B - 10B (Fit in consumer GPU)", llm: "100B+ (Require server clusters)" },
    { feature: "Primary Focus", slm: "Task-specific, operational, fast", llm: "General-purpose, deep reasoning" },
    { feature: "Deployment", slm: "Edge, On-prem, Mobile, VPC", llm: "Cloud APIs exclusively" },
    { feature: "Cost Structure", slm: "Fixed hardware cost (No per-token fee)", llm: "Variable API costs (Scales with usage)" },
    { feature: "Privacy", slm: "Absolute (Data never leaves)", llm: "Requires trust in provider/B2B agreements" },
    { feature: "Fine-tuning", slm: "Cheap and fast (LoRA on a single GPU)", llm: "Expensive and complex" },
  ];
  return (
    <div className="my-10 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <span className="text-xs font-black tracking-widest uppercase text-gray-500">The 2025 Model Decision Matrix</span>
      </div>
      <div data-lenis-prevent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-white">
              <th className="text-left px-5 py-4 text-xs font-bold tracking-widest uppercase text-gray-400 w-1/4">Dimension</th>
              <th className="text-left px-5 py-4 text-xs font-bold tracking-widest uppercase text-violet-600 bg-violet-50/50 w-3/8">Small Language Models (SLM)</th>
              <th className="text-left px-5 py-4 text-xs font-bold tracking-widest uppercase text-rose-600 bg-rose-50/50 w-3/8">Frontier LLMs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50/30 transition-colors bg-white">
                <td className="px-5 py-4 font-semibold text-gray-900">{r.feature}</td>
                <td className="px-5 py-4 text-gray-700 bg-violet-50/10">{r.slm}</td>
                <td className="px-5 py-4 text-gray-700 bg-rose-50/10">{r.llm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── SLM IMPACT DIAGRAM (Recreating User Image) ── */
export function SlmImpactDiagram() {
  const impacts = [
    { icon: <Activity size={20} />, label: "Accurate Diagnoses", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
    { icon: <FileText size={20} />, label: "Summarizing Patient Records", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200" },
    { icon: <Search size={20} />, label: "Staying Updated", color: "text-cyan-500", bg: "bg-cyan-50", border: "border-cyan-200" },
    { icon: <MessageSquare size={20} />, label: "Instant Response Generation", color: "text-lime-600", bg: "bg-lime-50", border: "border-lime-200" },
    { icon: <UserCheck size={20} />, label: "Personalized Interactions", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" },
    { icon: <Globe size={20} />, label: "Real-Time Translation", color: "text-rose-400", bg: "bg-rose-50", border: "border-rose-200" },
    { icon: <Search size={20} />, label: "Contextual Accuracy", color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200" },
    { icon: <MessageSquare size={20} />, label: "Public Opinion Analysis", color: "text-pink-500", bg: "bg-pink-50", border: "border-pink-200" },
    { icon: <Settings size={20} />, label: "Improving Products & Services", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
    { icon: <TrendingUp size={20} />, label: "Trend Identification", color: "text-teal-500", bg: "bg-teal-50", border: "border-teal-200" },
  ];

  return (
    <div className="my-14 p-8 rounded-3xl bg-white border border-gray-100 shadow-sm flex flex-col items-center overflow-hidden relative">
      <div className="text-center mb-16 relative z-10">
        <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-2">Transformative Impact of SLMs</h3>
        <p className="text-sm text-gray-500">Enterprise applications running securely at the edge.</p>
      </div>

      <div className="relative w-full max-w-3xl aspect-square md:aspect-auto md:h-[450px] flex items-center justify-center">
        {/* Center Node */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="absolute z-20 w-32 h-32 rounded-full bg-white border-4 border-gray-800 shadow-xl flex items-center justify-center"
        >
          <Lightbulb size={48} strokeWidth={1.5} className="text-gray-800" />
        </motion.div>

        {/* SVG Connector Lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <svg className="overflow-visible" width="0" height="0">
            {impacts.map((_, index) => {
              const angle = (index * 36) * (Math.PI / 180);
              const radiusDesktop = 180;
              
              // Start line at the edge of the center bulb (radius ~64px)
              const x1 = Math.cos(angle) * 75;
              const y1 = Math.sin(angle) * 75;
              
              // End line just before the node icon
              const x2 = Math.cos(angle) * (radiusDesktop - 40);
              const y2 = Math.sin(angle) * (radiusDesktop - 40);
              
              return (
                <motion.line
                  key={`line-${index}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#e5e7eb"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        </div>

        {/* Nodes */}
        {impacts.map((item, index) => {
          const angle = (index * 36) * (Math.PI / 180);
          // Calculate positions. Using different radius for mobile vs desktop for responsiveness
          const radiusDesktop = 180;
          const radiusMobile = 140;
          
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 0, y: 0 }}
              whileInView={{ 
                opacity: 1, 
                x: `calc(cos(${angle}) * ${radiusDesktop}px)`, 
                y: `calc(sin(${angle}) * ${radiusDesktop}px)` 
              }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 50 }}
              className="absolute z-10 flex flex-col items-center w-32"
              style={{
                // Fallback for browsers that don't support math functions in transform
                transform: `translate(calc(cos(${angle}) * ${radiusDesktop}px), calc(sin(${angle}) * ${radiusDesktop}px))`
              }}
            >
              {/* Connector line removed, using SVG above instead */}
              
              <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center mb-2 shadow-sm ${item.bg} ${item.border} ${item.color}`}>
                {item.icon}
              </div>
              <div className="text-[11px] font-semibold text-center text-gray-700 leading-tight">
                {item.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ── GOTCHAS GRID ── */
export function SlmGotchasGrid() {
  const gotchas = [
    { title: "Zero-Shot Cross-Domain", desc: "SLMs struggle to synthesize information across completely different domains without extensive few-shot prompting or fine-tuning.", icon: "❌" },
    { title: "Long Context Reasoning", desc: "While SLMs now support 128k context windows, their 'needle in a haystack' retrieval accuracy drops much faster than frontier models.", icon: "📉" },
    { title: "Complex JSON Schemas", desc: "Extracting highly nested, strict JSON schemas often results in syntax errors with 8B models. They need simpler, flatter output formats.", icon: "⚠️" },
    { title: "Nuance & Tone", desc: "SLMs often sound robotic or overly direct. They lack the nuanced tone adjustments that 100B+ parameter models handle effortlessly.", icon: "🤖" },
  ];
  return (
    <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-4">
      {gotchas.map((g) => (
        <div key={g.title} className="bg-white border border-rose-100 rounded-2xl p-6 shadow-sm">
          <div className="text-2xl mb-3">{g.icon}</div>
          <div className="font-outfit font-bold text-gray-900 mb-2">{g.title}</div>
          <div className="text-sm text-gray-600 leading-relaxed">{g.desc}</div>
        </div>
      ))}
    </div>
  );
}
