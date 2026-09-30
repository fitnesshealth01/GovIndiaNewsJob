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
} from 'lucide-react';
import { isBookmarked, toggleBookmark, calculateDeadlineCountdown } from '../utils/bookmarkStorage';

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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    datePublished: article.publishDate,
    dateModified: article.reviewedDate,
    author: {
      '@type': 'Person',
      name: article.author || 'Akash Singh Solanki',
      jobTitle: article.authorRole || 'Educational Analyst & Founder',
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'GovIndiaNews',
      url: 'https://govindianews.in',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://govindianews.in/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: getCategoryLabel(article.category),
        item: `https://govindianews.in/${article.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://govindianews.in/article/${article.slug}`,
      },
    ],
  };

  const articleFaqSchema =
    article.faqs && article.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: article.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <div className="space-y-8 max-w-full overflow-x-hidden">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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


      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Comprehensive High-Value Editorial (8 cols) */}
        <article className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-8 space-y-8 overflow-hidden">
          {/* Article Header & E-E-A-T Author Lockup */}
          <div className="space-y-4 border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-md px-2.5 py-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>GovIndiaNews Verified Gazette Fact-Check</span>
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

            {/* E-E-A-T Author & Editorial Review Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-2xs">
                  {article.author ? article.author.charAt(0) : 'A'}
                </div>
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{article.author}</span>
                    <span className="text-[10px] font-normal text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                      Verified Author
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">{article.authorRole}</div>
                </div>
              </div>

              <div className="text-right text-[11px] text-slate-500">
                <div>Reviewed: <span className="font-medium text-slate-700">{article.reviewedDate}</span></div>
                <div>Read Time: <span className="font-medium text-slate-700">{article.readTime}</span></div>
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
            </div>
          </div>

          {/* Gazette Reference & Summary */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Gazette Advertisement Reference: {article.officialGazetteRef}</span>
            </div>
            <p className="leading-relaxed text-slate-600">{article.summary}</p>
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
              </div>
            </div>
          )}

          {/* Section 9: Official Links Table */}
          {article.officialLinks && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <span>Verified Direct Government Portal Links</span>
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

          {/* Section 11: Embedded Smart Calculator Widget */}
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
              Official TCS iON examination environment with live countdown timer, 5-state question palette, negative marking, and instant verified solutions.
            </p>
            <button
              onClick={() => onNavigate('/mock-test/ssc-cgl-tier1')}
              className="w-full py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-2"
            >
              <span>Launch Official PYQ Exam</span>
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
    </div>
  );
};
