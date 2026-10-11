"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProjectImage } from "@/components/studio/StudioVisual";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects, type Project } from "@/lib/content";
import { Khatam, Ogive, RoomHeading, toArabic } from "./shared";

function Viewer({ project, onClose, onStep }: { project: Project; onClose: () => void; onStep: (dir: 1 | -1) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-center bg-night/80 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-terra/30 bg-paper-2 md:grid-cols-[1fr_1.1fr]"
        initial={{ scale: 0.92, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[32rem]">
          <ProjectImage project={project} sizes="(min-width: 768px) 30rem, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper-2/80 to-transparent md:bg-gradient-to-r md:from-transparent md:to-paper-2/40" />
        </div>
        <div className="flex flex-col p-8 md:p-10">
          <p className="flex items-center gap-2 text-sm font-semibold text-terra">
            <Khatam className="size-3.5" filled />
            Projet {project.index} / {String(projects.length).padStart(2, "0")}
          </p>
          <h3 className="mt-4 font-display text-[clamp(2.5rem,4vw,3.75rem)] leading-none">{project.title}</h3>
          <p className="mt-3 text-lg text-graphite">{project.subtitle}</p>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {[
              ["Programme", project.type],
              ["Surface", project.surface],
              ["Lieu", project.location],
              ["Année", project.year],
              ["Matériaux", project.material],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6 py-3">
                <dt className="text-sm text-graphite">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-auto flex items-center gap-2 pt-8">
            <button type="button" onClick={() => onStep(-1)} aria-label="Projet précédent" className="grid size-12 place-items-center rounded-full border border-line transition-colors hover:border-terra hover:text-terra" data-cursor="">
              <ArrowLeft aria-hidden className="size-5" />
            </button>
            <button type="button" onClick={() => onStep(1)} aria-label="Projet suivant" className="grid size-12 place-items-center rounded-full border border-line transition-colors hover:border-terra hover:text-terra" data-cursor="">
              <ArrowRight aria-hidden className="size-5" />
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-night/70 text-ink backdrop-blur transition-colors hover:bg-terra hover:text-night"
          data-cursor=""
        >
          <X aria-hidden className="size-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

export function ClaustraGalerie() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card.firstElementChild, {
            scale: 0.9,
            filter: "brightness(0.45)",
            ease: "none",
            scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top top+=120", scrub: true },
          });
        });
      });
    },
    { scope: root },
  );

  const step = (dir: 1 | -1) => setOpen((o) => (o === null ? o : (o + dir + projects.length) % projects.length));

  return (
    <section id="projets" data-room="projets" ref={root} className="px-[var(--gutter)] py-[16vh]">
      <RoomHeading index={2} name="La galerie" nameAr="الرواق" title="Quatre projets, quatre arcs ouverts sur la lumière." />

      <ol className="space-y-[12vh]">
        {projects.map((p, i) => (
          <li key={p.id} data-stack-card className="md:sticky md:top-[calc(var(--header-h)+1.5rem)]">
            <div className="origin-top overflow-hidden rounded-[2rem] border border-line bg-paper-2">
              <div className="grid items-stretch md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="p-5 md:p-8">
                  <Ogive className="aspect-[4/5] w-full md:aspect-auto md:h-[min(62svh,36rem)]" frame="text-ink/40">
                    <ProjectImage project={p} sizes="(min-width: 768px) 40vw, 90vw" />
                  </Ogive>
                </div>
                <div className="flex flex-col justify-between gap-8 p-6 pt-0 md:p-10 md:pl-4">
                  <div className="flex items-start justify-between gap-6">
                    <span className="font-display text-[clamp(4rem,9vw,8rem)] leading-none text-terra/90">{p.index}</span>
                    <span lang="ar" className="font-display text-4xl text-safran/70">
                      {toArabic(String(i + 1))}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-graphite">
                      {p.type} · {p.year}
                    </p>
                    <h3 className="mt-3 font-display text-[clamp(2.25rem,4.5vw,4.25rem)] leading-none">{p.title}</h3>
                    <p className="mt-3 max-w-md text-lg text-ink/75">{p.subtitle}</p>
                    <p className="mt-2 text-sm text-graphite">
                      {p.location} · {p.surface}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    className="group flex items-center justify-between gap-4 border-t border-line pt-6 text-left font-display text-2xl transition-colors hover:text-terra"
                    data-cursor="Ouvrir"
                  >
                    Découvrir le projet
                    <span className="grid size-12 place-items-center rounded-full bg-terra text-night transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight aria-hidden className="size-5" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <AnimatePresence>
        {open !== null && <Viewer key="viewer" project={projects[open]} onClose={() => setOpen(null)} onStep={step} />}
      </AnimatePresence>
    </section>
  );
}
