import React from 'react';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Nursing Home Audit",
  description: "Our commitment to data transparency and visitor privacy at Nursing Home Audit.",
  alternates: {
    canonical: '/privacy',
  },
};

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans px-6 py-12">
      <div className="max-w-3xl mx-auto mb-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy', href: '/privacy' }]} />
      </div>
      <article className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-12">Last Updated: February 10, 2026</p>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">1. Data We Collect</h2>
          <p>
            NursingHomeAudit.com is a public information resource. We do not require account registration or collect personal 
            identification information from our visitors. We use industry-standard web analytics (like Google Analytics) 
            to understand how visitors interact with our safety data.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">2. Use of Information</h2>
          <p>
            Any data collected via analytics is used solely to improve the user experience and the accessibility of 
            nursing home safety records. We do not sell or share individual visitor data with third parties.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">3. Data Source</h2>
          <p>
            The nursing home data, violation history, and safety scores presented on this site are derived from publicly 
            available federal and state records (Centers for Medicare & Medicaid Services). While we strive for accuracy, 
            families should always verify current status with the facility directly.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">4. Cookies</h2>
          <p>
            We use essential cookies to maintain site performance. You can disable cookies in your browser settings 
            without losing any core functionality of the site.
          </p>
        </section>

        <div className="mt-20 pt-8 border-t border-slate-100 italic text-slate-400 text-sm">
          NursingHomeAudit.com — Empowering families with transparency.
        </div>
      </article>
    </div>
  );
}
