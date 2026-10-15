# 📈 IndexLab (by Clientelo) – Landing Page pro české investory

Interaktivní, mobile-first konverzní landing page porovnávající TOP 5 nízkonákladových ETF fondů z burzy NYSE s běžnými podílovými fondy českých bank. 

Projekt byl vyvinut jako praktické řešení **Úlohy B (Junior AI Prototyping Engineer)** pro Clientelo s využitím AI agentů a lidského inženýrského dohledu.

---

## 🔗 Odkazy na projekt
- **GitHub repozitář:** https://github.com/Asheryooo/indexlab-clientelo
- **Živé demo (Vercel):** https://indexlab.vercel.app

---

## 1. Cílová skupina & Strategie komunikace
- **Primární persona:** Český retailový investor ve věku **25–45 let**.
- **Profil a motivace:**
  - Má naspořené peníze na spořicím účtu nebo v podílovém fondu u své banky (Česká spořitelna, ČSOB, KB, Air Bank).
  - Vnímá inflaci a chce zhodnocovat majetek, ale bankovní poplatky (TER ~1,85 % p.a. + vstupní marže 2,5 %) mu ukrajují až 30 % celkového zisku v horizontu 15 let.
  - Zná základní pojmy jako S&P 500, ale naráží na legislativní překážky: **proč nelze přímo koupit americké VOO**, jak funguje evropská regulace **PRIIPs / UCITS**, co je formulář **W-8BEN** a jak uplatnit **3letý časový test pro 0% daň (§ 4 ZDP)**.
- **Tón komunikace:**
  - Žádný generický AI marketing ani klišé o „finanční svobodě“.
  - Pragmatický, datově podložený tón stavějící na tvrdé matematice poplatků a české legislativě.

---

## 2. Dvě varianty reklam na sociálních sítích

### Varianta A: Zaměřená na ztrátu a poplatkový šok (Loss Aversion)
- **Formát:** Instagram / Facebook Feed (1:1 statický vizuál / minigraf)
- **Hook:** *„Platíte své bance 1,85 % ročně za správu fondu? Na 15 letech vás to stojí přes 270 000 Kč.“*
- **Copy:**
  > Většina Čechů investuje přes svou mateřskou banku. Banka si ale vezme 2,5 % na vstupu a každoročně 1,85 % z celého vašeho majetku. Identický index S&P 500 přitom můžete držet s poplatkem 0,03 % p.a. a po 3 letech mít zisk 100% osvobozený od daně z příjmů.
  >
  > Spočítejte si přesný rozdíl na naší interaktivní kalkulačce pro rok 2026.
- **CTA:** *Otevřít kalkulačku úspor →*

### Varianta B: Edukativní / Legální návod (Utility & Curated Knowledge)
- **Formát:** Instagram Story / LinkedIn (9:16 vertikální formát)
- **Hook:** *„Proč vám český broker nedovolí koupit americké VOO nebo SPY? (A jak to vyřešit za 2 minuty)“*
- **Copy:**
  > Evropská regulace PRIIPs zakazuje nákup amerických originálů bez KID v češtině. Zkušení investoři proto nakupují identické evropské UCITS verze (VUAA, SXR8) na burze XETRA v EUR s 0% daní z příjmů po 3 letech držení.
  >
  > Připravili jsme stručný checklist: Seznam 5 ověřených UCITS tickerů + návod na podpis W-8BEN.
- **CTA:** *Stáhnout tahák v PDF/TXT zdarma →*

---

## 3. Konverzní architektura (Funnel Breakdown)

Web je strukturován jako logický, na faktech postavený konverzní trychtýř:

1. **Header & Hero:** 
   - Okamžité sdělení hodnoty. Žádný balast. Tři klíčové pilíře (poplatek od 0,03 %, 3letý daňový test v ČR dle § 4 ZDP, dostupnost UCITS).
2. **Interaktivní kalkulačka poplatkového rozdílu (Fee Calculator):**
   - H
