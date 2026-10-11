"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { TechLogo } from "@/components/ui/Logos";
import { techCategories, technologies, type TechCategory } from "@/lib/content";
import { RoomHeading } from "./shared";

const R = 46;
const C = 2 * Math.PI * R;

export function ClaustraAtelier() {
  const [category, setCategory] = useState<TechCategory>(techCategories[0]);
  const items = technologies.filter((t) => t.category === category);

  return (
    <section id="technologies" data-room="technologies" className="bg-night px-[var(--gutter)] py-[16vh]">
      <RoomHeading
        index={3}
        name="L'atelier"
        nameAr="الورشة"
        align="center"
        title={
          <>
            {technologies.length} logiciels, <span className="text-terra">de l&apos;esquisse au rendu.</span>
          </>
        }
      />

      <div role="tablist" aria-label="Catégories de logiciels" className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border border-line p-1.5">
        {techCategories.map((c) => {
          const on = c === category;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setCategory(c)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${on ? "text-night" : "text-graphite hover:text-ink"}`}
              data-cursor=""
            >
              {on && (
                <motion.span layoutId="claustra-tab" className="absolute inset-0 rounded-full bg-terra" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <span className="relative">{c}</span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" aria-label={category} className="mx-auto mt-14 max-w-5xl">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.ul key={category} className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {items.map((t, i) => (
              <motion.li
                key={t.symbol}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col items-center rounded-[1.75rem] border border-line bg-paper-2/60 px-4 pb-6 pt-7 transition-colors duration-500 hover:border-terra/50"
              >
                <span className="relative grid size-32 place-items-center">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                    <circle cx="50" cy="50" r={R} fill="none" stroke="currentColor" strokeWidth={2} className="text-ink/10" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r={R}
                      fill="none"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      className={i % 2 === 0 ? "stroke-terra" : "stroke-safran"}
                      strokeDasharray={C}
                      initial={{ strokeDashoffset: C }}
                      whileInView={{ strokeDashoffset: C * (1 - t.level / 100) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </svg>
                  <span className="grid size-20 place-items-center rounded-full bg-ink/95 shadow-[0_0_40px_-10px_var(--accent)] transition-transform duration-700 ease-archi group-hover:scale-110">
                    <TechLogo name={t.name} className="size-11" />
                  </span>
                </span>
                <span className="mt-5 font-semibold">{t.name}</span>
                <span className="mt-1 font-display text-2xl text-terra">{t.level}%</span>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}
