import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brand-darkgray border-t border-zinc-800 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo + name */}
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 flex-shrink-0">
              <Image
                src="/ghostflow.gif"
                alt="Ghost Flow LLC"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-heading text-xl font-bold chrome-text tracking-widest">
                GHOST FLOW
              </p>
              <p className="font-body text-xs text-zinc-500 tracking-[0.3em] uppercase">
                Porting &amp; Polishing
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex gap-6 flex-wrap justify-center">
            {["Home", "Services", "Why Us", "Gallery", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "")}`}
                className="font-heading text-sm tracking-[0.2em] uppercase text-zinc-500 hover:text-brand-red transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex gap-4">
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:border-brand-red hover:text-brand-red transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth={0} />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:border-brand-red hover:text-brand-red transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            {/* YouTube placeholder */}
            <a
              href="#"
              aria-label="YouTube"
              className="w-10 h-10 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:border-brand-red hover:text-brand-red transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l-6 3.5L15 17V10z" />
                <rect x="2" y="5" width="20" height="14" rx="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-800 mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-600 text-xs font-body tracking-wide">
          <p>© {new Date().getFullYear()} Ghost Flow LLC. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="w-4 h-px bg-brand-red inline-block" />
            Precision Flow. Maximum Power.
            <span className="w-4 h-px bg-brand-red inline-block" />
          </p>
        </div>
      </div>
    </footer>
  );
}
