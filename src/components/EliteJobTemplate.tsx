import React from 'react';
import {
  ExternalLink,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileText,
  Calculator,
  Building2,
  Users,
  CreditCard,
  ChevronDown,
  Layers,
  Award,
} from 'lucide-react';
import { RecruitmentAlert } from '../data/gazetteData';

interface EliteJobTemplateProps {
  article: RecruitmentAlert;
  onNavigate: (path: string) => void;
}

export const EliteJobTemplate: React.FC<EliteJobTemplateProps> = ({ article, onNavigate }) => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  // Generate fallback arithmetic if specific salaryArithmetic wasn't provided
  const salary = article.salaryArithmetic || {
    basicPay: 35400,
    daRate: 0.50,
    daAmount: 17700,
    hraRate: 0.27,
    hraAmount: 9558,
    transportAllowance: 3600,
    grossMonthly: 66258,
    npsDeduction: 5310,
    otherDeductions: 650,
    totalDeductions: 5960,
    netInHandMonthly: 60298,
    inputsDated: '01 July 2026 (DoPT & Ministry of Finance DA Rates)',
    isEstimate: true,
    notes: 'Calculated for Class-X cities (Delhi, Mumbai, Bengaluru, Kolkata). Class-Y and Z cities have lower HRA (18% and 9%).',
  };

  const differences = article.whatsDifferentThisYear || [
    {
      parameter: 'Total Vacancies',
      currentCycle: `${article.postCount || 'As per notification'} posts`,
      previousCycle: 'Refer to previous annual notification',
      sourceOrVerify: article.sourceNotice?.url || '[VERIFY in official gazette]',
    },
    {
      parameter: 'Crucial Age Date',
      currentCycle: '01 August 2026',
      previousCycle: '01 August 2025',
      sourceOrVerify: 'DoPT Crucial Date Norms',
    },
    {
      parameter: 'Application Fee',
      currentCycle: article.fees || '₹100 (Exempt for SC/ST/Women)',
      previousCycle: '₹100 (Unchanged)',
      sourceOrVerify: 'Commission Application Guidelines',
    },
  ];

  const whoApply = article.whoShouldApply || [
    `Candidates with ${article.qualification} completed before the prescribed closing date.`,
    `Candidates within the age bracket of ${article.ageLimit || '18 to 30 years'} as on the crucial eligibility date.`,
    `Aspirants seeking regular central/state government employment with 7th CPC pension (NPS) and medical benefits.`,
  ];

  const whoSkip = article.whoShouldSkip || [
    'Candidates appearing in final year without final degree / result declared prior to the closing date.',
    'Candidates exceeding the maximum upper age limit after applying all admissible category relaxations.',
    'Candidates unable to produce valid category certificates (OBC-NCL / EWS) issued within the prescribed financial year.',
  ];

  const rejectionMistakes = article.commonRejectionMistakes || [
    'Submitting blurred or outdated passport photographs without prescribed plain background.',
    'Uploading signatures in capital letters (signatures must be in running handwriting).',
    'Providing an OBC-NCL certificate issued outside the valid financial year (must be valid for FY 2025-26 / 2026-27).',
    'Entering incorrect date of birth that does not match Matriculation (10th) mark sheet / certificate.',
    'Failing to verify final fee debit from the payment gateway before the fee closing deadline.',
  ];

  const documents = article.documentsNeeded || [
    'Matriculation (10th) Certificate / Mark Sheet (mandatory for Date of Birth verification).',
    'Essential Qualification Degree / Diploma provisional or original certificate.',
    'Recent passport-size colour photograph (JPEG format, 20 KB to 50 KB).',
    'Scanned signature in running handwriting (JPEG format, 10 KB to 20 KB).',
    'Valid Government Photo Identity Card (Aadhaar Card, Voter ID, PAN Card, or Passport).',
    'Category Certificate (SC / ST / OBC-NCL / EWS) in prescribed Central Government Annexure format, where applicable.',
  ];

  return (
    <div className="space-y-8 text-slate-900">
      {/* 1. FACTS SECTION (Clean Open Editorial Grid) */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-700" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Essential Recruitment Facts
            </h2>
          </div>
          <span className="text-[11px] text-slate-500">
            Source: <a href={article.sourceNotice?.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold underline">{article.sourceNotice?.title || article.organization}</a>, checked {article.sourceNotice?.checkedOn || 'recently'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-6 text-xs">
          <div>
            <span className="text-slate-500 text-[11px] uppercase font-bold tracking-wider block">Organization</span>
            <strong className="text-slate-900 text-sm block mt-0.5">{article.organization}</strong>
          </div>

          <div>
            <span className="text-slate-500 text-[11px] uppercase font-bold tracking-wider block">Examination / Post</span>
            <strong className="text-slate-900 text-sm block mt-0.5">{article.examName}</strong>
          </div>

          <div>
            <span className="text-slate-500 text-[11px] uppercase font-bold tracking-wider block">Total Vacancies</span>
            <strong className="text-slate-900 text-sm block mt-0.5">
              <a href={article.sourceNotice?.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                {article.postCount ? `${article.postCount} Posts` : 'Refer to Notice'}
              </a>
            </strong>
          </div>

          <div>
            <span className="text-slate-500 text-[11px] uppercase font-bold tracking-wider block">Last Date to Apply</span>
            <strong className="text-rose-700 text-sm block mt-0.5">{article.lastDate || 'Refer to Notice'}</strong>
          </div>

          <div>
            <span className="text-slate-500 text-[11px] uppercase font-bold tracking-wider block">Application Mode</span>
            <strong className="text-slate-900 text-sm block mt-0.5">Online (Official Portal)</strong>
          </div>

          <div>
            <span className="text-slate-500 text-[11px] uppercase font-bold tracking-wider block">Application Fee</span>
            <strong className="text-slate-900 text-sm block mt-0.5">{article.fees || 'Exempt for Reserved / Women'}</strong>
          </div>

          <div>
            <span className="text-slate-500 text-[11px] uppercase font-bold tracking-wider block">Age Limit (Crucial Date)</span>
            <strong className="text-slate-900 text-sm block mt-0.5">{article.ageLimit || '18 to 30 Years'}</strong>
          </div>

          <div>
            <span className="text-slate-500 text-[11px] uppercase font-bold tracking-wider block">Essential Qualification</span>
            <strong className="text-slate-900 text-sm block mt-0.5">{article.qualification}</strong>
          </div>
        </div>
      </section>

      {/* 2. PLAIN-LANGUAGE SUMMARY */}
      <section className="space-y-2 border-t border-slate-200 pt-4">
        <h3 className="text-base font-bold text-slate-900">Summary</h3>
        <p className="text-sm text-slate-700 leading-relaxed font-sans">
          {article.summary}
        </p>
      </section>

      {/* 3. WHAT'S DIFFERENT THIS YEAR (Retained Box for Wide Data Table) */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-700" />
          <h3 className="text-base font-bold text-slate-900">What is Different This Year</h3>
        </div>
        <p className="text-xs text-slate-600">
          Comparative changes between this recruitment notification and the previous examination cycle.
        </p>
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left divide-y divide-slate-200 text-xs min-w-[540px]">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3">Parameter</th>
                  <th className="p-3">Current Cycle</th>
                  <th className="p-3">Previous Cycle</th>
                  <th className="p-3">Source Citation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {differences.map((diff, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80">
                    <td className="p-3 font-semibold text-slate-900">{diff.parameter}</td>
                    <td className="p-3 text-slate-800">{diff.currentCycle}</td>
                    <td className="p-3 text-slate-600">{diff.previousCycle}</td>
                    <td className="p-3 text-slate-500 font-mono text-[11px]">
                      {diff.sourceOrVerify.startsWith('http') ? (
                        <a href={diff.sourceOrVerify} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                          Official Notice
                        </a>
                      ) : (
                        diff.sourceOrVerify
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 sm:hidden">← Swipe horizontally to view full table data →</p>
      </section>

      {/* 4. WHO SHOULD APPLY / WHO SHOULD SKIP (Clean Open Columns) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h4>Who Should Apply</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {whoApply.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
            <XCircle className="w-4 h-4 text-rose-600" />
            <h4>Who Should Skip</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {whoSkip.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. SELECTION PROCESS & PATTERN */}
      <section className="space-y-3 border-t border-slate-200 pt-4">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-700" />
          <h3 className="text-base font-bold text-slate-900">Selection Process & Exam Pattern</h3>
        </div>

        {article.selectionProcess && article.selectionProcess.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {article.selectionProcess.map((stage, idx) => (
              <div key={idx} className="p-3 bg-slate-50/70 border border-slate-200 rounded-lg space-y-1">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                  Stage {stage.stageNumber}
                </span>
                <strong className="text-slate-900 block">{stage.stageName}</strong>
                <p className="text-[11px] text-slate-600">{stage.description}</p>
                {stage.qualifyingNature && (
                  <span className="text-[10px] text-emerald-700 font-semibold block">{stage.qualifyingNature}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {article.examPattern && article.examPattern.length > 0 && (
          <div className="space-y-1.5">
            <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left divide-y divide-slate-200 text-xs min-w-[540px]">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-3">Section / Subject</th>
                      <th className="p-3 text-center">Questions</th>
                      <th className="p-3 text-center">Maximum Marks</th>
                      <th className="p-3">Duration & Penalty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {article.examPattern.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="p-3 font-semibold text-slate-900">{row.subject}</td>
                        <td className="p-3 text-center text-slate-800">{row.questions}</td>
                        <td className="p-3 text-center font-bold text-slate-900">{row.marks}</td>
                        <td className="p-3 text-slate-600">
                          {row.time || 'Composite 60 Mins'} {row.negativeMarking ? `· ${row.negativeMarking} Penalty` : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 sm:hidden">← Swipe horizontally to view full table data →</p>
          </div>
        )}
      </section>

      {/* 5B. VACANCY BREAKDOWN TABLE (Wide Data Table with Dedicated Scroll Box) */}
      {article.vacanciesTable && article.vacanciesTable.length > 0 && (
        <section className="space-y-3 border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Post-Wise Vacancy & Pay Matrix Breakdown</h3>
            <span className="text-xs text-slate-500 font-medium">
              Total Posts: {article.postCount || article.vacanciesTable.length}
            </span>
          </div>
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left divide-y divide-slate-200 text-xs min-w-[620px]">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">Post Designation</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Group / Classification</th>
                    <th className="p-3">7th CPC Pay Scale</th>
                    <th className="p-3 text-right">Vacancies</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {article.vacanciesTable.map((vac, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="p-3 font-semibold text-slate-900">{vac.postName}</td>
                      <td className="p-3 text-slate-700">{vac.department}</td>
                      <td className="p-3 text-slate-600">{vac.classification}</td>
                      <td className="p-3 text-slate-700 font-mono text-[11px]">{vac.payScale}</td>
                      <td className="p-3 text-right font-bold text-emerald-800">{vac.vacancy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 sm:hidden">← Swipe horizontally to view full table data →</p>
        </section>
      )}

      {/* 6. SALARY ARITHMETIC (Retained Box Container for Financial Calculations) */}
      <section className="space-y-3 border-t border-slate-200 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              7th CPC Salary Structure & In-Hand Arithmetic
            </h3>
          </div>
          {salary.isEstimate && (
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              Estimated Calculation
            </span>
          )}
        </div>

        <p className="text-xs text-slate-600">
          Transparent monthly calculation based on Central Government 7th Pay Commission pay matrix for Class-X cities (Inputs dated: {salary.inputsDated}).
        </p>

        {/* Scrollable Container for Financial Columns */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono min-w-[580px] md:min-w-0">
            {/* Earnings */}
            <div className="p-3.5 bg-slate-50/70 rounded-lg border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-emerald-800 font-sans block border-b border-slate-200 pb-1">
                Monthly Earnings (Gross)
              </span>
              <div className="flex justify-between">
                <span>Basic Pay:</span>
                <strong className="text-slate-900">₹{salary.basicPay.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between">
                <span>DA ({Math.round(salary.daRate * 100)}%):</span>
                <strong className="text-slate-900">+₹{salary.daAmount.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between">
                <span>HRA ({Math.round(salary.hraRate * 100)}%):</span>
                <strong className="text-slate-900">+₹{salary.hraAmount.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between">
                <span>Transport Allowance:</span>
                <strong className="text-slate-900">+₹{salary.transportAllowance.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-emerald-700">
                <span>Gross Total:</span>
                <span>₹{salary.grossMonthly.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Deductions */}
            <div className="p-3.5 bg-slate-50/70 rounded-lg border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-rose-800 font-sans block border-b border-slate-200 pb-1">
                Statutory Deductions
              </span>
              <div className="flex justify-between">
                <span>NPS (10% Basic+DA):</span>
                <strong className="text-slate-900">-₹{salary.npsDeduction.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between">
                <span>CGEGIS & CGHS:</span>
                <strong className="text-slate-900">-₹{(salary.otherDeductions || 650).toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-rose-700">
                <span>Total Deductions:</span>
                <span>-₹{salary.totalDeductions.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Net Result */}
            <div className="p-3.5 bg-emerald-50/50 rounded-lg border border-emerald-200 flex flex-col justify-between space-y-2">
              <div>
                <span className="text-xs font-bold text-emerald-900 font-sans block border-b border-emerald-200 pb-1">
                  Net Take-Home Salary
                </span>
                <p className="text-[11px] text-emerald-800 font-sans mt-2">
                  Estimated monthly take-home credited directly to bank account after mandatory deductions.
                </p>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-slate-500 font-sans block">Approx. Net In-Hand:</span>
                <div className="text-2xl font-black text-emerald-900 font-sans">
                  ₹{salary.netInHandMonthly.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-slate-600 font-sans ml-1">/ month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {salary.notes && (
          <p className="text-[11px] text-slate-500 italic">
            * Note: {salary.notes}
          </p>
        )}
      </section>

      {/* 7. HOW TO APPLY & PITFALLS (Clean Open Editorial Lists) */}
      <section className="space-y-4 border-t border-slate-200 pt-4">
        <h3 className="text-base font-bold text-slate-900">Application Procedure & Key Advisories</h3>

        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Step-by-Step Application Guide:</h4>
          <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700">
            {(article.howToApplySteps || [
              `Visit the official online portal at ${article.sourceNotice?.url}.`,
              'Register your primary details (Name, Father’s Name, Mobile, Email) to generate a unique Registration ID.',
              'Fill in educational marks, category status, and post preferences in the online form.',
              'Upload recent photograph and signature strictly as per prescribed dimensions.',
              'Complete online application fee payment via net banking / UPI and save the confirmation receipt.'
            ]).map((step, idx) => (
              <li key={idx} className="leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Documents Needed */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
              Documents Needed Prior to Applying:
            </span>
            <ul className="space-y-1.5 text-slate-700">
              {documents.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Mistakes */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
              Common Mistakes That Cause Rejection:
            </span>
            <ul className="space-y-1.5 text-slate-700">
              {rejectionMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. FAQS (Mandatory Step 8 with Schema) */}
      {article.faqs && article.faqs.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-700" />
            <h3 className="text-base font-bold text-stone-900">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-2">
            {article.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-stone-200 rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-3.5 text-left text-xs font-bold text-stone-900 flex items-center justify-between gap-3 hover:bg-stone-50 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-3.5 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 9. OFFICIAL LINKS (Mandatory Step 9) */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-blue-700" />
          <span>Official Links & Primary Sources</span>
        </h3>
        <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-200 bg-white text-xs">
          <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-stone-900 block">{article.sourceNotice?.title || article.organization}</span>
              <span className="text-[11px] text-stone-500 font-mono">{article.sourceNotice?.url}</span>
            </div>
            <a
              href={article.sourceNotice?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <span>Visit Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {article.officialLinks?.map((link, idx) => (
            <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-stone-900 block">{link.title}</span>
                <span className="text-[11px] text-stone-500">{link.label}</span>
              </div>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-900 font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto transition-colors"
              >
                <span>Open Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
