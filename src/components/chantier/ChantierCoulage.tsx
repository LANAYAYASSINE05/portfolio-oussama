"use client";

import { Box, Compass, Ear, Layers, Lightbulb, Mountain, Navigation, Ruler, Users, ZoomIn, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { qualities, skills } from "@/lib/content";
import { ChantierTitle } from "./shared";

const signIcons: LucideIcon[] = [ZoomIn, Lightbulb, Ruler, Compass, Users, Layers, Navigation, Ear, Box, Mountain];

const concrete = {
  backgroundColor: "#9a9d9f",
  backgroundImage:
    "radial-gradient(rgb(60 62 64 / 0.55) 1px, transparent 1.6px), radial-gradient(rgb(230 230 226 / 0.4) 1px, transparent 1.4px), linear-gradient(180deg, #b4b6b6, #8a8d8f)",
  backgroundSize: "9px 9px, 13px 13px, 100% 100%",
  backgroundPosition: "0 0, 4px 6px, 0 0",
};

export function ChantierCoulage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cols = gsap.utils.toArray<HTMLElement>("[data-ch-pour]");
      const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-ch-forms]", start: "top 75%", once: true } });
      cols.forEach((col, i) => {
        const level = Number(col.dataset.level);
        const fill = col.querySelector("[data-ch-fill]");
        const stream = col.querySelector("[data-ch-stream]");
        const value = col.querySelector("[data-ch-value]");
        const counter = { v: 0 };
        const at = i * 0.18;
        if (value) value.textContent = "0";
        tl.fromTo(stream, { scaleY: 0, autoAlpha: 1 }, { scaleY: 1, duration: 0.25, ease: "power1.in" }, at)
          .fromTo(fill, { scaleY: 0 }, { scaleY: level / 100, duration: 1.2, ease: "power2.out" }, at + 0.15)
          .to(
            counter,
            {
              v: level,
              duration: 1.2,
              ease: "power2.out",
              snap: { v: 1 },
              onUpdate: () => {
                if (value) value.textContent = String(counter.v);
              },
            },
            at + 0.15,
          )
          .to(stream, { autoAlpha: 0, duration: 0.2 }, at + 1.2);
      });

      gsap.from("[data-ch-sign-item]", {
        rotate: (i) => (i % 2 ? 90 : -90),
        autoAlpha: 0,
        duration: 0.8,
        ease: "back.out(1.8)",
        stagger: 0.06,
        scrollTrigger: { trigger: "[data-ch-signs]", start: "top 88%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="competences" data-room="competences" ref={root} className="asphalt px-[var(--gutter)] py-[14vh]">
      <ChantierTitle lot={4} tag="Compétences" title="Coulé dans le béton." sub="Chaque coffrage est rempli à mon niveau de maîtrise" />

      <div>
        <div data-ch-forms className="grid grid-cols-3 gap-x-4 gap-y-10 sm:grid-cols-4 lg:grid-cols-7 lg:gap-5">
          {skills.map((s) => (
            <div key={s.name} className="flex flex-col">
              <div data-ch-pour data-level={s.level} className="relative">
                <span data-ch-stream aria-hidden className="absolute -top-10 left-1/2 z-10 block h-[calc(100%+2.5rem)] w-2 origin-top -translate-x-1/2 rounded-b-full opacity-0" style={concrete} />
                <div className="plywood relative h-52 border-x-[6px] border-b-[6px] border-[#9a6d3c] sm:h-72 md:border-x-[8px] md:border-b-[8px] lg:h-[24rem] xl:h-[26rem]">
                  <div className="absolute inset-0 overflow-hidden bg-[#121416] shadow-[inset_0_10px_20px_rgb(0_0_0/0.8)]">
                    <span data-ch-fill aria-hidden className="absolute inset-0 block origin-bottom" style={{ ...concrete, transform: "scaleY(0)" }}>
                      <span className="absolute inset-x-0 top-0 h-1.5 bg-[#c7c9c8]" />
                    </span>
                    {[25, 50, 75].map((m) => (
                      <span key={m} aria-hidden className="absolute inset-x-0 flex items-center" style={{ bottom: `${m}%` }}>
                        <span className="h-px w-3 bg-terra" />
                        <span className="ml-1 font-mono text-[0.55rem] text-terra">{m}</span>
                      </span>
                    ))}
                  </div>
                  <span aria-hidden className="absolute -left-3 top-[30%] h-2 w-[calc(100%+1.5rem)] bg-[#4c5258]" />
                  <span aria-hidden className="absolute -left-3 top-[70%] h-2 w-[calc(100%+1.5rem)] bg-[#4c5258]" />
                </div>
              </div>
              <p className="mt-4 flex items-baseline gap-1">
                <span data-ch-value className="led font-mono text-2xl font-bold sm:text-3xl md:text-4xl">
                  {s.level}
                </span>
                <span className="font-mono text-xs text-graphite">%</span>
              </p>
              <p className="mt-1 hyphens-auto font-display text-base uppercase leading-[1.05] sm:text-lg xl:text-xl" lang="fr">
                {s.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div data-ch-signs className="mt-20">
        <p className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-graphite">
          <span className="block h-px w-10 bg-terra" />
          Consignes du chantier — port obligatoire
        </p>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-6">
          {qualities.map((q, i) => {
            const Icon = signIcons[i % signIcons.length];
            return (
              <li key={q} data-ch-sign-item className="group flex flex-col items-center bg-[#f4f2ec] px-3 pb-3 pt-5 text-center text-[#141414] shadow-[0_14px_24px_rgb(0_0_0/0.5)]">
                <span className="grid size-20 place-items-center rounded-full border-4 border-[#f4f2ec] bg-[#1d5fb4] text-[#f4f2ec] shadow-[0_0_0_2px_#1d5fb4] transition-transform duration-500 group-hover:rotate-[360deg] md:size-24">
                  <Icon aria-hidden className="size-10 md:size-12" strokeWidth={2.2} />
                </span>
                <span className="mt-3 w-full bg-[#1d5fb4] py-1 font-stencil text-[0.7rem] uppercase tracking-[0.16em] text-[#f4f2ec]">Obligatoire</span>
                <span className="mt-2 font-display text-lg uppercase leading-tight md:text-xl">{q}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
