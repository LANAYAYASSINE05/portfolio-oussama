"use client";

import { createTimeline, stagger, svg } from "animejs";
import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { identity } from "@/lib/content";
import { useMediaQuery } from "@/lib/useMediaQuery";

const COLUMNS = 6;

export function Preloader() {
  const { finishIntro } = useSite();
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reduced) {
      finishIntro();
      return;
    }
    const root = rootRef.current;
    const drawing = svgRef.current;
    if (!root || !drawing) return;

    const counter = { value: 0 };
    const lines = svg.createDrawable(drawing.querySelectorAll("path, line, rect, circle"));

    const tl = createTimeline({ defaults: { ease: "inOutQuad" } })
      .add(lines, { draw: ["0 0", "0 1"], duration: 1600, delay: stagger(45) }, 0)
      .add(
        counter,
        {
          value: 100,
          duration: 2200,
          ease: "inOutQuart",
          onUpdate: () => {
            if (countRef.current)
              countRef.current.textContent = Math.round(counter.value).toString().padStart(3, "0");
          },
        },
        0,
      )
      .add(root.querySelectorAll("[data-pre-fade]"), { opacity: [1, 0], duration: 400 }, 2300)
      .add(lines, { draw: ["0 1", "1 1"], duration: 700, delay: stagger(15) }, 2250)
      .add(
        root.querySelectorAll("[data-pre-col]"),
        {
          translateY: ["0%", "-101%"],
          duration: 900,
          ease: "inOutExpo",
          delay: stagger(70, { from: "center" }),
          onBegin: () => finishIntro(),
        },
        2700,
      )
      .call(() => setGone(true));

    return () => {
      tl.revert();
    };
  }, [finishIntro, reduced]);

  if (gone || reduced) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[95] text-on-night" aria-hidden>
      <div className="absolute inset-0 flex">
        {Array.from({ length: COLUMNS }).map((_, i) => (
          <div key={i} data-pre-col className="h-full flex-1 bg-night" style={{ marginLeft: -1 }} />
        ))}
      </div>

      <div className="relative flex h-full flex-col justify-between p-[var(--gutter)]">
        <div data-pre-fade className="label flex justify-between opacity-70">
          <span>{identity.name}</span>
          <span>{identity.role}</span>
        </div>

        <div data-pre-fade className="flex flex-1 items-center justify-center">
          <svg ref={svgRef} viewBox="0 0 240 300" className="h-[42vh] w-auto stroke-draw text-on-night">
            <rect x="10" y="10" width="220" height="280" />
            <line x1="10" y1="250" x2="230" y2="250" />
            <path d="M60 250 L60 130 A60 60 0 0 1 180 130 L180 250" />
            <path d="M75 250 L75 135 A45 45 0 0 1 165 135 L165 250" />
            <path d="M52 128 Q120 30 188 128" />
            <line x1="120" y1="10" x2="120" y2="290" />
            <line x1="10" y1="130" x2="230" y2="130" />
            <circle cx="120" cy="130" r="12" />
            <line x1="30" y1="270" x2="210" y2="270" />
            <line x1="30" y1="265" x2="30" y2="275" />
            <line x1="210" y1="265" x2="210" y2="275" />
          </svg>
        </div>

        <div data-pre-fade className="flex items-end justify-between">
          <span className="label opacity-70">Chargement du plan</span>
          <span className="font-display text-[clamp(4rem,12vw,10rem)] leading-none tabular-nums">
            <span ref={countRef}>000</span>
          </span>
        </div>
      </div>
    </div>
  );
}
