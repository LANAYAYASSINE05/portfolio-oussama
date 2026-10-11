"use client";

import { GraduationCap } from "lucide-react";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { certifications, education, identity } from "@/lib/content";
import { SectionHead } from "./SectionHead";

export function StudioEducation() {
  const root = useRef<HTMLElement>(null);
  const [diploma, ...others] = education;
  const start = Number(diploma.year.slice(0, 4)) || 2020;

  useGSAP(
    () => {
      const year = root.current?.querySelector<HTMLElement>("[data-year]");
      if (!year) return;
      const counter = { value: start };
      gsap.to(counter, {
        value: Number(identity.graduation),
        duration: 1.8,
        ease: "power2.out",
        snap: { value: 1 },
        onUpdate: () => {
          year.textContent = String(counter.value);
        },
        scrollTrigger: { trigger: year, start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="formation" ref={root} className="px-[var(--gutter)] py-[16vh]">
      <SectionHead index="06" label="Formation" title="Diplôme" />

      <div className="grid grid-cols-12 items-end gap-x-[var(--gutter)] gap-y-10">
        <p
          data-year
          className="col-span-12 font-display text-[clamp(7rem,24vw,24rem)] leading-[0.78] tracking-[-0.05em] tabular-nums md:col-span-7"
        >
          {identity.graduation}
        </p>
        <div data-reveal className="col-span-12 space-y-5 md:col-span-5">
          <p className="studio-caps flex items-center gap-2 text-terra">
            <GraduationCap aria-hidden strokeWidth={1.5} className="size-4" /> Diplômé — {diploma.year}
          </p>
          <h3 className="font-display text-[clamp(2rem,3.4vw,3.25rem)] leading-tight">{diploma.title}</h3>
          <p className="text-lg">
            {identity.school} — {diploma.location}
          </p>
          <p className="text-graphite">{diploma.detail}</p>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-12 gap-x-[var(--gutter)] gap-y-10 border-t border-line pt-8">
        {others.map((e) => (
          <div key={e.title} data-reveal className="col-span-12 md:col-span-4">
            <p className="studio-caps text-graphite">{e.year}</p>
            <h4 className="mt-3 font-display text-2xl">{e.title}</h4>
            <p className="mt-1 text-graphite">{e.school}</p>
          </div>
        ))}
        <div data-reveal className="col-span-12 md:col-span-7 md:col-start-6">
          <p className="studio-caps mb-5 text-graphite">Spécialités</p>
          <ul className="flex flex-wrap gap-2">
            {certifications.map((c) => (
              <li key={c} className="rounded-full border border-ink px-4 py-2.5 text-sm">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
