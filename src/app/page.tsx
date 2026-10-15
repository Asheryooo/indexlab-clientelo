"use client";

import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import FeeCalculator from "@/components/FeeCalculator";
import EtfOverview from "@/components/EtfOverview";
import LeadForm from "@/components/LeadForm";
import FaqSection from "@/components/FaqSection";
import { trackEvent } from "@/lib/analytics";
import { TrendingUp, Calculator, ArrowRight } from "lucide-react";

export default function Home() {
  const [selectedEtfId, setSelectedEtfId] = useState<string>("voo");
  const [showMobileSticky, setShowMobileSticky] = useState<boolean>(false);

  useEffect(() => {
    trackEvent("page_view", {
      referrer: typeof document !== "undefined" ? document.referrer : "",
      url: typeof window !== "undefined" ? window.location.href : "",
    });

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setShowMobileSticky(window.scrollY > 300);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex flex-col overflow-x-hidden selection:bg-zinc-200 selection:text-zinc-950 font-sans antialiased">
      {/* Tier 1 fintech header */}
      <header className="border-b border-zinc-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center shadow-xs group-hover:bg-zinc-800 transition">
              <TrendingUp className="w-4 h-4 text-zinc-100" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-zinc-950">IndexLab</span>
              <span className="hidden md:inline-block text-[10px] text-zinc-500 bg-zinc-100 border border-zinc-200/70 px-1.5 py-0.5 rounded font-medium">
                by Clientelo
              </span>
            </div>
          </a>

          <nav className="flex items-center gap-1.5 sm:gap-2">
            <a
              href="#kalkulacka-poplatku"
              className="hidden md:inline-flex text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-950 px-3 py-2 rounded-lg transition"
            >
              Kalkulačka
            </a>
            <a
              href="#prehled-etf"
              className="hidden md:inline-flex text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-950 px-3 py-2 rounded-lg transition"
            >
              Fondy
            </a>
            <a
              href="#faq"
              className="hidden md:inline-flex text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-950 px-3 py-2 rounded-lg transition"
            >
              FAQ
            </a>
            <a
              href="#lead-form"
              className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg px-3 sm:px-4 py-2 text-xs font-medium transition shadow-xs"
            >
              <span className="md:hidden">Manuál</span>
              <span className="hidden md:inline">Stáhnout manuál</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Hlavní obsah landing page s pb-28 pro eliminaci kolize se sticky barem */}
      <main className="flex-1 w-full flex flex-col items-stretch pb-28">
        <Hero />
        <FeeCalculator
          selectedEtfId={selectedEtfId}
          onSelectEtf={setSelectedEtfId}
        />
        <EtfOverview onSelectEtf={setSelectedEtfId} />
        <LeadForm />
        <FaqSection />
      </main>

      {/* Subtilní, štíhlá spodní floating lišta na mobilních telefonech (Sticky bar) */}
      <div
        className={`fixed bottom-2.5 left-2.5 right-2.5 z-50 sm:hidden transition-all duration-300 transform ${
          showMobileSticky
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-zinc-950/95 backdrop-blur-md text-white border border-zinc-800/90 rounded-xl px-3 py-2 shadow-xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-4 h-4 rounded bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-2.5 h-2.5" />
            </div>
            <div className="text-[11px] truncate">
              <span className="font-semibold text-white">IndexLab</span>
              <span className="text-zinc-400 ml-1.5 hidden min-[370px]:inline">Úspora až <strong className="font-mono text-emerald-400 font-bold">320 tis. Kč</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <a
              href="#kalkulacka-poplatku"
              onClick={() =>
                trackEvent("cta_clicked", { source: "mobile_sticky_calculator" })
              }
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-zinc-300 bg-zinc-800/90 hover:bg-zinc-700 transition"
            >
              Kalkulačka
            </a>
            <a
              href="#lead-form"
              onClick={() =>
                trackEvent("cta_clicked", { source: "mobile_sticky_manual" })
              }
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-zinc-950 bg-white hover:bg-zinc-100 transition shadow-xs"
            >
              Manuál
            </a>
          </div>
        </div>
      </div>

      {/* Tier 1 fintech footer */}
      <footer className="border-t border-zinc-200/80 py-12 bg-white text-xs text-zinc-600">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-zinc-950 text-white flex items-center justify-center text-xs">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-zinc-950 text-xs">IndexLab</span>
            <span className="text-[10px] text-zinc-500">by Clientelo (2026)</span>
          </div>

          <div className="flex items-center gap-5 text-xs font-medium text-zinc-600">
            <a href="#kalkulacka-poplatku" className="hover:text-zinc-950 transition">
              Kalkulačka úspor
            </a>
            <a href="#prehled-etf" className="hover:text-zinc-950 transition">
              Srovnávací tabulka
            </a>
            <a href="#faq" className="hover:text-zinc-950 transition">
              Časté dotazy
            </a>
            <a href="#lead-form" className="hover:text-zinc-950 font-semibold transition">
              Manuál v PDF
            </a>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 mt-6 pt-6 border-t border-zinc-100 text-[11px] text-zinc-500 leading-relaxed text-center sm:text-left">
          Vyloučení odpovědnosti: Informace na tomto webu mají výhradně informativní charakter a nepředstavují investiční doporučení ani nabídku dle zákona č. 256/2004 Sb. Investování na kapitálových trzích nese riziko kolísání hodnoty investice.
        </div>
      </footer>
    </div>
  );
}
