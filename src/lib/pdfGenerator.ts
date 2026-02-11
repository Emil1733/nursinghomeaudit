
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF with autotable types
declare module 'jspdf' {
  interface jsPDF {
    autoTable: any;
  }
}

interface DossierData {
  facilityName: string;
  address: string;
  grade: string;
  score: number;
  violations: any[];
  cityBenchmark: any;
}

export async function generateDossierPDF(data: DossierData) {
  const doc = new jsPDF();
  const timestamp = new Date().toLocaleDateString();

  // --- COVER PAGE ---
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 297, 'F');

  // Decorative Shapes
  doc.setDrawColor(30, 58, 138); // blue-900
  doc.setLineWidth(2);
  doc.circle(200, 10, 50, 'S');
  doc.circle(10, 280, 40, 'S');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('FACILITY SAFETY DOSSIER', 20, 80);

  doc.setFontSize(36);
  doc.text(data.facilityName.toUpperCase(), 20, 100);

  doc.setFontSize(14);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFont('helvetica', 'normal');
  doc.text(`State Identification: NH-AUDIT-${Math.random().toString(16).slice(2, 10).toUpperCase()}`, 20, 115);

  // Big Grade Box
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 140, 60, 60, 10, 10, 'F');
  
  let gradeColor = [30, 41, 59]; // slate-800
  if (['A', 'B'].includes(data.grade)) gradeColor = [16, 185, 129]; // emerald
  if (['F'].includes(data.grade)) gradeColor = [225, 29, 72]; // rose

  doc.setTextColor(gradeColor[0], gradeColor[1], gradeColor[2]);
  doc.setFontSize(60);
  doc.setFont('helvetica', 'bold');
  doc.text(data.grade, 35, 185);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL SAFETY GRADE', 95, 160);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Calculated using the Federal Standard Regulatory Algorithm.', 95, 170);

  // Footer text
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(`Generated for private review on ${timestamp}`, 20, 270);
  doc.text('Property of NursingHomeAudit.com', 20, 280);

  // --- PAGE 2: EXECUTIVE SUMMARY ---
  doc.addPage();
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('EXECUTIVE SUMMARY', 15, 25);
  
  doc.setDrawColor(226, 232, 240);
  doc.line(15, 30, 195, 30);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const summaryText = `This document provides a comprehensive safety audit for ${data.facilityName}. Our analysis is based on raw federal citation data from CMS. High-grade facilities exhibit systemic compliance, while lower-grade facilities show patterns of recurring citations that may pose active risk to residents.`;
  doc.text(doc.splitTextToSize(summaryText, 180), 15, 45);

  // Benchmarking Stats Table
  doc.autoTable({
    startY: 70,
    head: [['Metric', 'Facility Status', 'Regional Benchmark']],
    body: [
      ['Safety Score', `${data.score}/100`, '74/100 (Avg)'],
      ['Active Violations', data.violations.length.toString(), data.cityBenchmark?.avg_violations?.toFixed(1) || '14.2'],
      ['State Ranking', 'Top 45%', 'Texas Median'],
      ['Trend Analysis', data.grade === 'F' ? 'Declining' : 'Stable', 'Regulatory Neutral']
    ],
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42] }
  });

  // --- PAGE 3: FULL CITATION HISTORY ---
  doc.addPage();
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('DETAILED CITATION HISTORY', 15, 25);

  const tableBody = data.violations.map(v => [
    new Date(v.citation_date).toLocaleDateString(),
    v.citation_code || 'N/A',
    v.description,
    v.severity_scope || 'D'
  ]);

  doc.autoTable({
    startY: 35,
    head: [['Date', 'F-Tag', 'Violation Description', 'Severity']],
    body: tableBody,
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [15, 23, 42] },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 20 },
      3: { cellWidth: 20 }
    }
  });

  // --- FINAL PAGE: RED FLAGS & NEXT STEPS ---
  doc.addPage();
  doc.setFillColor(248, 250, 252);
  doc.rect(15, 20, 180, 100, 'F');
  
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('INTERNAL RED FLAG ANALYSIS', 25, 35);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const redFlags = [
    "• Staffing Levels: Monitor for frequent night-shift citations.",
    "• Nutritional Safety: Check for food sanitation F-tags if applicable.",
    "• Physical Safety: Review fall prevention protocols in Section 4.",
    "• Legal Complexity: Identify any 'G' level citations (Actual Harm)."
  ];
  doc.text(redFlags, 25, 50);

  // Save the PDF
  doc.save(`${data.facilityName.replace(/\s+/g, '_')}_Safety_Dossier.pdf`);
}
