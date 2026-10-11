"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { certifications, education } from "@/lib/content";
import { SceneHeading } from "./Scene";

export function Origins() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-year]").forEach((year) => {
        gsap.fromTo(
          year,
          { backgroundPosition: "100% 0" },
          { backgroundPosition: "0% 0", ease: "none", scrollTrigger: { trigger: year, start: "top 85%", end: "top 35%", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="formation" data-chapter="Scène 05 — Formation" className="relative px-[var(--gutter)] py-[16vh]">
      <SceneHeading scene="05" kicker="Formation" title={<>Les <span className="italic text-terra">origines</span></>} />

      <div className="mt-16 divide-y divide-line border-y border-line">
        {education.map((e) => (
          <article key={e.title} className="grid items-center gap-6 py-10 md:grid-cols-12">
            <p
              data-year
              className="font-display text-[clamp(4.5rem,13vw,12rem)] italic leading-none text-transparent md:col-span-6"
              style={{
                WebkitTextStroke: "1px var(--color-ink)",
                backgroundImage: "linear-gradient(90deg, var(--accent) 50%, transparent 50%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {e.year}
            </p>
            <div className="md:col-span-5 md:col-start-8">
              <p className="credits text-graphite">
                {e.level} · {e.location}
              </p>
              <h3 className="mt-3 font-display text-4xl leading-tight">{e.title}</h3>
              <p className="mt-1 text-lg">{e.school}</p>
              <p className="mt-4 leading-relaxed text-ink/70">{e.detail}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-12">
        <p className="credits text-terra md:col-span-4">Spécialités</p>
        <ul className="grid gap-4 md:col-span-8 md:grid-cols-3">
          {certifications.map((c, i) => (
            <li key={c} className="border-t border-ink/30 pt-4">
              <span className="label text-graphite">0{i + 1}</span>
              <p className="mt-2 font-display text-2xl leading-tight">{c}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
