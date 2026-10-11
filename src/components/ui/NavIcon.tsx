import {
  BriefcaseBusiness,
  GraduationCap,
  House,
  Layers,
  LayoutGrid,
  Mail,
  PencilRuler,
  SwatchBook,
  UserRound,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "#accueil": House,
  "#a-propos": UserRound,
  "#technologies": Layers,
  "#competences": PencilRuler,
  "#experience": BriefcaseBusiness,
  "#formation": GraduationCap,
  "#projets": LayoutGrid,
  "#contact": Mail,
  "/systeme": SwatchBook,
};

export function NavIcon({ href, className = "size-4" }: { href: string; className?: string }) {
  const Icon = icons[href];
  return Icon ? <Icon aria-hidden strokeWidth={1.5} className={className} /> : null;
}
