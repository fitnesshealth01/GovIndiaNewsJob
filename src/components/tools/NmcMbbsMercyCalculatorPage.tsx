import React, { useState, useEffect } from 'react';
import { NmcMbbsMercyCalculator } from './NmcMbbsMercyCalculator';
import {
  GraduationCap,
  HelpCircle,
  ChevronDown,
  BookOpen,
  Clock,
  ShieldCheck,
  Building2,
  FileText,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { buildFAQPageSchema, injectSchema, buildBreadcrumbSchema } from '../../utils/seoSchema';
import { NavLink } from '../NavLink';

interface NmcMbbsMercyCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const NmcMbbsMercyCalculatorPage: React.FC<NmcMbbsMercyCalculatorPageProps> = ({
  onNavigate,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Who is eligible for the NMC one-time mercy 5th attempt for First Professional MBBS?',
      answer:
        'As per the official National Medical Commission public notice dated 15 October 2026 (pursuant to the 18th NMC meeting held on 23 September 2026), MBBS students admitted from the 2019–20 academic year onwards under CBME regulations who have exhausted all four permissible attempts are granted one additional mercy attempt, provided their admission remains valid on university rolls and has not been terminated.',
    },
    {
      question: 'Does the mercy attempt waive the 4-year limit for completing First Professional MBBS?',
      answer:
        'Yes. The NMC circular explicitly clarifies that eligible candidates may utilize this extra 5th attempt even if they have crossed the 4-year completion window stipulated under Regulation 11.1.2 of GMER-2019. However, the absolute outer limit of 10 years to complete the entire MBBS degree (including the 1-year CRMI internship) remains non-negotiable.',
    },
    {
      question: 'Are students who already availed a mercy attempt under previous court orders eligible?',
      answer:
        'No. Students who have already availed a mercy attempt and exhausted five total attempts under any previous NMC decision, High Court directive, or Supreme Court order are strictly barred from this relaxation.',
    },
    {
      question: 'Will this decision set a precedent for future medical batches?',
      answer:
        'No. The NMC circular emphasizes that this is a one-time transitional measure intended to resolve exceptional pandemic and personal disruptions for CBME cohorts. It will not establish a precedent for future batches or amend the standard 4-attempt cap retrospectively.',
    },
    {
      question: 'How do eligible MBBS students apply for the mercy attempt examination?',
      answer:
        'Students must contact their medical college academic dean, obtain verification of continuous enrollment, submit an affidavit stating no prior 5th attempt has been utilized, and register for the next supplementary or regular First Professional examination scheduled by their affiliated health science university.',
    },
  ];

  useEffect(() => {
    injectSchema([
      buildBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Candidate Tools', url: '/tools' },
        { name: 'NMC MBBS Mercy Attempt Calculator', url: '/tools/nmc-mbbs-mercy-calculator' },
      ]),
      buildFAQPageSchema(faqs),
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'NMC 1st Professional MBBS Mercy Attempt Eligibility & 10-Year Timeline Calculator',
        operatingSystem: 'Any',
        applicationCategory: 'EducationalApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Diagnostic calculator for medical students to evaluate eligibility for the one-time 5th mercy attempt granted by National Medical Commission on 15 October 2026.',
      },
    ]);
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-slate-900 font-sans">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
        <NavLink href="/" onNavigate={onNavigate} className="hover:text-blue-700 hover:underline">
          Home
        </NavLink>
        <span>/</span>
        <NavLink href="/tools" onNavigate={onNavigate} className="hover:text-blue-700 hover:underline">
          Exam Tools
        </NavLink>
        <span>/</span>
        <span className="text-slate-800 font-semibold">NMC 1st Prof MBBS Mercy Attempt Calculator</span>
      </div>

      {/* Hero Intro */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-md space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            NMC Statutory Regulation Engine
          </span>
          <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-[11px] font-semibold">
            Oct 15, 2026 Gazette Decision
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          NMC First Professional MBBS Mercy Attempt Eligibility &amp; 10-Year Timeline Calculator
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Evaluate whether you qualify for the National Medical Commission (NMC) Under-Graduate Medical Education Board one-time 5th mercy attempt to clear your First Professional MBBS Examination. Computes the non-negotiable 10-year outer course completion ceiling and outlines the mandatory university submission protocol.
        </p>
      </div>

      {/* Main Interactive Tool Container */}
      <section>
        <NmcMbbsMercyCalculator onNavigate={onNavigate} embedded={false} />
      </section>

      {/* Deep Explainer Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-800">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
            <Building2 className="w-4 h-4 text-blue-600" />
            <h3>The 4-Year Cap vs. The 10-Year Degree Rule</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Under Regulation 11.1.2 of the Graduate Medical Education Regulations (GMER-2019), students were required to clear First Professional MBBS within a maximum of 4 years from admission. The NMC public notice dated 15 October 2026 relaxes this 4-year limit as an exceptional transitional relief.
          </p>
          <p className="text-slate-600 leading-relaxed">
            <strong>Crucial Caveat:</strong> The 10-year overall limit to complete all MBBS subjects and the 1-year Compulsory Rotating Medical Internship (CRMI) remains strictly in force. For example, a 2019–20 batch student must graduate and finish CRMI by 2029.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-rose-600" />
            <h3>University Affidavit &amp; Registration Protocol</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Medical colleges and state health universities (such as RGUHS, MUHS, WBUHS, BFUHS, KNRUHS, and Dr. MGR Medical University) require candidates to submit a notarized undertaking declaring that they have not exhausted five attempts under any previous order.
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
            <span className="font-bold text-slate-900 block mb-1">Key Documents Required:</span>
            <span>1. College Admission Bonafide · 2. Marks Cards of Previous 4 Attempts · 3. Notarized Non-Exhaustion Undertaking · 4. University Examination Form</span>
          </div>
        </div>
      </div>

      {/* Read Full In-Depth Editorial Guide CTA */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm border border-blue-800">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-blue-300 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Complete Investigative Dossier</span>
          </span>
          <h4 className="text-base font-bold text-white tracking-tight">
            Read Full Editorial Guide on NMC MBBS Mercy Attempt
          </h4>
          <p className="text-xs text-blue-100 max-w-xl leading-relaxed">
            Explore the historical timeline, CBME legal background, Supreme Court judgments, and subject-wise exam strategy.
          </p>
        </div>
        <NavLink
          href="/blog/nmc-extra-attempt-first-professional-mbbs-eligibility-guide"
          onNavigate={onNavigate}
          className="px-4 py-2.5 bg-white text-blue-950 hover:bg-blue-50 font-bold rounded-xl text-xs transition-colors shrink-0 shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <span>Read Full 2,400+ Word Guide</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Frequently Asked Questions on NMC First Prof Mercy Attempt
          </h3>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-bold text-slate-900 flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
