"use client";

import { animate, stagger, svg, utils } from "animejs";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { identity } from "@/lib/content";
import { useTheme } from "@/lib/theme";
import { ROSETTE_ORIGIN, ZelligeRosette } from "./ZelligeRosette";

const Maquette = dynamic(() => import("@/components/three/Maquette"), { ssr: false });

function Axonometry({ svgRef }: { svgRef: React.RefObject<SVGSVGElement | null> }) {
  return (
    <svg ref={svgRef} viewBox="0 0 600 520" className="stroke-draw h-full w-full opacity-0" aria-hidden>
      {/* Socle */}
      <path d="M300 470 L560 340 L300 210 L40 340 Z" />
      {/* Volume principal */}
      <path d="M160 340 L160 200 L300 130 L440 200 L440 340" />
      <path d="M160 200 L300 270 L440 200" />
      <path d="M300 270 L300 410" />
      <path d="M160 340 L300 410 L440 340" />
      {/* Porte-à-faux */}
      <path d="M300 130 L300 60 L500 160 L500 230 L440 200" />
      <path d="M300 60 L240 90 L240 165" />
      <path d="M500 230 L440 260" />
      {/* Ouvertures */}
      <path d="M190 260 L190 330 L240 355 L240 285 Z" />
      <path d="M330 300 L330 380 L410 340 L410 260 Z" />
      <path d="M370 280 L370 360" />
      <path d="M330 170 L330 110 L470 180 L470 210" />
      {/* Lignes de construction */}
      <path d="M300 20 L300 500" strokeDasharray="4 6" />
      <path d="M20 350 L580 350" strokeDasharray="4 6" />
      <circle cx="300" cy="270" r="6" />
      <path d="M40 340 L40 360 M560 340 L560 360 M40 355 L560 355" />
    </svg>
  );
}

export function Hero() {
  const { introDone, scrollTo } = useSite();
  const root = useRef<HTMLElement>(null);
  const drawingRef = useRef<SVGSVGElement>(null);
  const theme = useTheme();
  const isVolume = theme === "volume";
  const isMedina = theme === "medina";

  useGSAP(
    () => {
      if (!introDone) return;

      const split = SplitText.create("[data-hero-name]", { type: "chars", mask: "chars" });
      const lines = SplitText.create("[data-hero-copy]", { type: "lines", mask: "lines" });

      const tl = gsap.timeline({ delay: 0.25 });
      tl.from(split.chars, { yPercent: 110, rotate: 6, duration: 1.4, stagger: 0.045 })
        .from("[data-hero-rule]", { scaleX: 0, duration: 1.6, ease: "expo.inOut" }, 0.1)
        .from(lines.lines, { yPercent: 100, duration: 1.1, stagger: 0.08 }, 0.6)
        .from("[data-hero-fade]", { autoAlpha: 0, y: 20, stagger: 0.08 }, 0.8);

      gsap.to("[data-hero-name-wrap]", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      if (isVolume) return;

      if (isMedina) {
        gsap.to("[data-rosette]", { rotation: 360, svgOrigin: ROSETTE_ORIGIN, duration: 140, ease: "none", repeat: -1 });
        gsap.to("[data-rosette-fill]", { fillOpacity: 0.14, duration: 1.6, stagger: 0.3, delay: 2.4, ease: "power2.out" });
        gsap.from("[data-hero-arabic]", { autoAlpha: 0, x: 40, duration: 1.6, delay: 1.2, ease: "expo.out" });
      }

      gsap.to("[data-hero-drawing]", {
        yPercent: 20,
        rotate: -4,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      const xTo = gsap.quickTo("[data-hero-drawing-inner]", "x", { duration: 1.2, ease: "power3" });
      const yTo = gsap.quickTo("[data-hero-drawing-inner]", "y", { duration: 1.2, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        xTo((e.clientX / window.innerWidth - 0.5) * 40);
        yTo((e.clientY / window.innerHeight - 0.5) * 30);
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root, dependencies: [introDone, theme], revertOnUpdate: true },
  );

  useEffect(() => {
    if (!introDone || isVolume || !drawingRef.current) return;
    const paths = svg.createDrawable(drawingRef.current.querySelectorAll("path, circle"));
    utils.set(paths, { draw: "0 0" });
    drawingRef.current.style.opacity = "1";
    const anim = animate(paths, {
      draw: ["0 0", "0 1"],
      duration: 2400,
      delay: stagger(70, { start: 400 }),
      ease: "inOutCubic",
    });
    return () => {
      anim.revert();
    };
  }, [introDone, theme, isVolume]);

  return (
    <section
      id="accueil"
      ref={root}
      className="blueprint relative flex min-h-svh flex-col justify-end overflow-hidden px-[var(--gutter)] pb-[var(--gutter)] pt-[calc(var(--header-h)+2rem)]"
    >
      {isVolume ? (
        <>
          <Maquette trigger={root} introDone={introDone} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-paper" />
        </>
      ) : (
        <div
          data-hero-drawing
          className={`pointer-events-none absolute right-[-8vw] top-[10vh] h-[70vh] w-[70vh] max-w-[80vw] md:right-[4vw] ${isMedina ? "" : "text-ink/35"}`}
        >
          <div data-hero-drawing-inner className="h-full w-full">
            {isMedina ? <ZelligeRosette key="medina" svgRef={drawingRef} /> : <Axonometry key="trait" svgRef={drawingRef} />}
          </div>
        </div>
      )}

      <div className="label absolute left-[var(--gutter)] right-[var(--gutter)] top-[calc(var(--header-h)+1rem)] flex justify-between text-graphite">
        <span data-hero-fade>Portfolio — Édition 2026</span>
        <span data-hero-fade className="hidden md:block">{identity.coords}</span>
        <span data-hero-fade>Plans · Modélisation · Rendus</span>
      </div>

      <div data-hero-name-wrap className="relative">
        <h1 className="font-display leading-[0.82] tracking-[-0.03em] text-[clamp(4.5rem,18vw,19rem)]">
          <span data-hero-name className="block">
            {identity.firstName}
          </span>
          <span data-hero-name className="block pl-[12vw] italic text-terra">
            {identity.lastName}
          </span>
        </h1>
        {isMedina && (
          <p
            data-hero-arabic
            lang="ar"
            dir="rtl"
            className="font-arabic absolute bottom-[0.2em] right-0 text-[clamp(2rem,5vw,5rem)] leading-none text-[var(--ocre)]"
          >
            {identity.nameAr}
          </p>
        )}
      </div>

      <div data-hero-rule className="my-6 h-px w-full origin-left bg-ink" />

      <div className="grid grid-cols-4 gap-[var(--gutter)] md:grid-cols-12">
        <p className="label col-span-2 text-graphite md:col-span-3" data-hero-fade>
          ( {identity.role} )
          <br />
          {identity.city}
        </p>
        <p
          data-hero-copy
          className="col-span-4 text-lg leading-snug md:col-span-5 md:col-start-5 md:text-2xl"
        >
          Je conçois des lieux sobres et lumineux, ancrés dans leur territoire — où la précision du
          trait rencontre la chaleur de la matière.
        </p>
        <div className="col-span-2 flex items-end justify-end md:col-span-3 md:col-start-10" data-hero-fade>
          <Magnetic>
            <button
              type="button"
              onClick={() => scrollTo("#projets")}
              className="group relative grid size-28 place-items-center overflow-hidden rounded-full border border-ink"
              data-cursor=""
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-ink transition-transform duration-700 ease-archi group-hover:translate-y-0" />
              <span className="label relative transition-colors duration-500 group-hover:text-paper">
                Projets ↓
              </span>
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
