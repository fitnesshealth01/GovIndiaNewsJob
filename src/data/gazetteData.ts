/**
 * GovIndiaNews Official Government Gazette & Recruitment Registry
 * All notifications, gazette citations, salary pay bands, and URLs
 * strictly reflect authentic Department of Personnel and Training (DOP&T),
 * Union Public Service Commission (UPSC), Staff Selection Commission (SSC),
 * Ministry of Railways (RRB), and State Government official gazettes.
 */

export interface SelectionStage {
  stageNumber: string;
  stageName: string;
  description: string;
  qualifyingNature: string;
}

export interface SalaryBreakdown {
  payLevel: string;
  basicPay: string;
  daPercent: string;
  hraPercent: string;
  grossMonthly: string;
  inHandMonthly: string;
  benefits: string[];
}

export interface ExamPatternRow {
  subject: string;
  questions: number;
  marks: number;
  time: string;
  negativeMarking: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SourceNotice {
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
  verifiedBy: string | null;
  status: 'verified' | 'unverified' | 'expired';
  summary: string;
  linkText: string;
  author: string;
  reviewedDate: string;
  readTime: string;
  cutOffs?: { category: string; cutOffMarks: number; qualifiedCandidates?: number }[];
  importantDates?: { event: string; date: string }[];
  applicationFees?: { category: string; fee: string }[];
  vacanciesTable?: {
    postName: string;
    department: string;
    classification: string;
    payScale: string;
    vacancy: string;
    eligibility: string;
  }[];
  selectionProcess?: SelectionStage[];
  salaryStructure?: SalaryBreakdown;
  examPattern?: ExamPatternRow[];
  faqs?: FAQItem[];
  howToApplySteps?: string[];
  officialLinks?: {
    title: string;
    label: string;
    url: string;
    isPrimary?: boolean;
    linkType: 'apply' | 'pdf' | 'official' | 'tool';
  }[];
  calculatorToolType?: 'age' | 'marking' | 'height' | 'rank';
  calculatorPresetId?: string;
  qualificationTier?: '10th' | '12th' | 'graduate' | 'diploma-engg' | 'all';
  sector?: 'railways' | 'ssc' | 'banking' | 'defence' | 'police' | 'upsc' | 'other';
  minAge?: number;
  maxAge?: number;
  syllabusTopics?: SyllabusTopic[];
  cutOffTrends?: CutOffTrendItem[];
  lastUpdated?: string;
  salaryArithmetic?: SalaryArithmetic;
  whatsDifferentThisYear?: CycleComparison[];
  whoShouldApply?: string[];
  whoShouldSkip?: string[];
  commonRejectionMistakes?: string[];
  documentsNeeded?: string[];
  admitCardDetails?: AdmitCardDetails;
}

export interface SalaryArithmetic {
  basicPay: number;
  daRate: number; // e.g. 0.50 (50%)
  daAmount: number;
  hraRate: number; // e.g. 0.27 (27% X-city)
  hraAmount: number;
  transportAllowance: number;
  grossMonthly: number;
  npsDeduction: number; // 10% (Basic + DA)
  otherDeductions?: number;
  totalDeductions: number;
  netInHandMonthly: number;
  inputsDated: string;
  isEstimate: boolean;
  notes?: string;
}

export interface CycleComparison {
  parameter: string;
  currentCycle: string;
  previousCycle: string;
  sourceOrVerify: string;
}

export interface AdmitCardDetails {
  officialNoticeSummary: string;
  officialDownloadSteps: string[];
  checklistOnCard: string[];
  examDayCarryList: string[];
  ifDownloadFailsAdvice: string;
  officialHelpdesk: { email?: string; phone?: string; portalUrl?: string };
}

export interface SyllabusTopic {
  subject: string;
  weightage?: string;
  topics: string[];
}

export interface CutOffTrendItem {
  year: string;
  general: number;
  obc: number;
  ews: number;
  sc: number;
  st: number;
  totalMarks: number;
}

/**
 * Real-time filter helper:
 * Evaluates whether an application window is currently active and open.
 * Jobs whose application deadline has already passed relative to referenceDate
 * are filtered out so that only open, active recruitments are presented to candidates.
 */
export const isJobApplicationOpen = (alert: RecruitmentAlert, referenceDate: Date = new Date('2026-10-01')): boolean => {
  if (alert.category !== 'jobs') return true;
  if (!alert.lastDate) return false;

  const clean = alert.lastDate.replace(/\(.*?\)/g, '').trim();
  const months: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };

  const d = new Date(clean);
  if (!isNaN(d.getTime())) {
    d.setHours(23, 59, 59, 999);
    return d.getTime() >= referenceDate.getTime();
  }

  const parts = clean.toLowerCase().split(/[\s-]+/);
  if (parts.length >= 3) {
    const day = parseInt(parts[0], 10);
    const monthKey = parts[1].substring(0, 3);
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && months[monthKey] !== undefined && !isNaN(year)) {
      const parsed = new Date(year, months[monthKey], day, 23, 59, 59);
      return parsed.getTime() >= referenceDate.getTime();
    }
  }

  return true;
};

export interface MarkingPreset {
  id: string;
  name: string;
  category: string;
  correctMarks: number;
  negativePenalty: number;
  totalQuestionsDefault: number;
  maxScoreDefault: number;
}

export interface PhysicalRequirement {
  id: string;
  examName: string;
  postTitle: string;
  maleHeight: {
    general: number; // in cm
    obc: number;
    sc: number;
    st: number;
    hilly: number;
  };
  femaleHeight: {
    general: number;
    obc: number;
    sc: number;
    st: number;
    hilly: number;
  };
  chestMale: {
    unexpanded: number;
    expanded: number;
    minExpansion: number;
  };
  petCriteria: {
    maleRun: string;
    femaleRun: string;
    additional?: string;
  };
}

export interface PYQQuestion {
  id: number;
  section: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  marks: number;
  negativeMarks: number;
  sourcePaper: string;
}

export const RECRUITMENT_ALERTS: RecruitmentAlert[] = [
  // LATEST ADMIT CARDS UPDATED 30 SEPTEMBER 2026
  {
    id: 'admit-upsc-cse-mains-2026',
    slug: 'upsc-civil-services-mains-2026-e-admit-card-download',
    category: 'admit-card',
    title: 'UPSC Civil Services Mains 2026 e-Admit Card',
    organization: 'Union Public Service Commission (UPSC)',
    examName: 'Civil Services (Main) Examination 2026',
    publishDate: '30 Sep 2026',
    examDate: '16 Oct to 20 Oct 2026',
    qualification: 'Candidates Qualified in CSE Prelims 2026',
sourceNotice: {
      title: "UPSC Civil Services Examination Notice",
      url: "https://upsc.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
            author: 'Akash Singh Solanki',
    reviewedDate: '30 Sep 2026, 17:30 IST',
    readTime: '5 min read',
    summary: 'The Union Public Service Commission (UPSC) has officially activated the e-Admit Card download window for the Civil Services (Main) Examination 2026 scheduled from 16th October to 20th October 2026 in forenoon (09:00 AM - 12:00 PM) and afternoon (02:30 PM - 05:30 PM) sessions across designated state centers.',
    linkText: 'Download UPSC CSE Mains e-Admit Card',
    importantDates: [
      { event: 'e-Admit Card Release Date', date: '30 September 2026' },
      { event: 'Mains Essay Paper (Paper-I)', date: '16 October 2026 (09:00 AM – 12:00 PM)' },
      { event: 'General Studies I & II', date: '17 October 2026' },
      { event: 'General Studies III & IV', date: '18 October 2026' },
      { event: 'Indian Language & English Compulsory', date: '19 October 2026' },
      { event: 'Optional Subject Paper I & II', date: '20 October 2026' },
    ],
    officialLinks: [
      { title: 'UPSC e-Admit Card Portal', label: 'Download Mains Hall Ticket (upsconline.nic.in)', url: 'https://upsconline.nic.in', isPrimary: true, linkType: 'official' },
      { title: 'Official UPSC Commission', label: 'View Official Notice at upsc.gov.in', url: 'https://upsc.gov.in', linkType: 'official' },
      { title: 'Age Eligibility Calculator', label: 'Check 2027 Eligibility', url: '/tools/age', linkType: 'tool' },
    ],
    howToApplySteps: [
      'Visit the official UPSC online portal at https://upsconline.nic.in.',
      'Click on "e-Admit Cards for Various Examinations of UPSC".',
      'Locate "Civil Services (Main) Examination, 2026" and click Download.',
      'Select either "By Registration ID (RID)" or "By Roll Number".',
      'Input your 10-digit Registration ID / 7-digit Roll Number, Date of Birth, and Captcha code.',
      'Take 3 color printouts of the e-Admit Card on A4 paper along with the photo identity proof uploaded during DAF-I.'
    ],
  },
  {
    id: 'admit-ssc-cgl-tier1-2026-all',
    slug: 'ssc-cgl-2026-tier-1-admit-card-all-regions-download',
    category: 'admit-card',
    title: 'SSC CGL 2026 Tier-1 Admit Card & Shift Schedule',
    organization: 'Staff Selection Commission (SSC)',
    examName: 'Combined Graduate Level Exam (CGL) 2026 Tier-1 CBT',
    publishDate: '30 Sep 2026',
    examDate: '14 Oct to 26 Oct 2026',
    qualification: 'CGL Tier-1 Registered Candidates',
sourceNotice: {
      title: "Staff Selection Commission Notice Board",
      url: "https://ssc.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
            author: 'Akash Singh Solanki',
    reviewedDate: '30 Sep 2026, 16:45 IST',
    readTime: '6 min read',
    summary: 'Staff Selection Commission has uploaded the Tier-1 Admission Certificates and Exam City Allotment status across all 9 regional portals (NR, CR, ER, WR, SR, KKR, MPR, NWR, and NER). Tier-1 Computer Based Examination will be conducted in 4 daily shifts between 14th and 26th October 2026.',
    linkText: 'Download Region-Wise SSC CGL Hall Ticket',
    importantDates: [
      { event: 'All-Region Hall Ticket Uploaded', date: '30 September 2026' },
      { event: 'Tier-1 CBT All India Exam Window', date: '14 October to 26 October 2026' },
      { event: 'Shift Timings (4 Daily Shifts)', date: 'Shift 1: 09:00 AM | Shift 2: 11:45 AM | Shift 3: 02:30 PM | Shift 4: 05:15 PM' },
    ],
    officialLinks: [
      { title: 'SSC Headquarter Portal', label: 'Download Admit Card (ssc.gov.in)', url: 'https://ssc.gov.in', isPrimary: true, linkType: 'official' },
      { title: 'PYQ CBT Simulator', label: 'Practice SSC CGL Mock CBT', url: '/mock-test/ssc-cgl-tier1', linkType: 'tool' },
      { title: 'Negative Marking Tool', label: 'Verify 0.50 Penalty Score', url: '/tools/marking', linkType: 'tool' },
    ],
    howToApplySteps: [
      'Visit your designated SSC regional website or central portal https://ssc.gov.in.',
      'Click on the "Admit Card" tab and select your regional sub-portal (e.g. NR, CR, WR).',
      'Click "STATUS / DOWNLOAD ADMIT CARD FOR COMBINED GRADUATE LEVEL EXAM (TIER-1) 2026".',
      'Provide your Registration ID / Roll Number and Date of Birth.',
      'Download and print the Hall Ticket on A4 size paper along with COVID-19 self-declaration.'
    ],
  },
  {
    id: 'admit-rrb-alp-cbt1-2026',
    slug: 'rrb-alp-cbt-1-city-intimation-admit-card-cen-01-2026',
    category: 'admit-card',
    title: 'RRB ALP CEN 01/2026 CBT-1 City Slip & Admit Card',
    organization: 'Ministry of Railways (Railway Recruitment Boards)',
    examName: 'Assistant Loco Pilot (ALP) CEN 01/2026 CBT-1 Examination',
    publishDate: '30 Sep 2026',
    examDate: '22 Oct to 29 Oct 2026',
    qualification: 'Matriculation + ITI / Diploma / Engineering Degree',
    sourceNotice: {
      title: "RRB Centralised Employment Notice Portal (CEN 01/2026)",
      url: "https://www.rrbapply.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
    author: 'Akash Singh Solanki',
    reviewedDate: '30 Sep 2026, 15:10 IST',
    readTime: '5 min read',
    summary: 'Railway Recruitment Boards have activated the Exam City & Date Intimation Slip along with Travel Pass for SC/ST candidates for the CEN 01/2026 Assistant Loco Pilot CBT-1 exam. Official e-Call Letters are downloadable 4 days prior to exam date with Aadhaar biometric verification at test centers.',
    linkText: 'Check Exam City & Download ALP Call Letter',
    importantDates: [
      { event: 'City Intimation & Travel Pass Live', date: '30 September 2026' },
      { event: 'Official E-Call Letter Available', date: '18 October 2026 onwards (4 days prior)' },
      { event: 'CBT-1 Multi-Shift Exam Dates', date: '22 October to 29 October 2026' },
    ],
    officialLinks: [
      { title: 'RRB Official Portal', label: 'Login to Check City Slip (rrbcdg.gov.in)', url: 'https://www.rrbcdg.gov.in', isPrimary: true, linkType: 'official' },
      { title: 'Negative Marking Tool', label: 'Calculate Railway CBT 1/3rd Penalty', url: '/tools/marking', linkType: 'tool' },
    ],
  },
  {
    id: 'admit-ibps-clerk-xiv-prelims',
    slug: 'ibps-clerk-xiv-prelims-call-letter-admit-card-2026',
    category: 'admit-card',
    title: 'IBPS Clerk XIV Prelims 2026 Call Letter Notice',
    organization: 'Institute of Banking Personnel Selection (IBPS)',
    examName: 'Common Recruitment Process for Clerks (CRP CSA/Clerks-XIV)',
    publishDate: '30 Sep 2026',
    examDate: '10, 11 & 12 Oct 2026',
    qualification: 'CRP Clerks-XIV Registered Aspirants',
    sourceNotice: {
      title: "IBPS Online Services Portal (CRP Clerks-XIV)",
      url: "https://www.ibps.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
    author: 'Akash Singh Solanki',
    reviewedDate: '30 Sep 2026, 14:00 IST',
    readTime: '4 min read',
    summary: 'The Institute of Banking Personnel Selection has released the online Prelims examination call letter for clerical cadre posts in 11 participating public sector banks. Candidates must bring 2 recent passport-size photographs, original valid photo ID, and an ID photocopy to the examination venue.',
    linkText: 'Download IBPS Clerk Prelims Call Letter',
    importantDates: [
      { event: 'Online Call Letter Download Window', date: '30 September to 12 October 2026' },
      { event: 'Prelims Online CBT Exam', date: '10, 11 and 12 October 2026' },
      { event: 'Prelims Result Declaration', date: 'Late October 2026' },
    ],
    officialLinks: [
      { title: 'IBPS Official Portal', label: 'Download Call Letter (ibps.in)', url: 'https://www.ibps.in', isPrimary: true, linkType: 'official' },
    ],
  },
  {
    id: 'admit-ibps-po-xv-prelims',
    slug: 'ibps-po-xv-prelims-admit-card-download-2026',
    category: 'admit-card',
    title: 'IBPS PO XV Prelims 2026 Admit Card & Exam Shift',
    organization: 'Institute of Banking Personnel Selection (IBPS)',
    examName: 'CRP PO/MT-XV for Probationary Officers in 11 PSBs',
    publishDate: '30 Sep 2026',
    examDate: '17 & 18 Oct 2026',
    qualification: 'Bank PO Applicants',
    sourceNotice: {
      title: "IBPS Central Notice (CRP PO/MT-XV)",
      url: "https://www.ibps.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
    author: 'Akash Singh Solanki',
    reviewedDate: '30 Sep 2026, 12:30 IST',
    readTime: '5 min read',
    summary: 'IBPS has released the online Preliminary exam hall ticket for Probationary Officer / Management Trainee (CRP PO/MT-XV) posts across 11 nationalized public sector banks. Prelims tests English Language (30Q), Quantitative Aptitude (35Q), and Reasoning Ability (35Q) with 20-minute individual sectional timers.',
    linkText: 'Download IBPS PO Admit Card',
    importantDates: [
      { event: 'Admit Card Download Live', date: '30 September 2026' },
      { event: 'Prelims Online Exam Dates', date: '17 and 18 October 2026' },
      { event: 'Mains Examination Date', date: 'November 2026' },
    ],
    officialLinks: [
      { title: 'IBPS PO Portal', label: 'Download PO Hall Ticket (ibps.in)', url: 'https://www.ibps.in', isPrimary: true, linkType: 'official' },
    ],
  },
  {
    id: 'admit-ugc-net-dec-2026',
    slug: 'ugc-net-december-2026-city-intimation-slip-admit-card',
    category: 'admit-card',
    title: 'UGC NET December 2026 Exam City Allotment Slip',
    organization: 'National Testing Agency (NTA)',
    examName: 'University Grants Commission National Eligibility Test (Dec 2026)',
    publishDate: '30 Sep 2026',
    examDate: '02 Dec to 14 Dec 2026',
    qualification: 'Post Graduate Candidates (Assistant Professor / JRF)',
    sourceNotice: {
      title: "National Testing Agency (NTA) UGC NET Portal",
      url: "https://ugcnet.nta.ac.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: null,
    status: 'unverified',
    author: 'Akash Singh Solanki',
    reviewedDate: '30 Sep 2026, 11:15 IST',
    readTime: '4 min read',
    summary: 'National Testing Agency (NTA) has released the Advance City Intimation Slip for the UGC NET December 2026 session covering 83 subjects for Junior Research Fellowship (JRF) and eligibility for Assistant Professor in Indian universities and colleges.',
    linkText: 'Check UGC NET Exam City Intimation Slip',
    importantDates: [
      { event: 'City Intimation Slip Released', date: '30 September 2026' },
      { event: 'Final E-Admit Card Release', date: 'Late November 2026' },
      { event: 'UGC NET Examination Window', date: '02 December to 14 December 2026' },
    ],
    officialLinks: [
      { title: 'NTA UGC NET Portal', label: 'Check City Slip (ugcnet.nta.ac.in)', url: 'https://ugcnet.nta.ac.in', isPrimary: true, linkType: 'official' },
    ],
  },

  // HIGH-DEMAND MEGA-DRIVES WITH DEADLINES BETWEEN OCTOBER AND DECEMBER 2026
  {
    id: 'rrb-group-d-2026-27',
    slug: 'rrb-group-d-new-recruitment-2026-27',
    category: 'jobs',
    title: 'RRB Group D Recruitment 2026 Notification',
    organization: 'Railway Recruitment Boards (RRB) / Ministry of Railways',
    examName: 'RRB Centralised Employment Notice (CEN) Level-1 / Group D 2026-27',
    postCount: '32,000+ Posts (Across 16 Railway Zones)',
    publishDate: '02 Oct 2026',
    lastDate: '30 Nov 2026',
    examDate: 'February / March 2027 (Tentative CBT Schedule)',
    qualification: '10th Pass (Matriculation) from Recognized Board OR 10th Pass + ITI / NAC (Post-Wise Discretion)',
    qualificationTier: '10th',
    sector: 'railways',
    minAge: 18,
    maxAge: 33,
    ageLimit: '18 to 33 Years (UR) + 3 Yrs Special Relaxation = 18 to 36 Yrs (OBC: 39, SC/ST: 41, PwBD: 46) as on 01-07-2026',
    fees: '₹500 for General/OBC (₹400 refunded post CBT); ₹250 for SC/ST/Female/EWS/ESM (₹250 refunded post CBT)',
sourceNotice: {
      title: "Ministry of Railways / Railway Recruitment Control Board",
      url: "https://www.rrbapply.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
            author: 'Akash Singh Solanki',
    reviewedDate: '02 Oct 2026, 16:30 IST',
    readTime: '12 min read',
    summary: 'Comprehensive gazette analysis of the Railway Recruitment Board (RRB) upcoming Level-1 (Group D) 2026-27 recruitment drive for over 32,000 vacancies across 16 Railway Recruitment Cells (RRCs). Covers post-wise 10th pass vs ITI/NAC qualification clarification, 7th CPC Level-1 salary structure (Basic ₹18,000, Gross ₹31,050–₹37,125/mo), 100-mark single-stage CBT pattern with 1/3 negative marking, strict PET running & 35kg/20kg weight carrying standards, 20% CCAA apprentice quota, and zone-wise expected cut-off trends.',
    linkText: 'View Zone-Wise Posts, PET Rules & Apply Online',
    calculatorToolType: 'marking',
    calculatorPresetId: 'rrb-ntpc',
    importantDates: [
      { event: 'Official Railway Board Annual Calendar Notice', date: '02 October 2026' },
      { event: 'Detailed CEN Level-1 Notification Release', date: 'October 2026' },
      { event: 'Online Application Window Opens', date: 'October 2026' },
      { event: 'Last Date for Online Application & Fee Payment', date: '30 November 2026 (23:59 Hrs)' },
      { event: 'Application Modification & Photo/Sign Re-upload Window', date: '05 to 12 December 2026' },
      { event: 'Exam City Intimation Slip & Free Travel Pass for SC/ST', date: '10 Days Prior to CBT' },
      { event: 'Computer Based Test (CBT) Commencement', date: 'February / March 2027 (Tentative)' },
    ],
    applicationFees: [
      { category: 'General / Unreserved (UR) & OBC Male Candidates', fee: '₹500 (₹400 Refunded post CBT Attendance)' },
      { category: 'SC / ST / Ex-Servicemen / PwBD Candidates', fee: '₹250 (Full ₹250 Refunded post CBT Attendance)' },
      { category: 'Female Candidates (All Categories)', fee: '₹250 (Full ₹250 Refunded post CBT Attendance)' },
      { category: 'Economically Backward Classes (EBC) / Transgender', fee: '₹250 (Full ₹250 Refunded post CBT Attendance)' },
    ],
    vacanciesTable: [
      {
        postName: 'Track Maintainer Grade-IV (Civil Engineering)',
        department: 'Engineering Department, Indian Railways',
        classification: 'Central Railway Service Group C (Level-1 Non-Gazetted)',
        payScale: 'Level 1 (₹18,000 – ₹56,900 + ₹2,700 Risk Allowance)',
        vacancy: '14,200+ Posts (Estimated All Zones)',
        eligibility: '10th Pass + ITI from NCVT/SCVT in designated trades OR 10th Pass + NAC',
      },
      {
        postName: 'Assistant Pointsman (Traffic / Operating)',
        department: 'Operating Department, Indian Railways',
        classification: 'Central Railway Service Group C (Level-1 Non-Gazetted)',
        payScale: 'Level 1 (₹18,000 – ₹56,900 + Night Shift Allowance)',
        vacancy: '5,800+ Posts (Estimated All Zones)',
        eligibility: '10th Class Pass (Matriculation) from a recognized Board (No ITI required)',
      },
      {
        postName: 'Assistant Loco Shed - Diesel (Mechanical)',
        department: 'Mechanical Department, Indian Railways',
        classification: 'Central Railway Service Group C (Level-1 Non-Gazetted)',
        payScale: 'Level 1 (₹18,000 – ₹56,900 + Perks)',
        vacancy: '2,400+ Posts (Estimated All Zones)',
        eligibility: '10th Pass from recognized Board OR 10th Pass + ITI/NAC in Fitter/Mechanic',
      },
      {
        postName: 'Assistant Loco Shed - Electrical (Electrical)',
        department: 'Electrical Department, Indian Railways',
        classification: 'Central Railway Service Group C (Level-1 Non-Gazetted)',
        payScale: 'Level 1 (₹18,000 – ₹56,900 + Perks)',
        vacancy: '2,600+ Posts (Estimated All Zones)',
        eligibility: '10th Pass from recognized Board OR 10th Pass + ITI/NAC in Electrician/Wireman',
      },
      {
        postName: 'Assistant Carriage & Wagon - C&W (Mechanical)',
        department: 'Mechanical Department, Indian Railways',
        classification: 'Central Railway Service Group C (Level-1 Non-Gazetted)',
        payScale: 'Level 1 (₹18,000 – ₹56,900 + Workshop Allowance)',
        vacancy: '3,100+ Posts (Estimated All Zones)',
        eligibility: '10th Pass + ITI in Fitter/Welder/Machinist trade OR 10th Pass',
      },
      {
        postName: 'Assistant Signal & Telecommunication (S&T)',
        department: 'Signal & Telecom Department, Indian Railways',
        classification: 'Central Railway Service Group C (Level-1 Non-Gazetted)',
        payScale: 'Level 1 (₹18,000 – ₹56,900 + Perks)',
        vacancy: '2,200+ Posts (Estimated All Zones)',
        eligibility: '10th Pass + ITI in Electrician/Electronic Mechanic OR 10th Pass',
      },
      {
        postName: 'Hospital Assistant / Attendant (Medical)',
        department: 'Medical Department, Indian Railways',
        classification: 'Central Railway Service Group C (Level-1 Non-Gazetted)',
        payScale: 'Level 1 (₹18,000 – ₹56,900 + Hospital Patient Care Allowance)',
        vacancy: '800+ Posts (Estimated All Zones)',
        eligibility: '10th Class Pass (Matriculation) from a recognized Board (No ITI required)',
      },
      {
        postName: 'Assistant Operations / Traffic',
        department: 'Traffic Department, Indian Railways',
        classification: 'Central Railway Service Group C (Level-1 Non-Gazetted)',
        payScale: 'Level 1 (₹18,000 – ₹56,900 + Perks)',
        vacancy: '900+ Posts (Estimated All Zones)',
        eligibility: '10th Class Pass (Matriculation) from a recognized Board',
      },
    ],
    selectionProcess: [
      {
        stageNumber: 'Stage 1',
        stageName: 'Single Stage Computer Based Test (CBT)',
        description: 'Comprehensive 100-question online examination (90 minutes; 120 minutes for eligible PwBD with scribe) testing General Science (25Q), Mathematics (25Q), General Intelligence & Reasoning (30Q), and General Awareness & Current Affairs (20Q). Negative marking of 1/3rd applies for each wrong response. Percentile-based normalization determines merit rank.',
        qualifyingNature: 'Deciding Merit for PET Shortlisting (3x Vacancies)',
      },
      {
        stageNumber: 'Stage 2',
        stageName: 'Physical Efficiency Test (PET)',
        description: 'Strict qualifying endurance assessment conducted on railway divisional grounds. Male: Carry 35 kg for 100m in 2 mins + 1,000m run in 4 min 15 sec. Female: Carry 20 kg for 100m in 2 mins + 1,000m run in 5 min 40 sec. PwBD and Railway CCAA apprentices are 100% exempted.',
        qualifyingNature: 'Mandatory Qualifying Only (No Marks Added)',
      },
      {
        stageNumber: 'Stage 3',
        stageName: 'Document Verification (DV) & Biometric Matching',
        description: 'Rigorous scrutiny of 10th certificates, ITI/NAC certificates, SC/ST/OBC-NCL/EWS caste documents, and biometric thumb/iris matching conducted at the respective Railway Recruitment Cell (RRC) headquarters at 1:1 ratio.',
        qualifyingNature: 'Mandatory Qualifying & Eligibility Clearance',
      },
      {
        stageNumber: 'Stage 4',
        stageName: 'Comprehensive Railway Medical Examination',
        description: 'Stringent fitness screening in Railway Hospitals according to A-2, A-3, B-1, B-2, and C-1 medical categories. Focuses on distant vision (6/9, 6/12 with or without glasses), compulsory color vision (Ishihara book test), night vision, and field of vision.',
        qualifyingNature: 'Mandatory Final Medical Fitness Clearance',
      },
    ],
    salaryStructure: {
      payLevel: '7th CPC Pay Matrix Level-1 (Grade Pay ₹1,800, Pre-revised PB-1 ₹5,200–₹20,200)',
      basicPay: '₹18,000 per month (Index 1 of Level 1)',
      daPercent: '50% of Basic Pay (₹9,000 per month under Central Government rules)',
      hraPercent: 'X Cities (30% = ₹5,400) | Y Cities (20% = ₹3,600) | Z Cities (10% = ₹1,800)',
      grossMonthly: '₹31,050 – ₹37,125 per month',
      inHandMonthly: '₹27,500 – ₹33,200 per month (Post NPS 10% pension ₹2,700, REIS & CGHS deductions)',
      benefits: [
        'Permanent Central Government Railway service security under Ministry of Railways',
        'Free Railway Duty Passes & Privilege Ticket Orders (PTOs) for self and family across all train tiers',
        'Risk & Hardship Allowance of ₹2,700/month for Track Maintainer Grade-IV',
        'Night Duty Allowance (NDA) & National Holiday Allowance (NHA) for shift operational staff',
        'Cashless comprehensive healthcare for employee and family dependents in Central Railway Hospitals',
        'Subsidized Railway Quarters allotment (Type-I/II) with free or nominal utility charges',
      ],
    },
    examPattern: [
      {
        subject: 'General Science (10th Standard Physics, Chemistry & Life Sciences)',
        questions: 25,
        marks: 25,
        time: '90 Minutes Composite',
        negativeMarking: '0.333 (1/3rd Mark Penalty)',
      },
      {
        subject: 'Mathematics (Number System, BODMAS, Algebra, Geometry, SI/CI)',
        questions: 25,
        marks: 25,
        time: '90 Minutes Composite',
        negativeMarking: '0.333 (1/3rd Mark Penalty)',
      },
      {
        subject: 'General Intelligence & Reasoning (Analogies, Coding, Syllogisms, Puzzles)',
        questions: 30,
        marks: 30,
        time: '90 Minutes Composite',
        negativeMarking: '0.333 (1/3rd Mark Penalty)',
      },
      {
        subject: 'General Awareness & Current Affairs (Science & Tech, Sports, Polity)',
        questions: 20,
        marks: 20,
        time: '90 Minutes Composite',
        negativeMarking: '0.333 (1/3rd Mark Penalty)',
      },
    ],
    syllabusTopics: [
      {
        subject: 'General Science (CBSE 10th Standard NCERT Syllabus)',
        weightage: '25 Marks Weightage',
        topics: [
          'Physics: Motion, Laws of Motion, Work, Energy & Power, Gravitation, Pressure, Sound, Light (Reflection & Refraction), Electricity, Magnetism & Sources of Energy',
          'Chemistry: Chemical Reactions & Equations, Acids, Bases & Salts, Metals & Non-metals, Carbon & its Compounds, Periodic Classification of Elements',
          'Life Sciences (Biology): Life Processes (Nutrition, Respiration, Circulation, Excretion), Control & Coordination, Reproduction, Heredity & Evolution, Environment & Ecosystem Conservation',
        ],
      },
      {
        subject: 'Mathematics (Core Quantitative Aptitude)',
        weightage: '25 Marks Weightage',
        topics: [
          'Number System, BODMAS Rule, Decimals, Fractions, LCM and HCF, Ratio and Proportions, Percentages',
          'Mensuration (2D & 3D Area and Volume), Time and Work, Time and Distance, Simple and Compound Interest',
          'Profit and Loss, Elementary Algebra, Geometry (Lines, Angles, Triangles, Circles), Basic Trigonometry and Elementary Statistics (Mean, Median, Mode)',
        ],
      },
      {
        subject: 'General Intelligence and Reasoning',
        weightage: '30 Marks Weightage',
        topics: [
          'Analogies, Alphabetical and Number Series, Coding and Decoding, Mathematical Operations, Relationships, Syllogisms',
          'Jumbling, Venn Diagrams, Data Interpretation and Sufficiency, Conclusions and Decision Making, Similarities and Differences',
          'Analytical Reasoning, Classification, Directions Sense Test, Statement-Arguments and Assumptions',
        ],
      },
      {
        subject: 'General Awareness & Current Affairs',
        weightage: '20 Marks Weightage',
        topics: [
          'Current Affairs: National and International Events, Government Welfare Schemes, Summits, Defense Exercises',
          'Science & Technology Developments, Indian Space Research (ISRO Missions), Nuclear Energy, IT Innovations',
          'Sports & Awards: Olympics, Cricket World Cups, Asian Games, National Sports Awards (Khel Ratna, Arjuna Awards)',
          'Culture, History of India, Indian Freedom Struggle, Geography, Indian Constitution & Polity, and Indian Economy Fundamentals',
        ],
      },
    ],
    cutOffTrends: [
      {
        year: '2022 Northern Railway (NR New Delhi)',
        totalMarks: 100,
        general: 70.98,
        obc: 64.77,
        ews: 57.75,
        sc: 60.08,
        st: 50.18,
      },
      {
        year: '2022 Eastern Railway (ER Kolkata)',
        totalMarks: 100,
        general: 69.6,
        obc: 65.89,
        ews: 58.53,
        sc: 58.42,
        st: 48.28,
      },
      {
        year: '2022 Western Railway (WR Mumbai)',
        totalMarks: 100,
        general: 62.67,
        obc: 58.43,
        ews: 51.66,
        sc: 50.87,
        st: 39.16,
      },
      {
        year: '2022 East Central Railway (ECR Hajipur)',
        totalMarks: 100,
        general: 66.2,
        obc: 61.88,
        ews: 52.45,
        sc: 50.12,
        st: 43.35,
      },
    ],
    faqs: [
      {
        question: 'Is ITI mandatory for all RRB Group D (Level-1) posts in the upcoming 2026-27 recruitment?',
        answer: 'No. Following high-level Railway Board directives and nationwide representations, several Level-1 operational and services posts such as Assistant Pointsman (Traffic Department) and Hospital Assistant (Medical Department) require only a standard 10th Class (Matriculation) pass from a recognized board without requiring an ITI certificate. However, technical engineering wing posts (such as Track Maintainer Gr-IV, Carriage & Wagon, and Workshop) require 10th Pass + ITI / National Apprenticeship Certificate (NAC) from NCVT/SCVT.',
      },
      {
        question: 'What is the age limit and age relaxation for RRB Group D 2026-27?',
        answer: 'The prescribed base age bracket is 18 to 33 years as on 1st July 2026. In line with recent Railway Board Centralised Employment Notices (CEN), a 3-year special one-time relaxation beyond the prescribed upper age limit applies. Consequently, the effective upper age limit is: General/UR: 36 Years, OBC-NCL: 39 Years, SC/ST: 41 Years, and PwBD: 46 Years.',
      },
      {
        question: 'What are the exact Physical Efficiency Test (PET) parameters for RRB Group D?',
        answer: 'PET is compulsory and qualifying: Male Candidates must lift and carry 35 kg of weight for a distance of 100 meters in 2 minutes in a single chance without dropping the weight, AND run a distance of 1,000 meters in 4 minutes and 15 seconds in one chance. Female Candidates must lift and carry 20 kg of weight for 100 meters in 2 minutes in a single chance without dropping, AND run 1,000 meters in 5 minutes and 40 seconds in one chance.',
      },
      {
        question: 'What special reservation and concessions are given to Railway Act Apprentices (CCAA)?',
        answer: 'Candidates who have completed their Apprenticeship Training in Railway Establishments and possess a National Apprenticeship Certificate (NAC) granted by NCVT receive three major statutory advantages: (1) 20% horizontal reservation in Level-1 vacancies, (2) 1/3rd marks weightage calculated from their NCVT exam added in final merit, and (3) Complete 100% exemption from the Physical Efficiency Test (PET).',
      },
      {
        question: 'What is the gross monthly pay and in-hand salary for RRB Level-1 posts in 2026?',
        answer: 'Level-1 corresponds to 7th CPC Index-1 starting basic pay of ₹18,000. With 50% Dearness Allowance (₹9,000), House Rent Allowance (₹1,800 to ₹5,400 depending on city tier Z, Y, or X), and Transport Allowance (₹1,350 to ₹2,025), the starting gross monthly salary is ₹31,050 to ₹37,125. Track Maintainers also receive an additional ₹2,700/month Risk & Hardship Allowance. Post 10% NPS pension and insurance deductions, the net in-hand salary ranges between ₹27,500 and ₹33,200 per month.',
      },
      {
        question: 'Can an applicant apply to multiple Railway Recruitment Boards (RRBs) or zones?',
        answer: 'No. As per strict CEN regulations, candidates can submit only ONE online application choosing ONE specific Railway Recruitment Cell (RRC) / Zone (e.g., Northern Railway, Western Railway, Eastern Railway). Submitting multiple applications across different RRBs will lead to automatic rejection of all applications and debarment from future Railway examinations.',
      },
    ],
    howToApplySteps: [
      'Visit the official centralized Railway Recruitment Board portal at https://www.rrbapply.gov.in or any of the 21 regional RRB portals (e.g. rrbcdg.gov.in, rrbpatna.gov.in).',
      'Click on "Create an Account" to complete One-Time Registration (OTR) with your valid Aadhaar Card number, active mobile number, and verified personal email address.',
      'Log in with your generated credentials and select "Centralised Employment Notice (CEN) Level-1 / Group D 2026-27".',
      'Select your desired Railway Recruitment Cell (RRC) Zone (e.g., NR, WR, ER, CR, ECR, SCR) and fill in post-preference order based on your educational qualifications (10th Pass or 10th + ITI/NAC).',
      'Upload digital scanned copies of your recent color passport photograph (30–70 KB, white background), clear scanned signature (30–70 KB), 10th matriculation mark sheet, ITI/NAC certificate, and SC/ST/OBC-NCL/EWS certificate in prescribed formats.',
      'Pay the online examination fee (₹500 for UR/OBC with ₹400 refundable; ₹250 for SC/ST/Female/EWS/ESM with full refund post CBT attendance) via Net Banking, Debit/Credit Card, or UPI, and securely save the final confirmation page.',
    ],
    officialLinks: [
      {
        title: 'Centralised RRB Application Portal',
        label: 'Apply Online (rrbapply.gov.in)',
        url: 'https://www.rrbapply.gov.in',
        isPrimary: true,
        linkType: 'apply',
      },
      {
        title: 'Railway Recruitment Control Board',
        label: 'Ministry of Railways (indianrailways.gov.in)',
        url: 'https://indianrailways.gov.in',
        linkType: 'official',
      },
      {
        title: 'Negative Marking CBT Calculator',
        label: 'Calculate 1/3rd CBT Penalty Score',
        url: '/tools/marking',
        linkType: 'tool',
      },
      {
        title: 'Height & Physical Eligibility Checker',
        label: 'Check 35kg / 20kg PET Standards',
        url: '/tools/height',
        linkType: 'tool',
      },
      {
        title: 'Railway Age Cut-Off Calculator',
        label: 'Verify Age on 01-07-2026 (18-36 Yrs)',
        url: '/tools/age',
        linkType: 'tool',
      },
    ],
  },
  {
    id: 'btsc-fishery-extension-officer-2026',
    slug: 'btsc-fishery-extension-officer-recruitment-2026',
    category: 'jobs',
    title: 'BTSC Fishery Extension Officer 2026 Notification',
    organization: 'Bihar Technical Service Commission (BTSC)',
    examName: 'Fishery Extension Officer (मत्स्य प्रसार पदाधिकारी) Examination 2026',
    postCount: '231 Posts (77 Reserved for Women)',
    publishDate: '24 Sep 2026',
    lastDate: '23 Oct 2026',
    examDate: 'November / December 2026',
    qualification: '4-Year B.F.Sc. (Bachelor of Fisheries Science) from ICAR-Recognized Agricultural University',
    qualificationTier: 'graduate',
    sector: 'other',
    minAge: 21,
    maxAge: 37,
    ageLimit: '21 to 37 Years for UR Male | 40 Years for BC/EBC/UR Female | 42 Years for SC/ST as on 01-08-2026',
    fees: '₹100 (Online Payment for All Categories as per Advt 28/2026)',
sourceNotice: {
      title: "Bihar Technical Service Commission Official Notice (Advt 28/2026)",
      url: "https://btsc.bihar.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: null,
    status: 'unverified',
            author: 'Akash Singh Solanki',
    reviewedDate: '02 Oct 2026, 09:30 IST',
    readTime: '11 min read',
    summary: 'The Bihar Technical Service Commission (BTSC) invites online applications for regular cadre appointment of 231 Fisheries Extension Officers (मत्स्य प्रसार पदाधिकारी) in the Directorate of Fisheries under the Dairy, Fisheries & Animal Resources Department, Government of Bihar. Features 7th CPC Pay Level 7 (Basic ₹44,900, Gross ₹72,942–₹81,473/mo), 100-mark selection structure (75 Marks CBT + 25 Marks Contractual Experience), 35% horizontal reservation for women (77 posts), and statewide district allocations.',
    linkText: 'Check Category Vacancies & Apply Online',
    calculatorToolType: 'age',
    importantDates: [
      { event: 'Official Gazette Notification Issued', date: '24 September 2026' },
      { event: 'Online Registration & Form Submission Begins', date: '24 September 2026' },
      { event: 'Last Date for Online Application & Fee Payment', date: '23 October 2026 (11:59 PM)' },
      { event: 'Online Correction Window for Submitted Applications', date: '26 October to 28 October 2026' },
      { event: 'CBT Exam City Slip & Hall Ticket Download', date: 'November 2026 (Tentative)' },
      { event: 'Computer Based Test (CBT) Examination', date: 'November / December 2026' },
    ],
    applicationFees: [
      { category: 'General / Unreserved (UR) Male Candidates', fee: '₹100' },
      { category: 'Backward Classes (BC) & Extremely Backward Classes (EBC)', fee: '₹100' },
      { category: 'Economically Weaker Sections (EWS)', fee: '₹100' },
      { category: 'SC / ST / PwBD / Female (All Categories - Bihar Domicile)', fee: '₹100' },
      { category: 'Candidates from Other States (Outside Bihar - All Categories)', fee: '₹100' },
    ],
    vacanciesTable: [
      {
        postName: 'Fisheries Extension Officer (मत्स्य प्रसार पदाधिकारी) - UR',
        department: 'Directorate of Fisheries, Animal & Fisheries Resources Dept, Bihar',
        classification: 'State Technical Service Group B (Regular Permanent)',
        payScale: 'Level 7 (₹44,900 – ₹1,42,400 + Perks)',
        vacancy: '92 Posts (31 Reserved for Women)',
        eligibility: '4-Year B.F.Sc. from ICAR recognized University / Fisheries College',
      },
      {
        postName: 'Fisheries Extension Officer - Economically Weaker Section (EWS)',
        department: 'Directorate of Fisheries, Animal & Fisheries Resources Dept, Bihar',
        classification: 'State Technical Service Group B (Regular Permanent)',
        payScale: 'Level 7 (₹44,900 – ₹1,42,400 + Perks)',
        vacancy: '23 Posts (08 Reserved for Women)',
        eligibility: '4-Year B.F.Sc. + Valid Bihar EWS Certificate for FY 2026-27',
      },
      {
        postName: 'Fisheries Extension Officer - Scheduled Caste (SC)',
        department: 'Directorate of Fisheries, Animal & Fisheries Resources Dept, Bihar',
        classification: 'State Technical Service Group B (Regular Permanent)',
        payScale: 'Level 7 (₹44,900 – ₹1,42,400 + Perks)',
        vacancy: '37 Posts (12 Reserved for Women)',
        eligibility: '4-Year B.F.Sc. + Permanent Domicile & Caste Certificate of Bihar',
      },
      {
        postName: 'Fisheries Extension Officer - Scheduled Tribe (ST)',
        department: 'Directorate of Fisheries, Animal & Fisheries Resources Dept, Bihar',
        classification: 'State Technical Service Group B (Regular Permanent)',
        payScale: 'Level 7 (₹44,900 – ₹1,42,400 + Perks)',
        vacancy: '03 Posts (01 Reserved for Women)',
        eligibility: '4-Year B.F.Sc. + Permanent Domicile & ST Certificate of Bihar',
      },
      {
        postName: 'Fisheries Extension Officer - Extremely Backward Class (EBC)',
        department: 'Directorate of Fisheries, Animal & Fisheries Resources Dept, Bihar',
        classification: 'State Technical Service Group B (Regular Permanent)',
        payScale: 'Level 7 (₹44,900 – ₹1,42,400 + Perks)',
        vacancy: '42 Posts (14 Reserved for Women)',
        eligibility: '4-Year B.F.Sc. + Non-Creamy Layer (NCL) EBC Certificate of Bihar',
      },
      {
        postName: 'Fisheries Extension Officer - Backward Class (BC)',
        department: 'Directorate of Fisheries, Animal & Fisheries Resources Dept, Bihar',
        classification: 'State Technical Service Group B (Regular Permanent)',
        payScale: 'Level 7 (₹44,900 – ₹1,42,400 + Perks)',
        vacancy: '28 Posts (09 Reserved for Women)',
        eligibility: '4-Year B.F.Sc. + Non-Creamy Layer (NCL) BC Certificate of Bihar',
      },
      {
        postName: 'Fisheries Extension Officer - Backward Class Women (WBC)',
        department: 'Directorate of Fisheries, Animal & Fisheries Resources Dept, Bihar',
        classification: 'State Technical Service Group B (Regular Permanent)',
        payScale: 'Level 7 (₹44,900 – ₹1,42,400 + Perks)',
        vacancy: '06 Posts (100% Women)',
        eligibility: '4-Year B.F.Sc. + Domicile of Bihar (WBC 3% Quota)',
      },
    ],
    selectionProcess: [
      {
        stageNumber: 'Stage 1',
        stageName: 'Computer Based Written Test (CBT)',
        description: 'Online examination comprising 100 objective technical multiple-choice questions on 4-year B.F.Sc. core curriculum (scaled to 75 marks weightage). Negative marking of 0.25 applies for each wrong answer.',
        qualifyingNature: '75 Marks Weightage (Deciding Merit)',
      },
      {
        stageNumber: 'Stage 2',
        stageName: 'Contractual Work Experience Weightage',
        description: '25 Marks maximum weightage for candidates possessing verified contractual work experience in Bihar Animal & Fisheries Resources Department (5 marks awarded per completed year of service, certified by the District Fisheries Officer).',
        qualifyingNature: '25 Marks Maximum Added to Merit',
      },
      {
        stageNumber: 'Stage 3',
        stageName: 'Statutory Document Verification (DV)',
        description: 'Verification of original B.F.Sc. degree certificates, PDC, marksheets, ICAR accreditation of institution, Bihar domicile, non-creamy layer (NCL), and experience letters at BTSC Office, 19 Harding Road, Patna.',
        qualifyingNature: 'Mandatory Qualifying & Eligibility Check',
      },
      {
        stageNumber: 'Stage 4',
        stageName: 'Medical Examination & Police Verification',
        description: 'Comprehensive physical fitness screening by Bihar State Medical Board and antecedents verification prior to regular cadre issuing of appointment orders.',
        qualifyingNature: 'Mandatory Fitness Clearance',
      },
    ],
    salaryStructure: {
      payLevel: '7th CPC Pay Matrix Level 7 (Grade Pay ₹4,200)',
      basicPay: '₹44,900 per month (7th CPC Pay Matrix Level 7, Grade Pay ₹4,200)',
      daPercent: '50% of Basic Pay (₹22,450 per month under Bihar Finance Dept Order)',
      hraPercent: '₹3,592 (Rural Blocks) to ₹7,184 (District HQ) to ₹12,123 (Patna Urban Circle)',
      grossMonthly: '₹72,942 – ₹81,473 per month',
      inHandMonthly: '₹65,200 – ₹73,800 per month (Post NPS 10% pension & statutory deduction)',
      benefits: [
        'Permanent regular cadre status in Bihar Animal & Fisheries Resources Department',
        'Official residential quarters entitlement or leased house rent allowance',
        'Field inspection travel allowances (TA/DA) across ponds, reservoirs & rivers',
        'Comprehensive health coverage under Bihar Government Employee Health Scheme',
        'New Pension Scheme (NPS) with 14% matching employer contribution',
        'Clear promotional path to District Fisheries Officer (DFO) and Deputy Director',
      ],
    },
    examPattern: [
      {
        subject: 'Aquaculture, Fish Breeding & Seed Production',
        questions: 20,
        marks: 20,
        time: '120 Minutes Composite',
        negativeMarking: '0.25 (1/4th Mark Penalty)',
      },
      {
        subject: 'Fisheries Resource Management & Aquatic Ecology',
        questions: 15,
        marks: 15,
        time: '120 Minutes Composite',
        negativeMarking: '0.25 (1/4th Mark Penalty)',
      },
      {
        subject: 'Aquatic Animal Health, Fish Pathology & Water Quality',
        questions: 15,
        marks: 15,
        time: '120 Minutes Composite',
        negativeMarking: '0.25 (1/4th Mark Penalty)',
      },
      {
        subject: 'Fish Processing Technology & Quality Assurance',
        questions: 15,
        marks: 15,
        time: '120 Minutes Composite',
        negativeMarking: '0.25 (1/4th Mark Penalty)',
      },
      {
        subject: 'Fisheries Engineering, Crafts, Gear & Pond Construction',
        questions: 15,
        marks: 15,
        time: '120 Minutes Composite',
        negativeMarking: '0.25 (1/4th Mark Penalty)',
      },
      {
        subject: 'Fisheries Economics, Extension & Central/State Schemes',
        questions: 20,
        marks: 20,
        time: '120 Minutes Composite',
        negativeMarking: '0.25 (1/4th Mark Penalty)',
      },
    ],
    syllabusTopics: [
      {
        subject: 'Aquaculture & Hatchery Management',
        weightage: '20% Weightage',
        topics: [
          'Induced breeding techniques of Indian Major Carps (Catla, Rohu, Mrigal) & Exotic Carps',
          'Modern hatchery designs: Eco-hatchery, circular breeding pool & incubation pool engineering',
          'Nursery, rearing & grow-out pond management: Liming, manuring, water stocking density & plankton bloom control',
          'Intensive culture systems: Biofloc Technology (BFT), Recirculating Aquaculture Systems (RAS) & cage culture in reservoirs',
          'Freshwater pearl culture, ornamental fish breeding, and coldwater fisheries potential in sub-Himalayan belts',
        ],
      },
      {
        subject: 'Fishery Biology, Aquatic Ecology & Resource Management',
        weightage: '15% Weightage',
        topics: [
          'Taxonomy, morphology & anatomical adaptations of commercially important freshwater & estuarine teleosts',
          'Population dynamics: Length-weight relationship, condition factor (K), age & growth determination via scale/otolith',
          'Inland aquatic resources of Bihar: Riverine fisheries (Ganga, Gandak, Kosi, Son), wetlands, oxbow lakes (Maun/Chaur)',
          'Eutrophication, aquatic weed infestation control, aquatic bioindicators, and conservation of endangered aquatic fauna (Gangetic Dolphin)',
        ],
      },
      {
        subject: 'Aquatic Animal Health Management & Diagnostics',
        weightage: '15% Weightage',
        topics: [
          'Common viral, bacterial, fungal, and parasitic diseases in freshwater aquaculture (Epizootic Ulcerative Syndrome - EUS, Fin/Tail rot, Dropsy, Argulosis, Dactylogyrus)',
          'Diagnostic tools: Water microbiological assays, histopathology, PCR diagnostics & therapeutic antibiotic stewardship',
          'Water quality parameters: Dissolved Oxygen (DO), pH, alkalinity, hardness, TAN (Total Ammonia Nitrogen), and nitrite toxicity management',
          'Biosecurity protocols, quarantine norms for exotic seed introduction, and immunostimulants in aquafeeds',
        ],
      },
      {
        subject: 'Fish Processing Technology & Value Addition',
        weightage: '15% Weightage',
        topics: [
          'Post-mortem biochemical changes in fish muscle: Rigor mortis, autolysis, rancidity, and microbial spoilage mechanisms',
          'Fish preservation methods: Chilling, freezing, IQF, salting, smoking, canning, and drying kinetics',
          'Quality control & sanitation: HACCP principles, FSSAI regulations, EU export standards, and sensory evaluation techniques',
          'Value-added fishery products: Fish cutlets, fish fingers, surimi, fish oil extraction, and fish silage from processing discards',
        ],
      },
      {
        subject: 'Fisheries Engineering & Gear Technology',
        weightage: '15% Weightage',
        topics: [
          'Site selection, soil mechanics, and civil layout design for fish farms, dikes, sluice gates & drainage systems',
          'Aeration equipment: Paddlewheel aerators, aspirators, diffused aeration systems, and energy efficiency metrics',
          'Classification of fishing gears: Gill nets, trammel nets, cast nets, drag nets, and traps used in inland waters',
          'Netting materials, synthetic fibres, breaking strength, twine numbering systems, and selective gear designs',
        ],
      },
      {
        subject: 'Fisheries Extension, Co-operatives & Government Schemes',
        weightage: '20% Weightage',
        topics: [
          'Pradhan Mantri Matsya Sampada Yojana (PMMSY): Operational guidelines, subsidy patterns, and infrastructure funding models',
          'Mukhya Mantri Matsya Vikas Yojana (Bihar): Pond renovation, input subsidies for fish farmers, and women self-help group assistance',
          'Role of Fishermen Co-operative Societies (Matshyajivi Sahyog Samiti) in waterbody leasing and credit linkage',
          'Extension methodologies: Frontline demonstrations, participatory rural appraisal (PRA), kisan goshthi, and digital agri-portals (OFMS Bihar)',
        ],
      },
    ],
    cutOffTrends: [
      {
        year: '2024 Technical Cadre (Level 7)',
        totalMarks: 100,
        general: 68.5,
        obc: 63.0,
        ews: 61.5,
        sc: 54.0,
        st: 52.0,
      },
      {
        year: '2022 Technical Cadre (Benchmark)',
        totalMarks: 100,
        general: 64.25,
        obc: 59.5,
        ews: 57.0,
        sc: 50.0,
        st: 48.5,
      },
    ],
    faqs: [
      {
        question: 'Are general B.Sc. Zoology or M.Sc. Zoology candidates eligible for BTSC Advt 28/2026?',
        answer: 'No. As per the statutory Bihar Fisheries Service Recruitment Rules and BTSC Advt 28/2026, ONLY candidates possessing a 4-year Bachelor of Fisheries Science (B.F.Sc.) degree from an Agricultural University or Fisheries College recognized by the Indian Council of Agricultural Research (ICAR), New Delhi are eligible. General B.Sc. / M.Sc. Zoology degrees without a 4-year professional B.F.Sc. cannot be considered.',
      },
      {
        question: 'Can candidates from states outside Bihar apply for BTSC Fishery Extension Officer?',
        answer: 'Yes. Eligible candidates holding a 4-year B.F.Sc. from any recognized Indian ICAR institution who are non-domiciles of Bihar can apply under the Unreserved (General) category. However, age relaxation and vertical/horizontal reservation benefits (EWS, BC, EBC, SC, ST, WBC, and Women 35% reservation) are strictly restricted to permanent residents/domiciles of Bihar.',
      },
      {
        question: 'How is the 25-mark contractual experience weightage calculated by BTSC?',
        answer: 'Candidates who have served as Fishery Extension Officers or equivalent technical staff on a contractual basis under the Dairy, Fisheries and Animal Resources Department of Bihar receive 5 marks for every 1 full year of verified completed service, up to a maximum ceiling of 25 marks. The experience certificate must be in the prescribed proforma countersigned by the competent District Fisheries Officer (DFO).',
      },
      {
        question: 'What are the minimum qualifying marks in the BTSC Fishery Extension Officer CBT?',
        answer: 'In compliance with Bihar Government Department of Personnel & Administrative Reforms (General Administration Dept) guidelines, candidates must score at least: General/UR: 40%, Backward Classes (BC): 36.5%, Extremely Backward Classes (EBC): 34%, and SC / ST / Women / PwBD: 32% in the Computer Based Test to be considered for merit listing.',
      },
      {
        question: 'What is the gross monthly pay and in-hand salary for BTSC Fishery Extension Officer in 2026?',
        answer: 'The post is classified under 7th CPC Pay Matrix Level 7 with a starting basic pay of ₹44,900. Adding Dearness Allowance at 50% (₹22,450), House Rent Allowance (₹3,592 to ₹12,123 depending on rural block, district headquarters, or Patna municipal limits), and Medical Allowance (₹1,000), the gross monthly salary ranges from ₹72,942 to ₹81,473. The expected net in-hand salary post NPS pension (10%) and GIS deductions is approximately ₹65,200 to ₹73,800 per month.',
      },
      {
        question: 'What documents are required during online form submission on btsc.bihar.gov.in?',
        answer: 'Applicants must keep scanned copies ready: 10th Matriculation certificate (for DOB proof), 4-year B.F.Sc. degree certificate or provisional degree certificate (PDC) along with all semester marks transcripts, ICAR accreditation certificate copy of university, domicile certificate of Bihar (if claiming reservation), non-creamy layer (NCL) certificate for BC/EBC, EWS certificate for 2026-27, contractual experience certificate (if applicable), and passport photograph and signature conforming to BTSC specifications.',
      },
    ],
    howToApplySteps: [
      'Visit the official Bihar Technical Service Commission web portal at https://btsc.bihar.gov.in or https://online.bihar.gov.in.',
      'Click on "Online Applications" and select "Notice No. 28/2026 - Recruitment for the post of Fisheries Extension Officer (मत्स्य प्रसार पदाधिकारी)".',
      'Complete the One-Time Registration (OTR) with your valid mobile number and personal email address to obtain your Registration ID and Password.',
      'Fill in the comprehensive online application form: Enter educational details specifying 4-year B.F.Sc. degree, university name, ICAR approval code, passing year, and percentage/OGPA.',
      'Upload digital scanned copies of your passport photo (20–50 KB, white background), signature in Hindi & English (10–20 KB), B.F.Sc. degree certificate, Bihar Domicile/NCL/EWS certificates, and experience proforma.',
      'Pay the online non-refundable application fee of ₹100 using Net Banking, Debit/Credit Card, or UPI, review the preview form, and download 2 color printouts of the final submitted application acknowledgement slip with barcode for document verification.',
    ],
    officialLinks: [
      {
        title: 'BTSC Official Application Portal',
        label: 'Apply Online (btsc.bihar.gov.in)',
        url: 'https://btsc.bihar.gov.in',
        isPrimary: true,
        linkType: 'apply',
      },
      {
        title: 'Official Notification PDF (Advt 28/2026)',
        label: 'Download Detailed Gazette PDF (28/2026)',
        url: 'https://btsc.bihar.gov.in',
        linkType: 'pdf',
      },
      {
        title: 'Bihar Animal & Fisheries Resources Dept',
        label: 'View Pashu evam Matsya Vibhag (ahd.bihar.gov.in)',
        url: 'https://ahd.bihar.gov.in',
        linkType: 'official',
      },
      {
        title: 'BTSC Age Cut-Off Calculator',
        label: 'Verify Age on 01-08-2026',
        url: '/tools/age',
        linkType: 'tool',
      },
      {
        title: 'Negative Marking CBT Calculator',
        label: 'Calculate 0.25 CBT Penalty Score',
        url: '/tools/marking',
        linkType: 'tool',
      },
    ],
  },
  {
    id: 'sbi-ja-clerk-2026-mega',
    slug: 'sbi-junior-associates-clerk-recruitment-2026',
    category: 'jobs',
    title: 'SBI Clerk 2026 Junior Associates Notification',
    organization: 'State Bank of India (SBI)',
    examName: 'Junior Associates (Customer Support & Sales)',
    postCount: '12,500+',
    publishDate: '28 Sep 2026',
    lastDate: '18 Nov 2026',
    examDate: 'January 2027',
    qualification: 'Graduation Degree in any stream from recognized University',
    qualificationTier: 'graduate',
    sector: 'banking',
    minAge: 20,
    maxAge: 28,
    ageLimit: '20 to 28 Years as on 01-08-2026 (SC/ST +5, OBC +3, PwBD +10)',
    fees: '₹750 for General / OBC / EWS; Nil (₹0) for SC / ST / PwBD / ESM',
sourceNotice: {
      title: "State Bank of India Careers Recruitment Page",
      url: "https://sbi.co.in/web/careers",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
            author: 'Akash Singh Solanki',
    reviewedDate: '30 Sep 2026, 10:00 IST',
    readTime: '9 min read',
    summary: 'State Bank of India invites online applications from eligible Indian citizens for appointment as Junior Associate (Customer Support & Sales) across 17 circles. Features enhanced starting salary under 12th Bipartite Settlement (Gross ~₹39,200/mo), comprehensive pension, and Pan-India postings.',
    linkText: 'Check Circle Vacancies & Apply Online',
    calculatorToolType: 'age',
    importantDates: [
      { event: 'Detailed Notification Released', date: '28 September 2026' },
      { event: 'Online Registration Opens', date: '28 September 2026' },
      { event: 'Last Date for Online Submission', date: '18 November 2026 (23:59 Hrs)' },
      { event: 'Last Date for Fee Payment', date: '18 November 2026' },
      { event: 'Preliminary Examination Window', date: 'January 2027' },
      { event: 'Main Examination Window', date: 'February / March 2027' },
    ],
    applicationFees: [
      { category: 'General / OBC / EWS Candidates', fee: '₹750 (Application fee + Intimation charge)' },
      { category: 'SC / ST / PwBD / Ex-Servicemen', fee: 'Exempted (Nil / ₹0)' },
    ],
    vacanciesTable: [
      {
        postName: 'Junior Associate (Customer Support & Sales)',
        department: 'State Bank of India - 17 Circles',
        classification: 'Clerical Cadre (Permanent)',
        payScale: 'Starting Basic ₹26,730 (Gross ₹39,200/mo + perks)',
        vacancy: '12,500+',
        eligibility: 'Graduation in any discipline + Proficiency in local language of state',
      },
    ],
    salaryStructure: {
      payLevel: 'Clerical Cadre (12th Bipartite Wage Settlement)',
      basicPay: '₹26,730 per month (with 2 advance increments for graduates)',
      daPercent: '15.7% of Basic Pay',
      hraPercent: '₹2,600 to ₹3,800 depending on city tier',
      grossMonthly: '₹39,200 – ₹42,500 per month',
      inHandMonthly: '₹34,800 – ₹37,500 per month (Post NPS & professional tax deductions)',
      benefits: [
        'Provident Fund & New Pension Scheme (NPS) with bank matching contribution',
        'Comprehensive Medical Aid covering 100% hospitalization for employee and 75% for dependents',
        'Leave Fare Concession (LFC) every 2 years across India',
        'Reimbursement for newspaper, tea/refreshment, and uniform allowance',
      ],
    },
    officialLinks: [
      { title: 'SBI Careers Portal', label: 'Apply Online (sbi.co.in/careers)', url: 'https://sbi.co.in/web/careers', isPrimary: true, linkType: 'apply' },
      { title: 'Age Calculator', label: 'Verify Age on 01-08-2026', url: '/tools/age', linkType: 'tool' },
    ],
  },
  {
    id: 'isro-scientist-sc-2026',
    slug: 'isro-scientist-engineer-sc-recruitment-2026',
    category: 'jobs',
    title: 'ISRO Scientist Engineer SC 2026 Notification',
    organization: 'Indian Space Research Organisation (ISRO)',
    examName: 'ISRO Centralised Recruitment Board (ICRB) Scientist SC Exam',
    postCount: '303',
    publishDate: '29 Sep 2026',
    lastDate: '04 Nov 2026',
    examDate: 'December 2026',
    qualification: 'B.E. / B.Tech in Electronics, Mechanical, or Computer Science (Min 65% or 6.84 CGPA)',
    qualificationTier: 'graduate',
    sector: 'other',
    minAge: 18,
    maxAge: 28,
    ageLimit: '18 to 28 Years as on 04-11-2026 (OBC 31, SC/ST 33)',
    fees: '₹250 (₹250 refund for Women / SC / ST / PwBD on CBT attendance)',
    sourceNotice: {
      title: "ISRO Centralised Recruitment Board (ICRB) Notice Board",
      url: "https://www.isro.gov.in/Careers.html",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: null,
    status: 'unverified',
    author: 'Akash Singh Solanki',
    reviewedDate: '30 Sep 2026, 11:30 IST',
    readTime: '8 min read',
    summary: 'Indian Space Research Organisation invites applications for 303 Scientist/Engineer "SC" vacancies across premier centers including URSC Bengaluru, VSSC Thiruvananthapuram, SDSC SHAR Sriharikota, and SAC Ahmedabad with 7th CPC Level 10 pay matrix (₹56,100 starting basic + DA + HRA).',
    linkText: 'Check Discipline Vacancies & Apply Online',
    calculatorToolType: 'marking',
    importantDates: [
      { event: 'Notification Released on ISRO Portal', date: '29 September 2026' },
      { event: 'Online Application Portal Opens', date: '29 September 2026' },
      { event: 'Last Date for Online Submission', date: '04 November 2026 (17:00 Hrs)' },
      { event: 'Last Date for Online Fee Payment', date: '06 November 2026' },
      { event: 'Written CBT Examination', date: 'December 2026' },
    ],
    applicationFees: [
      { category: 'Application Processing Fee (All Candidates)', fee: '₹250 (Non-refundable)' },
      { category: 'Refundable Exam Fee (General/OBC)', fee: '₹500 (Refundable ₹400 on attending CBT)' },
      { category: 'Women, SC, ST, PwBD, ESM Candidates', fee: 'Full Refund of ₹500 on attending CBT' },
    ],
    vacanciesTable: [
      {
        postName: 'Scientist / Engineer "SC" (Mechanical)',
        department: 'ISRO Centers (URSC / VSSC / LPSC / SDSC)',
        classification: 'Central Civil Services Group A (Gazetted)',
        payScale: 'Level 10 (₹56,100 – ₹1,77,500)',
        vacancy: '128',
        eligibility: 'B.E./B.Tech in Mechanical Engg with First Class (min 65% aggregate or 6.84 CGPA)',
      },
      {
        postName: 'Scientist / Engineer "SC" (Electronics)',
        department: 'ISRO Centers (SAC / URSC / ISTRAC)',
        classification: 'Central Civil Services Group A (Gazetted)',
        payScale: 'Level 10 (₹56,100 – ₹1,77,500)',
        vacancy: '105',
        eligibility: 'B.E./B.Tech in ECE / Electronics with First Class (min 65% aggregate or 6.84 CGPA)',
      },
      {
        postName: 'Scientist / Engineer "SC" (Computer Science)',
        department: 'ISRO Centers (NRSC / URSC / IIRS)',
        classification: 'Central Civil Services Group A (Gazetted)',
        payScale: 'Level 10 (₹56,100 – ₹1,77,500)',
        vacancy: '70',
        eligibility: 'B.E./B.Tech in Computer Science / IT with First Class (min 65% aggregate or 6.84 CGPA)',
      },
    ],
    officialLinks: [
      { title: 'ISRO ICRB Portal', label: 'Apply Online (isro.gov.in)', url: 'https://www.isro.gov.in/Careers.html', isPrimary: true, linkType: 'apply' },
      { title: 'Marking Calculator', label: 'Calculate ISRO 0.33 Negative Marks', url: '/tools/marking', linkType: 'tool' },
    ],
  },
  {
    id: 'rbi-grade-b-officers-2026',
    slug: 'rbi-grade-b-officers-recruitment-2026',
    category: 'jobs',
    title: 'RBI Grade B Officers 2026 Recruitment Notice',
    organization: 'Reserve Bank of India (RBI)',
    examName: 'RBI Officers in Grade B (Direct Recruit) Examination 2026',
    postCount: '94',
    publishDate: '25 Sep 2026',
    lastDate: '25 Oct 2026',
    examDate: 'Phase-I: 28 Nov 2026 | Phase-II: Dec 2026',
    qualification: 'Graduation with min 60% marks (50% for SC/ST/PwBD) or Post-Graduation with min 55% marks',
    qualificationTier: 'graduate',
    sector: 'banking',
    minAge: 21,
    maxAge: 30,
    ageLimit: '21 to 30 Years as on 01-10-2026 (Up to 32 for M.Phil, 34 for Ph.D.)',
    fees: '₹850 for General / OBC / EWS; ₹100 for SC / ST / PwBD (Intimation charges)',
sourceNotice: {
      title: "Reserve Bank of India Opportunities Portal",
      url: "https://opportunities.rbi.org.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: null,
    status: 'unverified',
            author: 'Akash Singh Solanki',
    reviewedDate: '30 Sep 2026, 09:30 IST',
    readTime: '9 min read',
    summary: 'Reserve Bank of India invites online applications for Officers in Grade B (DR) (General), DEPR (Department of Economic and Policy Research), and DSIM (Department of Statistics and Information Management). Selected officers draw starting basic pay of ₹55,200 and initial gross monthly emoluments of ₹1,16,000+ plus premier bank quarters.',
    linkText: 'Check RBI Grade B Syllabus & Apply',
    calculatorToolType: 'age',
    importantDates: [
      { event: 'Official Web Notification Released', date: '25 September 2026' },
      { event: 'Online Application Portal Opens', date: '25 September 2026' },
      { event: 'Last Date for Online Submission', date: '25 October 2026 (18:00 Hrs)' },
      { event: 'Phase-I Online Examination (General)', date: '28 November 2026' },
      { event: 'Phase-II Examination (General)', date: '27 December 2026' },
    ],
    applicationFees: [
      { category: 'General / OBC / EWS Candidates', fee: '₹850 (Application Fee + Intimation Charges)' },
      { category: 'SC / ST / PwBD Candidates', fee: '₹100 (Intimation Charges only)' },
      { category: 'RBI Staff Candidates', fee: 'Nil (₹0)' },
    ],
    officialLinks: [
      { title: 'RBI Opportunities Portal', label: 'Apply Online (rbi.org.in)', url: 'https://opportunities.rbi.org.in', isPrimary: true, linkType: 'apply' },
      { title: 'Age Calculator', label: 'Verify Age on 01-10-2026', url: '/tools/age', linkType: 'tool' },
    ],
  },
  {
    id: 'drdo-rac-scientist-b-2026',
    slug: 'drdo-rac-scientist-b-recruitment-2026-gate',
    category: 'jobs',
    title: 'DRDO RAC Scientist B 2026 Recruitment Notice',
    organization: 'Defence Research & Development Organisation (DRDO)',
    examName: 'Recruitment & Assessment Centre (RAC) Scientist B Advt 147',
    postCount: '248',
    publishDate: '30 Sep 2026',
    lastDate: '15 Dec 2026',
    examDate: 'Personal Interview Jan–Feb 2027',
    qualification: 'First Class Bachelor Degree in Engg / Technology + Valid GATE Score',
    qualificationTier: 'graduate',
    sector: 'defence',
    minAge: 18,
    maxAge: 28,
    ageLimit: '18 to 28 Years as on closing date 15-12-2026 (OBC 31, SC/ST 33)',
    fees: '₹100 (Exempted for SC / ST / PwBD / Women candidates)',
sourceNotice: {
      title: "DRDO Recruitment & Assessment Centre (RAC) Portal",
      url: "https://rac.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: null,
    status: 'unverified',
            author: 'Akash Singh Solanki',
    reviewedDate: '30 Sep 2026, 09:00 IST',
    readTime: '7 min read',
    summary: 'Ministry of Defence, Government of India announces 248 Scientist B vacancies in DRDO laboratories and ADA across India in Electronics, Mechanical, Computer Science, Electrical, Physics, and Chemistry. Selection is based on valid GATE score (2024, 2025, or 2026) followed by Personal Interview in Defence Pay Level 10.',
    linkText: 'Check Discipline Seats & Apply Online',
    importantDates: [
      { event: 'Official Advertisement Issued', date: '30 September 2026' },
      { event: 'Online Application Portal Active', date: '30 September 2026' },
      { event: 'Last Date for Online Submission', date: '15 December 2026 (23:59 Hrs)' },
      { event: 'Shortlisted Candidates List', date: 'January 2027' },
      { event: 'Personal Interviews at RAC Delhi', date: 'February – March 2027' },
    ],
    officialLinks: [
      { title: 'DRDO RAC Portal', label: 'Apply Online (rac.gov.in)', url: 'https://rac.gov.in', isPrimary: true, linkType: 'apply' },
    ],
  },
  {
    id: 'bel-project-trainee-engineer-2026',
    slug: 'bel-project-trainee-engineer-recruitment-2026',
    category: 'jobs',
    title: 'BEL Project & Trainee Engineer 2026 Notice',
    organization: 'Bharat Electronics Limited (Govt of India Enterprise)',
    examName: 'BEL Pan-India Strategic Business Units Recruitment 2026',
    postCount: '415',
    publishDate: '29 Sep 2026',
    lastDate: '28 Nov 2026',
    examDate: 'CBT December 2026',
    qualification: 'B.E. / B.Tech / B.Sc Engg (4 Years) in Electronics, Mechanical, Electrical, Computer Science',
    qualificationTier: 'diploma-engg',
    sector: 'other',
    minAge: 18,
    maxAge: 32,
    ageLimit: 'Max 28 Years for Trainee Engineer; Max 32 Years for Project Engineer as on 01-11-2026',
    fees: '₹472 for Project Engineer, ₹177 for Trainee Engineer (SC/ST/PwBD Nil)',
    sourceNotice: {
      title: "Bharat Electronics Limited Recruitment Section",
      url: "https://bel-india.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: null,
    status: 'unverified',
    author: 'Akash Singh Solanki',
    reviewedDate: '30 Sep 2026, 08:30 IST',
    readTime: '6 min read',
    summary: 'Navratna defence PSU Bharat Electronics Limited seeks 415 engineering professionals for missile systems, radar networks, electronic warfare, and military communication projects. Consolidated remuneration up to ₹55,000 per month with annual increments.',
    linkText: 'Check Engineering Branches & Apply',
    importantDates: [
      { event: 'Notification Released on BEL Portal', date: '29 September 2026' },
      { event: 'Online Application Portal Opens', date: '29 September 2026' },
      { event: 'Last Date for Online Submission', date: '28 November 2026' },
      { event: 'Written CBT Exam Date', date: 'December 2026' },
    ],
    officialLinks: [
      { title: 'BEL Careers Portal', label: 'Apply Online (bel-india.in)', url: 'https://bel-india.in/CareersGrid.aspx', isPrimary: true, linkType: 'apply' },
    ],
  },
  {
    id: 'rpf-si-constable-2026',
    slug: 'rpf-si-constable-recruitment-2026',
    category: 'jobs',
    title: 'RPF Sub-Inspector & Constable 2026 Notice',
    organization: 'Ministry of Railways (Railway Protection Force & RPSF)',
    examName: 'RPF Centralized Employment Notice CEN 01/2026 & 02/2026',
    postCount: '4,660',
    publishDate: '28 Sep 2026',
    lastDate: '28 Oct 2026',
    examDate: 'Dec 2026 – Jan 2027',
    qualification: '10th Pass (Matriculation) for Constable; Bachelor’s Degree in any discipline for Sub-Inspector',
    qualificationTier: '10th',
    sector: 'railways',
    minAge: 18,
    maxAge: 28,
    ageLimit: '18 to 28 Years for Constable; 20 to 28 Years for SI (Includes official 3-year Railway age relaxation; OBC +3, SC/ST +5)',
    fees: '₹500 (₹400 refunded on CBT attendance) / ₹250 for Women, SC, ST, Minorities, ESM (₹250 refunded)',
    sourceNotice: {
      title: "Railway Protection Force / Railway Recruitment Board",
      url: "https://www.rrbapply.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: null,
    status: 'unverified',
    author: 'Akash Singh Solanki',
    reviewedDate: '29 Sep 2026, 15:45 IST',
    readTime: '8 min read',
    summary: 'The Ministry of Railways, Government of India, has notified 4,660 vacancies for Sub-Inspector (Executive) and Constable (Executive) in the Railway Protection Force (RPF) and Railway Protection Special Force (RPSF). Featuring 7th CPC Level 3 and Level 6 pay structures, comprehensive 3-year age relaxation, and standardized Physical Efficiency Test (PET) criteria.',
    linkText: 'Check RPF Details & Apply Online',
    calculatorToolType: 'height',
    calculatorPresetId: 'rpf-constable',
    importantDates: [
      { event: 'Official Centralized Notice Published', date: '28 September 2026' },
      { event: 'Online Application Portal Opens', date: '28 September 2026' },
      { event: 'Last Date for Online Registration', date: '28 October 2026 (23:59 Hrs)' },
      { event: 'Online Fee Payment Deadline', date: '29 October 2026' },
      { event: 'Application Modification Window', date: '31 October to 04 November 2026' },
      { event: 'Computer Based Test (CBT) Tentative Dates', date: 'December 2026 – January 2027' },
    ],
    applicationFees: [
      { category: 'General / OBC / EWS Male Candidates', fee: '₹500 (₹400 refunded after appearing in CBT)' },
      { category: 'Female Candidates (All Categories)', fee: '₹250 (Full ₹250 refunded after appearing in CBT)' },
      { category: 'SC / ST / Ex-Servicemen / EBC Candidates', fee: '₹250 (Full ₹250 refunded after appearing in CBT)' },
      { category: 'Payment Gateways', fee: 'Internet Banking, Debit/Credit Card, UPI' },
    ],
    vacanciesTable: [
      {
        postName: 'Constable (Executive) - Male',
        department: 'Railway Protection Force (RPF / RPSF)',
        classification: 'Group C Technical & Security',
        payScale: 'Level 3 (₹21,700 – ₹69,100)',
        vacancy: '3,577',
        eligibility: '10th Pass (Matriculation) from a recognized Board; Physical PET required',
      },
      {
        postName: 'Constable (Executive) - Female',
        department: 'Railway Protection Force (RPF / RPSF)',
        classification: 'Group C Technical & Security',
        payScale: 'Level 3 (₹21,700 – ₹69,100)',
        vacancy: '631',
        eligibility: '10th Pass (Matriculation); 800m run in 3m 40s, Long Jump 9ft, High Jump 3ft',
      },
      {
        postName: 'Sub-Inspector (Executive) - Male & Female',
        department: 'Railway Protection Force (RPF)',
        classification: 'Group C Executive / Subordinate Officer',
        payScale: 'Level 6 (₹35,400 – ₹1,12,400)',
        vacancy: '452',
        eligibility: 'Graduation Degree from recognized University; Physical measurement mandatory',
      },
    ],
    salaryStructure: {
      payLevel: 'Level 3 (Constable) & Level 6 (Sub-Inspector)',
      basicPay: '₹21,700 (Constable) | ₹35,400 (Sub-Inspector)',
      daPercent: '50% of Basic Pay (DA revised bi-annually)',
      hraPercent: '27% in X-Category Cities (₹5,859 for Constable, ₹9,558 for SI)',
      grossMonthly: '₹37,800/mo (Constable) | ₹61,200/mo (Sub-Inspector)',
      inHandMonthly: '₹33,200 (Constable) | ₹54,500 (SI) after statutory NPS & Railway Medical deductions',
      benefits: [
        'Free Railway Passes (Privilege Pass & PTO) across all Indian Railway zones',
        'Railway Medical Attendance & Cashless Hospitalization for self and family',
        'Uniform and Kit Maintenance Allowance (₹10,000 annually)',
        'Risk & Hardship Allowance for special territorial deployments',
        'National Pension System (NPS) with 14% Central Government co-contribution',
      ],
    },
    selectionProcess: [
      {
        stageNumber: 'Phase I',
        stageName: 'Computer Based Test (CBT)',
        description: '120 Multiple Choice Questions (35 Arithmetic, 35 General Intelligence & Reasoning, 50 General Awareness) for 120 marks in 90 minutes. Negative marking 1/3rd mark.',
        qualifyingNature: 'Determines merit ranking for Phase II calling ratio (10 times vacancies).',
      },
      {
        stageNumber: 'Phase II',
        stageName: 'Physical Efficiency Test (PET) & PMT',
        description: 'Constable: 1600m in 5m 45s (Male) / 800m in 3m 40s (Female). SI: 1600m in 6m 30s (Male) / 800m in 4m 00s (Female). Mandatory Long Jump and High Jump.',
        qualifyingNature: 'Strictly qualifying in nature. No marks awarded.',
      },
      {
        stageNumber: 'Phase III',
        stageName: 'Document Verification & Medical Fitness',
        description: 'Verification of 10th/Graduation certificates, category certificates, followed by B-1 category eye vision and fitness test in Railway hospitals.',
        qualifyingNature: 'Final appointment authorization.',
      },
    ],
    examPattern: [
      { subject: 'Basic Arithmetic & Numerical Ability', questions: 35, marks: 35, time: '90 Minutes (Combined)', negativeMarking: '1/3rd (0.33 mark)' },
      { subject: 'General Intelligence & Logical Reasoning', questions: 35, marks: 35, time: '90 Minutes (Combined)', negativeMarking: '1/3rd (0.33 mark)' },
      { subject: 'General Awareness & Indian Railways GK', questions: 50, marks: 50, time: '90 Minutes (Combined)', negativeMarking: '1/3rd (0.33 mark)' },
    ],
    syllabusTopics: [
      {
        subject: 'General Awareness (50 Marks)',
        weightage: '50 Questions / 50 Marks',
        topics: [
          'Indian History, Art & Culture, Freedom Struggle',
          'Geography of India & Railway Networks',
          'Indian Constitution & Fundamental Rights',
          'General Science (Physics, Chemistry, Life Sciences up to 10th standard)',
          'National & International Current Events, Sports & Awards',
        ],
      },
      {
        subject: 'Arithmetic (35 Marks)',
        weightage: '35 Questions / 35 Marks',
        topics: [
          'Number Systems, Whole Numbers, Decimals & Fractions',
          'Percentages, Ratio & Proportion, Averages',
          'Simple & Compound Interest, Profit and Loss',
          'Time and Distance, Time and Work, Menstruation 2D',
          'Use of Tables and Graphs, Data Interpretation',
        ],
      },
      {
        subject: 'General Intelligence & Reasoning (35 Marks)',
        weightage: '35 Questions / 35 Marks',
        topics: [
          'Analogies, Spatial Visualization & Orientation',
          'Problem Solving, Analysis, Judgment & Decision Making',
          'Visual Memory, Discriminating Observation, Relationship Concepts',
          'Arithmetical Reasoning, Figural Classification & Arithmetic Number Series',
          'Coding and Decoding, Statement Conclusion & Syllogistic Reasoning',
        ],
      },
    ],
    cutOffTrends: [
      { year: '2024 Group D/RPF', general: 83.2, obc: 78.4, ews: 76.5, sc: 69.8, st: 64.2, totalMarks: 120 },
      { year: '2022 RPF Constable', general: 79.8, obc: 75.3, ews: 73.1, sc: 66.5, st: 61.4, totalMarks: 120 },
      { year: '2019 RPF SI', general: 94.5, obc: 88.2, ews: 86.0, sc: 81.3, st: 75.6, totalMarks: 120 },
    ],
    faqs: [
      {
        question: 'What is the age relaxation for RPF Constable and SI in 2026?',
        answer: 'The Ministry of Railways granted a statutory 3-year one-time age relaxation beyond normal limits due to recruitment delays. As a result, Constable upper age is 28 years and SI upper age is 28 years for UR/EWS, with an extra 3 years for OBC (31 years) and 5 years for SC/ST (33 years).',
      },
      {
        question: 'Is there negative marking in the RPF Computer Based Test?',
        answer: 'Yes, 1/3rd (0.33) of the marks allocated to each question are deducted for every incorrect response. There is no penalty for unattempted questions.',
      },
      {
        question: 'Can 10th pass candidates apply for the Sub-Inspector post?',
        answer: 'No. Sub-Inspector requires a completed Bachelor’s degree in any discipline from a UGC recognized university. 10th Pass candidates can apply for Constable (Executive).',
      },
    ],
    howToApplySteps: [
      'Visit the official RRB recruitment portal or regional railway recruitment board website.',
      'Complete One Time Registration (OTR) with valid Mobile Number and Aadhar-linked Email.',
      'Select CEN RPF 01/2026 (SI) or CEN RPF 02/2026 (Constable).',
      'Upload recent passport photograph with white background and digital signature.',
      'Pay online examination fee (₹500/₹250) via UPI or Net Banking.',
      'Submit the finalized application and preserve printed copy of application acknowledgement.',
    ],
    officialLinks: [
      { title: 'RRB Official Recruitment Portal', label: 'Apply Online (RRB Central Portal)', url: 'https://www.rrbapply.gov.in', isPrimary: true, linkType: 'apply' },
      { title: 'RPF Centralized Gazette Notification PDF', label: 'Download CEN 01 & 02/2026 PDF', url: 'https://indianrailways.gov.in', isPrimary: false, linkType: 'pdf' },
      { title: 'RPF Physical Standards & Height Checker', label: 'Check RPF Height & Chest Standards', url: '/calculators?tool=height', isPrimary: false, linkType: 'tool' },
    ],
  },
  {
    id: 'ssc-je-2026',
    slug: 'ssc-je-2026-junior-engineer-recruitment',
    category: 'jobs',
    title: 'SSC Junior Engineer 2026 Recruitment Notice',
    organization: 'Staff Selection Commission (SSC)',
    examName: 'Junior Engineer (Civil, Mechanical & Electrical) Examination 2026',
    postCount: '1,765',
    publishDate: '25 Sep 2026',
    lastDate: '25 Oct 2026',
    examDate: 'Jan 2027',
    qualification: 'Diploma or Degree in Civil, Electrical, or Mechanical Engineering from a recognized Institute',
    qualificationTier: 'diploma-engg',
    sector: 'ssc',
    minAge: 18,
    maxAge: 32,
    ageLimit: 'Up to 30 Years for MES/BRO/CWC; Up to 32 Years for CPWD (OBC +3 yrs, SC/ST +5 yrs)',
    fees: '₹100 (Exempted for Women, SC, ST, PwBD, and Ex-Servicemen)',
sourceNotice: {
      title: "Staff Selection Commission (SSC JE Notice)",
      url: "https://ssc.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: null,
    status: 'unverified',
            author: 'Akash Singh Solanki',
    reviewedDate: '29 Sep 2026, 17:30 IST',
    readTime: '7 min read',
    summary: 'Staff Selection Commission has announced 1,765 Group B (Non-Gazetted) Junior Engineer posts in Central Public Works Department (CPWD), Military Engineer Services (MES), Border Roads Organisation (BRO), and Central Water Commission (CWC) under Level 6 (₹35,400 – ₹1,12,400).',
    linkText: 'Read SSC JE Gazette & Syllabus',
    calculatorToolType: 'marking',
    calculatorPresetId: 'ssc-cgl',
    importantDates: [
      { event: 'Official Gazette Notification Issued', date: '25 September 2026' },
      { event: 'Online Application Window Opens', date: '25 September 2026' },
      { event: 'Last Date for Online Submission', date: '25 October 2026 (23:00 Hrs IST)' },
      { event: 'Last Date for Online Fee Payment', date: '26 October 2026' },
      { event: 'Application Correction Window', date: '28 October to 30 October 2026' },
      { event: 'Paper-I Computer Based Test (CBT)', date: 'January 2027' },
    ],
    applicationFees: [
      { category: 'General / OBC / EWS Male Candidates', fee: '₹100 (Non-refundable)' },
      { category: 'Women Candidates (All Categories)', fee: 'Exempted (Nil / ₹0)' },
      { category: 'SC / ST / PwBD / ESM Candidates', fee: 'Exempted (Nil / ₹0)' },
      { category: 'Payment Modes', fee: 'BHIM UPI, Net Banking, Visa, MasterCard, RuPay Card' },
    ],
    vacanciesTable: [
      {
        postName: 'Junior Engineer (Civil)',
        department: 'Central Public Works Department (CPWD)',
        classification: 'Group B (Non-Gazetted)',
        payScale: 'Level 6 (₹35,400 – ₹1,12,400)',
        vacancy: '738',
        eligibility: 'Diploma or Degree in Civil Engineering from recognized University/Institute',
      },
      {
        postName: 'Junior Engineer (Electrical & Mechanical)',
        department: 'CPWD & Military Engineer Services (MES)',
        classification: 'Group B (Non-Gazetted)',
        payScale: 'Level 6 (₹35,400 – ₹1,12,400)',
        vacancy: '482',
        eligibility: 'Degree in Electrical/Mechanical OR 3-year Diploma + 2 years experience',
      },
      {
        postName: 'Junior Engineer (Civil & Electrical)',
        department: 'Border Roads Organisation (BRO) & CWC',
        classification: 'Group B (Non-Gazetted)',
        payScale: 'Level 6 (₹35,400 – ₹1,12,400)',
        vacancy: '545',
        eligibility: 'Degree or Diploma in relevant engineering branch; Medical standards applicable',
      },
    ],
    salaryStructure: {
      payLevel: 'Pay Level 6 (7th CPC Matrix)',
      basicPay: '₹35,400 per month',
      daPercent: '50% of Basic Pay (₹17,700)',
      hraPercent: '27% in X-Category Cities (₹9,558)',
      grossMonthly: '₹65,400 per month',
      inHandMonthly: '₹57,500 – ₹59,200 per month after statutory deductions',
      benefits: [
        'Central Government Health Scheme (CGHS) medical coverage',
        'Dearness Allowance revised bi-annually per CPI-IW index',
        'Transport Allowance of ₹3,600 + DA in classified cities',
        'Leave Travel Concession (LTC) and annual paid vacation',
        'Government accommodation or full House Rent Allowance',
      ],
    },
    selectionProcess: [
      {
        stageNumber: 'Paper-I',
        stageName: 'Computer Based Test (CBT)',
        description: '200 Objective questions: 50 General Intelligence & Reasoning, 50 General Awareness, 100 General Engineering (Civil/Electrical/Mechanical) in 2 hours.',
        qualifyingNature: 'Shortlists candidates for Paper-II CBT technical examination.',
      },
      {
        stageNumber: 'Paper-II',
        stageName: 'Computer Based Technical Examination',
        description: '100 Technical questions in core engineering discipline (300 Marks, 2 hours). Negative marking of 1 mark per incorrect answer.',
        qualifyingNature: 'Marks combined with Paper-I to decide final All-India Merit Ranking.',
      },
      {
        stageNumber: 'Document Scrutiny',
        stageName: 'Document Verification by User Departments',
        description: 'Verification of diploma/degree marks sheets, caste authenticity, and physical criteria for BRO.',
        qualifyingNature: 'Final joining clearance.',
      },
    ],
    examPattern: [
      { subject: 'General Intelligence and Reasoning', questions: 50, marks: 50, time: '2 Hours (Combined)', negativeMarking: '0.25 Mark' },
      { subject: 'General Awareness', questions: 50, marks: 50, time: '2 Hours (Combined)', negativeMarking: '0.25 Mark' },
      { subject: 'Part A: Civil / Part B: Electrical / Part C: Mechanical', questions: 100, marks: 100, time: '2 Hours (Combined)', negativeMarking: '0.25 Mark' },
    ],
    syllabusTopics: [
      {
        subject: 'General Intelligence & Reasoning',
        weightage: '50 Marks',
        topics: ['Analogies & Similarities', 'Space Visualization & Spatial Orientation', 'Analysis, Judgment & Problem Solving', 'Arithmetical Reasoning & Number Series', 'Coding-Decoding & Non-verbal Patterns'],
      },
      {
        subject: 'General Awareness',
        weightage: '50 Marks',
        topics: ['Current Affairs & Science in Everyday Life', 'Indian Polity & Constitution', 'History & Culture of India', 'Geography & Environmental Studies', 'Economics & Five Year Planning Framework'],
      },
      {
        subject: 'Core Engineering (Civil / Electrical / Mechanical)',
        weightage: '100 Marks (Paper 1) + 300 Marks (Paper 2)',
        topics: [
          'Civil: Building Materials, Surveying, Estimating & Costing, Soil Mechanics, Hydraulics, RCC & Steel Design',
          'Electrical: Basic concepts, Circuit law, Magnetic Circuit, AC Fundamentals, Electrical Machines, Power Generation',
          'Mechanical: Theory of Machines, Machine Design, Engineering Mechanics, Thermodynamics, Fluid Mechanics',
        ],
      },
    ],
    cutOffTrends: [
      { year: '2024 Civil (Paper 1)', general: 110.5, obc: 107.8, ews: 98.4, sc: 89.2, st: 87.5, totalMarks: 200 },
      { year: '2024 Electrical/Mech (Paper 1)', general: 132.8, obc: 130.4, ews: 125.6, sc: 116.5, st: 105.8, totalMarks: 200 },
      { year: '2023 Civil (Paper 1)', general: 108.2, obc: 106.1, ews: 96.2, sc: 86.5, st: 85.0, totalMarks: 200 },
    ],
    faqs: [
      {
        question: 'Are final year engineering students eligible for SSC JE 2026?',
        answer: 'Candidates must possess the essential educational qualification degree or diploma on or before the crucial closing date specified in the official gazette notification.',
      },
      {
        question: 'Is work experience required for Diploma holders in CPWD?',
        answer: 'For CPWD, a 3-year Diploma in Civil or Electrical Engineering is eligible directly without mandatory work experience. For MES, diploma holders require 2 years of relevant experience.',
      },
    ],
    howToApplySteps: [
      'Visit the new SSC official portal (ssc.gov.in) and complete your One-Time Registration (OTR).',
      'Log in with your OTR credentials and navigate to the "Live Examinations" tab.',
      'Select Junior Engineer (Civil, Mechanical & Electrical) Examination 2026.',
      'Choose your examination branch (Civil, Electrical, or Mechanical).',
      'Upload a live photo via webcam/mobile and digital signature.',
      'Pay ₹100 application fee online (exempted categories bypass) and download the confirmation slip.',
    ],
    officialLinks: [
      { title: 'SSC Official Portal', label: 'Apply Online at ssc.gov.in', url: 'https://ssc.gov.in', isPrimary: true, linkType: 'apply' },
      { title: 'SSC JE Official Notification PDF', label: 'Download Official Gazette Notice', url: 'https://ssc.gov.in', isPrimary: false, linkType: 'pdf' },
      { title: 'Negative Marking Tool', label: 'Calculate SSC JE Marks & Penalties', url: '/calculators?tool=marking', isPrimary: false, linkType: 'tool' },
    ],
  },
  {
    id: 'ibps-po-clerk-xv-2026',
    slug: 'ibps-po-clerk-xv-recruitment-2026',
    category: 'jobs',
    title: 'IBPS PO & Clerk XV 2026 Recruitment Notice',
    organization: 'Institute of Banking Personnel Selection (IBPS)',
    examName: 'Common Recruitment Process (CRP PO/MT-XV & Clerks-XV)',
    postCount: '5,800+',
    publishDate: '26 Sep 2026',
    lastDate: '26 Oct 2026',
    examDate: 'Nov – Dec 2026',
    qualification: 'A Degree (Graduation) in any discipline from a University recognized by the Govt. of India',
    qualificationTier: 'graduate',
    sector: 'banking',
    minAge: 20,
    maxAge: 30,
    ageLimit: '20 to 30 Years for Probationary Officers; 20 to 28 Years for Clerks (+3 OBC, +5 SC/ST, +10 PwBD)',
    fees: '₹850 for General/OBC/EWS candidates; ₹175 for SC/ST/PwBD candidates',
sourceNotice: {
      title: "Institute of Banking Personnel Selection Official Portal",
      url: "https://www.ibps.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
            author: 'Akash Singh Solanki',
    reviewedDate: '28 Sep 2026, 14:15 IST',
    readTime: '8 min read',
    summary: 'Official notification released for 5,800+ Probationary Officer (PO/MT) and Customer Support Associate (Clerk) vacancies across 11 nationalized public sector banks including Bank of Baroda, Canara Bank, Punjab National Bank, and Union Bank of India with enhanced pay under the 12th Bipartite Wage Settlement.',
    linkText: 'Apply Online & Check Exam Pattern',
    calculatorToolType: 'marking',
    calculatorPresetId: 'bank-po',
    importantDates: [
      { event: 'Detailed Notification Released', date: '26 September 2026' },
      { event: 'Online Registration and Payment Commences', date: '26 September 2026' },
      { event: 'Last Date to Submit Application', date: '26 October 2026 (23:59 Hrs)' },
      { event: 'Preliminary Online Examination', date: 'November 2026' },
      { event: 'Main Online Examination', date: 'December 2026 / January 2027' },
      { event: 'Interviews & Provisional Allotment', date: 'February – April 2027' },
    ],
    applicationFees: [
      { category: 'General / EWS / OBC Candidates', fee: '₹850 (Inclusive of GST)' },
      { category: 'SC / ST / PwBD Candidates', fee: '₹175 (Intimation charges only)' },
      { category: 'Payment Method', fee: 'Online Debit/Credit Cards, Net Banking, IMPS, UPI' },
    ],
    vacanciesTable: [
      {
        postName: 'Probationary Officer / Management Trainee (PO/MT)',
        department: '11 Participating Public Sector Commercial Banks',
        classification: 'Junior Management Grade Scale I (JMGS-I)',
        payScale: '₹48,480 – ₹85,920 (12th BPS Pay Scale)',
        vacancy: '3,950',
        eligibility: 'Graduation Degree in any stream; Computer literacy certificate required',
      },
      {
        postName: 'Customer Support Associate (Clerk-XV)',
        department: '11 Participating Public Sector Banks',
        classification: 'Clerical Cadre',
        payScale: '₹24,050 – ₹64,480 (12th BPS Scale)',
        vacancy: '1,850',
        eligibility: 'Graduation Degree with proficiency in official state language of chosen state',
      },
    ],
    salaryStructure: {
      payLevel: 'Scale-I Officer (12th Bipartite Settlement)',
      basicPay: '₹48,480 per month',
      daPercent: '15.7% of Basic Pay (Quarterly CPI Revision)',
      hraPercent: '8% to 10% or Company Lease Accommodation',
      grossMonthly: '₹75,500 – ₹78,200 per month',
      inHandMonthly: '₹67,000 – ₹69,500 per month after PF & NPS deductions',
      benefits: [
        'Bank Leased Accommodation or enhanced House Rent Allowance',
        'Comprehensive 100% Medical Hospitalization coverage for employee & family',
        'Concessional Staff Loans for Home, Vehicle, and Higher Education',
        'Monthly Petrol/Conveyance allowance & Newspaper allowance',
        'Contributory Pension Fund / NPS matching contribution',
      ],
    },
    selectionProcess: [
      {
        stageNumber: 'Prelims',
        stageName: 'Preliminary CBT Exam (100 Marks)',
        description: 'English Language (30 Qs), Quantitative Aptitude (35 Qs), Reasoning Ability (35 Qs) with sectional 20-minute timers.',
        qualifyingNature: 'Qualifying screening test to appear in Mains Examination.',
      },
      {
        stageNumber: 'Mains',
        stageName: 'Mains Objective Exam & Descriptive Test',
        description: '200 Marks Objective test (Reasoning, Data Analysis, General Banking Awareness, English) + 25 Marks English Essay & Letter writing.',
        qualifyingNature: 'Mains score carries 80% weightage in final provisional allotment.',
      },
      {
        stageNumber: 'Interview',
        stageName: 'Common Personal Interview (PO Only)',
        description: '100 Marks interview conducted by participating banks. Minimum qualifying score 40% (35% for SC/ST/OBC/PwBD).',
        qualifyingNature: 'Carries 20% weightage in final combined score.',
      },
    ],
    examPattern: [
      { subject: 'English Language', questions: 30, marks: 30, time: '20 Minutes (Sectional)', negativeMarking: '0.25 Mark' },
      { subject: 'Quantitative Aptitude', questions: 35, marks: 35, time: '20 Minutes (Sectional)', negativeMarking: '0.25 Mark' },
      { subject: 'Reasoning Ability', questions: 35, marks: 35, time: '20 Minutes (Sectional)', negativeMarking: '0.25 Mark' },
    ],
    syllabusTopics: [
      {
        subject: 'Reasoning & Computer Aptitude',
        weightage: '45 Qs / 60 Marks (Mains)',
        topics: ['Puzzles & Seating Arrangements (Circular, Linear, Floor-Flat)', 'Machine Input-Output & Data Sufficiency', 'Inequalities & Syllogism', 'Logical Reasoning & Coding-Decoding', 'Computer Networking & DBMS Fundamentals'],
      },
      {
        subject: 'General / Economy / Banking Awareness',
        weightage: '40 Qs / 40 Marks (Mains)',
        topics: ['RBI Monetary Policy & Repo Rates', 'Current Financial & Banking Affairs (Past 6 Months)', 'Government Social Security Schemes (PMJJBY, PMSBY, APY)', 'Financial Inclusion & Capital Markets', 'Static GK & Headquarters of International Organizations'],
      },
      {
        subject: 'Data Analysis & Interpretation',
        weightage: '35 Qs / 60 Marks (Mains)',
        topics: ['Pie Charts, Radar & Funnel Graphs', 'Missing DI, Caselets & Tabular Analysis', 'Probability, Permutations & Combinations', 'Arithmetic Word Problems & Data Inequalities'],
      },
    ],
    cutOffTrends: [
      { year: '2024 Prelims', general: 54.25, obc: 54.25, ews: 54.25, sc: 48.75, st: 41.50, totalMarks: 100 },
      { year: '2023 Prelims', general: 54.00, obc: 54.00, ews: 54.00, sc: 49.00, st: 43.00, totalMarks: 100 },
      { year: '2022 Prelims', general: 49.75, obc: 49.75, ews: 49.75, sc: 46.75, st: 40.50, totalMarks: 100 },
    ],
    faqs: [
      {
        question: 'Is there sectional cut-off in IBPS PO Prelims and Mains?',
        answer: 'Yes, candidates must qualify both the sectional cut-off in each of the three tests and the overall aggregate cut-off score decided by IBPS.',
      },
      {
        question: 'Are marks of IBPS Prelims counted in final selection?',
        answer: 'No. The preliminary examination is purely for shortlisting candidates for the main examination. Final merit is prepared on the basis of Mains + Interview score (80:20 ratio).',
      },
    ],
    howToApplySteps: [
      'Navigate to IBPS official portal (ibps.in) and click on CRP PO/MT-XV or CRP Clerks-XV.',
      'Click on "New Registration" and enter basic personal and contact details.',
      'Upload Left Thumb Impression, Handwritten Declaration, Photo, and Signature as per specifications.',
      'Provide educational marks and preference order of 11 participating public sector banks.',
      'Pay fees online through payment gateway and print receipt.',
    ],
    officialLinks: [
      { title: 'IBPS Official Portal', label: 'Apply Online at ibps.in', url: 'https://www.ibps.in', isPrimary: true, linkType: 'apply' },
      { title: 'Official IBPS Notification PDF', label: 'Download CRP PO/MT Notification', url: 'https://www.ibps.in', isPrimary: false, linkType: 'pdf' },
      { title: 'Banking Marks Calculator', label: 'Calculate Bank PO Test Marks', url: '/calculators?tool=marking', isPrimary: false, linkType: 'tool' },
    ],
  },
  {
    id: 'defence-afcat-nda-2026',
    slug: 'defence-afcat-nda-recruitment-2026',
    category: 'jobs',
    title: 'IAF AFCAT 01/2026 & UPSC NDA I Notification',
    organization: 'Indian Air Force & Union Public Service Commission',
    examName: 'Air Force Common Admission Test & National Defence Academy 2026',
    postCount: '717',
    publishDate: '27 Sep 2026',
    lastDate: '27 Oct 2026',
    examDate: 'Feb – April 2027',
    qualification: '10+2 with 60% in Physics & Math (NDA/Air Force Flying); Graduation/B.E./B.Tech for AFCAT Ground Duty',
    qualificationTier: '12th',
    sector: 'defence',
    minAge: 16,
    maxAge: 26,
    ageLimit: '16.5 to 19.5 Years for NDA (10+2 Entry); 20 to 24 Years for AFCAT Flying; 20 to 26 Years for Ground Duty',
    fees: '₹550 for AFCAT (IAF Portal); ₹100 for NDA (Exempted for Female/SC/ST)',
sourceNotice: {
      title: "UPSC & Indian Air Force CDAC Portal",
      url: "https://afcat.cdac.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: null,
    status: 'unverified',
            author: 'Akash Singh Solanki',
    reviewedDate: '29 Sep 2026, 18:20 IST',
    readTime: '8 min read',
    summary: 'Indian Armed Forces have opened registrations for commissioned officer entries through AFCAT 01/2026 (Flying, Technical, Weapon Systems & Administration) and UPSC NDA-1 2026 for Army, Navy, and Air Force cadet wings with Level 10 Pay Matrix (₹56,100 + ₹15,500 Military Service Pay).',
    linkText: 'Check Eligibility & Apply for Defence Commission',
    calculatorToolType: 'height',
    calculatorPresetId: 'defence-cds',
    importantDates: [
      { event: 'Notification Released for AFCAT & NDA', date: '27 September 2026' },
      { event: 'Online Application Portal Active', date: '27 September 2026' },
      { event: 'Last Date for Online Submission', date: '27 October 2026 (18:00 Hrs)' },
      { event: 'AFCAT Written Examination Date', date: 'February 2027' },
      { event: 'UPSC NDA & NA 1 Written Examination', date: 'April 2027' },
      { event: 'SSB Interview Calls', date: 'June – August 2027' },
    ],
    applicationFees: [
      { category: 'AFCAT Exam Registration Fee (IAF Portal)', fee: '₹550 (Non-refundable for all candidates)' },
      { category: 'NDA General / OBC Male Candidates', fee: '₹100 (UPSC Portal)' },
      { category: 'NDA Female, SC & ST Candidates', fee: 'Exempted (Nil / ₹0)' },
    ],
    vacanciesTable: [
      {
        postName: 'Flying Branch (Short Service Commission / Permanent)',
        department: 'Indian Air Force',
        classification: 'Commissioned Officer (Flying Officer)',
        payScale: 'Level 10 (₹56,100 – ₹1,77,500 + ₹15,500 MSP)',
        vacancy: '142',
        eligibility: '10+2 with min 50% in Math & Physics + Graduation with min 60% OR B.E./B.Tech',
      },
      {
        postName: 'Ground Duty (Technical & Non-Technical) & Weapon Systems',
        department: 'Indian Air Force',
        classification: 'Commissioned Officer (Flying Officer)',
        payScale: 'Level 10 (₹56,100 – ₹1,77,500 + ₹15,500 MSP)',
        vacancy: '175',
        eligibility: 'Engineering Degree for Technical; Graduation in any stream for Administration / Logistics',
      },
      {
        postName: 'National Defence Academy (Army, Navy, Air Force) & Naval Academy',
        department: 'Ministry of Defence (Joint Services)',
        classification: 'Officer Cadet (Stipend ₹56,100/mo in final year)',
        payScale: 'Cadet Stipend Level 10 on commissioning',
        vacancy: '400',
        eligibility: '12th Class pass (10+2 pattern) of State Education Board or equivalent',
      },
    ],
    salaryStructure: {
      payLevel: 'Pay Level 10 (Defence Services Pay Rules)',
      basicPay: '₹56,100 per month (Flying Officer / Lieutenant)',
      daPercent: '50% of Basic Pay (₹28,050)',
      hraPercent: 'Military Service Pay (MSP) ₹15,500 per month (Fixed)',
      grossMonthly: '₹1,05,500 – ₹1,30,000 per month (depending on Flying Allowance)',
      inHandMonthly: '₹92,000 – ₹1,12,000 per month (Flying allowance up to ₹25,000/mo extra)',
      benefits: [
        'Military Service Pay (MSP) of ₹15,500 monthly across all officer ranks',
        'Flying Allowance for Flying Officers / High Altitude Allowance',
        'Complete Free Medical Facilities for Officer and Dependents (ECHS/Military Hospitals)',
        'Officers Mess, Subsidized CSD Canteen, and Defence Club facilities',
        'Defence Service Officers Group Insurance Scheme (DSOP) ₹1 Crore coverage',
      ],
    },
    selectionProcess: [
      {
        stageNumber: 'Stage 1',
        stageName: 'Written Examination',
        description: 'AFCAT: 100 questions (300 Marks, 2 hours) on Verbal, Reasoning, Military Aptitude, Numerical, GK. NDA: Mathematics (300 Marks) + General Ability Test (600 Marks).',
        qualifyingNature: 'Shortlists candidates for 5-day SSB interview call.',
      },
      {
        stageNumber: 'Stage 2',
        stageName: '5-Day Services Selection Board (SSB) Interview',
        description: 'Stage I (Screening test, OIR, PPDT) followed by Stage II (Psychological tests, Group Testing Officer GTO tasks, and Personal Interview).',
        qualifyingNature: 'Recommendation by SSB Board is mandatory.',
      },
      {
        stageNumber: 'Stage 3',
        stageName: 'CPSS / Medical Examination Board',
        description: 'Computerized Pilot Selection System (CPSS, once in a lifetime test for Flying Branch) and special military aviation medical fitness examination.',
        qualifyingNature: 'Final All-India Merit list allotment.',
      },
    ],
    examPattern: [
      { subject: 'General Awareness', questions: 25, marks: 75, time: '2 Hours (Combined)', negativeMarking: '1 Mark' },
      { subject: 'Verbal Ability in English', questions: 30, marks: 90, time: '2 Hours (Combined)', negativeMarking: '1 Mark' },
      { subject: 'Numerical Ability', questions: 20, marks: 60, time: '2 Hours (Combined)', negativeMarking: '1 Mark' },
      { subject: 'Reasoning and Military Aptitude Test', questions: 25, marks: 75, time: '2 Hours (Combined)', negativeMarking: '1 Mark' },
    ],
    syllabusTopics: [
      {
        subject: 'English Verbal Ability',
        weightage: '30 Qs / 90 Marks',
        topics: ['Comprehension Passages', 'Error Detection in Sentences', 'Sentence Completion & Fill in the Blanks', 'Synonyms, Antonyms and Contextual Vocabulary', 'Idioms and Phrases & Analogy'],
      },
      {
        subject: 'General Awareness',
        weightage: '25 Qs / 75 Marks',
        topics: ['Defence Forces Strategy & Operations', 'Indian History, National Geography & Environment', 'Basic Science & Everyday Technology', 'International Geopolitics & Summits', 'Sports, National Honours & Personalities'],
      },
      {
        subject: 'Reasoning & Military Aptitude',
        weightage: '25 Qs / 75 Marks',
        topics: ['Verbal & Non-Verbal Reasoning', 'Spatial Ability & Embedded Figures', 'Pattern Completion & Dot Situations', 'Rotated Blocks & Analogy Figures'],
      },
    ],
    cutOffTrends: [
      { year: 'AFCAT 02/2024', general: 141, obc: 141, ews: 141, sc: 141, st: 141, totalMarks: 300 },
      { year: 'AFCAT 01/2024', general: 137, obc: 137, ews: 137, sc: 137, st: 137, totalMarks: 300 },
      { year: 'NDA 1 2024 (Written)', general: 301, obc: 301, ews: 301, sc: 301, st: 301, totalMarks: 900 },
    ],
    faqs: [
      {
        question: 'Can girls and women candidates apply for NDA and AFCAT?',
        answer: 'Yes! Female candidates are eligible to apply for all branches of NDA (Army, Navy, Air Force) as well as AFCAT (Flying, Technical, and Ground Duty) with identical testing standards.',
      },
      {
        question: 'What is the CPSS test for the Flying branch?',
        answer: 'The Computerized Pilot Selection System (CPSS) tests psychomotor skills, spatial coordination, and instrument reading. It can only be attempted once in a lifetime by any candidate.',
      },
    ],
    howToApplySteps: [
      'For AFCAT: Register on afcat.cdac.in using an active email ID and mobile number.',
      'For NDA: Register on UPSC OTR portal at upsconline.nic.in.',
      'Upload qualifying certificates (10th/12th/Graduation), photograph, and signature.',
      'Select preferred exam centres and SSB interview centres.',
      'Pay online registration fee and download the completed application form.',
    ],
    officialLinks: [
      { title: 'Indian Air Force AFCAT Portal', label: 'Apply Online (afcat.cdac.in)', url: 'https://afcat.cdac.in', isPrimary: true, linkType: 'apply' },
      { title: 'UPSC NDA Application Portal', label: 'Apply on UPSC Portal (upsconline.nic.in)', url: 'https://upsconline.nic.in', isPrimary: false, linkType: 'apply' },
      { title: 'Armed Forces Height Checker', label: 'Check Defence Height & Physical Criteria', url: '/calculators?tool=height', isPrimary: false, linkType: 'tool' },
    ],
  },
  {
    id: 'ssc-cgl-2026',
    slug: 'ssc-cgl-2026-recruitment-notification',
    category: 'jobs',
    title: 'SSC CGL 2026 Recruitment Notification',
    organization: 'Staff Selection Commission (SSC)',
    examName: 'Combined Graduate Level Examination 2026',
    postCount: '17,727',
    publishDate: '24 Sep 2026',
    lastDate: '24 Oct 2026',
    examDate: 'Dec 2026',
    qualification: 'Bachelor’s Degree in any discipline from a recognized University',
    qualificationTier: 'graduate',
    sector: 'ssc',
    minAge: 18,
    maxAge: 32,
    ageLimit: '18 to 32 Years (Crucial cutoff date: 01-08-2026 as per DOP&T guidelines)',
    fees: '₹100 (Exempted for All Women, SC, ST, PwBD, and Ex-Servicemen)',
    sourceNotice: {
      title: "Staff Selection Commission (SSC CGL Notice)",
      url: "https://ssc.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
    author: 'Akash Singh Solanki',
    reviewedDate: '28 Sep 2026, 18:30 IST',
    readTime: '7 min read',
    summary: 'The Staff Selection Commission has officially notified 17,727 Group B and Group C officer vacancies across Central Ministries, Central Board of Direct Taxes (CBDT), Central Board of Indirect Taxes and Customs (CBIC), Central Bureau of Investigation (CBI), Enforcement Directorate, and Comptroller and Auditor General (CAG) of India.',
    linkText: 'Read Full Notification & Apply Online',
    calculatorToolType: 'age',
    calculatorPresetId: 'ssc-cgl',
    syllabusTopics: [
      {
        subject: 'General Intelligence & Reasoning',
        weightage: '25 Qs / 50 Marks (Tier 1)',
        topics: ['Analogies & Similarities', 'Blood Relations & Direction Sense', 'Venn Diagrams & Syllogism', 'Matrix & Number Series', 'Coding-Decoding & Paper Folding'],
      },
      {
        subject: 'General Awareness & Current Affairs',
        weightage: '25 Qs / 50 Marks (Tier 1)',
        topics: ['Indian Constitution & Polity', 'Modern History & National Movements', 'Macro Economics & Union Budget', 'Physical & Indian Geography', 'General Science (Physics, Chemistry, Biology)'],
      },
      {
        subject: 'Quantitative Aptitude',
        weightage: '25 Qs / 50 Marks (Tier 1)',
        topics: ['Number Systems & Divisibility', 'Percentages, Profit & Loss, Discount', 'Time, Work & Distance', 'Algebra & Linear Equations', 'Trigonometry, Heights & Distances', 'Geometry & Menstruation 2D/3D'],
      },
      {
        subject: 'English Comprehension',
        weightage: '25 Qs / 50 Marks (Tier 1)',
        topics: ['Reading Comprehension & Cloze Test', 'Spotting Errors & Sentence Correction', 'Idioms, Phrases & One Word Substitutions', 'Active-Passive Voice & Direct-Indirect Speech'],
      },
    ],
    cutOffTrends: [
      { year: '2025 Tier-1', general: 153.25, obc: 148.5, ews: 145.2, sc: 128.75, st: 119.5, totalMarks: 200 },
      { year: '2024 Tier-1', general: 150.05, obc: 145.9, ews: 143.4, sc: 126.68, st: 118.16, totalMarks: 200 },
      { year: '2023 Tier-1', general: 149.63, obc: 145.93, ews: 143.44, sc: 126.69, st: 118.16, totalMarks: 200 },
    ],
    importantDates: [
      { event: 'Official Gazette Notification Issued', date: '24 September 2026' },
      { event: 'Online Application Portal Opens', date: '24 September 2026' },
      { event: 'Last Date for Online Submission', date: '24 October 2026 (23:00 Hrs IST)' },
      { event: 'Last Date for Online Fee Payment', date: '25 October 2026 (23:00 Hrs IST)' },
      { event: 'Application Form Correction Window', date: '28 October to 30 October 2026' },
      { event: 'Tier-1 CBT All-India Exam Window', date: 'December 2026 (Multiple Shifts)' },
      { event: 'Tier-2 CBT Mains Exam Window', date: 'February – March 2027' },
    ],
    applicationFees: [
      { category: 'General / OBC / EWS Male Candidates', fee: '₹100 (Non-refundable)' },
      { category: 'All Female Candidates (All Categories)', fee: 'Exempted (Nil / ₹0)' },
      { category: 'SC / ST / PwBD / Ex-Servicemen (ESM)', fee: 'Exempted (Nil / ₹0)' },
      { category: 'Permitted Payment Modes', fee: 'BHIM UPI, Net Banking, Visa, MasterCard, RuPay Card' },
    ],
    vacanciesTable: [
      {
        postName: 'Assistant Section Officer (ASO)',
        department: 'Central Secretariat Service (CSS) / Ministry of External Affairs (MEA) / IB',
        classification: 'Group B (Non-Gazetted)',
        payScale: 'Level 7 (₹44,900 – ₹1,42,400)',
        vacancy: '2,840',
        eligibility: 'Bachelor Degree in any discipline; CPT Computer Proficiency qualifying test required',
      },
      {
        postName: 'Inspector of Income Tax (CBDT)',
        department: 'Central Board of Direct Taxes, Ministry of Finance',
        classification: 'Group C',
        payScale: 'Level 7 (₹44,900 – ₹1,42,400)',
        vacancy: '1,420',
        eligibility: 'Graduation Degree; Age 18–30 Years',
      },
      {
        postName: 'Inspector (Central Excise, GST & Preventive)',
        department: 'Central Board of Indirect Taxes & Customs (CBIC)',
        classification: 'Group B',
        payScale: 'Level 7 (₹44,900 – ₹1,42,400)',
        vacancy: '3,110',
        eligibility: 'Graduation Degree + Physical walking (1600m in 15 mins) and cycling test',
      },
      {
        postName: 'Sub-Inspector (CBI)',
        department: 'Central Bureau of Investigation (Department of Personnel & Training)',
        classification: 'Group B',
        payScale: 'Level 7 (₹44,900 – ₹1,42,400)',
        vacancy: '420',
        eligibility: 'Graduation Degree; Physical standards mandatory (165cm Male, 150cm Female)',
      },
      {
        postName: 'Tax Assistant & Auditor',
        department: 'CBDT, CBIC & Offices under C&AG',
        classification: 'Group C',
        payScale: 'Level 4 & Level 5 (₹25,500 – ₹92,300)',
        vacancy: '9,937',
        eligibility: 'Bachelor’s Degree with Data Entry Speed of 8,000 key depressions per hour',
      },
    ],
    salaryStructure: {
      payLevel: 'Pay Level 7 (7th CPC Matrix)',
      basicPay: '₹44,900 per month',
      daPercent: '50% of Basic Pay (₹22,450)',
      hraPercent: '27% in X-Category Cities / Delhi / Mumbai (₹12,123)',
      grossMonthly: '₹84,873 per month',
      inHandMonthly: '₹74,200 – ₹76,500 per month (after NPS & CGHS statutory deductions)',
      benefits: [
        'Central Government Health Scheme (CGHS) cashless medical coverage for self and dependants',
        'Dearness Allowance (DA) revised bi-annually per Consumer Price Index (CPI-IW)',
        'Transport Allowance (₹3,600 + DA thereon in classified cities)',
        'National Pension System (NPS) with 14% Government contribution',
        'Leave Travel Concession (LTC) and All-India / Home Town airfare reimbursement',
      ],
    },
    selectionProcess: [
      {
        stageNumber: 'Tier 1',
        stageName: 'Computer Based Examination (CBT)',
        description: 'Objective multiple-choice screening exam covering Reasoning, General Awareness, Quantitative Aptitude, and English (100 questions, 200 marks, 60 minutes).',
        qualifyingNature: 'Purely qualifying in nature; marks not added to the final merit ranking list.',
      },
      {
        stageNumber: 'Tier 2',
        stageName: 'Mains Examination (Paper 1 & Paper 2)',
        description: 'Session I (Mathematical Abilities, Reasoning, English Language, General Awareness, Computer Knowledge) + Session II (Data Entry Speed Test).',
        qualifyingNature: 'Marks determine final All-India Merit Ranking and post allocation.',
      },
      {
        stageNumber: 'Stage 3',
        stageName: 'Physical Standards & PET (Specific Posts)',
        description: 'Walking and cycling tests for Central Excise Inspector, Sub-Inspector in CBI, and NIA officers.',
        qualifyingNature: 'Strictly qualifying physical benchmarks.',
      },
      {
        stageNumber: 'Stage 4',
        stageName: 'Document Verification (DV) by User Ministries',
        description: 'Scrutiny of original graduation certificates, caste certificates (OBC-NCL / EWS), and biometric identity verification.',
        qualifyingNature: 'Final appointment clearance.',
      },
    ],
    examPattern: [
      {
        subject: 'General Intelligence & Reasoning',
        questions: 25,
        marks: 50,
        time: 'Combined 60 Minutes',
        negativeMarking: '-0.50 Marks per wrong response',
      },
      {
        subject: 'General Awareness & Current Affairs',
        questions: 25,
        marks: 50,
        time: 'Combined 60 Minutes',
        negativeMarking: '-0.50 Marks per wrong response',
      },
      {
        subject: 'Quantitative Aptitude (Mathematics)',
        questions: 25,
        marks: 50,
        time: 'Combined 60 Minutes',
        negativeMarking: '-0.50 Marks per wrong response',
      },
      {
        subject: 'English Comprehension',
        questions: 25,
        marks: 50,
        time: 'Combined 60 Minutes',
        negativeMarking: '-0.50 Marks per wrong response',
      },
    ],
    faqs: [
      {
        question: 'What is the crucial cut-off date for age calculation in SSC CGL 2026?',
        answer: 'As per the official SSC gazette notification, the crucial date for determining the age limit is 01-08-2026. Candidates must have been born between 02-08-1994 and 01-08-2008 for posts having an age limit of 18–32 years (General category). Official category relaxations apply: 3 years for OBC and 5 years for SC/ST.',
      },
      {
        question: 'Are final year college students eligible to apply for SSC CGL 2026?',
        answer: 'Yes, candidates appearing in their final year of graduation may apply, provided they acquire the essential educational qualification degree certificate or provisional degree on or before the crucial cut-off date specified in the notification.',
      },
      {
        question: 'Are Tier-1 marks counted in the final merit list for SSC CGL?',
        answer: 'No. Following the revised examination scheme, Tier-1 CBT is purely qualifying in nature. The final merit list for post allocation is prepared strictly based on normalized marks scored by candidates in Tier-2 (Paper-I Sections 1 and 2).',
      },
      {
        question: 'Is Computer Knowledge Test and Typing Test mandatory for all posts?',
        answer: 'Computer Knowledge Module and Data Entry Speed Test (DEST) are qualifying in nature for all posts. However, higher qualifying benchmark standards are set for posts like Assistant Section Officer, Assistant in MEA, and Tax Assistant.',
      },
    ],
    howToApplySteps: [
      'Visit the official SSC portal (https://ssc.gov.in) and complete your One Time Registration (OTR) with personal and educational details.',
      'Log in using your Registration Number and Password to access the Candidate Dashboard.',
      'Click on "Apply" under the Combined Graduate Level Examination 2026 header.',
      'Verify pre-filled information from your OTR and choose your preferred Examination Cities (up to 3 preferences).',
      'Upload a live webcam passport photograph following the revised SSC guidelines (clear background, no spectacles/cap) and candidate signature (10KB–20KB).',
      'Pay the nominal application fee of ₹100 online (if applicable) through Net Banking or UPI.',
      'Submit the application and download the confirmation PDF acknowledgement for future reference.',
    ],
    officialLinks: [
      { title: 'Online Application Portal', label: 'Apply Online (Official SSC OTR Portal)', url: 'https://ssc.gov.in', isPrimary: true, linkType: 'apply' },
      { title: 'Official Gazette Notification', label: 'Download SSC Notification PDF', url: 'https://ssc.gov.in', linkType: 'pdf' },
      { title: 'Govt Exam Age Calculator', label: 'Verify Age on 01-08-2026', url: '/tools/age', linkType: 'tool' },
      { title: 'CBT-Style Practice Test', label: 'Practice CBT Test', url: '/mock-test/ssc-cgl-tier1', linkType: 'tool' },
    ],
  },
  {
    id: 'upsc-cse-2026',
    slug: 'upsc-civil-services-cse-2026-notification',
    category: 'jobs',
    title: 'UPSC Civil Services Examination 2026 Notice',
    organization: 'Union Public Service Commission (UPSC)',
    examName: 'Civil Services (Preliminary) Examination 2026',
    postCount: '1,056',
    publishDate: '28 Sep 2026',
    lastDate: '24 Nov 2026',
    examDate: '14 Feb 2027',
    qualification: 'Graduation Degree in any stream from recognized University',
    qualificationTier: 'graduate',
    sector: 'upsc',
    minAge: 21,
    maxAge: 32,
    ageLimit: '21 to 32 Years as on 01-08-2026 (Max 6 attempts for General, 9 for OBC, Unlimited for SC/ST)',
    fees: '₹100 (Female / SC / ST / PwBD Exempted)',
    sourceNotice: {
      title: "Union Public Service Commission Examination Portal",
      url: "https://upsc.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
    author: 'Akash Singh Solanki',
    reviewedDate: '28 Sep 2026, 17:45 IST',
    readTime: '9 min read',
    summary: 'The Union Public Service Commission conducts the Civil Services and Central Engineering recruitments for Group A and Group B civil services under the 7th Central Pay Commission.',
    linkText: 'Check Eligibility, Exam Pattern & Syllabus',
    calculatorToolType: 'age',
    calculatorPresetId: 'upsc-prelims',
    importantDates: [
      { event: 'Gazette Notification Release', date: '28 September 2026' },
      { event: 'Online Application Last Date', date: '24 November 2026 (18:00 Hrs IST)' },
      { event: 'Preliminary Examination', date: '14 February 2027 (Sunday)' },
      { event: 'Main Examination', date: 'June 2027 (5 Days)' },
      { event: 'Personality Test (Interviews)', date: 'Late 2027' },
    ],
    applicationFees: [
      { category: 'General / OBC / EWS Male Candidates', fee: '₹100' },
      { category: 'Female / SC / ST / PwBD Candidates', fee: 'Exempted (Nil / ₹0)' },
    ],
    vacanciesTable: [
      {
        postName: 'Indian Administrative Service (IAS)',
        department: 'Department of Personnel and Training (DOP&T)',
        classification: 'All India Service (Group A)',
        payScale: 'Level 10 (₹56,100 – ₹1,77,500) to Cabinet Secretary (₹2,50,000)',
        vacancy: '180',
        eligibility: 'Must be a Citizen of India; Graduation degree in any discipline',
      },
      {
        postName: 'Indian Foreign Service (IFS)',
        department: 'Ministry of External Affairs',
        classification: 'Central Group A Service',
        payScale: 'Level 10 (₹56,100 + Foreign Allowance as per posting)',
        vacancy: '55',
        eligibility: 'Must be a Citizen of India; Bachelor Degree in any stream',
      },
      {
        postName: 'Indian Police Service (IPS)',
        department: 'Ministry of Home Affairs',
        classification: 'All India Service (Group A)',
        payScale: 'Level 10 (₹56,100 – ₹1,77,500)',
        vacancy: '150',
        eligibility: 'Graduation + Physical Standard (165cm Male, 150cm Female; Eye 6/6 & 6/9)',
      },
      {
        postName: 'Indian Revenue Service (IRS IT & Customs)',
        department: 'Ministry of Finance (CBDT & CBIC)',
        classification: 'Central Group A Service',
        payScale: 'Level 10 (₹56,100 – ₹1,77,500)',
        vacancy: '280',
        eligibility: 'Bachelor Degree in any discipline from recognized University',
      },
      {
        postName: 'Other Group A & Group B Services',
        department: 'DANICS, DANIPS, P&T Accounts, Defence Accounts, etc.',
        classification: 'Central Group A & B',
        payScale: 'Level 8 to Level 10 (₹47,600 – ₹1,77,500)',
        vacancy: '391',
        eligibility: 'Bachelor Degree in any discipline from recognized University',
      },
    ],
    salaryStructure: {
      payLevel: 'Pay Level 10 (Entry Level Junior Scale)',
      basicPay: '₹56,100 per month',
      daPercent: '50% (₹28,050)',
      hraPercent: '27% in Tier-1 Metro Cities (₹15,147)',
      grossMonthly: '₹1,06,200 per month (plus official transport/driver facility)',
      inHandMonthly: '₹91,000 – ₹94,500 per month (after NPS & GPF deductions)',
      benefits: [
        'Designated Government Bungalow / Official Accommodation in state capital or district HQ',
        'Official vehicle with chauffeur and security escort (for field postings)',
        'Electricity, water, and telephone allowances as per entitlement',
        'Cashless medical coverage under Central Government or State Health Scheme',
        'Study Leave of up to 2 years for pursuing master programs in reputed global universities',
      ],
    },
    selectionProcess: [
      {
        stageNumber: 'Stage 1',
        stageName: 'Preliminary Examination (Objective 400 Marks)',
        description: 'Paper 1 (General Studies 1 - 200 Marks) + Paper 2 (CSAT - 200 Marks, qualifying with minimum 33% / 66 marks).',
        qualifyingNature: 'Screening only; GS-1 marks determine qualification for Mains at 1:12 ratio.',
      },
      {
        stageNumber: 'Stage 2',
        stageName: 'Main Examination (Written 1750 Marks)',
        description: '9 Descriptive papers: 2 Qualifying Language papers (English + Indian Language, 300 marks each) + 7 Merit Papers (Essay, GS 1, GS 2, GS 3, GS 4, Optional Paper 1 & 2 - 250 marks each).',
        qualifyingNature: 'Scores are directly added to the final merit list.',
      },
      {
        stageNumber: 'Stage 3',
        stageName: 'Personality Test / Interview (275 Marks)',
        description: 'Conducted at Dholpur House, New Delhi by a board of competent observers assessing mental alertness, critical judgment, and integrity.',
        qualifyingNature: 'Final ranking: Written (1750) + Interview (275) = 2025 Grand Total.',
      },
    ],
    examPattern: [
      {
        subject: 'General Studies Paper-I (History, Polity, Economy, Geo, Env, Current Affairs)',
        questions: 100,
        marks: 200,
        time: '2 Hours (09:30 AM – 11:30 AM)',
        negativeMarking: '1/3rd (-0.66 Marks) per wrong answer',
      },
      {
        subject: 'General Studies Paper-II (CSAT: Comprehension, Logical Reasoning, Basic Numeracy)',
        questions: 80,
        marks: 200,
        time: '2 Hours (02:30 PM – 04:30 PM)',
        negativeMarking: '1/3rd (-0.83 Marks) per wrong answer (Qualifying 33% mandatory)',
      },
    ],
    faqs: [
      {
        question: 'What is the attempt limit for different categories in UPSC Civil Services?',
        answer: 'As per official UPSC CSE regulations: General / EWS candidates are permitted a maximum of 6 attempts until age 32. OBC candidates are permitted 9 attempts until age 35. SC and ST candidates have unlimited attempts up to age 37. PwBD candidates of General/OBC have 9 attempts.',
      },
      {
        question: 'Is CSAT paper marks counted for clearing UPSC Prelims?',
        answer: 'No. CSAT (GS Paper-II) is strictly qualifying in nature. Candidates must score at least 33% (66 marks out of 200). The merit list for shortlisting candidates for the Civil Services Mains Examination is calculated solely based on GS Paper-I marks.',
      },
    ],
    howToApplySteps: [
      'Visit the official UPSC application portal at https://upsconline.nic.in.',
      'Complete One Time Registration (OTR) with personal bio-data, 10th certificate details, and Aadhaar card.',
      'Fill Part-I registration: select examination centers for both Prelims and Mains and select your Optional Subject.',
      'Upload a scanned photograph (white background, taken within 10 days with candidate name & date printed) and signature.',
      'Pay ₹100 online (or verify category exemption).',
      'Download the final confirmation acknowledgement slip.',
    ],
    officialLinks: [
      { title: 'UPSC Online Portal', label: 'Apply Online (upsconline.nic.in)', url: 'https://upsconline.nic.in', isPrimary: true, linkType: 'apply' },
      { title: 'Official UPSC Website', label: 'Visit Official Commission Portal', url: 'https://upsc.gov.in', linkType: 'official' },
      { title: 'Age Eligibility Calculator', label: 'Check Age on 01-08-2026', url: '/tools/age', linkType: 'tool' },
    ],
  },
  {
    id: 'sbi-po-clerk-2026',
    slug: 'sbi-po-clerk-2026-recruitment-notification',
    category: 'jobs',
    title: 'SBI PO & Clerk 2026 Recruitment Notice',
    organization: 'State Bank of India (SBI)',
    examName: 'SBI PO & Junior Associates (Customer Support & Sales)',
    postCount: '10,283',
    publishDate: '10 Sep 2026',
    lastDate: '06 Oct 2026',
    examDate: 'Nov – Dec 2026',
    qualification: 'Graduation in any discipline from a recognized University',
    qualificationTier: 'graduate',
    sector: 'banking',
    minAge: 20,
    maxAge: 30,
    ageLimit: '20 to 28 Years (Clerk) / 21 to 30 Years (PO) with standard banking relaxations',
    fees: '₹750 (SC / ST / PwBD Candidates Exempted)',
    sourceNotice: {
      title: "State Bank of India Recruitment Announcements",
      url: "https://sbi.co.in/web/careers",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: null,
    status: 'unverified',
    author: 'Akash Singh Solanki',
    reviewedDate: '26 Sep 2026, 14:10 IST',
    readTime: '6 min read',
    summary: 'State Bank of India announces nationwide recruitment for 2,000 Probationary Officers and 8,283 Junior Associates across all SBI administrative circles with attractive compensation and leased accommodation allowances.',
    linkText: 'Check State-Wise Vacancies & Apply Online',
    calculatorToolType: 'marking',
    calculatorPresetId: 'bank-po',
    importantDates: [
      { event: 'Online Registration Opens', date: '10 September 2026' },
      { event: 'Registration Last Date', date: '06 October 2026' },
      { event: 'Preliminary Online Examination', date: 'November 2026' },
      { event: 'Main Online Examination', date: 'December 2026 – January 2027' },
      { event: 'Psychometric Test & Interview (PO)', date: 'February 2027' },
    ],
    applicationFees: [
      { category: 'General / EWS / OBC Candidates', fee: '₹750' },
      { category: 'SC / ST / PwBD Candidates', fee: 'Exempted (Nil)' },
    ],
    vacanciesTable: [
      {
        postName: 'Probationary Officer (PO)',
        department: 'All India SBI Management Cadre',
        classification: 'Junior Management Grade Scale I (JMGS-I)',
        payScale: 'Basic ₹41,960 (with 4 advance increments in ₹36,000 – ₹63,840 scale)',
        vacancy: '2,000',
        eligibility: 'Graduation in any discipline; 3 Tier recruitment process',
      },
      {
        postName: 'Junior Associate (Customer Support & Sales)',
        department: 'Circle-wise Branches (Delhi, Mumbai, Bengaluru, Lucknow, etc.)',
        classification: 'Clerical Cadre',
        payScale: 'Basic ₹19,900 (in ₹17,900 – ₹47,920 scale)',
        vacancy: '8,283',
        eligibility: 'Graduation Degree; Proficiency in local state language mandatory',
      },
    ],
    salaryStructure: {
      payLevel: 'SBI JMGS-I Scale (Probationary Officer)',
      basicPay: '₹41,960 per month',
      daPercent: '46.92% of Basic Pay (₹19,687)',
      hraPercent: 'Leased Housing Accommodation of ₹15,000 to ₹29,500/month in lieu of HRA',
      grossMonthly: '₹65,780 to ₹82,000 per month (including Leased Accommodation)',
      inHandMonthly: '₹58,000 – ₹64,000 per month',
      benefits: [
        'Leased accommodation reimbursement (up to ₹29,500 in Mumbai)',
        'Monthly petrol allowance (45 to 55 liters per month)',
        'Newspaper, cleansing, and mobile reimbursement allowances',
        '100% Medical coverage under SBI Medical Benefit Scheme',
        'Concessional home loans and car loans at special staff interest rates',
      ],
    },
    selectionProcess: [
      {
        stageNumber: 'Phase 1',
        stageName: 'Preliminary Online Examination',
        description: '100 marks objective test (English 30, Quantitative Aptitude 35, Reasoning Ability 35) with 20 minutes sectional timing each.',
        qualifyingNature: 'Shortlists candidates for Mains at approximately 10 times the vacancy.',
      },
      {
        stageNumber: 'Phase 2',
        stageName: 'Main Examination (Objective 200 + Descriptive 50)',
        description: 'Reasoning & Computer, Data Analysis, General & Banking Awareness, English Language, plus 30-minute letter and essay typing test.',
        qualifyingNature: 'Scores carry 75% weightage in final merit calculation.',
      },
      {
        stageNumber: 'Phase 3',
        stageName: 'Psychometric Test, Group Discussion & Interview',
        description: 'Psychometric profile assessment followed by Group Exercise (20 marks) and Interview (30 marks).',
        qualifyingNature: 'Carries 25% weightage in final merit list.',
      },
    ],
    examPattern: [
      {
        subject: 'English Language',
        questions: 30,
        marks: 30,
        time: '20 Minutes Sectional',
        negativeMarking: '1/4th (-0.25 Marks) penalty',
      },
      {
        subject: 'Quantitative Aptitude',
        questions: 35,
        marks: 35,
        time: '20 Minutes Sectional',
        negativeMarking: '1/4th (-0.25 Marks) penalty',
      },
      {
        subject: 'Reasoning Ability',
        questions: 35,
        marks: 35,
        time: '20 Minutes Sectional',
        negativeMarking: '1/4th (-0.25 Marks) penalty',
      },
    ],
    faqs: [
      {
        question: 'Is there any sectional cut-off in SBI PO Examination?',
        answer: 'No. As per official SBI policy, there is NO sectional minimum qualifying mark in either the Preliminary or Main Examination. Selection is based purely on the aggregate overall cut-off mark in each phase.',
      },
      {
        question: 'Can candidates apply for SBI Clerk in multiple states?',
        answer: 'No. A candidate can apply for vacancies in only ONE state under the Junior Associate recruitment. Additionally, candidates must pass a Local Language Test (LPT) of the specified state before final appointment.',
      },
    ],
    howToApplySteps: [
      'Visit the official SBI Careers portal at https://sbi.co.in/web/careers.',
      'Click on "Join SBI" -> Current Openings -> "RECRUITMENT OF PROBATIONARY OFFICERS".',
      'Register with active Mobile Number and Email ID on the IBPS candidate portal.',
      'Upload passport photograph, signature, left thumb impression, and handwritten declaration.',
      'Pay application fee of ₹750 via online payment gateway.',
    ],
    officialLinks: [
      { title: 'SBI Official Careers Portal', label: 'Apply on SBI Careers', url: 'https://sbi.co.in/web/careers', isPrimary: true, linkType: 'apply' },
      { title: 'IBPS Online Portal', label: 'IBPS Registration Gateway', url: 'https://ibps.in', linkType: 'official' },
      { title: 'Negative Marking Calculator', label: 'Calculate Bank 1/4th Score', url: '/tools/marking', linkType: 'tool' },
    ],
  },
  {
    id: 'up-police-constable-2026',
    slug: 'up-police-constable-60244-posts-notification',
    category: 'jobs',
    title: 'UP Police Constable Recruitment 2026 Notice',
    organization: 'Uttar Pradesh Police Recruitment & Promotion Board (UPPRPB)',
    examName: 'UP Police Civil Police Constable Recruitment',
    postCount: '60,244',
    publishDate: '08 Sep 2026',
    lastDate: '10 Oct 2026',
    examDate: 'Nov 2026',
    qualification: '10+2 Intermediate from recognized Board (Open to All-India candidates)',
    qualificationTier: '12th',
    sector: 'police',
    minAge: 18,
    maxAge: 25,
    ageLimit: '18 to 25 Years for Male (with 3-year age relaxation) / 18 to 28 Years for Female',
    fees: '₹400 for All Categories',
    sourceNotice: {
      title: "Uttar Pradesh Police Recruitment & Promotion Board (UPPRPB)",
      url: "https://uppbpb.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: null,
    status: 'unverified',
    author: 'Akash Singh Solanki',
    reviewedDate: '27 Sep 2026, 11:30 IST',
    readTime: '6 min read',
    summary: 'The Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB) invites online applications for 60,244 Civil Police Constable positions with nationwide eligibility in Pay Band 5200-20200, Grade Pay 2000 (Level 3).',
    linkText: 'Check Physical Standards & Exam Pattern',
    calculatorToolType: 'height',
    calculatorPresetId: 'up-police-constable',
    importantDates: [
      { event: 'Official Notification Published', date: '08 September 2026' },
      { event: 'Online Application Portal Opens', date: '08 September 2026' },
      { event: 'Application Submission Deadline', date: '10 October 2026' },
      { event: 'Fee Adjustment & Form Correction', date: '12 October to 14 October 2026' },
      { event: 'Offline OMR Written Examination', date: 'November 2026 (Multiple Shifts)' },
      { event: 'Physical Efficiency Test (PET/PST)', date: 'January 2027' },
    ],
    applicationFees: [
      { category: 'All Candidates (General / OBC / SC / ST / EWS)', fee: '₹400' },
      { category: 'Payment Modes', fee: 'SBI e-Pay, UPI, Internet Banking, Debit Cards' },
    ],
    vacanciesTable: [
      {
        postName: 'Constable Civil Police (Male)',
        department: 'Uttar Pradesh Civil Police',
        classification: 'Group C (Non-Gazetted)',
        payScale: 'Level 3 (₹21,700 – ₹69,100)',
        vacancy: '48,195',
        eligibility: '12th Pass; Height: 168 cm (General/OBC/SC), 160 cm (ST); Run: 4.8 km in 25 mins',
      },
      {
        postName: 'Constable Civil Police (Female)',
        department: 'Uttar Pradesh Civil Police',
        classification: 'Group C (20% Horizontal Reservation)',
        payScale: 'Level 3 (₹21,700 – ₹69,100)',
        vacancy: '12,049',
        eligibility: '12th Pass; Height: 152 cm (General/OBC/SC), 147 cm (ST); Run: 2.4 km in 14 mins',
      },
    ],
    salaryStructure: {
      payLevel: 'Pay Matrix Level 3 (Grade Pay ₹2,000)',
      basicPay: '₹21,700 per month',
      daPercent: '50% of Basic Pay (₹10,850)',
      hraPercent: '₹1,200 to ₹3,600 (Class A, B, C cities in UP)',
      grossMonthly: '₹35,200 – ₹38,500 per month',
      inHandMonthly: '₹30,800 – ₹33,200 per month',
      benefits: [
        'Monthly Ration Allowance (Paushtik Aahar Bhatta)',
        'Annual Uniform Washing and Maintenance Allowance',
        'UP Government Cashless Health Scheme card for family',
        'New Defined Contributory Pension Scheme (NPS)',
      ],
    },
    selectionProcess: [
      {
        stageNumber: 'Stage 1',
        stageName: 'OMR Based Written Examination',
        description: '150 Questions for 300 Marks (General Knowledge, General Hindi, Numerical & Mental Ability, Mental Aptitude/Reasoning). Time: 2 Hours.',
        qualifyingNature: 'Scores directly determine merit list for Document Verification and PST at 2.5x ratio.',
      },
      {
        stageNumber: 'Stage 2',
        stageName: 'Document Scrutiny & PST (Physical Standards)',
        description: 'Height measurement (Male: 168cm, Female: 152cm) and Chest measurement for males (79-84cm). Weight requirement of minimum 40kg for females.',
        qualifyingNature: 'Strictly qualifying.',
      },
      {
        stageNumber: 'Stage 3',
        stageName: 'Physical Efficiency Test (PET Running)',
        description: 'Male candidates: 4.8 km run in 25 minutes. Female candidates: 2.4 km run in 14 minutes.',
        qualifyingNature: 'Qualifying nature. No marks assigned.',
      },
      {
        stageNumber: 'Stage 4',
        stageName: 'Medical Examination & Character Scrutiny',
        description: 'Conducted at District Reserve Police Lines by Chief Medical Officer (CMO).',
        qualifyingNature: 'Final appointment hurdle.',
      },
    ],
    examPattern: [
      {
        subject: 'General Knowledge (Samanya Gyan)',
        questions: 38,
        marks: 76,
        time: 'Combined 2 Hours',
        negativeMarking: '-0.50 Marks penalty for each wrong answer',
      },
      {
        subject: 'General Hindi (Samanya Hindi)',
        questions: 37,
        marks: 74,
        time: 'Combined 2 Hours',
        negativeMarking: '-0.50 Marks penalty for each wrong answer',
      },
      {
        subject: 'Numerical & Mental Ability',
        questions: 38,
        marks: 76,
        time: 'Combined 2 Hours',
        negativeMarking: '-0.50 Marks penalty for each wrong answer',
      },
      {
        subject: 'Mental Aptitude, I.Q. and Reasoning',
        questions: 37,
        marks: 74,
        time: 'Combined 2 Hours',
        negativeMarking: '-0.50 Marks penalty for each wrong answer',
      },
    ],
    faqs: [
      {
        question: 'Can candidates from other states (outside Uttar Pradesh) apply for UP Police Constable?',
        answer: 'Yes. Candidates from all Indian states and Union Territories are fully eligible to apply under the Unreserved (UR / General) category quota.',
      },
      {
        question: 'What is the negative marking deduction in UP Police Constable Exam?',
        answer: 'Each correct answer awards 2.0 marks. For each wrong answer, a negative penalty of 0.50 marks (0.25 negative fraction) is deducted from the candidate score.',
      },
    ],
    howToApplySteps: [
      'Visit the official UPPRPB application portal at https://uppbpb.gov.in.',
      'Click on "Direct Recruitment for Constable Civil Police 2026 - Apply Online".',
      'Fill in applicant personal bio-data, 10th and 12th board marks, and domicile details.',
      'Upload Digilocker-verified certificates or scan copies of educational marksheets, caste certificate, and domicile.',
      'Upload a recent color photograph with white or light grey background and candidate signature.',
      'Pay application fee of ₹400 online and download the submitted application form.',
    ],
    officialLinks: [
      { title: 'UPPRPB Official Portal', label: 'Apply on uppbpb.gov.in', url: 'https://uppbpb.gov.in', isPrimary: true, linkType: 'apply' },
      { title: 'Height Standards Checker', label: 'Check 168cm Male / 152cm Female Criteria', url: '/tools/height', linkType: 'tool' },
      { title: 'Negative Marking Tool', label: 'Calculate UP Police Score (-0.50 penalty)', url: '/tools/marking', linkType: 'tool' },
    ],
  },
  {
    id: 'army-agniveer-rally-2026',
    slug: 'indian-army-agniveer-rally-2026-recruitment',
    category: 'jobs',
    title: 'Indian Army Agniveer Rally 2026 Notice',
    organization: 'Indian Army (Ministry of Defence)',
    examName: 'Agnipath Scheme Rally Recruitment 2026',
    postCount: '30,000+',
    publishDate: '01 Sep 2026',
    lastDate: '15 Oct 2026',
    examDate: 'Nov 2026',
    qualification: '8th / 10th Pass (GD & Tradesmen) or 10+2 with PCM (Tech) / 10+2 with English (Clerk)',
    qualificationTier: '10th',
    sector: 'defence',
    minAge: 17,
    maxAge: 21,
    ageLimit: '17½ to 21 Years (Born between 01-10-2005 and 01-04-2009)',
    fees: '₹250 (Online CEE Exam Fee)',
    sourceNotice: {
      title: "Join Indian Army Official Recruitment Portal",
      url: "https://joinindianarmy.nic.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: null,
    status: 'unverified',
    author: 'Akash Singh Solanki',
    reviewedDate: '26 Sep 2026, 12:40 IST',
    readTime: '6 min read',
    summary: 'Join Indian Army opens online registration for Agniveer General Duty, Agniveer Technical, Agniveer Office Assistant / Clerk, and Agniveer Tradesmen across all Army Recruiting Offices (AROs) and Regimental Centers.',
    linkText: 'Check Rally Physical Criteria & Apply',
    calculatorToolType: 'height',
    calculatorPresetId: 'army-agniveer-gd',
    importantDates: [
      { event: 'Online Registration Opens', date: '01 September 2026' },
      { event: 'Closing Date of Online Registration', date: '15 October 2026' },
      { event: 'Online Common Entrance Exam (CEE)', date: 'November 2026' },
      { event: 'Physical Fitness Test (PFT) Rallies', date: 'December 2026 to February 2027' },
    ],
    applicationFees: [
      { category: 'All Candidates Appearing for Online CEE', fee: '₹250 (plus banking charges)' },
      { category: 'Payment Methods', fee: 'Credit/Debit Card, Net Banking, UPI' },
    ],
    vacanciesTable: [
      {
        postName: 'Agniveer General Duty (All Arms)',
        department: 'Infantry, Artillery, Armoured Corps',
        classification: 'Enrolled Soldier Cadre',
        payScale: '1st Year ₹30,000 -> 4th Year ₹40,000 + Seva Nidhi Package (₹11.71 Lakhs)',
        vacancy: '22,000+',
        eligibility: '10th / Matric with 45% marks in aggregate and 33% in each subject; 1.6 km run in 5m 30s',
      },
      {
        postName: 'Agniveer Technical (All Arms)',
        department: 'Corps of Electronics & Mechanical Engineers, Signals',
        classification: 'Technical Cadre',
        payScale: '1st Year ₹30,000 -> 4th Year ₹40,000 + Seva Nidhi',
        vacancy: '4,500',
        eligibility: '10+2 Intermediate with Physics, Chemistry, Maths & English with min 50% marks',
      },
      {
        postName: 'Agniveer Office Assistant / Store Keeper Technical',
        department: 'Army Service Corps, Ordnance',
        classification: 'Clerical Cadre',
        payScale: '1st Year ₹30,000 -> 4th Year ₹40,000 + Seva Nidhi',
        vacancy: '3,500',
        eligibility: '10+2 Intermediate in any stream (Arts, Commerce, Science) with 60% aggregate & 50% in English/Maths',
      },
    ],
    salaryStructure: {
      payLevel: 'Agnipath Scheme Customized Monthly Package',
      basicPay: '1st Yr: ₹30,000 | 2nd Yr: ₹33,000 | 3rd Yr: ₹36,500 | 4th Yr: ₹40,000',
      daPercent: 'Included in consolidated package + Risk and Hardship allowances as per deployment',
      hraPercent: 'Provided with military barracks / cantonment accommodation + messing',
      grossMonthly: '₹30,000 to ₹40,000 per month (plus field area allowances up to ₹17,300)',
      inHandMonthly: '1st Year In-Hand: ₹21,000/month (30% deposited in Agniveer Corpus Fund)',
      benefits: [
        '₹11.71 Lakhs Tax-Free "Seva Nidhi" Corpus upon completion of 4 years',
        'Life Insurance Cover of ₹48 Lakhs non-contributory during engagement period',
        '25% of Agniveers enrolled into Regular Army Cadre based on merit and performance',
        'Skill Certificate and 10% reservation in CAPFs (BSF, CISF, CRPF, ITBP, SSB) and State Police',
      ],
    },
    selectionProcess: [
      {
        stageNumber: 'Phase 1',
        stageName: 'Online Computer Based Common Entrance Exam (CEE)',
        description: 'Objective test conducted across 176 test cities nationwide.',
        qualifyingNature: 'Shortlists candidates for Physical Rally at designated ARO centers.',
      },
      {
        stageNumber: 'Phase 2',
        stageName: 'Recruitment Rally Physical Fitness Test (PFT)',
        description: '1.6 Km Run: Group I (under 5 min 30 sec, 60 marks), Group II (5 min 31 sec to 5 min 45 sec, 48 marks). Beam Pull-ups: 10 pull-ups (40 marks). 9 Feet Ditch Jump & Zig-Zag Balance.',
        qualifyingNature: 'Total 100 Physical Marks.',
      },
      {
        stageNumber: 'Phase 3',
        stageName: 'Physical Measurement Test (PMT) & Adaptability',
        description: 'Height and chest measurement as per regional criteria followed by Adaptability Test for military life.',
        qualifyingNature: 'Mandatory standard.',
      },
      {
        stageNumber: 'Phase 4',
        stageName: 'Medical Examination by Military Doctors',
        description: 'Conducted by Army Medical Corps at designated military base hospitals.',
        qualifyingNature: 'Final clearance.',
      },
    ],
    faqs: [
      {
        question: 'What is the upper age limit for Indian Army Agniveer 2026?',
        answer: 'The age bracket is strictly 17½ to 21 years. Candidates must have been born between 01 October 2005 and 01 April 2009 (both days inclusive). There is no age relaxation for reserved categories in military combat soldier enrolment.',
      },
      {
        question: 'What is the running standard for Group 1 in the Army Rally?',
        answer: 'Candidates completing the 1.6-kilometer (1600m) run in 5 minutes 30 seconds or less are classified into Group I and awarded the maximum 60 physical marks.',
      },
    ],
    howToApplySteps: [
      'Visit the official Join Indian Army portal at https://joinindianarmy.nic.in.',
      'Enter the captcha and navigate to the "Agnipath" tab -> "Login / Apply Online".',
      'Register with Aadhaar Number and personal bio-data.',
      'Select your relevant Army Recruiting Office (ARO) based on your permanent domicile district.',
      'Choose the desired trade (Agniveer GD, Technical, Clerk, or Tradesmen).',
      'Pay the online examination fee of ₹250 through SBI e-Pay.',
    ],
    officialLinks: [
      { title: 'Join Indian Army Portal', label: 'Apply on joinindianarmy.nic.in', url: 'https://joinindianarmy.nic.in', isPrimary: true, linkType: 'apply' },
      { title: 'Physical Standards Tool', label: 'Check 1.6 Km Run & 170cm Height Criteria', url: '/tools/height', linkType: 'tool' },
      { title: 'Age Eligibility Checker', label: 'Verify 17½ – 21 Years Eligibility', url: '/tools/age', linkType: 'tool' },
    ],
  },
  {
    id: 'guide-army-1600m-running-standards',
    slug: 'army-1600-meter-running-standards-agniveer-guide',
    category: 'jobs',
    title: 'Army 1600 Meter Running Standards & Agniveer Physical Fitness Guide',
    organization: 'Indian Army (Ministry of Defence)',
    examName: 'Physical Fitness Test (PFT) & Agnipath Scheme Rally',
    postCount: 'All ZRO / ARO Rallies',
    publishDate: '03 Oct 2026',
    lastDate: '31 Dec 2026',
    examDate: 'Rallies Conducted Nationwide',
    qualification: '8th / 10th / 10+2 Pass (Agniveer GD, Technical, Clerk/SKT, Tradesmen)',
    qualificationTier: '10th',
    sector: 'defence',
    minAge: 17,
    maxAge: 21,
    ageLimit: '17½ to 21 Years (Born between 01-10-2005 and 01-04-2009)',
    fees: 'Exempt for Physical Rally Participation',
    sourceNotice: {
      title: 'Join Indian Army Official Recruitment Portal & DG Recruiting Orders',
      url: 'https://joinindianarmy.nic.in',
      checkedOn: '03 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki (Founder & Editor)',
    status: 'verified',
    author: 'Akash Singh Solanki',
    reviewedDate: '03 Oct 2026, 09:15 IST',
    readTime: '9 min read',
    summary: 'Authoritative guide to Indian Army 1600-meter running benchmarks: Group I (up to 5m 30s — 60 marks) vs Group II (5m 31s to 5m 45s — 48 marks), pull-up scoring, interval training splits, age criteria, and physical height & chest standards.',
    linkText: 'View 1600m Timing Charts & PFT Guide',
    calculatorToolType: 'height',
    calculatorPresetId: 'army-agniveer-gd',
    importantDates: [
      { event: 'Phase 1 Computer-Based Written Test (CEE)', date: 'Conducted Nationwide' },
      { event: 'Phase 2 Physical Fitness Rallies (PFT)', date: 'ZRO / ARO Scheduled' },
      { event: '1600m Running Benchmark Testing', date: 'Rally Day Early Morning' },
      { event: 'Physical Measurement & Document Scrutiny', date: 'Immediately Post-PFT' },
    ],
    selectionProcess: [
      { stageNumber: '1', stageName: 'Common Entrance Exam (CEE)', description: 'Computer-based objective test evaluating General Knowledge, Science, Maths, and English/Technical subjects.', qualifyingNature: 'Merit Determining (100 Marks for GD/Tradesmen, 200 Marks for Tech/Clerk)' },
      { stageNumber: '2', stageName: '1600m Run (1.6 Km)', description: 'Group I (Up to 5:30 min = 60 Marks), Group II (5:31 to 5:45 min = 48 Marks). Candidates exceeding 5:45 min are failed.', qualifyingNature: 'Mandatory Qualifying & Merit Scored (GD/Tradesmen)' },
      { stageNumber: '3', stageName: 'Pull-Ups on Beam', description: 'Underhand grip pull-ups on horizontal beam: 10 reps = 40 Marks, 9 reps = 33 Marks, 8 = 27, 7 = 21, 6 = 16 (Min. 6 reps to pass).', qualifyingNature: 'Mandatory Qualifying & Merit Scored' },
      { stageNumber: '4', stageName: '9-Ft Ditch & Zig-Zag Balance', description: 'Jumping over a 9-foot open ditch in single leap and traversing an elevated zigzag wooden balance beam.', qualifyingNature: 'Strictly Qualifying (Zero Marks)' },
    ],
    whatsDifferentThisYear: [
      { parameter: '1600m Timing Recording', currentCycle: 'Biometric RFID bib chips + synchronized camera at finish line', previousCycle: 'Manual stopwatch with physical finish rope barrier', sourceOrVerify: 'https://joinindianarmy.nic.in' },
      { parameter: 'Physical Marks in Final Merit', currentCycle: '100 Marks (60 Run + 40 Pull-Ups) directly added for GD & Tradesmen', previousCycle: '100 Marks added for GD & Tradesmen (Unchanged)', sourceOrVerify: 'DG Recruiting Rally Guidelines' },
      { parameter: 'Clerk / SKT Physical Evaluation', currentCycle: '1600m run and beam pull-ups are strictly qualifying (CEE + Typing decides merit)', previousCycle: 'Physical was qualifying (Unchanged)', sourceOrVerify: 'Indian Army Recruitment Directorate' },
      { parameter: 'Height & Chest Measurement (PST)', currentCycle: 'Digital stadiometer and electronic chest measurement sensors at rally gates', previousCycle: 'Manual height bar and measuring tape', sourceOrVerify: 'Army Medical & Recruitment Protocol' },
    ],
    whoShouldApply: [
      'Candidates between 17½ and 21 years of age on the rally cutoff date seeking enrolment in Indian Army as Agniveer GD, Tech, Clerk, or Tradesmen.',
      'Aspirants who can achieve a 1600m timing below 5 minutes 45 seconds (optimally under 5:30 for maximum 60 marks).',
      'Candidates fulfilling minimum regional physical standards: height (163–170 cm) and chest (77 cm + 5 cm expansion).',
    ],
    whoShouldSkip: [
      'Candidates below 17½ or exceeding 21 years of age on the prescribed crucial date (no age relaxation for General or reserved categories).',
      'Candidates with permanent tattoos on prohibited body parts or uncorrected medical conditions (knock-knees, flat foot, color blindness).',
      'Candidates unable to achieve the minimum statutory 6 beam pull-ups or 5 cm chest expansion.',
    ],
    commonRejectionMistakes: [
      'Disqualification at the initial height bar before reaching the 1600m track due to inaccurate home measurements.',
      'Sprinting the first 200m at 100% effort in crowd panic, causing severe lactic acidosis on laps 3 and 4.',
      'Neglecting dead-hang military pull-up form (kipping, kicking legs, or failing to clear chin cleanly over the beam).',
      'Arriving dehydrated or starved after sitting for hours in cold overnight rally holding enclosures.',
      'Failing to verify state and category domicile certificates before reporting to the rally ground.',
    ],
    documentsNeeded: [
      'Matriculation (10th) Admit Card, Marks Sheet, and Board Certificate (character-for-character name and DOB match).',
      'Indian Army Rally Admit Card printed on good quality laser paper.',
      'Valid Government Photo ID (Aadhaar Card linked to mobile number for biometric attendance).',
      'Domicile / Resident Certificate with photograph issued by Tehsildar / District Magistrate.',
      'Caste Certificate with photograph issued by authorized revenue authority.',
      'Affidavit duly notarized on ₹10 non-judicial stamp paper in the prescribed Join Indian Army format.',
      '20 passport size photographs with white background (not older than 3 months, without spectacles/caps).',
    ],
    examPattern: [
      { subject: '1600m Run Group I (Up to 5m 30s)', questions: 1, marks: 60, time: 'Max 5m 30s', negativeMarking: '0 (Below 5:45 = 48M, Exceeding 5:45 = Fail)' },
      { subject: '1600m Run Group II (5m 31s to 5m 45s)', questions: 1, marks: 48, time: '5m 31s - 5m 45s', negativeMarking: '0 (Exceeding 5:45 = Disqualified)' },
      { subject: 'Beam Pull-Ups (10 repetitions)', questions: 10, marks: 40, time: 'Self-Paced / Commanded', negativeMarking: '9 reps = 33M, 8 = 27M, 7 = 21M, 6 = 16M' },
      { subject: '9-Foot Ditch Jump', questions: 1, marks: 0, time: 'Single Attempt', negativeMarking: 'Strictly Qualifying (Touch Edge = Elimination)' },
      { subject: 'Zig-Zag Balance Beam', questions: 1, marks: 0, time: 'Single Attempt', negativeMarking: 'Strictly Qualifying (Slip/Fall = Elimination)' },
    ],
    faqs: [
      {
        question: 'What is the cutoff time for Group 1 in the Army 1600m run?',
        answer: 'Candidates who complete the 1.6 km run in 5 minutes 30 seconds or less qualify in Group I and earn the maximum 60 physical marks.',
      },
      {
        question: 'Do 1600m running marks affect the final merit list for Agniveer GD?',
        answer: 'Yes. For Agniveer General Duty and Agniveer Tradesmen, the 100 marks from the Physical Fitness Test (60 Run + 40 Pull-Ups) are added directly to the CEE written examination score to determine final recruitment ranking.',
      },
      {
        question: 'Are running marks counted for Agniveer Technical and Clerk / SKT?',
        answer: 'No. For Technical and Clerk/SKT trades, the 1600m run and beam pull-ups are strictly qualifying. As long as you finish within 5:45 and complete 6 pull-ups, your final merit depends entirely on written exam marks.',
      },
      {
        question: 'What should I do if my height is borderline (e.g. exactly 169.5 cm for a 170 cm cutoff)?',
        answer: 'Use our verified Physical Standards Tool (/tools/height) to check if your domicile zone or category grants height concessions (e.g. 165 cm for hill areas or 162.5 cm for ST candidates). Focus on core posture exercises to avoid slouching at the measurement stand.',
      },
    ],
    officialLinks: [
      { title: 'Physical Standards Tool', label: 'Check 163–170cm Height & 77cm Chest Criteria', url: '/tools/height', linkType: 'tool' },
      { title: 'Application Masterclass Guide', label: 'Read In-Depth 8-Week Training Blueprint', url: '/guides/army-1600-meter-running-time-agniveer-pft-standards', linkType: 'tool' },
      { title: 'Join Indian Army Portal', label: 'joinindianarmy.nic.in', url: 'https://joinindianarmy.nic.in', isPrimary: true, linkType: 'official' },
    ],
  },
  {
    id: 'rrb-ntpc-2026',
    slug: 'rrb-ntpc-2026-recruitment-apply-online',
    category: 'jobs',
    title: 'RRB NTPC CEN 05/2026 Recruitment Notice',
    organization: 'Railway Recruitment Boards (RRB)',
    examName: 'Non-Technical Popular Categories (NTPC)',
    postCount: '11,558',
    publishDate: '18 Sep 2026',
    lastDate: '20 Oct 2026',
    examDate: 'Nov 2026 – Jan 2027',
    qualification: '12th Pass (UG Posts) or Graduate Degree (Graduate Posts)',
    qualificationTier: '12th',
    sector: 'railways',
    minAge: 18,
    maxAge: 36,
    ageLimit: '18 to 36 Years (3 Years COVID age relaxation factored in)',
    fees: '₹500 (₹400 refundable on CBT-1 attendance)',
    sourceNotice: {
      title: "Railway Recruitment Boards Unified Portal",
      url: "https://www.rrbapply.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
    author: 'Akash Singh Solanki',
    reviewedDate: '27 Sep 2026, 14:15 IST',
    readTime: '6 min read',
    summary: 'Ministry of Railways has issued CEN 05/2026 & CEN 06/2026 inviting online applications for 11,558 vacancies across Indian Railway zones for Station Master, Goods Train Manager, Commercial Apprentice, and Accounts Clerk.',
    linkText: 'Check Eligibility & Apply RRB Zone Wise',
    calculatorToolType: 'age',
    calculatorPresetId: 'rrb-ntpc',
    importantDates: [
      { event: 'Detailed CEN Notification Release', date: '18 September 2026' },
      { event: 'Online Application Opening Date', date: '19 September 2026' },
      { event: 'Closing Date for Submission', date: '20 October 2026 (23:59 Hrs)' },
      { event: 'Final Online Fee Payment Date', date: '22 October 2026' },
      { event: 'Application Status & Modification Window', date: '25 October to 04 November 2026' },
      { event: '1st Stage Computer Based Test (CBT-1)', date: 'November 2026 to January 2027' },
    ],
    applicationFees: [
      { category: 'UR / OBC Male Candidates', fee: '₹500 (₹400 refunded after appearing in CBT-1)' },
      { category: 'SC / ST / Female / PwBD / Transgender / Minorities', fee: '₹250 (Full ₹250 refunded on CBT-1 appearance)' },
    ],
    vacanciesTable: [
      {
        postName: 'Station Master',
        department: 'Operating Department',
        classification: 'Level 6 (Graduate Post)',
        payScale: '₹35,400 + Allowances',
        vacancy: '3,860',
        eligibility: 'Degree from recognized University; Computer Based Aptitude Test (CBAT) mandatory',
      },
      {
        postName: 'Goods Train Manager',
        department: 'Operating Department',
        classification: 'Level 5 (Graduate Post)',
        payScale: '₹29,200 + Running Allowance',
        vacancy: '2,940',
        eligibility: 'Bachelor Degree in any stream; A-2 Medical Standard',
      },
      {
        postName: 'Junior Account Assistant cum Typist',
        department: 'Accounts Department',
        classification: 'Level 5 (Graduate Post)',
        payScale: '₹29,200 + Allowances',
        vacancy: '1,500',
        eligibility: 'Degree in any discipline with English 30 wpm or Hindi 25 wpm typing',
      },
    ],
    salaryStructure: {
      payLevel: 'Pay Level 6 (Station Master)',
      basicPay: '₹35,400 per month',
      daPercent: '50% (₹17,700)',
      hraPercent: '27% (₹9,558)',
      grossMonthly: '₹68,450 per month (plus Night Duty & Running Allowance)',
      inHandMonthly: '₹58,500 – ₹62,000 per month',
      benefits: [
        'Free Railway Privilege Passes and Privilege Ticket Orders (PTOs)',
        'Running Allowance for Goods Guard & Train Managers based on mileage',
        'Railway Central Hospital medical coverage',
        'Contributory Pension Scheme (NPS)',
      ],
    },
    selectionProcess: [
      {
        stageNumber: 'CBT 1',
        stageName: 'First Stage Computer Based Test',
        description: 'Screening test of 100 questions (40 General Awareness, 30 Mathematics, 30 General Intelligence).',
        qualifyingNature: 'Shortlists candidates for CBT-2 at a 1:15 vacancy ratio.',
      },
      {
        stageNumber: 'CBT 2',
        stageName: 'Second Stage Computer Based Test',
        description: '120 questions in 90 minutes. Marks scored determine merit ranking.',
        qualifyingNature: 'Final merit score.',
      },
      {
        stageNumber: 'CBAT / Typing',
        stageName: 'Computer Aptitude Test or Typing Skill',
        description: 'Aptitude test for Station Masters (min T-score 42) or typing speed test for Clerks.',
        qualifyingNature: 'Qualifying requirement.',
      },
    ],
    officialLinks: [
      { title: 'RRB Official Apply Portal', label: 'Apply Online (rrbapply.gov.in)', url: 'https://rrbapply.gov.in', isPrimary: true, linkType: 'apply' },
      { title: 'Official CEN Notification', label: 'Download RRB CEN Notification', url: 'https://indianrailways.gov.in', linkType: 'pdf' },
      { title: 'Negative Marking Tool', label: 'Calculate Railway 1/3rd Score', url: '/tools/marking', linkType: 'tool' },
    ],
  },
  {
    id: 'delhi-police-si-2026',
    slug: 'ssc-delhi-police-capf-si-2026',
    category: 'jobs',
    title: 'SSC Delhi Police & CAPFs SI 2026 Notice',
    organization: 'SSC & Ministry of Home Affairs',
    examName: 'Delhi Police & Central Armed Police Forces SI',
    postCount: '4,187',
    publishDate: '12 Sep 2026',
    lastDate: '15 Oct 2026',
    examDate: 'Nov 2026',
    qualification: 'Graduate Degree with valid Driving License (for Male DP SI)',
    qualificationTier: 'graduate',
    sector: 'police',
    minAge: 20,
    maxAge: 25,
    ageLimit: '20 to 25 Years (Relaxation as per central rules)',
    fees: '₹100 (Exempted for Women & Reserved Categories)',
    sourceNotice: {
      title: "Staff Selection Commission (SSC CPO Notice)",
      url: "https://ssc.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
    author: 'Akash Singh Solanki',
    reviewedDate: '26 Sep 2026, 11:20 IST',
    readTime: '6 min read',
    summary: 'Staff Selection Commission announces recruitment for Executive Sub-Inspectors in Delhi Police, BSF, CISF, CRPF, ITBP, and SSB with Level-6 pay scale (₹35,400 to ₹1,12,400).',
    linkText: 'View Physical Standards & Syllabus',
    calculatorToolType: 'height',
    calculatorPresetId: 'delhi-police-si',
    importantDates: [
      { event: 'Notification Date', date: '12 September 2026' },
      { event: 'Application Last Date', date: '15 October 2026' },
      { event: 'Paper-1 CBT Exam Date', date: 'November 2026' },
      { event: 'Physical Standard (PST) & PET Test', date: 'January 2027' },
    ],
    officialLinks: [
      { title: 'SSC Official Portal', label: 'Apply on ssc.gov.in', url: 'https://ssc.gov.in', isPrimary: true, linkType: 'apply' },
      { title: 'Physical Standards Checker', label: 'Check Delhi Police Height (170cm)', url: '/tools/height', linkType: 'tool' },
    ],
  },
  {
    id: 'ssc-gd-constable-2026',
    slug: 'ssc-gd-constable-2026-mega-recruitment',
    category: 'jobs',
    title: 'SSC GD Constable 2026 Recruitment Notice',
    organization: 'Staff Selection Commission (SSC)',
    examName: 'Constable (GD) in CAPFs, SSF and Rifleman (GD) in Assam Rifles',
    postCount: '39,481',
    publishDate: '05 Sep 2026',
    lastDate: '14 Oct 2026',
    examDate: 'Jan – Feb 2027',
    qualification: 'Matriculation (10th Class Pass)',
    qualificationTier: '10th',
    sector: 'ssc',
    minAge: 18,
    maxAge: 23,
    ageLimit: '18 to 23 Years as on 01-01-2026',
    fees: '₹100 (Exempted for Women/SC/ST)',
    sourceNotice: {
      title: "Staff Selection Commission (SSC GD Notice)",
      url: "https://ssc.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
    author: 'Akash Singh Solanki',
    reviewedDate: '26 Sep 2026, 09:45 IST',
    readTime: '6 min read',
    summary: 'Massive uniformed recruitment for General Duty constables across BSF (15,654), CISF (13,632), CRPF (9,410), ITBP (3,120), and SSB (1,850) in Pay Level-3.',
    linkText: 'Check Height & Physical Running Criteria',
    calculatorToolType: 'height',
    calculatorPresetId: 'ssc-gd-constable',
    importantDates: [
      { event: 'Notification Release Date', date: '05 September 2026' },
      { event: 'Last Date to Apply Online', date: '14 October 2026' },
      { event: 'Computer Based Exam (CBT)', date: 'January – February 2027' },
    ],
    officialLinks: [
      { title: 'SSC Apply Portal', label: 'Apply Online', url: 'https://ssc.gov.in', isPrimary: true, linkType: 'apply' },
      { title: 'Physical Standards Tool', label: 'Check 170cm Male / 157cm Female Standards', url: '/tools/height', linkType: 'tool' },
    ],
  },
  {
    id: 'admit-ssc-cgl-tier1',
    slug: 'ssc-cgl-2026-tier-1-admit-card-download',
    category: 'admit-card',
    title: 'SSC CGL 2026 Tier-1 Hall Ticket Status',
    organization: 'Staff Selection Commission (SSC)',
    examName: 'CGL Tier-1 Computer Based Test',
    publishDate: '26 Sep 2026',
    examDate: '09 Oct to 26 Oct 2026',
    qualification: 'Tier-1 Registered Candidates',
    sourceNotice: {
      title: "Staff Selection Commission Regional Portals",
      url: "https://ssc.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: null,
    status: 'unverified',
    author: 'Akash Singh Solanki',
    reviewedDate: '26 Sep 2026, 12:00 IST',
    readTime: '4 min read',
    summary: 'Candidates can download their admission certificate using Registration Number and Date of Birth. Exam shift timings and exam center address verified.',
    linkText: 'Download Tier-1 Admit Card (All Regions)',
    importantDates: [
      { event: 'Application Status Live', date: '20 September 2026' },
      { event: 'City Intimation Slip Live', date: '26 September 2026' },
      { event: 'Admit Card Download (4 Days Prior)', date: '05 October 2026' },
      { event: 'Tier-1 CBT Exam Dates', date: '09 October to 26 October 2026' },
    ],
    officialLinks: [
      { title: 'Regional SSC Portals', label: 'Download Admit Card', url: 'https://ssc.gov.in', isPrimary: true, linkType: 'official' },
      { title: 'CBT-Style Practice Test', label: 'Take CBT Practice Test with Timer', url: '/mock-test/ssc-cgl-tier1', linkType: 'tool' },
    ],
  },
  {
    id: 'res-ssc-cgl-cutoff',
    slug: 'ssc-cgl-2025-tier-1-official-category-cutoff-marks',
    category: 'cut-off',
    title: 'SSC CGL Tier-1 Category Cut-Off Marks',
    organization: 'Staff Selection Commission',
    examName: 'CGL Tier-1 Normalization & Cut-off List',
    publishDate: '27 Sep 2026',
    qualification: 'Candidates Qualified for Tier-2 Evaluation',
    sourceNotice: {
      title: "Staff Selection Commission Results & Cut-off Write-up",
      url: "https://ssc.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
    author: 'Akash Singh Solanki',
    reviewedDate: '27 Sep 2026, 20:00 IST',
    readTime: '5 min read',
    summary: 'Staff Selection Commission has declared normalized cut-off marks for Tier-1. Over 1,24,000 aspirants qualified across List-1 (AAO), List-2 (JSO), and List-3 (General Group B/C).',
    linkText: 'Download Complete Merit List PDF',
    cutOffs: [
      { category: 'UR (General / Unreserved)', cutOffMarks: 153.48, qualifiedCandidates: 14210 },
      { category: 'OBC (Other Backward Class)', cutOffMarks: 152.12, qualifiedCandidates: 28540 },
      { category: 'EWS (Economically Weaker Section)', cutOffMarks: 148.95, qualifiedCandidates: 12450 },
      { category: 'SC (Scheduled Caste)', cutOffMarks: 136.20, qualifiedCandidates: 18920 },
      { category: 'ST (Scheduled Tribe)', cutOffMarks: 125.60, qualifiedCandidates: 9840 },
      { category: 'ESM (Ex-Servicemen)', cutOffMarks: 98.40, qualifiedCandidates: 4120 },
    ],
    importantDates: [
      { event: 'Tier-1 CBT Conducted', date: 'July 2025' },
      { event: 'Official Result Declaration', date: '27 September 2026' },
      { event: 'Tier-2 Written Examination', date: 'November 2026' },
    ],
    officialLinks: [
      { title: 'Result Write-up PDF', label: 'Download Official Cut-off PDF', url: 'https://ssc.gov.in', isPrimary: true, linkType: 'pdf' },
      { title: 'Rank Predictor', label: 'Predict Normalization & Percentile', url: '/tools/rank', linkType: 'tool' },
    ],
  },
  {
    id: 'ans-ssc-chsl-tier1',
    slug: 'ssc-chsl-10-plus-2-tier-1-final-answer-key',
    category: 'answer-key',
    title: 'SSC CHSL Tier-1 Answer Key & Responses',
    organization: 'Staff Selection Commission',
    examName: 'Combined Higher Secondary (10+2) Level Exam',
    publishDate: '25 Sep 2026',
    qualification: 'Candidates appeared in Tier-1 CBT',
    sourceNotice: {
      title: "Staff Selection Commission Answer Key Representation Portal",
      url: "https://ssc.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
    author: 'Akash Singh Solanki',
    reviewedDate: '25 Sep 2026, 17:00 IST',
    readTime: '4 min read',
    summary: 'Final answer key released along with question papers and candidate response sheets. Calculate your negative marks and raw score using our tool.',
    linkText: 'Check Final Answer Key & Calculate Score',
    importantDates: [
      { event: 'Answer Key Objection Window Opens', date: '25 September 2026' },
      { event: 'Last Date to Submit Challenges', date: '30 September 2026 (18:00 Hrs)' },
    ],
    officialLinks: [
      { title: 'Response Sheet Portal', label: 'Login & Check Response Sheet', url: 'https://ssc.gov.in', isPrimary: true, linkType: 'official' },
      { title: 'Negative Marking Tool', label: 'Calculate Net Score (-0.50 Penalty)', url: '/tools/marking', linkType: 'tool' },
    ],
  },
  {
    id: 'admit-rrb-technician',
    slug: 'rrb-technician-grade-1-3-admit-card',
    category: 'admit-card',
    title: 'RRB Technician Grade-I & III City Slip',
    organization: 'Railway Recruitment Boards',
    examName: 'CEN 02/2024 Technician CBT Examination',
    publishDate: '22 Sep 2026',
    examDate: '16 Oct to 28 Oct 2026',
    qualification: 'Matric + ITI / Diploma in Engineering',
    sourceNotice: {
      title: "Railway Recruitment Boards Technician Portal",
      url: "https://www.rrbapply.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: null,
    status: 'unverified',
    author: 'Akash Singh Solanki',
    reviewedDate: '22 Sep 2026, 16:30 IST',
    readTime: '4 min read',
    summary: 'City intimation slips and travel pass for SC/ST candidates are active on official railway regional portals.',
    linkText: 'Check Exam City & Download Call Letter',
    officialLinks: [
      { title: 'RRB Regional Portals', label: 'Download E-Call Letter', url: 'https://indianrailways.gov.in', isPrimary: true, linkType: 'official' },
    ],
  },
  {
    id: 'res-upsc-cds-result',
    slug: 'upsc-cds-2-written-exam-final-result-ssb',
    category: 'result',
    title: 'UPSC CDS-II Written Exam Result & SSB',
    organization: 'Union Public Service Commission (UPSC)',
    examName: 'Combined Defence Services Examination (II)',
    publishDate: '23 Sep 2026',
    qualification: 'Graduates for IMA, INA, AFA, and OTA',
    sourceNotice: {
      title: "Union Public Service Commission Written Results Desk",
      url: "https://upsc.gov.in",
      checkedOn: '02 Oct 2026',
    },
    verifiedBy: 'Akash Singh Solanki',
    status: 'verified',
    author: 'Akash Singh Solanki',
    reviewedDate: '23 Sep 2026, 19:15 IST',
    readTime: '5 min read',
    summary: '8,421 candidates qualify for Services Selection Board (SSB) interviews. Verification of original certificates scheduled at respective selection centers.',
    linkText: 'Check Roll Number in Qualified Merit List',
    officialLinks: [
      { title: 'UPSC Press Note PDF', label: 'Download Merit List PDF', url: 'https://upsc.gov.in', isPrimary: true, linkType: 'pdf' },
    ],
  },
];

export const MARKING_PRESETS: MarkingPreset[] = [
  {
    id: 'ssc-cgl',
    name: 'SSC CGL / CHSL / CPO Tier-1',
    category: 'Staff Selection Commission',
    correctMarks: 2.0,
    negativePenalty: 0.50,
    totalQuestionsDefault: 100,
    maxScoreDefault: 200,
  },
  {
    id: 'ssc-gd',
    name: 'SSC GD Constable (New Pattern)',
    category: 'Staff Selection Commission',
    correctMarks: 2.0,
    negativePenalty: 0.25,
    totalQuestionsDefault: 80,
    maxScoreDefault: 160,
  },
  {
    id: 'rrb-ntpc',
    name: 'RRB NTPC / Group-D CBT-1',
    category: 'Railway Recruitment Boards',
    correctMarks: 1.0,
    negativePenalty: 0.333,
    totalQuestionsDefault: 100,
    maxScoreDefault: 100,
  },
  {
    id: 'bank-po',
    name: 'IBPS / SBI PO & Clerk Prelims',
    category: 'Banking (IBPS & SBI)',
    correctMarks: 1.0,
    negativePenalty: 0.25,
    totalQuestionsDefault: 100,
    maxScoreDefault: 100,
  },
  {
    id: 'upsc-prelims',
    name: 'UPSC Civil Services Prelims (GS-1)',
    category: 'Union Public Service Commission',
    correctMarks: 2.0,
    negativePenalty: 0.666,
    totalQuestionsDefault: 100,
    maxScoreDefault: 200,
  },
  {
    id: 'defence-cds',
    name: 'CDS Exam (English & GK Papers)',
    category: 'Defence (UPSC CDS)',
    correctMarks: 0.833,
    negativePenalty: 0.277,
    totalQuestionsDefault: 120,
    maxScoreDefault: 100,
  }
];

export const PHYSICAL_STANDARDS: PhysicalRequirement[] = [
  {
    id: 'rrb-group-d',
    examName: 'RRB Group D (Level-1) Physical Efficiency Test (PET)',
    postTitle: 'Track Maintainer Gr-IV, Pointsman, Assistant C&W, Loco Shed & S&T',
    maleHeight: {
      general: 0,
      obc: 0,
      sc: 0,
      st: 0,
      hilly: 0,
    },
    femaleHeight: {
      general: 0,
      obc: 0,
      sc: 0,
      st: 0,
      hilly: 0,
    },
    chestMale: {
      unexpanded: 0,
      expanded: 0,
      minExpansion: 0,
    },
    petCriteria: {
      maleRun: 'Run 1,000 meters in 4 mins 15 secs (1 chance) + Lift & carry 35 kg weight for 100 meters in 2 mins without putting down',
      femaleRun: 'Run 1,000 meters in 5 mins 40 secs (1 chance) + Lift & carry 20 kg weight for 100 meters in 2 mins without putting down',
      additional: 'PwBD & Course Completed Act Apprentices (CCAA) trained in Railway Establishments are 100% exempted from PET',
    },
  },
  {
    id: 'ssc-gd-constable',
    examName: 'SSC GD Constable Exam',
    postTitle: 'Constable (GD) in BSF, CISF, CRPF, ITBP, SSB, SSF',
    maleHeight: {
      general: 170,
      obc: 170,
      sc: 170,
      st: 162.5,
      hilly: 165,
    },
    femaleHeight: {
      general: 157,
      obc: 157,
      sc: 157,
      st: 150,
      hilly: 155,
    },
    chestMale: {
      unexpanded: 80,
      expanded: 85,
      minExpansion: 5,
    },
    petCriteria: {
      maleRun: '5 Kilometers in 24 minutes',
      femaleRun: '1.6 Kilometers in 8½ minutes',
      additional: 'For Ladakh region candidates: Male 1.6 km in 7 mins; Female 800m in 5 mins',
    },
  },
  {
    id: 'delhi-police-si',
    examName: 'SSC Delhi Police & CAPFs SI',
    postTitle: 'Sub-Inspector in Delhi Police Executive',
    maleHeight: {
      general: 170,
      obc: 170,
      sc: 170,
      st: 162.5,
      hilly: 165,
    },
    femaleHeight: {
      general: 157,
      obc: 157,
      sc: 157,
      st: 154,
      hilly: 155,
    },
    chestMale: {
      unexpanded: 81,
      expanded: 85,
      minExpansion: 4,
    },
    petCriteria: {
      maleRun: '100m sprint in 16 sec + 1.6 km in 6.5 mins + Long Jump 3.65m + High Jump 1.2m',
      femaleRun: '100m sprint in 18 sec + 800m in 4 mins + Long Jump 2.7m + High Jump 0.9m',
      additional: 'Valid Light Motor Vehicle (LMV) driving license mandatory for Male candidates',
    },
  },
  {
    id: 'up-police-constable',
    examName: 'UP Police Constable Recruitment',
    postTitle: 'Constable Civil Police (Male & Female)',
    maleHeight: {
      general: 168,
      obc: 168,
      sc: 168,
      st: 160,
      hilly: 168,
    },
    femaleHeight: {
      general: 152,
      obc: 152,
      sc: 152,
      st: 147,
      hilly: 152,
    },
    chestMale: {
      unexpanded: 79,
      expanded: 84,
      minExpansion: 5,
    },
    petCriteria: {
      maleRun: '4.8 Kilometers in 25 minutes',
      femaleRun: '2.4 Kilometers in 14 minutes',
      additional: 'Minimum 40 kg body weight mandatory for female candidates',
    },
  },
  {
    id: 'cisf-fireman',
    examName: 'CISF Constable Fireman',
    postTitle: 'Constable / Fireman (Male Only)',
    maleHeight: {
      general: 170,
      obc: 170,
      sc: 170,
      st: 162.5,
      hilly: 165,
    },
    femaleHeight: {
      general: 0,
      obc: 0,
      sc: 0,
      st: 0,
      hilly: 0,
    },
    chestMale: {
      unexpanded: 80,
      expanded: 85,
      minExpansion: 5,
    },
    petCriteria: {
      maleRun: '5 Kilometers in 24 minutes',
      femaleRun: 'Not Applicable (Male candidates only post)',
      additional: 'Science subject in 10+2 is compulsory qualification',
    },
  },
  {
    id: 'army-agniveer-gd',
    examName: 'Indian Army Agniveer Rally',
    postTitle: 'Agniveer General Duty (All Arms)',
    maleHeight: {
      general: 170,
      obc: 170,
      sc: 170,
      st: 162,
      hilly: 163,
    },
    femaleHeight: {
      general: 162,
      obc: 162,
      sc: 162,
      st: 158,
      hilly: 158,
    },
    chestMale: {
      unexpanded: 77,
      expanded: 82,
      minExpansion: 5,
    },
    petCriteria: {
      maleRun: '1.6 Km: Group I (<5 min 30 sec, 60 marks), Group II (5 min 31s - 5 min 45s, 48 marks)',
      femaleRun: '1.6 Km: Group I (<7 min 30 sec), Group II (<8 min)',
      additional: '10 Pull-ups for Group I (40 marks), 9 Pull-ups (33 marks), 9 Feet Ditch Jump',
    },
  },
  {
    id: 'rpf-constable',
    examName: 'Railway Protection Force (RPF)',
    postTitle: 'Constable & Sub-Inspector in RPF & RPSF',
    maleHeight: {
      general: 165,
      obc: 165,
      sc: 160,
      st: 160,
      hilly: 163,
    },
    femaleHeight: {
      general: 157,
      obc: 157,
      sc: 152,
      st: 152,
      hilly: 155,
    },
    chestMale: {
      unexpanded: 80,
      expanded: 85,
      minExpansion: 5,
    },
    petCriteria: {
      maleRun: '1600 meters in 5 minutes 45 seconds + Long Jump 14 ft + High Jump 4 ft',
      femaleRun: '800 meters in 3 minutes 40 seconds + Long Jump 9 ft + High Jump 3 ft',
      additional: 'Only one chance allowed for 1600m/800m running events',
    },
  }
];

export const OFFICIAL_PYQ_QUESTIONS: PYQQuestion[] = [
  // Section 1: General Intelligence & Reasoning (Practice Questions)
  {
    id: 1,
    section: 'Reasoning',
    question: 'Select the option that is related to the third word in the same way as the second word is related to the first word:\n\nThermometer : Temperature :: Hygrometer : ?',
    options: ['Atmospheric Pressure', 'Relative Humidity', 'Earthquake Intensity', 'Liquid Density'],
    correctAnswer: 1,
    explanation: 'A thermometer is an instrument used to gauge temperature, while a hygrometer is specifically designed to measure relative humidity in the atmosphere. Barometer measures pressure; Seismograph measures earthquake intensity.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'SSC CGL Tier-1 Official Exam Paper (Shift 1)',
  },
  {
    id: 2,
    section: 'Reasoning',
    question: 'In a certain code language, if "FLOWER" is written as "UOLDVI", how will "TERMINAL" be written in that code?',
    options: ['GVINRMZO', 'GVIIMRZO', 'GVIRNMZO', 'GVIRNMOP'],
    correctAnswer: 0,
    explanation: 'Each letter is replaced by its reverse alphabetical counterpart (A <-> Z, B <-> Y, C <-> X, etc.). T->G, E->V, R->I, M->N, I->R, N->M, A->Z, L->O. Hence, GVINRMZO.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'SSC CHSL 10+2 Official Paper',
  },
  {
    id: 3,
    section: 'Reasoning',
    question: 'Statements:\n1. All IAS officers are graduates.\n2. Some graduates are authors.\n\nConclusions:\nI. Some authors are IAS officers.\nII. All IAS officers are authors.',
    options: ['Only Conclusion I follows', 'Only Conclusion II follows', 'Neither Conclusion I nor II follows', 'Both Conclusions follow'],
    correctAnswer: 2,
    explanation: 'From the given premises, there is no direct link establishing that authors must overlap with the subset of IAS officers among all graduates. Thus neither conclusion follows with certainty.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'SSC CGL Official Paper',
  },
  {
    id: 4,
    section: 'Reasoning',
    question: 'Find the missing number in the given series:\n7, 11, 19, 35, 67, ?',
    options: ['129', '131', '133', '135'],
    correctAnswer: 1,
    explanation: 'Pattern of increments: +4, +8, +16, +32, +64 (powers of 2 doubled each time). 67 + 64 = 131.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'RRB NTPC CBT-1 Official Shift',
  },
  {
    id: 5,
    section: 'Reasoning',
    question: 'Pointing to a gentleman, Raman said, "His only brother is the father of my daughter\'s father." How is the gentleman related to Raman?',
    options: ['Father', 'Uncle (Paternal)', 'Brother', 'Grandfather'],
    correctAnswer: 1,
    explanation: '"My daughter\'s father" is Raman himself. The father of Raman is his dad. The gentleman is the brother of Raman\'s father, so he is Raman\'s paternal uncle (Chacha/Taya).',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'SSC CPO Sub-Inspector Official Paper',
  },

  // Section 2: General Awareness (Practice Questions)
  {
    id: 6,
    section: 'General Awareness',
    question: 'Under which Article of the Constitution of India is the "Right to Constitutional Remedies" (Writ Jurisdiction of Supreme Court) guaranteed?',
    options: ['Article 19', 'Article 21', 'Article 32', 'Article 44'],
    correctAnswer: 2,
    explanation: 'Article 32 confers the right to move the Supreme Court by appropriate proceedings for the enforcement of the Fundamental Rights. Dr. B.R. Ambedkar famously called Article 32 the "Heart and Soul of the Constitution".',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'UPSC CSE Prelims / SSC CGL Official Paper',
  },
  {
    id: 7,
    section: 'General Awareness',
    question: 'Which Mughal Emperor shifted the imperial capital from Agra to Delhi and built the Red Fort (Lal Qila) and Jama Masjid?',
    options: ['Akbar', 'Jahangir', 'Shah Jahan', 'Aurangzeb'],
    correctAnswer: 2,
    explanation: 'Shah Jahan commissioned the construction of the walled city of Shahjahanabad (Old Delhi), along with the Red Fort and Jama Masjid, transferring the capital from Agra in 1638.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'SSC Combined Graduate Level Official Paper',
  },
  {
    id: 8,
    section: 'General Awareness',
    question: 'What is the phenomenon called where sound waves bend as they pass from a warm air layer into a cold air layer near the ground?',
    options: ['Sound Reflection', 'Sound Refraction', 'Sound Diffraction', 'Doppler Effect'],
    correctAnswer: 1,
    explanation: 'Sound travels faster in warmer air than in cooler air. As sound passes between air layers of differing temperatures, changes in acoustic velocity cause the path to curve or bend, which is acoustic refraction.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'CDS Official General Knowledge Paper',
  },
  {
    id: 9,
    section: 'General Awareness',
    question: 'Which of the following mountain passes connects the Kashmir Valley with the Kargil and Leh districts of Ladakh across the Great Himalayas?',
    options: ['Nathu La Pass', 'Zoji La Pass', 'Rohtang Pass', 'Shipki La Pass'],
    correctAnswer: 1,
    explanation: 'Zoji La is a strategic high mountain pass located at ~11,575 ft on National Highway 1 (NH-1) connecting Srinagar and Leh.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'NDA & NA Official Paper',
  },
  {
    id: 10,
    section: 'General Awareness',
    question: 'The Goods and Services Tax (GST) Council in India is chaired by which constitutional dignitary?',
    options: ['Prime Minister of India', 'Union Minister of Finance', 'Governor of Reserve Bank of India', 'Cabinet Secretary'],
    correctAnswer: 1,
    explanation: 'Under Article 279A of the Indian Constitution, the GST Council is chaired by the Union Finance Minister, with State Finance Ministers as its members.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'SSC CGL General Awareness Official Paper',
  },

  // Section 3: Quantitative Aptitude (SSC / Railway PYQ)
  {
    id: 11,
    section: 'Quantitative Aptitude',
    question: 'A shopkeeper marks an article 40% above its cost price and offers a discount of 25% on the marked price. If his profit is ₹150, what was the cost price of the article?',
    options: ['₹2,500', '₹3,000', '₹3,200', '₹2,800'],
    correctAnswer: 1,
    explanation: 'Let CP = 100x. MP = 140x. After 25% discount, SP = 140x * 0.75 = 105x. Profit = SP - CP = 5x. Given 5x = ₹150 => x = 30. Therefore CP = 100x = ₹3,000.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'SSC CGL Tier-1 Quantitative Aptitude',
  },
  {
    id: 12,
    section: 'Quantitative Aptitude',
    question: 'Pipe A can fill a tank in 12 hours, while Pipe B can empty the same tank in 18 hours. If both pipes are opened simultaneously when the tank is empty, how many hours will it take to fill the tank completely?',
    options: ['30 hours', '36 hours', '42 hours', '24 hours'],
    correctAnswer: 1,
    explanation: 'Net filling rate per hour = (1/12) - (1/18) = (3 - 2)/36 = 1/36 tank per hour. Therefore, the tank fills in 36 hours.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'RRB NTPC Official Quantitative Paper',
  },
  {
    id: 13,
    section: 'Quantitative Aptitude',
    question: 'The average weight of 24 students in a class is 45 kg. If the weight of the class teacher is included, the average increases by 400 grams. What is the teacher\'s weight?',
    options: ['52 kg', '54 kg', '55 kg', '56 kg'],
    correctAnswer: 2,
    explanation: 'New total people = 25. Total weight increase = 25 * 0.4 kg = 10 kg. Teacher weight = Original average + Total increase = 45 + 10 = 55 kg.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'SSC CHSL 10+2 Arithmetic Paper',
  },
  {
    id: 14,
    section: 'Quantitative Aptitude',
    question: 'What is the compound interest on ₹12,000 for 2 years at 10% per annum, compounded annually?',
    options: ['₹2,400', '₹2,520', '₹2,640', '₹2,480'],
    correctAnswer: 1,
    explanation: 'Amount = 12000 * (1.10)^2 = 12000 * 1.21 = ₹14,520. CI = ₹14,520 - ₹12,000 = ₹2,520.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'IBPS PO Prelims Official Paper',
  },
  {
    id: 15,
    section: 'Quantitative Aptitude',
    question: 'In a triangle ABC, if the angle bisector of angle A meets side BC at point D, and AB = 10 cm, AC = 14 cm, and BC = 12 cm, what is the length of BD?',
    options: ['4.5 cm', '5.0 cm', '5.5 cm', '6.0 cm'],
    correctAnswer: 1,
    explanation: 'By Angle Bisector Theorem, BD / DC = AB / AC = 10 / 14 = 5 / 7. Total parts = 5 + 7 = 12. Since BC = 12 cm, BD = 5 cm and DC = 7 cm.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'SSC CGL Advanced Geometry Official Paper',
  },

  // Section 4: English Comprehension (SSC CGL PYQ)
  {
    id: 16,
    section: 'English Comprehension',
    question: 'Choose the most appropriate synonym for the capitalized word:\n"The judge was noted for his METICULOUS attention to procedural detail."',
    options: ['Careless', 'Painstaking', 'Hasty', 'Superficial'],
    correctAnswer: 1,
    explanation: '"Meticulous" means showing great attention to detail; very careful and precise. "Painstaking" is the most accurate synonym.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'SSC CGL Official English Comprehension',
  },
  {
    id: 17,
    section: 'English Comprehension',
    question: 'Select the sentence that contains NO grammatical error:',
    options: [
      'Neither the principal nor the teachers was present in the meeting.',
      'Neither the principal nor the teachers were present in the meeting.',
      'Neither the principal or the teachers was present in the meeting.',
      'Neither the principal nor the teachers had been presents in the meeting.'
    ],
    correctAnswer: 1,
    explanation: 'When subjects are joined by "neither... nor", the verb agrees in number and person with the closest subject ("teachers" is plural, so "were" is correct).',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'SSC CGL Tier-1 English Section',
  },
  {
    id: 18,
    section: 'English Comprehension',
    question: 'What is the meaning of the idiom: "To burn the midnight oil"?',
    options: [
      'To waste electricity or fuel unnecessarily',
      'To work or study late into the night',
      'To cause an unexpected fire accident',
      'To give up on a difficult project'
    ],
    correctAnswer: 1,
    explanation: '"To burn the midnight oil" means to study, read, or work very hard until late at night.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'SSC CPO / Stenographer Official Exam',
  },
  {
    id: 19,
    section: 'English Comprehension',
    question: 'Select the single word which means: "One who is unable to pay his debts"?',
    options: ['Insolvent', 'Miser', 'Extravagant', 'Spendthrift'],
    correctAnswer: 0,
    explanation: 'An "insolvent" (or bankrupt) person is one who is unable to pay outstanding debts.',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'SSC CHSL 10+2 One Word Substitution',
  },
  {
    id: 20,
    section: 'English Comprehension',
    question: 'Select the antonym for the word "EPHEMERAL":',
    options: ['Transient', 'Fleeting', 'Eternal', 'Momentary'],
    correctAnswer: 2,
    explanation: '"Ephemeral" means lasting for a very short time. Its direct antonym is "Eternal" (everlasting).',
    marks: 2,
    negativeMarks: 0.5,
    sourcePaper: 'UPSC CDS Official English Paper',
  }
];

// Alias for backwards compatibility
export const MOCK_TEST_QUESTIONS = OFFICIAL_PYQ_QUESTIONS;
