import { aboutContent } from '@/content/about';

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-32">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="font-display text-4xl uppercase tracking-[0.3em] text-neonCyan md:text-5xl">
          {aboutContent.name}
        </h1>
        <p className="mt-4 text-xl font-display text-irisMagenta/80">
          {aboutContent.tagline}
        </p>
      </header>

      {/* Bio */}
      <section className="mb-16 space-y-6">
        {aboutContent.bio.map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed text-slate-200/80">
            {paragraph}
          </p>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="font-display text-2xl uppercase tracking-wider text-neonCyan mb-8">
          Capabilities
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {aboutContent.skills.map((skillGroup, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-display text-lg uppercase tracking-wide text-irisMagenta">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.items.map((skill, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-slate-300/80 flex items-start gap-2"
                  >
                    <span className="text-neonCyan mt-1">→</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="mb-16">
        <h2 className="font-display text-2xl uppercase tracking-wider text-neonCyan mb-8">
          {aboutContent.philosophy.title}
        </h2>
        <ul className="space-y-4">
          {aboutContent.philosophy.principles.map((principle, index) => (
            <li
              key={index}
              className="text-base leading-relaxed text-slate-200/80 flex items-start gap-4 p-4 bg-slate-900/30 rounded-lg border border-slate-700/30 hover:border-neonCyan/30 transition-colors"
            >
              <span className="text-neonCyan text-xl font-bold">{index + 1}</span>
              <span>{principle}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <footer className="text-center mt-16">
        <a
          href="/contact"
          className="inline-block px-8 py-4 bg-neonCyan/10 hover:bg-neonCyan/20 border-2 border-neonCyan/50 hover:border-neonCyan rounded-lg font-display uppercase tracking-wider text-neonCyan hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(90,244,255,0.3)]"
        >
          Let's Connect
        </a>
      </footer>
    </main>
  );
}
