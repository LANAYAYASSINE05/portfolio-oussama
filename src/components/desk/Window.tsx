"use client";

import { animate, motion, useDragControls, useMotionValue } from "motion/react";
import { windows, type WindowId } from "@/lib/desk";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useDesk } from "./DeskProvider";
import { Icon } from "./Icon";

const spring = { type: "spring", stiffness: 420, damping: 36 } as const;

export function Window({ id, children }: { id: WindowId; children: React.ReactNode }) {
  const def = windows[id];
  const desk = useDesk();
  const { desktopRef } = desk;
  const state = desk.windows[id];
  const isFocused = desk.focused === id;
  const isDesktop = useMediaQuery("(min-width: 1024px)", true);
  const maximized = state.maximized || !isDesktop;

  const controls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const toggleMax = () => {
    if (!state.maximized) {
      animate(x, 0, spring);
      animate(y, 0, spring);
    }
    desk.maximize(id);
  };

  const { rect } = def;
  const placement = maximized
    ? { left: 0, top: 0, width: "100%", height: "100%" }
    : {
        left: `${rect.x}%`,
        top: `${rect.y}%`,
        width: `min(${rect.w}px, calc(100% - ${rect.x}% - 1rem))`,
        height: `min(${rect.h}px, calc(100% - ${rect.y}% - 1rem))`,
      };

  return (
    <motion.section
      role="dialog"
      aria-label={def.label}
      layout
      drag={!maximized}
      dragListener={false}
      dragControls={controls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={desktopRef}
      onPointerDown={() => !isFocused && desk.focus(id)}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ ...spring, layout: spring }}
      style={{ ...placement, x, y, zIndex: state.z }}
      className={`absolute flex flex-col overflow-hidden border bg-panel/95 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] backdrop-blur-md ${
        maximized ? "rounded-none" : "rounded-lg"
      } ${isFocused ? "border-select/70" : "border-edge"}`}
    >
      <header
        onPointerDown={(e) => !maximized && controls.start(e)}
        onDoubleClick={() => isDesktop && toggleMax()}
        className={`flex h-9 shrink-0 select-none items-center gap-2 border-b border-edge px-3 ${
          maximized ? "" : "cursor-grab active:cursor-grabbing"
        } ${isFocused ? "bg-panel-2" : "bg-panel"}`}
      >
        <span className="size-2.5 rounded-[2px]" style={{ background: def.color }} />
        <Icon name={def.icon} className="size-3.5 text-muted" />
        <h2 className="truncate text-[13px] font-medium">{def.label}</h2>
        <span className="label hidden truncate text-dim sm:inline">— {def.file}</span>
        <div className="ml-auto flex items-center" onPointerDown={(e) => e.stopPropagation()}>
          <WinButton label="Réduire" onClick={() => desk.minimize(id)} icon="minus" />
          {isDesktop && (
            <WinButton label={state.maximized ? "Restaurer" : "Agrandir"} onClick={toggleMax} icon="square" />
          )}
          <WinButton label="Fermer" onClick={() => desk.close(id)} icon="close" danger />
        </div>
      </header>
      <div className="desk-scroll @container min-h-0 flex-1 overflow-auto">{children}</div>
    </motion.section>
  );
}

function WinButton({
  label,
  onClick,
  icon,
  danger,
}: {
  label: string;
  onClick: () => void;
  icon: "minus" | "square" | "close";
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`grid size-7 place-items-center rounded text-muted transition-colors hover:text-fg ${
        danger ? "hover:bg-l-red/80" : "hover:bg-edge"
      }`}
    >
      <Icon name={icon} className="size-3.5" />
    </button>
  );
}
