"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { bio, identity, languages, manifesto, stats } from "@/lib/content";
import { BentoSection, Tile, TileLabel } from "./Tile";

const languageLevel: Record<string, number> = {
  "Langue maternelle": 5,
  Courant: 4,
  Professionnel: 3,
};

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = String(Math.round(v)).padStart(2, "0");
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      00
    </span>
  );
}

export function AboutGrid() {
  return (
    <BentoSection id="a-propos" index="01 — À propos" title={<>À propos<span className="text-terra">.</span></>}>
      <Tile tone="dark" className="col-span-2 flex min-h-[22rem] flex-col justify-between gap-10 md:col-span-6 lg:col-span-7">
        <TileLabel>Manifeste</TileLabel>
        <blockquote className="font-display text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.02]">
          <span className="text-terra">“</span>
          {manifesto}
          <span className="text-terra">”</span>
        </blockquote>
        <p className="label opacity-60">— {identity.name}</p>
      </Tile>

      <Tile className="col-span-2 flex flex-col justify-between gap-8 md:col-span-6 lg:col-span-5">
        <TileLabel>Profil</TileLabel>
        <div className="space-y-4 text-lg leading-relaxed">
          {bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Tile>

      {stats.map((s, i) => (
        <Tile key={s.label} tone={i === 0 ? "accent" : "light"} className="flex aspect-square flex-col justify-between md:col-span-3 md:aspect-auto md:min-h-48 lg:col-span-3">
          <TileLabel>0{i + 1}</TileLabel>
          <div>
            <p className="font-display text-[clamp(3.5rem,6vw,6rem)] leading-none">
              <Counter value={s.value} />
            </p>
            <p className="label mt-2 opacity-70">{s.label}</p>
          </div>
        </Tile>
      ))}

      <Tile className="col-span-2 md:col-span-6 lg:col-span-7">
        <TileLabel>Langues</TileLabel>
        <ul className="mt-6 divide-y divide-line">
          {languages.map((l) => (
            <li key={l.name} className="flex items-center justify-between gap-4 py-4">
              <span className="font-display text-3xl">{l.name}</span>
              <span className="flex items-center gap-4">
                <span className="label hidden text-graphite sm:inline">{l.level}</span>
                <span className="flex gap-1">
                  {Array.from({ length: 5 }, (_, k) => (
                    <span
                      key={k}
                      className={`h-6 w-2 rounded-full ${k < (languageLevel[l.level] ?? 3) ? "bg-terra" : "bg-line"}`}
                    />
                  ))}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Tile>

      <Tile tone="ghost" className="col-span-2 flex flex-col justify-between gap-8 md:col-span-6 lg:col-span-5">
        <TileLabel>École</TileLabel>
        <p className="font-display text-4xl leading-[0.95]">{identity.school}</p>
        <p className="label flex justify-between text-graphite">
          <span>2020 — {identity.graduation} · Diplômé</span>
          <span>{identity.city}</span>
        </p>
      </Tile>
    </BentoSection>
  );
}
