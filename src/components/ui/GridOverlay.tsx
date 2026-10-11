"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target;
      if (el instanceof Element && el.closest("input, textarea, [contenteditable]")) return;
      if (e.key.toLowerCase() === "g" && !e.metaKey && !e.ctrlKey) setVisible((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="label fixed bottom-4 left-[var(--gutter)] z-[80] hidden items-center gap-2 rounded-full border border-ink/20 bg-paper/70 px-3 py-1.5 backdrop-blur md:flex"
        data-cursor=""
      >
        <span className={`size-1.5 rounded-full ${visible ? "bg-terra" : "bg-ink/30"}`} />
        Grille [G]
      </button>

      <AnimatePresence>
        {visible && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[70] grid grid-cols-4 gap-[var(--gutter)] px-[var(--gutter)] md:grid-cols-12"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{ show: { transition: { staggerChildren: 0.03 } }, hidden: {} }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className={`origin-top border-x border-terra/30 bg-terra/[0.06] ${i >= 4 ? "hidden md:block" : ""}`}
                variants={{
                  hidden: { scaleY: 0 },
                  show: { scaleY: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
