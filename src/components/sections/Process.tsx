"use client";

import { createTimeline, stagger, svg, utils } from "animejs";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { process } from "@/lib/content";

function Section() {
  return (
    <svg viewBox="0 0 500 500" className="stroke-draw h-full w-full" aria-hidden>
      <g data-phase="0">
        <path d="M20 400 L480 400" />
        <path d="M20 400 Q120 380 200 400 T480 392" strokeDasharray="3 5" />
        <path d="M60 470 L440 470" />
        <path d="M250 30 L250 480" strokeDasharray="2 8" />
        <circle cx="420" cy="80" r="26" />
        <path d="M420 40 L420 46 M420 114 L420 120 M380 80 L386 80 M454 80 L460 80" />
      </g>
      <g data-phase="1">
        <path d="M90 400 L90 180 L250 120 L410 180 L410 400" />
        <path d="M90 180 L410 180" />
        <path d="M410 260 L470 260 L470 400" />
        <path d="M90 400 L90 440 L410 440 L410 400" />
      </g>
      <g data-phase="2">
        <path d="M90 260 L410 260" />
        <path d="M90 330 L410 330" />
        <path d="M150 400 L150 350 L190 350 L190 400" />
        <path d="M230 240 L230 200 L300 200 L300 240 Z" />
        <path d="M320 320 L320 280 L380 280 L380 320 Z" />
        <path d="M120 320 L120 280 L180 280 L180 320 Z" />
        <path d="M260 330 L300 260 M280 330 L320 260" />
        <path d="M250 120 L250 60 L280 60 L280 130" />
      </g>
      <g data-phase="3">
        <path d="M100 440 L120 460 M140 440 L160 460 M180 440 L200 460 M220 440 L240 460 M260 440 L280 460 M300 440 L320 460 M340 440 L360 460" />
        <path d="M330 400 L330 372 M330 378 L322 390 M330 378 L338 390 M330 400 L324 412 M330 400 L336 412" />
        <circle cx="330" cy="366" r="5" />
        <path d="M440 400 L440 340 M425 360 Q440 320 455 360 Z" />
        <path d="M40 140 L80 160 M40 160 L80 180 M40 180 L80 200" />
        <path d="M20 480 L120 480 M20 475 L20 485 M120 475 L120 485" />
      </g>
    </svg>
  );
}

export function Process() {
  const root = useRef<HTMLElement>(null);
  const drawing = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useGSAP(
    () => {
      const svgEl = drawing.current!;
      const tl = createTimeline({ autoplay: false, defaults: { ease: "inOutSine" } });

      for (let phase = 0; phase < 4; phase++) {
        const paths = svg.createDrawable(svgEl.querySelectorAll(`[data-phase="${phase}"] path, [data-phase="${phase}"] circle`));
        utils.set(paths, { draw: "0 0" });
        tl.add(paths, { draw: ["0 0", "0 1"], duration: 1000, delay: stagger(80) }, phase * 1000);
      }

      ScrollTrigger.create({
        trigger: "[data-process-steps]",
        start: "top 60%",
        end: "bottom 60%",
        scrub: true,
        onUpdate: (self) => {
          tl.progress = self.progress;
          setStep(Math.min(3, Math.floor(self.progress * 4)));
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-process-step]").forEach((el) => {
        gsap.from(el.querySelectorAll("[data-reveal]"), {
          y: 40,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1,
          scrollTrigger: { trigger: el, start: "top 75%" },
        });
      });

      return () => tl.revert();
    },
    { scope: root },
  );

  return (
    <section id="processus" ref={root} className="relative bg-night px-[var(--gutter)] py-[16vh] text-on-night">
      <div className="mb-20 grid grid-cols-4 gap-[var(--gutter)] md:grid-cols-12">
        <p className="label col-span-4 text-on-night/50 md:col-span-3">( 08 ) Processus</p>
        <h2 className="col-span-4 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92] md:col-span-9">
          Du croquis <span className="italic text-terra">au chantier</span>.
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-[var(--gutter)] md:grid-cols-12">
        <div className="col-span-4 md:col-span-6">
          <div className="sticky top-[calc(var(--header-h)+2rem)] aspect-square w-full border border-on-night/15">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgb(236_232_225/0.08)_1px,transparent_1px),linear-gradient(90deg,rgb(236_232_225/0.08)_1px,transparent_1px)] [background-size:2rem_2rem]" />
            <div ref={drawing} className="absolute inset-[6%] text-on-night">
              <Section />
            </div>
            <div className="label absolute bottom-3 left-3 right-3 flex justify-between text-on-night/60">
              <span>Coupe AA — 1/100</span>
              <span>
                Phase {String(step + 1).padStart(2, "0")} / 04
              </span>
            </div>
          </div>
        </div>

        <ol data-process-steps className="col-span-4 md:col-span-5 md:col-start-8">
          {process.map((p, i) => (
            <li
              key={p.step}
              data-process-step
              className="flex min-h-[60vh] flex-col justify-center border-t border-on-night/15 py-12 transition-opacity duration-700"
              style={{ opacity: step === i ? 1 : 0.35 }}
            >
              <span data-reveal className="font-mono text-sm text-terra">
                {p.step}
              </span>
              <h3 data-reveal className="mt-4 font-display text-5xl md:text-6xl">
                {p.title}
              </h3>
              <p data-reveal className="mt-6 max-w-md text-lg leading-snug text-on-night/70">
                {p.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
