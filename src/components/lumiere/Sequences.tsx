"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { experience } from "@/lib/content";

const lights = [
  "radial-gradient(90% 70% at 85% 10%, rgb(242 169 59 / 0.28), transparent 60%)",
  "radial-gradient(80% 80% at 10% 90%, rgb(120 160 255 / 0.18), transparent 60%)",
  "radial-gradient(70% 70% at 50% 0%, rgb(255 244 214 / 0.2), transparent 60%)",
];

export function Sequences() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const shots = gsap.utils.toArray<HTMLElement>("[data-shot]");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: `+=${(shots.length - 1) * 100}%`, pin: true, scrub: 1 },
      });
      shots.forEach((shot, i) => {
        if (i === 0) return;
        tl.fromTo(shot, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, i - 1)
          .from(shot.querySelectorAll("[data-shot-reveal]"), { x: 80, autoAlpha: 0, stagger: 0.06, duration: 0.6 }, i - 0.7)
          .to(shots[i - 1], { scale: 0.94, filter: "brightness(0.4)", duration: 1 }, i - 1);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" data-chapter="Scène 04 — Expérience" className="relative h-svh overflow-hidden bg-black">
      {experience.map((job, i) => (
        <article
          key={job.company}
          data-shot
          className="absolute inset-0 flex flex-col justify-end bg-paper-2 px-[var(--gutter)] pb-[12vh] pt-[calc(var(--header-h)+2rem)]"
          style={{ backgroundImage: lights[i % lights.length], zIndex: i }}
        >
          <div className="absolute right-[var(--gutter)] top-[calc(var(--header-h)+2rem)] grid grid-cols-3 border border-ink/30 text-center">
            {[
              ["Scène", "04"],
              ["Prise", String(i + 1)],
              ["Année", job.period.slice(0, 4)],
            ].map(([k, v]) => (
              <div key={k} className="border-r border-ink/30 px-4 py-2 last:border-r-0">
                <p className="label text-graphite">{k}</p>
                <p className="font-display text-2xl">{v}</p>
              </div>
            ))}
          </div>

          <p data-shot-reveal className="credits text-terra">
            Séquence {i + 1}/{experience.length} — Plan {job.floor}
          </p>
          <h3 data-shot-reveal className="mt-4 max-w-5xl font-display text-[clamp(3rem,9vw,9rem)] leading-[0.88]">
            {job.role}
          </h3>
          <div className="mt-8 grid gap-6 md:grid-cols-12">
            <p data-shot-reveal className="credits text-ink/70 md:col-span-4">
              {job.company}
              <br />
              {job.location} · {job.period}
            </p>
            <p data-shot-reveal className="text-lg leading-relaxed text-ink/80 md:col-span-5">
              {job.text}
            </p>
            <ul data-shot-reveal className="flex flex-wrap content-start gap-2 md:col-span-3">
              {job.missions.map((m) => (
                <li key={m} className="label border border-ink/30 px-3 py-1.5">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
}
