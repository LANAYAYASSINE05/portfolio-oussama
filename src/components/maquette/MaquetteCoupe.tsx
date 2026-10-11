"use client";

import { useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, useGSAP } from "@/lib/gsap";
import { experience } from "@/lib/content";
import { MaquetteTitle } from "./shared";

function Level({ value }: { value: string }) {
  return (
    <span className="absolute -left-1 top-0 hidden -translate-x-full items-center gap-1.5 pr-3 font-mono text-xs text-graphite md:flex">
      {value}
      <svg aria-hidden viewBox="0 0 10 8" className="h-2 w-2.5 fill-terra">
        <path d="M0 0 H10 L5 8 Z" />
      </svg>
    </span>
  );
}

export function MaquetteCoupe() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSite();

  useGSAP(
    () => {
      const floors = gsap.utils.toArray<HTMLElement>("[data-mq-floor]").reverse();
      gsap.set(floors, { autoAlpha: 0, y: -80 });
      gsap.to(floors, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "bounce.out",
        stagger: 0.28,
        clearProps: "transform,opacity,visibility",
        scrollTrigger: { trigger: "[data-mq-building]", start: "top 75%", once: true },
      });
    },
    { scope: root },
  );

  const levels = experience.map((_, i) => `+${((experience.length - 1 - i) * 3).toFixed(2)}`);

  return (
    <section id="experience" data-room="experience" ref={root} className="px-[var(--gutter)] py-[14vh]">
      <MaquetteTitle plate={5} tag="Parcours" title="Le parcours, en coupe." note="un étage par étape, posé du rez-de-chaussée" />

      <div data-mq-building className="relative mx-auto max-w-5xl md:pl-20">
        <div data-mq-floor className="relative">
          <Level value={`+${(experience.length * 3).toFixed(2)}`} />
          <button
            type="button"
            onClick={() => scrollTo("#contact")}
            className="group flex w-full flex-wrap items-center justify-between gap-4 rounded-t-sm border-2 border-b-0 border-dashed border-terra/60 px-6 py-6 text-left transition-colors hover:bg-terra/10 md:px-8"
            data-cursor=""
          >
            <span>
              <span className="font-display text-3xl uppercase text-terra md:text-4xl">R+{experience.length}</span>
              <span className="font-hand ml-4 text-2xl md:text-3xl">le prochain étage, à construire avec vous</span>
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-graphite transition-colors group-hover:text-terra">Me contacter →</span>
          </button>
          <span aria-hidden className="block h-3 bg-[#efe9dc] shadow-[0_3px_0_#b9ae98]" />
        </div>

        {experience.map((e, i) => (
          <article key={e.period} data-mq-floor className="relative">
            <Level value={levels[i]} />
            <div className="grid gap-6 border-x-[10px] border-[#efe9dc] bg-paper-2 px-5 py-8 shadow-[inset_0_14px_20px_-12px_rgb(0_0_0/0.7)] md:grid-cols-[9rem_1fr] md:px-8 md:py-10">
              <div>
                <p className="foam-text font-display text-6xl leading-none md:text-7xl">{e.floor}</p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-graphite">{e.period}</p>
              </div>
              <div>
                <h3 className="font-display text-3xl uppercase leading-tight md:text-4xl">{e.role}</h3>
                <p className="mt-1 text-terra">
                  {e.company} · {e.location}
                </p>
                <p className="mt-4 max-w-2xl leading-relaxed text-ink/80">{e.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {e.missions.map((m) => (
                    <li key={m} className="balsa rounded-[2px] px-3 py-1.5 text-sm font-semibold shadow-[0_4px_0_#b8955e,0_8px_12px_rgb(0_0_0/0.35)]">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <span aria-hidden className="block h-4 bg-[#efe9dc] shadow-[0_4px_0_#b9ae98,0_10px_14px_rgb(0_0_0/0.4)]" />
          </article>
        ))}

        <div aria-hidden className="relative">
          <Level value="±0.00" />
          <div className="kraft h-14 [background-image:repeating-linear-gradient(45deg,rgb(36_23_11/0.35)_0_2px,transparent_2px_12px)]" />
        </div>
      </div>
    </section>
  );
}
