"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { experience } from "@/lib/content";

const FLOOR_H = 70;
const BASE_Y = 360;

function Elevation({ active }: { active: number }) {
  const floors = [...experience].reverse();
  return (
    <svg viewBox="0 0 320 420" className="h-full w-full" aria-hidden>
      <line x1="0" y1={BASE_Y} x2="320" y2={BASE_Y} stroke="currentColor" strokeOpacity="0.5" />
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={i} x1={i * 20} y1={BASE_Y + 4} x2={i * 20 + 14} y2={BASE_Y + 18} stroke="currentColor" strokeOpacity="0.25" />
      ))}
      {floors.map((f, i) => {
        const y = BASE_Y - (i + 1) * FLOOR_H;
        const isActive = experience.indexOf(f) === active;
        return (
          <g key={f.floor} data-floor>
            <rect
              x="70"
              y={y}
              width="180"
              height={FLOOR_H}
              stroke="currentColor"
              className={`transition-[fill] duration-700 ease-archi ${isActive ? "fill-terra/90" : "fill-transparent"}`}
            />
            {[0, 1, 2, 3].map((w) => (
              <rect
                key={w}
                x={86 + w * 42}
                y={y + 18}
                width="24"
                height="34"
                fill="none"
                stroke="currentColor"
                strokeOpacity={isActive ? 1 : 0.4}
              />
            ))}
            <text
              x="262"
              y={y + FLOOR_H / 2 + 4}
              className="font-mono text-[11px]"
              fill="currentColor"
              opacity={isActive ? 1 : 0.4}
            >
              {f.floor}
            </text>
          </g>
        );
      })}
      <path d={`M60 ${BASE_Y - floors.length * FLOOR_H} L160 ${BASE_Y - floors.length * FLOOR_H - 40} L260 ${BASE_Y - floors.length * FLOOR_H}`} fill="none" stroke="currentColor" data-floor />
      <line x1="40" y1={BASE_Y} x2="40" y2={BASE_Y - floors.length * FLOOR_H} stroke="currentColor" strokeOpacity="0.4" strokeDasharray="3 4" />
    </svg>
  );
}

export function Experience() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.from("[data-floor]", {
        scaleY: 0,
        svgOrigin: `160 ${BASE_Y}`,
        autoAlpha: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.18,
        scrollTrigger: { trigger: "[data-elevation]", start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-job]").forEach((job, i) => {
        ScrollTrigger.create({
          trigger: job,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
        gsap.from(job.querySelectorAll("[data-job-reveal]"), {
          y: 50,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          scrollTrigger: { trigger: job, start: "top 75%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="experience" ref={root} className="relative bg-night px-[var(--gutter)] py-[16vh] text-on-night">
      <div className="mb-20 grid grid-cols-4 gap-[var(--gutter)] md:grid-cols-12">
        <p className="label col-span-4 text-on-night/50 md:col-span-3">( 04 ) Expérience</p>
        <h2 className="col-span-4 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92] md:col-span-9">
          Un parcours <span className="italic text-terra">en élévation</span>.
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-[var(--gutter)] md:grid-cols-12">
        <div className="col-span-4 hidden md:col-span-4 md:block">
          <div data-elevation className="sticky top-[calc(var(--header-h)+3rem)] h-[70vh]">
            <Elevation active={active} />
            <p className="label mt-2 text-on-night/50">Élévation sud — 1/200</p>
          </div>
        </div>

        <ol className="col-span-4 md:col-span-7 md:col-start-6">
          {experience.map((job, i) => (
            <li
              key={job.company}
              data-job
              className="grid min-h-[55vh] grid-cols-[auto_1fr] content-center gap-x-6 border-t border-on-night/15 py-14 transition-opacity duration-700 md:gap-x-10"
              style={{ opacity: active === i ? 1 : 0.4 }}
            >
              <span data-job-reveal className="font-display text-5xl leading-none text-terra md:text-7xl">
                {job.floor}
              </span>
              <div>
                <p data-job-reveal className="label text-on-night/60">
                  {job.period} · {job.location}
                </p>
                <h3 data-job-reveal className="mt-3 font-display text-4xl leading-none md:text-5xl">
                  {job.role}
                </h3>
                <p data-job-reveal className="mt-2 text-lg text-on-night/80">
                  {job.company}
                </p>
                <p data-job-reveal className="mt-6 max-w-lg leading-relaxed text-on-night/65">
                  {job.text}
                </p>
                <ul data-job-reveal className="mt-6 flex flex-wrap gap-2">
                  {job.missions.map((m) => (
                    <li key={m} className="label rounded-full border border-on-night/25 px-3 py-1.5">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
