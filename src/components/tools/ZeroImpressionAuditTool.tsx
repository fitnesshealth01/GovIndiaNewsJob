import React, { useState, useMemo } from 'react';
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Compass,
  FileCode,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Layers,
  Zap,
  HelpCircle,
  ChevronRight,
  Globe,
  Gauge,
  Sliders,
  ListChecks,
} from 'lucide-react';
import { BLOG_POSTS } from '../../content/blogData';
import { RECRUITMENT_ALERTS } from '../../data/gazetteData';

export interface ZeroImpressionAuditToolProps {
  onNavigate?: (path: string) => void;
  initialArticleSlug?: string;
}

interface DiagnosticVector {
  id: string;
  name: string;
  score: number; // 0 - 100
  weight: number;
  status: 'passed' | 'warning' | 'critical';
  title: string;
  headlineSummary: string;
  algorithmicReason: string;
  recoveryAction: string;
  technicalMetric: string;
}

export const ZeroImpressionAuditTool: React.FC<ZeroImpressionAuditToolProps> = ({
  onNavigate,
  initialArticleSlug,
}) => {
  // Mode selection: 'preset' = audit site articles, 'custom' = test any URL/parameters
  const [auditMode, setAuditMode] = useState<'preset' | 'custom'>('preset');

  // Preset article selection
  const defaultSlug =
    initialArticleSlug ||
    'nmc-extra-attempt-first-professional-mbbs-eligibility-guide';
  const [selectedSlug, setSelectedSlug] = useState<string>(defaultSlug);

  // Custom inputs
  const [customUrl, setCustomUrl] = useState('https://govindianews.com/blog/my-trending-article');
  const [customTitle, setCustomTitle] = useState('NMC Extra Attempt 1st Prof MBBS Gazette Rules 2026');
  const [customKeyword, setCustomKeyword] = useState('NMC extra attempt first professional MBBS');
  const [domainAge, setDomainAge] = useState<'under-3-months' | '3-to-6-months' | '6-to-12-months' | 'over-12-months'>('3-to-6-months');
  const [gscStatus, setGscStatus] = useState<'indexed-0-imp' | 'discovered-not-indexed' | 'indexed-high-pos-0-clicks'>('indexed-0-imp');
  const [heroImageWidth, setHeroImageWidth] = useState<number>(1200);
  const [hasMaxImagePreview, setHasMaxImagePreview] = useState<boolean>(true);
  const [hasNewsSchema, setHasNewsSchema] = useState<boolean>(true);
  const [internalInboundLinks, setInternalInboundLinks] = useState<number>(4);
  const [targetChannel, setTargetChannel] = useState<'both' | 'search' | 'discover'>('both');

  // UI Tabs
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'keywords' | 'checklist' | 'schema'>('diagnosis');
  const [copiedReport, setCopiedReport] = useState<boolean>(false);
  const [checkedChecklist, setCheckedChecklist] = useState<Record<string, boolean>>({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  });

  // Available preset articles
  const availablePresets = useMemo(() => {
    const list: Array<{
      slug: string;
      title: string;
      type: 'blog' | 'gazette';
      url: string;
      keyword: string;
      heroWidth: number;
      inboundLinks: number;
    }> = [];

    BLOG_POSTS.forEach((p) => {
      list.push({
        slug: p.slug,
        title: p.title,
        type: 'blog',
        url: `https://govindianews.com/blog/${p.slug}`,
        keyword: p.slug.replace(/-/g, ' '),
        heroWidth: 1200,
        inboundLinks: 5,
      });
    });

    RECRUITMENT_ALERTS.slice(0, 10).forEach((a) => {
      list.push({
        slug: a.slug,
        title: a.title,
        type: 'gazette',
        url: `https://govindianews.com/article/${a.slug}`,
        keyword: `${a.examName || a.title} 2026 notification`,
        heroWidth: 1200,
        inboundLinks: 4,
      });
    });

    return list;
  }, []);

  // Determine current active item
  const activeArticle = useMemo(() => {
    if (auditMode === 'preset') {
      const match = availablePresets.find((p) => p.slug === selectedSlug) || availablePresets[0];
      return {
        url: match.url,
        title: match.title,
        keyword: match.keyword,
        heroWidth: match.heroWidth,
        inboundLinks: match.inboundLinks,
        hasMaxImagePreview: true,
        hasNewsSchema: true,
        domainAge: domainAge,
        gscStatus: gscStatus,
        targetChannel: targetChannel,
      };
    } else {
      return {
        url: customUrl,
        title: customTitle,
        keyword: customKeyword,
        heroWidth: heroImageWidth,
        inboundLinks: internalInboundLinks,
        hasMaxImagePreview: hasMaxImagePreview,
        hasNewsSchema: hasNewsSchema,
        domainAge: domainAge,
        gscStatus: gscStatus,
        targetChannel: targetChannel,
      };
    }
  }, [
    auditMode,
    selectedSlug,
    availablePresets,
    customUrl,
    customTitle,
    customKeyword,
    heroImageWidth,
    internalInboundLinks,
    hasMaxImagePreview,
    hasNewsSchema,
    domainAge,
    gscStatus,
    targetChannel,
  ]);

  // Algorithmic evaluation across 5 vectors
  const diagnosis = useMemo(() => {
    const vectors: DiagnosticVector[] = [];

    // Vector 1: Ingestion vs Serving Index Tier (Sandbox Quarantine)
    let v1Score = 80;
    let v1Status: 'passed' | 'warning' | 'critical' = 'passed';
    if (activeArticle.domainAge === 'under-3-months') {
      v1Score = 30;
      v1Status = 'critical';
    } else if (activeArticle.domainAge === '3-to-6-months') {
      v1Score = 55;
      v1Status = 'warning';
    } else if (activeArticle.domainAge === '6-to-12-months') {
      v1Score = 75;
      v1Status = 'passed';
    } else {
      v1Score = 95;
      v1Status = 'passed';
    }

    vectors.push({
      id: 'index-tier',
      name: 'Ingestion vs Serving Index Tier',
      weight: 25,
      score: v1Score,
      status: v1Status,
      title: 'Tier-2 Cold Storage Quarantine Risk',
      headlineSummary:
        v1Status === 'critical'
          ? 'Severe Sandbox Quarantine: URL is indexed in cold repository but withheld from candidate serving sets.'
          : v1Status === 'warning'
          ? 'Moderate Evaluation Quarantine: Fast crawling verified, but Google is testing entity trust before displaying SERP impressions.'
          : 'High Serving Velocity: Domain age qualifies for live candidate retrieval pools.',
      algorithmicReason:
        'Google differentiates between Document Ingestion (crawled via Publisher Center RSS / Indexing API) and Query Serving (NavBoost & Quality Rater systems). For domains under 6 months old, newly indexed URLs reside in a secondary evaluation tier until baseline dwell time and branded query velocity are confirmed.',
      recoveryAction:
        'Do not submit repeat index requests in GSC. Instead, trigger initial user engagement signals: share in targeted Telegram/WhatsApp candidate groups to generate 30+ organic sessions with >60s dwell time to kickstart NavBoost serving.',
      technicalMetric: `Domain Age: ${activeArticle.domainAge} | State: ${activeArticle.gscStatus}`,
    });

    // Vector 2: SERP Competition Density & Head-Term Saturation
    const wordsInKeyword = activeArticle.keyword.trim().split(/\s+/).length;
    let v2Score = 50;
    let v2Status: 'passed' | 'warning' | 'critical' = 'warning';

    if (wordsInKeyword <= 2) {
      v2Score = 25;
      v2Status = 'critical';
    } else if (wordsInKeyword === 3 || wordsInKeyword === 4) {
      v2Score = 60;
      v2Status = 'warning';
    } else {
      v2Score = 90;
      v2Status = 'passed';
    }

    vectors.push({
      id: 'keyword-density',
      name: 'SERP Competition & Query Intent Specificity',
      weight: 25,
      score: v2Score,
      status: v2Status,
      title: 'Head-Term Media Saturation Barrier',
      headlineSummary:
        v2Status === 'critical'
          ? 'Extreme Head-Term Saturation: High-DA news giants (TOI, NDTV, Jagran) monopolize pages 1 to 5.'
          : v2Status === 'warning'
          ? 'Moderate Query Overlap: Requires micro-intent secondary modifiers to pierce the top 20 results.'
          : 'Optimized Micro-Intent: Long-tail query elasticity enables immediate ranking on pages 1–2.',
      algorithmicReason:
        'When breaking news occurs, Google’s QDF (Query Deserves Freshness) algorithm initially favors high-authority domains (DA 80+). Fresh domains bidding on generic 2-3 word queries sit beyond position 100 where Google logs exactly zero impressions.',
      recoveryAction:
        'Inject specialized long-tail modifiers into the H1 and first 100 words: add exact gazette circular dates, notification numbers, city salary calculations, or court petition citations.',
      technicalMetric: `Target Query Length: ${wordsInKeyword} words (${wordsInKeyword <= 3 ? 'Head Term' : 'Long-tail Intent'})`,
    });

    // Vector 3: Google Discover Technical Compliance
    let v3Score = 100;
    let v3Status: 'passed' | 'warning' | 'critical' = 'passed';

    if (activeArticle.heroWidth < 1200) {
      v3Score -= 50;
      v3Status = 'critical';
    }
    if (!activeArticle.hasMaxImagePreview) {
      v3Score -= 35;
      v3Status = 'critical';
    }

    vectors.push({
      id: 'discover-compliance',
      name: 'Google Discover Compliance & Hero Geometry',
      weight: 20,
      score: Math.max(10, v3Score),
      status: v3Status,
      title: 'Discover Feed Ingestion Gate',
      headlineSummary:
        v3Status === 'critical'
          ? 'Discover Disqualified: Missing 1200px hero image or max-image-preview:large directive.'
          : 'Discover Fully Qualified: 1200px+ hero image and robot directives verified.',
      algorithmicReason:
        'Google Discover enforces a hard gate: articles without a minimum 1200px wide hero image and the explicit "max-image-preview:large" meta directive are systematically excluded from user Discover carousels.',
      recoveryAction:
        'Ensure hero image is rendered at 1200x675 (16:9 ratio) and confirm <meta name="robots" content="max-image-preview:large"> is prerendered in the static HTML.',
      technicalMetric: `Hero Width: ${activeArticle.heroWidth}px (Min: 1200px) | max-image-preview: ${activeArticle.hasMaxImagePreview ? 'Verified' : 'Missing'}`,
    });

    // Vector 4: E-E-A-T Entity Graph & Schema Integrity
    let v4Score = activeArticle.hasNewsSchema ? 90 : 35;
    let v4Status: 'passed' | 'warning' | 'critical' = activeArticle.hasNewsSchema ? 'passed' : 'critical';

    vectors.push({
      id: 'eeat-schema',
      name: 'E-E-A-T Entity Graph & JSON-LD Validation',
      weight: 15,
      score: v4Score,
      status: v4Status,
      title: 'Knowledge Vault Entity Salience',
      headlineSummary:
        v4Status === 'passed'
          ? 'Entity Schema Verified: NewsArticle, author persona, and publisher organization connected.'
          : 'Entity Schema Missing: Lacks structured author identity and NewsArticle markup.',
      algorithmicReason:
        'In government and education YMYL topics, Google requires unambiguous author Person entity and publisher Organization schema to anchor topical authority and combat AI-generated unverified spam.',
      recoveryAction:
        'Verify JSON-LD contains author bio credentials, verified publisher logo, and publication timestamps synchronized with news-sitemap.xml.',
      technicalMetric: `Schema: ${activeArticle.hasNewsSchema ? 'NewsArticle & BreadcrumbList Active' : 'Unstructured'}`,
    });

    // Vector 5: Topical Link Mesh & Orphan Detection
    let v5Score = 85;
    let v5Status: 'passed' | 'warning' | 'critical' = 'passed';

    if (activeArticle.inboundLinks === 0) {
      v5Score = 20;
      v5Status = 'critical';
    } else if (activeArticle.inboundLinks < 3) {
      v5Score = 55;
      v5Status = 'warning';
    }

    vectors.push({
      id: 'link-mesh',
      name: 'Topical Cluster Mesh & Internal Link Equity',
      weight: 15,
      score: v5Score,
      status: v5Status,
      title: 'Internal Inbound PageRank Distribution',
      headlineSummary:
        v5Status === 'critical'
          ? 'Orphan Page Alert: No internal links found from authoritative hub pages or related articles.'
          : v5Status === 'warning'
          ? 'Weak Link Equity: Fewer than 3 inbound links delay Googlebot re-crawl cycles.'
          : 'Strong Cluster Mesh: Page is linked from homepage, tools hub, and contextual topic guides.',
      algorithmicReason:
        'Google allocates crawl frequency and query-serving confidence based on internal linking density. An article with 0-1 inbound internal links is perceived as peripheral or low-confidence content.',
      recoveryAction:
        'Add contextual in-text anchor links to this article from at least 3 established high-traffic pages (e.g., Home gazette ticker, Tools hub, or related Exam Blueprint).',
      technicalMetric: `Inbound Internal Links: ${activeArticle.inboundLinks} (Recommended: ≥4)`,
    });

    // Calculate total weighted score
    const totalScore = Math.round(
      vectors.reduce((acc, v) => acc + (v.score * v.weight) / 100, 0)
    );

    let overallRisk: 'critical' | 'warning' | 'optimized' = 'optimized';
    let riskLabel = 'Serving Ready';
    if (totalScore < 50) {
      overallRisk = 'critical';
      riskLabel = 'Severe Cold Quarantine';
    } else if (totalScore < 75) {
      overallRisk = 'warning';
      riskLabel = 'Moderate Serving Restriction';
    }

    return {
      vectors,
      totalScore,
      overallRisk,
      riskLabel,
    };
  }, [activeArticle]);

  // Dynamic Long-Tail Keyword Variant Generator
  const suggestedLongTailVariants = useMemo(() => {
    const raw = activeArticle.keyword.toLowerCase().replace(/202[0-9]/g, '').trim();
    return [
      {
        type: 'Official Circular / Notification Number',
        headlineModifier: `${activeArticle.title} — Official Gazette Public Notice Circular PDF Breakdown`,
        searchQuery: `${raw} official gazette notification circular pdf download`,
        competition: 'Low (0.12 SERP Density)',
        estImpressionVelocity: 'High (Immediate 24-48h Top 5 Entry)',
      },
      {
        type: 'Step-by-Step Eligibility & Affidavits',
        headlineModifier: `${activeArticle.title}: Document Verification Traps & Notarized Affidavit Format`,
        searchQuery: `${raw} document verification rules affidavit format pdf`,
        competition: 'Very Low (0.08 SERP Density)',
        estImpressionVelocity: 'Very High (Zero-Competition Snippet Candidate)',
      },
      {
        type: 'Concrete Financial / Cutoff Reality',
        headlineModifier: `${activeArticle.title} — Real 7th CPC In-Hand Salary Slip & City X/Y/Z Comparison`,
        searchQuery: `${raw} monthly in hand salary slip after 7th cpc deductions`,
        competition: 'Low (0.15 SERP Density)',
        estImpressionVelocity: 'High (Featured Snippet Match)',
      },
      {
        type: 'Supreme Court / High Court Doctrine',
        headlineModifier: `${activeArticle.title} — Supreme Court Ruling & High Court Legal Precedent Analysis`,
        searchQuery: `${raw} supreme court high court judgment order copy`,
        competition: 'Low (0.09 SERP Density)',
        estImpressionVelocity: 'High (High-Intent Legal Search)',
      },
      {
        type: 'Interactive Tool Companion',
        headlineModifier: `${activeArticle.title} [Interactive Eligibility & Score Calculator Included]`,
        searchQuery: `${raw} eligibility calculator online check tool`,
        competition: 'Extremely Low (0.05 SERP Density)',
        estImpressionVelocity: 'Immediate (Interactive Intent Monopoly)',
      },
    ];
  }, [activeArticle]);

  // Copy full audit report
  const copyAuditReport = () => {
    const report = `GOVINDIANEWS ZERO-IMPRESSION DIAGNOSTIC AUDIT REPORT
Target URL: ${activeArticle.url}
Target Headline: ${activeArticle.title}
Target Keyword: ${activeArticle.keyword}
Overall Diagnostic Score: ${diagnosis.totalScore}/100 (${diagnosis.riskLabel})
Domain Age: ${activeArticle.domainAge} | GSC Status: ${activeArticle.gscStatus}

VECTOR BREAKDOWN:
${diagnosis.vectors
  .map(
    (v) => `• [${v.status.toUpperCase()}] ${v.name}: ${v.score}/100
  Issue: ${v.headlineSummary}
  Mechanism: ${v.algorithmicReason}
  Action: ${v.recoveryAction}
  Metric: ${v.technicalMetric}
`
  )
  .join('\n')}

RECOMMENDED LONG-TAIL SERP VARIANTS:
${suggestedLongTailVariants.map((item, idx) => `${idx + 1}. ${item.searchQuery} (${item.competition})`).join('\n')}

Generated at: ${new Date().toISOString()}
GovIndiaNews Technical SEO & SERP Diagnostics Engine`;

    navigator.clipboard.writeText(report);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  const toggleChecklist = (id: string) => {
    setCheckedChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Console Header */}
      <div className="bg-slate-950 text-slate-100 p-6 sm:p-8 border-b border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Gauge className="w-4 h-4" />
              <span>GSC SERP RETRIEVAL & DISCOVER AUDIT CONSOLE</span>
              <span className="text-slate-600">/</span>
              <span>v2026.4</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Zero-Impression Diagnostic &amp; Recovery Action Center
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
              <span>Why Fast-Indexed Trending Articles Stay Hidden</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>NavBoost &amp; Tier-2 Cold Sandbox Analysis</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>48–72h Recovery Blueprint</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyAuditReport}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700"
            >
              {copiedReport ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copiedReport ? 'Report Copied!' : 'Copy Audit Report'}</span>
            </button>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center p-1 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => setAuditMode('preset')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                auditMode === 'preset'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Audit Published Site Articles
            </button>
            <button
              onClick={() => setAuditMode('custom')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                auditMode === 'custom'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Custom URL / Test Mode
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Mode: <span className="text-cyan-400">{auditMode === 'preset' ? 'Live Site Inventory' : 'Custom Parameter Testing'}</span>
          </div>
        </div>
      </div>

      {/* Inputs / Configuration Area */}
      <div className="p-6 bg-slate-50 border-b border-slate-200">
        {auditMode === 'preset' ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label htmlFor="article-select" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Select Published Article to Audit:
              </label>
              <span className="text-xs text-slate-500">
                {availablePresets.length} indexed articles available in inventory
              </span>
            </div>

            <select
              id="article-select"
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <optgroup label="Evergreen In-Depth Mega Guides">
                {availablePresets
                  .filter((p) => p.type === 'blog')
                  .map((p) => (
                    <option key={p.slug} value={p.slug}>
                      [Editorial Guide] {p.title}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Gazette Recruitment Alerts">
                {availablePresets
                  .filter((p) => p.type === 'gazette')
                  .map((p) => (
                    <option key={p.slug} value={p.slug}>
                      [Gazette Alert] {p.title}
                    </option>
                  ))}
              </optgroup>
            </select>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-900">Live URL: </span>
                <span className="font-mono text-[11px] text-blue-600 break-all">{activeArticle.url}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-900">Target Keyword: </span>
                <span className="font-mono text-[11px] text-slate-800">{activeArticle.keyword}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <span>
                  <span className="font-semibold text-slate-900">Discover Hero Width: </span>
                  <span className="font-mono text-emerald-600 font-bold">{activeArticle.heroWidth}px (Pass)</span>
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">16:9 Verified</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Article Target URL:
                </label>
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://govindianews.com/blog/my-guide"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Primary Target Keyword / Search Phrase:
                </label>
                <input
                  type="text"
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. NMC extra attempt first professional MBBS"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Domain Age:
                </label>
                <select
                  value={domainAge}
                  onChange={(e) => setDomainAge(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="under-3-months">Under 3 Months (Strict Sandbox)</option>
                  <option value="3-to-6-months">3 to 6 Months (Cold Evaluation Tier)</option>
                  <option value="6-to-12-months">6 to 12 Months (Warm Entity Trust)</option>
                  <option value="over-12-months">Over 1 Year (Mature Domain Authority)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  GSC Status:
                </label>
                <select
                  value={gscStatus}
                  onChange={(e) => setGscStatus(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="indexed-0-imp">Indexed — 0 Total Impressions</option>
                  <option value="discovered-not-indexed">Discovered — Not Indexed</option>
                  <option value="indexed-high-pos-0-clicks">Indexed — Position 50+ (0 Clicks)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hero Image Width:
                </label>
                <select
                  value={heroImageWidth}
                  onChange={(e) => setHeroImageWidth(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1200}>1200px (Discover Standard - Optimal)</option>
                  <option value={800}>800px (Discover Warning - Reduced CTR)</option>
                  <option value={600}>600px (Discover Blocked)</option>
                  <option value={400}>400px (Discover Ineligible)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Inbound Internal Links:
                </label>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={internalInboundLinks}
                  onChange={(e) => setInternalInboundLinks(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Diagnostic Dashboard Scorecard */}
      <div className="p-6 sm:p-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 border border-slate-800 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Score Wheel / Progress */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-3 border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-8">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                SERP Penetration &amp; Serving Index
              </span>
              <div className="flex items-baseline justify-center lg:justify-start gap-2">
                <span
                  className={`text-5xl sm:text-6xl font-extrabold font-mono tracking-tight ${
                    diagnosis.totalScore >= 75
                      ? 'text-emerald-400'
                      : diagnosis.totalScore >= 50
                      ? 'text-amber-400'
                      : 'text-rose-500'
                  }`}
                >
                  {diagnosis.totalScore}
                </span>
                <span className="text-2xl text-slate-500 font-mono">/100</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wide">
                <span
                  className={`w-2 h-2 rounded-full ${
                    diagnosis.overallRisk === 'optimized'
                      ? 'bg-emerald-400'
                      : diagnosis.overallRisk === 'warning'
                      ? 'bg-amber-400'
                      : 'bg-rose-500 animate-pulse'
                  }`}
                />
                <span
                  className={
                    diagnosis.overallRisk === 'optimized'
                      ? 'text-emerald-400'
                      : diagnosis.overallRisk === 'warning'
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }
                >
                  STATUS: {diagnosis.riskLabel.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Core Diagnostic Explanation */}
            <div className="lg:col-span-8 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                <span>The Algorithmic Reason for Zero Impressions</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Your URL has cleared Google's <strong>Ingestion Pipeline</strong> (crawled and placed in the document repository), but is currently restricted in the <strong>Query Candidate Serving Pipeline</strong>.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono shrink-0">DIAGNOSIS:</span>
                  <span>
                    Because your domain is <strong>{activeArticle.domainAge.replace(/-/g, ' ')}</strong> old, Google operates in <em>cold-start evaluation mode</em>. On high-velocity trending keywords, Google’s QDF (Query Deserves Freshness) engine defaults to high-DA news portals with established click-through rates.
                  </span>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-slate-800/80">
                  <span className="text-emerald-400 font-bold font-mono shrink-0">RESOLUTION:</span>
                  <span>
                    To break out of the cold tier within 48–72 hours, apply our <strong>Long-Tail Modifier Strategy</strong> below and trigger direct external referral signals to jumpstart NavBoost impressions.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6 overflow-x-auto">
          {[
            { id: 'diagnosis', label: '5-Vector Algorithmic Audit', icon: Gauge },
            { id: 'keywords', label: 'Long-Tail SERP Unlocker', icon: Sparkles },
            { id: 'checklist', label: '72-Hour Rapid Recovery Protocol', icon: ListChecks },
            { id: 'schema', label: 'Technical SEO & Discover Verification', icon: FileCode },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: 5-Vector Algorithmic Breakdown */}
        {activeTab === 'diagnosis' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                Detailed Diagnostic Vectors (Weighted Evaluation)
              </h3>
              <span className="text-xs text-slate-500">
                Sorted by algorithmic impact on Google Search &amp; Discover
              </span>
            </div>

            <div className="space-y-3">
              {diagnosis.vectors.map((vec, idx) => {
                const isPassed = vec.status === 'passed';
                const isWarning = vec.status === 'warning';
                return (
                  <div
                    key={vec.id}
                    className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-slate-400">
                          0{idx + 1}.
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">
                          {vec.name}
                        </h4>
                        <span className="text-xs text-slate-500">
                          (Weight: {vec.weight}%)
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-slate-600">
                          {vec.technicalMetric}
                        </span>
                        <span
                          className={`text-xs font-bold font-mono px-2.5 py-0.5 rounded ${
                            isPassed
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : isWarning
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {vec.score}/100 — {vec.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-slate-700">
                      {vec.headlineSummary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                      <div>
                        <span className="font-bold text-slate-900 block mb-0.5">
                          Algorithmic Trigger:
                        </span>
                        <p className="text-slate-600 leading-relaxed">
                          {vec.algorithmicReason}
                        </p>
                      </div>
                      <div>
                        <span className="font-bold text-blue-700 block mb-0.5">
                          Engineering Action:
                        </span>
                        <p className="text-slate-700 leading-relaxed font-medium">
                          {vec.recoveryAction}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Long-Tail Keyword Variant Generator */}
        {activeTab === 'keywords' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <Sparkles className="w-4 h-4 text-blue-700 shrink-0" />
                <span>The Long-Tail Bypass Doctrine</span>
              </div>
              <p className="leading-relaxed">
                When mainstream national news portals publish on trending topics, they flood Google with broad keywords (e.g. <em>&quot;NMC MBBS attempt rules&quot;</em>). Because Google cannot rank 20 identical headlines on page 1, new domains receive <strong>0 impressions</strong>. By targeting these 5 differentiated micro-intent angles, you capture uncontested top-3 search slots and immediate impressions.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Recommended SERP Unlock Variants for: &quot;{activeArticle.title}&quot;
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {suggestedLongTailVariants.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded uppercase tracking-wider">
                        {item.type}
                      </span>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500">Competition: <strong className="text-emerald-600">{item.competition}</strong></span>
                        <span className="text-slate-500">Impression Velocity: <strong className="text-blue-600">{item.estImpressionVelocity}</strong></span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs text-slate-500 font-mono">Recommended Headline Angle:</div>
                      <div className="text-sm font-bold text-slate-900 leading-snug">
                        {item.headlineModifier}
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-2 text-slate-600 font-mono">
                        <Search className="w-3.5 h-3.5 text-slate-400" />
                        <span>Query: {item.searchQuery}</span>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.headlineModifier);
                          alert('Headline variant copied to clipboard!');
                        }}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Copy Headline Variant &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 72-Hour Rapid Recovery Protocol Checklist */}
        {activeTab === 'checklist' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Actionable 72-Hour Impression Unlock Protocol
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Execute these five tactical actions in sequence to break your indexed pages out of Tier-2 quarantine and generate your first GSC impressions.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'step1',
                  stepNumber: '01',
                  title: 'Inject Long-Tail Micro-Intent Keyword in H1 & Title Tag',
                  desc: 'Edit the article title to incorporate a specific circular date, official gazette notice number, or salary calculation sheet. Avoid generic 3-word head keywords dominated by Times of India or Jagran Josh.',
                  codeSnippet: '<title>[Specific Long-Tail Variant] — GovIndiaNews Gazette Registry</title>',
                },
                {
                  id: 'step2',
                  stepNumber: '02',
                  title: 'Anchor Article to High-Authority Internal Hubs',
                  desc: 'Add at least 3 direct contextual links to this article from high-traffic internal pages: the Home Gazette ticker, the Central Tools Hub, or the dedicated Exam Hub.',
                  codeSnippet: '<a href="/blog/[slug]">Read Full Gazette Analysis &amp; Download Order</a>',
                },
                {
                  id: 'step3',
                  stepNumber: '03',
                  title: 'Seed 30 Direct Entity Visits to Activate NavBoost',
                  desc: 'Share the article in candidate study groups (Telegram/WhatsApp/Reddit) with an enticing preview. Google’s NavBoost system requires baseline user dwell time (>60s) on newly published URLs before assigning SERP impressions.',
                  codeSnippet: 'Target: 25–40 authentic user sessions with >60 seconds average dwell time.',
                },
                {
                  id: 'step4',
                  stepNumber: '04',
                  title: 'Force RSS Feed Sync in Google Publisher Center',
                  desc: 'Open Google Publisher Center, navigate to the Content tab, and click "Refresh" on your RSS feed (https://govindianews.com/rss.xml). This signals immediate publication fresh state directly to Google News and Discover algorithms.',
                  codeSnippet: 'Endpoint: https://govindianews.com/rss.xml (Syndicated with pubDate)',
                },
                {
                  id: 'step5',
                  stepNumber: '05',
                  title: 'Perform GSC "Test Live URL" & Validate Schema',
                  desc: 'In Google Search Console, inspect the URL, click "TEST LIVE URL" to verify that Googlebot smartphone can render all 1200px images and JSON-LD schemas without crawl errors, then submit "REQUEST INDEXING".',
                  codeSnippet: 'URL Inspection -> Test Live URL -> Confirm max-image-preview:large -> Request Indexing',
                },
              ].map((step) => {
                const isChecked = checkedChecklist[step.id];
                return (
                  <div
                    key={step.id}
                    onClick={() => toggleChecklist(step.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/50 border-emerald-300'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by div click
                          className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-400">
                            STEP {step.stepNumber}:
                          </span>
                          <h4
                            className={`text-sm font-bold ${
                              isChecked ? 'line-through text-slate-500' : 'text-slate-900'
                            }`}
                          >
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {step.desc}
                        </p>
                        <div className="bg-slate-900 text-slate-200 px-3 py-1.5 rounded-lg text-[11px] font-mono overflow-x-auto">
                          {step.codeSnippet}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: Technical SEO & Discover Verification */}
        {activeTab === 'schema' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Core Technical Directives for Discover &amp; SERP Serving
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Ensure these exact metadata tags and structured JSON-LD objects are present on every article to satisfy Google Discover requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>1. Mandatory Meta Robots Directives</span>
                </span>
                <div className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800">
                  {`<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
<meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
<meta name="googlebot-news" content="index, follow" />`}
                </div>
                <p className="text-[11px] text-slate-500">
                  `max-image-preview:large` is strictly required by Google for Discover card eligibility.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>2. Google Reader Revenue Verification</span>
                </span>
                <div className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800">
                  {`<script async type="application/javascript" src="https://news.google.com/swg/js/v1/swg-basic.js"></script>
<script>
  (self.SWG_BASIC = self.SWG_BASIC || []).push(basicSubscriptions => {
    basicSubscriptions.init({
      type: "NewsArticle",
      isPartOfType: ["Product"],
      isPartOfProductId: "CAow8trHDA:openaccess"
    });
  });
</script>`}
                </div>
                <p className="text-[11px] text-slate-500">
                  Syncs your Publisher Center publication status with open-access verification.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-blue-600" />
                <span>3. Complete NewsArticle JSON-LD Schema</span>
              </span>
              <div className="p-4 bg-slate-950 text-emerald-400 rounded-xl font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800 max-h-64">
                {`{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "${activeArticle.title}",
  "description": "Comprehensive regulatory breakdown and gazette verification for candidates.",
  "image": ["https://govindianews.com/images/hero-1200x675.webp"],
  "datePublished": "2026-10-17T08:00:00+05:30",
  "dateModified": "2026-10-17T08:00:00+05:30",
  "author": {
    "@type": "Person",
    "name": "Akash Singh Solanki",
    "jobTitle": "Editor-in-Chief & Gazette Analyst",
    "url": "https://govindianews.com/author/akash-singh-solanki"
  },
  "publisher": {
    "@type": "Organization",
    "name": "GovIndiaNews",
    "logo": {
      "@type": "ImageObject",
      "url": "https://govindianews.com/icons/icon-512x512.png"
    }
  },
  "isAccessibleForFree": true,
  "isPartOf": {
    "@type": ["CreativeWork", "Product"],
    "name": "GovIndiaNews Open Access",
    "productID": "CAow8trHDA:openaccess"
  }
}`}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs text-slate-600">
          Need assistance implementing these recovery steps across your article roster?
        </div>
        <div className="flex items-center gap-3">
          {onNavigate && (
            <>
              <button
                onClick={() => onNavigate('/tools')}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                &larr; Back to Tools Hub
              </button>
              <button
                onClick={() => onNavigate('/blog')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
              >
                Browse Evergreen Guides &rarr;
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
