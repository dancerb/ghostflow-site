"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(204,0,0,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Background texture lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 40px, #C0C0C0 40px, #C0C0C0 41px)",
        }}
      />

      {/* Nav bar */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-20">
        <span className="font-heading text-sm tracking-[0.3em] text-brand-chrome uppercase opacity-70">
          Ghost Flow LLC
        </span>
        <a
          href="#contact"
          className="font-heading text-sm tracking-widest uppercase px-5 py-2 border border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-all duration-300"
        >
          Get a Quote
        </a>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Logo — large, centred, floating */}
        <div
          className={`transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] mx-auto animate-ghostFloat">
            <Image
              src="/ghostflow.gif"
              alt="Ghost Flow LLC — Porting & Polishing"
              fill
              className="object-contain drop-shadow-[0_0_40px_rgba(204,0,0,0.45)]"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Tagline */}
        <p
          className={`font-heading text-xl md:text-3xl font-medium text-brand-silver tracking-[0.2em] uppercase mt-6 mb-10 max-w-2xl transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Precision Flow.{" "}
          <span className="text-white">Maximum Power.</span>
        </p>

        {/* CTA buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="#contact"
            className="font-heading text-lg tracking-[0.2em] uppercase px-10 py-4 bg-brand-red text-white hover:bg-red-700 transition-all duration-300 hover:shadow-[0_0_24px_rgba(204,0,0,0.6)] active:scale-95"
          >
            Get a Quote
          </a>
          <a
            href="#services"
            className="font-heading text-lg tracking-[0.2em] uppercase px-10 py-4 border border-brand-chrome text-brand-chrome hover:border-white hover:text-white transition-all duration-300"
          >
            Our Services
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-body text-xs tracking-widest uppercase text-brand-chrome">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-chrome to-transparent" />
      </div>
    </section>
  );
}
