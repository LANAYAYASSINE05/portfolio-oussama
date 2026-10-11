"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { ProjectImage } from "@/components/studio/StudioVisual";
import { projects } from "@/lib/content";
import { MaquetteTitle } from "./shared";

const plinths = ["pb-8", "pb-14", "pb-4", "pb-11"];

export function MaquetteVitrine() {
  const [index, setIndex] = useState(0);
  const project = projects[index];
  const go = (next: number) => setIndex((next + projects.length) % projects.length);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  };

  return (
    <section id="projets" data-room="projets" className="bg-night px-[var(--gutter)] py-[14vh]">
      <MaquetteTitle
        plate={2}
        tag="Projets"
        title="Quatre maquettes sous vitrine."
        note="choisissez un socle"
        aside={
          <div className="flex gap-3">
            <button type="button" onClick={() => go(index - 1)} aria-label="Projet précédent" className="foam grid size-14 place-items-center rounded-sm transition-transform hover:-translate-y-1" data-cursor="">
              <ArrowLeft aria-hidden className="size-6" />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Projet suivant" className="grid size-14 place-items-center rounded-sm bg-terra text-night shadow-[0_6px_0_#a8360c,0_14px_24px_rgb(0_0_0/0.5)] transition-transform hover:-translate-y-1" data-cursor="">
              <ArrowRight aria-hidden className="size-6" />
            </button>
          </div>
        }
      />

      <div role="tablist" aria-label="Projets" onKeyDown={onKey} className="grid grid-cols-2 items-end gap-x-5 gap-y-10 md:grid-cols-4 md:gap-x-8">
        {projects.map((p, i) => {
          const on = i === index;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`vitrine-tab-${p.id}`}
              aria-selected={on}
              aria-controls="vitrine-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setIndex(i)}
              className="group relative flex flex-col items-stretch text-left"
              data-cursor="Voir"
            >
              {on && (
                <motion.span
                  layoutId="mq-spot"
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-6 -top-10 bottom-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(255_170_120/0.28),transparent_70%)]"
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                />
              )}
              <motion.span
                animate={{ y: on ? -14 : 0 }}
                whileHover={{ y: on ? -16 : -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative mx-2 block aspect-[4/3] overflow-hidden rounded-t-sm border border-white/25 bg-white/[0.04] shadow-[inset_0_0_30px_rgb(255_255_255/0.06)]"
              >
                <span className={`absolute inset-3 block overflow-hidden transition-[filter] duration-500 ${on ? "" : "brightness-75 saturate-50"}`}>
                  <ProjectImage project={p} sizes="(min-width: 768px) 22vw, 45vw" />
                </span>
                <span aria-hidden className="absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgb(255_255_255/0.16)_45%,transparent_55%)] transition-transform duration-700 group-hover:translate-x-1/3" />
              </motion.span>
              <span className={`foam relative block rounded-[2px] px-3 pt-3 ${plinths[i % plinths.length]}`}>
                <span className="flex items-baseline justify-between gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#6d665a]">
                  <span>Socle {p.index}</span>
                  <span className={`size-2 rounded-full ${on ? "bg-terra" : "bg-[#1b1a17]/20"}`} />
                </span>
                <span className="mt-1 block truncate font-display text-lg uppercase leading-tight md:text-xl">{p.title}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div id="vitrine-panel" role="tabpanel" aria-labelledby={`vitrine-tab-${project.id}`} className="mt-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.id}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
            className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12"
          >
            <div className="balsa rounded-sm p-3 shadow-[0_20px_40px_rgb(0_0_0/0.55)] md:p-4">
              <div className="relative aspect-[16/10] overflow-hidden bg-night">
                <ProjectImage project={project} sizes="(min-width: 1024px) 55vw, 92vw" />
              </div>
            </div>

            <div className="flex flex-col">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite">
                Maquette {project.index} / {String(projects.length).padStart(2, "0")} · {project.type}
              </p>
              <h3 className="mt-3 font-display text-[clamp(2.75rem,5vw,4.75rem)] uppercase leading-[0.9]">{project.title}</h3>
              <p className="mt-3 text-lg text-ink/80">{project.subtitle}</p>

              <div className="kraft relative mt-8 rounded-sm p-5 shadow-[0_12px_24px_rgb(0_0_0/0.45)]">
                <span aria-hidden className="absolute -top-2 left-1/2 h-4 w-16 -translate-x-1/2 bg-[rgb(231_214_162/0.85)]" />
                <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] opacity-70">Fiche de vitrine</p>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3">
                  {[
                    ["Lieu", project.location],
                    ["Année", project.year],
                    ["Surface", project.surface],
                    ["Matériaux", project.material],
                  ].map(([k, v]) => (
                    <div key={k} className="border-t border-[#24170b]/25 pt-2">
                      <dt className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] opacity-70">{k}</dt>
                      <dd className="mt-0.5 font-display text-xl uppercase leading-tight">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="font-hand mt-6 text-2xl text-safran">astuce : sur les socles, les flèches ← → changent de maquette</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
