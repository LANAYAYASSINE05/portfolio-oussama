"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { certifications, education, identity, languages } from "@/lib/content";
import { SectionTitle, Tag } from "./shared";

const seal = `ENA RABAT · PROMOTION ${identity.graduation} · ARCHITECTE DIPLÔMÉ ·`;

function Seal() {
  return (
    <svg viewBox="0 0 200 200" className="size-36 animate-[spin_24s_linear_infinite] motion-reduce:animate-none md:size-44" aria-hidden>
      <defs>
        <path id="matiere-seal" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <text className="fill-current text-[13px] font-medium">
        <textPath href="#matiere-seal" textLength={486} lengthAdjust="spacing">
          {seal}
        </textPath>
      </text>
    </svg>
  );
}

export function MatiereEducation() {
  const root = useRef<HTMLElement>(null);
  const [diploma, ...others] = education;

  useGSAP(
    () => {
      gsap.from("[data-stem]", {
        scaleY: 0,
        ease: "none",
        scrollTrigger: { trigger: "[data-growth]", start: "top 70%", end: "bottom 60%", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>("[data-seed]").forEach((el) => {
        gsap.from(el, {
          scale: 0,
          duration: 0.8,
          ease: "back.out(2.5)",
          scrollTrigger: { trigger: el, start: "top 70%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="formation" ref={root} className="bg-paper-2 px-[var(--gutter)] py-[16vh]">
      <SectionTitle tag="Formation">
        Six années <span className="italic text-terra">de croissance.</span>
      </SectionTitle>

      <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-14">
        <div data-reveal className="texture-olive relative col-span-12 overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] px-8 pb-12 pt-[14%] text-white md:col-span-6">
          <div className="relative mx-auto w-fit text-white/80">
            <Seal />
            <span className="absolute inset-0 grid place-items-center font-display text-4xl italic">{identity.graduation}</span>
          </div>
          <div className="relative mt-8 text-center">
            <p className="matiere-tag text-white/70">{diploma.year}</p>
            <h3 className="mt-3 font-display text-[clamp(2.5rem,4.5vw,4rem)] leading-none">{diploma.title}</h3>
            <p className="mt-3 text-lg text-white/85">
              {diploma.school} — {diploma.location}
            </p>
            <p className="mx-auto mt-6 max-w-md leading-relaxed text-white/75">{diploma.detail}</p>
          </div>
        </div>

        <div data-growth className="relative col-span-12 md:col-span-5 md:col-start-8">
          <span className="absolute bottom-2 left-[11px] top-2 w-0.5 bg-ink/10" />
          <span data-stem className="absolute bottom-2 left-[11px] top-2 w-0.5 origin-top bg-olive" />
          <ol className="space-y-12">
            <li className="relative pl-12">
              <span data-seed className="absolute left-0 top-1 size-6 rounded-full border-4 border-paper-2 bg-terra" />
              <p className="matiere-tag text-graphite">{identity.graduation}</p>
              <p className="mt-1 font-display text-2xl">Diplômé, prêt à rejoindre une équipe</p>
            </li>
            <li className="relative pl-12">
              <span data-seed className="absolute left-0 top-1 size-6 rounded-full border-4 border-paper-2 bg-olive" />
              <p className="matiere-tag text-graphite">{diploma.year}</p>
              <p className="mt-1 font-display text-2xl">{diploma.school}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {certifications.map((c) => (
                  <li key={c}>
                    <Tag className="text-ink">{c}</Tag>
                  </li>
                ))}
              </ul>
            </li>
            {others.map((e) => (
              <li key={e.title} className="relative pl-12">
                <span data-seed className="absolute left-0 top-1 size-6 rounded-full border-4 border-paper-2 bg-[#8a5f3a]" />
                <p className="matiere-tag text-graphite">{e.year}</p>
                <p className="mt-1 font-display text-2xl">{e.title}</p>
                <p className="mt-1 text-graphite">{e.detail}</p>
              </li>
            ))}
          </ol>

          <div data-reveal className="mt-14 rounded-[2rem] bg-paper p-6">
            <p className="matiere-tag text-graphite">Langues</p>
            <ul className="mt-4 divide-y divide-line">
              {languages.map((l) => (
                <li key={l.name} className="flex justify-between gap-4 py-3">
                  <span className="font-display text-xl">{l.name}</span>
                  <span className="text-graphite">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
