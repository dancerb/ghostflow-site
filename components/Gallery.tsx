"use client";
import { useReveal } from "@/hooks/useReveal";

const placeholders = [
  { label: "Head Port — Before", tag: "BEFORE" },
  { label: "Head Port — After", tag: "AFTER" },
  { label: "Intake Port — Before", tag: "BEFORE" },
  { label: "Intake Port — After", tag: "AFTER" },
  { label: "Mirror Polish — Before", tag: "BEFORE" },
  { label: "Mirror Polish — After", tag: "AFTER" },
];

export default function Gallery() {
  const ref = useReveal();

  return (
    <section id="gallery" className="bg-brand-darkgray py-24 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <p className="font-heading text-brand-red text-sm tracking-[0.4em] uppercase mb-3">
            The Work
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold chrome-text mb-4">
            GALLERY
          </h2>
          <div className="section-divider" />
          <p className="font-body text-brand-chrome max-w-xl mx-auto text-base">
            Before &amp; after shots from the shop floor. Drop-in your images to replace placeholders.
          </p>
        </div>

        {/* Grid */}
        <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {placeholders.map((item, i) => (
            <div
              key={i}
              className="reveal group relative aspect-[4/3] bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-brand-red transition-all duration-300"
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  className="w-12 h-12 text-zinc-700"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
                </svg>
                <span className="font-body text-xs text-zinc-600 tracking-wide">
                  {item.label}
                </span>
              </div>

              {/* Tag */}
              <div
                className={`absolute top-3 left-3 font-heading text-xs tracking-[0.2em] uppercase px-2 py-1 ${
                  item.tag === "BEFORE"
                    ? "bg-zinc-800 text-zinc-400"
                    : "bg-brand-red text-white"
                }`}
              >
                {item.tag}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/5 transition-all duration-300" />
            </div>
          ))}
        </div>

        <div className="reveal mt-8 text-center">
          <p className="font-body text-xs text-zinc-600 tracking-wider uppercase">
            Photos coming soon — work in progress
          </p>
        </div>
      </div>
    </section>
  );
}
