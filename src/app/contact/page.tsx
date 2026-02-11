
import { Mail, MapPin } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Nursing Home Audit | Support & Corrections",
  description: "Get in touch with the Nursing Home Audit team for support, data corrections, or media inquiries.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact Nursing Home Audit",
  }
};

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl mb-6">
        <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />
      </div>
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 sm:p-12 max-w-2xl w-full border border-slate-100">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            Contact Support
          </h1>
          <p className="text-slate-600">
            Have a question about a facility record? Found a data discrepancy? We're here to help.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Email Support */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center text-center">
            <div className="bg-rose-100 p-3 rounded-xl mb-4 text-rose-600">
              <Mail size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Email Us</h3>
            <p className="text-xs text-slate-500 mb-4">
              For general inquiries, data corrections, and partnership requests.
            </p>
            <a href="mailto:support@nursinghomeaudit.com" className="text-sm font-bold text-rose-600 hover:text-rose-700 underline">
              support@nursinghomeaudit.com
            </a>
          </div>

          {/* Mailing Address */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center text-center">
            <div className="bg-slate-200 p-3 rounded-xl mb-4 text-slate-600">
              <MapPin size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Mailing Address</h3>
            <p className="text-xs text-slate-500 mb-4">
              Nursing Home Audit Transparency Project
            </p>
            <address className="text-sm font-medium text-slate-600 not-italic">
              123 Innovation Dr, Suite 400<br/>
              Austin, TX 78701
            </address>
          </div>
        </div>

        <div className="mt-12 text-center border-t border-slate-100 pt-8">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">
            Data Correction Policy
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            If you are a facility administrator and believe a record is incorrect, please email us with the official CMS Reference Number for verification. We verify all disputes against the live CMS database.
          </p>
        </div>
      </div>
    </div>
  );
}
