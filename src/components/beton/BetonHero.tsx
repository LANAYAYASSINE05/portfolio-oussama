"use client";

import { ArrowDown, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { ProjectImage } from "@/components/studio/StudioVisual";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { identity, projects } from "@/lib/content";
import { Availability } from "./shared";

function LocalTime() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const format = new Intl.DateTimeFormat("fr-FR", {
      timeZone: "Africa/Casablanca",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(format.format(new Date()));
    const id = window.setInterval(tick, 1000);
    const first = window.setTimeout(tick, 0);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(first);
    };
  }, []);

  return <span className="tabular-nums">{time}</span>;
}

export function BetonHero() {
  const root = useRef<HTMLElement>(null);
  const { introDone, scrollTo } = useSite();
  const cover = projects[1];

  useGSAP(
    () => {
      gsap.set("[data-hero-cell]", { autoAlpha: 0 });
      gsap.set("[data-hero-rule]", { scaleX: 0 });
      gsap.set("[data-hero-img]", { clipPath: "inset(0 0 100% 0)" });
      if (!introDone) return;

      const split = SplitText.create("[data-hero-name]", { type: "words,chars", mask: "chars" });
      gsap
        .timeline()
        .to("[data-hero-rule]", { scaleX: 1, duration: 0.9, ease: "expo.inOut", stagger: 0.08 })
        .from(split.chars, { yPercent: 100, duration: 0.9, ease: "expo.out", stagger: 0.035 }, 0.3)
        .to("[data-hero-img]", { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "expo.inOut" }, 0.5)
        .to("[data-hero-cell]", { autoAlpha: 1, duration: 0.01, stagger: 0.07 }, 0.9);

      gsap.to("[data-hero-shift]", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root, dependencies: [introDone], revertOnUpdate: true },
  );

  return (
    <section id="accueil" ref={root} className="pt-[var(--header-h)]">
      <div data-hero-rule className="h-0.5 origin-left bg-ink" />
      <div className="beton-mono grid grid-cols-2 md:grid-cols-4">
        <p data-hero-cell className="border-r-2 border-ink px-[var(--gutter)] py-3">Portfolio / {identity.graduation}</p>
        <p data-hero-cell className="px-[var(--gutter)] py-3 md:border-r-2 md:border-ink">{identity.coords}</p>
        <p data-hero-cell className="hidden border-r-2 border-ink px-[var(--gutter)] py-3 md:block">
          Casablanca <LocalTime />
        </p>
        <p data-hero-cell className="hidden px-[var(--gutter)] py-3 md:block">Fr / Ar / En</p>
      </div>
      <div data-hero-rule className="h-0.5 origin-left bg-ink" />

      <h1 className="overflow-hidden whitespace-nowrap px-[var(--gutter)] pt-4 font-display text-[clamp(2.5rem,13.4vw,16rem)] leading-[0.8]">
        <span data-hero-name className="block">
          {identity.firstName}
        </span>
        <span data-hero-name className="block text-terra">
          {identity.lastName}.
        </span>
      </h1>

      <div data-hero-rule className="mt-6 h-0.5 origin-left bg-ink" />
      <div className="grid md:grid-cols-12">
        <div className="flex flex-col justify-between border-b-2 border-ink md:col-span-5 md:border-b-0 md:border-r-2">
          <div data-hero-cell className="border-b-2 border-ink p-[var(--gutter)]">
            <p className="beton-mono text-graphite">Statut</p>
            <p className="mt-3 text-[clamp(1.5rem,2.6vw,2.4rem)] font-semibold leading-[1.05] tracking-tight">
              {identity.role}.
            </p>
            <Availability className="mt-5" />
          </div>
          <div data-hero-cell className="border-b-2 border-ink p-[var(--gutter)]">
            <p className="beton-mono text-graphite">Spécialité</p>
            <p className="mt-3 max-w-md text-lg leading-snug">{identity.headline}</p>
          </div>
          <div data-hero-cell className="grid grid-cols-2">
            <a
              href={identity.cv}
              download
              className="beton-mono flex h-20 items-center justify-between gap-3 border-r-2 border-ink bg-ink px-[var(--gutter)] text-paper transition-colors hover:bg-terra hover:text-ink"
              data-cursor=""
            >
              Télécharger le CV
              <Download aria-hidden strokeWidth={2} className="size-5" />
            </a>
            <button
              type="button"
              onClick={() => scrollTo("#projets")}
              className="beton-mono flex h-20 items-center justify-between gap-3 px-[var(--gutter)] transition-colors hover:bg-ink hover:text-paper"
              data-cursor=""
            >
              Voir les projets
              <ArrowDown aria-hidden strokeWidth={2} className="size-5" />
            </button>
          </div>
        </div>

        <div className="relative md:col-span-7">
          <div data-hero-img className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-full md:min-h-[26rem]">
            <div data-hero-shift className="absolute inset-x-0 -bottom-[20%] top-0 contrast-125 grayscale">
              <ProjectImage project={cover} sizes="(min-width: 768px) 60vw, 100vw" />
            </div>
          </div>
          <p data-hero-cell className="beton-mono absolute left-0 top-0 bg-ink px-3 py-2 text-paper">
            Fig. {cover.index} — {cover.title}, {cover.location}
          </p>
          <p data-hero-cell className="beton-mono absolute bottom-0 right-0 bg-terra px-3 py-2 text-ink">
            {cover.type} · {cover.surface}
          </p>
        </div>
      </div>
      <div data-hero-rule className="h-0.5 origin-left bg-ink" />
    </section>
  );
}
