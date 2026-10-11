import { education, experience, identity, languages, projects, skills, technologies } from "./content";

export const WINDOW_IDS = [
  "accueil",
  "apropos",
  "technologies",
  "competences",
  "experience",
  "formation",
  "projets",
  "contact",
] as const;

export type WindowId = (typeof WINDOW_IDS)[number];

export type IconName =
  | "home"
  | "user"
  | "cube"
  | "ruler"
  | "building"
  | "layers"
  | "folder"
  | "mail";

export type WindowDef = {
  id: WindowId;
  label: string;
  layer: string;
  file: string;
  color: string;
  key: string;
  aliases: string[];
  icon: IconName;
  /** Position initiale en % de la zone de dessin, taille max en px. */
  rect: { x: number; y: number; w: number; h: number };
  properties: [string, string][];
};

export const windows: Record<WindowId, WindowDef> = {
  accueil: {
    id: "accueil",
    label: "Accueil",
    layer: "0-ACCUEIL",
    file: "accueil.dwg",
    color: "var(--color-l-white)",
    key: "1",
    aliases: ["accueil", "a", "home"],
    icon: "home",
    rect: { x: 4, y: 6, w: 640, h: 520 },
    properties: [
      ["Nom", identity.name],
      ["Rôle", identity.role],
      ["Ville", identity.city],
    ],
  },
  apropos: {
    id: "apropos",
    label: "À propos",
    layer: "A-APROPOS",
    file: "apropos.dwg",
    color: "var(--color-l-yellow)",
    key: "2",
    aliases: ["apropos", "ap", "bio"],
    icon: "user",
    rect: { x: 22, y: 10, w: 620, h: 560 },
    properties: [
      ["École", "ENA Rabat"],
      ["Depuis", "2020"],
      ["Langues", String(languages.length)],
    ],
  },
  technologies: {
    id: "technologies",
    label: "Technologies",
    layer: "T-LOGICIELS",
    file: "technologies.dwg",
    color: "var(--color-l-cyan)",
    key: "3",
    aliases: ["technologies", "tech", "t", "logiciels"],
    icon: "cube",
    rect: { x: 30, y: 4, w: 680, h: 560 },
    properties: [
      ["Objets", `${technologies.length} logiciels`],
      ["Catégories", "4"],
      ["Tri", "Niveau ↓"],
    ],
  },
  competences: {
    id: "competences",
    label: "Compétences",
    layer: "C-COTES",
    file: "competences.dwg",
    color: "var(--color-l-green)",
    key: "4",
    aliases: ["competences", "comp", "c", "skills"],
    icon: "ruler",
    rect: { x: 12, y: 14, w: 620, h: 560 },
    properties: [
      ["Cotes", String(skills.length)],
      ["Unité", "%"],
      ["Précision", "0"],
    ],
  },
  experience: {
    id: "experience",
    label: "Expérience",
    layer: "E-ELEVATION",
    file: "experience.dwg",
    color: "var(--color-l-orange)",
    key: "5",
    aliases: ["experience", "exp", "e"],
    icon: "building",
    rect: { x: 26, y: 12, w: 700, h: 500 },
    properties: [
      ["Niveaux", String(experience.length)],
      ["Vue", "Élévation sud"],
      ["Échelle", "1/200"],
    ],
  },
  formation: {
    id: "formation",
    label: "Formation",
    layer: "F-FONDATIONS",
    file: "formation.dwg",
    color: "var(--color-l-magenta)",
    key: "6",
    aliases: ["formation", "form", "f", "ecole"],
    icon: "layers",
    rect: { x: 36, y: 16, w: 560, h: 480 },
    properties: [
      ["Entrées", String(education.length)],
      ["École", "ENA Rabat"],
      ["Statut", "En cours"],
    ],
  },
  projets: {
    id: "projets",
    label: "Projets",
    layer: "P-PROJETS",
    file: "projets/",
    color: "var(--color-l-blue)",
    key: "7",
    aliases: ["projets", "proj", "p", "ouvrir"],
    icon: "folder",
    rect: { x: 18, y: 6, w: 760, h: 560 },
    properties: [
      ["Fichiers", `${projects.length} .dwg`],
      ["Type", "Plans"],
      ["Aperçu", "Tracé"],
    ],
  },
  contact: {
    id: "contact",
    label: "Contact",
    layer: "X-CONTACT",
    file: "contact.dwg",
    color: "var(--color-l-red)",
    key: "8",
    aliases: ["contact", "ct", "mail", "tracer"],
    icon: "mail",
    rect: { x: 44, y: 20, w: 520, h: 460 },
    properties: [
      ["Ville", identity.city],
      ["Réseau", "LinkedIn"],
      ["Réponse", "< 48 h"],
    ],
  },
};
