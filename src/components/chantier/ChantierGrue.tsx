"use client";

import { ArrowDown, Download } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, useGSAP } from "@/lib/gsap";
import { identity } from "@/lib/content";
import { Availability, BarrierTape, Beacon } from "./shared";

const MAST_X = 430;
const JIB_TIP = 30;
const CHORD_Y = 96;

function Lattice({ x1, x2, y1, y2, step = 22, vertical = false }: { x1: number; x2: number; y1: number; y2: number; step?: number; vertical?: boolean }) {
  const d: string[] = [];
  if (vertical) {
    for (let y = y1, i = 0; y < y2; y += step, i++) d.push(`M${i % 2 ? x2 : x1} ${y} L${i % 2 ? x1 : x2} ${Math.min(y + step, y2)}`);
  } else {
    for (let x = x1, i = 0; x < x2; x += step, i++) d.push(`M${x} ${i % 2 ? y2 : y1} L${Math.min(x + step, x2)} ${i % 2 ? y1 : y2}`);
  }
  return <path d={d.join(" ")} fill="none" stroke="#ffc400" strokeWidth="1.6" />;
}

function Crane() {
  return (
    <svg viewBox="0 0 640 680" className="h-auto w-full overflow-visible" role="img" aria-label="Grue à tour hissant une poutre au nom d'Oussama Ziyati">
      <defs>
        <linearGradient id="ch-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b727a" />
          <stop offset="0.5" stopColor="#3a3f45" />
          <stop offset="1" stopColor="#4c5258" />
        </linearGradient>
      </defs>

      {/* mast */}
      <g>
        <line x1={MAST_X - 16} y1="120" x2={MAST_X - 16} y2="680" stroke="#ffc400" strokeWidth="3.5" />
        <line x1={MAST_X + 16} y1="120" x2={MAST_X + 16} y2="680" stroke="#ffc400" strokeWidth="3.5" />
        <Lattice x1={MAST_X - 16} x2={MAST_X + 16} y1={120} y2={680} step={32} vertical />
      </g>

      {/* A-frame and ties */}
      <path d={`M${MAST_X - 14} ${CHORD_Y - 22} L${MAST_X} 20 L${MAST_X + 14} ${CHORD_Y - 22}`} fill="none" stroke="#ffc400" strokeWidth="3" />
      <line x1={MAST_X} y1="20" x2={JIB_TIP + 60} y2={CHORD_Y - 22} stroke="#c9ced3" strokeWidth="1.2" />
      <line x1={MAST_X} y1="20" x2="610" y2={CHORD_Y - 12} stroke="#c9ced3" strokeWidth="1.2" />
      <circle cx={MAST_X} cy="20" r="4" fill="#ff5b14" className="chantier-beacon" />

      {/* jib */}
      <line x1={JIB_TIP} y1={CHORD_Y - 22} x2={MAST_X} y2={CHORD_Y - 22} stroke="#ffc400" strokeWidth="3" />
      <line x1={JIB_TIP} y1={CHORD_Y} x2={MAST_X} y2={CHORD_Y} stroke="#ffc400" strokeWidth="3.5" />
      <line x1={JIB_TIP} y1={CHORD_Y - 22} x2={JIB_TIP} y2={CHORD_Y} stroke="#ffc400" strokeWidth="3" />
      <Lattice x1={JIB_TIP} x2={MAST_X} y1={CHORD_Y - 22} y2={CHORD_Y} step={22} />

      {/* counter-jib & counterweights */}
      <line x1={MAST_X} y1={CHORD_Y - 12} x2="610" y2={CHORD_Y - 12} stroke="#ffc400" strokeWidth="3" />
      <line x1={MAST_X} y1={CHORD_Y} x2="610" y2={CHORD_Y} stroke="#ffc400" strokeWidth="3.5" />
      <Lattice x1={MAST_X} x2={610} y1={CHORD_Y - 12} y2={CHORD_Y} step={18} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={548 + i * 20} y={CHORD_Y + 2} width="18" height="42" fill="#5b6168" stroke="#2b2f33" />
      ))}

      {/* cab */}
      <rect x={MAST_X - 30} y={CHORD_Y + 2} width="30" height="34" rx="3" fill="#ffc400" />
      <rect x={MAST_X - 26} y={CHORD_Y + 7} width="20" height="14" fill="#9fd4ff" opacity="0.75" />
      <rect x={MAST_X - 15} y="230" width="30" height="120" fill="#111" opacity="0.85" />
      <text x={MAST_X} y="290" fill="#ffc400" fontSize="16" textAnchor="middle" className="font-stencil" transform={`rotate(-90 ${MAST_X} 290)`}>
        OZ · 2026
      </text>

      {/* trolley + hanging load */}
      <g data-ch-trolley transform={`translate(${MAST_X - 60} 0)`}>
        <rect x="-16" y={CHORD_Y + 1} width="32" height="10" rx="2" fill="#2b2f33" stroke="#ffc400" strokeWidth="1.5" />
        <g transform={`translate(0 ${CHORD_Y + 11})`}>
          <g data-ch-swing>
            <line data-ch-cable x1="0" y1="0" x2="0" y2="20" stroke="#c9ced3" strokeWidth="1.6" />
            <g data-ch-load transform="translate(0 20)">
              <path d="M-6 0 h12 v10 a10 10 0 1 1 -14 10" fill="none" stroke="#ffc400" strokeWidth="3" />
              <line x1="0" y1="28" x2="-150" y2="78" stroke="#c9ced3" strokeWidth="1.4" />
              <line x1="0" y1="28" x2="150" y2="78" stroke="#c9ced3" strokeWidth="1.4" />
              <rect x="-170" y="78" width="340" height="12" fill="url(#ch-beam)" />
              <rect x="-170" y="90" width="340" height="40" fill="#22262a" />
              <rect x="-170" y="130" width="340" height="12" fill="url(#ch-beam)" />
              <rect x="-170" y="78" width="26" height="64" fill="#ffc400" />
              <rect x="144" y="78" width="26" height="64" fill="#ffc400" />
              <path d="M-170 86 l26 -8 M-170 106 l26 -26 M-170 126 l26 -26 M-170 142 l26 -16 M144 86 l26 -8 M144 106 l26 -26 M144 126 l26 -26 M144 142 l26 -16" stroke="#111" strokeWidth="6" />
              <text x="0" y="118" textAnchor="middle" fill="#eeebe3" fontSize="24" letterSpacing="2" className="font-stencil">
                ARCHITECTE · ENA
              </text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function ChantierGrue() {
  const root = useRef<HTMLElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const { introDone, scrollTo } = useSite();

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !light.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    light.current.style.setProperty("--lx", `${e.clientX - r.left}px`);
    light.current.style.setProperty("--ly", `${e.clientY - r.top}px`);
  };

  useGSAP(
    () => {
      gsap.set("[data-ch-fade]", { autoAlpha: 0 });
      gsap.set("[data-ch-letter]", { yPercent: 105 });
      if (!introDone) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const drop = 300;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to("[data-ch-letter]", { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.04 })
        .to("[data-ch-fade]", { autoAlpha: 1, duration: 0.5, stagger: 0.08 }, 0.4)
        .fromTo("[data-ch-trolley]", { x: MAST_X - 60 }, { x: 225, duration: 1.4, ease: "power2.inOut" }, 0.2)
        .fromTo("[data-ch-cable]", { attr: { y2: 20 } }, { attr: { y2: drop }, duration: 1.3, ease: "power2.inOut" }, 1.4)
        .fromTo("[data-ch-load]", { y: 20 }, { y: drop, duration: 1.3, ease: "power2.inOut" }, 1.4);

      if (!reduced) {
        tl.fromTo("[data-ch-swing]", { rotate: 4 }, { rotate: -2.5, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 0%" }, 0.2);
      }
    },
    { scope: root, dependencies: [introDone], revertOnUpdate: true },
  );

  const word = (text: string) =>
    text.split("").map((ch, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.04em] align-bottom">
        <span data-ch-letter className="inline-block">
          {ch}
        </span>
      </span>
    ));

  return (
    <section
      id="accueil"
      data-room="accueil"
      ref={root}
      onPointerMove={onMove}
      className="asphalt relative overflow-hidden pt-[calc(var(--header-h)+2rem)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(90deg,transparent_calc(50%-1px),rgb(238_235_227/0.18)_calc(50%-1px),rgb(238_235_227/0.18)_calc(50%+1px),transparent_calc(50%+1px))] [background-size:240px_100%]" />
      <div aria-hidden className="pointer-events-none absolute -left-[10%] top-0 h-[120%] w-[60%] origin-top-left rotate-[-14deg] bg-[linear-gradient(180deg,rgb(255_236_170/0.12),transparent_75%)] [clip-path:polygon(40%_0,60%_0,100%_100%,0_100%)]" />

      <div className="relative z-10 grid gap-6 px-[var(--gutter)] pb-14 lg:min-h-[calc(100svh-var(--header-h)-6rem)] lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="min-w-0">
          <div data-ch-fade className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-3 bg-terra px-3 py-1.5 font-stencil text-base uppercase tracking-[0.14em] text-[#111]">
              <Beacon />
              Chantier n° {identity.graduation}
            </span>
            <Availability />
          </div>

          <h1 className="mt-8 font-display uppercase leading-[0.82]">
            <span className="sr-only">{identity.name}</span>
            <span aria-hidden className="block whitespace-nowrap text-[clamp(3.75rem,17vw,8rem)] lg:text-[clamp(6rem,10vw,11rem)]">{word(identity.firstName)}</span>
            <span aria-hidden className="block whitespace-nowrap text-[clamp(3.75rem,17vw,8rem)] text-terra lg:text-[clamp(6rem,10vw,11rem)]">{word(identity.lastName)}</span>
          </h1>

          <div data-ch-fade className="mt-6 flex max-w-xl items-center gap-4">
            <span aria-hidden className="hivis h-6 w-16 shrink-0 bg-[#ff5b14]" />
            <p className="font-display text-2xl uppercase leading-tight tracking-wide md:text-3xl">{identity.role}</p>
          </div>

          <p data-ch-fade className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
            Plans, modélisation 3D et rendus pour des logements contemporains. Je dessine ce qui se construit, et je suis prêt à rejoindre votre équipe dès maintenant.
          </p>

          <div data-ch-fade className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={identity.cv}
              download
              className="group relative flex items-stretch bg-terra font-display text-xl uppercase text-[#111] shadow-[0_8px_0_#a07a00,0_18px_28px_rgb(0_0_0/0.5)] transition-transform duration-200 hover:-translate-y-1 active:translate-y-1.5 active:shadow-[0_2px_0_#a07a00]"
              data-cursor=""
            >
              <span aria-hidden className="hazard-fine w-4 border-r-2 border-[#111]" />
              <span className="flex items-center gap-3 px-6 py-4">
                <Download aria-hidden className="size-5" />
                Télécharger le CV
              </span>
            </a>
            <button
              type="button"
              onClick={() => scrollTo("#projets")}
              className="flex items-center gap-3 border-2 border-ink/70 px-6 py-4 font-display text-xl uppercase transition-colors hover:border-terra hover:text-terra"
              data-cursor=""
            >
              Visiter le chantier
              <ArrowDown aria-hidden className="size-5" />
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full min-w-0 max-w-[620px] lg:-mt-10">
          <Crane />
          <p data-ch-fade className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-graphite">
            Grue GT-01 · charge 2,6 t · portée 40 m
          </p>
        </div>
      </div>

      <div
        ref={light}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden [--lx:72%] [--ly:30%] [background:radial-gradient(circle_460px_at_var(--lx)_var(--ly),rgb(255_214_120/0.14)_0,rgb(255_214_120/0.05)_45%,transparent_75%)] lg:block"
      />

      <div className="relative z-30">
        <BarrierTape text="Chantier en cours · accès réservé aux recruteurs" className="-rotate-1" />
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 bg-night px-[var(--gutter)] py-3 font-mono text-xs uppercase tracking-[0.18em] text-graphite">
          <span>Maître d&apos;œuvre : {identity.name}</span>
          <span className="hidden sm:inline">{identity.city}</span>
          <span className="hidden md:inline">{identity.coords}</span>
          <span className="text-terra">Ouverture : {identity.graduation}</span>
        </div>
      </div>
    </section>
  );
}
