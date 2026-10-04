import React, { useState, useId } from 'react';
import {
  UserCheck,
  ShieldCheck,
  Award,
  BookOpen,
  GraduationCap,
  FileText,
  Search,
  ExternalLink,
  ChevronRight,
  Mail,
  CheckCircle2
} from 'lucide-react';
import { EDITORIAL_AUTHORS, AuthorProfile } from '../data/authorData';
import { AuthorDossierModal } from './AuthorDossierModal';

interface AuthorsSectionProps {
  selectedAuthorId?: string;
  onNavigate?: (path: string) => void;
}

export const AuthorsSection: React.FC<AuthorsSectionProps> = ({
  selectedAuthorId,
  onNavigate
}) => {
  const [activeBeat, setActiveBeat] = useState<'all' | 'upsc' | 'defence' | 'banking' | 'engineering' | 'legal'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalAuthor, setActiveModalAuthor] = useState<AuthorProfile | null>(() => {
    if (selectedAuthorId) {
      return EDITORIAL_AUTHORS.find((a) => a.id === selectedAuthorId) || null;
    }
    return null;
  });

  const searchInputId = useId();

  const filteredAuthors = EDITORIAL_AUTHORS.filter((author) => {
    const matchesBeat = activeBeat === 'all' || author.beatCategory === activeBeat;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesBeat;
    const matchesSearch =
      author.name.toLowerCase().includes(query) ||
      author.beat.toLowerCase().includes(query) ||
      author.designation.toLowerCase().includes(query) ||
      author.accreditationBadge.toLowerCase().includes(query) ||
      author.registrationNumber.toLowerCase().includes(query) ||
      author.education.some((e) => e.institution.toLowerCase().includes(query) || e.degree.toLowerCase().includes(query));
    return matchesBeat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
              Verified Editorial Board & Subject Matter Experts
            </h2>
            <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
              <span>Google E-E-A-T Compliance Standard</span>
              <span>·</span>
              <span>Rule 4(1)(d) of Information Technology Rules 2021</span>
              <span>·</span>
              <span className="text-emerald-700 font-medium">100% Human Verified</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed font-sans max-w-3xl">
          GovIndiaNews maintains a permanent editorial board of credentialed legal advocates, former public sector managers, doctoral defence scholars, and competitive exam alumni. Every alert, syllabus breakdown, cut-off analysis, and pay commission matrix is authored and peer-audited by a subject matter specialist before gazette publication.
        </p>

        {/* Filter Tabs & Search Bar */}
        <div className="pt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-t border-stone-100">
          {/* Functional Beat Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-medium">
            <button
              onClick={() => setActiveBeat('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeBeat === 'all'
                  ? 'bg-white text-stone-900 font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Board Members ({EDITORIAL_AUTHORS.length})
            </button>
            <button
              onClick={() => setActiveBeat('upsc')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeBeat === 'upsc'
                  ? 'bg-white text-stone-900 font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              UPSC & Civil Services
            </button>
            <button
              onClick={() => setActiveBeat('defence')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeBeat === 'defence'
                  ? 'bg-white text-stone-900 font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Defence & Forces
            </button>
            <button
              onClick={() => setActiveBeat('banking')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeBeat === 'banking'
                  ? 'bg-white text-stone-900 font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Banking & Finance
            </button>
            <button
              onClick={() => setActiveBeat('engineering')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeBeat === 'engineering'
                  ? 'bg-white text-stone-900 font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Engineering & Tech
            </button>
            <button
              onClick={() => setActiveBeat('legal')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeBeat === 'legal'
                  ? 'bg-white text-stone-900 font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Legal & Statutory
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id={searchInputId}
              type="text"
              placeholder="Search editor, degree, beat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-stone-500"
            />
          </div>
        </div>
      </div>

      {/* Author Profile Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredAuthors.map((author) => (
          <div
            key={author.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 hover:border-stone-300 transition-all shadow-xs"
          >
            {/* Top row: Avatar + Core Bio */}
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div
                className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl ${author.avatarBg} text-white flex items-center justify-center text-2xl sm:text-3xl font-serif font-bold shadow-md shrink-0 border-2 ${author.avatarBorder}`}
              >
                {author.initials}
              </div>

              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 tracking-tight">
                    {author.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {author.verificationBadge}
                  </span>
                </div>

                <div className="text-xs font-semibold text-stone-700">
                  {author.designation} · {author.role}
                </div>

                <div className="flex items-center gap-2 text-xs text-stone-500 flex-wrap">
                  <span className="text-stone-700 font-medium">Beat: {author.beat}</span>
                  <span>·</span>
                  <span>{author.yearsOfExperience} Years Research</span>
                  <span>·</span>
                  <span className="font-mono text-stone-600">{author.accreditationBadge} ({author.registrationNumber})</span>
                </div>
              </div>

              <div className="shrink-0 flex sm:flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveModalAuthor(author)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>View Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Executive Bio */}
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              {author.executiveSummary}
            </p>

            {/* Academic Credentials & Statutory Roster */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-100 text-xs">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-stone-700 text-[11px]">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
                  <span>Academic Qualifications</span>
                </div>
                <div className="space-y-1 text-stone-600">
                  {author.education.map((edu, idx) => (
                    <div key={idx} className="flex items-baseline justify-between gap-2">
                      <span className="text-stone-900 font-medium">{edu.degree}</span>
                      <span className="text-stone-500 font-mono text-[11px] shrink-0">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-stone-700 text-[11px]">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>Primary Statutory Jurisdiction</span>
                </div>
                <div className="space-y-1 text-stone-600">
                  {author.statutoryFocusAreas.slice(0, 2).map((focus, idx) => (
                    <div key={idx} className="truncate">
                      · {focus}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notable Past Publication */}
            {author.pastPublications.length > 0 && (
              <div className="bg-stone-50/70 rounded-xl p-3.5 border border-stone-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-800 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-stone-600" />
                    <span>Selected Landmark Publication</span>
                  </span>
                  <span className="font-mono text-stone-500 text-[11px]">{author.pastPublications[0].year}</span>
                </div>
                <p className="text-stone-800 font-medium italic">
                  "{author.pastPublications[0].title}"
                </p>
                <div className="text-[11px] text-stone-500 flex items-center gap-2">
                  <span>Published in: {author.pastPublications[0].publisher}</span>
                  <span>·</span>
                  <span>Category: {author.pastPublications[0].topic}</span>
                </div>
              </div>
            )}

            {/* Recent Authored Alerts & Direct Inquiries */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 text-xs border-t border-stone-100">
              <div className="flex items-center gap-2 text-stone-600 flex-wrap">
                <span className="font-medium text-stone-900">Recent Bylines:</span>
                {author.recentAuthoredAlerts.slice(0, 2).map((alert, idx) => (
                  <button
                    key={alert.id}
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate(`/article/${alert.id}`);
                      }
                    }}
                    className="text-blue-700 hover:text-blue-900 hover:underline cursor-pointer truncate max-w-xs"
                  >
                    {alert.title}
                    {idx < 1 && author.recentAuthoredAlerts.length > 1 ? ' ·' : ''}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={`mailto:${author.contactEmail}`}
                  className="text-stone-600 hover:text-stone-900 flex items-center gap-1 text-[11px] font-medium"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{author.contactEmail}</span>
                </a>
              </div>
            </div>
          </div>
        ))}

        {filteredAuthors.length === 0 && (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
            <UserCheck className="w-8 h-8 text-stone-400 mx-auto" />
            <h4 className="text-base font-bold text-stone-900">No Editorial Board Members Found</h4>
            <p className="text-xs text-stone-500">
              No analysts matching "{searchQuery}" under the selected category.
            </p>
            <button
              onClick={() => {
                setActiveBeat('all');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-blue-700 underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Editorial Governance & Transparency Note */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 text-xs text-stone-600 space-y-2">
        <h4 className="font-bold text-stone-900 text-sm">GovIndiaNews Authorship Charter & Independent Editorial Policy</h4>
        <p className="leading-relaxed">
          All authors on GovIndiaNews are held to the Press Council of India Norms of Journalistic Conduct. Authors have no financial interests in any coaching institutes or examination test series. Any corrections, errata notices, or challenge review submissions regarding an alert are audited by Lead Legal Counsel Adv. Rajeshwar Narayan within 120 minutes of publication.
        </p>
      </div>

      {/* Full Dossier Modal */}
      <AuthorDossierModal
        author={activeModalAuthor}
        isOpen={Boolean(activeModalAuthor)}
        onClose={() => setActiveModalAuthor(null)}
        onNavigateAlert={(alertId) => {
          if (onNavigate) {
            onNavigate(`/article/${alertId}`);
          }
        }}
      />
    </div>
  );
};
