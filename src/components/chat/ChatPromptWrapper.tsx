'use client';

import React, { useState, useEffect } from 'react';
import { FacilityChatSidebar } from './FacilityChatSidebar';
import { Terminal } from 'lucide-react';

interface ChatPromptWrapperProps {
  facility: any;
}

export const ChatPromptWrapper: React.FC<ChatPromptWrapperProps> = ({ facility }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [showGlitch, setShowGlitch] = useState(true);
  const facilityName = facility?.name || 'FACILITY_INTERNAL_ID';
  const fullText = `SYSTEM_STATUS: ACTIVE. REPORT_ANALYSIS_COMPLETE. >_ ASK A QUESTION ABOUT ${facilityName.toUpperCase()}...`;
 
  useEffect(() => {
    const handleInterrogate = () => setIsChatOpen(true);
    window.addEventListener('interrogate-finding', handleInterrogate);
    
    // Initial reveal with slight delay for better UX
    const timer = setTimeout(() => {
      setShowGlitch(false);
      setDisplayText(fullText);
    }, 800);

    return () => {
      window.removeEventListener('interrogate-finding', handleInterrogate);
      clearTimeout(timer);
    };
  }, [fullText]);

  return (
    <>
    <div className={`fixed bottom-0 left-0 right-0 z-[100] bg-[#0F172A] border-t border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.4)] ${showGlitch ? 'animate-glitch-subtle' : ''}`}>
      <button 
          onClick={() => setIsChatOpen(true)}
          className="w-full h-[60px] px-8 flex items-center justify-between group transition-colors hover:bg-slate-900 relative overflow-hidden"
      >
          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-20 w-full animate-scanline opacity-20 pointer-events-none"></div>

          <div className="flex items-center gap-6 overflow-hidden relative z-10">
              <span className="mono-data text-heritage-blue text-sm font-black animate-pulse">&gt;_</span>
              <span className="mono-data text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] whitespace-nowrap">
                  DATASET_COMMAND_INTERFACE: <span className="text-white">{displayText}</span>
                  <span className="w-2 h-4 bg-heritage-blue inline-block ml-1 animate-pulse align-middle"></span>
              </span>
          </div>

          <div className="hidden md:flex items-center gap-8 relative z-10">
              <div className="flex flex-col items-end leading-none">
                  <span className="mono-data text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status</span>
                  <span className="mono-data text-[10px] font-black text-heritage-blue uppercase">Connection_Active</span>
              </div>
              <div className="h-8 w-[1px] bg-slate-800"></div>
              <div className="flex items-center gap-3">
                  <span className="mono-data text-[9px] font-black text-slate-500 uppercase">Initialize_Session</span>
                  <div className="h-2 w-2 rounded-full bg-heritage-blue animate-ping"></div>
              </div>
          </div>
      </button>
    </div>

      {isChatOpen && (
        <FacilityChatSidebar
          facility={facility}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </>
  );
};
