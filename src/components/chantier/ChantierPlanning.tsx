"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, useGSAP } from "@/lib/gsap";
import { experience } from "@/lib/content";
import { ChantierTitle } from "./shared";

const START = 2020;
const END = 2028;
const NOW = 2026.78;
const years = Array.from({ length: END - START }, (_, i) => START + i);
const pct = (y: number) => ((y - START) / (END - START)) * 100;

function span(period: string) {
  const found = period.match(/\d{4}/g)?.map(Number) ?? [START];
  const ongoing = /aujourd/i.test(period);
  const from = found[0];
  const to = ongoing ? NOW : found[1] ? found[1] + 0.5 : from + 0.9;
  return { from, to, ongoing };
}

const tasks = [...experience].reverse().map((e) => ({ ...e, ...span(e.period) }));

export function ChantierPlanning() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSite();
  const [active, setActive] = useState(tasks.length - 1);
  const task = tasks[active];

  useGSAP(
    () => {
      gsap.from("[data-ch-bar]", {
        scaleX: 0,
        transformOrigin: "0% 50%",
        duration: 1.1,
        ease: "power3.inOut",
        stagger: 0.25,
        scrollTrigger: { trigger: "[data-ch-gantt]", start: "top 75%" },
      });
      gsap.from("[data-ch-now]", { scaleY: 0, transformOrigin: "50% 0%", duration: 0.8, ease: "power2.out", delay: 0.9, scrollTrigger: { trigger: "[data-ch-gantt]", start: "top 75%" } });
    },
    { scope: root },
  );

  return (
    <section id="experience" data-room="experience" ref={root} className="relative bg-night px-[var(--gutter)] py-[14vh]">
      <ChantierTitle lot={5} tag="Parcours" title="Planning des travaux." sub={`Diagramme de Gantt · ${START} — ${END - 1}`} />

      <div data-ch-gantt data-reveal className="overflow-hidden border border-line bg-paper-2">
        <div className="grid border-b border-line md:grid-cols-[16rem_1fr]">
          <div className="hidden border-r border-line px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-graphite md:block">Tâche</div>
          <div className="relative h-10">
            {years.map((y) => (
              <span key={y} className="absolute inset-y-0 flex items-center border-l border-line pl-2 font-mono text-[0.65rem] text-graphite" style={{ left: `${pct(y)}%` }}>
                {y}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 left-0 md:left-[16rem]">
            {years.map((y) => (
              <span key={y} className="absolute inset-y-0 border-l border-line" style={{ left: `${pct(y)}%` }} />
            ))}
            <span data-ch-now className="absolute inset-y-0 z-10 w-0.5 bg-[#ff5b14]" style={{ left: `${pct(NOW)}%` }}>
              <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#ff5b14] px-1.5 py-0.5 font-mono text-[0.55rem] font-bold uppercase text-[#111]">Auj.</span>
            </span>
          </div>

          <ul role="tablist" aria-label="Étapes du parcours">
            {tasks.map((t, i) => {
              const on = i === active;
              return (
                <li key={t.period} className="border-b border-line last:border-b-0">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="planning-detail"
                    onClick={() => setActive(i)}
                    className={`grid w-full text-left transition-colors md:grid-cols-[16rem_1fr] ${on ? "bg-terra/[0.07]" : "hover:bg-white/[0.03]"}`}
                    data-cursor=""
                  >
                    <span className="flex items-center gap-3 px-5 pt-4 md:border-r md:border-line md:py-5">
                      <span className={`font-stencil text-2xl ${on ? "text-terra" : "text-graphite"}`}>{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="block font-display text-xl uppercase leading-none">{t.role}</span>
                        <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-graphite">{t.period}</span>
                      </span>
                    </span>
                    <span className="relative block h-14 md:h-auto">
                      <span
                        data-ch-bar
                        className={`absolute top-1/2 flex h-7 -translate-y-1/2 items-center overflow-hidden px-2 font-mono text-[0.6rem] font-bold uppercase text-[#111] ${on ? "shadow-[0_0_0_2px_var(--ink)]" : ""} ${
                          t.ongoing ? "hazard-fine" : "bg-terra"
                        }`}
                        style={{ left: `${pct(t.from)}%`, width: `${pct(t.to) - pct(t.from)}%` }}
                      >
                        {!t.ongoing && <span className="truncate">{t.company}</span>}
                      </span>
                      <span aria-hidden className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-ink bg-night" style={{ left: `${pct(t.to)}%` }} />
                    </span>
                  </button>
                </li>
              );
            })}
            <li>
              <button type="button" onClick={() => scrollTo("#contact")} className="group grid w-full text-left md:grid-cols-[16rem_1fr]" data-cursor="">
                <span className="flex items-center gap-3 px-5 pt-4 md:border-r md:border-line md:py-5">
                  <span className="font-stencil text-2xl text-terra">{String(tasks.length + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-display text-xl uppercase leading-none text-terra">Rejoindre votre agence</span>
                    <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-graphite group-hover:text-ink">Phase à programmer →</span>
                  </span>
                </span>
                <span className="relative block h-14 md:h-auto">
                  <span
                    className="absolute top-1/2 h-7 -translate-y-1/2 border-2 border-dashed border-terra transition-colors group-hover:bg-terra/20"
                    style={{ left: `${pct(NOW)}%`, right: 0 }}
                  />
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div id="planning-detail" role="tabpanel" className="mt-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={task.period}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 md:grid-cols-[1.2fr_1fr]"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-terra">
                {task.floor} · {task.company} · {task.location}
              </p>
              <h3 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.9]">{task.role}</h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">{task.text}</p>
            </div>
            <div className="bg-[#f4f2ec] p-5 text-[#141414] shadow-[0_18px_30px_rgb(0_0_0/0.5)] md:p-6">
              <p className="flex items-center justify-between font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#141414]/60">
                <span>Ordre de service</span>
                <span>{task.period}</span>
              </p>
              <ul className="mt-4 space-y-2.5">
                {task.missions.map((m) => (
                  <li key={m} className="flex items-center gap-3 border-b border-[#141414]/10 pb-2.5 font-display text-xl uppercase leading-none">
                    <span className="grid size-6 shrink-0 place-items-center bg-[#1f6b3a] text-[#f4f2ec]">
                      <Check aria-hidden className="size-4" strokeWidth={3} />
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
