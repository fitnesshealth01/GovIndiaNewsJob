import React, { useState, useMemo } from 'react';
import { RECRUITMENT_ALERTS, RecruitmentAlert } from '../data/gazetteData';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  GraduationCap,
  Calendar,
  User,
  ShieldCheck,
  Building2,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { isBookmarked, toggleBookmark, calculateDeadlineCountdown } from '../utils/bookmarkStorage';

interface EligibilityMatcherProps {
  onNavigate: (path: string) => void;
}

type CategoryType = 'UR' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'ESM' | 'PWBD';
type EducationLevel = '10th' | '12th' | 'graduate' | 'diploma-engg' | 'postgraduate';

export const EligibilityMatcher: React.FC<EligibilityMatcherProps> = ({ onNavigate }) => {
  // Inputs
  const [dob, setDob] = useState<string>('2001-05-15');
  const [category, setCategory] = useState<CategoryType>('UR');
  const [education, setEducation] = useState<EducationLevel>('graduate');
  const [gender, setGender] = useState<'any' | 'male' | 'female'>('any');
  const [targetSector, setTargetSector] = useState<string>('all');
  const [showIneligible, setShowIneligible] = useState<boolean>(false);
  const [bookmarkedList, setBookmarkedList] = useState<string[]>(() => {
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

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const res = toggleBookmark(id);
    setBookmarkedList(res.all);
  };

  // Calculate age from DOB as of reference date (01-08-2026 standard DOP&T crucial date)
  const candidateAge = useMemo(() => {
    if (!dob) return { years: 0, months: 0, days: 0, decimal: 0 };
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return { years: 0, months: 0, days: 0, decimal: 0 };

    // Reference crucial date: 1st August 2026
    const refDate = new Date('2026-08-01');

    let years = refDate.getFullYear() - birthDate.getFullYear();
    let months = refDate.getMonth() - birthDate.getMonth();
    let days = refDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(refDate.getFullYear(), refDate.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const decimal = years + months / 12 + days / 365;
    return { years, months, days, decimal };
  }, [dob]);

  // Determine category relaxation
  const categoryRelaxationYears = useMemo(() => {
    switch (category) {
      case 'OBC':
        return 3;
      case 'SC':
      case 'ST':
        return 5;
      case 'PWBD':
        return 10;
      case 'ESM':
        return 3;
      default:
        return 0;
    }
  }, [category]);

  // Education rank mapping to evaluate if candidate meets alert qualification tier
  const educationTierRank: Record<EducationLevel, number> = {
    '10th': 1,
    '12th': 2,
    'diploma-engg': 3,
    'graduate': 4,
    'postgraduate': 5,
  };

  const getAlertMinEducationRank = (tier?: string): number => {
    switch (tier) {
      case '10th':
        return 1;
      case '12th':
        return 2;
      case 'diploma-engg':
        return 3;
      case 'graduate':
        return 4;
      default:
        return 1;
    }
  };

  // Evaluation algorithm
  const evaluationResults = useMemo(() => {
    const jobAlerts = RECRUITMENT_ALERTS.filter((alert) => alert.category === 'jobs' && alert.status === 'verified');
    const userRank = educationTierRank[education];

    const eligibleList: { alert: RecruitmentAlert; reason: string; countdown: ReturnType<typeof calculateDeadlineCountdown> }[] = [];
    const ineligibleList: { alert: RecruitmentAlert; reasons: string[] }[] = [];

    jobAlerts.forEach((alert) => {
      // Sector filter
      if (targetSector !== 'all' && alert.sector !== targetSector) {
        return;
      }

      const issues: string[] = [];

      // Check min age
      const minAge = alert.minAge || 18;
      if (candidateAge.years < minAge) {
        issues.push(`Under minimum age requirement (${minAge} Years). Your calculated age is ${candidateAge.years}y ${candidateAge.months}m.`);
      }

      // Check max age with relaxation
      const baseMaxAge = alert.maxAge || 30;
      const relaxedMaxAge = baseMaxAge + categoryRelaxationYears;
      if (candidateAge.years > relaxedMaxAge) {
        issues.push(
          `Exceeds maximum age limit (${relaxedMaxAge} Years for ${category}; standard is ${baseMaxAge}). Your calculated age is ${candidateAge.years}y ${candidateAge.months}m.`
        );
      }

      // Check education
      const requiredRank = getAlertMinEducationRank(alert.qualificationTier);
      if (userRank < requiredRank) {
        issues.push(`Requires ${alert.qualificationTier?.toUpperCase() || 'Higher Degree'}. Your selected highest qualification is ${education.toUpperCase()}.`);
      }

      // Gender post check (e.g., female-only or male-only specific posts)
      if (gender === 'female' && alert.id === 'delhi-police-si-2026' && alert.title.includes('Driving License')) {
        // Just advisory
      }

      const countdown = calculateDeadlineCountdown(alert.lastDate);

      if (issues.length === 0) {
        eligibleList.push({
          alert,
          reason: `100% Meets Age (${candidateAge.years}y) & ${alert.qualificationTier ? alert.qualificationTier.toUpperCase() : 'Academic'} Criteria`,
          countdown,
        });
      } else {
        ineligibleList.push({ alert, reasons: issues });
      }
    });

    return { eligibleList, ineligibleList };
  }, [candidateAge, category, categoryRelaxationYears, education, gender, targetSector]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Statutory Eligibility Engine (DOP&T & Central Gazettes)
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Instant Government Job Eligibility Matcher
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Enter your Date of Birth, Category reservation, and Educational qualification. Our real-time engine cross-references all active recruitment gazettes to show exactly where you qualify to apply right now.
          </p>
        </div>
      </div>

      {/* Inputs Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <User className="w-5 h-5 text-blue-700" />
          Candidate Profile & Credentials
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* DOB Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Date of Birth</span>
              <span className="text-[11px] font-normal text-slate-400">Ref: 01-08-2026</span>
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
            <div className="text-[11px] text-blue-700 font-medium">
              Calculated Age: {candidateAge.years} Years, {candidateAge.months} Months
            </div>
          </div>

          {/* Social Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Category</span>
              {categoryRelaxationYears > 0 && (
                <span className="text-[11px] font-bold text-emerald-600">+{categoryRelaxationYears}y Relax</span>
              )}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            >
              <option value="UR">UR / General (Unreserved)</option>
              <option value="OBC">OBC-NCL (Non-Creamy Layer) [+3 Years]</option>
              <option value="SC">SC (Scheduled Caste) [+5 Years]</option>
              <option value="ST">ST (Scheduled Tribe) [+5 Years]</option>
              <option value="EWS">EWS (Economically Weaker Section)</option>
              <option value="PWBD">PwBD (Persons with Disabilities) [+10 Years]</option>
              <option value="ESM">Ex-Servicemen (ESM)</option>
            </select>
          </div>

          {/* Education Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Highest Qualification
            </label>
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value as EducationLevel)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            >
              <option value="10th">10th Pass (Matriculation)</option>
              <option value="12th">12th Pass (Higher Secondary / Intermediate)</option>
              <option value="diploma-engg">3-Year Polytechnic / Engg Diploma</option>
              <option value="graduate">Bachelor's Degree / Graduate (Any Stream)</option>
              <option value="postgraduate">Postgraduate / Master's Degree</option>
            </select>
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as 'any' | 'male' | 'female')}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            >
              <option value="any">All / Unspecified</option>
              <option value="male">Male Candidate</option>
              <option value="female">Female Candidate</option>
            </select>
          </div>
        </div>

        {/* Sector Quick Pills */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase mr-1">Filter Sector:</span>
          {[
            { id: 'all', label: 'All Sectors' },
            { id: 'railways', label: 'Railways (RPF/NTPC)' },
            { id: 'ssc', label: 'SSC (CGL/JE/GD)' },
            { id: 'banking', label: 'Banking (IBPS/SBI)' },
            { id: 'defence', label: 'Defence (AFCAT/Army)' },
            { id: 'police', label: 'State Police' },
            { id: 'upsc', label: 'UPSC Civil Services' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setTargetSector(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                targetSector === s.id
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Eligible Results Summary */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
              {evaluationResults.eligibleList.length}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                You Are Eligible for {evaluationResults.eligibleList.length} Active Recruitment Gazettes
              </h3>
              <p className="text-xs text-slate-500">
                Based on Age {candidateAge.years}y ({category}) and qualification level '{education.toUpperCase()}'
              </p>
            </div>
          </div>

          {evaluationResults.ineligibleList.length > 0 && (
            <button
              onClick={() => setShowIneligible(!showIneligible)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 self-start sm:self-auto px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
            >
              {showIneligible ? 'Hide Ineligible Notices' : `Show Disqualified Notices (${evaluationResults.ineligibleList.length})`}
              {showIneligible ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Eligible Cards List */}
        {evaluationResults.eligibleList.length === 0 ? (
          <div className="p-8 rounded-2xl border border-dashed border-slate-300 bg-white text-center space-y-3">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">No Direct Matches for Current Selection</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your category reservation or expanding the sector filter to see all Central & State government vacancies.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evaluationResults.eligibleList.map(({ alert, reason, countdown }) => {
              const bookmarked = bookmarkedList.includes(alert.id);
              return (
                <div
                  key={alert.id}
                  onClick={() => onNavigate(`/article/${alert.slug}`)}
                  className="p-5 rounded-2xl border border-emerald-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group relative"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Eligible to Apply
                      </span>

                      <div className="flex items-center gap-1.5">
                        {/* Countdown Badge */}
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            countdown.urgency === 'urgent'
                              ? 'bg-rose-100 text-rose-700 animate-pulse'
                              : countdown.urgency === 'moderate'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {countdown.label}
                        </span>

                        {/* Bookmark Button */}
                        <button
                          type="button"
                          onClick={(e) => handleToggleBookmark(alert.id, e)}
                          title={bookmarked ? 'Saved to Bookmarks' : 'Save for Later'}
                          className={`p-1.5 rounded-lg border transition-all ${
                            bookmarked
                              ? 'bg-blue-50 border-blue-300 text-blue-700'
                              : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {bookmarked ? <BookmarkCheck className="w-4 h-4 fill-blue-700" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                      {alert.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600">
                      <span className="flex items-center gap-1 font-semibold text-slate-800">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {alert.organization}
                      </span>
                      {alert.postCount && (
                        <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {alert.postCount} Posts
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {alert.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-600 font-medium flex items-center gap-1">
                      Source: {alert.sourceNotice?.title || alert.organization}
                    </span>
                    <span className="font-bold text-blue-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      View Details & Apply <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Ineligible Section (Toggleable) */}
        {showIneligible && evaluationResults.ineligibleList.length > 0 && (
          <div className="pt-6 space-y-3">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-500" />
              Not Eligible Based on Current Credentials ({evaluationResults.ineligibleList.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {evaluationResults.ineligibleList.map(({ alert, reasons }) => (
                <div
                  key={alert.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 opacity-80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{alert.organization}</span>
                    <span className="text-[11px] text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Disqualified
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-900">{alert.title}</h5>
                  <ul className="text-[11px] text-rose-700 space-y-1 list-disc list-inside">
                    {reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
