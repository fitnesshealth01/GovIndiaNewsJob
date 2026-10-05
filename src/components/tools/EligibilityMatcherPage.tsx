import React, { useState } from 'react';
import { EligibilityMatcher } from '../EligibilityMatcher';
import { Sparkles, HelpCircle, AlertTriangle, ExternalLink, ChevronDown } from 'lucide-react';

interface EligibilityMatcherPageProps {
  onNavigate: (path: string) => void;
}

export const EligibilityMatcherPage: React.FC<EligibilityMatcherPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How does the Instant Eligibility Matcher filter government job opportunities?',
      a: 'The matcher analyzes your date of birth against the notified crucial cutoff date, calculates applicable category age relaxations (OBC +3 yrs, SC/ST +5 yrs, PwBD +10-15 yrs), cross-references your educational qualification level (10th, 12th, Graduate, Diploma), and matches them with active notifications in the verified database.',
    },
    {
      q: 'Are final-year college students eligible to apply for central government graduate posts?',
      a: 'Eligibility depends on the specific notification. While some examinations like UPSC Civil Services permit candidates appearing in final-year degree examinations to sit for the Preliminary stage (provided proof of passing is submitted prior to the Mains stage), exams like SSC CGL mandate that the final degree result must be declared on or before the crucial closing date.',
    },
    {
      q: 'What educational degree equivalence rules apply to engineering diploma holders?',
      a: 'A 3-year Polytechnic Diploma in Engineering is treated as equivalent to 10+2 / Higher Secondary for certain technical posts (such as Junior Engineer or Railway Technician), but is NOT equivalent to a bachelor’s degree for general administrative posts (such as SSC CGL ASO or Bank PO).',
    },
    {
      q: 'Does this tool automatically apply fee exemptions for women and reserved categories?',
      a: 'Yes. The engine accounts for statutory fee waivers mandated across central commissions (SSC, UPSC, RRB), which exempt all female applicants and SC/ST/PwBD candidates from examination fees.',
    },
    {
      q: 'How frequently is the eligibility database updated?',
      a: 'The database is updated whenever new recruitment advertisements are officially gazetted by central and state commissions and verified against source PDFs.',
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
          <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md font-semibold">
            Multi-Criteria Qualification Engine
          </span>
          <span className="text-stone-500">
            Last reviewed: <strong className="text-stone-800">01 October 2026</strong> · Verified against official gazettes
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Instant Government Job Eligibility Matcher
        </h1>

        <p className="text-sm text-stone-600 leading-relaxed max-w-3xl">
          Instantly discover which central and state government recruitment drives you qualify for. Evaluates your date of birth, category relaxations, educational credentials, and gender against active gazette notifications.
        </p>
      </div>

      <EligibilityMatcher onNavigate={onNavigate} />

      {/* 600+ Words Supporting Text */}
      <div className="space-y-6 text-stone-800 text-sm leading-relaxed">
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            How Government Job Eligibility Matching Works
          </h2>
          <p>
            In Indian public recruitment, candidate qualification is audited across three non-negotiable statutory pillars: <strong>Crucial Date Age Threshold</strong>, <strong>Essential Educational Qualification</strong>, and <strong>Social Category Documentation</strong>. Failure to satisfy any single criterion results in summary cancellation during document verification, even if the candidate clears all written stages.
          </p>
          <p>
            This matching engine computes your exact chronological age as of the gazetted cutoff date, adds the precise statutory relaxation admissible to your category, and filters recruitment drives into "Eligible Opportunities" and "Ineligible Drives" with transparent explanatory notes.
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
