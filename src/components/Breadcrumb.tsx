import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { RECRUITMENT_ALERTS } from '../data/gazetteData';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  customTitle?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  currentPath,
  onNavigate,
  customTitle,
}) => {
  // Derive breadcrumb hierarchy
  const items: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];

  if (currentPath.startsWith('/article/')) {
    const slug = currentPath.replace('/article/', '');
    const article = RECRUITMENT_ALERTS.find((a) => a.slug === slug || a.id === slug);

    if (article) {
      const categoryMap: Record<string, { label: string; path: string }> = {
        jobs: { label: 'Latest Jobs', path: '/jobs' },
        'admit-card': { label: 'Admit Cards', path: '/admit-card' },
        'cut-off': { label: 'Cut-Off Marks', path: '/cut-off' },
        'answer-key': { label: 'Answer Keys', path: '/answer-key' },
        result: { label: 'Results', path: '/result' },
      };

      const parent = categoryMap[article.category] || { label: 'Recruitments', path: '/jobs' };
      items.push({ label: parent.label, path: parent.path });
      items.push({
        label: customTitle || article.title,
        isCurrent: true,
      });
    } else {
      items.push({ label: 'Recruitments', path: '/jobs' });
      items.push({ label: 'Gazette Notice', isCurrent: true });
    }
  } else if (currentPath.startsWith('/tools/')) {
    items.push({ label: 'Exam Calculators', path: '/tools' });
    const sub = currentPath.replace('/tools/', '');
    const toolTitles: Record<string, string> = {
      salary: '7th CPC Salary Calculator',
      'photo-checker': 'Photo & Signature Format Checker',
      relaxation: 'Category & Fee Relaxation Calculator',
      age: 'Age Cut-off Calculator',
      marking: 'Negative Marking Penalty Calculator',
      height: 'Physical Height & Standards Checker',
      'pft-countdown': 'Physical Fitness Test (PFT) Countdown',
      rank: 'Rank & Normalization Predictor',
      eligibility: 'Instant Eligibility Matcher',
      'rich-snippet-preview': 'Google Rich Snippet & Schema Inspector',
      seo: 'Google Rich Snippet & Schema Inspector',
    };
    items.push({
      label: toolTitles[sub] || 'Calculator Utility',
      isCurrent: true,
    });
  } else if (currentPath.startsWith('/blog/')) {
    items.push({ label: 'Evergreen Blog', path: '/blog' });
    items.push({
      label: customTitle || 'Blog Article',
      isCurrent: true,
    });
  } else if (currentPath === '/blog') {
    items.push({ label: 'Evergreen Blog', isCurrent: true });
  } else if (currentPath.startsWith('/guides/')) {
    items.push({ label: 'Application Guides', path: '/guides' });
    items.push({
      label: customTitle || 'Application Guide',
      isCurrent: true,
    });
  } else if (currentPath === '/guides') {
    items.push({ label: 'Application Guides', isCurrent: true });
  } else if (currentPath.startsWith('/trust/')) {
    items.push({ label: 'Trust & Ethics', path: '/trust/editorial' });
    const sub = currentPath.replace('/trust/', '');
    const trustTitles: Record<string, string> = {
      editorial: 'Editorial Policy & Standards',
      grievance: 'Statutory Grievance Redressal Officer',
      factcheck: 'Fact-Checking & Rapid Correction',
      authors: 'Editorial Board & Authors',
    };
    items.push({
      label: trustTitles[sub] || 'Trust Hub',
      isCurrent: true,
    });
  } else if (currentPath === '/tools') {
    items.push({ label: 'Exam Calculators', isCurrent: true });
  } else if (currentPath.startsWith('/mock-test') || currentPath === '/mock-tests') {
    items.push({ label: 'CBT-Style Practice Test', isCurrent: true });
  } else if (currentPath === '/jobs') {
    items.push({ label: 'Latest Govt Jobs 2026', isCurrent: true });
  } else if (currentPath === '/admit-card') {
    items.push({ label: 'Admit Cards & City Intimations', isCurrent: true });
  } else if (currentPath === '/cut-off') {
    items.push({ label: 'Official Category Cut-Off Marks', isCurrent: true });
  } else if (currentPath === '/answer-key') {
    items.push({ label: 'Answer Keys & Objection Sheets', isCurrent: true });
  } else if (currentPath === '/result') {
    items.push({ label: 'Exam Results & Merit Lists', isCurrent: true });
  } else if (currentPath === '/faqs') {
    items.push({ label: 'Candidate FAQs & Statutory Rules', isCurrent: true });
  } else if (currentPath === '/about') {
    items.push({ label: 'Legal & Editorial', path: '/about' });
    items.push({ label: 'About GovIndiaNews', isCurrent: true });
  } else if (currentPath === '/contact') {
    items.push({ label: 'Legal & Editorial', path: '/about' });
    items.push({ label: 'Contact & Grievance Redressal', isCurrent: true });
  } else if (currentPath === '/privacy') {
    items.push({ label: 'Legal & Editorial', path: '/about' });
    items.push({ label: 'Privacy & Cookie Policy', isCurrent: true });
  } else if (currentPath === '/terms') {
    items.push({ label: 'Legal & Editorial', path: '/about' });
    items.push({ label: 'Terms of Service', isCurrent: true });
  } else if (currentPath === '/disclaimer') {
    items.push({ label: 'Legal & Editorial', path: '/about' });
    items.push({ label: 'Statutory Non-Govt Disclaimer', isCurrent: true });
  } else if (currentPath === '/fact-checking') {
    items.push({ label: 'Legal & Editorial', path: '/about' });
    items.push({ label: 'Fact-Checking Policy', isCurrent: true });
  } else if (currentPath === '/corrections') {
    items.push({ label: 'Legal & Editorial', path: '/about' });
    items.push({ label: 'Corrections & Errata Policy', isCurrent: true });
  } else {
    items.push({ label: 'Information', isCurrent: true });
  }

  // Schema.org BreadcrumbList structured data
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://govindianews.com';
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.path ? `${origin}${item.path}` : `${origin}${currentPath}`,
    })),
  };

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    if (currentPath === '/' || currentPath === '') {
      const existing = document.getElementById('govindianews-breadcrumb-jsonld');
      if (existing) existing.remove();
      return;
    }
    const scriptId = 'govindianews-breadcrumb-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(breadcrumbSchema);
  }, [breadcrumbSchema, currentPath]);

  // Never render visual breadcrumbs on the root home page
  if (currentPath === '/' || currentPath === '') {
    return null;
  }

  return (
    <>
      {/* Visual Compact Breadcrumb Trail */}
      <div className="bg-slate-50/80 border-b border-slate-200/80 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 overflow-x-auto no-scrollbar">
            <ol className="flex items-center gap-1.5 whitespace-nowrap min-w-0">
              {items.map((item, idx) => {
                const isLast = idx === items.length - 1;

                return (
                  <li key={idx} className="flex items-center gap-1.5 min-w-0">
                    {idx > 0 && (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                    )}

                    {idx === 0 ? (
                      <button
                        onClick={() => onNavigate('/')}
                        className="flex items-center gap-1 font-semibold text-slate-700 hover:text-blue-700 transition-colors cursor-pointer shrink-0"
                        title="Return to GovIndiaNews Homepage"
                      >
                        <Home className="w-3.5 h-3.5 text-slate-500" />
                        <span>Home</span>
                      </button>
                    ) : item.path && !isLast ? (
                      <button
                        onClick={() => onNavigate(item.path!)}
                        className="font-semibold text-slate-700 hover:text-blue-700 transition-colors cursor-pointer shrink-0"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <span
                        className="font-bold text-slate-900 truncate max-w-[240px] sm:max-w-[400px] md:max-w-[600px]"
                        aria-current={isLast ? 'page' : undefined}
                        title={item.label}
                      >
                        {item.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </>
  );
};
