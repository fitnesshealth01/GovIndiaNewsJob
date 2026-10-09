import React, { useState } from 'react';
import {
  ExternalLink,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FileText,
  Clock,
  ChevronDown,
  Building2,
  GraduationCap,
  ShieldAlert,
  Info,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { RecruitmentAlert } from '../data/gazetteData';
import { NavLink } from './NavLink';

interface EliteBoardExamTemplateProps {
  article: RecruitmentAlert;
  onNavigate: (path: string) => void;
}

export const EliteBoardExamTemplate: React.FC<EliteBoardExamTemplateProps> = ({
  article,
  onNavigate,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quickFacts = article.quickFacts || [
    { detail: 'Form opens', information: '8 October 2026' },
    { detail: 'Last date (no late fee)', information: '23 October 2026 (Friday)' },
    { detail: 'Late fee window', information: '24 to 30 October 2026' },
    { detail: 'Late fee', information: '₹2,000, on top of the normal fee' },
    { detail: 'Class 10 private exams', information: 'February to March 2027' },
    { detail: 'Class 12 private exams', information: 'February to April 2027' },
    { detail: 'Separate private exam?', information: 'No, papers run alongside the main board exams' },
    { detail: 'Apply at', information: 'cbse.gov.in → Private Candidate link' },
  ];

  const whoClass10 = article.whoCanApplyClass10 || [
    'Session 2025-26 students declared Essential Repeat in the 2026 result.',
    'Students placed in Compartment in 2026 (second chance).',
    'Candidates declared Fail or Essential Repeat in any year from 2021 to 2026.',
    'Students who passed in 2026 and want Improvement of Performance in one or more subjects.',
  ];

  const whoClass12 = article.whoCanApplyClass12 || [
    'Students declared Essential Repeat in the 2026 exam.',
    'Students placed in Compartment in the 2026 main or supplementary exam. They can apply only for the subject in which they were placed in compartment, and must choose the Compartment category.',
    'Candidates declared Fail or Essential Repeat in earlier years, as listed in the notice.',
    'Students who passed in 2026 and want improvement, subject to the Board’s conditions.',
    'Passed students who want an additional subject, within two years of passing.',
  ];

  const goodToKnow = article.goodToKnow || [
    'A student with compartment in one subject can choose to re-appear in all subjects by selecting the Essential Repeat category.',
    'In Class 12, Physics, Chemistry and Biology are open only to Essential Repeat, Compartment and Improvement candidates.',
    'Study from the 2027 curriculum on cbseacademic.nic.in.',
  ];

  const feesTable = article.feesTable || [
    { item: 'Additional subject', amount: '₹320 per subject' },
    { item: 'Class 12 practical', amount: '₹160 per practical subject' },
    { item: 'Compartment / improvement / additional subject (earlier-year rate)', amount: '₹300 per subject' },
    { item: 'Late fee (24-30 Oct)', amount: '₹2,000' },
  ];

  const howToApply = article.howToApplySteps || [
    'Open cbse.gov.in and click the Private Candidate (Vyaktigat Pariksharthi) link.',
    'Select Class 10 or Class 12 and choose your correct category.',
    'Enter your previous roll number, year of passing and personal details exactly as on your marksheet.',
    'Select subjects (and practical subjects where applicable) and your exam city.',
    'Upload your photograph and signature.',
    'Pay the fee online and download the confirmation page.',
  ];

  const documents = article.documentsNeeded || [
    'Previous CBSE roll number and marksheet or admit card',
    'Recent passport-size photograph and scanned signature',
    'Valid mobile number and email ID',
    'ID proof (Aadhaar is commonly asked for)',
    'Debit card, credit card or net banking for payment',
  ];

  const mistakes = article.commonRejectionMistakes || [
    'Choosing the wrong category (for example Improvement instead of Compartment).',
    'Typing name, date of birth or parent details differently from your marksheet.',
    'Submitting more than one application. Only one is allowed per student.',
    'Assuming payment means approval. CBSE still checks your eligibility.',
    'Using agents or unofficial websites for payment.',
    'Waiting until the last day, when the portal is busiest.',
    'Picking subjects you are not eligible for, such as science subjects in the wrong category.',
  ];

  return (
    <div className="space-y-10 text-slate-900">
      {/* 1. In short Summary Lead Callout */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
          <Info className="w-4 h-4 text-blue-700 shrink-0" />
          <span>Executive Summary & Immediate Action Window</span>
        </div>
        <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
          <strong className="text-slate-950 font-bold">In short: </strong>
          CBSE opened private candidate registration for the 2027 Class 10 and 12 board exams on 8 October 2026.
          The last date without a late fee is <strong className="text-rose-700 font-bold">23 October 2026</strong>.
          Applications with a late fee of ₹2,000 are accepted from 24 to 30 October. Apply only at{' '}
          <a
            href="https://www.cbse.gov.in/newsite/private/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 font-bold underline hover:text-blue-900"
          >
            cbse.gov.in
          </a>.
        </p>
      </section>

      {/* 2. Quick facts Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-700" />
            <h2 className="text-base font-bold text-slate-900">Quick facts</h2>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">CBSE LOC Session 2026–27</span>
        </div>

        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left divide-y divide-slate-200 text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5 sm:px-4 w-1/3">Detail</th>
                  <th className="p-3.5 sm:px-4">Information</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {quickFacts.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 sm:px-4 font-semibold text-slate-900">{row.detail}</td>
                    <td className="p-3.5 sm:px-4 text-slate-800">
                      {row.information.includes('cbse.gov.in') ? (
                        <span className="inline-flex items-center gap-1.5 flex-wrap">
                          <span>{row.information}</span>
                          <a
                            href="https://www.cbse.gov.in/newsite/private/index.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:underline font-bold inline-flex items-center gap-0.5 ml-1"
                          >
                            <span>Open Portal</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </span>
                      ) : (
                        row.information
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Who can apply as a CBSE private candidate in 2027? */}
      <section className="space-y-5 border-t border-slate-200 pt-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-700" />
          <h2 className="text-lg font-bold text-slate-900">
            Who can apply as a CBSE private candidate in 2027?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Class 10 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
                Class 10
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Eligible Categories</h3>
            </div>
            <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {whoClass10.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </ol>
          </div>

          {/* Class 12 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs">
                Class 12
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Eligible Categories</h3>
            </div>
            <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {whoClass12.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </ol>
          </div>
        </div>

        {/* Good to know Callout */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Good to know</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-amber-950 leading-relaxed">
            {goodToKnow.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Fees (candidates in India) */}
      <section className="space-y-4 border-t border-slate-200 pt-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-700" />
            <h2 className="text-base font-bold text-slate-900">Fees (candidates in India)</h2>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Prescribed Official Slabs</span>
        </div>

        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left divide-y divide-slate-200 text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5 sm:px-4">Item</th>
                  <th className="p-3.5 sm:px-4 text-right">Reported amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {feesTable.map((f, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 sm:px-4 font-semibold text-slate-900">{f.item}</td>
                    <td className="p-3.5 sm:px-4 text-right font-bold text-slate-900">{f.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 border border-slate-200 rounded-lg p-3">
          Candidates from Nepal pay ₹1,100 per additional subject and those from other countries ₹2,200.
          Fees vary by category, so confirm your exact amount on the portal before paying.
        </p>
      </section>

      {/* 5. How to apply, step by step */}
      <section className="space-y-4 border-t border-slate-200 pt-6">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-700" />
          <h2 className="text-base font-bold text-slate-900">How to apply, step by step</h2>
        </div>

        <ol className="list-decimal pl-5 space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
          {howToApply.map((step, idx) => (
            <li key={idx} className="pl-1" dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-950 font-bold">$1</strong>') }} />
          ))}
        </ol>
      </section>

      {/* 6. Documents and details to keep ready */}
      <section className="space-y-4 border-t border-slate-200 pt-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <h2 className="text-base font-bold text-slate-900">Documents and details to keep ready</h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800">
          {documents.map((doc, idx) => (
            <li key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. 7 mistakes that can get your form rejected */}
      <section className="space-y-4 border-t border-slate-200 pt-6">
        <div className="flex items-center gap-2 text-rose-900 font-bold">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <h2 className="text-base font-bold text-slate-900">7 mistakes that can get your form rejected</h2>
        </div>

        <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4 sm:p-5 space-y-2.5">
          <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-rose-950 leading-relaxed">
            {mistakes.map((mistake, idx) => (
              <li key={idx} className="pl-1">
                {mistake}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. What about Class 10's two-exam system? */}
      <section className="space-y-3 border-t border-slate-200 pt-6">
        <h2 className="text-base font-bold text-slate-900">What about Class 10's two-exam system?</h2>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
          <p>
            Since 2026, Class 10 students take a mandatory Phase 1 in February and an optional improvement Phase 2 in May.
            A clear rule for how Phase 2 applies to private candidates in 2027 was not available when this article was written.
            Check the official notice before choosing your category.
          </p>
        </div>
      </section>

      {/* 9. If you are not eligible */}
      <section className="space-y-3 border-t border-slate-200 pt-6">
        <h2 className="text-base font-bold text-slate-900">If you are not eligible</h2>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
          <p>
            If your category isn't covered, regular schooling or an open schooling board such as NIOS may be options.
            Confirm admission rules with them directly.
          </p>
        </div>
      </section>

      {/* 10. Frequently asked questions */}
      {article.faqs && article.faqs.length > 0 && (
        <section className="space-y-4 border-t border-slate-200 pt-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-700" />
            <h2 className="text-base font-bold text-slate-900">Frequently asked questions</h2>
          </div>

          <div className="space-y-2.5">
            {article.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left text-xs sm:text-sm font-bold text-slate-900 flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 11. Official links */}
      <section className="space-y-3 border-t border-slate-200 pt-6">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-blue-700" />
          <span>Official links</span>
        </h2>
        <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 bg-white text-xs sm:text-sm">
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-900 block">CBSE Private Candidate Portal</span>
              <span className="text-xs text-slate-500 font-mono">cbse.gov.in/newsite/private/index.html</span>
            </div>
            <a
              href="https://www.cbse.gov.in/newsite/private/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <span>Open CBSE Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-900 block">CBSE Academic Curriculum 2027</span>
              <span className="text-xs text-slate-500 font-mono">cbseacademic.nic.in/curriculum_2027.html</span>
            </div>
            <a
              href="https://cbseacademic.nic.in/curriculum_2027.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <span>View Curriculum</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 12. Editorial Disclaimer */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500 italic leading-relaxed">
        *Disclaimer: GovIndiaNews is an independent publication and is not affiliated with CBSE or any government body.
        Details were compiled from CBSE's notice as reported by education outlets and may change. Always confirm on cbse.gov.in.*
      </section>
    </div>
  );
};
