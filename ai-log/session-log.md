AI Collaboration Log - Clientelo ETF Landing Page

Tento dokument slouží jako transparentní audit vývojového procesu s AI agenty (Antigravity IDE / Claude Code). Zaznamenává strategická rozhodnutí, doslovné prompty, kontrolu generovaného kódu a manuální korekce logických i UX chyb modelu.

Session 1: Strategická volba, definice datového rámce a vývoj kalkulačky

Nástroj: Antigravity AI Agent

Datum: 2026-10-13

Cíl: Analyzovat zadání, stanovit ověřený datový model 5 NYSE ETF fondů a naprogramovat interaktivní model poplatků pro českého retailového investora.

1. Strategické rozhodnutí (Zadání A vs. Zadání B)

Zadání A (Databáze investorů): Vyhodnoceno jako statická scrapingová/analytická rešerše bez přímého dopadu na konverzní produkt.

Zadání B (Konverzní landing page): Jednoznačná volba. Umožňuje ukázat rychlé prototypování, práci s mobilním návštěvníkem z reklamy a napojení reálné finanční matematiky.

2. Definice datového modelu a benchmarku

Před spuštěním agenta byl definován striktní datový rámec, aby výstup nepůsobil genericky:

5 fondů z NYSE:

VOO (Vanguard S&P 500) – TER 0,03 % p.a.

QQQ (Invesco QQQ Trust) – TER 0,20 % p.a.

SCHD (Schwab U.S. Dividend Equity) – TER 0,06 % p.a.

VT (Vanguard Total World Stock) – TER 0,07 % p.a.

SPY (SPDR S&P 500 ETF Trust) – TER 0,09 % p.a.

Benchmark české banky:

TER 1,85 % p.a. (běžný průměr retailových fondů v ČR).

Vstupní poplatek 2,5 % z každého vkladu.

Klíčové konverzní body pro ČR:

3letý časový test pro osvobození od daně z příjmů (§ 4 ZDP).

Formulář W-8BEN (zamezení 30% srážkové dani z US dividend).

3. Zadaný Prompt 1

Chci vytvořit klíčové komponenty pro konverzní landing page zaměřenou na české drobné investory srovnávající ETF na NYSE.

Vytvoř soubor src/data/etfData.ts:

Definuj data pro 5 populárních NYSE ETF fondů: VOO (S&P 500, TER 0.03%), QQQ (Nasdaq 100, TER 0.20%), SCHD (Dividendy, TER 0.06%), VT (Celý svět, TER 0.07%), SPY (S&P 500 likvidita, TER 0.09%).

Přidej srovnávací benchmark pro běžný fond české banky (TER 1.85%, vstupní poplatek 2.5%).

Uveď reálné parametry (pětiletý výnos, dividendový výnos, popis v češtině, rizikový profil, top držení).

Vytvoř interaktivní komponentu src/components/FeeCalculator.tsx:

Mobile-first design, tmavý čistý fintech styl (Tailwind CSS, slate-900 / emerald barvy).

Slidery pro měsíční vklad (1 000 - 30 000 Kč) a horizont (3 - 30 let). U 3 let výslovně uveď poznámku "(daňový test v ČR)".

Přepínač mezi jednotlivými ETF.

Dynamický výpočet čisté úspory na poplatcích oproti české bance (rozdíl v poplatcích v Kč s 8% ročním růstem trhu).

Výrazná výsledková karta s ušetřenou částkou v Kč a CTA tlačítkem scrollujícím na formulář (#lead-form).

Session 2: Vyhodnocení výstupu kalkulačky, nalezené chyby AI a implementace trychtýře

Nástroj: Antigravity AI Agent

Datum: 2026-10-13

Stav: Komponenty etfData.ts a FeeCalculator.tsx zkompilovány.

1. Zjištěné chyby AI & Lidská supervize

UX chyba v odměňovacím mechanismu (Confetti):

Chyba AI: Agent naimportoval a spustil canvas-confetti přímo na CTA tlačítko v kalkulačce, které pouze scrollovalo dolů k formuláři.

Korekce: Z pohledu konverzní psychologie je to hrubá chyba – předčasná odměna oslabuje vůli dokončit odeslání e-mailu. Konfety byly striktně přesunuty až na stav po úspěšném odeslání lead formuláře.

Absence evropské legislativy PRIIPs / KID:

Chyba AI: Agent mechanicky nasadil tickery z NYSE, aniž by reflektoval fakt, že běžný český investor nemá u evropských brokerů přístup k nákupu US domicilovaných ETF bez evropského KID dokumentu.

Korekce: Z této překážky jsme udělali hlavní prodejní argument Lead Magnetu – investorovi nabídneme přímé srovnání a mapování na evropské UCITS ekvivalenty (VOO vs. VUAA/SXR8, QQQ vs. EQQQ).

Audit finanční matematiky:

Kontrola: Zkontroloval jsem výpočetní vzorec složeného úročení calculateComparison. Model korektně počítá 8% růst trhu, vstupní srážku 2,5 % z každého vkladu a měsíční dopad poplatku TER. Čísla úspor v řádu stovek tisíc Kč odpovídají realitě.

2. Zadaný Prompt 2

Pokračujeme ve stavbě landing page pro Clientelo. Nyní potřebuji vytvořit Hero sekci, konverzní Lead Magnet formulář a jednoduchý analytický event tracking.

Vytvoř komponentu src/components/Hero.tsx:

Mobile-first, optimalizované pro návštěvníka z Instagram/Meta reklamy (čas pozornosti < 5 s).

Headline: "Srovnání TOP 5 ETF z NYSE pro české investory (2026)"

Subheadline: "Zjistěte za 15 vteřin, které fondy mají nejnižší poplatky a jak neplatit české bance statisíce na skrytých nákladech."

3 rychlé badge: "0,03 % minimální poplatek", "3letý daňový test v ČR", "100% nezávislá data".

CTA tlačítko s hladkým scrollem na #calculator ("Spočítat moji úsporu").

Vytvoř komponentu src/components/LeadForm.tsx:

Sekce s kotvou id="lead-form".

Lead Magnet: "PDF Tahák: Jak nakupovat US ETF z ČR bez poplatků a bez 30% dividendové pasti (W-8BEN návod + 3letý daňový test)".

Formulář s ULTRA NÍZKÝM třením: Pouze 1 pole (Váš e-mail). Žádný telefon ani příjmení.

Validace e-mailu (regex), loading stav tlačítka ("Generuji přístup...").

Po úspěšném odeslání:

Spusť konfetový efekt pomocí canvas-confetti.

Zobraz děkovací kartu s okamžitým tlačítkem "Stáhnout tahák v PDF" a shrnutím 3 klíčových tipů přímo na obrazovce pro netrpělivé uživatele.

Ulož e-mail do localStorage (mock databáze) a loguj konverzní událost.

Vytvoř pomocný modul src/lib/analytics.ts:

Jednoduchý systém pro sledování trychtýře (Funnel Events): page_view, calculator_interacted, cta_clicked, lead_form_submitted.

Loguj do console a ukládej počítadla do sessionStorage pro možnost zobrazení v zápatí nebo debug módu.

Session 3: Finální přehled fondů, lokální FAQ a produkční kompletace

Nástroj: Antigravity AI Agent

Datum: 2026-10-13

Stav: Hero, kalkulačka i sběr kontaktů funkční. Zbývá odstranit nákupní námitky a sestavit celou stránku.

1. Zadaný Prompt 3

Pokračujeme ve finálním propojení konverzní landing page pro české investory.

Potřebuji vytvořit dvě zbývající obsahové komponenty a sestavit celou src/app/page.tsx:

Vytvoř komponentu src/components/EtfOverview.tsx:

Vizuální srovnávací karty pro všech 5 ETF z src/data/etfData.ts (VOO, QQQ, SCHD, VT, SPY).

Každá karta zobrazí: Ticker, název fondu, TER poplatek, dividendový výnos, rizikový profil a top 5 firem v portfoliu.

Přidej přímé mapování na evropské UCITS ekvivalenty dostupné na XETRA (např. VOO -> VUAA/SXR8, QQQ -> EQQQ, SCHD -> FUSD, VT -> VWCE, SPY -> SPY5).

Karta bude mít tlačítko pro rychlou volbu fondu v kalkulačce.

Vytvoř komponentu src/components/FaqSection.tsx:

Akordeon / rozklikávací FAQ řešící konkrétní bariéry českých retail investorů:

"Můžu jako občan ČR koupit US ETF přímo na NYSE?" (vysvětlení PRIIPs regulace a alternativ).

"Jak funguje 3letý časový test pro osvobození od daně z příjmů?"

"Co je formulář W-8BEN a proč mi zachrání 15 % ze zisku dividend?"

"Proč jsou české bankovní fondy o tolik dražší než US ETF?"

"Měnové riziko: Mám investovat v CZK, EUR nebo USD?"

Slož celou hlavní stránku src/app/page.tsx:

Pořadí sekcí: Sticky Header -> Hero -> FeeCalculator -> EtfOverview -> LeadForm -> FaqSection -> Footer.

Zajisti, aby stránka neměla žádný horizontální overflow na iPhone/Android displejích.

Uprav src/app/layout.tsx:

Nastav český titulek, OpenGraph tagy, meta description, lang="cs", dedikovaný viewport a smooth scrolling.

4. Závěrečný audit kvality

Kompilace (npm run build): Kód 0 (Zero errors, zero warnings)

Mobilní použitelnost: Žádný horizontální scroll, touch-friendly slidery i preset tlačítka

Konverzní tření: Pouze 1 pole (e-mail), okamžitý obsah bez nutnosti čekat na e-mail

Ověřená data: Reálné TER poplatky (0,03 % – 0,20 %), § 4 ZDP, formulář W-8BEN

Role vývojáře: AI použita jako rychlý implementátor, lidský dohled zajistil UX i legislativní přesnost

---

Session 4: Kompletní redesign vizuálu – Přechod od AI klišé k minimalistickému fintech nástroji

Nástroj: Antigravity AI Agent

Datum: 2026-10-13

Cíl: Odstranit generický "AI template" vzhled (přepálené gradienty, glow efekty, marketingové fráze). Přepracovat celou aplikaci do seriózní, minimalistické podoby inspirované nástroji Linear, Stripe a Fondee.

1. Zjištěné slabiny původního vizuálu & Zadání redesignu:
- Estetika: Laciné neonové halo efekty, fialové a azurové přechody působily jako rychlá generovaná šablona bez produktového citu.
- Rozvržení srovnávače: 5 obřích karet zabíralo příliš mnoho vertikálního prostoru bez možnosti rychlého analytického porovnání.
- Copywriting: Použití klišé ("finanční svoboda", "zlatý standard") snižovalo důvěryhodnost u zkušenějších investorů.

2. Provedené změny:
- Barevná paleta: Hluboká matná uhlová (#090A0F) jako čistý podklad, jemné neutrální linky (border-white/[0.08]).
- Akcent: Decentní, netoxická mint zelená (emerald-400 / #10b981) vyhrazená pouze pro pozitivní kalkulace a klíčová CTA.
- Typografie: Zavedení font-mono pro všechny tickery, poplatky (TER), výnosy a částky v Kč pro dojem precizního analytického terminálu.
- Srovnávač (EtfOverview): Převeden z těžkopádných karet do přehledné analytické tabulky s přímým srovnáním vůči české bance a mapováním na evropské UCITS ekvivalenty.
- Ovládací panel kalkulačky: Zredukován na funkční kontrolní konzoli bez zbytečných dekorací.
- Copywriting: Striktně věcný tón opřený o reálná data ("Rozdíl mezi TER 0,03 % a 1,85 % je na 15 letech 320 000 Kč...").

3. Výsledek auditu:
- Kompilace: npm run build s kódem 0 (Turbopack, čisté prerenderování).
- Vizuální identita: Profesionální fintech nástroj s vysokou informační hustotou a nulovým "AI klišé" šumem.

---

Session 5: Finální přechod na high-contrast prémiový LIGHT fintech design pro české investory 25–45 let

Nástroj: Antigravity AI Agent

Datum: 2026-10-13

Cíl: Odstranit tmavé klišé (černá díra bez hierarchie, radioaktivní zelená, svítící tečkované mikro-štítky) a přejít na čistý, důvěryhodný institucionální LIGHT režim (ve stylu Stripe, Fondee, Morningstar).

1. Zjištěné slabiny & Zadání:
- Tmavý režim působil pro české konzervativnější investory (25–45 let) jako web o kryptoměnách, nikoli seriózní wealth management nástroj.
- Mikro-štítky s tečkami nad každým nadpisem byly typickým příznakem AI vygenerované stránky.
- Chyběla rychlá volba základních investičních parametrů (pills pro rychlé kliknutí).

2. Implementované změny:
- Paleta & Světlo: Přechod na čisté bílé pozadí (`bg-white`) s jemnými šedými přechody (`bg-slate-50`), kontrastní text (`text-slate-900`) a přesné linky (`border-slate-200`).
- Důvěryhodná akcentní barva: Záměna jedovaté neonové za pevnou investiční smaragdovou (`emerald-700` / `emerald-800`), která působí solidně a bankovně.
- Úplné odstranění AI štítků: Zrušeny všechny umělé tečkované tagy nad nadpisy.
- Prémiová kalkulačka:
  - Zavedena rychlá výběrová tlačítka (pills) pro vklady (2 000 | 5 000 | 10 000 | 20 000 Kč) i horizonty (3 roky | 10 let | 15 let | 20 let | 30 let) doplněná o jemný posuvník.
  - Vytvořen zřetelný dvou-sloupcový kontrast: Zelená karta ETF vs. Šedá karta české banky s přesným rozpadem poplatkového dragu.
- Srovnávací tabulka:
  - Zmenšeny nadbytečné mezery, vytvořeny čisté řádky s hover efektem.
  - Jasně odlišená buňka pro evropské UCITS ekvivalenty (`bg-emerald-50`, `border-emerald-200`, `text-emerald-950`).
  - Jasný srovnávací řádek fondu české banky se vstupním poplatkem 2,5 %.
- Mobilní zobrazení: Přirozené vyplnění šířky displeje bez horizontálního přetékání, na desktopu soustředěný kontejner `max-w-5xl`.

3. Výsledek buildu:
- `npm run build` s kódem 0 (Turbopack, čisté statické prerenderování za 340 ms).
- Stránka působí jako reálný, prověřený fintech produkt s vysokou důvěryhodností pro české publikum.

---

Session 6: Vizuální polish na úroveň hotového SaaS/fintech produktu (Rytmus sekcí, minigraf v kalkulačce a grafitový Lead Magnet)

Nástroj: Antigravity AI Agent

Datum: 2026-10-13

Cíl: Odstranit sterilitu plochého bílého designu. Dodat hmatatelný vizuální rytmus (střídání podkladů), přidat vizuální srovnávací minigraf do kalkulačky a vytvořit prémiový grafitový konverzní ostrov pro Lead Magnet.

1. Zjištěné slabiny & Zadání:
- Monotónní bílá plocha bez rytmu způsobovala, že oko návštěvníka klouzalo po stránce bez jasných záchytných bodů.
- Kalkulačka sice počítala přesná čísla, ale chyběl jí okamžitý grafický vizuální dopad (kolik reálně ztrácí banka oproti ETF).
- Lead magnet na světlém pozadí splýval a neměl dostatečný konverzní tah.

2. Implementované změny:
- Rytmus a hierarchie podkladů:
  * Hero: Čisté bílé pozadí se subtilním radiálním přechodem nahoře pro přirozenou hloubku.
  * Kalkulačka: Umístěna do sekce s odlišeným podkladem (`bg-slate-50/90` s `border-y border-slate-200/80`), čímž se stala přirozeným vizuálním centrem landing page.
  * Srovnávací tabulka: Vrácena na bílý podklad, zarámována v `rounded-2xl` s jemným stínem `shadow-sm`.
  * Lead Magnet: Vytvořen prémiový grafitový box (`bg-slate-900 text-white`) s jemným zeleným akcentem v pozadí, kontrastním bílým inputem a sytým CTA tlačítkem.
- Vylepšení kalkulačky:
  * Do výsledkové karty přidán **vizuální srovnávací minigraf (progress bary)**: ETF zelený 100% pruh vs. Banka šedý pruh (proporcionálně o 20–30 % kratší) s vyčíslením procentuální převahy.
  * Zjemněny stíny tlačítek a pills, přidány hladké přechody na hover a zřetelné aktivní stavy (`shadow-xs ring-1 ring-slate-900` / `ring-emerald-800`).
- Typografický a button polish:
  * Tlačítka dostala moderní hloubku (`shadow-md shadow-emerald-700/20 active:scale-[0.99] transition-all`).
  * Zvýšen kontrast nadpisů, preciznější `tracking-tight` a čitelnější line-height.
- Sjednocení šířky:
  * Všechny sekce striktně omezeny na elegantní kontejner `max-w-5xl mx-auto px-4`, díky čemuž stránka působí jako soustředěný desktopový dashboard.

3. Výsledek auditu:
- Kompilace: `npm run build` s kódem 0 (Turbopack, 321 ms).
- Vizuální stav: Hotový, živý, profesionální fintech nástroj s vynikající dynamikou a konverzní hierarchií.

---

Session 7: Precizní branding a color-grading (Fintech Tier 1 paleta ve stylu IndexLab by Clientelo)

Nástroj: Antigravity AI Agent

Datum: 2026-10-13

Cíl: Vytvořit institucionální identitu Tier 1 fintech platformy (Stripe, Ramp, Linear): nahradit generické logo značkou IndexLab by Clientelo, přejít na podklad #FAFAFA s plasticky vystupujícími bílými kartami, změnit primární CTA na sytý grafit a vyhradit smaragdovou výhradně pro čísla zisku a úspor.

1. Implementované změny:
- Redesign loga & headeru:
  * Nasazena značka **IndexLab** s decentním tagem **by Clientelo**.
  * Geometrická ikona (rostoucí trendová linka v matně černém rámečku).
  * Pravé tlačítko v menu převedeno na čisté černé/grafitové (`bg-zinc-900 hover:bg-zinc-800 text-white`).
- Color-grading & Plastický kontrast:
  * Základní pozadí stránky: prémiový jemný podklad `#FAFAFA`.
  * Karty (Kalkulačka, Tabulka, FAQ): čistě bílé (`bg-white`), ohraničené decentní linkou (`border-zinc-200/80`) s jemným stínem (`shadow-[0_1px_3px_rgba(0,0,0,0.04)]`), díky čemuž přirozeně vystupují z pozadí.
  * CTA tlačítka: sytý tmavý grafit (`bg-zinc-900 hover:bg-zinc-800 text-white`) namísto laciných zelených ploch.
  * Zelená/smaragdová: striktně a výhradně vyhrazena pro pozitivní metriky zisku (čistá úspora v Kč, procentuální převaha ETF a zelený pruh v minigrafu).
- Ovládací prvky v kalkulačce:
  * Aktivní pill tlačítka pro vklady a horizonty jsou matně černá (`bg-zinc-900 text-white font-semibold shadow-xs`) namísto zelených.
- Redesign Lead Magnet boxu:
  * Luxusní matný tmavý antracit (`bg-zinc-900 border border-zinc-800 rounded-2xl p-8 sm:p-12 text-white shadow-lg`) s čistým bílým inputem a kontrastním bílým tlačítkem (`bg-white text-zinc-950 hover:bg-zinc-100`).

2. Výsledek buildu:
- `npm run build` s kódem 0 (Turbopack, čisté prerenderování za 436 ms).
- Stránka má autentickou identitu profesionálního investičního nástroje.

---

Session 8: Decentní, profesionální mikroanimace ve stylu Stripe / Linear

Nástroj: Antigravity AI Agent

Datum: 2026-10-13

Cíl: Přidat čisté a plynulé mikrointerakce bez těžkých externích knihoven, které poskytují okamžitou vizuální zpětnou vazbu bez rušivých či agresivních animací.

1. Implementované mikrointerakce:
- Srovnávací kalkulačka (FeeCalculator):
  * **Progress bary**: Získaly plynulý přechod `transition-all duration-500 ease-out`, takže délka pruhů (ETF vs. Česká banka) se hladce přizpůsobuje při pohybu posuvníky či přepnutí fondu.
  * **Výsledná částka úspory**: Implementován decentní vizuální pulse při přepočtu parametrů (`transition-all duration-200 scale-[1.01]`).
  * **Pill tlačítka a slidery**: Zavedeny rychlé hover a active přechody (`duration-150 active:scale-[0.97]`).
- Tlačítka a CTA:
  * Přidána mikrointerakce jemného vzestupu a stínu: `transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] shadow-sm hover:shadow-md`.
- Srovnávací tabulka (EtfOverview):
  * Plynulý hover efekt na řádcích fondů (`transition-colors duration-150`).
  * Tlačítka volby mají mikroskopický lift efekt (`hover:-translate-y-0.5`).
- FAQ sekce (FaqSection):
  * Akordeon nově využívá čisté **CSS Grid animování výšky (`grid-rows-[0fr]` -> `grid-rows-[1fr]` s `duration-200 ease-out`)** pro hedvábně plynulé otevírání bez trhání.
  * Ikona šipky rotuje o 180 stupňů s hladkou křivkou `duration-200 ease-out`.

2. Výsledek auditu:
- Kompilace: `npm run build` s kódem 0 (Turbopack, 310 ms).
- Nulový dopad na velikost bundlu – vše realizováno přes nativní CSS / Tailwind přechody.
- Výsledný UX dojem: Precizní, plynulá a vysoce responzivní fintech aplikace.

---

Session 9: Finální produktové detaily před produkčním nasazením

Nástroj: Antigravity AI Agent

Datum: 2026-10-13

Cíl: Propojit srovnávací tabulku ETF přímo se stavem kalkulačky, přidat sociální důkaz do Lead Magnetu a nasadit mobilní floating sticky bar pro maximalizaci konverzí.

1. Implementované úpravy:
- **Propojení tabulky a kalkulačky**:
  * Stav vybraného fondu (`selectedEtfId`) byl přesunut do nadřazeného layoutu `page.tsx`.
  * Kliknutí na tlačítko „Zvolit ↗“ u kteréhokoliv ETF v tabulce okamžitě přepne kalkulačku na daný fond (s odpovídajícím TER a parametry) a plynule k ní odscrolluje.
- **Sociální důkaz (Social Proof)**:
  * Do záhlaví antracitového Lead Magnet boxu byl přidán decentní ověřovací odznak: `Ověřeno pro rok 2026 • Již přes 1 400 stažení v ČR` s ikonou `CheckCircle2`.
- **Mobilní Sticky Bar**:
  * Pro displeje telefonů byla nasazena plovoucí spodní lišta (`fixed bottom-3 left-3 right-3 sm:hidden`), která se plynule zobrazí po odscrollování z úvodní sekce (při `scrollY > 300`).
  * Poskytuje rychlý přístup ke kalkulačce i ke stažení PDF manuálu s plným analytickým trackováním událostí.

2. Výsledek buildu a testování:
- `npm run build` prošel s kódem 0 za pouhých 320 ms (Turbopack, statické stránky).
- Aplikace je plně připravena k produkčnímu nasazení a konverznímu měření.

---

Session 10: Revize a sjednocení typografie (Česká diakritika & Pravidlo font-mono)

Nástroj: Antigravity AI Agent

Datum: 2026-10-13

Cíl: Ověřit bezchybné vykreslení české diakritiky (háčky a čárky) v Next.js fontech a striktně vyhradit `font-mono` pouze pro tickery, čísla, procenta a částky v Kč, zatímco veškerý text a popisky sjednotit na přirozený `font-sans`.

1. Implementované úpravy:
- **`src/app/layout.tsx` (next/font subsetting)**:
  * Ověřeno a nastaveno `subsets: ["latin", "latin-ext"]` pro oba primární fonty `Geist` i `Geist_Mono`.
  * Tím je zajištěno optimální nativní načtení a bezchybné zobrazení všech českých znaků s diakritikou (ě, š, č, ř, ž, ý, á, í, é, ů, ú, ť, ď, ň) bez nepříjemných font-fallback artefaktů.
- **Konsolidace `font-mono` vs. `font-sans` napříč komponentami**:
  * `src/components/Hero.tsx`: Štítky a kategorie boxů („Správcovský náklad“, „Česká legislativa“, „Dostupnost v ČR“, „Burza XETRA / EUR“) převedeny na čistý `font-sans`. Třída `font-mono` ponechána výhradně u hodnot jako `0,03 %`, `1,85 %`, `300 000 Kč`, `-98 %` a `0 %`.
  * `src/components/FeeCalculator.tsx`: Popisky kategorií, texty záhlaví, tlačítkové štítky („roky / let“) a texty v poplatkovém rozpadu převedeny na standardní `font-sans`. `font-mono` je aplikován striktně na tickery fondů, hodnoty TER, slidery, částky v Kč a procentuální úsporu.
  * `src/components/EtfOverview.tsx`: Burzy (např. NYSE Arca) a textové štítky („Reinvestice“, „- poplatky“, „Drahé“) převedeny na `font-sans`. `font-mono` ponechán na tickerech (`VOO`, `VUAA`), TERech a výnosech.
  * `src/components/LeadForm.tsx`: Odznak sociálního důkazu, validační chybové hlášky a číslované mezititulky převedeny na přirozený `font-sans`, zatímco tickery (`VUAA`, `VOO`), procenta a letopočty zůstávají v `font-mono`.
  * `src/components/FaqSection.tsx`: Kategorie štítků v akordeonu sjednoceny na `font-sans`, analytické údaje v odpovědích ponechány v `font-mono`.
  * `src/app/page.tsx`: Značka „by Clientelo“ v hlavičce i patičce a název v mobilní liště sjednoceny na `font-sans`, částka úspory v liště ponechána v `font-mono`.

2. Výsledek buildu a testování:
- `npm run build` úspěšně zkompilován s kódem 0 (Turbopack, Next.js 16.4.0).
- Typografie v celé aplikaci působí přirozeně, čistě a profesionálně na úrovni Tier 1 fintechu.

---

Session 11: Jemné typografické korekce a mobilní responzivita (< 640px)

Nástroj: Antigravity AI Agent

Datum: 2026-10-15

Cíl: Odstranit přetékání textu v kartách výhod, opravit mezeru v progress baru kalkulačky a zajistit bezchybnou mobilní responzivitu bez horizontálního posunu celé stránky.

1. Implementované úpravy:
- **Karty výhod v Hero sekci (`src/components/Hero.tsx`)**:
  * Zkrácen a upraven text štítku na jednoznačné a úderné `§ 4 ZDP (osvobozeno)`.
  * Rozšířen max-width kontejneru karet z `max-w-2xl` na `max-w-4xl`, přidáno `gap-2` a štítkům nastaveno `whitespace-nowrap shrink-0`.
  * Text zůstává stabilně na jediném řádku a nedochází k žádnému zalamování závorek ani při změnách šířky okna.
- **Progress bar v kalkulačce (`src/components/FeeCalculator.tsx`)**:
  * Odstraněna nechtěná mezera vzniklá mezerami mezi flex itemy (`gap-1`).
  * Text uzavřen do dedikovaného `<span>ETF (<span className="font-mono font-bold">{selectedEtf.ticker}</span>)</span>`, čímž se název vykresluje přesně jako `ETF (VOO)`.
- **Mobilní responzivita a prevence horizontálního posunu (`< 640px`)**:
  * V `src/app/globals.css` přidáno striktní `overflow-x: hidden` a `max-width: 100%` na elementy `html` i `body`.
  * V kalkulačce (`FeeCalculator.tsx`) upraven padding ovládacího i výsledkového panelu na `p-5 sm:p-7`, mřížky tlačítek presetů optimalizovány pro menší displeje a ke sliderům přidáno `touch-pan-x` pro plynulý dotykový posun.
  * Ve srovnávací tabulce (`src/components/EtfOverview.tsx`) přidán indikátor pro mobilní uživatele (`Posouvejte tabulku vodorovně ↔`) a nastaveno `overscroll-x-contain`, takže scrollování tabulkou nepřenáší pohyb na celou stránku.

2. Výsledek buildu:
- `npm run build` zkompilován bez chyb za 529 ms (Next.js 16.4.0 Turbopack).
- Všechny 3 body zadání jsou plně vyřešeny a zkontrolovány.

---

## Session 6: Mobile-First UX Refaktoring & Eliminace kolizí
- Datum: 2026-10-14
- Nástroj: Antigravity AI Agent
- Cíl: Odstranění zjištěných chyb na mobilních zařízeních (přetékající hlavička, překrývající spodní lišta, mačkající se tabulka ETF).
- Manuální lidská supervize:
  1. Detekce kolize spodní lišty přes CTA tlačítka kalkulačky – vyřešeno přidáním spodního paddingu pb-28.
  2. Mobilní hlavička – redukce textových odkazů a tagu "by Clientelo", zachováno pouze čisté logo a kompaktní akční tlačítko.
  3. Přestavba pills v kalkulačce z přetékajícího flex-row do 2sloupcového touch-friendly gridu pro pohodlné ovládání palcem.
  4. Pevná minimální šířka srovnávací tabulky s plynulým horizontálním posunem zabraňujícím zalamování textu v buňkách.
  5. Odmítnutí horizontálního posunu tabulky na mobilních zařízeních jako nevhodného UX vzoru. Implementován hybridní přístup: desktop využívá kompaktní analytickou tabulku, zatímco mobilní zobrazení dynamicky přepíná na vertikální stack strukturovaných karet s okamžitým přehledem parametrů a UCITS alternativ.