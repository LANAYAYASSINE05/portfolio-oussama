"use client";

import { LayoutGroup, motion } from "motion/react";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { qualities, skills } from "@/lib/content";
import { BentoSection, Tile, TileLabel } from "./Tile";

const R = 42;
const C = 2 * Math.PI * R;

function Ring({ name, level, accent = false }: { name: string; level: number; accent?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative size-28">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r={R} fill="none" strokeWidth="8" className="stroke-line" />
          <circle
            data-ring
            data-level={level}
            cx="50"
            cy="50"
            r={R}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - level / 100)}
            className={accent ? "stroke-ink" : "stroke-terra"}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-2xl tabular-nums">{level}</span>
      </div>
      <span className="text-sm leading-tight">{name}</span>
    </div>
  );
}

function shuffle<T>(list: T[]) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function SkillsGrid() {
  const root = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState(qualities);
  const average = Math.round(skills.reduce((sum, s) => sum + s.level, 0) / skills.length);

  useGSAP(
    () => {
      gsap.from("[data-ring]", {
        strokeDashoffset: C,
        duration: 1.8,
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <BentoSection id="competences" index="03 — Compétences" title={<>Compétences<span className="text-terra">.</span></>}>
      <Tile className="col-span-2 md:col-span-6 lg:col-span-8">
        <div ref={root}>
          <TileLabel>Savoir-faire — niveau sur 100</TileLabel>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
            {skills.map((s) => (
              <Ring key={s.name} name={s.name} level={s.level} />
            ))}
            <Ring name="Moyenne" level={average} accent />
          </div>
        </div>
      </Tile>

      <Tile tone="accent" className="col-span-2 flex flex-col gap-6 md:col-span-6 lg:col-span-4">
        <div className="flex items-center justify-between">
          <TileLabel className="opacity-80">Qualités</TileLabel>
          <button
            type="button"
            onClick={() => setOrder((o) => shuffle(o))}
            className="label rounded-full bg-[#111] px-3 py-2 text-terra transition-transform active:scale-95"
            data-cursor=""
          >
            Mélanger ↻
          </button>
        </div>
        <LayoutGroup>
          <ul className="flex flex-wrap content-start gap-2">
            {order.map((q, i) => (
              <motion.li
                key={q}
                layout
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className={`rounded-full px-4 py-2.5 text-base font-medium ${
                  i % 3 === 0 ? "bg-[#111] text-paper-2" : "bg-white/55"
                }`}
              >
                {q}
              </motion.li>
            ))}
          </ul>
        </LayoutGroup>
      </Tile>
    </BentoSection>
  );
}
