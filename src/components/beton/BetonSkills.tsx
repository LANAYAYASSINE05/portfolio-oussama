"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { qualities, skills } from "@/lib/content";
import { SectionBar } from "./shared";

export function BetonSkills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-skill]").forEach((el) => {
        gsap.from(el.querySelector("[data-skill-fill]"), {
          scaleY: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 95%", end: "top 45%", scrub: 0.6 },
        });
      });
    },
    { scope: root },
  );

  const tape = [...qualities, ...qualities];

  return (
    <section id="competences" ref={root} className="mt-[14vh]">
      <SectionBar index="04" label="Compétences" title="Savoir-faire" meta={`${skills.length} domaines`} />

      <div className="grid grid-cols-2 md:grid-cols-4">
        {skills.map((s, i) => (
          <div
            key={s.name}
            data-skill
            className={`relative isolate flex min-h-60 flex-col justify-between gap-8 overflow-hidden border-b-2 border-ink p-[var(--gutter)] ${i % 2 === 0 ? "border-r-2" : "border-r-0"} ${i % 4 === 3 ? "md:border-r-0" : "md:border-r-2"}`}
          >
            <span
              data-skill-fill
              aria-hidden
              className="absolute inset-x-0 bottom-0 -z-10 origin-bottom bg-terra"
              style={{ height: `${s.level}%` }}
            />
            <span className="beton-mono">{String(i + 1).padStart(2, "0")}</span>
            <span>
              <span className="block font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none tabular-nums">
                {s.level}
                <span className="text-[0.45em]">%</span>
              </span>
              <span className="mt-3 block min-h-[2.5em] font-semibold uppercase leading-tight tracking-tight">{s.name}</span>
            </span>
          </div>
        ))}
        <div className="flex min-h-60 flex-col justify-between gap-6 border-b-2 border-ink bg-ink p-[var(--gutter)] text-paper">
          <span className="beton-mono text-terra">Méthode</span>
          <p className="text-lg font-medium leading-snug">Analyse, esquisse, plans & 3D, rendus : une chaîne complète, sans rupture.</p>
        </div>
      </div>

      <div aria-label="Qualités" className="overflow-hidden border-b-2 border-ink bg-terra py-4">
        <ul className="beton-tape flex w-max items-center gap-8 pr-8">
          {tape.map((q, i) => (
            <li key={`${q}-${i}`} aria-hidden={i >= qualities.length} className="flex items-center gap-8 whitespace-nowrap font-display text-3xl md:text-5xl">
              {q}
              <span className="block size-4 bg-ink md:size-5" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
