"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { certifications, education, identity } from "@/lib/content";
import { SectionBar } from "./shared";

export function BetonEducation() {
  const root = useRef<HTMLElement>(null);
  const [diploma, ...others] = education;

  useGSAP(
    () => {
      gsap.from("[data-stamp]", {
        scale: 2.6,
        rotate: -28,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power4.in",
        scrollTrigger: { trigger: "[data-stamp]", start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="formation" ref={root} className="mt-[14vh]">
      <SectionBar index="06" label="Formation" title="Diplôme" meta={identity.school} />

      <div className="grid border-b-2 border-ink md:grid-cols-12">
        <div className="relative overflow-hidden border-b-2 border-ink p-[var(--gutter)] md:col-span-8 md:border-b-0 md:border-r-2">
          <p className="beton-mono text-graphite">{diploma.year}</p>
          <p className="mt-2 font-display text-[clamp(5rem,19vw,17rem)] leading-[0.8] text-ink">{identity.graduation}</p>
          <h3 className="mt-6 text-2xl font-bold uppercase tracking-tight md:text-4xl">{diploma.title}</h3>
          <p className="beton-mono mt-2">
            {diploma.school} — {diploma.location}
          </p>
          <p className="mt-5 max-w-2xl leading-relaxed">{diploma.detail}</p>

          <div
            data-stamp
            aria-hidden
            className="absolute right-[6%] top-5 grid size-28 -rotate-12 place-items-center border-4 border-terra bg-paper text-center text-terra md:size-36"
          >
            <span className="beton-mono px-2 leading-tight">
              <span className="block text-xl font-bold md:text-2xl">Diplômé</span>
              ENA Rabat · {identity.graduation}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:col-span-4">
          {others.map((e) => (
            <div key={e.level} data-reveal className="border-b-2 border-ink p-[var(--gutter)]">
              <p className="beton-mono text-graphite">
                {e.level} · {e.year}
              </p>
              <h3 className="mt-2 text-xl font-bold uppercase tracking-tight">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{e.detail}</p>
            </div>
          ))}
          <div data-reveal className="flex-1 p-[var(--gutter)]">
            <p className="beton-mono text-graphite">Spécialités</p>
            <ul className="mt-4 space-y-2">
              {certifications.map((c) => (
                <li key={c} className="flex items-start gap-3 font-medium">
                  <span aria-hidden className="mt-1.5 size-2.5 shrink-0 bg-terra" />
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
