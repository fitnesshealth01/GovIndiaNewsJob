import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('FAIL: dist directory does not exist.');
  process.exit(1);
}

const BANNED_PHRASES = [
  'Gazette of India Verified',
  'Position Zero',
  'PAA Verified',
  'TCS iON',
  '100% verified',
];

let failureCount = 0;

function logError(msg) {
  console.error(`❌ QUALITY CHECK FAILURE: ${msg}`);
  failureCount++;
}

// 1. Check all HTML and JS files in dist for banned phrases
function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.name.endsWith('.html') || entry.name.endsWith('.js') || entry.name.endsWith('.xml')) {
      const content = fs.readFileSync(fullPath, 'utf8');

      // Check banned phrases
      for (const phrase of BANNED_PHRASES) {
        if (content.toLowerCase().includes(phrase.toLowerCase())) {
          logError(`Forbidden phrase "${phrase}" found in ${path.relative(rootDir, fullPath)}`);
        }
      }

      // If it's an HTML file, check for title and meta description
      if (entry.name.endsWith('.html')) {
        if (!content.includes('<title>') || content.includes('<title></title>')) {
          logError(`Missing or empty <title> in ${path.relative(rootDir, fullPath)}`);
        }
        if (!content.includes('name="description"') || !content.includes('content="')) {
          logError(`Missing meta description in ${path.relative(rootDir, fullPath)}`);
        }
      }
    }
  }
}

scanDir(distDir);

// 2. Validate all recruitment alerts from gazetteData.ts
const { RECRUITMENT_ALERTS } = await import('../src/data/gazetteData.ts');

for (const alert of RECRUITMENT_ALERTS) {
  // Check that every alert has sourceNotice and verifiedBy
  if (!alert.sourceNotice || !alert.sourceNotice.url) {
    logError(`Alert "${alert.id}" (${alert.slug}) is missing sourceNotice.url`);
  }
  if (!('verifiedBy' in alert)) {
    logError(`Alert "${alert.id}" (${alert.slug}) is missing verifiedBy field`);
  }
  if (!('status' in alert)) {
    logError(`Alert "${alert.id}" (${alert.slug}) is missing status field`);
  }
  if (alert.status === 'verified' && !alert.verifiedBy) {
    logError(`Alert "${alert.id}" is marked verified but verifiedBy is null`);
  }
}

// 3. Validate exam hubs length & substance
const { EXAM_HUBS } = await import('../src/content/examHubsData.ts');

if (EXAM_HUBS.length < 15) {
  logError(`Expected at least 15 exam hubs, found ${EXAM_HUBS.length}`);
}

for (const hub of EXAM_HUBS) {
  const fullText = [
    hub.title,
    hub.overview,
    hub.eligibility.educationalQualification,
    hub.eligibility.ageLimit,
    hub.selectionStages.map(s => `${s.name} ${s.details}`).join(' '),
    hub.syllabusAndPattern.overview,
    hub.syllabusAndPattern.syllabusHighlights.join(' '),
    hub.payAndCareerGrowth.payLevel,
    hub.payAndCareerGrowth.hierarchy.join(' '),
    hub.payAndCareerGrowth.pensionAndPerks,
    hub.preparationStrategy.join(' '),
    hub.commonMistakes.join(' '),
    hub.faqs.map(f => `${f.question} ${f.answer}`).join(' ')
  ].join(' ');
  const wordCount = fullText.split(/\s+/).filter(Boolean).length;
  if (wordCount < 300) {
    logError(`Exam hub "${hub.slug}" has only ${wordCount} words (minimum 300 words required)`);
  }
}

// 4. Validate application guides length & substance
const { APPLICATION_GUIDES } = await import('../src/content/guidesData.ts');

if (APPLICATION_GUIDES.length < 4) {
  logError(`Expected at least 4 application guides, found ${APPLICATION_GUIDES.length}`);
}

for (const guide of APPLICATION_GUIDES) {
  const fullText = `${guide.title} ${guide.summary} ${guide.sections.map(s => s.heading + ' ' + s.content).join(' ')}`;
  const wordCount = fullText.split(/\s+/).filter(Boolean).length;
  if (wordCount < 300) {
    logError(`Application guide "${guide.slug}" has only ${wordCount} words (minimum 300 words required)`);
  }
}

if (failureCount > 0) {
  console.error(`\n❌ Quality gate failed with ${failureCount} issue(s). Build aborted.`);
  process.exit(1);
} else {
  console.log('✅ Quality gate passed! Zero forbidden phrases, all structured data verified, all content length thresholds satisfied.');
}
