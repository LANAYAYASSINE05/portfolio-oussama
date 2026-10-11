"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { qualities, skills } from "@/lib/content";
import { SectionTitle } from "./shared";

const ringColors = ["var(--accent)", "var(--olive)", "#8a5f3a", "var(--ink)"];
const tilt = [-3, 2, -1.5, 3, -2.5, 1.5, -1, 2.5, -2, 1];

export function MatiereSkills() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const size = 520;
  const center = size / 2;

  useGSAP(
    () => {
      gsap.from("[data-ring]", {
        strokeDasharray: "0 100",
        duration: 2,
        ease: "power3.inOut",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-rings]", start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="competences" ref={root} className="bg-paper-2 px-[var(--gutter)] py-[16vh]">
      <SectionTitle tag="Compétences">
        Les cernes <span className="italic text-terra">du savoir-faire.</span>
      </SectionTitle>

      <div className="grid grid-cols-12 items-center gap-x-[var(--gutter)] gap-y-12">
        <div data-rings className="relative col-span-12 mx-auto w-full max-w-[32rem] md:col-span-6">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full -rotate-90" aria-hidden>
            {skills.map((s, i) => {
              const r = center - 20 - i * 30;
              const on = active === i;
              return (
                <g key={s.name} className="transition-opacity duration-500" opacity={on ? 1 : 0.35}>
                  <circle cx={center} cy={center} r={r} fill="none" style={{ stroke: "var(--ink)" }} strokeOpacity="0.08" strokeWidth="14" />
                  <circle
                    data-ring
                    cx={center}
                    cy={center}
                    r={r}
                    fill="none"
                    style={{ stroke: ringColors[i % ringColors.length] }}
                    strokeWidth={on ? 16 : 12}
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray={`${s.level} 100`}
                    className="transition-[stroke-width] duration-500"
                  />
                </g>
              );
            })}
          </svg>
          <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
            <motion.div key={active} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
              <span className="block font-display text-5xl md:text-6xl">{skills[active].level}%</span>
            </motion.div>
          </div>
        </div>

        <ol className="col-span-12 md:col-span-6">
          {skills.map((s, i) => (
            <li key={s.name}>
              <button
                type="button"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group flex w-full items-center gap-4 border-b border-line py-4 text-left"
                data-cursor=""
              >
                <span
                  className="size-3 shrink-0 rounded-full transition-transform duration-500 group-hover:scale-150"
                  style={{ background: ringColors[i % ringColors.length] }}
                />
                <span
                  className={`flex-1 font-display text-[clamp(1.25rem,2vw,1.75rem)] transition-all duration-500 ${
                    active === i ? "translate-x-2 italic" : "text-graphite"
                  }`}
                >
                  {s.name}
                </span>
                <span className="matiere-tag tabular-nums text-graphite">{s.level}%</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-24">
        <h3 data-reveal className="font-display text-3xl">
          Qualités <span className="italic text-graphite">— des galets polis par l&apos;expérience</span>
        </h3>
        <ul className="mt-8 flex flex-wrap gap-3">
          {qualities.map((q, i) => (
            <li key={q} data-reveal>
              <motion.span
                style={{ rotate: tilt[i % tilt.length] }}
                whileHover={{ rotate: 0, scale: 1.08 }}
                className={`${i % 3 === 0 ? "texture-lin" : i % 3 === 1 ? "bg-paper" : "bg-ink text-paper"} block rounded-[48%_52%_46%_54%/60%_55%_45%_40%] px-6 py-3.5 font-display text-xl`}
              >
                {q}
              </motion.span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
