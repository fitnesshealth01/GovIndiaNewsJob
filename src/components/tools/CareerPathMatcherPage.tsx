import React, { useState, useEffect } from 'react';
import { CareerPathMatcher } from './CareerPathMatcher';
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
  Flame,
  Award,
} from 'lucide-react';
import { buildFAQPageSchema, injectSchema, buildBreadcrumbSchema } from '../../utils/seoSchema';
import { NavLink } from '../NavLink';

interface CareerPathMatcherPageProps {
  onNavigate: (path: string) => void;
}

export const CareerPathMatcherPage: React.FC<CareerPathMatcherPageProps> = ({
  onNavigate,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Which central government jobs can I apply for directly after 12th pass?',
      answer:
        'Candidates can appear for the National Defence Academy (NDA for Army, Navy, Air Force Officer commissions at Pay Level 10), SSC CHSL (Lower Division Clerk, Junior Secretariat Assistant, Data Entry Operator at Level 4/5), Railway RRB Assistant Loco Pilot & Commercial Clerk, Delhi Police Executive Constable, and High Court Stenographer posts.',
    },
    {
      question: 'Is it true that an NDA Lieutenant starts at over ₹1,00,000 per month at age 21?',
      answer:
        'Yes. Newly commissioned Lieutenants in the Indian Army and Flying Officers in the Air Force start at 7th CPC Pay Level 10 (Basic Pay ₹56,100). With 50% Dearness Allowance (₹28,050), Military Service Pay (MSP ₹15,500 + DA), and Flying or High Altitude field allowances, gross monthly emoluments regularly exceed ₹1,12,000 per month.',
    },
    {
      question: 'Can I complete an undergraduate college degree while working in a 12th pass government job?',
      answer:
        'Yes. Central Civil Services rules permit government servants to pursue higher education through open universities (such as IGNOU or state distance education directorates) by submitting an official NOC (No Objection Certificate) to their department head. Many candidates complete their B.A. or B.Com while earning full central government salaries and later appear for UPSC CSE or SSC CGL.',
    },
    {
      question: 'What is the main difference between UPSC Civil Services and SSC CGL?',
      answer:
        'UPSC CSE recruits for Group A All India Services (IAS, IPS, IFS, IRS) who formulate policy, govern entire administrative districts, and head departments. SSC CGL recruits for Group B executive inspectors and ministerial assistants (GST Inspector, Income Tax Inspector, Assistant Section Officer) who execute operations, carry out tax assessments, and work with predictable metro postings.',
    },
    {
      question: 'At what age should an aspirant start preparing for government competitive exams?',
      answer:
        'For defence entries like NDA, preparation should ideally begin in Class 11 (age 16). For general government jobs (SSC, Railways, State Police), starting at age 18 allows candidates to build strong quantitative aptitude, reasoning, and general awareness foundations early without unnecessary career gap years.',
    },
  ];

  useEffect(() => {
    injectSchema([
      buildBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Candidate Tools', url: '/tools' },
        { name: 'Youngster Career Path & Salary Matcher', url: '/tools/career-matcher' },
      ]),
      buildFAQPageSchema(faqs),
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Youngster Career Path, Qualification & 7th CPC Salary Matcher',
        operatingSystem: 'Any',
        applicationCategory: 'EducationalApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Interactive career matching utility for school and college youth to calculate eligible government examinations, starting 7th CPC pay levels, and in-hand salaries based on age and qualification.',
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
        <span className="text-slate-800 font-semibold">Youth Career Path &amp; Salary Matcher</span>
      </div>

      {/* Hero Intro */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-md space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Candidate Guidance Engine
          </span>
          <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-400/30 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            7th CPC Pay Scale Corroborated
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          Youngster Career Path, Qualification &amp; 7th CPC Salary Matcher
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Curious about which government career doors open at your age and education level? Select your age (15 to 32) and qualification (10th, 12th PCM/PCB/Arts, or Graduate) to reveal exact eligible exams, conducting commissions, starting 7th CPC pay levels, real monthly in-hand take-home pay, and direct preparation blueprints.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>Real-time dynamic age filter</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Statutory DoPT &amp; UPSC notification criteria</span>
          </div>
        </div>
      </div>

      {/* The Interactive Matcher Engine */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <CareerPathMatcher onNavigate={onNavigate} embedded={false} />
      </div>

      {/* Evergreen Editorial Articles Spotlight */}
      <div className="p-6 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-700" />
            <h3 className="font-extrabold text-base text-slate-900">
              Curiosity-Driven Youth Career Mega-Guides
            </h3>
          </div>
          <span className="text-xs font-bold text-blue-700">Must-Read Investigations</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          <div
            onClick={() => onNavigate('/blog/skip-college-for-central-govt-jobs-after-12th-salary-reality-check')}
            className="p-4 bg-white rounded-xl border border-blue-200 hover:border-blue-500 hover:shadow-xs transition-all cursor-pointer space-y-2 flex flex-col justify-between"
          >
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800">
                12th Pass Career Myth-Buster
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-1.5 leading-snug">
                Why 18-Year-Olds Are Skipping College for ₹52,000/Mo Central Jobs
              </h4>
              <p className="text-slate-600 mt-1 leading-relaxed">
                The 7th CPC 12th pass reality check coaching classes never tell you. Real salary slips and degree hacks.
              </p>
            </div>
            <div className="pt-2 text-blue-700 font-bold flex items-center gap-1">
              <span>Read Full Guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('/blog/nda-vs-cds-vs-afcat-ssb-selection-secrets-officer-salary-reality')}
            className="p-4 bg-white rounded-xl border border-blue-200 hover:border-blue-500 hover:shadow-xs transition-all cursor-pointer space-y-2 flex flex-col justify-between"
          >
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800">
                Armed Forces Officer Entry
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-1.5 leading-snug">
                NDA vs CDS vs AFCAT: The 5-Day SSB That Rejects 97% of Candidates
              </h4>
              <p className="text-slate-600 mt-1 leading-relaxed">
                How Lieutenants start at ₹1,12,000/month at age 21, and the psychological testing behind the doors.
              </p>
            </div>
            <div className="pt-2 text-blue-700 font-bold flex items-center gap-1">
              <span>Read Full Guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('/blog/upsc-ias-vs-ssc-cgl-inspector-brutal-salary-power-workload-reality')}
            className="p-4 bg-white rounded-xl border border-blue-200 hover:border-blue-500 hover:shadow-xs transition-all cursor-pointer space-y-2 flex flex-col justify-between"
          >
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-800">
                Power vs Work-Life Reality
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-1.5 leading-snug">
                IAS vs Income Tax Inspector: The Brutal Reality of 70-Hr Workweeks
              </h4>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Real bank balances, transfer politics, and why top graduates deliberately choose SSC CGL over UPSC.
              </p>
            </div>
            <div className="pt-2 text-blue-700 font-bold flex items-center gap-1">
              <span>Read Full Guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-base text-slate-900">
            Frequently Asked Questions on Youngster Career Pathways
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`}
                />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
