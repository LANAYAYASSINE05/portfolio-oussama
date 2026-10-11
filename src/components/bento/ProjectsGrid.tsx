"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { PlanDrawing } from "@/components/drawings/PlanDrawing";
import { projects, type Project } from "@/lib/content";
import { BentoSection, TileLabel } from "./Tile";

const spans = [
  "md:col-span-6 lg:col-span-7 lg:row-span-2 min-h-[28rem] lg:min-h-[40rem]",
  "md:col-span-3 lg:col-span-5 min-h-[19rem]",
  "md:col-span-3 lg:col-span-5 min-h-[19rem]",
  "md:col-span-6 lg:col-span-12 min-h-[19rem]",
];

const spring = { type: "spring", stiffness: 260, damping: 32 } as const;

function ProjectTile({ project, className, onOpen }: { project: Project; className: string; onOpen: () => void }) {
  const { tone } = project;
  return (
    <motion.button
      type="button"
      layoutId={`project-${project.id}`}
      transition={spring}
      onClick={onOpen}
      data-bento-tile
      data-cursor="Ouvrir"
      className={`group/tile relative col-span-2 flex flex-col justify-between overflow-hidden rounded-[var(--radius-tile,1.75rem)] p-5 text-left md:p-6 ${className}`}
      style={{ background: `linear-gradient(150deg, ${tone.from}, ${tone.to})`, color: tone.ink }}
    >
      <motion.div layout="position" className="flex w-full items-start justify-between">
        <TileLabel className="opacity-70">
          {project.index} — {project.type}
        </TileLabel>
        <span className="grid size-11 place-items-center rounded-full bg-current/10 text-lg transition-transform duration-500 group-hover/tile:rotate-45">
          ↗
        </span>
      </motion.div>
      <div className="pointer-events-none absolute inset-x-[8%] inset-y-[18%] opacity-70 transition-transform duration-[1.2s] ease-archi group-hover/tile:scale-105">
        <PlanDrawing variant={project.drawing} className="h-full w-full" />
      </div>
      <motion.div layout="position" className="relative">
        <h3 className="font-display text-[clamp(2rem,4vw,3.75rem)] leading-[0.92]">{project.title}</h3>
        <p className="label mt-2 opacity-70">
          {project.location} · {project.year}
        </p>
      </motion.div>
    </motion.button>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const { tone } = project;
  const facts = [
    ["Lieu", project.location],
    ["Année", project.year],
    ["Programme", project.type],
    ["Surface", project.surface],
    ["Matériaux", project.material],
  ];

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-3 md:p-8" data-lenis-prevent>
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        layoutId={`project-${project.id}`}
        transition={spring}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="relative grid h-full max-h-[52rem] w-full max-w-6xl overflow-hidden rounded-[var(--radius-tile,1.75rem)] md:grid-cols-[1.3fr_1fr]"
        style={{ background: `linear-gradient(150deg, ${tone.from}, ${tone.to})`, color: tone.ink }}
      >
        <div className="relative min-h-64 p-6">
          <PlanDrawing variant={project.drawing} className="absolute inset-[8%] h-[84%] w-[84%]" />
        </div>
        <motion.div
          className="flex flex-col justify-between gap-8 overflow-y-auto bg-paper-2/90 p-6 text-ink md:p-8"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.25, duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <div className="flex items-start justify-between gap-4">
            <TileLabel>Projet {project.index}</TileLabel>
            <button
              type="button"
              onClick={onClose}
              className="label rounded-full bg-ink px-4 py-2 text-paper-2"
              data-cursor=""
              autoFocus
            >
              Fermer ✕
            </button>
          </div>
          <div>
            <h3 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9]">{project.title}</h3>
            <p className="mt-3 text-lg text-graphite">{project.subtitle}</p>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3">
                <dt className="label text-graphite">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function ProjectsGrid() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find((p) => p.id === openId) ?? null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <BentoSection id="projets" index="06 — Projets" title={<>Projets<span className="text-terra">.</span></>}>
      {projects.map((p, i) => (
        <ProjectTile key={p.id} project={p} className={spans[i % spans.length]} onOpen={() => setOpenId(p.id)} />
      ))}
      <AnimatePresence>
        {open && <ProjectDetail key={open.id} project={open} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </BentoSection>
  );
}
