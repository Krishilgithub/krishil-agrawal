"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Database, 
  TerminalSquare, 
  Cpu, 
  Zap, 
  AlertTriangle,
  ServerCrash,
  CheckCircle2
} from "lucide-react";

/* ── HERO STATS ── */
export function McpHeroStats() {
  const stats = [
    { val: "30-40%", desc: "Of your LLM's context window is often wasted just by loading the JSON schemas of 50+ MCP tools before the user even asks a question." },
    { val: "3x", desc: "Increase in hallucination rates when an agent is forced to choose between too many overlapping tool descriptions." },
    { val: "O(1)", desc: "The context footprint of the 'Introspection' pattern. You load one directory tool, which dynamically loads execution tools as needed." },
    { val: "Zero", desc: "The number of times you should connect the entire AWS SDK as an MCP server. Use CLI proxies instead." },
  ];
  return (
    <div className="bg-[#0a0a0a] text-white p-8 rounded-2xl flex flex-col md:flex-row gap-8 my-12 shadow-xl border border-white/5">
      {stats.map(({ val, desc }, i) => (
        <div key={i} className="flex-1 min-w-[160px] md:border-r last:border-r-0 border-white/10 md:pr-8">
          <div className="font-outfit text-4xl md:text-5xl font-bold text-red-500 mb-2">{val}</div>
          <div className="text-sm text-white/60 leading-relaxed">{desc}</div>
        </div>
      ))}
    </div>
  );
}

/* ── CONTEXT BLOAT DIAGRAM ── */
export function ContextBloatDiagram() {
  return (
    <div className="my-12 p-8 rounded-3xl bg-white border border-rose-200 shadow-sm overflow-hidden relative">
      <div className="mb-10 text-center">
        <h3 className="font-outfit text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <AlertTriangle className="text-rose-500" size={24} />
          The "Front-Loaded" Anti-Pattern
        </h3>
        <p className="text-sm text-gray-500 mt-2">Dumping 50 tool schemas into the system prompt destroys reasoning capacity.</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        {/* The Heavy Payload */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="relative w-64"
        >
          <div className="absolute inset-0 bg-rose-500 blur-xl opacity-20 rounded-full" />
          <div className="bg-white border-2 border-rose-300 rounded-2xl p-4 shadow-lg relative z-10">
            <div className="text-xs font-bold text-rose-600 mb-3 text-center uppercase tracking-wider border-b border-rose-100 pb-2">
              System Prompt Tool Array
            </div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-6 bg-rose-50 rounded animate-pulse border border-rose-100 flex items-center px-2">
                  <div className="w-full h-2 bg-rose-200 rounded" />
                </div>
              ))}
              <div className="text-center text-xs text-rose-400 font-bold">... 45 more tools ...</div>
            </div>
            <div className="mt-4 text-center bg-rose-100 text-rose-800 text-[10px] font-mono py-1 rounded">
              Total: 8,450 Tokens
            </div>
          </div>
        </motion.div>

        {/* The Crushed Agent */}
        <motion.div
          initial={{ scale: 1 }}
          whileInView={{ scale: [1, 0.95, 1.05, 0.9] }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center shadow-xl border-4 border-rose-500 relative">
            <ServerCrash size={40} className="text-white" />
            <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
              OOM
            </div>
          </div>
          <div className="font-outfit font-bold mt-4 text-gray-800 text-center">
            Agent Context Window
            <div className="text-xs text-rose-500 font-mono mt-1">"I forgot what I was doing"</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── INTROSPECTION PATTERN DIAGRAM ── */
export function IntrospectionPatternDiagram() {
  return (
    <div className="my-12 p-8 rounded-3xl bg-gray-900 border border-gray-800 shadow-xl overflow-hidden text-white relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-500" />
      
      <div className="mb-10 text-center">
        <h3 className="font-outfit text-2xl font-bold text-white flex items-center justify-center gap-2">
          <CheckCircle2 className="text-emerald-400" size={28} />
          The "corsair.dev" Introspection Pattern
        </h3>
        <p className="text-sm text-gray-400 mt-2">Treat the agent like a CLI operator. Don't tell it everything; let it discover what it needs.</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative z-10">
        
        {/* Step 1: The lightweight agent */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg border border-white/20">
            <Cpu size={36} className="text-white" />
          </div>
          <div className="font-outfit font-bold mt-4 text-center">Agent</div>
          <div className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded mt-1">
            System Prompt: 400 Tokens
          </div>
        </div>

        {/* The interaction loop */}
        <div className="flex flex-col items-center gap-2 min-w-[200px]">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
            <span>Call:</span> <span className="bg-gray-800 px-2 py-0.5 rounded border border-gray-700">get_available_tools()</span>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
            <span>Return:</span> <span className="bg-gray-800 px-2 py-0.5 rounded border border-gray-700">["resend", "exa", "postgres"]</span>
          </div>
        </div>

        {/* Step 2: The MCP Server Hub */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 shadow-2xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-gray-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              Optimized MCP
            </div>
            
            <div className="space-y-3 mt-3">
              <div className="flex items-center gap-3 bg-gray-900 border border-emerald-500/30 p-2 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/10" />
                <TerminalSquare size={16} className="text-emerald-400 relative z-10" />
                <span className="text-sm font-mono relative z-10">Introspector Tool</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 p-2 rounded-lg opacity-50">
                <Zap size={16} className="text-gray-400" />
                <span className="text-sm font-mono line-through decoration-rose-500">Execution Tool 1</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 p-2 rounded-lg opacity-50">
                <Database size={16} className="text-gray-400" />
                <span className="text-sm font-mono line-through decoration-rose-500">Execution Tool 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10 bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-4 text-center">
        <p className="text-emerald-300 text-sm font-medium">
          Instead of injecting execution schemas initially, the server only exposes an introspector. The agent discovers tools on-demand, caching schemas in its internal memory only when necessary.
        </p>
      </div>
    </div>
  );
}

/* ── MCP TAKEAWAYS ── */
export function McpTakeaways() {
  const takeaways = [
    { title: "Treat Agents like CLI Users", desc: "You don't memorize every flag of the AWS CLI before using it. You use `aws --help`. Build your MCP servers the exact same way.", icon: "💻" },
    { title: "Beware the God-Server", desc: "Do not build one massive MCP server that handles database access, email, and web scraping. Split them into specialized, lightweight processes.", icon: "🦖" },
    { title: "Security by Obscurity?", desc: "No. Security by Introspection. Front-loading schemas exposes your entire attack surface instantly. On-demand discovery allows you to dynamically gate schemas based on agent permissions.", icon: "🛡️" },
    { title: "The Spec is Fine", desc: "The Model Context Protocol specification isn't flawed. It's the implementation ecosystem that needs to mature past the 'Hello World' phase.", icon: "📜" },
  ];
  return (
    <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-4">
      {takeaways.map((t) => (
        <div key={t.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl mb-3">{t.icon}</div>
          <div className="font-outfit font-bold text-gray-900 mb-2">{t.title}</div>
          <div className="text-sm text-gray-600 leading-relaxed">{t.desc}</div>
        </div>
      ))}
    </div>
  );
}
