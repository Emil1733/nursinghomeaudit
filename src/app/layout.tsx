import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-rose-100 flex flex-col min-h-screen`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white text-slate-900 px-4 py-2 rounded-lg font-bold shadow-xl border border-slate-200">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-slate-900 text-slate-400 py-12 px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-xs">
              <h3 className="text-white font-black text-lg mb-2">NursingHomeAudit.com</h3>
              <p className="text-xs leading-relaxed">
                Empowering families with real-time federal safety data and AI-driven insights for elder care transparency.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="text-white text-[10px] font-bold uppercase tracking-widest mb-4">Resources</h4>
                <ul className="space-y-2 text-xs">
                  <li><Link href="/" className="hover:text-white transition-colors">Search Map</Link></li>
                  <li><Link href="/directory" className="hover:text-white transition-colors">Browse Directory</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-[10px] font-bold uppercase tracking-widest mb-4">Legal</h4>
                <ul className="space-y-2 text-xs">
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-slate-800 text-[10px] text-slate-500">
            © 2026 Nursing Home Audit Transparency Project. Data derived from CMS nursing home record datasets.
          </div>
        </footer>
      </body>
    </html>
  );
}
