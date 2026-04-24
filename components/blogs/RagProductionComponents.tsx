"use client";
import React from "react";

/* ── HERO STATS ── */
export function RagProdHeroStats() {
  const stats = [
    { val: "80%", desc: "of RAG prototypes that fail in production fail at the retrieval layer, not the LLM — Morgan Stanley's own internal audit" },
    { val: "3x", desc: "latency reduction Notion achieved by cutting ingestion lag from 24+ hrs to ~2 hrs using Kafka + Hudi CDC pipelines" },
    { val: "4", desc: "distinct failure modes: retrieval recall, precision, grounding, and staleness — each needs a separate fix" },
    { val: "$0", desc: "extra model cost for hybrid BM25+vector search — yet it's the single highest-ROI retrieval upgrade you can make" },
  ];
  return (
    <div className="bg-[#0a0a0a] text-white p-8 rounded-2xl flex flex-col md:flex-row gap-8 my-12">
      {stats.map(({ val, desc }, i) => (
        <div key={i} className="flex-1 min-w-[160px] md:border-r last:border-r-0 border-white/10 md:pr-8">
          <div className="font-outfit text-4xl md:text-5xl font-bold text-red-500 mb-2">{val}</div>
          <div className="text-sm text-white/50 leading-relaxed">{desc}</div>
        </div>
      ))}
    </div>
  );
}

/* ── TWO-WORKFLOW ARCHITECTURE ── */
export function RagTwoWorkflows() {
  return (
    <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Offline */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-900 px-5 py-4">
          <div className="text-xs font-black tracking-widest uppercase text-gray-400 mb-1">Offline Workflow</div>
          <div className="text-white font-outfit font-bold">Indexing Pipeline</div>
          <div className="text-gray-400 text-xs mt-1">Runs async — latency doesn't matter</div>
        </div>
        <div className="bg-white divide-y divide-gray-100">
          {[
            { step: "01", label: "Ingest", detail: "PDFs, HTML, code, DB rows, APIs", color: "#6366f1" },
            { step: "02", label: "Parse & Clean", detail: "Preserve tables, headers, lists — don't flatten", color: "#8b5cf6" },
            { step: "03", label: "Chunk", detail: "Structure-aware: respect semantic boundaries", color: "#0ea5e9" },
            { step: "04", label: "Enrich", detail: "Prepend section title + doc metadata to every chunk", color: "#10b981" },
            { step: "05", label: "Embed", detail: "Same model you'll use at query time — always", color: "#f59e0b" },
            { step: "06", label: "Store", detail: "Vector DB + BM25 index in parallel", color: "#ef4444" },
          ].map(({ step, label, detail, color }) => (
            <div key={step} className="flex items-start gap-4 px-5 py-3 hover:bg-gray-50 transition-colors">
              <span className="text-xs font-mono font-black text-gray-300 mt-0.5 shrink-0">{step}</span>
              <div>
                <div className="text-sm font-bold text-gray-900">{label}</div>
                <div className="text-xs text-gray-500">{detail}</div>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>
      </div>
      {/* Online */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-900 px-5 py-4">
          <div className="text-xs font-black tracking-widest uppercase text-gray-400 mb-1">Online Workflow</div>
          <div className="text-white font-outfit font-bold">Query Pipeline</div>
          <div className="text-gray-400 text-xs mt-1">Latency-critical — every ms counts</div>
        </div>
        <div className="bg-white divide-y divide-gray-100">
          {[
            { step: "01", label: "Query In", detail: "Raw user query arrives", color: "#6366f1" },
            { step: "02", label: "Query Rewrite", detail: "HyDE / multi-query expansion (optional)", color: "#8b5cf6" },
            { step: "03", label: "Hybrid Retrieve", detail: "Dense vector + BM25 sparse in parallel", color: "#0ea5e9" },
            { step: "04", label: "Rerank", detail: "Cross-encoder reranker over top-K candidates", color: "#10b981" },
            { step: "05", label: "Context Pack", detail: "Deduplicate, truncate, inject metadata", color: "#f59e0b" },
            { step: "06", label: "Generate", detail: "LLM with citation-grounded system prompt", color: "#ef4444" },
          ].map(({ step, label, detail, color }) => (
            <div key={step} className="flex items-start gap-4 px-5 py-3 hover:bg-gray-50 transition-colors">
              <span className="text-xs font-mono font-black text-gray-300 mt-0.5 shrink-0">{step}</span>
              <div>
                <div className="text-sm font-bold text-gray-900">{label}</div>
                <div className="text-xs text-gray-500">{detail}</div>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── CHUNKING STRATEGY TABLE ── */
export function RagChunkingTable() {
  const rows = [
    { strategy: "Fixed-size", when: "Never in prod", problem: "Severs mid-sentence facts", verdict: "❌" },
    { strategy: "Recursive Character", when: "General text", problem: "Better, but still blind to meaning", verdict: "⚠️" },
    { strategy: "Structure-Aware", when: "Docs with headings/tables", problem: "Requires good parsers", verdict: "✅" },
    { strategy: "Semantic", when: "Long mixed-topic docs", problem: "Slower, embedding cost at index time", verdict: "✅" },
    { strategy: "Parent-Child", when: "Precision + context needed", problem: "More complex retrieval logic", verdict: "✅✅" },
  ];
  return (
    <div className="my-10 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <span className="text-xs font-black tracking-widest uppercase text-gray-500">Chunking Strategy Comparison</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {["Strategy", "Best For", "Trade-off", "Prod Ready?"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 font-mono font-bold text-gray-900 text-xs">{r.strategy}</td>
                <td className="px-4 py-3 text-gray-600">{r.when}</td>
                <td className="px-4 py-3 text-gray-500">{r.problem}</td>
                <td className="px-4 py-3 text-center text-base">{r.verdict}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── FAILURE MODES ── */
export function RagFailureModes() {
  const modes = [
    {
      category: "Retrieval Failures",
      color: "#ef4444",
      bg: "#fef2f2",
      border: "#fecaca",
      items: [
        { name: "Low Recall", fix: "Add BM25 hybrid search — semantic search misses exact terms" },
        { name: "Low Precision", fix: "Add a cross-encoder reranker after initial top-K retrieval" },
        { name: "Bad Chunking", fix: "Switch to structure-aware or parent-child chunking" },
        { name: "Embedding Drift", fix: "Re-index when you change embedding models — always" },
      ],
    },
    {
      category: "Generation Failures",
      color: "#f59e0b",
      bg: "#fffbeb",
      border: "#fde68a",
      items: [
        { name: "Citation Hallucination", fix: "Force model to quote the exact chunk; if it can't, output 'insufficient context'" },
        { name: "Context Bias", fix: "The model over-reads the first/last chunk — reorder by relevance, not retrieval order" },
        { name: "Best-Guess Fill-in", fix: "Add explicit system prompt: 'If the answer is not in the context, say so'" },
        { name: "Multi-hop Failure", fix: "Use an agentic loop that retrieves iteratively rather than one-shot retrieval" },
      ],
    },
    {
      category: "Operational Failures",
      color: "#8b5cf6",
      bg: "#f5f3ff",
      border: "#ddd6fe",
      items: [
        { name: "Stale Index", fix: "Set up CDC (Change Data Capture) pipeline — Notion uses Debezium + Kafka" },
        { name: "No Observability", fix: "Log every step: query → retrieved chunks → reranked → prompt → response" },
        { name: "No Evaluation", fix: "Build a golden dataset of 50+ queries before shipping any v1" },
        { name: "Permission Leaks", fix: "Filter retrieved chunks by user permissions at query time, not just index time" },
      ],
    },
  ];
  return (
    <div className="my-12 space-y-6">
      {modes.map((m) => (
        <div key={m.category} className="rounded-2xl border overflow-hidden" style={{ borderColor: m.border }}>
          <div className="px-6 py-3" style={{ backgroundColor: m.bg }}>
            <span className="text-xs font-black tracking-widest uppercase" style={{ color: m.color }}>{m.category}</span>
          </div>
          <div className="bg-white divide-y divide-gray-100">
            {m.items.map((item) => (
              <div key={item.name} className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                <div className="text-sm text-gray-500">{item.fix}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── VECTOR DB COMPARISON ── */
export function RagVectorDbTable() {
  const rows = [
    { db: "pgvector", host: "Self / Postgres", scale: "< 1M vecs", cost: "Free", bestFor: "You already run Postgres", latency: "~10ms" },
    { db: "Chroma", host: "Self-hosted", scale: "< 5M vecs", cost: "Free (OSS)", bestFor: "Local dev & prototypes", latency: "~5ms" },
    { db: "Pinecone", host: "Managed SaaS", scale: "Billions", cost: "$70+/mo", bestFor: "Zero-ops, enterprise scale", latency: "~20ms" },
    { db: "Weaviate", host: "Self / Cloud", scale: "100M+ vecs", cost: "Free OSS / $25+ cloud", bestFor: "Hybrid BM25+vector built-in", latency: "~8ms" },
    { db: "Qdrant", host: "Self / Cloud", scale: "100M+ vecs", cost: "Free OSS / $25+ cloud", bestFor: "High-perf, Rust-native", latency: "~4ms" },
  ];
  return (
    <div className="my-10 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <span className="text-xs font-black tracking-widest uppercase text-gray-500">Vector Database Comparison</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {["Database", "Hosting", "Scale", "Cost", "Best For", "Avg Latency"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 font-mono font-bold text-gray-900 text-xs">{r.db}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{r.host}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{r.scale}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{r.cost}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{r.bestFor}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{r.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── EVAL METRICS ── */
export function RagEvalMetrics() {
  const metrics = [
    { name: "Context Recall", what: "Did we retrieve all needed chunks?", formula: "Retrieved relevant / All relevant", tool: "RAGAS", layer: "Retrieval", color: "#0ea5e9" },
    { name: "Context Precision", what: "Were retrieved chunks actually useful?", formula: "Relevant in top-K / K", tool: "RAGAS", layer: "Retrieval", color: "#6366f1" },
    { name: "Faithfulness", what: "Does the answer stay inside the context?", formula: "LLM-as-judge vs retrieved chunks", tool: "RAGAS / Langfuse", layer: "Generation", color: "#ef4444" },
    { name: "Answer Relevancy", what: "Does the answer address the actual question?", formula: "Cosine(query, generated_answer)", tool: "RAGAS", layer: "Generation", color: "#10b981" },
    { name: "MRR", what: "Is the most relevant chunk at the top?", formula: "1/rank of first relevant result", tool: "Custom eval", layer: "Retrieval", color: "#f59e0b" },
  ];
  return (
    <div className="my-12 space-y-3">
      {metrics.map((m) => (
        <div key={m.name} className="bg-white border border-gray-200 rounded-xl p-5 grid grid-cols-1 md:grid-cols-4 gap-4 items-start hover:shadow-sm transition-shadow">
          <div>
            <div className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: m.color }}>{m.layer}</div>
            <div className="font-outfit font-bold text-gray-900">{m.name}</div>
          </div>
          <div className="text-sm text-gray-600">{m.what}</div>
          <div className="font-mono text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700">{m.formula}</div>
          <div className="text-xs text-gray-400 font-semibold">{m.tool}</div>
        </div>
      ))}
    </div>
  );
}

/* ── REAL WORLD CASES ── */
export function RagRealWorldCases() {
  const cases = [
    {
      company: "Morgan Stanley",
      use: "Wealth Advisor Knowledge Base",
      scale: "100,000+ internal documents",
      result: "Recall improved from 20% → 80% through iterative regression testing. Advisors get compliant, cited answers in seconds.",
      stack: ["GPT-4 (OpenAI collab)", "Proprietary vector store", "Daily regression test suite"],
      lesson: "They started with 5 test cases and iterated to hundreds. The evaluation infra was as important as the retrieval infra.",
      color: "#0ea5e9",
      bg: "#f0f9ff",
      border: "#bae6fd",
    },
    {
      company: "Perplexity AI",
      use: "Real-time Answer Engine",
      scale: "Billions of web pages, live index",
      result: "Sub-second cited answers grounded entirely in retrieved web sources. The LLM is forbidden from using parametric knowledge.",
      stack: ["Vespa AI (retrieval)", "Hybrid BM25 + dense", "Multi-tier ML reranker"],
      lesson: "Perplexity treats hallucination as a retrieval bug, not a model bug. If the answer is wrong, they fix the retriever.",
      color: "#6366f1",
      bg: "#eef2ff",
      border: "#c7d2fe",
    },
    {
      company: "Notion AI",
      use: "Workspace Search + Summarization",
      scale: "10x data growth in 3 years",
      result: "Ingestion lag reduced from 24+ hours to ~2 hours. AI features now work on fresh data across 100M+ pages.",
      stack: ["Apache Hudi + Kafka", "Debezium CDC", "Spark for processing"],
      lesson: "Notion's bottleneck wasn't the LLM or the vector DB — it was getting data in fast enough. Freshness is a pipeline problem.",
      color: "#10b981",
      bg: "#f0fdf4",
      border: "#bbf7d0",
    },
    {
      company: "Cursor",
      use: "Codebase-Aware Coding Assistant",
      scale: "Per-repo, local embedding",
      result: "@Codebase queries retrieve semantically relevant code chunks from private repos. Zero data leaves the machine.",
      stack: ["turbopuffer (vector DB)", "Local embeddings", "Semantic code chunking"],
      lesson: "Cursor chunks code differently than prose — by function, class, and file boundary, not by character count. Domain matters.",
      color: "#f59e0b",
      bg: "#fffbeb",
      border: "#fde68a",
    },
  ];
  return (
    <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      {cases.map((c) => (
        <div key={c.company} className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: c.border }}>
          <div className="px-6 py-5" style={{ backgroundColor: c.bg }}>
            <div className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: c.color }}>Real World</div>
            <div className="font-outfit font-bold text-gray-900 text-lg">{c.company}</div>
            <div className="text-sm text-gray-500 mt-0.5">{c.use}</div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <div className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-1">Scale</div>
              <div className="text-sm text-gray-700">{c.scale}</div>
            </div>
            <div>
              <div className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-1">Outcome</div>
              <div className="text-sm text-gray-700 leading-relaxed">{c.result}</div>
            </div>
            <div>
              <div className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-2">Stack</div>
              <div className="flex flex-wrap gap-1">
                {c.stack.map(t => (
                  <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded border" style={{ color: c.color, borderColor: c.border, backgroundColor: c.bg }}>{t}</span>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <div className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-1">Key Lesson</div>
              <div className="text-sm text-gray-600 italic leading-relaxed">{c.lesson}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── RAG VS FINE-TUNE DECISION ── */
export function RagVsFinetune() {
  const rows = [
    { dimension: "Data changes frequently?", rag: "✅ Yes — update KB, done", ft: "❌ Requires retraining" },
    { dimension: "Need source citations?", rag: "✅ Built-in", ft: "❌ Opaque — hard to trace" },
    { dimension: "Need custom tone/format?", rag: "⚠️ Prompt engineering only", ft: "✅ Yes — bake into weights" },
    { dimension: "Upfront cost", rag: "Low — data engineering", ft: "High — $10K+ per run" },
    { dimension: "Latency", rag: "Higher (retrieval overhead)", ft: "Lower (self-contained)" },
    { dimension: "Domain jargon", rag: "⚠️ Depends on embedding model", ft: "✅ Model learns terminology" },
    { dimension: "Private/proprietary data", rag: "✅ Data never enters model", ft: "⚠️ Data in training pipeline" },
  ];
  return (
    <div className="my-10 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <span className="text-xs font-black tracking-widest uppercase text-gray-500">RAG vs Fine-Tuning — Decision Matrix</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase text-gray-400">When you need...</th>
              <th className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase text-blue-400">RAG</th>
              <th className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase text-purple-400">Fine-Tuning</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 text-gray-700 font-medium">{r.dimension}</td>
                <td className="px-4 py-3 text-gray-600 text-sm">{r.rag}</td>
                <td className="px-4 py-3 text-gray-600 text-sm">{r.ft}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <span className="text-xs text-gray-400">2025 consensus: Start with RAG. Add fine-tuning only for tone/format, never for knowledge.</span>
      </div>
    </div>
  );
}
