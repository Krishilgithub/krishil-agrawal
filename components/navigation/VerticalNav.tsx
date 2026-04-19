"use client";

import { motion } from "framer-motion";
import { Briefcase, User, Wrench, Mail, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "About",      icon: User,      anchor: "about" },
  { name: "Experience", icon: Clock,     anchor: "experience" },
  { name: "Projects",   icon: Briefcase, route: "/projects" },
  { name: "Blogs",      icon: BookOpen,  route: "/blogs" },
  { name: "Skills",     icon: Wrench,    anchor: "skills" },
  { name: "Contact",    icon: Mail,      anchor: "contact" },
];

export function VerticalNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (!isHome) return; // no in-page observer on sub-pages

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = navItems.findIndex(
              (item) => item.anchor && `#${entry.target.id}` === `#${item.anchor}`
            );
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -40% 0px" }
    );

    navItems.forEach((item) => {
      if (!item.anchor) return; // skip route-only items
      const el = document.querySelector(`#${item.anchor}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  // Resolve href: on home page use anchors, on sub-pages prefix with /
  const resolveHref = (item: typeof navItems[number]) => {
    if (item.route) return item.route;
    return isHome ? `#${item.anchor}` : `/#${item.anchor}`;
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: typeof navItems[number]
  ) => {
    if (item.route) return; // Next.js handles routing
    if (!isHome) return;    // full-page navigation for anchors on sub-pages
    e.preventDefault();
    const el = document.querySelector(`#${item.anchor}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6 bg-transparent hidden md:flex">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = isHome 
          ? activeIndex === index 
          : Boolean(item.route && pathname.startsWith(item.route));

        return (
          <Link
            key={item.name}
            href={resolveHref(item)}
            onClick={(e) => handleClick(e, item)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group relative flex items-center justify-center p-3 rounded-full transition-all duration-300 z-10 ${
              isActive
                ? "bg-black/5 shadow-inner border border-black/10 scale-110"
                : "hover:bg-black/5 bg-transparent"
            }`}
          >
            <Icon
              size={20}
              className={`${
                isActive ? "text-red-500" : "text-gray-500 group-hover:text-black"
              } transition-colors`}
            />

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
