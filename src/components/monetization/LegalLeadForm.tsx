
'use client';

import React, { useState } from 'react';
import { X, Send, ShieldCheck, Lock, User, Phone, Mail, MessageSquare } from 'lucide-react';

interface LegalLeadFormProps {
  facilityName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LegalLeadForm: React.FC<LegalLeadFormProps> = ({ facilityName, isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Auto-close after success
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-[40px] bg-white shadow-2xl transition-all animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div className="p-8 sm:p-12">
            <div className="mb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600">
                <ShieldCheck size={14} />
                Secure Legal Inquiry
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Request a <span className="text-blue-600">Free Evidence Review</span>
              </h2>
              <p className="mt-2 text-slate-500 font-medium">
                For context: {facilityName}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-2xl border border-slate-200 py-4 pl-12 pr-4 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-50/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full rounded-2xl border border-slate-200 py-4 pl-12 pr-4 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-50/50 transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    className="w-full rounded-2xl border border-slate-200 py-4 pl-12 pr-4 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-50/50 transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-4 top-6 text-slate-300" size={18} />
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your concern (e.g., fall, neglect, unexplained injury)"
                  className="w-full rounded-2xl border border-slate-200 py-4 pl-12 pr-4 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-50/50 transition-all resize-none"
                />
              </div>

              <button
                disabled={isSubmitting}
                className="group w-full mt-4 flex items-center justify-center gap-3 rounded-2xl bg-slate-900 py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending Inquiry...
                  </span>
                ) : (
                  <>
                    <Send size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    Submit for Legal Review
                  </>
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <Lock size={12} />
                Your information is encrypted & confidential
              </div>
            </form>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Consultation Requested</h2>
            <p className="mt-4 text-lg text-slate-500">
              A Texas Elder Law specialist will review your inquiry and contact you shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
