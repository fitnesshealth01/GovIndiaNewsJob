import React, { useState, useMemo } from 'react';
import { RECRUITMENT_ALERTS, RecruitmentAlert } from '../data/gazetteData';
import { isAlertActive, isAlertExpired } from '../utils/alertStatus';
import {
  Briefcase,
  FileCheck,
  KeyRound,
  GraduationCap,
  Calendar,
  ChevronRight,
  Search,
  ShieldCheck,
  Building2,
  Clock,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Filter,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { isBookmarked, toggleBookmark, calculateDeadlineCountdown } from '../utils/bookmarkStorage';

interface RecruitmentDirectoryProps {
  initialCategory?: string;
  initialQualification?: string;
  onNavigate: (path: string) => void;
}

export const RecruitmentDirectory: React.FC<RecruitmentDirectoryProps> = ({
  initialCategory = 'all',
  initialQualification = 'all',
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedQualification, setSelectedQualification] = useState<string>(initialQualification);
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('govindianews_bookmarked_alerts');
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  React.useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialQualification) {
      setSelectedQualification(initialQualification);
    }
  }, [initialQualification]);

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const res = toggleBookmark(id);
    setBookmarkedIds(res.all);
  };

  const categories = [
    { id: 'all', label: 'All Updates', icon: Briefcase },
    { id: 'jobs', label: 'Latest Jobs', icon: Briefcase },
    { id: 'admit-card', label: 'Admit Cards', icon: FileCheck },
    { id: 'answer-key', label: 'Answer Keys', icon: KeyRound },
    { id: 'cut-off', label: 'Cut-Off Marks', icon: GraduationCap },
    { id: 'result', label: 'Results & Merit', icon: GraduationCap },
    { id: 'archive', label: 'Archive (Expired)', icon: Clock },
  ];

  const qualificationOptions = [
    { id: 'all', label: 'All Qualifications' },
    { id: '10th', label: '10th Pass (Matric)' },
    { id: '12th', label: '12th Pass (Inter)' },
    { id: 'graduate', label: 'Graduate Degree' },
    { id: 'diploma-engg', label: 'Diploma / Engg' },
  ];

  const sectorOptions = [
    { id: 'all', label: 'All Sectors' },
    { id: 'railways', label: 'Railways' },
    { id: 'ssc', label: 'SSC' },
    { id: 'banking', label: 'Banking' },
    { id: 'defence', label: 'Defence' },
    { id: 'police', label: 'Police' },
    { id: 'upsc', label: 'UPSC' },
  ];

  const filteredAlerts = useMemo(() => {
    return RECRUITMENT_ALERTS.filter((item) => {
      // Archive handling
      if (selectedCategory === 'archive') {
        const isExpired = item.status === 'expired' || isAlertExpired(item);
        if (!isExpired) return false;
      } else {
        // Active discovery: show all active (non-expired) recruitments
        const isExpired = item.status === 'expired' || isAlertExpired(item);
        if (isExpired) return false;

        const matchesCategory =
          selectedCategory === 'all' ? true : item.category === selectedCategory;
        if (!matchesCategory) return false;
      }

      const matchesQualification =
        selectedQualification === 'all'
          ? true
          : item.qualificationTier === selectedQualification ||
            (selectedQualification === '10th' && (item.qualificationTier === '10th' || item.qualification.toLowerCase().includes('10th') || item.qualification.toLowerCase().includes('matric'))) ||
            (selectedQualification === '12th' && (item.qualificationTier === '12th' || item.qualification.toLowerCase().includes('12th') || item.qualification.toLowerCase().includes('10+2'))) ||
            (selectedQualification === 'graduate' && (item.qualificationTier === 'graduate' || item.qualification.toLowerCase().includes('graduate') || item.qualification.toLowerCase().includes('degree'))) ||
            (selectedQualification === 'diploma-engg' && (item.qualificationTier === 'diploma-engg' || item.qualification.toLowerCase().includes('diploma') || item.qualification.toLowerCase().includes('engineering')));

      const matchesSector =
        selectedSector === 'all' ? true : item.sector === selectedSector;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.examName.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q);

      return matchesQualification && matchesSector && matchesQuery;
    });
  }, [selectedCategory, selectedQualification, selectedSector, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 p-1 bg-slate-100 rounded-xl max-w-full">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search RPF, SSC JE, IBPS, Defence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs border border-slate-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 text-xs cursor-pointer"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Quick Qualification & Sector Filter Chips */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        {/* Qualification Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5 mr-1">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            Qualification:
          </span>
          {qualificationOptions.map((q) => {
            const isActive = selectedQualification === q.id;
            return (
              <button
                key={q.id}
                onClick={() => setSelectedQualification(q.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {q.label}
              </button>
            );
          })}
        </div>

        {/* Sector Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60">
          <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            Sector:
          </span>
          {sectorOptions.map((sec) => {
            const isActive = selectedSector === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSector(sec.id)}
                className={`px-2.5 py-0.8 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {sec.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Directory Grid */}
      {filteredAlerts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredAlerts.map((item) => {
            const isSaved = bookmarkedIds.includes(item.id);
            const countdown = calculateDeadlineCountdown(item.lastDate);

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all p-5 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Top line with metadata, category badge, countdown & bookmark */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-slate-500">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase ${
                        item.category === 'admit-card'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : item.category === 'jobs'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : item.category === 'result'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {item.category === 'admit-card' ? 'Admit Card' : item.category === 'jobs' ? 'Recruitment' : item.category}
                      </span>
                      {item.status === 'verified' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200"
                          title="This recruitment alert is being re-verified against the official commission gazette notice"
                        >
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          Under Verification
                        </span>
                      )}
                      <span className="font-semibold text-slate-800">{item.organization}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>{item.publishDate}</span>
                      {item.postCount && (
                        <>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">{item.postCount} Posts</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.lastDate ? (
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs ${
                            countdown.urgency === 'urgent'
                              ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                              : countdown.urgency === 'moderate'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : countdown.urgency === 'expired'
                              ? 'bg-slate-100 text-slate-500 border border-slate-200'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          }`}
                          title={`Application Deadline: ${item.lastDate}`}
                        >
                          <Clock className="w-3 h-3" />
                          {countdown.label}
                        </span>
                      ) : item.examDate ? (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Exam: {item.examDate}
                        </span>
                      ) : null}

                      <button
                        type="button"
                        onClick={(e) => handleToggleBookmark(item.id, e)}
                        title={isSaved ? 'Saved to Bookmarks' : 'Save Notification'}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSaved
                            ? 'bg-blue-50 border-blue-300 text-blue-700'
                            : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-3.5 h-3.5 fill-blue-700" />
                        ) : (
                          <Bookmark className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3
                    onClick={() => onNavigate(`/article/${item.slug}`)}
                    className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer leading-snug"
                  >
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Cut-off teaser if applicable */}
                  {item.cutOffs && (
                    <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] grid grid-cols-3 gap-2 text-center">
                      <div>
                        <span className="text-slate-500 block">UR Cut-off</span>
                        <strong className="text-slate-900 font-bold">153.48</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">OBC Cut-off</span>
                        <strong className="text-slate-900 font-bold">152.12</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">SC Cut-off</span>
                        <strong className="text-slate-900 font-bold">136.20</strong>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Link Footer */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600 truncate max-w-[200px] font-medium">
                    {item.qualification}
                  </span>

                  <button
                    type="button"
                    onClick={() => onNavigate(`/article/${item.slug}`)}
                    className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 shrink-0 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                  >
                    <span>Read Full Gazette</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-2">
          <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-900">
            {selectedCategory === 'archive' ? 'No Archived Notices Found' : 'No Matching Recruitment Notices'}
          </h4>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            {selectedCategory === 'archive'
              ? 'Expired notifications will appear here once recruitment drives conclude.'
              : 'No active recruitment notices match your current filters. Try selecting a different sector, qualification, or resetting your search query.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSelectedCategory('archive');
              }}
              className="px-4 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer border border-blue-200 mr-2"
            >
              View Archived Notices
            </button>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedQualification('all');
                setSelectedSector('all');
                setSearchQuery('');
              }}
              className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border border-slate-200"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
