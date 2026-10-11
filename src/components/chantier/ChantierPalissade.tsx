"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, DoorOpen, Eye } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ProjectImage } from "@/components/studio/StudioVisual";
import { projects } from "@/lib/content";
import { ChantierTitle } from "./shared";

const hole = "radial-gradient(circle var(--r) at var(--px) var(--py), transparent 97%, #000 100%)";

export function ChantierPalissade() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const fence = useRef<HTMLDivElement>(null);
  const project = projects[index];
  const go = (next: number) => setIndex((next + projects.length) % projects.length);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !fence.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    fence.current.style.setProperty("--px", `${e.clientX - r.left}px`);
    fence.current.style.setProperty("--py", `${e.clientY - r.top}px`);
    fence.current.style.setProperty("--r", "clamp(70px, 11vw, 150px)");
  };

  const onLeave = () => {
    fence.current?.style.setProperty("--r", "0px");
  };

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) fence.current?.style.setProperty("--r", "clamp(56px, 16vw, 110px)");
  }, []);

  return (
    <section id="projets" data-room="projets" className="asphalt px-[var(--gutter)] py-[14vh]">
      <ChantierTitle
        lot={2}
        tag="Projets"
        title="Derrière la palissade."
        sub="Regardez par le trou · ouvrez pour tout voir"
        aside={
          <div className="flex gap-3">
            <button type="button" onClick={() => go(index - 1)} aria-label="Projet précédent" className="grid size-14 place-items-center border-2 border-ink/60 transition-colors hover:border-terra hover:text-terra" data-cursor="">
              <ArrowLeft aria-hidden className="size-6" />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Projet suivant" className="grid size-14 place-items-center bg-terra text-[#111] shadow-[0_6px_0_#a07a00] transition-transform hover:-translate-y-0.5" data-cursor="">
              <ArrowRight aria-hidden className="size-6" />
            </button>
          </div>
        }
      />

      <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr] xl:gap-12">
        <div data-reveal>
          <div className="relative">
            <div
              onPointerMove={onMove}
              onPointerLeave={onLeave}
              className="relative aspect-[16/10] overflow-hidden border-x-[10px] border-t-[10px] border-[#3c4147] bg-night"
              data-cursor={open ? "" : "Regarder"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <ProjectImage project={project} sizes="(min-width: 1280px) 60vw, 92vw" />
                </motion.div>
              </AnimatePresence>

              <div
                ref={fence}
                aria-hidden
                className="absolute inset-0 [--px:50%] [--py:50%] [--r:0px]"
                style={{ maskImage: hole, WebkitMaskImage: hole }}
              >
                {[0, 1].map((side) => (
                  <motion.div
                    key={side}
                    animate={{ x: open ? (side === 0 ? "-101%" : "101%") : "0%" }}
                    transition={{ type: "spring", stiffness: 90, damping: 18 }}
                    className={`plywood absolute inset-y-0 w-1/2 ${side === 0 ? "left-0 border-r border-[#6e4a26]/60" : "right-0"}`}
                  >
                    <span className="absolute inset-y-0 left-1/3 w-px bg-[#6e4a26]/40" />
                    <span className="absolute inset-y-0 left-2/3 w-px bg-[#6e4a26]/40" />
                    <span className="hazard absolute inset-x-0 bottom-0 h-4 opacity-90 sm:h-8" />
                    {side === 0 ? (
                      <div className="absolute left-[8%] top-[12%] w-[78%] rotate-[-2deg] bg-[#f4f2ec] p-4 text-[#141414] shadow-[0_10px_18px_rgb(0_0_0/0.4)] md:p-6">
                        <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#141414]/60">Projet {project.index}</p>
                        <p className="mt-1 font-display text-[clamp(1.5rem,3.6vw,3.25rem)] uppercase leading-[0.9]">{project.title}</p>
                        <p className="mt-2 hidden text-sm text-[#141414]/70 sm:block">{project.subtitle}</p>
                      </div>
                    ) : (
                      <div className="absolute right-[8%] top-[18%] flex flex-col items-end gap-3 text-right">
                        <span className="font-stencil text-[clamp(1.5rem,4vw,3.5rem)] uppercase leading-[0.85] text-[#2a1a0a]/80">
                          Défense
                          <br />
                          d&apos;entrer
                        </span>
                        <span className="grid size-[clamp(3rem,6vw,5rem)] place-items-center rounded-full border-[6px] border-[#d6261c] bg-[#f4f2ec]">
                          <span className="block h-[22%] w-[70%] bg-[#d6261c]" />
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <span className="pointer-events-none absolute right-3 top-3 z-10 hidden items-center gap-2 bg-night/80 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-graphite backdrop-blur md:flex">
                <Eye aria-hidden className="size-3.5" />
                {open ? "Palissade ouverte" : "Survolez pour regarder"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 bg-[#3c4147] px-4 py-3">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink/70">
                Palissade P-{project.index}
                <span className="hidden sm:inline"> · {project.location}</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-pressed={open}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap bg-terra px-4 py-2 font-display text-base uppercase text-[#111] transition-transform hover:-translate-y-0.5"
                data-cursor=""
              >
                <DoorOpen aria-hidden className="size-4" />
                {open ? (
                  "Refermer"
                ) : (
                  <>
                    Ouvrir<span className="hidden sm:inline"> la palissade</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div role="tablist" aria-label="Projets" onKeyDown={onKey} className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {projects.map((p, i) => {
              const on = i === index;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="palissade-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setIndex(i)}
                  className={`group relative overflow-hidden border-2 px-4 py-3 text-left transition-colors ${on ? "border-terra bg-terra text-[#111]" : "border-line hover:border-ink/60"}`}
                  data-cursor=""
                >
                  <span className="block font-stencil text-3xl leading-none">{p.index}</span>
                  <span className="mt-1 block truncate font-display text-lg uppercase leading-tight">{p.title}</span>
                  <span className={`mt-0.5 block font-mono text-[0.6rem] uppercase tracking-[0.16em] ${on ? "text-[#111]/70" : "text-graphite"}`}>{p.year}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div id="palissade-panel" role="tabpanel" className="flex flex-col">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite">
                Chantier {project.index} / {String(projects.length).padStart(2, "0")} · {project.type}
              </p>
              <h3 className="mt-3 font-display text-[clamp(3rem,6vw,5.5rem)] uppercase leading-[0.86]">{project.title}</h3>
              <p className="mt-3 text-lg text-ink/80">{project.subtitle}</p>

              <div className="mt-8 border-4 border-[#f4f2ec] bg-[#1f6b3a] text-[#f4f2ec] shadow-[0_18px_30px_rgb(0_0_0/0.5)]">
                <p className="border-b-2 border-[#f4f2ec]/70 px-5 py-2.5 font-stencil text-lg uppercase tracking-[0.12em]">Panneau d&apos;information</p>
                <dl className="grid grid-cols-2">
                  {[
                    ["Lieu", project.location],
                    ["Année", project.year],
                    ["Surface", project.surface],
                    ["Matériaux", project.material],
                  ].map(([k, v], i) => (
                    <div key={k} className={`px-5 py-3.5 ${i % 2 === 0 ? "border-r border-[#f4f2ec]/30" : ""} ${i < 2 ? "border-b border-[#f4f2ec]/30" : ""}`}>
                      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#f4f2ec]/65">{k}</dt>
                      <dd className="mt-1 font-display text-xl uppercase leading-tight md:text-2xl">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-graphite">Astuce : flèches ← → sur les onglets pour changer de chantier</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
