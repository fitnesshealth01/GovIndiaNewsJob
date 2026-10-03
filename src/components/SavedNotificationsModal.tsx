import React from 'react';
import { RECRUITMENT_ALERTS, RecruitmentAlert } from '../data/gazetteData';
import {
  X,
  Bookmark,
  BookmarkX,
  Calendar,
  Clock,
  ExternalLink,
  Trash2,
  Building2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { calculateDeadlineCountdown, clearAllBookmarks, toggleBookmark } from '../utils/bookmarkStorage';

interface SavedNotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onUpdateSavedIds: (newIds: string[]) => void;
  onNavigate: (path: string) => void;
}

export const SavedNotificationsModal: React.FC<SavedNotificationsModalProps> = ({
  isOpen,
  onClose,
  savedIds,
  onUpdateSavedIds,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const savedAlerts = RECRUITMENT_ALERTS.filter((alert) => savedIds.includes(alert.id));

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const res = toggleBookmark(id);
    onUpdateSavedIds(res.all);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all saved recruitment notifications?')) {
      const res = clearAllBookmarks();
      onUpdateSavedIds(res);
    }
  };

  const handleAddSuggested = (id: string) => {
    const res = toggleBookmark(id);
    onUpdateSavedIds(res.all);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Bookmark className="w-5 h-5 fill-blue-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Saved Notifications & Deadlines ({savedAlerts.length})
              </h3>
              <p className="text-xs text-slate-500">
                Track crucial application cut-offs & active exam registration windows
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedAlerts.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
          {savedAlerts.length === 0 ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Bookmark className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">No Notifications Saved Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click the bookmark ribbon icon on any recruitment notification card to track its last application date and countdown.
                </p>
              </div>

              {/* Suggestions (only verified) */}
              {RECRUITMENT_ALERTS.filter((a) => a.status === 'verified').length > 0 && (
                <div className="pt-4 border-t border-slate-100 text-left space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                    Recommended to Pin
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {RECRUITMENT_ALERTS.filter((a) => a.status === 'verified').slice(0, 4).map((alert) => (
                      <button
                        key={alert.id}
                        type="button"
                        onClick={() => handleAddSuggested(alert.id)}
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-left transition-all flex items-center justify-between group"
                      >
                        <div className="truncate mr-2">
                          <span className="text-xs font-bold text-slate-900 block truncate">{alert.title}</span>
                          <span className="text-[10px] text-slate-500">{alert.organization}</span>
                        </div>
                        <span className="text-xs font-bold text-blue-700 shrink-0 group-hover:scale-105 transition-transform">
                          + Pin
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            savedAlerts.map((alert) => {
              const countdown = calculateDeadlineCountdown(alert.lastDate);
              return (
                <div
                  key={alert.id}
                  onClick={() => {
                    onNavigate(`/article/${alert.slug}`);
                    onClose();
                  }}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-sm transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {alert.organization}
                      </span>
                      {alert.postCount && (
                        <span className="text-[11px] font-semibold text-slate-600">
                          {alert.postCount} Posts
                        </span>
                      )}
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                          countdown.urgency === 'urgent'
                            ? 'bg-rose-100 text-rose-700 animate-pulse'
                            : countdown.urgency === 'moderate'
                            ? 'bg-amber-100 text-amber-800'
                            : countdown.urgency === 'expired'
                            ? 'bg-slate-100 text-slate-500'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        {countdown.label}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug line-clamp-1">
                      {alert.title}
                    </h4>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Last Date: <strong className="text-slate-700 font-semibold">{alert.lastDate || 'TBA'}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <span className="text-xs font-bold text-blue-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleRemove(alert.id, e)}
                      title="Remove from saved"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <BookmarkX className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          Bookmarks are stored locally on your device for fast, private access without sign-in requirements.
        </div>
      </div>
    </div>
  );
};
