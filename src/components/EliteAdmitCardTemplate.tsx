import React, { useState } from 'react';
import {
  ExternalLink,
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileCheck,
  HelpCircle,
  Building2,
  Clock,
  Phone,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Calculator,
  ChevronRight,
  ChevronDown,
  Award,
  BookOpen,
  TrendingUp,
  Layers,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { RecruitmentAlert } from '../data/gazetteData';

interface EliteAdmitCardTemplateProps {
  article: RecruitmentAlert;
  onNavigate?: (path: string) => void;
}

export const EliteAdmitCardTemplate: React.FC<EliteAdmitCardTemplateProps> = ({ article, onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = article.admitCardDetails?.officialDownloadSteps || article.admitCardDetails?.downloadSteps || article.howToApplySteps || [
    `Navigate to the official commission examination portal at ${article.sourceNotice?.url}.`,
    'Click on the link for "Download e-Admit Card / Admission Certificate".',
    'Select login option: Either through Registration ID and Date of Birth, or Roll Number and Date of Birth.',
    'Enter your credentials along with the security Captcha code displayed on the screen.',
    'Verify all particulars on the electronic admit card and take at least 2 clear printouts on clean A4 paper.',
  ];

  const checklist = article.admitCardDetails?.checklistOnCard || article.admitCardDetails?.detailsToCheck || [
    'Candidate Name and spelling (must exactly match 10th certificate).',
    'Roll Number and Registration Number.',
    'Date of Birth and Category (UR / EWS / OBC / SC / ST / PwBD).',
    'Clear, identifiable Passport Photograph and Signature print.',
    'Exam Date, Shift Timing, Reporting Time, and Gate Closure Time.',
    'Exact Exam Center Name, Complete Address, and Center Code.',
  ];

  const carryList = article.admitCardDetails?.examDayCarryList || article.admitCardDetails?.itemsToCarry || [
    'Original Printed e-Admit Card (all pages, clear print on A4 paper).',
    'Original Government Valid Photo Identity Card (Aadhaar Card, Voter ID, PAN Card, Driving Licence, or Passport).',
    'Two recent identical passport-size colour photographs (matching the one uploaded during application).',
    'Transparent Blue / Black Ballpoint pen (if permitted by commission notice).',
    'PwBD Scribe Permission Letter and Category Disability Certificate (where applicable).',
  ];

  const barredList = article.admitCardDetails?.prohibitedItems || [
    'Mobile phones, smartphones, and electronic gadgets of any kind.',
    'Bluetooth earbuds, smartwatches, fitness trackers, and digital watches.',
    'Calculators, digital pens, health bands, and recording instruments.',
    'Bags, wallets, purses, pouches, study notes, and blank paper sheets.',
    'Metallic jewellery, nose pins, charms, and belts with large metallic buckles.',
    'Any eating food items (except transparent water bottle where allowed).',
  ];

  const helpdesk = article.admitCardDetails?.officialHelpdesk || {
    email: 'support@govindianews.com',
    phone: 'Refer to Official Notification Helpline',
    portalUrl: article.sourceNotice?.url,
  };

  return (
    <div className="space-y-8 text-slate-900">
      {/* 1. Official Notice Summary & Schedule */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-700" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Official Examination Notice &amp; Schedule
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
        <p className="text-xs text-slate-600">
          Follow the verified procedure below to download your electronic admission certificate without technical delays:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700">
          {steps.map((step, idx) => (
            <li key={idx} className="leading-relaxed">{step}</li>
          ))}
        </ol>
      </section>

      {/* 3. Shift Timings & Gate Closing Protocol */}
      <section className="space-y-3 border-t border-slate-200 pt-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <Clock className="w-4 h-4 text-blue-700" />
          <h3 className="text-base font-bold text-slate-900">Exam Shift Timings &amp; Strict Gate Closure Protocol</h3>
        </div>
        <p className="text-xs text-slate-600">
          Candidates must report strictly before the designated gate closure time. Commission guidelines mandate that entry gates are sealed exactly 30 to 45 minutes before test commencement. Late entry is strictly prohibited under all circumstances.
        </p>
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left divide-y divide-slate-200 text-xs min-w-[500px]">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3">Shift Number</th>
                  <th className="p-3">Reporting Time</th>
                  <th className="p-3">Gate Closure Time (Strict)</th>
                  <th className="p-3">Test Timing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3 font-semibold text-slate-900">Shift 1 (Morning)</td>
                  <td className="p-3 text-slate-700">07:45 AM – 08:30 AM</td>
                  <td className="p-3 font-bold text-rose-700">08:30 AM Sharp</td>
                  <td className="p-3 text-slate-900 font-medium">09:00 AM – 10:00 AM / 11:00 AM</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3 font-semibold text-slate-900">Shift 2 (Afternoon)</td>
                  <td className="p-3 text-slate-700">11:15 AM – 12:00 PM</td>
                  <td className="p-3 font-bold text-rose-700">12:00 PM Sharp</td>
                  <td className="p-3 text-slate-900 font-medium">12:30 PM – 01:30 PM / 02:30 PM</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3 font-semibold text-slate-900">Shift 3 (Evening)</td>
                  <td className="p-3 text-slate-700">02:45 PM – 03:30 PM</td>
                  <td className="p-3 font-bold text-rose-700">03:30 PM Sharp</td>
                  <td className="p-3 text-slate-900 font-medium">04:00 PM – 05:00 PM / 06:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. What to Check on the Admit Card */}
      <section className="space-y-3 border-t border-slate-200 pt-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <FileCheck className="w-4 h-4 text-blue-700" />
          <h3 className="text-base font-bold text-slate-900">Mandatory Particulars to Verify on the Printed Hall Ticket</h3>
        </div>
        <p className="text-xs text-slate-600">
          Check each of the following fields immediately upon download. Any discrepancy must be reported to the commission facilitation counter before the examination:
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

      {/* 5. Exam Pattern & Marking Scheme Breakdown (If present) */}
      {article.examPattern && article.examPattern.length > 0 && (
        <section className="space-y-3 border-t border-slate-200 pt-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900">
              Examination Pattern, Sectional Weightage &amp; Negative Marking
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            Structure of the question paper, mark distribution, and deduction rules governing this test cycle.
          </p>
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left divide-y divide-slate-200 text-xs min-w-[540px]">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">Section / Subject</th>
                    <th className="p-3 text-center">Questions</th>
                    <th className="p-3 text-center">Maximum Marks</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Negative Penalty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {article.examPattern.map((pat, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="p-3 font-semibold text-slate-900">{pat.subject}</td>
                      <td className="p-3 text-center text-slate-800">{pat.questions}</td>
                      <td className="p-3 text-center font-bold text-blue-800">{pat.marks}</td>
                      <td className="p-3 text-slate-600">{pat.time}</td>
                      <td className="p-3 text-rose-700 font-medium">{pat.negativeMarking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 6. Historical Cut-Off Benchmarks (If present) */}
      {article.cutOffTrends && article.cutOffTrends.length > 0 && (
        <section className="space-y-3 border-t border-slate-200 pt-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900">
              Previous Cycle Qualifying Cut-Off Benchmarks
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            Historical normalized qualifying marks across reservation categories to gauge target scores and safe attempt targets.
          </p>
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left divide-y divide-slate-200 text-xs min-w-[540px]">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">Cycle / Exam Stage</th>
                    <th className="p-3 text-center">General (UR)</th>
                    <th className="p-3 text-center">OBC-NCL</th>
                    <th className="p-3 text-center">EWS</th>
                    <th className="p-3 text-center">SC</th>
                    <th className="p-3 text-center">ST</th>
                    <th className="p-3 text-right">Total Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white font-mono">
                  {article.cutOffTrends.map((cut, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="p-3 font-semibold text-slate-900 font-sans">{cut.year}</td>
                      <td className="p-3 text-center font-bold text-blue-800">{cut.general.toFixed(2)}</td>
                      <td className="p-3 text-center text-slate-800">{cut.obc.toFixed(2)}</td>
                      <td className="p-3 text-center text-slate-800">{cut.ews.toFixed(2)}</td>
                      <td className="p-3 text-center text-slate-800">{cut.sc.toFixed(2)}</td>
                      <td className="p-3 text-center text-slate-800">{cut.st.toFixed(2)}</td>
                      <td className="p-3 text-right text-slate-600 font-sans">{cut.totalMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 7. Permitted vs. Prohibited Item Matrix */}
      <section className="space-y-3 border-t border-slate-200 pt-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <ShieldAlert className="w-4 h-4 text-amber-700" />
          <h3 className="text-base font-bold text-slate-900">Permitted vs. Prohibited Items Inside Testing Venue</h3>
        </div>
        <p className="text-xs text-slate-600">
          Strict security and biometric frisking are conducted at all authorized test centers. Familiarize yourself with the item guidelines:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs uppercase tracking-wide">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Mandatory &amp; Permitted Items:</span>
            </div>
            <ul className="space-y-1.5 text-emerald-950">
              {carryList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-rose-900 font-bold text-xs uppercase tracking-wide">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Strictly Prohibited &amp; Barred Items:</span>
            </div>
            <ul className="space-y-1.5 text-rose-950">
              {barredList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Interactive Candidate Utilities for Exam Day */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600/30 rounded-xl border border-blue-500/40 text-blue-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Exam Day Candidate Utilities
              </h3>
              <p className="text-xs text-slate-300">Software calculators and accuracy simulators for candidates writing this examination</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full text-[11px] font-bold">
            Live Software Tools
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <button
            type="button"
            onClick={() => onNavigate?.('/tools/marking')}
            className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer space-y-1.5 group"
          >
            <div className="flex items-center justify-between text-blue-300 text-xs font-bold">
              <span>Marking &amp; Penalty Calculator</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Model score trajectory under 1/3, 1/4, or 0.50 negative deduction rules.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('/tools/photo-checker')}
            className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer space-y-1.5 group"
          >
            <div className="flex items-center justify-between text-blue-300 text-xs font-bold">
              <span>Photo &amp; Spec Validator</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Verify dimension and pixel specs for physical photographs carried to venue.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('/mock-test/ssc-cgl-tier1')}
            className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer space-y-1.5 group"
          >
            <div className="flex items-center justify-between text-blue-300 text-xs font-bold">
              <span>CBT Test Simulator</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Timed practice environment with live countdown and instant score analysis.
            </p>
          </button>
        </div>
      </section>

      {/* 9. Post-Exam Milestone Roadmap */}
      <section className="space-y-3 border-t border-slate-200 pt-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-700" />
          <h3 className="text-base font-bold text-slate-900">Post-Examination Roadmap &amp; Milestone Timeline</h3>
        </div>
        <p className="text-xs text-slate-600">
          Typical sequence of commission milestones following conclusion of the computer-based examination:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Stage 1: Day 3 to 7</span>
            <strong className="text-slate-900 block text-xs">Tentative Answer Key</strong>
            <p className="text-slate-600 text-[11px] leading-relaxed">Commission releases response sheet and provisional keys on portal.</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Stage 2: 3-5 Days Window</span>
            <strong className="text-slate-900 block text-xs">Objection Filing</strong>
            <p className="text-slate-600 text-[11px] leading-relaxed">Candidates submit challenges online with ₹100 per question fee.</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Stage 3: 4 to 6 Weeks</span>
            <strong className="text-slate-900 block text-xs">Final Key &amp; Normalization</strong>
            <p className="text-slate-600 text-[11px] leading-relaxed">Subject committee finalizes keys and multi-shift scores are normalized.</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Stage 4: Merit Release</span>
            <strong className="text-slate-900 block text-xs">Result &amp; Next Tier List</strong>
            <p className="text-slate-600 text-[11px] leading-relaxed">Roll-number-wise merit PDF and tier cut-offs published on official site.</p>
          </div>
        </div>
      </section>

      {/* 9B. Strategic Exam Day & Revision Action Plan */}
      {article.preparationTips && article.preparationTips.length > 0 && (
        <section className="space-y-3 border-t border-slate-200 pt-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900">
              Exam-Day Preparation Strategy &amp; Final Revision Drills
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            Expert guidelines curated by GovIndiaNews editorial board to maximize accuracy and minimize negative marking penalties.
          </p>
          <div className="grid grid-cols-1 gap-2.5 pt-1">
            {article.preparationTips.map((tip, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50/80 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-slate-800">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="leading-relaxed font-sans">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. What to Do If Download Fails or Particulars Are Incorrect */}
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

      {/* 11. Frequently Asked Questions */}
      {article.faqs && article.faqs.length > 0 && (
        <section className="space-y-3 border-t border-slate-200 pt-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-2">
            {article.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-3.5 text-left text-xs font-bold text-slate-900 flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-3.5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 12. Official Commission Helpdesk Contact */}
      <section className="space-y-3 border-t border-slate-200 pt-4">
        <h3 className="text-base font-bold text-slate-900">Official Helpdesk &amp; Grievance Redressal Contact</h3>
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
