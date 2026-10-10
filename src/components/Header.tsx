import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Calculator,
  Briefcase,
  Award,
  FileCheck2,
  FileText,
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  BookOpen,
  Bookmark,
  ShieldCheck,
  TrendingUp,
  GraduationCap,
} from 'lucide-react';
import { NavLink } from './NavLink';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch?: () => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
  onOpenBookmarks?: () => void;
  savedCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  searchTerm = '',
  onSearchChange = () => {},
  onSearchSubmit = () => {},
  onOpenBookmarks,
  savedCount = 0,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'tools' | 'jobs' | null>(null);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsDrawerOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Gazette Badge */}
          <NavLink
            href="/"
            onNavigate={handleNavClick}
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-800 to-indigo-900 flex items-center justify-center text-white shadow-xs font-black text-xl tracking-tighter">
              GI
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  GovIndia<span className="text-blue-700">News</span>
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium tracking-tight -mt-0.5">
                Official Gazette & Career Intelligence
              </div>
            </div>
          </NavLink>

          {/* Center Search Bar (Desktop / Tablet) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSearchSubmit();
              }}
              className="relative w-full"
            >
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onClick={onOpenSearch ? () => onOpenSearch() : undefined}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search SSC, UPSC, Railway, Police notifications..."
                className="w-full pl-9 pr-4 py-2 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-xs text-slate-800 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-hidden cursor-pointer"
              />
            </form>
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-700">
            <NavLink
              href="/"
              onNavigate={handleNavClick}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPath === '/' ? 'text-blue-700 bg-blue-50' : 'hover:bg-slate-100'
              }`}
            >
              Home
            </NavLink>

            {/* Latest Jobs Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === 'jobs' ? null : 'jobs')
                }
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                  openDropdown === 'jobs' || currentPath.startsWith('/jobs')
                    ? 'text-blue-700 bg-blue-50'
                    : 'hover:bg-slate-100'
                }`}
              >
                <span>Recruitments</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {openDropdown === 'jobs' && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-2 text-xs z-50 animate-in fade-in slide-in-from-top-1"
                >
                  <NavLink
                    href="/jobs"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Latest Govt Jobs</span>
                      <span className="text-[11px] text-slate-500">SSC, Railway, Defence & State</span>
                    </div>
                  </NavLink>
                  <NavLink
                    href="/admit-card"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-emerald-600 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Admit Cards & City Slips</span>
                      <span className="text-[11px] text-slate-500">Download Call Letters</span>
                    </div>
                  </NavLink>
                  <NavLink
                    href="/cut-off"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-amber-600 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Cut-Off Marks</span>
                      <span className="text-[11px] text-slate-500">Official Category Cut-offs</span>
                    </div>
                  </NavLink>
                  <NavLink
                    href="/nta-exams"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4 text-purple-600 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">NTA Exams</span>
                      <span className="text-[11px] text-slate-500">UGC NET, CSIR NET, CUET</span>
                    </div>
                  </NavLink>
                  <NavLink
                    href="/board-exams"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-indigo-600 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Board Exams</span>
                      <span className="text-[11px] text-slate-500">CBSE, ICSE & State Boards</span>
                    </div>
                  </NavLink>
                  <NavLink
                    href="/answer-key"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <FileCheck2 className="w-4 h-4 text-purple-600 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Answer Keys</span>
                      <span className="text-[11px] text-slate-500">Official Response Sheets</span>
                    </div>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Exam Calculators Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === 'tools' ? null : 'tools')
                }
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                  openDropdown === 'tools' || currentPath.startsWith('/tools')
                    ? 'text-blue-700 bg-blue-50'
                    : 'hover:bg-slate-100'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-blue-600" />
                <span>Exam Calculators</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {openDropdown === 'tools' && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute left-0 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-lg p-2 text-xs z-50 animate-in fade-in slide-in-from-top-1"
                >
                  <NavLink
                    href="/tools/salary"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-md bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
                      7th
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">7th CPC Salary Calculator</span>
                      <span className="text-[11px] text-slate-500">Pay Levels 1-18, HRA & NPS Deductions</span>
                    </div>
                  </NavLink>
                  <NavLink
                    href="/tools/photo-checker"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-md bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">
                      IMG
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Photo & Signature Checker</span>
                      <span className="text-[11px] text-slate-500">SSC, UPSC, IBPS Official Dimensions</span>
                    </div>
                  </NavLink>
                  <NavLink
                    href="/tools/relaxation"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">
                      REL
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Category & Fee Relaxation</span>
                      <span className="text-[11px] text-slate-500">DoPT Rules for OBC, SC, ST, PwBD</span>
                    </div>
                  </NavLink>
                  <NavLink
                    href="/tools/age"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-md bg-cyan-100 text-cyan-800 font-bold flex items-center justify-center shrink-0">
                      Age
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Age Cut-off Calculator</span>
                      <span className="text-[11px] text-slate-500">Crucial Date Exact Calculation</span>
                    </div>
                  </NavLink>
                  <NavLink
                    href="/tools/marking"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-md bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0">
                      -M
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Negative Marking Penalty</span>
                      <span className="text-[11px] text-slate-500">Compute Net Score & Accuracy</span>
                    </div>
                  </NavLink>
                  <NavLink
                    href="/tools/height"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-md bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0">
                      PST
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Physical Height Checker</span>
                      <span className="text-[11px] text-slate-500">Police, Army & CAPF Standards</span>
                    </div>
                  </NavLink>
                  <NavLink
                    href="/tools/rank"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-md bg-purple-100 text-purple-700 font-bold flex items-center justify-center shrink-0">
                      AIR
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Rank & Normalization</span>
                      <span className="text-[11px] text-slate-500">Statistical Percentile Estimates</span>
                    </div>
                  </NavLink>
                  <NavLink
                    href="/tools/eligibility"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer border-t border-slate-100 mt-1 pt-2"
                  >
                    <div className="w-7 h-7 rounded-md bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0">
                      FIT
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Instant Eligibility Matcher</span>
                      <span className="text-[11px] text-slate-500">Multi-criteria Notification Finder</span>
                    </div>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Exam Hubs */}
            <NavLink
              href="/exams"
              onNavigate={handleNavClick}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentPath.startsWith('/exams') ? 'text-blue-700 bg-blue-50' : 'hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Exam Hubs</span>
            </NavLink>

            {/* Vacancy Data Tracker */}
            <NavLink
              href="/data/vacancies"
              onNavigate={handleNavClick}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentPath.startsWith('/data/vacancies') || currentPath === '/vacancies' ? 'text-blue-700 bg-blue-50' : 'hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              <span>Vacancies</span>
            </NavLink>

            {/* Application Guides */}
            <NavLink
              href="/guides"
              onNavigate={handleNavClick}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentPath.startsWith('/guides') ? 'text-blue-700 bg-blue-50' : 'hover:bg-slate-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Guides</span>
            </NavLink>

            {/* Evergreen Knowledge Base / Blog */}
            <NavLink
              href="/blog"
              onNavigate={handleNavClick}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentPath.startsWith('/blog') || currentPath === '/army-running-time'
                  ? 'text-blue-700 bg-blue-50'
                  : 'hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Articles</span>
            </NavLink>

            {/* Candidate FAQs Link */}
            <NavLink
              href="/faqs"
              onNavigate={handleNavClick}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentPath === '/faqs' ? 'text-blue-700 bg-blue-50' : 'hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>Exam FAQs</span>
            </NavLink>

            {/* E-E-A-T & Trust Hub Link */}
            <NavLink
              href="/trust/editorial"
              onNavigate={handleNavClick}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentPath.startsWith('/trust') ? 'text-emerald-800 bg-emerald-50 font-bold' : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Trust & Ethics</span>
            </NavLink>
          </nav>

          {/* Right Action: Universal 3-Line Menu Trigger (All Screen Sizes) */}
          <div className="flex items-center gap-2">
            {onOpenBookmarks && (
              <button
                type="button"
                onClick={onOpenBookmarks}
                aria-label="Saved Notifications"
                className="px-2.5 sm:px-3 py-2 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
              >
                <Bookmark className="w-4 h-4 text-blue-700" />
                <span className="hidden sm:inline">Saved</span>
                {savedCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px] font-black">
                    {savedCount}
                  </span>
                )}
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              className="px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
            >
              <Menu className="w-4 h-4 text-blue-700" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Universal Slide-Out Drawer Overlay (Desktop, Tablet, Mobile) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          {/* Slide-in Panel */}
          <aside className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-sm">
                  GI
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight">GovIndiaNews Menu</h3>
                  <p className="text-[11px] text-slate-400">All India Recruitment Services</p>
                </div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Drawer Search Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSearchSubmit();
                  setIsDrawerOpen(false);
                }}
                className="relative"
              >
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search exam notifications & tools..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white outline-hidden transition-all"
                />
              </form>

              {onOpenBookmarks && (
                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onOpenBookmarks();
                  }}
                  className="w-full p-2.5 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/70 text-blue-900 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-blue-700" />
                    <span>Saved Notifications & Deadlines</span>
                  </span>
                  {savedCount > 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-black">
                      {savedCount} Saved
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-normal">0 Saved</span>
                  )}
                </button>
              )}

              {/* Prominent Featured Card: CBT-Style Practice Test */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-md space-y-2.5 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    Practice Question Series
                  </span>
                  <span className="text-[10px] text-slate-400">CBT Practice Engine</span>
                </div>
                <h4 className="text-sm font-extrabold text-white">
                  CBT-Style Practice Test Simulator
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Practice CBT exam pattern questions with countdown timer, 5-state palette, negative marking penalty, and detailed solutions.
                </p>
                <NavLink
                  href="/mock-test/ssc-cgl-tier1"
                  onNavigate={handleNavClick}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Launch CBT Practice Test</span>
                  <ChevronRight className="w-4 h-4" />
                </NavLink>
              </div>

              {/* Section 1: Government Exam Calculators */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Government Exam Calculators
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <NavLink
                    href="/tools/eligibility"
                    onNavigate={handleNavClick}
                    className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 hover:border-emerald-400 text-left transition-all cursor-pointer flex items-center gap-2.5 sm:col-span-2"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      FIT
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block flex items-center gap-1.5">
                        Eligibility Matcher
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-emerald-200 text-emerald-800">NEW</span>
                      </span>
                      <span className="text-[10px] text-slate-500">Cross-reference Age, Category & Degrees</span>
                    </div>
                  </NavLink>

                  <NavLink
                    href="/tools/age"
                    onNavigate={handleNavClick}
                    className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-all cursor-pointer flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                      Age
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">Age Calculator</span>
                      <span className="text-[10px] text-slate-500">DOP&T Cutoff Rules</span>
                    </div>
                  </NavLink>

                  <NavLink
                    href="/tools/marking"
                    onNavigate={handleNavClick}
                    className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-all cursor-pointer flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0">
                      -M
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">Negative Marking</span>
                      <span className="text-[10px] text-slate-500">Score & Accuracy</span>
                    </div>
                  </NavLink>

                  <NavLink
                    href="/tools/height"
                    onNavigate={handleNavClick}
                    className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-all cursor-pointer flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0">
                      PST
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">Height & Running</span>
                      <span className="text-[10px] text-slate-500">Police & Army PMT</span>
                    </div>
                  </NavLink>

                  <NavLink
                    href="/tools/rank"
                    onNavigate={handleNavClick}
                    className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-all cursor-pointer flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0">
                      AIR
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">Rank Predictor</span>
                      <span className="text-[10px] text-slate-500">Normalization Index</span>
                    </div>
                  </NavLink>
                </div>
              </div>

              {/* Section 2: Recruitment Notifications Hub */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Recruitment Sections
                </h4>
                <div className="space-y-1 text-xs">
                  <NavLink
                    href="/jobs"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-100 text-left flex items-center justify-between text-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold">All Government Jobs 2026</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </NavLink>

                  <NavLink
                    href="/nta-exams"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-100 text-left flex items-center justify-between text-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold">NTA Exams (UGC NET, CSIR NET, CUET)</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </NavLink>

                  <NavLink
                    href="/board-exams"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-100 text-left flex items-center justify-between text-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span className="font-semibold">Board Exams 2026–27 (CBSE &amp; State)</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </NavLink>

                  <NavLink
                    href="/admit-card"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-100 text-left flex items-center justify-between text-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold">Admit Cards & City Intimations</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </NavLink>

                  <NavLink
                    href="/cut-off"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-100 text-left flex items-center justify-between text-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold">Official Category Cut-Off Marks</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </NavLink>

                  <NavLink
                    href="/answer-key"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-100 text-left flex items-center justify-between text-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileCheck2 className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold">Answer Keys & Objection Portals</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </NavLink>

                  <NavLink
                    href="/result"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-100 text-left flex items-center justify-between text-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-teal-600" />
                      <span className="font-semibold">Exam Results & Merit Lists</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </NavLink>
                </div>
              </div>

              {/* Section 2.5: Knowledge Base & Government Schemes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Knowledge Base & Schemes
                  </h4>
                  <NavLink
                    href="/blog"
                    onNavigate={handleNavClick}
                    className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    View All
                  </NavLink>
                </div>
                <div className="space-y-1 text-xs">
                  <NavLink
                    href="/blog"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg bg-indigo-50/70 hover:bg-indigo-100/70 text-left flex items-center justify-between text-indigo-950 border border-indigo-200 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-indigo-700" />
                      <div>
                        <span className="font-bold block">Evergreen Articles Hub</span>
                        <span className="text-[10px] text-indigo-700/80">Physical Tests, Schemes & Salary</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-500" />
                  </NavLink>

                  <NavLink
                    href="/blog/army-1600-meter-running-time-agniveer-pft-standards"
                    onNavigate={handleNavClick}
                    className="w-full p-2 rounded-lg hover:bg-slate-100 text-left flex items-center justify-between text-slate-700 transition-colors cursor-pointer"
                  >
                    <span className="truncate">Army 1600m Running Time & Standards</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </NavLink>

                  <NavLink
                    href="/blog/top-central-government-schemes-for-job-seekers-pmkvy-naps-employment"
                    onNavigate={handleNavClick}
                    className="w-full p-2 rounded-lg hover:bg-slate-100 text-left flex items-center justify-between text-slate-700 transition-colors cursor-pointer"
                  >
                    <span className="truncate">Top Govt Schemes (PMKVY 4.0 & NAPS)</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </NavLink>

                  <NavLink
                    href="/blog/agniveer-benefits-career-pathways-post-service"
                    onNavigate={handleNavClick}
                    className="w-full p-2 rounded-lg hover:bg-slate-100 text-left flex items-center justify-between text-slate-700 transition-colors cursor-pointer"
                  >
                    <span className="truncate">Agniveer Seva Nidhi & CAPF Reservation</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </NavLink>
                </div>
              </div>

              {/* Section 3: Candidate FAQs Hub & Direct Portals */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Help Desk & Official Portals
                </h4>
                <div className="space-y-1 text-xs">
                  <NavLink
                    href="/faqs"
                    onNavigate={handleNavClick}
                    className="w-full p-2.5 rounded-lg bg-blue-50/60 hover:bg-blue-50 text-left flex items-center justify-between text-blue-900 border border-blue-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-blue-700" />
                      <span className="font-bold">Candidate FAQs & Statutory Rules</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  </NavLink>

                  <a
                    href="https://ssc.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center justify-between transition-colors"
                  >
                    <span>Staff Selection Commission (ssc.gov.in)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <a
                    href="https://upsc.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center justify-between transition-colors"
                  >
                    <span>Union Public Service Commission (upsc.gov.in)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <a
                    href="https://rrbapply.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center justify-between transition-colors"
                  >
                    <span>Railway Recruitment Board (rrbapply.gov.in)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>

              {/* Section 4: Legal & Editorial Desk */}
              <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-2">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <NavLink
                    href="/author/akash-singh-solanki"
                    onNavigate={handleNavClick}
                    className="hover:text-blue-600 transition-colors cursor-pointer font-semibold text-slate-700"
                  >
                    Author Profile
                  </NavLink>
                  <NavLink
                    href="/about"
                    onNavigate={handleNavClick}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    About Us
                  </NavLink>
                  <NavLink
                    href="/contact"
                    onNavigate={handleNavClick}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Contact & Grievance
                  </NavLink>
                  <NavLink
                    href="/fact-checking"
                    onNavigate={handleNavClick}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Fact-Checking
                  </NavLink>
                  <NavLink
                    href="/corrections"
                    onNavigate={handleNavClick}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Corrections Log
                  </NavLink>
                  <NavLink
                    href="/disclaimer"
                    onNavigate={handleNavClick}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Disclaimer
                  </NavLink>
                  <NavLink
                    href="/privacy"
                    onNavigate={handleNavClick}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </NavLink>
                  <NavLink
                    href="/terms"
                    onNavigate={handleNavClick}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Terms
                  </NavLink>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Verified Gazette Citations · Independent Career Portal</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};
