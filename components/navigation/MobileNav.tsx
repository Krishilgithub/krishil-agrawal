"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, User, Wrench, Mail, BookOpen, Clock, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { name: "About", icon: User, href: "#about" },
  { name: "Experience", icon: Clock, href: "#experience" },
  { name: "Projects", icon: Briefcase, href: "#projects" },
  { name: "Skills", icon: Wrench, href: "#skills" },
  { name: "Blogs", icon: BookOpen, href: "#blogs" },
  { name: "Contact", icon: Mail, href: "#contact" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const section = document.querySelector(href);
    if (section) {
      setTimeout(() => section.scrollIntoView({ behavior: "smooth" }), 300);
    }
  };

  return (
    <>
      {/* Floating Bottom Pill */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-black/50 backdrop-blur-xl text-white px-6 py-3.5 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] font-medium border border-white/20 active:scale-95 transition-all"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[50] bg-white/95 backdrop-blur-2xl flex flex-col justify-center items-center md:hidden pb-20"
          >
            <div className="flex flex-col gap-6 w-full max-w-[280px]">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleScroll(e, item.href)}
                      className="flex items-center gap-6 text-2xl font-outfit font-bold text-gray-800 hover:text-red-500 transition-colors"
                    >
                      <span className="p-4 bg-gray-50 rounded-full border border-gray-100">
                         <Icon size={24} className="text-gray-600" />
                      </span>
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
