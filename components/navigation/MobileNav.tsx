"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, User, Wrench, Mail, BookOpen, Clock, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "About",      icon: User,      anchor: "about" },
  { name: "Experience", icon: Clock,     anchor: "experience" },
  { name: "Projects",   icon: Briefcase, route: "/projects", anchor: "projects" },
  { name: "Blogs",      icon: BookOpen,  route: "/blogs",    anchor: "blogs" },
  { name: "Skills",     icon: Wrench,    anchor: "skills" },
  { name: "Contact",    icon: Mail,      anchor: "contact" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const resolveHref = (item: typeof navItems[number]) => {
    if (item.route) return item.route;
    return isHome ? `#${item.anchor}` : `/#${item.anchor}`;
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: typeof navItems[number]
  ) => {
    setIsOpen(false);
    if (item.route) return; // Next.js handles routing
    if (!isHome) return;    // allow full navigation to /#anchor
    e.preventDefault();
    const el = document.querySelector(`#${item.anchor}`);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
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
                const isActive = isHome 
                  ? false 
                  : Boolean(item.route && pathname.startsWith(item.route));

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      href={resolveHref(item)}
                      onClick={(e) => handleClick(e, item)}
                      className={`flex items-center gap-6 text-2xl font-outfit font-bold transition-colors ${isActive ? "text-red-500" : "text-gray-800 hover:text-red-500"}`}
                    >
                      <span className={`p-4 rounded-full border ${isActive ? "bg-red-50 border-red-100" : "bg-gray-50 border-gray-100"}`}>
                        <Icon size={24} className={isActive ? "text-red-500" : "text-gray-600"} />
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
