"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  Zap,
  Bug,
  Lock,
  Unlock,
  ArrowRight,
  Globe,
  AlertTriangle,
  TrendingUp,
  Building2,
} from "lucide-react";

/* ────────────────────────────────────────────────
   1. ALIGNMENT PARADOX DIAGRAM
──────────────────────────────────────────────── */
export function MythosAlignmentParadox() {
  const rows = [
    { model: "GPT-3 Era", alignment: 20, capability: 30, blast: 15, color: "bg-blue-400" },
    { model: "Claude 2", alignment: 50, capability: 55, blast: 40, color: "bg-indigo-400" },
    { model: "Claude 3 Opus", alignment: 75, capability: 78, blast: 65, color: "bg-violet-400" },
    { model: "Claude Mythos", alignment: 97, capability: 99, blast: 99, color: "bg-rose-500" },
  ];

  return (
    <div className="my-12 p-8 rounded-3xl bg-gray-950 text-white border border-white/5 shadow-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 to-transparent pointer-events-none" />

      <div className="relative z-10 mb-8">
        <h3 className="font-outfit text-2xl font-bold flex items-center gap-3">
          <ShieldAlert className="text-rose-400" size={28} />
          The Alignment Paradox
        </h3>
        <p className="text-gray-400 text-sm mt-2">
          As alignment improves, autonomy and blast radius grow proportionally. Mythos sits at the peak of all three.
        </p>
      </div>

      <div className="relative z-10 space-y-6">
        {rows.map((row, i) => (
          <motion.div
            key={row.model}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className={`font-bold ${row.model === "Claude Mythos" ? "text-rose-400 text-sm" : "text-gray-400"}`}>
                {row.model}
              </span>
              {row.model === "Claude Mythos" && (
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  ⚠ The Paradox Peak
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Alignment", val: row.alignment, color: "bg-emerald-500" },
                { label: "Capability", val: row.capability, color: "bg-blue-500" },
                { label: "Blast Radius", val: row.blast, color: "bg-rose-500" },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="text-[10px] text-gray-500 mb-1">{bar.label}</div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${bar.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.val}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.2, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mt-8 bg-rose-900/20 border border-rose-500/20 rounded-xl p-4">
        <p className="text-rose-300 text-sm font-medium">
          <strong>The Paradox:</strong> Anthropic's most aligned model is also their most dangerous. Better alignment enabled the trust needed to give Mythos the autonomy to cause catastrophic harm if misused.
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   2. EXPLOIT CHAIN DIAGRAM
──────────────────────────────────────────────── */
export function ExploitChainDiagram() {
  const steps = [
    { id: 1, label: "Memory Leak", desc: "Integer overflow in kernel buffer allocation leaks 4 bytes of address space", severity: "Low", color: "text-yellow-500 border-yellow-400/30 bg-yellow-400/5" },
    { id: 2, label: "Heap Spray", desc: "Predictable heap layout exploited to place attacker-controlled data at known address", severity: "Low", color: "text-yellow-500 border-yellow-400/30 bg-yellow-400/5" },
    { id: 3, label: "Type Confusion", desc: "Browser JIT compiler misidentifies object type, allowing arbitrary pointer dereference", severity: "Medium", color: "text-orange-500 border-orange-400/30 bg-orange-400/5" },
    { id: 4, label: "Privilege Escalation", desc: "Null pointer dereference in kernel driver grants ring-0 execution context", severity: "High", color: "text-red-500 border-red-400/30 bg-red-400/5" },
    { id: 5, label: "Sandbox Escape", desc: "Renderer process achieves full OS write access. Isolation is broken. Game over.", severity: "Critical", color: "text-rose-500 border-rose-500/50 bg-rose-500/10" },
  ];

  return (
    <div className="my-12 p-8 rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden">
      <div className="mb-8">
        <h3 className="font-outfit text-xl font-bold text-gray-900 flex items-center gap-2">
          <Bug className="text-rose-500" size={24} />
          Exploit Chaining — How 5 "Low-Severity" Bugs Become a Full System Takeover
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Each individual bug is harmless. Mythos found all five and chained them into a single, automated attack sequence — in an OS that had survived 27 years of human security review.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-stretch gap-3">
            {/* Step connector */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: "spring" }}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${step.color}`}
              >
                {step.id}
              </motion.div>
              {i < steps.length - 1 && (
                <div className="w-0.5 flex-1 bg-gray-100 mt-1 mb-1" />
              )}
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`flex-1 border rounded-xl p-4 mb-3 ${step.color}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-gray-900">{step.label}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest ${step.color.split(' ')[0]}`}>
                  {step.severity}
                </span>
              </div>
              <p className="text-xs text-gray-600">{step.desc}</p>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-3 bg-gray-950 text-white p-4 rounded-xl">
        <Unlock size={20} className="text-rose-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm">
          <strong className="text-rose-400">Result:</strong> Full remote code execution on OpenBSD — a system considered so secure it ships with firewall code baked into its kernel. Zero human security researchers had found this chain in 27 years. Mythos found it in seconds.
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   3. PROJECT GLASSWING ORGS
──────────────────────────────────────────────── */
export function GlasswingOrgs() {
  const orgs = [
    { name: "AWS", tier: "Founding" },
    { name: "Apple", tier: "Founding" },
    { name: "Google", tier: "Founding" },
    { name: "Microsoft", tier: "Founding" },
    { name: "NVIDIA", tier: "Founding" },
    { name: "CrowdStrike", tier: "Security" },
    { name: "NSA", tier: "Government" },
    { name: "CISA", tier: "Government" },
    { name: "Cloudflare", tier: "Infrastructure" },
    { name: "Linux Foundation", tier: "Open Source" },
    { name: "+ 40 others", tier: "Partners" },
  ];

  const tierColors: Record<string, string> = {
    Founding: "bg-violet-100 text-violet-700 border-violet-200",
    Security: "bg-red-100 text-red-700 border-red-200",
    Government: "bg-blue-100 text-blue-700 border-blue-200",
    Infrastructure: "bg-orange-100 text-orange-700 border-orange-200",
    "Open Source": "bg-green-100 text-green-700 border-green-200",
    Partners: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <div className="my-12 p-8 rounded-3xl bg-gray-950 text-white border border-white/5 shadow-2xl">
      <div className="mb-8">
        <h3 className="font-outfit text-2xl font-bold flex items-center gap-3">
          <Lock className="text-violet-400" size={26} />
          Project Glasswing Consortium
        </h3>
        <p className="text-gray-400 text-sm mt-2">
          The only organizations with monitored access to Claude Mythos Preview — for defensive cybersecurity purposes only.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {orgs.map((org, i) => (
          <motion.div
            key={org.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, type: "spring" }}
            className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border ${tierColors[org.tier]} min-w-[100px]`}
          >
            <Building2 size={18} />
            <span className="text-xs font-bold text-center">{org.name}</span>
            <span className={`text-[9px] uppercase tracking-widest font-black opacity-70`}>{org.tier}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: <ShieldAlert size={18} />, label: "Defensive Use Only", desc: "No offensive research. Models usage is logged and audited continuously." },
          { icon: <Globe size={18} />, label: "Shared Intelligence", desc: "All discovered vulnerabilities are shared across the consortium within 48 hours." },
          { icon: <AlertTriangle size={18} />, label: "No API Keys Issued", desc: "Access is air-gapped. No programmatic API access is permitted outside Anthropic's sandboxed infra." },
        ].map((item) => (
          <div key={item.label} className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-violet-400 mb-2 font-bold text-sm">
              {item.icon}
              {item.label}
            </div>
            <p className="text-xs text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   4. MYTHOS TIMELINE
──────────────────────────────────────────────── */
export function MythosTimeline() {
  const events = [
    { date: "Late 2025", title: "Internal Development", desc: "Anthropic begins training a new frontier model internally codenamed 'Capybara'. Security researchers notice unexpected emergent behavior during eval runs.", color: "bg-gray-400" },
    { date: "Early 2026", title: "The Leak", desc: "An unsecured internal database exposes partial model metadata. Developers discover references to 'Mythos' and 'Project Capybara' — triggering the first public disclosure.", color: "bg-yellow-500" },
    { date: "April 7, 2026", title: "Official Announcement", desc: "Anthropic officially acknowledges Claude Mythos. Publishes a detailed system card documenting zero-day discovery capabilities and the alignment paradox.", color: "bg-blue-500" },
    { date: "April 7, 2026", title: "Project Glasswing Launched", desc: "Simultaneously, Anthropic announces Project Glasswing — restricted, monitored access for AWS, Apple, Google, Microsoft, CrowdStrike, NVIDIA, and 40+ partners.", color: "bg-violet-500" },
    { date: "April–May 2026", title: "NSA & White House Briefings", desc: "U.S. national security agencies are briefed. NSA begins using the model to harden critical government infrastructure. White House initiates emergency review of AI dual-use policy.", color: "bg-rose-500" },
    { date: "Ongoing", title: "No Public Release", desc: "Anthropic has formally stated no plans for a general public release. Mythos remains the most capable AI model that most people will never interact with.", color: "bg-gray-700" },
  ];

  return (
    <div className="my-12 relative">
      <div className="mb-8">
        <h3 className="font-outfit text-2xl font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="text-blue-500" size={26} />
          The Mythos Timeline
        </h3>
        <p className="text-sm text-gray-500 mt-2">From a leaked codename to a national security briefing — in under 6 months.</p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-rose-300 to-gray-700" />

        <div className="space-y-6 pl-12">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {/* Dot */}
              <div className={`absolute -left-10 top-1.5 w-4 h-4 rounded-full ${event.color} border-2 border-white shadow-sm`} />

              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="font-bold text-gray-900">{event.title}</h4>
                  <span className="text-xs font-mono text-gray-400 whitespace-nowrap flex-shrink-0">{event.date}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   5. HERO STATS
──────────────────────────────────────────────── */
export function MythosHeroStats() {
  const stats = [
    { val: "27", unit: "years", desc: "Age of the OpenBSD codebase when Mythos found a zero-day exploit chain inside it — in seconds." },
    { val: "1000s", unit: "zero-days", desc: "Autonomous vulnerabilities discovered across major OS, browser, and infrastructure codebases during internal testing." },
    { val: "5→1", unit: "chain", desc: "Five individually harmless bugs, chained into a single, critical sandbox escape. The signature Mythos technique." },
    { val: "40+", unit: "orgs", desc: "Companies and agencies in the Project Glasswing consortium with restricted defensive access to the model." },
  ];

  return (
    <div className="my-12 bg-gray-950 text-white rounded-2xl p-8 border border-white/5 shadow-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="border-r border-white/10 last:border-r-0 pr-6 last:pr-0"
          >
            <div className="font-outfit text-4xl font-black text-rose-400">{s.val}</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">{s.unit}</div>
            <div className="text-xs text-gray-400 leading-relaxed">{s.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
