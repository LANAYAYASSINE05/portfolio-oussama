"use client";

import { animate as animeAnimate, svg } from "animejs";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { PlanDrawing, DRAWABLE } from "@/components/drawings/PlanDrawing";
import { Magnetic } from "@/components/ui/Magnetic";
import { gsap, useGSAP } from "@/lib/gsap";

function GsapDemo() {
  const scope = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope });

  const play = contextSafe(() => {
    gsap.fromTo(
      "[data-demo-bar]",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, stagger: 0.08, ease: "expo.out", transformOrigin: "left" },
    );
  });

  return (
    <div ref={scope} className="flex h-full flex-col justify-between gap-6">
      <div className="space-y-2">
        {[100, 75, 90, 55].map((w, i) => (
          <div key={i} data-demo-bar className="h-3 bg-ink" style={{ width: `${w}%` }} />
        ))}
      </div>
      <button type="button" onClick={play} className="label w-fit border border-ink px-3 py-2" data-cursor="">
        Rejouer — expo.out
      </button>
    </div>
  );
}

function AnimeDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const play = () => {
    if (!ref.current) return;
    const paths = svg.createDrawable(ref.current.querySelectorAll(DRAWABLE));
    animeAnimate(paths, { draw: ["0 0", "0 1"], duration: 1600, ease: "inOutQuad" });
  };
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div ref={ref} className="h-40">
        <PlanDrawing variant="pavilion" className="h-full w-full" />
      </div>
      <button type="button" onClick={play} className="label w-fit border border-ink px-3 py-2" data-cursor="">
        Tracer — svg.createDrawable
      </button>
    </div>
  );
}

function MotionSpringDemo() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div className="relative h-16 border border-line" onClick={() => setOn((v) => !v)} data-cursor="">
        <motion.div
          className="absolute top-1/2 size-10 -translate-y-1/2 bg-terra"
          animate={{ left: on ? "calc(100% - 2.75rem)" : "0.25rem", rotate: on ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        />
      </div>
      <Magnetic className="w-fit">
        <span className="label inline-block rounded-full border border-ink px-4 py-2" data-cursor="">
          Bouton magnétique
        </span>
      </Magnetic>
    </div>
  );
}

export function MotionDemo() {
  const cards = [
    { lib: "GSAP", role: "Timelines, ScrollTrigger, SplitText", demo: <GsapDemo /> },
    { lib: "Anime.js", role: "Tracés SVG, préchargeur, coupes", demo: <AnimeDemo /> },
    { lib: "Motion", role: "Interactions, ressorts, layout", demo: <MotionSpringDemo /> },
  ];
  return (
    <div className="grid gap-[var(--gutter)] md:grid-cols-3">
      {cards.map((c) => (
        <div key={c.lib} className="flex min-h-80 flex-col gap-6 border border-line bg-paper p-5">
          <div>
            <p className="font-display text-3xl">{c.lib}</p>
            <p className="label text-graphite">{c.role}</p>
          </div>
          <div className="flex-1">{c.demo}</div>
        </div>
      ))}
    </div>
  );
}
