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

// Import static application datasets
const { EXAM_HUBS } = await import('../src/content/examHubsData.ts');
const { APPLICATION_GUIDES } = await import('../src/content/guidesData.ts');
const { RECRUITMENT_ALERTS } = await import('../src/data/gazetteData.ts');
const { BLOG_POSTS } = await import('../src/content/blogData.ts');
const { isAlertActive, isAlertActiveAndVerified, parsePublishDateToTimestamp } = await import('../src/utils/alertStatus.ts');

const DOMAIN = 'https://govindianews.com';

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toIsoDate(dateStr, fallbackIso = '2026-10-08') {
  if (!dateStr) return fallbackIso;
  const clean = dateStr.replace(/\(.*?\)/g, '').replace(/,/g, ' ').trim();
  const timestamp = Date.parse(clean);
  if (!isNaN(timestamp)) {
    return new Date(timestamp).toISOString().split('T')[0];
  }
  const months = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
  const parts = clean.toLowerCase().split(/[\s-]+/);
  if (parts.length >= 3) {
    const day = parts[0].replace(/\D/g, '').padStart(2, '0');
    const mKey = parts[1].slice(0, 3);
    const m = months[mKey];
    const y = parts[2].replace(/\D/g, '');
    if (m && !isNaN(parseInt(day, 10)) && !isNaN(parseInt(y, 10)) && y.length === 4) {
      return `${y}-${m}-${day}`;
    }
  }
  return fallbackIso;
}

function toRfc822Date(dateStr) {
  const iso = toIsoDate(dateStr);
  const d = new Date(`${iso}T08:00:00Z`);
  return isNaN(d.getTime()) ? 'Thu, 08 Oct 2026 08:00:00 GMT' : d.toUTCString();
}

// Common site navigation header
function renderSiteHeader() {
  return `
    <header class="site-header" style="background:#0f172a;color:#f8fafc;padding:1rem 1.5rem;border-bottom:1px solid #1e293b;">
      <div style="max-width:1200px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">
        <div style="display:flex;align-items:center;gap:0.75rem;">
          <a href="/" style="font-size:1.25rem;font-weight:800;color:#ffffff;text-decoration:none;letter-spacing:-0.02em;">GovIndiaNews</a>
          <span style="background:#1e3a8a;color:#93c5fd;font-size:0.7rem;padding:0.2rem 0.5rem;border-radius:4px;font-weight:700;text-transform:uppercase;">Central Gazette Registry</span>
        </div>
        <nav aria-label="Primary Navigation" style="display:flex;flex-wrap:wrap;gap:0.75rem;font-size:0.85rem;font-weight:600;">
          <a href="/" style="color:#cbd5e1;text-decoration:none;padding:0.25rem 0.5rem;">Home</a>
          <a href="/jobs" style="color:#cbd5e1;text-decoration:none;padding:0.25rem 0.5rem;">Govt Jobs</a>
          <a href="/board-exams" style="color:#cbd5e1;text-decoration:none;padding:0.25rem 0.5rem;">Board Exams</a>
          <a href="/admit-card" style="color:#cbd5e1;text-decoration:none;padding:0.25rem 0.5rem;">Admit Cards</a>
          <a href="/cut-off" style="color:#cbd5e1;text-decoration:none;padding:0.25rem 0.5rem;">Cut-Off Marks</a>
          <a href="/answer-key" style="color:#cbd5e1;text-decoration:none;padding:0.25rem 0.5rem;">Answer Keys</a>
          <a href="/exams" style="color:#cbd5e1;text-decoration:none;padding:0.25rem 0.5rem;">15 Exam Hubs</a>
          <a href="/data/vacancies" style="color:#cbd5e1;text-decoration:none;padding:0.25rem 0.5rem;">Vacancy Tracker</a>
          <a href="/guides" style="color:#cbd5e1;text-decoration:none;padding:0.25rem 0.5rem;">Application Guides</a>
          <a href="/tools" style="color:#cbd5e1;text-decoration:none;padding:0.25rem 0.5rem;">Exam Calculators</a>
          <a href="/blog" style="color:#cbd5e1;text-decoration:none;padding:0.25rem 0.5rem;">Knowledge Base</a>
        </nav>
      </div>
    </header>
  `;
}

// Common site footer
function renderSiteFooter() {
  return `
    <footer class="site-footer" style="background:#0b1120;color:#94a3b8;padding:3rem 1.5rem 2rem;margin-top:4rem;border-top:1px solid #1e293b;font-size:0.85rem;line-height:1.6;">
      <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2rem;">
        <div>
          <h3 style="color:#ffffff;font-size:1rem;margin-bottom:0.75rem;">GovIndiaNews</h3>
          <p style="margin-bottom:1rem;">India's independent government recruitment alerts registry and candidate examination intelligence portal. Founded by Akash Singh Solanki to deliver gazette-verified notifications without commercial fabrication.</p>
          <p><a href="/author/akash-singh-solanki" style="color:#60a5fa;text-decoration:none;">Editorial Leadership Profile &rarr;</a></p>
        </div>
        <div>
          <h3 style="color:#ffffff;font-size:1rem;margin-bottom:0.75rem;">Recruitment &amp; Results</h3>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.4rem;">
            <li><a href="/jobs" style="color:#94a3b8;text-decoration:none;">Latest Central &amp; State Jobs 2026</a></li>
            <li><a href="/board-exams" style="color:#94a3b8;text-decoration:none;">Board Examinations 2026–27 (CBSE)</a></li>
            <li><a href="/admit-card" style="color:#94a3b8;text-decoration:none;">Admit Card Download Links</a></li>
            <li><a href="/cut-off" style="color:#94a3b8;text-decoration:none;">Category-Wise Cut-Off Marks</a></li>
            <li><a href="/answer-key" style="color:#94a3b8;text-decoration:none;">Answer Keys &amp; Response Sheets</a></li>
            <li><a href="/exams" style="color:#94a3b8;text-decoration:none;">15 Government Examination Hubs</a></li>
            <li><a href="/data/vacancies" style="color:#94a3b8;text-decoration:none;">Multi-Year Vacancy Database</a></li>
          </ul>
        </div>
        <div>
          <h3 style="color:#ffffff;font-size:1rem;margin-bottom:0.75rem;">Candidate Utilities</h3>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.4rem;">
            <li><a href="/tools/salary" style="color:#94a3b8;text-decoration:none;">7th CPC In-Hand Salary Calculator</a></li>
            <li><a href="/tools/age" style="color:#94a3b8;text-decoration:none;">Crucial Cut-Off Age Calculator</a></li>
            <li><a href="/tools/marking" style="color:#94a3b8;text-decoration:none;">Negative Marking Score Simulator</a></li>
            <li><a href="/tools/height" style="color:#94a3b8;text-decoration:none;">Physical Height &amp; PST Checker</a></li>
            <li><a href="/tools/rank" style="color:#94a3b8;text-decoration:none;">Percentile Rank &amp; Normalization</a></li>
            <li><a href="/tools/eligibility" style="color:#94a3b8;text-decoration:none;">Instant Eligibility Matcher</a></li>
            <li><a href="/tools/photo-checker" style="color:#94a3b8;text-decoration:none;">Photo &amp; Signature Compliance Checker</a></li>
            <li><a href="/tools/relaxation" style="color:#94a3b8;text-decoration:none;">Category Age Relaxation Tool</a></li>
          </ul>
        </div>
        <div>
          <h3 style="color:#ffffff;font-size:1rem;margin-bottom:0.75rem;">Editorial Policies &amp; Trust</h3>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.4rem;">
            <li><a href="/editorial-policy" style="color:#94a3b8;text-decoration:none;">Editorial Policy &amp; Verification</a></li>
            <li><a href="/fact-checking" style="color:#94a3b8;text-decoration:none;">Fact-Checking &amp; Gazette Sourcing</a></li>
            <li><a href="/corrections" style="color:#94a3b8;text-decoration:none;">Corrections Policy &amp; Public Log</a></li>
            <li><a href="/trust/editorial" style="color:#94a3b8;text-decoration:none;">Trust &amp; Transparency Center</a></li>
            <li><a href="/trust/grievance" style="color:#94a3b8;text-decoration:none;">Grievance Redressal Desk</a></li>
            <li><a href="/faqs" style="color:#94a3b8;text-decoration:none;">Candidate FAQ Hub</a></li>
            <li><a href="/about" style="color:#94a3b8;text-decoration:none;">About GovIndiaNews</a></li>
            <li><a href="/contact" style="color:#94a3b8;text-decoration:none;">Contact Editorial Desk</a></li>
            <li><a href="/privacy" style="color:#94a3b8;text-decoration:none;">Privacy Policy</a></li>
            <li><a href="/terms" style="color:#94a3b8;text-decoration:none;">Terms of Service</a></li>
            <li><a href="/disclaimer" style="color:#94a3b8;text-decoration:none;">Non-Affiliation Disclaimer</a></li>
          </ul>
        </div>
      </div>
      <div style="max-width:1200px;margin:2rem auto 0;padding-top:1.5rem;border-top:1px solid #1e293b;text-align:center;font-size:0.75rem;color:#64748b;">
        <p style="margin-bottom:0.5rem;"><strong>Non-Affiliation Disclaimer:</strong> GovIndiaNews is an independent news reporting portal and candidate education service. GovIndiaNews is not affiliated with, endorsed by, or representative of the Union Public Service Commission (UPSC), Staff Selection Commission (SSC), Railway Recruitment Boards (RRB), Institute of Banking Personnel Selection (IBPS), or any Central or State Ministry. All candidates are advised to verify details against official gazette notifications on commission web portals.</p>
        <p>&copy; 2026 GovIndiaNews. All rights reserved. Sourced from central public gazettes under Indian public record access.</p>
      </div>
    </footer>
  `;
}

// Active verified alerts sorted latest first
const activeAlerts = RECRUITMENT_ALERTS
  .filter((a) => isAlertActive(a))
  .sort((a, b) => parsePublishDateToTimestamp(b.publishDate) - parsePublishDateToTimestamp(a.publishDate));

const activeVerifiedAlerts = activeAlerts.filter((a) => a.status === 'verified');
const activeJobs = activeAlerts.filter((a) => a.category === 'jobs');
const activeAdmitCards = activeAlerts.filter((a) => a.category === 'admit-card');

// Collect all static routes
const ROUTES = [];

// 1. HOMEPAGE ROUTE (/)
ROUTES.push({
  path: '/',
  title: 'GovIndiaNews — Independent Government Jobs & Exam Information Hub',
  description: 'Independent news, recruitment notices, exam blueprints, and candidate utilities for Central and State government competitive exams in India.',
  canonical: `${DOMAIN}/`,
  publishDate: activeAlerts[0]?.publishDate || '08 Oct 2026',
  render: () => {
    return `
      ${renderSiteHeader()}
      <main style="max-width:1200px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
        <header style="margin-bottom:2.5rem;text-align:left;border-bottom:1px solid #e2e8f0;padding-bottom:2rem;">
          <div style="display:inline-block;background:#eff6ff;color:#1d4ed8;font-size:0.75rem;font-weight:700;padding:0.3rem 0.75rem;border-radius:9999px;margin-bottom:0.75rem;border:1px solid #bfdbfe;">
            India&#39;s Gazette-Referenced Recruitment Intelligence
          </div>
          <h1 style="font-size:2.25rem;font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 1rem 0;">
            GovIndiaNews: Independent Government Jobs, Examination Blueprints &amp; Candidate Utilities
          </h1>
          <p style="font-size:1.05rem;color:#475569;max-width:960px;margin:0 0 1.5rem 0;">
            GovIndiaNews is an independent news portal founded by <strong>Akash Singh Solanki</strong> dedicated to providing job aspirants across India with gazette-verified recruitment updates, authoritative examination blueprints, exact cut-off mark trends, and accurate in-browser calculation tools. Every factual update is cross-referenced directly against official commission gazettes from SSC, UPSC, RRB, IBPS, and State PSCs with zero AI hallucination.
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:0.75rem;font-size:0.85rem;">
            <a href="/jobs" style="background:#2563eb;color:#ffffff;padding:0.6rem 1.25rem;border-radius:8px;font-weight:700;text-decoration:none;">Browse All Government Jobs</a>
            <a href="/admit-card" style="background:#0f172a;color:#ffffff;padding:0.6rem 1.25rem;border-radius:8px;font-weight:700;text-decoration:none;">Live Admit Cards</a>
            <a href="/exams" style="background:#f1f5f9;color:#0f172a;padding:0.6rem 1.25rem;border-radius:8px;font-weight:700;text-decoration:none;border:1px solid #cbd5e1;">15 Exam Blueprints</a>
            <a href="/tools" style="background:#f1f5f9;color:#0f172a;padding:0.6rem 1.25rem;border-radius:8px;font-weight:700;text-decoration:none;border:1px solid #cbd5e1;">Candidate Calculators</a>
          </div>
        </header>

        <!-- Section: Latest Government Jobs -->
        <section style="margin-bottom:3rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #2563eb;padding-bottom:0.5rem;margin-bottom:1.5rem;">
            <h2 style="font-size:1.5rem;font-weight:800;color:#0f172a;margin:0;">Latest Government Jobs (Central &amp; State Notifications)</h2>
            <a href="/jobs" style="font-size:0.85rem;font-weight:700;color:#2563eb;text-decoration:none;">View All Jobs &rarr;</a>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1.5rem;">
            ${activeJobs.map((alert) => `
              <article style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;font-size:0.75rem;">
                    <span style="font-weight:700;color:#1e40af;background:#dbeafe;padding:0.2rem 0.5rem;border-radius:4px;">${escapeHtml(alert.organization)}</span>
                    <span style="color:#64748b;">Published: ${escapeHtml(alert.publishDate)}</span>
                  </div>
                  <h3 style="font-size:1.05rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem 0;line-height:1.35;">
                    <a href="/article/${escapeHtml(alert.slug)}" style="color:#0f172a;text-decoration:none;">${escapeHtml(alert.title)}</a>
                  </h3>
                  <p style="font-size:0.85rem;color:#475569;margin:0 0 1rem 0;line-height:1.5;">${escapeHtml(alert.summary)}</p>
                </div>
                <div style="border-top:1px solid #f1f5f9;padding-top:0.75rem;font-size:0.8rem;display:flex;justify-content:space-between;align-items:center;">
                  <span style="color:#b91c1c;font-weight:600;">Last Date: ${escapeHtml(alert.lastDate || 'Check Notification')}</span>
                  <a href="/article/${escapeHtml(alert.slug)}" style="color:#2563eb;font-weight:700;text-decoration:none;">Read Full Gazette &rarr;</a>
                </div>
              </article>
            `).join('')}
          </div>
        </section>

        <!-- Section: Latest Admit Cards -->
        <section style="margin-bottom:3rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #d97706;padding-bottom:0.5rem;margin-bottom:1.5rem;">
            <h2 style="font-size:1.5rem;font-weight:800;color:#0f172a;margin:0;">Latest Admit Cards &amp; Call Letters 2026</h2>
            <a href="/admit-card" style="font-size:0.85rem;font-weight:700;color:#d97706;text-decoration:none;">View All Admit Cards &rarr;</a>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1.5rem;">
            ${activeAdmitCards.map((alert) => `
              <article style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;font-size:0.75rem;">
                    <span style="font-weight:700;color:#92400e;background:#fef3c7;padding:0.2rem 0.5rem;border-radius:4px;">${escapeHtml(alert.organization)}</span>
                    <span style="color:#64748b;">Exam: ${escapeHtml(alert.examDate || alert.publishDate)}</span>
                  </div>
                  <h3 style="font-size:1.05rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem 0;line-height:1.35;">
                    <a href="/article/${escapeHtml(alert.slug)}" style="color:#0f172a;text-decoration:none;">${escapeHtml(alert.title)}</a>
                  </h3>
                  <p style="font-size:0.85rem;color:#475569;margin:0 0 1rem 0;line-height:1.5;">${escapeHtml(alert.summary)}</p>
                </div>
                <div style="border-top:1px solid #f1f5f9;padding-top:0.75rem;font-size:0.8rem;display:flex;justify-content:space-between;align-items:center;">
                  <span style="color:#475569;">Verified Notice</span>
                  <a href="/article/${escapeHtml(alert.slug)}" style="color:#d97706;font-weight:700;text-decoration:none;">Download Instructions &rarr;</a>
                </div>
              </article>
            `).join('')}
          </div>
        </section>

        <!-- Section: Examination Reference Hubs -->
        <section style="margin-bottom:3rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #0f172a;padding-bottom:0.5rem;margin-bottom:1.5rem;">
            <h2 style="font-size:1.5rem;font-weight:800;color:#0f172a;margin:0;">15 Comprehensive Examination Reference Hubs</h2>
            <a href="/exams" style="font-size:0.85rem;font-weight:700;color:#0f172a;text-decoration:none;">Explore All Hubs &rarr;</a>
          </div>
          <p style="color:#475569;font-size:0.95rem;margin-bottom:1.5rem;">
            Every hub provides full statutory eligibility details, complete syllabus breakdown tables, selection stages, 7th CPC career hierarchies, and official portal links.
          </p>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem;">
            ${EXAM_HUBS.map((hub) => `
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:1rem;">
                <span style="font-size:0.7rem;font-weight:700;color:#2563eb;text-transform:uppercase;">${escapeHtml(hub.conductingBody)}</span>
                <h3 style="font-size:0.95rem;font-weight:700;margin:0.25rem 0 0.5rem 0;">
                  <a href="/exams/${escapeHtml(hub.slug)}" style="color:#0f172a;text-decoration:none;">${escapeHtml(hub.examName)}</a>
                </h3>
                <p style="font-size:0.8rem;color:#64748b;margin:0 0 0.75rem 0;line-height:1.4;">${escapeHtml(hub.overview.slice(0, 110))}...</p>
                <a href="/exams/${escapeHtml(hub.slug)}" style="font-size:0.75rem;font-weight:700;color:#2563eb;text-decoration:none;">View Blueprint &rarr;</a>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Section: Application Guides & Masterclasses -->
        <section style="margin-bottom:3rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #059669;padding-bottom:0.5rem;margin-bottom:1.5rem;">
            <h2 style="font-size:1.5rem;font-weight:800;color:#0f172a;margin:0;">Government Job Application Guides &amp; Documentation</h2>
            <a href="/guides" style="font-size:0.85rem;font-weight:700;color:#059669;text-decoration:none;">View All Guides &rarr;</a>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.5rem;">
            ${APPLICATION_GUIDES.map((guide) => `
              <article style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.25rem;">
                <span style="font-size:0.7rem;font-weight:700;color:#059669;background:#d1fae5;padding:0.2rem 0.5rem;border-radius:4px;">${escapeHtml(guide.category)}</span>
                <h3 style="font-size:1.05rem;font-weight:700;margin:0.5rem 0;line-height:1.35;">
                  <a href="/guides/${escapeHtml(guide.slug)}" style="color:#0f172a;text-decoration:none;">${escapeHtml(guide.title)}</a>
                </h3>
                <p style="font-size:0.85rem;color:#475569;margin:0 0 1rem 0;line-height:1.5;">${escapeHtml(guide.summary)}</p>
                <a href="/guides/${escapeHtml(guide.slug)}" style="font-size:0.8rem;font-weight:700;color:#059669;text-decoration:none;">Read Full Guide &rarr;</a>
              </article>
            `).join('')}
          </div>
        </section>

        <!-- Section: In-Browser Candidate Utilities & Calculators -->
        <section style="margin-bottom:3rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #7c3aed;padding-bottom:0.5rem;margin-bottom:1.5rem;">
            <h2 style="font-size:1.5rem;font-weight:800;color:#0f172a;margin:0;">Smart Exam Utilities &amp; Calculators</h2>
            <a href="/tools" style="font-size:0.85rem;font-weight:700;color:#7c3aed;text-decoration:none;">Open All Calculators &rarr;</a>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem;">
            <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.25rem;">
              <h3 style="font-size:1rem;font-weight:700;margin:0 0 0.5rem 0;"><a href="/tools/salary" style="color:#0f172a;text-decoration:none;">7th CPC Salary Calculator</a></h3>
              <p style="font-size:0.8rem;color:#64748b;margin:0 0 0.75rem 0;">Computes gross salary, 10% NPS deduction, HRA (30%/20%/10%), and net take-home in-hand pay across Levels 1-18.</p>
              <a href="/tools/salary" style="font-size:0.75rem;font-weight:700;color:#7c3aed;text-decoration:none;">Calculate Salary &rarr;</a>
            </div>
            <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.25rem;">
              <h3 style="font-size:1rem;font-weight:700;margin:0 0 0.5rem 0;"><a href="/tools/age" style="color:#0f172a;text-decoration:none;">Crucial Cut-Off Age Calculator</a></h3>
              <p style="font-size:0.8rem;color:#64748b;margin:0 0 0.75rem 0;">Calculates completed age in years, months, and days on crucial notification cutoff dates with category relaxations.</p>
              <a href="/tools/age" style="font-size:0.75rem;font-weight:700;color:#7c3aed;text-decoration:none;">Check Age &rarr;</a>
            </div>
            <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.25rem;">
              <h3 style="font-size:1rem;font-weight:700;margin:0 0 0.5rem 0;"><a href="/tools/marking" style="color:#0f172a;text-decoration:none;">Negative Marking Calculator</a></h3>
              <p style="font-size:0.8rem;color:#64748b;margin:0 0 0.75rem 0;">Simulates net raw score, accuracy percentage, and penalty deductions under 1/3, 1/4, and 0.50 penalty schemes.</p>
              <a href="/tools/marking" style="font-size:0.75rem;font-weight:700;color:#7c3aed;text-decoration:none;">Simulate Score &rarr;</a>
            </div>
            <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.25rem;">
              <h3 style="font-size:1rem;font-weight:700;margin:0 0 0.5rem 0;"><a href="/tools/height" style="color:#0f172a;text-decoration:none;">Physical Height &amp; PST Checker</a></h3>
              <p style="font-size:0.8rem;color:#64748b;margin:0 0 0.75rem 0;">Evaluates PST/PMT height standards for Delhi Police SI, SSC GD Constable, RPF Police, and Army Agniveer.</p>
              <a href="/tools/height" style="font-size:0.75rem;font-weight:700;color:#7c3aed;text-decoration:none;">Check Height &rarr;</a>
            </div>
          </div>
        </section>

        <!-- Section: Multi-Year Vacancy Tracker Link & Evergreen Articles -->
        <section style="background:#f1f5f9;border-radius:16px;padding:2rem;margin-bottom:3rem;">
          <h2 style="font-size:1.35rem;font-weight:800;color:#0f172a;margin:0 0 0.5rem 0;">Longitudinal Data &amp; Special Schemes</h2>
          <p style="color:#475569;font-size:0.95rem;margin:0 0 1rem 0;">
            Track historical intake trends and examine long-term employment development schemes:
          </p>
          <ul style="display:flex;flex-wrap:wrap;gap:1.5rem;font-size:0.85rem;font-weight:600;padding-left:1.25rem;">
            <li><a href="/data/vacancies" style="color:#2563eb;text-decoration:none;">Multi-Year Central Exam Vacancy Tracker (2020–2026) with CSV Export</a></li>
            <li><a href="/blog/army-1600-meter-running-time-agniveer-pft-standards" style="color:#2563eb;text-decoration:none;">Indian Army 1600m Running Time &amp; Agniveer Rally Standards</a></li>
            <li><a href="/blog/top-central-government-schemes-for-job-seekers-pmkvy-naps-employment" style="color:#2563eb;text-decoration:none;">Top Central Government Schemes for Job Seekers (PMKVY 4.0 &amp; NAPS)</a></li>
            <li><a href="/blog/agniveer-benefits-career-pathways-post-service" style="color:#2563eb;text-decoration:none;">Agniveer Seva Nidhi &amp; 10% Central Police Reservation Guide</a></li>
          </ul>
        </section>
      </main>
      ${renderSiteFooter()}
    `;
  }
});

// Helper for rendering alert directory listings
function renderAlertList(title, description, alerts, categoryName) {
  return `
    ${renderSiteHeader()}
    <main style="max-width:1200px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
      <header style="margin-bottom:2rem;border-bottom:1px solid #e2e8f0;padding-bottom:1.5rem;">
        <nav aria-label="Breadcrumb" style="font-size:0.8rem;color:#64748b;margin-bottom:0.75rem;">
          <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; <span>${escapeHtml(categoryName)}</span>
        </nav>
        <h1 style="font-size:2rem;font-weight:800;color:#0f172a;margin:0 0 0.5rem 0;">${escapeHtml(title)}</h1>
        <p style="font-size:1rem;color:#475569;margin:0;">${escapeHtml(description)}</p>
      </header>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1.5rem;">
        ${alerts.map((alert) => `
          <article style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;font-size:0.75rem;">
                <span style="font-weight:700;color:#1e40af;background:#dbeafe;padding:0.2rem 0.5rem;border-radius:4px;">${escapeHtml(alert.organization)}</span>
                <span style="color:#64748b;">${escapeHtml(alert.publishDate)}</span>
              </div>
              <h2 style="font-size:1.1rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem 0;line-height:1.35;">
                <a href="/article/${escapeHtml(alert.slug)}" style="color:#0f172a;text-decoration:none;">${escapeHtml(alert.title)}</a>
              </h2>
              <p style="font-size:0.85rem;color:#475569;margin:0 0 1rem 0;line-height:1.5;">${escapeHtml(alert.summary)}</p>
              <div style="font-size:0.8rem;color:#64748b;background:#f8fafc;padding:0.5rem;border-radius:6px;margin-bottom:0.75rem;">
                <div><strong>Qualification:</strong> ${escapeHtml(alert.qualification)}</div>
                ${alert.lastDate ? `<div><strong>Last Date:</strong> ${escapeHtml(alert.lastDate)}</div>` : ''}
                ${alert.examDate ? `<div><strong>Exam Date:</strong> ${escapeHtml(alert.examDate)}</div>` : ''}
              </div>
            </div>
            <div style="border-top:1px solid #f1f5f9;padding-top:0.75rem;font-size:0.8rem;display:flex;justify-content:space-between;align-items:center;">
              <span style="color:${alert.status === 'verified' ? '#059669' : '#d97706'};font-weight:600;">${alert.status === 'verified' ? 'Verified Gazette' : 'Under Verification'}</span>
              <a href="/article/${escapeHtml(alert.slug)}" style="color:#2563eb;font-weight:700;text-decoration:none;">Read Full Gazette &rarr;</a>
            </div>
          </article>
        `).join('')}
      </div>
      <section style="margin-top:3rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;font-size:0.85rem;color:#475569;">
        <h3 style="font-size:1rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem 0;">Editorial Verification Policy for ${escapeHtml(categoryName)}</h3>
        <p style="margin:0 0 0.75rem 0;">GovIndiaNews verifies all notifications against official government gazettes published by conducting commissions. We do not publish speculative vacancy numbers or unconfirmed press leaks. If you discover a discrepancy between a notification listed above and the official commission write-up, please report it via our <a href="/corrections" style="color:#2563eb;">public corrections log</a>.</p>
        <p style="margin:0;">Related resources: <a href="/tools" style="color:#2563eb;">Exam Calculators</a> &bull; <a href="/exams" style="color:#2563eb;">15 Exam Blueprints</a> &bull; <a href="/data/vacancies" style="color:#2563eb;">Vacancy Data Tracker</a> &bull; <a href="/faqs" style="color:#2563eb;">Candidate FAQs</a></p>
      </section>
    </main>
    ${renderSiteFooter()}
  `;
}

// 1.5 /board-exams ROUTE
const boardExamAlerts = activeAlerts.filter((a) => a.category === 'board-exams');
ROUTES.push({
  path: '/board-exams',
  title: 'Board Exams 2026–27 Notifications & Registration Forms — GovIndiaNews',
  description: 'Official notifications, CBSE private candidate LOC submissions, eligibility criteria, fee slabs, and exam schedules for Class 10 and 12.',
  canonical: `${DOMAIN}/board-exams`,
  publishDate: boardExamAlerts[0]?.publishDate || '08 Oct 2026',
  render: () => renderAlertList(
    'Board Examinations 2026–27 Notifications & Registration',
    'Central Board of Secondary Education (CBSE), ICSE, and State Board official notices, private candidate LOC submissions, eligibility rules, and examination schedules.',
    boardExamAlerts.length > 0 ? boardExamAlerts : activeAlerts.slice(0, 8),
    'Board Exams'
  )
});

// 2. /jobs ROUTE
ROUTES.push({
  path: '/jobs',
  title: 'Latest Government Jobs 2026 — Verified Recruitment Notifications',
  description: 'Central and State government recruitment notices, vacancy breakdowns, eligibility criteria, and application closing dates.',
  canonical: `${DOMAIN}/jobs`,
  publishDate: activeJobs[0]?.publishDate || '08 Oct 2026',
  render: () => renderAlertList(
    'Latest Government Jobs 2026 Notifications',
    'Comprehensive directory of central and state government recruitment notifications. All recruitment alerts provide direct links to official commission notices and PDFs without fabricated vacancies or misleading claims.',
    activeJobs,
    'Government Jobs'
  )
});

// 3. /admit-card ROUTE
ROUTES.push({
  path: '/admit-card',
  title: 'Admit Card Live Updates 2026 — Official Hall Tickets & City Slips',
  description: 'Direct official links, steps to download, and reporting instructions for central and state examination admit cards.',
  canonical: `${DOMAIN}/admit-card`,
  publishDate: activeAdmitCards[0]?.publishDate || '08 Oct 2026',
  render: () => renderAlertList(
    'Admit Cards & Examination Call Letters 2026',
    'Live updates on call letters, computer-based exam city intimation slips, and hall tickets for active government examinations. Download directly from official commission servers.',
    activeAdmitCards,
    'Admit Cards'
  )
});

// 4. /cut-off ROUTE
const cutOffAlerts = activeAlerts.filter((a) => a.category === 'cut-off' || (a.cutOffs && a.cutOffs.length > 0));
ROUTES.push({
  path: '/cut-off',
  title: 'Official Category Cut-Off Marks — Normalized Score Thresholds',
  description: 'Category-wise qualifying cut-off marks for SSC, Railway, Banking, and Central Public Service recruitment examinations.',
  canonical: `${DOMAIN}/cut-off`,
  publishDate: cutOffAlerts[0]?.publishDate || '08 Oct 2026',
  render: () => renderAlertList(
    'Official Examination Cut-Off Marks & Trends',
    'Official qualifying marks across General, OBC, SC, ST, and EWS categories as published by conducting commissions in official result write-ups.',
    cutOffAlerts.length > 0 ? cutOffAlerts : activeAlerts.slice(0, 8),
    'Cut-Off Marks'
  )
});

// 5. /answer-key ROUTE
const answerKeyAlerts = activeAlerts.filter((a) => a.category === 'answer-key');
ROUTES.push({
  path: '/answer-key',
  title: 'Official Answer Keys & Response Sheets — Live Updates',
  description: 'Provisional and final answer key releases, response sheet links, and objection filing schedules for central exams.',
  canonical: `${DOMAIN}/answer-key`,
  publishDate: answerKeyAlerts[0]?.publishDate || '08 Oct 2026',
  render: () => renderAlertList(
    'Official Answer Keys & Candidate Response Sheets',
    'Access official provisional answer keys, candidate response sheets, and commission objection windows directly on conducting authority portals.',
    answerKeyAlerts.length > 0 ? answerKeyAlerts : activeAlerts.slice(0, 8),
    'Answer Keys'
  )
});

// 6. /result & /results ROUTE
const resultAlerts = activeAlerts.filter((a) => a.category === 'result');
function renderResultsRoute() {
  return renderAlertList(
    'Official Government Examination Results & Merit Lists',
    'Verified selection lists, merit write-ups, and final qualification cutoffs for central recruitment examinations across SSC, UPSC, and State Commissions.',
    resultAlerts.length > 0 ? resultAlerts : activeAlerts.slice(0, 8),
    'Exam Results'
  );
}
ROUTES.push({
  path: '/results',
  title: 'Government Exam Results 2026 — Verified Selection Lists & Merit Rankings',
  description: 'Direct official result lists, candidate merit write-ups, and qualifying cutoff ranks released by Central and State recruitment authorities.',
  canonical: `${DOMAIN}/results`,
  publishDate: resultAlerts[0]?.publishDate || '08 Oct 2026',
  render: renderResultsRoute
});
ROUTES.push({
  path: '/result',
  title: 'Government Exam Results 2026 — Verified Selection Lists & Merit Rankings',
  description: 'Direct official result lists, candidate merit write-ups, and qualifying cutoff ranks released by Central and State recruitment authorities.',
  canonical: `${DOMAIN}/results`,
  publishDate: resultAlerts[0]?.publishDate || '08 Oct 2026',
  render: renderResultsRoute
});

// 7. /archive ROUTE
ROUTES.push({
  path: '/archive',
  title: 'Archived Recruitment Notices & Expired Drives — GovIndiaNews',
  description: 'Historical archive of concluded Central and State recruitment drives for candidate record keeping and historical syllabus reference.',
  canonical: `${DOMAIN}/archive`,
  publishDate: '01 Oct 2026',
  render: () => renderAlertList(
    'Archived Government Recruitment Notices',
    'Historical archive of concluded recruitment drives. Use these records to inspect historical exam dates, past qualifying cut-offs, and original gazette notifications.',
    RECRUITMENT_ALERTS.filter((a) => !isAlertActive(a) || a.status === 'expired').concat(activeAlerts.slice(-4)),
    'Archived Notices'
  )
});

// 8. /exams DIRECTORY ROUTE
ROUTES.push({
  path: '/exams',
  title: '15 Government Examination Reference Hubs & Blueprints (2026)',
  description: 'In-depth architectural guides for SSC CGL, CHSL, MTS, RRB NTPC, Group D, ALP, SBI PO, IBPS, UPSC CSE, NDA, and DRDO with complete syllabi and 7th CPC career ladders.',
  canonical: `${DOMAIN}/exams`,
  publishDate: '08 Oct 2026',
  render: () => {
    return `
      ${renderSiteHeader()}
      <main style="max-width:1200px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
        <header style="margin-bottom:2rem;border-bottom:1px solid #e2e8f0;padding-bottom:1.5rem;">
          <nav aria-label="Breadcrumb" style="font-size:0.8rem;color:#64748b;margin-bottom:0.75rem;">
            <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; <span>Examination Blueprints</span>
          </nav>
          <h1 style="font-size:2rem;font-weight:800;color:#0f172a;margin:0 0 0.5rem 0;">15 Comprehensive Government Examination Reference Hubs</h1>
          <p style="font-size:1rem;color:#475569;margin:0;">Architectural blueprints for 15 premier Indian public recruitment examinations covering statutory eligibility criteria, multi-stage selection patterns, 7th CPC career ladders, and verified preparation strategies.</p>
        </header>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1.5rem;">
          ${EXAM_HUBS.map((hub) => `
            <article style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;font-size:0.75rem;">
                  <span style="font-weight:700;color:#1e40af;background:#dbeafe;padding:0.2rem 0.5rem;border-radius:4px;">${escapeHtml(hub.conductingBody)}</span>
                  <span style="color:#64748b;">Reviewed: ${escapeHtml(hub.lastReviewed)}</span>
                </div>
                <h2 style="font-size:1.15rem;font-weight:700;margin:0 0 0.5rem 0;line-height:1.35;">
                  <a href="/exams/${escapeHtml(hub.slug)}" style="color:#0f172a;text-decoration:none;">${escapeHtml(hub.examName)}</a>
                </h2>
                <p style="font-size:0.85rem;color:#475569;margin:0 0 1rem 0;line-height:1.5;">${escapeHtml(hub.overview)}</p>
                <div style="font-size:0.8rem;color:#64748b;background:#f8fafc;padding:0.5rem;border-radius:6px;margin-bottom:0.75rem;">
                  <div><strong>Pay Level:</strong> ${escapeHtml(hub.payAndCareerGrowth?.payLevel || '7th CPC Notified')}</div>
                  <div><strong>Official Portal:</strong> ${escapeHtml(hub.officialUrl)}</div>
                </div>
              </div>
              <div style="border-top:1px solid #f1f5f9;padding-top:0.75rem;display:flex;justify-content:space-between;align-items:center;">
                <a href="${escapeHtml(hub.officialUrl)}" target="_blank" rel="noopener noreferrer" style="font-size:0.8rem;color:#64748b;text-decoration:none;">Official Site &nearr;</a>
                <a href="/exams/${escapeHtml(hub.slug)}" style="font-size:0.85rem;font-weight:700;color:#2563eb;text-decoration:none;">View Full Blueprint &rarr;</a>
              </div>
            </article>
          `).join('')}
        </div>

        <section style="margin-top:3rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;font-size:0.85rem;color:#475569;">
          <h3 style="font-size:1rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem 0;">Direct Official Portal Verification</h3>
          <p>Every examination blueprint is verified against annual commission calendars and statutory notifications from the Union Public Service Commission, Staff Selection Commission, Railway Recruitment Control Board, and Institute of Banking Personnel Selection.</p>
          <p style="margin-top:0.5rem;">Explore utilities: <a href="/tools/salary" style="color:#2563eb;">7th CPC Salary Calculator</a> &bull; <a href="/tools/age" style="color:#2563eb;">Age Calculator</a> &bull; <a href="/tools/marking" style="color:#2563eb;">Negative Marking</a> &bull; <a href="/guides" style="color:#2563eb;">Application Guides</a></p>
        </section>
      </main>
      ${renderSiteFooter()}
    `;
  }
});

// 9. /guides DIRECTORY ROUTE
ROUTES.push({
  path: '/guides',
  title: 'Government Job Application Guides & Documentation Advisories',
  description: 'Authoritative editorial advisories on document preparation checklists, OBC-NCL and EWS validity rules, common application mistakes, and reading recruitment gazettes.',
  canonical: `${DOMAIN}/guides`,
  publishDate: '08 Oct 2026',
  render: () => {
    return `
      ${renderSiteHeader()}
      <main style="max-width:1200px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
        <header style="margin-bottom:2rem;border-bottom:1px solid #e2e8f0;padding-bottom:1.5rem;">
          <nav aria-label="Breadcrumb" style="font-size:0.8rem;color:#64748b;margin-bottom:0.75rem;">
            <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; <span>Application Guides</span>
          </nav>
          <h1 style="font-size:2rem;font-weight:800;color:#0f172a;margin:0 0 0.5rem 0;">Government Recruitment Application Guides</h1>
          <p style="font-size:1rem;color:#475569;margin:0;">Masterclass advisories authored by the editorial team explaining reservation policy nuances, DoPT circulars, certificate formats, and practical steps to avoid application rejections.</p>
        </header>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1.5rem;">
          ${APPLICATION_GUIDES.map((guide) => `
            <article style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;font-size:0.75rem;">
                  <span style="font-weight:700;color:#059669;background:#d1fae5;padding:0.2rem 0.5rem;border-radius:4px;">${escapeHtml(guide.category)}</span>
                  <span style="color:#64748b;">${escapeHtml(guide.readingTime)}</span>
                </div>
                <h2 style="font-size:1.15rem;font-weight:700;margin:0 0 0.5rem 0;line-height:1.35;">
                  <a href="/guides/${escapeHtml(guide.slug)}" style="color:#0f172a;text-decoration:none;">${escapeHtml(guide.title)}</a>
                </h2>
                <p style="font-size:0.85rem;color:#475569;margin:0 0 1rem 0;line-height:1.5;">${escapeHtml(guide.summary)}</p>
                <div style="font-size:0.75rem;color:#64748b;">
                  <span>By ${escapeHtml(guide.author)} &bull; Updated: ${escapeHtml(guide.lastUpdated)}</span>
                </div>
              </div>
              <div style="border-top:1px solid #f1f5f9;padding-top:0.75rem;margin-top:1rem;display:flex;justify-content:flex-end;">
                <a href="/guides/${escapeHtml(guide.slug)}" style="font-size:0.85rem;font-weight:700;color:#059669;text-decoration:none;">Read Masterclass &rarr;</a>
              </div>
            </article>
          `).join('')}
        </div>

        <section style="margin-top:3rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;font-size:0.85rem;color:#475569;">
          <h3 style="font-size:1rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem 0;">Editorial Standards for Application Guides</h3>
          <p>All guidance notes are derived directly from Central Government Office Memorandums (OMs) issued by the Ministry of Personnel, Public Grievances and Pensions (Department of Personnel and Training - DoPT). For questions on certificate formats or crucial date rules, visit our <a href="/faqs" style="color:#2563eb;">Candidate FAQ Hub</a> or use the <a href="/tools/relaxation" style="color:#2563eb;">Category Relaxation Calculator</a>.</p>
        </section>
      </main>
      ${renderSiteFooter()}
    `;
  }
});

// 10. /tools DIRECTORY ROUTE
ROUTES.push({
  path: '/tools',
  title: 'Government Exam Calculators & Candidate Utilities — GovIndiaNews',
  description: 'Mathematical calculators, document format compliance checkers, and eligibility evaluators for government job aspirants.',
  canonical: `${DOMAIN}/tools`,
  publishDate: '08 Oct 2026',
  render: () => {
    return `
      ${renderSiteHeader()}
      <main style="max-width:1200px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
        <header style="margin-bottom:2rem;border-bottom:1px solid #e2e8f0;padding-bottom:1.5rem;">
          <nav aria-label="Breadcrumb" style="font-size:0.8rem;color:#64748b;margin-bottom:0.75rem;">
            <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; <span>Candidate Utilities</span>
          </nav>
          <h1 style="font-size:2rem;font-weight:800;color:#0f172a;margin:0 0 0.5rem 0;">Government Exam Smart Calculators &amp; Candidate Utilities</h1>
          <p style="font-size:1rem;color:#475569;margin:0;">Validated mathematical calculators, photo dimension compliance checkers, and DoPT category relaxation tools built strictly to central recruitment rules.</p>
        </header>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.5rem;">
          <article style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span style="font-size:0.7rem;font-weight:700;color:#2563eb;background:#eff6ff;padding:0.2rem 0.5rem;border-radius:4px;">Remuneration Arithmetic</span>
              <h2 style="font-size:1.15rem;font-weight:700;margin:0.5rem 0 0.5rem;"><a href="/tools/salary" style="color:#0f172a;text-decoration:none;">7th CPC In-Hand Salary Calculator</a></h2>
              <p style="font-size:0.85rem;color:#475569;margin:0 0 1rem 0;">Calculate monthly gross salary, 10% NPS deduction, HRA (30%/20%/10%), Dearness Allowance (DA), and net in-hand take-home pay under the 7th Central Pay Commission across Levels 1 to 18.</p>
            </div>
            <a href="/tools/salary" style="font-size:0.85rem;font-weight:700;color:#2563eb;text-decoration:none;">Launch Salary Calculator &rarr;</a>
          </article>

          <article style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span style="font-size:0.7rem;font-weight:700;color:#059669;background:#d1fae5;padding:0.2rem 0.5rem;border-radius:4px;">Crucial Date Verification</span>
              <h2 style="font-size:1.15rem;font-weight:700;margin:0.5rem 0 0.5rem;"><a href="/tools/age" style="color:#0f172a;text-decoration:none;">Crucial Cut-Off Age Calculator</a></h2>
              <p style="font-size:0.85rem;color:#475569;margin:0 0 1rem 0;">Calculate your exact completed age in years, months, and days against the official gazette crucial cut-off date with statutory OBC, SC, ST, and PwBD relaxations.</p>
            </div>
            <a href="/tools/age" style="font-size:0.85rem;font-weight:700;color:#059669;text-decoration:none;">Launch Age Calculator &rarr;</a>
          </article>

          <article style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span style="font-size:0.7rem;font-weight:700;color:#dc2626;background:#fee2e2;padding:0.2rem 0.5rem;border-radius:4px;">CBT Examination Scoring</span>
              <h2 style="font-size:1.15rem;font-weight:700;margin:0.5rem 0 0.5rem;"><a href="/tools/marking" style="color:#0f172a;text-decoration:none;">Negative Marking Score Simulator</a></h2>
              <p style="font-size:0.85rem;color:#475569;margin:0 0 1rem 0;">Simulates net scores, gross marks, penalty deductions, and accuracy percentages for objective multiple-choice computer-based tests under 1/3, 1/4, and 0.50 penalty schemes.</p>
            </div>
            <a href="/tools/marking" style="font-size:0.85rem;font-weight:700;color:#dc2626;text-decoration:none;">Launch Scoring Simulator &rarr;</a>
          </article>

          <article style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span style="font-size:0.7rem;font-weight:700;color:#d97706;background:#fef3c7;padding:0.2rem 0.5rem;border-radius:4px;">Physical Standards Test</span>
              <h2 style="font-size:1.15rem;font-weight:700;margin:0.5rem 0 0.5rem;"><a href="/tools/height" style="color:#0f172a;text-decoration:none;">Physical Height &amp; Chest Standard Checker</a></h2>
              <p style="font-size:0.85rem;color:#475569;margin:0 0 1rem 0;">Cross-references candidate physical measurements against notified physical standards (PST/PMT) for Delhi Police SI, SSC GD Constable, and CAPF recruitment.</p>
            </div>
            <a href="/tools/height" style="font-size:0.85rem;font-weight:700;color:#d97706;text-decoration:none;">Launch Height Checker &rarr;</a>
          </article>

          <article style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span style="font-size:0.7rem;font-weight:700;color:#7c3aed;background:#ede9fe;padding:0.2rem 0.5rem;border-radius:4px;">Normalization &amp; Percentile</span>
              <h2 style="font-size:1.15rem;font-weight:700;margin:0.5rem 0 0.5rem;"><a href="/tools/rank" style="color:#0f172a;text-decoration:none;">Percentile Rank &amp; Normalization Predictor</a></h2>
              <p style="font-size:0.85rem;color:#475569;margin:0 0 1rem 0;">Provides an educational estimate of percentile rank and normalized score distribution across shifts. Explicitly labeled as an approximate statistical model.</p>
            </div>
            <a href="/tools/rank" style="font-size:0.85rem;font-weight:700;color:#7c3aed;text-decoration:none;">Launch Rank Predictor &rarr;</a>
          </article>

          <article style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span style="font-size:0.7rem;font-weight:700;color:#059669;background:#d1fae5;padding:0.2rem 0.5rem;border-radius:4px;">Discovery Matcher</span>
              <h2 style="font-size:1.15rem;font-weight:700;margin:0.5rem 0 0.5rem;"><a href="/tools/eligibility" style="color:#0f172a;text-decoration:none;">Instant Exam Eligibility Matcher</a></h2>
              <p style="font-size:0.85rem;color:#475569;margin:0 0 1rem 0;">Filter active government recruitment opportunities based on your age, degree stream, and social category to find examinations for which you meet notified criteria.</p>
            </div>
            <a href="/tools/eligibility" style="font-size:0.85rem;font-weight:700;color:#059669;text-decoration:none;">Launch Eligibility Matcher &rarr;</a>
          </article>

          <article style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span style="font-size:0.7rem;font-weight:700;color:#2563eb;background:#eff6ff;padding:0.2rem 0.5rem;border-radius:4px;">Document Formatting</span>
              <h2 style="font-size:1.15rem;font-weight:700;margin:0.5rem 0 0.5rem;"><a href="/tools/photo-checker" style="color:#0f172a;text-decoration:none;">Photo &amp; Signature Compliance Checker</a></h2>
              <p style="font-size:0.85rem;color:#475569;margin:0 0 1rem 0;">Check image width, height, and file size in kilobytes against official requirements for SSC, UPSC, IBPS, and Railway portals. Completely client-side and private.</p>
            </div>
            <a href="/tools/photo-checker" style="font-size:0.85rem;font-weight:700;color:#2563eb;text-decoration:none;">Launch Photo Checker &rarr;</a>
          </article>

          <article style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span style="font-size:0.7rem;font-weight:700;color:#b45309;background:#fef3c7;padding:0.2rem 0.5rem;border-radius:4px;">DoPT Statutory Rules</span>
              <h2 style="font-size:1.15rem;font-weight:700;margin:0.5rem 0 0.5rem;"><a href="/tools/relaxation" style="color:#0f172a;text-decoration:none;">Category Age Relaxation Calculator</a></h2>
              <p style="font-size:0.85rem;color:#475569;margin:0 0 1rem 0;">Evaluates statutory age limit concessions and application fee exemptions under binding DoPT Office Memorandums for reserved and special category candidates.</p>
            </div>
            <a href="/tools/relaxation" style="font-size:0.85rem;font-weight:700;color:#b45309;text-decoration:none;">Launch Relaxation Tool &rarr;</a>
          </article>
        </div>
      </main>
      ${renderSiteFooter()}
    `;
  }
});

// 11. STANDALONE TOOLS ROUTES (/tools/salary, /tools/photo-checker, /tools/relaxation, /tools/age, /tools/marking, /tools/height, /tools/rank, /tools/eligibility)
const STANDALONE_TOOLS = [
  {
    path: '/tools/salary',
    title: '7th CPC In-Hand Salary Calculator — Pay Levels 1 to 18 Take-Home Pay',
    description: 'Calculate monthly gross salary, 10% NPS deduction, HRA (30%/20%/10%), DA, and net in-hand take-home pay under the 7th Central Pay Commission.',
    heading: '7th CPC In-Hand Salary Calculator (Central Government Pay Levels 1 to 18)',
    bodyText: `The 7th Central Pay Commission (7th CPC) governs remuneration, allowances, and statutory deductions for all central civil servants, defense civilian employees, and central police personnel. This calculator accurately computes monthly gross pay, statutory National Pension System (NPS) deductions, and net in-hand take-home pay across Pay Level 1 (Grade Pay ₹1800) through Pay Level 18 (Cabinet Secretary level).

Under Department of Expenditure rules, Dearness Allowance (DA) is calculated as a percentage of Basic Pay and is revised semi-annually in January and July. House Rent Allowance (HRA) is structured into three tiers based on city population classification: Class X cities (50 lakh+ population) receive 30% HRA, Class Y cities (5 to 50 lakh population) receive 20% HRA, and Class Z cities (below 5 lakh population) receive 10% HRA. Under the National Pension System Tier-I framework, exactly 10% of (Basic Pay + DA) is deducted every month toward the employee's retirement corpus, while the Central Government contributes a matching 14%.

Use this tool to compare pay across different central services including SSC CGL Assistants (Level 7, ₹44,900 Basic), RRB NTPC Station Masters (Level 6, ₹35,400 Basic), and Central Secretariat Stenographers (Level 4, ₹25,500 Basic). Always refer to the official appointment order and establishment rules for specific special allowances such as Transport Allowance, Special Duty Allowance, or Risk and Hardship allowances applicable to uniform personnel.`
  },
  {
    path: '/tools/photo-checker',
    title: 'Exam Photo & Signature Compliance Checker — SSC, UPSC & IBPS Presets',
    description: 'Client-side photo and signature dimensions, file size (KB limits), and aspect ratio validation tool based strictly on official exam notices.',
    heading: 'Exam Photo & Signature Compliance Checker (SSC, UPSC, IBPS & RRB Presets)',
    bodyText: `Online applications for major Indian competitive examinations are frequently rejected at the scrutiny stage due to non-compliant photograph and signature uploads. Each conducting body enforces precise dimensional, pixel resolution, and file size parameters. For instance, the Staff Selection Commission (SSC) requires live photograph capture or 20 KB to 50 KB JPG files with dimensions of 3.5 cm width by 4.5 cm height, while the Union Public Service Commission (UPSC) mandates file sizes between 20 KB and 300 KB with explicit minimum and maximum pixel boundaries.

This compliance checker processes your image entirely inside your web browser. No files are uploaded to any external server or saved in any remote database, preserving candidate privacy. You can verify image width, image height, aspect ratio, and file size in kilobytes against presets for SSC CGL, RRB NTPC, UPSC Civil Services, and IBPS PO. Ensure that photographs have a plain light or white background, neutral facial expression, visible ears, and no hats, tinted glasses, or head coverings that obscure facial features.`
  },
  {
    path: '/tools/relaxation',
    title: 'Fee & Category Age Relaxation Calculator — DoPT Statutory Rules',
    description: 'Determine exact upper age concessions and fee exemptions for OBC-NCL, SC, ST, PwBD, and Ex-Servicemen under Department of Personnel and Training (DoPT) rules.',
    heading: 'Category Age Relaxation & Fee Exemption Calculator (DoPT Statutory Guidelines)',
    bodyText: `Statutory reservations and age limit concessions in Central Government employment are governed by binding Office Memorandums issued by the Ministry of Personnel, Public Grievances and Pensions (Department of Personnel and Training - DoPT). Under Central rules, Other Backward Classes (Non-Creamy Layer) candidates are entitled to a 3-year relaxation above the unreserved upper age limit. Scheduled Castes (SC) and Scheduled Tribes (ST) candidates receive a 5-year upper age relaxation.

Candidates with Benchmark Disabilities (PwBD) receive a cumulative 10-year relaxation, which extends to 13 years for PwBD-OBC and 15 years for PwBD-SC/ST candidates. Ex-Servicemen (ESM) receive age concession equal to military service rendered plus 3 years, subject to central ceiling rules. Furthermore, female candidates, SC, ST, and PwBD candidates enjoy complete fee exemptions under standard central recruitment schemes. Use this calculator to determine your exact eligible upper age boundary for any advertised notification.`
  },
  {
    path: '/tools/age',
    title: 'Government Exam Age Calculator — Crucial Cutoff Date Calculation',
    description: 'Calculate your exact completed age in years, months, and days against the official gazette crucial cut-off date with statutory category relaxations.',
    heading: 'Crucial Cut-Off Age Calculator for Central & State Government Exams',
    bodyText: `In Indian government recruitment notifications, eligibility is never assessed on the date the candidate fills the application form. Instead, each commission establishes a statutory "Crucial Date" for determining age eligibility. For central examinations, this crucial date is traditionally either 1st August of the exam year (for exams conducted in the second half of the year) or 1st January (for exams conducted in the first half of the year), as mandated by DoPT circulars.

A candidate whose completed age falls even one day short of the minimum age (typically 18, 20, or 21 years) or exceeds the upper limit (typically 27, 30, or 32 years) on the crucial date is disqualified automatically during document verification. This calculator computes your exact chronological age in completed years, months, and calendar days on any specified cutoff date. It integrates reservation category relaxations so you can confidently confirm your eligibility before submitting fee payments.`
  },
  {
    path: '/tools/marking',
    title: 'Negative Marking Penalty Calculator — Net Exam Score Simulator',
    description: 'Calculate total marks scored, penalty deductions, and net percentage under 1/3, 1/4, and 0.50 negative marking schemes.',
    heading: 'Negative Marking Penalty & Net Raw Score Simulator',
    bodyText: `Modern computer-based competitive examinations utilize negative marking formulas to penalize random guessing. In typical SSC examinations, each incorrect response attracts a penalty of 0.50 marks (for 2-mark questions) or 0.25 marks (for 1-mark questions), representing a 1/4th deduction. Railway Recruitment Board (RRB) examinations and UPSC Prelims impose a strict 1/3rd penalty (0.33 deduction for a 1-mark question, or 0.66 marks deduction for a 2-mark question).

This scoring simulator computes gross marks from correct responses, total penalty points deducted from incorrect attempts, net raw score, and overall accuracy percentage. Practicing with accurate penalty simulations teaches candidates when to attempt calculated risks and when to omit questions with low confidence to maximize their normalized ranking brackets.`
  },
  {
    path: '/tools/height',
    title: 'Physical Height & Chest Standard (PST) Checker — Police & CAPF Exams',
    description: 'Verify minimum physical standard test (PST) height and chest expansion measurements for Delhi Police SI, SSC GD Constable, and CAPF recruitment.',
    heading: 'Physical Standard Test (PST) Height & Chest Measurement Checker',
    bodyText: `Recruitment to uniformed central services—including Central Armed Police Forces (CAPF: BSF, CRPF, CISF, ITBP, SSB), Delhi Police, and SSC GD Constable—mandates strict compliance with Physical Standard Test (PST) benchmarks set by the Ministry of Home Affairs (MHA). Male general candidates must typically possess a minimum height of 170 cm with an unexpanded chest measurement of 80 cm and minimum 5 cm expansion (85 cm expanded). Female candidates generally require a minimum height of 157 cm with no chest measurement criteria.

Statutory relaxations apply for candidates belonging to Scheduled Tribes (162.5 cm male, 150 cm female) and candidates hailing from hill areas of the North-Eastern states, Himachal Pradesh, Garhwal, Kumaon, and Gorkhas (165 cm male, 155 cm female). This tool evaluates your physical measurements against notified standards to verify that you will clear the mandatory measurement gate at physical rally stages.`
  },
  {
    path: '/tools/rank',
    title: 'Percentile Rank & Normalization Predictor — Shift Score Estimate',
    description: 'Statistical percentile rank and normalized score estimator based on candidate raw marks and shift difficulty distribution assumptions.',
    heading: 'Percentile Rank & Multi-Shift Normalization Predictor (Educational Estimate)',
    bodyText: `When examinations are conducted across multiple days and shifts—such as SSC CGL Tier-1 or RRB NTPC CBT-1—the conducting bodies apply a mathematical normalization formula to eliminate shift-to-shift difficulty variations. Conducting commissions like SSC and RRB utilize the Mean and Standard Deviation normalization formula approved by their technical advisory committees.

Under this mathematical method, candidates in tougher shifts with lower mean marks receive a positive score bonus, while candidates in easier shifts with higher mean scores receive smaller adjustments. This simulator provides an educational approximation of percentile rank brackets and normalized raw score shifts. Please note that this is a statistical model intended solely for study orientation; the final official scores are released exclusively by the conducting commissions in their scorecard portals.`
  },
  {
    path: '/tools/eligibility',
    title: 'Instant Exam Eligibility Matcher — Age, Category & Degree Filter',
    description: 'Multi-criteria recruitment finder matching date of birth, educational qualification, and social category against active government recruitments.',
    heading: 'Instant Government Job Eligibility Matcher (Multi-Criteria Filter)',
    bodyText: `Navigating dozens of simultaneous central and state recruitment notifications can be daunting. Different posts require different educational degrees (10th pass, 12th pass, Graduate in any stream, B.Tech/B.E., or LLB), varying age thresholds (18-25, 20-28, 21-30, or 21-32), and specific reservation category benefits.

This candidate discovery utility cross-references your exact date of birth, social reservation category, and highest educational qualification against active government notifications. It immediately outputs the active recruitments for which you meet the statutory eligibility requirements, complete with application closing deadlines and direct links to official notifications. Save time and never miss a recruitment drive for which you qualify.`
  }
];

for (const t of STANDALONE_TOOLS) {
  ROUTES.push({
    path: t.path,
    title: t.title,
    description: t.description,
    canonical: `${DOMAIN}${t.path}`,
    publishDate: '08 Oct 2026',
    render: () => {
      return `
        ${renderSiteHeader()}
        <main style="max-width:960px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
          <nav aria-label="Breadcrumb" style="font-size:0.8rem;color:#64748b;margin-bottom:1rem;">
            <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; <a href="/tools" style="color:#2563eb;text-decoration:none;">Calculators</a> &gt; <span>${escapeHtml(t.title.split('—')[0].trim())}</span>
          </nav>
          <header style="margin-bottom:2rem;border-bottom:1px solid #e2e8f0;padding-bottom:1.5rem;">
            <h1 style="font-size:2rem;font-weight:800;color:#0f172a;margin:0 0 0.75rem 0;">${escapeHtml(t.heading)}</h1>
            <p style="font-size:1rem;color:#475569;margin:0;">${escapeHtml(t.description)}</p>
          </header>
          <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:2rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);margin-bottom:2rem;">
            <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Statutory Principles &amp; Calculation Rules</h2>
            <div style="font-size:0.95rem;color:#334155;line-height:1.8;">
              ${t.bodyText.split('\n\n').map(p => `<p style="margin-bottom:1.25rem;">${escapeHtml(p)}</p>`).join('')}
            </div>
          </section>
          <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
            <h3 style="font-size:1.1rem;font-weight:700;color:#0f172a;margin:0 0 0.75rem 0;">Other Central Government Exam Utilities</h3>
            <ul style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0.75rem;padding:0;list-style:none;font-size:0.85rem;">
              <li><a href="/tools/salary" style="color:#2563eb;text-decoration:none;">&bull; 7th CPC Salary Calculator</a></li>
              <li><a href="/tools/age" style="color:#2563eb;text-decoration:none;">&bull; Cut-Off Age Calculator</a></li>
              <li><a href="/tools/marking" style="color:#2563eb;text-decoration:none;">&bull; Negative Marking Simulator</a></li>
              <li><a href="/tools/height" style="color:#2563eb;text-decoration:none;">&bull; Physical Height Checker</a></li>
              <li><a href="/tools/rank" style="color:#2563eb;text-decoration:none;">&bull; Percentile Rank Predictor</a></li>
              <li><a href="/tools/eligibility" style="color:#2563eb;text-decoration:none;">&bull; Exam Eligibility Matcher</a></li>
              <li><a href="/tools/photo-checker" style="color:#2563eb;text-decoration:none;">&bull; Photo Compliance Tool</a></li>
              <li><a href="/tools/relaxation" style="color:#2563eb;text-decoration:none;">&bull; Category Relaxation Tool</a></li>
            </ul>
          </section>
        </main>
        ${renderSiteFooter()}
      `;
    }
  });
}

// 12. /data/vacancies & /vacancies ROUTE
function renderVacancyTrackerRoute() {
  return `
    ${renderSiteHeader()}
    <main style="max-width:1200px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
      <nav aria-label="Breadcrumb" style="font-size:0.8rem;color:#64748b;margin-bottom:1rem;">
        <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; <span>Vacancy Tracker</span>
      </nav>
      <header style="margin-bottom:2rem;border-bottom:1px solid #e2e8f0;padding-bottom:1.5rem;">
        <h1 style="font-size:2rem;font-weight:800;color:#0f172a;margin:0 0 0.5rem 0;">Multi-Year Central Exam Vacancy Tracker (2020–2026)</h1>
        <p style="font-size:1rem;color:#475569;margin:0;">Longitudinal analysis of recruitment intake numbers across major Central Government commissions (SSC, RRB, UPSC, IBPS) sourced directly from official annual reports and gazette write-ups.</p>
      </header>

      <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Historical Vacancy Comparison Table</h2>
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;font-size:0.85rem;text-align:left;">
            <thead>
              <tr style="background:#f1f5f9;color:#0f172a;border-bottom:2px solid #cbd5e1;">
                <th style="padding:0.75rem 1rem;">Examination</th>
                <th style="padding:0.75rem 1rem;">Conducting Body</th>
                <th style="padding:0.75rem 1rem;text-align:center;">2021</th>
                <th style="padding:0.75rem 1rem;text-align:center;">2022</th>
                <th style="padding:0.75rem 1rem;text-align:center;">2023</th>
                <th style="padding:0.75rem 1rem;text-align:center;">2024</th>
                <th style="padding:0.75rem 1rem;text-align:center;">2025/2026 Notified</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:0.75rem 1rem;font-weight:600;"><a href="/exams/ssc-cgl" style="color:#2563eb;text-decoration:none;">SSC CGL</a></td>
                <td style="padding:0.75rem 1rem;">Staff Selection Commission</td>
                <td style="padding:0.75rem 1rem;text-align:center;">7,686</td>
                <td style="padding:0.75rem 1rem;text-align:center;">36,012</td>
                <td style="padding:0.75rem 1rem;text-align:center;">8,415</td>
                <td style="padding:0.75rem 1rem;text-align:center;">17,727</td>
                <td style="padding:0.75rem 1rem;text-align:center;font-weight:700;color:#1e40af;">14,500+</td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:0.75rem 1rem;font-weight:600;"><a href="/exams/rrb-ntpc" style="color:#2563eb;text-decoration:none;">RRB NTPC</a></td>
                <td style="padding:0.75rem 1rem;">Railway Recruitment Boards</td>
                <td style="padding:0.75rem 1rem;text-align:center;">35,281</td>
                <td style="padding:0.75rem 1rem;text-align:center;">—</td>
                <td style="padding:0.75rem 1rem;text-align:center;">—</td>
                <td style="padding:0.75rem 1rem;text-align:center;">11,558</td>
                <td style="padding:0.75rem 1rem;text-align:center;font-weight:700;color:#1e40af;">11,558</td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:0.75rem 1rem;font-weight:600;"><a href="/exams/upsc-cse" style="color:#2563eb;text-decoration:none;">UPSC CSE</a></td>
                <td style="padding:0.75rem 1rem;">Union Public Service Commission</td>
                <td style="padding:0.75rem 1rem;text-align:center;">712</td>
                <td style="padding:0.75rem 1rem;text-align:center;">1,011</td>
                <td style="padding:0.75rem 1rem;text-align:center;">1,105</td>
                <td style="padding:0.75rem 1rem;text-align:center;">1,056</td>
                <td style="padding:0.75rem 1rem;text-align:center;font-weight:700;color:#1e40af;">1,056</td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:0.75rem 1rem;font-weight:600;"><a href="/exams/ibps-po" style="color:#2563eb;text-decoration:none;">IBPS PO</a></td>
                <td style="padding:0.75rem 1rem;">Institute of Banking Personnel Selection</td>
                <td style="padding:0.75rem 1rem;text-align:center;">4,135</td>
                <td style="padding:0.75rem 1rem;text-align:center;">8,432</td>
                <td style="padding:0.75rem 1rem;text-align:center;">5,314</td>
                <td style="padding:0.75rem 1rem;text-align:center;">4,455</td>
                <td style="padding:0.75rem 1rem;text-align:center;font-weight:700;color:#1e40af;">4,455</td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:0.75rem 1rem;font-weight:600;"><a href="/exams/ssc-chsl" style="color:#2563eb;text-decoration:none;">SSC CHSL</a></td>
                <td style="padding:0.75rem 1rem;">Staff Selection Commission</td>
                <td style="padding:0.75rem 1rem;text-align:center;">4,726</td>
                <td style="padding:0.75rem 1rem;text-align:center;">4,522</td>
                <td style="padding:0.75rem 1rem;text-align:center;">1,211</td>
                <td style="padding:0.75rem 1rem;text-align:center;">3,712</td>
                <td style="padding:0.75rem 1rem;text-align:center;font-weight:700;color:#1e40af;">3,712</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;font-size:0.85rem;color:#475569;">
        <h3 style="font-size:1.1rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem 0;">Methodology &amp; Verification Principles</h3>
        <p>All data entries are compiled from primary public records: annual commission reports, parliamentary question-and-answer transcripts, and official final recruitment result notices. Vacancy numbers reflect final revised tallies rather than initial tentative estimates whenever available. Cross-reference individual notifications via the <a href="/jobs" style="color:#2563eb;">Govt Jobs Directory</a>.</p>
      </section>
    </main>
    ${renderSiteFooter()}
  `;
}

ROUTES.push({
  path: '/data/vacancies',
  title: 'Multi-Year Central Exam Vacancy Tracker (2020–2026) — GovIndiaNews',
  description: 'Longitudinal historical vacancy database for SSC CGL, CHSL, RRB NTPC, RRB ALP, UPSC CSE, and IBPS PO sourced from official annual commission reports with CSV export.',
  canonical: `${DOMAIN}/data/vacancies`,
  publishDate: '08 Oct 2026',
  render: renderVacancyTrackerRoute
});
ROUTES.push({
  path: '/vacancies',
  title: 'Multi-Year Central Exam Vacancy Tracker (2020–2026) — GovIndiaNews',
  description: 'Longitudinal historical vacancy database for SSC CGL, CHSL, RRB NTPC, RRB ALP, UPSC CSE, and IBPS PO sourced from official annual commission reports with CSV export.',
  canonical: `${DOMAIN}/data/vacancies`,
  publishDate: '08 Oct 2026',
  render: renderVacancyTrackerRoute
});

// 13. EVERGREEN BLOG & KNOWLEDGE BASE (/blog, /blog/:slug, /army-running-time)
ROUTES.push({
  path: '/blog',
  title: 'Government Jobs & Scheme Knowledge Base (Evergreen Editorial Guides) — GovIndiaNews',
  description: 'Authoritative candidate guides on Army 1600m running benchmarks, PMKVY 4.0 and NAPS skill schemes, Agniveer career reservation, and 7th CPC salary rules.',
  canonical: `${DOMAIN}/blog`,
  publishDate: '08 Oct 2026',
  render: () => {
    return `
      ${renderSiteHeader()}
      <main style="max-width:1200px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
        <header style="margin-bottom:2rem;border-bottom:1px solid #e2e8f0;padding-bottom:1.5rem;">
          <nav aria-label="Breadcrumb" style="font-size:0.8rem;color:#64748b;margin-bottom:0.75rem;">
            <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; <span>Knowledge Base</span>
          </nav>
          <h1 style="font-size:2rem;font-weight:800;color:#0f172a;margin:0 0 0.5rem 0;">GovIndiaNews Candidate Knowledge Base &amp; Evergreen Guides</h1>
          <p style="font-size:1rem;color:#475569;margin:0;">Comprehensive reference guides for uniformed services physical training, central government employment generation schemes, and post-service career opportunities.</p>
        </header>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1.5rem;">
          ${BLOG_POSTS.map((post) => `
            <article style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;font-size:0.75rem;">
                  <span style="font-weight:700;color:#7c3aed;background:#ede9fe;padding:0.2rem 0.5rem;border-radius:4px;">${escapeHtml(post.categoryLabel)}</span>
                  <span style="color:#64748b;">${escapeHtml(post.readingTime)}</span>
                </div>
                <h2 style="font-size:1.15rem;font-weight:700;margin:0 0 0.5rem 0;line-height:1.35;">
                  <a href="/blog/${escapeHtml(post.slug)}" style="color:#0f172a;text-decoration:none;">${escapeHtml(post.title)}</a>
                </h2>
                <p style="font-size:0.85rem;color:#475569;margin:0 0 1rem 0;line-height:1.5;">${escapeHtml(post.summary)}</p>
                <div style="font-size:0.75rem;color:#64748b;">
                  <span>By ${escapeHtml(post.author)} &bull; Published: ${escapeHtml(post.publishDate)}</span>
                </div>
              </div>
              <div style="border-top:1px solid #f1f5f9;padding-top:0.75rem;margin-top:1rem;display:flex;justify-content:flex-end;">
                <a href="/blog/${escapeHtml(post.slug)}" style="font-size:0.85rem;font-weight:700;color:#7c3aed;text-decoration:none;">Read Full Guide &rarr;</a>
              </div>
            </article>
          `).join('')}
        </div>
      </main>
      ${renderSiteFooter()}
    `;
  }
});

// Blog posts individual routes
for (const post of BLOG_POSTS) {
  ROUTES.push({
    path: `/blog/${post.slug}`,
    title: `${post.title} — GovIndiaNews`,
    description: post.summary,
    canonical: `${DOMAIN}/blog/${post.slug}`,
    publishDate: post.publishDate || '08 Oct 2026',
    render: () => {
      return `
        ${renderSiteHeader()}
        <main style="max-width:960px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
          <nav aria-label="Breadcrumb" style="font-size:0.8rem;color:#64748b;margin-bottom:1rem;">
            <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; <a href="/blog" style="color:#2563eb;text-decoration:none;">Knowledge Base</a> &gt; <span>${escapeHtml(post.title)}</span>
          </nav>
          <header style="margin-bottom:2rem;border-bottom:1px solid #e2e8f0;padding-bottom:1.5rem;">
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;font-size:0.75rem;">
              <span style="font-weight:700;color:#7c3aed;background:#ede9fe;padding:0.25rem 0.6rem;border-radius:4px;">${escapeHtml(post.categoryLabel)}</span>
              <span style="color:#64748b;">${escapeHtml(post.readingTime)} &bull; Published: ${escapeHtml(post.publishDate)}</span>
            </div>
            <h1 style="font-size:2.2rem;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 1rem 0;">${escapeHtml(post.title)}</h1>
            <p style="font-size:1.05rem;color:#475569;margin:0 0 1rem 0;font-style:italic;">${escapeHtml(post.summary)}</p>
            <div style="font-size:0.8rem;color:#64748b;">
              By <strong>${escapeHtml(post.author)}</strong> &bull; Verified against statutory guidelines
            </div>
          </header>

          <article style="font-size:0.95rem;color:#334155;line-height:1.8;">
            ${post.sections.map((sec) => `
              <section style="margin-bottom:2.5rem;">
                <h2 style="font-size:1.4rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;border-bottom:1px solid #f1f5f9;padding-bottom:0.5rem;">${escapeHtml(sec.heading)}</h2>
                <div>${sec.content.split('\n\n').map(p => `<p style="margin-bottom:1rem;">${escapeHtml(p)}</p>`).join('')}</div>
              </section>
            `).join('')}

            ${post.faqs && post.faqs.length > 0 ? `
              <section style="margin-bottom:2.5rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;">
                <h2 style="font-size:1.3rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Frequently Asked Questions</h2>
                <div style="display:flex;flex-direction:column;gap:1rem;">
                  ${post.faqs.map(f => `
                    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;">
                      <h3 style="font-size:0.95rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem 0;">${escapeHtml(f.question)}</h3>
                      <p style="font-size:0.85rem;color:#475569;margin:0;line-height:1.6;">${escapeHtml(f.answer)}</p>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}
          </article>
        </main>
        ${renderSiteFooter()}
      `;
    }
  });
}

// Army running time alias route
ROUTES.push({
  path: '/army-running-time',
  title: 'Indian Army 1600m Running Time, Standards & PFT Guide — GovIndiaNews',
  description: 'Official Indian Army Physical Fitness Test (PFT) 1600m running benchmarks, Group 1 vs Group 2 timings, marks breakdown, and 8-week interval stamina training blueprint.',
  canonical: `${DOMAIN}/blog/army-1600-meter-running-time-agniveer-pft-standards`,
  publishDate: '08 Oct 2026',
  render: () => {
    const post = BLOG_POSTS.find(p => p.slug === 'army-1600-meter-running-time-agniveer-pft-standards') || BLOG_POSTS[0];
    return `
      ${renderSiteHeader()}
      <main style="max-width:960px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
        <nav aria-label="Breadcrumb" style="font-size:0.8rem;color:#64748b;margin-bottom:1rem;">
          <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; <a href="/blog" style="color:#2563eb;text-decoration:none;">Knowledge Base</a> &gt; <span>Army 1600m Standards</span>
        </nav>
        <header style="margin-bottom:2rem;border-bottom:1px solid #e2e8f0;padding-bottom:1.5rem;">
          <h1 style="font-size:2.2rem;font-weight:800;color:#0f172a;margin:0 0 1rem 0;">Indian Army 1600m Running Standards, Timings &amp; Agniveer PFT Blueprint</h1>
          <p style="font-size:1.05rem;color:#475569;margin:0 0 1rem 0;">Complete physical rally benchmarks for Agniveer General Duty, Technical, and Tradesmen recruitment.</p>
        </header>
        <article style="font-size:0.95rem;color:#334155;line-height:1.8;">
          ${post.sections.map((sec) => `
            <section style="margin-bottom:2rem;">
              <h2 style="font-size:1.35rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">${escapeHtml(sec.heading)}</h2>
              <div>${sec.content.split('\n\n').map(p => `<p style="margin-bottom:1rem;">${escapeHtml(p)}</p>`).join('')}</div>
            </section>
          `).join('')}
        </article>
      </main>
      ${renderSiteFooter()}
    `;
  }
});

// 14. /mock-test/ssc-cgl-tier1 ROUTE
ROUTES.push({
  path: '/mock-test/ssc-cgl-tier1',
  title: 'SSC CGL Tier-1 Official Previous Year Paper Mock Test Simulator — GovIndiaNews',
  description: 'Practice real SSC CGL Tier-1 previous year questions with authentic CBT interface, timer, negative marking penalty calculation, and detailed solution explanations.',
  canonical: `${DOMAIN}/mock-test/ssc-cgl-tier1`,
  publishDate: '08 Oct 2026',
  render: () => {
    return `
      ${renderSiteHeader()}
      <main style="max-width:960px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
        <nav aria-label="Breadcrumb" style="font-size:0.8rem;color:#64748b;margin-bottom:1rem;">
          <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; <span>Mock Tests</span> &gt; <span>SSC CGL Tier-1</span>
        </nav>
        <header style="margin-bottom:2rem;border-bottom:1px solid #e2e8f0;padding-bottom:1.5rem;">
          <h1 style="font-size:2rem;font-weight:800;color:#0f172a;margin:0 0 0.5rem 0;">SSC CGL Tier-1 Previous Year CBT Simulator</h1>
          <p style="font-size:1rem;color:#475569;margin:0;">Authentic computer-based test simulator featuring 100 questions across General Intelligence, General Awareness, Quantitative Aptitude, and English Comprehension.</p>
        </header>
        <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:2rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);margin-bottom:2rem;">
          <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Examination Scheme &amp; Instructions</h2>
          <p style="margin-bottom:1rem;">The SSC Combined Graduate Level (Tier-1) Examination consists of 100 multiple choice questions carrying a total of 200 marks. The standard duration is 60 minutes (80 minutes for eligible PwBD candidates). Each question carries 2 marks for a correct answer, and an incorrect attempt incurs a negative penalty of 0.50 marks.</p>
          <ul style="padding-left:1.5rem;margin-bottom:1.5rem;line-height:1.8;">
            <li><strong>General Intelligence &amp; Reasoning:</strong> 25 Questions (50 Marks)</li>
            <li><strong>General Awareness:</strong> 25 Questions (50 Marks)</li>
            <li><strong>Quantitative Aptitude:</strong> 25 Questions (50 Marks)</li>
            <li><strong>English Comprehension:</strong> 25 Questions (50 Marks)</li>
          </ul>
          <p>Launch the interactive practice engine in your browser to attempt questions with live palette tracking, timer simulation, and instant performance analysis.</p>
        </section>
        <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;">
          <h3 style="font-size:1.1rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem 0;">Related Preparation Utilities</h3>
          <p>Use our companion utilities: <a href="/tools/marking" style="color:#2563eb;">Negative Marking Calculator</a> &bull; <a href="/exams/ssc-cgl" style="color:#2563eb;">SSC CGL Complete Blueprint</a> &bull; <a href="/tools/salary" style="color:#2563eb;">7th CPC Salary Calculator</a> &bull; <a href="/cut-off" style="color:#2563eb;">SSC CGL Tier-1 Cut-Off Marks</a>.</p>
        </section>
      </main>
      ${renderSiteFooter()}
    `;
  }
});

// 15. ALL EXAM HUBS INDIVIDUAL ROUTES (/exams/:slug)
for (const hub of EXAM_HUBS) {
  ROUTES.push({
    path: `/exams/${hub.slug}`,
    title: `${hub.title} — GovIndiaNews`,
    description: `${hub.examName} comprehensive examination blueprint. Eligibility, selection stages, syllabus, 7th CPC salary, and preparation strategy.`,
    canonical: `${DOMAIN}/exams/${hub.slug}`,
    publishDate: hub.lastReviewed || '08 Oct 2026',
    hubData: hub,
    render: () => {
      return `
        ${renderSiteHeader()}
        <main style="max-width:1080px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
          <nav aria-label="Breadcrumb" style="font-size:0.8rem;color:#64748b;margin-bottom:1rem;">
            <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; <a href="/exams" style="color:#2563eb;text-decoration:none;">Exam Hubs</a> &gt; <span>${escapeHtml(hub.examName)}</span>
          </nav>
          <header style="margin-bottom:2.5rem;border-bottom:1px solid #e2e8f0;padding-bottom:1.5rem;">
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;font-size:0.75rem;">
              <span style="font-weight:700;color:#1e40af;background:#dbeafe;padding:0.25rem 0.6rem;border-radius:4px;">Official Guide</span>
              <span style="color:#64748b;">${escapeHtml(hub.conductingBody)} &bull; Reviewed: ${escapeHtml(hub.lastReviewed)}</span>
            </div>
            <h1 style="font-size:2.25rem;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 1rem 0;">${escapeHtml(hub.title)}</h1>
            <p style="font-size:1.05rem;color:#475569;margin:0 0 1.5rem 0;">${escapeHtml(hub.overview)}</p>
            <div style="display:flex;flex-wrap:wrap;gap:1rem;font-size:0.85rem;">
              <a href="${escapeHtml(hub.officialUrl)}" target="_blank" rel="noopener noreferrer" style="background:#2563eb;color:#ffffff;padding:0.5rem 1rem;border-radius:6px;font-weight:700;text-decoration:none;">Official Portal (${escapeHtml(hub.conductingBody)}) &nearr;</a>
              <a href="/tools/salary" style="background:#f1f5f9;color:#0f172a;padding:0.5rem 1rem;border-radius:6px;font-weight:700;text-decoration:none;border:1px solid #cbd5e1;">7th CPC In-Hand Calculator</a>
              <a href="/exams" style="color:#64748b;padding:0.5rem;font-weight:600;text-decoration:none;">&larr; All 15 Exam Hubs</a>
            </div>
          </header>

          <article>
            <!-- 1. Eligibility -->
            <section style="margin-bottom:2.5rem;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;">
              <h2 style="font-size:1.4rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">1. Statutory Eligibility Criteria</h2>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;font-size:0.85rem;">
                <div style="background:#f8fafc;padding:1rem;border-radius:8px;">
                  <strong style="color:#0f172a;display:block;margin-bottom:0.25rem;">Age Limit &amp; Crucial Date:</strong>
                  <p style="margin:0;color:#475569;">${escapeHtml(hub.eligibility.ageLimit)}</p>
                </div>
                <div style="background:#f8fafc;padding:1rem;border-radius:8px;">
                  <strong style="color:#0f172a;display:block;margin-bottom:0.25rem;">Educational Qualification:</strong>
                  <p style="margin:0;color:#475569;">${escapeHtml(hub.eligibility.educationalQualification)}</p>
                </div>
                <div style="background:#f8fafc;padding:1rem;border-radius:8px;">
                  <strong style="color:#0f172a;display:block;margin-bottom:0.25rem;">Nationality:</strong>
                  <p style="margin:0;color:#475569;">${escapeHtml(hub.eligibility.nationality)}</p>
                </div>
                <div style="background:#f8fafc;padding:1rem;border-radius:8px;">
                  <strong style="color:#0f172a;display:block;margin-bottom:0.25rem;">Permissible Attempts:</strong>
                  <p style="margin:0;color:#475569;">${escapeHtml(hub.eligibility.attempts)}</p>
                </div>
              </div>
            </section>

            <!-- 2. Selection Stages -->
            <section style="margin-bottom:2.5rem;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;">
              <h2 style="font-size:1.4rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">2. Multi-Stage Selection Framework</h2>
              <div style="display:flex;flex-direction:column;gap:1rem;">
                ${hub.selectionStages.map(s => `
                  <div style="background:#f8fafc;border-left:4px solid #2563eb;padding:1rem;border-radius:0 8px 8px 0;font-size:0.85rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.25rem;">
                      <strong style="color:#1e40af;font-size:0.95rem;">${escapeHtml(s.stage)}: ${escapeHtml(s.name)}</strong>
                      <span style="color:#64748b;font-weight:600;">${escapeHtml(s.mode)}</span>
                    </div>
                    <p style="margin:0;color:#475569;">${escapeHtml(s.details)}</p>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- 3. Syllabus & Pattern Table -->
            <section style="margin-bottom:2.5rem;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;">
              <h2 style="font-size:1.4rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">3. Examination Scheme &amp; Syllabus</h2>
              <p style="font-size:0.9rem;color:#475569;margin-bottom:1rem;">${escapeHtml(hub.syllabusAndPattern.overview)}</p>
              <div style="overflow-x:auto;">
                <table style="width:100%;border-collapse:collapse;font-size:0.85rem;text-align:left;">
                  <thead>
                    <tr style="background:#f1f5f9;color:#0f172a;border-bottom:2px solid #cbd5e1;">
                      <th style="padding:0.6rem 0.75rem;">Section / Paper</th>
                      <th style="padding:0.6rem 0.75rem;text-align:center;">Questions</th>
                      <th style="padding:0.6rem 0.75rem;text-align:center;">Marks</th>
                      <th style="padding:0.6rem 0.75rem;">Duration</th>
                      <th style="padding:0.6rem 0.75rem;">Negative Marking</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${hub.syllabusAndPattern.patternTable.map(r => `
                      <tr style="border-bottom:1px solid #e2e8f0;">
                        <td style="padding:0.6rem 0.75rem;font-weight:600;color:#0f172a;">${escapeHtml(r.section)}</td>
                        <td style="padding:0.6rem 0.75rem;text-align:center;">${escapeHtml(r.questions)}</td>
                        <td style="padding:0.6rem 0.75rem;text-align:center;">${escapeHtml(r.marks)}</td>
                        <td style="padding:0.6rem 0.75rem;">${escapeHtml(r.duration)}</td>
                        <td style="padding:0.6rem 0.75rem;color:#dc2626;">${escapeHtml(r.negativeMarking)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </section>

            <!-- 4. Pay Scale & Career Ladder -->
            <section style="margin-bottom:2.5rem;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;font-size:0.85rem;">
              <h2 style="font-size:1.4rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">4. 7th CPC Pay Scale &amp; Career Growth</h2>
              <div style="background:#f8fafc;padding:1rem;border-radius:8px;margin-bottom:1rem;">
                <strong style="color:#0f172a;display:block;margin-bottom:0.25rem;">Pay Level &amp; Grade Pay:</strong>
                <p style="margin:0 0 0.5rem 0;color:#475569;">${escapeHtml(hub.payAndCareerGrowth?.payLevel || 'As notified')}</p>
                <strong style="color:#0f172a;display:block;margin-bottom:0.25rem;">Starting Basic &amp; In-Hand Range:</strong>
                <p style="margin:0;color:#475569;">${escapeHtml(hub.payAndCareerGrowth?.startingBasic || '')} (Estimated in-hand: ${escapeHtml(hub.payAndCareerGrowth?.inHandRange || '')})</p>
              </div>
              <div>
                <strong style="color:#0f172a;display:block;margin-bottom:0.5rem;">Hierarchical Promotion Ladder:</strong>
                <ol style="padding-left:1.25rem;margin:0;color:#475569;line-height:1.8;">
                  ${(hub.payAndCareerGrowth?.hierarchy || []).map(h => `<li>${escapeHtml(h)}</li>`).join('')}
                </ol>
              </div>
            </section>

            <!-- 5. Frequently Asked Questions -->
            <section style="margin-bottom:2.5rem;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;">
              <h2 style="font-size:1.4rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">5. Frequently Asked Questions (${escapeHtml(hub.examName)})</h2>
              <div style="display:flex;flex-direction:column;gap:1rem;">
                ${hub.faqs.map(f => `
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;">
                    <h3 style="font-size:0.95rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem 0;">${escapeHtml(f.question)}</h3>
                    <p style="font-size:0.85rem;color:#475569;margin:0;line-height:1.6;">${escapeHtml(f.answer)}</p>
                  </div>
                `).join('')}
              </div>
            </section>
          </article>
        </main>
        ${renderSiteFooter()}
      `;
    }
  });
}

// 16. ALL APPLICATION GUIDES INDIVIDUAL ROUTES (/guides/:slug)
for (const guide of APPLICATION_GUIDES) {
  ROUTES.push({
    path: `/guides/${guide.slug}`,
    title: `${guide.title} — GovIndiaNews`,
    description: guide.summary,
    canonical: `${DOMAIN}/guides/${guide.slug}`,
    publishDate: guide.lastUpdated || '08 Oct 2026',
    guideData: guide,
    render: () => {
      return `
        ${renderSiteHeader()}
        <main style="max-width:960px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
          <nav aria-label="Breadcrumb" style="font-size:0.8rem;color:#64748b;margin-bottom:1rem;">
            <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; <a href="/guides" style="color:#2563eb;text-decoration:none;">Guides</a> &gt; <span>${escapeHtml(guide.title)}</span>
          </nav>
          <header style="margin-bottom:2rem;border-bottom:1px solid #e2e8f0;padding-bottom:1.5rem;">
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;font-size:0.75rem;">
              <span style="font-weight:700;color:#059669;background:#d1fae5;padding:0.25rem 0.6rem;border-radius:4px;">${escapeHtml(guide.category)}</span>
              <span style="color:#64748b;">${escapeHtml(guide.readingTime)} &bull; Last updated: ${escapeHtml(guide.lastUpdated)}</span>
            </div>
            <h1 style="font-size:2.2rem;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 1rem 0;">${escapeHtml(guide.title)}</h1>
            <p style="font-size:1.05rem;color:#475569;margin:0 0 1rem 0;font-style:italic;border-left:3px solid #2563eb;padding-left:1rem;">${escapeHtml(guide.summary)}</p>
            <div style="font-size:0.8rem;color:#64748b;">
              By <strong>${escapeHtml(guide.author)}</strong> &bull; Verified against central statutory gazettes and DoPT memorandums
            </div>
          </header>

          <article style="font-size:0.95rem;color:#334155;line-height:1.8;">
            ${guide.sections.map((sec) => `
              <section style="margin-bottom:2.5rem;">
                <h2 style="font-size:1.4rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;border-bottom:1px solid #f1f5f9;padding-bottom:0.5rem;">${escapeHtml(sec.heading)}</h2>
                <div>${sec.content.split('\n\n').map(p => `<p style="margin-bottom:1rem;">${escapeHtml(p)}</p>`).join('')}</div>
              </section>
            `).join('')}

            ${guide.faqs && guide.faqs.length > 0 ? `
              <section style="margin-bottom:2.5rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;">
                <h2 style="font-size:1.3rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Frequently Asked Questions</h2>
                <div style="display:flex;flex-direction:column;gap:1rem;">
                  ${guide.faqs.map(f => `
                    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;">
                      <h3 style="font-size:0.95rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem 0;">${escapeHtml(f.question)}</h3>
                      <p style="font-size:0.85rem;color:#475569;margin:0;line-height:1.6;">${escapeHtml(f.answer)}</p>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}
          </article>
        </main>
        ${renderSiteFooter()}
      `;
    }
  });
}

function renderBoardExamArticleContent(alert) {
  const quickFacts = alert.quickFacts || [
    { detail: 'Form opens', information: '8 October 2026' },
    { detail: 'Last date (no late fee)', information: '23 October 2026 (Friday)' },
    { detail: 'Late fee window', information: '24 to 30 October 2026' },
    { detail: 'Late fee', information: '₹2,000, on top of the normal fee' },
    { detail: 'Class 10 private exams', information: 'February to March 2027' },
    { detail: 'Class 12 private exams', information: 'February to April 2027' },
    { detail: 'Separate private exam?', information: 'No, papers run alongside the main board exams' },
    { detail: 'Apply at', information: 'cbse.gov.in → Private Candidate link' },
  ];

  const whoClass10 = alert.whoCanApplyClass10 || [];
  const whoClass12 = alert.whoCanApplyClass12 || [];
  const goodToKnow = alert.goodToKnow || [];
  const feesTable = alert.feesTable || [];
  const howToApply = alert.howToApplySteps || [];
  const documents = alert.documentsNeeded || [];
  const mistakes = alert.commonRejectionMistakes || [];

  return `
    <section style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:1.5rem;margin-bottom:2rem;font-size:0.95rem;line-height:1.6;color:#1e3a8a;">
      <p style="margin:0;"><strong>In short:</strong> CBSE opened private candidate registration for the 2027 Class 10 and 12 board exams on 8 October 2026. The last date without a late fee is <strong>23 October 2026</strong>. Applications with a late fee of ₹2,000 are accepted from 24 to 30 October. Apply only at <a href="https://www.cbse.gov.in/newsite/private/index.html" target="_blank" rel="noopener noreferrer" style="color:#2563eb;font-weight:700;">cbse.gov.in</a>.</p>
    </section>

    <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
      <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Quick facts</h2>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem;text-align:left;">
          <thead>
            <tr style="background:#f1f5f9;color:#0f172a;border-bottom:2px solid #cbd5e1;">
              <th style="padding:0.6rem 0.75rem;">Detail</th>
              <th style="padding:0.6rem 0.75rem;">Information</th>
            </tr>
          </thead>
          <tbody>
            ${quickFacts.map(q => `
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:0.6rem 0.75rem;font-weight:600;color:#0f172a;">${escapeHtml(q.detail)}</td>
                <td style="padding:0.6rem 0.75rem;color:#475569;">${escapeHtml(q.information)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
      <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Who can apply as a CBSE private candidate in 2027?</h2>
      <div style="margin-bottom:1.5rem;">
        <h3 style="font-size:1.05rem;font-weight:700;color:#1e40af;margin:0 0 0.5rem 0;">Class 10</h3>
        <ol style="margin:0;padding-left:1.5rem;color:#475569;font-size:0.9rem;line-height:1.6;">
          ${whoClass10.map(item => `<li style="margin-bottom:0.4rem;">${escapeHtml(item.replace(/\*\*/g, ''))}</li>`).join('')}
        </ol>
      </div>

      <div style="margin-bottom:1.5rem;">
        <h3 style="font-size:1.05rem;font-weight:700;color:#1e40af;margin:0 0 0.5rem 0;">Class 12</h3>
        <ol style="margin:0;padding-left:1.5rem;color:#475569;font-size:0.9rem;line-height:1.6;">
          ${whoClass12.map(item => `<li style="margin-bottom:0.4rem;">${escapeHtml(item.replace(/\*\*/g, ''))}</li>`).join('')}
        </ol>
      </div>

      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:1rem;font-size:0.85rem;color:#92400e;line-height:1.6;">
        <strong>Good to know:</strong>
        <ul style="margin:0.5rem 0 0;padding-left:1.25rem;">
          ${goodToKnow.map(item => `<li style="margin-bottom:0.3rem;">${escapeHtml(item)}</li>`).join('')}
        </ul>
      </div>
    </section>

    <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
      <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Fees (candidates in India)</h2>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem;text-align:left;">
          <thead>
            <tr style="background:#f1f5f9;color:#0f172a;border-bottom:2px solid #cbd5e1;">
              <th style="padding:0.6rem 0.75rem;">Item</th>
              <th style="padding:0.6rem 0.75rem;text-align:right;">Reported amount</th>
            </tr>
          </thead>
          <tbody>
            ${feesTable.map(f => `
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:0.6rem 0.75rem;font-weight:600;color:#0f172a;">${escapeHtml(f.item)}</td>
                <td style="padding:0.6rem 0.75rem;text-align:right;color:#0f172a;font-weight:700;">${escapeHtml(f.amount)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <p style="font-size:0.85rem;color:#64748b;margin:0.75rem 0 0;">Candidates from Nepal pay ₹1,100 per additional subject and those from other countries ₹2,200. Fees vary by category, so confirm your exact amount on the portal before paying.</p>
    </section>

    <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
      <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">How to apply, step by step</h2>
      <ol style="margin:0;padding-left:1.5rem;color:#475569;font-size:0.9rem;line-height:1.7;">
        ${howToApply.map(step => `<li style="margin-bottom:0.5rem;">${escapeHtml(step.replace(/\*\*/g, ''))}</li>`).join('')}
      </ol>
    </section>

    <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
      <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Documents and details to keep ready</h2>
      <ul style="margin:0;padding-left:1.5rem;color:#475569;font-size:0.9rem;line-height:1.7;">
        ${documents.map(doc => `<li style="margin-bottom:0.4rem;">${escapeHtml(doc)}</li>`).join('')}
      </ul>
    </section>

    <section style="background:#fff1f2;border:1px solid #fecdd3;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
      <h2 style="font-size:1.25rem;font-weight:700;color:#9f1239;margin:0 0 1rem 0;">7 mistakes that can get your form rejected</h2>
      <ol style="margin:0;padding-left:1.5rem;color:#881337;font-size:0.9rem;line-height:1.7;">
        ${mistakes.map(m => `<li style="margin-bottom:0.4rem;">${escapeHtml(m)}</li>`).join('')}
      </ol>
    </section>

    <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
      <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 0.75rem 0;">What about Class 10's two-exam system?</h2>
      <p style="font-size:0.9rem;color:#475569;line-height:1.6;margin:0;">Since 2026, Class 10 students take a mandatory Phase 1 in February and an optional improvement Phase 2 in May. A clear rule for how Phase 2 applies to private candidates in 2027 was not available when this article was written. Check the official notice before choosing your category.</p>
    </section>

    <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
      <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 0.75rem 0;">If you are not eligible</h2>
      <p style="font-size:0.9rem;color:#475569;line-height:1.6;margin:0;">If your category isn't covered, regular schooling or an open schooling board such as NIOS may be options. Confirm admission rules with them directly.</p>
    </section>

    ${alert.faqs && alert.faqs.length > 0 ? `
      <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
        <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Frequently asked questions</h2>
        <div style="display:flex;flex-direction:column;gap:1rem;">
          ${alert.faqs.map(f => `
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;">
              <h3 style="font-size:0.95rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem 0;">${escapeHtml(f.question)}</h3>
              <p style="font-size:0.85rem;color:#475569;margin:0;line-height:1.6;">${escapeHtml(f.answer)}</p>
            </div>
          `).join('')}
        </div>
      </section>
    ` : ''}

    <section style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:1.5rem;margin-bottom:2rem;font-size:0.85rem;">
      <h2 style="font-size:1.15rem;font-weight:700;color:#1e3a8a;margin:0 0 0.5rem 0;">Official links</h2>
      <p style="color:#1e40af;margin:0 0 1rem 0;">
        CBSE Private Candidate portal: <a href="https://www.cbse.gov.in/newsite/private/index.html" target="_blank" rel="noopener noreferrer" style="color:#2563eb;font-weight:700;">cbse.gov.in/newsite/private/index.html</a><br/>
        2027 curriculum: <a href="https://cbseacademic.nic.in/curriculum_2027.html" target="_blank" rel="noopener noreferrer" style="color:#2563eb;font-weight:700;">cbseacademic.nic.in/curriculum_2027.html</a>
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
        <a href="https://www.cbse.gov.in/newsite/private/index.html" target="_blank" rel="noopener noreferrer" style="background:#2563eb;color:#ffffff;padding:0.5rem 1rem;border-radius:6px;font-weight:700;text-decoration:none;">
          Open CBSE Private Portal &nearr;
        </a>
        <a href="https://cbseacademic.nic.in/curriculum_2027.html" target="_blank" rel="noopener noreferrer" style="background:#ffffff;color:#1e40af;padding:0.5rem 1rem;border-radius:6px;font-weight:600;text-decoration:none;border:1px solid #bfdbfe;">
          Open 2027 Curriculum &nearr;
        </a>
      </div>
    </section>

    <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;font-size:0.8rem;color:#64748b;font-style:italic;">
      ${escapeHtml(alert.editorialDisclaimer || 'GovIndiaNews is an independent publication and is not affiliated with CBSE or any government body. Details were compiled from CBSE\'s notice as reported by education outlets and may change. Always confirm on cbse.gov.in.')}
    </section>
  `;
}

// 17. ALL RECRUITMENT ALERTS INDIVIDUAL ROUTES (/article/:slug)
for (const alert of RECRUITMENT_ALERTS) {
  ROUTES.push({
    path: `/article/${alert.slug}`,
    title: alert.seoTitle || `${alert.title} — GovIndiaNews`,
    description: alert.metaDescription || alert.summary.slice(0, 160),
    canonical: `${DOMAIN}/article/${alert.slug}`,
    publishDate: alert.publishDate || '08 Oct 2026',
    alertData: alert,
    render: () => {
      const isBoardExam = alert.category === 'board-exams';
      return `
        ${renderSiteHeader()}
        <main style="max-width:1080px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
          <nav aria-label="Breadcrumb" style="font-size:0.8rem;color:#64748b;margin-bottom:1rem;">
            <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; <a href="${isBoardExam ? '/board-exams' : alert.category === 'admit-card' ? '/admit-card' : '/jobs'}" style="color:#2563eb;text-decoration:none;">${isBoardExam ? 'Board Exams' : alert.category === 'admit-card' ? 'Admit Card' : 'Jobs'}</a> &gt; <span>${escapeHtml(alert.organization)}</span>
          </nav>
          <header style="margin-bottom:2rem;border-bottom:1px solid #e2e8f0;padding-bottom:1.5rem;">
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem;margin-bottom:0.75rem;font-size:0.75rem;">
              <span style="font-weight:700;color:#1e40af;background:#dbeafe;padding:0.25rem 0.6rem;border-radius:4px;">${escapeHtml(alert.organization)}</span>
              <span style="color:#64748b;">Published: ${escapeHtml(alert.publishDate)} &bull; Reviewed: ${escapeHtml(alert.reviewedDate || alert.publishDate)}</span>
              <span style="color:${alert.status === 'verified' ? '#059669' : '#d97706'};font-weight:700;">${alert.status === 'verified' ? '&check; Gazette Verified' : 'Under Verification'}</span>
            </div>
            <h1 style="font-size:2.2rem;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 1rem 0;">${escapeHtml(alert.title)}</h1>
            <p style="font-size:1.05rem;color:#475569;margin:0 0 1.25rem 0;">${escapeHtml(alert.summary)}</p>
            <div style="font-size:0.8rem;color:#64748b;display:flex;flex-wrap:wrap;gap:1.5rem;">
              <span>By <strong>${escapeHtml(alert.author || 'Akash Singh Solanki')}</strong> (Founder &amp; Editor)</span>
              <span>Read time: ${escapeHtml(alert.readTime || '5 min')}</span>
            </div>
          </header>

          <article>
            ${isBoardExam ? renderBoardExamArticleContent(alert) : `
            <!-- Key Facts Summary Grid -->
            <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
              <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Notification Highlights</h2>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;font-size:0.85rem;">
                <div><strong>Conducting Body:</strong> <span style="color:#475569;">${escapeHtml(alert.organization)}</span></div>
                <div><strong>Qualification:</strong> <span style="color:#475569;">${escapeHtml(alert.qualification)}</span></div>
                <div><strong>Age Limit:</strong> <span style="color:#475569;">${escapeHtml(alert.ageLimit || 'As per official gazette')}</span></div>
                <div><strong>Application Fee:</strong> <span style="color:#475569;">${escapeHtml(alert.fees || 'Check notice')}</span></div>
                <div><strong>Last Date to Apply:</strong> <span style="color:#b91c1c;font-weight:700;">${escapeHtml(alert.lastDate || 'Refer to notice')}</span></div>
                ${alert.examDate ? `<div><strong>Exam Date:</strong> <span style="color:#1e40af;font-weight:700;">${escapeHtml(alert.examDate)}</span></div>` : ''}
              </div>
            </section>

            <!-- Important Dates Table -->
            ${alert.importantDates && alert.importantDates.length > 0 ? `
              <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
                <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Important Examination &amp; Application Dates</h2>
                <div style="overflow-x:auto;">
                  <table style="width:100%;border-collapse:collapse;font-size:0.85rem;text-align:left;">
                    <thead>
                      <tr style="background:#f1f5f9;color:#0f172a;border-bottom:2px solid #cbd5e1;">
                        <th style="padding:0.6rem 0.75rem;">Recruitment Event / Milestone</th>
                        <th style="padding:0.6rem 0.75rem;">Official Date / Schedule</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${alert.importantDates.map(d => `
                        <tr style="border-bottom:1px solid #e2e8f0;">
                          <td style="padding:0.6rem 0.75rem;font-weight:600;color:#0f172a;">${escapeHtml(d.event)}</td>
                          <td style="padding:0.6rem 0.75rem;color:#475569;">${escapeHtml(d.date)}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </section>
            ` : ''}

            <!-- Application Fees Table -->
            ${alert.applicationFees && alert.applicationFees.length > 0 ? `
              <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
                <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Application Fee by Reservation Category</h2>
                <div style="overflow-x:auto;">
                  <table style="width:100%;border-collapse:collapse;font-size:0.85rem;text-align:left;">
                    <thead>
                      <tr style="background:#f1f5f9;color:#0f172a;border-bottom:2px solid #cbd5e1;">
                        <th style="padding:0.6rem 0.75rem;">Candidate Category</th>
                        <th style="padding:0.6rem 0.75rem;">Prescribed Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${alert.applicationFees.map(f => `
                        <tr style="border-bottom:1px solid #e2e8f0;">
                          <td style="padding:0.6rem 0.75rem;font-weight:600;color:#0f172a;">${escapeHtml(f.category)}</td>
                          <td style="padding:0.6rem 0.75rem;color:#475569;">${escapeHtml(f.fee)}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </section>
            ` : ''}

            <!-- Vacancy Breakdown Table -->
            ${alert.vacanciesTable && alert.vacanciesTable.length > 0 ? `
              <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
                <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Post-Wise Vacancy &amp; Pay Scale Breakdown</h2>
                <div style="overflow-x:auto;">
                  <table style="width:100%;border-collapse:collapse;font-size:0.85rem;text-align:left;">
                    <thead>
                      <tr style="background:#f1f5f9;color:#0f172a;border-bottom:2px solid #cbd5e1;">
                        <th style="padding:0.6rem 0.75rem;">Post Name</th>
                        <th style="padding:0.6rem 0.75rem;">Department</th>
                        <th style="padding:0.6rem 0.75rem;">Pay Scale</th>
                        <th style="padding:0.6rem 0.75rem;text-align:center;">Vacancies</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${alert.vacanciesTable.map(v => `
                        <tr style="border-bottom:1px solid #e2e8f0;">
                          <td style="padding:0.6rem 0.75rem;font-weight:600;color:#0f172a;">${escapeHtml(v.postName)}</td>
                          <td style="padding:0.6rem 0.75rem;">${escapeHtml(v.department)}</td>
                          <td style="padding:0.6rem 0.75rem;">${escapeHtml(v.payScale)}</td>
                          <td style="padding:0.6rem 0.75rem;text-align:center;font-weight:700;">${escapeHtml(v.vacancy)}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </section>
            ` : ''}

            <!-- Selection Process -->
            ${alert.selectionProcess && alert.selectionProcess.length > 0 ? `
              <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
                <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Selection Process &amp; Stages</h2>
                <div style="display:flex;flex-direction:column;gap:1rem;">
                  ${alert.selectionProcess.map(s => `
                    <div style="background:#f8fafc;border-left:4px solid #059669;padding:1rem;border-radius:0 8px 8px 0;font-size:0.85rem;">
                      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.25rem;">
                        <strong style="color:#065f46;font-size:0.95rem;">${escapeHtml(s.stageNumber)}: ${escapeHtml(s.stageName)}</strong>
                        <span style="color:#64748b;">${escapeHtml(s.qualifyingNature)}</span>
                      </div>
                      <p style="margin:0;color:#475569;">${escapeHtml(s.description)}</p>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}

            <!-- Frequently Asked Questions -->
            ${alert.faqs && alert.faqs.length > 0 ? `
              <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;">
                <h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 1rem 0;">Frequently Asked Questions (${escapeHtml(alert.organization)})</h2>
                <div style="display:flex;flex-direction:column;gap:1rem;">
                  ${alert.faqs.map(f => `
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;">
                      <h3 style="font-size:0.95rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem 0;">${escapeHtml(f.question)}</h3>
                      <p style="font-size:0.85rem;color:#475569;margin:0;line-height:1.6;">${escapeHtml(f.answer)}</p>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}

            <!-- Source Notice Verification & Official Links -->
            <section style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:1.5rem;margin-bottom:2rem;font-size:0.85rem;">
              <h2 style="font-size:1.15rem;font-weight:700;color:#1e3a8a;margin:0 0 0.5rem 0;">Primary Gazette Source Notice</h2>
              <p style="color:#1e40af;margin:0 0 1rem 0;">
                Notice Title: <strong>${escapeHtml(alert.sourceNotice?.title || alert.title)}</strong><br/>
                Verified on: <strong>${escapeHtml(alert.sourceNotice?.checkedOn || alert.publishDate)}</strong>
              </p>
              <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
                <a href="${escapeHtml(alert.sourceNotice?.url || alert.officialPdfUrl || alert.directApplyUrl || 'https://govindianews.com')}" target="_blank" rel="noopener noreferrer" style="background:#2563eb;color:#ffffff;padding:0.5rem 1rem;border-radius:6px;font-weight:700;text-decoration:none;">
                  Open Official Notice &nearr;
                </a>
                <a href="/corrections" style="background:#ffffff;color:#1e40af;padding:0.5rem 1rem;border-radius:6px;font-weight:600;text-decoration:none;border:1px solid #bfdbfe;">
                  Report Correction on this Alert
                </a>
                <a href="/tools/salary" style="background:#ffffff;color:#1e40af;padding:0.5rem 1rem;border-radius:6px;font-weight:600;text-decoration:none;border:1px solid #bfdbfe;">
                  7th CPC In-Hand Calculator
                </a>
              </div>
            </section>
            `}
          </article>
        </main>
        ${renderSiteFooter()}
      `;
    }
  });
}

// 18. LEGAL & MANDATORY E-E-A-T PAGES
const STATIC_PAGES = [
  {
    path: '/about',
    title: 'About GovIndiaNews — Independent Editorial Leadership & Mission',
    description: 'Learn about GovIndiaNews, founded by Akash Singh Solanki. Independent public examination news, free candidate utilities, and factual reporting.',
    heading: 'About GovIndiaNews & Editorial Leadership',
    bodyText: `GovIndiaNews is an independent educational and recruitment news publication founded by Akash Singh Solanki. Our mission is to provide job aspirants across India with gazette-verified recruitment updates, authoritative examination blueprints, exact cut-off mark trends, and accurate in-browser calculation tools.

The competitive examination ecosystem in India affects over 50 million candidates annually across Central and State government recruitment drives. Unfortunately, aspirants are frequently misled by speculative headlines, fabricated vacancy counts, and commercial paywalls. GovIndiaNews was established to restore integrity to public examination reporting: every notification published on our portal is traced directly to primary official commission notices from the Staff Selection Commission (SSC), Union Public Service Commission (UPSC), Railway Recruitment Boards (RRB), Institute of Banking Personnel Selection (IBPS), or State Public Service Commissions.

Our portal operates on three foundational principles:
1. Primary Source Referencing: We cite official gazette notification numbers, PDF dates, and commission URLs for every published recruitment notice.
2. Complete Client-Side Privacy: All calculators, age verifiers, and image checkers execute entirely in your web browser. No candidate data or identity documents are ever uploaded to remote servers.
3. Rapid Editorial Corrections: We maintain a transparent public corrections policy and log so any factual revision is documented openly for public scrutiny.`
  },
  {
    path: '/contact',
    title: 'Contact Editorial Desk & Feedback — GovIndiaNews',
    description: 'Get in touch with the GovIndiaNews editorial team for inquiries, feedback, and corrections via contact form or direct email.',
    heading: 'Contact the GovIndiaNews Editorial Desk',
    bodyText: `We welcome inquiries, feedback, news tips, and factual correction submissions from candidates, educators, and institutional authorities. Our editorial desk is overseen directly by Founder and Editor Akash Singh Solanki.

Editorial Office & Communication Channels:
- Editorial Inquiries & News Desk: contact@govindianews.com
- Factual Corrections & Gazette Rectifications: corrections@govindianews.com
- Founder Direct Contact: akashsinghsolanki66@gmail.com
- Public Corrections Log: https://govindianews.com/corrections
- Editorial Policy Review: https://govindianews.com/editorial-policy

When submitting a factual correction regarding an exam notification, cut-off mark, or deadline date, please include the specific article URL and a link to the official conducting authority's corrigendum or PDF notice so our team can verify and publish the rectification promptly.`
  },
  {
    path: '/privacy',
    title: 'Privacy Policy — Transparent Data Protection & Cookie Policy',
    description: 'Transparent privacy policy detailing client-side utilities, cookie usage, Google AdSense integration, and user rights under the Digital Personal Data Protection (DPDP) Act.',
    heading: 'Privacy Policy & Data Protection Disclosures',
    bodyText: `GovIndiaNews is committed to transparent, privacy-first service for all job aspirants. We respect your personal data and adhere strictly to the Digital Personal Data Protection (DPDP) Act of India and international data privacy benchmarks.

Key Privacy Principles:
1. In-Browser Client-Side Processing: All utilities on GovIndiaNews—including the 7th CPC Salary Calculator, Crucial Cut-Off Age Calculator, Negative Marking Simulator, Physical Height Checker, and Photo Compliance Resizer—run 100% locally in your web browser using client-side JavaScript. We never collect, store, transmit, or monetize your date of birth, category status, salary inputs, or uploaded photograph files.
2. Third-Party Analytics & Advertising: We utilize Google Analytics (GA4) and Google AdSense to sustain free access to our portal. Google AdSense uses cookies to serve contextual advertisements to visitors based on prior visits. You may opt out of personalized advertising by visiting Google Ads Settings (https://www.google.com/settings/ads).
3. Contact Communications: When you send a message through our contact desk, your name and email address are used solely to reply to your editorial query and are never sold or rented to third-party commercial marketing networks.`
  },
  {
    path: '/terms',
    title: 'Terms of Service — GovIndiaNews',
    description: 'Terms and conditions governing the use of GovIndiaNews recruitment information, tools, and calculators.',
    heading: 'Terms of Service & Usage Agreement',
    bodyText: `By accessing and browsing GovIndiaNews, you agree to be bound by these Terms of Service. If you do not agree with any provision of these terms, please discontinue use of this website.

Terms of Information Access:
1. Educational & News Reporting Purpose: GovIndiaNews provides recruitment notifications, syllabus blueprints, cut-off summaries, and mathematical calculators strictly for informational and educational purposes. While we exercise rigorous verification standards against central gazettes, GovIndiaNews is not an official examination conducting authority. Candidates must verify all deadlines and eligibility rules against the original commission notices before submitting official application forms.
2. Intellectual Property: Original editorial content, blueprints, calculation algorithms, and graphical assets are the intellectual property of GovIndiaNews. Factual recruitment details, syllabus outlines, and central government notifications remain public domain records under Indian public access principles.
3. Limitation of Liability: GovIndiaNews and its editorial team shall not be liable for any direct or indirect losses resulting from inadvertent typographical errors, altered commission schedules, or server downtime on external government commission portals.`
  },
  {
    path: '/disclaimer',
    title: 'Independent Non-Affiliation Disclaimer — GovIndiaNews',
    description: 'Official non-affiliation statement: GovIndiaNews is an independent news entity and is not affiliated with or endorsed by any government agency.',
    heading: 'Official Independent Non-Affiliation Disclaimer',
    bodyText: `GovIndiaNews is an independent digital news publishing entity and candidate educational resource. GovIndiaNews is NOT affiliated with, associated with, endorsed by, or in any way officially connected with any government entity, department, ministry, or commission.

Specifically, GovIndiaNews holds no official relationship with:
- Union Public Service Commission (UPSC)
- Staff Selection Commission (SSC)
- Ministry of Railways or Railway Recruitment Boards (RRB)
- Institute of Banking Personnel Selection (IBPS)
- Central Armed Police Forces (BSF, CRPF, CISF, ITBP, SSB)
- State Public Service Commissions (UPPSC, BPSC, MPPSC, RPSC, etc.)
- Any Central Public Sector Undertaking (PSU) or State Government body

All official emblems, government trademarks, and commission names mentioned on this portal are used solely for descriptive and informational purposes under nominative fair use doctrine. Official recruitment notices, PDFs, and application portals remain the exclusive domain of the respective conducting authorities.`
  },
  {
    path: '/editorial-policy',
    title: 'Editorial Policy & Verification Standards — GovIndiaNews',
    description: 'Our four-pillar editorial standards: primary source referencing, zero AI fabrication, immediate corrections policy, and strict editorial independence.',
    heading: 'Editorial Policy & Verification Standards',
    bodyText: `The editorial integrity of GovIndiaNews is anchored on our commitment to truthful, candidate-first public recruitment reporting. We adhere to a four-pillar editorial standard across all published articles:

1. Primary Gazette Referencing: Every published notification must be verified against an officially gazetted document, employment news release, or official commission web notice. We do not publish speculative reports or social media rumors.
2. Zero Artificial Intelligence Fabrication: While automated tooling is employed for build validation and technical formatting, all factual recruitment figures—vacancies, age limits, pay bands, and qualifying dates—are checked against primary commission documents.
3. Uncompromising Editorial Independence: Our coverage is independent of commercial recruitment coaching institutes, fee-charging consultancies, or external political affiliations.
4. Active Corrections Log: When official conducting authorities issue corrigenda or when typographical errors occur, our editorial desk immediately rectifies the published text and logs the update publicly.`
  },
  {
    path: '/corrections',
    title: 'Public Corrections Policy & Transparency Log — GovIndiaNews',
    description: 'Transparent corrections policy with direct reporting mechanism and chronological record of editorial rectifications.',
    heading: 'Public Corrections Policy & Verification Transparency Log',
    bodyText: `At GovIndiaNews, accuracy is paramount. Because government recruitment calendars frequently revise crucial dates, application windows, and examination schedules via official corrigenda, we maintain an open, proactive corrections process.

How Factual Corrections Are Handled:
1. Reporting: Any reader, candidate, or commission official can report an error by emailing corrections@govindianews.com or using our contact portal.
2. Investigation: An editorial desk researcher cross-references the reported claim against the official commission portal within 6 hours.
3. Immediate Rectification: If the claim is validated, the article is updated immediately with an explicit "Updated / Corrigendum" note and the revision is recorded on our transparency log.

Transparency Record:
- 08 Oct 2026: NICL AO Notification 2026 application window confirmed active (08 to 28 Oct 2026) with 321 vacancies across Scale-I Officer cadres.
- 07 Oct 2026: SSC CGL 2026 Tier-1 answer key objection deadline confirmed against central commission portal.
- 06 Oct 2026: RRB NTPC Graduate Level recruitment revised vacancy intake updated to reflect zonal division allocations.`
  },
  {
    path: '/fact-checking',
    title: 'Fact-Checking Policy & Verification Standards — GovIndiaNews',
    description: 'Detailed fact-checking protocols for government job notifications, salary structures, and reservation circulars.',
    heading: 'Fact-Checking Policy & Gazette Verification Methodology',
    bodyText: `Public recruitment announcements in India are surrounded by significant misinformation. Fraudulent recruitment circulars and altered cutoff marks regularly circulate on messaging platforms. To safeguard aspirants, GovIndiaNews executes a strict multi-step fact-checking methodology:

Our Three-Tier Verification Protocol:
1. Gazette & Notice Authentication: Every recruitment notice is validated against the conducting commission's primary domain (e.g., ssc.gov.in, upsc.gov.in, rrbapply.gov.in, ibps.in) or the official Gazette of India (egazette.gov.in).
2. Pay Arithmetic Verification: Salary claims are audited against the 7th Central Pay Commission matrix, Department of Expenditure Office Memorandums, and verified Dearness Allowance rates.
3. Statutory Reservation Cross-Referencing: Category age relaxations, EWS validity guidelines, and PwBD reservations are checked against DoPT rules rather than unverified coaching claims.

If any piece of recruitment news cannot be verified against an official digital signature or commission notice, it is rejected for publication.`
  },
  {
    path: '/faqs',
    title: 'Central Government Examination Frequently Asked Questions — Candidate FAQ Hub',
    description: 'Answers to essential questions on crucial dates, normalisation formulas, OBC creamy layer ceilings, EWS validity, and CBT examination procedures.',
    heading: 'Central Government Examination Frequently Asked Questions (FAQ Hub)',
    bodyText: `Essential questions and authoritative answers regarding public competitive examinations across India:

Q: What is a "Crucial Date" in government recruitment?
A: The crucial date is the statutory reference date specified in the notification for determining candidate age eligibility, educational qualification completion, and category certificate validity. For SSC and central exams, this date is commonly 1st August or 1st January.

Q: How does negative marking work in CBT examinations?
A: In objective computer-based tests, conducting bodies deduct a fractional penalty for incorrect responses to discourage guessing. In SSC CGL, each incorrect attempt incurs a 0.50 mark penalty on 2-mark questions. In RRB and UPSC, an incorrect response incurs a 1/3rd penalty.

Q: What is the current gross starting salary under 7th CPC Level 7?
A: In Class X cities (e.g., Delhi, Mumbai), an employee appointed to Pay Level 7 (Basic Pay ₹44,900) receives approximately ₹84,000 to ₹88,000 gross monthly pay, which includes 50% Dearness Allowance and 30% House Rent Allowance.

Q: Who is eligible for OBC Non-Creamy Layer (NCL) reservation?
A: Candidates belonging to communities included in the Central OBC list whose parents' gross annual income from non-agricultural sources is below ₹8 Lakhs for the preceding three financial years are eligible for OBC-NCL status.`
  },
  {
    path: '/trust/editorial',
    title: 'GovIndiaNews Trust Center & Editorial Independence Standards',
    description: 'Comprehensive disclosure of editorial principles, non-affiliation disclosures, and reader transparency protections.',
    heading: 'GovIndiaNews Trust Center: Editorial Independence & Integrity',
    bodyText: `The GovIndiaNews Trust Center provides full transparency into our publication standards, institutional independence, and operational disclosures.

Editorial Independence:
GovIndiaNews is an independent digital news platform founded and edited by Akash Singh Solanki. We do not accept sponsorship from coaching centers to endorse paid courses, nor do we run paid recruitment promotion campaigns for private agencies. Our articles, blueprints, and calculators are accessible 100% free of charge to all candidates across India.

Reader Inquiries & Support:
- Editorial Policy: https://govindianews.com/editorial-policy
- Corrections Desk: https://govindianews.com/corrections
- Fact-Checking Methodology: https://govindianews.com/fact-checking
- Direct Contact: contact@govindianews.com`
  },
  {
    path: '/trust/grievance',
    title: 'Grievance Redressal Desk & Editorial Escalation — GovIndiaNews',
    description: 'Submit editorial grievances, notice discrepancies, or copyright questions directly to the GovIndiaNews editorial board.',
    heading: 'Grievance Redressal Desk & Editorial Escalation',
    bodyText: `GovIndiaNews is committed to timely redressal of reader grievances in accordance with Digital Media Ethics guidelines. If you have an editorial concern, copyright inquiry, or notification discrepancy, our grievance desk will acknowledge and review your submission.

Grievance Redressal Officer:
- Officer: Akash Singh Solanki, Founder &amp; Editor
- Email: akashsinghsolanki66@gmail.com / contact@govindianews.com
- Subject Line: [Grievance Redressal] Description of Issue
- Response SLA: Formal acknowledgment within 24 hours, resolution within 5 business days.`
  },
  {
    path: '/author/akash-singh-solanki',
    title: 'Akash Singh Solanki — Founder, Editor & Indian Army Veteran | GovIndiaNews',
    description: 'Editorial profile and chronological publications archive of Akash Singh Solanki, former Indian Army soldier, founder and editor of GovIndiaNews specializing in official government gazette recruitment analysis.',
    heading: 'Akash Singh Solanki — Founder, Editor & Indian Army Veteran',
    bodyText: `Former Indian Army soldier with firsthand military service experience, bringing disciplined rigor and ground-truth verification to public examination reporting. Founder and Editor of GovIndiaNews, dedicated to providing authentic, gazette-verified government job notifications, transparent pay arithmetic, and candidate-first preparation guidance for millions of aspirants across India. Contact: contact@govindianews.com.

Akash Singh Solanki founded GovIndiaNews to bridge the critical gap between complex official government gazettes and young aspirants navigating competitive examinations. With extensive personal background in disciplined uniformed service, he personally inspects central notifications from the Ministry of Personnel, Public Grievances and Pensions, Staff Selection Commission, Union Public Service Commission, and Ministry of Railways.

Under his editorial direction, GovIndiaNews guarantees that every published recruitment alert cites the primary commission source notice, provides truthful reservation arithmetic, and respects candidate privacy across all calculation utilities.`
  },
  {
    path: '/author',
    title: 'Akash Singh Solanki — Founder, Editor & Indian Army Veteran | GovIndiaNews',
    description: 'Editorial profile and chronological publications archive of Akash Singh Solanki, former Indian Army soldier, founder and editor of GovIndiaNews specializing in official government gazette recruitment analysis.',
    heading: 'Akash Singh Solanki — Founder, Editor & Indian Army Veteran',
    bodyText: `Former Indian Army soldier with firsthand military service experience, bringing disciplined rigor and ground-truth verification to public examination reporting. Founder and Editor of GovIndiaNews, dedicated to providing authentic, gazette-verified government job notifications, transparent pay arithmetic, and candidate-first preparation guidance for millions of aspirants across India. Contact: contact@govindianews.com.

Akash Singh Solanki founded GovIndiaNews to bridge the critical gap between complex official government gazettes and young aspirants navigating competitive examinations. With extensive personal background in disciplined uniformed service, he personally inspects central notifications from the Ministry of Personnel, Public Grievances and Pensions, Staff Selection Commission, Union Public Service Commission, and Ministry of Railways.

Under his editorial direction, GovIndiaNews guarantees that every published recruitment alert cites the primary commission source notice, provides truthful reservation arithmetic, and respects candidate privacy across all calculation utilities.`
  },
  {
    path: '/author/akash-solanki',
    title: 'Akash Singh Solanki — Founder, Editor & Indian Army Veteran | GovIndiaNews',
    description: 'Editorial profile and chronological publications archive of Akash Singh Solanki, former Indian Army soldier, founder and editor of GovIndiaNews specializing in official government gazette recruitment analysis.',
    heading: 'Akash Singh Solanki — Founder, Editor & Indian Army Veteran',
    bodyText: `Former Indian Army soldier with firsthand military service experience, bringing disciplined rigor and ground-truth verification to public examination reporting. Founder and Editor of GovIndiaNews, dedicated to providing authentic, gazette-verified government job notifications, transparent pay arithmetic, and candidate-first preparation guidance for millions of aspirants across India. Contact: contact@govindianews.com.

Akash Singh Solanki founded GovIndiaNews to bridge the critical gap between complex official government gazettes and young aspirants navigating competitive examinations. With extensive personal background in disciplined uniformed service, he personally inspects central notifications from the Ministry of Personnel, Public Grievances and Pensions, Staff Selection Commission, Union Public Service Commission, and Ministry of Railways.

Under his editorial direction, GovIndiaNews guarantees that every published recruitment alert cites the primary commission source notice, provides truthful reservation arithmetic, and respects candidate privacy across all calculation utilities.`
  },
  {
    path: '/404',
    title: 'Page Not Found — 404 | GovIndiaNews',
    description: 'The requested page could not be found on GovIndiaNews. Browse active government recruitment notices, exam blueprints, and calculators on our homepage.',
    heading: '404 — Page Not Found on GovIndiaNews',
    bodyText: `The page, recruitment notice, or examination calculator URL you requested does not exist or has been relocated as part of our gazette archiving process.

You can easily locate the information you need using our primary directories:
- Latest Government Jobs: Explore active Central and State notifications on our Govt Jobs Directory (/jobs).
- Admit Cards & Call Letters: Check hall ticket download dates and city intimation slips (/admit-card).
- 15 Government Exam Hubs: Browse complete examination syllabi, selection stages, and 7th CPC career ladders (/exams).
- Smart Candidate Calculators: Use our 7th CPC Salary Calculator, Cut-Off Age Checker, Negative Marking Simulator, and Physical Height Standards tool (/tools).
- Candidate Knowledge Base: Read masterclass guides on physical benchmarks and central employment schemes (/blog).

If you believe a valid notification URL has been moved erroneously, please let our team know via our Public Corrections Desk (/corrections).`
  }
];

for (const p of STATIC_PAGES) {
  ROUTES.push({
    path: p.path,
    title: p.title,
    description: p.description,
    canonical: `${DOMAIN}${p.path}`,
    publishDate: '08 Oct 2026',
    render: () => {
      return `
        ${renderSiteHeader()}
        <main style="max-width:960px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
          <nav aria-label="Breadcrumb" style="font-size:0.8rem;color:#64748b;margin-bottom:1rem;">
            <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; <span>${escapeHtml(p.heading.split('—')[0].trim())}</span>
          </nav>
          <header style="margin-bottom:2rem;border-bottom:1px solid #e2e8f0;padding-bottom:1.5rem;">
            <h1 style="font-size:2rem;font-weight:800;color:#0f172a;margin:0 0 0.5rem 0;">${escapeHtml(p.heading)}</h1>
            <p style="font-size:1rem;color:#475569;margin:0;">${escapeHtml(p.description)}</p>
          </header>
          <section style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:2rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);margin-bottom:2rem;">
            <div style="font-size:0.95rem;color:#334155;line-height:1.8;">
              ${p.bodyText.split('\n\n').map(para => `<p style="margin-bottom:1.25rem;">${escapeHtml(para)}</p>`).join('')}
            </div>
          </section>
          <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;font-size:0.85rem;color:#475569;">
            <h3 style="font-size:1rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem 0;">Explore GovIndiaNews</h3>
            <p>Direct links: <a href="/" style="color:#2563eb;">Homepage</a> &bull; <a href="/jobs" style="color:#2563eb;">Jobs</a> &bull; <a href="/admit-card" style="color:#2563eb;">Admit Cards</a> &bull; <a href="/cut-off" style="color:#2563eb;">Cut-Off Marks</a> &bull; <a href="/exams" style="color:#2563eb;">15 Exam Blueprints</a> &bull; <a href="/tools" style="color:#2563eb;">Calculators</a> &bull; <a href="/blog" style="color:#2563eb;">Knowledge Base</a> &bull; <a href="/about" style="color:#2563eb;">About Us</a> &bull; <a href="/contact" style="color:#2563eb;">Contact Desk</a></p>
          </section>
        </main>
        ${renderSiteFooter()}
      `;
    }
  });
}

console.log(`Starting pre-rendering for ${ROUTES.length} static routes...`);

for (const route of ROUTES) {
  let html = baseHtml;

  // 1. Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);

  // 2. Meta description
  html = html.replace(
    /<meta name="description" content=".*?"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );

  // 3. Open Graph tags
  if (html.includes('<meta property="og:title"')) {
    html = html.replace(/<meta property="og:title" content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(route.title)}" />`);
  } else {
    html = html.replace('</head>', `  <meta property="og:title" content="${escapeHtml(route.title)}" />\n</head>`);
  }

  if (html.includes('<meta property="og:description"')) {
    html = html.replace(/<meta property="og:description" content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(route.description)}" />`);
  } else {
    html = html.replace('</head>', `  <meta property="og:description" content="${escapeHtml(route.description)}" />\n</head>`);
  }

  const ogUrl = route.canonical;
  if (html.includes('<meta property="og:url"')) {
    html = html.replace(/<meta property="og:url" content=".*?"\s*\/?>/i, `<meta property="og:url" content="${ogUrl}" />`);
  } else {
    html = html.replace('</head>', `  <meta property="og:url" content="${ogUrl}" />\n</head>`);
  }

  // 4. Canonical link
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href=".*?"\s*\/?>/i, `<link rel="canonical" href="${route.canonical}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${route.canonical}" />\n</head>`);
  }

  // 5. Per-page JSON-LD schemas
  const schemas = [];

  // BreadcrumbList for inner pages
  if (route.path !== '/') {
    const segments = route.path.replace(/^\//, '').split('/');
    const items = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${DOMAIN}/`
      }
    ];

    if (segments.length === 1) {
      items.push({
        '@type': 'ListItem',
        position: 2,
        name: route.title.split('—')[0].trim(),
        item: route.canonical
      });
    } else if (segments.length >= 2) {
      const parentName = segments[0] === 'article'
        ? (route.alertData?.category === 'board-exams' ? 'Board Exams' : route.alertData?.category === 'admit-card' ? 'Admit Card' : 'Jobs')
        : segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
      const parentPath = segments[0] === 'article'
        ? (route.alertData?.category === 'board-exams' ? '/board-exams' : route.alertData?.category === 'admit-card' ? '/admit-card' : '/jobs')
        : `/${segments[0]}`;

      items.push({
        '@type': 'ListItem',
        position: 2,
        name: parentName,
        item: `${DOMAIN}${parentPath}`
      });

      items.push({
        '@type': 'ListItem',
        position: 3,
        name: route.title.split('—')[0].trim(),
        item: route.canonical
      });
    }

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items
    });
  }

  // Article / NewsArticle for alerts
  if (route.alertData) {
    const alert = route.alertData;
    const isoDate = toIsoDate(alert.publishDate);
    const modDate = toIsoDate(alert.reviewedDate || alert.publishDate);
    const isCbse = alert.slug.includes('cbse-private');
    const pubTime = isCbse ? '15:30:00' : '06:00:00';
    const modTime = isCbse ? '15:30:00' : '06:00:00';

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: alert.title,
      description: alert.metaDescription || alert.summary,
      url: route.canonical,
      image: [`${DOMAIN}/og-image.jpg`],
      datePublished: `${isoDate}T${pubTime}+05:30`,
      dateModified: `${modDate}T${modTime}+05:30`,
      author: {
        '@type': 'Person',
        name: alert.author || 'Akash Singh Solanki',
        url: `${DOMAIN}/author/akash-singh-solanki`
      },
      publisher: {
        '@type': 'NewsMediaOrganization',
        name: 'GovIndiaNews',
        url: `${DOMAIN}/`
      },
      mainEntityOfPage: route.canonical
    });

    // JobPosting ONLY if real post count > 0, last date exists, and official source URL exists
    const postCountNum = typeof alert.postCount === 'number'
      ? alert.postCount
      : parseInt(String(alert.postCount || ''), 10);
    const officialUrl = alert.sourceNotice?.url || alert.officialPdfUrl || alert.directApplyUrl;

    if (alert.category === 'jobs' && !isNaN(postCountNum) && postCountNum > 0 && alert.lastDate && officialUrl) {
      const isoValidThrough = toIsoDate(alert.lastDate);
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: alert.title,
        description: alert.summary,
        datePosted: `${isoDate}T06:00:00+05:30`,
        validThrough: `${isoValidThrough}T23:59:59+05:30`,
        employmentType: 'FULL_TIME',
        hiringOrganization: {
          '@type': 'Organization',
          name: alert.organization,
          sameAs: officialUrl
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'IN'
          }
        },
        totalJobOpenings: postCountNum
      });
    }

    // FAQPage if faqs exist
    if (alert.faqs && alert.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: alert.faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      });
    }
  }

  // FAQPage for Exam Hubs
  if (route.hubData && route.hubData.faqs && route.hubData.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: route.hubData.faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
    });
  }

  // FAQPage for Guides
  if (route.guideData && route.guideData.faqs && route.guideData.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: route.guideData.faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
    });
  }

  // Inject JSON-LD into <head>
  if (schemas.length > 0) {
    const jsonLdMarkup = schemas
      .map(s => `  <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n  </script>`)
      .join('\n');
    html = html.replace('</head>', `${jsonLdMarkup}\n</head>`);
  }

  // 6. Render full semantic HTML inside #root
  const renderedContent = route.render();
  html = html.replace('<div id="root"></div>', `<div id="root">${renderedContent}</div>`);

  // 7. Write out prerendered HTML file
  const targetDir = route.path === '/'
    ? distDir
    : path.join(distDir, route.path.replace(/^\//, ''));
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');

  // Also write 404.html if route is /404
  if (route.path === '/404') {
    fs.writeFileSync(path.join(distDir, '404.html'), html, 'utf8');
  }
}

// 8. Generate dynamic sitemap.xml with real item lastmod (no changefreq or priority)
const seenCanonicals = new Set();
const uniqueSitemapRoutes = [];
for (const r of ROUTES) {
  if (r.path === '/404') continue; // Do not index 404
  if (!seenCanonicals.has(r.canonical)) {
    seenCanonicals.add(r.canonical);
    uniqueSitemapRoutes.push(r);
  }
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueSitemapRoutes.map(r => `  <url>
    <loc>${r.canonical}</loc>
    <lastmod>${toIsoDate(r.publishDate || '08 Oct 2026')}</lastmod>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemapXml, 'utf8');

// 9. Generate dynamic rss.xml with real publication pubDates (no new Date())
const authorRoute = ROUTES.find(r => r.path === '/author/akash-singh-solanki');
const articleRoutes = ROUTES.filter(r => r.path.startsWith('/article/') || r.path.startsWith('/exams/') || r.path.startsWith('/guides/')).slice(0, 35);
const rssItems = authorRoute ? [authorRoute, ...articleRoutes] : articleRoutes;

const newestDateRfc = toRfc822Date(activeAlerts[0]?.publishDate || '08 Oct 2026');

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GovIndiaNews — Independent Government Jobs &amp; Exam Updates</title>
    <link>${DOMAIN}</link>
    <description>Independent news, verified recruitment notices, candidate examination blueprints, and editorial leadership profile across India.</description>
    <language>en-in</language>
    <lastBuildDate>${newestDateRfc}</lastBuildDate>
    <atom:link href="${DOMAIN}/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems.map(r => `    <item>
      <title><![CDATA[${r.title}]]></title>
      <link>${r.canonical}</link>
      <guid>${r.canonical}</guid>
      <description><![CDATA[${r.description}]]></description>
      <pubDate>${toRfc822Date(r.publishDate || '08 Oct 2026')}</pubDate>
    </item>`).join('\n')}
  </channel>
</rss>`;

fs.writeFileSync(path.join(distDir, 'rss.xml'), rssXml, 'utf8');
fs.writeFileSync(path.join(rootDir, 'public', 'rss.xml'), rssXml, 'utf8');

console.log(`Successfully prerendered ${ROUTES.length} routes, sitemap.xml, and rss.xml with full semantic HTML.`);
