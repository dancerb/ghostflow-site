"use client";
import { useReveal } from "@/hooks/useReveal";

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
    title: "Throttle Body",
    desc: "Port matching and transition smoothing on the throttle body bore. Removes casting restrictions and blends the inlet for cleaner, unrestricted airflow into the intake.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
      </svg>
    ),
    title: "Cylinder Heads",
    desc: "Full port and polish of intake and exhaust ports, bowl blending, and gasket matching. Maximizes airflow velocity and volume where it matters most — at the valve.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Intake Manifolds",
    desc: "Runner reshaping, plenum cleanup, and port matching to the gasket. Corrects factory casting imperfections and optimizes charge distribution across all cylinders.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
    title: "Exhaust Manifolds",
    desc: "Port matching, blending, and smoothing of exhaust manifold entries. Reduces backpressure, improves scavenging, and eliminates the hot spots caused by turbulent exhaust flow.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Oil Pick Up",
    desc: "Cleaning, deburring, and radiusing of oil pick up tubes and passages. Ensures unrestricted oil flow to the pump — critical for high-RPM builds where oil starvation kills engines.",
  },
];

export default function Services() {
  const ref = useReveal();

  return (
    <section id="services" className="bg-brand-darkgray py-24 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <p className="font-heading text-brand-red text-sm tracking-[0.4em] uppercase mb-3">
            What We Do
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold chrome-text mb-4">
            SERVICES
          </h2>
          <div className="section-divider" />
          <p className="font-body text-brand-chrome max-w-xl mx-auto text-base leading-relaxed">
            Every piece that leaves our shop has been worked by hand and verified
            for flow. No shortcuts. No exceptions.
          </p>
        </div>

        {/* Card grid — 5 cards: 2 on top row, 3 on bottom (or responsive) */}
        <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="reveal group bg-black border border-zinc-800 p-8 flex flex-col gap-4 hover:border-brand-red transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,0,0,0.15)] cursor-default"
            >
              <div className="text-brand-chrome group-hover:text-white transition-colors duration-300">
                {s.icon}
              </div>
              <h3 className="font-heading text-xl font-semibold text-white tracking-wide">
                {s.title}
              </h3>
              <div className="w-8 h-0.5 bg-brand-red" />
              <p className="font-body text-sm text-zinc-400 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
