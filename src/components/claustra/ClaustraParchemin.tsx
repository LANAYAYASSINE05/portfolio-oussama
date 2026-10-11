"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { certifications, education, identity } from "@/lib/content";
import { Khatam, RoomHeading, starPoints, toArabic } from "./shared";

export function ClaustraParchemin() {
  const root = useRef<HTMLElement>(null);
  const [diploma, ...others] = education;

  useGSAP(
    () => {
      gsap
        .timeline({ scrollTrigger: { trigger: "[data-scroll-paper]", start: "top 80%", end: "center 55%", scrub: 0.6 } })
        .fromTo("[data-scroll-paper]", { clipPath: "inset(0 0 92% 0 round 1.5rem)" }, { clipPath: "inset(0 0 0% 0 round 1.5rem)", ease: "none" })
        .fromTo("[data-scroll-rod]", { y: () => -(root.current?.querySelector<HTMLElement>("[data-scroll-paper]")?.offsetHeight ?? 0) * 0.92 }, { y: 0, ease: "none" }, 0);

      gsap.from("[data-wax]", {
        scale: 2.6,
        rotate: -40,
        autoAlpha: 0,
        duration: 0.8,
        ease: "back.out(2)",
        scrollTrigger: { trigger: "[data-wax]", start: "top 75%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="formation" data-room="formation" ref={root} className="px-[var(--gutter)] py-[16vh]">
      <RoomHeading index={6} name="Le parchemin" nameAr="الإجازة" title={<>Diplômé de l&apos;École Nationale d&apos;Architecture.</>} />

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="relative lg:col-span-8">
          <div aria-hidden className="absolute -inset-x-3 top-0 z-10 h-5 rounded-full bg-gradient-to-b from-[#b88437] to-[#6e4a1c] shadow-lg" />
          <div className="relative">
            <article data-scroll-paper className="relative overflow-hidden rounded-3xl bg-[#efe3c8] px-8 pb-14 pt-16 text-[#2a2118] md:px-14 md:pb-16 md:pt-20">
              <div aria-hidden className="absolute inset-4 rounded-2xl border border-[#2a2118]/15" />
              <div aria-hidden className="absolute inset-6 rounded-xl border border-dashed border-[#2a2118]/15" />
              <div className="relative grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a5a1c]">{identity.school}</p>
                  <h3 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none">{diploma.title}</h3>
                  <p className="mt-4 text-lg">
                    décerné à <span className="font-display text-2xl">{identity.name}</span>
                  </p>
                  <p className="mt-6 max-w-xl leading-relaxed text-[#2a2118]/75">{diploma.detail}</p>
                  <p className="mt-8 flex items-center gap-4 text-sm font-semibold">
                    <span>{diploma.location}</span>
                    <span className="h-px w-10 bg-[#2a2118]/30" />
                    <span>{diploma.year}</span>
                  </p>
                </div>
                <div data-wax className="relative mx-auto size-36 md:size-40">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 drop-shadow-[0_6px_10px_rgb(80_10_10/0.45)]">
                    <path
                      d="M50 2 C62 6 70 2 78 12 C88 16 92 26 96 36 C100 48 94 58 98 68 C94 80 84 86 76 94 C64 98 56 96 46 98 C34 96 26 92 16 86 C8 78 4 68 2 56 C0 44 6 34 4 24 C12 14 22 10 32 6 C38 2 44 4 50 2 Z"
                      fill="#8e1f1f"
                    />
                    <circle cx="50" cy="50" r="34" fill="none" stroke="#5e1010" strokeWidth={2} />
                    <polygon points={starPoints(50, 50, 26).join(" ")} fill="none" stroke="#c9584a" strokeWidth={1.6} />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center text-center text-[#f6d9c4]">
                    <span>
                      <span className="block font-display text-xl leading-none">{identity.graduation}</span>
                      <span lang="ar" className="block font-display text-base">
                        {toArabic(identity.graduation)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
            <div data-scroll-rod aria-hidden className="absolute -inset-x-3 bottom-0 z-10 h-5 translate-y-1/2 rounded-full bg-gradient-to-b from-[#b88437] to-[#6e4a1c] shadow-lg" />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          {others.map((e) => (
            <div key={e.level} data-reveal className="rounded-[2rem] border border-line bg-paper-2 p-7">
              <p className="text-sm font-semibold text-safran">{e.year}</p>
              <h3 className="mt-2 font-display text-3xl">{e.title}</h3>
              <p className="mt-1 text-sm text-ink/85">{e.school}</p>
              <p className="mt-3 text-sm leading-relaxed text-graphite">{e.detail}</p>
            </div>
          ))}
          <div data-reveal className="flex-1 rounded-[2rem] border border-terra/30 p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terra">Spécialités</p>
            <ul className="mt-6 space-y-5">
              {certifications.map((c) => (
                <li key={c} className="flex items-start gap-3 font-medium">
                  <Khatam className="mt-1 size-4 shrink-0 text-safran" filled />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
