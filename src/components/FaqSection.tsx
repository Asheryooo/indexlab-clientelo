"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  badge: string;
  answer: React.ReactNode;
}

const FAQS: FaqItem[] = [
  {
    question: "Proč mi český broker nedovolí koupit přímo americké ETF (např. VOO na NYSE)?",
    badge: "Regulace PRIIPs",
    answer: (
      <div className="space-y-2 text-zinc-700 text-sm leading-relaxed">
        <p>
          Důvodem je evropské nařízení <strong>PRIIPs</strong> (Packaged Retail and Insurance-based Investment Products). Vyžaduje, aby každý fond nabízený retailovým investorům v EU disponoval standardizovaným dokumentem klíčových informací (KID) v národním jazyce. Američtí emitenti jako Vanguard nebo BlackRock tyto dokumenty pro fondy kotované na NYSE nepřipravují, protože cílí na americký trh.
        </p>
        <p className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800">
          <strong className="text-zinc-900">Praktické řešení:</strong> Emitenti vydávají identické <strong>evropské UCITS verze</strong> (obvykle se sídlem v Irsku). Místo <span className="font-mono font-medium">VOO</span> koupíte na německé burze XETRA fond <strong className="font-mono">VUAA</strong> nebo <strong className="font-mono">SXR8</strong>. Sledují stejný index, drží stejné akcie a dividendy mohou automaticky reinvestovat (akumulační třída).
        </p>
      </div>
    ),
  },
  {
    question: "Co je formulář W-8BEN a proč je pro investora v ČR zásadní?",
    badge: "Srážková daň z dividend",
    answer: (
      <div className="space-y-2 text-zinc-700 text-sm leading-relaxed">
        <p>
          Formulář <strong>W-8BEN</strong> potvrzuje americkému finančnímu úřadu (IRS), že jste daňovým rezidentem České republiky.
        </p>
        <p>
          Bez tohoto formuláře podléhají dividendy z amerických cenných papírů standardní <strong className="font-mono">30%</strong> srážkové dani v USA. Díky existující Smlouvě o zamezení dvojího zdanění mezi ČR a USA se sazba po vyplnění formuláře snižuje na <strong className="font-mono">15 %</strong>.
        </p>
        <p className="text-zinc-600 text-xs">
          Všichni regulovaní brokeři v ČR (např. XTB, Trading 212, Interactive Brokers) nabízejí W-8BEN k elektronickému podpisu přímo v rámci registrace účtu na 1 kliknutí.
        </p>
      </div>
    ),
  },
  {
    question: "Jak přesně funguje 3letý daňový test pro osvobození v ČR?",
    badge: "§ 4 odst. 1 písm. w) ZDP",
    answer: (
      <div className="space-y-2 text-zinc-700 text-sm leading-relaxed">
        <p>
          Podle <strong>§ 4 odst. 1 písm. w) zákona o daních z příjmů</strong> jsou příjmy z prodeje cenných papírů (akcie, ETF) plně osvobozeny od daně z příjmů fyzických osob, pokud doba mezi nabytím a převodem přesáhla <strong className="font-mono">3</strong> roky.
        </p>
        <ul className="list-disc pl-4 space-y-1 text-zinc-700">
          <li>Zisk po splnění 3letého testu nepodléhá <span className="font-mono">15%</span> ani <span className="font-mono">23%</span> dani.</li>
          <li>Transakce se neuvádí v daňovém přiznání (pokud celkový osvobozený příjem u jednoho typu nepřesáhne 5 mil. Kč).</li>
          <li>Pro prodeje do 3 let platí ještě obecné osvobození pro hrubé roční příjmy z prodeje cenných papírů do <strong className="font-mono">100 000 Kč</strong>.</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Proč je poplatek TER 1,85 % v bance problém, když trh roste?",
    badge: "Poplatkový drag",
    answer: (
      <div className="space-y-2 text-zinc-700 text-sm leading-relaxed">
        <p>
          Rozdíl mezi TER <span className="font-mono">0,03 %</span> (ETF) a <span className="font-mono">1,85 %</span> (bankovní fond) se zdá jako necelá dvě procenta ročně. Poplatek se však strhává z <strong>celkového objemu portfolia</strong> každý rok – a to i v letech, kdy je trh v propadu.
        </p>
        <p>
          Při pravidelné investici <span className="font-mono">5 000 Kč</span> měsíčně po dobu <span className="font-mono">20</span> let činí celková ztráta na poplatcích a ušlém složeném zhodnocení přes <strong className="font-mono">800 000 Kč</strong>. V ETF zůstává tento výnos v plné výši investorovi.
        </p>
      </div>
    ),
  },
  {
    question: "Jak funguje měnová směna při vkladu v českých korunách (CZK)?",
    badge: "Měnová konverze",
    answer: (
      <div className="space-y-2 text-zinc-700 text-sm leading-relaxed">
        <p>
          Evropská ETF na německé burze XETRA se obvykle obchodují v EUR nebo USD. Většina brokerů nabízí přímou konverzi z CZK s malým spreadem (kolem <span className="font-mono">0,5 %</span>).
        </p>
        <p>
          Pro dlouhodobé horizonty (10+ let) se měnové zajištění (hedging) do CZK u akciových indexů zpravidla nevyplácí, protože stojí dodatečné náklady na derivátové kontrakty (cca <span className="font-mono">1–2 %</span> ročně) a dlouhodobě nepřináší vyšší reálnou hodnotu.
        </p>
      </div>
    ),
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-24">
      <div className="max-w-3xl mb-9">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
          Často kladené otázky českých investorů
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 mt-2 leading-relaxed">
          Přehled legislativy, daňových povinností a měnových konverzí při investování do ETF z ČR.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className="rounded-xl border border-zinc-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-150"
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-zinc-50 transition-colors duration-150"
                aria-expanded={isOpen}
              >
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded font-medium inline-block mb-1.5">
                    {faq.badge}
                  </span>
                  <div className="text-sm sm:text-base font-bold text-zinc-900 leading-snug">
                    {faq.question}
                  </div>
                </div>
                <div
                  className={`w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-600 transition-all duration-200 ease-out ${
                    isOpen ? "rotate-180 text-zinc-950 bg-zinc-200" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Plynulé CSS Grid rozbalování a sbalování odpovědi */}
              <div
                className={`grid transition-all duration-200 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-zinc-100">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
