"use client";

import type { ReactNode } from "react";
import { useTheme } from "@/lib/theme";

type Props = {
  classic: ReactNode;
  bento: ReactNode;
  lumiere: ReactNode;
  studio: ReactNode;
  beton: ReactNode;
  claustra: ReactNode;
  bloc: ReactNode;
  maquette: ReactNode;
  chantier: ReactNode;
};

export function ThemedHome({ classic, bento, lumiere, studio, beton, claustra, bloc, maquette, chantier }: Props) {
  const theme = useTheme();
  if (theme === "bento") return bento;
  if (theme === "lumiere") return lumiere;
  if (theme === "studio") return studio;
  if (theme === "beton") return beton;
  if (theme === "claustra") return claustra;
  if (theme === "bloc") return bloc;
  if (theme === "maquette") return maquette;
  if (theme === "chantier") return chantier;
  return classic;
}
