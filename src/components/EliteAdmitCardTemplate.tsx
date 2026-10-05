import React from 'react';
import {
  ExternalLink,
  Calendar,
  AlertCircle,
  CheckCircle2,
  FileCheck,
  HelpCircle,
  Building2,
  Clock,
  Phone,
  Mail,
  ShieldAlert,
} from 'lucide-react';
import { RecruitmentAlert } from '../data/gazetteData';

interface EliteAdmitCardTemplateProps {
  article: RecruitmentAlert;
  onNavigate: (path: string) => void;
}

export const EliteAdmitCardTemplate: React.FC<EliteAdmitCardTemplateProps> = ({ article }) => {
  const steps = article.admitCardDetails?.officialDownloadSteps || article.howToApplySteps || [
    `Navigate to the official commission examination portal at ${article.sourceNotice?.url}.`,
    'Click on the link for "Download e-Admit Card / Admission Certificate".',
    'Select login option: Either through Registration ID and Date of Birth, or Roll Number and Date of Birth.',
    'Enter your credentials along with the security Captcha code displayed on the screen.',
    'Verify all particulars on the electronic admit card and take at least 2 clear printouts on clean A4 paper.',
  ];

  const checklist = article.admitCardDetails?.checklistOnCard || [
    'Candidate Name and spelling (must exactly match 10th certificate).',
    'Roll Number and Registration Number.',
    'Date of Birth and Category (UR / EWS / OBC / SC / ST / PwBD).',
    'Clear, identifiable Passport Photograph and Signature print.',
    'Exam Date, Shift Timing, Reporting Time, and Gate Closure Time.',
    'Exact Exam Center Name, Complete Address, and Center Code.',
  ];

  const carryList = article.admitCardDetails?.examDayCarryList || [
    'Original Printed e-Admit Card (all pages, clear print on A4 paper).',
    'Original Government Valid Photo Identity Card (Aadhaar Card, Voter ID, PAN Card, Driving Licence, or Passport).',
    'Two recent identical passport-size colour photographs (matching the one uploaded during application).',
    'Transparent Blue / Black Ballpoint pen (if permitted by commission notice).',
    'PwBD Scribe Permission Letter and Category Disability Certificate (where applicable).',
  ];

  const helpdesk = article.admitCardDetails?.officialHelpdesk || {
    email: 'support@govindianews.com',
    phone: 'Refer to Official Notification Helpline',
    portalUrl: article.sourceNotice?.url,
  };

  return (
    <div className="space-y-8 text-slate-900">
      {/* 1. Official Notice Summary & Schedule (Clean Open Facts Grid) */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-700" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Official Examination Notice & Schedule
            </h2>
          </div>
          <span className="text-[11px] text-slate-500">
            Source: <a href={article.sourceNotice?.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold underline">{article.sourceNotice?.title || article.organization}</a> (checked {article.sourceNotice?.checkedOn || 'recently'})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div>
            <span className="text-slate-500 text-[11px] uppercase font-bold tracking-wider block">Exam Conducting Authority</span>
            <strong className="text-slate-900 text-sm block mt-0.5">{article.organization}</strong>
          </div>

          <div>
            <span className="text-slate-500 text-[11px] uppercase font-bold tracking-wider block">Examination Window</span>
            <strong className="text-slate-900 text-sm block mt-0.5">{article.examDate || 'Scheduled as per official notice'}</strong>
          </div>

          <div>
            <span className="text-slate-500 text-[11px] uppercase font-bold tracking-wider block">Admit Card Availability</span>
            <strong className="text-blue-800 text-sm block mt-0.5">{article.publishDate || 'Live on Official Server'}</strong>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">Notice Overview:</h3>
          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            {article.admitCardDetails?.officialNoticeSummary || article.summary}
          </p>
        </div>
      </section>

      {/* 2. Official Download Steps */}
      <section className="space-y-3 border-t border-slate-200 pt-4">
        <h3 className="text-base font-bold text-slate-900">Step-by-Step Instructions to Download Admit Card</h3>
        <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700">
          {steps.map((step, idx) => (
            <li key={idx} className="leading-relaxed">{step}</li>
          ))}
        </ol>
      </section>

      {/* 3. What to Check on the Admit Card */}
      <section className="space-y-3 border-t border-slate-200 pt-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <FileCheck className="w-4 h-4 text-blue-700" />
          <h4>Mandatory Particulars to Verify on the Printed Hall Ticket</h4>
        </div>
        <p className="text-xs text-slate-600">
          Check each of the following fields immediately upon download. Any discrepancy must be reported to the commission immediately:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1">
          {checklist.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. What to Carry on Exam Day */}
      <section className="space-y-3 border-t border-slate-200 pt-4">
        <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
          <ShieldAlert className="w-4 h-4 text-amber-700" />
          <h4>Mandatory Documents & Permitted Items for Exam Center Entry</h4>
        </div>
        <ul className="space-y-2 text-xs text-slate-700">
          {carryList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-amber-700 font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="p-3 bg-amber-50/70 border-l-3 border-amber-600 rounded-r-lg text-xs text-amber-950">
          <strong>Strict Prohibition:</strong> Mobile phones, smartwatches, Bluetooth devices, calculators, metallic accessories, and bags are prohibited inside the testing hall.
        </div>
      </section>

      {/* 5. What to Do If Download Fails or Details Are Wrong */}
      <section className="space-y-3 border-t border-slate-200 pt-4">
        <h3 className="text-base font-bold text-slate-900">What to Do If Download Fails or Particulars Are Incorrect</h3>
        <div className="border-l-4 border-blue-600 pl-4 py-1 text-xs text-slate-700 space-y-2 leading-relaxed">
          <p>
            {article.admitCardDetails?.ifDownloadFailsAdvice || (
              'If you are unable to download your e-call letter, clear your browser cache and cookies or attempt login during non-peak hours. If your registration is valid but the hall ticket is not generating, email the regional director of the commission immediately with your application form copy and fee transaction reference.'
            )}
          </p>
          <p className="font-semibold text-slate-800">
            For photograph or signature printing discrepancies: Carry 2 original passport photos matching your application along with valid government photo ID to the examination center superintendent prior to the shift reporting time.
          </p>
        </div>
      </section>

      {/* 6. Official Commission Helpdesk Contact */}
      <section className="space-y-3 border-t border-slate-200 pt-4">
        <h3 className="text-base font-bold text-slate-900">Official Helpdesk & Grievance Contact</h3>
        <div className="text-xs text-slate-800 flex flex-wrap items-center gap-6 py-2">
          {helpdesk.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-500" />
              <span>Helpline: <strong className="text-slate-900">{helpdesk.phone}</strong></span>
            </div>
          )}
          {helpdesk.portalUrl && (
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600" />
              <a href={helpdesk.portalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline font-semibold">
                Official Facilitation Portal
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
