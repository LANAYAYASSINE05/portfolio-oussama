"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { experience } from "@/lib/content";
import { SectionTitle, Swatch, type Texture } from "./shared";

const strata: { texture: Texture; light?: boolean }[] = [
  { texture: "terre" },
  { texture: "bois" },
  { texture: "pierre", light: true },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function MatiereCareer() {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="px-[var(--gutter)] py-[16vh]">
      <SectionTitle
        tag="Expérience"
        aside={<p className="ml-auto max-w-xs text-graphite">Chaque strate est une étape : de la plus récente, en surface, aux fondations.</p>}
      >
        Strates <span className="italic text-terra">d&apos;expérience.</span>
      </SectionTitle>

      <ol>
        {experience.map((e, i) => {
          const s = strata[i % strata.length];
          const isOpen = open === i;
          return (
            <li
              key={e.period}
              data-reveal
              className={`relative isolate overflow-hidden rounded-[2.5rem] ${i > 0 ? "-mt-8" : ""} ${s.light ? "text-ink" : "text-white"}`}
              style={{ zIndex: experience.length - i }}
            >
              <Swatch texture={s.texture} className="absolute inset-0 -z-10" />
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="grid w-full grid-cols-12 items-center gap-x-[var(--gutter)] gap-y-2 px-6 pb-14 pt-8 text-left md:px-10"
                data-cursor=""
              >
                <span className="matiere-tag col-span-12 opacity-75 md:col-span-3">{e.period}</span>
                <span className="col-span-10 font-display text-[clamp(1.75rem,3.6vw,3.5rem)] leading-tight md:col-span-8">
                  {e.role} <span className="italic opacity-70">— {e.company}</span>
                </span>
                <span className="col-span-2 flex justify-end md:col-span-1">
                  <span className="grid size-12 place-items-center rounded-full border border-current/30">
                    <Plus aria-hidden strokeWidth={1.5} className={`size-5 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} />
                  </span>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1, transition: { duration: 0.7, ease } }}
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.45, ease } }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6 px-6 pb-16 md:px-10">
                      <p className="col-span-12 max-w-2xl text-lg leading-relaxed opacity-90 md:col-span-8 md:col-start-4">{e.text}</p>
                      <ul className="col-span-12 flex flex-wrap gap-2 md:col-span-8 md:col-start-4">
                        {e.missions.map((m) => (
                          <li key={m} className="matiere-tag rounded-full bg-white/20 px-3.5 py-1.5 backdrop-blur-sm">
                            {m}
                          </li>
                        ))}
                        <li className="matiere-tag rounded-full px-3.5 py-1.5 opacity-75">{e.location}</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
