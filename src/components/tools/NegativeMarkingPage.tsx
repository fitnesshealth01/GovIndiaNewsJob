import React, { useState } from 'react';
import { NegativeMarkingCalculator } from '../NegativeMarkingCalculator';
import { Calculator, HelpCircle, AlertTriangle, ExternalLink, ChevronDown } from 'lucide-react';

interface NegativeMarkingPageProps {
  onNavigate: (path: string) => void;
}

export const NegativeMarkingPage: React.FC<NegativeMarkingPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How does negative marking work in SSC CGL Tier-1 exams?',
      a: 'In SSC CGL Tier-1, there are 100 questions carrying 2 marks each (maximum 200 marks). For every incorrect response, exactly 0.50 marks are deducted (a 1/4th negative marking penalty). Unattempted questions carry zero penalty.',
    },
    {
      q: 'What is the negative marking deduction ratio in Railway RRB exams?',
      a: 'Railway Recruitment Board (RRB NTPC, Group D, ALP) CBT examinations apply a 1/3rd (0.333) negative marking penalty. For every wrong answer, one-third of the mark assigned to that question is deducted from total marks.',
    },
    {
      q: 'Does blind guessing increase or decrease expected test scores under 1/4th negative marking?',
      a: 'Mathematically, in a 4-option multiple choice question with a 1/4 penalty, random blind guessing has an expected value of zero (+1.0 - 0.25 × 3 = +0.25 on average vs penalty). However, if you can eliminate even ONE incorrect option, the expected value becomes strictly positive (+0.33 per guess), making intelligent elimination statistically advantageous.',
    },
    {
      q: 'Are negative marking penalties deducted from section scores or final aggregate scores?',
      a: 'Negative marking is applied directly to section raw scores before normalization formulas (e.g. standard deviation percentile adjustments) are computed by testing agencies.',
    },
    {
      q: 'Can negative marking lead to an overall negative score in an exam?',
      a: 'Yes. If a candidate scores fewer positive marks from correct answers than the cumulative deductions from incorrect answers, the raw score in that section can be negative.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md font-semibold">
            Exam Scoring & Penalty Simulator
          </span>
          <span className="text-stone-500">
            Last reviewed: <strong className="text-stone-800">01 October 2026</strong> · Verified against SSC/RRB schemes
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Negative Marking & Net Score Calculator (1/3rd, 1/4th, 0.50 Penalty)
        </h1>

        <p className="text-sm text-stone-600 leading-relaxed max-w-3xl">
          Simulate your exact net examination score, accuracy percentage, and penalty deductions under standard 1/3, 1/4, and 0.50 negative marking schemes for SSC, RRB, UPSC Prelims, and Banking examinations.
        </p>
      </div>

      <NegativeMarkingCalculator />

      {/* 600+ Words Supporting Text */}
      <div className="space-y-6 text-stone-800 text-sm leading-relaxed">
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            The Mathematics of Negative Marking in Competitive Tests
          </h2>
          <p>
            Negative marking is employed by testing agencies to disincentivize arbitrary guessing and preserve test validity. In a multiple-choice testing environment without penalties, candidates could guess on all unattempted items without risk, inflating cut-off thresholds artificially.
          </p>
          <p>
            The general formula for net raw score calculation across Indian competitive exams is:
          </p>
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 font-mono text-xs text-stone-900 space-y-1">
            <p><strong>Net Score</strong> = (Correct Answers × Marks Per Question) - (Incorrect Answers × Penalty Factor)</p>
            <p><strong>Accuracy Rate (%)</strong> = (Correct Answers ÷ Total Attempted) × 100</p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Worked Example: SSC CGL Tier-1 (2 Marks, 0.50 Deduction)
          </h2>
          <p>
            Suppose an aspirant attempts 84 out of 100 questions in SSC CGL Tier-1, resulting in 68 correct responses and 16 incorrect answers:
          </p>
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 font-mono text-xs text-stone-900 space-y-1">
            <p>Gross Marks Earned = 68 × 2.0 = +136.00 Marks</p>
            <p>Penalty Deduction   = 16 × 0.50 = -8.00 Marks</p>
            <p>Net Final Score     = 136.00 - 8.00 = <strong>128.00 Marks (out of 200)</strong></p>
            <p>Accuracy Percentage = (68 ÷ 84) × 100 = <strong>80.95%</strong></p>
          </div>
          <p className="text-xs text-stone-500">
            If the candidate had left those 16 uncertain questions unattempted, their score would have remained a full 136.00 marks — often the deciding difference between clearing the Tier-1 cut-off or missing the merit list.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Negative Marking Schemes Across Major National Exams
          </h2>
          <div className="border border-stone-200 rounded-xl overflow-x-auto text-xs">
            <table className="w-full text-left divide-y divide-stone-200">
              <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Exam Name</th>
                  <th className="p-3">Total Qs</th>
                  <th className="p-3">Marks/Question</th>
                  <th className="p-3">Penalty Per Wrong</th>
                  <th className="p-3">Penalty Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 bg-white">
                <tr>
                  <td className="p-3 font-semibold">SSC CGL Tier-1</td>
                  <td className="p-3">100</td>
                  <td className="p-3">2.0</td>
                  <td className="p-3 text-rose-700 font-mono">-0.50</td>
                  <td className="p-3">1/4th (25%)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">RRB NTPC (CBT-1)</td>
                  <td className="p-3">100</td>
                  <td className="p-3">1.0</td>
                  <td className="p-3 text-rose-700 font-mono">-0.33</td>
                  <td className="p-3">1/3rd (33.3%)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">UPSC Civil Services Prelims (GS-1)</td>
                  <td className="p-3">100</td>
                  <td className="p-3">2.0</td>
                  <td className="p-3 text-rose-700 font-mono">-0.66</td>
                  <td className="p-3">1/3rd (33.3%)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">IBPS PO Prelims</td>
                  <td className="p-3">100</td>
                  <td className="p-3">1.0</td>
                  <td className="p-3 text-rose-700 font-mono">-0.25</td>
                  <td className="p-3">1/4th (25%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-700" />
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">
              Frequently Asked Questions (FAQs)
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-stone-200 rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left text-xs font-bold text-stone-900 flex items-center justify-between gap-3 hover:bg-stone-50 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
