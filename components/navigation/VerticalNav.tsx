"use client";

import { motion } from "framer-motion";
import { Briefcase, User, Wrench, Mail, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { name: "Projects", icon: Briefcase, href: "#projects" },
  { name: "Blogs", icon: BookOpen, href: "#blogs" },
  { name: "About", icon: User, href: "#about" },
  { name: "Skills", icon: Wrench, href: "#skills" },
  { name: "Contact", icon: Mail, href: "#contact" },
];

export function VerticalNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 bg-white/80 backdrop-blur-md p-4 rounded-full border border-gray-100 shadow-sm hidden md:flex">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={(e) => handleScroll(e, item.href)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Icon size={20} className="text-gray-600 group-hover:text-black transition-colors" />
            
            <motion.div
              initial={{ opacity: 0, x: 10, pointerEvents: "none" }}
              animate={{
                opacity: hoveredIndex === index ? 1 : 0,
                x: hoveredIndex === index ? -10 : 10,
              }}
              className="absolute right-full mr-4 bg-black text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap font-medium"
            >
              {item.name}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}
