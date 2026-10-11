"use client";

import { ArrowDown, Download } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { ProjectImage } from "@/components/studio/StudioVisual";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { identity, projects } from "@/lib/content";
import { Availability, Swatch, type Texture } from "./shared";

const pebbles: { texture: Texture; label: string; className: string; depth: number }[] = [
  { texture: "terre", label: "Terre crue", className: "-left-6 top-[12%] size-24 md:size-28", depth: 28 },
  { texture: "bois", label: "Bois", className: "-right-4 top-[6%] size-20 md:size-24", depth: -22 },
  { texture: "pierre", label: "Pierre", className: "-right-8 bottom-[22%] size-28 md:size-32", depth: 36 },
  { texture: "lin", label: "Lin", className: "-left-10 bottom-[8%] size-20 md:size-24", depth: -30 },
  { texture: "olive", label: "Olivier", className: "left-[42%] -bottom-6 size-14 md:size-16", depth: 18 },
];

const materials = ["Terre crue", "Bois", "Lin", "Pierre", "Chaux", "Olivier", "Tadelakt", "Pisé"];

function Pebble({ p, mx, my }: { p: (typeof pebbles)[number]; mx: MotionValue<number>; my: MotionValue<number> }) {
  const x = useTransform(mx, (v) => v * p.depth);
  const y = useTransform(my, (v) => v * p.depth);
  return (
    <motion.div data-pebble style={{ x, y }} className={`absolute z-10 ${p.className}`}>
      <Swatch texture={p.texture} className="pebble h-full w-full shadow-[0_18px_40px_-18px_rgb(47_36_25/0.55)]" />
      <span className="matiere-tag absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-graphite">{p.label}</span>
    </motion.div>
  );
}

export function MatiereHero() {
  const root = useRef<HTMLElement>(null);
  const { introDone, scrollTo } = useSite();
  const cover = projects[0];
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });

  useGSAP(
    () => {
      gsap.set("[data-arch]", { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set("[data-arch-img]", { scale: 1.25 });
      gsap.set("[data-pebble]", { scale: 0 });
      gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 20 });
      if (!introDone) return;

      const split = SplitText.create("[data-hero-name]", { type: "words,chars", mask: "words" });
      gsap
        .timeline()
        .from(split.chars, { yPercent: 100, duration: 1.2, stagger: 0.035, ease: "power4.out" })
        .to("[data-arch]", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power4.inOut" }, 0.1)
        .to("[data-arch-img]", { scale: 1, duration: 2.2, ease: "power3.out" }, 0.1)
        .to("[data-pebble]", { scale: 1, duration: 1.2, stagger: 0.09, ease: "elastic.out(1, 0.6)" }, 0.9)
        .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, ease: "power3.out" }, 0.6);
    },
    { scope: root, dependencies: [introDone], revertOnUpdate: true },
  );

  const onMove = (e: React.PointerEvent) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      id="accueil"
      ref={root}
      onPointerMove={onMove}
      className="relative overflow-hidden pt-[calc(var(--header-h)+3rem)]"
    >
      <div className="grid grid-cols-12 items-center gap-x-[var(--gutter)] gap-y-16 px-[var(--gutter)] pb-20">
        <div className="col-span-12 lg:col-span-7">
          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <Availability className="rounded-full bg-paper-2 px-4 py-2" />
            <span className="matiere-tag text-graphite">
              {identity.city} · Promotion {identity.graduation}
            </span>
          </div>

          <p data-hero-fade className="mt-10 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] italic text-graphite">
            Bonjour, je suis
          </p>
          <h1 data-hero-name className="font-display text-[clamp(3.75rem,10vw,9.5rem)] leading-[0.9]">
            {identity.firstName} <span className="italic text-terra">{identity.lastName}</span>
          </h1>

          <p data-hero-fade className="mt-8 max-w-xl text-[clamp(1.125rem,1.5vw,1.375rem)] leading-relaxed text-graphite">
            <span className="text-ink">{identity.role}.</span> Je conçois des lieux chaleureux et justes, attentifs au
            climat, aux matériaux et à ceux qui les habitent — du plan au rendu.
          </p>

          <div data-hero-fade className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <a
                href={identity.cv}
                download
                className="flex h-14 items-center gap-3 rounded-full bg-terra px-7 font-medium text-white shadow-[0_14px_30px_-14px_rgb(176_95_54/0.9)] transition-colors duration-500 hover:bg-ink"
                data-cursor=""
              >
                <Download aria-hidden strokeWidth={1.75} className="size-4" />
                Télécharger mon CV
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={() => scrollTo("#projets")}
              className="flex h-14 items-center gap-3 rounded-full border border-ink/25 px-7 font-medium transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper"
              data-cursor=""
            >
              Découvrir mes projets
              <ArrowDown aria-hidden strokeWidth={1.75} className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative col-span-12 mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div data-arch className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[2rem]">
            <div data-arch-img className="absolute inset-0">
              <ProjectImage project={cover} sizes="(min-width: 1024px) 40vw, 90vw" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[#b05f36]/15 mix-blend-multiply" />
            <span className="matiere-tag absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-paper/85 px-4 py-2 backdrop-blur">
              {cover.title} · {cover.location}
            </span>
          </div>
          {pebbles.map((p) => (
            <Pebble key={p.label} p={p} mx={mx} my={my} />
          ))}
        </div>
      </div>

      <div data-hero-fade className="overflow-hidden border-y border-line bg-paper-2 py-5" aria-hidden>
        <div className="flex w-max matiere-marquee gap-10 font-display text-3xl italic text-graphite">
          {[...materials, ...materials, ...materials, ...materials].map((m, i) => (
            <span key={i} className="flex items-center gap-10">
              {m}
              <span className="size-2 rounded-full bg-terra/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
