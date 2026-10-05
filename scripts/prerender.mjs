import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Import data
const { EXAM_HUBS } = await import('../src/content/examHubsData.ts');
const { APPLICATION_GUIDES } = await import('../src/content/guidesData.ts');
const { RECRUITMENT_ALERTS } = await import('../src/data/gazetteData.ts');

const DOMAIN = 'https://govindianews.com';

const ROUTES = [
  {
    path: '/',
    title: 'GovIndiaNews — Independent Government Jobs & Exam Information Hub',
    description: 'Independent news, recruitment notices, exam blueprints, and candidate utilities for Central and State government competitive exams in India.',
    canonical: `${DOMAIN}/`,
    contentHeading: 'GovIndiaNews: India\'s Trusted Recruitment & Exam Prep Hub',
    bodyText: 'Independent news and candidate preparation platform delivering verified recruitment updates, official notifications, 7th CPC salary calculators, and comprehensive examination blueprints across SSC, Railways, Banking, UPSC, and State PSCs.'
  },
  {
    path: '/jobs',
    title: 'Latest Government Jobs 2026 — Verified Recruitment Notifications',
    description: 'Central and State government recruitment notices, vacancy breakdowns, eligibility criteria, and application closing dates.',
    canonical: `${DOMAIN}/jobs`,
    contentHeading: 'Latest Government Jobs 2026 Notifications',
    bodyText: 'Comprehensive directory of central and state government recruitment notifications. All recruitment alerts provide direct links to official commission notices and PDFs without fabricated vacancies or misleading claims.'
  },
  {
    path: '/admit-card',
    title: 'Admit Card Live Updates 2026 — Official Hall Tickets & City Slips',
    description: 'Direct official links, steps to download, and reporting instructions for central and state examination admit cards.',
    canonical: `${DOMAIN}/admit-card`,
    contentHeading: 'Admit Cards & Examination Call Letters',
    bodyText: 'Live updates on call letters, computer-based exam city intimation slips, and hall tickets for active government examinations.'
  },
  {
    path: '/cut-off',
    title: 'Official Category Cut-Off Marks — Normalized Score Thresholds',
    description: 'Category-wise qualifying cut-off marks for SSC, Railway, Banking, and Central Public Service recruitment examinations.',
    canonical: `${DOMAIN}/cut-off`,
    contentHeading: 'Official Examination Cut-Off Marks',
    bodyText: 'Official qualifying marks across General, OBC, SC, ST, and EWS categories as published by conducting commissions in official result write-ups.'
  },
  {
    path: '/answer-key',
    title: 'Official Answer Keys & Response Sheets — Live Updates',
    description: 'Provisional and final answer key releases, response sheet links, and objection filing schedules for central exams.',
    canonical: `${DOMAIN}/answer-key`,
    contentHeading: 'Official Answer Keys & Question Papers',
    bodyText: 'Access official provisional answer keys, candidate response sheets, and commission objection windows directly on conducting authority portals.'
  },
  {
    path: '/tools',
    title: 'Government Exam Calculators & Candidate Utilities — GovIndiaNews',
    description: 'Mathematical calculators, document format compliance checkers, and eligibility evaluators for government job aspirants.',
    canonical: `${DOMAIN}/tools`,
    contentHeading: 'Government Exam Smart Calculators & Candidate Utilities',
    bodyText: 'Validated mathematical calculators, photo dimension compliance checkers, and DoPT category relaxation tools built strictly to central recruitment rules.'
  },
  {
    path: '/tools/salary',
    title: '7th CPC In-Hand Salary Calculator — Pay Levels 1 to 18 Take-Home Pay',
    description: 'Calculate monthly gross salary, 10% NPS deduction, HRA (30%/20%/10%), DA, and net in-hand take-home pay under the 7th Central Pay Commission.',
    canonical: `${DOMAIN}/tools/salary`,
    contentHeading: '7th CPC In-Hand Salary Calculator',
    bodyText: 'Accurately computes starting monthly take-home pay under the 7th Central Pay Commission for central government employees across Pay Levels 1 through 18 in Class X, Y, and Z cities.'
  },
  {
    path: '/tools/photo-checker',
    title: 'Exam Photo & Signature Compliance Checker — SSC, UPSC & IBPS Presets',
    description: 'Client-side photo and signature dimensions, file size (KB limits), and aspect ratio validation tool based strictly on official exam notices.',
    canonical: `${DOMAIN}/tools/photo-checker`,
    contentHeading: 'Photo & Signature Compliance Checker',
    bodyText: 'Check image width, height, and file size in kilobytes against official requirements for SSC, UPSC, IBPS, and Railway recruitment portals. Completely private and processed inside your browser.'
  },
  {
    path: '/tools/relaxation',
    title: 'Fee & Category Age Relaxation Calculator — DoPT Statutory Rules',
    description: 'Determine exact upper age concessions and fee exemptions for OBC-NCL, SC, ST, PwBD, and Ex-Servicemen under Department of Personnel and Training (DoPT) rules.',
    canonical: `${DOMAIN}/tools/relaxation`,
    contentHeading: 'Category Age Relaxation & Fee Exemption Calculator',
    bodyText: 'Evaluates statutory age limit concessions and application fee exemptions under binding DoPT Office Memorandums for reserved and special category candidates.'
  },
  {
    path: '/tools/age',
    title: 'Government Exam Age Calculator — Crucial Cutoff Date Calculation',
    description: 'Calculate your exact completed age in years, months, and days against the official gazette crucial cut-off date with statutory category relaxations.',
    canonical: `${DOMAIN}/tools/age`,
    contentHeading: 'Crucial Cut-Off Age Calculator',
    bodyText: 'Calculates exact age on crucial notification dates (such as 01 August or 01 January) to verify eligibility for SSC, UPSC, Railway, and Banking posts.'
  },
  {
    path: '/tools/marking',
    title: 'Negative Marking Penalty Calculator — Net Exam Score Simulator',
    description: 'Calculate total marks scored, penalty deductions, and net percentage under 1/3, 1/4, and 0.50 negative marking schemes.',
    canonical: `${DOMAIN}/tools/marking`,
    contentHeading: 'Negative Marking Penalty & Score Simulator',
    bodyText: 'Simulates net scores, gross marks, penalty deductions, and accuracy percentages for objective multiple-choice computer-based tests.'
  },
  {
    path: '/tools/height',
    title: 'Physical Height & Chest Standard (PST) Checker — Police & CAPF Exams',
    description: 'Verify minimum physical standard test (PST) height and chest expansion measurements for Delhi Police SI, SSC GD Constable, and CAPF recruitment.',
    canonical: `${DOMAIN}/tools/height`,
    contentHeading: 'Physical Height & Chest Standard Checker',
    bodyText: 'Cross-references candidate physical measurements against notified physical standards for uniform services under Ministry of Home Affairs guidelines.'
  },
  {
    path: '/tools/rank',
    title: 'Percentile Rank & Normalization Predictor — Shift Score Estimate',
    description: 'Statistical percentile rank and normalized score estimator based on candidate raw marks and shift difficulty distribution assumptions.',
    canonical: `${DOMAIN}/tools/rank`,
    contentHeading: 'Percentile Rank & Normalization Predictor (Estimate Only)',
    bodyText: 'Provides an educational estimate of percentile rank and normalized score distribution. Explicitly labeled as an approximate statistical model.'
  },
  {
    path: '/tools/eligibility',
    title: 'Instant Exam Eligibility Matcher — Age, Category & Degree Filter',
    description: 'Multi-criteria recruitment finder matching date of birth, educational qualification, and social category against active government recruitments.',
    canonical: `${DOMAIN}/tools/eligibility`,
    contentHeading: 'Instant Eligibility Matcher',
    bodyText: 'Filter government recruitment opportunities based on your age, degree stream, and social category to find examinations for which you meet notified criteria.'
  },
  {
    path: '/data/vacancies',
    title: 'Multi-Year Central Exam Vacancy Tracker (2020–2026) — GovIndiaNews',
    description: 'Longitudinal historical vacancy database for SSC CGL, CHSL, RRB NTPC, RRB ALP, UPSC CSE, and IBPS PO sourced from official annual commission reports with CSV export.',
    canonical: `${DOMAIN}/data/vacancies`,
    contentHeading: 'Multi-Year Central Exam Vacancy Tracker (2020–2026)',
    bodyText: 'Longitudinal analysis of recruitment intake numbers for major central recruitment bodies across India from 2020 through 2026. Includes interactive filtering and direct CSV data download.'
  },
  {
    path: '/exams',
    title: '15 Government Examination Reference Hubs & Blueprints (2026)',
    description: 'In-depth architectural guides for SSC CGL, CHSL, MTS, RRB NTPC, Group D, ALP, SBI PO, IBPS, UPSC CSE, NDA, and DRDO with complete syllabi and 7th CPC career ladders.',
    canonical: `${DOMAIN}/exams`,
    contentHeading: 'Comprehensive Government Exam Reference Hubs',
    bodyText: 'Architectural blueprints for 15 premier Indian public recruitment examinations covering eligibility criteria, multi-stage selection patterns, 7th CPC career hierarchies, and verified preparation strategies.'
  },
  {
    path: '/guides',
    title: 'Government Job Application Guides & Documentation Advisories',
    description: 'Authoritative editorial advisories on document preparation checklists, OBC-NCL and EWS validity rules, common application mistakes, and reading recruitment gazettes.',
    canonical: `${DOMAIN}/guides`,
    contentHeading: 'Government Recruitment Application Guides',
    bodyText: 'Masterclass advisories authored by the editorial team explaining reservation policy nuances, DoPT circulars, certificate formats, and practical steps to avoid application rejections.'
  },
  {
    path: '/faqs',
    title: 'Central Government Examination Frequently Asked Questions — Candidate FAQ Hub',
    description: 'Answers to essential questions on crucial dates, normalisation formulas, OBC creamy layer ceilings, EWS validity, and CBT examination procedures.',
    canonical: `${DOMAIN}/faqs`,
    contentHeading: 'Government Examination Candidate FAQ Hub',
    bodyText: 'Frequently asked questions regarding age limit rules, degree cutoffs, certificate issuing authorities, and computer-based test instructions.'
  },
  {
    path: '/about',
    title: 'About GovIndiaNews — Independent Editorial Leadership & Mission',
    description: 'Learn about GovIndiaNews, founded by Akash Singh Solanki. Independent public examination news, free candidate utilities, and factual reporting.',
    canonical: `${DOMAIN}/about`,
    contentHeading: 'About GovIndiaNews & Editorial Leadership',
    bodyText: 'GovIndiaNews is an independent educational and recruitment news publication founded by Akash Singh Solanki. We provide factual reporting, free calculation tools, and exam blueprints without government affiliation.'
  },
  {
    path: '/contact',
    title: 'Contact Editorial Desk & Feedback — GovIndiaNews',
    description: 'Get in touch with the GovIndiaNews editorial team for inquiries, feedback, and corrections via contact form or direct email.',
    canonical: `${DOMAIN}/contact`,
    contentHeading: 'Contact GovIndiaNews Editorial Desk',
    bodyText: 'Reach out to founder and editor Akash Singh Solanki and the editorial desk. Contact form with email notification and direct contact avenues.'
  },
  {
    path: '/privacy',
    title: 'Privacy Policy — Transparent Data Protection & Cookie Policy',
    description: 'Transparent privacy policy detailing client-side utilities, cookie usage, Google AdSense integration, and user rights under the Digital Personal Data Protection (DPDP) Act.',
    canonical: `${DOMAIN}/privacy`,
    contentHeading: 'Privacy Policy & Data Protection',
    bodyText: 'Clear disclosures on data handling practices. All calculators operate entirely client-side in your browser without collecting personally identifiable information.'
  },
  {
    path: '/terms',
    title: 'Terms of Service — GovIndiaNews',
    description: 'Terms and conditions governing the use of GovIndiaNews recruitment information, tools, and calculators.',
    canonical: `${DOMAIN}/terms`,
    contentHeading: 'Terms of Service',
    bodyText: 'Terms of service outlining terms of use, intellectual property, disclaimers of government affiliation, and limitation of liability.'
  },
  {
    path: '/disclaimer',
    title: 'Independent Non-Affiliation Disclaimer — GovIndiaNews',
    description: 'Official non-affiliation statement: GovIndiaNews is an independent news entity and is not affiliated with or endorsed by any government agency.',
    canonical: `${DOMAIN}/disclaimer`,
    contentHeading: 'Independent Non-Affiliation Disclaimer',
    bodyText: 'GovIndiaNews is an independent publication and is not affiliated with, endorsed by, or representing any government body, ministry, or commission.'
  },
  {
    path: '/editorial-policy',
    title: 'Editorial Policy & Verification Standards — GovIndiaNews',
    description: 'Our four-pillar editorial standards: primary source referencing, zero AI fabrication, immediate corrections policy, and strict editorial independence.',
    canonical: `${DOMAIN}/editorial-policy`,
    contentHeading: 'Editorial Integrity & Verification Standards',
    bodyText: 'Our commitment to truthful public recruitment reporting: every factual claim originates from official commission notices or carries a verification flag.'
  },
  {
    path: '/corrections',
    title: 'Public Corrections Policy & Transparency Log — GovIndiaNews',
    description: 'Transparent corrections policy with direct reporting mechanism and chronological record of editorial rectifications.',
    canonical: `${DOMAIN}/corrections`,
    contentHeading: 'Corrections Policy & Verification Transparency',
    bodyText: 'If you identify an error, outdated date, or discrepancy with an official notification, notify our editorial desk for rapid review and public correction.'
  }
];

// Add all 15 exam hubs to ROUTES
for (const hub of EXAM_HUBS) {
  ROUTES.push({
    path: `/exams/${hub.slug}`,
    title: `${hub.title} — GovIndiaNews`,
    description: `${hub.examName} comprehensive examination blueprint. Eligibility, selection stages, syllabus, 7th CPC salary, and preparation strategy.`,
    canonical: `${DOMAIN}/exams/${hub.slug}`,
    contentHeading: hub.title,
    bodyText: `${hub.overview} Conducting Body: ${hub.conductingBody}. Official Portal: ${hub.officialUrl}. Last reviewed: ${hub.lastReviewed}.`
  });
}

// Add all application guides to ROUTES
for (const guide of APPLICATION_GUIDES) {
  ROUTES.push({
    path: `/guides/${guide.slug}`,
    title: `${guide.title} — GovIndiaNews`,
    description: guide.summary,
    canonical: `${DOMAIN}/guides/${guide.slug}`,
    contentHeading: guide.title,
    bodyText: guide.sections.map(s => `${s.heading}\n${s.content}`).join('\n\n')
  });

  // Support alias route for army 1600m guide
  if (guide.slug === 'army-1600-meter-running-time-agniveer-pft-standards') {
    ROUTES.push({
      path: `/guides/army-1600-meter-running-standards-agniveer-guide`,
      title: `${guide.title} — GovIndiaNews`,
      description: guide.summary,
      canonical: `${DOMAIN}/guides/army-1600-meter-running-time-agniveer-pft-standards`,
      contentHeading: guide.title,
      bodyText: guide.sections.map(s => `${s.heading}\n${s.content}`).join('\n\n')
    });
  }
}

// Add all 30 recruitment alerts to ROUTES
for (const alert of RECRUITMENT_ALERTS) {
  ROUTES.push({
    path: `/article/${alert.slug}`,
    title: `${alert.title} — GovIndiaNews`,
    description: alert.summary.slice(0, 160),
    canonical: `${DOMAIN}/article/${alert.slug}`,
    contentHeading: alert.title,
    bodyText: `${alert.summary} Organization: ${alert.organization}. Category: ${alert.category}. Qualification: ${alert.qualification}. Important Dates: ${alert.importantDates?.map(d => `${d.event}: ${d.date}`).join(', ') || alert.publishDate}. Direct link: ${alert.sourceNotice?.url || alert.directApplyUrl || alert.officialPdfUrl || 'https://govindianews.com'}`
  });
}

console.log(`Starting pre-rendering for ${ROUTES.length} static routes...`);

for (const route of ROUTES) {
  let html = baseHtml;

  // Replace title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content=".*?"\s*\/?>/i,
    `<meta name="description" content="${route.description.replace(/"/g, '&quot;')}" />`
  );

  // Replace or inject canonical link
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href=".*?"\s*\/?>/i, `<link rel="canonical" href="${route.canonical}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${route.canonical}" />\n</head>`);
  }

  // Inject prerendered crawlable content inside #root for crawlers without JavaScript
  const fallbackHtml = `
    <header style="max-width:960px;margin:2rem auto;padding:1rem;font-family:sans-serif;">
      <h1 style="font-size:1.75rem;font-weight:bold;color:#0f172a;">${route.contentHeading}</h1>
      <p style="color:#475569;font-size:0.95rem;line-height:1.6;margin-top:0.75rem;">${route.bodyText.replace(/\n/g, '<br/>')}</p>
      <nav style="margin-top:1.5rem;font-size:0.85rem;">
        <a href="/" style="color:#2563eb;margin-right:1rem;">Home</a>
        <a href="/jobs" style="color:#2563eb;margin-right:1rem;">Jobs</a>
        <a href="/exams" style="color:#2563eb;margin-right:1rem;">Exam Hubs</a>
        <a href="/data/vacancies" style="color:#2563eb;margin-right:1rem;">Vacancies</a>
        <a href="/guides" style="color:#2563eb;margin-right:1rem;">Guides</a>
        <a href="/tools" style="color:#2563eb;margin-right:1rem;">Calculators</a>
        <a href="/about" style="color:#2563eb;">About</a>
      </nav>
      <p style="font-size:0.75rem;color:#94a3b8;margin-top:2rem;">GovIndiaNews is an independent publication and is not affiliated with any government body. Always confirm details on the official notification.</p>
    </header>
  `;

  html = html.replace('<div id="root"></div>', `<div id="root">${fallbackHtml}</div>`);

  // Target directory
  const targetDir = route.path === '/' ? distDir : path.join(distDir, route.path.replace(/^\//, ''));
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
}

// Generate dynamic sitemap.xml with verified routes only
const nowIso = new Date().toISOString();
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(r => `  <url>
    <loc>${r.canonical}</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${r.path === '/' ? '1.0' : r.path.startsWith('/tools/') ? '0.9' : r.path.startsWith('/exams/') ? '0.9' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemapXml, 'utf8');

// Generate dynamic rss.xml
const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GovIndiaNews — Independent Government Jobs &amp; Exam Updates</title>
    <link>${DOMAIN}</link>
    <description>Independent news, verified recruitment notices, and candidate examination blueprints across India.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${DOMAIN}/rss.xml" rel="self" type="application/rss+xml"/>
${ROUTES.filter(r => r.path.startsWith('/article/') || r.path.startsWith('/exams/') || r.path.startsWith('/guides/')).slice(0, 30).map(r => `    <item>
      <title><![CDATA[${r.title}]]></title>
      <link>${r.canonical}</link>
      <guid>${r.canonical}</guid>
      <description><![CDATA[${r.description}]]></description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>`).join('\n')}
  </channel>
</rss>`;

fs.writeFileSync(path.join(distDir, 'rss.xml'), rssXml, 'utf8');
fs.writeFileSync(path.join(rootDir, 'public', 'rss.xml'), rssXml, 'utf8');

console.log(`Successfully prerendered ${ROUTES.length} routes, sitemap.xml, and rss.xml.`);
