"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, User, Wrench, Mail, BookOpen, Clock, Quote } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { name: "About", icon: User, href: "#about" },
  { name: "Experience", icon: Clock, href: "#experience" },
  { name: "Projects", icon: Briefcase, href: "#projects" },
  { name: "Skills", icon: Wrench, href: "#skills" },
  { name: "Blogs", icon: BookOpen, href: "#blogs" },
  // { name: "Testimonials", icon: Quote, href: "#testimonials" },
  { name: "Contact", icon: Mail, href: "#contact" },
];

export function VerticalNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

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
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6 bg-white/80 backdrop-blur-md py-6 pl-6 pr-4 rounded-full border border-gray-100 shadow-sm hidden md:flex">
      
      {/* Background Progress Line */}
      <div className="absolute left-3 top-8 bottom-8 w-[2px] bg-gray-200/50 rounded-full z-0 overflow-hidden">
         <motion.div 
           className="w-full h-full bg-red-500 origin-top"
           style={{ scaleY }}
         />
      </div>

      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeIndex === index;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={(e) => handleScroll(e, item.href)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group relative flex items-center justify-center p-3 rounded-full transition-all duration-300 z-10 ${
              isActive ? "bg-white shadow-md border border-gray-100 scale-110" : "hover:bg-gray-100 bg-transparent"
            }`}
          >
            <Icon size={20} className={`${isActive ? "text-red-500" : "text-gray-400 group-hover:text-black"} transition-colors`} />
            
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
