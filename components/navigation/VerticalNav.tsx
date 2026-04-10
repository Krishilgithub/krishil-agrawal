"use client";

import { motion } from "framer-motion";
import { Briefcase, User, Wrench, Mail, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { name: "About", icon: User, href: "#about" },
  { name: "Experience", icon: Clock, href: "#experience" },
  { name: "Projects", icon: Briefcase, href: "/projects", isExternal: true },
  { name: "Blogs", icon: BookOpen, href: "/blogs", isExternal: true },
  { name: "Skills", icon: Wrench, href: "#skills" },
  // { name: "Testimonials", icon: Quote, href: "#testimonials" },
  { name: "Contact", icon: Mail, href: "#contact" },
];

export function VerticalNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = navItems.findIndex(item => item.href === `#${entry.target.id}`);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -40% 0px" }
    );

    navItems.forEach((item) => {
      // Skip route links — they are not CSS selectors
      if (item.isExternal) return;
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // Only try to scroll if it's an anchor selector, not a route path
    if (!href.startsWith("#")) return;
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6 bg-transparent hidden md:flex">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeIndex === index;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={(e) => {
              if (!item.isExternal) handleScroll(e, item.href);
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group relative flex items-center justify-center p-3 rounded-full transition-all duration-300 z-10 ${
              isActive ? "bg-black/5 shadow-inner border border-black/10 scale-110" : "hover:bg-black/5 bg-transparent"
            }`}
          >
            <Icon size={20} className={`${isActive ? "text-red-500" : "text-gray-500 group-hover:text-black"} transition-colors`} />
            
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
