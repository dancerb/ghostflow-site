"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const services = [
  "Intake Manifold Port Matching",
  "Plenum Cleanup",
  "Runner Reshaping",
  "Throttle Body Transition Smoothing",
  "Gasket Matching",
  "Cylinder Head Porting",
  "Intake & Exhaust Porting",
];

const acknowledgments = [
  {
    id: "custom",
    text: "I understand that performance modifications are custom work. Results vary based on engine condition, supporting modifications, and tuning. No specific horsepower gains are guaranteed unless verified by dyno testing.",
  },
  {
    id: "material",
    text: "I authorize Ghost Flow LLC to remove material from my parts as needed to complete the requested service. I understand this process is irreversible.",
  },
  {
    id: "racing",
    text: "If these modifications are intended for racing or off-road use, I acknowledge they may not be legal for use on public roads and take full responsibility for compliance with applicable laws.",
  },
  {
    id: "engine",
    text: "I understand that Ghost Flow LLC is not liable for pre-existing engine conditions, unrelated mechanical failures, or issues arising from improper installation, tuning, or use of modified components.",
  },
  {
    id: "condition",
    text: "I confirm that I have disclosed the current condition of my parts to the best of my knowledge. Ghost Flow LLC is not responsible for damage caused by undisclosed defects or pre-existing cracks, wear, or damage.",
  },
];

interface DisclaimerProps {
  onAgreementChange?: (agreed: boolean) => void;
  embedded?: boolean;
}

export default function Disclaimer({ onAgreementChange, embedded = false }: DisclaimerProps) {
  const ref = useReveal();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [modalOpen, setModalOpen] = useState(false);

  const allChecked = acknowledgments.every((a) => checked[a.id]);

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    const agreed = acknowledgments.every((a) => next[a.id]);
    onAgreementChange?.(agreed);
  };

  const checkAll = () => {
    const next: Record<string, boolean> = {};
    acknowledgments.forEach((a) => (next[a.id] = true));
    setChecked(next);
    onAgreementChange?.(true);
  };

  if (embedded) {
    return (
      <div className="mt-4 border border-zinc-800 bg-zinc-900/50 p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="font-heading text-sm tracking-[0.2em] uppercase text-zinc-400">
            Performance Modification Disclaimer
          </p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="font-heading text-xs tracking-widest uppercase text-brand-red hover:text-red-400 transition-colors underline underline-offset-2"
          >
            Read Full Terms
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {acknowledgments.map((a) => (
            <label key={a.id} className="flex gap-3 cursor-pointer group">
              <div className="flex-shrink-0 mt-0.5">
                <div
                  onClick={() => toggle(a.id)}
                  className={`w-4 h-4 border flex items-center justify-center transition-all duration-200 ${
                    checked[a.id]
                      ? "bg-brand-red border-brand-red"
                      : "border-zinc-600 group-hover:border-zinc-400"
                  }`}
                >
                  {checked[a.id] && (
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span
                className="font-body text-xs text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors"
                onClick={() => toggle(a.id)}
              >
                {a.text}
              </span>
            </label>
          ))}
        </div>

        {!allChecked && (
          <p className="font-body text-xs text-zinc-600 mt-3 italic">
            All items must be acknowledged before submitting.
          </p>
        )}

        {/* Full terms modal */}
        {modalOpen && <DisclaimerModal onClose={() => setModalOpen(false)} onAcceptAll={() => { checkAll(); setModalOpen(false); }} />}
      </div>
    );
  }

  return (
    <section id="disclaimer" className="bg-brand-darkgray py-24 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-red opacity-40" />

      <div ref={ref} className="max-w-4xl mx-auto">
        <div className="reveal text-center mb-12">
          <p className="font-heading text-brand-red text-sm tracking-[0.4em] uppercase mb-3">
            Before You Order
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold chrome-text mb-4">
            DISCLAIMER
          </h2>
          <div className="section-divider" />
          <p className="font-body text-brand-chrome max-w-xl mx-auto text-base">
            Ghost Flow LLC performs custom performance modifications. Please read and acknowledge the following before submitting a service request.
          </p>
        </div>

        {/* Services covered */}
        <div className="reveal mb-10">
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-zinc-500 mb-4">
            Services Covered by This Agreement
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {services.map((s) => (
              <div key={s} className="flex items-center gap-2 border border-zinc-800 px-3 py-2">
                <div className="w-1 h-1 rounded-full bg-brand-red flex-shrink-0" />
                <span className="font-body text-xs text-zinc-400">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Acknowledgment checklist */}
        <div className="reveal bg-black border border-zinc-800 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg tracking-wide text-white uppercase">
              Customer Acknowledgment
            </h3>
            {!allChecked && (
              <button
                type="button"
                onClick={checkAll}
                className="font-heading text-xs tracking-widest uppercase text-zinc-500 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-1 transition-all duration-200"
              >
                Accept All
              </button>
            )}
          </div>

          <div className="flex flex-col gap-5">
            {acknowledgments.map((a) => (
              <label key={a.id} className="flex gap-4 cursor-pointer group">
                <div className="flex-shrink-0 mt-0.5">
                  <div
                    onClick={() => toggle(a.id)}
                    className={`w-5 h-5 border-2 flex items-center justify-center transition-all duration-200 ${
                      checked[a.id]
                        ? "bg-brand-red border-brand-red"
                        : "border-zinc-600 group-hover:border-zinc-400 hover:shadow-[0_0_8px_rgba(204,0,0,0.3)]"
                    }`}
                  >
                    {checked[a.id] && (
                      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <p
                  className="font-body text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors"
                  onClick={() => toggle(a.id)}
                >
                  {a.text}
                </p>
              </label>
            ))}
          </div>

          {/* Status bar */}
          <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${allChecked ? "bg-emerald-500" : "bg-zinc-600"}`} />
              <span className="font-body text-xs text-zinc-500">
                {Object.values(checked).filter(Boolean).length} of {acknowledgments.length} acknowledged
              </span>
            </div>
            {allChecked ? (
              <span className="font-heading text-xs tracking-[0.25em] uppercase text-emerald-500">
                Agreement Complete ✓
              </span>
            ) : (
              <span className="font-heading text-xs tracking-[0.25em] uppercase text-zinc-600">
                All items required
              </span>
            )}
          </div>
        </div>

        <div className="reveal mt-6 text-center">
          <p className="font-body text-xs text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            By submitting a service request, you confirm that you have read, understood, and agree to the terms outlined above. Ghost Flow LLC reserves the right to refuse service on parts deemed unsuitable for modification.
          </p>
        </div>
      </div>
    </section>
  );
}

function DisclaimerModal({ onClose, onAcceptAll }: { onClose: () => void; onAcceptAll: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-zinc-900 border border-zinc-700 max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading text-xl tracking-wide text-white uppercase">
            Performance Modification Agreement
          </h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-5 mb-8">
          {acknowledgments.map((a, i) => (
            <div key={a.id} className="flex gap-3">
              <span className="font-heading text-brand-red text-sm flex-shrink-0">{i + 1}.</span>
              <p className="font-body text-sm text-zinc-400 leading-relaxed">{a.text}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t border-zinc-800">
          <button
            onClick={onAcceptAll}
            className="flex-1 font-heading text-sm tracking-[0.2em] uppercase px-6 py-3 bg-brand-red text-white hover:bg-red-700 transition-all duration-200"
          >
            Accept All & Continue
          </button>
          <button
            onClick={onClose}
            className="font-heading text-sm tracking-[0.2em] uppercase px-6 py-3 border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
