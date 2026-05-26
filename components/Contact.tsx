"use client";
import { useReveal } from "@/hooks/useReveal";
import { useState, FormEvent } from "react";
import Disclaimer from "@/components/Disclaimer";

const services = [
  "Select a Service",
  "Cylinder Head Porting",
  "Intake Manifold Port Matching",
  "Exhaust Porting",
  "Plenum Cleanup",
  "Runner Reshaping",
  "Throttle Body Transition Smoothing",
  "Gasket Matching",
  "Full Build Package",
  "Other / Multiple Services",
];

export default function Contact() {
  const ref = useReveal();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);
  const [delivery, setDelivery] = useState<"ship" | "dropoff">("ship");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!disclaimerAgreed || status === "sending" || status === "sent") return;
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name:     (data.get("name")    as string) ?? "",
      email:    (data.get("email")   as string) ?? "",
      phone:    (data.get("phone")   as string) ?? "",
      service:  (data.get("service") as string) ?? "",
      vehicle:  (data.get("vehicle") as string) ?? "",
      message:  (data.get("message") as string) ?? "",
      delivery: (data.get("delivery") as string) ?? "",
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        setDisclaimerAgreed(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-black py-24 px-6 relative">
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
        <form onSubmit={handleSubmit} className="reveal flex flex-col gap-5">
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

          {/* Delivery Method */}
          <div className="flex flex-col gap-3">
            <label className="font-heading text-xs tracking-[0.25em] uppercase text-zinc-500">
              Part Delivery Method <span className="text-brand-red">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDelivery("ship")}
                className={`flex items-center gap-3 px-4 py-4 border transition-all duration-200 text-left ${
                  delivery === "ship"
                    ? "border-brand-red bg-zinc-900 text-white"
                    : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={`w-6 h-6 flex-shrink-0 ${delivery === "ship" ? "text-brand-red" : "text-zinc-600"}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                </svg>
                <div>
                  <p className="font-heading text-sm tracking-wide">Ship My Part</p>
                  <p className="font-body text-xs text-zinc-500 mt-0.5">Mail it to the shop</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDelivery("dropoff")}
                className={`flex items-center gap-3 px-4 py-4 border transition-all duration-200 text-left ${
                  delivery === "dropoff"
                    ? "border-brand-red bg-zinc-900 text-white"
                    : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={`w-6 h-6 flex-shrink-0 ${delivery === "dropoff" ? "text-brand-red" : "text-zinc-600"}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-heading text-sm tracking-wide">Local Drop-Off</p>
                  <p className="font-body text-xs text-zinc-500 mt-0.5">Bring it in person</p>
                </div>
              </button>
            </div>
            <input type="hidden" name="delivery" value={delivery === "ship" ? "Ship My Part" : "Local Drop-Off"} />
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

          {/* Embedded disclaimer acknowledgment */}
          <Disclaimer embedded onAgreementChange={setDisclaimerAgreed} />

          {/* Submit */}
          <button
            type="submit"
            disabled={!disclaimerAgreed || status === "sending" || status === "sent"}
            className="font-heading text-lg tracking-[0.25em] uppercase px-10 py-4 bg-brand-red text-white hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_24px_rgba(204,0,0,0.5)] active:scale-95 mt-2"
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
              ? "Request Sent ✓"
              : disclaimerAgreed
              ? "Submit Quote Request"
              : "Acknowledge Disclaimer to Submit"}
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
