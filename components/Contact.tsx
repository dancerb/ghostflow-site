"use client";
import { useReveal } from "@/hooks/useReveal";
import { useState, FormEvent } from "react";

const services = [
  "Select a Service",
  "Cylinder Head Porting",
  "Intake Manifold Porting",
  "Exhaust Porting",
  "Bowl Blending",
  "Valve Job",
  "Mirror Polishing",
  "Full Build Package",
  "Other / Multiple Services",
];

export default function Contact() {
  const ref = useReveal();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xpwzgekb", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-black py-24 px-6 relative">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-red opacity-40" />

      <div ref={ref} className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-14">
          <p className="font-heading text-brand-red text-sm tracking-[0.4em] uppercase mb-3">
            Ready to Run
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold chrome-text mb-4">
            GET A QUOTE
          </h2>
          <div className="section-divider" />
          <p className="font-body text-brand-chrome text-base max-w-lg mx-auto">
            Tell us what you&apos;re building. We&apos;ll tell you what&apos;s possible.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="reveal flex flex-col gap-5"
        >
          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-heading text-xs tracking-[0.25em] uppercase text-zinc-500">
                Name <span className="text-brand-red">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Smith"
                className="bg-zinc-900 border border-zinc-700 text-brand-silver placeholder-zinc-600 px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-red transition-colors duration-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-heading text-xs tracking-[0.25em] uppercase text-zinc-500">
                Email <span className="text-brand-red">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                className="bg-zinc-900 border border-zinc-700 text-brand-silver placeholder-zinc-600 px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-red transition-colors duration-200"
              />
            </div>
          </div>

          {/* Phone + Service */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-heading text-xs tracking-[0.25em] uppercase text-zinc-500">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="(555) 000-0000"
                className="bg-zinc-900 border border-zinc-700 text-brand-silver placeholder-zinc-600 px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-red transition-colors duration-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-heading text-xs tracking-[0.25em] uppercase text-zinc-500">
                Service Needed <span className="text-brand-red">*</span>
              </label>
              <select
                name="service"
                required
                defaultValue="Select a Service"
                className="bg-zinc-900 border border-zinc-700 text-brand-silver px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-red transition-colors duration-200 appearance-none cursor-pointer"
              >
                {services.map((s) => (
                  <option key={s} value={s} disabled={s === "Select a Service"}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Vehicle / Engine */}
          <div className="flex flex-col gap-2">
            <label className="font-heading text-xs tracking-[0.25em] uppercase text-zinc-500">
              Vehicle / Engine Description <span className="text-brand-red">*</span>
            </label>
            <input
              type="text"
              name="vehicle"
              required
              placeholder="e.g. 2003 Mustang GT — 4.6L 2V, stock heads"
              className="bg-zinc-900 border border-zinc-700 text-brand-silver placeholder-zinc-600 px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-red transition-colors duration-200"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="font-heading text-xs tracking-[0.25em] uppercase text-zinc-500">
              Message / Details
            </label>
            <textarea
              name="message"
              rows={5}
              placeholder="Power goals, current build specs, timeline, anything else we should know..."
              className="bg-zinc-900 border border-zinc-700 text-brand-silver placeholder-zinc-600 px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-red transition-colors duration-200 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="font-heading text-lg tracking-[0.25em] uppercase px-10 py-4 bg-brand-red text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_24px_rgba(204,0,0,0.5)] active:scale-95 mt-2"
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
              ? "Message Sent ✓"
              : "Submit Quote Request"}
          </button>

          {status === "error" && (
            <p className="font-body text-sm text-red-400 text-center">
              Something went wrong. Email us directly at{" "}
              <a href="mailto:info@ghostflowllc.com" className="underline text-brand-red">
                info@ghostflowllc.com
              </a>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
