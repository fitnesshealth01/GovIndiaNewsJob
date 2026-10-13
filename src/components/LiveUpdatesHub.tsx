import React from 'react';
import { ExternalLink, Calendar, ChevronRight, FileText, ArrowRight, CheckCircle2, AlertCircle, Award, Calculator, TrendingUp, HelpCircle, ShieldCheck } from 'lucide-react';
import { RecruitmentAlert, RECRUITMENT_ALERTS } from '../data/gazetteData';
import { NavLink } from './NavLink';

interface LiveUpdatesHubProps {
  category: 'admit-card' | 'answer-key' | 'cut-off' | 'result' | 'jobs';
  alerts: RecruitmentAlert[];
  onNavigate: (path: string) => void;
}

export const LiveUpdatesHub: React.FC<LiveUpdatesHubProps> = ({ category, alerts, onNavigate }) => {
  const getCategoryMeta = () => {
    switch (category) {
      case 'admit-card':
        return {
          title: 'Admit Cards & Hall Tickets Live Updates',
          description: 'Official hall tickets, exam city intimation slips, and electronic call letters directly verified against government commission noticeboards.',
          badge: 'Live Call Letters',
        };
      case 'answer-key':
        return {
          title: 'Official Answer Keys & Response Sheets',
          description: 'Provisional and final answer key links, candidate response sheet representations, and objection submission deadlines issued by testing agencies.',
          badge: 'Keys & Objections',
        };
      case 'cut-off':
        return {
          title: 'Category-Wise Exam Cut-Off Marks & Benchmark Trends',
          description: 'Official minimum qualifying cut-off marks, normalized score thresholds, and reservation category merit standards (UR, EWS, OBC, SC, ST, PwBD) published by exam boards.',
          badge: 'Qualifying Benchmarks',
        };
      case 'result':
        return {
          title: 'Written Examination Results & Selection Lists',
          description: 'Direct PDF merit lists, roll numbers of qualified candidates, and stage-wise examination results published on official portals.',
          badge: 'Merit Rosters',
        };
      case 'jobs':
      default:
        return {
          title: 'Central & State Government Jobs Live Updates',
          description: 'Active public recruitment notices, online application deadlines, and statutory eligibility criteria.',
          badge: 'Active Vacancies',
        };
    }
  };

  const meta = getCategoryMeta();
  const categoryAlerts = alerts.filter((a) => a.category === category);

  // Active alerts that have multi-year cut-off trends
  const alertsWithCutoffs = RECRUITMENT_ALERTS.filter((a) => a.cutOffTrends && a.cutOffTrends.length > 0);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Category Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md">
          <Award className="w-4 h-4 text-blue-700" />
          <span>{meta.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
          {meta.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
          {meta.description}
        </p>
      </div>

      {/* Primary Category Announcements */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <span>Active Notices in this Category</span>
          <span className="text-xs font-normal text-stone-500">({categoryAlerts.length} verified updates)</span>
        </h2>

        {categoryAlerts.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs">
            No live updates currently published in this category. New notices are posted upon official notification confirmation.
          </div>
        ) : (
          categoryAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white rounded-xl border border-stone-200 p-5 hover:border-blue-300 transition-all shadow-xs space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-900">{alert.organization}</span>
                  <span>·</span>
                  <span>{alert.publishDate}</span>
                  {alert.status === 'verified' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified Notice
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200"
                      title="This alert is being re-verified against official release"
                    >
                      <AlertCircle className="w-3 h-3 text-amber-600" />
                      Under Verification
                    </span>
                  )}
                </div>
                {alert.sourceNotice && (
                  <a
                    href={alert.sourceNotice.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-700 hover:underline font-medium"
                  >
                    <span>Official Portal: {alert.sourceNotice.title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 leading-snug">
                  {alert.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  {alert.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs">
                <div className="flex items-center gap-3 text-stone-500">
                  {alert.examDate && (
                    <span>Exam: <strong className="text-stone-800">{alert.examDate}</strong></span>
                  )}
                  {alert.lastDate && (
                    <span>Deadline: <strong className="text-stone-800">{alert.lastDate}</strong></span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate(`/article/${alert.slug}`)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Notification &amp; Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  {alert.sourceNotice && (
                    <a
                      href={alert.sourceNotice.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-200 transition-colors flex items-center gap-1"
                    >
                      <span>Official Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Deep Contextual Editorial Section: How Normalization & Cut-offs Work */}
      {category === 'cut-off' && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-stone-900">
            How Commission Cut-Offs & Multi-Shift Normalization Are Computed
          </h2>
          <div className="text-xs sm:text-sm text-stone-700 space-y-3 leading-relaxed">
            <p>
              In multi-shift central examinations conducted by the Staff Selection Commission (SSC), Railway Recruitment Boards (RRB), and National Testing Agency (NTA), raw marks are not directly comparable due to variations in shift difficulty. To ensure constitutional fairness under Article 16 of the Constitution of India, commissions apply standardized mathematical score normalization formulas.
            </p>
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
              <strong className="text-xs text-stone-900 uppercase font-bold block">
                The TCS & SSC Standard Normalization Principle:
              </strong>
              <p className="text-xs text-stone-600">
                Normalization models candidate scores based on the mean and standard deviation of marks scored by candidates in the top 0.1% across all shifts, ensuring that candidates who faced statistically harder papers receive an equitable upward adjustment.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-lg border border-blue-200 bg-blue-50/50">
                <strong className="text-blue-900 block font-bold mb-1">Qualifying Cut-Offs:</strong>
                <span className="text-stone-600">Minimum threshold required to clear an initial stage (e.g. SSC CGL Tier 1) without determining final rank.</span>
              </div>
              <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50">
                <strong className="text-amber-900 block font-bold mb-1">Merit Cut-Offs:</strong>
                <span className="text-stone-600">Final score required to secure a specific ministry or cadre appointment in the final merit roster.</span>
              </div>
              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50">
                <strong className="text-emerald-900 block font-bold mb-1">Sectional Cut-Offs:</strong>
                <span className="text-stone-600">Mandatory minimum marks required across each individual test module in banking and UPSC papers.</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Deep Contextual Section for Answer Keys */}
      {category === 'answer-key' && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-stone-900">
            Official Answer Key Challenge & Representation Protocol
          </h2>
          <div className="text-xs sm:text-sm text-stone-700 space-y-3 leading-relaxed">
            <p>
              When testing bodies release provisional answer keys and candidate response sheets, aspirants receive a strictly defined challenge window (typically 3 to 7 days). Candidates can submit representations against questions with ambiguity, translation errors, or incorrect official keys:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-stone-600">
              <li>Log in to the official commission portal using your Registration Number and Password / Date of Birth.</li>
              <li>Download and preserve your candidate response sheet PDF with your chosen options and official answers.</li>
              <li>Select the specific Question ID and Option ID you wish to challenge.</li>
              <li>Upload primary academic documentary proof (standard university textbooks, NCERT publications, or gazette references).</li>
              <li>Pay the prescribed non-refundable or conditionally refundable representation fee (typically ₹100 per question).</li>
              <li>Subject matter expert committees evaluate all submissions; if a challenge is sustained, the key is updated for all examinees or the question is cancelled and full marks awarded pro-rata.</li>
            </ol>
          </div>
        </section>
      )}

      {/* Multi-Year Cutoff Benchmark Table Directory */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <div>
            <h2 className="text-base font-bold text-stone-900">
              Multi-Year Cut-Off Benchmarks Across Active Recruitment Drives
            </h2>
            <p className="text-xs text-stone-500">
              Historical normalized qualifying marks across reservation categories (General, OBC, EWS, SC, ST)
            </p>
          </div>
          <NavLink
            href="/tools/marking"
            onNavigate={onNavigate}
            className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <span>Score Calculator</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alertsWithCutoffs.slice(0, 8).map((alert) => {
            const latestTrend = alert.cutOffTrends?.[0];
            return (
              <div
                key={alert.id}
                className="bg-white rounded-xl border border-stone-200 p-4 hover:border-blue-300 transition-all shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                    <span className="font-semibold text-blue-700">{alert.organization}</span>
                    <span>{latestTrend ? latestTrend.year : 'Latest Benchmark'}</span>
                  </div>
                  <h3 className="font-bold text-xs text-stone-900 line-clamp-1">
                    {alert.title}
                  </h3>

                  {latestTrend && (
                    <div className="mt-2 pt-2 border-t border-stone-100 grid grid-cols-5 gap-1 text-center font-mono text-[11px]">
                      <div className="bg-stone-50 p-1 rounded">
                        <span className="text-[9px] text-stone-400 block font-sans">UR</span>
                        <strong className="text-blue-700">{latestTrend.general.toFixed(1)}</strong>
                      </div>
                      <div className="bg-stone-50 p-1 rounded">
                        <span className="text-[9px] text-stone-400 block font-sans">OBC</span>
                        <span className="text-stone-700">{latestTrend.obc.toFixed(1)}</span>
                      </div>
                      <div className="bg-stone-50 p-1 rounded">
                        <span className="text-[9px] text-stone-400 block font-sans">EWS</span>
                        <span className="text-stone-700">{latestTrend.ews.toFixed(1)}</span>
                      </div>
                      <div className="bg-stone-50 p-1 rounded">
                        <span className="text-[9px] text-stone-400 block font-sans">SC</span>
                        <span className="text-stone-700">{latestTrend.sc.toFixed(1)}</span>
                      </div>
                      <div className="bg-stone-50 p-1 rounded">
                        <span className="text-[9px] text-stone-400 block font-sans">ST</span>
                        <span className="text-stone-700">{latestTrend.st.toFixed(1)}</span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate(`/article/${alert.slug}`)}
                  className="w-full py-1.5 text-[11px] font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>View Multi-Year Trends &amp; Strategy</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Candidate Utilities Suite */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-300">
          <Calculator className="w-4 h-4 text-blue-400" />
          <span>Interactive Scoring &amp; Eligibility Utilities</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/tools/marking')}
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left space-y-1.5 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <strong className="text-xs font-bold text-white group-hover:text-blue-300">Negative Marking Calculator</strong>
              <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400">Calculate net score trajectories under 0.25, 0.33, and 0.50 penalty deductions.</p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/tools/rank')}
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left space-y-1.5 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <strong className="text-xs font-bold text-white group-hover:text-blue-300">Score Normalization Predictor</strong>
              <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400">Model percentile rank based on shift difficulty and raw score distributions.</p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/tools/age')}
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left space-y-1.5 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <strong className="text-xs font-bold text-white group-hover:text-blue-300">Age Cutoff Calculator</strong>
              <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400">Calculate exact completed age against official crucial notification dates.</p>
          </button>
        </div>
      </section>
    </div>
  );
};
