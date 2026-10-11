"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { qualities, skills } from "@/lib/content";
import { SceneHeading } from "./Scene";

export function LightMeter() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-beam-row]").forEach((row) => {
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: "top 85%" } })
          .from(row.querySelector("[data-light]"), { scaleX: 0, duration: 1.6, ease: "expo.out" })
          .from(row.querySelector("[data-glow]"), { autoAlpha: 0, duration: 1.2 }, 0.3);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="competences" data-chapter="Scène 03 — Compétences" className="relative px-[var(--gutter)] py-[16vh]">
      <SceneHeading scene="03" kicker="Compétences" title={<>L&apos;<span className="italic text-terra">exposition</span></>} />

      <div className="mt-16 grid gap-16 lg:grid-cols-12">
        <ul className="space-y-7 lg:col-span-8">
          {skills.map((s) => (
            <li key={s.name} data-beam-row>
              <div className="mb-2 flex items-baseline justify-between">
                <span className="font-display text-2xl md:text-3xl">{s.name}</span>
                <span className="label tabular-nums text-graphite">{s.level} %</span>
              </div>
              <div className="relative h-2 rounded-full bg-ink/10">
                <div
                  data-light
                  className="absolute inset-y-0 left-0 origin-left rounded-full"
                  style={{ width: `${s.level}%`, background: "linear-gradient(90deg, transparent, var(--accent) 70%, #fff4d6)" }}
                />
                <div
                  data-glow
                  className="absolute top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ left: `${s.level}%`, background: "radial-gradient(circle, #fff4d6, color-mix(in oklab, var(--accent) 60%, transparent) 30%, transparent 70%)" }}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="lg:col-span-3 lg:col-start-10">
          <p className="credits mb-6 text-terra">Avec la participation de</p>
          <div className="relative h-[26rem] overflow-hidden [mask-image:linear-gradient(transparent,black_20%,black_80%,transparent)]">
            <ul className="animate-[credits-roll_22s_linear_infinite] space-y-6 text-center">
              {[...qualities, ...qualities].map((q, i) => (
                <li key={`${q}-${i}`}>
                  <span className="credits block text-graphite">Qualité</span>
                  <span className="font-display text-3xl italic">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
