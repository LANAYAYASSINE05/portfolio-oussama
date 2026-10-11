"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { bio, identity, languages, manifesto, stats } from "@/lib/content";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

function Portrait() {
  return (
    <div data-portrait className="relative aspect-[3/4] w-full overflow-hidden bg-paper-2">
      <div data-portrait-inner className="absolute inset-[-10%]">
        {identity.portrait ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={identity.portrait} alt={identity.name} className="h-full w-full object-cover grayscale" />
        ) : (
          <div className="blueprint-fine grid h-full w-full place-items-center">
            <span className="font-display text-[clamp(8rem,18vw,16rem)] italic leading-none text-ink/10">OZ</span>
          </div>
        )}
      </div>
      {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"].map((c) => (
        <span key={c} className={`absolute size-5 border-ink ${c}`} />
      ))}
      <span className="label absolute bottom-4 left-1/2 -translate-x-1/2 text-graphite">Portrait — 3:4</span>
    </div>
  );
}

export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create("[data-manifesto]", { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-manifesto]", start: "top 75%", end: "bottom 45%", scrub: true },
        },
      );

      gsap.fromTo(
        "[data-portrait]",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "expo.inOut",
          scrollTrigger: { trigger: "[data-portrait]", start: "top 80%" },
        },
      );
      gsap.fromTo(
        "[data-portrait-inner]",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: "[data-portrait]", start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      gsap.from("[data-about-reveal]", {
        y: 40,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1.1,
        scrollTrigger: { trigger: "[data-about-bio]", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="a-propos" ref={root} className="relative px-[var(--gutter)] py-[16vh]">
      <div className="grid grid-cols-4 gap-[var(--gutter)] md:grid-cols-12">
        <p className="label col-span-4 text-graphite md:col-span-3">( 01 ) À propos</p>
        <p
          data-manifesto
          className="col-span-4 mt-8 font-display text-[clamp(2rem,4.6vw,4.75rem)] leading-[1.05] tracking-[-0.01em] md:col-span-9 md:mt-0"
        >
          {manifesto}
        </p>
      </div>

      <div className="mt-[12vh] grid grid-cols-4 gap-[var(--gutter)] md:grid-cols-12">
        <div className="col-span-4 md:col-span-4">
          <Portrait />
        </div>

        <div data-about-bio className="col-span-4 flex flex-col justify-between gap-12 md:col-span-7 md:col-start-6">
          <div className="space-y-6">
            {bio.map((p) => (
              <p key={p.slice(0, 20)} data-about-reveal className="text-xl leading-snug md:text-2xl">
                {p}
              </p>
            ))}
          </div>

          <div data-about-reveal className="grid grid-cols-3 gap-4 border-t border-line pt-4">
            {languages.map((l) => (
              <div key={l.name}>
                <p className="font-display text-3xl">{l.name}</p>
                <p className="label text-graphite">{l.level}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} data-about-reveal className="flex flex-col justify-between gap-6 border-b border-r border-line p-4">
                <span className="label text-graphite">0{i + 1}</span>
                <span className="font-display text-6xl leading-none">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span className="label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
