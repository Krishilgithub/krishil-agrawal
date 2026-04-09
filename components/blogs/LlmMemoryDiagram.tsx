import React from "react";

export const LlmMemoryDiagram = () => (
  <div className="bg-[#f2f0ec] border border-[#d4d4d8] rounded-xl p-7 md:p-8 my-8 shadow-sm overflow-x-auto">
    <div className="font-outfit text-[11px] text-[#71717a] tracking-[0.08em] uppercase mb-5">Anatomy of a context window — what actually reaches the model</div>
    <div className="min-w-[700px] flex justify-center">
        <svg width="100%" viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
      </defs>

      {/* Main context window rectangle */}
      <rect x="260" y="30" width="390" height="260" rx="8"
        fill="rgba(14,165,233,0.05)" stroke="rgba(14,165,233,0.4)" strokeWidth="1"/>
      <text fontFamily="'Outfit', monospace" fontSize="10" fill="rgba(14,165,233,0.8)" x="350" y="20" letterSpacing="0.08">CONTEXT WINDOW (finite tokens)</text>

      {/* Sections inside context window */}
      <rect x="268" y="38" width="374" height="44" rx="4" fill="rgba(99,102,241,0.12)" stroke="rgba(99,102,241,0.3)" strokeWidth="0.5"/>
      <text fontFamily="'Outfit', monospace" fontSize="11" fill="rgba(99,102,241,0.9)" x="278" y="58" fontWeight="500">System Prompt</text>
      <text fontFamily="'Outfit', monospace" fontSize="10" fill="#71717a" x="278" y="74">instructions, persona, user preferences</text>

      <rect x="268" y="90" width="374" height="44" rx="4" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.3)" strokeWidth="0.5"/>
      <text fontFamily="'Outfit', monospace" fontSize="11" fill="rgba(16,185,129,0.9)" x="278" y="110" fontWeight="500">Retrieved Memory</text>
      <text fontFamily="'Outfit', monospace" fontSize="10" fill="#71717a" x="278" y="126">past conversations, facts, documents (from external stores)</text>

      <rect x="268" y="142" width="374" height="44" rx="4" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.3)" strokeWidth="0.5"/>
      <text fontFamily="'Outfit', monospace" fontSize="11" fill="rgba(245,158,11,0.9)" x="278" y="162" fontWeight="500">Current Conversation</text>
      <text fontFamily="'Outfit', monospace" fontSize="10" fill="#71717a" x="278" y="178">all messages in this session so far</text>

      <rect x="268" y="194" width="374" height="44" rx="4" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.3)" strokeWidth="0.5"/>
      <text fontFamily="'Outfit', monospace" fontSize="11" fill="rgba(239,68,68,0.9)" x="278" y="214" fontWeight="500">Tool Results</text>
      <text fontFamily="'Outfit', monospace" fontSize="10" fill="#71717a" x="278" y="230">API calls, code execution, search results</text>

      <rect x="268" y="246" width="374" height="36" rx="4" fill="rgba(14,165,233,0.12)" stroke="rgba(14,165,233,0.4)" strokeWidth="0.5"/>
      <text fontFamily="'Outfit', monospace" fontSize="11" fill="rgba(14,165,233,0.9)" x="278" y="270" fontWeight="500">Current User Query</text>

      {/* LLM box */}
      <rect x="40" y="130" width="140" height="60" rx="6" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.5)" strokeWidth="1"/>
      <text fontFamily="'Outfit', monospace" fontSize="12" fill="#6366f1" x="110" y="156" textAnchor="middle" fontWeight="500">LLM</text>
      <text fontFamily="'Outfit', monospace" fontSize="10" fill="#71717a" x="110" y="173" textAnchor="middle">(reads context only)</text>

      {/* Arrow: context → LLM (reads) */}
      <line x1="258" y1="160" x2="182" y2="160" stroke="rgba(14,165,233,0.6)" strokeWidth="1.2" markerEnd="url(#arrm)"/>
      <text fontFamily="'Outfit', monospace" fontSize="9" fill="#71717a" x="210" y="154" textAnchor="middle">reads</text>

      {/* Token limit warning */}
      <text fontFamily="'Outfit', monospace" fontSize="10" fill="#f59e0b" x="456" y="298" textAnchor="middle">⚠ token budget finite — choose carefully</text>
    </svg>
    </div>
  </div>
);
