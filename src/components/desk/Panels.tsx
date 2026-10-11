"use client";

import { AnimatePresence, motion } from "motion/react";
import { WINDOW_IDS, windows } from "@/lib/desk";
import { useDesk } from "./DeskProvider";
import { Icon } from "./Icon";

function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="label flex h-8 shrink-0 items-center border-b border-edge bg-panel-2 px-3 text-muted">
      {children}
    </h2>
  );
}

export function LayersPanel() {
  const desk = useDesk();

  return (
    <section className="flex min-h-0 flex-col border-b border-edge">
      <PanelTitle>Gestionnaire des calques</PanelTitle>
      <div className="label grid grid-cols-[1.75rem_1rem_1fr_auto] gap-x-2 border-b border-edge px-3 py-1.5 text-dim">
        <span>Vis.</span>
        <span />
        <span>Nom</span>
        <span>État</span>
      </div>
      <ul className="desk-scroll min-h-0 overflow-auto py-1">
        {WINDOW_IDS.map((id) => {
          const def = windows[id];
          const state = desk.windows[id];
          const visible = state.open && !state.minimized;
          const selected = desk.focused === id;
          return (
            <li key={id}>
              <div
                className={`grid grid-cols-[1.75rem_1rem_1fr_auto] items-center gap-x-2 px-3 py-1 text-[12.5px] ${
                  selected ? "bg-select/15" : "hover:bg-edge/60"
                }`}
              >
                <button
                  type="button"
                  aria-label={visible ? `Masquer ${def.label}` : `Afficher ${def.label}`}
                  onClick={() => (visible ? desk.minimize(id) : desk.open(id))}
                  className={visible ? "text-fg" : "text-dim"}
                >
                  <Icon name={visible ? "eye" : "eye-off"} className="size-3.5" />
                </button>
                <span className="size-2.5 rounded-[2px]" style={{ background: def.color }} />
                <button
                  type="button"
                  onClick={() => desk.open(id)}
                  className={`truncate text-left font-mono text-[11.5px] ${selected ? "text-select" : ""}`}
                >
                  {def.layer}
                </button>
                <span className="label text-dim">
                  {!state.open ? "—" : state.minimized ? "Réduit" : "Actif"}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function PropertiesPanel() {
  const desk = useDesk();
  const def = desk.focused ? windows[desk.focused] : null;

  const rows: [string, React.ReactNode][] = def
    ? [
        ["Calque", def.layer],
        [
          "Couleur",
          <span key="c" className="flex items-center gap-2">
            <span className="size-2.5 rounded-[2px]" style={{ background: def.color }} />
            DuCalque
          </span>,
        ],
        ["Type de ligne", "Continu"],
        ["Épaisseur", "0.25 mm"],
        ...def.properties,
      ]
    : [
        ["Fichier", "oussama-ziyati.dwg"],
        ["Unités", "Mètres"],
        ["Échelle", "1/100"],
        ["Objets", `${WINDOW_IDS.length} calques`],
      ];

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <PanelTitle>Propriétés</PanelTitle>
      <div className="flex items-center gap-2 border-b border-edge px-3 py-2 text-[12.5px]">
        <Icon name={def?.icon ?? "layers"} className="size-3.5 text-muted" />
        <span className="truncate">{def ? def.label : "Aucune sélection"}</span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.dl
          key={def?.id ?? "none"}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.18 }}
          className="desk-scroll min-h-0 overflow-auto text-[12px]"
        >
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[6.5rem_1fr] border-b border-edge/60">
              <dt className="border-r border-edge/60 px-3 py-1.5 text-muted">{k}</dt>
              <dd className="truncate px-3 py-1.5">{v}</dd>
            </div>
          ))}
        </motion.dl>
      </AnimatePresence>
      <div className="label mt-auto space-y-1 border-t border-edge p-3 text-dim">
        <p>
          <kbd className="text-muted">1–8</kbd> ouvrir · <kbd className="text-muted">Échap</kbd> fermer
        </p>
        <p>
          Molette zoom · glisser déplacer · double-clic ZE
        </p>
      </div>
    </section>
  );
}
