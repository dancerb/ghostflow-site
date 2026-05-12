"use client";
import Image from "next/image";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

type Tag = "BEFORE" | "AFTER" | "IN PROGRESS" | "FINISHED";

interface GalleryItem {
  src: string;
  tag: Tag;
  label: string;
}

const groups: { title: string; items: GalleryItem[] }[] = [
  {
    title: "BK1 2.0",
    items: [
      { src: "/BEFORE_Bk1 2.0.jpg",  tag: "BEFORE", label: "BK1 2.0" },
      { src: "/AFTER_Bk1 2.0.jpg",   tag: "AFTER",  label: "BK1 2.0" },
    ],
  },
  {
    title: "Intake Manifold",
    items: [
      { src: "/BEFORE_INTAKE_MANIFOLD.jpg", tag: "BEFORE", label: "Intake Manifold" },
      { src: "/AFTER_INTAKE_MANIFOLD.jpg",  tag: "AFTER",  label: "Intake Manifold" },
    ],
  },
  {
    title: "Casting Imperfections",
    items: [
      { src: "/BEFORE_CASTING IMPERFECTIONS.jpg", tag: "BEFORE", label: "Casting Imperfections" },
      { src: "/AFTER_CASTING IMPERFECTIONS.jpg",  tag: "AFTER",  label: "Casting Imperfections" },
    ],
  },
  {
    title: "Cylinder Heads",
    items: [
      { src: "/BEFORE_HEADS.jpeg",   tag: "BEFORE",   label: "Cylinder Heads" },
      { src: "/FINISHED_HEADS.jpg",  tag: "FINISHED", label: "Cylinder Heads" },
    ],
  },
  {
    title: "GC3.8 Head",
    items: [
      { src: "/BEFORE_GC3.8_HEAD.jpg",      tag: "BEFORE",      label: "GC3.8 Head" },
      { src: "/INPROGRESS_GC3.8_HEAD.jpg",  tag: "IN PROGRESS", label: "GC3.8 Head" },
      { src: "/INPROGRESS_GC3.8_HEAD_.jpeg",tag: "IN PROGRESS", label: "GC3.8 Head (detail)" },
    ],
  },
  {
    title: "Porting",
    items: [
      { src: "/BEFORE_PORTING.jpg",      tag: "BEFORE",      label: "Porting" },
      { src: "/INPROGRESS_PORTING.jpg",  tag: "IN PROGRESS", label: "Porting" },
    ],
  },
  {
    title: "Valve Side",
    items: [
      { src: "/BEFORE_VALVESIDE.jpg",      tag: "BEFORE",      label: "Valve Side" },
      { src: "/INPROGRESS_VALVESIDE.jpg",  tag: "IN PROGRESS", label: "Valve Side" },
    ],
  },
];

const allItems = groups.flatMap((g) => g.items);

const tagStyle: Record<Tag, string> = {
  BEFORE:       "bg-zinc-800 text-zinc-300",
  AFTER:        "bg-brand-red text-white",
  "IN PROGRESS":"bg-yellow-900 text-yellow-300",
  FINISHED:     "bg-emerald-900 text-emerald-300",
};

export default function Gallery() {
  const ref = useReveal();
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

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
            Real shop work. Before, in progress, and finished.
          </p>
        </div>

        {/* Photo grid */}
        <div className="stagger grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {allItems.map((item, i) => (
            <div
              key={i}
              className="reveal group relative aspect-square bg-zinc-900 border border-zinc-800 overflow-hidden cursor-pointer hover:border-brand-red transition-all duration-300 hover:shadow-[0_0_16px_rgba(204,0,0,0.2)]"
              onClick={() => setLightbox(item)}
            >
              <Image
                src={item.src}
                alt={`${item.tag} — ${item.label}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                unoptimized
              />
              {/* Tag */}
              <div className={`absolute top-2 left-2 font-heading text-xs tracking-[0.15em] uppercase px-2 py-0.5 ${tagStyle[item.tag]}`}>
                {item.tag}
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-heading text-xs tracking-widest uppercase text-white border border-white px-3 py-1">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Group labels row */}
        <div className="reveal mt-8 flex flex-wrap gap-3 justify-center">
          {groups.map((g) => (
            <span key={g.title} className="font-heading text-xs tracking-widest uppercase text-zinc-600 border border-zinc-800 px-3 py-1">
              {g.title}
            </span>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[80vh]">
              <Image
                src={lightbox.src}
                alt={lightbox.label}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="flex items-center justify-between mt-3 px-1">
              <div className="flex items-center gap-3">
                <span className={`font-heading text-xs tracking-[0.15em] uppercase px-2 py-0.5 ${tagStyle[lightbox.tag]}`}>
                  {lightbox.tag}
                </span>
                <span className="font-heading text-sm text-zinc-400 tracking-wider uppercase">
                  {lightbox.label}
                </span>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="font-heading text-xs tracking-widest uppercase text-zinc-500 hover:text-white border border-zinc-700 hover:border-white px-3 py-1 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
