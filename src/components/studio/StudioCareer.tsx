"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { experience } from "@/lib/content";
import { SectionHead } from "./SectionHead";

const ease = [0.16, 1, 0.3, 1] as const;

export function StudioCareer() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="px-[var(--gutter)] py-[16vh]">
      <SectionHead index="05" label="Expérience" title="Parcours" />

      <ul className="border-t border-ink">
        {experience.map((e, i) => {
          const isOpen = open === i;
          return (
            <li key={e.role} data-reveal className="border-b border-line">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group grid w-full grid-cols-12 items-baseline gap-x-[var(--gutter)] gap-y-2 py-7 text-left md:py-9"
                data-cursor=""
              >
                <span className="studio-caps col-span-12 text-graphite md:col-span-3">{e.period}</span>
                <span className="col-span-10 font-display text-[clamp(1.6rem,3vw,3rem)] leading-tight md:col-span-5">{e.role}</span>
                <span className="hidden text-graphite md:col-span-3 md:block">
                  {e.company} · {e.location}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.5, ease }}
                  className={`col-span-2 grid size-11 place-items-center justify-self-end rounded-full border transition-colors duration-300 md:col-span-1 ${
                    isOpen ? "border-ink bg-ink text-paper" : "border-line group-hover:border-ink"
                  }`}
                >
                  <Plus aria-hidden strokeWidth={1.5} className="size-4" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6 pb-10">
                      <p className="col-span-12 text-graphite md:hidden">
                        {e.company} · {e.location}
                      </p>
                      <p className="col-span-12 text-lg leading-relaxed md:col-span-5 md:col-start-4">{e.text}</p>
                      <ul className="col-span-12 flex flex-wrap content-start gap-2 md:col-span-3 md:col-start-10">
                        {e.missions.map((m) => (
                          <li key={m} className="studio-caps rounded-full border border-line px-3.5 py-2">
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
