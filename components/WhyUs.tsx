"use client";
import { useReveal } from "@/hooks/useReveal";

const pillars = [
  {
    number: "01",
    title: "Built on Passion",
    desc: "Ghost Flow started with a grinder, a vision, and a refusal to cut corners. Every port is personal — this is one craftsman's obsession with making air move the way it was meant to.",
    stat: "Driven by Craft",
  },
  {
    number: "02",
    title: "Solo. Every Cut.",
    desc: "No team. No outsourcing. Every single piece that comes through this shop gets the same set of hands from drop-off to pick-up. You know exactly who worked your parts.",
    stat: "One Set of Hands",
  },
  {
    number: "03",
    title: "Your Build Gets Full Attention",
    desc: "Just starting out means every job builds the reputation. There's no assembly-line mentality here — your engine gets treated like it's the only one in the shop. Because it is.",
    stat: "Personal Attention",
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
            The Story
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold chrome-text mb-4">
            WHY GHOST FLOW
          </h2>
          <div className="section-divider" />
          <p className="font-body text-brand-chrome max-w-xl mx-auto text-base leading-relaxed">
            Solo operation. Fresh start. No shortcuts.
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
            &ldquo;Every job is a chance to prove what Ghost Flow is made of.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Red accent line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-red opacity-40" />
    </section>
  );
}
