"use client";

import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ProjectImage } from "@/components/studio/StudioVisual";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects, type Project } from "@/lib/content";
import { Tag } from "./shared";

const ease = [0.16, 1, 0.3, 1] as const;
const missions = ["Plans 2D", "Modélisation 3D", "Rendus", "Planches de présentation"];
const noop = () => () => {};

function Sheet({ project, onClose, onNext }: { project: Project; onClose: () => void; onNext: () => void }) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <motion.div className="fixed inset-0 z-[70] flex items-end" role="dialog" aria-modal="true" aria-label={project.title}>
      <motion.button
        type="button"
        aria-label="Fermer"
        onClick={onClose}
        className="absolute inset-0 bg-night/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        data-lenis-prevent
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[2.5rem] bg-paper text-ink"
        initial={{ y: "100%" }}
        animate={{ y: 0, transition: { duration: 0.8, ease } }}
        exit={{ y: "100%", transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between bg-paper/90 px-[var(--gutter)] py-4 backdrop-blur">
          <span className="mx-auto h-1.5 w-12 rounded-full bg-ink/15 md:hidden" />
          <span className="matiere-tag hidden text-graphite md:block">
            Projet {project.index} sur {String(projects.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="absolute right-[var(--gutter)] grid size-11 place-items-center rounded-full bg-paper-2 transition-colors hover:bg-ink hover:text-paper md:static"
            data-cursor=""
          >
            <X aria-hidden strokeWidth={1.75} className="size-5" />
            <span className="sr-only">Fermer</span>
          </button>
        </div>

        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-10 px-[var(--gutter)] pb-12 pt-4">
          <div className="relative col-span-12 aspect-[4/3] overflow-hidden rounded-t-[999px] rounded-b-[2rem] md:col-span-5">
            <ProjectImage project={project} sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
          <div className="col-span-12 flex flex-col md:col-span-7">
            <Tag className="self-start text-graphite">{project.type}</Tag>
            <h3 className="mt-5 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9]">{project.title}</h3>
            <p className="mt-5 max-w-xl text-xl leading-relaxed text-graphite">
              {project.subtitle}. {project.surface} à {project.location}, en {project.material.toLowerCase()}.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Lieu", project.location],
                ["Année", project.year],
                ["Surface", project.surface],
                ["Matériaux", project.material],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-paper-2 p-4">
                  <dt className="matiere-tag text-graphite">{k}</dt>
                  <dd className="mt-2 font-display text-lg leading-tight">{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-6 flex flex-wrap gap-2">
              {missions.map((m) => (
                <li key={m}>
                  <Tag className="text-ink">{m}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="button"
          onClick={onNext}
          className="group flex w-full items-center justify-between border-t border-line px-[var(--gutter)] py-10 text-left"
          data-cursor=""
        >
          <span>
            <span className="matiere-tag text-graphite">Projet suivant</span>
            <span className="mt-2 block font-display text-[clamp(2rem,4.5vw,4rem)] italic leading-none">{next.title}</span>
          </span>
          <span className="grid size-16 place-items-center rounded-full bg-terra text-white transition-transform duration-500 group-hover:translate-x-2">
            <ArrowRight aria-hidden strokeWidth={1.5} className="size-6" />
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
}

export function MatiereProjects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find((p) => p.id === openId) ?? null;
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const el = track.current;
        if (!el) return;
        const distance = () => el.scrollWidth - window.innerWidth;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 1,
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo("[data-track-progress]", { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const next = () => {
    if (!open) return;
    setOpenId(projects[(projects.indexOf(open) + 1) % projects.length].id);
  };

  return (
    <section id="projets" ref={root} className="relative overflow-hidden bg-paper-2 md:h-screen">
      <div
        ref={track}
        className="flex flex-col gap-14 px-[var(--gutter)] py-[14vh] md:h-full md:w-max md:flex-row md:items-center md:gap-[4vw] md:py-0"
      >
        <div className="md:w-[34vw] md:shrink-0">
          <Tag className="text-graphite">
            <span className="size-1.5 rounded-full bg-terra" />
            Projets
          </Tag>
          <h2 data-matiere-title className="mt-6 font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.95]">
            Des lieux <span className="italic text-terra">à habiter.</span>
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-graphite">
            Logements, équipements et patrimoine : une sélection de projets professionnels et d&apos;atelier.
          </p>
          <p className="matiere-tag mt-10 hidden items-center gap-3 text-graphite md:flex">
            Faites défiler <ArrowRight aria-hidden className="size-4" />
          </p>
        </div>

        {projects.map((p, i) => (
          <article key={p.id} className={`md:w-[30vw] md:shrink-0 ${i % 2 ? "md:translate-y-[6vh]" : "md:-translate-y-[4vh]"}`}>
            <button
              type="button"
              onClick={() => setOpenId(p.id)}
              data-cursor="Voir"
              aria-label={`Voir le projet ${p.title}`}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-[2rem] md:aspect-auto md:h-[clamp(14rem,calc(100vh-19rem),38rem)]"
            >
              <span className="absolute inset-0 transition-transform duration-[1.4s] ease-archi group-hover:scale-105">
                <ProjectImage project={p} sizes="(min-width: 768px) 30vw, 100vw" />
              </span>
              <span className="matiere-tag absolute bottom-5 left-1/2 flex -translate-x-1/2 translate-y-2 items-center gap-2 whitespace-nowrap rounded-full bg-paper px-4 py-2.5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                Voir le projet <ArrowUpRight aria-hidden className="size-3.5" />
              </span>
            </button>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-3xl leading-tight">{p.title}</h3>
                <p className="mt-1 text-graphite">
                  {p.location} · {p.year}
                </p>
              </div>
              <span className="font-display text-xl italic text-terra">{p.index}</span>
            </div>
            <p className="matiere-tag mt-3 flex items-center gap-2 text-graphite">
              <span className="size-3 rounded-full" style={{ background: `linear-gradient(135deg, ${p.tone.from}, ${p.tone.to})` }} />
              {p.material}
            </p>
          </article>
        ))}
        <div aria-hidden className="hidden w-[4vw] shrink-0 md:block" />
      </div>

      <div className="absolute inset-x-[var(--gutter)] bottom-8 hidden h-px bg-line md:block">
        <span data-track-progress className="block h-px origin-left bg-terra" />
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>{open && <Sheet key={open.id} project={open} onClose={() => setOpenId(null)} onNext={next} />}</AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
