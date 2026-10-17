import React, { useState, useEffect } from 'react';
import { ZeroImpressionAuditTool } from './ZeroImpressionAuditTool';
import {
  Gauge,
  HelpCircle,
  ChevronDown,
  ShieldAlert,
  Search,
  Sparkles,
  TrendingUp,
  Globe,
  FileText,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { buildFAQPageSchema, injectSchema, buildBreadcrumbSchema } from '../../utils/seoSchema';
import { NavLink } from '../NavLink';

interface ZeroImpressionAuditPageProps {
  onNavigate: (path: string) => void;
}

export const ZeroImpressionAuditPage: React.FC<ZeroImpressionAuditPageProps> = ({
  onNavigate,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Why does Google Search Console say "URL is on Google" but report zero total impressions?',
      answer:
        'Being "Indexed" only confirms that Googlebot successfully fetched, parsed, and stored your HTML in its secondary document repository. It does NOT mean the page has passed Google’s serving filter. Google separates crawling/indexing from query candidate retrieval. For newer domains (under 6 months old), Google’s NavBoost and quality scoring systems withhold the page from candidate serving pools until initial baseline entity trust signals (such as direct visits, branded search queries, or high dwell-time sessions) are observed.',
    },
    {
      question: 'Why do trending topics get dominated by big news websites even when our content is published first?',
      answer:
        'When breaking news or trending topics surge, Google triggers its QDF (Query Deserves Freshness) algorithm. In high-velocity query spaces, Google heavily biases initial candidate retrieval toward Tier-1 national media domains with high Domain Authority (DA 80+) because historical click-through rates (CTR) and low bounce rates are already proven. Independent or newer portals targeting generic 2-3 word queries are placed at position 100+, where Google displays exactly zero impressions.',
    },
    {
      question: 'How do long-tail micro-intent keywords bypass high-DA media dominance?',
      answer:
        'Mainstream news portals typically publish short, hurried articles targeting generic head terms (e.g. "NMC MBBS extra attempt rules"). They rarely target granular intent variants like specific gazette circular numbers, notarized affidavit formatting requirements, exact 7th CPC city-wise salary calculations, or court petition citations. By structuring your H1 and title around these micro-intent modifiers, your page bypasses the crowded head-term auction and enters page 1 for specific high-converting searches within 24–48 hours.',
    },
    {
      question: 'What are the strict technical prerequisites for an article to appear on Google Discover?',
      answer:
        'Google Discover is an algorithmic push feed rather than a query-driven search engine. To qualify: (1) The hero image must be at least 1200px wide, preferably in a 16:9 aspect ratio; (2) The page must include the explicit meta robots tag: <meta name="robots" content="max-image-preview:large">; (3) The page must feature valid NewsArticle or Article schema with a verifiable author and publisher entity; and (4) The publication must have an active, validated RSS feed registered in Google Publisher Center.',
    },
    {
      question: 'What immediate actions can an editor take within the first 72 hours of publishing?',
      answer:
        'Execute three key actions: First, link the new article from at least 3 high-traffic internal hub pages (e.g., Tools Hub, Exam Blueprint, or Home Gazette Ticker) to distribute internal link equity. Second, seed 25–40 authentic reading sessions by sharing the guide directly in candidate study groups (Telegram/WhatsApp) to register initial dwell time with NavBoost. Third, trigger a manual RSS refresh in Google Publisher Center to ensure immediate news ingestion.',
    },
  ];

  useEffect(() => {
    injectSchema([
      buildBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Exam Calculators & Utilities', url: '/tools' },
        { name: 'Zero-Impression Diagnostic & Action Center', url: '/tools/zero-impression-audit' },
      ]),
      buildFAQPageSchema(faqs),
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Google Search Console Zero-Impression Diagnostic & Recovery Action Center',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All Modern Web Browsers',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Algorithmic diagnostic engine and recovery action center for webmasters and editors facing zero impressions on fast-indexed trending articles in Google Search and Discover.',
      },
    ]);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-blue-600 transition-colors"
        >
          Home
        </button>
        <span aria-hidden="true">/</span>
        <button
          onClick={() => onNavigate('/tools')}
          className="hover:text-blue-600 transition-colors"
        >
          Exam Calculators
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-slate-900 font-semibold">Zero-Impression Diagnostic</span>
      </nav>

      {/* Main Page Header */}
      <header className="border-b border-slate-200 pb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded font-mono">
            SEARCH CONSOLE &amp; DISCOVER DIAGNOSTICS
          </span>
          <span className="text-xs text-slate-500">
            Updated October 2026 · Based on Google Search Serving &amp; Discover Guidelines
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Google Search Console Zero-Impression Diagnostic &amp; Recovery Action Center
        </h1>
        <p className="text-base text-slate-600 max-w-4xl leading-relaxed">
          A specialized technical audit tool designed for digital publishers and recruitment news editors. Uncover why trending articles that get indexed in minutes still show <strong>zero impressions</strong> in Google Search Console, and execute tactical recovery actions to unlock Tier-1 candidate serving pools.
        </p>
      </header>

      {/* Embedded Interactive Audit Tool */}
      <section>
        <ZeroImpressionAuditTool onNavigate={onNavigate} />
      </section>

      {/* Educational & Editorial Reference Grid */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">
            The Science of Google Search Ingestion vs. Candidate Serving
          </h2>
          <p className="text-xs text-slate-500">
            Why instant indexing does not equate to instant visibility on Google
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-mono">
                1
              </span>
              <span>Crawling &amp; Ingestion</span>
            </div>
            <p className="leading-relaxed">
              Googlebot discovers your page via your XML sitemap or Google Publisher Center RSS feed within minutes. The HTML document is analyzed, structured data is extracted, and the URL is assigned an internal Document ID in Google&apos;s index.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-mono">
                2
              </span>
              <span>The Serving Filter Gate</span>
            </div>
            <p className="leading-relaxed">
              When a user submits a search query, Google doesn&apos;t search its entire index of billions of pages. It queries a tight <em>candidate serving pool</em>. For fresh domains, newly indexed pages sit in cold Tier-2 storage until basic entity signals are verified.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-mono">
                3
              </span>
              <span>NavBoost Activation</span>
            </div>
            <p className="leading-relaxed">
              Google&apos;s NavBoost system monitors real-world user interactions: query clicks, dwell time, and re-search behavior. Once a new page demonstrates initial engagement without immediate pogo-stick bounces, it graduates into regular SERP candidate rotation.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span>Frequently Asked Questions on Google Impressions &amp; Discover</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Cross-Link Navigation */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 text-xs text-slate-600 space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">
          Related Editorial Guides &amp; Authoritative Gazettes
        </h3>
        <p className="leading-relaxed">
          Inspect how these live evergreen guides and recruitment alerts are structured with complete JSON-LD schemas, 1200px hero images, and long-tail query anchors:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <NavLink
            href="/blog/skip-college-for-central-govt-jobs-after-12th-salary-reality-check"
            onNavigate={onNavigate}
            className="p-3 bg-slate-50 hover:bg-blue-50 rounded-lg border border-slate-200 transition-colors block text-slate-900 font-semibold"
          >
            12th Pass ₹52K Govt Jobs &rarr;
          </NavLink>
          <NavLink
            href="/blog/nda-vs-cds-vs-afcat-ssb-selection-secrets-officer-salary-reality"
            onNavigate={onNavigate}
            className="p-3 bg-slate-50 hover:bg-blue-50 rounded-lg border border-slate-200 transition-colors block text-slate-900 font-semibold"
          >
            NDA vs CDS SSB Secrets &rarr;
          </NavLink>
          <NavLink
            href="/blog/upsc-ias-vs-ssc-cgl-inspector-brutal-salary-power-workload-reality"
            onNavigate={onNavigate}
            className="p-3 bg-slate-50 hover:bg-blue-50 rounded-lg border border-slate-200 transition-colors block text-slate-900 font-semibold"
          >
            UPSC IAS vs SSC CGL Reality &rarr;
          </NavLink>
          <NavLink
            href="/blog/nmc-extra-attempt-first-professional-mbbs-eligibility-guide"
            onNavigate={onNavigate}
            className="p-3 bg-slate-50 hover:bg-blue-50 rounded-lg border border-slate-200 transition-colors block text-slate-900 font-semibold"
          >
            NMC MBBS Mercy Attempt Guide &rarr;
          </NavLink>
        </div>
      </section>
    </div>
  );
};
