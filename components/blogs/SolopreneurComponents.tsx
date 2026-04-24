"use client";

import React from "react";

/* ─────────────────────────────────────────────────────────────
   CASE STUDIES — OpenClaw & Matthew Gallagher
───────────────────────────────────────────────────────────── */
export function SoloCaseStudies() {
  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* ── OpenClaw ── */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-xl">🦾</div>
            <div>
              <div className="text-xs font-black tracking-widest uppercase text-gray-400">Case Study #1</div>
              <div className="text-white font-outfit font-bold text-lg leading-tight">OpenClaw</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Open-source autonomous agent framework — a self-hosted AI employee that runs 24/7 on your own infrastructure.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Stack Layer", val: "Agents + Knowledge" },
              { label: "Pricing", val: "Free & Open Source" },
              { label: "Interface", val: "WhatsApp / Telegram" },
              { label: "Memory", val: "Persistent context" },
            ].map(({ label, val }) => (
              <div key={label} className="bg-gray-50 rounded-lg p-3">
                <div className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-0.5">{label}</div>
                <div className="text-sm font-semibold text-gray-900">{val}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">What it handles</div>
            <div className="flex flex-wrap gap-1">
              {["Email triage", "Calendar mgmt", "CRM updates", "Competitor monitoring", "Shell commands", "Content pipelines"].map((t) => (
                <span key={t} className="text-[11px] bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="text-xs font-black tracking-widest uppercase text-blue-500 mb-1">Solopreneur angle</div>
            <p className="text-sm text-blue-800 leading-relaxed">
              3 solopreneurs built revenue businesses <em>around</em> OpenClaw — selling setup services, vertical Skill packs, and content pipeline integrations. One OSS tool → 3 separate income streams.
            </p>
          </div>
        </div>
      </div>

      {/* ── Matthew Gallagher / Medvi ── */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="bg-gradient-to-br from-red-900 to-red-800 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-xl">🏥</div>
            <div>
              <div className="text-xs font-black tracking-widest uppercase text-red-300">Case Study #2</div>
              <div className="text-white font-outfit font-bold text-lg leading-tight">Matthew Gallagher · Medvi</div>
            </div>
          </div>
          <p className="text-red-200 text-sm leading-relaxed">
            Telehealth company launched from home with $20K and one co-operator (his brother). No traditional staff.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Started", val: "Sep 2024 · $20K capital" },
              { label: "Team size", val: "2 (brothers)" },
              { label: "2025 Revenue", val: "$401 million" },
              { label: "2026 Projection", val: "> $1.8 billion" },
            ].map(({ label, val }) => (
              <div key={label} className="bg-gray-50 rounded-lg p-3">
                <div className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-0.5">{label}</div>
                <div className="text-sm font-semibold text-gray-900">{val}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">Actual AI stack used</div>
            <div className="flex flex-wrap gap-1">
              {["ChatGPT", "Claude", "Grok", "Midjourney", "Runway ML", "AI agents (CS)"].map((t) => (
                <span key={t} className="text-[11px] bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded-full font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="text-xs font-black tracking-widest uppercase text-amber-600 mb-1">⚠️ Important nuance</div>
            <p className="text-sm text-amber-900 leading-relaxed">
              Gallagher&apos;s business faced real scrutiny — AI-generated marketing imagery, regulatory concerns, ethical debate on Hacker News. The <em>operational model</em> worked. The business practices were contested. Know the difference before you copy the playbook.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO STATS BAR
───────────────────────────────────────────────────────────── */
export function SoloHeroStats() {
  const stats = [
    { val: "$50K+", desc: "Monthly revenue achieved by documented solo AI operators in 2025" },
    { val: "1", desc: "Person. No co-founder. No full-time employees required." },
    { val: "7", desc: "Core AI tool categories that power the entire stack" },
    { val: "< $500", desc: "Monthly tooling cost to run a full AI solopreneur stack" },
  ];
  return (
    <div className="bg-[#0d0d0d] text-white p-8 rounded-2xl flex flex-col md:flex-row gap-8 overflow-x-auto my-12">
      {stats.map(({ val, desc }, i) => (
        <div key={i} className="flex-1 min-w-[160px] md:border-r last:border-r-0 border-white/10 md:pr-8">
          <div className="font-outfit text-4xl md:text-5xl font-bold text-red-500 mb-2">{val}</div>
          <div className="text-sm text-white/50 leading-relaxed tracking-wide">{desc}</div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STACK ARCHITECTURE DIAGRAM
───────────────────────────────────────────────────────────── */
export function SoloStackDiagram() {
  const layers = [
    {
      label: "BRAIN",
      color: "#ef4444",
      bg: "#fef2f2",
      border: "#fecaca",
      tools: ["GPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
      desc: "Core LLM reasoning & content generation",
      icon: "🧠",
    },
    {
      label: "AUTOMATION",
      color: "#8b5cf6",
      bg: "#f5f3ff",
      border: "#ddd6fe",
      tools: ["n8n", "Make (Integromat)", "Zapier"],
      desc: "Workflow orchestration & task automation",
      icon: "⚡",
    },
    {
      label: "AGENTS",
      color: "#0ea5e9",
      bg: "#f0f9ff",
      border: "#bae6fd",
      tools: ["AutoGen", "CrewAI", "LangGraph"],
      desc: "Multi-step autonomous task execution",
      icon: "🤖",
    },
    {
      label: "CONTENT",
      color: "#10b981",
      bg: "#f0fdf4",
      border: "#bbf7d0",
      tools: ["Descript", "ElevenLabs", "Runway ML"],
      desc: "Video, audio & media production at scale",
      icon: "🎬",
    },
    {
      label: "DISTRIBUTION",
      color: "#f59e0b",
      bg: "#fffbeb",
      border: "#fde68a",
      tools: ["Beehiiv", "Typefully", "Buffer"],
      desc: "Audience growth & content distribution",
      icon: "📡",
    },
    {
      label: "REVENUE",
      color: "#ec4899",
      bg: "#fdf2f8",
      border: "#fbcfe8",
      tools: ["Gumroad", "LemonSqueezy", "Stripe"],
      desc: "Payment processing & product delivery",
      icon: "💰",
    },
    {
      label: "KNOWLEDGE",
      color: "#6366f1",
      bg: "#eef2ff",
      border: "#c7d2fe",
      tools: ["Notion AI", "Obsidian", "Mem.ai"],
      desc: "Personal knowledge base & context store",
      icon: "📚",
    },
  ];

  return (
    <div className="my-12 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-gray-900 px-6 py-4">
        <div className="text-white font-outfit font-bold text-sm tracking-widest uppercase">
          The AI Solopreneur Stack — 7 Layers
        </div>
        <div className="text-gray-400 text-xs mt-1">Each layer is independently replaceable</div>
      </div>
      <div className="divide-y divide-gray-100 bg-white">
        {layers.map((layer, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center text-xl shrink-0">{layer.icon}</div>
            <div
              className="text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full shrink-0 w-28 text-center"
              style={{ color: layer.color, backgroundColor: layer.bg, border: `1px solid ${layer.border}` }}
            >
              {layer.label}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-1">
                {layer.tools.map((t) => (
                  <span key={t} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono font-medium">
                    {t}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-400">{layer.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   WORKFLOW FLOWCHART — "A Day in the Life"
───────────────────────────────────────────────────────────── */
export function SoloWorkflowFlowchart() {
  const steps = [
    { time: "7:00 AM", action: "AI Morning Brief", tool: "GPT-4o + n8n", detail: "n8n pulls RSS feeds, newsletters, X threads → GPT-4o writes a 200-word briefing → delivered to inbox", color: "#ef4444" },
    { time: "8:00 AM", action: "Content Ideation", tool: "Claude 3.5", detail: "Claude analyzes your audience data + trending topics → generates 10 content angles ranked by potential", color: "#8b5cf6" },
    { time: "9:00 AM", action: "Long-form Draft", tool: "GPT-4o + your voice", detail: "You write a 200-word rough outline → AI expands to 2,000 words in your tone → you edit for 30 mins", color: "#0ea5e9" },
    { time: "11:00 AM", action: "Repurpose to Social", tool: "Make + Typefully", detail: "Long-form → Twitter thread, LinkedIn post, newsletter snippet → auto-scheduled across platforms", color: "#10b981" },
    { time: "2:00 PM", action: "Client / Product Work", tool: "AutoGen + LangGraph", detail: "Agentic pipeline handles research, drafting, code generation for client deliverables", color: "#f59e0b" },
    { time: "5:00 PM", action: "Analytics Review", tool: "n8n + Notion AI", detail: "n8n fetches metrics from all platforms → Notion AI summarizes what worked → logged to knowledge base", color: "#ec4899" },
  ];

  return (
    <div className="my-12">
      <div className="text-xs font-black tracking-widest uppercase text-gray-400 mb-6">
        A Day in the Life — AI Solopreneur
      </div>
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="flex items-stretch gap-0">
            {/* Time label */}
            <div className="text-right w-20 shrink-0 flex items-start pt-4 pr-3">
              <span className="text-xs font-bold text-gray-400 w-full">{step.time}</span>
            </div>

            {/* Connector column: single continuous line, dot floats on top */}
            <div className="relative flex flex-col items-center shrink-0 w-6 hidden md:flex">
              {/* Full-height line */}
              <div className="absolute inset-x-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />
              {/* Dot at top of card */}
              <div
                className="w-3 h-3 rounded-full z-10 border-2 border-white shadow-sm shrink-0 mt-4 relative"
                style={{ backgroundColor: step.color }}
              />
            </div>

            {/* Card */}
            <div className="flex-1 ml-3 mb-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-outfit font-bold text-gray-900">{step.action}</span>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{ color: step.color, backgroundColor: step.color + "15" }}
                >
                  {step.tool}
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TOOL COMPARISON TABLE
───────────────────────────────────────────────────────────── */
export function SoloToolTable() {
  const rows = [
    { category: "LLM / Brain", tool: "GPT-4o", bestFor: "Complex reasoning, code, long docs", cost: "$20/mo (Plus)", openSource: "❌", replaceWith: "Claude 3.5 Sonnet" },
    { category: "LLM / Brain", tool: "Claude 3.5", bestFor: "Long context, writing, analysis", cost: "$20/mo (Pro)", openSource: "❌", replaceWith: "GPT-4o" },
    { category: "Automation", tool: "n8n", bestFor: "Self-hosted workflow automation", cost: "Free (self-host) / $20 cloud", openSource: "✅", replaceWith: "Make / Zapier" },
    { category: "Automation", tool: "Make", bestFor: "Visual no-code automations", cost: "$9–29/mo", openSource: "❌", replaceWith: "n8n" },
    { category: "Agents", tool: "CrewAI", bestFor: "Role-based multi-agent tasks", cost: "Free (OSS)", openSource: "✅", replaceWith: "AutoGen" },
    { category: "Agents", tool: "LangGraph", bestFor: "Stateful, cyclic agent graphs", cost: "Free (OSS)", openSource: "✅", replaceWith: "CrewAI" },
    { category: "Content", tool: "ElevenLabs", bestFor: "Realistic voice cloning & TTS", cost: "$5–22/mo", openSource: "❌", replaceWith: "Descript AI Voice" },
    { category: "Content", tool: "Runway ML", bestFor: "AI video generation & editing", cost: "$15–35/mo", openSource: "❌", replaceWith: "Pika Labs" },
    { category: "Distribution", tool: "Beehiiv", bestFor: "Newsletter + monetization", cost: "Free–$42/mo", openSource: "❌", replaceWith: "Substack" },
    { category: "Distribution", tool: "Typefully", bestFor: "Twitter/X thread scheduling", cost: "$12.50/mo", openSource: "❌", replaceWith: "Buffer" },
    { category: "Revenue", tool: "LemonSqueezy", bestFor: "Digital products, SaaS billing", cost: "5% + $0.50/txn", openSource: "❌", replaceWith: "Gumroad" },
    { category: "Knowledge", tool: "Notion AI", bestFor: "PKM + AI-assisted writing", cost: "$16/mo", openSource: "❌", replaceWith: "Obsidian + local LLM" },
  ];

  const categoryColors: Record<string, string> = {
    "LLM / Brain": "#ef4444",
    "Automation": "#8b5cf6",
    "Agents": "#0ea5e9",
    "Content": "#10b981",
    "Distribution": "#f59e0b",
    "Revenue": "#ec4899",
    "Knowledge": "#6366f1",
  };

  return (
    <div className="my-10 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <span className="text-xs font-black tracking-widest uppercase text-gray-500">Full Stack Tool Comparison</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {["Layer", "Tool", "Best For", "Cost", "Open Source", "Alternative"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase text-gray-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{
                      color: categoryColors[r.category] ?? "#555",
                      backgroundColor: (categoryColors[r.category] ?? "#555") + "18",
                    }}
                  >
                    {r.category}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono font-bold text-gray-900 text-xs">{r.tool}</td>
                <td className="px-4 py-3 text-gray-600 max-w-[200px]">{r.bestFor}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{r.cost}</td>
                <td className="px-4 py-3 text-center">{r.openSource}</td>
                <td className="px-4 py-3 text-gray-400 font-mono text-xs">{r.replaceWith}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <span className="text-xs text-gray-400">💡 Total stack cost at "starter" tier: ~$100–200/mo. All-in "power" tier: ~$400–500/mo.</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   REVENUE MODEL CARDS
───────────────────────────────────────────────────────────── */
export function SoloRevenueModels() {
  const models = [
    {
      name: "Info Products",
      emoji: "📦",
      example: "eBook, course, prompt pack",
      effort: "High upfront",
      recurring: false,
      ceiling: "$$$$",
      tools: ["Gumroad", "LemonSqueezy", "Beehiiv"],
      color: "#10b981",
    },
    {
      name: "Newsletter + Sponsorships",
      emoji: "📧",
      example: "Weekly AI digest, sponsored slots",
      effort: "Medium, ongoing",
      recurring: true,
      ceiling: "$$$",
      tools: ["Beehiiv", "Substack", "n8n"],
      color: "#f59e0b",
    },
    {
      name: "Micro-SaaS / AI APIs",
      emoji: "⚙️",
      example: "Niche AI tool, API wrapper, Chrome ext.",
      effort: "High dev, low ops",
      recurring: true,
      ceiling: "$$$$$",
      tools: ["Stripe", "Vercel", "LangGraph"],
      color: "#ef4444",
    },
    {
      name: "Consulting / Freelance",
      emoji: "🤝",
      example: "AI implementation for businesses",
      effort: "Low setup, time-bounded",
      recurring: false,
      ceiling: "$$$$",
      tools: ["Cal.com", "Notion", "Claude"],
      color: "#8b5cf6",
    },
    {
      name: "AI-Generated Content",
      emoji: "🎬",
      example: "YouTube channel, TikTok, faceless brand",
      effort: "Medium, compounding",
      recurring: true,
      ceiling: "$$$",
      tools: ["Runway ML", "ElevenLabs", "Buffer"],
      color: "#0ea5e9",
    },
  ];

  return (
    <div className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {models.map((m, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all relative overflow-hidden group"
        >
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: m.color }}
          />
          <div className="text-3xl mb-3">{m.emoji}</div>
          <h4 className="font-outfit font-black text-gray-900 text-lg mb-1">{m.name}</h4>
          <p className="text-sm text-gray-500 mb-3 italic">{m.example}</p>
          <div className="flex gap-2 mb-4 flex-wrap">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{m.effort}</span>
            <span
              className="text-xs px-2 py-1 rounded-full font-bold"
              style={{ color: m.color, backgroundColor: m.color + "18" }}
            >
              {m.recurring ? "🔄 Recurring" : "1x Payment"}
            </span>
            <span className="text-xs bg-gray-900 text-white px-2 py-1 rounded-full font-mono">{m.ceiling}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {m.tools.map((t) => (
              <span key={t} className="text-[10px] font-mono bg-gray-50 border border-gray-200 text-gray-500 px-2 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   AUTOMATION LOOP DIAGRAM
───────────────────────────────────────────────────────────── */
export function SoloAutomationLoop() {
  const nodes = [
    { id: "input", label: "TRIGGER", sub: "Webhook / Schedule / Email", color: "#6366f1" },
    { id: "ai", label: "AI LAYER", sub: "GPT-4o / Claude reasoning", color: "#ef4444" },
    { id: "action", label: "ACTION", sub: "Write, post, send, build", color: "#10b981" },
    { id: "monitor", label: "MONITOR", sub: "Track metrics + feedback", color: "#f59e0b" },
    { id: "memory", label: "MEMORY", sub: "Log to Notion / vector DB", color: "#8b5cf6" },
  ];

  const arrows = ["→", "→", "→", "→", "↑ back to trigger"];

  return (
    <div className="my-12 bg-gray-50 rounded-2xl p-8 border border-gray-200">
      <div className="text-xs font-black tracking-widest uppercase text-gray-400 mb-8 text-center">
        The Core Automation Loop
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 flex-wrap">
        {nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            <div className="flex flex-col items-center text-center">
              <div
                className="w-28 h-28 rounded-2xl flex flex-col items-center justify-center shadow-sm border-2"
                style={{ borderColor: node.color, backgroundColor: node.color + "12" }}
              >
                <div className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: node.color }}>
                  {node.label}
                </div>
                <div className="text-[10px] text-gray-500 leading-tight px-2">{node.sub}</div>
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div className="text-gray-300 text-2xl font-thin select-none hidden md:block">→</div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-6 text-center text-xs text-gray-400">
        ↑ Loop repeats. Each cycle makes the system smarter via feedback stored in memory.
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   OPINION CALLOUT
───────────────────────────────────────────────────────────── */
export function SoloOpinion() {
  return (
    <div className="bg-[#13161e] border border-[#252a38] rounded-xl p-8 md:p-10 my-16 relative shadow-lg">
      <div className="absolute -top-[35px] left-8 font-outfit text-8xl text-red-500 opacity-30 leading-none">&quot;</div>
      <p className="font-outfit text-xl font-light text-[#e8eaf0] leading-relaxed italic mb-4">
        The AI solopreneur is not a freelancer with better tools. They are a new kind of company — one where the entire operational layer is automated, and the human&apos;s only job is to make the decisions that machines can&apos;t yet make. That gap is shrinking fast. The window to build leverage is now.
      </p>
      <div className="font-outfit text-sm text-[#7a8099] font-bold tracking-wide mt-6">
        — Author&apos;s Take · April 2026
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   RELATED POSTS CTA
───────────────────────────────────────────────────────────── */
export function SoloCta() {
  const posts = [
    { title: "How to Build Your First AI Agent with LangGraph", tag: "Tutorial" },
    { title: "The No-Code AI Stack: n8n + GPT-4o for Non-Developers", tag: "Explainer" },
    { title: "AI Pricing Models in 2026: Tokens, Seats, or Usage?", tag: "Opinion" },
  ];
  return (
    <div className="my-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 md:p-12 text-white">
      <div className="text-xs font-black tracking-widest uppercase text-red-400 mb-3">What to Read Next</div>
      <h3 className="font-outfit text-2xl font-bold mb-6">Go deeper on the stack</h3>
      <div className="space-y-3">
        {posts.map((p, i) => (
          <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400">{p.tag}</span>
            <span className="text-sm text-gray-300">{p.title}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-gray-400 text-sm">
          🔔 <strong className="text-white">Subscribe</strong> for weekly deep-dives on AI engineering, agentic stacks, and solopreneur systems — delivered every Friday.
        </p>
      </div>
    </div>
  );
}
