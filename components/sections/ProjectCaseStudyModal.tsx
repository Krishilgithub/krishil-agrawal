"use client";

import { ProjectCaseStudy } from "@/types/project";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ExternalLink, ArrowRight, Target, Zap, LayoutDashboard, 
  ShieldCheck, BrainCircuit, BarChart, Server, Database
} from "lucide-react";
import React, { useEffect } from "react";

interface Props {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export function ProjectCaseStudyModal({ project, onClose }: Props) {
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 md:p-12 backdrop-blur-sm bg-black/40"
        onClick={onClose}
      >
        <motion.div 
          data-lenis-prevent="true"
          initial={{ y: "100%", opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: "100%", opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-[95vw] max-w-[1600px] max-h-[95vh] sm:rounded-[3rem] overflow-y-auto bg-[#fafafa] border border-gray-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] custom-scrollbar"
        >
          
          {project.heroImage && (
            <div className="absolute top-0 left-0 w-full h-[50vh] md:h-[60vh] z-0 pointer-events-none overflow-hidden sm:rounded-t-[3rem]">
              <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover object-top opacity-80 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafa]/80 to-[#fafafa] pointer-events-none" />
            </div>
          )}

          {/* STICKY CLOSE BUTTON */}
          <div className="sticky top-6 right-6 z-50 flex justify-end px-6 pointer-events-none">
            <button 
              onClick={onClose}
              className="p-4 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-500 hover:text-black hover:bg-white rounded-full transition-all duration-300 group pointer-events-auto shadow-lg"
            >
              <X size={24} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="relative z-10 px-6 py-12 md:px-16 md:py-20 lg:px-24">
            
            {/* SECTION 1: HERO */}
            <motion.div 
              variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mb-24 mt-8"
            >
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-xs font-mono tracking-widest uppercase text-gray-700">
                  {project.type}
                </span>
                <span className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-mono tracking-widest uppercase text-emerald-700">
                  {project.status}
                </span>
              </div>

              <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-black tracking-tighter leading-tight">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-500 font-light max-w-4xl leading-relaxed mb-10">
                {project.tagline}
              </p>

              <div className="flex flex-wrap gap-4">
                {project.links.demo && (
                  <a href={project.links.demo} className="px-6 py-3 bg-black text-white border border-black rounded-full font-bold hover:bg-gray-900 transition-colors flex items-center gap-2 text-base">
                    Live Deployment <ExternalLink size={18} />
                  </a>
                )}
                {project.links.github && (
                  <a href={project.links.github} className="px-6 py-3 bg-white text-black border border-gray-300 rounded-full font-bold hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center gap-2 text-base">
                    GitHub Repo <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </motion.div>

            {/* SECTION 2: PROBLEM STATEMENT */}
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-16 pt-16 border-t border-gray-200">
              <h3 className="text-red-500 font-mono tracking-widest uppercase text-xs font-bold mb-8 flex items-center gap-3">
                <Target size={16} /> The Problem
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                <h4 className="text-2xl md:text-3xl text-black font-medium leading-relaxed font-outfit">
                  {project.problemStatement.problem}
                </h4>
                <div className="flex flex-col gap-6">
                  <div>
                    <h5 className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-2">Why it matters</h5>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">{project.problemStatement.whyItMatters}</p>
                  </div>
                  <div>
                    <h5 className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-2">Who is affected</h5>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">{project.problemStatement.affected}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SECTION 3: APPROACH & ARCHITECTURE */}
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-16 pt-16 border-t border-gray-200">
              <h3 className="text-blue-600 font-mono tracking-widest uppercase text-xs font-bold mb-8 flex items-center gap-3">
                <Server size={16} /> Architecture & System Design
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {project.architecture.frontend && (
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <LayoutDashboard className="text-gray-400 mb-4" size={24} />
                    <h5 className="text-black font-outfit text-xl font-bold mb-3">Frontend</h5>
                    <p className="text-gray-500 text-base leading-relaxed">{project.architecture.frontend}</p>
                  </div>
                )}
                {project.architecture.backend && (
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <Server className="text-gray-400 mb-4" size={24} />
                    <h5 className="text-black font-outfit text-xl font-bold mb-3">Backend Processing</h5>
                    <p className="text-gray-500 text-base leading-relaxed">{project.architecture.backend}</p>
                  </div>
                )}
                {project.architecture.mlPipeline && (
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <BrainCircuit className="text-gray-400 mb-4" size={24} />
                    <h5 className="text-black font-outfit text-xl font-bold mb-3">ML Pipeline</h5>
                    <p className="text-gray-500 text-base leading-relaxed">{project.architecture.mlPipeline}</p>
                  </div>
                )}
              </div>

              <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h5 className="text-black font-outfit text-xl font-bold mb-3">Architectural Reasoning</h5>
                    <p className="text-gray-500 text-base leading-relaxed">{project.architecture.reasoning}</p>
                  </div>
                  <div>
                    <h5 className="text-black font-outfit text-xl font-bold mb-3">Alternatives Considered</h5>
                    <p className="text-gray-500 text-base leading-relaxed">{project.architecture.alternatives}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SECTION 4: ML DEEP DIVE */}
            {project.mlDeepDive && (
              <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-16 pt-16 border-t border-gray-200">
                <h3 className="text-violet-600 font-mono tracking-widest uppercase text-xs font-bold mb-8 flex items-center gap-3">
                  <Database size={16} /> ML & Technical Deep Dive
                </h3>

                {/* Model & Dataset Bento */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                  <div className="lg:col-span-8 bg-violet-50 p-8 rounded-3xl border border-violet-100 flex flex-col justify-center">
                    <h5 className="text-black font-outfit text-2xl font-bold mb-5">Model Selection & Training</h5>
                    <div className="mb-5">
                      <span className="text-violet-500 font-mono text-xs uppercase tracking-widest">Core Architecture</span>
                      <p className="text-xl text-black font-medium mt-1">{project.mlDeepDive.model}</p>
                    </div>
                    <div>
                      <span className="text-violet-500 font-mono text-xs uppercase tracking-widest">Training Methodology</span>
                      <p className="text-base text-gray-600 mt-1 leading-relaxed">{project.mlDeepDive.training}</p>
                    </div>
                  </div>
                  <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-center">
                    <h5 className="text-black font-outfit text-xl font-bold mb-3">Dataset</h5>
                    <p className="text-gray-500 text-base leading-relaxed mb-4">{project.mlDeepDive.dataset}</p>
                  </div>
                </div>

                {/* Preprocessing & Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                    <h5 className="text-black font-outfit text-xl font-bold mb-5">Preprocessing Pipeline</h5>
                    <ul className="flex flex-col gap-3">
                      {project.mlDeepDive.preprocessing.map((step, idx) => (
                        <li key={idx} className="flex gap-4 text-gray-600 items-start">
                          <span className="text-gray-300 font-mono text-sm font-bold mt-1">.0{idx + 1}</span>
                          <span className="leading-relaxed text-base">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                    <h5 className="text-black font-outfit text-xl font-bold mb-6">Evaluation Metrics</h5>
                    <div className="grid grid-cols-2 gap-6">
                      {project.mlDeepDive.metrics.map((metric, idx) => (
                        <div key={idx}>
                          <h4 className="font-outfit text-3xl md:text-4xl font-black text-black mb-2">{metric.value}</h4>
                          <span className="text-gray-400 font-mono text-[10px] uppercase tracking-widest">{metric.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Challenges */}
                <div className="bg-red-50 p-8 rounded-3xl border border-red-100 mt-6">
                  <h5 className="text-black font-outfit text-xl font-bold mb-6 flex items-center gap-3">
                    <Zap size={20} className="text-red-500" /> Technical Challenges
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.mlDeepDive.challenges.map((challenge, idx) => (
                      <div key={idx} className="flex flex-col gap-3">
                        <div className="text-red-600 font-bold text-base">Problem: {challenge.problem}</div>
                        <div className="text-gray-600 leading-relaxed text-base">
                          <strong className="text-black">Solution:</strong> {challenge.solution}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* SECTION 5: FEATURES */}
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-16 pt-16 border-t border-gray-200">
              <h3 className="text-gray-400 font-mono tracking-widest uppercase text-xs font-bold mb-8 flex items-center gap-3">
                <LayoutDashboard size={16} /> Core Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition-all">
                    <h5 className="text-black font-outfit text-xl font-bold mb-3">{feature.name}</h5>
                    <p className="text-gray-500 text-base leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* SECTION 6: RESULTS & IMPACT */}
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-16 pt-16 border-t border-gray-200">
              <h3 className="text-emerald-600 font-mono tracking-widest uppercase text-xs font-bold mb-8 flex items-center gap-3">
                <BarChart size={16} /> Results & Impact
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div>
                  <h4 className="text-3xl md:text-5xl text-black font-medium leading-tight font-outfit mb-6">
                    {project.results.beforeAfter}
                  </h4>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    {project.results.realWorld}
                  </p>
                </div>
                
                <div className="flex flex-col gap-6">
                  {project.results.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
                      <h4 className="text-xl md:text-2xl font-outfit font-bold text-black leading-tight">
                        {metric}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* SECTION 7: LEARNINGS */}
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-16 pt-16 border-t border-gray-200">
              <h3 className="text-amber-600 font-mono tracking-widest uppercase text-xs font-bold mb-8 flex items-center gap-3">
                <ShieldCheck size={16} /> Takeaways & Learnings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-3">What I Learned</h5>
                  <p className="text-gray-600 text-base leading-relaxed">{project.learnings.learned}</p>
                </div>
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-3">Trade-Offs Made</h5>
                  <p className="text-gray-600 text-base leading-relaxed">{project.learnings.tradeoffs}</p>
                </div>
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-3">Future Improvements</h5>
                  <p className="text-gray-600 text-base leading-relaxed">{project.learnings.improveNext}</p>
                </div>
              </div>
            </motion.div>

            {/* SECTION 8: TECH STACK */}
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-16 pt-16 border-t border-gray-200">
              <h3 className="text-gray-400 font-mono tracking-widest uppercase text-xs font-bold mb-8 flex items-center gap-3">
                <Database size={16} /> Tech Stack Foundation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {project.techStack.map((group, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="text-black font-outfit text-lg font-bold mb-4">{group.category}</h5>
                    <ul className="flex flex-col gap-3">
                      {group.items.map((tech, tIdx) => (
                        <li key={tIdx} className="text-gray-500 font-medium text-base flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* SECTION 9: NEXT ACTIONS */}
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="pt-16 pb-8 border-t border-gray-200 flex flex-col items-center text-center">
              <h2 className="font-outfit text-2xl md:text-4xl font-bold mb-6 text-black">
                Interested in this architecture?
              </h2>
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-900 transition-all flex justify-center items-center gap-2 w-fit text-base shadow-xl"
              >
                Close Case Study <ArrowRight size={18} />
              </button>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
