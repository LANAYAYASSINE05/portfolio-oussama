"use client";

import { ArrowDownRight, Download } from "lucide-react";
import { useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { identity, projects } from "@/lib/content";
import { ProjectImage } from "./StudioVisual";

export function Availability({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative flex size-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/70" />
        <span className="relative size-2 rounded-full bg-emerald-500" />
      </span>
      {identity.availability}
    </span>
  );
}

export function StudioHero() {
  const root = useRef<HTMLElement>(null);
  const { introDone, scrollTo } = useSite();
  const cover = projects[0];

  useGSAP(
    () => {
      gsap.set("[data-hero-frame]", { clipPath: "inset(14% 26% 14% 26%)" });
      gsap.set("[data-hero-img]", { scale: 1.3 });
      gsap.set("[data-hero-meta]", { autoAlpha: 0, y: 16 });
      if (!introDone) return;

      const split = SplitText.create("[data-hero-name]", { type: "chars", mask: "chars" });
      gsap
        .timeline({ defaults: { ease: "power4.inOut" } })
        .from(split.chars, { yPercent: 110, duration: 1.3, stagger: 0.04, ease: "power4.out" })
        .to("[data-hero-frame]", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8 }, 0.25)
        .to("[data-hero-img]", { scale: 1.08, duration: 2.2 }, 0.25)
        .to("[data-hero-meta]", { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1, ease: "power3.out" }, 1);

      gsap.to("[data-hero-parallax]", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: "[data-hero-frame]", start: "top 60%", end: "bottom top", scrub: true },
      });
    },
    { scope: root, dependencies: [introDone], revertOnUpdate: true },
  );

  return (
    <section id="accueil" ref={root} className="px-[var(--gutter)] pb-[12vh] pt-[calc(var(--header-h)+2.5rem)]">
      <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-3 border-b border-line pb-4">
        <p data-hero-meta className="studio-caps col-span-12 text-graphite md:col-span-4">
          Portfolio — Édition {identity.graduation}
        </p>
        <p data-hero-meta className="studio-caps col-span-12 md:col-span-4">
          <Availability />
        </p>
        <p data-hero-meta className="studio-caps col-span-12 text-graphite md:col-span-4 md:text-right">
          {identity.city}
        </p>
      </div>

      <h1 className="mt-6 font-display uppercase leading-[0.84] tracking-[-0.035em] text-[clamp(4rem,15.5vw,17.5rem)]">
        <span data-hero-name className="block">
          {identity.firstName}
        </span>
        <span data-hero-name className="block text-right">
          {identity.lastName}
        </span>
      </h1>

      <div data-hero-frame className="relative mt-8 aspect-[4/3] w-full overflow-hidden md:aspect-[21/9]">
        <div data-hero-parallax className="absolute -inset-y-[12%] inset-x-0">
          <div data-hero-img className="absolute inset-0">
            <ProjectImage project={cover} sizes="100vw" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
        <p data-hero-meta className="studio-caps absolute bottom-5 left-5 text-white/85 md:bottom-7 md:left-7">
          {cover.title} — {cover.location}
        </p>
        <p data-hero-meta className="studio-caps absolute bottom-5 right-5 hidden text-white/85 md:bottom-7 md:right-7 md:block">
          {cover.type} · {cover.year}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-12 items-end gap-x-[var(--gutter)] gap-y-8">
        <p data-hero-meta className="col-span-12 max-w-2xl text-[clamp(1.25rem,2vw,1.75rem)] leading-snug md:col-span-7">
          <span className="font-medium">{identity.role}.</span>{" "}
          <span className="text-graphite">Conception 2D/3D, logements, plans d&apos;exécution, modélisation et rendus.</span>
        </p>
        <div data-hero-meta className="col-span-12 flex flex-wrap gap-3 md:col-span-5 md:justify-end">
          <Magnetic>
            <a
              href={identity.cv}
              download
              className="studio-caps flex h-14 items-center gap-3 rounded-full bg-ink px-7 text-paper transition-colors duration-500 hover:bg-terra"
              data-cursor=""
            >
              <Download aria-hidden strokeWidth={1.5} className="size-4" />
              Télécharger le CV
            </a>
          </Magnetic>
          <button
            type="button"
            onClick={() => scrollTo("#projets")}
            className="studio-caps flex h-14 items-center gap-3 rounded-full border border-ink px-7 transition-colors duration-500 hover:bg-ink hover:text-paper"
            data-cursor=""
          >
            Voir les projets
            <ArrowDownRight aria-hidden strokeWidth={1.5} className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
