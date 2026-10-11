import type { Metadata } from "next";
import { Archivo, Aref_Ruqaa, Barlow_Condensed, Big_Shoulders, Big_Shoulders_Stencil, Bodoni_Moda, Bricolage_Grotesque, Caveat, El_Messiri, Instrument_Serif, Inter_Tight, JetBrains_Mono, Jost, Reem_Kufi, Sora, Unbounded } from "next/font/google";
import { SiteProvider } from "@/components/providers/SiteProvider";
import { Cursor } from "@/components/ui/Cursor";
import { GridOverlay } from "@/components/ui/GridOverlay";
import { Header } from "@/components/layout/Header";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const grotesk = Sora({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const kufi = Reem_Kufi({
  variable: "--font-kufi",
  subsets: ["latin", "arabic"],
  preload: false,
});

const ruqaa = Aref_Ruqaa({
  variable: "--font-ruqaa",
  subsets: ["arabic"],
  weight: ["400", "700"],
  preload: false,
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  preload: false,
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  preload: false,
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  preload: false,
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  preload: false,
});

const messiri = El_Messiri({
  variable: "--font-messiri",
  subsets: ["latin", "arabic"],
  preload: false,
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  preload: false,
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  preload: false,
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  preload: false,
});

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  preload: false,
});

const bigShouldersStencil = Big_Shoulders_Stencil({
  variable: "--font-big-shoulders-stencil",
  subsets: ["latin"],
  preload: false,
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oussama Ziyati — Architecte diplômé de l'ENA Rabat",
  description:
    "Portfolio d'Oussama Ziyati, architecte diplômé de l'ENA Rabat (2026), basé à Casablanca. Conception 2D/3D : plans, rendus, modélisation et logements. Disponible pour rejoindre une agence.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${instrument.variable} ${grotesk.variable} ${kufi.variable} ${ruqaa.variable} ${bricolage.variable} ${bodoni.variable} ${jost.variable} ${archivo.variable} ${messiri.variable} ${unbounded.variable} ${barlowCondensed.variable} ${caveat.variable} ${bigShoulders.variable} ${bigShouldersStencil.variable} ${interTight.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="grain bg-paper text-ink" suppressHydrationWarning>
        <SiteProvider>
          <Header />
          {children}
          <GridOverlay />
          <Cursor />
        </SiteProvider>
      </body>
    </html>
  );
}
