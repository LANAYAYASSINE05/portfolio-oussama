"use client";

import { animate, stagger, svg, utils } from "animejs";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DRAWABLE, PlanDrawing } from "@/components/drawings/PlanDrawing";
import { projects } from "@/lib/content";

export function ProjetsWindow() {
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const project = projects.find((p) => p.id === selectedId) ?? projects[0];
  const preview = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = preview.current;
    if (!root) return;
    const drawables = svg.createDrawable(root.querySelectorAll(DRAWABLE));
    utils.set(drawables, { draw: "0 0" });
    const anim = animate(drawables, {
      draw: ["0 0", "0 1"],
      duration: 1400,
      delay: stagger(35),
      ease: "inOutQuad",
    });
    return () => {
      anim.revert();
    };
  }, [selectedId]);

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex items-center gap-2 border-b border-edge px-3 py-2 font-mono text-[12px] text-muted">
        <span className="text-dim">C:\</span>Portfolio<span className="text-dim">\</span>Projets
        <span className="text-dim">\</span>
        <span className="text-l-blue">{project.id}.dwg</span>
      </div>

      <div className="grid flex-1 @2xl:grid-cols-[15rem_1fr]">
        <ul className="grid grid-cols-2 gap-1.5 border-b border-edge p-2 @lg:grid-cols-4 @2xl:grid-cols-1 @2xl:border-b-0 @2xl:border-r">
          {projects.map((p) => {
            const active = p.id === selectedId;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  aria-pressed={active}
                  className={`group flex w-full items-center gap-2.5 rounded-md border p-1.5 text-left transition-colors ${
                    active ? "border-l-blue/60 bg-l-blue/10" : "border-transparent hover:bg-panel-2"
                  }`}
                >
                  <span className="grid h-10 w-14 shrink-0 place-items-center rounded bg-desk text-muted">
                    <PlanDrawing variant={p.drawing} className="h-full w-full p-0.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-mono text-[11.5px]">{p.id}.dwg</span>
                    <span className="block truncate text-[11px] text-dim">
                      {p.type} · {p.year}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex min-w-0 flex-col">
          <div
            ref={preview}
            key={project.id}
            className="relative aspect-[4/3] max-h-80 w-full border-b border-edge bg-desk text-fg @2xl:aspect-auto @2xl:max-h-none @2xl:flex-1"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(var(--color-edge) 1px, transparent 1px), linear-gradient(90deg, var(--color-edge) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <PlanDrawing variant={project.drawing} className="relative h-full w-full p-6" />
          </div>

          <motion.div
            key={`${project.id}-info`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4 p-4 @lg:grid-cols-[1fr_15rem]"
          >
            <div>
              <h3 className="font-display text-3xl leading-none">{project.title}</h3>
              <p className="mt-1 text-[13px] text-muted">{project.subtitle}</p>
            </div>
            <dl className="grid grid-cols-[5.5rem_1fr] gap-y-1 text-[12px]">
              {(
                [
                  ["Lieu", project.location],
                  ["Année", project.year],
                  ["Type", project.type],
                  ["Surface", project.surface],
                  ["Matériaux", project.material],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-dim">{k}</dt>
                  <dd className="truncate">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
