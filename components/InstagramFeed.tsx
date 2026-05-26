"use client";
import { useReveal } from "@/hooks/useReveal";
import { useEffect } from "react";

export default function InstagramFeed() {
  const ref = useReveal();

  useEffect(() => {
    if (document.querySelector('script[src="https://w.behold.so/widget.js"]')) return;
    const s = document.createElement("script");
    s.type = "module";
    s.src = "https://w.behold.so/widget.js";
    document.head.appendChild(s);
  }, []);

  return (
    <section id="instagram" className="bg-brand-darkgray py-24 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-red opacity-40" />

      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-14">
          <p className="font-heading text-brand-red text-sm tracking-[0.4em] uppercase mb-3">
            Follow the Work
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold chrome-text mb-4">
            INSTAGRAM
          </h2>
          <div className="section-divider" />
          <p className="font-body text-brand-chrome max-w-xl mx-auto text-base">
            Real shop content. Follow{" "}
            <a
              href="https://instagram.com/ghostflowllc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red hover:text-red-400 transition-colors duration-200"
            >
              @ghostflowllc
            </a>{" "}
            for the latest builds.
          </p>
        </div>

        {/* Behold widget */}
        <div className="reveal">
          {/* @ts-expect-error — custom web component from Behold */}
          <behold-widget feed-id="irE5MxRuLblENWmIXQO4" />
        </div>

        {/* Follow button */}
        <div className="reveal text-center mt-10">
          <a
            href="https://instagram.com/ghostflowllc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-heading text-sm tracking-[0.25em] uppercase px-8 py-3 border border-zinc-700 text-brand-chrome hover:border-brand-red hover:text-white transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow @ghostflowllc
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-red opacity-40" />
    </section>
  );
}
