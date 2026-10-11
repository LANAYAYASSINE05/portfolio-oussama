"use client";

import Link from "next/link";
import { useRef } from "react";
import { SocialIcon, TechLogo } from "@/components/ui/Logos";
import { Magnetic } from "@/components/ui/Magnetic";
import { gsap, useGSAP } from "@/lib/gsap";
import { identity, technologies } from "@/lib/content";

const tools = (category: string) =>
  technologies
    .filter((t) => t.category === category)
    .map((t) => t.name)
    .join(" · ");

const credits = [
  ["Réalisation", identity.name],
  ["Scénario", "Projets de logements — villas & immeubles"],
  ["Plans", tools("Conception & BIM")],
  ["Modélisation", tools("Modélisation 3D")],
  ["Lumière", tools("Rendu")],
  ["Montage", tools("Graphisme")],
  ["Production", identity.school],
  ["Tournage", identity.city],
  ["Citation", "« Le silence du passé et le souffle du présent »"],
];

export function EndCredits() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const roll = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = roll.current;
      const box = stage.current;
      if (!el || !box) return;
      gsap.fromTo(
        el,
        { y: () => box.clientHeight },
        {
          y: () => -el.scrollHeight,
          ease: "none",
          scrollTrigger: { trigger: box, start: "top top", end: "+=180%", pin: true, scrub: 1, invalidateOnRefresh: true },
        },
      );
      gsap.from("[data-fin]", {
        autoAlpha: 0,
        filter: "blur(16px)",
        scale: 1.1,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-fin]", start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contact" data-chapter="Générique — Contact" className="relative bg-black">
      <div ref={stage} className="relative h-svh overflow-hidden">
        <div ref={roll} className="absolute inset-x-0 top-0 mx-auto max-w-3xl space-y-10 px-[var(--gutter)] text-center">
          <p className="credits text-terra">Générique de fin</p>
          {credits.map(([role, name]) => (
            <div key={role}>
              <p className="credits text-graphite">{role}</p>
              <p className="mt-2 font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-tight">{name}</p>
            </div>
          ))}
          <div>
            <p className="credits text-graphite">Avec la participation de</p>
            <ul className="mx-auto mt-6 grid max-w-xl grid-cols-4 justify-items-center gap-6 sm:grid-cols-8">
              {technologies.map((t) => (
                <li key={t.symbol} title={t.name}>
                  <TechLogo name={t.name} className="size-11 opacity-90 grayscale-[0.35]" />
                </li>
              ))}
            </ul>
          </div>
          <p className="credits pt-10 text-graphite">Merci d&apos;avoir regardé</p>
        </div>
      </div>

      <div className="flex min-h-svh flex-col items-center justify-center gap-10 px-[var(--gutter)] py-24 text-center">
        <p data-fin className="font-display text-[clamp(6rem,20vw,18rem)] italic leading-none">
          Fin<span className="text-terra">.</span>
        </p>
        <p className="credits text-ink/70">Et si la prochaine scène se tournait ensemble ?</p>
        <Magnetic>
          <a
            href={`mailto:${identity.email}`}
            className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-terra px-8 py-5 font-display text-2xl md:text-4xl"
            data-cursor=""
          >
            <span className="absolute inset-0 translate-y-full bg-terra transition-transform duration-700 ease-archi group-hover:translate-y-0" />
            <span className="relative transition-colors duration-500 group-hover:text-black">{identity.email}</span>
          </a>
        </Magnetic>
        <ul className="flex flex-wrap justify-center gap-6">
          {identity.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="credits flex items-center gap-2.5 text-ink/70 transition-colors hover:text-terra" data-cursor="">
                <SocialIcon label={s.label} className="size-4" />
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <div className="label mt-10 flex flex-wrap justify-center gap-6 text-graphite">
          <span>© 2026 {identity.name}</span>
          <Link href="/systeme" className="hover:text-ink" data-cursor="">
            Système de design
          </Link>
        </div>
      </div>
    </section>
  );
}
