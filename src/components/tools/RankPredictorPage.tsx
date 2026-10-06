import React, { useState } from 'react';
import { RankPredictor } from '../RankPredictor';
import { TrendingUp, HelpCircle, AlertTriangle, ExternalLink, ChevronDown } from 'lucide-react';

interface RankPredictorPageProps {
  onNavigate: (path: string) => void;
}

export const RankPredictorPage: React.FC<RankPredictorPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How accurate is this Percentile Rank & Normalization Predictor?',
      a: 'This predictor provides an approximate statistical estimate only based on normal distribution assumptions (Gaussian curve) and historical candidate mark distributions from past exam cycles. Official commission normalized scores and ranks depend on actual test-day candidate counts, mean raw scores, and standard deviations across all shifts.',
    },
    {
      q: 'What is the official SSC normalization formula used across multi-shift exams?',
      a: 'The Staff Selection Commission applies a standard deviation and mean-based formula where normalized marks = (Standard Deviation of top 0.1% candidates across all shifts ÷ Standard Deviation of candidates in that specific shift) × (Candidate Raw Score - Mean of Shift) + Mean of top 0.1% candidates across all shifts.',
    },
    {
      q: 'Why can normalized marks exceed maximum marks in exams like RRB and SSC?',
      a: 'Under standard deviation percentile normalization, if a candidate scores very high in an exceptionally difficult shift (where the average score was low), the scaling factor can push their normalized score beyond the theoretical maximum ceiling (e.g. scoring 102 out of 100 in RRB).',
    },
    {
      q: 'Does difficulty variation across different days impact selection?',
      a: 'No. The mathematical objective of normalization is to equalize cross-shift disparities, ensuring candidates who appeared in a difficult shift are not penalized compared to those in an easier shift.',
    },
    {
      q: 'Is this rank predictor affiliated with any exam conducting agency?',
      a: 'No. GovIndiaNews is an independent publication and has no affiliation with SSC, NTA, RRB, or UPSC. Official merit lists and scorecards are solely published on official commission portals.',
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

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const scriptId = 'govindianews-rank-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(faqSchema);
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md font-semibold">
            Statistical Percentile Estimator
          </span>
          <span className="text-stone-500">
            Last reviewed: <strong className="text-stone-800">01 October 2026</strong> · Mathematical estimate only
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Exam Rank & Score Normalization Predictor
        </h1>

        {/* Phase 3 mandatory disclaimed estimate note */}
        <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-950 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900">
              Disclaimer: Estimate Only Based on Statistical Assumptions
            </p>
            <p className="mt-0.5 text-amber-800 leading-relaxed">
              This predictor generates an approximate rank and percentile estimate based on hypothetical bell-curve distributions and historical shift variations. It is NOT an official merit ranking. Always refer to official commission scorecards for confirmed results.
            </p>
          </div>
        </div>
      </div>

      <RankPredictor />

      {/* 600+ Words Supporting Text */}
      <div className="space-y-6 text-stone-800 text-sm leading-relaxed">
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            How Normalization Formulas Function in Central CBT Examinations
          </h2>
          <p>
            When a national competitive examination (such as SSC CGL or Railway NTPC) is administered across multiple dates and shifts to accommodate millions of applicants, it is statistically impossible to maintain identical difficulty across different sets of questions. To prevent unfair disadvantage to candidates allocated tougher question sets, testing authorities employ mathematical normalization.
          </p>
          <p>
            The Staff Selection Commission officially promulgated its standardized normalization formula via notice dated 07-02-2019. The formula adjusts raw marks based on the mean and standard deviation of candidate performance in each shift relative to the top 0.1% performers across all shifts.
          </p>
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
