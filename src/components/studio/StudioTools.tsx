import { TechLogo } from "@/components/ui/Logos";
import { techCategories, technologies } from "@/lib/content";
import { SectionHead } from "./SectionHead";

export function StudioTools() {
  return (
    <section id="technologies" className="px-[var(--gutter)] py-[16vh]">
      <SectionHead
        index="03"
        label="Technologies"
        title="Outils maîtrisés"
        aside={<span className="studio-caps text-graphite">{technologies.length} logiciels</span>}
      />

      <div className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
        {techCategories.map((c) => (
          <div key={c} data-reveal className="bg-paper p-6 md:p-8">
            <p className="studio-caps mb-10 text-graphite">{c}</p>
            <ul className="space-y-6">
              {technologies
                .filter((t) => t.category === c)
                .map((t) => (
                  <li key={t.symbol} className="group flex items-center gap-4">
                    <TechLogo
                      name={t.name}
                      className="size-11 opacity-80 grayscale transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                    <span className="flex-1">
                      <span className="block font-medium">{t.name}</span>
                      <span className="mt-2 block h-px bg-line">
                        <span
                          className="block h-px origin-left scale-x-50 bg-ink transition-transform duration-700 ease-archi group-hover:scale-x-100"
                          style={{ width: `${t.level}%` }}
                        />
                      </span>
                    </span>
                    <span className="text-sm tabular-nums text-graphite">{t.level}</span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
