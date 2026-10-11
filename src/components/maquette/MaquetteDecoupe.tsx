"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { qualities, skills } from "@/lib/content";
import { MaquetteTitle, Ruler } from "./shared";

const shapes = ["rounded-full", "rounded-sm", "rounded-[1.5rem_0.25rem]", "rounded-[0.25rem_1.5rem]", "rounded-xl"];
const drift = [
  [-6, -5],
  [5, -8],
  [-4, 6],
  [7, 4],
  [-8, -3],
];

export function MaquetteDecoupe() {
  const root = useRef<HTMLElement>(null);
  const [out, setOut] = useState<string[]>([]);

  const toggle = (q: string) => setOut((cur) => (cur.includes(q) ? cur.filter((x) => x !== q) : [...cur, q]));

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-mq-skill]").forEach((row) => {
        const level = Number(row.dataset.mqSkill);
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 85%" }, defaults: { duration: 1.2, ease: "power2.inOut" } });
        tl.fromTo(row.querySelector("[data-mq-kerf]"), { scaleX: 0 }, { scaleX: 1 }).fromTo(row.querySelector("[data-mq-knife]"), { left: "0%" }, { left: `${level}%` }, 0);
      });
    },
    { scope: root },
  );

  const all = out.length === qualities.length;

  return (
    <section id="competences" data-room="competences" ref={root} className="mat px-[var(--gutter)] py-[14vh]">
      <MaquetteTitle plate={4} tag="Compétences" title="Mesuré à la règle, tranché au cutter." note="chaque trait = un niveau sur 100" />

      <ul className="grid gap-x-14 gap-y-12 lg:grid-cols-2">
        {skills.map((s) => (
          <li key={s.name} data-reveal data-mq-skill={s.level}>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <span className="font-display text-2xl uppercase leading-tight md:text-3xl">{s.name}</span>
              <span className="font-hand text-3xl text-terra">{s.level}</span>
            </div>
            <div className="relative pt-6">
              <span aria-hidden className="absolute left-0 top-[1.15rem] h-0.5 w-full border-t border-dashed border-line" />
              <span data-mq-kerf aria-hidden className="absolute left-0 top-[1.1rem] h-[3px] origin-left rounded-full bg-terra shadow-[0_0_10px_rgb(255_106_43/0.7)]" style={{ width: `${s.level}%` }} />
              <span data-mq-knife aria-hidden className="absolute top-0 -translate-x-1/2">
                <svg viewBox="0 0 24 34" className="h-8 w-6 drop-shadow-[0_3px_3px_rgb(0_0_0/0.5)]">
                  <rect x="6" y="0" width="12" height="18" rx="2" fill="var(--accent)" />
                  <path d="M7 18 H17 L12 32 Z" fill="#d7dad4" stroke="#6f736c" strokeWidth="0.8" />
                </svg>
              </span>
              <Ruler />
            </div>
          </li>
        ))}
      </ul>

      <div data-reveal className="mt-24">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl uppercase md:text-4xl">Planche de qualités</h3>
            <p className="mt-1 text-graphite">Détachez les pièces que vous recherchez chez un architecte.</p>
          </div>
          <p aria-live="polite" className="font-mono text-sm uppercase tracking-[0.15em]">
            <span className="text-terra">{out.length}</span> / {qualities.length} pièces détachées
          </p>
        </div>

        <div className="balsa relative rounded-sm p-5 shadow-[0_24px_50px_rgb(0_0_0/0.55)] md:p-8">
          <span aria-hidden className="absolute right-4 top-3 font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] opacity-60">
            Découpe laser · balsa 3 mm
          </span>
          <ul className="mt-4 flex flex-wrap gap-4 md:gap-5">
            {qualities.map((q, i) => {
              const detached = out.includes(q);
              const shape = shapes[i % shapes.length];
              const [dx, dr] = drift[i % drift.length];
              return (
                <li key={q} className="relative">
                  <span aria-hidden className={`absolute inset-0 bg-[#1a120a] shadow-[inset_0_3px_8px_rgb(0_0_0/0.8)] ${shape}`} />
                  <motion.button
                    type="button"
                    aria-pressed={detached}
                    onClick={() => toggle(q)}
                    animate={detached ? { x: dx, y: -12, rotate: dr } : { x: 0, y: 0, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 16 }}
                    className={`balsa relative block px-5 py-3 font-display text-lg uppercase md:px-6 md:text-xl ${shape} ${
                      detached ? "shadow-[0_14px_20px_rgb(0_0_0/0.55)]" : "perfo outline-[#5a3d1c]/50"
                    }`}
                    data-cursor={detached ? "Remettre" : "Détacher"}
                  >
                    {q}
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </div>
        <p className={`font-hand mt-5 text-3xl text-terra transition-opacity duration-500 ${all ? "opacity-100" : "opacity-0"}`}>
          Toutes détachées : elles font toutes partie de mon profil.
        </p>
      </div>
    </section>
  );
}
