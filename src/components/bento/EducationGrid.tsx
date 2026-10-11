"use client";

import { animate, stagger, svg, utils } from "animejs";
import { useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { certifications, education } from "@/lib/content";
import { BentoSection, Tile, TileLabel } from "./Tile";

function Checklist() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const checks = svg.createDrawable(ref.current.querySelectorAll("[data-check]"));
    utils.set(checks, { draw: "0 0" });
    const anim = animate(checks, { draw: ["0 0", "0 1"], duration: 700, delay: stagger(220, { start: 200 }), ease: "outCubic" });
    return () => {
      anim.revert();
    };
  }, [inView]);

  return (
    <ul ref={ref} className="space-y-4">
      {certifications.map((c) => (
        <li key={c} className="flex items-center gap-4 text-xl leading-tight">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-terra text-[#111]">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path data-check d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {c}
        </li>
      ))}
    </ul>
  );
}

export function EducationGrid() {
  return (
    <BentoSection id="formation" index="05 — Formation" title={<>Formation<span className="text-terra">.</span></>}>
      {education.map((e, i) => (
        <Tile
          key={e.title}
          tone={i === 0 ? "light" : "ghost"}
          className="col-span-2 flex min-h-[20rem] flex-col justify-between gap-8 md:col-span-3 lg:col-span-4"
        >
          <div className="flex justify-between">
            <TileLabel>{e.level}</TileLabel>
            <TileLabel>{e.location}</TileLabel>
          </div>
          <div>
            <p className="font-display text-6xl leading-none text-terra">{e.year}</p>
            <h3 className="mt-4 font-display text-3xl leading-tight">{e.title}</h3>
            <p className="mt-1 text-sm font-medium">{e.school}</p>
            <p className="mt-3 text-sm leading-relaxed text-graphite">{e.detail}</p>
          </div>
        </Tile>
      ))}

      <Tile tone="dark" className="col-span-2 flex flex-col justify-between gap-8 md:col-span-6 lg:col-span-4">
        <TileLabel>Spécialités</TileLabel>
        <Checklist />
      </Tile>
    </BentoSection>
  );
}
