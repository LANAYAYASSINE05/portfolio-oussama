"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { certifications, education, identity } from "@/lib/content";
import { BlocTitle, pop } from "./shared";

const BURST = Array.from({ length: 32 }, (_, i) => {
  const r = i % 2 === 0 ? 50 : 42;
  const a = (i * Math.PI) / 16;
  return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
}).join(" ");

const RING_R = 32;

export function BlocDiplome() {
  const root = useRef<HTMLElement>(null);
  const [diploma, ...others] = education;

  useGSAP(
    () => {
      gsap.from("[data-burst]", {
        scale: 0,
        rotate: -180,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: { trigger: "[data-burst]", start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="formation" data-room="formation" ref={root} className="px-[var(--gutter)] py-[14vh]">
      <BlocTitle index={6} tag="Formation" color="bg-pop-pink" title={<>Diplômé, tampon officiel.</>} />

      <div className="grid gap-8 lg:grid-cols-12">
        <article data-reveal className="bloc-box relative bg-pop-blue p-7 text-night md:p-10 lg:col-span-8">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="inline-block rounded-full border-[3px] border-ink bg-paper px-3 py-1 font-mono text-xs font-bold text-ink">{diploma.year}</p>
              <h3 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] uppercase leading-[0.95]">{diploma.title}</h3>
              <p className="mt-3 text-lg font-bold">
                {diploma.school} — {diploma.location}
              </p>
              <p className="mt-4 max-w-xl font-medium leading-relaxed">{diploma.detail}</p>
            </div>
            <div data-burst className="relative mx-auto size-44 md:size-52">
              <svg viewBox="0 0 100 100" className="bloc-spin absolute inset-0 overflow-visible">
                <polygon points={BURST} className="fill-pop-lime stroke-night" strokeWidth={2.5} strokeLinejoin="round" />
                <defs>
                  <path id="bloc-ring" d={`M50 ${50 - RING_R} a${RING_R} ${RING_R} 0 1 1 0 ${RING_R * 2} a${RING_R} ${RING_R} 0 1 1 0 ${-RING_R * 2}`} />
                </defs>
                <text fontSize="7" fontWeight={900} className="fill-night uppercase">
                  <textPath href="#bloc-ring" textLength={2 * Math.PI * RING_R - 3} lengthAdjust="spacing">
                    DIPLÔMÉ ★ ENA RABAT ★ ARCHITECTE ★
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-3xl text-night">{identity.graduation}</span>
              </div>
            </div>
          </div>
        </article>

        <div className="flex flex-col gap-6 lg:col-span-4">
          {others.map((e, i) => (
            <div key={e.level} data-reveal className={`bloc-box p-6 text-night ${pop(i + 3)}`}>
              <p className="font-mono text-sm font-bold">{e.year}</p>
              <h3 className="mt-2 font-display text-2xl uppercase">{e.title}</h3>
              <p className="mt-1 font-bold">{e.school}</p>
              <p className="mt-2 text-sm font-medium">{e.detail}</p>
            </div>
          ))}
          <div data-reveal className="bloc-box flex-1 bg-paper-2 p-6">
            <p className="font-display text-lg uppercase">Spécialités</p>
            <ul className="mt-4 space-y-3">
              {certifications.map((c, i) => (
                <li key={c} className="flex items-start gap-3 font-bold">
                  <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-[3px] border-ink text-xs text-night ${pop(i)}`}>✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
