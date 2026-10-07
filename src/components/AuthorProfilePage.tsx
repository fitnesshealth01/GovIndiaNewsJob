import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Mail,
  Award,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  Search,
  Briefcase,
  FileText,
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { EDITORIAL_AUTHORS, AuthorProfile } from '../data/authorData';
import { RECRUITMENT_ALERTS, RecruitmentAlert } from '../data/gazetteData';
import { parsePublishDateToTimestamp } from '../utils/alertStatus';
import { buildAuthorProfilePageSchema, buildBreadcrumbSchema, injectSchema } from '../utils/seoSchema';

interface AuthorProfilePageProps {
  authorId?: string;
  onNavigate: (path: string) => void;
}

export const AuthorProfilePage: React.FC<AuthorProfilePageProps> = ({
  authorId,
  onNavigate,
}) => {
  const author: AuthorProfile = useMemo(() => {
    return (
      EDITORIAL_AUTHORS.find(
        (a) => a.id === authorId || (authorId && authorId.includes('akash') && a.id.includes('akash'))
      ) || EDITORIAL_AUTHORS[0]
    );
  }, [authorId]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Inject Person and Breadcrumb Structured Data Schema
  React.useEffect(() => {
    const schemas: Record<string, unknown>[] = [
      buildAuthorProfilePageSchema(author),
      buildBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Authors & Editorial Desk', url: '/trust/authors' },
        { name: author.name, url: `/author/${author.id}` },
      ]),
    ];
    injectSchema(schemas);
  }, [author]);

  // Sort ALL articles strictly from latest to oldest by published date
  const sortedArticles = useMemo(() => {
    return [...RECRUITMENT_ALERTS].sort((a, b) => {
      const timeB = parsePublishDateToTimestamp(b.publishDate);
      const timeA = parsePublishDateToTimestamp(a.publishDate);
      return timeB - timeA;
    });
  }, []);

  // Filter articles by search term and category
  const filteredArticles = useMemo(() => {
    return sortedArticles.filter((article) => {
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          article.title.toLowerCase().includes(q) ||
          article.organization.toLowerCase().includes(q) ||
          article.examName.toLowerCase().includes(q) ||
          article.summary.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [sortedArticles, selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: sortedArticles.length };
    sortedArticles.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, [sortedArticles]);

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-2">
      {/* 1. AUTHOR PROFILE DOSSIER HEADER */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
          {/* Avatar Lockup */}
          <div className="relative shrink-0">
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl ${author.avatarBg} text-white flex items-center justify-center text-3xl sm:text-4xl font-serif font-black shadow-md border-2 ${author.avatarBorder}`}
            >
              {author.initials}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1.5 rounded-xl shadow-xs border-2 border-white" title="Verified Public Gazette Analyst">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          {/* Author Details & Bio */}
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
                <span>🎖️ {author.serviceBackground}</span>
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-full text-xs font-semibold">
                {author.designation}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                GovIndiaNews Editorial Desk
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {author.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
                {author.beat}
              </p>
            </div>

            {/* 2-3 Lines Bio with Soldier / Army Service Experience */}
            <p className="text-sm text-slate-700 leading-relaxed font-sans pt-1 border-t border-slate-100">
              {author.biography}
            </p>

            {/* Contact, Social & Verification Badges */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 text-xs">
              <a
                href={`mailto:${author.contactEmail}`}
                className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-semibold hover:underline"
              >
                <Mail className="w-4 h-4 text-blue-600" />
                <span>{author.contactEmail}</span>
              </a>
              {author.links?.linkedin && (
                <>
                  <span className="text-slate-300">·</span>
                  <a
                    href={author.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 font-semibold hover:underline"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              )}
              {author.links?.twitter && (
                <>
                  <span className="text-slate-300">·</span>
                  <a
                    href={author.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 font-semibold hover:underline"
                  >
                    <span>Twitter / X</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              )}
              <span className="text-slate-300">·</span>
              <span className="text-slate-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Primary Gazette Sourced & Verified</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-600">
                <strong>{sortedArticles.length}</strong> Published Articles
              </span>
            </div>
          </div>
        </div>

        {/* Professional Experience & Editorial Standards Highlights */}
        {author.detailedExperience && author.detailedExperience.length > 0 && (
          <div className="pt-5 border-t border-slate-100 space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Service Background, Defense Insights & Editorial Standards</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
              {author.detailedExperience.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 2. CHRONOLOGICAL PUBLICATIONS FEED: LATEST TO OLDEST */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-blue-700" />
              <span>All Articles & Gazette Notices by {author.name}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Chronological archive of verified recruitment notifications, exam city slips, cut-off releases, and blueprints arranged strictly from latest to oldest.
            </p>
          </div>

          {/* Quick Search in Author Articles */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search author's articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: 'all', label: 'All Publications' },
            { id: 'jobs', label: 'Latest Jobs' },
            { id: 'admit-card', label: 'Admit Cards' },
            { id: 'cut-off', label: 'Cut-Off Marks' },
            { id: 'result', label: 'Results' },
          ].map((tab) => {
            const count = categoryCounts[tab.id] || 0;
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Articles List Ordered Latest to Oldest */}
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <p className="text-sm font-semibold text-slate-800">
              No articles found matching "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArticles.map((article, index) => (
              <article
                key={article.id}
                onClick={() => onNavigate(`/article/${article.slug}`)}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-start justify-between gap-5"
              >
                <div className="space-y-2.5 flex-1 min-w-0">
                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider text-[10px] bg-blue-50 text-blue-800 border border-blue-200">
                      {article.category === 'jobs'
                        ? 'Job Notification'
                        : article.category === 'admit-card'
                        ? 'Admit Card'
                        : article.category === 'cut-off'
                        ? 'Cut-Off'
                        : 'Result'}
                    </span>

                    <span className="font-semibold text-slate-600">
                      {article.organization}
                    </span>

                    <span className="text-slate-300">·</span>

                    <span className="text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>Published: <strong className="text-slate-700 font-medium">{article.publishDate || 'Recent'}</strong></span>
                    </span>

                    {index === 0 && (
                      <span className="px-2 py-0.2 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                        LATEST RELEASE
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>

                  {/* Highlights Bar */}
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500">
                    {article.postCount && (
                      <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {typeof article.postCount === 'number'
                          ? `${article.postCount} Vacancies`
                          : article.postCount}
                      </span>
                    )}
                    {article.lastDate && (
                      <span className="text-rose-700 font-semibold">
                        Deadline: {article.lastDate}
                      </span>
                    )}
                    <span className="text-slate-400">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>
                </div>

                {/* Right CTA */}
                <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <div className="hidden sm:block text-[11px] text-slate-400 font-mono mb-2">
                    Verified By {author.name.split(' ')[0]}
                  </div>
                  <button
                    type="button"
                    className="px-3.5 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white rounded-lg transition-all flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
