import React from 'react';
import { ExternalLink, Calendar, ChevronRight, FileText, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { RecruitmentAlert } from '../data/gazetteData';

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
        };
      case 'answer-key':
        return {
          title: 'Official Answer Keys & Response Sheets',
          description: 'Provisional and final answer key links, question paper representations, and objection submission deadlines issued by testing agencies.',
        };
      case 'cut-off':
        return {
          title: 'Category-Wise Exam Cut-Off Marks',
          description: 'Official minimum qualifying cut-off marks and category merit thresholds (UR, EWS, OBC, SC, ST, PwBD) published by exam boards.',
        };
      case 'result':
        return {
          title: 'Written Examination Results & Selection Lists',
          description: 'Direct PDF merit lists, roll numbers of qualified candidates, and stage-wise examination results published on official portals.',
        };
      case 'jobs':
      default:
        return {
          title: 'Central & State Government Jobs Live Updates',
          description: 'Active public recruitment notices, online application deadlines, and statutory eligibility criteria.',
        };
    }
  };

  const meta = getCategoryMeta();
  const categoryAlerts = alerts.filter((a) => a.category === category);

  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-3">
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
          {meta.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
          {meta.description}
        </p>
      </div>

      {/* Live Updates List */}
      <div className="space-y-4">
        {categoryAlerts.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs">
            No live updates currently published in this category. New notices are posted upon official notification confirmation.
          </div>
        ) : (
          categoryAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 transition-all shadow-xs space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-900">{alert.organization}</span>
                  <span>·</span>
                  <span>{alert.publishDate}</span>
                  {alert.status === 'verified' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified
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
                    <span>Source: {alert.sourceNotice.title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div>
                <h2 className="text-base font-bold text-stone-900 leading-snug">
                  {alert.title}
                </h2>
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
                    <span>Full Notification Details</span>
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
    </div>
  );
};
