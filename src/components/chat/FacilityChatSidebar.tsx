
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat, Message } from 'ai/react';
import { X, Send, Stethoscope, AlertTriangle, ShieldCheck } from 'lucide-react';

interface FacilityChatSidebarProps {
  facility: any;
  isOpen: boolean;
  onClose: () => void;
}

export const FacilityChatSidebar: React.FC<FacilityChatSidebarProps> = ({ 
  facility, 
  isOpen, 
  onClose 
}) => {
  const facilityId = facility.id;
  const facilityName = facility.name;

  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { facilityId },
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: `**INITIALIZING DATASET_SCAN: ${facilityName.toUpperCase()}...**<br/>Audit Registry Connection Established. Standing by for protocol inquiry.`
      } as Message
    ]
  });

  const suggestions = [
    { label: 'RUN_SAFETY_SUMMARY', prompt: 'Execute comprehensive safety summary protocol for this facility.' },
    { label: 'ANALYZE_STAFFING_GAPS', prompt: 'Analyze registration and turnover gaps vs regional benchmarks.' },
    { label: 'EXPLAIN_RECENT_VIOLATIONS', prompt: 'Explain the technical impact of recent F-TAG citations.' }
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Auto-Scroll Sync Logic
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'assistant') {
      const scrollMatch = lastMessage.content.match(/\[AUTOSCROLL:(.*?)\]/);
      if (scrollMatch) {
        handleJumpToSource(scrollMatch[1]);
      }
    }
  }, [messages]);

  useEffect(() => {
    // Handle External Interrogations (from Deep Links)
    const handleInterrogate = (e: any) => {
      if (e.detail?.query) {
        setInput(e.detail.query);
      }
    };
    window.addEventListener('interrogate-finding', handleInterrogate as EventListener);

    return () => {
      window.removeEventListener('interrogate-finding', handleInterrogate as EventListener);
    };
  }, [setInput]);

  if (!isOpen) return null;

  const handleExport = () => {
    const transcript = messages.map(m => `[${m.role.toUpperCase()}] ${m.content}`).join('\n\n');
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_transcript_${facilityId.substring(0,8)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleJumpToSource = (id: string) => {
    const cleanId = id.startsWith('#') ? id.substring(1) : id;
    const element = document.getElementById(cleanId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      element.classList.add('ring-4', 'ring-heritage-blue', 'ring-opacity-50', 'transition-all', 'duration-1000');
      setTimeout(() => {
        element.classList.remove('ring-4', 'ring-heritage-blue', 'ring-opacity-50');
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex flex-col justify-end">
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cli-cursor {
          animation: blink 1s step-end infinite;
        }
      `}</style>

      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full h-[55vh] bg-[#0F172A] border-t-2 border-slate-800 shadow-[0_-20px_100px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-500">
        
        {/* Header (Terminal Status Bar) */}
        <div className="px-8 py-3 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-heritage-blue animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                <h3 className="mono-data text-[10px] font-black text-white uppercase tracking-[0.3em]">Dataset_Interrogator_v4.1.0</h3>
            </div>
            <div className="hidden md:flex items-center gap-4 border-l border-slate-800 pl-6">
                <span className="mono-data text-[9px] font-black text-heritage-blue uppercase tracking-widest flex items-center gap-2 border border-heritage-blue/30 px-2 py-0.5 bg-heritage-blue/5">
                  <span className="h-1 w-1 rounded-full bg-heritage-blue overflow-hidden shadow-[0_0_5px_currentColor]"></span>
                  Node: SECURE_CORE_01
                </span>
                <span className="mono-data text-[9px] font-bold text-slate-500 uppercase tracking-widest border border-slate-800 px-2 py-0.5">Target: {facilityName}</span>
                <span className="hidden lg:inline-block mono-data text-[8px] font-black text-white bg-heritage-blue/20 px-3 py-1 uppercase tracking-[0.2em] ml-4 border border-heritage-blue/30">
                  STATUS: INDEPENDENT_AUDIT_LOG | NO_COMMERCIAL_AFFILIATION
                </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
                onClick={handleExport}
                className="group flex items-center gap-2 px-3 py-1 border border-slate-800 hover:border-slate-600 transition-all bg-slate-900"
            >
                <span className="mono-data text-[9px] font-black text-slate-400 group-hover:text-white uppercase">[EXPORT_TRANSCRIPT]</span>
            </button>
            <button 
                onClick={onClose}
                className="group flex items-center gap-2 px-3 py-1 bg-slate-800/50 border border-slate-700 hover:border-burgundy-critical transition-all"
            >
                <span className="mono-data text-[9px] font-black text-slate-400 group-hover:text-burgundy-critical uppercase">Terminate_Session</span>
                <X size={14} className="text-slate-400 group-hover:text-burgundy-critical" />
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="px-8 py-4 bg-slate-50 border-b border-slate-200 flex items-start gap-3">
           <AlertTriangle size={14} className="text-burgundy mt-1 shrink-0" />
           <p className="mono-data text-[9px] font-black text-slate-500 leading-relaxed uppercase tracking-tight">
             Verified federal registry records for {facilityName.toUpperCase()}. <br/> Not medical or legal advice.
           </p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#0F172A] relative">
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20"></div>

          {messages.map((m: Message, idx: number) => (
            <div key={m.id} className="space-y-4 relative z-10">
                <div className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                    className={`max-w-[90%] px-6 py-5 text-[11px] mono-data leading-relaxed ${
                    m.role === 'user' 
                        ? 'bg-slate-800 text-heritage-blue border-l-2 border-heritage-blue' 
                        : 'text-slate-300'
                    }`}
                >
                    {/* Render Text Content with Parser */}
                    {m.content && (
                    <div className="whitespace-pre-wrap">
                      {m.role === 'assistant' && <span className="text-heritage-blue font-black mr-2">&gt;</span>}
                      {m.content
                        .replace(/\[AUTOSCROLL:.*?\]/g, '') // Strip autoscroll tags from visual text
                        .split(/(\[VIEW_METRIC:.*?\]|\[VIEW_LEDGER_ENTRY_#.*?\]|\(REF: F-TAG .*?\))/g)
                        .map((part, i) => {
                        if (part.startsWith('[VIEW_METRIC:')) {
                            const id = part.match(/\[VIEW_METRIC:(.*?)\]/)?.[1];
                            return (
                                <button 
                                key={i}
                                onClick={() => id && handleJumpToSource(id)}
                                className="mx-2 px-3 py-1 bg-heritage-blue text-white font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-heritage-blue transition-all"
                                >
                                [VIEW_DATA_SOURCE]
                                </button>
                            );
                        }
                        if (part.startsWith('[VIEW_LEDGER_ENTRY_#')) {
                            const id = part.match(/\[VIEW_LEDGER_ENTRY_#(.*?)\]/)?.[1];
                            return (
                                <button 
                                key={i}
                                onClick={() => handleJumpToSource('violation-ledger')}
                                className="mx-2 px-3 py-1 bg-amber-500 text-ink font-black text-[9px] uppercase tracking-widest hover:bg-white transition-all shadow-sm"
                                >
                                [VIEW_LEDGER_ENTRY_#{id}]
                                </button>
                            );
                        }
                        if (part.startsWith('(REF: F-TAG')) {
                          return <span key={i} className="text-heritage-blue font-black underline underline-offset-4 cursor-default whitespace-nowrap">{part}</span>;
                        }
                        return <span key={i} dangerouslySetInnerHTML={{ __html: part.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-black">$1</strong>').replace(/<span class="text-amber-200 font-black">(.*?)<\/span>/g, '<span class="text-amber-200 font-black px-1 bg-amber-900/40 border border-amber-900/50">$1</span>') }} />;
                      })}
                    </div>
                    )}
                </div>
                </div>

            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start relative z-10">
              <div className="px-6 py-4 flex gap-3 items-center">
                <div className="w-1.5 h-1.5 bg-heritage-blue animate-pulse"></div>
                <span className="mono-data text-[10px] text-slate-500 uppercase tracking-widest animate-pulse">Interrogating_Database...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-8 bg-slate-900 border-t border-slate-800 shrink-0">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }} 
            className="flex flex-col gap-4"
          >
            {/* Guided UI Protocols (Prompt Chips) */}
            <div className="flex flex-wrap gap-2 mb-2">
                {suggestions.map((s, sIdx) => (
                    <button
                        key={sIdx}
                        type="button"
                        onClick={() => setInput(s.prompt)}
                        className="px-4 py-2 border border-slate-800 mono-data text-[9px] font-black text-slate-500 hover:border-heritage-blue hover:text-white transition-all uppercase tracking-widest bg-slate-900/50 hover:bg-slate-800"
                    >
                        [{s.label}]
                    </button>
                ))}
            </div>

            <div className="relative flex items-center bg-[#0F172A] border border-slate-800 focus-within:border-heritage-blue transition-colors">
                <span className="pl-6 mono-data text-heritage-blue font-black text-sm cli-cursor">&gt;_</span>
                <input
                    value={input}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder={isLoading ? "SCAN_IN_PROGRESS..." : "ENTER_INQUIRY_PROTOCOL..."}
                    className="w-full bg-transparent text-slate-300 text-xs font-black mono-data py-5 pl-4 pr-14 focus:outline-none uppercase tracking-[0.15em] placeholder:text-slate-800"
                />
                <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-4 p-3 text-slate-500 hover:text-heritage-blue disabled:text-slate-800 transition-colors"
                >
                    <Send size={18} strokeWidth={2.5} />
                </button>
            </div>
            <div className="flex justify-between items-center px-1">
                <div className="flex gap-6">
                    <span className="mono-data text-[8px] font-black text-slate-700 uppercase tracking-[0.2em]">Secure_Link: Established</span>
                    <span className="mono-data text-[8px] font-black text-slate-700 uppercase tracking-[0.2em]">Node: {facilityId.substring(0, 8).toUpperCase()}</span>
                </div>
                <p className="mono-data text-[8px] font-black text-slate-800 leading-relaxed uppercase tracking-tight max-w-[40%] text-right">
                  Verified federal registry records. Not medical or legal advice. © 2026 Audit Registry Node 01.
                </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
