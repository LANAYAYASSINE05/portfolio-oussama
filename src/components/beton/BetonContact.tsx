"use client";

import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Monogram, SocialIcon } from "@/components/ui/Logos";
import { identity } from "@/lib/content";
import { Availability } from "./shared";

const linkedin = identity.socials.find((s) => s.label === "LinkedIn");

export function BetonContact() {
  const { scrollTo } = useSite();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const cells = [
    { label: "Téléphone", value: identity.phone, href: `tel:${identity.phone.replace(/\s/g, "")}` },
    ...(linkedin ? [{ label: "LinkedIn", value: "oussama-ziyati", href: linkedin.href, external: true }] : []),
    { label: "Curriculum vitae", value: "Télécharger le PDF", href: identity.cv, download: true },
  ];

  return (
    <section id="contact" className="mt-[14vh] bg-terra text-ink">
      <div className="beton-hazard h-4" />
      <div className="beton-mono flex items-center justify-between gap-4 border-b-2 border-ink px-[var(--gutter)] py-2.5">
        <span className="flex items-center gap-4">
          <span className="bg-ink px-1.5 py-0.5 text-terra">§07</span>
          Contact — Recrutement
        </span>
        <Availability className="hidden sm:inline-flex" dot="bg-ink" />
      </div>

      <h2 data-beton-title className="border-b-2 border-ink px-[var(--gutter)] pb-4 pt-8 font-display text-[clamp(2rem,8.8vw,13rem)] leading-[0.82]">
        Construisons
        <br />
        ensemble.
      </h2>

      <div className="grid border-b-2 border-ink md:grid-cols-12">
        <p className="border-b-2 border-ink p-[var(--gutter)] text-xl font-medium leading-snug md:col-span-5 md:border-b-0 md:border-r-2">
          Agences, bureaux d&apos;études, promoteurs : je suis disponible dès maintenant pour rejoindre votre équipe.
        </p>
        <div className="flex flex-col md:col-span-7">
          <a
            href={`mailto:${identity.email}?subject=${encodeURIComponent("Proposition d'entretien")}`}
            className="group flex flex-1 items-center justify-between gap-4 bg-ink p-[var(--gutter)] text-paper transition-colors hover:bg-paper hover:text-ink"
            data-cursor=""
          >
            <span>
              <span className="beton-mono block text-terra">Email — proposer un entretien</span>
              <span className="mt-2 block break-all text-[clamp(1.25rem,2.6vw,2.25rem)] font-bold">{identity.email}</span>
            </span>
            <ArrowUpRight aria-hidden strokeWidth={2} className="size-10 shrink-0 transition-transform duration-300 group-hover:rotate-45" />
          </a>
          <button
            type="button"
            onClick={copy}
            className="beton-mono flex items-center gap-2 border-t-2 border-ink px-[var(--gutter)] py-3 text-left transition-colors hover:bg-ink hover:text-paper"
            data-cursor=""
          >
            {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden strokeWidth={2} className="size-4" />}
            {copied ? "Adresse copiée" : "Copier l'adresse email"}
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3">
        {cells.map((c, i) => (
          <a
            key={c.label}
            href={c.href}
            download={c.download}
            target={c.external ? "_blank" : undefined}
            rel={c.external ? "noreferrer" : undefined}
            className={`group flex items-end justify-between gap-4 border-b-2 border-ink p-[var(--gutter)] transition-colors hover:bg-ink hover:text-terra ${i < cells.length - 1 ? "sm:border-r-2" : ""}`}
            data-cursor=""
          >
            <span>
              <span className="beton-mono block opacity-70">{c.label}</span>
              <span className="mt-2 block text-lg font-bold">{c.value}</span>
            </span>
            {c.download ? (
              <Download aria-hidden strokeWidth={2} className="size-6 shrink-0" />
            ) : (
              <ArrowUpRight aria-hidden strokeWidth={2} className="size-6 shrink-0" />
            )}
          </a>
        ))}
      </div>

      <footer className="beton-mono flex flex-wrap items-center justify-between gap-6 bg-ink px-[var(--gutter)] py-5 text-paper">
        <span className="flex items-center gap-3">
          <Monogram className="size-8 text-terra" />
          {identity.name} — {identity.title}
        </span>
        <span className="flex flex-wrap items-center gap-6">
          {identity.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="hover:text-terra" data-cursor="">
              <SocialIcon label={s.label} className="size-4" />
            </a>
          ))}
          <Link href="/systeme" className="hover:text-terra" data-cursor="">
            Système de design
          </Link>
          <button type="button" onClick={() => scrollTo(0)} className="uppercase hover:text-terra" data-cursor="">
            Haut de page ↑
          </button>
          <span>© {identity.graduation}</span>
        </span>
      </footer>
    </section>
  );
}
