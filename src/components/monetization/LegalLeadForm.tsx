'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, Lock, User, Phone, Mail, MessageSquare, AlertCircle } from 'lucide-react';
import { saveLegalLead } from '@/lib/leads';

interface LegalLeadFormProps {
  facilityId: string;
  facilityName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LegalLeadForm: React.FC<LegalLeadFormProps> = ({ facilityId, facilityName, isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      await saveLegalLead({
        facility_id: facilityId,
        facility_name: facilityName,
        full_name: formData.get('fullName') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
      });
      
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
      }, 3000);
    } catch (err: any) {
      setError(`Transmission Error: ${err.message || 'System fault'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white border-4 border-ink intelligence-grid shadow-[0_0_100px_rgba(15,23,42,0.5)] overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 p-2 text-slate-400 hover:text-ink transition-colors"
        >
          <X size={24} />
        </button>

        {!isSubmitted ? (
          <div className="p-10 md:p-16">
            <div className="mb-10">
              <div className="mb-6 flex items-center gap-3">
                 <div className="critical-status px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-burgundy-critical flex items-center gap-1">
                    <ShieldCheck size={12} />
                    Secure Submission Active
                 </div>
                 <div className="mono-data text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    ID: {facilityId.substring(0,8).toUpperCase()}
                 </div>
              </div>
              
              <h2 className="serif-heading text-4xl font-black text-ink leading-none mb-4">
                Request Evidence Review
              </h2>
              <p className="mono-data text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Case Inquiry regarding: {facilityName}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <User className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input
                  required
                  name="fullName"
                  type="text"
                  placeholder="FULL NAME"
                  className="w-full bg-transparent border-b-2 border-slate-100 py-4 pl-8 text-xs font-black uppercase tracking-widest placeholder:text-slate-200 focus:border-ink focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <Phone className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="PHONE"
                    className="w-full bg-transparent border-b-2 border-slate-100 py-4 pl-8 text-xs font-black uppercase tracking-widest placeholder:text-slate-200 focus:border-ink focus:outline-none transition-colors"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="EMAIL"
                    className="w-full bg-transparent border-b-2 border-slate-100 py-4 pl-8 text-xs font-black uppercase tracking-widest placeholder:text-slate-200 focus:border-ink focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-0 top-4 text-slate-300" size={16} />
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="DESCRIBE INCIDENT PARAMETERS (FALLS, NEGLECT, INJURY)"
                  className="w-full bg-transparent border-b-2 border-slate-100 py-4 pl-8 text-xs font-black uppercase tracking-widest placeholder:text-slate-200 focus:border-ink focus:outline-none transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="p-4 bg-burgundy-critical/10 text-burgundy-critical text-[10px] font-black uppercase border-l-4 border-burgundy-critical flex items-center gap-3">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <button
                disabled={isSubmitting}
                className="group w-full flex items-center justify-center gap-6 bg-ink text-paper px-10 py-6 text-sm font-black uppercase tracking-[0.2em] border-2 border-ink transition-all hover:bg-white hover:text-ink disabled:opacity-50"
              >
                {isSubmitting ? "Transmitting..." : "Initialize Legal Protocol"}
              </button>

              <div className="flex flex-col items-center gap-2 mt-8 opacity-40">
                <div className="flex items-center gap-2">
                    <Lock size={10} />
                    <span className="mono-data text-[8px] font-black uppercase tracking-widest">End-to-End Encryption Protocol Active</span>
                </div>
                <span className="mono-data text-[7px] font-bold text-slate-400">Privileged Attorney-Client Communication Channel</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-20 text-center">
            <div className="mx-auto mb-10 flex h-24 w-24 items-center justify-center border-4 border-heritage-blue text-heritage-blue">
              <ShieldCheck size={48} />
            </div>
            <h2 className="serif-heading text-4xl font-black text-ink leading-tight mb-4 tracking-tighter">Mission Success</h2>
            <p className="mono-data text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Counsel has been notified. Record ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
