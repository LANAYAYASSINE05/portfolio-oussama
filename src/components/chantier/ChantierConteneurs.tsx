"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { TechLogo } from "@/components/ui/Logos";
import { techCategories, technologies } from "@/lib/content";
import { ChantierTitle } from "./shared";

const shells = [
  { body: "#c4471d", dark: "#8f3110" },
  { body: "#24599c", dark: "#163c6c" },
  { body: "#2f7a4a", dark: "#1d5532" },
  { body: "#6b727a", dark: "#454b51" },
];

function Door({ side, open, color }: { side: "left" | "right"; open: boolean; color: { body: string; dark: string } }) {
  const left = side === "left";
  return (
    <motion.span
      aria-hidden
      initial={false}
      animate={{ rotateY: open ? (left ? -112 : 112) : 0 }}
      transition={{ type: "spring", stiffness: 70, damping: 14, delay: left ? 0 : 0.08 }}
      style={{ backgroundColor: color.body, borderColor: color.dark, transformOrigin: left ? "0% 50%" : "100% 50%" }}
      className={`corrugated absolute inset-y-0 z-10 block w-1/2 [backface-visibility:hidden] ${left ? "left-0 border-r-2" : "right-0 border-l-2"}`}
    >
      <span className="absolute inset-y-[6%] left-[22%] w-1.5 rounded-full bg-[#1b1d1f]/50" />
      <span className="absolute inset-y-[6%] left-[62%] w-1.5 rounded-full bg-[#1b1d1f]/50" />
      <span className={`absolute top-1/2 h-8 w-2.5 -translate-y-1/2 rounded-sm bg-[#d8d5cc] shadow ${left ? "right-3" : "left-3"}`} />
    </motion.span>
  );
}

export function ChantierConteneurs() {
  const [open, setOpen] = useState<string[]>([techCategories[0]]);
  const toggle = (cat: string) => setOpen((list) => (list.includes(cat) ? list.filter((c) => c !== cat) : [...list, cat]));

  return (
    <section id="technologies" data-room="technologies" className="relative bg-night px-[var(--gutter)] py-[14vh]">
      <ChantierTitle
        lot={3}
        tag="Logiciels"
        title={<>Le parc matériel : {technologies.length} logiciels.</>}
        sub="Un conteneur par famille · cliquez pour ouvrir les portes"
        aside={
          <div className="flex gap-3 font-mono text-xs uppercase tracking-[0.16em]">
            <button type="button" onClick={() => setOpen([...techCategories])} className="border border-line px-4 py-2.5 hover:border-terra hover:text-terra" data-cursor="">
              Tout ouvrir
            </button>
            <button type="button" onClick={() => setOpen([])} className="border border-line px-4 py-2.5 hover:border-terra hover:text-terra" data-cursor="">
              Tout fermer
            </button>
          </div>
        }
      />

      <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
        {techCategories.map((cat, ci) => {
          const tools = technologies.filter((t) => t.category === cat);
          const isOpen = open.includes(cat);
          const color = shells[ci % shells.length];
          return (
            <div key={cat} data-reveal>
              <div className="relative border-[10px] [perspective:1400px]" style={{ borderColor: color.dark }}>
                <span className="absolute -top-[10px] left-[8%] right-[8%] z-20 h-[10px] bg-[repeating-linear-gradient(90deg,transparent_0_10px,rgb(0_0_0/0.35)_10px_12px)]" aria-hidden />
                <div inert={!isOpen} className="relative aspect-[5/4] bg-[#0b0c0d] p-3 shadow-[inset_0_20px_40px_rgb(0_0_0/0.85)] sm:aspect-[16/10] md:aspect-[5/4] md:p-4 lg:aspect-[16/10] xl:aspect-[2/1]">
                  <ul className="grid h-full grid-cols-2 gap-2 md:gap-3">
                    {tools.map((t, i) => (
                      <motion.li
                        key={t.symbol}
                        initial={false}
                        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                        transition={{ delay: isOpen ? 0.35 + i * 0.07 : 0, duration: 0.4 }}
                        className="plywood relative flex flex-col justify-between overflow-hidden p-2.5 md:p-3"
                      >
                        <span aria-hidden className="absolute inset-x-0 top-[38%] h-px bg-[#6e4a26]/35" />
                        <span className="relative flex items-start justify-between gap-2">
                          <span className="grid size-10 place-items-center rounded-md bg-[#f4f2ec] shadow-[0_3px_6px_rgb(0_0_0/0.35)] md:size-12">
                            <TechLogo name={t.name} className="size-7 md:size-8" />
                          </span>
                          <span className="font-stencil text-sm text-[#2a1a0a]/60">{t.symbol.toUpperCase()}</span>
                        </span>
                        <span className="relative">
                          <span className="block truncate font-display text-lg uppercase leading-none md:text-xl">{t.name}</span>
                          <span className="mt-2 flex items-center gap-2">
                            <span className="relative block h-2 flex-1 overflow-hidden bg-[#2a1a0a]/25">
                              <motion.span
                                initial={false}
                                animate={{ scaleX: isOpen ? t.level / 100 : 0 }}
                                transition={{ delay: isOpen ? 0.55 + i * 0.07 : 0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="hazard-fine absolute inset-0 origin-left"
                              />
                            </span>
                            <span className="font-mono text-[0.6rem] font-bold">{t.level}%</span>
                          </span>
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <Door side="left" open={isOpen} color={color} />
                <Door side="right" open={isOpen} color={color} />

                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  className="pointer-events-none absolute left-1/2 top-[14%] z-20 -translate-x-1/2 whitespace-nowrap bg-[#111]/80 px-3 py-1 font-stencil text-base uppercase tracking-[0.12em] text-[#f4f2ec] md:text-lg"
                >
                  {tools.length} logiciels
                </motion.span>
              </div>

              <button
                type="button"
                onClick={() => toggle(cat)}
                aria-expanded={isOpen}
                className="group mt-3 flex w-full items-center justify-between gap-4 text-left"
                data-cursor={isOpen ? "Fermer" : "Ouvrir"}
              >
                <span>
                  <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-graphite">Conteneur OZU {String(ci + 1).padStart(3, "0")}-{["4", "2", "7", "1"][ci % 4]}</span>
                  <span className="block font-display text-3xl uppercase leading-none md:text-4xl">{cat}</span>
                </span>
                <span className={`shrink-0 px-4 py-2 font-display text-base uppercase transition-colors ${isOpen ? "bg-ink text-night" : "bg-terra text-[#111] group-hover:bg-ink"}`}>
                  {isOpen ? "Fermer" : "Ouvrir"}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
