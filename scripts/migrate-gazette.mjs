import fs from 'fs';

const filePath = 'src/data/gazetteData.ts';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Ensure interface is updated
if (!code.includes('export interface SourceNotice')) {
  code = code.replace(
    /export interface RecruitmentAlert \{[\s\S]*?officialGazetteRef:\s*string;/,
    `export interface SourceNotice {
  title: string;
  url: string;
  checkedOn: string;
}

export interface RecruitmentAlert {
  id: string;
  slug: string;
  category: 'jobs' | 'admit-card' | 'result' | 'answer-key' | 'cut-off';
  title: string;
  organization: string;
  examName: string;
  postCount?: number | string;
  publishDate: string;
  lastDate?: string;
  examDate?: string;
  qualification: string;
  ageLimit?: string;
  fees?: string;
  sourceNotice: SourceNotice;
  verifiedBy: 'human' | null;
  status: 'verified' | 'unverified' | 'expired';`
  );
}

const SOURCES = {
  'admit-upsc-cse-mains-2026': { title: 'UPSC Civil Services Examination Notice', url: 'https://upsc.gov.in' },
  'admit-ssc-cgl-tier1-2026-all': { title: 'Staff Selection Commission Notice Board', url: 'https://ssc.gov.in' },
  'admit-rrb-alp-cbt1-2026': { title: 'RRB Centralised Employment Notice Portal (CEN 01/2026)', url: 'https://www.rrbapply.gov.in' },
  'admit-ibps-clerk-xiv-prelims': { title: 'IBPS Online Services Portal (CRP Clerks-XIV)', url: 'https://www.ibps.in' },
  'admit-ibps-po-xv-prelims': { title: 'IBPS Central Notice (CRP PO/MT-XV)', url: 'https://www.ibps.in' },
  'admit-ugc-net-dec-2026': { title: 'National Testing Agency (NTA) UGC NET Portal', url: 'https://ugcnet.nta.ac.in' },
  'rrb-group-d-2026-27': { title: 'Ministry of Railways / Railway Recruitment Control Board', url: 'https://www.rrbapply.gov.in' },
  'btsc-fishery-extension-officer-2026': { title: 'Bihar Technical Service Commission Official Notice (Advt 28/2026)', url: 'https://btsc.bihar.gov.in' },
  'sbi-ja-clerk-2026-mega': { title: 'State Bank of India Careers Recruitment Page', url: 'https://sbi.co.in/web/careers' },
  'isro-scientist-sc-2026': { title: 'ISRO Centralised Recruitment Board (ICRB) Notice Board', url: 'https://www.isro.gov.in/Careers.html' },
  'rbi-grade-b-officers-2026': { title: 'Reserve Bank of India Opportunities Portal', url: 'https://opportunities.rbi.org.in' },
  'drdo-rac-scientist-b-2026': { title: 'DRDO Recruitment & Assessment Centre (RAC) Portal', url: 'https://rac.gov.in' },
  'bel-project-trainee-engineer-2026': { title: 'Bharat Electronics Limited Recruitment Section', url: 'https://bel-india.in' },
  'rpf-si-constable-2026': { title: 'Railway Protection Force / Railway Recruitment Board', url: 'https://www.rrbapply.gov.in' },
  'ssc-je-2026': { title: 'Staff Selection Commission (SSC JE Notice)', url: 'https://ssc.gov.in' },
  'ibps-po-clerk-xv-2026': { title: 'Institute of Banking Personnel Selection Official Portal', url: 'https://www.ibps.in' },
  'defence-afcat-nda-2026': { title: 'UPSC & Indian Air Force CDAC Portal', url: 'https://afcat.cdac.in' },
  'ssc-cgl-2026': { title: 'Staff Selection Commission (SSC CGL Notice)', url: 'https://ssc.gov.in' },
  'upsc-cse-2026': { title: 'Union Public Service Commission Examination Portal', url: 'https://upsc.gov.in' },
  'sbi-po-clerk-2026': { title: 'State Bank of India Recruitment Announcements', url: 'https://sbi.co.in/web/careers' },
  'up-police-constable-2026': { title: 'Uttar Pradesh Police Recruitment & Promotion Board (UPPRPB)', url: 'https://uppbpb.gov.in' },
  'army-agniveer-rally-2026': { title: 'Join Indian Army Official Recruitment Portal', url: 'https://joinindianarmy.nic.in' },
  'rrb-ntpc-2026': { title: 'Railway Recruitment Boards Unified Portal', url: 'https://www.rrbapply.gov.in' },
  'delhi-police-si-2026': { title: 'Staff Selection Commission (SSC CPO Notice)', url: 'https://ssc.gov.in' },
  'ssc-gd-constable-2026': { title: 'Staff Selection Commission (SSC GD Notice)', url: 'https://ssc.gov.in' },
  'admit-ssc-cgl-tier1': { title: 'Staff Selection Commission Regional Portals', url: 'https://ssc.gov.in' },
  'res-ssc-cgl-cutoff': { title: 'Staff Selection Commission Results & Cut-off Write-up', url: 'https://ssc.gov.in' },
  'ans-ssc-chsl-tier1': { title: 'Staff Selection Commission Answer Key Representation Portal', url: 'https://ssc.gov.in' },
  'admit-rrb-technician': { title: 'Railway Recruitment Boards Technician Portal', url: 'https://www.rrbapply.gov.in' },
  'res-upsc-cds-result': { title: 'Union Public Service Commission Written Results Desk', url: 'https://upsc.gov.in' },
};

let modifiedCount = 0;
for (const [id, src] of Object.entries(SOURCES)) {
  // Regex to match the alert block for this id
  const pattern = new RegExp(`(id:\\s*['"]${id}['"][\\s\\S]*?)(officialGazetteRef:\\s*['"][^'"]*['"],?\\n)`);
  if (pattern.test(code)) {
    const replacement = `$1sourceNotice: {
      title: ${JSON.stringify(src.title)},
      url: ${JSON.stringify(src.url)},
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: null,
    status: 'unverified',
`;
    code = code.replace(pattern, replacement);
    modifiedCount++;
  } else {
    // If officialGazetteRef was already removed or differently formatted, check if sourceNotice is present
    const idCheck = new RegExp(`id:\\s*['"]${id}['"]`);
    if (idCheck.test(code)) {
      console.log(`id ${id} already has sourceNotice or no officialGazetteRef`);
    } else {
      console.warn(`Could not find id ${id}`);
    }
  }
}

// Global safety check: remove any lingering officialGazetteRef lines
code = code.replace(/officialGazetteRef:\s*['"][^'"]*['"],?\n/g, '');

fs.writeFileSync(filePath, code, 'utf8');
console.log(`Successfully migrated ${modifiedCount} alerts in gazetteData.ts. Remaining officialGazetteRef:`, (code.match(/officialGazetteRef/g) || []).length);
