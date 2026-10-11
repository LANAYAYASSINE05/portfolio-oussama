"use client";

import { animate as animeAnimate, stagger, svg, utils } from "animejs";
import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { identity } from "@/lib/content";
import { useDesk } from "./DeskProvider";

const UNIT = 24;
const MIN_SCALE = 0.35;
const MAX_SCALE = 4;

function SitePlan({ svgRef }: { svgRef: React.RefObject<SVGSVGElement | null> }) {
  const trees = [
    [140, 160, 26],
    [200, 600, 34],
    [1040, 140, 30],
    [1080, 560, 22],
    [980, 640, 28],
    [120, 420, 20],
  ];
  return (
    <svg ref={svgRef} viewBox="0 0 1200 800" className="h-full w-full opacity-0" fill="none" strokeWidth="1.2" aria-hidden>
      <g stroke="var(--color-l-red)" strokeDasharray="10 6 2 6">
        <path d="M60 80 L1140 60 L1160 720 L80 740 Z" />
      </g>

      <g stroke="var(--color-l-green)" strokeOpacity="0.8">
        {trees.map(([x, y, r]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={r} />
            <circle cx={x} cy={y} r={r * 0.25} />
          </g>
        ))}
        <path d="M300 690 C420 640 520 700 640 660 S860 620 940 680" />
      </g>

      <g stroke="var(--color-fg)">
        <rect x="320" y="200" width="520" height="320" />
        <rect x="332" y="212" width="496" height="296" strokeOpacity="0.5" />
        <path d="M320 360 L600 360 M600 200 L600 520 M720 200 L720 410 M600 410 L840 410" />
        <path d="M460 360 A50 50 0 0 1 510 310 M600 470 A40 40 0 0 0 640 510" />
        <rect x="620" y="430" width="200" height="70" />
        <path d="M640 465 L800 465" strokeOpacity="0.5" />
        <path d="M840 300 L940 300 L940 420 L840 420" />
        <circle cx="380" cy="460" r="22" />
      </g>

      <g stroke="var(--color-l-cyan)" strokeOpacity="0.9">
        <path d="M320 160 L840 160 M320 150 L320 170 M840 150 L840 170" />
        <path d="M280 200 L280 520 M270 200 L290 200 M270 520 L290 520" />
        <path d="M600 560 L600 600 M720 560 L720 600" strokeDasharray="3 4" />
      </g>

      <g stroke="var(--color-l-yellow)">
        <circle cx="1070" cy="330" r="34" />
        <path d="M1070 280 L1086 340 L1070 330 L1054 340 Z" />
      </g>

      <g className="font-mono" fill="var(--color-muted)" stroke="none" fontSize="12" letterSpacing="2">
        <text x="548" y="150">21.60 m</text>
        <text x="250" y="365" transform="rotate(-90 250 365)">13.30 m</text>
        <text x="380" y="300">SÉJOUR</text>
        <text x="630" y="300">CUISINE</text>
        <text x="740" y="300">SUITE</text>
        <text x="680" y="455">PISCINE</text>
        <text x="1062" y="390" fill="var(--color-l-yellow)">N</text>
        <text x="84" y="64" fill="var(--color-l-red)">LIMITE DE PARCELLE</text>
      </g>

      <g data-cartouche>
        <rect x="820" y="590" width="320" height="130" stroke="var(--color-fg)" />
        <path d="M820 626 L1140 626 M820 660 L1140 660 M820 690 L1140 690 M980 660 L980 720" stroke="var(--color-edge-2)" />
        <g className="font-mono" stroke="none" fontSize="11" letterSpacing="1.5" fill="var(--color-muted)">
          <text x="832" y="614" fill="var(--color-fg)" fontSize="14">{identity.name.toUpperCase()}</text>
          <text x="832" y="648">{identity.role.toUpperCase()} — ENA RABAT</text>
          <text x="832" y="680">PORTFOLIO — PLAN DE MASSE</text>
          <text x="832" y="710">ÉCH. 1/100</text>
          <text x="992" y="710">FEUILLE A-01 · 2026</text>
        </g>
      </g>
    </svg>
  );
}

export function ModelSpace() {
  const desk = useDesk();
  const { cursor, snap, grid, booted, zoomExtentsRef } = desk;
  const root = useRef<HTMLDivElement>(null);
  const planRef = useRef<SVGSVGElement>(null);

  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const scale = useMotionValue(1);
  const hairX = useMotionValue(-100);
  const hairY = useMotionValue(-100);
  const hairOpacity = useMotionValue(0);

  const minor = useTransform(scale, (s) => UNIT * s);
  const major = useTransform(scale, (s) => UNIT * 5 * s);
  const backgroundSize = useMotionTemplate`${major}px ${major}px, ${major}px ${major}px, ${minor}px ${minor}px, ${minor}px ${minor}px`;
  const backgroundPosition = useMotionTemplate`calc(50% + ${panX}px) calc(50% + ${panY}px)`;
  const readout = useTransform(() => `${cursor.x.get().toFixed(2)} , ${cursor.y.get().toFixed(2)}`);

  useEffect(() => {
    zoomExtentsRef.current = () => {
      const opts = { type: "spring", stiffness: 160, damping: 26 } as const;
      animate(panX, 0, opts);
      animate(panY, 0, opts);
      animate(scale, 1, opts);
    };
  }, [zoomExtentsRef, panX, panY, scale]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      const px = e.clientX - r.left - r.width / 2;
      const py = e.clientY - r.top - r.height / 2;
      const s = scale.get();
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * Math.exp(-e.deltaY * 0.0015)));
      const k = next / s;
      panX.set(px - (px - panX.get()) * k);
      panY.set(py - (py - panY.get()) * k);
      scale.set(next);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [panX, panY, scale]);

  useEffect(() => {
    if (!booted || !planRef.current) return;
    const svgEl = planRef.current;
    const drawables = svg.createDrawable(svgEl.querySelectorAll("path, rect, circle"));
    utils.set(drawables, { draw: "0 0" });
    utils.set(svgEl.querySelectorAll("text"), { opacity: 0 });
    svgEl.style.opacity = "1";
    const lines = animeAnimate(drawables, {
      draw: ["0 0", "0 1"],
      duration: 1600,
      delay: stagger(28),
      ease: "inOutQuad",
    });
    const labels = animeAnimate(svgEl.querySelectorAll("text"), {
      opacity: [0, 1],
      duration: 600,
      delay: stagger(60, { start: 1400 }),
    });
    return () => {
      lines.revert();
      labels.revert();
    };
  }, [booted]);

  const pan = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const sx = e.clientX - r.left;
    const sy = e.clientY - r.top;
    hairX.set(sx);
    hairY.set(sy);
    if (pan.current) {
      panX.set(pan.current.px + e.clientX - pan.current.x);
      panY.set(pan.current.py + e.clientY - pan.current.y);
    }
    const s = scale.get();
    let wx = (sx - r.width / 2 - panX.get()) / (UNIT * s);
    let wy = -(sy - r.height / 2 - panY.get()) / (UNIT * s);
    if (snap) {
      wx = Math.round(wx * 2) / 2;
      wy = Math.round(wy * 2) / 2;
    }
    cursor.x.set(wx);
    cursor.y.set(wy);
  };

  return (
    <div
      ref={root}
      onPointerMove={onPointerMove}
      onPointerEnter={() => hairOpacity.set(1)}
      onPointerLeave={() => {
        hairOpacity.set(0);
        pan.current = null;
      }}
      onPointerDown={(e) => {
        if (e.button !== 0 && e.button !== 1) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        pan.current = { x: e.clientX, y: e.clientY, px: panX.get(), py: panY.get() };
      }}
      onPointerUp={() => {
        pan.current = null;
      }}
      onDoubleClick={() => zoomExtentsRef.current()}
      className="absolute inset-0 cursor-none touch-none overflow-hidden"
      aria-label="Espace objet — glisser pour déplacer, molette pour zoomer"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: grid ? 1 : 0,
          backgroundSize,
          backgroundPosition,
          backgroundImage:
            "linear-gradient(var(--color-edge) 1px, transparent 1px), linear-gradient(90deg, var(--color-edge) 1px, transparent 1px), linear-gradient(rgb(255 255 255 / 0.025) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.025) 1px, transparent 1px)",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 aspect-[3/2] w-[min(1200px,110%)] -translate-x-1/2 -translate-y-1/2"
        style={{ x: panX, y: panY, scale }}
      >
        <SitePlan svgRef={planRef} />
      </motion.div>

      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity: hairOpacity }}>
        <motion.div className="absolute inset-x-0 top-0 h-px bg-fg/60" style={{ y: hairY }} />
        <motion.div className="absolute inset-y-0 left-0 w-px bg-fg/60" style={{ x: hairX }} />
        <motion.div
          className="absolute -left-[6px] -top-[6px] size-3 border border-fg"
          style={{ x: hairX, y: hairY }}
        />
        <motion.div
          className="label absolute left-4 top-4 whitespace-nowrap rounded-sm border border-select/60 bg-panel/90 px-1.5 py-0.5 text-select"
          style={{ x: hairX, y: hairY }}
        >
          {readout}
        </motion.div>
      </motion.div>
    </div>
  );
}
