import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nursinghomeaudit.com'),
  title: {
    default: "Nursing Home Audit - Texas Long-Term Care Transparency",
    template: "%s | Nursing Home Audit"
  },
  description: "Free, real-time safety audit of every Texas nursing home. Search 1,176+ facilities for history of violations, health scores, and AI family summaries.",
  openGraph: {
    title: 'Nursing Home Audit - Texas Long-Term Care Transparency',
    description: 'Protect your loved ones with transparency. Search 1,176+ Texas facilities for real-time safety records.',
    url: 'https://nursinghomeaudit.com',
    siteName: 'Nursing Home Audit',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://nursinghomeaudit.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ElderShield - Texas Nursing Home Safety Audit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nursing Home Audit - Texas Long-Term Care Transparency',
    description: 'Search 1,176+ Texas facilities for real-time safety records.',
    images: ['https://nursinghomeaudit.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  }
};

import Header from "@/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${serif.variable} ${mono.variable} ${sans.variable} antialiased selection:bg-slate-900 selection:text-white flex flex-col min-h-screen bg-white text-ink`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white text-ink px-6 py-3 font-black mono-data text-[10px] shadow-2xl border-2 border-slate-900 uppercase tracking-widest">
          [ SKIP_TO_CONTENT ]
        </a>
        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-slate-900 text-slate-400 py-24 px-8 border-t-2 border-slate-900">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="max-w-sm">
              <h3 className="serif-heading text-white font-black text-2xl mb-4 tracking-tight uppercase">Audit Registry</h3>
              <p className="mono-data text-[11px] leading-relaxed font-medium text-slate-500 uppercase tracking-tight">
                Independent regulatory oversight protocol for Long-Term Care (LTC) facilities. Distributed under the Transparency in Healthcare Initiative.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-16">
              <div>
                <h4 className="mono-data text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Archive_Index</h4>
                <ul className="space-y-3 mono-data text-[10px] font-bold uppercase tracking-widest">
                  <li><Link href="/" className="hover:text-white transition-colors">/root</Link></li>
                  <li><Link href="/directory" className="hover:text-white transition-colors">/registry_archive</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">/protocol_brief</Link></li>
                  <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">/map_index</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="mono-data text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Legal_Protocol</h4>
                <ul className="space-y-3 mono-data text-[10px] font-bold uppercase tracking-widest">
                  <li><Link href="/privacy" className="hover:text-white transition-colors">/privacy_data</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">/record_inquiry</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-20 pt-12 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="mono-data text-[9px] text-slate-600 font-black uppercase tracking-[0.2em]">
              © 2026 NURSING HOME AUDIT • TEXAS_UNIT_TRANSCRIPT
            </div>
            <div className="flex gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-0.5 w-6 bg-slate-800"></div>
                ))}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
