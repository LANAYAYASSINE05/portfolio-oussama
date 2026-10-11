"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Monogram } from "@/components/ui/Logos";
import { bio, identity, languages } from "@/lib/content";
import { SectionTitle, Swatch, type Texture } from "./shared";

const strengths: { texture: Texture; material: string; quality: string; text: string; light?: boolean }[] = [
  { texture: "terre", material: "Terre crue", quality: "Ancrage", text: "Lire le site, le climat et le contexte avant de dessiner le premier trait." },
  { texture: "bois", material: "Bois", quality: "Chaleur", text: "Des logements pensés pour être habités : lumière, intimité et confort." },
  { texture: "pierre", material: "Pierre", quality: "Rigueur", text: "Des plans et des détails techniques précis, prêts pour le chantier.", light: true },
  { texture: "lin", material: "Lin", quality: "Finesse", text: "Des rendus et des planches soignés qui font ressentir le projet.", light: true },
];

const facts = [
  ["Diplôme", `Architecte — ENA Rabat, ${identity.graduation}`],
  ["Basé à", identity.city],
  ["Langues", languages.map((l) => l.name).join(" · ")],
];

export function MatiereProfile() {
  return (
    <section id="a-propos" className="px-[var(--gutter)] py-[16vh]">
      <SectionTitle tag="À propos">
        Une architecture <span className="italic text-terra">qui se touche.</span>
      </SectionTitle>

      <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-14">
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <div data-reveal className="texture-lin relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-t-full rounded-b-[2rem] md:sticky md:top-28">
            {identity.portrait ? (
              <Image src={identity.portrait} alt={identity.name} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" />
            ) : (
              <div className="grid h-full place-items-center text-ink/70">
                <Monogram className="size-28" />
              </div>
            )}
            <span className="matiere-tag absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-paper/85 px-4 py-2">
              {identity.name}
            </span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
          <div className="space-y-6 text-[clamp(1.125rem,1.5vw,1.375rem)] leading-relaxed">
            {bio.map((p, i) => (
              <p key={i} data-reveal className={i === 0 ? "font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-snug" : "text-graphite"}>
                {p}
              </p>
            ))}
          </div>

          <dl data-reveal className="mt-12 divide-y divide-line border-y border-line">
            {facts.map(([k, v]) => (
              <div key={k} className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-4">
                <dt className="matiere-tag text-graphite">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <h3 data-reveal className="mt-16 font-display text-3xl">
            Mon nuancier <span className="italic text-graphite">— ce que j&apos;apporte à votre équipe</span>
          </h3>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {strengths.map((s, i) => (
              <li key={s.material} data-reveal>
              <motion.div
                whileHover={{ y: -8, rotate: i % 2 ? 1.2 : -1.2 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className={`relative isolate flex h-full min-h-64 flex-col justify-between overflow-hidden rounded-[2rem] p-6 ${s.light ? "text-ink" : "text-white"}`}
              >
                <Swatch texture={s.texture} className="absolute inset-0 -z-10" />
                <span className="flex items-start justify-between">
                  <span className="matiere-tag opacity-80">{s.material}</span>
                  <span className="font-display text-sm italic opacity-70">0{i + 1}</span>
                </span>
                <span>
                  <span className="block font-display text-4xl">{s.quality}</span>
                  <span className="mt-3 block leading-snug opacity-85">{s.text}</span>
                </span>
              </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
