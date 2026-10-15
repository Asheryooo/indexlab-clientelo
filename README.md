# 📈 IndexLab (by Clientelo) – Landing Page pro české investory

Interaktivní, mobile-first konverzní landing page porovnávající TOP 5 nízkonákladových ETF fondů z burzy NYSE s běžnými podílovými fondy českých bank. 

Projekt byl vyvinut jako praktické řešení **Úlohy B (Junior AI Prototyping Engineer)** pro Clientelo s využitím AI agentů a lidského inženýrského dohledu.

---

## 🔗 Odkazy na projekt
- **GitHub repozitář:** https://github.com/Asheryooo/indexlab-clientelo
- **Živé demo (Vercel):** https://indexlab.vercel.app](https://indexlab-etf.vercel.app

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
   - Hmatatelný produkt. Uživatel si volí částku (2 000 – 20 000 Kč/měs.) a horizont.
   - Vizuální progress bar přímo konfrontuje čistý zisk v nízkonákladovém ETF oproti podílovému fondu české banky.
3. **Srovnávací sekce TOP 5 ETF z NYSE (Desktop tabulka / Mobilní karty):**
   - Přímé mapování: VOO $\rightarrow$ VUAA/SXR8, QQQ $\rightarrow$ EQQQ, SCHD $\rightarrow$ FUSD, VT $\rightarrow$ VWCE, SPY $\rightarrow$ SPY5.
   - Na mobilech nahrazeno přehlednými vertikálními kartami namísto neergonomického horizontálního posouvání.
4. **Lead Magnet (Gated Checklist):**
   - Jednopolový formulář s minimálním třením (pouze e-mail).
   - Okamžitá odměna přímo na obrazovce (tahák ke stažení + 3 nejdůležitější zásady).
5. **Právní & Daňové FAQ:**
   - Odstranění finálních bariér před nákupem: regulace PRIIPs, kurzové riziko CZK/EUR/USD, daňový test a srážková daň z dividend.

---

## 4. Odhad konverzí & A/B testovací hypotézy

### Odhad konverzního poměru (CVR Benchmark)
- **Očekávaná konverze (Návštěvník $\rightarrow$ Stažení manuálu):** **8,5 % – 13,0 %**
  - Důvod: Velmi úzké zacílení z reklam přímo na poplatkovou bolestivost, minimální tření (pouze e-mail) a okamžitá hodnota na děkovací obrazovce.
- **Engagement s kalkulačkou:** **> 55 %** návštěvníků interaguje se slidery nebo přepínači.

### Návrh 3 hypotéz pro A/B testování

| # | Testovaný prvek | Varianta A (Control) | Varianta B (Challenger) | Sledovaná metrika | Očekávaný dopad |
|---|----------------|----------------------|-------------------------|-------------------|-----------------|
| **1** | **CTA u kalkulačky** | "Jak koupit tato ETF bez bankovních poplatků" (scroll na formulář) | "Zobrazit podrobný rozpad úspory pro váš vklad" (otevře modal s grafem a e-mailem) | Conversion Rate (Lead CVR) | +18 % k odeslání e-mailu díky vyšší relevanci k právě spočítanému číslu. |
| **2** | **Formát Lead Magnetu** | Stažení checklistu ve formátu `.txt / .pdf` | Interaktivní webový "Krok za krokem průvodce nastavením brokera" | Lead-to-Click Rate | Vyšší důvěra uživatelů preferujících okamžitý přístup v prohlížeči. |
| **3** | **Defaultní nastavení kalkulačky** | Měsíční vklad 5 000 Kč, horizont 15 let (úspora +271 905 Kč) | Měsíční vklad 10 000 Kč, horizont 20 let (úspora +800 000+ Kč) | Doba na stránce & CTR CTA | Výraznější psychologický efekt velké částky ("loss aversion"). |

---

## 5. Použitý technologický stack
- **Framework:** Next.js 15+ (App Router, React 19)
- **Styling:** Tailwind CSS (Fintech light palette, high-contrast, Geist Sans / Geist Mono s `latin-ext`)
- **Ikony:** Lucide React
- **Analytika:** Zakázkový event logger (`src/lib/analytics.ts`) pro sledování trychtýře bez narušení soukromí.
- **Vývojové prostředí & AI:** Antigravity AI Agent workflow pod přísnou lidskou supervizí.

---

## 6. Audit & Lidský dohled nad AI (Human-in-the-loop)
Kompletní chronologický záznam promptů a manuálních inženýrských korekcí je uložen v souboru:
👉 **`ai-log/session-log.md`**

### Klíčové lidské zásahy a opravy chyb AI:
1. **Oprava konverzní logiky:** Odstranění předčasných konfet po pouhém pohybu sliderem a jejich přesun až za odeslání e-mailu.
2. **Doplnění lokální legislativy:** AI původně navrhla pouze americké tickery bez reflexe toho, že občan ČR nemůže na NYSE napřímo investovat kvůli chybějícímu KID. Doplněny UCITS verze a § 4 ZDP.
3. **Audit finanční matematiky:** Ověření vzorce složeného úročení s měsíční kapitalizací a přesným odečtem průběžného TER poplatku.
4. **Vizuální refaktoring:** Zamítnutí generického tmavého „neon-hacker“ AI slopu a přestavba na seriózní light fintech standard (IndexLab).
5. **Mobile-First UX audit:** Odstranění vodorovného posunu tabulky na mobilech a nasazení dedikovaných vertikálních karet.
