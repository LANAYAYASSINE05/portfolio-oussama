"use client";

import { ArrowDown, Download } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { identity } from "@/lib/content";
import { Availability, Lantern, Lattice } from "./shared";

export function ClaustraNuit() {
  const root = useRef<HTMLElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const { introDone, scrollTo } = useSite();

  const follow = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !light.current) return;
    const box = e.currentTarget.getBoundingClientRect();
    gsap.to(light.current, {
      "--mx": `${e.clientX - box.left}px`,
      "--my": `${e.clientY - box.top}px`,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  useGSAP(
    () => {
      gsap.set("[data-nuit-fade]", { autoAlpha: 0, y: 24 });
      gsap.set("[data-nuit-lantern]", { yPercent: -120 });
      if (!introDone) return;

      const split = SplitText.create("[data-nuit-name]", { type: "words,chars" });
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to("[data-nuit-lantern]", { yPercent: 0, duration: 1.6, ease: "bounce.out" })
        .fromTo("[data-nuit-swing]", { rotate: 9 }, { rotate: 0, duration: 3.2, ease: "elastic.out(1, 0.25)" }, 0.9)
        .from(split.chars, { autoAlpha: 0, y: 40, filter: "blur(10px)", duration: 1.1, stagger: 0.04 }, 0.4)
        .to("[data-nuit-fade]", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 1);

      gsap.to("[data-nuit-swing]", {
        rotate: -14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      gsap.to("[data-nuit-glow]", {
        scale: 1.6,
        autoAlpha: 0.35,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root, dependencies: [introDone], revertOnUpdate: true },
  );

  return (
    <section
      id="accueil"
      data-room="accueil"
      ref={root}
      onPointerMove={follow}
      className="relative isolate overflow-hidden px-[var(--gutter)] pb-16 pt-[calc(var(--header-h)+2.5rem)] md:min-h-svh"
    >
      <div aria-hidden className="absolute inset-0 -z-10 text-ink/[0.035]">
        <Lattice size={72} stroke={5} className="absolute inset-0" />
      </div>
      <div
        ref={light}
        aria-hidden
        className="absolute inset-0 -z-10 text-terra/40 [--mx:72%] [--my:38%]"
        style={{
          maskImage: "radial-gradient(circle 18rem at var(--mx) var(--my), black, transparent)",
          WebkitMaskImage: "radial-gradient(circle 18rem at var(--mx) var(--my), black, transparent)",
        }}
      >
        <Lattice size={72} stroke={5} className="absolute inset-0" />
      </div>

      <div className="grid items-center gap-8 md:min-h-[calc(100svh-var(--header-h)-6.5rem)] md:grid-cols-[1fr_auto]">
        <div className="relative z-10 order-2 md:order-1">
          <p data-nuit-fade className="text-sm font-semibold uppercase tracking-[0.22em] text-terra">
            {identity.role}
          </p>
          <h1 className="mt-6 font-display text-[clamp(3.75rem,11vw,11rem)] leading-[0.9]">
            <span data-nuit-name className="block">
              {identity.firstName}
            </span>
            <span data-nuit-name className="brass-text block pb-2">
              {identity.lastName}
            </span>
          </h1>
          <p data-nuit-fade lang="ar" className="mt-4 font-display text-[clamp(1.75rem,3vw,2.75rem)] text-safran">
            {identity.nameAr}
          </p>
          <p data-nuit-fade className="mt-6 max-w-lg text-lg leading-snug text-graphite">
            Promotion {identity.graduation}. Logements contemporains, plans, modélisation et rendus : je dessine des lieux où la lumière fait partie du projet.
          </p>
          <div data-nuit-fade className="mt-6">
            <Availability />
          </div>
          <div data-nuit-fade className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <a
                href={identity.cv}
                download
                className="flex items-center gap-3 rounded-full bg-terra px-6 py-4 font-semibold text-night shadow-[0_0_40px_-8px_var(--accent)] transition-shadow duration-500 hover:shadow-[0_0_70px_-4px_var(--accent)]"
                data-cursor=""
              >
                <Download aria-hidden strokeWidth={1.75} className="size-4" />
                Télécharger le CV
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={() => scrollTo("#projets")}
              className="flex items-center gap-3 rounded-full border border-ink/25 px-6 py-4 font-semibold transition-colors duration-500 hover:border-safran hover:text-safran"
              data-cursor=""
            >
              Voir les projets
              <ArrowDown aria-hidden strokeWidth={1.75} className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative order-1 flex justify-center md:order-2 md:-mt-[calc(var(--header-h)+2.5rem)] md:self-start">
          <div data-nuit-lantern className="relative">
            <div data-nuit-swing className="origin-top">
              <div
                data-nuit-glow
                aria-hidden
                className="lantern-flicker absolute left-1/2 top-[58%] -z-10 size-[min(90vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_190_90/0.45),rgb(224_169_78/0.12)_45%,transparent_70%)]"
              />
              <Lantern className="h-[min(52vw,16rem)] w-auto text-[#94672a] md:h-[min(78svh,34rem)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
