"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  ETF_DATA,
  CZECH_BANK_BENCHMARK,
  calculateComparison,
  type ETFItem,
} from "@/data/etfData";
import { ArrowRight, Info, CheckCircle2, AlertCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface FeeCalculatorProps {
  selectedEtfId?: string;
  onSelectEtf?: (id: string) => void;
}

export default function FeeCalculator({
  selectedEtfId: externalEtfId,
  onSelectEtf,
}: FeeCalculatorProps) {
  const [internalEtfId, setInternalEtfId] = useState<string>("voo");
  const selectedEtfId = externalEtfId !== undefined ? externalEtfId : internalEtfId;

  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(5000);
  const [years, setYears] = useState<number>(15);
  const [isPulse, setIsPulse] = useState<boolean>(false);

  const selectedEtf = useMemo<ETFItem>(() => {
    return ETF_DATA.find((e) => e.id === selectedEtfId) || ETF_DATA[0];
  }, [selectedEtfId]);

  const simulation = useMemo(() => {
    return calculateComparison(monthlyDeposit, years, selectedEtf.ter);
  }, [monthlyDeposit, years, selectedEtf.ter]);

  // Jemný vizuální pulse při změně výsledku
  useEffect(() => {
    setIsPulse(true);
    const timer = setTimeout(() => setIsPulse(false), 250);
    return () => clearTimeout(timer);
  }, [simulation.netSavings]);

  const formatCzk = useCallback((amount: number): string => {
    return new Intl.NumberFormat("cs-CZ", {
      style: "currency",
      currency: "CZK",
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  const handleEtfChange = (id: string) => {
    if (onSelectEtf) {
      onSelectEtf(id);
    }
    setInternalEtfId(id);
    trackEvent("calculator_interacted", {
      action: "select_etf",
      etfId: id,
      monthlyDeposit,
      years,
    });
  };

  const handleDepositChange = (value: number) => {
    setMonthlyDeposit(value);
    trackEvent("calculator_interacted", {
      action: "change_deposit",
      monthlyDeposit: value,
      years,
    });
  };

  const handleYearsChange = (value: number) => {
    setYears(value);
    trackEvent("calculator_interacted", {
      action: "change_years",
      monthlyDeposit,
      years: value,
    });
  };

  const handleCtaClick = () => {
    trackEvent("cta_clicked", {
      source: "calculator_panel",
      selectedEtf: selectedEtf.ticker,
      netSavings: simulation.netSavings,
    });

    const formElement = document.getElementById("lead-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = "lead-form";
    }
  };

  const depositPresets = [2000, 5000, 10000, 20000];
  const yearPresets = [
    { value: 3, label: "3 roky", note: "daňový test" },
    { value: 10, label: "10 let" },
    { value: 15, label: "15 let" },
    { value: 20, label: "20 let" },
    { value: 30, label: "30 let" },
  ];

  const bankPercentOfEtf = simulation.etfPortfolioValue > 0
    ? Math.min(100, Math.round((simulation.bankPortfolioValue / simulation.etfPortfolioValue) * 100))
    : 80;

  return (
    <section
      id="kalkulacka-poplatku"
      className="w-full bg-[#FAFAFA] border-b border-zinc-200/80 py-14 sm:py-22"
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Záhlaví kalkulačky */}
        <div className="max-w-3xl mb-9">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Kalkulačka poplatků: ETF vs. Fond české banky
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 leading-relaxed">
            Spočítejte si čistý dopad poplatků na váš majetek při modelovém 8% ročním růstu trhu. Zjistíte, kolik peněz vám odejde na distribučních maržích českých bank.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Levý sloupec: Ovládací panel se vstupy */}
          <div className="lg:col-span-6 rounded-2xl bg-white border border-zinc-200/80 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-6 sm:space-y-7">
            {/* 1. Volba ETF */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 mb-2.5">
                <span>1. Vyberte ETF k porovnání:</span>
                <span className="text-emerald-700 font-sans font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  TER: <span className="font-mono">{selectedEtf.ter} %</span> p.a.
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1 sm:gap-1.5 p-1.5 rounded-xl bg-zinc-100/90 border border-zinc-200/80">
                {ETF_DATA.map((etf) => {
                  const isSelected = etf.id === selectedEtfId;
                  return (
                    <button
                      key={etf.id}
                      type="button"
                      onClick={() => handleEtfChange(etf.id)}
                      className={`py-2 px-1 text-center rounded-lg transition-all duration-150 cursor-pointer active:scale-[0.98] ${
                        isSelected
                          ? "bg-zinc-900 text-white font-bold shadow-xs scale-[1.02]"
                          : "text-zinc-600 hover:text-zinc-900 hover:bg-white/80"
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-mono font-bold leading-tight">
                        {etf.ticker}
                      </div>
                      <div className={`text-[10px] font-mono ${isSelected ? "text-zinc-300" : "text-zinc-500"}`}>
                        {etf.ter}%
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-zinc-500 mt-2">
                {selectedEtf.name} ({selectedEtf.tags[0]})
              </p>
            </div>

            {/* 2. Měsíční vklad (Matně černé pills + Slider) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-zinc-700">
                  2. Měsíční vklad:
                </span>
                <span className="text-xl font-bold text-zinc-950 font-mono transition-transform duration-150">
                  {formatCzk(monthlyDeposit)}
                </span>
              </div>

              {/* Quick selector pills - 2sloupcový grid na mobilu, flex na desktopu pro velkou touch plochu */}
              <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2 mb-4">
                {depositPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleDepositChange(preset)}
                    className={`py-2.5 px-3 sm:py-2 sm:px-2 sm:flex-1 rounded-xl text-xs font-mono font-medium transition-all duration-150 cursor-pointer text-center hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${
                      monthlyDeposit === preset
                        ? "bg-zinc-900 text-white font-semibold shadow-xs"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    {formatCzk(preset)}
                  </button>
                ))}
              </div>

              <div className="py-2.5 my-0.5">
                <input
                  type="range"
                  min="1000"
                  max="30000"
                  step="500"
                  value={monthlyDeposit}
                  onChange={(e) => handleDepositChange(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer transition-opacity hover:opacity-90 touch-pan-x"
                />
              </div>
              <div className="flex justify-between text-[11px] text-zinc-400 font-mono mt-1.5">
                <span>1 000 Kč</span>
                <span>30 000 Kč</span>
              </div>
            </div>

            {/* 3. Horizont (Matně černé pills + Slider) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-zinc-700">
                    3. Investiční horizont:
                  </span>
                  {years === 3 && (
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded font-medium animate-in fade-in duration-200">
                      <span className="font-mono font-bold">0%</span> daň po <span className="font-mono font-bold">3</span> letech
                    </span>
                  )}
                </div>
                <span className="text-xl font-bold text-zinc-950 transition-transform duration-150">
                  <span className="font-mono">{years}</span> {years >= 2 && years <= 4 ? "roky" : "let"}
                </span>
              </div>

              {/* Quick year pills - 2sloupcový grid na mobilu s velkou plochou pro palec */}
              <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-1.5 mb-4">
                {yearPresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => handleYearsChange(preset.value)}
                    className={`py-2.5 px-3 sm:py-2 sm:px-1 sm:flex-1 last:col-span-2 sm:last:col-span-1 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer text-center hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${
                      years === preset.value
                        ? "bg-zinc-900 text-white font-semibold shadow-xs"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    <span className="font-mono font-bold">{preset.value}</span> {preset.value >= 2 && preset.value <= 4 ? "roky" : "let"}
                  </button>
                ))}
              </div>

              <div className="py-2.5 my-0.5">
                <input
                  type="range"
                  min="3"
                  max="30"
                  step="1"
                  value={years}
                  onChange={(e) => handleYearsChange(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer transition-opacity hover:opacity-90 touch-pan-x"
                />
              </div>
              <div className="flex justify-between text-[11px] text-zinc-500 mt-1.5">
                <span>
                  <span className="text-zinc-900 font-semibold"><span className="font-mono">3</span> roky</span> (daňový test)
                </span>
                <span className="text-zinc-400"><span className="font-mono font-medium">30</span> let</span>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 text-xs text-zinc-500 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Model počítá s 8% nominálním růstem trhu a plnou reinvesticí výnosů.</span>
            </div>
          </div>

          {/* Pravý sloupec: Hmatatelný výsledkový dashboard s plynulou animací */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl bg-white border border-zinc-200/80 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="text-xs uppercase font-bold tracking-wider text-zinc-500 mb-1">
                Čistá úspora na poplatcích
              </div>

              {/* Číslo úspory s jemným pulse efektem při přepočtu */}
              <div
                className={`text-3xl sm:text-5xl font-extrabold text-emerald-600 font-mono tracking-tight mb-2 transition-all duration-200 ${
                  isPulse ? "opacity-80 scale-[1.01]" : "opacity-100 scale-100"
                }`}
              >
                +{formatCzk(simulation.netSavings)}
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                Peníze, které vám zůstanou na investičním účtu díky nákupu nízkonákladového ETF místo drahého fondu české banky.
              </p>

              {/* Vizuální srovnávací minigraf (Progress bary s plynulou transition-all duration-500 ease-out) */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 mb-5 space-y-3.5">
                <div className="text-xs font-semibold text-zinc-800 flex items-center justify-between">
                  <span>Srovnání konečného zůstatku:</span>
                  <span className="text-emerald-700 text-[11px] transition-all duration-300">
                    <span className="font-mono font-bold">+{simulation.percentageAdvantage} %</span> více v ETF
                  </span>
                </div>

                {/* Bar 1: ETF */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>ETF (<span className="font-mono font-bold">{selectedEtf.ticker}</span>)</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-600 transition-all duration-300">
                      {formatCzk(simulation.etfPortfolioValue)}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-zinc-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500 ease-out"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>

                {/* Bar 2: Česká banka (animuje se hladce při změně parametrů) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-600 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>Česká banka</span>
                    </span>
                    <span className="font-mono font-medium text-zinc-600 transition-all duration-300">
                      {formatCzk(simulation.bankPortfolioValue)}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-zinc-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-400 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${bankPercentOfEtf}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Rozpad poplatkového dragu */}
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs space-y-1.5 text-zinc-700 mb-6">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Celková vložená jistina:</span>
                  <span className="font-mono font-semibold text-zinc-900">{formatCzk(simulation.totalDeposited)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Vstupní poplatky bance (<span className="font-mono">2,5 %</span>):</span>
                  <span className="font-mono text-rose-600 font-semibold">{formatCzk(simulation.bankEntryFeesPaid)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Ztráta na složeném úroku (TER <span className="font-mono">1,85 %</span>):</span>
                  <span className="font-mono text-rose-600 font-semibold">{formatCzk(simulation.bankManagementFeeDrag)}</span>
                </div>
              </div>

              {/* Primární CTA s micro-interaction vzestupem a stínem */}
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full py-4 px-6 rounded-xl font-medium text-sm sm:text-base text-white bg-zinc-900 hover:bg-zinc-800 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Jak koupit tato ETF bez bankovních poplatků</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
