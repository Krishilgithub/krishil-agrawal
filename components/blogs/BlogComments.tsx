"use client";

import React, { useState } from "react";
import { MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogCommentsProps {
  blogId: string;
}

// Dynamically import Giscus only when actually needed to avoid loading the
// giscus script before we know configuration is complete.
function GiscusWidget({ blogId, repo, repoId, categoryId }: {
  blogId: string;
  repo: `${string}/${string}`;
  repoId: string;
  categoryId: string;
}) {
  // Lazy-load so Giscus script never fires when env vars are missing
  const Giscus = require("@giscus/react").default;
  return (
    <Giscus
      id={`giscus-${blogId}`}
      repo={repo}
      repoId={repoId}
      category="General"
      categoryId={categoryId}
      mapping="specific"
      term={blogId}
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
    />
  );
}

export function BlogComments({ blogId }: BlogCommentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const rawRepo   = process.env.NEXT_PUBLIC_GISCUS_REPO       ?? "";
  const rawRepoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID    ?? "";
  const rawCatId  = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "";

  // Only activate if ALL three values are non-empty strings
  const isConfigured =
    rawRepo.trim().length > 0 &&
    rawRepoId.trim().length > 0 &&
    rawCatId.trim().length > 0;

  const repo = rawRepo as `${string}/${string}`;

  return (
    <section className="mt-20 pt-12 border-t border-gray-200" id="comments">
      {/* Toggle header */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="group w-full flex items-center justify-between gap-4 mb-0"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all duration-200">
            <MessageSquare size={18} />
          </div>
          <div className="text-left">
            <h3 className="font-outfit text-xl font-bold text-gray-900">Discussion</h3>
            <p className="text-sm text-gray-400">
              {isOpen
                ? "Click to collapse"
                : "Join the conversation — sign in with GitHub"}
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors shrink-0">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Collapsible body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="comments-body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-8">
              {isConfigured ? (
                <GiscusWidget
                  blogId={blogId}
                  repo={repo}
                  repoId={rawRepoId}
                  categoryId={rawCatId}
                />
              ) : (
                /* ── Setup Guide (shown until env vars are filled in) ── */
                <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                  <div className="text-3xl mb-3">💬</div>
                  <h4 className="font-outfit font-bold text-gray-800 text-lg mb-2">
                    Comments need a one-time setup
                  </h4>
                  <p className="text-gray-500 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    This blog uses <strong>Giscus</strong> — real comments stored in your
                    GitHub Discussions. Free, no database required. Complete the 4 steps below
                    once, then every post has live comments.
                  </p>

                  <div className="text-left max-w-lg mx-auto space-y-5 mb-8">
                    {[
                      {
                        step: "1",
                        title: "Make your portfolio repo public",
                        detail: "Giscus only works on public repositories.",
                        code: null,
                      },
                      {
                        step: "2",
                        title: "Enable Discussions on the repo",
                        detail: "GitHub repo → Settings → Features → tick Discussions.",
                        code: null,
                      },
                      {
                        step: "3",
                        title: "Install the Giscus GitHub App",
                        detail: 'Visit giscus.app, enter your repo, select "General" as the category, and copy the three IDs shown.',
                        code: null,
                      },
                      {
                        step: "4",
                        title: "Add the IDs to .env.local",
                        detail: "Then restart the dev server — comments activate immediately.",
                        code: `NEXT_PUBLIC_GISCUS_REPO="Krishilgithub/your-repo"\nNEXT_PUBLIC_GISCUS_REPO_ID="R_xxxxxxxxxxxx"\nNEXT_PUBLIC_GISCUS_CATEGORY_ID="DIC_xxxxxxxxxxxx"`,
                      },
                    ].map(({ step, title, detail, code }) => (
                      <div key={step} className="flex gap-3 items-start text-left">
                        <div className="w-7 h-7 rounded-full bg-red-500 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                          {step}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-sm">{title}</div>
                          <div className="text-gray-400 text-xs mt-0.5">{detail}</div>
                          {code && (
                            <pre className="mt-2 bg-gray-900 text-green-400 text-xs rounded-lg p-3 overflow-x-auto font-mono">
                              {code}
                            </pre>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://giscus.app"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-red-600 transition-colors"
                  >
                    Open giscus.app →
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
