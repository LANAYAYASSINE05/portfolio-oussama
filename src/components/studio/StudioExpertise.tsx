"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects, qualities, skills } from "@/lib/content";
import { SectionHead } from "./SectionHead";
import { ProjectImage } from "./StudioVisual";

export function StudioExpertise() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  useGSAP(
    () => {
      gsap.from("[data-skill-bar]", {
        scaleX: 0,
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: list.current, start: "top 80%" },
      });
    },
    { scope: root },
  );

  const onMove = (e: React.PointerEvent) => {
    const r = list.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <section id="competences" ref={root} className="bg-paper-2 px-[var(--gutter)] py-[16vh]">
      <SectionHead index="04" label="Compétences" title="Savoir-faire" />

      <ul ref={list} className="relative border-t border-ink" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
        {skills.map((s, i) => (
          <li
            key={s.name}
            onPointerEnter={() => setHover(i)}
            className="group grid grid-cols-12 items-center gap-x-[var(--gutter)] border-b border-line py-6 md:py-8"
          >
            <span className="studio-caps col-span-2 text-graphite md:col-span-1">0{i + 1}</span>
            <span className="col-span-7 font-display text-[clamp(1.5rem,3.2vw,3.25rem)] leading-tight transition-transform duration-700 ease-archi group-hover:translate-x-4 md:col-span-7">
              {s.name}
            </span>
            <span className="hidden md:col-span-3 md:block">
              <span className="block h-px bg-line">
                <span data-skill-bar className="block h-px origin-left bg-ink" style={{ width: `${s.level}%` }} />
              </span>
            </span>
            <span className="col-span-3 text-right font-display text-2xl tabular-nums md:col-span-1">{s.level}%</span>
          </li>
        ))}

        <AnimatePresence>
          {hover !== null && (
            <motion.div
              key="preview"
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-10 hidden w-64 -translate-x-1/2 -translate-y-1/2 overflow-hidden md:block lg:w-80"
              style={{ x: sx, y: sy }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.35 }}
            >
              <div className="relative aspect-[4/5]">
                <ProjectImage project={projects[hover % projects.length]} sizes="20rem" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 font-display text-5xl text-white">
                  {skills[hover].level}%
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ul>

      <div className="mt-20 grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6">
        <p className="studio-caps col-span-12 text-graphite md:col-span-3">Qualités</p>
        <p data-reveal className="col-span-12 font-display text-[clamp(1.5rem,2.6vw,2.5rem)] leading-snug md:col-span-9">
          {qualities.map((q, i) => (
            <span key={q}>
              {q}
              {i < qualities.length - 1 && <span className="px-3 text-terra">/</span>}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
