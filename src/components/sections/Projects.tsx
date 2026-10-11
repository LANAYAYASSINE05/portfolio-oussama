"use client";

import { animate, stagger, svg, utils, type JSAnimation } from "animejs";
import { useRef } from "react";
import { PlanDrawing, DRAWABLE } from "@/components/drawings/PlanDrawing";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { projects, type Project } from "@/lib/content";

function ProjectCard({ project }: { project: Project }) {
  const { tone } = project;
  return (
    <article
      data-project
      className="group relative flex w-full shrink-0 flex-col gap-5 md:h-full md:w-[min(72vw,68rem)]"
    >
      <div
        data-project-visual
        data-cursor="Voir"
        className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:flex-1"
        style={{
          background: `linear-gradient(140deg, ${tone.from}, ${tone.to})`,
          color: tone.ink,
          clipPath: "inset(0% 0% 0% 0%)",
        }}
      >
        <div className="blueprint-fine absolute inset-0 opacity-60 mix-blend-multiply" />
        <div className="absolute inset-0 grid place-items-center p-[6%] transition-transform duration-[1.4s] ease-archi group-hover:scale-[1.06]">
          <PlanDrawing variant={project.drawing} className="h-full max-h-full w-full" />
        </div>
        <span
          className="absolute -bottom-[0.18em] right-4 font-display leading-none opacity-15 text-[clamp(8rem,20vw,18rem)]"
          aria-hidden
        >
          {project.index}
        </span>
        <div className="label absolute left-4 top-4 flex gap-4">
          <span>{project.type}</span>
          <span className="opacity-60">{project.material}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 items-end gap-4 md:grid-cols-12">
        <div className="col-span-4 md:col-span-7">
          <p className="label text-graphite">( {project.index} )</p>
          <h3 className="font-display text-5xl leading-none md:text-6xl">{project.title}</h3>
          <p className="mt-2 text-graphite">{project.subtitle}</p>
        </div>
        <dl className="label col-span-4 grid grid-cols-3 gap-2 border-t border-line pt-3 md:col-span-5">
          <div>
            <dt className="text-graphite">Lieu</dt>
            <dd>{project.location}</dd>
          </div>
          <div>
            <dt className="text-graphite">Année</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt className="text-graphite">Surface</dt>
            <dd>{project.surface}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-project]");
      const drawings: JSAnimation[] = cards.map((card) => {
        const paths = svg.createDrawable(card.querySelectorAll(DRAWABLE));
        utils.set(paths, { draw: "0 0" });
        return animate(paths, {
          draw: ["0 0", "0 1"],
          duration: 1800,
          delay: stagger(25),
          ease: "inOutQuad",
          autoplay: false,
        });
      });

      gsap.from("[data-projects-title] > span > span", {
        yPercent: 100,
        stagger: 0.08,
        duration: 1.2,
        scrollTrigger: { trigger: "[data-projects-title]", start: "top 85%" },
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;

        const horizontal = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to("[data-projects-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
          },
        });

        cards.forEach((card, i) => {
          gsap.fromTo(
            card.querySelector("[data-project-visual]"),
            { clipPath: "inset(0% 0% 0% 100%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontal,
                start: "left 100%",
                end: "left 40%",
                scrub: true,
              },
            },
          );
          ScrollTrigger.create({
            trigger: card,
            containerAnimation: horizontal,
            start: "left 70%",
            once: true,
            onEnter: () => drawings[i].play(),
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 75%",
            once: true,
            onEnter: () => drawings[i].play(),
          });
        });
      });

      return () => drawings.forEach((d) => d.revert());
    },
    { scope: root },
  );

  return (
    <section ref={root} id="projets" className="relative overflow-hidden bg-paper-2 md:h-svh">
      <div
        ref={track}
        className="flex h-full flex-col gap-20 px-[var(--gutter)] py-24 md:w-max md:flex-row md:items-stretch md:gap-[6vw] md:py-[calc(var(--header-h)+2rem)]"
      >
        <div className="flex shrink-0 flex-col justify-between md:w-[38vw]">
          <p className="label text-graphite">( 06 ) Projets sélectionnés</p>
          <h2
            data-projects-title
            className="font-display text-[clamp(3.5rem,8vw,8.5rem)] leading-[0.9] [&>span]:block [&>span]:overflow-clip"
          >
            <span>
              <span className="inline-block">Projets</span>
            </span>
            <span>
              <span className="inline-block italic text-terra">dessinés</span>
            </span>
          </h2>
          <p className="max-w-sm text-graphite">
            Une sélection de projets de logements et d&apos;atelier, du premier croquis aux plans, à la
            modélisation et aux rendus.
          </p>
        </div>

        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}

        <div className="hidden w-[10vw] shrink-0 md:block" />
      </div>

      <div className="absolute inset-x-[var(--gutter)] bottom-6 hidden h-px bg-line md:block">
        <div data-projects-progress className="h-full origin-left scale-x-0 bg-ink" />
      </div>
    </section>
  );
}
