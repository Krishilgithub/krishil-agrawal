"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-white relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        
        {/* Left Side: Large text */}
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-outfit text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter"
          >
            I engineer <br/>
            <span className="text-outline">intelligence</span>.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-2 bg-red-600 mb-8"
          />
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 space-y-6 text-xl text-gray-700 font-medium">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            I am a 3rd-year B.Tech CS student in Vadodara, India, maintaining a CGPA of 9.27. My deep passion lies at the intersection of Machine Learning and Agentic workflows.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            From building LangChain-powered orchestration engines to deploying scalable PyTorch models, I bridge the gap between experimental AI and production-ready applications.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-6"
          >
            <p className="font-outfit text-2xl font-bold text-black border-l-4 border-red-600 pl-4 py-1">
              Currently looking for full-time opportunities & freelance AI projects.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
