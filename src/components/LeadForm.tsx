"use client";

import React, { useState } from "react";
import { Download, Mail, ArrowRight, Check, CheckCircle2, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { trackEvent } from "@/lib/analytics";

export default function LeadForm() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Zadejte platnou e-mailovou adresu.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Zadejte platný formát e-mailu (např. jmeno@domena.cz).");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);

      trackEvent("lead_form_submitted", {
        email: email.trim(),
        source: "anthracite_lead_box",
      });

      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem("clientelo_leads");
          const leads = raw ? JSON.parse(raw) : [];
          leads.push({
            email: email.trim(),
            submittedAt: new Date().toISOString(),
          });
          localStorage.setItem("clientelo_leads", JSON.stringify(leads));
        } catch {
          // ignore
        }

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.65 },
            colors: ["#ffffff", "#e4e4e7", "#10b981", "#34d399"],
          });
        } catch {
          // ignore
        }
      }
    }, 500);
  };

  const handleDownloadPdf = () => {
    trackEvent("cta_clicked", { source: "instant_pdf_download" });

    const content = `INDEXLAB ETF MANUÁL PRO ČESKÉ INVESTORY (2026)
==============================================

1. NÁKUP US ETF Z ČR (ŘEŠENÍ PRIIPs REGULACE):
- Místo originálních US ETF nakupujte u evropských brokerů (XTB, Trading 212, IBKR) jejich UCITS klony:
  * VOO (S&P 500) -> VUAA nebo SXR8 (poplatek 0,07 % p.a.)
  * QQQ (Nasdaq 100) -> EQQQ nebo CNDX (poplatek 0,20–0,30 % p.a.)
  * VT (Celý svět) -> VWCE nebo FWRA (poplatek 0,15–0,22 % p.a.)
  * SCHD (Dividendy) -> FUSD (Fidelity US Quality Income)

2. FORMULÁŘ W-8BEN (OCHRANA PŘED 30% DANÍ Z DIVIDEND):
- Podepisuje se elektronicky u brokera při registraci na 1 klik.
- Snižuje srážkovou daň v USA z 30 % na 15 % díky smlouvě o zamezení dvojího zdanění mezi ČR a USA.

3. 3LETÝ ČASOVÝ TEST V ČR (0% DAŇ):
- Podle § 4 odst. 1 písm. w) zákona o daních z příjmů jsou kapitálové zisky po 3 letech držení 100% osvobozeny od daně.
- Do 100 000 Kč hrubého příjmu ročně jsou prodeje osvobozeny i před uplynutím 3 let.

Děkujeme za stažení! Tým IndexLab by Clientelo.`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Navod-ETF-pro-ceske-investory-2026.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="lead-form"
      className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-24 border-b border-zinc-200/80"
    >
      {/* Luxusní matný tmavý antracitový box */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
        {!isSubmitted ? (
          <div className="max-w-2xl mx-auto text-center relative z-10">
            {/* Prvek sociálního důkazu pro rok 2026 */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/90 border border-zinc-700/80 text-[11px] text-zinc-300 mb-4 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Ověřeno pro rok <span className="font-mono">2026</span> • Již přes <span className="font-mono">1 400</span> stažení v ČR</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Stáhněte si bezplatný manuál pro nákup ETF z ČR
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto mb-8">
              Konkrétní evropské UCITS tickery na burze XETRA, postup k elektronickému podpisu formuláře W-8BEN a uplatnění 3letého daňového testu pro 0% daň.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="vas@email.cz"
                    className={`w-full pl-10 pr-3.5 py-3.5 rounded-xl bg-white text-zinc-950 text-sm sm:text-base placeholder-zinc-400 focus:outline-none transition shadow-sm ${
                      error
                        ? "border-2 border-rose-500 focus:ring-1 focus:ring-rose-500"
                        : "border border-zinc-200 focus:ring-2 focus:ring-zinc-400"
                    }`}
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3.5 rounded-xl text-sm sm:text-base font-medium text-zinc-950 bg-white hover:bg-zinc-100 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] shadow-sm hover:shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {isLoading ? (
                    <span>Generuji...</span>
                  ) : (
                    <>
                      <span>Získat manuál zdarma</span>
                      <ArrowRight className="w-4 h-4 text-zinc-950" />
                    </>
                  )}
                </button>
              </div>

              {error && (
                <p className="text-xs text-rose-400 mt-2.5 text-left pl-1">
                  {error}
                </p>
              )}

              <div className="mt-4 text-xs text-zinc-500">
                Žádný spam. Okamžitý přístup k souboru ke stažení na jeden klik.
              </div>
            </form>
          </div>
        ) : (
          <div className="max-w-xl mx-auto py-2 text-center relative z-10">
            <div className="w-12 h-12 rounded-full bg-zinc-800 text-white flex items-center justify-center mx-auto mb-4 border border-zinc-700">
              <Check className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              Manuál byl úspěšně připraven
            </h3>
            <p className="text-sm text-zinc-400 mb-7">
              Kopii jsme odeslali na adresu <strong className="text-white font-medium">{email}</strong>. Soubor si můžete stáhnout přímo zde:
            </p>

            <button
              type="button"
              onClick={handleDownloadPdf}
              className="px-7 py-3.5 rounded-xl text-sm font-medium text-zinc-950 bg-white hover:bg-zinc-100 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] shadow-sm hover:shadow-md inline-flex items-center gap-2 cursor-pointer mb-8"
            >
              <Download className="w-4 h-4 text-zinc-950" />
              <span>Stáhnout manuál (TXT / PDF)</span>
            </button>

            {/* Stručný přehled 3 klíčových tipů */}
            <div className="text-left bg-zinc-800/80 border border-zinc-700/80 rounded-xl p-5 text-xs text-zinc-300 space-y-2.5">
              <div className="font-medium text-white text-sm pb-2 border-b border-zinc-700">
                3 nejdůležitější pravidla pro investora v ČR:
              </div>
              <div>
                <strong className="text-white">1. Kde hledat:</strong> V platformě brokera hledejte evropský ticker (např. <strong className="font-mono">VUAA</strong> místo <span className="font-mono">VOO</span> pro S&P 500 s poplatkem <span className="font-mono">0,07 %</span> p.a.).
              </div>
              <div>
                <strong className="text-white">2. W-8BEN:</strong> Podepište elektronicky v profilu brokera pro snížení srážkové daně z dividend v USA z <span className="font-mono">30 %</span> na <span className="font-mono">15 %</span>.
              </div>
              <div>
                <strong className="text-white">3. Časový test:</strong> Po <span className="font-mono">3</span> letech držení nepodléhá příjem z prodeje ETF v ČR dani z příjmů (§ 4 ZDP).
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
