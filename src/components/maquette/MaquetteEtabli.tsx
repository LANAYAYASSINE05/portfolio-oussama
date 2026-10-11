"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, useGSAP } from "@/lib/gsap";
import { identity } from "@/lib/content";
import { IsoHouse } from "./IsoModel";
import { Availability, Tape } from "./shared";

function FoamWord({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span aria-hidden className={`inline-flex ${className}`}>
      {text.split("").map((ch, i) => (
        <span key={i} data-mq-piece className="foam-text inline-block">
          {ch}
        </span>
      ))}
    </span>
  );
}

export function MaquetteEtabli() {
  const root = useRef<HTMLElement>(null);
  const { introDone, scrollTo } = useSite();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 });

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  useGSAP(
    () => {
      gsap.set("[data-mq-fade]", { autoAlpha: 0 });
      if (!introDone) return;
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-mq-piece]", {
          y: -90,
          rotate: () => gsap.utils.random(-35, 35),
          autoAlpha: 0,
          duration: 0.8,
          ease: "bounce.out",
          stagger: 0.05,
          clearProps: "transform",
        })
        .from("[data-mq-layer]", { y: -50, autoAlpha: 0, duration: 0.55, ease: "back.out(1.6)", stagger: 0.16 }, 0.2)
        .to("[data-mq-fade]", { autoAlpha: 1, duration: 0.5, stagger: 0.08 }, 0.7)
        .fromTo("[data-mq-cut]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, 1)
        .fromTo("[data-mq-blade]", { left: "0%" }, { left: "100%", duration: 1.4, ease: "power2.inOut" }, 1);
    },
    { scope: root, dependencies: [introDone], revertOnUpdate: true },
  );

  return (
    <section
      id="accueil"
      data-room="accueil"
      ref={root}
      onPointerMove={onMove}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="mat relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)]"
    >
      <div aria-hidden className="absolute inset-x-0 top-[var(--header-h)] flex h-5 border-b border-line">
        {Array.from({ length: 40 }, (_, i) => (
          <span key={i} className="relative flex-1 border-l border-line">
            {i % 5 === 0 && <span className="absolute left-1 top-0.5 font-mono text-[0.55rem] text-graphite">{i}</span>}
          </span>
        ))}
      </div>

      <div className="relative grid gap-10 px-[var(--gutter)] pb-16 lg:min-h-[calc(100svh-var(--header-h)-2.5rem)] lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="relative z-10">
          <div data-mq-fade className="flex flex-wrap items-center gap-4">
            <Tape className="-rotate-2">{identity.role}</Tape>
            <Availability />
          </div>

          <h1 className="mt-8 font-display uppercase leading-[0.88]">
            <span className="sr-only">{identity.name}</span>
            <FoamWord text={identity.firstName} className="text-[clamp(3.5rem,12vw,10rem)]" />
            <br />
            <FoamWord text={identity.lastName} className="text-[clamp(3.5rem,12vw,10rem)]" />
          </h1>

          <div aria-hidden className="relative mt-6 h-6 max-w-xl">
            <svg viewBox="0 0 100 4" preserveAspectRatio="none" className="absolute inset-x-0 top-1/2 h-1 w-full -translate-y-1/2 overflow-visible">
              <line x1="0" y1="2" x2="100" y2="2" stroke="rgb(236 229 214 / 0.25)" strokeWidth="1" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
              <line data-mq-cut x1="0" y1="2" x2="100" y2="2" pathLength={1} strokeDasharray="1" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
            <span data-mq-blade className="absolute top-1/2 -translate-x-1/2 -translate-y-[85%]">
              <svg viewBox="0 0 40 16" className="h-4 w-10 -rotate-12">
                <path d="M0 8 L14 2 L40 6 L40 10 L14 14 Z" fill="#c9ccc6" stroke="#6f736c" strokeWidth="0.8" />
                <rect x="22" y="5" width="18" height="6" rx="1" fill="var(--accent)" />
              </svg>
            </span>
          </div>

          <p data-mq-fade className="mt-6 max-w-xl text-lg leading-relaxed text-ink/85">
            Plans, modélisation 3D et rendus pour des logements contemporains. Diplômé en {identity.graduation}, je découpe, j&apos;assemble et je dessine : prêt à
            rejoindre une agence.
          </p>

          <div data-mq-fade className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href={identity.cv}
              download
              className="kraft group relative flex items-center gap-3 py-4 pl-10 pr-7 font-display text-xl uppercase shadow-[0_10px_20px_rgb(0_0_0/0.45)] transition-transform duration-300 [clip-path:polygon(16px_0,100%_0,100%_100%,16px_100%,0_50%)] hover:-rotate-2"
              data-cursor=""
            >
              <span aria-hidden className="absolute left-5 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-paper shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)]" />
              <Download aria-hidden className="size-5" />
              Mon CV
            </a>
            <button
              type="button"
              onClick={() => scrollTo("#projets")}
              className="foam flex items-center gap-3 rounded-sm px-7 py-4 font-display text-xl uppercase transition-transform duration-300 hover:-translate-y-1"
              data-cursor=""
            >
              Les projets
              <ArrowDown aria-hidden className="size-5" />
            </button>
          </div>
        </div>

        <div className="relative [perspective:1200px]">
          <motion.div style={{ rotateX, rotateY }} className="relative [transform-style:preserve-3d]">
            <IsoHouse className="mx-auto w-full max-w-[640px] overflow-visible" />
          </motion.div>
          <p data-mq-fade className="font-hand absolute left-[4%] top-[6%] -rotate-6 text-2xl text-safran">
            éch. 1/200
          </p>
          <p data-mq-fade className="font-hand absolute bottom-[14%] right-[2%] rotate-3 text-xl text-graphite md:text-2xl">
            mousse 5 mm, balsa, calque
          </p>
        </div>
      </div>

      <div className="kraft relative flex flex-wrap items-center justify-between gap-x-8 gap-y-2 px-[var(--gutter)] py-3 font-mono text-xs font-bold uppercase tracking-[0.18em]">
        <span>Projet : {identity.name}</span>
        <span>Échelle 1:1</span>
        <span className="hidden sm:inline">{identity.city}</span>
        <span className="hidden md:inline">{identity.coords}</span>
        <span>{identity.graduation}</span>
      </div>
    </section>
  );
}
