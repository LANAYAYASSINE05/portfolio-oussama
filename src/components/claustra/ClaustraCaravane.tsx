"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { experience } from "@/lib/content";
import { Khatam, RoomHeading } from "./shared";

export function ClaustraCaravane() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(min-width: 768px)", () => {
        const track = root.current?.querySelector<HTMLElement>("[data-caravan-track]");
        const viewport = root.current?.querySelector<HTMLElement>("[data-caravan]");
        if (!track || !viewport) return;
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: viewport,
              start: "center center",
              end: () => `+=${distance() + window.innerHeight * 0.3}`,
              scrub: true,
              pin: true,
              invalidateOnRefresh: true,
            },
          })
          .to(track, { x: () => -distance(), ease: "none" }, 0)
          .fromTo("[data-caravan-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0)
          .fromTo("[data-caravan-star]", { left: "0%" }, { left: "100%", ease: "none" }, 0)
          .to("[data-caravan-star] svg", { rotate: 360, ease: "none" }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section id="experience" data-room="experience" ref={root} className="py-[16vh]">
      <div className="px-[var(--gutter)]">
        <RoomHeading index={5} name="La caravane" nameAr="القافلة" title="Un parcours, étape par étape." />
      </div>

      <div data-caravan className="overflow-hidden">
        <ol data-caravan-track className="flex flex-col gap-6 px-[var(--gutter)] md:w-max md:flex-row md:gap-8">
          {experience.map((e, i) => (
            <li
              key={e.floor}
              data-reveal
              className="relative flex w-full flex-col rounded-[2rem] border border-line bg-paper-2 p-8 md:w-[min(62vw,40rem)] md:p-10"
            >
              <div className="flex items-start justify-between gap-6">
                <span className="font-display text-[clamp(3.5rem,7vw,6rem)] leading-none text-terra">{String(i + 1).padStart(2, "0")}</span>
                <span className="rounded-full border border-safran/40 px-4 py-1.5 text-sm font-semibold text-safran">{e.period}</span>
              </div>
              <h3 className="mt-8 font-display text-[clamp(2rem,3.4vw,3rem)] leading-tight">{e.role}</h3>
              <p className="mt-2 font-medium text-ink/85">
                {e.company} · <span className="text-graphite">{e.location}</span>
              </p>
              <p className="mt-5 max-w-xl leading-relaxed text-ink/75">{e.text}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                {e.missions.map((m) => (
                  <li key={m} className="flex items-center gap-2 rounded-full bg-ink/[0.06] px-3.5 py-1.5 text-sm">
                    <Khatam className="size-2.5 text-terra" filled />
                    {m}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div aria-hidden className="relative mx-[var(--gutter)] mt-14 hidden h-10 md:block">
          <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute inset-0 size-full text-ink/15">
            <path d="M0 30 Q 80 8 170 26 T 340 24 T 520 28 T 700 20 T 870 28 T 1000 22" fill="none" stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="absolute inset-x-0 bottom-0 h-px bg-line" />
          <div data-caravan-progress className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-terra" />
          <span data-caravan-star className="absolute bottom-0 -translate-x-1/2 translate-y-1/2">
            <Khatam className="size-6 text-terra" filled />
          </span>
        </div>
      </div>
    </section>
  );
}
