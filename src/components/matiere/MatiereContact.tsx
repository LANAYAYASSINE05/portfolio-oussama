"use client";

import { ArrowUp, ArrowUpRight, Check, Copy, Download, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Monogram, SocialIcon } from "@/components/ui/Logos";
import { Magnetic } from "@/components/ui/Magnetic";
import { identity } from "@/lib/content";
import { Availability, SectionTitle } from "./shared";

const linkedin = identity.socials.find((s) => s.label === "LinkedIn");

export function MatiereContact() {
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
    { href: `mailto:${identity.email}`, label: "Email", value: identity.email, icon: <Mail aria-hidden strokeWidth={1.5} className="size-5" /> },
    {
      href: `tel:${identity.phone.replace(/\s/g, "")}`,
      label: "Téléphone",
      value: identity.phone,
      icon: <Phone aria-hidden strokeWidth={1.5} className="size-5" />,
    },
    ...(linkedin
      ? [{ href: linkedin.href, label: "LinkedIn", value: "oussama-ziyati", icon: <SocialIcon label="LinkedIn" className="size-5" />, external: true }]
      : []),
    { href: identity.cv, label: "Curriculum vitae", value: "Télécharger le PDF", icon: <Download aria-hidden strokeWidth={1.5} className="size-5" />, download: true },
  ];

  return (
    <section id="contact" className="rounded-t-[3rem] bg-night px-[var(--gutter)] pb-8 pt-[16vh] text-on-night">
      <SectionTitle tag="Contact" dark aside={<Availability className="text-on-night/80" />}>
        Construisons quelque chose <span className="italic text-terra">de durable.</span>
      </SectionTitle>

      <p data-reveal className="max-w-2xl text-xl leading-relaxed text-on-night/70">
        Agences, bureaux d&apos;études, promoteurs : je suis disponible pour rejoindre une équipe et mettre mon énergie au service de vos
        projets.
      </p>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <li key={c.label} data-reveal>
            <a
              href={c.href}
              download={c.download}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noreferrer" : undefined}
              className="group flex h-full min-h-52 flex-col justify-between gap-8 rounded-[2rem] bg-on-night/[0.06] p-6 transition-colors duration-500 hover:bg-terra"
              data-cursor=""
            >
              <span className="flex items-start justify-between">
                <span className="pebble grid size-12 place-items-center bg-on-night/10">{c.icon}</span>
                <ArrowUpRight aria-hidden strokeWidth={1.25} className="size-6 opacity-50 transition-transform duration-500 group-hover:rotate-45 group-hover:opacity-100" />
              </span>
              <span>
                <span className="matiere-tag block opacity-60">{c.label}</span>
                <span className="mt-2 block break-all font-display text-xl">{c.value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <button
          type="button"
          onClick={copy}
          className="matiere-tag flex items-center gap-2 text-on-night/70 transition-colors hover:text-on-night"
          data-cursor=""
        >
          {copied ? <Check aria-hidden className="size-4 text-olive" /> : <Copy aria-hidden strokeWidth={1.5} className="size-4" />}
          {copied ? "Adresse copiée" : "Copier l'adresse email"}
        </button>
        <Magnetic>
          <a
            href={`mailto:${identity.email}?subject=${encodeURIComponent("Proposition d'entretien")}`}
            className="flex h-16 items-center gap-3 rounded-full bg-terra px-8 font-medium text-white transition-colors duration-500 hover:bg-on-night hover:text-night"
            data-cursor=""
          >
            Proposer un entretien <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4" />
          </a>
        </Magnetic>
      </div>

      <footer className="mt-[12vh] flex flex-wrap items-center justify-between gap-6 border-t border-on-night/15 pt-6 text-sm text-on-night/60">
        <span className="flex items-center gap-3 text-on-night">
          <Monogram className="size-8" />
          <span className="font-display text-lg">
            {identity.name} <span className="italic text-on-night/60">— {identity.title}</span>
          </span>
        </span>
        <span className="flex flex-wrap items-center gap-6">
          {identity.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="hover:text-on-night" data-cursor="">
              <SocialIcon label={s.label} className="size-4" />
            </a>
          ))}
          <Link href="/systeme" className="hover:text-on-night" data-cursor="">
            Système de design
          </Link>
          <span>© {identity.graduation}</span>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            aria-label="Haut de page"
            className="grid size-10 place-items-center rounded-full border border-on-night/20 transition-colors hover:bg-on-night hover:text-night"
            data-cursor=""
          >
            <ArrowUp aria-hidden strokeWidth={1.5} className="size-4" />
          </button>
        </span>
      </footer>
    </section>
  );
}
