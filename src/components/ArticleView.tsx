import React, { useState } from 'react';
import { RecruitmentAlert } from '../data/gazetteData';
import { AgeCalculator } from './AgeCalculator';
import { HeightEligibilityChecker } from './HeightEligibilityChecker';
import { NegativeMarkingCalculator } from './NegativeMarkingCalculator';
import {
  Calendar,
  Building2,
  FileText,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Users,
  Briefcase,
  Share2,
  User,
  Award,
  ChevronDown,
  Layers,
  Banknote,
  BookOpen,
  HelpCircle,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Printer,
  Download,
  AlertCircle,
  MapPin,
  RotateCcw,
  Check,
  Zap,
  Search,
  Sliders,
} from 'lucide-react';
import { isBookmarked, toggleBookmark, calculateDeadlineCountdown } from '../utils/bookmarkStorage';
import { CandidateDiscussion } from './CandidateDiscussion';
import {
  buildJobPostingSchema,
  buildNewsArticleSchema,
  buildBreadcrumbSchema,
  buildFAQPageSchema,
  buildEventSchema,
  injectSchema,
} from '../utils/seoSchema';
import { getAuthorByAlertId } from '../data/authorData';
import { AuthorDossierModal } from './AuthorDossierModal';
import { CalendarSyncButton } from './CalendarSyncButton';
import { PhotoSignatureResizerModal } from './PhotoSignatureResizerModal';
import { ExamDayChecklist } from './ExamDayChecklist';
import { PostPreferenceMatrix } from './PostPreferenceMatrix';
import { ShiftFeedbackBriefing } from './ShiftFeedbackBriefing';
import { SocialAlertBanner } from './SocialAlertBanner';

interface ArticleViewProps {
  article: RecruitmentAlert;
  onNavigate: (path: string) => void;
  relatedArticles: RecruitmentAlert[];
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onNavigate,
  relatedArticles,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isSaved, setIsSaved] = useState<boolean>(() => isBookmarked(article.id));
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const author = getAuthorByAlertId(article.id);

  // In-Article Eligibility Matcher State
  const [matcherDob, setMatcherDob] = useState('2000-01-01');
  const [matcherCategory, setMatcherCategory] = useState<'gen' | 'obc' | 'sc' | 'st' | 'pwbd'>('gen');
  const [matcherEdu, setMatcherEdu] = useState<'10th' | '12th' | 'graduate' | 'diploma-engg'>('graduate');
  const [matcherResult, setMatcherResult] = useState<{
    eligible: boolean;
    calculatedAge: string;
    headline: string;
    details: string[];
  } | null>(null);

  // Admit Card Panic Redressal Tab
  const [activeTroubleTab, setActiveTroubleTab] = useState<'forgot' | 'photo' | 'center'>('forgot');
  // Expandable Glossary Tag
  const [activeGlossary, setActiveGlossary] = useState<string | null>(null);
  // Visitor Tools Modal States
  const [isResizerOpen, setIsResizerOpen] = useState(false);

  React.useEffect(() => {
    const schemas: Record<string, unknown>[] = [
      article.category === 'jobs' ? buildJobPostingSchema(article) : buildNewsArticleSchema(article),
      buildBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: getCategoryLabel(article.category), url: `/?tab=${article.category}` },
        { name: article.title, url: `/article/${article.slug}` },
      ]),
    ];

    if (article.faqs && article.faqs.length > 0) {
      schemas.push(buildFAQPageSchema(article.faqs));
    }

    if (article.category === 'admit-card' || article.examDate) {
      schemas.push(buildEventSchema(article));
    }

    injectSchema(schemas);
  }, [article]);

  const handleToggleSave = () => {
    const res = toggleBookmark(article.id);
    setIsSaved(res.bookmarked);
  };

  const countdown = calculateDeadlineCountdown(article.lastDate);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'jobs':
        return 'Latest Jobs';
      case 'admit-card':
        return 'Admit Cards';
      case 'answer-key':
        return 'Answer Keys';
      case 'cut-off':
        return 'Cut-Off Marks';
      case 'result':
        return 'Results';
      default:
        return 'Recruitment';
    }
  };

  const handleCheckInArticleEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matcherDob) return;

    const birthDate = new Date(matcherDob);
    const cutoffDate = new Date('2026-08-01');
    let ageYears = cutoffDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = cutoffDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && cutoffDate.getDate() < birthDate.getDate())) {
      ageYears--;
    }

    const minAge = article.minAge || 18;
    const baseMaxAge = article.maxAge || 30;

    let relaxation = 0;
    if (matcherCategory === 'obc') relaxation = 3;
    else if (matcherCategory === 'sc' || matcherCategory === 'st') relaxation = 5;
    else if (matcherCategory === 'pwbd') relaxation = 10;

    const allowedMaxAge = baseMaxAge + relaxation;
    const isAgeEligible = ageYears >= minAge && ageYears <= allowedMaxAge;

    let isEduEligible = true;
    const req = article.qualificationTier || 'graduate';
    if (req === 'graduate' && (matcherEdu === '10th' || matcherEdu === '12th')) {
      isEduEligible = false;
    } else if (req === 'diploma-engg' && (matcherEdu === '10th' || matcherEdu === '12th')) {
      isEduEligible = false;
    } else if (req === '12th' && matcherEdu === '10th') {
      isEduEligible = false;
    }

    const isFullyEligible = isAgeEligible && isEduEligible;

    setMatcherResult({
      eligible: isFullyEligible,
      calculatedAge: `${ageYears} Years as on 01-08-2026`,
      headline: isFullyEligible
        ? `Eligibility Confirmed! You meet both the age standard (${ageYears} yrs) and educational requirements for this recruitment drive.`
        : `Eligibility Discrepancy: Candidate age or qualification does not align with the advertised gazette requirements.`,
      details: [
        `Prescribed Age Bracket for ${matcherCategory.toUpperCase()}: ${minAge} to ${allowedMaxAge} Years (${relaxation > 0 ? `Includes +${relaxation} yrs statutory relaxation` : 'Standard General / UR'}). Your age: ${ageYears} Years.`,
        `Prescribed Qualification: ${article.qualification}. Your input: ${matcherEdu.toUpperCase()}.`,
        `Source Notice: ${article.sourceNotice?.title || article.organization} (checked on ${article.sourceNotice?.checkedOn || 'recently'})`,
      ],
    });
  };

  const primarySchema =
    article.category === 'jobs'
      ? buildJobPostingSchema(article)
      : buildNewsArticleSchema(article);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: getCategoryLabel(article.category), url: `/?tab=${article.category}` },
    { name: article.title, url: `/article/${article.slug}` },
  ]);

  const articleFaqSchema =
    article.faqs && article.faqs.length > 0
      ? buildFAQPageSchema(article.faqs)
      : null;

  const eventSchema =
    article.category === 'admit-card' || article.examDate
      ? buildEventSchema(article)
      : null;

  return (
    <div className="space-y-8 max-w-full overflow-x-hidden">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(primarySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {articleFaqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleFaqSchema) }}
        />
      )}
      {/* Quarantine Status Banner */}
      {article.status === 'unverified' && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-xs text-amber-950 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm text-amber-950">
              Notice Re-verification in Progress
            </p>
            <p className="text-xs text-amber-800 mt-0.5">
              This page is being re-verified against the official notice. All figures, schedules, eligibility requirements, and fees are subject to direct confirmation from official notifications.
            </p>
          </div>
        </div>
      )}

      {article.status === 'expired' && (
        <div className="bg-slate-100 border-l-4 border-slate-500 p-4 rounded-r-xl shadow-xs text-slate-800 flex items-start gap-3">
          <Clock className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm text-slate-900">
              Archived Notice / Expired Recruitment
            </p>
            <p className="text-xs text-slate-600 mt-0.5">
              This recruitment drive has expired. The application window or examination schedule has passed.
            </p>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Comprehensive High-Value Editorial (8 cols) */}
        <article className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-8 space-y-8 overflow-hidden">
          {/* Article Header & E-E-A-T Author Lockup */}
          <div className="space-y-4 border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1">
                <span>Recruitment Notice Summary</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleSave}
                  className={`px-3 py-1 text-xs rounded-md border transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSaved
                      ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 fill-blue-700" /> : <Bookmark className="w-3.5 h-3.5" />}
                  <span>{isSaved ? 'Saved' : 'Save Notice'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>

            <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {article.title}
            </h1>

            {/* Official Source Notice Header */}
            <div className="flex items-center gap-2 flex-wrap text-xs bg-slate-100 border border-slate-200 text-slate-800 px-3.5 py-2 rounded-xl">
              <span className="font-semibold text-slate-700">Source:</span>
              <a
                href={article.sourceNotice?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline font-medium inline-flex items-center gap-1 truncate max-w-sm"
              >
                {article.sourceNotice?.title || article.organization}
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500 text-[11px]">
                checked {article.sourceNotice?.checkedOn || 'recently'}
              </span>
              <button
                type="button"
                onClick={() => onNavigate('/trust/editorial')}
                className="ml-auto text-[11px] text-slate-700 font-semibold hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Editorial Policy</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Author & Editorial Lockup */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${author.avatarBg} text-white font-serif font-bold flex items-center justify-center text-sm shadow-xs border ${author.avatarBorder} shrink-0`}
                >
                  {author.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setShowAuthorModal(true)}
                      className="font-bold text-stone-900 hover:text-blue-700 hover:underline cursor-pointer text-left"
                    >
                      {author.name}
                    </button>
                  </div>
                  <div className="text-[11px] text-stone-600 mt-0.5">
                    <span>{author.designation}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAuthorModal(true)}
                  className="px-2.5 py-1 text-[11px] font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Author Profile →
                </button>
                <div className="hidden sm:block text-right text-[11px] text-stone-500 border-l border-stone-200 pl-3">
                  {article.verifiedBy === 'human' && (
                    <div>Audited: <span className="font-medium text-stone-700">{article.reviewedDate}</span></div>
                  )}
                  <div>Read Time: <span className="font-medium text-stone-700">{article.readTime}</span></div>
                </div>
              </div>
            </div>

            {/* Deadline Countdown Banner */}
            {article.lastDate && (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-700 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900">Application Window Closes: </span>
                    <strong className="text-blue-800 font-semibold">{article.lastDate}</strong>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-md font-bold text-xs shrink-0 ${
                    countdown.urgency === 'urgent'
                      ? 'bg-rose-100 text-rose-700 animate-pulse'
                      : countdown.urgency === 'moderate'
                      ? 'bg-amber-100 text-amber-800'
                      : countdown.urgency === 'expired'
                      ? 'bg-slate-200 text-slate-600'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {countdown.label}
                </span>
              </div>
            )}

            {/* Quick Action CTAs */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href={article.officialLinks?.[0]?.url || 'https://ssc.gov.in'}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Apply Online Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {article.calculatorToolType && (
                <button
                  onClick={() => onNavigate(`/tools/${article.calculatorToolType}`)}
                  className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Check Eligibility Calculator</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={() => onNavigate('/mock-test/ssc-cgl-tier1')}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Practice Official PYQ CBT</span>
              </button>

              <CalendarSyncButton
                title={article.title}
                deadlineDate={article.lastDate}
                examDate={article.examDate}
                organization={article.organization}
                officialLink={article.officialLinks?.[0]?.url}
              />

              <button
                type="button"
                onClick={() => setIsResizerOpen(true)}
                className="px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Resize and compress photo & signature to exact commission specs"
              >
                <Sliders className="w-3.5 h-3.5 text-blue-600" />
                <span>Photo/Sign Compressor</span>
              </button>


              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Print clean 1-page gazette summary"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Print 1-Page Summary</span>
              </button>
            </div>
          </div>

          {/* Source Notice & Summary */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="font-semibold text-slate-900 flex items-center gap-2 flex-wrap">
              <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                Source Notice:{' '}
                <a
                  href={article.sourceNotice?.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline font-medium inline-flex items-center gap-1"
                >
                  {article.sourceNotice?.title || article.organization}
                  <ExternalLink className="w-3 h-3 inline" />
                </a>
                <span className="text-slate-500 font-normal"> (checked on {article.sourceNotice?.checkedOn || 'recently'})</span>
              </span>
            </div>
            <p className="leading-relaxed text-slate-600">{article.summary}</p>
          </div>

          {/* Key Notification Highlights Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-slate-50 border border-blue-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-blue-200/70 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-blue-600 text-white shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-extrabold text-blue-950 uppercase tracking-wide">
                  Key Notification Highlights
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-blue-100/90 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Last Date to Apply
                </span>
                <strong className="text-sm font-bold text-rose-700 block">
                  {article.lastDate || 'Refer to Gazette'}
                </strong>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Fee payment and final submission window closes strictly on the official commission portal.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-blue-100/90 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Total Vacancies & Major Posts
                </span>
                <strong className="text-sm font-bold text-blue-900 block">
                  {article.postCount ? `${article.postCount} Vacancies` : `${article.vacanciesTable?.length || 1}+ Major Cadres`}
                </strong>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Central civil, railway, banking, or defence vacancies allocated across departments.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-blue-100/90 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Age Limits & Crucial Date
                </span>
                <strong className="text-sm font-bold text-slate-900 block">
                  {article.ageLimit || `${article.minAge || 18} to ${article.maxAge || 30} Years`}
                </strong>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Statutory relaxations: +3 yrs for OBC, +5 yrs for SC/ST, and +10 to +15 yrs for PwBD.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-blue-100/90 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Minimum Qualification
                </span>
                <strong className="text-xs font-bold text-slate-900 line-clamp-1 block">
                  {article.qualification}
                </strong>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Aspirants must possess essential marksheet or degree on or before crucial closing date.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-blue-100/90 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Starting In-Hand Salary
                </span>
                <strong className="text-sm font-bold text-emerald-700 block">
                  {article.salaryStructure?.inHandMonthly || '₹32,000 – ₹74,000/mo'}
                </strong>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Under 7th Central Pay Commission with 50% DA, HRA, Transport Allowance, post NPS deduction.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-blue-100/90 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Negative Marking Penalty
                </span>
                <strong className="text-sm font-bold text-amber-700 block">
                  {article.examPattern?.[0]?.negativeMarking || '0.25 to 0.33 Mark / Wrong Ans'}
                </strong>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Deducted for incorrect responses in CBT; no penalty marks for unattempted questions.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Recruitment Stage Roadmap Diagram */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Recruitment Process Milestone Pipeline</span>
              </h3>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                Live Status Tracker
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-1 text-center">
              {[
                { stage: '1. Gazette', desc: 'Advt Issued', active: true, done: true },
                { stage: '2. Apply Online', desc: 'Window Active', active: article.category === 'jobs', done: article.category !== 'jobs' },
                { stage: '3. Admit Card', desc: 'Hall Ticket Out', active: article.category === 'admit-card', done: article.category === 'answer-key' || article.category === 'result' || article.category === 'cut-off' },
                { stage: '4. CBT Exam', desc: 'Screening Test', active: article.category === 'admit-card', done: article.category === 'answer-key' || article.category === 'result' || article.category === 'cut-off' },
                { stage: '5. Answer Key', desc: 'Objections & Score', active: article.category === 'answer-key', done: article.category === 'result' || article.category === 'cut-off' },
                { stage: '6. Result & DV', desc: 'Final Merit List', active: article.category === 'result' || article.category === 'cut-off', done: false },
              ].map((step, sidx) => (
                <div
                  key={sidx}
                  className={`p-2.5 rounded-xl border transition-all text-xs ${
                    step.active
                      ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-2xs font-bold ring-2 ring-blue-500/20'
                      : step.done
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <div className="font-extrabold text-[11px] truncate">{step.stage}</div>
                  <div className="text-[10px] mt-0.5 font-medium">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 1: Important Dates Table */}
          {article.importantDates && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Important Dates & Schedule</span>
                </h2>
                <span className="sm:hidden text-[10px] text-slate-400">← Swipe table →</span>
              </div>
              <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs min-w-[340px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Events & Notification Stages</th>
                      <th className="p-3 text-right">Dates / Deadlines</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {article.importantDates.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="p-3 font-medium text-slate-800">{item.event}</td>
                        <td className="p-3 text-right font-semibold text-blue-700 tabular-nums">
                          {item.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 2: Application Fee Table */}
          {article.applicationFees && (
            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span>Application Fee & Category Relaxations</span>
              </h2>
              <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs min-w-[340px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Candidate Category</th>
                      <th className="p-3 text-right">Application Fee Required</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {article.applicationFees.map((fee, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="p-3 font-medium text-slate-800">{fee.category}</td>
                        <td className="p-3 text-right font-bold text-slate-900 tabular-nums">
                          {fee.fee}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 3: Vacancy & Eligibility Matrix Table */}
          {article.vacanciesTable && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Vacancy Details & Post-Wise Eligibility</span>
                </h2>
                <span className="sm:hidden text-[10px] text-slate-400">← Swipe table →</span>
              </div>
              <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs min-w-[620px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Post Name & Department</th>
                      <th className="p-3">Group & Pay Scale</th>
                      <th className="p-3 text-center">Vacancies</th>
                      <th className="p-3">Minimum Qualification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {article.vacanciesTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{row.postName}</div>
                          <div className="text-[11px] text-slate-500">{row.department}</div>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-slate-800 block">{row.classification}</span>
                          <span className="text-[11px] text-blue-700">{row.payScale}</span>
                        </td>
                        <td className="p-3 text-center font-bold text-emerald-700 tabular-nums">
                          {row.vacancy}
                        </td>
                        <td className="p-3 text-slate-600 text-[11px] leading-relaxed max-w-[200px]">
                          {row.eligibility}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}


          {/* Section 4: Post-Wise Salary Structure & In-Hand Pay Slip */}
          {article.salaryStructure && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Banknote className="w-4 h-4 text-emerald-600" />
                <span>Salary Structure & In-Hand Monthly Pay Slip</span>
              </h2>
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Pay Matrix Level</span>
                    <strong className="text-slate-900 font-bold">{article.salaryStructure.payLevel}</strong>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Basic Pay</span>
                    <strong className="text-blue-700 font-bold">{article.salaryStructure.basicPay}</strong>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Gross Monthly Pay</span>
                    <strong className="text-slate-900 font-bold">{article.salaryStructure.grossMonthly}</strong>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">In-Hand Salary</span>
                    <strong className="text-emerald-700 font-bold">{article.salaryStructure.inHandMonthly}</strong>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 mb-1.5">Allowances & Allowable Benefits:</h4>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    {article.salaryStructure.benefits.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Selection Process Stages */}
          {article.selectionProcess && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Multi-Stage Selection Process</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {article.selectionProcess.map((stg, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-700 uppercase tracking-wider text-[11px]">
                        {stg.stageNumber}
                      </span>
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {stg.qualifyingNature}
                      </span>
                    </div>
                    <div className="font-bold text-slate-900">{stg.stageName}</div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{stg.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 6: Exam Pattern & Syllabus */}
          {article.examPattern && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Exam Pattern & Marking Scheme</span>
                </h2>
                <span className="sm:hidden text-[10px] text-slate-400">← Swipe table →</span>
              </div>
              <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Subject / Section</th>
                      <th className="p-3 text-center">Questions</th>
                      <th className="p-3 text-center">Marks</th>
                      <th className="p-3">Negative Marking</th>
                      <th className="p-3 text-right">Time Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {article.examPattern.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="p-3 font-semibold text-slate-900">{row.subject}</td>
                        <td className="p-3 text-center tabular-nums">{row.questions}</td>
                        <td className="p-3 text-center font-bold text-blue-700 tabular-nums">{row.marks}</td>
                        <td className="p-3 text-rose-700 text-[11px]">{row.negativeMarking}</td>
                        <td className="p-3 text-right text-slate-600 text-[11px]">{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 7: If Cut-off marks list is present */}
          {article.cutOffs && (
            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Official Normalized Cut-Off Marks</span>
              </h2>
              <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs min-w-[340px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Category</th>
                      <th className="p-3">Normalized Cut-Off</th>
                      <th className="p-3 text-right">Qualified Aspirants</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {article.cutOffs.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="p-3 font-semibold text-slate-900">{row.category}</td>
                        <td className="p-3 font-bold text-blue-700 tabular-nums">{row.cutOffMarks}</td>
                        <td className="p-3 text-right text-slate-600 tabular-nums">
                          {row.qualifiedCandidates?.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 7.5: Topic-Wise Detailed Syllabus Breakdown */}
          {article.syllabusTopics && article.syllabusTopics.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Topic-Wise Detailed Examination Syllabus</span>
              </h2>
              <div className="space-y-3">
                {article.syllabusTopics.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-900">{item.subject}</h3>
                      {item.weightage && (
                        <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                          {item.weightage}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.topics.map((t, tidx) => (
                        <span
                          key={tidx}
                          className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] text-slate-700 font-medium shadow-2xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 7.6: Previous Year Cut-Off Score Trends Visualizer */}
          {article.cutOffTrends && article.cutOffTrends.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Previous Examination Cut-Off Score Trends & Benchmarks</span>
              </h2>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-4">
                <p className="text-xs text-slate-500">
                  Category-wise qualifying and final selection cut-offs across recent examination cycles:
                </p>
                <div className="space-y-3">
                  {article.cutOffTrends.map((trend, tidx) => (
                    <div key={tidx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>{trend.year}</span>
                        <span className="text-blue-700">Max Marks: {trend.totalMarks}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
                        <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-center">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">UR / Gen</span>
                          <strong className="text-blue-800 font-extrabold text-xs">{trend.general}</strong>
                        </div>
                        <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-center">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">OBC-NCL</span>
                          <strong className="text-indigo-800 font-extrabold text-xs">{trend.obc}</strong>
                        </div>
                        <div className="p-2 rounded-lg bg-sky-50 border border-sky-100 text-center">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">EWS</span>
                          <strong className="text-sky-800 font-extrabold text-xs">{trend.ews}</strong>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-center">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">SC</span>
                          <strong className="text-slate-800 font-extrabold text-xs">{trend.sc}</strong>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-center">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">ST</span>
                          <strong className="text-slate-800 font-extrabold text-xs">{trend.st}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Post-Preference, Career Growth & Transfer Liability Matrix */}
          {article.category === 'jobs' && (
            <PostPreferenceMatrix />
          )}

          {/* Admit Card & Exam Day Super-Module (Shift Timetable, Credential Recovery, Regional Servers) */}
          {(article.category === 'admit-card' || article.examDate) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Exam Shift Timings & Strict Gate Closure Timetable</span>
                </h2>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Zero-Tolerance Gate Rule
                </span>
              </div>

              {/* Shift Timetable */}
              <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-2xs bg-white">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Examination Shift</th>
                      <th className="p-3">Shift Test Duration</th>
                      <th className="p-3 text-blue-700">Reporting Time</th>
                      <th className="p-3 text-rose-700">Strict Gate Closure Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[11px]">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-slate-900">Shift 1 (Morning)</td>
                      <td className="p-3 text-slate-700">09:00 AM – 10:00 AM</td>
                      <td className="p-3 font-semibold text-blue-800">07:45 AM</td>
                      <td className="p-3 font-bold text-rose-700">08:30 AM Sharp (No entry after)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-slate-900">Shift 2 (Noon)</td>
                      <td className="p-3 text-slate-700">11:45 AM – 12:45 PM</td>
                      <td className="p-3 font-semibold text-blue-800">10:30 AM</td>
                      <td className="p-3 font-bold text-rose-700">11:15 AM Sharp (No entry after)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-slate-900">Shift 3 (Afternoon)</td>
                      <td className="p-3 text-slate-700">02:30 PM – 03:30 PM</td>
                      <td className="p-3 font-semibold text-blue-800">01:15 PM</td>
                      <td className="p-3 font-bold text-rose-700">02:00 PM Sharp (No entry after)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-slate-900">Shift 4 (Evening)</td>
                      <td className="p-3 text-slate-700">05:15 PM – 06:15 PM</td>
                      <td className="p-3 font-semibold text-blue-800">04:00 PM</td>
                      <td className="p-3 font-bold text-rose-700">04:45 PM Sharp (No entry after)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Credential Recovery & Discrepancy Redressal Cell */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Candidate Credential Recovery & Discrepancy Redressal Cell</span>
                  </h3>
                  <div className="flex gap-1 text-[10px] font-semibold flex-wrap">
                    <button
                      type="button"
                      onClick={() => setActiveTroubleTab('forgot')}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        activeTroubleTab === 'forgot'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Forgot Roll No / ID
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTroubleTab('photo')}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        activeTroubleTab === 'photo'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Missing Photo / Sign
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTroubleTab('center')}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        activeTroubleTab === 'center'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Center Discrepancy
                    </button>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  {activeTroubleTab === 'forgot' && (
                    <div className="space-y-1.5">
                      <strong className="text-slate-900 block font-bold">
                        How to Retrieve Lost Registration ID or Roll Number:
                      </strong>
                      <p>
                        1. Navigate to the official commission sub-portal and click on <strong>"Know Your Registration ID"</strong> or <strong>"Forgot Roll Number"</strong>.
                      </p>
                      <p>
                        2. Enter your <strong>Candidate Full Name</strong> (as spelled in 10th Matriculation certificate), <strong>Father’s Name</strong>, and <strong>Date of Birth</strong>.
                      </p>
                      <p>
                        3. Search your registered Email inbox and SMS for the keyword <em>"Registration"</em> or <em>"Admit Card"</em> from the official government sender code.
                      </p>
                    </div>
                  )}

                  {activeTroubleTab === 'photo' && (
                    <div className="space-y-1.5">
                      <strong className="text-slate-900 block font-bold">
                        What to Do If Photograph or Signature is Missing / Blank on Admit Card:
                      </strong>
                      <p>
                        As per official gazette instructions, candidates whose photograph or signature is missing or inverted must carry <strong>two identical recent passport photographs</strong> attested by a Gazetted Officer along with original photo ID proof (Aadhaar/PAN Card) to the test center.
                      </p>
                      <p>
                        The Center Superintendent will affix one photo on the Commission copy of the admission certificate and counter-sign an undertaking form allowing entry without penalty.
                      </p>
                    </div>
                  )}

                  {activeTroubleTab === 'center' && (
                    <div className="space-y-1.5">
                      <strong className="text-slate-900 block font-bold">
                        Name Spelling Mistake, Category Mismatch, or Center Discrepancy:
                      </strong>
                      <p>
                        If your admit card displays an incorrect category (e.g. UR instead of OBC) or misspelled surname, immediately send an emergency email to the Commission Regional Director along with your application acknowledgement slip and 10th marksheet.
                      </p>
                      <p>
                        Carry the email grievance acknowledgment to the exam center. You will be permitted to sit for the examination, and category corrections will be scrutinized during Document Verification (DV).
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-200 mt-2">
                  <span className="text-[11px] text-slate-600 font-medium">
                    Have a missing photo/sign or name discrepancy on your hall ticket?
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsUndertakingOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs self-start sm:self-auto"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Print Emergency Undertaking Form</span>
                  </button>
                </div>
              </div>

              {/* Direct Regional Mirror Portals */}
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/80 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block">
                  Direct Regional Server Mirror Links (Bypass High-Traffic Server Down):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <a
                    href="https://sscnr.nic.in"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white border border-blue-200 hover:border-blue-400 font-medium text-blue-700 flex items-center justify-between"
                  >
                    <span>Northern Region (NR - Delhi)</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                  <a
                    href="https://www.ssc-cr.org"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white border border-blue-200 hover:border-blue-400 font-medium text-blue-700 flex items-center justify-between"
                  >
                    <span>Central Region (CR - UP/Bihar)</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                  <a
                    href="https://www.sscwr.net"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white border border-blue-200 hover:border-blue-400 font-medium text-blue-700 flex items-center justify-between"
                  >
                    <span>Western Region (WR - Mumbai)</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                  <a
                    href="https://www.sscer.org"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white border border-blue-200 hover:border-blue-400 font-medium text-blue-700 flex items-center justify-between"
                  >
                    <span>Eastern Region (ER - Kolkata)</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                  <a
                    href="https://www.sscsr.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white border border-blue-200 hover:border-blue-400 font-medium text-blue-700 flex items-center justify-between"
                  >
                    <span>Southern Region (SR - Chennai)</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                  <a
                    href="https://ssckkr.kar.nic.in"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white border border-blue-200 hover:border-blue-400 font-medium text-blue-700 flex items-center justify-between"
                  >
                    <span>KKR Region (Bengaluru)</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              </div>

              {/* Exam Day Permitted vs. Barred Items & Strict Dress Code Matrix */}
              <ExamDayChecklist examName={article.examName} />


              {/* Live Shift Feedback, Difficulty Analysis & Good Attempts Benchmark */}
              <ShiftFeedbackBriefing examName={article.examName} />
            </div>
          )}

          {/* In-Article Tailored Instant Eligibility Matcher */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 text-white border border-blue-800 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-md bg-blue-500 text-white shadow-2xs">
                  <Zap className="w-4 h-4 fill-current" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Instant Post Eligibility Matcher (Post-Specific Verification)
                  </h3>
                  <p className="text-[11px] text-blue-200">
                    Verify whether your Date of Birth & Qualification match this exact gazette notification.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-700 self-start sm:self-auto">
                100% Client-Side Private
              </span>
            </div>

            <form onSubmit={handleCheckInArticleEligibility} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-[11px] text-blue-200 mb-1 font-medium">Your Date of Birth:</label>
                <input
                  type="date"
                  value={matcherDob}
                  onChange={(e) => setMatcherDob(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800/90 text-white rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-blue-200 mb-1 font-medium">Candidate Category:</label>
                <select
                  value={matcherCategory}
                  onChange={(e) => setMatcherCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-800/90 text-white rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                >
                  <option value="gen">General / Unreserved (UR)</option>
                  <option value="obc">OBC (Non-Creamy Layer, +3 yrs)</option>
                  <option value="sc">SC (Scheduled Caste, +5 yrs)</option>
                  <option value="st">ST (Scheduled Tribe, +5 yrs)</option>
                  <option value="pwbd">PwBD (Benchmark Disability, +10 yrs)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-blue-200 mb-1 font-medium">Highest Qualification:</label>
                <select
                  value={matcherEdu}
                  onChange={(e) => setMatcherEdu(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-800/90 text-white rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                >
                  <option value="graduate">Bachelor’s / Graduate Degree</option>
                  <option value="diploma-engg">Engineering / Polytechnic Diploma</option>
                  <option value="12th">12th Intermediate Pass</option>
                  <option value="10th">10th Matriculation Pass</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs text-xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Verify My Eligibility</span>
                </button>
              </div>
            </form>

            {matcherResult && (
              <div
                className={`p-4 rounded-xl border text-xs space-y-2 ${
                  matcherResult.eligible
                    ? 'bg-emerald-950/70 border-emerald-600/80 text-emerald-100'
                    : 'bg-rose-950/70 border-rose-600/80 text-rose-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  {matcherResult.eligible ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                  <span className="font-bold text-sm">{matcherResult.headline}</span>
                </div>
                <div className="text-[11px] opacity-90 pl-6 space-y-1">
                  {matcherResult.details.map((d, didx) => (
                    <div key={didx}>• {d}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Statutory Terms Glossary & Long-Tail Keyword Search Index */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Statutory Terms Glossary & Candidate Search Query Index</span>
              </h2>
              <span className="text-[10px] text-slate-500">Click any term to expand definition</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
              {[
                {
                  id: 'otr',
                  term: 'One-Time Registration (OTR)',
                  def: 'A permanent digital profile on commission portals storing verified 10th certificates, eliminating repetitive bio-data entry across all future recruitments.',
                },
                {
                  id: 'normalization',
                  term: 'Normalization Formula',
                  def: 'A statistical percentile-based formula adjusting variations in exam difficulty across multiple shifts to ensure fair merit ranking.',
                },
                {
                  id: 'crucial-date',
                  term: 'Crucial Date of Eligibility',
                  def: 'The legal cutoff date specified in the official gazette against which candidate age, degrees, and category validity are verified.',
                },
                {
                  id: 'obc-ncl',
                  term: 'OBC Non-Creamy Layer (NCL)',
                  def: 'Certificate issued to candidates whose parental annual income is below ₹8 Lakhs from non-agricultural sources for the preceding 3 financial years.',
                },
                {
                  id: 'rpwd',
                  term: 'Benchmark Disability (RPwD)',
                  def: 'A certified disability of not less than 40% under the RPwD Act 2016, entitling candidates to 10-15 years age relaxation and scribe facilities.',
                },
                {
                  id: 'bipartite',
                  term: '12th Bipartite Wage Scale',
                  def: 'The latest wage revision agreement granting starting basic pay enhancements, special allowances, and 5-day banking framework across public banks.',
                },
              ].map((item) => {
                const isExpanded = activeGlossary === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveGlossary(isExpanded ? null : item.id)}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all cursor-pointer space-y-1 shadow-2xs"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 text-[11px]">
                      <span>{item.term}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                          isExpanded ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </div>
                    {isExpanded && (
                      <p className="text-[11px] text-slate-600 pt-1 leading-relaxed border-t border-slate-100 mt-1">
                        {item.def}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 8: Step-by-Step How to Apply */}
          {article.howToApplySteps && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Step-by-Step Online Registration & Application Guide</span>
              </h2>
              <div className="space-y-3">
                {article.howToApplySteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-3 text-xs leading-relaxed"
                  >
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700">{step}</span>
                  </div>
                ))}

                {/* Photo & Signature Compressor Utility Banner */}
                <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-lg bg-blue-600 text-white shadow-2xs">
                      <Sliders className="w-4 h-4" />
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-bold">Document Upload Compliance Tool:</strong>
                      <span className="text-slate-600 text-[11px]">Resize your photo to 20–50 KB and signature to 10–20 KB before opening portal.</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsResizerOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap self-start sm:self-auto"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Launch Photo/Sign Resizer</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Section 9: Official Links Table */}
          {article.officialLinks && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <span>Official Government Portal Links</span>
              </h2>
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs divide-y divide-slate-200">
                {article.officialLinks.map((link, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{link.title}</span>
                      <span className="text-[11px] text-slate-500">Official Server Link</span>
                    </div>

                    {link.linkType === 'tool' ? (
                      <button
                        onClick={() => onNavigate(link.url)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto ${
                          link.isPrimary
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-2xs'
                            : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 10: Frequently Asked Questions (FAQs) Accordion */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Frequently Asked Questions (FAQs)</span>
              </h2>
              <div className="space-y-2">
                {article.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 text-left font-bold text-xs text-slate-900 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                            isOpen ? 'rotate-180 text-blue-600' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 10: Age Limit & Category-Wise Statutory Age Relaxation Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Age Limit & Statutory Category-Wise Relaxations</span>
              </h2>
              <span className="sm:hidden text-[10px] text-slate-400">← Swipe table →</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                <div>
                  <span className="text-slate-500 font-medium block">Prescribed Age Limits:</span>
                  <strong className="text-slate-900 font-bold text-sm">
                    {article.ageLimit || `${article.minAge || 18} to ${article.maxAge || 30} Years`}
                  </strong>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-slate-500 font-medium block">Crucial Calculation Cut-off Date:</span>
                  <span className="font-semibold text-blue-700">As specified in official gazette advertisement</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-x-auto bg-white shadow-2xs">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Candidate Category</th>
                      <th className="p-2.5 text-center">Permissible Age Relaxation</th>
                      <th className="p-2.5">Statutory Authority & Certification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[11px]">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-2.5 font-medium text-slate-800">SC / ST (Scheduled Castes / Tribes)</td>
                      <td className="p-2.5 text-center font-bold text-blue-700">+5 Years</td>
                      <td className="p-2.5 text-slate-600">Central Government prescribed caste certificate</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-2.5 font-medium text-slate-800">OBC (Non-Creamy Layer)</td>
                      <td className="p-2.5 text-center font-bold text-blue-700">+3 Years</td>
                      <td className="p-2.5 text-slate-600">OBC-NCL certificate issued within valid financial year</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-2.5 font-medium text-slate-800">PwBD (Unreserved / EWS Benchmark Disability)</td>
                      <td className="p-2.5 text-center font-bold text-blue-700">+10 Years</td>
                      <td className="p-2.5 text-slate-600">Minimum 40% benchmark disability under RPwD Act 2016</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-2.5 font-medium text-slate-800">PwBD + OBC (Non-Creamy Layer)</td>
                      <td className="p-2.5 text-center font-bold text-blue-700">+13 Years</td>
                      <td className="p-2.5 text-slate-600">Combined PwBD and valid OBC-NCL certificates</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-2.5 font-medium text-slate-800">PwBD + SC / ST</td>
                      <td className="p-2.5 text-center font-bold text-blue-700">+15 Years</td>
                      <td className="p-2.5 text-slate-600">Combined PwBD and SC/ST certificates</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-2.5 font-medium text-slate-800">Ex-Servicemen (ESM / Armed Forces)</td>
                      <td className="p-2.5 text-center font-bold text-blue-700">Military Service + 3 Years</td>
                      <td className="p-2.5 text-slate-600">Discharge Book and PPO from Defence Headquarters</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-2.5 font-medium text-slate-800">Central Government Civilian Employees (Group C)</td>
                      <td className="p-2.5 text-center font-bold text-blue-700">Up to 40 Years (45 for SC/ST)</td>
                      <td className="p-2.5 text-slate-600">3 Years continuous regular service & NOC from HoD</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 11: Mandatory Required Documents & Upload Specifications */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Mandatory Documents & Upload Specifications Checklist</span>
            </h2>
            <div className="border border-slate-200 rounded-xl overflow-x-auto bg-white shadow-2xs">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Required Document</th>
                    <th className="p-3">Prescribed Format & File Size</th>
                    <th className="p-3">Statutory Verification Standards</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px]">
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-3 font-semibold text-slate-900">Recent Passport-Size Photograph</td>
                    <td className="p-3 font-mono text-slate-700">JPEG / JPG (20 KB – 50 KB, 3.5cm x 4.5cm)</td>
                    <td className="p-3 text-slate-600">Clear white or light background taken within 3 months; without cap, mask or spectacles</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-3 font-semibold text-slate-900">Candidate Digital Signature</td>
                    <td className="p-3 font-mono text-slate-700">JPEG / JPG (10 KB – 20 KB, 4.0cm x 2.0cm)</td>
                    <td className="p-3 text-slate-600">Signed with black/blue ink on white paper; capital block letters strictly prohibited</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-3 font-semibold text-slate-900">10th / Matriculation Certificate & Marksheet</td>
                    <td className="p-3 font-mono text-slate-700">PDF / JPEG (50 KB – 200 KB)</td>
                    <td className="p-3 text-slate-600">Sole legal statutory proof of Candidate Full Name, Parents' Names, and Date of Birth</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-3 font-semibold text-slate-900">Essential Degree / Diploma Certificate</td>
                    <td className="p-3 font-mono text-slate-700">PDF (50 KB – 300 KB)</td>
                    <td className="p-3 text-slate-600">All semester mark sheets and degree certificate verifying qualification before deadline</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-3 font-semibold text-slate-900">Caste / EWS / Disability Certificate</td>
                    <td className="p-3 font-mono text-slate-700">PDF (50 KB – 300 KB)</td>
                    <td className="p-3 text-slate-600">Issued by Competent Revenue Authority (Tehsildar/SDM/DM) in Central Government format</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-3 font-semibold text-slate-900">Original Government Photo Identity Proof</td>
                    <td className="p-3 font-mono text-slate-700">Original Card Compulsory at Venue</td>
                    <td className="p-3 text-slate-600">Original Aadhaar Card with clear DOB, Voter ID, PAN Card, Passport, or Driving License</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 12: Step-by-Step Admit Card / Scorecard Download Protocol */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                {article.category === 'admit-card'
                  ? 'Official e-Admit Card Download Protocol & Examination Day Instructions'
                  : article.category === 'result' || article.category === 'cut-off'
                  ? 'Official Scorecard & Merit List PDF Download Protocol'
                  : article.category === 'answer-key'
                  ? 'Answer Key Objection Window & Score Calculation Protocol'
                  : 'Official Admit Card & Examination Center Entry Protocols'}
              </span>
            </h2>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3">
              <ol className="list-decimal list-inside space-y-2 text-slate-700 leading-relaxed">
                <li>
                  <strong>Access the Official Server:</strong> Navigate to the designated official portal ({article.officialLinks?.[0]?.url || 'commission portal'}) and locate the active admission certificate or candidate login link.
                </li>
                <li>
                  <strong>Enter Verification Credentials:</strong> Input your 10-digit Registration Number (or Roll Number) and Date of Birth in (DD-MM-YYYY) format, followed by the security captcha text.
                </li>
                <li>
                  <strong>Audit Personal & Center Details:</strong> Verify your Name, Assigned Test Venue, Shift Schedule, Reporting Time, and Gate Closure Timing.
                </li>
                <li>
                  <strong>Print Multi-Copy Documentation:</strong> Download the PDF and take at least 2 clear printouts on clean A4 paper along with the attached self-declaration slip.
                </li>
              </ol>

              {/* Exam Hall Code of Conduct Box */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1.5 mt-2">
                <span className="font-bold block text-[11px] uppercase tracking-wide">
                  Crucial Examination Center Guidelines & Prohibited Items:
                </span>
                <p className="text-[11px] leading-relaxed">
                  <strong>Compulsory Items to Carry:</strong> Printed copy of e-Admit Card, 1 Original Government Photo ID (Aadhaar Card with complete DOB, Voter ID, or PAN Card), 2 recent passport-size photographs matching the application form, and a transparent blue/black ballpoint pen.
                </p>
                <p className="text-[11px] leading-relaxed">
                  <strong>Strictly Prohibited Items:</strong> Mobile phones, smart watches, Bluetooth headphones, electronic calculators, pen drives, metallic jewelry, wallets, and bags. Exam venues do not provide custody counters.
                </p>
                <p className="text-[11px] leading-relaxed">
                  <strong>Biometric Verification & Timings:</strong> Aadhaar-based biometric attendance, digital fingerprinting, and live web camera facial recognition are mandatory at the gate. Candidates must arrive at least 60 minutes before the exam start; gates strictly close 15 minutes prior to test commencement.
                </p>
              </div>
            </div>
          </div>

          {/* Section 13: Embedded Smart Calculator Widget (Rendered Strictly After All Article Content) */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Integrated Exam Utility Widget
              </h3>
              <span className="text-xs text-blue-600 font-semibold">
                100% Client-Side Verification
              </span>
            </div>

            {article.calculatorToolType === 'height' ? (
              <HeightEligibilityChecker />
            ) : article.category === 'answer-key' ? (
              <NegativeMarkingCalculator />
            ) : (
              <AgeCalculator />
            )}
          </div>

          {/* Section 12: Editorial Accountability & Author Dossier Card */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Statutory Authorship & Fact-Audit Verification</span>
              </div>
              <span className="text-[11px] font-mono text-stone-500">Ref: {author.registrationNumber}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl ${author.avatarBg} text-white font-serif font-bold text-xl flex items-center justify-center shrink-0 border ${author.avatarBorder} shadow-xs`}
              >
                {author.initials}
              </div>
              <div className="space-y-1.5 flex-1 min-w-0 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-serif font-bold text-base text-stone-900">
                    {author.name}
                  </h4>
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {author.verificationBadge}
                  </span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  {author.executiveSummary}
                </p>
                <div className="flex items-center gap-2 text-stone-500 text-[11px] flex-wrap">
                  <span className="font-medium text-stone-800">{author.accreditationBadge}</span>
                  <span>·</span>
                  <span>Alumni: {author.education[0]?.institution}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-200/60 text-xs">
              <span className="text-stone-500 text-[11px]">
                Have a discrepancy or gazette amendment to report? Email: <strong className="text-stone-800">{author.contactEmail}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAuthorModal(true)}
                  className="px-3 py-1.5 font-semibold text-xs text-stone-900 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors cursor-pointer"
                >
                  View Full Credential Dossier
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(`/trust/authors?author=${author.id}`)}
                  className="px-3 py-1.5 font-semibold text-xs text-blue-700 hover:text-blue-900 underline cursor-pointer"
                >
                  All Articles by {author.name.split(' ')[0]} →
                </button>
              </div>
            </div>
          </div>

          {/* WhatsApp & Telegram Instant Gazette Broadcast Alert Banner */}
          <SocialAlertBanner category={article.category} />

          {/* Section 13: Candidate Query Cell & Community Discussion */}
          <CandidateDiscussion alertId={article.id} alertTitle={article.title} />
        </article>

        {/* Right Sidebar: Recommended Tests & Tools (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Official PYQ CBT Simulator CTA Card */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-6 text-white border border-slate-800 shadow-sm space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
              Official Exam Simulator
            </span>
            <h3 className="text-lg font-bold">
              Official PYQ CBT Simulator
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Computer-based test simulator with live countdown timer, 5-state question palette, negative marking, and verified solutions.
            </p>
            <button
              onClick={() => onNavigate('/mock-test/ssc-cgl-tier1')}
              className="w-full py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-2"
            >
              <span>Launch Practice Exam</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Tools Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Smart Exam Tools
            </h4>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => onNavigate('/tools/eligibility')}
                className="w-full p-2.5 rounded-lg border border-emerald-200 hover:bg-emerald-50/50 text-left transition-colors cursor-pointer flex items-center justify-between"
              >
                <span className="font-semibold text-emerald-800">Instant Eligibility Matcher</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
              </button>
              <button
                onClick={() => onNavigate('/tools/age')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-colors cursor-pointer flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">Age Cut-off Calculator</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigate('/tools/marking')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-colors cursor-pointer flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">Negative Marking Score</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigate('/tools/height')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-colors cursor-pointer flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">Physical Height Checker</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigate('/tools/rank')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-colors cursor-pointer flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">Rank & Normalization</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* E-E-A-T Editorial & Statutory Grievance Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Editorial Integrity & Grievance</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              GovIndiaNews adheres strictly to Digital Media Ethics Rules 2021. For discrepancies or corrigendum requests:
            </p>
            <div className="space-y-1.5 pt-1 text-xs">
              <button
                onClick={() => onNavigate('/trust/editorial')}
                className="w-full py-1.5 text-left text-blue-600 font-semibold hover:underline flex items-center justify-between cursor-pointer"
              >
                <span>Editorial Code of Ethics</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigate('/trust/grievance')}
                className="w-full py-1.5 text-left text-blue-600 font-semibold hover:underline flex items-center justify-between cursor-pointer"
              >
                <span>Grievance Redressal Officer</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Related Recruitment Alerts */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Other Recent Notifications
            </h4>
            <div className="divide-y divide-slate-100 text-xs">
              {relatedArticles.slice(0, 4).map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigate(`/article/${rel.slug}`)}
                  className="py-2.5 first:pt-0 last:pb-0 hover:text-blue-600 transition-colors cursor-pointer group"
                >
                  <div className="text-[11px] text-slate-400 mb-0.5">{rel.organization}</div>
                  <h5 className="font-semibold text-slate-800 group-hover:text-blue-600 line-clamp-2 leading-snug">
                    {rel.title}
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Author Credential Dossier Modal */}
      <AuthorDossierModal
        author={author}
        isOpen={showAuthorModal}
        onClose={() => setShowAuthorModal(false)}
        onNavigateAlert={(alertId) => onNavigate(`/article/${alertId}`)}
      />

      {/* Photo & Signature Resizer & Compressor Modal */}
      <PhotoSignatureResizerModal
        isOpen={isResizerOpen}
        onClose={() => setIsResizerOpen(false)}
      />
    </div>
  );
};
