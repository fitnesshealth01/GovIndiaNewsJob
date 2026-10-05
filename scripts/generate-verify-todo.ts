import fs from 'fs';
import { RECRUITMENT_ALERTS } from '../src/data/gazetteData';

let md = '# Verification Checklist (VERIFY_TODO.md)\n\n';
md += '> **Quarantine Status**: All 30 recruitment notices are currently in `status: \'unverified\'` quarantine. They do not appear in public lists, directory search, homepage updates, the breaking ticker, the sitemap, or the RSS feed. When visited directly via URL, a re-verification banner is displayed and a `noindex` robots tag is rendered.\n';
md += '> \n';
md += '> **Instructions for Akash Singh Solanki**: Check each article against the cited official government notification or portal. Once verified, flip `status: \'verified\'` and set `verifiedBy: \'human\'` in `src/data/gazetteData.ts`. If the deadline or examination window has passed, mark `status: \'expired\'`.\n\n';
md += '---\n\n';

RECRUITMENT_ALERTS.forEach((a, i) => {
  md += `### ${i + 1}. ${a.title}\n\n`;
  md += `- **Slug**: \`${a.slug}\`\n`;
  md += `- **Alert ID**: \`${a.id}\`\n`;
  md += `- **Category / Sector**: ${a.category.toUpperCase()} | ${(a.sector || 'N/A').toUpperCase()}\n`;
  md += `- **Official Authority**: ${a.organization}\n`;
  md += `- **Official Source to Verify Against**: [${a.sourceNotice?.title || a.organization}](${a.sourceNotice?.url})\n`;
  md += `- **Current Status**: \`${a.status}\` (verifiedBy: \`${a.verifiedBy}\`)\n\n`;

  md += '#### Claims to Cross-Check:\n';
  md += `- **Dates**:\n`;
  md += `  - Publish / Notification Date: ${a.publishDate || 'N/A'}\n`;
  if (a.lastDate) md += `  - Application Deadline (lastDate): ${a.lastDate}\n`;
  if (a.examDate) md += `  - Examination Window (examDate): ${a.examDate}\n`;
  if (a.importantDates && a.importantDates.length > 0) {
    md += '  - Detailed Milestones:\n';
    a.importantDates.forEach((d) => {
      md += `    - ${d.event}: ${d.date}\n`;
    });
  }

  md += `- **Vacancies**: ${a.postCount ? a.postCount + ' total posts' : 'Not specified / admit card / cut-off'}\n`;
  if (a.vacanciesTable && a.vacanciesTable.length > 0) {
    md += `  - Category/Post Breakdown rows: ${a.vacanciesTable.length} posts listed\n`;
  }

  md += `- **Application Fee**: ${a.fees || 'N/A'}\n`;
  if (a.applicationFees && a.applicationFees.length > 0) {
    a.applicationFees.forEach((f) => {
      md += `  - ${f.category}: ${f.fee}\n`;
    });
  }

  md += `- **Age Limits & Crucial Date**: ${a.ageLimit || (a.minAge ? a.minAge + ' to ' + a.maxAge + ' Years' : 'N/A')}\n`;
  md += `- **Pay Scale / Remuneration**: ${a.salaryStructure ? a.salaryStructure.payLevel + ' | Basic: ' + a.salaryStructure.basicPay + ' | Gross: ' + a.salaryStructure.grossMonthly : 'N/A'}\n`;
  md += `- **Eligibility Criteria**: ${a.qualification}\n\n`;

  md += '#### Verification Checklist:\n';
  md += '- [ ] Cross-check all dates with official notification PDF at source URL\n';
  md += '- [ ] Verify vacancy count, reservation category quotas, and post classification\n';
  md += '- [ ] Verify fee exemptions (SC/ST/Female/PwBD) and payment gateway rules\n';
  md += '- [ ] Verify age calculation cutoff date and relaxation rules\n';
  md += '- [ ] Verify 7th CPC pay band, grade pay, and in-hand calculation\n';
  md += '- [ ] Flip status to `\'verified\'` and set `verifiedBy: \'human\'`\n\n';
  md += '---\n\n';
});

fs.writeFileSync('VERIFY_TODO.md', md, 'utf8');
console.log('VERIFY_TODO.md generated successfully with all 30 alerts!');
