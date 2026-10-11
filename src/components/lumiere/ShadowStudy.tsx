"use client";

import { useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { identity } from "@/lib/content";
import { Letterbox } from "./Scene";

const W = 1600;
const GROUND = 640;
const DEPTH = 220;

const buildings = [
  { x: 120, w: 150, h: 210 },
  { x: 300, w: 110, h: 330 },
  { x: 440, w: 230, h: 150 },
  { x: 700, w: 120, h: 420 },
  { x: 850, w: 260, h: 240 },
  { x: 1140, w: 90, h: 360 },
  { x: 1260, w: 210, h: 180 },
];

const SKY = [
  { at: 0, top: "#1c1410", bottom: "#a2522a" },
  { at: 0.5, top: "#2a2a2c", bottom: "#c9b48e" },
  { at: 1, top: "#120c10", bottom: "#b3401f" },
];

function sun(t: number) {
  const elevation = (Math.sin(Math.PI * t) * 62 + 7) * (Math.PI / 180);
  const x = 140 + t * (W - 280);
  const y = GROUND - 40 - Math.sin(Math.PI * t) * 470;
  return { elevation, x, y, fromLeft: t < 0.5 };
}

function shadowPoints(b: (typeof buildings)[number], t: number) {
  const { elevation, fromLeft } = sun(t);
  const length = Math.min(b.h / Math.tan(elevation), 1400);
  const dir = fromLeft ? 1 : -1;
  const dx = dir * length * 0.85;
  const dy = Math.min(length * 0.22, DEPTH);
  return `${b.x},${GROUND} ${b.x + b.w},${GROUND} ${b.x + b.w + dx},${GROUND + dy} ${b.x + dx},${GROUND + dy}`;
}

function hour(t: number) {
  const minutes = Math.round((7 * 60 + t * 12 * 60) / 15) * 15;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

export function ShadowStudy() {
  const root = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hourRef = useRef<HTMLSpanElement>(null);
  const { introDone } = useSite();

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;
      const shadows = svg.querySelectorAll<SVGPolygonElement>("[data-shadow]");
      const litEdges = svg.querySelectorAll<SVGLineElement>("[data-lit]");
      const sunEl = svg.querySelector<SVGGElement>("[data-sun]")!;
      const skyTop = svg.querySelector<SVGStopElement>("[data-sky-top]")!;
      const skyBottom = svg.querySelector<SVGStopElement>("[data-sky-bottom]")!;
      const mixTop = gsap.utils.interpolate(SKY.map((s) => s.top));
      const mixBottom = gsap.utils.interpolate(SKY.map((s) => s.bottom));

      const render = (t: number) => {
        const s = sun(t);
        sunEl.setAttribute("transform", `translate(${s.x} ${s.y})`);
        shadows.forEach((el, i) => el.setAttribute("points", shadowPoints(buildings[i], t)));
        litEdges.forEach((el, i) => {
          const b = buildings[i];
          const x = s.fromLeft ? b.x : b.x + b.w;
          el.setAttribute("x1", String(x));
          el.setAttribute("x2", String(x));
          el.style.opacity = String(0.35 + Math.sin(Math.PI * t) * 0.65);
        });
        skyTop.setAttribute("stop-color", mixTop(t));
        skyBottom.setAttribute("stop-color", mixBottom(t));
        if (hourRef.current) hourRef.current.textContent = hour(t);
      };

      const proxy = { t: 0.04 };
      render(proxy.t);
      gsap.to(proxy, {
        t: 0.96,
        ease: "none",
        onUpdate: () => render(proxy.t),
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=160%", pin: true, scrub: 1 },
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!introDone) {
        gsap.set("[data-title-line]", { autoAlpha: 0 });
        return;
      }
      const split = SplitText.create("[data-title-name]", { type: "chars" });
      gsap
        .timeline({ delay: 0.3 })
        .from("[data-title-line]", { autoAlpha: 0, y: 12, duration: 1.4, stagger: 0.25, ease: "power2.out" })
        .from(
          split.chars,
          { autoAlpha: 0, filter: "blur(14px)", scale: 1.08, duration: 1.8, stagger: 0.05, ease: "power3.out" },
          0.2,
        );
    },
    { scope: root, dependencies: [introDone], revertOnUpdate: true },
  );

  return (
    <section ref={root} id="accueil" data-chapter="Ouverture" className="relative h-svh overflow-hidden bg-black">
      <svg ref={svgRef} viewBox={`0 0 ${W} 900`} preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="lumiere-sky" x1="0" y1="0" x2="0" y2="1">
            <stop data-sky-top offset="0" stopColor={SKY[0].top} />
            <stop data-sky-bottom offset="1" stopColor={SKY[0].bottom} />
          </linearGradient>
          <radialGradient id="lumiere-sun">
            <stop offset="0" stopColor="#fff4d6" />
            <stop offset="0.25" stopColor="#f2a93b" stopOpacity="0.9" />
            <stop offset="1" stopColor="#f2a93b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lumiere-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a221b" />
            <stop offset="1" stopColor="#0b0a09" />
          </linearGradient>
        </defs>

        <rect width={W} height={GROUND} fill="url(#lumiere-sky)" />
        <g data-sun>
          <circle r="220" fill="url(#lumiere-sun)" opacity="0.55" />
          <circle r="34" fill="#fff1cf" />
        </g>
        <rect y={GROUND} width={W} height={900 - GROUND} fill="url(#lumiere-ground)" />

        {buildings.map((b) => (
          <polygon key={`s-${b.x}`} data-shadow fill="#000" opacity="0.55" />
        ))}

        {buildings.map((b) => (
          <g key={b.x}>
            <rect x={b.x} y={GROUND - b.h} width={b.w} height={b.h} fill="#17130f" />
            {Array.from({ length: Math.floor(b.h / 46) }, (_, r) => (
              <line
                key={r}
                x1={b.x + 14}
                x2={b.x + b.w - 14}
                y1={GROUND - b.h + 30 + r * 46}
                y2={GROUND - b.h + 30 + r * 46}
                stroke="#f3e6cf"
                strokeOpacity="0.08"
              />
            ))}
            <line data-lit y1={GROUND - b.h} y2={GROUND} stroke="#f2a93b" strokeWidth="3" />
          </g>
        ))}
        <line x1="0" x2={W} y1={GROUND} y2={GROUND} stroke="#f3e6cf" strokeOpacity="0.25" />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      <Letterbox />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-[var(--gutter)] text-center">
        <p data-title-line className="credits text-ink/80">
          Un portfolio de
        </p>
        <h1 data-title-name className="mt-6 font-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.9]">
          {identity.firstName} <span className="italic text-terra">{identity.lastName}</span>
        </h1>
        <p data-title-line className="credits mt-8 text-ink/80">
          {identity.title} — ENA Rabat {identity.graduation} — {identity.city}
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-[calc(7vh+1rem)] z-30 flex items-end justify-between px-[var(--gutter)]">
        <p data-title-line className="label text-ink/70">
          Étude d&apos;ombre — <span ref={hourRef} className="tabular-nums text-terra">07:30</span>
        </p>
        <p data-title-line className="label hidden text-ink/70 sm:block">
          Défilez : le soleil tourne ↓
        </p>
      </div>
    </section>
  );
}
