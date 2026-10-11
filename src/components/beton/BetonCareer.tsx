import { experience } from "@/lib/content";
import { SectionBar } from "./shared";

export function BetonCareer() {
  return (
    <section id="experience" className="mt-[14vh]">
      <SectionBar index="05" label="Expérience" title="Parcours" meta="Coupe verticale" />

      <ol>
        {experience.map((e) => (
          <li key={e.floor} data-reveal className="group grid border-b-2 border-ink md:grid-cols-12">
            <div className="flex items-end justify-between gap-4 border-b-2 border-ink p-[var(--gutter)] transition-colors duration-300 group-hover:bg-terra md:col-span-3 md:block md:border-b-0 md:border-r-2">
              <span className="block font-display text-[clamp(3rem,6vw,5.5rem)] leading-none">{e.floor}</span>
              <span className="beton-mono mt-4 block">{e.period}</span>
            </div>
            <div className="p-[var(--gutter)] md:col-span-6 md:border-r-2 md:border-ink">
              <p className="beton-mono text-graphite">
                {e.company} — {e.location}
              </p>
              <h3 className="mt-3 text-2xl font-bold uppercase tracking-tight md:text-3xl">{e.role}</h3>
              <p className="mt-4 max-w-xl leading-relaxed">{e.text}</p>
            </div>
            <ul className="flex flex-wrap content-start gap-2 border-t-2 border-ink p-[var(--gutter)] md:col-span-3 md:border-t-0">
              {e.missions.map((m) => (
                <li key={m} className="beton-mono border-2 border-ink px-2.5 py-1">
                  {m}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
