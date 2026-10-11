"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useRef, useState } from "react";
import { TechLogo } from "@/components/ui/Logos";
import { gsap, useGSAP } from "@/lib/gsap";
import { techCategories, technologies, type TechCategory, type Technology } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;
type Filter = TechCategory | "Tous";

function Tile({ tech, number }: { tech: Technology; number: number }) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.6, ease }}
      className="list-none"
    >
      <div
        data-tile
        onPointerMove={onMove}
        data-cursor=""
        className="group relative flex aspect-square flex-col justify-between overflow-hidden border border-ink/80 bg-paper p-3 transition-colors duration-500 hover:bg-ink hover:text-paper"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--accent) 45%, transparent), transparent 70%)",
          }}
        />
        <div className="label relative flex justify-between">
          <span>{String(number).padStart(2, "0")}</span>
          <span className="opacity-60">{tech.level}%</span>
        </div>
        <div className="relative flex items-end justify-between">
          <TechLogo
            name={tech.name}
            className="size-[clamp(2.75rem,4.5vw,3.75rem)] transition-transform duration-700 ease-archi group-hover:-rotate-6 group-hover:scale-110"
          />
          <span className="font-display text-2xl leading-none opacity-40">{tech.symbol}</span>
        </div>
        <div className="relative">
          <p className="text-sm font-medium">{tech.name}</p>
          <div className="mt-2 h-px w-full bg-current/20">
            <div
              className="h-full origin-left bg-terra transition-transform duration-700 ease-archi group-hover:scale-x-100"
              style={{ width: `${tech.level}%`, transform: "scaleX(0.15)" }}
            />
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export function Technologies() {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>("Tous");
  const filters: Filter[] = ["Tous", ...techCategories];
  const visible = filter === "Tous" ? technologies : technologies.filter((t) => t.category === filter);

  useGSAP(
    () => {
      gsap.from("[data-tile]", {
        autoAlpha: 0,
        rotateX: -90,
        transformOrigin: "50% 0%",
        duration: 1.1,
        stagger: { each: 0.05, from: "random" },
        scrollTrigger: { trigger: "[data-tiles]", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="technologies" ref={root} className="relative bg-paper-2 px-[var(--gutter)] py-[16vh]">
      <div className="mb-14 grid grid-cols-4 gap-[var(--gutter)] md:grid-cols-12">
        <p className="label col-span-4 text-graphite md:col-span-3">( 02 ) Technologies</p>
        <div className="col-span-4 md:col-span-9">
          <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92]">
            Tableau périodique <span className="italic text-terra">des outils</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-graphite">
            Les logiciels qui accompagnent chaque phase — du premier trait à la maquette BIM, jusqu&apos;au
            rendu photoréaliste.
          </p>
        </div>
      </div>

      <LayoutGroup>
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className="label relative rounded-full border border-ink px-4 py-2"
              data-cursor=""
            >
              {filter === f && (
                <motion.span
                  layoutId="tech-filter"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative transition-colors duration-300 ${filter === f ? "text-paper" : ""}`}>
                {f}
              </span>
            </button>
          ))}
        </div>

        <motion.ul
          layout
          data-tiles
          className="grid grid-cols-2 gap-2 [perspective:1200px] sm:grid-cols-4 lg:grid-cols-8"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((t) => (
              <Tile key={t.symbol} tech={t} number={technologies.indexOf(t) + 1} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      <div className="label mt-8 flex flex-wrap gap-x-8 gap-y-2 text-graphite">
        {techCategories.map((c) => (
          <span key={c}>
            {c} — {technologies.filter((t) => t.category === c).length}
          </span>
        ))}
      </div>
    </section>
  );
}
