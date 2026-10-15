"use client";

import React from "react";
import { ETF_DATA } from "@/data/etfData";
import { ArrowUpRight, AlertCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface EtfOverviewProps {
  onSelectEtf?: (id: string) => void;
}

export default function EtfOverview({ onSelectEtf }: EtfOverviewProps) {
  const handleSelectToCalculate = (etfId: string, ticker: string) => {
    trackEvent("cta_clicked", {
      source: "etf_table_select",
      ticker,
    });
    if (onSelectEtf) {
      onSelectEtf(etfId);
    }
    const target = document.getElementById("kalkulacka-poplatku");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="prehled-etf"
      className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-24 border-b border-zinc-200/80"
    >
      <div className="max-w-3xl mb-9">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
          Srovnání TOP 5 ETF z NYSE a jejich evropské alternativy
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 mt-2 leading-relaxed">
          Evropská směrnice PRIIPs vyžaduje KID dokument v češtině, proto v ČR nelze přímo nakoupit americké originály. Zde je přehled jejich 100% identických evropských UCITS verzí dostupných na německé burze XETRA v EUR.
        </p>
      </div>

      {/* Desktop: Analytická srovnávací tabulka */}
      <div className="hidden md:block rounded-2xl border border-zinc-200/80 bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/90 text-zinc-600 text-xs font-semibold">
              <th className="py-3.5 px-4">Fond & Ticker</th>
              <th className="py-3.5 px-4">Sledovaný index</th>
              <th className="py-3.5 px-4 text-right">TER p.a.</th>
              <th className="py-3.5 px-4 text-right">Div. výnos</th>
              <th className="py-3.5 px-4 text-right">5letý výnos</th>
              <th className="py-3.5 px-4">Evropský ekvivalent (UCITS)</th>
              <th className="py-3.5 px-4 text-right">Kalkulačka</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {ETF_DATA.map((etf) => (
              <tr
                key={etf.id}
                className="hover:bg-zinc-50/80 transition-colors duration-150 group"
              >
                {/* Ticker & Fond */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-zinc-950 text-sm">
                      {etf.ticker}
                    </span>
                    <span className="text-[10px] text-zinc-500 px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-200 font-medium">
                      {etf.exchange}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 truncate max-w-[170px]">
                    {etf.name}
                  </div>
                </td>

                {/* Index */}
                <td className="py-3.5 px-4 text-zinc-700 text-xs font-medium">
                  {etf.tags[0] || "Akciový index"}
                </td>

                {/* TER - v decentní zelené */}
                <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700">
                  {etf.ter} %
                </td>

                {/* Div výnos */}
                <td className="py-3.5 px-4 text-right font-mono text-zinc-700">
                  {etf.dividendYield} %
                </td>

                {/* 5y výnos */}
                <td className="py-3.5 px-4 text-right font-mono font-medium text-zinc-900">
                  +{etf.fiveYearReturnAnnualized} %
                </td>

                {/* UCITS ekvivalent pro ČR - jasně odlišená buňka */}
                <td className="py-3.5 px-4">
                  {etf.ucitsEquivalent ? (
                    <div className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-950 transition-colors group-hover:border-emerald-300">
                      <div className="font-mono font-bold text-xs">
                        {etf.ucitsEquivalent.ticker}
                      </div>
                      <div className="text-[10px] text-emerald-800 font-medium">
                        {etf.ucitsEquivalent.exchange} • <span className="font-mono font-bold">{etf.ucitsEquivalent.ter} %</span> p.a.
                      </div>
                    </div>
                  ) : (
                    <span className="text-zinc-400">—</span>
                  )}
                </td>

                {/* Akce */}
                <td className="py-3.5 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => handleSelectToCalculate(etf.id, etf.ticker)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] cursor-pointer"
                  >
                    <span>Zvolit</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                  </button>
                </td>
              </tr>
            ))}

            {/* Srovnávací řádek: Fond české banky */}
            <tr className="bg-rose-50/50 border-t-2 border-rose-200">
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-bold text-rose-950 text-xs sm:text-sm">
                    Fond české banky
                  </span>
                </div>
                <div className="text-[11px] text-rose-700">
                  Běžný retailový podílový fond
                </div>
              </td>
              <td className="py-3.5 px-4 text-rose-800 text-xs font-medium">
                Aktivní správa banky
              </td>
              <td className="py-3.5 px-4 text-right font-mono font-bold text-rose-700">
                1,85 %
              </td>
              <td className="py-3.5 px-4 text-right text-xs text-rose-800">
                Reinvestice
              </td>
              <td className="py-3.5 px-4 text-right text-xs text-rose-700">
                - poplatky
              </td>
              <td className="py-3.5 px-4">
                <div className="inline-block px-2.5 py-1 rounded-lg bg-rose-100 border border-rose-200 text-rose-900 text-xs font-medium">
                  + <span className="font-mono font-bold">2,5 %</span> vstupní poplatek
                </div>
              </td>
              <td className="py-3.5 px-4 text-right text-xs text-rose-600 font-semibold">
                Drahé
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobil: Vertikální stack strukturovaných karet (bez horizontálního scrollu) */}
      <div className="block md:hidden space-y-3.5">
        {ETF_DATA.map((etf) => (
          <div
            key={etf.id}
            className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          >
            {/* Hlavička karty */}
            <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-zinc-100">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-zinc-950 text-base">
                    {etf.ticker}
                  </span>
                  <span className="text-[10px] text-zinc-500 px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-200 font-medium">
                    {etf.exchange}
                  </span>
                </div>
                <div className="text-xs text-zinc-600 truncate mt-0.5 font-medium">
                  {etf.name}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelectToCalculate(etf.id, etf.ticker)}
                className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 transition active:scale-[0.97] cursor-pointer"
              >
                <span>Zvolit</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </button>
            </div>

            {/* Tělo karty: Kompaktní mřížka 2x2 s jemným šedým podkladem */}
            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs">
              <div>
                <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-0.5">
                  Poplatek (TER)
                </div>
                <div className="font-mono font-bold text-emerald-700 text-sm">
                  {etf.ter} % <span className="text-[10px] font-sans text-emerald-800 font-normal">p.a.</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-0.5">
                  Evropský ekvivalent
                </div>
                {etf.ucitsEquivalent ? (
                  <div className="font-mono font-bold text-zinc-900 text-xs truncate">
                    {etf.ucitsEquivalent.ticker}{" "}
                    <span className="text-[10px] font-sans font-medium text-zinc-500">
                      ({etf.ucitsEquivalent.exchange})
                    </span>
                  </div>
                ) : (
                  <div className="text-zinc-400">—</div>
                )}
              </div>

              <div>
                <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-0.5">
                  Sledovaný index
                </div>
                <div className="text-zinc-800 font-medium text-xs truncate">
                  {etf.tags[0] || "Akciový index"}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-0.5">
                  5letý výnos
                </div>
                <div className="font-mono font-semibold text-zinc-900 text-xs">
                  +{etf.fiveYearReturnAnnualized} % <span className="text-[10px] font-sans text-zinc-500 font-normal">p.a.</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Karta pro "Fond české banky" pro přímý kontrast */}
        <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/40 p-4 shadow-xs">
          <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-rose-100">
            <div>
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="font-bold text-rose-950 text-sm">
                  Fond české banky
                </span>
              </div>
              <div className="text-xs text-rose-700 mt-0.5">
                Běžný retailový podílový fond
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded border border-rose-200">
              Drahé
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-white/80 border border-rose-200/70 text-xs">
            <div>
              <div className="text-[10px] font-medium text-rose-700 uppercase tracking-wider mb-0.5">
                Poplatek (TER)
              </div>
              <div className="font-mono font-bold text-rose-700 text-sm">
                1,85 % <span className="text-[10px] font-sans font-normal text-rose-800">p.a.</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium text-rose-700 uppercase tracking-wider mb-0.5">
                Vstupní poplatek
              </div>
              <div className="font-mono font-bold text-rose-900 text-xs">
                +2,5 % <span className="text-[10px] font-sans font-normal text-rose-700">z vkladu</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium text-rose-700 uppercase tracking-wider mb-0.5">
                Správa
              </div>
              <div className="text-rose-900 font-medium text-xs">
                Aktivní správa banky
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium text-rose-700 uppercase tracking-wider mb-0.5">
                Dopad na výnos
              </div>
              <div className="text-rose-700 font-medium text-xs">
                Výrazný poplatkový drag
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-zinc-500">
        <span>* Údaje odpovídají pětiletému zhodnocení podkladového indexu v USD.</span>
        <span className="text-emerald-700 font-semibold">
          Všechny UCITS fondy splňují 3letý daňový test v ČR (§ 4 ZDP).
        </span>
      </div>
    </section>
  );
}
