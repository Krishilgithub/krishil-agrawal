"use client";

import { motion } from "framer-motion";
import { Quote, Mail, Phone } from "lucide-react";

export function Testimonials() {
  const references = [
    {
      name: "Parth Goel",
      role: "AI & ML Assistant Professor",
      org: "CHARUSAT University",
      email: "parthgoel.ce@charusat.ac.in",
      phone: "+91 9662123479",
      text: "Krishil is a fiercely driven engineer who constantly bridges the gap between deep learning theory and tangible product development. His work on the retinal screening pipeline showcased exceptional rigor for a student."
    },
    {
      name: "Hardik Parmar",
      role: "Assistant Professor",
      org: "CHARUSAT University",
      email: "hardikparmar.dcs@charusat.ac.in",
      phone: "+91 8128240572",
      text: "A highly capable developer with a deep understanding of Agentic systems. He rapidly masters new architectures like LangGraph and applies them securely to complex multi-agent simulations."
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 bg-white text-black relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/87/1mm-graph-paper.svg')] opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="mx-auto md:mx-0 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest mb-5"
            >
              <Quote size={12} /> Testimonials
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-outfit text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-black leading-[1.05]"
            >
              Academic References<span className="text-red-500">.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-gray-500 text-lg max-w-xl leading-relaxed mx-auto md:mx-0"
            >
              Feedback from professors and mentors on my work ethic and engineering capabilities.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {references.map((ref, idx) => (
             <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-gray-50 border border-gray-100 p-8 md:p-12 rounded-[2rem] relative group"
             >
                <Quote size={60} className="absolute top-8 right-8 text-red-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                
                <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-8 italic">
                  &quot;{ref.text}&quot;
                </p>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-outfit text-2xl font-bold text-black">{ref.name}</h4>
                  <p className="text-red-600 font-semibold mb-4">{ref.role}, <span className="text-gray-500 font-normal">{ref.org}</span></p>
                  
                  <div className="flex flex-col gap-2 text-gray-500 text-sm font-mono">
                    <a href={`mailto:${ref.email}`} className="flex items-center gap-2 hover:text-black transition-colors w-fit">
                      <Mail size={16} /> {ref.email}
                    </a>
                    <a href={`tel:${ref.phone.replace(/\\s/g, '')}`} className="flex items-center gap-2 hover:text-black transition-colors w-fit">
                      <Phone size={16} /> {ref.phone}
                    </a>
                  </div>
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
