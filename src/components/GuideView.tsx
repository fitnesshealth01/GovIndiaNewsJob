import React, { useState, useEffect } from 'react';
import { APPLICATION_GUIDES, ApplicationGuide } from '../content/guidesData';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileText,
  HelpCircle,
  Search,
  ShieldCheck,
  UserCheck,
  Ruler,
  ArrowRight,
} from 'lucide-react';
import {
  buildFAQPageSchema,
  buildBreadcrumbSchema,
  injectSchema,
} from '../utils/seoSchema';

interface GuideViewProps {
  slug?: string;
  onNavigate: (path: string) => void;
}

export const GuideView: React.FC<GuideViewProps> = ({ slug, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const guide = slug
    ? APPLICATION_GUIDES.find(
        (g) =>
          g.slug === slug ||
          (slug === 'army-1600-meter-running-standards-agniveer-guide' &&
            g.slug === 'army-1600-meter-running-time-agniveer-pft-standards') ||
          (slug === 'army-1600-meter-running-time-agniveer-pft-standards' &&
            g.slug === 'army-1600-meter-running-standards-agniveer-guide')
      )
    : null;

  useEffect(() => {
    if (!guide) return;
    const schemas: Record<string, unknown>[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.summary,
        author: {
          '@type': 'Person',
          name: guide.author,
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
        dateModified: '2026-10-05T08:00:00+05:30',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://govindianews.com/guides/${guide.slug}`,
        },
      },
      buildBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: guide.title, url: `/guides/${guide.slug}` },
      ]),
    ];

    if (guide.faqs && guide.faqs.length > 0) {
      schemas.push(buildFAQPageSchema(guide.faqs));
    }

    injectSchema(schemas);
  }, [guide]);

  // Directory Hub View
  if (!guide) {
    const filtered = APPLICATION_GUIDES.filter(
      (g) =>
        g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md text-xs font-semibold">
            Editorial Application Masterclass
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Government Recruitment Application Guides
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed max-w-3xl">
            Authoritative, deep-dive legal and administrative advisories designed to eliminate common documentation errors, clarify crucial cutoff dates, and guide applicants through central recruitment rules.
          </p>

          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search guides (e.g. OBC, checklist, rejection, roster)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((item) => (
            <div
              key={item.slug}
              onClick={() => onNavigate(`/guides/${item.slug}`)}
              className="p-6 bg-white rounded-2xl border border-stone-200 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span>{item.readingTime}</span>
                </div>
                <h2 className="font-bold text-base text-stone-900 leading-snug">
                  {item.title}
                </h2>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-blue-700 font-semibold">
                <span>Read Masterclass</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Standalone Single Guide View
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-xs text-stone-500">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-blue-700 cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <button
          onClick={() => onNavigate('/guides')}
          className="hover:text-blue-700 cursor-pointer"
        >
          Guides
        </button>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <span className="text-stone-900 font-medium truncate">{guide.title}</span>
      </div>

      {/* Guide Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md text-xs font-semibold">
            {guide.category}
          </span>
          <span className="text-stone-500 text-xs">
            {guide.readingTime} · Last updated: {guide.lastUpdated}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
          {guide.title}
        </h1>

        <p className="text-sm text-stone-600 leading-relaxed border-l-2 border-blue-600 pl-4 py-1 italic">
          {guide.summary}
        </p>

        {/* Byline */}
        <div className="pt-2 border-t border-stone-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
            AS
          </div>
          <div>
            <div className="text-xs font-bold text-stone-900">{guide.author}</div>
            <div className="text-[11px] text-stone-500">
              Verified against central statutory gazettes & DoPT memorandums
            </div>
          </div>
        </div>
      </div>

      {/* Guide Sections */}
      <div className="space-y-6">
        {guide.sections.map((sec, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs"
          >
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
              {sec.heading}
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed whitespace-pre-line space-y-3">
              {sec.content}
            </div>

            {/* Structured Clean Data Table (Wide Table with Retained Box) */}
            {sec.table && (
              <div className="space-y-2 pt-3">
                {sec.table.title && (
                  <h3 className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-3.5 bg-blue-700 rounded-xs inline-block"></span>
                    <span>{sec.table.title}</span>
                  </h3>
                )}
                <div className="rounded-xl border border-stone-200 overflow-hidden bg-white shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left divide-y divide-stone-200 text-xs min-w-[620px]">
                      <thead className="bg-stone-50 text-stone-700 font-bold uppercase tracking-wider text-[11px]">
                        <tr>
                          {sec.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 bg-white">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-stone-50/80 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-3 text-stone-800 ${
                                  cIdx === 0
                                    ? 'font-semibold text-stone-900'
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
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span className="sm:hidden">← Swipe horizontally to view full table data →</span>
                  {sec.table.caption && (
                    <span className="text-stone-500 italic ml-auto">{sec.table.caption}</span>
                  )}
                </div>
              </div>
            )}

            {/* Contextual Call-to-Action (CTA) Button */}
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

      {/* Interactive Checklist Box (if available) */}
      {guide.checklistItems && guide.checklistItems.length > 0 && (
        <div className="bg-blue-50/70 rounded-2xl border border-blue-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-base">
            <CheckCircle2 className="w-5 h-5 text-blue-700" />
            <span>Essential Action Checklist</span>
          </div>
          <ul className="space-y-2.5 text-xs text-stone-800">
            {guide.checklistItems.map((item, cIdx) => (
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

      {/* Official Government References */}
      {guide.officialReferences && guide.officialReferences.length > 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-base">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Official Government References & Policy Circulars</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guide.officialReferences.map((ref, rIdx) => (
              <a
                key={rIdx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-stone-200 hover:border-blue-400 bg-stone-50 hover:bg-white transition-all space-y-1 block"
              >
                <div className="text-xs font-semibold text-stone-900 flex items-center justify-between">
                  <span>{ref.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                </div>
                <div className="text-[11px] text-stone-500">{ref.authority}</div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* FAQs Section */}
      {guide.faqs && guide.faqs.length > 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-base">
            <HelpCircle className="w-5 h-5 text-blue-700" />
            <span>Frequently Asked Questions</span>
          </div>
          <div className="space-y-3">
            {guide.faqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="border border-stone-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                  className="w-full text-left p-4 bg-stone-50 hover:bg-stone-100/80 font-semibold text-xs text-stone-900 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="text-stone-400 font-bold ml-2">
                    {openFaq === fIdx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === fIdx && (
                  <div className="p-4 bg-white text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back to Guides */}
      <div className="pt-4 flex justify-between items-center text-xs">
        <button
          onClick={() => onNavigate('/guides')}
          className="text-blue-700 hover:underline font-semibold cursor-pointer"
        >
          ← Back to All Application Guides
        </button>
        <button
          onClick={() => onNavigate('/corrections')}
          className="text-stone-500 hover:text-stone-800 cursor-pointer"
        >
          Report a factual correction on this guide
        </button>
      </div>
    </div>
  );
};
