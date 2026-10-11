"use client";

import { useRef } from "react";
import { Monogram } from "@/components/ui/Logos";
import { gsap, useGSAP } from "@/lib/gsap";
import { bio, identity, languages, manifesto, stats } from "@/lib/content";
import { Khatam, Lattice, Ogive, RoomHeading, starPoints } from "./shared";

export function ClaustraMajlis() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-lit-word]",
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-lit]", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-medal]").forEach((medal, i) => {
        const value = medal.querySelector<HTMLElement>("[data-count]");
        const counter = { v: 0 };
        gsap
          .timeline({ scrollTrigger: { trigger: medal, start: "top 90%", once: true } })
          .from(medal.querySelector("svg"), { rotate: -90, scale: 0.4, autoAlpha: 0, duration: 1.2, ease: "back.out(1.4)", delay: i * 0.08 })
          .to(
            counter,
            {
              v: Number(value?.dataset.count ?? 0),
              duration: 1.4,
              ease: "power3.out",
              snap: { v: 1 },
              onUpdate: () => {
                if (value) value.textContent = String(counter.v);
              },
            },
            "<0.2",
          );
      });
    },
    { scope: root },
  );

  return (
    <section id="a-propos" data-room="a-propos" ref={root} className="px-[var(--gutter)] py-[16vh]">
      <RoomHeading index={1} name="Le majlis" nameAr="المجلس" title="Un architecte formé à Rabat, prêt à rejoindre votre équipe." />

      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <Ogive className="mx-auto aspect-[3/4] w-[min(76vw,22rem)]" frame="text-terra/50">
              <div className="absolute inset-0 bg-paper-2" />
              <div className="absolute inset-0 text-terra/15">
                <Lattice size={34} stroke={3} className="absolute inset-0" />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgb(224_169_78/0.35),transparent_65%)]" />
              <div className="absolute inset-x-0 bottom-[14%] text-center">
                <Monogram className="mx-auto size-16 text-terra" />
                <p className="mt-4 font-display text-2xl">{identity.title}</p>
                <p className="mt-1 text-sm text-graphite">
                  {identity.school}
                  <br />
                  Promotion {identity.graduation}
                </p>
              </div>
            </Ogive>
            <ul className="mt-8 flex flex-wrap justify-center gap-2">
              {languages.map((l) => (
                <li key={l.name} className="rounded-full border border-line px-4 py-2 text-sm">
                  <span className="font-semibold">{l.name}</span> <span className="text-graphite">· {l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <p data-lit className="font-display text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.18]">
            {manifesto.split(" ").map((w, i) => (
              <span key={i} data-lit-word className={/partition|silence|souffle/.test(w) ? "text-terra" : undefined}>
                {w}{" "}
              </span>
            ))}
          </p>
          <div className="mt-12 grid gap-8 text-lg leading-relaxed text-ink/80 md:grid-cols-2">
            {bio.map((b) => (
              <p key={b.slice(0, 20)} data-reveal>
                {b}
              </p>
            ))}
          </div>

          <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <li key={s.label} data-medal className="flex flex-col items-center text-center">
                <span className="relative grid size-28 place-items-center">
                  <svg viewBox="0 0 100 100" className={`absolute inset-0 ${i % 2 === 0 ? "text-terra" : "text-safran"}`}>
                    <polygon points={starPoints(50, 50, 48).join(" ")} fill="none" stroke="currentColor" strokeWidth={1.2} />
                    <polygon points={starPoints(50, 50, 40).join(" ")} fill="currentColor" fillOpacity={0.08} stroke="currentColor" strokeWidth={0.6} strokeDasharray="2 3" />
                  </svg>
                  <span data-count={s.value} className="relative font-display text-4xl">
                    {s.value}
                  </span>
                </span>
                <span className="mt-3 flex items-center gap-2 text-sm text-graphite">
                  <Khatam className="size-2.5 text-terra" filled />
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
