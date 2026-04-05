"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const skills = [
  { name: "LangChain", url: "https://cdn.simpleicons.org/langchain" },
  { name: "PyTorch", url: "https://cdn.simpleicons.org/pytorch" },
  { name: "n8n", url: "https://cdn.simpleicons.org/n8n" },
  { name: "Supabase", url: "https://cdn.simpleicons.org/supabase" },
  { name: "Next.js", url: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "React", url: "https://cdn.simpleicons.org/react" },
  { name: "Tailwind CSS", url: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "Docker", url: "https://cdn.simpleicons.org/docker" },
  { name: "Python", url: "https://cdn.simpleicons.org/python" },
  { name: "Scikit-learn", url: "https://cdn.simpleicons.org/scikitlearn" },
];

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-500, 0]);

  return (
    <section id="skills" ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="font-outfit text-5xl font-extrabold tracking-tighter">Stack & Toolkit</h2>
      </div>

      <div className="flex flex-col gap-6 w-[150vw] -ml-[25vw] rotate-[-2deg]">
        {/* Row 1 */}
        <motion.div style={{ x: x1 }} className="flex gap-4 items-center">
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <div
              key={`r1-${index}`}
              className="flex items-center gap-4 px-8 py-4 bg-gray-100 rounded-full shrink-0"
            >
              <img src={skill.name === 'Next.js' ? 'https://cdn.simpleicons.org/nextdotjs/black' : skill.url} alt={skill.name} className="w-8 h-8 object-contain" />
              <h3 className="text-2xl font-bold font-outfit whitespace-nowrap">{skill.name}</h3>
            </div>
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div style={{ x: x2 }} className="flex gap-4 items-center">
          {[...skills].reverse().concat([...skills].reverse(), [...skills].reverse()).map((skill, index) => (
            <div
              key={`r2-${index}`}
              className="flex items-center gap-4 px-8 py-4 bg-black text-white rounded-full shrink-0"
            >
              <img src={skill.url} alt={skill.name} className="w-8 h-8 object-contain invert-0" style={{ filter: skill.name !== 'Next.js' && skill.name !== 'React' && skill.name !== 'Supabase' && skill.name !== 'Tailwind CSS' ? 'invert(1) brightness(100)' : 'none' }} />
              <h3 className="text-2xl font-bold font-outfit whitespace-nowrap">{skill.name}</h3>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
