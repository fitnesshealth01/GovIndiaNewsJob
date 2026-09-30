import React from 'react';
import { Shield, Lock, ArrowUp } from 'lucide-react';

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
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-sm font-bold">
                G
              </div>
              <span>GovIndiaNews</span>
            </div>
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
                <button
                  onClick={() => onNavigate('/tools/age')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Govt Exam Age Calculator (Cutoff Date)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tools/marking')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Negative Marking & Score Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tools/height')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Physical Height & Chest Standard Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tools/rank')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Expected Rank & Normalization Predictor
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Recruitment Sections with dedicated URLs */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Recruitment Alerts
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('/jobs')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Latest Govt Jobs 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/admit-card')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Admit Cards & City Slips
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/cut-off')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Official Category Cut-Off Marks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/mock-test/ssc-cgl-tier1')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Official PYQ CBT Simulator
                </button>
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
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About GovIndiaNews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact & Grievance Redressal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/fact-checking')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Fact-Checking & Gazette Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/corrections')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Corrections & Errata Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy & DART Cookies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/disclaimer')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Non-Government Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/faqs')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-medium text-blue-300"
                >
                  Candidate FAQs & Statutory Rules
                </button>
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
            <button
              onClick={() => onNavigate('/disclaimer')}
              className="hover:underline cursor-pointer"
            >
              Disclaimer
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onNavigate('/privacy')}
              className="hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>

          <button
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
