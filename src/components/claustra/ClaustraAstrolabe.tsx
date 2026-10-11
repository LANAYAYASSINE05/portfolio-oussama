"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { qualities, skills } from "@/lib/content";
import { Khatam, RoomHeading } from "./shared";

const OUTER = 186;
const STEP = 21;

export function ClaustraAstrolabe() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const current = skills[active];

  useGSAP(
    () => {
      gsap.utils.toArray<SVGCircleElement>("[data-ring]").forEach((ring, i) => {
        gsap.fromTo(
          ring,
          { strokeDashoffset: 100 },
          {
            strokeDashoffset: 100 - Number(ring.dataset.level),
            ease: "power2.out",
            scrollTrigger: { trigger: "[data-astrolabe]", start: `top ${80 - i * 3}%`, end: "center 55%", scrub: 0.8 },
          },
        );
      });
      gsap.to("[data-astro-ticks]", {
        rotate: 120,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="competences" data-room="competences" ref={root} className="overflow-hidden py-[16vh]">
      <div className="px-[var(--gutter)]">
        <RoomHeading index={4} name="L'astrolabe" nameAr="الأسطرلاب" title="Des savoir-faire mesurés, anneau par anneau." />

        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div data-astrolabe className="relative mx-auto aspect-square w-full max-w-[30rem]">
            <svg viewBox="0 0 400 400" className="absolute inset-0 -rotate-90">
              <g data-astro-ticks style={{ transformOrigin: "200px 200px" }}>
                {Array.from({ length: 72 }, (_, i) => (
                  <line
                    key={i}
                    x1="200"
                    y1={i % 6 === 0 ? 2 : 6}
                    x2="200"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth={i % 6 === 0 ? 1.4 : 0.7}
                    className="text-terra/50"
                    transform={`rotate(${i * 5} 200 200)`}
                  />
                ))}
              </g>
              {skills.map((s, i) => {
                const r = OUTER - 14 - i * STEP;
                const on = i === active;
                return (
                  <g key={s.name} className="transition-opacity duration-500" opacity={on ? 1 : 0.35}>
                    <circle cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeWidth={7} className="text-ink/[0.06]" />
                    <circle
                      data-ring
                      data-level={s.level}
                      cx="200"
                      cy="200"
                      r={r}
                      pathLength={100}
                      fill="none"
                      strokeWidth={on ? 9 : 7}
                      strokeLinecap="round"
                      strokeDasharray="100 100"
                      strokeDashoffset={100 - s.level}
                      className={`transition-[stroke-width] duration-500 ${i % 2 === 0 ? "stroke-terra" : "stroke-safran"}`}
                    />
                  </g>
                );
              })}
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <p aria-live="polite" className="font-display text-[clamp(1.5rem,6vw,2.5rem)] leading-none text-terra">
                <span className="sr-only">{current.name} : </span>
                {current.level}%
              </p>
            </div>
          </div>

          <ol className="divide-y divide-line border-y border-line">
            {skills.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="group flex w-full items-center gap-5 py-4 text-left"
                    data-cursor=""
                  >
                    <span className={`size-3 shrink-0 rounded-full transition-transform duration-500 ${i % 2 === 0 ? "bg-terra" : "bg-safran"} ${on ? "scale-150" : "scale-75 opacity-50"}`} />
                    <span className={`flex-1 text-lg transition-colors ${on ? "text-ink" : "text-graphite group-hover:text-ink"}`}>{s.name}</span>
                    <span className={`font-display text-2xl tabular-nums transition-colors ${on ? "text-terra" : "text-graphite"}`}>{s.level}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="mt-24 border-y border-line py-6" aria-label="Qualités">
        <div className="claustra-marquee flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {qualities.map((q, i) => (
                <li key={q} className="flex items-center font-display text-[clamp(2rem,4vw,3.5rem)] leading-none">
                  <span className={i % 2 === 0 ? "text-ink" : "text-terra"}>{q}</span>
                  <Khatam className="mx-8 size-6 text-safran" filled />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
