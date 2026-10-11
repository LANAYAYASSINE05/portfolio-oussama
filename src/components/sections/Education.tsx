"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { certifications, education } from "@/lib/content";

type Item = (typeof education)[number];

function TiltCard({ item }: { item: Item }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 200, damping: 20 });
  const sy = useSpring(py, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const rotateY = useTransform(sx, [0, 1], [-12, 12]);
  const glareX = useTransform(sx, (v) => `${v * 100}%`);
  const glareY = useTransform(sy, (v) => `${v * 100}%`);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(260px circle at ${x} ${y}, color-mix(in oklab, var(--accent) 18%, transparent), transparent 70%)`,
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="[perspective:900px]">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden border border-ink bg-paper p-5"
        data-cursor=""
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glare }}
        />
        <div className="label relative flex justify-between text-graphite">
          <span>{item.level}</span>
          <span>{item.location}</span>
        </div>
        <p className="relative mt-8 font-display text-6xl leading-none text-terra" style={{ transform: "translateZ(40px)" }}>
          {item.year}
        </p>
        <h3 className="relative mt-4 font-display text-3xl leading-tight" style={{ transform: "translateZ(30px)" }}>
          {item.title}
        </h3>
        <p className="relative mt-1 text-sm font-medium">{item.school}</p>
        <p className="relative mt-4 text-sm leading-relaxed text-graphite">{item.detail}</p>
      </motion.div>
    </div>
  );
}

export function Education() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-foundations]", start: "top 75%" } });
      tl.from("[data-ground]", { scaleX: 0, duration: 1.4, ease: "expo.inOut" })
        .from("[data-pile]", { scaleY: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }, 0.6)
        .from(
          "[data-edu-card]",
          { y: -40, autoAlpha: 0, clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, stagger: 0.12 },
          0.9,
        );

      gsap.from("[data-cert]", {
        x: -30,
        autoAlpha: 0,
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-certs]", start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="formation" ref={root} className="relative px-[var(--gutter)] py-[16vh]">
      <div className="mb-20 grid grid-cols-4 gap-[var(--gutter)] md:grid-cols-12">
        <p className="label col-span-4 text-graphite md:col-span-3">( 05 ) Formation</p>
        <h2 className="col-span-4 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92] md:col-span-9">
          Les <span className="italic text-terra">fondations</span>.
        </h2>
      </div>

      <div data-foundations className="relative">
        <div data-ground className="h-px origin-left bg-ink" />
        <div
          className="h-6 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, var(--color-ink) 0 1px, transparent 1px 10px)",
          }}
        />
        <p className="label mt-2 text-graphite">± 0.00 — Niveau du sol</p>

        <div className="mt-2 grid gap-[var(--gutter)] sm:grid-cols-2 lg:grid-cols-4">
          {education.map((item, i) => (
            <div key={item.title} className="flex flex-col items-stretch">
              <div
                data-pile
                className="mx-auto w-px origin-top bg-ink"
                style={{ height: `${3 + i * 2.5}rem` }}
              />
              <div data-edu-card>
                <TiltCard item={item} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div data-certs className="mt-20 grid grid-cols-4 gap-[var(--gutter)] border-t border-line pt-6 md:grid-cols-12">
        <p className="label col-span-4 text-graphite md:col-span-3">Spécialités</p>
        <ul className="col-span-4 space-y-3 md:col-span-9">
          {certifications.map((c, i) => (
            <li key={c} data-cert className="flex items-baseline gap-4 text-xl md:text-2xl">
              <span className="label text-terra">0{i + 1}</span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
