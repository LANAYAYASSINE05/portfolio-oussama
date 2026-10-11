"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { TechLogo } from "@/components/ui/Logos";
import { techCategories, technologies } from "@/lib/content";
import { MaquetteTitle } from "./shared";

export function MaquetteCaisse() {
  const [open, setOpen] = useState<string | null>(techCategories[0]);

  return (
    <section id="technologies" data-room="technologies" className="px-[var(--gutter)] py-[14vh]">
      <MaquetteTitle
        plate={3}
        tag="Logiciels"
        title={<>{technologies.length} outils dans la caisse.</>}
        note="tirez un tiroir"
      />

      <div data-reveal className="balsa mx-auto max-w-6xl rounded-sm p-3 shadow-[0_30px_60px_rgb(0_0_0/0.55)] md:p-5">
        <div className="space-y-3 bg-[#2a1d0f] p-2 md:space-y-4 md:p-3">
          {techCategories.map((cat, ci) => {
            const tools = technologies.filter((t) => t.category === cat);
            const isOpen = open === cat;
            return (
              <div key={cat}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : cat)}
                  aria-expanded={isOpen}
                  aria-controls={`tiroir-${ci}`}
                  className={`kraft relative flex w-full items-center justify-between gap-4 rounded-[2px] px-4 py-4 text-left shadow-[inset_0_-4px_0_rgb(0_0_0/0.18),0_4px_0_#6e4a26] transition-transform duration-300 md:px-6 md:py-5 ${
                    isOpen ? "translate-y-1" : "hover:-translate-y-0.5"
                  }`}
                  data-cursor={isOpen ? "Fermer" : "Ouvrir"}
                >
                  <span className="flex items-center gap-4">
                    <span className="foam rounded-[2px] px-3 py-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] shadow-[0_2px_0_#b9ae98]">
                      Tiroir {String(ci + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl uppercase leading-none md:text-3xl">{cat}</span>
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="hidden font-mono text-xs font-bold sm:inline">{tools.length} outils</span>
                    <span aria-hidden className="h-3 w-16 rounded-full bg-gradient-to-b from-[#e9ece6] to-[#8d918a] shadow-[0_3px_4px_rgb(0_0_0/0.45)] md:w-24" />
                    <motion.span aria-hidden animate={{ rotate: isOpen ? 180 : 0 }} className="font-mono text-sm font-bold">
                      ▾
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`tiroir-${ci}`}
                      key="body"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="grid grid-cols-2 gap-3 bg-[#262a27] p-3 text-ink shadow-[inset_0_10px_20px_rgb(0_0_0/0.6)] sm:grid-cols-4 md:gap-4 md:p-5">
                        {tools.map((t, i) => (
                          <motion.li
                            key={t.symbol}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                            className="group flex flex-col items-center rounded-md bg-[#1c1f1d] px-3 pb-4 pt-5 text-center shadow-[inset_0_4px_10px_rgb(0_0_0/0.75),inset_0_-1px_0_rgb(255_255_255/0.05)]"
                          >
                            <span className="grid size-16 place-items-center rounded-xl bg-[#efe9dc] shadow-[0_6px_10px_rgb(0_0_0/0.55)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-[-4deg]">
                              <TechLogo name={t.name} className="size-10" />
                            </span>
                            <span className="mt-4 font-display text-lg uppercase leading-none">{t.name}</span>
                            <span className="mt-3 w-full">
                              <span className="relative block h-2.5 overflow-hidden rounded-[2px] bg-[#c9ccc6]">
                                <span
                                  className="absolute inset-0"
                                  style={{ backgroundImage: "repeating-linear-gradient(90deg, #1d211e 0 1px, transparent 1px 10%)" }}
                                />
                                <motion.span
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: t.level / 100 }}
                                  transition={{ delay: 0.3 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                  className="absolute inset-y-0 left-0 w-full origin-left bg-terra/85"
                                />
                              </span>
                              <span className="mt-1.5 flex justify-between font-mono text-[0.6rem] text-graphite">
                                <span>niveau</span>
                                <span className="text-ink">{t.level}/100</span>
                              </span>
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
