"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { ScrollTrigger } from "@/lib/gsap";

const rooms = [
  { id: "accueil", label: "Établi" },
  { id: "a-propos", label: "Profil" },
  { id: "projets", label: "Vitrine" },
  { id: "technologies", label: "Caisse" },
  { id: "competences", label: "Découpe" },
  { id: "experience", label: "Coupe" },
  { id: "formation", label: "Jury" },
  { id: "contact", label: "Colis" },
];

/** Fixed tape measure: the blade extends with scroll progress, each section is a mark on the tape. */
export function MaquetteMetre({ active }: { active: string }) {
  const { scrollTo } = useSite();
  const blade = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [marks, setMarks] = useState<number[]>(() => rooms.map((_, i) => i / (rooms.length - 1)));

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      setMarks(rooms.map((r) => Math.min(1, (document.getElementById(r.id)?.offsetTop ?? 0) / max)));
    };
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (blade.current) blade.current.style.transform = `scaleX(${self.progress})`;
        if (counter.current) counter.current.textContent = String(Math.round(self.progress * 100));
      },
      onRefresh: measure,
    });
    measure();
    return () => st.kill();
  }, []);

  return (
    <nav aria-label="Sections" className="fixed bottom-5 left-[var(--gutter)] z-40 hidden items-end gap-3 lg:flex">
      <span className="relative grid size-16 shrink-0 place-items-center rounded-2xl bg-terra text-night shadow-[0_6px_0_#a8360c,0_12px_20px_rgb(0_0_0/0.5)]">
        <span className="grid size-10 place-items-center rounded-full bg-night/85 font-mono text-xs font-bold text-terra">
          <span>
            <span ref={counter}>0</span>
            <span className="text-[0.55rem]">cm</span>
          </span>
        </span>
      </span>

      <div className="relative mb-2 w-[min(56vw,46rem)]">
        <ul className="relative h-7">
          {rooms.map((r, i) => {
            const on = r.id === active;
            return (
              <li key={r.id} className="absolute bottom-0 -translate-x-1/2" style={{ left: `${marks[i] * 100}%` }}>
                <button
                  type="button"
                  onClick={() => scrollTo(`#${r.id}`)}
                  aria-current={on ? "true" : undefined}
                  className={`whitespace-nowrap rounded-[2px] px-1.5 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] transition-colors ${
                    on ? "bg-terra text-night" : "text-graphite hover:text-ink"
                  }`}
                  data-cursor=""
                >
                  {r.label}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="relative h-5 overflow-hidden rounded-r-sm bg-ink/10 backdrop-blur">
          <span
            ref={blade}
            className="absolute inset-0 block origin-left scale-x-0 bg-[#f2c94c]"
            style={{ backgroundImage: "repeating-linear-gradient(90deg, #2a2414 0 1px, transparent 1px 10px)", backgroundSize: "100% 45%", backgroundRepeat: "no-repeat" }}
          />
          {marks.map((m, i) => (
            <span key={rooms[i].id} aria-hidden className="absolute inset-y-0 w-0.5 bg-terra" style={{ left: `${m * 100}%` }} />
          ))}
        </div>
      </div>
    </nav>
  );
}
