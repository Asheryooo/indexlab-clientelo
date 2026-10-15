import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fafafa",
};

export const metadata: Metadata = {
  title: "IndexLab by Clientelo | Srovnání TOP 5 ETF z NYSE pro české investory 2026",
  description:
    "Srovnejte TOP 5 ETF z NYSE (VOO, QQQ, SCHD, VT, SPY) s běžnými fondy českých bank. Zjistěte, jak ušetřit statisíce na poplatcích s TER od 0,03 %, využít 3letý daňový test a vyhnout se 30% dividendové dani.",
  keywords: [
    "IndexLab",
    "Clientelo",
    "ETF pro české investory",
    "NYSE ETF",
    "VOO",
    "QQQ",
    "SCHD",
    "VT",
    "SPY",
    "kalkulačka poplatků ETF",
    "W-8BEN",
    "3letý daňový test",
  ],
  authors: [{ name: "IndexLab by Clientelo" }],
  openGraph: {
    title: "IndexLab by Clientelo | Srovnání TOP 5 ETF z NYSE",
    description:
      "Spočítejte si čistou úsporu na poplatcích oproti českým bankám. TER od 0,03 % p.a. a 0% daň po 3 letech.",
    type: "website",
    locale: "cs_CZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth bg-[#FAFAFA] text-zinc-900 antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-zinc-900 selection:bg-zinc-200 selection:text-zinc-950 font-sans">
        {children}
      </body>
    </html>
  );
}
