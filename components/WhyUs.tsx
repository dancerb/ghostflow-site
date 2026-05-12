"use client";
import { useReveal } from "@/hooks/useReveal";

const pillars = [
  {
    number: "01",
    title: "Race-Proven Results",
    desc: "Our work has crossed finish lines at every level — drag, road race, and circle track. The dyno numbers back it up. We don't guess; we test.",
    stat: "Power Verified",
  },
  {
    number: "02",
    title: "Precision CNC + Hand Work",
    desc: "We start with CNC precision and finish by hand. Every port is shaped, blended, and inspected to match the flow map — not just eyeballed.",
    stat: "CNC + Hand Finish",
  },
  {
    number: "03",
    title: "Fast Turnaround",
    desc: "We know downtime costs you. Most cylinder head jobs ship in 5–7 business days. Rush options available. You'll always know your status.",
    stat: "5–7 Day Standard",
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
            Why Choose Us
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold chrome-text mb-4">
            WHY GHOST FLOW
          </h2>
          <div className="section-divider" />
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
            &ldquo;We don&apos;t just move metal — we move air.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Red accent line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-red opacity-40" />
    </section>
  );
}
