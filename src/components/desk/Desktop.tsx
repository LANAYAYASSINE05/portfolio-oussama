"use client";

import { AnimatePresence } from "motion/react";
import { WINDOW_IDS, type WindowId } from "@/lib/desk";
import { BootScreen } from "./BootScreen";
import { MenuBar, StatusBar, ToolPalette } from "./Chrome";
import { CommandLine } from "./CommandLine";
import { DeskProvider, useDesk } from "./DeskProvider";
import { ModelSpace } from "./ModelSpace";
import { LayersPanel, PropertiesPanel } from "./Panels";
import { Window } from "./Window";
import { AccueilWindow } from "./windows/AccueilWindow";
import { AproposWindow } from "./windows/AproposWindow";
import { CompetencesWindow } from "./windows/CompetencesWindow";
import { ContactWindow } from "./windows/ContactWindow";
import { ExperienceWindow } from "./windows/ExperienceWindow";
import { FormationWindow } from "./windows/FormationWindow";
import { ProjetsWindow } from "./windows/ProjetsWindow";
import { TechnologiesWindow } from "./windows/TechnologiesWindow";

const contents: Record<WindowId, () => React.JSX.Element> = {
  accueil: AccueilWindow,
  apropos: AproposWindow,
  technologies: TechnologiesWindow,
  competences: CompetencesWindow,
  experience: ExperienceWindow,
  formation: FormationWindow,
  projets: ProjetsWindow,
  contact: ContactWindow,
};

function Windows() {
  const desk = useDesk();
  return (
    <AnimatePresence>
      {WINDOW_IDS.filter((id) => desk.windows[id].open && !desk.windows[id].minimized).map((id) => {
        const Content = contents[id];
        return (
          <Window key={id} id={id}>
            <Content />
          </Window>
        );
      })}
    </AnimatePresence>
  );
}

function Workspace() {
  const { desktopRef } = useDesk();
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto] overflow-hidden bg-desk text-fg">
      <MenuBar />
      <div className="grid min-h-0 grid-rows-[1fr_auto] lg:grid-cols-[3.5rem_1fr] lg:grid-rows-1 xl:grid-cols-[3.5rem_1fr_17rem]">
        <div className="order-2 lg:order-none lg:min-h-0 [&>nav]:lg:h-full">
          <ToolPalette />
        </div>
        <main ref={desktopRef} className="relative min-h-0 overflow-hidden">
          <ModelSpace />
          <Windows />
        </main>
        <aside className="hidden min-h-0 grid-rows-[auto_1fr] border-l border-edge bg-panel xl:grid">
          <LayersPanel />
          <PropertiesPanel />
        </aside>
      </div>
      <div className="hidden lg:block">
        <CommandLine />
        <StatusBar />
      </div>
      <BootScreen />
    </div>
  );
}

export function Desktop() {
  return (
    <DeskProvider>
      <Workspace />
    </DeskProvider>
  );
}
