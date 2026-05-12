"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useReveal } from "@/hooks/useReveal";

type Tag = "BEFORE" | "AFTER" | "IN PROGRESS" | "FINISHED";

interface Slide {
  src: string;
  tag: Tag;
  label: string;
  group: string;
}

const slides: Slide[] = [
  // BK1 2.0
  { src: "/BEFORE_Bk1 2.0.jpg",              tag: "BEFORE",      label: "BK1 2.0",               group: "BK1 2.0" },
  { src: "/AFTER_Bk1 2.0.jpg",               tag: "AFTER",       label: "BK1 2.0",               group: "BK1 2.0" },
  // Throttle Body
  { src: "/BEFORE_THROTTLE BODY.jpg",         tag: "BEFORE",      label: "Throttle Body",          group: "Throttle Body" },
  { src: "/AFTER_THROTTLE BODY.jpg",          tag: "AFTER",       label: "Throttle Body",          group: "Throttle Body" },
  // Intake Manifold
  { src: "/BEFORE_INTAKE_MANIFOLD.jpg",       tag: "BEFORE",      label: "Intake Manifold",        group: "Intake Manifold" },
  { src: "/AFTER_INTAKE_MANIFOLD.jpg",        tag: "AFTER",       label: "Intake Manifold",        group: "Intake Manifold" },
  // Casting Imperfections
  { src: "/BEFORE_CASTING IMPERFECTIONS.jpg", tag: "BEFORE",      label: "Casting Imperfections",  group: "Casting" },
  { src: "/AFTER_CASTING IMPERFECTIONS.jpg",  tag: "AFTER",       label: "Casting Imperfections",  group: "Casting" },
  // Cylinder Heads
  { src: "/BEFORE_HEADS.jpeg",                tag: "BEFORE",      label: "Cylinder Heads",         group: "Cylinder Heads" },
  { src: "/FINISHED_HEADS.jpg",               tag: "FINISHED",    label: "Cylinder Heads",         group: "Cylinder Heads" },
  // GC3.8 Head
  { src: "/BEFORE_GC3.8_HEAD.jpg",            tag: "BEFORE",      label: "GC3.8 Head",             group: "GC3.8 Head" },
  { src: "/INPROGRESS_GC3.8_HEAD.jpg",        tag: "IN PROGRESS", label: "GC3.8 Head",             group: "GC3.8 Head" },
  { src: "/INPROGRESS_GC3.8_HEAD_.jpeg",      tag: "IN PROGRESS", label: "GC3.8 Head (detail)",    group: "GC3.8 Head" },
  // Porting
  { src: "/BEFORE_PORTING.jpg",               tag: "BEFORE",      label: "Porting",                group: "Porting" },
  { src: "/INPROGRESS_PORTING.jpg",           tag: "IN PROGRESS", label: "Porting",                group: "Porting" },
  // Valve Side
  { src: "/BEFORE_VALVESIDE.jpg",             tag: "BEFORE",      label: "Valve Side",             group: "Valve Side" },
  { src: "/INPROGRESS_VALVESIDE.jpg",         tag: "IN PROGRESS", label: "Valve Side",             group: "Valve Side" },
];

const tagStyle: Record<Tag, string> = {
  BEFORE:        "bg-zinc-800 text-zinc-300",
  AFTER:         "bg-brand-red text-white",
  "IN PROGRESS": "bg-yellow-900 text-yellow-300",
  FINISHED:      "bg-emerald-900 text-emerald-300",
};

export default function Gallery() {
  const ref = useReveal();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goTo = useCallback((idx: number, dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  }, [animating]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "left");
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "right");
  }, [current, goTo]);

  // Auto-advance every 5s
  useEffect(() => {
    const t = setInterval(() => next(), 5000);
    return () => clearInterval(t);
  }, [next]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const slide = slides[current];

  return (
    <section id="gallery" className="bg-brand-darkgray py-24 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-14">
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

        {/* Carousel */}
        <div className="reveal">
          {/* Main image */}
          <div className="relative w-full aspect-[4/3] bg-zinc-900 border border-zinc-800 overflow-hidden group">
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{ opacity: animating ? 0 : 1, transform: animating ? `translateX(${direction === "right" ? "30px" : "-30px"})` : "translateX(0)", transition: "opacity 0.3s ease, transform 0.3s ease" }}
            >
              <Image
                key={current}
                src={slide.src}
                alt={`${slide.tag} — ${slide.label}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
                unoptimized
                priority
              />
            </div>

            {/* Watermark overlay — bottom-right */}
            <div className="absolute bottom-2 right-2 w-[28%] aspect-square pointer-events-none select-none z-10 opacity-50">
              <Image
                src="/GFwatermark.png"
                alt=""
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Tag + label overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-5 flex items-end justify-between">
              <div className="flex items-center gap-3">
                <span className={`font-heading text-xs tracking-[0.2em] uppercase px-2 py-0.5 ${tagStyle[slide.tag]}`}>
                  {slide.tag}
                </span>
                <span className="font-heading text-sm text-white tracking-wider uppercase">
                  {slide.label}
                </span>
              </div>
              <span className="font-body text-xs text-zinc-500">
                {current + 1} / {slides.length}
              </span>
            </div>

            {/* Prev / Next buttons */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 border border-zinc-700 bg-black/60 hover:border-brand-red hover:bg-black/80 flex items-center justify-center text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 border border-zinc-700 bg-black/60 hover:border-brand-red hover:bg-black/80 flex items-center justify-center text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-5 flex-wrap">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? "right" : "left")}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-200 rounded-full ${
                  i === current
                    ? "w-6 h-2 bg-brand-red"
                    : "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? "right" : "left")}
                className={`relative flex-shrink-0 w-16 h-16 overflow-hidden border-2 transition-all duration-200 ${
                  i === current ? "border-brand-red" : "border-zinc-800 hover:border-zinc-500"
                }`}
              >
                <Image
                  src={s.src}
                  alt={s.label}
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
