import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('dist directory not found. Run vite build and prerender first.');
  process.exit(1);
}

// 1. Discover all prerendered HTML files and map them to route paths
function findHtmlFiles(dir, baseDir = dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath, baseDir));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = findHtmlFiles(distDir);

// Map file paths to normalized routes
const prerenderedRoutes = new Set();
const routeToFileMap = new Map();

for (const filePath of htmlFiles) {
  const relPath = path.relative(distDir, filePath).replace(/\\/g, '/');
  let routePath;
  if (relPath === 'index.html') {
    routePath = '/';
  } else if (relPath.endsWith('/index.html')) {
    routePath = '/' + relPath.replace(/\/index\.html$/, '');
  } else if (relPath.endsWith('.html')) {
    routePath = '/' + relPath.replace(/\.html$/, '');
  } else {
    routePath = '/' + relPath;
  }

  // Normalize
  routePath = routePath.replace(/\/+$/, '') || '/';
  prerenderedRoutes.add(routePath);
  routeToFileMap.set(routePath, filePath);
}

console.log(`\n======================================================`);
console.log(`CRAWLABILITY VERIFICATION REPORT — GOVINDIANEWS`);
console.log(`Discovered ${prerenderedRoutes.size} prerendered routes in dist/`);
console.log(`======================================================\n`);

let totalPassed = 0;
let totalFailed = 0;
const failureDetails = [];

// Helper functions for verification
function extractBodyWords(html) {
  let bodyContent = html;
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    bodyContent = bodyMatch[1];
  }
  // Strip scripts and styles
  bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
  bodyContent = bodyContent.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
  // Strip tags
  const text = bodyContent.replace(/<[^>]+>/g, ' ');
  // Decode common entities
  const decoded = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  return decoded.trim().split(/\s+/).filter(w => w.length > 0);
}

function hasH1(html) {
  return /<h1[\s>]/i.test(html);
}

function hasCanonical(html) {
  return (
    /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']https:\/\/govindianews\.com[^"']*["']/i.test(html) ||
    /<link\s+[^>]*href=["']https:\/\/govindianews\.com[^"']*["'][^>]*rel=["']canonical["']/i.test(html)
  );
}

function getInternalLinks(html) {
  const links = [];
  const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1].trim();
    if (href.startsWith('/') && !href.startsWith('//')) {
      links.push(href);
    }
  }
  return links;
}

// Allowed static files/extensions in dist that are valid link targets
const staticAssetExtensions = ['.xml', '.txt', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.webp', '.pdf', '.json', '.js', '.css'];

for (const route of Array.from(prerenderedRoutes).sort()) {
  const filePath = routeToFileMap.get(route);
  const html = fs.readFileSync(filePath, 'utf8');

  const words = extractBodyWords(html);
  const wordCount = words.length;
  const h1Found = hasH1(html);
  const canonicalFound = hasCanonical(html);
  const internalLinks = getInternalLinks(html);
  const internalLinkCount = internalLinks.length;

  const errors = [];

  // Check 1: at least 300 words of body text
  if (wordCount < 300) {
    errors.push(`Body text word count (${wordCount}) is below the required 300 words minimum.`);
  }

  // Check 2: must contain an <h1> tag
  if (!h1Found) {
    errors.push(`Missing <h1> heading tag in raw HTML.`);
  }

  // Check 3: at least 10 internal <a href> links
  if (internalLinkCount < 10) {
    errors.push(`Found only ${internalLinkCount} internal <a href> links (requires at least 10).`);
  }

  // Check 4: canonical link must exist
  if (!canonicalFound) {
    errors.push(`Missing valid <link rel="canonical" href="https://govindianews.com..."> tag.`);
  }

  // Check 5: all internal links must point to a prerendered route or existing static file
  const invalidTargets = [];
  for (const href of internalLinks) {
    const cleanPath = href.split('#')[0].split('?')[0].replace(/\/+$/, '') || '/';
    const isStaticFile = staticAssetExtensions.some(ext => cleanPath.endsWith(ext));
    if (!prerenderedRoutes.has(cleanPath) && !isStaticFile) {
      invalidTargets.push(href);
    }
  }

  if (invalidTargets.length > 0) {
    const sample = Array.from(new Set(invalidTargets)).slice(0, 5).join(', ');
    errors.push(`Found ${invalidTargets.length} link(s) pointing to non-prerendered routes: [${sample}]`);
  }

  if (errors.length === 0) {
    totalPassed++;
    console.log(`[PASS] ${route.padEnd(45)} | Words: ${String(wordCount).padStart(4)} | Links: ${String(internalLinkCount).padStart(2)} | H1: YES | Canonical: YES`);
  } else {
    totalFailed++;
    console.error(`[FAIL] ${route.padEnd(45)} | Words: ${String(wordCount).padStart(4)} | Links: ${String(internalLinkCount).padStart(2)} | H1: ${h1Found ? 'YES' : 'NO'} | Canonical: ${canonicalFound ? 'YES' : 'NO'}`);
    for (const err of errors) {
      console.error(`       -> ERROR: ${err}`);
    }
    failureDetails.push({ route, errors });
  }
}

console.log(`\n======================================================`);
console.log(`VERIFICATION SUMMARY: ${totalPassed} PASSED, ${totalFailed} FAILED out of ${prerenderedRoutes.size} total routes.`);
console.log(`======================================================\n`);

if (totalFailed > 0) {
  console.error(`CRAWLABILITY VERIFICATION FAILED: ${totalFailed} route(s) failed verification criteria.`);
  process.exit(1);
} else {
  console.log(`ALL ROUTES SATISFY CRAWLABILITY, SEO & INTEGRITY REQUIREMENTS.`);
  process.exit(0);
}
