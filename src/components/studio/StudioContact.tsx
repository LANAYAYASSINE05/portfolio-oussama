"use client";

import { ArrowUpRight, Check, Copy, Download, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Monogram, SocialIcon } from "@/components/ui/Logos";
import { Magnetic } from "@/components/ui/Magnetic";
import { identity } from "@/lib/content";
import { Availability } from "./StudioHero";

const linkedin = identity.socials.find((s) => s.label === "LinkedIn");

function Card({ href, label, value, icon, download, external }: {
  href: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  download?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      data-reveal
      data-cursor=""
      className="group flex min-h-56 flex-col justify-between gap-10 bg-night p-6 transition-colors duration-500 hover:bg-on-night/[0.06] md:p-8"
    >
      <span className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-full border border-on-night/20">{icon}</span>
        <ArrowUpRight aria-hidden strokeWidth={1} className="size-7 text-on-night/50 transition-transform duration-500 group-hover:rotate-45 group-hover:text-terra" />
      </span>
      <span>
        <span className="studio-caps block text-on-night/50">{label}</span>
        <span className="mt-2 block break-all text-lg md:text-xl">{value}</span>
      </span>
    </a>
  );
}

export function StudioContact() {
  const { scrollTo } = useSite();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section id="contact" className="bg-night px-[var(--gutter)] pb-8 pt-[16vh] text-on-night">
      <div className="grid grid-cols-12 gap-x-[var(--gutter)] border-t border-on-night/15 pt-5">
        <span className="studio-caps col-span-3 text-on-night/50 md:col-span-2">(07)</span>
        <span className="studio-caps col-span-9 text-on-night/50 md:col-span-3">Contact — Recrutement</span>
      </div>

      <h2 data-studio-title className="mt-10 font-display text-[clamp(3.5rem,12vw,13rem)] uppercase leading-[0.86] tracking-[-0.035em]">
        Travaillons
        <br />
        ensemble.
      </h2>

      <div className="mt-12 grid grid-cols-12 items-end gap-x-[var(--gutter)] gap-y-8">
        <p className="col-span-12 max-w-xl text-xl leading-snug text-on-night/75 md:col-span-7">
          Agences, bureaux d&apos;études, promoteurs : je suis disponible pour rejoindre une équipe et contribuer à vos projets dès maintenant.
        </p>
        <div className="col-span-12 flex flex-wrap items-center gap-4 md:col-span-5 md:justify-end">
          <Availability className="studio-caps text-on-night/80" />
        </div>
      </div>

      <div className="mt-14 grid gap-px border border-on-night/15 bg-on-night/15 sm:grid-cols-2 lg:grid-cols-4">
        <Card href={`mailto:${identity.email}`} label="Email" value={identity.email} icon={<Mail aria-hidden strokeWidth={1.25} className="size-5" />} />
        <Card
          href={`tel:${identity.phone.replace(/\s/g, "")}`}
          label="Téléphone"
          value={identity.phone}
          icon={<Phone aria-hidden strokeWidth={1.25} className="size-5" />}
        />
        {linkedin && (
          <Card href={linkedin.href} label="LinkedIn" value="oussama-ziyati" external icon={<SocialIcon label="LinkedIn" className="size-5" />} />
        )}
        <Card href={identity.cv} label="Curriculum vitae" value="Télécharger le PDF" download icon={<Download aria-hidden strokeWidth={1.25} className="size-5" />} />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <button
          type="button"
          onClick={copy}
          className="studio-caps flex items-center gap-2 text-on-night/70 transition-colors hover:text-on-night"
          data-cursor=""
        >
          {copied ? <Check aria-hidden className="size-4 text-emerald-400" /> : <Copy aria-hidden strokeWidth={1.5} className="size-4" />}
          {copied ? "Adresse copiée" : "Copier l'adresse email"}
        </button>
        <Magnetic>
          <a
            href={`mailto:${identity.email}?subject=${encodeURIComponent("Proposition d'entretien")}`}
            className="studio-caps flex h-16 items-center gap-3 rounded-full bg-terra px-8 text-white transition-colors duration-500 hover:bg-on-night hover:text-night"
            data-cursor=""
          >
            Proposer un entretien <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-4" />
          </a>
        </Magnetic>
      </div>

      <footer className="studio-caps mt-[12vh] flex flex-wrap items-center justify-between gap-6 border-t border-on-night/15 pt-6 text-on-night/60">
        <span className="flex items-center gap-3 text-on-night">
          <Monogram className="size-8" />
          {identity.name} — {identity.title}
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
          <button type="button" onClick={() => scrollTo(0)} className="uppercase hover:text-on-night" data-cursor="">
            Haut de page ↑
          </button>
          <span>© {identity.graduation}</span>
        </span>
      </footer>
    </section>
  );
}
