"use client";

import { useRef } from "react";
import { TechLogo } from "@/components/ui/Logos";
import { gsap, useGSAP } from "@/lib/gsap";
import { technologies } from "@/lib/content";
import { SceneHeading } from "./Scene";

const sprockets = {
  backgroundImage: "radial-gradient(circle at center, var(--color-paper) 0 38%, transparent 40%)",
  backgroundSize: "2.25rem 100%",
} as const;

export function FilmStrip() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-frame]").forEach((frame) => {
        gsap.from(frame.querySelector("[data-exposure]"), {
          scaleX: 0,
          ease: "power2.out",
          scrollTrigger: { trigger: frame, containerAnimation: tween, start: "left 85%", end: "left 45%", scrub: true },
        });
        gsap.fromTo(
          frame.querySelector("[data-frame-image]"),
          { filter: "brightness(0.35) blur(4px)" },
          {
            filter: "brightness(1) blur(0px)",
            ease: "none",
            scrollTrigger: { trigger: frame, containerAnimation: tween, start: "left 95%", end: "left 50%", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="technologies" data-chapter="Scène 02 — Technologies" className="relative flex h-svh flex-col justify-center overflow-hidden bg-night">
      <div ref={track} className="flex w-max items-center gap-0 will-change-transform">
        <div className="w-[min(36rem,85vw)] shrink-0 px-[var(--gutter)]">
          <SceneHeading scene="02" kicker="Technologies" title={<>Le <span className="italic text-terra">matériel</span></>} />
          <p className="mt-6 max-w-sm text-ink/70">
            {technologies.length} outils sur la bobine — du premier trait au rendu photoréaliste. Défilez pour dérouler la pellicule.
          </p>
        </div>

        <div className="bg-black py-3">
          <div className="h-5" style={sprockets} />
          <div className="flex gap-3 px-3 py-3">
            {technologies.map((t, i) => (
              <article key={t.symbol} data-frame className="w-[15rem] shrink-0 md:w-[18rem]">
                <div
                  data-frame-image
                  className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-sm"
                  style={{
                    background: `radial-gradient(120% 80% at ${30 + (i % 4) * 15}% 20%, color-mix(in oklab, var(--accent) ${18 + t.level / 5}%, #1a1510), #0b0a09 75%)`,
                  }}
                >
                  <div className="flex flex-col items-center gap-5">
                    <TechLogo
                      name={t.name}
                      className="size-24 shadow-[0_0_60px_-10px_var(--color-terra)] md:size-28"
                    />
                    <span className="font-display text-4xl italic leading-none text-ink/50">{t.symbol}</span>
                  </div>
                  <span className="label absolute left-3 top-3 text-ink/60">F-{String(i + 1).padStart(2, "0")}</span>
                  <span className="label absolute right-3 top-3 text-ink/60">{t.category}</span>
                </div>
                <div className="mt-3 flex items-baseline justify-between text-ink">
                  <h3 className="font-display text-2xl">{t.name}</h3>
                  <span className="label tabular-nums text-terra">{t.level}%</span>
                </div>
                <div className="mt-2 h-px bg-ink/15">
                  <div data-exposure className="h-px origin-left bg-terra" style={{ width: `${t.level}%` }} />
                </div>
              </article>
            ))}
          </div>
          <div className="h-5" style={sprockets} />
        </div>

        <div className="w-[20vw] shrink-0" />
      </div>
    </section>
  );
}
