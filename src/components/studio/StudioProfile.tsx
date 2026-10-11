"use client";

import Image from "next/image";
import { useRef } from "react";
import { Monogram } from "@/components/ui/Logos";
import { gsap, useGSAP } from "@/lib/gsap";
import { bio, identity, languages } from "@/lib/content";
import { Availability } from "./StudioHero";
import { SectionHead } from "./SectionHead";

const statement =
  "Architecte diplômé, je conçois des logements justes, lumineux et précis — du premier trait jusqu'au rendu final.";

const strengths = [
  {
    title: "Chaîne 2D/3D complète",
    text: "Des plans d'exécution à la maquette 3D et aux rendus : un seul interlocuteur pour faire avancer un projet.",
  },
  {
    title: "Expérience du logement",
    text: "Villas et immeubles : programme, réglementation, confort d'usage et lumière naturelle.",
  },
  {
    title: "Rigueur & écoute",
    text: "Des documents précis, livrés dans les délais, et une vraie attention au client comme à l'équipe.",
  },
];

function Portrait() {
  return (
    <figure data-reveal className="relative aspect-[3/4] overflow-hidden bg-paper-2">
      {identity.portrait ? (
        <Image src={identity.portrait} alt={identity.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
      ) : (
        <div className="grid h-full place-items-center">
          <Monogram className="size-32 text-ink/80 md:size-40" />
        </div>
      )}
      <figcaption className="studio-caps absolute inset-x-0 bottom-0 flex justify-between p-4 text-graphite">
        <span>{identity.name}</span>
        <span>{identity.graduation}</span>
      </figcaption>
    </figure>
  );
}

export function StudioProfile() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    },
    { scope: root },
  );

  const facts = [
    ["Diplôme", `Architecte — ENA Rabat, ${identity.graduation}`],
    ["Basé à", identity.city],
    ["Langues", languages.map((l) => l.name).join(", ")],
    ["Statut", <Availability key="a" />],
  ] as const;

  return (
    <section id="a-propos" ref={root} className="px-[var(--gutter)] py-[16vh]">
      <SectionHead index="01" label="Profil" title="L'architecte" />

      <p data-statement className="max-w-[24ch] font-display text-[clamp(2rem,4.8vw,5rem)] leading-[1.04]">
        {statement.split(" ").map((w, i) => (
          <span key={i} data-word className="inline-block pr-[0.25em]">
            {w}
          </span>
        ))}
      </p>

      <div className="mt-24 grid grid-cols-12 gap-x-[var(--gutter)] gap-y-14">
        <div className="col-span-12 md:col-span-4">
          <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
            <Portrait />
          </div>
        </div>

        <div className="col-span-12 space-y-16 md:col-span-7 md:col-start-6">
          <div className="grid gap-6 text-lg leading-relaxed md:grid-cols-2">
            {bio.map((p) => (
              <p key={p.slice(0, 20)} data-reveal>
                {p}
              </p>
            ))}
          </div>

          <dl className="divide-y divide-line border-y border-line">
            {facts.map(([k, v]) => (
              <div key={k} data-reveal className="grid grid-cols-3 gap-4 py-4">
                <dt className="studio-caps self-center text-graphite">{k}</dt>
                <dd className="col-span-2">{v}</dd>
              </div>
            ))}
          </dl>

          <div>
            <p className="studio-caps mb-8 text-graphite">Ce que j&apos;apporte à votre équipe</p>
            <ol className="grid gap-10 md:grid-cols-3 md:gap-6">
              {strengths.map((s, i) => (
                <li key={s.title} data-reveal className="border-t border-ink pt-5">
                  <span className="studio-caps text-terra">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-2xl leading-tight">{s.title}</h3>
                  <p className="mt-3 text-graphite">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
