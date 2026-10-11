"use client";

import { useRef } from "react";
import { PlanDrawing } from "@/components/drawings/PlanDrawing";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/content";
import { Letterbox, SceneHeading } from "./Scene";

export function Trailers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-trailer]").forEach((trailer) => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: trailer, start: "top bottom", end: "bottom top", scrub: true },
        });
        tl.fromTo(trailer.querySelector("[data-projection]"), { scale: 1.35, rotate: -3 }, { scale: 0.95, rotate: 2 }, 0)
          .fromTo(trailer.querySelector("[data-cone]"), { opacity: 0.2 }, { opacity: 0.9, duration: 0.5 }, 0)
          .to(trailer.querySelector("[data-cone]"), { opacity: 0.2, duration: 0.5 }, 0.5)
          .fromTo(trailer.querySelector("[data-card-title]"), { yPercent: 60 }, { yPercent: -60 }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="projets" data-chapter="Scène 06 — Projets" className="relative bg-black">
      <div className="px-[var(--gutter)] pb-10 pt-[16vh]">
        <SceneHeading scene="06" kicker="Projets" title={<>Bandes-<span className="italic text-terra">annonces</span></>} />
      </div>

      {projects.map((p) => (
        <article key={p.id} data-trailer className="relative grid h-svh place-items-center overflow-hidden">
          <div
            data-cone
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `conic-gradient(from 180deg at 50% -10%, transparent 160deg, color-mix(in oklab, ${p.tone.from} 45%, transparent) 180deg, transparent 200deg)`,
              filter: "blur(20px)",
            }}
          />
          <div
            data-projection
            className="relative aspect-[4/3] w-[min(78vw,64rem)] overflow-hidden rounded-sm shadow-[0_0_120px_rgb(242_169_59/0.15)]"
            style={{ background: `linear-gradient(150deg, ${p.tone.from}, ${p.tone.to})`, color: p.tone.ink }}
          >
            <PlanDrawing variant={p.drawing} className="absolute inset-[8%] h-[84%] w-[84%]" />
          </div>
          <div data-card-title className="pointer-events-none absolute inset-x-0 bottom-[14vh] z-10 text-center">
            <p className="credits text-terra">
              Bande-annonce {p.index} — {p.type}
            </p>
            <h3 className="mt-3 font-display text-[clamp(3rem,9vw,9rem)] italic leading-[0.9] [text-shadow:0_10px_60px_rgb(0_0_0/0.8)]">
              {p.title}
            </h3>
            <p className="credits mt-4 text-ink/70">
              {p.location} · {p.year} · {p.surface}
            </p>
          </div>
          <Letterbox size="9vh" />
        </article>
      ))}
    </section>
  );
}
