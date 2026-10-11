"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { qualities, skills } from "@/lib/content";

const positions = [
  { left: "6%", top: "8%", rotate: -6 },
  { left: "50%", top: "6%", rotate: 4 },
  { left: "20%", top: "24%", rotate: 8 },
  { left: "54%", top: "30%", rotate: -3 },
  { left: "4%", top: "44%", rotate: 3 },
  { left: "36%", top: "52%", rotate: -8 },
  { left: "8%", top: "64%", rotate: 6 },
  { left: "48%", top: "70%", rotate: -4 },
  { left: "14%", top: "84%", rotate: 5 },
  { left: "56%", top: "86%", rotate: -6 },
];

export function Skills() {
  const root = useRef<HTMLElement>(null);
  const board = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-skill]").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 85%" } });
        tl.from(row.querySelector("[data-skill-axis]"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" })
          .from(row.querySelectorAll("[data-skill-tick]"), { scaleY: 0, duration: 0.4, stagger: 0.1 }, 0.4)
          .from(row.querySelector("[data-skill-fill]"), { scaleX: 0, duration: 1.6, ease: "expo.out" }, 0.6)
          .from(
            row.querySelector("[data-skill-value]"),
            { textContent: 0, duration: 1.6, ease: "expo.out", snap: { textContent: 1 } },
            0.6,
          );
      });

      gsap.from("[data-quality]", {
        scale: 0,
        duration: 0.9,
        ease: "back.out(2)",
        stagger: { each: 0.06, from: "random" },
        scrollTrigger: { trigger: board.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="competences" ref={root} className="relative px-[var(--gutter)] py-[16vh]">
      <div className="mb-16 grid grid-cols-4 gap-[var(--gutter)] md:grid-cols-12">
        <p className="label col-span-4 text-graphite md:col-span-3">( 03 ) Compétences</p>
        <h2 className="col-span-4 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92] md:col-span-9">
          Savoir-faire <span className="italic text-terra">coté</span> au millimètre.
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-[var(--gutter)] gap-y-20 md:grid-cols-12">
        <ul className="col-span-4 space-y-9 md:col-span-7">
          {skills.map((s) => (
            <li key={s.name} data-skill>
              <div className="mb-3 flex items-baseline justify-between">
                <span className="text-lg md:text-xl">{s.name}</span>
                <span className="font-mono text-sm">
                  <span data-skill-value>{s.level}</span>%
                </span>
              </div>
              <div className="relative h-4">
                <span data-skill-tick className="absolute left-0 top-0 h-full w-px origin-bottom bg-ink" />
                <span data-skill-tick className="absolute right-0 top-0 h-full w-px origin-bottom bg-ink/40" />
                <span
                  data-skill-axis
                  className="absolute inset-x-0 top-1/2 h-px origin-left bg-ink/25"
                />
                <span
                  data-skill-fill
                  className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 origin-left bg-ink"
                  style={{ width: `${s.level}%` }}
                >
                  <span className="absolute -right-1 top-1/2 size-2 -translate-y-1/2 rotate-45 border border-ink bg-paper" />
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="col-span-4 md:col-span-5">
          <div className="mb-3 flex items-baseline justify-between">
            <p className="text-lg md:text-xl">Qualités</p>
            <p className="label text-graphite">Glissez-les ↔</p>
          </div>
          <div
            ref={board}
            className="blueprint-fine relative h-[26rem] overflow-hidden border border-ink md:h-[32rem]"
          >
            {qualities.map((q, i) => {
              const p = positions[i % positions.length];
              return (
                <motion.div
                  key={q}
                  className="absolute"
                  style={{ left: p.left, top: p.top }}
                  drag
                  dragConstraints={board}
                  dragElastic={0.2}
                  dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
                  whileHover={{ scale: 1.08 }}
                  whileDrag={{ scale: 1.15, zIndex: 10 }}
                >
                  <span
                    data-quality
                    data-cursor="Glisser"
                    className={`block select-none whitespace-nowrap rounded-full border border-ink px-4 py-2 text-sm md:text-base ${
                      i % 3 === 0 ? "bg-ink text-paper" : i % 3 === 1 ? "bg-terra text-paper border-terra" : "bg-paper"
                    }`}
                    style={{ rotate: `${p.rotate}deg` }}
                  >
                    {q}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
