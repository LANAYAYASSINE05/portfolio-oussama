"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { ProjectImage } from "@/components/studio/StudioVisual";
import { projects } from "@/lib/content";
import { BlocTitle, pop } from "./shared";

export function BlocDossiers() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const project = projects[index];
  const color = pop(index);

  const go = (next: number) => setState([(next + projects.length) % projects.length, next > index ? 1 : -1]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  };

  return (
    <section id="projets" data-room="projets" className="px-[var(--gutter)] py-[14vh]">
      <BlocTitle
        index={2}
        tag="Projets"
        color="bg-pop-blue"
        title="Quatre dossiers, ouvrez-les."
        aside={
          <div className="flex gap-3">
            <button type="button" onClick={() => go(index - 1)} aria-label="Projet précédent" className="bloc-box bloc-press grid size-14 place-items-center bg-paper" data-cursor="">
              <ArrowLeft aria-hidden strokeWidth={2.5} className="size-6" />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Projet suivant" className="bloc-box bloc-press grid size-14 place-items-center bg-pop-lime text-night" data-cursor="">
              <ArrowRight aria-hidden strokeWidth={2.5} className="size-6" />
            </button>
          </div>
        }
      />

      <div role="tablist" aria-label="Projets" onKeyDown={onKey} className="relative z-10 -mb-[3px] flex gap-1.5 overflow-x-auto pl-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-2 md:gap-2">
        {projects.map((p, i) => {
          const on = i === index;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`dossier-tab-${p.id}`}
              aria-selected={on}
              aria-controls="dossier-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => go(i)}
              className={`shrink-0 rounded-t-2xl border-[3px] border-b-0 border-ink px-4 pb-3 pt-2.5 text-left text-night transition-transform duration-300 md:px-6 ${pop(i)} ${on ? "" : "translate-y-2 brightness-75 hover:translate-y-1 hover:brightness-100"}`}
              data-cursor=""
            >
              <span className="block font-mono text-xs font-bold">{p.index}</span>
              <span className="block whitespace-nowrap font-display text-sm uppercase md:text-base">{p.title}</span>
            </button>
          );
        })}
      </div>

      <div
        id="dossier-panel"
        role="tabpanel"
        aria-labelledby={`dossier-tab-${project.id}`}
        className={`bloc-box relative overflow-hidden text-night transition-colors duration-500 ${color}`}
      >
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={project.id}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-6 p-4 md:grid-cols-[1.2fr_1fr] md:gap-10 md:p-8"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-[3px] border-ink bg-night">
              <ProjectImage project={project} sizes="(min-width: 768px) 55vw, 90vw" />
              <span className="absolute left-3 top-3 rounded-full border-[3px] border-ink bg-paper px-3 py-1 text-xs font-black uppercase text-ink">{project.type}</span>
            </div>
            <div className="flex flex-col">
              <p className="font-mono text-sm font-bold">
                Dossier {project.index} / {String(projects.length).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[0.95]">{project.title}</h3>
              <p className="mt-3 text-lg font-semibold">{project.subtitle}</p>
              <dl className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ["Lieu", project.location],
                  ["Année", project.year],
                  ["Surface", project.surface],
                  ["Matériaux", project.material],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border-[3px] border-ink bg-paper/90 p-3 text-ink">
                    <dt className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-graphite">{k}</dt>
                    <dd className="mt-1 font-bold leading-tight">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
