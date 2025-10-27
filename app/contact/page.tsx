import { contactContent } from '@/content/contact';

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-32">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="font-display text-4xl uppercase tracking-[0.3em] text-neonCyan md:text-5xl">
          {contactContent.headline}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-200/80 max-w-2xl mx-auto">
          {contactContent.description}
        </p>
      </header>

      {/* CTA */}
      <section className="mb-12 text-center">
        <p className="font-display text-lg uppercase tracking-wide text-irisMagenta">
          {contactContent.cta}
        </p>
      </section>

      {/* Contact Links */}
      <section className="mb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {contactContent.links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-slate-900/30 rounded-lg border border-slate-700/30 hover:border-neonCyan/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(90,244,255,0.2)]"
            >
              <div className="flex items-start gap-4">
                {link.icon && (
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                )}
                <div className="flex-1 text-left">
                  <h3 className="font-display text-xl uppercase tracking-wide text-neonCyan group-hover:text-white transition-colors">
                    {link.label}
                  </h3>
                  {link.description && (
                    <p className="mt-2 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                      {link.description}
                    </p>
                  )}
                </div>
                <svg
                  className="w-5 h-5 text-neonCyan opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Availability & Preferences */}
      <footer className="text-center space-y-4">
        {contactContent.availability && (
          <p className="text-sm text-slate-400">
            <span className="font-display text-irisMagenta">Status:</span>{' '}
            {contactContent.availability}
          </p>
        )}
        {contactContent.preferredMethod && (
          <p className="text-xs text-slate-500">
            {contactContent.preferredMethod}
          </p>
        )}
      </footer>
    </main>
  );
}
