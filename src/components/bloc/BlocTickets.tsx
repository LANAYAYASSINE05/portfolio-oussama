"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { experience } from "@/lib/content";
import { BlocTitle, pop } from "./shared";

const PERFORATION =
  "radial-gradient(circle at 0 50%, transparent 14px, black 15px) left / 51% 100% no-repeat, radial-gradient(circle at 100% 50%, transparent 14px, black 15px) right / 51% 100% no-repeat";

const bars = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 1, 1, 2, 3, 1, 4, 2, 1, 1, 3];

export function BlocTickets() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-ticket]").forEach((t, i) => {
        gsap.from(t, {
          yPercent: 30,
          rotate: i % 2 === 0 ? -12 : 12,
          autoAlpha: 0,
          duration: 0.9,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: t, start: "top 88%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="experience" data-room="experience" ref={root} className="px-[var(--gutter)] py-[14vh]">
      <BlocTitle index={5} tag="Expérience" color="bg-pop-sun" title="Le parcours, ticket par ticket." />

      <ol className="grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
        {experience.map((e, i) => (
          <li key={e.floor} data-ticket className={i % 2 === 0 ? "md:-rotate-2" : "md:mt-12 md:rotate-2"}>
            <div className="drop-shadow-[6px_6px_0_var(--ink)]">
              <article className={`relative px-7 py-8 text-night ${pop(i + 2)}`} style={{ mask: PERFORATION, WebkitMask: PERFORATION }}>
                <div className="flex items-center justify-between border-b-[3px] border-dashed border-night/60 pb-4 font-mono text-xs font-bold uppercase tracking-[0.2em]">
                  <span>Ticket n° {String(experience.length - i).padStart(3, "0")}</span>
                  <span>{e.location}</span>
                </div>
                <p className="mt-5 font-mono text-sm font-bold">{e.period}</p>
                <h3 className="mt-2 font-display text-2xl uppercase leading-[1.05]">{e.role}</h3>
                <p className="mt-1 font-bold">{e.company}</p>
                <p className="mt-4 text-sm font-medium leading-relaxed">{e.text}</p>
                <ul className="mt-6 space-y-1.5 border-t-[3px] border-dashed border-night/60 pt-4 font-mono text-sm">
                  {e.missions.map((m) => (
                    <li key={m} className="flex items-baseline gap-2">
                      <span className="shrink-0 font-bold">{m}</span>
                      <span aria-hidden className="flex-1 border-b-2 border-dotted border-night/50" />
                      <span className="font-bold">✓</span>
                    </li>
                  ))}
                </ul>
                <div aria-hidden className="mt-6 flex h-12 items-stretch gap-[2px]">
                  {bars.map((w, b) => (
                    <span key={b} className="bg-night" style={{ width: w * 2 }} />
                  ))}
                </div>
              </article>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
