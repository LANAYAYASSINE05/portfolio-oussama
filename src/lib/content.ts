export type DrawingVariant = "villa" | "tower" | "pavilion" | "riad";

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  location: string;
  year: string;
  type: string;
  surface: string;
  material: string;
  tone: { from: string; to: string; ink: string };
  drawing: DrawingVariant;
  /** Optional render in /public (e.g. "/projets/villa-azur.jpg"); falls back to a drawn visual. */
  image?: string;
};

export const identity = {
  name: "Oussama Ziyati",
  firstName: "Oussama",
  lastName: "Ziyati",
  nameAr: "أسامة الزياتي",
  role: "Architecte diplômé de l'ENA Rabat",
  title: "Architecte diplômé",
  graduation: "2026",
  availability: "Disponible — ouvert aux opportunités",
  cv: "/cv-oussama-ziyati.pdf",
  city: "Casablanca, Maroc",
  school: "École Nationale d'Architecture de Rabat",
  headline: "Conception 2D/3D — plans, rendus, modélisation · Logements (villas, immeubles)",
  coords: "33.5731° N — 7.5898° W",
  email: "contact@oussamaziyati.com",
  phone: "+212 6 00 00 00 00",
  portrait: "",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/oussama-ziyati-324a66245" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Behance", href: "https://behance.net" },
  ],
};

export const navigation = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#a-propos" },
  { label: "Technologies", href: "#technologies" },
  { label: "Compétences", href: "#competences" },
  { label: "Expérience", href: "#experience" },
  { label: "Formation", href: "#formation" },
];

export const secondaryNavigation = [
  { label: "Projets", href: "#projets" },
  { label: "Contact", href: "#contact" },
  { label: "Système", href: "/systeme" },
];

export const bio = [
  "Architecte diplômé de l'École Nationale d'Architecture de Rabat (promotion 2026), je vis et travaille à Casablanca. Je maîtrise toute la chaîne de conception 2D et 3D : plans, modélisation et rendus.",
  "J'ai développé une expérience concrète sur des projets de logements, des villas aux immeubles. Je souhaite aujourd'hui mettre cette rigueur et cette sensibilité au service d'une agence ou d'une entreprise exigeante.",
];

export type Technology = {
  symbol: string;
  name: string;
  category: TechCategory;
  level: number;
};

export type TechCategory = "Conception & BIM" | "Modélisation 3D" | "Rendu" | "Graphisme";

export const techCategories: TechCategory[] = ["Conception & BIM", "Modélisation 3D", "Rendu", "Graphisme"];

export const technologies: Technology[] = [
  { symbol: "Ac", name: "AutoCAD", category: "Conception & BIM", level: 95 },
  { symbol: "Rv", name: "Revit", category: "Conception & BIM", level: 92 },
  { symbol: "Ar", name: "ArchiCAD", category: "Conception & BIM", level: 80 },
  { symbol: "Nw", name: "Navisworks", category: "Conception & BIM", level: 70 },
  { symbol: "Su", name: "SketchUp", category: "Modélisation 3D", level: 94 },
  { symbol: "Rh", name: "Rhino", category: "Modélisation 3D", level: 85 },
  { symbol: "Gh", name: "Grasshopper", category: "Modélisation 3D", level: 72 },
  { symbol: "3d", name: "3ds Max", category: "Modélisation 3D", level: 78 },
  { symbol: "Lu", name: "Lumion", category: "Rendu", level: 90 },
  { symbol: "Vr", name: "V-Ray", category: "Rendu", level: 86 },
  { symbol: "En", name: "Enscape", category: "Rendu", level: 88 },
  { symbol: "Tm", name: "Twinmotion", category: "Rendu", level: 75 },
  { symbol: "Ps", name: "Photoshop", category: "Graphisme", level: 90 },
  { symbol: "Ai", name: "Illustrator", category: "Graphisme", level: 82 },
  { symbol: "Id", name: "InDesign", category: "Graphisme", level: 85 },
  { symbol: "Fg", name: "Figma", category: "Graphisme", level: 65 },
];

export const skills = [
  { name: "Plans & dessin technique 2D", level: 92 },
  { name: "Modélisation 3D", level: 90 },
  { name: "Rendus & visualisation", level: 88 },
  { name: "Conception architecturale", level: 85 },
  { name: "Conception de logements", level: 84 },
  { name: "Maquette numérique BIM", level: 75 },
  { name: "Architecture intérieure", level: 70 },
];

export const qualities = [
  "Sens du détail",
  "Créativité",
  "Rigueur",
  "Curiosité",
  "Travail en équipe",
  "Esprit de synthèse",
  "Autonomie",
  "Écoute",
  "Sens de l'espace",
  "Persévérance",
];

export const languages = [
  { name: "Arabe", level: "Langue maternelle" },
  { name: "Français", level: "Courant" },
  { name: "Anglais", level: "Professionnel" },
];

export const experience = [
  {
    floor: "R+2",
    period: "2023 — Aujourd'hui",
    role: "Conception 2D/3D",
    company: "Projets de logements",
    location: "Casablanca",
    text: "Conception de projets résidentiels, des villas aux immeubles : plans d'exécution, modélisation 3D et rendus pour présenter chaque projet aux clients.",
    missions: ["Plans 2D", "Modélisation 3D", "Rendus", "Villas & immeubles"],
  },
  {
    floor: "R+1",
    period: "2020 — 2026",
    role: "Projets d'atelier & diplôme",
    company: "École Nationale d'Architecture",
    location: "Rabat",
    text: "Projets académiques d'habitat, d'équipements et de patrimoine, jusqu'au projet de fin d'études : analyse de site, esquisses, maquettes et soutenance devant jury.",
    missions: ["Analyse de site", "Esquisse", "Maquettes", "Projet de fin d'études"],
  },
  {
    floor: "RDC",
    period: "2020",
    role: "Premiers traits",
    company: "Entrée à l'ENA Rabat",
    location: "Rabat",
    text: "Apprentissage du dessin d'architecture, de la géométrie descriptive et des relevés, les fondations de toute ma pratique.",
    missions: ["Dessin", "Relevés", "Géométrie"],
  },
];

export const education = [
  {
    level: "F-1",
    year: "2020 — 2026",
    title: "Diplôme d'architecte",
    school: "École Nationale d'Architecture",
    location: "Rabat",
    detail: "Diplôme d'architecte obtenu en 2026 : projet architectural, construction, histoire, urbanisme et représentation, conclu par un projet de fin d'études soutenu devant jury.",
  },
  {
    level: "F-2",
    year: "2020",
    title: "Baccalauréat",
    school: "Admission à l'ENA sur concours",
    location: "Maroc",
    detail: "Accès à l'École Nationale d'Architecture de Rabat.",
  },
];

export const certifications = [
  "Plans & dessin technique 2D",
  "Modélisation 3D & maquette numérique",
  "Rendus & visualisation architecturale",
];

export const manifesto =
  "L'architecture est aussi une partition : un dialogue entre le silence du passé et le souffle du présent.";

export const projects: Project[] = [
  {
    id: "villa-azur",
    index: "01",
    title: "Villa Azur",
    subtitle: "Villa contemporaine face à l'océan",
    location: "Dar Bouazza",
    year: "2025",
    type: "Logement individuel",
    surface: "420 m²",
    material: "Béton brut & bois",
    tone: { from: "#d9d3c7", to: "#a8a093", ink: "#1a1918" },
    drawing: "villa",
  },
  {
    id: "immeuble-anfa",
    index: "02",
    title: "Immeuble Anfa",
    subtitle: "Immeuble de logements R+6",
    location: "Casablanca",
    year: "2024",
    type: "Logement collectif",
    surface: "3 200 m²",
    material: "Enduit & claustras",
    tone: { from: "#2a2b2c", to: "#121313", ink: "#ece8e1" },
    drawing: "tower",
  },
  {
    id: "pavillon-sable",
    index: "03",
    title: "Pavillon Sable",
    subtitle: "Projet d'atelier : espace culturel en terre crue",
    location: "Marrakech",
    year: "2023",
    type: "Projet académique",
    surface: "960 m²",
    material: "Pisé & acier",
    tone: { from: "#d79a6b", to: "#a4532c", ink: "#1a110c" },
    drawing: "pavilion",
  },
  {
    id: "riad-lumiere",
    index: "04",
    title: "Riad Lumière",
    subtitle: "Projet d'atelier : réhabilitation d'un riad",
    location: "Fès",
    year: "2022",
    type: "Projet académique",
    surface: "640 m²",
    material: "Tadelakt & zellige",
    tone: { from: "#e9e2d2", to: "#c9bc9f", ink: "#221d14" },
    drawing: "riad",
  },
];

export const expertise = [
  {
    index: "A",
    title: "Logements",
    text: "Villas et immeubles pensés autour de la lumière naturelle, de l'intimité et du climat local.",
    tags: ["Villas", "Immeubles", "Extensions"],
  },
  {
    index: "B",
    title: "Plans & dessin technique",
    text: "Plans, coupes et façades précis et lisibles, de l'esquisse au dossier d'autorisation.",
    tags: ["Plans", "Coupes", "Façades"],
  },
  {
    index: "C",
    title: "Modélisation 3D",
    text: "Maquettes numériques fidèles pour comprendre les volumes, tester les variantes et coordonner le projet.",
    tags: ["SketchUp", "Revit", "Rhino"],
  },
  {
    index: "D",
    title: "Rendus & visualisation",
    text: "Images photoréalistes et ambiances qui font ressentir un projet avant même sa construction.",
    tags: ["Lumion", "V-Ray", "Enscape"],
  },
  {
    index: "E",
    title: "Patrimoine",
    text: "Lecture des architectures traditionnelles marocaines : riads, médinas, savoir-faire et matériaux.",
    tags: ["Riads", "Médinas", "Zellige"],
  },
];

export const process = [
  {
    step: "01",
    title: "Écoute & analyse",
    text: "Comprendre le site, le programme, le budget et les envies. Chaque projet commence par une lecture attentive du lieu.",
  },
  {
    step: "02",
    title: "Esquisse",
    text: "Les premières intentions prennent forme : volumes, orientation, parcours de la lumière et relation au paysage.",
  },
  {
    step: "03",
    title: "Plans & 3D",
    text: "Plans détaillés, modélisation 3D et choix des matériaux pour fixer le projet dans ses moindres détails.",
  },
  {
    step: "04",
    title: "Rendus",
    text: "Des images et des planches de présentation qui racontent le projet et le rendent concret.",
  },
];

export const stats = [
  { value: 6, suffix: "", label: "Années de formation" },
  { value: technologies.length, suffix: "", label: "Logiciels maîtrisés" },
  { value: projects.length, suffix: "", label: "Projets présentés" },
  { value: languages.length, suffix: "", label: "Langues" },
];
