import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Breadcrumb } from './components/Breadcrumb';
import { Footer } from './components/Footer';
import { AgeCalculator } from './components/AgeCalculator';
import { NegativeMarkingCalculator } from './components/NegativeMarkingCalculator';
import { HeightEligibilityChecker } from './components/HeightEligibilityChecker';
import { RankPredictor } from './components/RankPredictor';
import { MockTestEngine } from './components/MockTestEngine';
import { RecruitmentDirectory } from './components/RecruitmentDirectory';
import { ArticleView } from './components/ArticleView';
import { LegalPages } from './components/LegalPages';
import { FAQHub } from './components/FAQHub';
import { EligibilityMatcher } from './components/EligibilityMatcher';
import { GoogleSnippetPreview } from './components/GoogleSnippetPreview';
import { TrustHub } from './components/TrustHub';
import { SavedNotificationsModal } from './components/SavedNotificationsModal';
import { getBookmarks } from './utils/bookmarkStorage';
import {
  Calendar,
  Calculator,
  Ruler,
  TrendingUp,
  Play,
  Search,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Bell,
  Sparkles,
  X,
  ChevronRight,
  ArrowLeft,
  Bookmark,
  Filter,
} from 'lucide-react';
import { RECRUITMENT_ALERTS, RecruitmentAlert } from './data/gazetteData';

export default function App() {
  // Initialize path from window.location
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname) {
      return window.location.pathname;
    }
    return '/';
  });

  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);
  const [savedAlertIds, setSavedAlertIds] = useState<string[]>(() => getBookmarks());
  const [globalSearchTerm, setGlobalSearchTerm] = useState<string>('');
  const [calculatorSubTab, setCalculatorSubTab] = useState<'eligibility' | 'age' | 'marking' | 'height' | 'rank'>('age');

  // Sync bookmarks changes
  useEffect(() => {
    const handleBookmarkChange = (e: any) => {
      if (e.detail && Array.isArray(e.detail)) {
        setSavedAlertIds(e.detail);
      } else {
        setSavedAlertIds(getBookmarks());
      }
    };
    window.addEventListener('govindianews_bookmarks_changed', handleBookmarkChange);
    return () => window.removeEventListener('govindianews_bookmarks_changed', handleBookmarkChange);
  }, []);

  // Handle URL navigation with HTML5 History API
  const navigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Listen to popstate (browser back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync document title dynamically
  useEffect(() => {
    let title = 'GovIndiaNews - Government Jobs, Exam Utilities & Mock Tests';
    if (currentPath.startsWith('/article/')) {
      const slug = currentPath.replace('/article/', '');
      const item = RECRUITMENT_ALERTS.find((a) => a.slug === slug);
      if (item) {
        title = `${item.title} - GovIndiaNews`;
      }
    } else if (currentPath.startsWith('/mock-test')) {
      title = 'Online Exam Mock Test Simulator - GovIndiaNews';
    } else if (currentPath === '/tools/eligibility' || currentPath === '/matcher') {
      title = 'Instant Govt Job Eligibility Matcher - GovIndiaNews';
    } else if (currentPath === '/tools' || currentPath.startsWith('/tools/')) {
      title = 'Govt Exam Smart Calculators Suite - GovIndiaNews';
    } else if (currentPath === '/jobs') {
      title = 'Latest Govt Jobs 2026 Notifications - GovIndiaNews';
    } else if (currentPath === '/admit-cards') {
      title = 'Admit Cards & Exam City Intimation Slips - GovIndiaNews';
    } else if (currentPath === '/results') {
      title = 'Category Cut-Off Marks & Merit Lists - GovIndiaNews';
    } else if (currentPath === '/faqs') {
      title = 'Exam FAQs & DOP&T Guidelines - GovIndiaNews';
    } else if (currentPath === '/about') {
      title = 'About Us - GovIndiaNews';
    } else if (currentPath === '/disclaimer') {
      title = 'Non-Government Disclaimer - GovIndiaNews';
    } else if (currentPath === '/privacy') {
      title = 'Privacy Policy - GovIndiaNews';
    } else if (currentPath === '/terms') {
      title = 'Terms of Service - GovIndiaNews';
    } else if (currentPath === '/contact') {
      title = 'Contact Editorial Desk - GovIndiaNews';
    }
    document.title = title;
  }, [currentPath]);

  // Determine active article if viewing an article page
  const currentArticle = useMemo(() => {
    if (!currentPath.startsWith('/article/')) return null;
    const slug = currentPath.replace('/article/', '');
    return RECRUITMENT_ALERTS.find((a) => a.slug === slug) || null;
  }, [currentPath]);

  // Synchronize calculator sub-tab if URL is /tools/:tool
  useEffect(() => {
    if (currentPath === '/tools/eligibility' || currentPath === '/matcher') setCalculatorSubTab('eligibility');
    else if (currentPath === '/tools/age') setCalculatorSubTab('age');
    else if (currentPath === '/tools/marking') setCalculatorSubTab('marking');
    else if (currentPath === '/tools/height') setCalculatorSubTab('height');
    else if (currentPath === '/tools/rank') setCalculatorSubTab('rank');
  }, [currentPath]);

  // Filtered search results
  const searchResults = useMemo(() => {
    if (!globalSearchTerm.trim()) return [];
    const q = globalSearchTerm.toLowerCase();
    return RECRUITMENT_ALERTS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.examName.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q)
    );
  }, [globalSearchTerm]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 max-w-full overflow-x-hidden">
      {/* Breaking Marquee Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex items-center gap-1 font-bold text-blue-400 uppercase tracking-wider shrink-0 text-[10px] bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
              <Bell className="w-3 h-3 text-blue-400 animate-pulse" />
              GovIndiaNews:
            </span>
            <div className="truncate text-slate-300 text-xs">
              <button
                onClick={() => navigate('/article/upsc-civil-services-cse-2026-notification')}
                className="font-semibold text-white hover:underline cursor-pointer"
              >
                UPSC CSE 2026 (1,056 Posts) Active
              </button>{' '}
              ·{' '}
              <button
                onClick={() => navigate('/article/up-police-constable-60244-posts-notification')}
                className="font-semibold text-white hover:underline cursor-pointer"
              >
                UP Police Constable (60,244 Posts)
              </button>{' '}
              ·{' '}
              <button
                onClick={() => navigate('/article/upsc-civil-services-mains-2026-e-admit-card-download')}
                className="font-bold text-amber-300 hover:underline cursor-pointer"
              >
                [NEW] UPSC CSE Mains 2026 Admit Card Out (30 Sep)
              </button>{' '}
              ·{' '}
              <button
                onClick={() => navigate('/article/ssc-cgl-2026-tier-1-admit-card-all-regions-download')}
                className="font-bold text-amber-300 hover:underline cursor-pointer"
              >
                [NEW] SSC CGL Tier-1 Hall Ticket All Regions (30 Sep)
              </button>{' '}
              ·{' '}
              <button
                onClick={() => navigate('/article/rrb-alp-cbt-1-city-intimation-admit-card-cen-01-2026')}
                className="font-bold text-amber-300 hover:underline cursor-pointer"
              >
                [NEW] RRB ALP CBT-1 City Slip Active (30 Sep)
              </button>{' '}
              ·{' '}
              <button
                onClick={() => navigate('/article/sbi-junior-associates-clerk-recruitment-2026')}
                className="font-semibold text-white hover:underline cursor-pointer"
              >
                SBI Clerk 2026 (12,500+ Posts - Apply by 18 Nov)
              </button>{' '}
              ·{' '}
              <button
                onClick={() => navigate('/article/isro-scientist-engineer-sc-recruitment-2026')}
                className="font-semibold text-white hover:underline cursor-pointer"
              >
                ISRO Scientist SC (303 Posts - Apply by 04 Nov)
              </button>{' '}
              ·{' '}
              <button
                onClick={() => navigate('/article/rbi-grade-b-officers-recruitment-2026')}
                className="font-semibold text-white hover:underline cursor-pointer"
              >
                RBI Grade B (94 Posts - Apply by 25 Oct)
              </button>{' '}
              ·{' '}
              <button
                onClick={() => navigate('/article/drdo-rac-scientist-b-recruitment-2026-gate')}
                className="font-semibold text-white hover:underline cursor-pointer"
              >
                DRDO Scientist B (248 Posts - Apply by 15 Dec)
              </button>{' '}
              ·{' '}
              <button
                onClick={() => navigate('/article/rpf-si-constable-recruitment-2026')}
                className="font-semibold text-white hover:underline cursor-pointer"
              >
                RPF SI & Constable (4,660 Posts)
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free · Client-Side Privacy</span>
          </div>
        </div>
      </div>

      {/* Top Header Navigation */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenBookmarks={() => setIsSavedModalOpen(true)}
        savedCount={savedAlertIds.length}
      />

      {/* Universal Breadcrumb Trail on all non-home pages */}
      <Breadcrumb
        currentPath={currentPath}
        onNavigate={navigate}
        customTitle={currentArticle?.title}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ROUTE 1: ARTICLE PAGE (/article/:slug) */}
        {currentPath.startsWith('/article/') && currentArticle && (
          <ArticleView
            article={currentArticle}
            onNavigate={navigate}
            relatedArticles={RECRUITMENT_ALERTS.filter((a) => a.id !== currentArticle.id)}
          />
        )}

        {/* ROUTE 1b: ARTICLE NOT FOUND FALLBACK */}
        {currentPath.startsWith('/article/') && !currentArticle && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Article or Gazette Notice Not Found</h2>
            <p className="text-xs text-slate-500">
              The requested recruitment notice URL might have moved or been updated.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Return to GovIndiaNews Home
            </button>
          </div>
        )}

        {/* ROUTE 2: MOCK TEST SIMULATOR (/mock-test/:id or /mock-tests) */}
        {(currentPath.startsWith('/mock-test') || currentPath === '/mock-tests') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Official Previous Year Questions (PYQ) CBT Simulator
                </h1>
                <p className="text-xs text-slate-500">
                  Authentic government examination computer-based test (CBT) environment with live countdown, question palette, and verified solutions.
                </p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </button>
            </div>

            <MockTestEngine onClose={() => navigate('/')} />
          </div>
        )}

        {/* ROUTE 3: SMART TOOLS HUB (/tools, /tools/:tool) */}
        {(currentPath === '/tools' || currentPath.startsWith('/tools/')) && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Government Exam Smart Calculators Suite
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Select any exam calculator below to compute age eligibility, score penalties, physical standards, or rank estimates.
              </p>

              {/* Calculator Navigation Sub-Tabs */}
              <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => navigate('/tools/eligibility')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    calculatorSubTab === 'eligibility'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant Eligibility Matcher</span>
                </button>

                <button
                  onClick={() => navigate('/tools/age')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    calculatorSubTab === 'age'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Age Calculator (Cut-off Date)</span>
                </button>

                <button
                  onClick={() => navigate('/tools/marking')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    calculatorSubTab === 'marking'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Negative Marking & Score</span>
                </button>

                <button
                  onClick={() => navigate('/tools/height')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    calculatorSubTab === 'height'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Physical Height Checker (PST)</span>
                </button>

                <button
                  onClick={() => navigate('/tools/rank')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    calculatorSubTab === 'rank'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Rank & Normalization</span>
                </button>
              </div>
            </div>

            {calculatorSubTab === 'eligibility' && <EligibilityMatcher onNavigate={navigate} />}
            {calculatorSubTab === 'age' && <AgeCalculator />}
            {calculatorSubTab === 'marking' && <NegativeMarkingCalculator />}
            {calculatorSubTab === 'height' && <HeightEligibilityChecker />}
            {calculatorSubTab === 'rank' && <RankPredictor />}
          </div>
        )}

        {/* ROUTE 4: DIRECTORY VIEWS (/jobs, /admit-cards, /results, /answer-keys) */}
        {currentPath === '/jobs' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Latest Government Jobs 2026 Notifications
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Central and State government recruitment gazette notices, vacancy breakdowns, and application deadlines.
              </p>
            </div>
            <RecruitmentDirectory initialCategory="jobs" onNavigate={navigate} />
          </div>
        )}

        {(currentPath === '/admit-card' || currentPath === '/admit-cards') && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Admit Cards & Exam City Intimation Slips
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Direct download links and examination center city slips for upcoming Tier-1, Tier-2, and CBT tests.
              </p>
            </div>
            <RecruitmentDirectory initialCategory="admit-card" onNavigate={navigate} />
          </div>
        )}

        {(currentPath === '/cut-off' || currentPath === '/cut-offs' || currentPath === '/results' || currentPath === '/result') && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Official Category Cut-Off Marks & Merit Lists
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Authentic normalized cut-off scores across UR, OBC, EWS, SC, and ST categories verified against government result gazettes.
              </p>
            </div>
            <RecruitmentDirectory initialCategory="cut-off" onNavigate={navigate} />
          </div>
        )}

        {(currentPath === '/answer-key' || currentPath === '/answer-keys') && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Answer Keys & Candidate Response Sheets
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Provisional and final answer keys with question challenge submission windows.
              </p>
            </div>
            <RecruitmentDirectory initialCategory="answer-key" onNavigate={navigate} />
          </div>
        )}

        {/* ROUTE 5: CENTRAL FAQ KNOWLEDGE HUB */}
        {currentPath === '/faqs' && <FAQHub onNavigate={navigate} />}

        {/* ROUTE 6: LEGAL & MANDATORY E-E-A-T PAGES */}
        {currentPath === '/about' && <LegalPages type="about" onNavigate={navigate} />}
        {currentPath === '/contact' && <LegalPages type="contact" onNavigate={navigate} />}
        {currentPath === '/privacy' && <LegalPages type="privacy" onNavigate={navigate} />}
        {currentPath === '/terms' && <LegalPages type="terms" onNavigate={navigate} />}
        {currentPath === '/disclaimer' && <LegalPages type="disclaimer" onNavigate={navigate} />}
        {currentPath === '/fact-checking' && <LegalPages type="fact-checking" onNavigate={navigate} />}
        {currentPath === '/corrections' && <LegalPages type="corrections" onNavigate={navigate} />}

        {/* ROUTE 6.5: ELIGIBILITY MATCHER */}
        {(currentPath === '/tools/eligibility' || currentPath === '/matcher') && (
          <div className="space-y-6">
            <EligibilityMatcher onNavigate={navigate} />
          </div>
        )}

        {/* ROUTE 6.6: GOOGLE SNIPPET PREVIEW & SCHEMA INSPECTOR */}
        {(currentPath === '/tools/rich-snippet-preview' || currentPath === '/tools/seo') && (
          <div className="space-y-6">
            <GoogleSnippetPreview onNavigate={navigate} />
          </div>
        )}

        {/* ROUTE 6.7: E-E-A-T & GOOGLE ADSENSE TRUST HUB */}
        {(currentPath.startsWith('/trust/editorial') || currentPath === '/editorial-policy') && (
          <TrustHub initialTab="editorial" onNavigate={navigate} />
        )}
        {(currentPath.startsWith('/trust/factcheck') || currentPath.startsWith('/trust/fact-checking')) && (
          <TrustHub initialTab="factcheck" onNavigate={navigate} />
        )}
        {(currentPath.startsWith('/trust/grievance') || currentPath === '/grievance-redressal') && (
          <TrustHub initialTab="grievance" onNavigate={navigate} />
        )}
        {(currentPath.startsWith('/trust/authors') || currentPath.startsWith('/authors')) && (
          <TrustHub
            initialTab="authors"
            selectedAuthorId={
              currentPath.includes('author=')
                ? currentPath.match(/[?&]author=([^&]+)/)?.[1]
                : currentPath.startsWith('/authors/')
                ? currentPath.replace('/authors/', '').split('?')[0]
                : undefined
            }
            onNavigate={navigate}
          />
        )}

        {/* ROUTE 7: DEFAULT / HOME VIEW */}
        {(currentPath === '/' || currentPath === '/home') && (
          <div className="space-y-10">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-10 text-white shadow-md relative overflow-hidden border border-slate-800">
              <div className="max-w-3xl space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 bg-blue-900/60 border border-blue-700/60 rounded-lg px-3 py-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>GovIndiaNews: India's Trusted Recruitment & Exam Prep Hub</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Authentic Government Job Alerts, Smart Calculators & PYQ Practice
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Verified central gazette notifications, precise age relaxation calculation on cutoff dates, negative marking penalty scorecards, and live TCS iON examination simulations.
                </p>

                {/* Quick Search in Hero */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search recruitment, exam eligibility, or cut-offs..."
                      value={globalSearchTerm}
                      onChange={(e) => {
                        setGlobalSearchTerm(e.target.value);
                        if (e.target.value.trim()) {
                          setIsSearchModalOpen(true);
                        }
                      }}
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-800/90 text-white border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                    />
                  </div>

                  <button
                    onClick={() => navigate('/mock-test/ssc-cgl-tier1')}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch PYQ Test</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Quick Tools Access Cards */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Smart Exam Utilities & Calculators
                  </h2>
                  <p className="text-xs text-slate-500">
                    Accurate, in-browser tools built directly from central recruitment gazettes.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/tools')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All 5 Tools</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Highlighted Banner for Instant Eligibility Matcher */}
              <div
                onClick={() => navigate('/tools/eligibility')}
                className="mb-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 text-white border border-emerald-600/40 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Interactive Candidate Utility</span>
                      <span className="px-2 py-0.2 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black">NEW</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold">
                      Instant Government Job Eligibility Matcher
                    </h3>
                    <p className="text-xs text-slate-300 max-w-xl">
                      Select your DOB, Category reservation, and Education. We cross-reference all 15+ Central & State notifications to find your eligible exams.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0 self-start sm:self-auto group-hover:translate-x-0.5"
                >
                  <span>Check My Eligibility</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Tool 1 */}
                <div
                  onClick={() => navigate('/tools/age')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Govt Exam Age Calculator
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Check exact age in years, months, days at crucial cut-off dates with OBC/SC/ST/PwBD relaxations.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                    <span>Calculate Age</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Tool 2 */}
                <div
                  onClick={() => navigate('/tools/marking')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Negative Marking Calculator
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Calculate gross marks, negative deductions (-0.50, -0.33, -0.25), net raw score, and accuracy percentage.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span>Calculate Score</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Tool 3 */}
                <div
                  onClick={() => navigate('/tools/height')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Ruler className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Physical Height Checker
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      PST/PMT eligibility for SSC GD, Delhi Police, Army Agniveer, RPF Police, and CISF Fireman.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
                    <span>Check Height Standard</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Tool 4 */}
                <div
                  onClick={() => navigate('/tools/rank')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Rank & Normalization Predictor
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Predict tentative all-India rank brackets, shift normalization bonuses, and cut-off clearance.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-700">
                    <span>Predict Rank</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Calculator Tab Container */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Interactive Calculator Suite
                  </h2>
                  <p className="text-xs text-slate-500">
                    Switch between tools instantly or open them directly via their dedicated URLs.
                  </p>
                </div>

                {/* Sub-Tabs */}
                <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl overflow-x-auto text-xs font-semibold">
                  <button
                    onClick={() => setCalculatorSubTab('age')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      calculatorSubTab === 'age'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Age Calculator
                  </button>
                  <button
                    onClick={() => setCalculatorSubTab('marking')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      calculatorSubTab === 'marking'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Negative Marking
                  </button>
                  <button
                    onClick={() => setCalculatorSubTab('height')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      calculatorSubTab === 'height'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Height & Physical
                  </button>
                  <button
                    onClick={() => setCalculatorSubTab('rank')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      calculatorSubTab === 'rank'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Rank Predictor
                  </button>
                </div>
              </div>

              {calculatorSubTab === 'age' && <AgeCalculator />}
              {calculatorSubTab === 'marking' && <NegativeMarkingCalculator />}
              {calculatorSubTab === 'height' && <HeightEligibilityChecker />}
              {calculatorSubTab === 'rank' && <RankPredictor />}
            </section>

            {/* Recruitment Hub Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Latest Recruitment Notices & Cut-Offs
                  </h2>
                  <p className="text-xs text-slate-500">
                    Click any notice below to read the comprehensive article with tables, deadlines, and direct apply links.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/jobs')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <RecruitmentDirectory initialCategory="all" onNavigate={navigate} />
            </section>

            {/* GovIndiaNews Trust & Transparency Section */}
            <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 text-white border border-blue-800">
              <div className="max-w-3xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>The GovIndiaNews Editorial Commitment</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Transparent, Authentic & Student-First Information
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Founded by <strong className="text-white">Akash Singh Solanki</strong>, BSc Physics & COPA ITI certified developer. GovIndiaNews was created to eradicate recruitment misinformation and fake notifications. All formulas and notices are cross-verified directly against official government gazettes.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free Access
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Client-Side Privacy
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Official Gazettes Only
                  </span>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Global Quick Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[75vh]">
            <div className="p-4 border-b border-slate-200 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search SSC, RRB, Delhi Police, Calculators, Cut-offs..."
                value={globalSearchTerm}
                onChange={(e) => setGlobalSearchTerm(e.target.value)}
                className="w-full text-sm text-slate-900 focus:outline-none placeholder:text-slate-400"
              />
              <button
                onClick={() => {
                  setIsSearchModalOpen(false);
                  setGlobalSearchTerm('');
                }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3">
              {globalSearchTerm.trim() === '' ? (
                <div className="text-center py-6 text-xs text-slate-500">
                  <p>Type keywords to search across all recruitment notices, answer keys, and tools.</p>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                    <button
                      onClick={() => setGlobalSearchTerm('SSC CGL')}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs cursor-pointer"
                    >
                      SSC CGL
                    </button>
                    <button
                      onClick={() => setGlobalSearchTerm('NTPC')}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs cursor-pointer"
                    >
                      RRB NTPC
                    </button>
                    <button
                      onClick={() => setGlobalSearchTerm('Cut-Off')}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs cursor-pointer"
                    >
                      Cut-Off
                    </button>
                    <button
                      onClick={() => setGlobalSearchTerm('Police')}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs cursor-pointer"
                    >
                      Delhi Police
                    </button>
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {searchResults.length} Results Found
                  </div>
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setIsSearchModalOpen(false);
                        navigate(`/article/${item.slug}`);
                      }}
                      className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1">
                        <span className="font-semibold text-blue-700">{item.organization}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.publishDate}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.title}</h4>
                      <p className="text-[11px] text-slate-600 line-clamp-1 mt-1">{item.summary}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-500">
                  No notifications matching "{globalSearchTerm}"
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Press ESC to close</span>
              <span>GovIndiaNews Verified Search</span>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Bookmarking & Deadlines Modal */}
      <SavedNotificationsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedIds={savedAlertIds}
        onUpdateSavedIds={setSavedAlertIds}
        onNavigate={navigate}
      />

      {/* Global Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
