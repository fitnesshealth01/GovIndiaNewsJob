import React from 'react';
import { Shield, Lock, ArrowUp } from 'lucide-react';
import { NavLink } from './NavLink';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <NavLink
              href="/"
              onNavigate={onNavigate}
              className="flex items-center gap-2 text-white font-bold text-lg hover:text-blue-400 transition-colors"
            >
              <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
                G
              </div>
              <span>GovIndiaNews</span>
            </NavLink>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's transparent, student-first examination preparation & recruitment utility portal. Dedicated to providing authentic, gazette-verified notifications and smart calculators.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Client-Side Privacy Guarantee</span>
            </div>
          </div>

          {/* Col 2: Smart Calculators with dedicated URLs */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Smart Exam Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <NavLink
                  href="/tools/eligibility"
                  onNavigate={onNavigate}
                  className="hover:text-emerald-400 font-semibold transition-colors cursor-pointer text-left block"
                >
                  Instant Eligibility Matcher (DOB & Category)
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/tools/salary"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  7th CPC In-Hand Salary Calculator
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/tools/photo-checker"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Photo & Signature Format Checker
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/tools/relaxation"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Fee & Category Relaxation Calculator
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/tools/age"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Govt Exam Age Calculator (Cutoff Date)
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/tools/marking"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Negative Marking & Score Calculator
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/tools/height"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Physical Height & Chest Standard Checker
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/tools/rank"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Expected Rank & Normalization Predictor
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/tools"
                  onNavigate={onNavigate}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left block font-medium"
                >
                  View All Exam Calculators →
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Col 3: Recruitment Sections & Editorial Hubs */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Recruitment & Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <NavLink
                  href="/jobs"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Latest Govt Jobs 2026
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/exams"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  15 Exam Blueprints & Syllabi
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/data/vacancies"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Multi-Year Vacancy Tracker (2020–2026)
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/guides"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Application & Certificate Guides
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/admit-card"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Admit Cards & City Slips
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/cut-off"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Official Category Cut-Off Marks
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/answer-key"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Official Answer Keys & Sheets
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/mock-test/ssc-cgl-tier1"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  CBT-Style Practice Test
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/blog"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left text-blue-300 font-semibold block"
                >
                  Knowledge Base & Schemes Hub
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/blog/army-1600-meter-running-time-agniveer-pft-standards"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Army 1600m Running Standards
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/blog/top-central-government-schemes-for-job-seekers-pmkvy-naps-employment"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Govt Schemes (PMKVY & NAPS)
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Important Pages */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Mandatory Policies & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 mb-4">
              <li>
                <NavLink
                  href="/trust/editorial"
                  onNavigate={onNavigate}
                  className="hover:text-emerald-400 font-semibold transition-colors cursor-pointer text-left block"
                >
                  Editorial Integrity & Standards
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/trust/grievance"
                  onNavigate={onNavigate}
                  className="hover:text-emerald-400 font-semibold transition-colors cursor-pointer text-left block"
                >
                  Contact & Feedback Desk
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/author/akash-singh-solanki"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Founder & Editor Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/about"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  About GovIndiaNews
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/contact"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Contact & Grievance Redressal
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/fact-checking"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Fact-Checking & Gazette Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/corrections"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Corrections & Errata Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/privacy"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Privacy Policy & DART Cookies
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/terms"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Terms of Service
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/disclaimer"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Non-Government Disclaimer
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/faqs"
                  onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left font-medium text-blue-300 block"
                >
                  Candidate FAQs & Statutory Rules
                </NavLink>
              </li>
            </ul>

            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-400 flex items-start gap-2">
              <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                GovIndiaNews is an independent educational news entity. Not affiliated with any government agency.
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© 2026 GovIndiaNews. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span>Independent Exam Prep & News Portal</span>
            <span aria-hidden="true">·</span>
            <NavLink
              href="/disclaimer"
              onNavigate={onNavigate}
              className="hover:underline cursor-pointer"
            >
              Disclaimer
            </NavLink>
            <span aria-hidden="true">·</span>
            <NavLink
              href="/privacy"
              onNavigate={onNavigate}
              className="hover:underline cursor-pointer"
            >
              Privacy Policy
            </NavLink>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
