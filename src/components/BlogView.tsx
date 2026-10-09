import React, { useState, useEffect } from 'react';
import { BLOG_POSTS, BlogPost } from '../content/blogData';
import {
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
  Search,
  Tag,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Ruler,
  Share2,
  Sparkles,
  Activity,
  Flame,
  Award,
} from 'lucide-react';
import {
  buildFAQPageSchema,
  buildBreadcrumbSchema,
  injectSchema,
} from '../utils/seoSchema';
import { PhysicalFitnessCountdown } from './tools/PhysicalFitnessCountdown';

interface BlogViewProps {
  slug?: string;
  onNavigate: (path: string) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ slug, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'fitness' | 'exam-prep' | 'salary-insights' | 'government-schemes' | 'career-guide'>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const post = slug ? BLOG_POSTS.find((p) => p.slug === slug) : null;

  // Structured Schema for Single Post View
  useEffect(() => {
    if (!post) {
      // Hub view schema
      injectSchema([
        buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]),
      ]);
      return;
    }

    const schemas: Record<string, unknown>[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.summary,
        author: {
          '@type': 'Person',
          name: post.author,
          url: 'https://govindianews.com/about',
        },
        publisher: {
          '@type': 'Organization',
          name: 'GovIndiaNews',
          url: 'https://govindianews.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://govindianews.com/icon-512.png',
          },
        },
        datePublished: '2026-10-01T08:00:00+05:30',
        dateModified: '2026-10-06T08:00:00+05:30',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://govindianews.com/blog/${post.slug}`,
        },
      },
      buildBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.title, url: `/blog/${post.slug}` },
      ]),
    ];

    if (post.faqs && post.faqs.length > 0) {
      schemas.push(buildFAQPageSchema(post.faqs));
    }

    injectSchema(schemas);
  }, [post]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // DIRECTORY HUB VIEW (/blog)
  if (!post) {
    const filteredPosts = BLOG_POSTS.filter((p) => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCat && matchesSearch;
    });

    return (
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header Hero */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md px-2.5 py-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>GovIndiaNews Evergreen Editorial Hub</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Permanent Recruitment Masterclasses, Physical Fitness & Career Insights
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            In-depth, timeless editorial guides on physical fitness test (PFT) standards, interval running stamina,
            7th CPC salary breakdowns, and error-free document preparation. These evergreen articles have no expiration dates.
          </p>

          {/* Search Input */}
          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search evergreen articles (e.g. 1600m run, salary, OBC, CGL)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {[
              { id: 'all', label: 'All Articles' },
              { id: 'fitness', label: 'Fitness & PFT' },
              { id: 'government-schemes', label: 'Govt Schemes' },
              { id: 'career-guide', label: 'Career Guide' },
              { id: 'exam-prep', label: 'Exam Preparation' },
              { id: 'salary-insights', label: 'Salary Insights' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((item) => (
            <article
              key={item.slug}
              onClick={() => onNavigate(`/blog/${item.slug}`)}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      item.category === 'fitness'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : item.category === 'government-schemes'
                        ? 'bg-amber-50 text-amber-900 border border-amber-200'
                        : item.category === 'career-guide'
                        ? 'bg-indigo-50 text-indigo-900 border border-indigo-200'
                        : item.category === 'exam-prep'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-purple-50 text-purple-800 border border-purple-200'
                    }`}
                  >
                    {item.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.readingTime}</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {item.title}
                </h2>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">
                  By {item.author.split(',')[0]}
                </span>
                <span className="text-blue-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Read Article</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
            No articles match your search query. Try another keyword.
          </div>
        )}
      </div>
    );
  }

  // SINGLE BLOG POST VIEW (/blog/:slug)
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <button onClick={() => onNavigate('/')} className="hover:text-blue-700 cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <button onClick={() => onNavigate('/blog')} className="hover:text-blue-700 cursor-pointer">
          Blog
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-medium truncate">{post.title}</span>
      </div>

      {/* Article Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`font-bold px-2.5 py-0.5 rounded text-[11px] ${
                post.category === 'fitness'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : post.category === 'government-schemes'
                  ? 'bg-amber-50 text-amber-900 border border-amber-200'
                  : post.category === 'career-guide'
                  ? 'bg-indigo-50 text-indigo-900 border border-indigo-200'
                  : post.category === 'exam-prep'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : 'bg-purple-50 text-purple-800 border border-purple-200'
              }`}
            >
              {post.categoryLabel}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">{post.readingTime}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">Evergreen Reference</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="px-2.5 py-1 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed border-l-2 border-blue-600 pl-4 py-1 italic">
          {post.summary}
        </p>

        {/* Byline */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
              AS
            </div>
            <div>
              <div className="font-bold text-slate-900">{post.author}</div>
              <div className="text-[11px] text-slate-500">
                Independent Educational & Recruitment Analyst
              </div>
            </div>
          </div>
          <span className="text-[11px] text-slate-500">
            Published: {post.publishDate} · Permanent Guide
          </span>
        </div>
      </div>

      {/* Embedded Physical Fitness Test Countdown Widget (if Fitness category) */}
      {post.category === 'fitness' && (
        <PhysicalFitnessCountdown onNavigate={onNavigate} embedded={true} />
      )}

      {/* Main Content Sections */}
      <div className="space-y-6">
        {post.sections.map((sec, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs"
          >
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {sec.heading}
            </h2>

            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
              {sec.content}
            </div>

            {/* Structured Clean Data Table (Wide Table with Retained Box) */}
            {sec.table && (
              <div className="space-y-2 pt-3">
                {sec.table.title && (
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-3.5 bg-blue-700 rounded-xs inline-block"></span>
                    <span>{sec.table.title}</span>
                  </h3>
                )}
                <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left divide-y divide-slate-200 text-xs min-w-[620px]">
                      <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                        <tr>
                          {sec.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-3 text-slate-800 ${
                                  cIdx === 0
                                    ? 'font-semibold text-slate-900'
                                    : cIdx === 1 && cell.includes('60 Marks')
                                    ? 'font-bold text-emerald-800 bg-emerald-50/30'
                                    : cIdx === 2 && cell.includes('48 Marks')
                                    ? 'text-amber-800 bg-amber-50/20'
                                    : ''
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="sm:hidden">← Swipe horizontally to view full table data →</span>
                  {sec.table.caption && (
                    <span className="text-slate-500 italic ml-auto">{sec.table.caption}</span>
                  )}
                </div>
              </div>
            )}

            {/* Contextual CTA Button */}
            {sec.cta && (
              <div className="mt-4 p-5 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm border border-blue-800">
                <div className="space-y-1">
                  {sec.cta.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-widest text-blue-300 flex items-center gap-1.5">
                      <Ruler className="w-3 h-3 text-blue-300" />
                      <span>{sec.cta.badge}</span>
                    </span>
                  )}
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {sec.cta.heading}
                  </h4>
                  <p className="text-xs text-blue-100 max-w-xl leading-relaxed">
                    {sec.cta.subheading}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(sec.cta!.targetPath)}
                  className="px-4 py-2.5 bg-white hover:bg-blue-50 text-blue-900 font-bold text-xs rounded-lg shadow-sm transition-all duration-150 shrink-0 cursor-pointer flex items-center gap-1.5 hover:shadow-md"
                >
                  <span>{sec.cta.buttonText}</span>
                  <ArrowRight className="w-4 h-4 text-blue-900" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Checklist Box */}
      {post.checklistItems && post.checklistItems.length > 0 && (
        <div className="bg-blue-50/70 rounded-2xl border border-blue-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-base">
            <CheckCircle2 className="w-5 h-5 text-blue-700" />
            <span>Essential Action Checklist</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-800">
            {post.checklistItems.map((item, cIdx) => (
              <li key={cIdx} className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FAQs Section */}
      {post.faqs && post.faqs.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <HelpCircle className="w-5 h-5 text-blue-700" />
            <span>Frequently Asked Questions</span>
          </div>
          <div className="space-y-3">
            {post.faqs.map((faq, fIdx) => (
              <div key={fIdx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                  className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100/80 font-semibold text-xs text-slate-900 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === fIdx ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === fIdx && (
                  <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Evergreen Posts */}
      <div className="pt-4 border-t border-slate-200 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          More Evergreen Guides
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BLOG_POSTS.filter((p) => p.slug !== post.slug)
            .slice(0, 2)
            .map((rel) => (
              <div
                key={rel.slug}
                onClick={() => onNavigate(`/blog/${rel.slug}`)}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition-all cursor-pointer space-y-1.5"
              >
                <span className="text-[10px] font-bold text-blue-700 uppercase">{rel.categoryLabel}</span>
                <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                  {rel.title}
                </h4>
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                  <span>{rel.readingTime}</span>
                  <span className="text-blue-700 font-semibold">Read →</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Back Link */}
      <div className="pt-2 flex justify-between items-center text-xs">
        <button
          type="button"
          onClick={() => onNavigate('/blog')}
          className="text-blue-700 hover:underline font-semibold cursor-pointer"
        >
          ← Back to All Blog Articles
        </button>
        <button
          type="button"
          onClick={() => onNavigate('/corrections')}
          className="text-slate-500 hover:text-slate-800 cursor-pointer"
        >
          Report a factual correction on this guide
        </button>
      </div>
    </div>
  );
};
