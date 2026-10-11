"use client";

import { ArrowUpRight, Check, Copy, Download, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Monogram, SocialIcon } from "@/components/ui/Logos";
import { Magnetic } from "@/components/ui/Magnetic";
import { identity } from "@/lib/content";
import { Khatam, Lantern, Lattice, RoomHeading } from "./shared";

const linkedin = identity.socials.find((s) => s.label === "LinkedIn");

export function ClaustraFanous() {
  const { scrollTo } = useSite();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const cards = [
    { label: "Téléphone", value: identity.phone, href: `tel:${identity.phone.replace(/\s/g, "")}`, icon: <Phone aria-hidden strokeWidth={1.5} className="size-5" /> },
    ...(linkedin
      ? [{ label: "LinkedIn", value: "oussama-ziyati", href: linkedin.href, external: true, icon: <SocialIcon label="LinkedIn" className="size-5" /> }]
      : []),
    { label: "Curriculum", value: "Télécharger le PDF", href: identity.cv, download: true, icon: <Download aria-hidden strokeWidth={1.5} className="size-5" /> },
  ];

  return (
    <section id="contact" data-room="contact" className="relative isolate overflow-hidden bg-night px-[var(--gutter)] pb-8 pt-[16vh]">
      <div aria-hidden className="absolute inset-0 -z-10 text-terra/[0.05]">
        <Lattice size={64} stroke={4} className="absolute inset-0" />
      </div>
      <div aria-hidden className="absolute left-1/2 top-0 -z-10 size-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(224_169_78/0.22),transparent_65%)]" />

      <div className="grid items-start gap-12 lg:grid-cols-[1fr_auto]">
        <div>
          <RoomHeading index={7} name="Le fanous" nameAr="الفانوس" title={<>Allumons la suite ensemble.</>} />
          <p data-reveal className="-mt-6 max-w-xl text-xl leading-snug text-ink/75">
            Agences, bureaux d&apos;études, promoteurs : je suis disponible pour rejoindre votre équipe. Écrivez-moi, je vous réponds rapidement.
          </p>
        </div>
        <Lantern className="mx-auto hidden h-64 w-auto text-[#94672a] lg:block" />
      </div>

      <div data-reveal className="mt-14">
        <a href={`mailto:${identity.email}`} className="brass-text block break-all font-display text-[clamp(2rem,7vw,7rem)] leading-[1.05]" data-cursor="">
          {identity.email}
        </a>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a
              href={`mailto:${identity.email}?subject=${encodeURIComponent("Proposition d'entretien")}`}
              className="flex items-center gap-3 rounded-full bg-terra px-6 py-4 font-semibold text-night shadow-[0_0_40px_-8px_var(--accent)] transition-shadow duration-500 hover:shadow-[0_0_70px_-4px_var(--accent)]"
              data-cursor=""
            >
              <Mail aria-hidden strokeWidth={1.75} className="size-4" />
              Proposer un entretien
            </a>
          </Magnetic>
          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-2 rounded-full border border-ink/20 px-5 py-4 text-sm font-semibold transition-colors hover:border-safran hover:text-safran"
            data-cursor=""
          >
            {copied ? <Check aria-hidden className="size-4 text-safran" /> : <Copy aria-hidden strokeWidth={1.5} className="size-4" />}
            {copied ? "Adresse copiée" : "Copier l'adresse"}
          </button>
        </div>
      </div>

      <ul className="mt-16 grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <li key={c.label} data-reveal>
            <a
              href={c.href}
              download={c.download}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noreferrer" : undefined}
              className="group flex h-full flex-col gap-8 rounded-[1.75rem] border border-line bg-paper-2/50 p-6 transition-colors duration-500 hover:border-terra/50"
              data-cursor=""
            >
              <span className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-full bg-terra/15 text-terra">{c.icon}</span>
                <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-5 text-graphite transition-transform duration-500 group-hover:rotate-45 group-hover:text-terra" />
              </span>
              <span>
                <span className="block text-sm text-graphite">{c.label}</span>
                <span className="mt-1 block text-lg font-medium">{c.value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <footer className="mt-[14vh] flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6 text-sm text-graphite">
        <span className="flex items-center gap-3 text-ink">
          <Monogram className="size-8 text-terra" />
          {identity.name} — {identity.title}
          <span lang="ar" className="font-display text-graphite">
            {identity.nameAr}
          </span>
        </span>
        <span className="flex flex-wrap items-center gap-6">
          {identity.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="hover:text-ink" data-cursor="">
              <SocialIcon label={s.label} className="size-4" />
            </a>
          ))}
          <Link href="/systeme" className="hover:text-ink" data-cursor="">
            Système de design
          </Link>
          <button type="button" onClick={() => scrollTo(0)} className="flex items-center gap-1.5 hover:text-ink" data-cursor="">
            <Khatam className="size-3 text-terra" filled /> Haut de page
          </button>
          <span>© {identity.graduation}</span>
        </span>
      </footer>
    </section>
  );
}
