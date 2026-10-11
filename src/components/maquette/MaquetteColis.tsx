"use client";

import { motion } from "motion/react";
import { Check, Copy, Download, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Monogram, SocialIcon } from "@/components/ui/Logos";
import { gsap, useGSAP } from "@/lib/gsap";
import { identity } from "@/lib/content";
import { MaquetteTitle } from "./shared";

const linkedin = identity.socials.find((s) => s.label === "LinkedIn");

export function MaquetteColis() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSite();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: "[data-mq-box]", start: "top 85%", end: "top 35%", scrub: 0.6 } })
          .fromTo("[data-mq-lid]", { rotateX: 0, zIndex: 30 }, { rotateX: 90, duration: 0.5, ease: "none" })
          .set("[data-mq-lid]", { zIndex: 5 })
          .to("[data-mq-lid]", { rotateX: 168, duration: 0.5, ease: "none" })
          .fromTo("[data-mq-card]", { yPercent: 75, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 0.45);
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-mq-lid]", { rotateX: 168, zIndex: 5 });
      });
    },
    { scope: root },
  );

  const tags = [
    { label: "Téléphone", value: identity.phone, href: `tel:${identity.phone.replace(/\s/g, "")}`, icon: <Phone aria-hidden className="size-5" /> },
    ...(linkedin ? [{ label: "LinkedIn", value: "oussama-ziyati", href: linkedin.href, external: true, icon: <SocialIcon label="LinkedIn" className="size-5" /> }] : []),
    { label: "Curriculum", value: "Télécharger le PDF", href: identity.cv, download: true, icon: <Download aria-hidden className="size-5" /> },
  ];

  return (
    <section id="contact" data-room="contact" ref={root} className="mat px-[var(--gutter)] pb-8 pt-[14vh] lg:pb-32">
      <MaquetteTitle plate={7} tag="Contact" title="On emballe ? Écrivez-moi." note="le colis s'ouvre en descendant" />

      <div data-mq-box className="relative mx-auto max-w-3xl [perspective:1600px]">
        <div className="relative h-[19rem] md:h-[17rem]">
          <div data-mq-card className="foam absolute inset-x-4 bottom-0 z-10 rounded-[2px] p-6 pb-14 md:inset-x-10 md:p-8 md:pb-16">
            <p className="font-hand text-3xl text-[#b8461a]">Bonjour, parlons de votre prochain projet.</p>
            <a href={`mailto:${identity.email}`} className="mt-3 block break-all font-display text-[clamp(1.6rem,4.2vw,2.75rem)] uppercase leading-none" data-cursor="">
              {identity.email}
            </a>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`mailto:${identity.email}?subject=${encodeURIComponent("Proposition d'entretien")}`}
                className="flex items-center gap-2 rounded-[2px] bg-terra px-5 py-3 font-display text-lg uppercase text-night shadow-[0_4px_0_#a8360c] transition-transform hover:-translate-y-0.5"
                data-cursor=""
              >
                <Mail aria-hidden className="size-5" />
                Proposer un entretien
              </a>
              <button
                type="button"
                onClick={copy}
                className="flex items-center gap-2 rounded-[2px] border-2 border-[#1b1a17] px-5 py-3 font-display text-lg uppercase transition-colors hover:bg-[#1b1a17] hover:text-[#efe9dc]"
                data-cursor=""
              >
                {copied ? <Check aria-hidden className="size-5" /> : <Copy aria-hidden className="size-5" />}
                {copied ? "Copié" : "Copier l'email"}
              </button>
            </div>
          </div>
        </div>

        <div className="kraft relative z-20 h-56 rounded-b-[3px] px-6 pb-6 pt-16 shadow-[0_30px_50px_rgb(0_0_0/0.6)] md:h-60 md:px-10">
          <span aria-hidden className="absolute inset-x-0 top-0 h-2 bg-[#6e4a26]" />
          <div className="flex h-full flex-wrap items-end justify-between gap-4">
            <div className="font-mono text-xs font-bold uppercase leading-relaxed tracking-[0.15em]">
              <p className="opacity-60">Expéditeur</p>
              <p>{identity.name}</p>
              <p>{identity.city}</p>
            </div>
            <div className="-rotate-6 border-[3px] border-[#a8360c] px-3 py-1 font-display text-2xl uppercase text-[#a8360c] md:text-3xl">Fragile · maquette</div>
            <div className="text-right font-mono text-xs font-bold uppercase leading-relaxed tracking-[0.15em]">
              <p className="opacity-60">Destinataire</p>
              <p>Votre agence</p>
              <p className="font-hand text-xl normal-case tracking-normal">dès que possible</p>
            </div>
          </div>
        </div>

        <div data-mq-lid className="absolute inset-x-0 top-[19rem] z-30 h-28 origin-top [transform-style:preserve-3d] md:top-[17rem] md:h-32">
          <div className="kraft absolute inset-0 flex items-center justify-center rounded-b-[3px] border-b-4 border-[#6e4a26]/40 [backface-visibility:hidden]">
            <span className="tape -rotate-1 px-8 py-2 font-hand text-2xl">ouvrir ici ↓</span>
          </div>
          <div className="kraft absolute inset-0 rounded-t-[3px] brightness-75 [backface-visibility:hidden] [transform:rotateX(180deg)]" />
        </div>
      </div>

      <div className="relative mx-auto mt-20 max-w-4xl">
        <span aria-hidden className="balsa absolute inset-x-0 top-0 block h-3 rounded-sm shadow-[0_6px_10px_rgb(0_0_0/0.4)]" />
        <ul className="grid gap-6 pt-1 sm:grid-cols-3">
          {tags.map((t, i) => (
            <li key={t.label} className="flex flex-col items-center">
              <span aria-hidden className="block h-10 w-px bg-ink/50" />
              <motion.a
                href={t.href}
                download={t.download}
                target={t.external ? "_blank" : undefined}
                rel={t.external ? "noreferrer" : undefined}
                style={{ transformOrigin: "50% -2.5rem" }}
                initial={{ rotate: i % 2 === 0 ? -4 : 4 }}
                whileHover={{ rotate: [i % 2 === 0 ? -4 : 4, 6, -5, 3, 0] }}
                transition={{ duration: 0.9 }}
                className="kraft relative flex w-full max-w-60 flex-col items-center gap-2 px-6 pb-6 pt-9 text-center shadow-[0_12px_20px_rgb(0_0_0/0.45)] [clip-path:polygon(22%_0,78%_0,100%_14%,100%_100%,0_100%,0_14%)]"
                data-cursor=""
              >
                <span aria-hidden className="absolute left-1/2 top-3 size-3 -translate-x-1/2 rounded-full bg-paper shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)]" />
                {t.icon}
                <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] opacity-70">{t.label}</span>
                <span className="font-display text-xl uppercase leading-tight">{t.value}</span>
              </motion.a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="mt-[12vh] flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6 text-sm">
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
