import { Preloader } from "@/components/ui/Preloader";
import { ThemedHome } from "@/components/ThemedHome";
import { BentoHome } from "@/components/bento/BentoHome";
import { BetonHome } from "@/components/beton/BetonHome";
import { BlocHome } from "@/components/bloc/BlocHome";
import { ChantierHome } from "@/components/chantier/ChantierHome";
import { ClaustraHome } from "@/components/claustra/ClaustraHome";
import { LumiereHome } from "@/components/lumiere/LumiereHome";
import { MaquetteHome } from "@/components/maquette/MaquetteHome";
import { StudioHome } from "@/components/studio/StudioHome";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Technologies } from "@/components/sections/Technologies";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Expertise } from "@/components/sections/Expertise";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <ThemedHome
        bento={<BentoHome />}
        lumiere={<LumiereHome />}
        studio={<StudioHome />}
        beton={<BetonHome />}
        claustra={<ClaustraHome />}
        bloc={<BlocHome />}
        maquette={<MaquetteHome />}
        chantier={<ChantierHome />}
        classic={
          <main>
            <Hero />
            <About />
            <Technologies />
            <Skills />
            <Experience />
            <Education />
            <Projects />
            <Expertise />
            <Process />
            <Contact />
          </main>
        }
      />
    </>
  );
}
