
'use client';

import React, { useState } from 'react';
import { LegalLeadWidget } from './LegalLeadWidget';
import { LegalLeadForm } from './LegalLeadForm';

interface LegalLeadSectionProps {
  facilityName: string;
  grade: string;
}

export const LegalLeadSection: React.FC<LegalLeadSectionProps> = ({ facilityName, grade }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Trigger logic: Only F or D rated facilities
  const showWidget = grade === 'F' || grade === 'D';

  if (!showWidget) return null;

  return (
    <>
      <LegalLeadWidget 
        facilityName={facilityName} 
        grade={grade} 
        onOpenForm={() => setIsFormOpen(true)} 
      />
      <LegalLeadForm 
        facilityName={facilityName} 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </>
  );
};
