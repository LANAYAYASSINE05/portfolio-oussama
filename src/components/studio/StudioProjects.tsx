"use client";

import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects, type Project } from "@/lib/content";
import { SectionHead } from "./SectionHead";
import { ProjectImage } from "./StudioVisual";

const ease = [0.16, 1, 0.3, 1] as const;
const missions = ["Plans 2D", "Modélisation 3D", "Rendus", "Planches de présentation"];

function facts(p: Project) {
  return [
    ["Lieu", p.location],
    ["Année", p.year],
    ["Programme", p.type],
    ["Surface", p.surface],
    ["Matériaux", p.material],
  ];
}

function CaseView({ project, onClose, onNext }: { project: Project; onClose: () => void; onNext: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[70] overflow-y-auto bg-paper text-ink"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between bg-paper/85 px-[var(--gutter)] py-4 backdrop-blur">
        <span className="studio-caps text-graphite">
          Projet {project.index} / {String(projects.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="studio-caps flex h-11 items-center gap-2 rounded-full border border-ink px-5 transition-colors hover:bg-ink hover:text-paper"
          data-cursor=""
        >
          Fermer <X aria-hidden strokeWidth={1.5} className="size-4" />
        </button>
      </div>

      <motion.div layoutId={`studio-${project.id}`} transition={{ duration: 0.9, ease }} className="relative mx-[var(--gutter)] aspect-[16/10] overflow-hidden md:aspect-[21/9]">
        <ProjectImage project={project} />
      </motion.div>

      <motion.div
        className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-10 px-[var(--gutter)] py-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.8, ease } }}
      >
        <div className="col-span-12 md:col-span-7">
          <h3 className="font-display text-[clamp(3rem,8vw,8rem)] uppercase leading-[0.88] tracking-[-0.03em]">{project.title}</h3>
          <p className="mt-6 max-w-xl text-xl leading-snug text-graphite">
            {project.subtitle}. {project.type} de {project.surface} à {project.location}, en {project.material.toLowerCase()}.
          </p>
          <ul className="mt-10 flex flex-wrap gap-2">
            {missions.map((m) => (
              <li key={m} className="studio-caps rounded-full border border-line px-4 py-2">
                {m}
              </li>
            ))}
          </ul>
        </div>
        <dl className="col-span-12 divide-y divide-line self-start border-y border-line md:col-span-4 md:col-start-9">
          {facts(project).map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 py-4">
              <dt className="studio-caps text-graphite">{k}</dt>
              <dd className="text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </motion.div>

      <button
        type="button"
        onClick={onNext}
        className="group flex w-full items-end justify-between border-t border-line px-[var(--gutter)] py-12 text-left"
        data-cursor=""
      >
        <span>
          <span className="studio-caps text-graphite">Projet suivant</span>
          <span className="mt-3 block font-display text-[clamp(2rem,5vw,4.5rem)] uppercase leading-none">
            {projects[(projects.indexOf(project) + 1) % projects.length].title}
          </span>
        </span>
        <ArrowUpRight aria-hidden strokeWidth={1} className="size-14 transition-transform duration-500 group-hover:rotate-45" />
      </button>
    </motion.div>
  );
}

export function StudioProjects() {
  const root = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find((p) => p.id === openId) ?? null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((el) => {
        gsap.fromTo(
          el.querySelector("[data-parallax]"),
          { yPercent: -7 },
          { yPercent: 7, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
        gsap.from(el.querySelector("[data-project-mask]"), {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.6,
          ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  const next = () => {
    if (!open) return;
    setOpenId(projects[(projects.indexOf(open) + 1) % projects.length].id);
  };

  return (
    <section id="projets" ref={root} className="px-[var(--gutter)] py-[16vh]">
      <SectionHead
        index="02"
        label="Projets sélectionnés"
        title="Travaux"
        aside={<span className="studio-caps text-graphite">{String(projects.length).padStart(2, "0")} projets</span>}
      />

      <div className="space-y-[14vh]">
        {projects.map((p, i) => {
          const wide = i % 2 === 0;
          return (
            <article key={p.id} data-project className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6">
              <button
                type="button"
                onClick={() => setOpenId(p.id)}
                data-project-mask
                data-cursor="Voir"
                aria-label={`Voir le projet ${p.title}`}
                className={`group relative col-span-12 overflow-hidden ${
                  wide ? "aspect-[16/10] md:col-span-9" : "aspect-[4/3] md:col-span-7 md:col-start-6"
                }`}
              >
                <motion.div layoutId={`studio-${p.id}`} transition={{ duration: 0.9, ease }} className="absolute inset-0">
                  <div data-parallax className="absolute -inset-y-[9%] inset-x-0 transition-transform duration-[1.4s] ease-archi group-hover:scale-[1.04]">
                    <ProjectImage project={p} sizes="(min-width: 768px) 75vw, 100vw" />
                  </div>
                </motion.div>
                <span className="studio-caps absolute bottom-4 right-4 flex translate-y-3 items-center gap-2 rounded-full bg-paper px-4 py-2.5 text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Voir le projet <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-3.5" />
                </span>
              </button>

              <div
                data-reveal
                className={`col-span-12 flex flex-col justify-between gap-8 ${
                  wide ? "md:col-span-3" : "md:col-span-4 md:col-start-1 md:row-start-1"
                }`}
              >
                <div>
                  <span className="studio-caps text-graphite">
                    {p.index} — {p.type}
                  </span>
                  <h3 className="mt-4 font-display text-[clamp(2.25rem,3.6vw,3.75rem)] uppercase leading-[0.9] tracking-[-0.02em]">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-graphite">{p.subtitle}</p>
                </div>
                <dl className="grid grid-cols-2 gap-y-4 border-t border-line pt-5 text-sm">
                  {facts(p)
                    .slice(0, 4)
                    .map(([k, v]) => (
                      <div key={k}>
                        <dt className="studio-caps text-graphite">{k}</dt>
                        <dd className="mt-1">{v}</dd>
                      </div>
                    ))}
                </dl>
              </div>
            </article>
          );
        })}
      </div>

      <AnimatePresence>{open && <CaseView key={open.id} project={open} onClose={() => setOpenId(null)} onNext={next} />}</AnimatePresence>
    </section>
  );
}
