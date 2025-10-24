'use client';

const chips = ['Front-end Engineering', 'Back-end Systems', 'Experience Strategy', 'Commerce', 'Data Storytelling', 'Creative Direction'];

export default function IntroChips() {
  return (
    <div className="pointer-events-auto fixed right-6 top-[22%] z-30 w-[min(320px,50vw)] bg-black/35 backdrop-blur-xl md:right-12">
      <div className="flex flex-wrap items-center justify-center gap-2 px-5 py-4 text-[0.55rem] uppercase tracking-[0.28em] text-cyan-100/80">
        {chips.map((chip) => (
          <span key={chip} className="rounded-full border border-cyan-200/30 px-3 py-1 text-center">
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
