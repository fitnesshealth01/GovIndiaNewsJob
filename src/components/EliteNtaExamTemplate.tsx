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
  Layers,
  Award,
  Users,
} from 'lucide-react';
import { RecruitmentAlert } from '../data/gazetteData';

interface EliteNtaExamTemplateProps {
  article: RecruitmentAlert;
  onNavigate?: (path: string) => void;
}

export const EliteNtaExamTemplate: React.FC<EliteNtaExamTemplateProps> = ({
  article,
  onNavigate,
}) => {
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0, 1]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <article className="space-y-8 text-slate-800 leading-relaxed font-sans">
      {/* Article Lead Header Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 rounded-2xl p-6 md:p-8 text-white shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold rounded-full flex items-center gap-1.5 uppercase tracking-wide">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-300" />
              NTA National Eligibility Test
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Application Form Live
            </span>
            <span className="text-slate-400 text-xs font-mono">
              Cycle: December 2026 Session
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
            <span>
              <strong>Last updated:</strong> 9 October 2026
            </span>
            <span>&bull;</span>
            <span>
              <strong>Conducting Body:</strong> National Testing Agency (NTA)
            </span>
            <span>&bull;</span>
            <span>
              <strong>Application Portal:</strong> ugcnet.nta.nic.in
            </span>
          </div>
        </div>
      </div>

      {/* In Short Executive Summary */}
      <div className="bg-blue-50/70 border-l-4 border-blue-600 rounded-r-xl p-5 text-sm sm:text-base text-slate-800 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-blue-900 mb-1 text-xs uppercase tracking-wider">
          <Info className="w-4 h-4 text-blue-600" />
          <span>In short</span>
        </div>
        <p className="leading-relaxed">
          The <strong>National Testing Agency (NTA)</strong> has opened the{' '}
          <strong>UGC NET December 2026 application form</strong>. Candidates can apply at{' '}
          <strong className="text-blue-700">ugcnet.nta.nic.in</strong> by{' '}
          <strong className="text-red-700">28 October 2026 (11:50 PM)</strong>. The exam will be
          held from <strong>14 to 19 December 2026</strong>. Separately, applications for the Joint
          CSIR-UGC NET are open until <strong>5 November 2026</strong>, and this cycle brings a
          major change: DBT-BET has been merged into the Life Sciences paper.
        </p>
      </div>

      {/* Key Takeaways Section */}
      {article.keyTakeaways && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Key Takeaways</h2>
              <p className="text-xs text-slate-500">Crucial highlights at a glance</p>
            </div>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">
            {article.keyTakeaways.map((takeaway, idx) => {
              const cleanText = takeaway.replace(/\*\*/g, '');
              return (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-indigo-50/40 hover:border-indigo-100 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{cleanText}</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Important Dates Table */}
      {article.importantDates && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  UGC NET December 2026: Important Dates
                </h2>
                <p className="text-xs text-slate-500">Official schedule notified by NTA</p>
              </div>
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
              Form Live
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="px-4 py-3">Event / Milestone</th>
                  <th className="px-4 py-3">Official Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {article.importantDates.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-900">{item.event}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          item.event.toLowerCase().includes('last date')
                            ? 'font-bold text-red-600'
                            : item.event.toLowerCase().includes('exam')
                            ? 'font-bold text-indigo-700'
                            : 'text-slate-800'
                        }
                      >
                        {item.date}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Application Fee Table */}
      {article.applicationFees && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Application Fee (Non-refundable, Online Only)
              </h2>
              <p className="text-xs text-slate-500">Payable via Debit / Credit Card, Net Banking or UPI</p>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-right">Fee Payable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {article.applicationFees.map((fee, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900">{fee.category}</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">{fee.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Eligibility for UGC NET December 2026 */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Eligibility for UGC NET December 2026
            </h2>
            <p className="text-xs text-slate-500">Minimum academic marks and age criteria</p>
          </div>
        </div>

        {/* Educational Qualification */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Educational Qualification</span>
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span>
                <strong>General / Unreserved / General-EWS:</strong> At least <strong>55% marks</strong>{' '}
                (without rounding off) in Master's degree or equivalent examination from universities/institutions recognized by UGC.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span>
                <strong>OBC-NCL, SC, ST, PwD/PwBD and Third Gender:</strong> At least{' '}
                <strong>50% marks</strong> in Master's degree or equivalent examination.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span>
                <strong>Final-year Master's students:</strong> Candidates who are pursuing their Master's degree or equivalent course or candidates who have appeared for their qualifying Master's degree (final year) examination and whose result is still awaited may also apply provisionally.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span>
                <strong>Four-Year Bachelor's Degree holders:</strong> Candidates with a 4-year / 8-semester bachelor's degree programme should have a minimum of <strong>75% marks in aggregate</strong> (70% for reserved categories). They are eligible for JRF and PhD admission.
              </span>
            </li>
          </ul>
        </div>

        {/* Age Limit & Relaxations */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Age Limit &amp; Relaxations</span>
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
              <span>
                <strong>Junior Research Fellowship (JRF):</strong> Not more than{' '}
                <strong>30 years as on 1 December 2026</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
              <span>
                <strong>Relaxation:</strong> A relaxation of up to <strong>5 years</strong> is provided to candidates belonging to OBC-NCL, SC, ST, PwD, Third Gender categories and to Women applicants.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
              <span>
                <strong>Assistant Professor / PhD Admission Only:</strong> There is{' '}
                <strong>no upper age limit</strong> for applying for Eligibility for Assistant Professor or PhD admission.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* JRF, Assistant Professor or PhD only: Which should you choose? */}
      {article.categoryChoiceOptions && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                JRF, Assistant Professor or PhD Only: Which Should You Choose?
              </h2>
              <p className="text-xs text-slate-500">Pick the right category while filling your form</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            You pick one category while applying, and it decides what your score can be used for. Choose carefully, because the wrong category can limit what your result is valid for.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {article.categoryChoiceOptions.map((opt, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-purple-300 hover:bg-purple-50/20 transition-all space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{opt.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{opt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Exam Pattern At A Glance */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Exam Pattern at a Glance
            </h2>
            <p className="text-xs text-slate-500">Structure of the computer-based test</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-semibold text-slate-500 uppercase">Test Mode</div>
            <div className="text-base font-extrabold text-slate-900 mt-1">CBT (Online)</div>
            <div className="text-[11px] text-slate-500">English &amp; Hindi</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-semibold text-slate-500 uppercase">Total Subjects</div>
            <div className="text-base font-extrabold text-blue-700 mt-1">87 Subjects</div>
            <div className="text-[11px] text-slate-500">Across Humanities &amp; Sciences</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-semibold text-slate-500 uppercase">Total Papers</div>
            <div className="text-base font-extrabold text-slate-900 mt-1">2 Papers (No Break)</div>
            <div className="text-[11px] text-slate-500">Paper 1 + Paper 2</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-semibold text-slate-500 uppercase">Duration</div>
            <div className="text-base font-extrabold text-emerald-700 mt-1">180 Minutes</div>
            <div className="text-[11px] text-slate-500">3 Hours Continuous</div>
          </div>
        </div>
      </section>

      {/* How to Apply, Step by Step */}
      {article.howToApplySteps && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                How to Apply, Step by Step
              </h2>
              <p className="text-xs text-slate-500">Complete online application walkthrough</p>
            </div>
          </div>

          <ol className="space-y-3">
            {article.howToApplySteps.map((step, idx) => {
              const cleanStep = step.replace(/\*\*/g, '');
              return (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="leading-relaxed pt-0.5">{cleanStep}</div>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {/* Keep Ready Before You Start */}
      {article.documentsNeeded && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Keep Ready Before You Start
              </h2>
              <p className="text-xs text-slate-500">Essential documents &amp; credentials</p>
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-sm text-slate-700">
            {article.documentsNeeded.map((doc, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Big Change: DBT-BET Merged with CSIR-UGC NET Life Sciences */}
      {article.dbtBetMergerNotes && (
        <section className="bg-amber-50/80 border border-amber-300 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold">
              Big Change This Cycle: DBT-BET Merged with CSIR-UGC NET Life Sciences
            </h2>
          </div>
          <p className="text-sm text-amber-950 leading-relaxed">
            {article.dbtBetMergerNotes}
          </p>
        </section>
      )}

      {/* Common Mistakes */}
      {article.commonRejectionMistakes && (
        <section className="bg-rose-50/70 border border-rose-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-rose-900">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <div>
              <h2 className="text-xl font-bold">Common Mistakes That Can Invalidate Your Form</h2>
              <p className="text-xs text-rose-700">Avoid these frequent registration errors</p>
            </div>
          </div>
          <ol className="space-y-2 text-sm text-rose-950">
            {article.commonRejectionMistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{mistake}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Frequently Asked Questions */}
      {article.faqs && article.faqs.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Frequently Asked Questions (FAQs)
              </h2>
              <p className="text-xs text-slate-500">Verified answers to common applicant queries</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {article.faqs.map((faq, index) => {
              const isOpen = openFaqIndices.includes(index);
              return (
                <div key={index} className="py-3.5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left font-semibold text-slate-900 hover:text-blue-600 transition-colors text-sm sm:text-base gap-4 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-2 text-sm text-slate-600 leading-relaxed pr-6 animate-in fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Official Links Box */}
      {article.officialLinks && (
        <section className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white shadow-md space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-bold">Official Application &amp; Notice Links</h2>
              <p className="text-xs text-blue-200">
                Apply exclusively on official government portals
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-white/10 rounded-full font-mono text-blue-100">
              Direct Links
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {article.officialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  link.isPrimary
                    ? 'bg-blue-600 hover:bg-blue-500 border-blue-400 text-white font-bold shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white font-semibold'
                }`}
              >
                <div>
                  <div className="text-xs opacity-90">{link.title}</div>
                  <div className="text-sm font-mono mt-0.5">{link.label}</div>
                </div>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Editorial Disclaimer */}
      {article.editorialDisclaimer && (
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-500 italic leading-relaxed">
          {article.editorialDisclaimer}
        </div>
      )}
    </article>
  );
};
