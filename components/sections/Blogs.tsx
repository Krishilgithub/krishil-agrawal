"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const blogs = [
  {
    title: "Building Agentic Workflows with LangGraph",
    date: "March 2026",
    readTime: "5 min read",
    link: "#"
  },
  {
    title: "Why I switched from React to Next.js App Router for AI Apps",
    date: "February 2026",
    readTime: "8 min read",
    link: "#"
  },
  {
    title: "End-to-End MLOps: Deploying PyTorch models with Docker",
    date: "January 2026",
    readTime: "12 min read",
    link: "#"
  }
];

export function Blogs() {
  return (
    <section id="blogs" className="py-24 px-6 md:px-12 bg-gray-50 text-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="font-outfit text-5xl md:text-7xl font-extrabold tracking-tighter">
            Writing & <br className="hidden md:block"/> Thoughts<span className="text-red-500">.</span>
          </h2>
          <a href="#" className="font-bold border-b-2 border-black pb-1 hover:text-red-600 hover:border-red-600 transition-colors uppercase tracking-widest text-sm">
            View All Posts
          </a>
        </div>

        <div className="flex flex-col border-t border-gray-200">
          {blogs.map((blog, index) => (
            <motion.a
              key={index}
              href={blog.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-b border-gray-200 hover:bg-white transition-colors px-4 -mx-4 rounded-xl"
            >
              <div className="flex-1 pr-8">
                <h3 className="font-outfit text-2xl md:text-3xl font-bold mb-3 group-hover:text-red-600 transition-colors">
                  {blog.title}
                </h3>
                <div className="flex gap-4 text-gray-500 text-sm font-medium">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
              <div className="mt-6 md:mt-0 p-4 bg-gray-100 rounded-full group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                <ArrowUpRight size={24} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
