export interface Holding {
  name: string;
  ticker?: string;
  weight: number; // in percent, e.g. 7.2
}

export interface ETFItem {
  id: string;
  ticker: string;
  name: string;
  provider: string;
  exchange: string;
  ter: number; // in percent, e.g. 0.03
  fiveYearReturnAnnualized: number; // in percent p.a., e.g. 15.2
  dividendYield: number; // in percent, e.g. 1.35
  riskProfile: {
    level: string; // e.g. "Středně vysoké (5/7)"
    badge: string; // e.g. "Vyvážené" | "Růstové" | "Dynamické"
  };
  aum: string; // e.g. "540+ mld. USD"
  description: string;
  idealFor: string;
  topHoldings: Holding[];
  tags: string[];
  ucitsEquivalent?: {
    ticker: string;
    name: string;
    ter: number;
    exchange: string;
  };
}

export interface BankBenchmark {
  name: string;
  category: string;
  ter: number; // in percent p.a., e.g. 1.85
  entryFee: number; // in percent, e.g. 2.5
  exitFee: number; // in percent, e.g. 0.0
  description: string;
}

export const CZECH_BANK_BENCHMARK: BankBenchmark = {
  name: "Běžný akciový podílový fond české banky",
  category: "Aktivně řízený fond velkých českých bank (ČS, ČSOB, KB)",
  ter: 1.85, // 1.85% p.a. běžný správcovský náklad
  entryFee: 2.5, // 2.5% vstupní distribuční poplatek
  exitFee: 0.0,
  description:
    "Typický retailový akciový fond nabízený na pobočkách českých bank. Vysoká marže zprostředkovatelů a správcovský poplatek drasticky snižují konečný složený úrok investora.",
};

export const ETF_DATA: ETFItem[] = [
  {
    id: "voo",
    ticker: "VOO",
    name: "Vanguard S&P 500 ETF",
    provider: "Vanguard",
    exchange: "NYSE Arca",
    ter: 0.03,
    fiveYearReturnAnnualized: 15.2,
    dividendYield: 1.32,
    riskProfile: {
      level: "Dynamické (5/7)",
      badge: "Základ portfolia",
    },
    aum: "560+ mld. USD",
    description:
      "Zlatý standard pasivního investování. Sleduje 500 největších a nejziskovějších amerických korporací s extrémně nízkým poplatkem pouze 0,03 % ročně.",
    idealFor: "Dlouhodobý růst kapitálu pro každého drobného investora v ČR.",
    topHoldings: [
      { name: "Microsoft Corp.", ticker: "MSFT", weight: 6.8 },
      { name: "Apple Inc.", ticker: "AAPL", weight: 6.2 },
      { name: "NVIDIA Corp.", ticker: "NVDA", weight: 5.9 },
      { name: "Amazon.com Inc.", ticker: "AMZN", weight: 3.8 },
      { name: "Meta Platforms", ticker: "META", weight: 2.5 },
    ],
    tags: ["S&P 500", "Ultra-low cost", "US Large Cap"],
    ucitsEquivalent: {
      ticker: "VUAA / SXR8",
      name: "Vanguard S&P 500 UCITS ETF (Acc)",
      ter: 0.07,
      exchange: "XETRA / LSE",
    },
  },
  {
    id: "qqq",
    ticker: "QQQ",
    name: "Invesco QQQ Trust",
    provider: "Invesco",
    exchange: "Nasdaq",
    ter: 0.2,
    fiveYearReturnAnnualized: 20.4,
    dividendYield: 0.58,
    riskProfile: {
      level: "Vysoké (6/7)",
      badge: "Technologický růst",
    },
    aum: "290+ mld. USD",
    description:
      "Fond 100 největších nefinančních technologických a inovačních gigantů z burzy Nasdaq. Dlouhodobě jeden z nejvýkonnějších indexových fondů moderní historie.",
    idealFor: "Investory s delším horizontem hledající dynamický kapitálový růst tažený inovacemi a AI.",
    topHoldings: [
      { name: "Apple Inc.", ticker: "AAPL", weight: 8.9 },
      { name: "NVIDIA Corp.", ticker: "NVDA", weight: 8.4 },
      { name: "Microsoft Corp.", ticker: "MSFT", weight: 7.9 },
      { name: "Amazon.com Inc.", ticker: "AMZN", weight: 5.1 },
      { name: "Broadcom Inc.", ticker: "AVGO", weight: 4.6 },
    ],
    tags: ["Nasdaq 100", "Technologie & AI", "Dynamický růst"],
    ucitsEquivalent: {
      ticker: "EQQQ / CNDX",
      name: "Invesco EQQQ Nasdaq-100 UCITS ETF",
      ter: 0.3,
      exchange: "XETRA / LSE",
    },
  },
  {
    id: "schd",
    ticker: "SCHD",
    name: "Schwab U.S. Dividend Equity ETF",
    provider: "Charles Schwab",
    exchange: "NYSE Arca",
    ter: 0.06,
    fiveYearReturnAnnualized: 11.9,
    dividendYield: 3.48,
    riskProfile: {
      level: "Středně dynamické (4/7)",
      badge: "Dividendový příjem",
    },
    aum: "62+ mld. USD",
    description:
      "Ikona mezi dividendovými investory. Vybírá 100 finančně pevných amerických firem s minimálně 10letou historií nepřetržitého růstu dividend a vysokou rentabilitou vlastního kapitálu.",
    idealFor: "Investory, kteří preferují stabilní peněžní toky, nižší kolísavost a složené reinvestice dividend.",
    topHoldings: [
      { name: "Broadcom Inc.", ticker: "AVGO", weight: 4.3 },
      { name: "The Home Depot", ticker: "HD", weight: 4.1 },
      { name: "Cisco Systems", ticker: "CSCO", weight: 4.0 },
      { name: "AbbVie Inc.", ticker: "ABBV", weight: 3.9 },
      { name: "Texas Instruments", ticker: "TXN", weight: 3.8 },
    ],
    tags: ["Dividendy", "Defenzivní", "Kvalitní rozvaha"],
    ucitsEquivalent: {
      ticker: "FUSD",
      name: "Fidelity US Quality Income UCITS ETF",
      ter: 0.25,
      exchange: "XETRA / LSE",
    },
  },
  {
    id: "vt",
    ticker: "VT",
    name: "Vanguard Total World Stock ETF",
    provider: "Vanguard",
    exchange: "NYSE Arca",
    ter: 0.07,
    fiveYearReturnAnnualized: 11.3,
    dividendYield: 1.94,
    riskProfile: {
      level: "Vyváženě dynamické (4/7)",
      badge: "Globální diverzifikace",
    },
    aum: "44+ mld. USD",
    description:
      "Kompletní diverzifikace v jediné akcii. Pokrývá více než 9 800 společností z rozvinutých i rozvíjejících se trhů po celém světě (cca 60 % USA, 20 % Evropa, 10 % Pacifik, 10 % Emerging Markets).",
    idealFor: "Koncepci 'kup a zapomeň' bez nutnosti sázet pouze na americkou ekonomiku.",
    topHoldings: [
      { name: "Microsoft Corp.", ticker: "MSFT", weight: 4.1 },
      { name: "Apple Inc.", ticker: "AAPL", weight: 3.8 },
      { name: "NVIDIA Corp.", ticker: "NVDA", weight: 3.5 },
      { name: "Amazon.com Inc.", ticker: "AMZN", weight: 2.3 },
      { name: "Alphabet Inc.", ticker: "GOOGL", weight: 2.1 },
    ],
    tags: ["Celý svět", "Maximální diverzifikace", "9 800+ firem"],
    ucitsEquivalent: {
      ticker: "VWCE / FWRA",
      name: "Vanguard FTSE All-World UCITS ETF (Acc)",
      ter: 0.22,
      exchange: "XETRA",
    },
  },
  {
    id: "spy",
    ticker: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    provider: "State Street Global Advisors",
    exchange: "NYSE Arca",
    ter: 0.09,
    fiveYearReturnAnnualized: 15.1,
    dividendYield: 1.28,
    riskProfile: {
      level: "Dynamické (5/7)",
      badge: "Globální likvidita",
    },
    aum: "610+ mld. USD",
    description:
      "Vůbec nejstarší a nejobchodovanější ETF na světě (založeno 1993). Nabízí bezkonkurenční hloubku trhu a nejnižší bid-ask spready vhodné i pro instituce a pokročilé obchodníky.",
    idealFor: "Investory vyžadující bleskovou likviditu, opční strategie a prověřenou třicetiletou stabilitu fondu.",
    topHoldings: [
      { name: "Microsoft Corp.", ticker: "MSFT", weight: 6.8 },
      { name: "Apple Inc.", ticker: "AAPL", weight: 6.2 },
      { name: "NVIDIA Corp.", ticker: "NVDA", weight: 5.9 },
      { name: "Amazon.com Inc.", ticker: "AMZN", weight: 3.8 },
      { name: "Meta Platforms", ticker: "META", weight: 2.5 },
    ],
    tags: ["Nejlikvidnější na světě", "S&P 500", "Institucionální standard"],
    ucitsEquivalent: {
      ticker: "SPY5 / SXR8",
      name: "SPDR S&P 500 UCITS ETF (Acc)",
      ter: 0.03,
      exchange: "XETRA",
    },
  },
];

export const ANNUAL_MARKET_RETURN_DEFAULT = 0.08; // 8% p.a. standardní modelový tržní růst

export interface SimulationResult {
  totalDeposited: number; // celkem vloženo v Kč
  bankPortfolioValue: number; // konečná hodnota u české banky
  etfPortfolioValue: number; // konečná hodnota v ETF
  netSavings: number; // čistý rozdíl ve prospěch ETF v Kč
  bankEntryFeesPaid: number; // zaplacené vstupní poplatky bance
  bankManagementFeeDrag: number; // ztráta na složeném úroku kvůli vysokému TER
  percentageAdvantage: number; // o kolik % více má investor v ETF
}

/**
 * Počítá budoucí hodnotu pravidelné měsíční investice se zohledněním poplatků.
 * @param monthlyDeposit Měsíční vklad v Kč
 * @param years Horizont v letech
 * @param etfTer TER vybraného ETF v % (např. 0.03)
 * @param nominalReturn Roční nominální růst trhu (např. 0.08 pro 8 %)
 */
export function calculateComparison(
  monthlyDeposit: number,
  years: number,
  etfTer: number,
  nominalReturn: number = ANNUAL_MARKET_RETURN_DEFAULT
): SimulationResult {
  const months = years * 12;
  const totalDeposited = monthlyDeposit * months;

  // Měsíční míry výnosnosti po odečtení průběžných nákladů (TER)
  // Používáme přesný roční přepočet na měsíc
  const etfAnnualNet = nominalReturn - etfTer / 100;
  const bankAnnualNet = nominalReturn - CZECH_BANK_BENCHMARK.ter / 100;

  const etfMonthlyRate = Math.pow(1 + Math.max(0, etfAnnualNet), 1 / 12) - 1;
  const bankMonthlyRate = Math.pow(1 + Math.max(0, bankAnnualNet), 1 / 12) - 1;

  // Česká banka strhává vstupní poplatek z každého měsíčního vkladu
  const bankEntryFeeRatio = CZECH_BANK_BENCHMARK.entryFee / 100;
  const bankNetMonthlyDeposit = monthlyDeposit * (1 - bankEntryFeeRatio);
  const bankEntryFeesPaid = monthlyDeposit * bankEntryFeeRatio * months;

  // Simulace měsíc po měsíci s reinvesticí
  let etfValue = 0;
  let bankValue = 0;

  for (let m = 0; m < months; m++) {
    // Vklad na začátku měsíce a zhodnocení
    etfValue = (etfValue + monthlyDeposit) * (1 + etfMonthlyRate);
    bankValue = (bankValue + bankNetMonthlyDeposit) * (1 + bankMonthlyRate);
  }

  const netSavings = Math.max(0, etfValue - bankValue);
  const percentageAdvantage =
    bankValue > 0 ? ((etfValue - bankValue) / bankValue) * 100 : 0;

  // Odhad poplatkového dragu (rozdíl celkové úspory a přímých vstupních poplatků)
  const bankManagementFeeDrag = Math.max(0, netSavings - bankEntryFeesPaid);

  return {
    totalDeposited: Math.round(totalDeposited),
    bankPortfolioValue: Math.round(bankValue),
    etfPortfolioValue: Math.round(etfValue),
    netSavings: Math.round(netSavings),
    bankEntryFeesPaid: Math.round(bankEntryFeesPaid),
    bankManagementFeeDrag: Math.round(bankManagementFeeDrag),
    percentageAdvantage: Math.round(percentageAdvantage * 10) / 10,
  };
}
