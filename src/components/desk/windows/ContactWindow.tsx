"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { identity } from "@/lib/content";

export function ContactWindow() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const fields: [string, string][] = [
    ["Destinataire", identity.name],
    ["Email", identity.email],
    ["Téléphone", identity.phone],
    ["Ville", identity.city],
  ];

  return (
    <div className="flex min-h-full flex-col gap-5 p-5">
      <div>
        <p className="label text-dim">Tracer — envoyer un message</p>
        <h3 className="mt-2 font-display text-4xl leading-none">
          Parlons de votre <span className="italic text-l-red">projet</span>.
        </h3>
      </div>

      <div className="overflow-hidden rounded-md border border-edge text-[13px]">
        {fields.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[7rem_1fr] border-b border-edge last:border-b-0">
            <span className="border-r border-edge bg-panel-2 px-3 py-2 text-muted">{k}</span>
            <span className="truncate px-3 py-2 font-mono text-[12.5px]">{v}</span>
          </div>
        ))}
      </div>

      <div>
        <p className="label mb-2 text-dim">Réseaux</p>
        <div className="flex flex-wrap gap-1.5">
          {identity.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-edge-2 px-3 py-1.5 text-[12.5px] text-muted transition-colors hover:border-fg hover:text-fg"
            >
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-wrap justify-end gap-2 border-t border-edge pt-4">
        <button
          type="button"
          onClick={copy}
          className="relative min-w-36 overflow-hidden rounded border border-edge-2 px-4 py-2 text-[13px] transition-colors hover:bg-panel-2"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "ok" : "copy"}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={`block ${copied ? "text-l-green" : ""}`}
            >
              {copied ? "✓ Copié" : "Copier l'email"}
            </motion.span>
          </AnimatePresence>
        </button>
        <a
          href={`mailto:${identity.email}`}
          className="rounded bg-select px-4 py-2 text-[13px] font-medium text-desk transition-opacity hover:opacity-90"
        >
          Envoyer un email
        </a>
      </div>
    </div>
  );
}
