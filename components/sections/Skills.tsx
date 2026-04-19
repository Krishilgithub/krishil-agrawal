"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Wrench } from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────────── */

const leftGroups = [
  {
    id: "ai",
    title: "AI & Agent Systems",
    color: "#6366f1",
    items: [
      { name: "LangChain",           icon: "langchain",   brandColor: "#1C3C3C" },
      { name: "LangGraph",           icon: "langchain",   brandColor: "#1C3C3C" },
      { name: "CrewAI",              icon: "auth0",       brandColor: "#EB5424" },
      { name: "Multi-Agent Systems", icon: null,          brandColor: null },
      { name: "Vector Databases",    icon: null,          brandColor: null },
      { name: "RAG Pipelines",       icon: null,          brandColor: null },
    ],
  },
  {
    id: "ml",
    title: "Machine Learning",
    color: "#ec4899",
    items: [
      { name: "Scikit-learn",        icon: "scikitlearn", brandColor: "#F7931E" },
      { name: "TensorFlow",          icon: "tensorflow",  brandColor: "#FF6F00" },
      { name: "HuggingFace",         icon: "huggingface", brandColor: "#FFD21E" },
      { name: "Feature Engineering", icon: null,          brandColor: null },
      { name: "Model Evaluation",    icon: null,          brandColor: null },
      { name: "MLOps",               icon: null,          brandColor: null },
    ],
  },
];

const rightGroups = [
  {
    id: "backend",
    title: "Programming & Backend",
    color: "#f97316",
    items: [
      { name: "Python",       icon: "python",     brandColor: "#3776AB" },
      { name: "C++",          icon: "cplusplus",  brandColor: "#00599C" },
      { name: "Next.js",      icon: "nextdotjs",  brandColor: "#111111" },
      { name: "Supabase",     icon: "supabase",   brandColor: "#3ECF8E" },
      { name: "MongoDB",      icon: "mongodb",    brandColor: "#47A248" },
      { name: "SQL/Postgres", icon: "postgresql", brandColor: "#336791" },
      { name: "REST APIs",    icon: null,         brandColor: null },
    ],
  },
  {
    id: "core",
    title: "Core Foundations",
    color: "#14b8a6",
    items: [
      { name: "System Design", icon: null, brandColor: null },
      { name: "DSA",           icon: null, brandColor: null },
      { name: "OOPs",          icon: null, brandColor: null },
      { name: "DBMS",          icon: null, brandColor: null },
    ],
  },
  {
    id: "tools",
    title: "Dev Tools",
    color: "#eab308",
    items: [
      { name: "Git",       icon: "git",       brandColor: "#F05032" },
      { name: "Docker",    icon: "docker",    brandColor: "#2496ED" },
      { name: "Postman",   icon: "postman",   brandColor: "#FF6C37" },
      { name: "LangSmith", icon: "langchain", brandColor: "#1C3C3C" },
      { name: "n8n",       icon: "n8n",       brandColor: "#EA4B71" },
    ],
  },
];

/* ─── Pill ───────────────────────────────────────────────────────────── */
function Pill({
  item,
  groupColor,
  highlight,
}: {
  item: { name: string; icon: string | null; brandColor: string | null };
  groupColor: string;
  highlight: boolean;
}) {
  const iconSrc = item.icon
    ? `https://cdn.simpleicons.org/${item.icon}/${(item.brandColor ?? "6b7280").replace("#", "")}`
    : null;

  return (
    <motion.div
      whileHover={{ scale: 1.07, y: -3 }}
      transition={{ type: "spring", stiffness: 380, damping: 20 }}
      className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold
        cursor-default select-none transition-all duration-200"
      style={{
        background: highlight
          ? `linear-gradient(135deg, ${groupColor}10, ${groupColor}06)`
          : "rgba(255,255,255,0.85)",
        border: `1px solid ${highlight ? groupColor + "40" : "#e5e7eb"}`,
        boxShadow: highlight
          ? `0 4px 18px ${groupColor}18, inset 0 1px 0 rgba(255,255,255,0.8)`
          : "0 1px 3px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
        color: highlight ? "#111827" : "#374151",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {iconSrc ? (
        <img src={iconSrc} alt={item.name} className="w-3.5 h-3.5 object-contain shrink-0" />
      ) : (
        <div
          className="w-1 h-1 rounded-full shrink-0 transition-colors duration-200"
          style={{ backgroundColor: highlight ? groupColor : "#9ca3af" }}
        />
      )}
      <span>{item.name}</span>
    </motion.div>
  );
}

/* ─── Group Block ────────────────────────────────────────────────────── */
function GroupBlock({
  group,
  align,
  hovered,
  onEnter,
  onLeave,
  elRef,
  delay,
}: {
  group: (typeof leftGroups)[0];
  align: "left" | "right";
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  elRef: (el: HTMLDivElement | null) => void;
  delay: number;
}) {
  return (
    <motion.div
      ref={elRef}
      initial={{ opacity: 0, x: align === "left" ? -32 : 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="flex flex-col gap-3 cursor-default"
    >
      {/* Label row */}
      <div className={`flex items-center gap-2.5 ${align === "left" ? "justify-end" : "justify-start"}`}>
        {align === "right" && (
          <div
            className="h-px w-6 transition-all duration-300"
            style={{ background: hovered ? group.color : "#e5e7eb" }}
          />
        )}
        <span
          className="text-[10px] font-bold uppercase tracking-[0.22em] transition-colors duration-300"
          style={{ color: hovered ? group.color : "#9ca3af" }}
        >
          {group.title}
        </span>
        {align === "left" && (
          <div
            className="h-px w-6 transition-all duration-300"
            style={{ background: hovered ? group.color : "#e5e7eb" }}
          />
        )}
      </div>

      {/* Pills row */}
      <div className={`flex flex-wrap gap-2 ${align === "left" ? "justify-end" : "justify-start"}`}>
        {group.items.map((item) => (
          <Pill
            key={item.name}
            item={item}
            groupColor={group.color}
            highlight={hovered}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── SVG Lines ──────────────────────────────────────────────────────── */
type Pt = { x: number; y: number };
type Line = { id: string; from: Pt; to: Pt; color: string; side: "left" | "right" };

function Lines({ lines, hovered }: { lines: Line[]; hovered: string | null }) {
  if (!lines.length) return null;
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: "visible" }}
    >
      <defs>
        {lines.map((l) => {
          const isLeft = l.side === "left";
          return (
            <linearGradient
              key={`grad-${l.id}`}
              id={`grad-${l.id}`}
              gradientUnits="userSpaceOnUse"
              // left: card-side colored → hub-side gray
              // right: hub-side gray → card-side colored
              x1={isLeft ? l.from.x : l.to.x}
              y1={isLeft ? l.from.y : l.to.y}
              x2={isLeft ? l.to.x   : l.from.x}
              y2={isLeft ? l.to.y   : l.from.y}
            >
              <stop offset="0%"   stopColor={l.color} stopOpacity="0.75" />
              <stop offset="100%" stopColor="#d1d5db" stopOpacity="0.3"  />
            </linearGradient>
          );
        })}
      </defs>
      {lines.map((l, i) => {
        const isActive = hovered === l.id || hovered === "hub";
        const midX = (l.from.x + l.to.x) / 2;
        const d = `M ${l.from.x} ${l.from.y} C ${midX} ${l.from.y}, ${midX} ${l.to.y}, ${l.to.x} ${l.to.y}`;
        return (
          <motion.path
            key={l.id}
            d={d}
            fill="none"
            stroke={isActive ? `url(#grad-${l.id})` : "#e5e7eb"}
            strokeWidth={isActive ? 2 : 1}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: "easeInOut" }}
            style={{ transition: "stroke-width 0.2s, stroke 0.3s" }}
          />
        );
      })}
    </svg>
  );
}

/* ─── Center Hub ─────────────────────────────────────────────────────── */
function CenterHub({
  hovered,
  onEnter,
  onLeave,
  elRef,
}: {
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  elRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <motion.div
      ref={elRef}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative flex items-center justify-center z-10 cursor-default select-none py-4"
    >
      {/* Outer slow-rotating dashed ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute w-44 h-44 rounded-full"
        style={{
          border: "1px dashed #d1d5db",
        }}
      />

      {/* Second ring (counter-clockwise, faster) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute w-32 h-32 rounded-full"
        style={{
          border: "1px solid #f0f0f0",
        }}
      />

      {/* 4 small orbital dots on outer ring */}
      {[0, 90, 180, 270].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const r = 88; // half of 176px
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        return (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: ["#6366f1", "#ec4899", "#f97316", "#14b8a6"][i],
              top: `calc(50% + ${y}px - 3px)`,
              left: `calc(50% + ${x}px - 3px)`,
            }}
          />
        );
      })}

      {/* Solid inner circle — the actual hub */}
      <div
        className="relative w-28 h-28 rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-300"
        style={{
          background: hovered
            ? "linear-gradient(135deg, #111827 0%, #1f2937 100%)"
            : "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
          boxShadow: hovered
            ? "0 0 0 1px #374151, 0 16px 48px rgba(0,0,0,0.18)"
            : "0 0 0 1px #e5e7eb, 0 8px 24px rgba(0,0,0,0.07)",
        }}
      >
        <span
          className="font-outfit text-[11px] font-black uppercase tracking-[0.15em] transition-colors duration-300"
          style={{ color: hovered ? "#9ca3af" : "#6b7280" }}
        >
          My Stack
        </span>
        <div
          className="w-8 h-px rounded-full transition-all duration-300"
          style={{ background: hovered ? "#6366f1" : "#e5e7eb" }}
        />
        <span
          className="font-outfit text-[10px] font-medium transition-colors duration-300"
          style={{ color: hovered ? "#d1d5db" : "#9ca3af" }}
        >
          AI · ML · Systems
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────── */
export function Skills() {
  const [hovered, setHovered] = useState<string | null>(null);
  const hubRef = useRef<HTMLDivElement | null>(null);
  const leftEls = useRef<(HTMLDivElement | null)[]>(leftGroups.map(() => null));
  const rightEls = useRef<(HTMLDivElement | null)[]>(rightGroups.map(() => null));
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lines, setLines] = useState<Line[]>([]);

  function recalcLines() {
    if (!containerRef.current || !hubRef.current) return;
    const base = containerRef.current.getBoundingClientRect();
    const hub  = hubRef.current.getBoundingClientRect();
    const hubCx = hub.left - base.left + hub.width  / 2;
    const hubCy = hub.top  - base.top  + hub.height / 2;

    const next: Line[] = [];

    leftEls.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      next.push({
        id:    leftGroups[i].id,
        from:  { x: r.right - base.left, y: r.top - base.top + r.height / 2 },
        to:    { x: hubCx - hub.width / 2, y: hubCy },
        color: leftGroups[i].color,
        side:  "left",
      });
    });

    rightEls.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      next.push({
        id:    rightGroups[i].id,
        from:  { x: hubCx + hub.width / 2, y: hubCy },
        to:    { x: r.left - base.left, y: r.top - base.top + r.height / 2 },
        color: rightGroups[i].color,
        side:  "right",
      });
    });

    setLines(next);
  }

  useEffect(() => {
    const t = setTimeout(recalcLines, 300);
    window.addEventListener("resize", recalcLines);
    return () => { clearTimeout(t); window.removeEventListener("resize", recalcLines); };
  }, []);

  return (
    <section id="skills" className="relative py-28 px-6 md:px-12 overflow-hidden" style={{
      background: "#fafafa",
      backgroundImage: "radial-gradient(circle, #d4d4d8 0.8px, transparent 0.8px)",
      backgroundSize: "26px 26px",
    }}>
      {/* Fade-out mask so dots don't go to the absolute edge */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, #fafafa 100%)",
        }}
      />

      {/* Ambient color blooms behind groups */}
      <div className="absolute top-1/4 left-[15%] w-72 h-72 rounded-full blur-[90px] pointer-events-none"
        style={{ background: "#6366f108" }} />
      <div className="absolute bottom-1/4 left-[15%] w-72 h-72 rounded-full blur-[90px] pointer-events-none"
        style={{ background: "#ec489908" }} />
      <div className="absolute top-[15%] right-[15%] w-80 h-80 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "#f9731608" }} />
      <div className="absolute bottom-[20%] right-[18%] w-64 h-64 rounded-full blur-[80px] pointer-events-none"
        style={{ background: "#14b8a608" }} />

      {/* ─── Heading ─── */}
      <div className="relative max-w-7xl mx-auto mb-20 z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest mb-5"
            >
              <Wrench size={12} /> Tech Stack
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-outfit text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-black leading-[1.05]"
            >
              Stack &amp; Toolkit<span className="text-red-500">.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-gray-500 text-lg max-w-xl leading-relaxed"
            >
              Tools I use to build scalable intelligent systems.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ─── Diagram ─── */}
      <div
        ref={containerRef}
        className="relative max-w-7xl mx-auto overflow-x-auto"
      >
        {/* SVG layer */}
        <Lines lines={lines} hovered={hovered} />

        {/* 3-col grid */}
        <div className="grid grid-cols-[1fr_200px_1fr] gap-16 items-center min-w-[800px]">

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-14">
            {leftGroups.map((g, i) => (
              <GroupBlock
                key={g.id}
                group={g}
                align="left"
                hovered={hovered === g.id}
                onEnter={() => setHovered(g.id)}
                onLeave={() => setHovered(null)}
                elRef={(el) => { leftEls.current[i] = el; }}
                delay={0.1 + i * 0.15}
              />
            ))}
          </div>

          {/* ── CENTER ── */}
          <CenterHub
            hovered={hovered === "hub"}
            onEnter={() => setHovered("hub")}
            onLeave={() => setHovered(null)}
            elRef={(el) => { hubRef.current = el; setTimeout(recalcLines, 100); }}
          />

          {/* ── RIGHT ── */}
          <div className="flex flex-col gap-10">
            {rightGroups.map((g, i) => (
              <GroupBlock
                key={g.id}
                group={g}
                align="right"
                hovered={hovered === g.id}
                onEnter={() => setHovered(g.id)}
                onLeave={() => setHovered(null)}
                elRef={(el) => { rightEls.current[i] = el; }}
                delay={0.1 + i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
