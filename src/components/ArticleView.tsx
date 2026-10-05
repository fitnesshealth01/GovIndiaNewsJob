import React, { useState } from 'react';
import { RecruitmentAlert } from '../data/gazetteData';
import {
  Calendar,
  Building2,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Share2,
  UserCheck,
  Bookmark,
  BookmarkCheck,
  Printer,
  AlertCircle,
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
import { SocialAlertBanner } from './SocialAlertBanner';
import { EliteJobTemplate } from './EliteJobTemplate';
import { EliteAdmitCardTemplate } from './EliteAdmitCardTemplate';

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
  const [isSaved, setIsSaved] = useState<boolean>(() => isBookmarked(article.id));
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [isResizerOpen, setIsResizerOpen] = useState(false);
  const author = getAuthorByAlertId(article.id);

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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Comprehensive High-Value Editorial (8 cols) */}
        <article className="lg:col-span-8 min-w-0 space-y-8">
          {/* Article Header & Author Lockup */}
          <div className="space-y-4 border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">
                {getCategoryLabel(article.category)}
              </span>

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
                  type="button"
                  onClick={handleShare}
                  className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            {/* Official Source Citation Line */}
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 py-2 border-y border-slate-200">
              <span className="font-semibold text-slate-700">Official Source:</span>
              <a
                href={article.sourceNotice?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline font-medium inline-flex items-center gap-1 truncate max-w-sm"
              >
                {article.sourceNotice?.title || article.organization}
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 text-[11px]">
                checked {article.sourceNotice?.checkedOn || article.publishDate || 'recently'}
              </span>
              <button
                type="button"
                onClick={() => onNavigate('/trust/editorial')}
                className="ml-auto text-[11px] text-slate-600 hover:text-slate-900 font-semibold hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Editorial Policy</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Author Editorial Byline */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs py-1 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-full ${author.avatarBg} text-white font-serif font-bold flex items-center justify-center text-xs shrink-0`}
                >
                  {author.initials}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setShowAuthorModal(true)}
                    className="font-bold text-slate-900 hover:text-blue-700 hover:underline cursor-pointer text-left"
                  >
                    {author.name}
                  </button>
                  <span className="text-slate-300">·</span>
                  <span className="text-[11px] text-slate-500">{author.designation}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span>Updated: <strong className="text-slate-700 font-medium">{article.publishDate || 'Recent'}</strong></span>
                <span className="text-slate-300">·</span>
                <span>{article.readTime}</span>
                <span className="text-slate-300">·</span>
                <button
                  type="button"
                  onClick={() => setShowAuthorModal(true)}
                  className="text-blue-700 hover:underline font-semibold cursor-pointer"
                >
                  Profile →
                </button>
              </div>
            </div>

            {/* Deadline Countdown Notice */}
            {article.lastDate && (
              <div className="p-3 rounded-lg bg-blue-50/70 border-l-4 border-blue-600 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-700 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900">Application Window Closes: </span>
                    <strong className="text-blue-800 font-semibold">{article.lastDate}</strong>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold text-xs shrink-0 ${
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
                href={article.sourceNotice?.url || article.officialLinks?.[0]?.url || 'https://ssc.gov.in'}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Official Notice & Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {article.calculatorToolType && (
                <button
                  type="button"
                  onClick={() => onNavigate(`/tools/${article.calculatorToolType}`)}
                  className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Check Eligibility Calculator</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="button"
                onClick={() => onNavigate('/mock-test/ssc-cgl-tier1')}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>CBT-Style Practice Test</span>
              </button>

              <CalendarSyncButton
                title={article.title}
                deadlineDate={article.lastDate}
                examDate={article.examDate}
                organization={article.organization}
                officialLink={article.officialLinks?.[0]?.url || article.sourceNotice?.url}
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
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Print clean 1-page gazette summary"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Print Summary</span>
              </button>
            </div>
          </div>

          {/* MAIN ARTICLE BODY: Rendered via Elite Templates */}
          {article.category === 'admit-card' ? (
            <EliteAdmitCardTemplate article={article} onNavigate={onNavigate} />
          ) : (
            <EliteJobTemplate article={article} onNavigate={onNavigate} />
          )}

          {/* Discrepancy & Correction Note */}
          <div className="py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Found an error or outdated figure in this notification?</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/corrections')}
              className="text-blue-700 hover:underline font-semibold cursor-pointer text-xs"
            >
              Submit a Correction →
            </button>
          </div>

          {/* Editorial Accountability Section */}
          <div className="border-t border-slate-200 pt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span>Editorial & Verification Desk</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl ${author.avatarBg} text-white font-serif font-bold text-lg flex items-center justify-center shrink-0 border ${author.avatarBorder} shadow-xs`}
              >
                {author.initials}
              </div>
              <div className="space-y-1.5 flex-1 min-w-0 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-serif font-bold text-sm text-slate-900">
                    {author.name}
                  </h4>
                  <span className="text-[11px] text-slate-500">({author.designation})</span>
                </div>
                <p className="font-sans text-slate-600 leading-relaxed text-xs">
                  {author.biography}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 text-[11px]">
                Editorial Contact: <strong className="text-slate-800">{author.contactEmail}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAuthorModal(true)}
                  className="px-3 py-1.5 font-semibold text-xs text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
                >
                  Author Profile
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/about')}
                  className="px-3 py-1.5 font-semibold text-xs text-blue-700 hover:text-blue-900 underline cursor-pointer"
                >
                  About GovIndiaNews →
                </button>
              </div>
            </div>
          </div>

          {/* Social Alert Banner */}
          <SocialAlertBanner category={article.category} />

          {/* Candidate Discussion */}
          <CandidateDiscussion alertId={article.id} alertTitle={article.title} />
        </article>

        {/* Right Sidebar: Recommended Tests & Tools (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* CBT-Style Practice Test CTA Card */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-6 text-white border border-slate-800 shadow-sm space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
              Exam Practice Simulator
            </span>
            <h3 className="text-lg font-bold">
              CBT-Style Practice Test
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Computer-based test practice with live countdown timer, 5-state question palette, negative marking, and verified answer keys.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/mock-test/ssc-cgl-tier1')}
              className="w-full py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-2"
            >
              <span>Launch Practice Test</span>
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
                type="button"
                onClick={() => onNavigate('/tools/salary')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-colors cursor-pointer flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">7th CPC In-Hand Salary Calculator</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/tools/photo-checker')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-colors cursor-pointer flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">Photo & Signature Checker</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/tools/relaxation')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-colors cursor-pointer flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">Fee & Age Relaxation Calculator</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/tools/age')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-colors cursor-pointer flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">Age Cut-off Calculator</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/tools/marking')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-colors cursor-pointer flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">Negative Marking Score</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/tools/height')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-colors cursor-pointer flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">Physical Height Checker</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/tools/rank')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-colors cursor-pointer flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">Rank & Normalization</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Editorial Integrity Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Editorial Integrity & Policies</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              GovIndiaNews is an independent news portal. For corrections, queries, or editorial inquiries:
            </p>
            <div className="space-y-1.5 pt-1 text-xs">
              <button
                type="button"
                onClick={() => onNavigate('/trust/editorial')}
                className="w-full py-1.5 text-left text-blue-600 font-semibold hover:underline flex items-center justify-between cursor-pointer"
              >
                <span>Editorial Policy</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/corrections')}
                className="w-full py-1.5 text-left text-blue-600 font-semibold hover:underline flex items-center justify-between cursor-pointer"
              >
                <span>Submit a Correction</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="w-full py-1.5 text-left text-blue-600 font-semibold hover:underline flex items-center justify-between cursor-pointer"
              >
                <span>Contact Editorial Desk</span>
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
