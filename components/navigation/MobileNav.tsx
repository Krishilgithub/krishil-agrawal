"use client";

import { motion } from "framer-motion";
import { Briefcase, User, Wrench, Mail, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "About",    icon: User,      anchor: "about" },
  { name: "Journey",  icon: Clock,     anchor: "experience" },
  { name: "Projects", icon: Briefcase, route: "/projects", anchor: "projects" },
  { name: "Blogs",    icon: BookOpen,  route: "/blogs",    anchor: "blogs" },
  { name: "Skills",   icon: Wrench,    anchor: "skills" },
  { name: "Contact",  icon: Mail,      anchor: "contact" },
];

/**
 * Mobile bottom tab bar.
 * - On the home page, Projects/Blogs scroll to their section; elsewhere they route.
 * - Hidden on article / case-study pages, which have their own back button and
 *   floating section indicator at the bottom of the screen.
 */
export function MobileNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDetailPage = /^\/(projects|blogs)\/[^/]+/.test(pathname);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = navItems.findIndex((item) => item.anchor === entry.target.id);
          if (index !== -1) setActiveIndex(index);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    const hero = document.querySelector("#hero");
    const heroObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveIndex(-1); },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    if (hero) heroObserver.observe(hero);

    navItems.forEach((item) => {
      const el = document.querySelector(`#${item.anchor}`);
      if (el) observer.observe(el);
    });

    return () => { observer.disconnect(); heroObserver.disconnect(); };
  }, [isHome]);

  if (isDetailPage) return null;

  const resolveHref = (item: typeof navItems[number]) => {
    if (isHome) return `#${item.anchor}`;
    if (item.route) return item.route;
    return `/#${item.anchor}`;
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: typeof navItems[number]
  ) => {
    if (!isHome) return; // let Next.js navigate
    e.preventDefault();
    document.querySelector(`#${item.anchor}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Spacer so the fixed bar never covers the end of the page (body is flex-col) */}
      <div aria-hidden className="md:hidden order-last shrink-0 h-[calc(76px+env(safe-area-inset-bottom))]" />

      <motion.nav
        aria-label="Primary"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 24, stiffness: 220, delay: 0.3 }}
        className="md:hidden fixed inset-x-3 z-[60] bottom-[calc(10px+env(safe-area-inset-bottom))]"
      >
        <ul className="grid grid-cols-6 rounded-2xl bg-white/85 backdrop-blur-xl border border-black/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-1 py-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = isHome
              ? activeIndex === index
              : Boolean(item.route && pathname.startsWith(item.route));

            return (
              <li key={item.name}>
                <Link
                  href={resolveHref(item)}
                  onClick={(e) => handleClick(e, item)}
                  aria-current={isActive ? "page" : undefined}
                  className="relative flex flex-col items-center justify-center gap-0.5 h-[52px] rounded-xl active:scale-95 transition-transform"
                >
                  {isActive && (
                    <motion.span
                      layoutId="mobile-nav-active"
                      className="absolute inset-0 rounded-xl bg-red-50"
                      transition={{ type: "spring", damping: 26, stiffness: 300 }}
                    />
                  )}
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.4 : 2}
                    className={`relative ${isActive ? "text-red-500" : "text-gray-500"}`}
                  />
                  <span
                    className={`relative text-[10px] leading-none font-semibold tracking-tight ${
                      isActive ? "text-red-600" : "text-gray-500"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </>
  );
}
