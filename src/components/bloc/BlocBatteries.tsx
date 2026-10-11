"use client";

import { Check } from "lucide-react";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { qualities, skills } from "@/lib/content";
import { BlocTitle, pop } from "./shared";

const SEGMENTS = 10;

export function BlocBatteries() {
  const root = useRef<HTMLElement>(null);
  const [picked, setPicked] = useState<string[]>([]);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-battery]").forEach((battery) => {
        gsap.from(battery.querySelectorAll("[data-cell-on]"), {
          autoAlpha: 0,
          scaleY: 0.2,
          duration: 0.25,
          ease: "back.out(3)",
          stagger: 0.07,
          scrollTrigger: { trigger: battery, start: "top 88%", once: true },
        });
      });
    },
    { scope: root },
  );

  const toggle = (q: string) => setPicked((p) => (p.includes(q) ? p.filter((x) => x !== q) : [...p, q]));

  return (
    <section id="competences" data-room="competences" ref={root} className="border-y-[3px] border-ink bg-night px-[var(--gutter)] py-[14vh]">
      <BlocTitle index={4} tag="Compétences" color="bg-pop-orange" title="Batteries chargées." />

      <ul className="grid gap-5 md:grid-cols-2">
        {skills.map((s, i) => {
          const full = Math.round(s.level / SEGMENTS);
          return (
            <li key={s.name} data-battery className="bloc-box flex items-center gap-4 bg-paper-2 p-4 md:p-5">
              <div className="min-w-0 flex-1">
                <p className="font-bold leading-tight">{s.name}</p>
                <div className="mt-3 flex items-center">
                  <div className="flex flex-1 gap-1 rounded-lg border-[3px] border-ink bg-night p-1">
                    {Array.from({ length: SEGMENTS }, (_, c) => (
                      <span
                        key={c}
                        {...(c < full ? { "data-cell-on": "" } : {})}
                        className={`h-6 flex-1 origin-bottom rounded-[3px] ${c < full ? pop(i) : "bg-ink/10"}`}
                      />
                    ))}
                  </div>
                  <span aria-hidden className="h-3 w-1.5 rounded-r-sm bg-ink" />
                </div>
              </div>
              <span className="font-display text-3xl tabular-nums">{s.level}</span>
            </li>
          );
        })}
      </ul>

      <div className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-2xl uppercase">Ce que vous cherchez ?</p>
            <p className="mt-1 text-graphite">Cochez les qualités attendues pour le poste.</p>
          </div>
          <p aria-live="polite" className={`rounded-full border-[3px] border-ink px-4 py-2 text-sm font-black uppercase transition-colors ${picked.length ? "bg-pop-lime text-night" : "bg-paper"}`}>
            {picked.length ? `${picked.length}/${picked.length} — toutes au rendez-vous` : "Rien de coché"}
          </p>
        </div>
        <ul className="mt-6 flex flex-wrap gap-3">
          {qualities.map((q, i) => {
            const on = picked.includes(q);
            return (
              <li key={q}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(q)}
                  className={`bloc-press flex items-center gap-2 rounded-full border-[3px] border-ink px-4 py-2.5 font-bold shadow-[4px_4px_0_0_var(--ink)] ${on ? `${pop(i)} text-night` : "bg-paper"}`}
                  data-cursor=""
                >
                  <span className={`grid size-5 place-items-center rounded-md border-2 border-current ${on ? "bg-night text-pop-lime" : ""}`}>
                    {on && <Check aria-hidden strokeWidth={3.5} className="size-3.5" />}
                  </span>
                  {q}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
