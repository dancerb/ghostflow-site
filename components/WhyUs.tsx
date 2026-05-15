"use client";
import { useReveal } from "@/hooks/useReveal";

const pillars = [
  {
    number: "01",
    title: "Artisan-Level Precision",
    desc: "Every port is shaped by hand with a craftsman's eye — not rushed, not templated. We work until the flow is right, not until the clock runs out. The finish you get reflects that standard.",
    stat: "Hand-Worked to Spec",
  },
  {
    number: "02",
    title: "You Talk to Who Works Your Parts",
    desc: "No project managers. No middlemen. The person quoting your job is the same person running the die grinder. You get direct answers, honest timelines, and zero guesswork about what's happening to your engine.",
    stat: "Direct Communication",
  },
  {
    number: "03",
    title: "Flow First. Always.",
    desc: "Every decision — shape, blend, surface finish — is made with airflow as the priority. We don't port for looks. We port for velocity, volume, and results you'll feel every time you get on it.",
    stat: "Performance Driven",
  },
];

export default function WhyUs() {
  const ref = useReveal();

  return (
    <section id="why" className="bg-black py-24 px-6 relative overflow-hidden">
      {/* Red accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-red opacity-40" />

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#C0C0C0 1px, transparent 1px), linear-gradient(to right, #C0C0C0 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <p className="font-heading text-brand-red text-sm tracking-[0.4em] uppercase mb-3">
            The Standard
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold chrome-text mb-4">
            WHY GHOST FLOW
          </h2>
          <div className="section-divider" />
          <p className="font-body text-brand-chrome max-w-xl mx-auto text-base leading-relaxed">
            Precision work. Direct communication. Performance that speaks for itself.
          </p>
        </div>

        {/* Three columns */}
        <div className="stagger grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p) => (
            <div
              key={p.number}
              className="reveal flex flex-col gap-5 p-8 bg-brand-darkgray border-t-2 border-brand-red group hover:bg-brand-midgray transition-all duration-300"
            >
              <span className="font-heading text-5xl font-bold text-zinc-800 group-hover:text-zinc-700 transition-colors duration-300">
                {p.number}
              </span>
              <h3 className="font-heading text-2xl font-semibold text-white tracking-wide">
                {p.title}
              </h3>
              <p className="font-body text-sm text-zinc-400 leading-relaxed flex-1">
                {p.desc}
              </p>
              <div className="pt-4 border-t border-zinc-800">
                <span className="font-heading text-xs tracking-[0.3em] uppercase text-brand-red">
                  {p.stat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div className="reveal mt-16 text-center">
          <blockquote className="font-heading text-2xl md:text-3xl font-medium text-zinc-300 italic max-w-3xl mx-auto">
            &ldquo;If the air doesn&apos;t move better than it did before, the job isn&apos;t done.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Red accent line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-red opacity-40" />
    </section>
  );
}
