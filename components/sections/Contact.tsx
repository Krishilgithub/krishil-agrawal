"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, Mail, Globe, Code, 
  CheckCircle2, Clock, ShieldCheck, Send, CheckCheck, AlertCircle, Loader2
} from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", purpose: "Internship / Job Opportunity", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setFormState("success");
        setForm({ name: "", email: "", purpose: "Internship / Job Opportunity", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }

    // Reset back to idle after 5s
    setTimeout(() => setFormState("idle"), 5000);
  };

  return (
    <section id="contact" className="pt-24 pb-8 md:pt-32 md:pb-8 px-6 md:px-12 bg-[#fafafa] relative overflow-hidden">
      
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-black/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
        
        {/* LEFT COLUMN: TEXT & TRUST SIGNALS */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest mb-5"
              >
                <Mail size={12} /> Contact
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="font-outfit text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-black leading-[1.05]"
              >
                Contact Me<span className="text-red-500">.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-5 text-gray-500 text-lg max-w-xl leading-relaxed"
              >
                Open to ML/AI internships, collaborations, and real-world projects. I enjoy working on real-world AI problems and building systems that actually make an impact.
              </motion.p>
            </div>
          </div>

          <div className="w-16 h-1 bg-black/10 rounded-full mb-10" />

          {/* Value Proposition */}
          <div className="mb-12">
            <h4 className="text-sm font-mono tracking-widest uppercase text-gray-400 font-bold mb-4">
              What you can reach out for:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "ML/AI Internships & Roles",
                "AI Project Collaborations",
                "Freelance ML Solutions",
                "Hackathons & Team-ups"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 size={18} className="text-red-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Method Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <a href="mailto:krishilagrawal026@gmail.com" className="flex flex-col gap-3 p-5 bg-white border border-gray-200 rounded-2xl hover:border-red-500 hover:shadow-lg transition-all group">
              <Mail className="text-gray-400 group-hover:text-red-500 transition-colors" size={24} />
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</div>
                <div className="text-sm font-semibold text-black truncate group-hover:text-red-600 transition-colors">Primary Channel</div>
              </div>
            </a>
            
            <a href="https://www.linkedin.com/in/krishil-agrawal-49aaa9283" target="_blank" rel="noreferrer" className="flex flex-col gap-3 p-5 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all group">
              <Globe className="text-gray-400 group-hover:text-blue-500 transition-colors" size={24} />
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Network</div>
                <div className="text-sm font-semibold text-black group-hover:text-blue-600 transition-colors">LinkedIn</div>
              </div>
            </a>

            <a href="https://github.com/Krishilgithub" target="_blank" rel="noreferrer" className="flex flex-col gap-3 p-5 bg-white border border-gray-200 rounded-2xl hover:border-black hover:shadow-lg transition-all group">
              <Code className="text-gray-400 group-hover:text-black transition-colors" size={24} />
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Code</div>
                <div className="text-sm font-semibold text-black group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  GitHub <ArrowUpRight size={14} />
                </div>
              </div>
            </a>
          </div>

        </div>

        {/* RIGHT COLUMN: FORM */}
        <div className="lg:col-span-5 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 relative z-10"
          >
            <h3 className="font-outfit text-2xl font-bold text-black mb-2">Send a Message</h3>
            <p className="text-gray-500 text-sm mb-8">Have an idea or opportunity? Let&apos;s talk.</p>

            <form onSubmit={submitForm} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name</label>
                <input 
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                <input 
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@company.com" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Purpose</label>
                <select 
                  name="purpose"
                  value={form.purpose}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium appearance-none cursor-pointer"
                >
                  <option value="Internship / Job Opportunity">Internship / Job Opportunity</option>
                  <option value="Project Collaboration">Project Collaboration</option>
                  <option value="Freelance Inquiry">Freelance Inquiry</option>
                  <option value="Just saying hi">Just saying hi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                <textarea 
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4} 
                  placeholder="Hi Krishil, I saw your ML portfolio and wanted to reach out regarding..." 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium resize-none" 
                />
              </div>

              <motion.button 
                whileHover={{ scale: formState === "loading" ? 1 : 1.02 }}
                whileTap={{ scale: formState === "loading" ? 1 : 0.98 }}
                type="submit"
                disabled={formState === "loading" || formState === "success"}
                className="w-full mt-2 bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed hover:bg-red-600 hover:shadow-red-600/20"
              >
                <AnimatePresence mode="wait">
                  {formState === "idle" && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                      Send Message <Send size={18} />
                    </motion.span>
                  )}
                  {formState === "loading" && (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                      Sending... <Loader2 size={18} className="animate-spin" />
                    </motion.span>
                  )}
                  {formState === "success" && (
                    <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-green-400">
                      Message Sent! <CheckCheck size={18} />
                    </motion.span>
                  )}
                  {formState === "error" && (
                    <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-red-400">
                      Failed. Try again <AlertCircle size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {formState === "error" && (
                <p className="text-sm text-center text-gray-500">
                  Or email directly at{" "}
                  <a href="mailto:krishilagrawal026@gmail.com" className="text-red-600 font-semibold underline">
                    krishilagrawal026@gmail.com
                  </a>
                </p>
              )}
            </form>

            {/* TRUST SIGNALS */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                <Clock size={16} className="text-green-500" />
                Typically responds within 24 hours
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                <ShieldCheck size={16} className="text-blue-500" />
                Open to serious technical opportunities only
              </div>
            </div>
          </motion.div>

          {/* Decorative background blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-red-500/10 to-blue-500/5 blur-3xl rounded-full pointer-events-none -z-10" />
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-24 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-400 gap-4 relative z-10">
        <p>© {new Date().getFullYear()} Krishil Agrawal. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="tel:8320902499" className="hover:text-black transition-colors">
            +91 8320902499
          </a>
        </div>
      </div>

    </section>
  );
}
