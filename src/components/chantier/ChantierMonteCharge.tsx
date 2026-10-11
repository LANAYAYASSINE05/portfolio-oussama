"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { ScrollTrigger } from "@/lib/gsap";

const floors = [
  { id: "accueil", label: "Grue" },
  { id: "a-propos", label: "Permis" },
  { id: "projets", label: "Palissade" },
  { id: "technologies", label: "Conteneurs" },
  { id: "competences", label: "Coulage" },
  { id: "experience", label: "Planning" },
  { id: "formation", label: "Réception" },
  { id: "contact", label: "Base vie" },
];

/** Fixed construction hoist: the cage climbs the mast as the page scrolls down; each floor is a section. */
export function ChantierMonteCharge({ active }: { active: string }) {
  const { scrollTo } = useSite();
  const cage = useRef<HTMLSpanElement>(null);
  const [marks, setMarks] = useState<number[]>(() => floors.map((_, i) => i / (floors.length - 1)));

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      setMarks(floors.map((f) => Math.min(1, (document.getElementById(f.id)?.offsetTop ?? 0) / max)));
    };
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (cage.current) cage.current.style.bottom = `${self.progress * 100}%`;
      },
      onRefresh: measure,
    });
    measure();
    return () => st.kill();
  }, []);

  const level = Math.max(0, floors.findIndex((f) => f.id === active));

  return (
    <nav aria-label="Sections" className="group fixed right-2 top-1/2 z-40 hidden h-[62vh] -translate-y-1/2 lg:flex">
      <ul className="pointer-events-none relative mr-2 w-28 group-focus-within:pointer-events-auto group-hover:pointer-events-auto">
        {floors.map((f, i) => {
          const on = f.id === active;
          return (
            <li key={f.id} className="absolute right-0 translate-y-1/2" style={{ bottom: `${marks[i] * 100}%` }}>
              <button
                type="button"
                onClick={() => scrollTo(`#${f.id}`)}
                aria-current={on ? "true" : undefined}
                className={`flex items-center gap-1.5 whitespace-nowrap px-1.5 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] opacity-0 transition-[opacity,color] focus-visible:opacity-100 group-hover:opacity-100 ${
                  on ? "bg-terra text-[#111]" : "bg-night/90 text-graphite hover:text-ink"
                }`}
                data-cursor=""
              >
                <span className="opacity-60">{i === 0 ? "RDC" : `N${i}`}</span>
                {f.label}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="relative w-5">
        <span aria-hidden className="absolute inset-y-[-12px] left-1/2 w-2.5 -translate-x-1/2 border-x-2 border-terra bg-[repeating-linear-gradient(45deg,transparent_0_5px,var(--accent)_5px_6.5px)] opacity-80" />
        {marks.map((m, i) => (
          <span key={floors[i].id} aria-hidden className="absolute left-0 h-0.5 w-full bg-ink/40" style={{ bottom: `${m * 100}%` }} />
        ))}
        <span
          ref={cage}
          aria-hidden
          className="absolute left-1/2 grid h-8 w-6 -translate-x-1/2 translate-y-1/2 place-items-center border-2 border-[#111] bg-terra shadow-[0_6px_14px_rgb(0_0_0/0.6)] transition-[bottom] duration-150"
          style={{ bottom: "0%" }}
        >
          <span className="font-stencil text-sm leading-none text-[#111]">{level}</span>
        </span>
      </div>
    </nav>
  );
}
