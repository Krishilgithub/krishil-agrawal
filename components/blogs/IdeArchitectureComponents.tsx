"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Puzzle, 
  GitFork, 
  Bot, 
  TerminalSquare, 
  CheckCircle2, 
  XCircle,
  FileCode2,
  RefreshCw,
  Box
} from "lucide-react";

/* ── ARCHITECTURE HERO ── */
export function IdeArchitectureHero() {
  const paradigms = [
    { 
      name: "VS Code AI", 
      type: "The Extension", 
      icon: <Puzzle size={32} className="text-blue-500" />, 
      desc: "Bounded by the Extension Host API. Great for chat and autocomplete, but lacks deep editor access.",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    { 
      name: "Cursor", 
      type: "The Forked Editor", 
      icon: <GitFork size={32} className="text-violet-500" />, 
      desc: "Native root access to rendering and file systems. Enables Speculative Edits and Shadow Workspaces.",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20"
    },
    { 
      name: "Antigravity", 
      type: "The Autonomous Agent", 
      icon: <Bot size={32} className="text-emerald-500" />, 
      desc: "An independent system process. Can execute terminal commands, parse diffs, and manage persistent context.",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      {paradigms.map((p) => (
        <div key={p.name} className={`p-6 rounded-2xl border ${p.border} ${p.bg} flex flex-col items-center text-center backdrop-blur-sm shadow-sm`}>
          <div className="mb-4 bg-white/10 p-4 rounded-full shadow-inner">
            {p.icon}
          </div>
          <div className="font-outfit font-black text-xl text-gray-900 dark:text-white mb-1">{p.name}</div>
          <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">{p.type}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ── SHADOW WORKSPACE DIAGRAM ── */
export function ShadowWorkspaceDiagram() {
  return (
    <div className="my-12 p-8 rounded-3xl bg-gray-50 border border-gray-200 shadow-sm overflow-hidden relative">
      <div className="text-center mb-10">
        <h3 className="font-outfit text-xl font-bold text-gray-900">Cursor's "Shadow Workspace"</h3>
        <p className="text-sm text-gray-500 mt-2">Validating code invisibly before the user ever sees it.</p>
      </div>

      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 relative">
        {/* Step 1: LLM Generates */}
        <div className="flex-1 bg-white border border-gray-200 p-5 rounded-2xl shadow-sm z-10 flex flex-col items-center">
          <div className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            1. Generation
          </div>
          <FileCode2 size={32} className="text-gray-400 mb-2" />
          <div className="text-sm font-mono text-center text-gray-600">
            <span className="text-purple-600">const</span> user = {"{"} id: <span className="text-blue-500">1</span> {"}"};<br/>
            <span className="text-rose-500 line-through">user.name = "Alice";</span>
          </div>
        </div>

        {/* Arrow Right */}
        <div className="hidden md:flex flex-col justify-center items-center">
          <motion.div 
            animate={{ x: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-10 h-0.5 bg-gray-300 relative"
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-gray-300 rotate-45" />
          </motion.div>
        </div>

        {/* Step 2: Shadow Validation */}
        <div className="flex-1 bg-gray-900 border border-gray-700 p-5 rounded-2xl shadow-xl z-10 flex flex-col items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-rose-500/10" />
          <div className="bg-rose-500/20 text-rose-300 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-rose-500/30 uppercase tracking-wider relative z-10">
            2. Invisible Validation
          </div>
          <Box size={32} className="text-gray-500 mb-2 relative z-10" />
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 1, 0, 1] }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 2 }}
            className="text-xs font-mono text-rose-400 bg-black/50 p-2 rounded w-full relative z-10 text-center"
          >
            TS2339: Property 'name' does not exist on type '{'{'} id: number {'}'}'.
          </motion.div>
        </div>

        {/* Arrow Loop */}
        <div className="hidden md:flex flex-col justify-center items-center relative">
          <motion.svg 
            width="60" 
            height="40" 
            className="absolute top-1/2 -translate-y-1/2 -left-4 z-0"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
          >
            <path d="M 50 20 Q 50 0 25 0 T 0 20" fill="transparent" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" />
            <polygon points="0,20 5,15 -5,15" fill="#d1d5db" transform="rotate(-90 0 20)" />
          </motion.svg>
        </div>

        {/* Step 3: Fixed Output */}
        <div className="flex-1 bg-white border-2 border-emerald-400 p-5 rounded-2xl shadow-md z-10 flex flex-col items-center">
          <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            3. User Sees
          </div>
          <CheckCircle2 size={32} className="text-emerald-500 mb-2" />
          <div className="text-sm font-mono text-center text-gray-800">
            <span className="text-purple-600">const</span> user = {"{"} <br/>
            &nbsp;&nbsp;id: <span className="text-blue-500">1</span>,<br/>
            &nbsp;&nbsp;name: <span className="text-green-600">"Alice"</span><br/>
            {"}"};
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── ANTIGRAVITY FLOW DIAGRAM ── */
export function AntigravityFlowDiagram() {
  return (
    <div className="my-14 bg-[#0a0a0a] text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="mb-10 relative z-10">
        <h3 className="font-outfit text-2xl font-bold flex items-center gap-2">
          <Bot className="text-emerald-400" />
          The Antigravity Execution Loop
        </h3>
        <p className="text-gray-400 text-sm mt-1">Autonomous system-level execution, detached from the editor's UI thread.</p>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
          <div className="bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center font-bold font-outfit">1</div>
          <div>
            <div className="font-bold">Planning Mode & Artifacts</div>
            <div className="text-xs text-gray-400 font-mono mt-1">Writes `implementation_plan.md` to file system. Awaits user explicit approval.</div>
          </div>
        </div>
        
        <div className="ml-4 w-0.5 h-4 bg-white/20" />

        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
          <div className="bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center font-bold font-outfit">2</div>
          <div className="flex-1">
            <div className="font-bold">Exact Diff Generation</div>
            <div className="text-xs text-gray-400 font-mono mt-1">Uses `multi_replace_file_content` to apply surgical AST-aware diffs directly to the file system.</div>
          </div>
          <FileCode2 className="text-gray-500" />
        </div>

        <div className="ml-4 w-0.5 h-4 bg-white/20" />

        <div className="flex items-center gap-4 bg-white/5 border border-emerald-500/30 p-4 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <div className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold font-outfit">3</div>
          <div className="flex-1">
            <div className="font-bold text-emerald-400">Asynchronous System Tools</div>
            <div className="text-xs text-gray-400 font-mono mt-1">Spawns `npm run build`, monitors `command_status`, and recursively fixes errors.</div>
          </div>
          <TerminalSquare className="text-emerald-400" />
        </div>
      </div>
    </div>
  );
}

/* ── FEATURE COMPARISON TABLE ── */
export function IdeFeatureTable() {
  const features = [
    { name: "Execution Environment", vs: "Extension Host Sandbox", cursor: "Native Editor Engine", anti: "System OS Process" },
    { name: "File Manipulation", vs: "WorkspaceEdits (Buffer)", cursor: "Speculative Engine / AST", anti: "Direct File System Diffs" },
    { name: "Compiler Validation", vs: "Requires User Action", cursor: "Automatic (Shadow Workspace)", anti: "Automatic (Terminal Tools)" },
    { name: "Terminal Execution", vs: "Limited / Prompt Only", cursor: "Integrated Command Generation", anti: "Full Autonomous Async Shell" },
    { name: "Persistent Memory", vs: "Chat History", cursor: "Index / RAG Embeddings", anti: "Knowledge Items (KIs) / Brain" },
  ];

  return (
    <div className="my-10 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <span className="text-xs font-black tracking-widest uppercase text-gray-500">Architectural Matrix 2026</span>
      </div>
      <div data-lenis-prevent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-white">
              <th className="text-left px-5 py-4 text-xs font-bold tracking-widest uppercase text-gray-400">Capability</th>
              <th className="text-left px-5 py-4 text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50/50">VS Code AI</th>
              <th className="text-left px-5 py-4 text-xs font-bold tracking-widest uppercase text-violet-600 bg-violet-50/50">Cursor</th>
              <th className="text-left px-5 py-4 text-xs font-bold tracking-widest uppercase text-emerald-600 bg-emerald-50/50">Antigravity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {features.map((f, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors bg-white">
                <td className="px-5 py-4 font-bold text-gray-900 whitespace-nowrap">{f.name}</td>
                <td className="px-5 py-4 text-gray-600 bg-blue-50/10">{f.vs}</td>
                <td className="px-5 py-4 text-gray-900 font-medium bg-violet-50/10">{f.cursor}</td>
                <td className="px-5 py-4 text-emerald-700 font-bold bg-emerald-50/10">{f.anti}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
