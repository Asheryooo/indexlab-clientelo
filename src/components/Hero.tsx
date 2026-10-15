"use client";

import React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const handleScrollToCalculator = () => {
    trackEvent("cta_clicked", { source: "hero_scroll_button" });
    const target = document.getElementById("kalkulacka-poplatku");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative py-8 sm:pt-20 sm:pb-24 border-b border-zinc-200/80 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Hlavní nadpis */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 max-w-3xl mx-auto leading-[1.12] mb-4 sm:mb-5">
          Srovnání TOP 5 ETF z NYSE pro české investory
        </h1>

        {/* Věcný, faktický podtitulek */}
        <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-9">
          Rozdíl mezi TER <span className="font-mono text-emerald-600 font-semibold">0,03 %</span> u indexového fondu a{" "}
          <span className="font-mono text-zinc-900 font-semibold">1,85 %</span> u fondu české banky představuje na 15 letech přes{" "}
          <span className="font-mono text-zinc-900 font-semibold">300 000 Kč</span>. Podívejte se na reálná data, poplatkový drag a dostupnost pro občany ČR.
        </p>

        {/* 3 přehledné informační boxy s plastickým vyzdvižením a jemným hover efektem */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto mb-6 sm:mb-9 text-left">
          <div className="p-4 rounded-xl bg-white border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-zinc-300 transition-all duration-200 hover:-translate-y-0.5">
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1">
              Správcovský náklad
            </div>
            <div className="text-base font-bold text-zinc-900 flex items-center justify-between gap-2">
              <span className="shrink-0">TER od <span className="font-mono">0,03 %</span></span>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded whitespace-nowrap shrink-0">
                <span className="font-mono">-98 %</span> vs. banka
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-zinc-300 transition-all duration-200 hover:-translate-y-0.5">
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1">
              Česká legislativa
            </div>
            <div className="text-base font-bold text-zinc-900 flex items-center justify-between gap-2">
              <span className="shrink-0">3letý test</span>
              <span className="text-xs text-zinc-600 font-medium bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded whitespace-nowrap shrink-0">
                § 4 ZDP (osvobozeno)
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-zinc-300 transition-all duration-200 hover:-translate-y-0.5">
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1">
              Dostupnost v ČR
            </div>
            <div className="text-base font-bold text-zinc-900 flex items-center justify-between gap-2">
              <span className="shrink-0">Evropská UCITS</span>
              <span className="text-xs text-zinc-600 font-medium bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded whitespace-nowrap shrink-0">
                Burza XETRA / EUR
              </span>
            </div>
          </div>
        </div>

        {/* CTA akce s micro-interaction vzestupem a stínem */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleScrollToCalculator}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Spočítat moji úsporu v kalkulačce</span>
            <ArrowDown className="w-4 h-4 text-white" />
          </button>

          <a
            href="#prehled-etf"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-medium text-zinc-700 hover:text-zinc-950 bg-white hover:bg-zinc-50 border border-zinc-200/80 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex items-center justify-center gap-2"
          >
            <span>Zobrazit srovnávací tabulku</span>
            <ArrowRight className="w-4 h-4 text-zinc-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
