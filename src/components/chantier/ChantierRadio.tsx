"use client";

import { motion } from "motion/react";
import { Check, ChevronDown, ChevronUp, Copy, Download, Mail, Phone, Radio } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Monogram, SocialIcon } from "@/components/ui/Logos";
import { identity } from "@/lib/content";
import { BarrierTape, ChantierTitle } from "./shared";

type Channel = { id: string; label: string; value: string; href: string; action: string; icon: ReactNode; external?: boolean; download?: boolean };

const linkedin = identity.socials.find((s) => s.label === "LinkedIn");
const [emailUser, emailDomain] = identity.email.split("@");

const channels: Channel[] = [
  { id: "email", label: "Email", value: identity.email, href: `mailto:${identity.email}?subject=${encodeURIComponent("Proposition d'entretien")}`, action: "Écrire", icon: <Mail aria-hidden className="size-5" /> },
  { id: "tel", label: "Téléphone", value: identity.phone, href: `tel:${identity.phone.replace(/\s/g, "")}`, action: "Appeler", icon: <Phone aria-hidden className="size-5" /> },
  ...(linkedin
    ? [{ id: "linkedin", label: "LinkedIn", value: "oussama-ziyati", href: linkedin.href, action: "Ouvrir", external: true, icon: <SocialIcon label="LinkedIn" className="size-5" /> }]
    : []),
  { id: "cv", label: "CV", value: "cv-oussama-ziyati.pdf", href: identity.cv, action: "Télécharger", download: true, icon: <Download aria-hidden className="size-5" /> },
];

export function ChantierRadio() {
  const { scrollTo } = useSite();
  const [ch, setCh] = useState(0);
  const [heard, setHeard] = useState(false);
  const [copied, setCopied] = useState(false);
  const channel = channels[ch];
  const go = (next: number) => {
    setCh((next + channels.length) % channels.length);
    setHeard(false);
  };

  const talk = () => {
    setHeard(true);
    setTimeout(() => setHeard(false), 2200);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(channel.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section id="contact" data-room="contact" className="relative bg-night pt-[14vh]">
      <div className="px-[var(--gutter)]">
        <ChantierTitle lot={7} tag="Contact" title="Base vie, à vous." sub="Choisissez un canal, appuyez pour parler" />

        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
          <div data-reveal className="relative mx-auto w-full max-w-[22rem] pt-24">
            <span aria-hidden className="absolute left-[18%] top-0 h-28 w-5 rounded-t-full bg-gradient-to-r from-[#1b1d1f] via-[#3a3f45] to-[#1b1d1f]" />
            <span aria-hidden className="absolute right-[20%] top-14 h-14 w-9 rounded-t-md bg-[#2b2f33]" />

            <div className="relative rounded-[2.2rem] bg-gradient-to-b from-[#2f3338] to-[#1b1d1f] p-5 shadow-[0_40px_70px_rgb(0_0_0/0.7),inset_0_2px_0_rgb(255_255_255/0.08)]">
              <span aria-hidden className="absolute -left-2 top-28 h-24 w-3 rounded-l-lg bg-terra" />
              <div className="flex items-center justify-between px-2">
                <motion.button
                  type="button"
                  onClick={() => go(ch + 1)}
                  animate={{ rotate: ch * 90 }}
                  transition={{ type: "spring", stiffness: 200, damping: 16 }}
                  aria-label="Canal suivant"
                  className="relative grid size-14 place-items-center rounded-full bg-[repeating-conic-gradient(#1b1d1f_0_10deg,#3a3f45_10deg_20deg)] shadow-[0_4px_8px_rgb(0_0_0/0.6)]"
                  data-cursor="Canal"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-[#2b2f33]">
                    <span className="mb-4 block h-3 w-1 rounded-full bg-terra" />
                  </span>
                </motion.button>
                <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-graphite">
                  <span className={`size-2.5 rounded-full ${heard ? "bg-[#ff3b30] shadow-[0_0_10px_#ff3b30]" : "bg-[#34d27b] shadow-[0_0_8px_#34d27b]"}`} />
                  {heard ? "TX" : "RX"}
                </span>
              </div>

              <div className="mt-5 rounded-xl bg-[#0d0f10] p-2.5 shadow-[inset_0_2px_6px_rgb(0_0_0/0.9)]">
                <div aria-live="polite" className="min-h-[7.5rem] rounded-md bg-[#a7c46b] p-3 font-mono text-[#1d2a10] shadow-[inset_0_0_18px_rgb(40_60_10/0.45)]">
                  <div className="flex items-center justify-between text-[0.65rem] font-bold uppercase">
                    <span>CH {String(ch + 1).padStart(2, "0")}</span>
                    <span className="flex items-end gap-0.5" aria-hidden>
                      {[1, 2, 3, 4].map((b) => (
                        <span key={b} className="w-1 bg-[#1d2a10]" style={{ height: `${b * 3}px` }} />
                      ))}
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-bold uppercase leading-none">{heard ? "Bien reçu" : channel.label}</p>
                  <p className="mt-2 break-all text-sm leading-snug">{heard ? "À vous, terminé." : channel.value}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <button type="button" onClick={() => go(ch - 1)} aria-label="Canal précédent" className="grid size-11 place-items-center rounded-lg bg-[#3a3f45] text-ink shadow-[0_3px_0_#111] active:translate-y-0.5 active:shadow-none" data-cursor="">
                  <ChevronUp aria-hidden className="size-5" />
                </button>
                <button type="button" onClick={copy} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#3a3f45] py-3 font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink shadow-[0_3px_0_#111] active:translate-y-0.5 active:shadow-none" data-cursor="">
                  {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
                  {copied ? "Copié" : "Copier"}
                </button>
                <button type="button" onClick={() => go(ch + 1)} aria-label="Canal suivant" className="grid size-11 place-items-center rounded-lg bg-[#3a3f45] text-ink shadow-[0_3px_0_#111] active:translate-y-0.5 active:shadow-none" data-cursor="">
                  <ChevronDown aria-hidden className="size-5" />
                </button>
              </div>

              <div aria-hidden className="mt-5 h-12 rounded-xl sm:h-20 bg-[radial-gradient(#0d0f10_2.2px,transparent_2.6px)] [background-size:11px_11px]" />

              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noreferrer" : undefined}
                download={channel.download}
                onClick={talk}
                className="mt-5 flex items-center justify-center gap-3 rounded-2xl bg-terra py-5 font-display text-2xl uppercase text-[#111] shadow-[0_6px_0_#a07a00] transition-transform active:translate-y-1.5 active:shadow-none"
                data-cursor=""
              >
                <Radio aria-hidden className="size-6" />
                {channel.action}
              </a>
              <p className="mt-2 text-center font-mono text-[0.55rem] uppercase tracking-[0.2em] text-graphite">Push to talk</p>
            </div>
          </div>

          <div data-reveal>
            <p className="max-w-xl text-xl leading-relaxed text-ink/85">
              Une agence qui cherche un architecte junior pour ses projets de logements ? Je suis disponible pour un entretien, un test ou un premier projet.
            </p>
            <a href={`mailto:${identity.email}`} className="mt-6 block break-words font-display text-[clamp(1.75rem,7.5vw,4.25rem)] uppercase leading-[0.9] text-terra hover:text-ink lg:text-[clamp(2rem,4.6vw,4.25rem)]" data-cursor="">
              {emailUser}@<wbr />
              {emailDomain}
            </a>

            <p className="mt-12 mb-4 font-mono text-xs uppercase tracking-[0.2em] text-graphite">Fiche des canaux</p>
            <ul className="border-t border-line">
              {channels.map((c, i) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-pressed={i === ch}
                    className={`flex w-full items-center gap-5 border-b border-line py-4 text-left transition-colors ${i === ch ? "text-terra" : "hover:text-terra"}`}
                    data-cursor=""
                  >
                    <span className="font-stencil text-2xl">{String(i + 1).padStart(2, "0")}</span>
                    {c.icon}
                    <span className="font-display text-2xl uppercase leading-none">{c.label}</span>
                    <span className="ml-auto hidden truncate font-mono text-xs text-graphite sm:block">{c.value}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <BarrierTape text="Fin de chantier · merci de votre visite" reverse className="mt-[14vh] rotate-1" />

      <footer className="flex flex-wrap items-center justify-between gap-6 px-[var(--gutter)] pb-10 pt-8 text-sm lg:pb-8">
        <span className="flex items-center gap-3">
          <Monogram className="size-8 text-terra" />
          {identity.name} — {identity.title}
        </span>
        <span className="flex flex-wrap items-center gap-5 text-graphite">
          {identity.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="hover:text-ink" data-cursor="">
              <SocialIcon label={s.label} className="size-4" />
            </a>
          ))}
          <Link href="/systeme" className="hover:text-ink" data-cursor="">
            Système de design
          </Link>
          <button type="button" onClick={() => scrollTo(0)} className="hover:text-ink" data-cursor="">
            ↑ Haut de page
          </button>
          <span>© {identity.graduation}</span>
        </span>
      </footer>
    </section>
  );
}
