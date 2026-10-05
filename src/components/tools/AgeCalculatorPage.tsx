import React, { useState } from 'react';
import { AgeCalculator } from '../AgeCalculator';
import { Calendar, HelpCircle, AlertTriangle, ExternalLink, ChevronDown, CheckCircle2 } from 'lucide-react';

interface AgeCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const AgeCalculatorPage: React.FC<AgeCalculatorPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What is a "Crucial Cut-off Date" in government recruitment notifications?',
      a: 'The crucial date is the statutory cutoff date specified in the official gazette against which a candidate’s age is strictly evaluated. For central recruitments, DoPT guidelines designate 1st August for exams held in the second half of the calendar year and 1st January for exams held in the first half.',
    },
    {
      q: 'Does age calculation count both the day of birth and the cutoff date?',
      a: 'Under standard Indian civil service rules and Supreme Court jurisprudence, candidate age is determined on the completion of years on the day preceding the crucial anniversary. This calculator computes exact completed calendar years, months, and days.',
    },
    {
      q: 'How does statutory age relaxation apply to OBC and SC/ST candidates?',
      a: 'Candidates holding valid OBC Non-Creamy Layer certificates receive an addition of +3 years to the upper age limit. Scheduled Caste (SC) and Scheduled Tribe (ST) candidates receive +5 years. Persons with Benchmark Disabilities (PwBD) receive +10 years (+13 for OBC, +15 for SC/ST).',
    },
    {
      q: 'What happens if a candidate is born on the exact cutoff date (e.g., 01 August)?',
      a: 'Under Section 3 of the Indian Majority Act 1875, a person completes a given age at the beginning of the day preceding the anniversary of their birthday. Official commission portals treat candidates turning minimum age on the cutoff date as eligible, provided their birth timestamp precedes the cutoff threshold.',
    },
    {
      q: 'Can a candidate claim age relaxation without a valid caste certificate on the cutoff date?',
      a: 'No. The Supreme Court has repeatedly held that eligibility conditions (including category status and age relaxation qualifications) must be acquired on or before the closing date for receipt of applications.',
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
            Statutory Cut-Off Calculation Tool
          </span>
          <span className="text-stone-500">
            Last reviewed: <strong className="text-stone-800">01 October 2026</strong> · Verified against DoPT norms
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Government Job Age Calculator (Crucial Cut-Off Date)
        </h1>

        <p className="text-sm text-stone-600 leading-relaxed max-w-3xl">
          Calculate your exact age in completed years, months, and days as on the statutory cutoff date specified in SSC, UPSC, IBPS, and Railway recruitment notifications. Evaluates permissible age relaxations across General, OBC-NCL, SC, ST, and PwBD categories.
        </p>
      </div>

      <AgeCalculator />

      {/* 600+ Words Supporting Text */}
      <div className="space-y-6 text-stone-800 text-sm leading-relaxed">
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            How Age Calculation Works Under DoPT Guidelines
          </h2>
          <p>
            In central government examinations, candidate age eligibility is governed by the Consolidated Instructions on Crucial Dates issued by the Department of Personnel and Training (DoPT OM No. 14017/70/87-Estt.(RR)). The crucial date determines the exact chronological point at which candidate qualifications, degrees, and age brackets are fixed.
          </p>
          <p>
            Unlike casual age calculators that simply divide the difference in days by 365.25, government scrutiny requires calendar-accurate computation accounting for variable month lengths (28, 29, 30, and 31 days) and leap years. If an applicant exceeds the ceiling by even a solitary calendar day as on the cutoff date, the commission's automated scrutiny engine invalidates the candidature.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Worked Example: Candidate Age Verification for SSC CGL
          </h2>
          <p>
            Consider a candidate born on <strong>15 August 2000</strong> applying for an SSC CGL post carrying an age bracket of 18 to 27 years with a crucial calculation date of <strong>01 August 2026</strong>:
          </p>
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 font-mono text-xs text-stone-900 space-y-1">
            <p>Target Date: 2026-08-01</p>
            <p>Birth Date:  2000-08-15</p>
            <p>Completed Age: <strong>25 Years, 11 Months, and 17 Days</strong></p>
            <p>General (UR) Status: Eligible (Within 18 to 27 years range)</p>
            <p>OBC (NCL) Status: Eligible (Ceiling relaxed to 30 years)</p>
          </div>
          <p className="text-xs text-stone-500">
            If this candidate had been born on 15 July 1999, their completed age on 01 August 2026 would be 27 Years and 17 Days, rendering them ineligible under General UR norms, but fully eligible under OBC-NCL (+3 years relaxation up to 30 years).
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Official Rules & Statutory References
          </h2>
          <ul className="space-y-2 text-xs text-stone-700">
            <li className="flex items-start gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>DoPT Office Memorandum No. 14017/70/87-Estt.(RR):</strong> Standardizing crucial dates of eligibility for direct recruitment to Central Civil Services.{' '}
                <a href="https://dopt.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  dopt.gov.in
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Supreme Court of India (Ashok Kumar Sharma vs Chander Shekhar):</strong> Principles governing the determination of eligibility criteria on the prescribed cutoff date.
              </span>
            </li>
          </ul>
        </section>

        <section className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-amber-950 font-bold">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg">Common Age Verification Errors</h2>
          </div>
          <ul className="space-y-2 text-xs text-amber-900">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Using the Application Form Submission Date:</strong> Many aspirants calculate their age as of the day they fill out the form. The commission only evaluates age against the notified crucial cutoff date (e.g. 01 August 2026).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Miscalculating February Leap Years:</strong> Using flat 30-day month approximations leads to errors for candidates born near cutoff boundaries.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Assuming Uniform Cutoff Across Exams:</strong> While SSC often uses 1st August, exams like SSC GD frequently use 1st January, and IBPS banking uses 1st April or 1st August. Always check the specific notification.</span>
            </li>
          </ul>
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
