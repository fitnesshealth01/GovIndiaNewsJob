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
  category: 'jobs' | 'admit-card' | 'result' | 'answer-key' | 'cut-off' | 'board-exams' | 'nta-exams';
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
  preparationTips?: string[];
  admitCardDetails?: AdmitCardDetails;
  seoTitle?: string;
  metaDescription?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  quickFacts?: { detail: string; information: string }[];
  whoCanApplyClass10?: string[];
  whoCanApplyClass12?: string[];
  goodToKnow?: string[];
  feesTable?: { item: string; amount: string }[];
  feesNotes?: string;
  class10TwoExamSystemNotes?: string;
  notEligibleAdvisory?: string;
  editorialDisclaimer?: string;
  keyTakeaways?: string[];
  dbtBetMergerNotes?: string;
  categoryChoiceOptions?: { title: string; description: string }[];
  featuredImage?: string;
  titleImage?: string;
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
  officialDownloadSteps?: string[];
  downloadSteps?: string[];
  checklistOnCard?: string[];
  detailsToCheck?: string[];
  examDayCarryList?: string[];
  itemsToCarry?: string[];
  prohibitedItems?: string[];
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
  {
    "id": "up-board-2027-class-12-science-gap-day-revision-plan",
    "slug": "up-board-2027-class-12-science-gap-day-revision-plan",
    "category": "board-exams",
    "title": "UP Board 2027 Class 12 Science: Gap-Day Revision Plan for PCM and PCB",
    "seoTitle": "UP Board 2027 Class 12 Science Gap-Day Revision Plan (PCM & PCB)",
    "metaDescription": "UP Board 2027 exams run 5–24 Feb. See exactly how many free days Class 12 Science students get between Hindi, English, Maths/Biology, Chemistry and Physics, and how to use each one.",
    "primaryKeyword": "UP Board 2027 Class 12 revision plan",
    "featuredImage": "https://i.ibb.co/4ZqpwCPY/1dcf9bba-10ba-4916-b2ee-a53345a3bfc3-1.png",
    "titleImage": "https://i.ibb.co/4ZqpwCPY/1dcf9bba-10ba-4916-b2ee-a53345a3bfc3-1.png",
    "secondaryKeywords": [
      "UP Board time table 2027 class 12",
      "UP Board 2027 PCM strategy",
      "UP Board 2027 PCB strategy",
      "UP Board exam date 2027",
      "UPMSP 2027 Intermediate Science"
    ],
    "organization": "Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)",
    "examName": "UP Board Class 12 Intermediate Examination 2027 (Science Stream)",
    "postCount": "~24.3 Lakh Candidates",
    "publishDate": "13 Oct 2026",
    "examDate": "5–24 Feb 2027 (Afternoon)",
    "qualification": "Class 12 Intermediate Science (PCM / PCB Stream)",
    "qualificationTier": "12th",
    "sector": "other",
    "fees": "Included in Board Registration Fee",
    "sourceNotice": {
      "title": "UPMSP Prayagraj Official Timetable Notice — High School & Intermediate Examination 2027",
      "url": "https://upmsp.edu.in",
      "checkedOn": "13 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "13 Oct 2026, 17:00 IST",
    "readTime": "18 min read",
    "summary": "UP Board 2027 exams run 5–24 Feb. See exactly how many free days Class 12 Science students get between Hindi, English, Maths/Biology, Chemistry and Physics, and how to use each one.",
    "linkText": "View Official UPMSP 2027 Timetable at upmsp.edu.in",
    "quickFacts": [
      { "detail": "Board Authority", "information": "Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP Prayagraj)" },
      { "detail": "Exam Dates", "information": "5 February to 24 February 2027" },
      { "detail": "Science Shift", "information": "Afternoon Shift: 2:00 PM to 5:15 PM (3 hrs 15 mins)" },
      { "detail": "Total Registered", "information": "~52 Lakh students (~24.3 Lakh Class 12, ~27.8 Lakh Class 10)" },
      { "detail": "Critical Bottleneck", "information": "1 single day gap between Chemistry (15 Feb) and Physics (17 Feb)" },
      { "detail": "Longest Gap", "information": "3 free days (9–11 Feb) before Mathematics / Biology" },
      { "detail": "Reading Time", "information": "15 minutes question paper reading window included" },
      { "detail": "Official Portal", "information": "upmsp.edu.in" }
    ],
    "importantDates": [
      { "event": "Official Timetable Release", "date": "October 2026" },
      { "event": "Class 12 Practical Exams", "date": "January 2027 (Two Phases)" },
      { "event": "Hindi Exam", "date": "Friday, 5 February 2027 (2:00 pm – 5:15 pm)" },
      { "event": "English Exam", "date": "Monday, 8 February 2027 (2:00 pm – 5:15 pm)" },
      { "event": "Mathematics / Biology Exam", "date": "Friday, 12 February 2027 (2:00 pm – 5:15 pm)" },
      { "event": "Chemistry Exam", "date": "Monday, 15 February 2027 (2:00 pm – 5:15 pm)" },
      { "event": "Physics Exam (Final Science)", "date": "Wednesday, 17 February 2027 (2:00 pm – 5:15 pm)" },
      { "event": "Board Exams Conclude", "date": "Wednesday, 24 February 2027" }
    ],
    "faqs": [
      {
        "question": "What are the exact exam shifts for UP Board 2027 Class 12 Science?",
        "answer": "All core Class 12 Science papers (Hindi, English, Mathematics/Biology, Chemistry, and Physics) are conducted in the afternoon shift from 2:00 pm to 5:15 pm. Each paper lasts 3 hours 15 minutes, which includes 15 minutes for reading the question paper."
      },
      {
        "question": "Is the 15-minute question paper reading time included in the total duration?",
        "answer": "Yes. The total examination time is 3 hours and 15 minutes (2:00 pm to 5:15 pm). The first 15 minutes are strictly designated for reading and reviewing the question paper, after which answer writing commences."
      },
      {
        "question": "How should students handle the 1-day gap between Chemistry and Physics?",
        "answer": "Do not attempt to learn any new topic on 16 February. Complete all extensive Physics revisions before 15 February. Use the single gap day exclusively for formula review, ray diagrams, and solving key numerical types from modern physics and electromagnetism."
      },
      {
        "question": "Are calculators permitted in UP Board Class 12 examinations?",
        "answer": "No. Electronic calculators, smartwatches, and programmable devices are strictly prohibited in UPMSP examination centers. All logarithmic tables or required constants are provided directly within the question paper."
      },
      {
        "question": "When will UP Board Class 12 Science practical examinations be conducted?",
        "answer": "UPMSP typically conducts Class 12 Intermediate practical examinations in two phases during January 2027 across different geographic divisions of Uttar Pradesh under external examiners appointed by the Board."
      }
    ]
  },
  {
    "id": "ugc-net-december-2026-application-form",
    "slug": "ugc-net-december-2026-application-form-last-date-fee-eligibility",
    "category": "nta-exams",
    "title": "UGC NET December 2026 Application Form Out: Last Date, Fee, Eligibility, Exam Date and How to Apply",
    "seoTitle": "UGC NET December 2026 Form Out: Last Date Oct 28, Fee, Eligibility",
    "metaDescription": "UGC NET December 2026 application form is live. Check last date (Oct 28), fee, eligibility, JRF age limit, exam date, new CSIR-UGC NET change and how to apply.",
    "primaryKeyword": "UGC NET December 2026 application form",
    "featuredImage": "https://i.ibb.co/ks7jY7Wc/e5446fb5-0274-4413-b9f3-5ed6a2868bfb-1.png",
    "titleImage": "https://i.ibb.co/ks7jY7Wc/e5446fb5-0274-4413-b9f3-5ed6a2868bfb-1.png",
    "secondaryKeywords": [
      "UGC NET December 2026 last date",
      "UGC NET 2026 fee",
      "UGC NET eligibility 2026",
      "UGC NET JRF age limit 2026",
      "CSIR UGC NET December 2026",
      "DBT-BET merger"
    ],
    "organization": "National Testing Agency (NTA)",
    "examName": "University Grants Commission National Eligibility Test (UGC NET December 2026)",
    "postCount": "87 Subjects (JRF, Assistant Professor & PhD Admission)",
    "publishDate": "09 Oct 2026",
    "lastDate": "28 Oct 2026 (11:50 PM) / Late fee until 31 Oct 2026",
    "examDate": "14 to 19 December 2026 (Buffer dates: 20 & 21 Dec 2026)",
    "qualification": "Master's Degree with min 55% marks (50% for OBC/SC/ST/PwD/Third Gender) or 4-Year Bachelor's Degree with 75%",
    "qualificationTier": "graduate",
    "sector": "other",
    "fees": "₹1,150 (General), ₹600 (EWS/OBC-NCL), ₹325 (SC/ST/PwD/Third Gender)",
    "sourceNotice": {
      "title": "National Testing Agency (NTA) Official Public Notice — UGC NET December 2026 Session",
      "url": "https://ugcnet.nta.nic.in",
      "checkedOn": "09 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "09 Oct 2026, 10:45 IST",
    "readTime": "6 min read",
    "summary": "The National Testing Agency (NTA) has opened the UGC NET December 2026 application form. Apply at ugcnet.nta.nic.in by 28 October 2026 (11:50 PM). The exam will be held from 14 to 19 December 2026 across 87 subjects in CBT mode.",
    "linkText": "Apply at ugcnet.nta.nic.in Official Portal",
    "keyTakeaways": [
      "UGC NET December 2026 form: **8 October to 28 October 2026**",
      "Late fee window: **29 to 31 October 2026**, with an extra ₹500",
      "Correction window: **2 to 4 November 2026**",
      "Exam dates: **14 to 19 December 2026**, computer-based test (CBT)",
      "Fee: **₹1,150 (General), ₹600 (EWS/OBC-NCL), ₹325 (SC/ST/PwD/Third Gender)**",
      "JRF age limit: **30 years as on 1 December 2026**, with relaxation of up to 5 years",
      "No upper age limit for Assistant Professor or PhD admission"
    ],
    "importantDates": [
      {
        "event": "Notification and form release",
        "date": "8 October 2026"
      },
      {
        "event": "Last date to apply and pay fee",
        "date": "28 October 2026 (11:50 PM)"
      },
      {
        "event": "Application with late fee (₹500 extra)",
        "date": "29 to 31 October 2026"
      },
      {
        "event": "Application correction window",
        "date": "2 to 4 November 2026"
      },
      {
        "event": "Examination dates (CBT mode)",
        "date": "14 to 19 December 2026"
      },
      {
        "event": "Buffer exam dates",
        "date": "20 and 21 December 2026"
      },
      {
        "event": "Joint CSIR-UGC NET application deadline",
        "date": "5 November 2026"
      },
      {
        "event": "City intimation and admit card",
        "date": "To be announced on ugcnet.nta.nic.in"
      }
    ],
    "applicationFees": [
      {
        "category": "General / Unreserved",
        "fee": "₹1,150"
      },
      {
        "category": "General-EWS / OBC-NCL",
        "fee": "₹600"
      },
      {
        "category": "SC / ST / PwD / Third Gender",
        "fee": "₹325"
      },
      {
        "category": "Late Fee Surcharge (29–31 October 2026)",
        "fee": "₹500 extra"
      }
    ],
    "categoryChoiceOptions": [
      {
        "title": "JRF + Assistant Professor + PhD admission",
        "description": "The funded research route. It also qualifies you for university/college teaching roles. Has an upper age limit of 30 years (with applicable category relaxations)."
      },
      {
        "title": "Assistant Professor + PhD admission",
        "description": "For teaching-focused candidates without age limit restrictions or research fellowship requirements. No upper age limit."
      },
      {
        "title": "PhD admission only",
        "description": "For candidates who strictly seek eligibility for doctoral programme admissions in Indian universities and higher educational institutions without fellowship or teaching eligibility."
      }
    ],
    "howToApplySteps": [
      "Open **ugcnet.nta.nic.in** (official NTA website).",
      "Click the December 2026 application link and register. Registration runs through the Meri Pehchaan single sign-on using your verified mobile number and email.",
      "Fill in personal, academic, postgraduate mark details and subject preferences exactly as on your qualifying marksheets.",
      "Choose your category carefully (JRF + Assistant Professor, Assistant Professor only, or PhD only) and select 4 preferred exam cities.",
      "Upload your scanned photograph, signature, and category or PwD certificates in the prescribed format and dimensions.",
      "Pay the non-refundable examination fee online via debit card, credit card, net banking or UPI.",
      "Submit the application and **download and print the confirmation page** for future reference."
    ],
    "whoShouldApply": [
      "Post-graduates with minimum 55% marks (50% for OBC-NCL, SC, ST, PwD, Third Gender) seeking Junior Research Fellowship (JRF) or Assistant Professorship in Indian universities.",
      "Final-year Master degree students or candidates awaiting final qualifying exam results (must complete degree with requisite percentage within 2 years).",
      "Four-year Bachelor degree holders with minimum 75% marks eligible directly for JRF and PhD admissions under revised UGC guidelines.",
      "Aspirants aged 30 or under as on 1 December 2026 targeting funded research fellowships (up to 35 years for reserved categories and women candidates)."
    ],
    "whoShouldSkip": [
      "Candidates scoring below 55% marks in Master degree (below 50% for reserved categories) who do not possess a qualifying 4-year Bachelor degree with 75%.",
      "Candidates exceeding 30 years of age as on 01-12-2026 who are only interested in JRF fellowship without eligible age relaxations (though eligible for Assistant Professor and PhD).",
      "Aspirants seeking state-level lectureship who prefer state-specific SET exams in regional languages."
    ],
    "documentsNeeded": [
      "Master's degree (or final-year qualifying) marks sheets and roll details",
      "Scanned passport-size photograph and specimen signature in prescribed format",
      "Valid Category Certificate (OBC-NCL, EWS, SC/ST) or PwD Certificate if applicable",
      "Active mobile number and valid email ID for Meri Pehchaan verification",
      "Net banking / UPI / Debit card / Credit card for online application fee"
    ],
    "commonRejectionMistakes": [
      "Selecting the wrong eligibility category (e.g. PhD only instead of JRF + Assistant Professor).",
      "Mismatched name, father name or date of birth compared to official matriculation and degree certificates.",
      "Uploading blurry or non-compliant passport photos and signatures.",
      "Waiting until the final hours of 28 October when the NTA payment gateway experiences peak traffic.",
      "Not downloading and saving the final Confirmation Page after successful payment."
    ],
    "dbtBetMergerNotes": "NTA has announced that the Department of Biotechnology's Biotechnology Eligibility Test (DBT-BET) has been merged with the Joint CSIR-UGC NET Life Sciences exam from the December 2026 cycle. A new discipline, Life Sciences and Biotechnology (LS & BT), joins the paper list. If you are a biotechnology aspirant, prepare according to the new LS & BT syllabus and register for CSIR-UGC NET by 5 November 2026.",
    "editorialDisclaimer": "GovIndiaNews is an independent news publication and is not affiliated with NTA, UGC, or any government testing agency. Official notifications, dates, and application forms are verified directly from ugcnet.nta.nic.in. Candidates are advised to cross-verify all details on the official NTA portal.",
    "officialLinks": [
      {
        "title": "UGC NET Official Application Portal",
        "label": "ugcnet.nta.nic.in",
        "url": "https://ugcnet.nta.nic.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Joint CSIR-UGC NET Portal",
        "label": "csirnet.nta.ac.in",
        "url": "https://csirnet.nta.ac.in",
        "linkType": "official"
      }
    ],
    "faqs": [
      {
        "question": "When is the last date to apply for UGC NET December 2026?",
        "answer": "The last date to apply and pay the normal examination fee is 28 October 2026 (11:50 PM). An extended late fee window is open from 29 to 31 October with a ₹500 penalty."
      },
      {
        "question": "What are the examination dates for UGC NET December 2026?",
        "answer": "The exam is scheduled from 14 to 19 December 2026 as a Computer-Based Test (CBT), with buffer dates on 20 and 21 December 2026."
      },
      {
        "question": "What is the application fee for UGC NET December 2026?",
        "answer": "The fee is ₹1,150 for General/Unreserved, ₹600 for General-EWS/OBC-NCL, and ₹325 for SC/ST/PwD/Third Gender candidates."
      },
      {
        "question": "What is the upper age limit for UGC NET JRF in December 2026?",
        "answer": "The maximum age for Junior Research Fellowship (JRF) is 30 years as on 1 December 2026. A relaxation of up to 5 years is provided to OBC-NCL, SC, ST, PwD, Third Gender, and women candidates."
      },
      {
        "question": "Is there an age limit for Assistant Professor or PhD admission?",
        "answer": "No. There is no upper age limit for applying for Assistant Professor or PhD admission only."
      },
      {
        "question": "Can final-year Master students apply for UGC NET?",
        "answer": "Yes. Candidates in their final year of a Master’s degree or awaiting final results are eligible to apply, subject to fulfilling the minimum percentage criteria within two years."
      },
      {
        "question": "What is the big change regarding DBT-BET this cycle?",
        "answer": "DBT-BET has been merged into the Joint CSIR-UGC NET Life Sciences paper under the discipline Life Sciences and Biotechnology (LS & BT). Applications for Joint CSIR-UGC NET are open until 5 November 2026."
      }
    ],
    "preparationTips": [
      "Download and print the official gazette syllabus to tick off every individual sub-topic systematically during your study schedule.",
      "Dedicate the first 2 hours of daily study to your weakest subject before moving to familiar revision topics.",
      "Conduct weekly timed self-assessment tests and compute your net score strictly applying the official negative marking formula.",
      "Review official commission corrigenda and model answer keys to understand recurring question structures and accepted representations.",
      "Ensure all mandatory identity documents and category certificates are renewed within the prescribed financial year validity window."
    ],
    "cutOffTrends": [
      {
        "year": "June 2024 Cycle (Economics JRF Benchmark)",
        "general": 198,
        "obc": 182,
        "ews": 184,
        "sc": 168,
        "st": 156,
        "totalMarks": 300
      },
      {
        "year": "December 2023 Cycle (Commerce JRF Benchmark)",
        "general": 194,
        "obc": 178,
        "ews": 180,
        "sc": 162,
        "st": 152,
        "totalMarks": 300
      },
      {
        "year": "June 2023 Cycle (English JRF Benchmark)",
        "general": 190,
        "obc": 174,
        "ews": 176,
        "sc": 158,
        "st": 148,
        "totalMarks": 300
      }
    ],
    "examPattern": [
      {
        "subject": "Paper-I: Teaching & Research Aptitude (General)",
        "questions": 50,
        "marks": 100,
        "time": "Combined 3 Hours (180 Mins)",
        "negativeMarking": "No Negative Marking (2 Marks per question)"
      },
      {
        "subject": "Paper-II: Domain Subject Selected (87 Subjects)",
        "questions": 100,
        "marks": 200,
        "time": "Combined 3 Hours (180 Mins)",
        "negativeMarking": "No Negative Marking (2 Marks per question)"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "Paper-I: Teaching & Research Aptitude",
        "weightage": "100 Marks / 50 Questions",
        "topics": [
          "Teaching Aptitude: Concept, objectives, levels of teaching (memory, understanding, reflective), characteristics and basic requirements",
          "Research Aptitude: Meaning, types, characteristics, positivism and post-positivistic approach to research, methods of research",
          "Comprehension: A passage of text with five questions to test candidate reading analytical skills",
          "Communication: Meaning, types and characteristics of communication, effective communication, verbal and non-verbal",
          "Mathematical Reasoning and Aptitude: Types of reasoning, number series, letter series, codes and relationships",
          "Logical Reasoning: Understanding structure of arguments, evaluating and distinguishing deductive and inductive reasoning",
          "Data Interpretation: Sources, acquisition and classification of data, quantitative and qualitative data, graphical representation",
          "Information and Communication Technology (ICT): General abbreviations and terminology, basics of Internet, Intranet, E-mail, Audio and Video-conferencing",
          "People, Development and Environment: Development and environment, Millennium development and Sustainable development goals",
          "Higher Education System: Institutions of higher learning and education in ancient India, evolution of higher learning and research in post-independence India"
        ]
      },
      {
        "subject": "Paper-II: Domain Elective Subject (General Outline)",
        "weightage": "200 Marks / 100 Questions",
        "topics": [
          "Comprehensive master’s level core subjects across 87 authorized disciplines",
          "Advanced theoretical paradigms, literature reviews, quantitative modeling, and empirical methodologies",
          "Subject-specific policy frameworks, landmark institutional developments, and contemporary critical debates"
        ]
      }
    ]
  },
  {
    "id": "cbse-private-candidate-form-2027",
    "slug": "cbse-private-candidate-form-2027-eligibility-last-date-fees",
    "category": "board-exams",
    "title": "CBSE Private Candidate Form 2027 Is Open: Who Can Apply, Last Date, Fees and Step-by-Step Process",
    "seoTitle": "CBSE Private Candidate Form 2027: Last Date Oct 23, Eligibility, Fees",
    "metaDescription": "CBSE private candidate form 2027 is open for Class 10 and 12. Check who can apply, last date (Oct 23), fees, documents and step-by-step process.",
    "primaryKeyword": "CBSE private candidate form 2027",
    "featuredImage": "https://i.ibb.co/hFL2t4Y0/c3f1c1f1-724b-4f8a-8bb9-891fe128d25d-1-1.png",
    "titleImage": "https://i.ibb.co/hFL2t4Y0/c3f1c1f1-724b-4f8a-8bb9-891fe128d25d-1-1.png",
    "secondaryKeywords": [
      "CBSE private candidate eligibility 2027",
      "CBSE private form last date",
      "CBSE private candidate fee 2027",
      "CBSE essential repeat private candidate"
    ],
    "organization": "Central Board of Secondary Education (CBSE)",
    "examName": "CBSE Class 10 & 12 Board Examinations 2027 (Private Candidates)",
    "postCount": "Class 10 & 12 Private Candidates",
    "publishDate": "08 Oct 2026",
    "lastDate": "23 Oct 2026 (No Late Fee) / 30 Oct 2026 (With Late Fee)",
    "examDate": "February to April 2027 (Class 10: Feb–Mar 2027, Class 12: Feb–Apr 2027)",
    "qualification": "Class 10 / Class 12 (Essential Repeat, Compartment, Fail or Improvement Candidates)",
    "qualificationTier": "10th",
    "sector": "other",
    "fees": "₹300–₹320/subject (India), Late Fee: ₹2,000",
    "sourceNotice": {
      "title": "CBSE Official Notification — Online Submission of LOC for Private Candidates Class X & XII Examination 2027",
      "url": "https://www.cbse.gov.in/newsite/private/index.html",
      "checkedOn": "08 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "08 Oct 2026, 15:30 IST",
    "readTime": "6 min read",
    "summary": "CBSE opened private candidate registration for the 2027 Class 10 and 12 board exams on 8 October 2026. The last date without a late fee is 23 October 2026. Applications with a late fee of ₹2,000 are accepted from 24 to 30 October. Apply only at cbse.gov.in.",
    "linkText": "Apply at cbse.gov.in Private Candidate Portal",
    "quickFacts": [
      {
        "detail": "Form opens",
        "information": "8 October 2026"
      },
      {
        "detail": "Last date (no late fee)",
        "information": "23 October 2026 (Friday)"
      },
      {
        "detail": "Late fee window",
        "information": "24 to 30 October 2026"
      },
      {
        "detail": "Late fee",
        "information": "₹2,000, on top of the normal fee"
      },
      {
        "detail": "Class 10 private exams",
        "information": "February to March 2027"
      },
      {
        "detail": "Class 12 private exams",
        "information": "February to April 2027"
      },
      {
        "detail": "Separate private exam?",
        "information": "No, papers run alongside the main board exams"
      },
      {
        "detail": "Apply at",
        "information": "cbse.gov.in → Private Candidate link"
      }
    ],
    "whoShouldApply": [
      "Class 10 and Class 12 students declared Essential Repeat or Fail in 2026 or earlier cycles (2021 to 2026).",
      "Students placed in Compartment in 2026 main or supplementary examinations seeking second chance.",
      "Students who passed board exams in 2026 wishing for Improvement of Performance in one or more subjects.",
      "Passed candidates seeking to appear in an Additional Subject within two years of passing."
    ],
    "whoShouldSkip": [
      "Regular full-time school students currently enrolled in affiliated schools (must register through school LOC).",
      "Candidates attempting to change streams without fulfilling board eligibility norms.",
      "Students seeking practical-heavy science subjects (Physics, Chemistry, Biology) without having previously completed practical coursework as Essential Repeat or Compartment candidates."
    ],
    "whoCanApplyClass10": [
      "Session 2025-26 students declared **Essential Repeat** in the 2026 result.",
      "Students placed in **Compartment** in 2026 (second chance).",
      "Candidates declared **Fail or Essential Repeat** in any year from 2021 to 2026.",
      "Students who **passed in 2026** and want Improvement of Performance in one or more subjects."
    ],
    "whoCanApplyClass12": [
      "Students declared **Essential Repeat** in the 2026 exam.",
      "Students placed in **Compartment** in the 2026 main or supplementary exam. They can apply only for the subject in which they were placed in compartment, and must choose the Compartment category.",
      "Candidates declared Fail or Essential Repeat in earlier years, as listed in the notice.",
      "Students who **passed in 2026** and want improvement, subject to the Board’s conditions.",
      "Passed students who want an **additional subject**, within two years of passing."
    ],
    "goodToKnow": [
      "A student with compartment in one subject can choose to re-appear in all subjects by selecting the Essential Repeat category.",
      "In Class 12, Physics, Chemistry and Biology are open only to Essential Repeat, Compartment and Improvement candidates.",
      "Study from the 2027 curriculum on cbseacademic.nic.in."
    ],
    "feesTable": [
      {
        "item": "Additional subject",
        "amount": "₹320 per subject"
      },
      {
        "item": "Class 12 practical",
        "amount": "₹160 per practical subject"
      },
      {
        "item": "Compartment / improvement / additional subject (earlier-year rate)",
        "amount": "₹300 per subject"
      },
      {
        "item": "Late fee (24-30 Oct)",
        "amount": "₹2,000"
      }
    ],
    "feesNotes": "Candidates from Nepal pay ₹1,100 per additional subject and those from other countries ₹2,200. Fees vary by category, so confirm your exact amount on the portal before paying.",
    "howToApplySteps": [
      "Open **cbse.gov.in** and click the **Private Candidate** (Vyaktigat Pariksharthi) link.",
      "Select Class 10 or Class 12 and choose your correct category.",
      "Enter your previous roll number, year of passing and personal details exactly as on your marksheet.",
      "Select subjects (and practical subjects where applicable) and your exam city.",
      "Upload your photograph and signature.",
      "Pay the fee online and download the confirmation page."
    ],
    "documentsNeeded": [
      "Previous CBSE roll number and marksheet or admit card",
      "Recent passport-size photograph and scanned signature",
      "Valid mobile number and email ID",
      "ID proof (Aadhaar is commonly asked for)",
      "Debit card, credit card or net banking for payment"
    ],
    "commonRejectionMistakes": [
      "Choosing the wrong category (for example Improvement instead of Compartment).",
      "Typing name, date of birth or parent details differently from your marksheet.",
      "Submitting more than one application. Only one is allowed per student.",
      "Assuming payment means approval. CBSE still checks your eligibility.",
      "Using agents or unofficial websites for payment.",
      "Waiting until the last day, when the portal is busiest.",
      "Picking subjects you are not eligible for, such as science subjects in the wrong category."
    ],
    "class10TwoExamSystemNotes": "Since 2026, Class 10 students take a mandatory Phase 1 in February and an optional improvement Phase 2 in May. A clear rule for how Phase 2 applies to private candidates in 2027 was not available when this article was written. Check the official notice before choosing your category.",
    "notEligibleAdvisory": "If your category isn't covered, regular schooling or an open schooling board such as NIOS may be options. Confirm admission rules with them directly.",
    "editorialDisclaimer": "GovIndiaNews is an independent publication and is not affiliated with CBSE or any government body. Details were compiled from CBSE's notice as reported by education outlets and may change. Always confirm on cbse.gov.in.",
    "importantDates": [
      {
        "event": "Online Application Portal Opens",
        "date": "08 October 2026"
      },
      {
        "event": "Last Date to Apply (Without Late Fee)",
        "date": "23 October 2026 (Friday)"
      },
      {
        "event": "Late Fee Application Window (₹2,000 Surcharge)",
        "date": "24 to 30 October 2026"
      },
      {
        "event": "Class 10 Private Board Examinations",
        "date": "February to March 2027"
      },
      {
        "event": "Class 12 Private Board Examinations",
        "date": "February to April 2027"
      }
    ],
    "applicationFees": [
      {
        "category": "Additional Subject (Candidates in India)",
        "fee": "₹320 per subject"
      },
      {
        "category": "Class 12 Practical Subject Fee",
        "fee": "₹160 per practical subject"
      },
      {
        "category": "Compartment / Improvement / Additional Subject (Earlier Rate)",
        "fee": "₹300 per subject"
      },
      {
        "category": "Late Fee Surcharge (24–30 Oct 2026)",
        "fee": "₹2,000"
      },
      {
        "category": "Candidates from Nepal (Per Additional Subject)",
        "fee": "₹1,100"
      },
      {
        "category": "Candidates from Other Countries (Per Additional Subject)",
        "fee": "₹2,200"
      }
    ],
    "officialLinks": [
      {
        "title": "CBSE Private Candidate Portal",
        "label": "cbse.gov.in/newsite/private/index.html",
        "url": "https://www.cbse.gov.in/newsite/private/index.html",
        "isPrimary": true,
        "linkType": "official"
      },
      {
        "title": "CBSE Academic Curriculum 2027",
        "label": "cbseacademic.nic.in/curriculum_2027.html",
        "url": "https://cbseacademic.nic.in/curriculum_2027.html",
        "linkType": "official"
      }
    ],
    "faqs": [
      {
        "question": "When does the CBSE private candidate form 2027 close?",
        "answer": "23 October 2026 without a late fee. It stays open until 30 October with a ₹2,000 late fee."
      },
      {
        "question": "Is there a separate exam for private candidates?",
        "answer": "No. Private candidates write their papers in February to April 2027 along with the main board exams."
      },
      {
        "question": "Can I apply if I passed in 2026?",
        "answer": "Yes, but only for Improvement of Performance, or for an additional subject within two years of passing."
      },
      {
        "question": "Can I submit two forms?",
        "answer": "No. Only one application per student is accepted."
      },
      {
        "question": "Does paying the fee confirm my seat?",
        "answer": "No. CBSE verifies eligibility after submission."
      },
      {
        "question": "Where is the official form?",
        "answer": "Only on cbse.gov.in under the Private Candidate section."
      },
      {
        "question": "Is the fee the same for everyone?",
        "answer": "No. It depends on your category, subjects, practicals and country."
      },
      {
        "question": "When will the admit card come?",
        "answer": "Dates for private candidates are not yet announced. Watch cbse.gov.in and your registered email."
      }
    ],
    "preparationTips": [
      "Download and print the official gazette syllabus to tick off every individual sub-topic systematically during your study schedule.",
      "Dedicate the first 2 hours of daily study to your weakest subject before moving to familiar revision topics.",
      "Conduct weekly timed self-assessment tests and compute your net score strictly applying the official negative marking formula.",
      "Review official commission corrigenda and model answer keys to understand recurring question structures and accepted representations.",
      "Ensure all mandatory identity documents and category certificates are renewed within the prescribed financial year validity window."
    ],
    "cutOffTrends": [
      {
        "year": "2026 Board Passing Percentage (Overall)",
        "general": 87.98,
        "obc": 85.4,
        "ews": 86.2,
        "sc": 81.5,
        "st": 78.9,
        "totalMarks": 100
      },
      {
        "year": "2025 Board Passing Percentage (Overall)",
        "general": 86.5,
        "obc": 84.1,
        "ews": 85,
        "sc": 80.2,
        "st": 77.4,
        "totalMarks": 100
      }
    ],
    "examPattern": [
      {
        "subject": "Class 10 Board Examination (Per Subject)",
        "questions": 38,
        "marks": 80,
        "time": "3 Hours (180 Mins)",
        "negativeMarking": "No Negative Marking (Subjective Theory Paper)"
      },
      {
        "subject": "Class 12 Board Examination (Per Subject)",
        "questions": 35,
        "marks": 70,
        "time": "3 Hours (180 Mins)",
        "negativeMarking": "No Negative Marking (Subjective Theory + Practical Marks Carry Over)"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "CBSE Class 10 & 12 Official Prescribed Syllabi",
        "weightage": "100% NCERT / CBSE Curriculum",
        "topics": [
          "Complete theoretical chapters prescribed by Central Board of Secondary Education for the 2026-27 academic session",
          "Internal assessment and practical marks credit carry-over guidelines for essential repeat and compartment candidates",
          "Model sample question papers and marking schemes published on cbseacademic.nic.in"
        ]
      }
    ]
  },
  {
    "id": "nicl-ao-recruitment-2026",
    "slug": "nicl-ao-recruitment-2026-notification",
    "category": "jobs",
    "title": "NICL AO Recruitment 2026 Notification: 321 Vacancies, Eligibility, Exam Pattern & Apply Online",
    "organization": "National Insurance Company Limited (NICL)",
    "examName": "NICL Administrative Officer (Scale-I) Generalists & Specialists Examination 2026",
    "postCount": "321 Posts (200 Generalists, 121 Specialists)",
    "publishDate": "07 Oct 2026",
    "lastDate": "28 Oct 2026 (23:59 Hrs IST)",
    "examDate": "Phase-I Prelims: 17 Nov 2026 | Phase-II Mains: 22 Dec 2026",
    "qualification": "Graduation Degree with min 60% Marks (55% for SC/ST) OR Specialist Degree (CA/ICWA/LLB/BE/BTech/MBBS)",
    "qualificationTier": "graduate",
    "sector": "banking",
    "minAge": 21,
    "maxAge": 30,
    "ageLimit": "21 to 30 Years as on 01-10-2026 (SC/ST: 35, OBC: 33, PwBD: 40) - Born between 02-10-1996 and 01-10-2005",
    "fees": "₹1,000 for UR / OBC / EWS; ₹250 for SC / ST / PwBD (Intimation Charges)",
    "sourceNotice": {
      "title": "National Insurance Company Limited Official Employment Notification 2026",
      "url": "https://nationalinsurance.nic.co.in/en/recruitment",
      "checkedOn": "07 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "07 Oct 2026, 21:45 IST",
    "readTime": "11 min read",
    "summary": "National Insurance Company Limited (NICL) has officially published the recruitment notification for 321 Administrative Officer (Scale-I) vacancies across Generalist and Specialist cadres (Finance, Legal, Information Technology, Automobile Engineering, Doctors, Actuarial, and Rajbhasha). The online application registration window is active from 08 October to 28 October 2026 via nationalinsurance.nic.co.in and the official IBPS portal. Scale-I Officers start with a basic pay of ₹50,925 with gross monthly emoluments of approx ₹85,450 to ₹92,000 plus leased company quarters and benefits. Phase-I Preliminary CBT is scheduled for 17 November 2026, followed by Phase-II Mains on 22 December 2026.",
    "linkText": "Check Cadre Vacancies, Eligibility & Apply Online",
    "calculatorToolType": "age",
    "calculatorPresetId": "nicl-ao",
    "importantDates": [
      {
        "event": "Official Employment Notification Released",
        "date": "07 October 2026"
      },
      {
        "event": "Online Application & Fee Payment Gateway Opens",
        "date": "08 October 2026"
      },
      {
        "event": "Closing Date for Online Application & Fee Payment",
        "date": "28 October 2026 (23:59 Hrs IST)"
      },
      {
        "event": "Download of Call Letters for Phase-I Preliminary CBT",
        "date": "November 2026 (7–10 days before exam)"
      },
      {
        "event": "Phase-I (Preliminary) Online Examination Date",
        "date": "17 November 2026 (Tuesday)"
      },
      {
        "event": "Phase-I Result & Shortlist for Phase-II Mains",
        "date": "Late November / Early December 2026"
      },
      {
        "event": "Phase-II Main Examination & Descriptive Test",
        "date": "22 December 2026 (Tuesday)"
      },
      {
        "event": "Phase-III Personal Interviews (State Centers)",
        "date": "January / February 2027 (Tentative)"
      },
      {
        "event": "Final Merit List & Pre-Employment Medical Exam",
        "date": "March 2027"
      }
    ],
    "applicationFees": [
      {
        "category": "Unreserved (UR) / General Candidates",
        "fee": "₹1,000 (Application Fee + Intimation Charges + GST)"
      },
      {
        "category": "Other Backward Classes (OBC - Non Creamy Layer)",
        "fee": "₹1,000 (Application Fee + Intimation Charges + GST)"
      },
      {
        "category": "Economically Weaker Sections (EWS)",
        "fee": "₹1,000 (Application Fee + Intimation Charges + GST)"
      },
      {
        "category": "Scheduled Castes (SC) / Scheduled Tribes (ST)",
        "fee": "₹250 (Intimation Charges only + GST)"
      },
      {
        "category": "Persons with Benchmark Disabilities (PwBD)",
        "fee": "₹250 (Intimation Charges only + GST)"
      }
    ],
    "vacanciesTable": [
      {
        "postName": "Administrative Officer (Generalist)",
        "department": "Operations, Underwriting, Policy Servicing & Claims",
        "classification": "Scale-I Officer Cadre (Public Sector General Insurance)",
        "payScale": "Scale I (₹50,925 – ₹96,765 + Allowances)",
        "vacancy": "200 Posts",
        "eligibility": "Graduate / Post Graduate in any discipline with minimum 60% marks in aggregate (55% for SC/ST/PwBD)."
      },
      {
        "postName": "Administrative Officer (Finance / Accounts)",
        "department": "Accounts, Investment, Taxation & Internal Audit",
        "classification": "Scale-I Specialist Cadre",
        "payScale": "Scale I (₹50,925 – ₹96,765 + Allowances)",
        "vacancy": "30 Posts",
        "eligibility": "Chartered Accountant (ICAI) / Cost Accountant (ICWA) OR B.Com / M.Com with minimum 60% aggregate marks (55% for SC/ST)."
      },
      {
        "postName": "Administrative Officer (Information Technology)",
        "department": "Core Insurance Systems, IT Infrastructure & Cyber Security",
        "classification": "Scale-I Specialist Cadre",
        "payScale": "Scale I (₹50,925 – ₹96,765 + Allowances)",
        "vacancy": "20 Posts",
        "eligibility": "B.E. / B.Tech / M.Tech in CS / IT / Electronics or MCA from recognized University with minimum 60% marks (55% for SC/ST)."
      },
      {
        "postName": "Administrative Officer (Legal)",
        "department": "Litigation, Motor Third Party Tribunals & Consumer Grievances",
        "classification": "Scale-I Specialist Cadre",
        "payScale": "Scale I (₹50,925 – ₹96,765 + Allowances)",
        "vacancy": "20 Posts",
        "eligibility": "Bachelor of Laws (LL.B) or Master of Laws (LL.M) from a recognized University with minimum 60% marks (55% for SC/ST)."
      },
      {
        "postName": "Administrative Officer (Automobile Engineering)",
        "department": "Motor Own Damage Loss Assessment & Surveyor Oversight",
        "classification": "Scale-I Specialist Cadre",
        "payScale": "Scale I (₹50,925 – ₹96,765 + Allowances)",
        "vacancy": "15 Posts",
        "eligibility": "B.E. / B.Tech in Automobile Engineering or Mechanical Engineering with minimum 60% marks (55% for SC/ST)."
      },
      {
        "postName": "Administrative Officer (Doctors / Medical Officers)",
        "department": "Health Underwriting, GMC Claims & Hospital TPA Oversight",
        "classification": "Scale-I Specialist Cadre",
        "payScale": "Scale I (₹50,925 – ₹96,765 + Non-Practicing Allowance)",
        "vacancy": "15 Posts",
        "eligibility": "M.B.B.S. / M.S. / M.D. from a recognized medical institution with valid registration from State Medical Council or MCI."
      },
      {
        "postName": "Administrative Officer (Actuarial & Risk Engineering)",
        "department": "Actuarial Pricing, Risk Modeling & Catastrophe Management",
        "classification": "Scale-I Specialist Cadre",
        "payScale": "Scale I (₹50,925 – ₹96,765 + Allowances)",
        "vacancy": "16 Posts",
        "eligibility": "Graduate / Post Graduate in Statistics / Mathematics / Actuarial Science with min 4 core actuarial papers passed from IAI/IFoA."
      },
      {
        "postName": "Administrative Officer (Hindi / Rajbhasha)",
        "department": "Official Language Implementation & Parliamentary Committee Coordination",
        "classification": "Scale-I Specialist Cadre",
        "payScale": "Scale I (₹50,925 – ₹96,765 + Allowances)",
        "vacancy": "5 Posts",
        "eligibility": "Master’s Degree in Hindi with English as a compulsory subject at Bachelor’s level, with minimum 60% marks (55% for SC/ST)."
      }
    ],
    "selectionProcess": [
      {
        "stageNumber": "Phase-I",
        "stageName": "Preliminary Examination (Online Objective CBT)",
        "description": "100 Multiple Choice Questions (English: 30 Qs, Reasoning: 35 Qs, Quantitative Aptitude: 35 Qs) for 100 Marks. 60 Minutes total duration with 20 minutes fixed sectional timing. Qualifying in nature with 1/4th negative marking. Candidates approximately 15 times the number of vacancies are shortlisted for Phase-II.",
        "qualifyingNature": "Qualifying Only (Marks not counted in Final Merit)"
      },
      {
        "stageNumber": "Phase-II",
        "stageName": "Main Examination (Objective Test + Descriptive Test)",
        "description": "Online Objective Test of 250 Marks (180 Minutes) covering Reasoning (50/40), English (50/40), General Awareness (50/40), Computer Knowledge (50/40), Quant (50/40), plus Professional Knowledge (50) for Specialists. Followed immediately by 30-minute English Descriptive Test (30 Marks: Essay 10, Précis 10, Comprehension 10) typed on keyboard.",
        "qualifyingNature": "Competitive Merit Weightage: 80%"
      },
      {
        "stageNumber": "Phase-III",
        "stageName": "Personal Interview",
        "description": "Candidates qualifying both sectional and overall cutoff marks in Phase-II Objective & Descriptive tests are called for Interview conducted by NICL Board across major state capitals. Weightage of Online Exam and Interview is 80:20.",
        "qualifyingNature": "Competitive Merit Weightage: 20%"
      }
    ],
    "salaryStructure": {
      "payLevel": "Scale-I Officer Cadre (Class-I Gazetted Equivalent)",
      "basicPay": "₹50,925 in scale of ₹50925-2500(14)-85925-2710(4)-96765",
      "daPercent": "50.0% of Basic Pay",
      "hraPercent": "10% to 30% (or Company Leased Quarters)",
      "grossMonthly": "₹85,450 to ₹92,000 / month",
      "inHandMonthly": "₹76,500 to ₹82,800 / month",
      "benefits": [
        "Company Leased Accommodation / Officer Quarters entitlement (up to ₹30,000 - ₹45,000/mo in metro cities)",
        "National Pension System (NPS) with 14% Employer Government Contribution",
        "Group Mediclaim Insurance covering 100% hospitalization for Officer and dependent family",
        "Leave Travel Concession (LTC) & Home Town Concession once every 2 years",
        "Concessional House Building Advance (HBA) and Car/Vehicle Loan at preferential interest rates",
        "Subsidized meal coupons, monthly newspaper, briefcase allowance, and mobile reimbursement"
      ]
    },
    "salaryArithmetic": {
      "basicPay": 50925,
      "daRate": 0.5,
      "daAmount": 25463,
      "hraRate": 0.27,
      "hraAmount": 13750,
      "transportAllowance": 4200,
      "grossMonthly": 94338,
      "npsDeduction": 7639,
      "otherDeductions": 1200,
      "totalDeductions": 8839,
      "netInHandMonthly": 85499,
      "inputsDated": "01 October 2026 (Scale-I Public Sector Insurance Pay Scales)",
      "isEstimate": false,
      "notes": "Calculated for Metropolitan / Class-X city posting (such as Kolkata Head Office, Mumbai, New Delhi, Bengaluru). Officers opting for company-provided leased accommodation receive net take-home salary with HRA replaced by direct lease payment."
    },
    "examPattern": [
      {
        "subject": "Phase-I: English Language",
        "questions": 30,
        "marks": 30,
        "time": "20 Minutes",
        "negativeMarking": "0.25 (1/4th) Deducted"
      },
      {
        "subject": "Phase-I: Reasoning Ability",
        "questions": 35,
        "marks": 35,
        "time": "20 Minutes",
        "negativeMarking": "0.25 (1/4th) Deducted"
      },
      {
        "subject": "Phase-I: Quantitative Aptitude",
        "questions": 35,
        "marks": 35,
        "time": "20 Minutes",
        "negativeMarking": "0.25 (1/4th) Deducted"
      },
      {
        "subject": "Phase-II: Reasoning Ability (Mains)",
        "questions": 50,
        "marks": 50,
        "time": "35 Minutes",
        "negativeMarking": "0.25 (1/4th) Deducted"
      },
      {
        "subject": "Phase-II: English Language (Mains)",
        "questions": 50,
        "marks": 50,
        "time": "30 Minutes",
        "negativeMarking": "0.25 (1/4th) Deducted"
      },
      {
        "subject": "Phase-II: General Awareness & Financial Sector",
        "questions": 50,
        "marks": 50,
        "time": "20 Minutes",
        "negativeMarking": "0.25 (1/4th) Deducted"
      },
      {
        "subject": "Phase-II: Computer Knowledge",
        "questions": 50,
        "marks": 50,
        "time": "25 Minutes",
        "negativeMarking": "0.25 (1/4th) Deducted"
      },
      {
        "subject": "Phase-II: Quantitative Aptitude (Mains)",
        "questions": 50,
        "marks": 50,
        "time": "35 Minutes",
        "negativeMarking": "0.25 (1/4th) Deducted"
      },
      {
        "subject": "Phase-II: English Descriptive Test (Essay, Précis, Comprehension)",
        "questions": 3,
        "marks": 30,
        "time": "30 Minutes",
        "negativeMarking": "None (Evaluated Qualifying & Merit)"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "English Language (Phase-I & Phase-II)",
        "weightage": "30 Marks (Prelims) / 50 Marks (Mains)",
        "topics": [
          "Reading Comprehension (Financial & Insurance editorial passages)",
          "Cloze Test and Double Fillers",
          "Error Spotting and Sentence Correction",
          "Para Jumbles and Sentence Rearrangement",
          "Vocabulary: Synonyms, Antonyms, Idioms & Phrases",
          "Descriptive Test: Formal Essay (250 words), Précis Writing, and Comprehension"
        ]
      },
      {
        "subject": "Reasoning Ability",
        "weightage": "35 Marks (Prelims) / 50 Marks (Mains)",
        "topics": [
          "Puzzles: Floor, Box, Scheduling, Day-Date-Month Based",
          "Seating Arrangement: Circular, Linear, Parallel Rows, Square Tables",
          "Syllogism (Reverse and Only a Few patterns)",
          "Inequalities (Coded and Direct)",
          "Blood Relations and Direction Sense",
          "Data Sufficiency and Machine Input-Output",
          "Logical & Critical Reasoning (Statement-Assumption, Cause-Effect)"
        ]
      },
      {
        "subject": "Quantitative Aptitude",
        "weightage": "35 Marks (Prelims) / 50 Marks (Mains)",
        "topics": [
          "Data Interpretation: Bar Graph, Line Graph, Tabular, Pie Chart, Radar, and Caselets",
          "Missing and Wrong Number Series",
          "Quadratic Equations & Quantity Comparison (Q1 vs Q2)",
          "Arithmetic: Percentages, Profit, Loss & Discount",
          "Simple & Compound Interest, Ratio & Proportion, Partnerships",
          "Time, Speed & Distance, Trains, Boats & Streams",
          "Time & Work, Pipes & Cisterns, Mensuration 2D & 3D"
        ]
      },
      {
        "subject": "General Awareness & Insurance Market",
        "weightage": "50 Marks (Mains Only)",
        "topics": [
          "History & Structure of General Insurance in India (GIC Re, NICL, NIACL, OICL, UIIC)",
          "Principles of General Insurance: Utmost Good Faith, Insurable Interest, Indemnity, Subrogation",
          "IRDAI Regulations, Bima Sugam, Bima Vistaar & Insurance Regulatory Reforms",
          "Banking & Monetary Policy (RBI Rates, SLR, CRR, Inflation Trends)",
          "National & International Current Affairs (Last 6 Months)",
          "Government Social Security Schemes: PMJJBY, PMSBY, PMFBY, Ayushman Bharat PM-JAY"
        ]
      },
      {
        "subject": "Computer Knowledge",
        "weightage": "50 Marks (Mains Only)",
        "topics": [
          "Hardware & Software Basics, CPU, Memory Hierarchy (RAM/ROM/Cache)",
          "Operating Systems: Windows, Linux, Android fundamentals",
          "Computer Networks, OSI Model, IP Addressing, Protocols (HTTP, TCP, DNS)",
          "Cybersecurity Concepts: Firewalls, Phishing, Ransomware, Encryption",
          "Database Management System (DBMS) & SQL queries basics",
          "Microsoft Office: MS Word, Excel formulas, PowerPoint shortcuts"
        ]
      }
    ],
    "cutOffTrends": [
      {
        "year": "2024 Prelims (out of 100)",
        "general": 79.5,
        "obc": 79.5,
        "ews": 79.5,
        "sc": 74.5,
        "st": 66.75,
        "totalMarks": 100
      },
      {
        "year": "2024 Mains (out of 250)",
        "general": 141,
        "obc": 141,
        "ews": 138,
        "sc": 128.25,
        "st": 116.25,
        "totalMarks": 250
      },
      {
        "year": "2016 Prelims (out of 100)",
        "general": 65.5,
        "obc": 59.75,
        "ews": 62,
        "sc": 57.25,
        "st": 51.25,
        "totalMarks": 100
      }
    ],
    "whatsDifferentThisYear": [
      {
        "parameter": "Total Vacancies",
        "currentCycle": "321 Posts (200 Generalists, 121 Specialists)",
        "previousCycle": "266 Posts (2025) / 274 Posts (2024)",
        "sourceOrVerify": "NICL Official Recruitment Notice 2026"
      },
      {
        "parameter": "Crucial Age Date",
        "currentCycle": "01 October 2026 (Born between 02-10-1996 and 01-10-2005)",
        "previousCycle": "01 December 2023 / 01 June 2025",
        "sourceOrVerify": "Clause 4.1 Eligibility Guidelines"
      },
      {
        "parameter": "Scale-I Basic Pay",
        "currentCycle": "₹50,925 (Revised scale ₹50925 - ₹96765)",
        "previousCycle": "₹32,795 (Pre-wage revision scale)",
        "sourceOrVerify": "General Insurance Public Sector Wage Settlement"
      },
      {
        "parameter": "Phase-I & Phase-II Examination Window",
        "currentCycle": "Phase-I: 17 Nov 2026 | Phase-II: 22 Dec 2026",
        "previousCycle": "Earlier cycles had 7 to 8 weeks gap between stages",
        "sourceOrVerify": "NICL Official Schedule Notice"
      }
    ],
    "whoShouldApply": [
      "Graduates or Post-Graduates with minimum 60% aggregate marks (55% for SC/ST/PwBD) seeking a prestigious Scale-I officer position in a premier Central Public Sector Enterprise.",
      "Specialists holding professional degrees (B.E./B.Tech in CS/IT, MCA, Chartered Accountants, Cost Accountants, LLB/LLM, Automobile Engineers, Doctors MBBS) targeting designated specialist officer vacancies.",
      "Candidates between 21 and 30 years of age as on 01 October 2026 (or eligible for statutory age relaxation up to 33 for OBC, 35 for SC/ST, 40 for PwBD).",
      "Aspirants with strong aptitude in Quantitative Aptitude, Logical Reasoning, English, and General/Financial Awareness looking for high job stability and attractive central insurance pay scales."
    ],
    "whoShouldSkip": [
      "Candidates scoring below 60% aggregate marks in graduation (below 55% for SC/ST/PwBD) who do not possess a qualifying post-graduate degree with at least 60% marks.",
      "Candidates awaiting final graduation results whose degree or provisional mark sheet is not certified on or before 28 October 2026.",
      "Candidates exceeding 30 years of age as on 01 October 2026 who do not fall under any reserved category.",
      "Candidates unwilling to commit to the mandatory 4-year minimum service bond requirement (including 1 year probation period)."
    ],
    "commonRejectionMistakes": [
      "Calculating graduation percentage incorrectly: Candidates must compute aggregate marks of all semesters/years combined; calculating only honors subjects or final semester will lead to disqualification during Document Verification.",
      "Submitting handwritten declaration in BLOCK / CAPITAL letters: The declaration MUST be written in the candidate’s normal running handwriting in English.",
      "Uploading incorrect photo specifications: Photographs must be recent color passport size on a light (preferably white) background without hats, dark spectacles, or selfie angles.",
      "Using an OBC certificate outside the prescribed financial year: The OBC Non-Creamy Layer certificate must be in the prescribed Central Government format and valid for the current financial year.",
      "Waiting until 28 October 2026 evening to make payment: IBPS payment gateways witness peak traffic on the final day, risking failed transactions and missed registration."
    ],
    "documentsNeeded": [
      "Valid active Email ID and Mobile Number (must be kept active until final appointment).",
      "Recent passport-size color photograph (4.5 cm × 3.5 cm, 20 KB to 50 KB, JPEG/JPG format).",
      "Clear signature on white paper with black ink pen (10 KB to 20 KB, running handwriting only).",
      "Left Thumb Impression on white paper with black or blue ink (20 KB to 50 KB, JPG/JPEG).",
      "Handwritten Declaration in English on white paper with black ink (50 KB to 100 KB, JPG/JPEG).",
      "Matriculation (10th) Board Certificate & Mark Sheet (mandatory for Date of Birth verification).",
      "Graduation / Post Graduation Degree Certificate and all semester mark sheets proving minimum 60% marks (55% for SC/ST/PwBD).",
      "Professional / Specialist Qualification Certificates (CA/ICWA/LLB/MCI Registration) for specialist posts.",
      "Caste / Category Certificate (SC/ST/OBC-NCL/EWS) in Central Government Annexure format, where applicable."
    ],
    "officialLinks": [
      {
        "title": "Official Online Application Portal (IBPS)",
        "label": "Apply Online for NICL AO 2026 (ibpsonline.ibps.in)",
        "url": "https://ibpsonline.ibps.in/",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "National Insurance Company Official Portal",
        "label": "Visit NICL Official Website (nationalinsurance.nic.co.in)",
        "url": "https://nationalinsurance.nic.co.in",
        "linkType": "official"
      },
      {
        "title": "NICL Career & Recruitment Section",
        "label": "View Official Recruitment Notice & Corrigendum",
        "url": "https://nationalinsurance.nic.co.in/en/recruitment",
        "linkType": "official"
      },
      {
        "title": "Download Detailed Notification PDF",
        "label": "Download Official NICL AO 2026 Notification PDF",
        "url": "https://nationalinsurance.nic.co.in/en/recruitment",
        "linkType": "pdf"
      },
      {
        "title": "Crucial Age Cut-Off Calculator",
        "label": "Check Your Age Eligibility as on 01-10-2026",
        "url": "/tools/age",
        "linkType": "tool"
      },
      {
        "title": "7th CPC & Insurance Salary Calculator",
        "label": "Calculate In-Hand Monthly Take-Home Pay",
        "url": "/tools/salary",
        "linkType": "tool"
      }
    ],
    "howToApplySteps": [
      "Step 1: Open your browser and navigate to the official portal: https://nationalinsurance.nic.co.in and click on \"Recruitment\".",
      "Step 2: Locate the notification titled \"Recruitment of 321 Administrative Officers (Generalists & Specialists) (Scale-I) - 2026\" and click \"Apply Online\".",
      "Step 3: You will be redirected to the secure IBPS registration gateway (ibpsonline.ibps.in). Click on \"Click here for New Registration\".",
      "Step 4: Enter your basic contact details including Full Name, Mobile Number, and Email ID. A provisional Registration Number and Password will be sent via SMS and Email.",
      "Step 5: Upload your scanned Photograph (20–50 KB) and Signature in running handwriting (10–20 KB) adhering strictly to prescribed pixel dimensions.",
      "Step 6: Complete the Detailed Application: select Post Applied (Generalist or specific Specialist stream), Category, Exam Center preferences, and fill in complete graduation aggregate percentages.",
      "Step 7: Upload your Left Thumb Impression (20–50 KB) and the Handwritten Declaration (50–100 KB).",
      "Step 8: Thoroughly inspect the Application Preview window to verify every single detail before clicking Final Submit.",
      "Step 9: Proceed to the online payment gateway to submit the application fee (₹1,000 for UR/OBC/EWS, ₹250 for SC/ST/PwBD) using Debit Card, Credit Card, Net Banking, or UPI.",
      "Step 10: Download and print the payment confirmation receipt and the filled application form for your records during Document Verification."
    ],
    "faqs": [
      {
        "question": "What is the total number of vacancies announced in NICL AO Recruitment 2026?",
        "answer": "National Insurance Company Limited (NICL) has officially announced 321 vacancies for Administrative Officer (Scale-I). This comprises 200 Generalist posts and 121 Specialist posts across disciplines including Finance (30), Legal (20), IT (20), Automobile Engineering (15), Doctors (15), Actuarial (16), and Hindi (5)."
      },
      {
        "question": "What are the starting and ending dates for the online application?",
        "answer": "The online application portal opens on 08 October 2026 and closes on 28 October 2026 at 23:59 IST. The fee payment window also operates during the same timeline."
      },
      {
        "question": "What is the crucial cutoff date for age eligibility in NICL AO 2026?",
        "answer": "The crucial date for age calculation is 01 October 2026 (01.10.2026). Candidates must be aged between 21 and 30 years as on this date (born not earlier than 02.10.1996 and not later than 01.10.2005, both days inclusive). Standard category age relaxations apply (+3 years for OBC, +5 years for SC/ST, +10 years for PwBD)."
      },
      {
        "question": "What are the exam dates for NICL AO 2026 Phase-I and Phase-II?",
        "answer": "The Phase-I Preliminary Online Examination is scheduled for 17 November 2026. The Phase-II Main Online Examination and English Descriptive Test are scheduled for 22 December 2026."
      },
      {
        "question": "What is the starting salary and in-hand pay of an NICL Administrative Officer (Scale-I)?",
        "answer": "Scale-I Officers receive a revised basic pay of ₹50,925 in the scale of ₹50925-2500(14)-85925-2710(4)-96765. Total gross monthly emoluments stand at approximately ₹85,450 to ₹92,000 per month in metro cities, resulting in a net in-hand take-home salary of approximately ₹76,500 to ₹82,800 plus leased accommodation benefits, NPS, and medical cover."
      },
      {
        "question": "Is there a minimum percentage requirement in graduation for NICL AO Generalist?",
        "answer": "Yes. Candidates applying for Generalist posts must possess a Bachelor’s or Master’s degree from a recognized University with at least 60% aggregate marks for General, OBC, and EWS candidates, and 55% aggregate marks for SC, ST, and PwBD candidates."
      },
      {
        "question": "Is there negative marking in the NICL AO exam?",
        "answer": "Yes. A negative penalty of 0.25 marks (1/4th of the marks assigned to that question) will be deducted for every incorrect response in both Phase-I Preliminary and Phase-II Main objective examinations."
      },
      {
        "question": "Is there any service bond for candidates appointed as NICL AO?",
        "answer": "Yes. Candidates selected for appointment must execute a service undertaking bond to serve the company for a minimum duration of 4 years (including the 1-year probation period). Leaving prior to 4 years incurs liquidated damages as specified in the appointment letter."
      },
      {
        "question": "What is the official website to apply for NICL AO Recruitment 2026?",
        "answer": "Candidates can visit the official National Insurance Company website at https://nationalinsurance.nic.co.in/en/recruitment and apply online directly via the IBPS registration portal at https://ibpsonline.ibps.in/."
      }
    ],
    "preparationTips": [
      "Master 20-minute sectional time management: aim for 28+ attempts in Reasoning, 25+ in Quantitative Aptitude, and 22+ in English.",
      "Focus on High-Yield Puzzle Formats (Floor with Flat, Box, Square seating with vacant seats) to guarantee 15-20 marks within 10 minutes.",
      "Practice Simplification, Quadratic Inequalities, and Number Series daily for effortless 12-15 score banking.",
      "Read daily editorial columns to improve reading comprehension skimming speed and contextual vocabulary identification.",
      "Strictly avoid spending more than 2.5 minutes on a single arithmetic word problem or unfamiliar puzzle arrangement."
    ]
  },
  {
    "id": "admit-upsc-cse-mains-2026",
    "slug": "upsc-civil-services-mains-2026-e-admit-card-download",
    "category": "admit-card",
    "title": "UPSC Civil Services Mains 2026 e-Admit Card",
    "organization": "Union Public Service Commission (UPSC)",
    "examName": "Civil Services (Main) Examination 2026",
    "publishDate": "30 Sep 2026",
    "examDate": "16 Oct to 20 Oct 2026",
    "qualification": "Candidates Qualified in CSE Prelims 2026",
    "sourceNotice": {
      "title": "UPSC Civil Services Examination Notice",
      "url": "https://upsc.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "30 Sep 2026, 17:30 IST",
    "readTime": "5 min read",
    "summary": "The Union Public Service Commission (UPSC) has officially activated the e-Admit Card download window for the Civil Services (Main) Examination 2026 scheduled from 16th October to 20th October 2026 in forenoon (09:00 AM - 12:00 PM) and afternoon (02:30 PM - 05:30 PM) sessions across designated state centers.",
    "linkText": "Download UPSC CSE Mains e-Admit Card",
    "importantDates": [
      {
        "event": "e-Admit Card Release Date",
        "date": "30 September 2026"
      },
      {
        "event": "Mains Essay Paper (Paper-I)",
        "date": "16 October 2026 (09:00 AM – 12:00 PM)"
      },
      {
        "event": "General Studies I & II",
        "date": "17 October 2026"
      },
      {
        "event": "General Studies III & IV",
        "date": "18 October 2026"
      },
      {
        "event": "Indian Language & English Compulsory",
        "date": "19 October 2026"
      },
      {
        "event": "Optional Subject Paper I & II",
        "date": "20 October 2026"
      }
    ],
    "officialLinks": [
      {
        "title": "UPSC e-Admit Card Portal",
        "label": "Download Mains Hall Ticket (upsconline.nic.in)",
        "url": "https://upsconline.nic.in",
        "isPrimary": true,
        "linkType": "official"
      },
      {
        "title": "Official UPSC Commission",
        "label": "View Official Notice at upsc.gov.in",
        "url": "https://upsc.gov.in",
        "linkType": "official"
      },
      {
        "title": "Age Eligibility Calculator",
        "label": "Check 2027 Eligibility",
        "url": "/tools/age",
        "linkType": "tool"
      }
    ],
    "howToApplySteps": [
      "Visit the official UPSC online portal at https://upsconline.nic.in.",
      "Click on \"e-Admit Cards for Various Examinations of UPSC\".",
      "Locate \"Civil Services (Main) Examination, 2026\" and click Download.",
      "Select either \"By Registration ID (RID)\" or \"By Roll Number\".",
      "Input your 10-digit Registration ID / 7-digit Roll Number, Date of Birth, and Captcha code.",
      "Take 3 color printouts of the e-Admit Card on A4 paper along with the photo identity proof uploaded during DAF-I."
    ],
    "admitCardDetails": {
      "officialNoticeSummary": "UPSC has issued e-Admit Cards for Civil Services (Main) Examination 2026. Entry to examination venues closes 30 minutes prior to scheduled session commencement (08:30 AM for Forenoon Session and 02:00 PM for Afternoon Session). Candidates must carry original Photo ID matching DAF-I.",
      "downloadSteps": [
        "Visit official portal: https://upsconline.nic.in and click \"e-Admit Cards for Various Examinations\".",
        "Select Civil Services (Main) Examination 2026.",
        "Choose login option: By Registration ID (RID) or Roll Number.",
        "Enter Date of Birth and Captcha verification text.",
        "Print e-Admit Card on clear white A4 sheet with legible photograph and QR code."
      ],
      "detailsToCheck": [
        "Candidate Full Name & Roll Number matching DAF-I confirmation",
        "Examination Center Name, Sub-Center Code & Full Address",
        "Session Timings & Specific Medium of Examination (English/Hindi/Regional)",
        "Optional Subject code and paper sequence",
        "Candidate Photograph & Signature visibility"
      ],
      "itemsToCarry": [
        "Printed e-Admit Card hard copy (clearly legible)",
        "Original Photo ID Card (Aadhaar / Voter ID / Passport / Driving License) as cited in e-Admit Card",
        "Two recent identical passport-size photographs (in case of blurry print)",
        "Black ballpoint pens for marking attendance and completing descriptive answer booklets",
        "Transparent water bottle (analog wrist watch permitted, smartwatches banned)"
      ],
      "prohibitedItems": [
        "Mobile phones, pagers, smart devices, Bluetooth headsets, pen drives",
        "Digital wristwatches, fitness trackers, smart glasses",
        "Bags, notebooks, reference notes, loose sheets, geometric boxes"
      ],
      "ifDownloadFailsAdvice": "If unable to download due to server load, retry during early morning or late night hours. If Roll Number/RID is misplaced, use the \"Forgot RID\" facility on upsconline.nic.in with registered email ID. For critical errors, contact UPSC facilitation counter at 011-23385271.",
      "officialHelpdesk": {
        "phone": "011-23385271 / 011-23381125",
        "email": "feedback-upsc@gov.in",
        "portalUrl": "https://upsc.gov.in"
      }
    },
    "whoShouldApply": [
      "Candidates who cleared the Civil Services (Preliminary) Examination 2026 and submitted the Detailed Application Form-I (DAF-I).",
      "Shortlisted aspirants appearing for the 9 subjective descriptive papers scheduled between 16 and 20 October 2026."
    ],
    "whoShouldSkip": [
      "Candidates who did not qualify CSE Prelims 2026 or failed to submit DAF-I before the closing deadline.",
      "Candidates attempting to appear at an examination center other than the designated center specified on the hall ticket."
    ],
    "commonRejectionMistakes": [
      "Arriving after gate closure: Gate closure is enforced 30 minutes before session commencement (08:30 AM / 02:00 PM); no entry is permitted under any circumstances thereafter.",
      "Carrying a mobile phone inside the campus even in switched-off mode: Possession of cell phones inside the venue leads to 3-year debarment.",
      "Bringing photocopies or phone screenshots of photo ID: Entry strictly requires the original physical identity card.",
      "Using blue ink or gel pens on the attendance sheet: UPSC instructions strictly prescribe black ballpoint pen."
    ],
    "documentsNeeded": [
      "Printed copy of UPSC CSE Mains 2026 e-Admit Card (preferably 2 copies).",
      "Original Government Photo Identity Card as entered in DAF-I.",
      "Two recent passport-size photographs matching the uploaded image.",
      "Black ballpoint pens for attendance and answer script writing."
    ],
    "examPattern": [
      {
        "subject": "Paper A & B: Compulsory Indian Language & English",
        "questions": 300,
        "marks": 600,
        "time": "3 Hours Each (Qualifying 25% passing threshold)",
        "negativeMarking": "Subjective Descriptive (Marks not counted in merit)"
      },
      {
        "subject": "Paper I: Essay (Section A & B Topics)",
        "questions": 2,
        "marks": 250,
        "time": "3 Hours",
        "negativeMarking": "Evaluated on analytical clarity & structure"
      },
      {
        "subject": "Papers II to V: General Studies I, II, III & IV (250 Marks each)",
        "questions": 80,
        "marks": 1000,
        "time": "3 Hours Each (4 Separate Sessions)",
        "negativeMarking": "20 Questions per paper (10M and 15M word limits)"
      },
      {
        "subject": "Papers VI & VII: Optional Subject Paper I & II (250 Marks each)",
        "questions": 10,
        "marks": 500,
        "time": "3 Hours Each (5 Questions to attempt per paper)",
        "negativeMarking": "Advanced university honors standard"
      }
    ],
    "cutOffTrends": [
      {
        "year": "2023 CSE Mains Qualifying (Out of 1750)",
        "totalMarks": 1750,
        "general": 741,
        "obc": 712,
        "ews": 706,
        "sc": 694,
        "st": 692
      },
      {
        "year": "2022 CSE Mains Qualifying (Out of 1750)",
        "totalMarks": 1750,
        "general": 748,
        "obc": 714,
        "ews": 715,
        "sc": 699,
        "st": 700
      },
      {
        "year": "2021 CSE Mains Qualifying (Out of 1750)",
        "totalMarks": 1750,
        "general": 745,
        "obc": 707,
        "ews": 700,
        "sc": 700,
        "st": 700
      }
    ],
    "faqs": [
      {
        "question": "What are the session reporting timings and gate closure rules for UPSC CSE Mains?",
        "answer": "Forenoon sessions start at 09:00 AM (gates close strictly at 08:30 AM). Afternoon sessions start at 02:30 PM (gates close strictly at 02:00 PM). Candidates arriving even 1 minute past gate closure will be barred from entry without exception."
      },
      {
        "question": "What pen type is permissible in the UPSC Mains descriptive papers?",
        "answer": "Candidates can use blue or black ballpoint/fountain pens for writing answers inside the Question-cum-Answer Booklet (QCAB). However, all attendance lists, OMR circles, and title covers must be marked strictly with a black ballpoint pen."
      },
      {
        "question": "Are digital or smart watches allowed in the UPSC Mains test hall?",
        "answer": "No. Only simple analog wristwatches without electronic displays are allowed. Smartwatches, fitness trackers, and digital watches are strictly banned."
      },
      {
        "question": "What is the cutoff benchmark for getting an interview call in UPSC Mains?",
        "answer": "Based on recent 3-year cycles, General category candidates require approximately 741 to 748 marks out of 1,750 (approx 42.5%) in written descriptive papers to secure a Personality Test call."
      }
    ],
    "preparationTips": [
      "Print at least two clear copies of your e-Admit Card on clean A4 paper well in advance; do not wait until the exam morning.",
      "Locate your exact examination center on Google Maps one day prior to avoid last-minute transit delays or wrong center confusion.",
      "Carry strictly the original valid government photo ID card matching the exact name and DOB on your registration form.",
      "Adhere strictly to the gate closure schedule: entry gates close permanently 30 to 45 minutes prior to test commencement.",
      "Carry two passport photographs matching the application form for emergency verification at the facilitation counter."
    ],
    "syllabusTopics": [
      {
        "subject": "General Studies Papers I to IV (Mains Curriculum)",
        "weightage": "1000 Marks Total (250 Marks Each)",
        "topics": [
          "GS-I: Indian Heritage and Culture, History and Geography of the World and Society",
          "GS-II: Governance, Constitution, Polity, Social Justice and International Relations",
          "GS-III: Technology, Economic Development, Bio-diversity, Environment, Security and Disaster Management",
          "GS-IV: Ethics, Integrity and Aptitude (Case studies on administrative dilemmas)"
        ]
      },
      {
        "subject": "Essay & Optional Papers (Paper I & II)",
        "weightage": "750 Marks Total",
        "topics": [
          "Essay Paper (250 Marks): Two thematic analytical essays across philosophical and socio-economic dimensions",
          "Optional Subject Paper I & II (500 Marks): Advanced university specialization curriculum"
        ]
      }
    ]
  },
  {
    "id": "admit-ssc-cgl-tier1-2026-all",
    "slug": "ssc-cgl-2026-tier-1-admit-card-all-regions-download",
    "category": "admit-card",
    "title": "SSC CGL 2026 Tier-1 Admit Card & Shift Schedule",
    "organization": "Staff Selection Commission (SSC)",
    "examName": "Combined Graduate Level Exam (CGL) 2026 Tier-1 CBT",
    "publishDate": "30 Sep 2026",
    "examDate": "14 Oct to 26 Oct 2026",
    "qualification": "CGL Tier-1 Registered Candidates",
    "sourceNotice": {
      "title": "Staff Selection Commission Notice Board",
      "url": "https://ssc.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "30 Sep 2026, 16:45 IST",
    "readTime": "6 min read",
    "summary": "Staff Selection Commission has uploaded the Tier-1 Admission Certificates and Exam City Allotment status across all 9 regional portals (NR, CR, ER, WR, SR, KKR, MPR, NWR, and NER). Tier-1 Computer Based Examination will be conducted in 4 daily shifts between 14th and 26th October 2026.",
    "linkText": "Download Region-Wise SSC CGL Hall Ticket",
    "importantDates": [
      {
        "event": "All-Region Hall Ticket Uploaded",
        "date": "30 September 2026"
      },
      {
        "event": "Tier-1 CBT All India Exam Window",
        "date": "14 October to 26 October 2026"
      },
      {
        "event": "Shift Timings (4 Daily Shifts)",
        "date": "Shift 1: 09:00 AM | Shift 2: 11:45 AM | Shift 3: 02:30 PM | Shift 4: 05:15 PM"
      }
    ],
    "officialLinks": [
      {
        "title": "SSC Headquarter Portal",
        "label": "Download Admit Card (ssc.gov.in)",
        "url": "https://ssc.gov.in",
        "isPrimary": true,
        "linkType": "official"
      },
      {
        "title": "PYQ CBT Simulator",
        "label": "Practice SSC CGL Mock CBT",
        "url": "/mock-test/ssc-cgl-tier1",
        "linkType": "tool"
      },
      {
        "title": "Negative Marking Tool",
        "label": "Verify 0.50 Penalty Score",
        "url": "/tools/marking",
        "linkType": "tool"
      }
    ],
    "howToApplySteps": [
      "Visit your designated SSC regional website or central portal https://ssc.gov.in.",
      "Click on the \"Admit Card\" tab and select your regional sub-portal (e.g. NR, CR, WR).",
      "Click \"STATUS / DOWNLOAD ADMIT CARD FOR COMBINED GRADUATE LEVEL EXAM (TIER-1) 2026\".",
      "Provide your Registration ID / Roll Number and Date of Birth.",
      "Download and print the Hall Ticket on A4 size paper along with COVID-19 self-declaration."
    ],
    "admitCardDetails": {
      "officialNoticeSummary": "Staff Selection Commission has uploaded Tier-1 Admission Certificates across all 9 regional sub-portals. Exam runs in 4 daily shifts across India from 14 to 26 October 2026. Gate closes strictly 30 minutes before each shift starts.",
      "downloadSteps": [
        "Visit your respective regional SSC portal (NR: sscnr.nic.in, CR: ssc-cr.org, WR: sscwr.net, ER: sscer.org, SR: sscsr.gov.in).",
        "Click on \"STATUS / DOWNLOAD ADMIT CARD FOR COMBINED GRADUATE LEVEL EXAMINATION (TIER-1) 2026\".",
        "Enter Registration Number or Roll Number and Date of Birth (DD/MM/YYYY).",
        "Download Admission Certificate and print on clear A4 paper."
      ],
      "detailsToCheck": [
        "Candidate Name, Roll Number, Ticket Number and Category",
        "Exact Exam Shift, Reporting Time, and Gate Closing Time",
        "Examination Venue Name, Landmark, and Center Code",
        "Candidate Photograph & Signature clarity"
      ],
      "itemsToCarry": [
        "Printed copy of SSC CGL Tier-1 Admit Card",
        "Two recent passport-size color photographs (identical to the application form)",
        "Original valid Photo ID with complete Date of Birth matching the admit card (Aadhaar, Voter ID, Driving License, Passport)",
        "Original Matriculation Certificate (if the Photo ID lacks complete DD/MM/YYYY birth date)"
      ],
      "prohibitedItems": [
        "Mobile phones, Bluetooth earphones, fitness bands, digital watches",
        "Belts with large metallic buckles, metallic jewelry, caps",
        "Bags, wallets, books, and study material (no cloakroom guarantee at private centers)"
      ],
      "ifDownloadFailsAdvice": "If the portal displays \"Application Rejected\", check the reason column for photo/signature non-compliance. If accepted but admit card is not generating, contact your regional SSC helpline with your Registration ID.",
      "officialHelpdesk": {
        "phone": "011-24363343 (SSC HQ) / 011-24360840",
        "email": "enquiry-ssc@nic.in",
        "portalUrl": "https://ssc.gov.in"
      }
    },
    "whoShouldApply": [
      "Candidates who submitted successful online applications for SSC CGL 2026 and whose application status was marked \"Provisionally Accepted\".",
      "Aspirants scheduled across the 4 daily shifts between 14th and 26th October 2026."
    ],
    "whoShouldSkip": [
      "Candidates whose applications were rejected due to blurred photo, selfie webcam capture, or multiple form submissions.",
      "Candidates seeking entry after gate closing time (08:30 AM / 11:15 AM / 02:00 PM / 04:45 PM)."
    ],
    "commonRejectionMistakes": [
      "Photo ID missing Date of Birth: If your Aadhaar card only mentions the birth year (YYYY) and not full date (DD/MM/YYYY), you MUST carry your 10th mark sheet; otherwise entry is denied.",
      "Arriving after gate closure: Biometric registration gates close strictly 30 minutes prior to exam commencement.",
      "Wearing prohibited ornaments or heavy shoes: SSC frisking teams disallow smart accessories and metallic buckles."
    ],
    "documentsNeeded": [
      "Printed SSC CGL Tier-1 Admit Card (hard copy).",
      "Two recent passport-size color photographs.",
      "Original Government Photo ID having complete Date of Birth (Aadhaar / Voter ID / Passport / Driving License).",
      "Original 10th Class Mark Sheet / Passing Certificate (if Photo ID has incomplete DOB)."
    ],
    "examPattern": [
      {
        "subject": "General Intelligence and Reasoning",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Marks per incorrect answer"
      },
      {
        "subject": "General Awareness",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Marks per incorrect answer"
      },
      {
        "subject": "Quantitative Aptitude",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Marks per incorrect answer"
      },
      {
        "subject": "English Comprehension",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Marks per incorrect answer"
      }
    ],
    "cutOffTrends": [
      {
        "year": "2024 Tier-1 Normalized (General Posts List-3)",
        "totalMarks": 200,
        "general": 153.48,
        "obc": 152.12,
        "ews": 148.95,
        "sc": 136.2,
        "st": 125.6
      },
      {
        "year": "2023 Tier-1 Normalized (General Posts List-3)",
        "totalMarks": 200,
        "general": 150.04,
        "obc": 145.93,
        "ews": 143.44,
        "sc": 126.68,
        "st": 118.16
      },
      {
        "year": "2022 Tier-1 Normalized (General Posts List-3)",
        "totalMarks": 200,
        "general": 114.27,
        "obc": 114.27,
        "ews": 102.35,
        "sc": 89.08,
        "st": 77.56
      }
    ],
    "faqs": [
      {
        "question": "What are the 4 daily shift timings for SSC CGL Tier-1 2026?",
        "answer": "Shift 1: 09:00 AM to 10:00 AM (Reporting 07:45 AM, Gate Closure 08:30 AM); Shift 2: 11:45 AM to 12:45 PM (Reporting 10:30 AM, Gate Closure 11:15 AM); Shift 3: 02:30 PM to 03:30 PM (Reporting 01:15 PM, Gate Closure 02:00 PM); Shift 4: 05:15 PM to 06:15 PM (Reporting 04:00 PM, Gate Closure 04:45 PM)."
      },
      {
        "question": "What should I do if my name spelling on the admit card differs from my ID card?",
        "answer": "Carry your original 10th Matriculation certificate and affidavit of name variance, along with two identical passport photographs. Report to the center superintendent 1 hour before scheduled gate closure for manual verification."
      },
      {
        "question": "Is rough paper provided at the examination center?",
        "answer": "Yes. Candidates are provided with rough paper sheets and a pen/pencil if required at the workstation. Candidates must write their Roll Number and Name on all rough sheets and return them to the invigilator before leaving."
      },
      {
        "question": "How many days before the exam is the regional admit card activated for download?",
        "answer": "Application status and city intimation are live 10 to 14 days in advance, while the actual Admission Certificate containing the test venue address is activated 4 days prior to your individual exam date."
      }
    ],
    "preparationTips": [
      "Print at least two clear copies of your e-Admit Card on clean A4 paper well in advance; do not wait until the exam morning.",
      "Locate your exact examination center on Google Maps one day prior to avoid last-minute transit delays or wrong center confusion.",
      "Carry strictly the original valid government photo ID card matching the exact name and DOB on your registration form.",
      "Adhere strictly to the gate closure schedule: entry gates close permanently 30 to 45 minutes prior to test commencement.",
      "Carry two passport photographs matching the application form for emergency verification at the facilitation counter."
    ],
    "syllabusTopics": [
      {
        "subject": "Tier-1 CBT Core Sections",
        "weightage": "200 Marks / 100 Questions",
        "topics": [
          "General Intelligence & Reasoning (50 Marks / 25 Qs): Analogies, series, syllogism, non-verbal matrices",
          "General Awareness (50 Marks / 25 Qs): Indian history, polity, geography, general science, economic survey",
          "Quantitative Aptitude (50 Marks / 25 Qs): Arithmetic, algebra, geometry, mensuration, trigonometry",
          "English Comprehension (50 Marks / 25 Qs): Grammar error spotting, idioms, synonyms, cloze passage"
        ]
      }
    ]
  },
  {
    "id": "admit-rrb-alp-cbt1-2026",
    "slug": "rrb-alp-cbt-1-city-intimation-admit-card-cen-01-2026",
    "category": "admit-card",
    "title": "RRB ALP CEN 01/2026 CBT-1 City Slip & Admit Card",
    "organization": "Ministry of Railways (Railway Recruitment Boards)",
    "examName": "Assistant Loco Pilot (ALP) CEN 01/2026 CBT-1 Examination",
    "publishDate": "30 Sep 2026",
    "examDate": "22 Oct to 29 Oct 2026",
    "qualification": "Matriculation + ITI / Diploma / Engineering Degree",
    "sourceNotice": {
      "title": "RRB Centralised Employment Notice Portal (CEN 01/2026)",
      "url": "https://www.rrbapply.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "30 Sep 2026, 15:10 IST",
    "readTime": "5 min read",
    "summary": "Railway Recruitment Boards have activated the Exam City & Date Intimation Slip along with Travel Pass for SC/ST candidates for the CEN 01/2026 Assistant Loco Pilot CBT-1 exam. Official e-Call Letters are downloadable 4 days prior to exam date with Aadhaar biometric verification at test centers.",
    "linkText": "Check Exam City & Download ALP Call Letter",
    "importantDates": [
      {
        "event": "City Intimation & Travel Pass Live",
        "date": "30 September 2026"
      },
      {
        "event": "Official E-Call Letter Available",
        "date": "18 October 2026 onwards (4 days prior)"
      },
      {
        "event": "CBT-1 Multi-Shift Exam Dates",
        "date": "22 October to 29 October 2026"
      }
    ],
    "admitCardDetails": {
      "officialNoticeSummary": "Railway Recruitment Boards have released CBT-1 City Intimation Slip and free railway travel passes for SC/ST candidates. Final e-Call Letters with specific exam center names are available 4 days before individual exam dates. Aadhaar-linked biometric verification will be conducted at exam venues.",
      "downloadSteps": [
        "Visit the centralized RRB portal https://www.rrbapply.gov.in or your regional RRB website.",
        "Click on CEN 01/2026 (ALP) - City Intimation & E-Call Letter Download.",
        "Enter your Registration Number and User Password (Date of Birth).",
        "Download and print the e-Call Letter on A4 paper along with the lower portion counterfoil."
      ],
      "detailsToCheck": [
        "Candidate Roll Number, Registration Number, and Test Center Code",
        "CBT-1 Shift Number, Reporting Time, Gate Closure Time, and Exam Start Time",
        "Exam Center Address with Google Maps landmark details",
        "Travel Authority Pass details for SC/ST candidates"
      ],
      "itemsToCarry": [
        "Original printed RRB ALP CBT-1 e-Call Letter",
        "Original Aadhaar Card (mandatory for biometric authentication at test center)",
        "One recent color passport photograph (35mm x 45mm) to paste on call letter counterfoil",
        "Valid photo ID (Voter ID, Driving License, PAN, Passport) as alternative identity proof"
      ],
      "prohibitedItems": [
        "Mobile phones, Bluetooth devices, smartwatches, calculators, earphones",
        "Metallic jewelry, belts, wallets, bags, electronic pens"
      ],
      "ifDownloadFailsAdvice": "Call letters are released in batches exactly 4 days before your specific exam date. If you see your city slip but cannot download the call letter, check whether your exam date falls within the active 4-day release window.",
      "officialHelpdesk": {
        "phone": "9592-001-188 / 0172-2730093",
        "email": "rrb.help@gov.in",
        "portalUrl": "https://www.rrbapply.gov.in"
      }
    },
    "whoShouldApply": [
      "Candidates who applied under CEN 01/2026 for Assistant Loco Pilot posts with valid application submission status.",
      "Aspirants with exam scheduled between 22 and 29 October 2026 across Indian test centers."
    ],
    "whoShouldSkip": [
      "Candidates whose applications were rejected during the preliminary scrutiny stage.",
      "Candidates reporting after biometric gate closure time."
    ],
    "commonRejectionMistakes": [
      "Forgetting the original Aadhaar Card: RRB conducts strict Aadhaar biometric fingerprint matching; entry is denied without original Aadhaar or approved biometric bypass verification.",
      "Signing the call letter counterfoil at home: The counterfoil MUST be signed in front of the invigilator inside the exam hall.",
      "Reaching after gate closing: Shift gates lock exactly at the appointed cutoff time."
    ],
    "documentsNeeded": [
      "Printed RRB ALP e-Call Letter (complete page with candidate counterfoil).",
      "Original Aadhaar Card (mandatory).",
      "One recent passport-size photograph identical to application photo.",
      "Original Photo Identity Card (if Aadhaar requires backup corroboration)."
    ],
    "examPattern": [
      {
        "subject": "Mathematics (Number Systems, Algebra, Geometry, Arithmetic)",
        "questions": 20,
        "marks": 20,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.33 Negative Marks (1/3rd deduction)"
      },
      {
        "subject": "General Intelligence and Reasoning",
        "questions": 25,
        "marks": 25,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.33 Negative Marks (1/3rd deduction)"
      },
      {
        "subject": "General Science (Physics, Chemistry, Life Sciences up to 10th standard)",
        "questions": 20,
        "marks": 20,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.33 Negative Marks (1/3rd deduction)"
      },
      {
        "subject": "General Awareness on Current Affairs",
        "questions": 10,
        "marks": 10,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.33 Negative Marks (1/3rd deduction)"
      }
    ],
    "cutOffTrends": [
      {
        "year": "2024 CBT-1 Normalized Target (Out of 75)",
        "totalMarks": 75,
        "general": 48.5,
        "obc": 44.8,
        "ews": 42.1,
        "sc": 38.4,
        "st": 32.2
      },
      {
        "year": "2018 CBT-1 Qualifying Threshold (Out of 75)",
        "totalMarks": 75,
        "general": 40,
        "obc": 30,
        "ews": 30,
        "sc": 30,
        "st": 25
      }
    ],
    "faqs": [
      {
        "question": "Is the CBT-1 score counted towards final merit for Assistant Loco Pilot?",
        "answer": "No. CBT-1 is purely a screening test to shortlist candidates for CBT-2 at a 1:15 ratio per vacancy. Final selection is decided based on 70% weightage on CBT-2 Part A and 30% weightage on the Computer Based Aptitude Test (CBAT)."
      },
      {
        "question": "What is the passing rule for CBT-2 Part B (Trade Test)?",
        "answer": "Part B is qualifying in nature and requires a minimum pass mark of 35% for all candidates without any category concession. Failing Part B results in disqualification regardless of high marks in Part A."
      },
      {
        "question": "What medical standard is required for Assistant Loco Pilot?",
        "answer": "ALP demands strict A-1 medical fitness: 6/6 distance vision without glasses, near vision Sn. 0.6 without glasses, normal color vision, and passed field of vision / binocular tests. LASIK laser eye surgery is strictly disqualified."
      },
      {
        "question": "When can candidates download their final printable ALP e-Call Letter?",
        "answer": "While the City Intimation Slip is viewable 10 days before the exam, the actual E-Call Letter specifying the venue and room number becomes downloadable exactly 4 days prior to your allocated test date."
      }
    ],
    "officialLinks": [
      {
        "title": "RRB Official Portal",
        "label": "Login to Check City Slip (rrbcdg.gov.in)",
        "url": "https://www.rrbcdg.gov.in",
        "isPrimary": true,
        "linkType": "official"
      },
      {
        "title": "Negative Marking Tool",
        "label": "Calculate Railway CBT 1/3rd Penalty",
        "url": "/tools/marking",
        "linkType": "tool"
      },
      {
        "title": "Salary Calculator",
        "label": "View ALP Level 2 Pay & Running Allowances",
        "url": "/tools/salary",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Print at least two clear copies of your e-Admit Card on clean A4 paper well in advance; do not wait until the exam morning.",
      "Locate your exact examination center on Google Maps one day prior to avoid last-minute transit delays or wrong center confusion.",
      "Carry strictly the original valid government photo ID card matching the exact name and DOB on your registration form.",
      "Adhere strictly to the gate closure schedule: entry gates close permanently 30 to 45 minutes prior to test commencement.",
      "Carry two passport photographs matching the application form for emergency verification at the facilitation counter."
    ],
    "syllabusTopics": [
      {
        "subject": "CBT-1 Examination Subjects",
        "weightage": "75 Marks / 75 Questions (60 Mins)",
        "topics": [
          "Mathematics (20 Qs): Number system, BODMAS, decimals, fractions, LCM/HCF, ratio, percentages",
          "General Intelligence & Reasoning (25 Qs): Analogies, alphabetical series, coding-decoding, Venn diagrams",
          "General Science (20 Qs): Physics, Chemistry, and Life Sciences of 10th standard CBSE level",
          "General Awareness on Current Affairs (10 Qs): Science & technology, sports, culture, personalities, economics"
        ]
      }
    ]
  },
  {
    "id": "admit-ibps-clerk-xiv-prelims",
    "slug": "ibps-clerk-xiv-prelims-call-letter-admit-card-2026",
    "category": "admit-card",
    "title": "IBPS Clerk XIV Prelims 2026 Call Letter Notice",
    "organization": "Institute of Banking Personnel Selection (IBPS)",
    "examName": "Common Recruitment Process for Clerks (CRP CSA/Clerks-XIV)",
    "publishDate": "30 Sep 2026",
    "examDate": "10, 11 & 12 Oct 2026",
    "qualification": "CRP Clerks-XIV Registered Aspirants",
    "sourceNotice": {
      "title": "IBPS Online Services Portal (CRP Clerks-XIV)",
      "url": "https://www.ibps.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "30 Sep 2026, 14:00 IST",
    "readTime": "4 min read",
    "summary": "The Institute of Banking Personnel Selection has released the online Prelims examination call letter for clerical cadre posts in 11 participating public sector banks. Candidates must bring 2 recent passport-size photographs, original valid photo ID, and an ID photocopy to the examination venue.",
    "linkText": "Download IBPS Clerk Prelims Call Letter",
    "importantDates": [
      {
        "event": "Online Call Letter Download Window",
        "date": "30 September to 12 October 2026"
      },
      {
        "event": "Prelims Online CBT Exam",
        "date": "10, 11 and 12 October 2026"
      },
      {
        "event": "Prelims Result Declaration",
        "date": "Late October 2026"
      }
    ],
    "admitCardDetails": {
      "officialNoticeSummary": "IBPS Clerk XIV Preliminary online examination call letters are live. Candidates must carry the call letter with a recent photograph pasted on it, along with 2 additional photographs, original valid photo ID, and a legible photocopy of that same ID stapled to the call letter.",
      "downloadSteps": [
        "Open official portal https://www.ibps.in and click CRP Clerks-XIV.",
        "Click on \"Online Preliminary Examination Call Letter for CRP Clerks-XIV\".",
        "Enter Registration Number / Roll Number and Password (Date of Birth).",
        "Download call letter and print on clear A4 paper."
      ],
      "detailsToCheck": [
        "Candidate Name, Roll Number, Registration Number, and Category",
        "Exam Date, Shift Reporting Time, and Venue Code",
        "Exact Exam Center Address with Landmark",
        "Space for Pasting Photograph and Thumb Impression"
      ],
      "itemsToCarry": [
        "Printed IBPS Clerk Call Letter with recent color photograph pasted in designated box",
        "Two additional identical passport-size color photographs",
        "Original valid Photo ID (Aadhaar, PAN, Voter ID, Passport, Driving License)",
        "Clear photocopy of the same Photo ID (mandatory to staple with call letter)",
        "Simple blue or black ballpoint pen"
      ],
      "prohibitedItems": [
        "Mobile phones, smartwatches, digital calculators, Bluetooth devices",
        "Wallets, purses, bags, geometry boxes, food items"
      ],
      "ifDownloadFailsAdvice": "Verify your Registration Number and Password from the original SMS/email received during registration. Clear browser cache or use Google Chrome in incognito mode if captcha fails.",
      "officialHelpdesk": {
        "phone": "1800-222-366 / 1800-103-4566",
        "email": "ibpso@ibps.in",
        "portalUrl": "https://cgrs.ibps.in"
      }
    },
    "whoShouldApply": [
      "Candidates registered for CRP Clerks-XIV across 11 nationalized public sector banks.",
      "Aspirants scheduled to appear in the 100-mark Preliminary CBT on 10, 11, or 12 October 2026."
    ],
    "whoShouldSkip": [
      "Candidates whose registrations were canceled due to multiple incomplete payments or invalid certificates.",
      "Candidates arriving after the reporting gate closure."
    ],
    "commonRejectionMistakes": [
      "Forgetting the photocopy of the Photo ID: IBPS exam centers strictly collect the ID photocopy stapled to the call letter; candidates without a photocopy are turned away from the entry queue.",
      "Failing to bring additional photographs: Two spare photos must be carried for the attendance sheet.",
      "Putting left thumb impression at home: Thumb impression and signature must be completed only in the presence of the invigilator."
    ],
    "documentsNeeded": [
      "Printed IBPS Clerk Prelims Call Letter with pasted photograph.",
      "Original Government Photo Identity Card.",
      "Photocopy of the Photo Identity Card (stapled with call letter).",
      "Two additional passport-size photographs matching application upload."
    ],
    "examPattern": [
      {
        "subject": "English Language",
        "questions": 30,
        "marks": 30,
        "time": "20 Minutes Sectional",
        "negativeMarking": "0.25 Negative Marks per incorrect answer"
      },
      {
        "subject": "Numerical Ability",
        "questions": 35,
        "marks": 35,
        "time": "20 Minutes Sectional",
        "negativeMarking": "0.25 Negative Marks per incorrect answer"
      },
      {
        "subject": "Reasoning Ability",
        "questions": 35,
        "marks": 35,
        "time": "20 Minutes Sectional",
        "negativeMarking": "0.25 Negative Marks per incorrect answer"
      }
    ],
    "cutOffTrends": [
      {
        "year": "2023 Prelims (Uttar Pradesh State UR)",
        "totalMarks": 100,
        "general": 79.25,
        "obc": 77,
        "ews": 77.25,
        "sc": 69.5,
        "st": 54
      },
      {
        "year": "2023 Prelims (Delhi State UR)",
        "totalMarks": 100,
        "general": 78.25,
        "obc": 74.5,
        "ews": 76,
        "sc": 68.75,
        "st": 58.25
      },
      {
        "year": "2022 Prelims (Uttar Pradesh State UR)",
        "totalMarks": 100,
        "general": 84,
        "obc": 81.5,
        "ews": 82.5,
        "sc": 74.25,
        "st": 60
      }
    ],
    "faqs": [
      {
        "question": "Is a physical photocopy of the Government Photo ID mandatory for entry?",
        "answer": "Yes. IBPS test center staff strictly collect a paper photocopy of your photo identity card stapled directly behind your call letter. Candidates without a physical ID photocopy will be turned away from the entry queue."
      },
      {
        "question": "Can I switch between sections during IBPS Clerk Prelims?",
        "answer": "No. IBPS enforces strict 20-minute individual sectional timers for English, Numerical Ability, and Reasoning. Once a 20-minute window expires, the section is auto-submitted and locked."
      },
      {
        "question": "Are there minimum sectional cut-offs in IBPS Clerk Prelims?",
        "answer": "Yes. Candidates must clear both the minimum sectional cut-offs in each of the three subjects and the state-wise overall aggregate cut-off to qualify for the Main examination."
      },
      {
        "question": "What are the daily shift timings for IBPS Clerk Prelims?",
        "answer": "Shift 1: 09:00 AM to 10:00 AM (Reporting 08:00 AM); Shift 2: 11:30 AM to 12:30 PM (Reporting 10:30 AM); Shift 3: 02:00 PM to 03:00 PM (Reporting 01:00 PM); Shift 4: 04:30 PM to 05:30 PM (Reporting 03:30 PM)."
      }
    ],
    "officialLinks": [
      {
        "title": "IBPS Official Portal",
        "label": "Download Call Letter (ibps.in)",
        "url": "https://www.ibps.in",
        "isPrimary": true,
        "linkType": "official"
      },
      {
        "title": "Marking Score Calculator",
        "label": "Simulate 0.25 Marking Trajectory",
        "url": "/tools/marking",
        "linkType": "tool"
      },
      {
        "title": "Salary Calculator",
        "label": "View 12th Bipartite Clerical Salary",
        "url": "/tools/salary",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Print at least two clear copies of your e-Admit Card on clean A4 paper well in advance; do not wait until the exam morning.",
      "Locate your exact examination center on Google Maps one day prior to avoid last-minute transit delays or wrong center confusion.",
      "Carry strictly the original valid government photo ID card matching the exact name and DOB on your registration form.",
      "Adhere strictly to the gate closure schedule: entry gates close permanently 30 to 45 minutes prior to test commencement.",
      "Carry two passport photographs matching the application form for emergency verification at the facilitation counter."
    ],
    "syllabusTopics": [
      {
        "subject": "CRP Clerks XIV Preliminary Subjects",
        "weightage": "100 Marks / 100 Questions (60 Mins)",
        "topics": [
          "English Language (30 Qs / 30 Marks / 20 Mins): Reading comprehension, cloze test, spotting errors",
          "Numerical Ability (35 Qs / 35 Marks / 20 Mins): Simplification, quadratic equations, number series, arithmetic",
          "Reasoning Ability (35 Qs / 35 Marks / 20 Mins): Puzzles, seating arrangement, syllogisms, blood relations"
        ]
      }
    ]
  },
  {
    "id": "admit-ibps-po-xv-prelims",
    "slug": "ibps-po-xv-prelims-admit-card-download-2026",
    "category": "admit-card",
    "title": "IBPS PO XV Prelims 2026 Admit Card & Exam Shift",
    "organization": "Institute of Banking Personnel Selection (IBPS)",
    "examName": "CRP PO/MT-XV for Probationary Officers in 11 PSBs",
    "publishDate": "30 Sep 2026",
    "examDate": "17 to 18 Oct 2026",
    "qualification": "Bank PO Applicants",
    "sourceNotice": {
      "title": "IBPS Central Notice (CRP PO/MT-XV)",
      "url": "https://www.ibps.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "30 Sep 2026, 12:30 IST",
    "readTime": "5 min read",
    "summary": "IBPS has released the online Preliminary exam hall ticket for Probationary Officer / Management Trainee (CRP PO/MT-XV) posts across 11 nationalized public sector banks. Prelims tests English Language (30Q), Quantitative Aptitude (35Q), and Reasoning Ability (35Q) with 20-minute individual sectional timers.",
    "linkText": "Download IBPS PO Admit Card",
    "importantDates": [
      {
        "event": "Admit Card Download Live",
        "date": "30 September 2026"
      },
      {
        "event": "Prelims Online Exam Dates",
        "date": "17 and 18 October 2026"
      },
      {
        "event": "Mains Examination Date",
        "date": "November 2026"
      }
    ],
    "admitCardDetails": {
      "officialNoticeSummary": "CRP PO/MT-XV Preliminary CBT hall tickets are active on ibps.in. The 100-mark screening test tests English (30Q), Quantitative Aptitude (35Q), and Reasoning Ability (35Q) with strict 20-minute sectional timers and 1/4th negative marking penalty.",
      "downloadSteps": [
        "Visit IBPS portal: https://www.ibps.in and click CRP PO/MT-XV.",
        "Select \"Download Online Preliminary Exam Call Letter for CRP PO/MT-XV\".",
        "Enter Registration Number and Password (DOB in DD-MM-YYYY format).",
        "Print the call letter on clean A4 paper."
      ],
      "detailsToCheck": [
        "Candidate Full Name & Roll Number",
        "Reporting Shift, Gate Closure Time, and Venue Code",
        "Venue Address & City",
        "Space for Photo pasting and Signature"
      ],
      "itemsToCarry": [
        "Printed IBPS PO Prelims Call Letter with recent photograph pasted in the box",
        "Two additional identical passport-size color photographs",
        "Original valid Photo ID Proof (Aadhaar, PAN, Voter ID, Passport, Driving License)",
        "Self-attested photocopy of the valid Photo ID Proof (stapled with call letter)",
        "Transparent blue/black ballpoint pen"
      ],
      "prohibitedItems": [
        "Mobile phones, fitness bands, smartwatches, Bluetooth earphones",
        "Wallets, metallic jewelry, bags, books, loose papers"
      ],
      "ifDownloadFailsAdvice": "Ensure you enter your Date of Birth in exact DD-MM-YYYY format with hyphens. If registration credentials are lost, retrieve them using the \"Forgot Password\" link on the login page.",
      "officialHelpdesk": {
        "phone": "1800-222-366 / 1800-103-4566",
        "email": "ibpso@ibps.in",
        "portalUrl": "https://cgrs.ibps.in"
      }
    },
    "whoShouldApply": [
      "Candidates who submitted complete applications for CRP PO/MT-XV across 11 participating public sector banks.",
      "Aspirants scheduled to appear in the Preliminary CBT on 17 or 18 October 2026."
    ],
    "whoShouldSkip": [
      "Candidates whose registrations were disqualified due to duplicate submissions or non-payment.",
      "Candidates reporting past the designated gate closing time."
    ],
    "commonRejectionMistakes": [
      "Missing the ID proof photocopy: Failure to bring a physical paper photocopy of your government photo ID leads to immediate disqualification at the gate.",
      "Bringing old or mismatched photographs: The pasted photograph should match the uploaded registration photo.",
      "Failing to manage the strict 20-minute sectional timer: Candidates cannot toggle between sections once a 20-minute window begins."
    ],
    "documentsNeeded": [
      "Printed copy of IBPS PO XV Prelims Call Letter with pasted photograph.",
      "Original Government Photo Identity Card.",
      "Photocopy of the Photo Identity Card (stapled with call letter).",
      "Two additional passport-size photographs matching the application form."
    ],
    "examPattern": [
      {
        "subject": "English Language",
        "questions": 30,
        "marks": 30,
        "time": "20 Minutes Sectional",
        "negativeMarking": "0.25 Negative Marks per incorrect answer"
      },
      {
        "subject": "Quantitative Aptitude",
        "questions": 35,
        "marks": 35,
        "time": "20 Minutes Sectional",
        "negativeMarking": "0.25 Negative Marks per incorrect answer"
      },
      {
        "subject": "Reasoning Ability",
        "questions": 35,
        "marks": 35,
        "time": "20 Minutes Sectional",
        "negativeMarking": "0.25 Negative Marks per incorrect answer"
      }
    ],
    "cutOffTrends": [
      {
        "year": "2023 Prelims Overall Cut-Off",
        "totalMarks": 100,
        "general": 54.25,
        "obc": 54.25,
        "ews": 54.25,
        "sc": 49,
        "st": 43
      },
      {
        "year": "2022 Prelims Overall Cut-Off",
        "totalMarks": 100,
        "general": 49.75,
        "obc": 49.75,
        "ews": 49.75,
        "sc": 46.75,
        "st": 40.75
      },
      {
        "year": "2021 Prelims Overall Cut-Off",
        "totalMarks": 100,
        "general": 50.5,
        "obc": 50.5,
        "ews": 50.5,
        "sc": 44.5,
        "st": 38
      }
    ],
    "faqs": [
      {
        "question": "What are the individual sectional cut-offs for IBPS PO Prelims?",
        "answer": "In the previous cycle, sectional qualifying marks for General were: English 8.75/30, Quantitative Aptitude 8.50/35, and Reasoning Ability 10.75/35. Aspirants must clear all three sectional minimums in addition to the overall aggregate cutoff."
      },
      {
        "question": "Are Prelims marks factored into final merit selection?",
        "answer": "No. Preliminary examination scores serve solely as a screening gate to shortlist candidates for the Main examination in a 1:10 ratio. Final appointment merit is determined by 80% weightage on the Mains score and 20% on the Personal Interview."
      },
      {
        "question": "What is the rule regarding the ID proof photocopy at the exam center?",
        "answer": "Candidates must carry the original photo identity card and hand over a paper photocopy stapled to the admit card to the invigilator. Candidates without an ID photocopy will be disqualified at the verification desk."
      },
      {
        "question": "What are the shift reporting hours for IBPS PO Prelims?",
        "answer": "Shift 1: 09:00 AM to 10:00 AM (Reporting 08:00 AM); Shift 2: 11:30 AM to 12:30 PM (Reporting 10:30 AM); Shift 3: 02:00 PM to 03:00 PM (Reporting 01:00 PM); Shift 4: 04:30 PM to 05:30 PM (Reporting 03:30 PM)."
      }
    ],
    "officialLinks": [
      {
        "title": "IBPS PO Portal",
        "label": "Download PO Hall Ticket (ibps.in)",
        "url": "https://www.ibps.in",
        "isPrimary": true,
        "linkType": "official"
      },
      {
        "title": "Marking Score Calculator",
        "label": "Simulate 0.25 Marking Trajectory",
        "url": "/tools/marking",
        "linkType": "tool"
      },
      {
        "title": "Salary Calculator",
        "label": "View 12th Bipartite PO Compensation",
        "url": "/tools/salary",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Print at least two clear copies of your e-Admit Card on clean A4 paper well in advance; do not wait until the exam morning.",
      "Locate your exact examination center on Google Maps one day prior to avoid last-minute transit delays or wrong center confusion.",
      "Carry strictly the original valid government photo ID card matching the exact name and DOB on your registration form.",
      "Adhere strictly to the gate closure schedule: entry gates close permanently 30 to 45 minutes prior to test commencement.",
      "Carry two passport photographs matching the application form for emergency verification at the facilitation counter."
    ],
    "syllabusTopics": [
      {
        "subject": "CRP PO/MT XV Preliminary Subjects",
        "weightage": "100 Marks / 100 Questions (60 Mins)",
        "topics": [
          "English Language (30 Qs / 30 Marks / 20 Mins): Comprehension passages, error identification, sentence connector",
          "Quantitative Aptitude (35 Qs / 35 Marks / 20 Mins): Data interpretation (Bar, Line, Tabular, Pie), arithmetic word problems",
          "Reasoning Ability (35 Qs / 35 Marks / 20 Mins): Circular and linear seating, box puzzles, input-output logic"
        ]
      }
    ]
  },
  {
    "id": "admit-ugc-net-dec-2026",
    "slug": "ugc-net-december-2026-city-intimation-slip-admit-card",
    "category": "admit-card",
    "title": "UGC NET December 2026 Exam City Allotment Slip",
    "organization": "National Testing Agency (NTA)",
    "examName": "University Grants Commission National Eligibility Test (Dec 2026)",
    "publishDate": "30 Sep 2026",
    "examDate": "02 Dec to 14 Dec 2026",
    "qualification": "Post Graduate Candidates (Assistant Professor / JRF)",
    "sourceNotice": {
      "title": "National Testing Agency (NTA) UGC NET Portal",
      "url": "https://ugcnet.nta.nic.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "11 Oct 2026, 14:15 IST",
    "readTime": "4 min read",
    "summary": "National Testing Agency (NTA) has released the Advance City Intimation Slip for the UGC NET December 2026 session covering 83 subjects for Junior Research Fellowship (JRF) and eligibility for Assistant Professor in Indian universities and colleges.",
    "linkText": "Check UGC NET Exam City Intimation Slip",
    "importantDates": [
      {
        "event": "City Intimation Slip Released",
        "date": "30 September 2026"
      },
      {
        "event": "Final E-Admit Card Release",
        "date": "Late November 2026"
      },
      {
        "event": "UGC NET Examination Window",
        "date": "02 December to 14 December 2026"
      }
    ],
    "whoShouldApply": [
      "Candidates who successfully submitted their UGC NET December 2026 application on ugcnet.nta.nic.in seeking to verify their allotted examination city.",
      "Aspirants appearing for Junior Research Fellowship (JRF) and Assistant Professorship across 85+ humanities, sciences, and language subjects."
    ],
    "whoShouldSkip": [
      "Candidates applying for future cycles or those whose application payment was rejected or unsubmitted.",
      "Candidates seeking CSIR-UGC NET Life Sciences, Chemical Sciences, or Physical Sciences (must check csirnet.nta.ac.in instead)."
    ],
    "commonRejectionMistakes": [
      "Confusing the Advance City Allotment Slip with the final e-Admit Card (entry to the test center requires the official e-Admit Card).",
      "Failing to verify the allotted center city early, leading to last-minute travel delays.",
      "Entering incorrect date of birth or application number format during login."
    ],
    "documentsNeeded": [
      "UGC NET December 2026 Application Number",
      "Date of Birth (matching 10th class matriculation certificate)",
      "Security Captcha PIN displayed on the login page",
      "Valid Government Photo ID for future hall ticket comparison"
    ],
    "howToApplySteps": [
      "Navigate to the official NTA UGC NET examination portal at https://ugcnet.nta.nic.in.",
      "Click on the link for \"Advance City Intimation / e-Admit Card for UGC NET December 2026\".",
      "Input your 12-digit Application Number, Date of Birth (DD/MM/YYYY), and dynamic Security PIN.",
      "Review your allotted examination center city, subject code, shift allocation, and reporting timetable.",
      "Download and save the slip for travel booking; return 3 to 4 days prior to your subject exam date to download the final e-Admit Card with venue room number.",
      "Take at least 2 clear laser printouts on clean A4 sheets along with the signed Self-Declaration (Undertaking) proforma."
    ],
    "admitCardDetails": {
      "officialNoticeSummary": "National Testing Agency (NTA) issues Advance City Intimation Slips followed by final e-Admit Cards for UGC NET December 2026 across 83 subjects. The examination is administered in 2 daily CBT shifts: Shift 1 (09:00 AM to 12:00 PM) and Shift 2 (03:00 PM to 06:00 PM). Center gates close strictly 30 minutes prior to shift commencement.",
      "downloadSteps": [
        "Open official NTA portal: https://ugcnet.nta.nic.in and locate the Candidate Activity module.",
        "Select \"Download UGC NET December 2026 Admit Card / City Allotment Slip\".",
        "Enter Application Number and Date of Birth as registered on the application form.",
        "Enter the Captcha verification PIN and click Submit.",
        "Verify photograph, barcode, allotted exam center address, and reporting time before printing."
      ],
      "detailsToCheck": [
        "Candidate Name, Roll Number, and Application Number (must match matriculation records)",
        "Subject Name and Subject Code (e.g. Paper-01 Teaching Aptitude + Paper-02 Domain Subject)",
        "Exact Examination Center Name, City, Sub-Center Code, and Complete Venue Address",
        "Reporting Time and Gate Closure Time (08:30 AM for Shift-1 and 02:30 PM for Shift-2)",
        "Self-Declaration (Undertaking) box with passport photograph pasted and left thumb impression affixed"
      ],
      "itemsToCarry": [
        "Printed copy of UGC NET e-Admit Card with completed Self-Declaration undertaking",
        "One passport-size colour photograph matching the application form for attendance sheet pasting",
        "Original authorized Government Photo ID (Aadhaar Card, Voter ID, PAN Card, Passport, or Driving License)",
        "Simple transparent ballpoint pen with blue or black ink",
        "Transparent 500ml water bottle and personal 50ml hand sanitizer"
      ],
      "prohibitedItems": [
        "Mobile phones, Bluetooth earphones, smartwatches, digital fitness bands, pagers",
        "Handbags, backpacks, purses, metallic ornaments, hair clips with metal pins",
        "Books, loose notes, paper sheets, pencil boxes, geometry sets, calculators"
      ],
      "ifDownloadFailsAdvice": "If unable to download due to heavy server traffic, retry in incognito mode during off-peak hours (before 08:00 AM or after 10:00 PM). If your fee debit was successful but the admit card is not generating, write immediately to ugcnet@nta.ac.in or call NTA Helpdesk at 011-40759000 / 011-69227700 with your application number and transaction proof.",
      "officialHelpdesk": {
        "phone": "011-40759000 / 011-69227700",
        "email": "ugcnet@nta.ac.in",
        "portalUrl": "https://ugcnet.nta.nic.in"
      }
    },
    "examPattern": [
      {
        "subject": "Paper 1: Teaching & Research Aptitude (General Paper)",
        "questions": 50,
        "marks": 100,
        "time": "Combined 3 Hours (180 mins)",
        "negativeMarking": "No Negative Marking (2 marks per correct answer)"
      },
      {
        "subject": "Paper 2: Domain Subject (Elective 1 of 83 Subjects)",
        "questions": 100,
        "marks": 200,
        "time": "Combined 3 Hours (No sectional break)",
        "negativeMarking": "No Negative Marking (2 marks per correct answer)"
      }
    ],
    "cutOffTrends": [
      {
        "year": "Dec 2024 (Economics - Subject 01)",
        "totalMarks": 300,
        "general": 192,
        "obc": 178,
        "ews": 180,
        "sc": 162,
        "st": 154
      },
      {
        "year": "Dec 2024 (Commerce - Subject 08)",
        "totalMarks": 300,
        "general": 184,
        "obc": 168,
        "ews": 170,
        "sc": 152,
        "st": 144
      },
      {
        "year": "Dec 2024 (English - Subject 30)",
        "totalMarks": 300,
        "general": 190,
        "obc": 172,
        "ews": 174,
        "sc": 156,
        "st": 148
      },
      {
        "year": "Dec 2024 (Political Science - Subject 02)",
        "totalMarks": 300,
        "general": 196,
        "obc": 182,
        "ews": 184,
        "sc": 166,
        "st": 158
      }
    ],
    "faqs": [
      {
        "question": "Is the Advance City Intimation Slip the same document as the Admit Card?",
        "answer": "No. The Advance City Intimation Slip merely informs candidates of the examination city allocated to help them make advance travel and accommodation bookings. The actual e-Admit Card specifying the exact test center name, address, and lab number is released separately by NTA 3 to 4 days prior to the examination."
      },
      {
        "question": "Is there negative marking in the UGC NET December 2026 CBT?",
        "answer": "No. In UGC NET, candidates receive 2 marks for every correct answer, and there is zero negative marking for incorrect or unattempted questions across both Paper 1 and Paper 2."
      },
      {
        "question": "What is the qualifying cut-off benchmark for Assistant Professor vs JRF?",
        "answer": "Candidates in the General category must secure at least 40% aggregate marks across both papers, while reserved category candidates (OBC, SC, ST, PwBD) must secure at least 35%. The top 6% of appearing candidates who clear the aggregate threshold qualify for Assistant Professorship, while the top percentile within that pool are awarded the Junior Research Fellowship (JRF)."
      },
      {
        "question": "Can I change my allotted exam center city after release of the city intimation slip?",
        "answer": "No. NTA rules clearly stipulate that examination cities are allocated strictly on the basis of choices indicated during online application and administrative feasibility. No request for changing the allotted test city or center will be entertained under any circumstance."
      }
    ],
    "officialLinks": [
      {
        "title": "NTA UGC NET Portal",
        "label": "Check City Slip (ugcnet.nta.nic.in)",
        "url": "https://ugcnet.nta.nic.in",
        "isPrimary": true,
        "linkType": "official"
      },
      {
        "title": "Marking Score Calculator",
        "label": "Simulate UGC NET CBT Scores",
        "url": "/tools/marking",
        "linkType": "tool"
      },
      {
        "title": "Age Relaxation Checker",
        "label": "Verify JRF Age Cut-off",
        "url": "/tools/age",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Print at least two clear copies of your e-Admit Card on clean A4 paper well in advance; do not wait until the exam morning.",
      "Locate your exact examination center on Google Maps one day prior to avoid last-minute transit delays or wrong center confusion.",
      "Carry strictly the original valid government photo ID card matching the exact name and DOB on your registration form.",
      "Adhere strictly to the gate closure schedule: entry gates close permanently 30 to 45 minutes prior to test commencement.",
      "Carry two passport photographs matching the application form for emergency verification at the facilitation counter."
    ],
    "syllabusTopics": [
      {
        "subject": "Paper-I Teaching & Research Aptitude",
        "weightage": "100 Marks / 50 Questions",
        "topics": [
          "Teaching & Research Aptitude, Reading Comprehension, Communication, Mathematical & Logical Reasoning, ICT, Higher Education"
        ]
      },
      {
        "subject": "Paper-II Master Degree Specialization",
        "weightage": "200 Marks / 100 Questions",
        "topics": [
          "Specialized subject core theories, methodologies, and analytical problem solving across 87 authorized disciplines"
        ]
      }
    ]
  },
  {
    "id": "rrb-group-d-2026-27",
    "slug": "rrb-group-d-new-recruitment-2026-27",
    "category": "jobs",
    "title": "RRB Group D Recruitment 2026 Notification",
    "organization": "Railway Recruitment Boards (RRB) / Ministry of Railways",
    "examName": "RRB Centralised Employment Notice (CEN) Level-1 / Group D 2026-27",
    "postCount": "32,000+ Posts (Across 16 Railway Zones)",
    "publishDate": "02 Oct 2026",
    "lastDate": "30 Nov 2026",
    "examDate": "February / March 2027 (Tentative CBT Schedule)",
    "qualification": "10th Pass (Matriculation) from Recognized Board OR 10th Pass + ITI / NAC (Post-Wise Discretion)",
    "qualificationTier": "10th",
    "sector": "railways",
    "minAge": 18,
    "maxAge": 33,
    "ageLimit": "18 to 33 Years (UR) + 3 Yrs Special Relaxation = 18 to 36 Yrs (OBC: 39, SC/ST: 41, PwBD: 46) as on 01-07-2026",
    "fees": "₹500 for General/OBC (₹400 refunded post CBT); ₹250 for SC/ST/Female/EWS/ESM (₹250 refunded post CBT)",
    "sourceNotice": {
      "title": "Ministry of Railways / Railway Recruitment Control Board",
      "url": "https://www.rrbapply.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "02 Oct 2026, 16:30 IST",
    "readTime": "12 min read",
    "summary": "Comprehensive gazette analysis of the Railway Recruitment Board (RRB) upcoming Level-1 (Group D) 2026-27 recruitment drive for over 32,000 vacancies across 16 Railway Recruitment Cells (RRCs). Covers post-wise 10th pass vs ITI/NAC qualification clarification, 7th CPC Level-1 salary structure (Basic ₹18,000, Gross ₹31,050–₹37,125/mo), 100-mark single-stage CBT pattern with 1/3 negative marking, strict PET running & 35kg/20kg weight carrying standards, 20% CCAA apprentice quota, and zone-wise expected cut-off trends.",
    "linkText": "View Zone-Wise Posts, PET Rules & Apply Online",
    "calculatorToolType": "marking",
    "calculatorPresetId": "rrb-ntpc",
    "importantDates": [
      {
        "event": "Official Railway Board Annual Calendar Notice",
        "date": "02 October 2026"
      },
      {
        "event": "Detailed CEN Level-1 Notification Release",
        "date": "October 2026"
      },
      {
        "event": "Online Application Window Opens",
        "date": "October 2026"
      },
      {
        "event": "Last Date for Online Application & Fee Payment",
        "date": "30 November 2026 (23:59 Hrs)"
      },
      {
        "event": "Application Modification & Photo/Sign Re-upload Window",
        "date": "05 to 12 December 2026"
      },
      {
        "event": "Exam City Intimation Slip & Free Travel Pass for SC/ST",
        "date": "10 Days Prior to CBT"
      },
      {
        "event": "Computer Based Test (CBT) Commencement",
        "date": "February / March 2027 (Tentative)"
      }
    ],
    "applicationFees": [
      {
        "category": "General / Unreserved (UR) & OBC Male Candidates",
        "fee": "₹500 (₹400 Refunded post CBT Attendance)"
      },
      {
        "category": "SC / ST / Ex-Servicemen / PwBD Candidates",
        "fee": "₹250 (Full ₹250 Refunded post CBT Attendance)"
      },
      {
        "category": "Female Candidates (All Categories)",
        "fee": "₹250 (Full ₹250 Refunded post CBT Attendance)"
      },
      {
        "category": "Economically Backward Classes (EBC) / Transgender",
        "fee": "₹250 (Full ₹250 Refunded post CBT Attendance)"
      }
    ],
    "vacanciesTable": [
      {
        "postName": "Track Maintainer Grade-IV (Civil Engineering)",
        "department": "Engineering Department, Indian Railways",
        "classification": "Central Railway Service Group C (Level-1 Non-Gazetted)",
        "payScale": "Level 1 (₹18,000 – ₹56,900 + ₹2,700 Risk Allowance)",
        "vacancy": "14,200+ Posts (Estimated All Zones)",
        "eligibility": "10th Pass + ITI from NCVT/SCVT in designated trades OR 10th Pass + NAC"
      },
      {
        "postName": "Assistant Pointsman (Traffic / Operating)",
        "department": "Operating Department, Indian Railways",
        "classification": "Central Railway Service Group C (Level-1 Non-Gazetted)",
        "payScale": "Level 1 (₹18,000 – ₹56,900 + Night Shift Allowance)",
        "vacancy": "5,800+ Posts (Estimated All Zones)",
        "eligibility": "10th Class Pass (Matriculation) from a recognized Board (No ITI required)"
      },
      {
        "postName": "Assistant Loco Shed - Diesel (Mechanical)",
        "department": "Mechanical Department, Indian Railways",
        "classification": "Central Railway Service Group C (Level-1 Non-Gazetted)",
        "payScale": "Level 1 (₹18,000 – ₹56,900 + Perks)",
        "vacancy": "2,400+ Posts (Estimated All Zones)",
        "eligibility": "10th Pass from recognized Board OR 10th Pass + ITI/NAC in Fitter/Mechanic"
      },
      {
        "postName": "Assistant Loco Shed - Electrical (Electrical)",
        "department": "Electrical Department, Indian Railways",
        "classification": "Central Railway Service Group C (Level-1 Non-Gazetted)",
        "payScale": "Level 1 (₹18,000 – ₹56,900 + Perks)",
        "vacancy": "2,600+ Posts (Estimated All Zones)",
        "eligibility": "10th Pass from recognized Board OR 10th Pass + ITI/NAC in Electrician/Wireman"
      },
      {
        "postName": "Assistant Carriage & Wagon - C&W (Mechanical)",
        "department": "Mechanical Department, Indian Railways",
        "classification": "Central Railway Service Group C (Level-1 Non-Gazetted)",
        "payScale": "Level 1 (₹18,000 – ₹56,900 + Workshop Allowance)",
        "vacancy": "3,100+ Posts (Estimated All Zones)",
        "eligibility": "10th Pass + ITI in Fitter/Welder/Machinist trade OR 10th Pass"
      },
      {
        "postName": "Assistant Signal & Telecommunication (S&T)",
        "department": "Signal & Telecom Department, Indian Railways",
        "classification": "Central Railway Service Group C (Level-1 Non-Gazetted)",
        "payScale": "Level 1 (₹18,000 – ₹56,900 + Perks)",
        "vacancy": "2,200+ Posts (Estimated All Zones)",
        "eligibility": "10th Pass + ITI in Electrician/Electronic Mechanic OR 10th Pass"
      },
      {
        "postName": "Hospital Assistant / Attendant (Medical)",
        "department": "Medical Department, Indian Railways",
        "classification": "Central Railway Service Group C (Level-1 Non-Gazetted)",
        "payScale": "Level 1 (₹18,000 – ₹56,900 + Hospital Patient Care Allowance)",
        "vacancy": "800+ Posts (Estimated All Zones)",
        "eligibility": "10th Class Pass (Matriculation) from a recognized Board (No ITI required)"
      },
      {
        "postName": "Assistant Operations / Traffic",
        "department": "Traffic Department, Indian Railways",
        "classification": "Central Railway Service Group C (Level-1 Non-Gazetted)",
        "payScale": "Level 1 (₹18,000 – ₹56,900 + Perks)",
        "vacancy": "900+ Posts (Estimated All Zones)",
        "eligibility": "10th Class Pass (Matriculation) from a recognized Board"
      }
    ],
    "selectionProcess": [
      {
        "stageNumber": "Stage 1",
        "stageName": "Single Stage Computer Based Test (CBT)",
        "description": "Comprehensive 100-question online examination (90 minutes; 120 minutes for eligible PwBD with scribe) testing General Science (25Q), Mathematics (25Q), General Intelligence & Reasoning (30Q), and General Awareness & Current Affairs (20Q). Negative marking of 1/3rd applies for each wrong response. Percentile-based normalization determines merit rank.",
        "qualifyingNature": "Deciding Merit for PET Shortlisting (3x Vacancies)"
      },
      {
        "stageNumber": "Stage 2",
        "stageName": "Physical Efficiency Test (PET)",
        "description": "Strict qualifying endurance assessment conducted on railway divisional grounds. Male: Carry 35 kg for 100m in 2 mins + 1,000m run in 4 min 15 sec. Female: Carry 20 kg for 100m in 2 mins + 1,000m run in 5 min 40 sec. PwBD and Railway CCAA apprentices are 100% exempted.",
        "qualifyingNature": "Mandatory Qualifying Only (No Marks Added)"
      },
      {
        "stageNumber": "Stage 3",
        "stageName": "Document Verification (DV) & Biometric Matching",
        "description": "Rigorous scrutiny of 10th certificates, ITI/NAC certificates, SC/ST/OBC-NCL/EWS caste documents, and biometric thumb/iris matching conducted at the respective Railway Recruitment Cell (RRC) headquarters at 1:1 ratio.",
        "qualifyingNature": "Mandatory Qualifying & Eligibility Clearance"
      },
      {
        "stageNumber": "Stage 4",
        "stageName": "Comprehensive Railway Medical Examination",
        "description": "Stringent fitness screening in Railway Hospitals according to A-2, A-3, B-1, B-2, and C-1 medical categories. Focuses on distant vision (6/9, 6/12 with or without glasses), compulsory color vision (Ishihara book test), night vision, and field of vision.",
        "qualifyingNature": "Mandatory Final Medical Fitness Clearance"
      }
    ],
    "salaryStructure": {
      "payLevel": "7th CPC Pay Matrix Level-1 (Grade Pay ₹1,800, Pre-revised PB-1 ₹5,200–₹20,200)",
      "basicPay": "₹18,000 per month (Index 1 of Level 1)",
      "daPercent": "50% of Basic Pay (₹9,000 per month under Central Government rules)",
      "hraPercent": "X Cities (30% = ₹5,400) | Y Cities (20% = ₹3,600) | Z Cities (10% = ₹1,800)",
      "grossMonthly": "₹31,050 – ₹37,125 per month",
      "inHandMonthly": "₹27,500 – ₹33,200 per month (Post NPS 10% pension ₹2,700, REIS & CGHS deductions)",
      "benefits": [
        "Permanent Central Government Railway service security under Ministry of Railways",
        "Free Railway Duty Passes & Privilege Ticket Orders (PTOs) for self and family across all train tiers",
        "Risk & Hardship Allowance of ₹2,700/month for Track Maintainer Grade-IV",
        "Night Duty Allowance (NDA) & National Holiday Allowance (NHA) for shift operational staff",
        "Cashless comprehensive healthcare for employee and family dependents in Central Railway Hospitals",
        "Subsidized Railway Quarters allotment (Type-I/II) with free or nominal utility charges"
      ]
    },
    "examPattern": [
      {
        "subject": "General Science (10th Standard Physics, Chemistry & Life Sciences)",
        "questions": 25,
        "marks": 25,
        "time": "90 Minutes Composite",
        "negativeMarking": "0.333 (1/3rd Mark Penalty)"
      },
      {
        "subject": "Mathematics (Number System, BODMAS, Algebra, Geometry, SI/CI)",
        "questions": 25,
        "marks": 25,
        "time": "90 Minutes Composite",
        "negativeMarking": "0.333 (1/3rd Mark Penalty)"
      },
      {
        "subject": "General Intelligence & Reasoning (Analogies, Coding, Syllogisms, Puzzles)",
        "questions": 30,
        "marks": 30,
        "time": "90 Minutes Composite",
        "negativeMarking": "0.333 (1/3rd Mark Penalty)"
      },
      {
        "subject": "General Awareness & Current Affairs (Science & Tech, Sports, Polity)",
        "questions": 20,
        "marks": 20,
        "time": "90 Minutes Composite",
        "negativeMarking": "0.333 (1/3rd Mark Penalty)"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "General Science (CBSE 10th Standard NCERT Syllabus)",
        "weightage": "25 Marks Weightage",
        "topics": [
          "Physics: Motion, Laws of Motion, Work, Energy & Power, Gravitation, Pressure, Sound, Light (Reflection & Refraction), Electricity, Magnetism & Sources of Energy",
          "Chemistry: Chemical Reactions & Equations, Acids, Bases & Salts, Metals & Non-metals, Carbon & its Compounds, Periodic Classification of Elements",
          "Life Sciences (Biology): Life Processes (Nutrition, Respiration, Circulation, Excretion), Control & Coordination, Reproduction, Heredity & Evolution, Environment & Ecosystem Conservation"
        ]
      },
      {
        "subject": "Mathematics (Core Quantitative Aptitude)",
        "weightage": "25 Marks Weightage",
        "topics": [
          "Number System, BODMAS Rule, Decimals, Fractions, LCM and HCF, Ratio and Proportions, Percentages",
          "Mensuration (2D & 3D Area and Volume), Time and Work, Time and Distance, Simple and Compound Interest",
          "Profit and Loss, Elementary Algebra, Geometry (Lines, Angles, Triangles, Circles), Basic Trigonometry and Elementary Statistics (Mean, Median, Mode)"
        ]
      },
      {
        "subject": "General Intelligence and Reasoning",
        "weightage": "30 Marks Weightage",
        "topics": [
          "Analogies, Alphabetical and Number Series, Coding and Decoding, Mathematical Operations, Relationships, Syllogisms",
          "Jumbling, Venn Diagrams, Data Interpretation and Sufficiency, Conclusions and Decision Making, Similarities and Differences",
          "Analytical Reasoning, Classification, Directions Sense Test, Statement-Arguments and Assumptions"
        ]
      },
      {
        "subject": "General Awareness & Current Affairs",
        "weightage": "20 Marks Weightage",
        "topics": [
          "Current Affairs: National and International Events, Government Welfare Schemes, Summits, Defense Exercises",
          "Science & Technology Developments, Indian Space Research (ISRO Missions), Nuclear Energy, IT Innovations",
          "Sports & Awards: Olympics, Cricket World Cups, Asian Games, National Sports Awards (Khel Ratna, Arjuna Awards)",
          "Culture, History of India, Indian Freedom Struggle, Geography, Indian Constitution & Polity, and Indian Economy Fundamentals"
        ]
      }
    ],
    "cutOffTrends": [
      {
        "year": "2022 Northern Railway (NR New Delhi)",
        "totalMarks": 100,
        "general": 70.98,
        "obc": 64.77,
        "ews": 57.75,
        "sc": 60.08,
        "st": 50.18
      },
      {
        "year": "2022 Eastern Railway (ER Kolkata)",
        "totalMarks": 100,
        "general": 69.6,
        "obc": 65.89,
        "ews": 58.53,
        "sc": 58.42,
        "st": 48.28
      },
      {
        "year": "2022 Western Railway (WR Mumbai)",
        "totalMarks": 100,
        "general": 62.67,
        "obc": 58.43,
        "ews": 51.66,
        "sc": 50.87,
        "st": 39.16
      },
      {
        "year": "2022 East Central Railway (ECR Hajipur)",
        "totalMarks": 100,
        "general": 66.2,
        "obc": 61.88,
        "ews": 52.45,
        "sc": 50.12,
        "st": 43.35
      }
    ],
    "faqs": [
      {
        "question": "Is ITI mandatory for all RRB Group D (Level-1) posts in the upcoming 2026-27 recruitment?",
        "answer": "No. Following high-level Railway Board directives and nationwide representations, several Level-1 operational and services posts such as Assistant Pointsman (Traffic Department) and Hospital Assistant (Medical Department) require only a standard 10th Class (Matriculation) pass from a recognized board without requiring an ITI certificate. However, technical engineering wing posts (such as Track Maintainer Gr-IV, Carriage & Wagon, and Workshop) require 10th Pass + ITI / National Apprenticeship Certificate (NAC) from NCVT/SCVT."
      },
      {
        "question": "What is the age limit and age relaxation for RRB Group D 2026-27?",
        "answer": "The prescribed base age bracket is 18 to 33 years as on 1st July 2026. In line with recent Railway Board Centralised Employment Notices (CEN), a 3-year special one-time relaxation beyond the prescribed upper age limit applies. Consequently, the effective upper age limit is: General/UR: 36 Years, OBC-NCL: 39 Years, SC/ST: 41 Years, and PwBD: 46 Years."
      },
      {
        "question": "What are the exact Physical Efficiency Test (PET) parameters for RRB Group D?",
        "answer": "PET is compulsory and qualifying: Male Candidates must lift and carry 35 kg of weight for a distance of 100 meters in 2 minutes in a single chance without dropping the weight, AND run a distance of 1,000 meters in 4 minutes and 15 seconds in one chance. Female Candidates must lift and carry 20 kg of weight for 100 meters in 2 minutes in a single chance without dropping, AND run 1,000 meters in 5 minutes and 40 seconds in one chance."
      },
      {
        "question": "What special reservation and concessions are given to Railway Act Apprentices (CCAA)?",
        "answer": "Candidates who have completed their Apprenticeship Training in Railway Establishments and possess a National Apprenticeship Certificate (NAC) granted by NCVT receive three major statutory advantages: (1) 20% horizontal reservation in Level-1 vacancies, (2) 1/3rd marks weightage calculated from their NCVT exam added in final merit, and (3) Complete 100% exemption from the Physical Efficiency Test (PET)."
      },
      {
        "question": "What is the gross monthly pay and in-hand salary for RRB Level-1 posts in 2026?",
        "answer": "Level-1 corresponds to 7th CPC Index-1 starting basic pay of ₹18,000. With 50% Dearness Allowance (₹9,000), House Rent Allowance (₹1,800 to ₹5,400 depending on city tier Z, Y, or X), and Transport Allowance (₹1,350 to ₹2,025), the starting gross monthly salary is ₹31,050 to ₹37,125. Track Maintainers also receive an additional ₹2,700/month Risk & Hardship Allowance. Post 10% NPS pension and insurance deductions, the net in-hand salary ranges between ₹27,500 and ₹33,200 per month."
      },
      {
        "question": "Can an applicant apply to multiple Railway Recruitment Boards (RRBs) or zones?",
        "answer": "No. As per strict CEN regulations, candidates can submit only ONE online application choosing ONE specific Railway Recruitment Cell (RRC) / Zone (e.g., Northern Railway, Western Railway, Eastern Railway). Submitting multiple applications across different RRBs will lead to automatic rejection of all applications and debarment from future Railway examinations."
      }
    ],
    "howToApplySteps": [
      "Visit the official centralized Railway Recruitment Board portal at https://www.rrbapply.gov.in or any of the 21 regional RRB portals (e.g. rrbcdg.gov.in, rrbpatna.gov.in).",
      "Click on \"Create an Account\" to complete One-Time Registration (OTR) with your valid Aadhaar Card number, active mobile number, and verified personal email address.",
      "Log in with your generated credentials and select \"Centralised Employment Notice (CEN) Level-1 / Group D 2026-27\".",
      "Select your desired Railway Recruitment Cell (RRC) Zone (e.g., NR, WR, ER, CR, ECR, SCR) and fill in post-preference order based on your educational qualifications (10th Pass or 10th + ITI/NAC).",
      "Upload digital scanned copies of your recent color passport photograph (30–70 KB, white background), clear scanned signature (30–70 KB), 10th matriculation mark sheet, ITI/NAC certificate, and SC/ST/OBC-NCL/EWS certificate in prescribed formats.",
      "Pay the online examination fee (₹500 for UR/OBC with ₹400 refundable; ₹250 for SC/ST/Female/EWS/ESM with full refund post CBT attendance) via Net Banking, Debit/Credit Card, or UPI, and securely save the final confirmation page."
    ],
    "whoShouldApply": [
      "Candidates who have passed 10th Matriculation from a recognized board, or hold 10th pass + ITI / National Apprenticeship Certificate (NAC) granted by NCVT/SCVT.",
      "Aspirants aged between 18 and 33 years as on 01-07-2026 (eligible for up to 36 for General with special age relaxation, 39 for OBC, 41 for SC/ST).",
      "Candidates seeking steady Central Railway Service Group C employment with 7th CPC Level-1 pay scale (Basic ₹18,000, Gross ₹31,050 to ₹37,125/mo) plus railway travel passes and medical facilities.",
      "Course Completed Act Apprentices (CCAA) trained in railway workshops seeking statutory 20% horizontal reservation and PET exemption."
    ],
    "whoShouldSkip": [
      "Candidates without valid 10th pass matriculation certificate on the crucial date of application closing.",
      "Candidates failing Railway Medical Standards A-2 / B-1 (color blindness or severe distance vision issues disqualify from safety posts like Track Maintainer & Pointsman).",
      "Candidates who cannot fulfill the mandatory Physical Efficiency Test (PET: carrying 35kg/20kg weight for 100m and 1,000m running in one chance).",
      "Candidates planning to submit multiple applications across different RRBs (Railway rules permit registration in only ONE zone)."
    ],
    "commonRejectionMistakes": [
      "Applying to multiple Railway Recruitment Cells (RRCs): Multiple applications by the same candidate across different zones lead to automatic rejection of all forms.",
      "Uploading non-compliant photographs: Selfies, photos with colored glasses, caps, or dark backgrounds are rejected by RRB automated image scrutiny.",
      "Mismatched name or father’s name: Discrepancies between Aadhaar data and 10th Matriculation certificate details trigger rejection during Document Verification.",
      "Failing to verify bank account details for refund: Candidates must enter their own valid savings bank account details to receive the ₹400 / ₹250 CBT fee refund.",
      "Ignoring Trade-specific ITI requirements for technical departmental posts."
    ],
    "documentsNeeded": [
      "10th Matriculation Certificate & Mark Sheet (mandatory for Date of Birth & Father’s name verification).",
      "National Trade Certificate (NTC) / National Apprenticeship Certificate (NAC) issued by NCVT/SCVT (where applicable).",
      "Aadhaar Card for biometric authentication on the rrbapply.gov.in portal.",
      "Recent color passport photograph (30 KB to 70 KB, light background, taken within 3 months).",
      "Scanned signature in running handwriting (30 KB to 70 KB, black or blue ink).",
      "Caste Certificate (SC/ST/OBC-NCL/EWS) in prescribed Central Railway Annexure format.",
      "Active savings bank account details for exam fee refund processing post CBT."
    ],
    "officialLinks": [
      {
        "title": "Centralised RRB Application Portal",
        "label": "Apply Online (rrbapply.gov.in)",
        "url": "https://www.rrbapply.gov.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Railway Recruitment Control Board",
        "label": "Ministry of Railways (indianrailways.gov.in)",
        "url": "https://indianrailways.gov.in",
        "linkType": "official"
      },
      {
        "title": "Negative Marking CBT Calculator",
        "label": "Calculate 1/3rd CBT Penalty Score",
        "url": "/tools/marking",
        "linkType": "tool"
      },
      {
        "title": "Height & Physical Eligibility Checker",
        "label": "Check 35kg / 20kg PET Standards",
        "url": "/tools/height",
        "linkType": "tool"
      },
      {
        "title": "Railway Age Cut-Off Calculator",
        "label": "Verify Age on 01-07-2026 (18-36 Yrs)",
        "url": "/tools/age",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Focus heavily on NCERT Class 9 and 10 General Science fundamentals (Physics numericals, Chemical reactions, and Human anatomy).",
      "Practice daily non-verbal reasoning questions including mirror images, paper folding, and embedded figure recognition.",
      "Familiarize yourself with TCS exam interface shortcuts to rapidly navigate between answered, unread, and flagged questions.",
      "Under the 1/3rd negative deduction rule, skip questions where you cannot eliminate at least two plausible distractor options.",
      "Build endurance for Computer Based Tests through uninterrupted 90-minute full mock exam simulations."
    ]
  },
  {
    "id": "btsc-fishery-extension-officer-2026",
    "slug": "btsc-fishery-extension-officer-recruitment-2026",
    "category": "jobs",
    "title": "BTSC Fishery Extension Officer 2026 Notification",
    "organization": "Bihar Technical Service Commission (BTSC)",
    "examName": "Fishery Extension Officer (मत्स्य प्रसार पदाधिकारी) Examination 2026",
    "postCount": "231 Posts (77 Reserved for Women)",
    "publishDate": "24 Sep 2026",
    "lastDate": "23 Oct 2026",
    "examDate": "November / December 2026",
    "qualification": "4-Year B.F.Sc. (Bachelor of Fisheries Science) from ICAR-Recognized Agricultural University",
    "qualificationTier": "graduate",
    "sector": "other",
    "minAge": 21,
    "maxAge": 37,
    "ageLimit": "21 to 37 Years for UR Male | 40 Years for BC/EBC/UR Female | 42 Years for SC/ST as on 01-08-2026",
    "fees": "₹100 (Online Payment for All Categories as per Advt 28/2026)",
    "sourceNotice": {
      "title": "Bihar Technical Service Commission Official Notice (Advt 28/2026)",
      "url": "https://btsc.bihar.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "11 Oct 2026, 14:30 IST",
    "readTime": "11 min read",
    "summary": "The Bihar Technical Service Commission (BTSC) invites online applications for regular cadre appointment of 231 Fisheries Extension Officers (मत्स्य प्रसार पदाधिकारी) in the Directorate of Fisheries under the Dairy, Fisheries & Animal Resources Department, Government of Bihar. Features 7th CPC Pay Level 7 (Basic ₹44,900, Gross ₹72,942–₹81,473/mo), 100-mark selection structure (75 Marks CBT + 25 Marks Contractual Experience), 35% horizontal reservation for women (77 posts), and statewide district allocations.",
    "linkText": "Check Category Vacancies & Apply Online",
    "calculatorToolType": "age",
    "importantDates": [
      {
        "event": "Official Gazette Notification Issued",
        "date": "24 September 2026"
      },
      {
        "event": "Online Registration & Form Submission Begins",
        "date": "24 September 2026"
      },
      {
        "event": "Last Date for Online Application & Fee Payment",
        "date": "23 October 2026 (11:59 PM)"
      },
      {
        "event": "Online Correction Window for Submitted Applications",
        "date": "26 October to 28 October 2026"
      },
      {
        "event": "CBT Exam City Slip & Hall Ticket Download",
        "date": "November 2026 (Tentative)"
      },
      {
        "event": "Computer Based Test (CBT) Examination",
        "date": "November / December 2026"
      }
    ],
    "applicationFees": [
      {
        "category": "General / Unreserved (UR) Male Candidates",
        "fee": "₹100"
      },
      {
        "category": "Backward Classes (BC) & Extremely Backward Classes (EBC)",
        "fee": "₹100"
      },
      {
        "category": "Economically Weaker Sections (EWS)",
        "fee": "₹100"
      },
      {
        "category": "SC / ST / PwBD / Female (All Categories - Bihar Domicile)",
        "fee": "₹100"
      },
      {
        "category": "Candidates from Other States (Outside Bihar - All Categories)",
        "fee": "₹100"
      }
    ],
    "vacanciesTable": [
      {
        "postName": "Fisheries Extension Officer (मत्स्य प्रसार पदाधिकारी) - UR",
        "department": "Directorate of Fisheries, Animal & Fisheries Resources Dept, Bihar",
        "classification": "State Technical Service Group B (Regular Permanent)",
        "payScale": "Level 7 (₹44,900 – ₹1,42,400 + Perks)",
        "vacancy": "92 Posts (31 Reserved for Women)",
        "eligibility": "4-Year B.F.Sc. from ICAR recognized University / Fisheries College"
      },
      {
        "postName": "Fisheries Extension Officer - Economically Weaker Section (EWS)",
        "department": "Directorate of Fisheries, Animal & Fisheries Resources Dept, Bihar",
        "classification": "State Technical Service Group B (Regular Permanent)",
        "payScale": "Level 7 (₹44,900 – ₹1,42,400 + Perks)",
        "vacancy": "23 Posts (08 Reserved for Women)",
        "eligibility": "4-Year B.F.Sc. + Valid Bihar EWS Certificate for FY 2026-27"
      },
      {
        "postName": "Fisheries Extension Officer - Scheduled Caste (SC)",
        "department": "Directorate of Fisheries, Animal & Fisheries Resources Dept, Bihar",
        "classification": "State Technical Service Group B (Regular Permanent)",
        "payScale": "Level 7 (₹44,900 – ₹1,42,400 + Perks)",
        "vacancy": "37 Posts (12 Reserved for Women)",
        "eligibility": "4-Year B.F.Sc. + Permanent Domicile & Caste Certificate of Bihar"
      },
      {
        "postName": "Fisheries Extension Officer - Scheduled Tribe (ST)",
        "department": "Directorate of Fisheries, Animal & Fisheries Resources Dept, Bihar",
        "classification": "State Technical Service Group B (Regular Permanent)",
        "payScale": "Level 7 (₹44,900 – ₹1,42,400 + Perks)",
        "vacancy": "03 Posts (01 Reserved for Women)",
        "eligibility": "4-Year B.F.Sc. + Permanent Domicile & ST Certificate of Bihar"
      },
      {
        "postName": "Fisheries Extension Officer - Extremely Backward Class (EBC)",
        "department": "Directorate of Fisheries, Animal & Fisheries Resources Dept, Bihar",
        "classification": "State Technical Service Group B (Regular Permanent)",
        "payScale": "Level 7 (₹44,900 – ₹1,42,400 + Perks)",
        "vacancy": "42 Posts (14 Reserved for Women)",
        "eligibility": "4-Year B.F.Sc. + Non-Creamy Layer (NCL) EBC Certificate of Bihar"
      },
      {
        "postName": "Fisheries Extension Officer - Backward Class (BC)",
        "department": "Directorate of Fisheries, Animal & Fisheries Resources Dept, Bihar",
        "classification": "State Technical Service Group B (Regular Permanent)",
        "payScale": "Level 7 (₹44,900 – ₹1,42,400 + Perks)",
        "vacancy": "28 Posts (09 Reserved for Women)",
        "eligibility": "4-Year B.F.Sc. + Non-Creamy Layer (NCL) BC Certificate of Bihar"
      },
      {
        "postName": "Fisheries Extension Officer - Backward Class Women (WBC)",
        "department": "Directorate of Fisheries, Animal & Fisheries Resources Dept, Bihar",
        "classification": "State Technical Service Group B (Regular Permanent)",
        "payScale": "Level 7 (₹44,900 – ₹1,42,400 + Perks)",
        "vacancy": "06 Posts (100% Women)",
        "eligibility": "4-Year B.F.Sc. + Domicile of Bihar (WBC 3% Quota)"
      }
    ],
    "selectionProcess": [
      {
        "stageNumber": "Stage 1",
        "stageName": "Computer Based Written Test (CBT)",
        "description": "Online examination comprising 100 objective technical multiple-choice questions on 4-year B.F.Sc. core curriculum (scaled to 75 marks weightage). Negative marking of 0.25 applies for each wrong answer.",
        "qualifyingNature": "75 Marks Weightage (Deciding Merit)"
      },
      {
        "stageNumber": "Stage 2",
        "stageName": "Contractual Work Experience Weightage",
        "description": "25 Marks maximum weightage for candidates possessing verified contractual work experience in Bihar Animal & Fisheries Resources Department (5 marks awarded per completed year of service, certified by the District Fisheries Officer).",
        "qualifyingNature": "25 Marks Maximum Added to Merit"
      },
      {
        "stageNumber": "Stage 3",
        "stageName": "Statutory Document Verification (DV)",
        "description": "Verification of original B.F.Sc. degree certificates, PDC, marksheets, ICAR accreditation of institution, Bihar domicile, non-creamy layer (NCL), and experience letters at BTSC Office, 19 Harding Road, Patna.",
        "qualifyingNature": "Mandatory Qualifying & Eligibility Check"
      },
      {
        "stageNumber": "Stage 4",
        "stageName": "Medical Examination & Police Verification",
        "description": "Comprehensive physical fitness screening by Bihar State Medical Board and antecedents verification prior to regular cadre issuing of appointment orders.",
        "qualifyingNature": "Mandatory Fitness Clearance"
      }
    ],
    "salaryStructure": {
      "payLevel": "7th CPC Pay Matrix Level 7 (Grade Pay ₹4,200)",
      "basicPay": "₹44,900 per month (7th CPC Pay Matrix Level 7, Grade Pay ₹4,200)",
      "daPercent": "50% of Basic Pay (₹22,450 per month under Bihar Finance Dept Order)",
      "hraPercent": "₹3,592 (Rural Blocks) to ₹7,184 (District HQ) to ₹12,123 (Patna Urban Circle)",
      "grossMonthly": "₹72,942 – ₹81,473 per month",
      "inHandMonthly": "₹65,200 – ₹73,800 per month (Post NPS 10% pension & statutory deduction)",
      "benefits": [
        "Permanent regular cadre status in Bihar Animal & Fisheries Resources Department",
        "Official residential quarters entitlement or leased house rent allowance",
        "Field inspection travel allowances (TA/DA) across ponds, reservoirs & rivers",
        "Comprehensive health coverage under Bihar Government Employee Health Scheme",
        "New Pension Scheme (NPS) with 14% matching employer contribution",
        "Clear promotional path to District Fisheries Officer (DFO) and Deputy Director"
      ]
    },
    "examPattern": [
      {
        "subject": "Aquaculture, Fish Breeding & Seed Production",
        "questions": 20,
        "marks": 20,
        "time": "120 Minutes Composite",
        "negativeMarking": "0.25 (1/4th Mark Penalty)"
      },
      {
        "subject": "Fisheries Resource Management & Aquatic Ecology",
        "questions": 15,
        "marks": 15,
        "time": "120 Minutes Composite",
        "negativeMarking": "0.25 (1/4th Mark Penalty)"
      },
      {
        "subject": "Aquatic Animal Health, Fish Pathology & Water Quality",
        "questions": 15,
        "marks": 15,
        "time": "120 Minutes Composite",
        "negativeMarking": "0.25 (1/4th Mark Penalty)"
      },
      {
        "subject": "Fish Processing Technology & Quality Assurance",
        "questions": 15,
        "marks": 15,
        "time": "120 Minutes Composite",
        "negativeMarking": "0.25 (1/4th Mark Penalty)"
      },
      {
        "subject": "Fisheries Engineering, Crafts, Gear & Pond Construction",
        "questions": 15,
        "marks": 15,
        "time": "120 Minutes Composite",
        "negativeMarking": "0.25 (1/4th Mark Penalty)"
      },
      {
        "subject": "Fisheries Economics, Extension & Central/State Schemes",
        "questions": 20,
        "marks": 20,
        "time": "120 Minutes Composite",
        "negativeMarking": "0.25 (1/4th Mark Penalty)"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "Aquaculture & Hatchery Management",
        "weightage": "20% Weightage",
        "topics": [
          "Induced breeding techniques of Indian Major Carps (Catla, Rohu, Mrigal) & Exotic Carps",
          "Modern hatchery designs: Eco-hatchery, circular breeding pool & incubation pool engineering",
          "Nursery, rearing & grow-out pond management: Liming, manuring, water stocking density & plankton bloom control",
          "Intensive culture systems: Biofloc Technology (BFT), Recirculating Aquaculture Systems (RAS) & cage culture in reservoirs",
          "Freshwater pearl culture, ornamental fish breeding, and coldwater fisheries potential in sub-Himalayan belts"
        ]
      },
      {
        "subject": "Fishery Biology, Aquatic Ecology & Resource Management",
        "weightage": "15% Weightage",
        "topics": [
          "Taxonomy, morphology & anatomical adaptations of commercially important freshwater & estuarine teleosts",
          "Population dynamics: Length-weight relationship, condition factor (K), age & growth determination via scale/otolith",
          "Inland aquatic resources of Bihar: Riverine fisheries (Ganga, Gandak, Kosi, Son), wetlands, oxbow lakes (Maun/Chaur)",
          "Eutrophication, aquatic weed infestation control, aquatic bioindicators, and conservation of endangered aquatic fauna (Gangetic Dolphin)"
        ]
      },
      {
        "subject": "Aquatic Animal Health Management & Diagnostics",
        "weightage": "15% Weightage",
        "topics": [
          "Common viral, bacterial, fungal, and parasitic diseases in freshwater aquaculture (Epizootic Ulcerative Syndrome - EUS, Fin/Tail rot, Dropsy, Argulosis, Dactylogyrus)",
          "Diagnostic tools: Water microbiological assays, histopathology, PCR diagnostics & therapeutic antibiotic stewardship",
          "Water quality parameters: Dissolved Oxygen (DO), pH, alkalinity, hardness, TAN (Total Ammonia Nitrogen), and nitrite toxicity management",
          "Biosecurity protocols, quarantine norms for exotic seed introduction, and immunostimulants in aquafeeds"
        ]
      },
      {
        "subject": "Fish Processing Technology & Value Addition",
        "weightage": "15% Weightage",
        "topics": [
          "Post-mortem biochemical changes in fish muscle: Rigor mortis, autolysis, rancidity, and microbial spoilage mechanisms",
          "Fish preservation methods: Chilling, freezing, IQF, salting, smoking, canning, and drying kinetics",
          "Quality control & sanitation: HACCP principles, FSSAI regulations, EU export standards, and sensory evaluation techniques",
          "Value-added fishery products: Fish cutlets, fish fingers, surimi, fish oil extraction, and fish silage from processing discards"
        ]
      },
      {
        "subject": "Fisheries Engineering & Gear Technology",
        "weightage": "15% Weightage",
        "topics": [
          "Site selection, soil mechanics, and civil layout design for fish farms, dikes, sluice gates & drainage systems",
          "Aeration equipment: Paddlewheel aerators, aspirators, diffused aeration systems, and energy efficiency metrics",
          "Classification of fishing gears: Gill nets, trammel nets, cast nets, drag nets, and traps used in inland waters",
          "Netting materials, synthetic fibres, breaking strength, twine numbering systems, and selective gear designs"
        ]
      },
      {
        "subject": "Fisheries Extension, Co-operatives & Government Schemes",
        "weightage": "20% Weightage",
        "topics": [
          "Pradhan Mantri Matsya Sampada Yojana (PMMSY): Operational guidelines, subsidy patterns, and infrastructure funding models",
          "Mukhya Mantri Matsya Vikas Yojana (Bihar): Pond renovation, input subsidies for fish farmers, and women self-help group assistance",
          "Role of Fishermen Co-operative Societies (Matshyajivi Sahyog Samiti) in waterbody leasing and credit linkage",
          "Extension methodologies: Frontline demonstrations, participatory rural appraisal (PRA), kisan goshthi, and digital agri-portals (OFMS Bihar)"
        ]
      }
    ],
    "cutOffTrends": [
      {
        "year": "2024 Technical Cadre (Level 7)",
        "totalMarks": 100,
        "general": 68.5,
        "obc": 63,
        "ews": 61.5,
        "sc": 54,
        "st": 52
      },
      {
        "year": "2022 Technical Cadre (Benchmark)",
        "totalMarks": 100,
        "general": 64.25,
        "obc": 59.5,
        "ews": 57,
        "sc": 50,
        "st": 48.5
      }
    ],
    "faqs": [
      {
        "question": "Are general B.Sc. Zoology or M.Sc. Zoology candidates eligible for BTSC Advt 28/2026?",
        "answer": "No. As per the statutory Bihar Fisheries Service Recruitment Rules and BTSC Advt 28/2026, ONLY candidates possessing a 4-year Bachelor of Fisheries Science (B.F.Sc.) degree from an Agricultural University or Fisheries College recognized by the Indian Council of Agricultural Research (ICAR), New Delhi are eligible. General B.Sc. / M.Sc. Zoology degrees without a 4-year professional B.F.Sc. cannot be considered."
      },
      {
        "question": "Can candidates from states outside Bihar apply for BTSC Fishery Extension Officer?",
        "answer": "Yes. Eligible candidates holding a 4-year B.F.Sc. from any recognized Indian ICAR institution who are non-domiciles of Bihar can apply under the Unreserved (General) category. However, age relaxation and vertical/horizontal reservation benefits (EWS, BC, EBC, SC, ST, WBC, and Women 35% reservation) are strictly restricted to permanent residents/domiciles of Bihar."
      },
      {
        "question": "How is the 25-mark contractual experience weightage calculated by BTSC?",
        "answer": "Candidates who have served as Fishery Extension Officers or equivalent technical staff on a contractual basis under the Dairy, Fisheries and Animal Resources Department of Bihar receive 5 marks for every 1 full year of verified completed service, up to a maximum ceiling of 25 marks. The experience certificate must be in the prescribed proforma countersigned by the competent District Fisheries Officer (DFO)."
      },
      {
        "question": "What are the minimum qualifying marks in the BTSC Fishery Extension Officer CBT?",
        "answer": "In compliance with Bihar Government Department of Personnel & Administrative Reforms (General Administration Dept) guidelines, candidates must score at least: General/UR: 40%, Backward Classes (BC): 36.5%, Extremely Backward Classes (EBC): 34%, and SC / ST / Women / PwBD: 32% in the Computer Based Test to be considered for merit listing."
      },
      {
        "question": "What is the gross monthly pay and in-hand salary for BTSC Fishery Extension Officer in 2026?",
        "answer": "The post is classified under 7th CPC Pay Matrix Level 7 with a starting basic pay of ₹44,900. Adding Dearness Allowance at 50% (₹22,450), House Rent Allowance (₹3,592 to ₹12,123 depending on rural block, district headquarters, or Patna municipal limits), and Medical Allowance (₹1,000), the gross monthly salary ranges from ₹72,942 to ₹81,473. The expected net in-hand salary post NPS pension (10%) and GIS deductions is approximately ₹65,200 to ₹73,800 per month."
      },
      {
        "question": "What documents are required during online form submission on btsc.bihar.gov.in?",
        "answer": "Applicants must keep scanned copies ready: 10th Matriculation certificate (for DOB proof), 4-year B.F.Sc. degree certificate or provisional degree certificate (PDC) along with all semester marks transcripts, ICAR accreditation certificate copy of university, domicile certificate of Bihar (if claiming reservation), non-creamy layer (NCL) certificate for BC/EBC, EWS certificate for 2026-27, contractual experience certificate (if applicable), and passport photograph and signature conforming to BTSC specifications."
      }
    ],
    "howToApplySteps": [
      "Visit the official Bihar Technical Service Commission web portal at https://btsc.bihar.gov.in or https://online.bihar.gov.in.",
      "Click on \"Online Applications\" and select \"Notice No. 28/2026 - Recruitment for the post of Fisheries Extension Officer (मत्स्य प्रसार पदाधिकारी)\".",
      "Complete the One-Time Registration (OTR) with your valid mobile number and personal email address to obtain your Registration ID and Password.",
      "Fill in the comprehensive online application form: Enter educational details specifying 4-year B.F.Sc. degree, university name, ICAR approval code, passing year, and percentage/OGPA.",
      "Upload digital scanned copies of your passport photo (20–50 KB, white background), signature in Hindi & English (10–20 KB), B.F.Sc. degree certificate, Bihar Domicile/NCL/EWS certificates, and experience proforma.",
      "Pay the online non-refundable application fee of ₹100 using Net Banking, Debit/Credit Card, or UPI, review the preview form, and download 2 color printouts of the final submitted application acknowledgement slip with barcode for document verification."
    ],
    "whoShouldApply": [
      "Holders of 4-year Bachelor of Fisheries Science (B.F.Sc.) from ICAR-recognized agricultural/fisheries universities seeking regular cadre appointment in Bihar.",
      "Candidates seeking Level 7 (₹44,900 basic pay) positions with 35% horizontal reservation for women (77 posts)."
    ],
    "whoShouldSkip": [
      "Candidates with 3-year B.Sc. Zoology or general B.Sc. degrees without ICAR-recognized 4-year B.F.Sc. accreditation.",
      "Candidates exceeding the maximum age limit of 37 years (UR male) or 40 years (BC/EBC/UR female) as on 01-08-2026."
    ],
    "commonRejectionMistakes": [
      "Uploading degree certificates from non-ICAR approved private institutes.",
      "Submitting expired Non-Creamy Layer (NCL) or EWS certificates issued outside the 2026-27 financial year.",
      "Failing to upload separate signatures in both Hindi and English as mandated by BTSC Advt 28/2026."
    ],
    "documentsNeeded": [
      "10th Matriculation certificate for Date of Birth proof",
      "4-year B.F.Sc. Degree Certificate and consolidated all-semester marks transcripts",
      "ICAR accreditation code/proof of the awarding university",
      "Bihar Domicile and Category/NCL/EWS Certificate (if claiming reservation)",
      "Passport photograph with white background and bilingual signature files"
    ],
    "officialLinks": [
      {
        "title": "BTSC Official Application Portal",
        "label": "Apply Online (btsc.bihar.gov.in)",
        "url": "https://btsc.bihar.gov.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Official Notification PDF (Advt 28/2026)",
        "label": "Download Detailed Gazette PDF (28/2026)",
        "url": "https://btsc.bihar.gov.in",
        "linkType": "pdf"
      },
      {
        "title": "Bihar Animal & Fisheries Resources Dept",
        "label": "View Pashu evam Matsya Vibhag (ahd.bihar.gov.in)",
        "url": "https://ahd.bihar.gov.in",
        "linkType": "official"
      },
      {
        "title": "BTSC Age Cut-Off Calculator",
        "label": "Verify Age on 01-08-2026",
        "url": "/tools/age",
        "linkType": "tool"
      },
      {
        "title": "Negative Marking CBT Calculator",
        "label": "Calculate 0.25 CBT Penalty Score",
        "url": "/tools/marking",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Download and print the official gazette syllabus to tick off every individual sub-topic systematically during your study schedule.",
      "Dedicate the first 2 hours of daily study to your weakest subject before moving to familiar revision topics.",
      "Conduct weekly timed self-assessment tests and compute your net score strictly applying the official negative marking formula.",
      "Review official commission corrigenda and model answer keys to understand recurring question structures and accepted representations.",
      "Ensure all mandatory identity documents and category certificates are renewed within the prescribed financial year validity window."
    ]
  },
  {
    "id": "sbi-ja-clerk-2026-mega",
    "slug": "sbi-junior-associates-clerk-recruitment-2026",
    "category": "jobs",
    "title": "SBI Clerk 2026 Junior Associates Notification",
    "organization": "State Bank of India (SBI)",
    "examName": "Junior Associates (Customer Support & Sales)",
    "postCount": "12,500+",
    "publishDate": "28 Sep 2026",
    "lastDate": "18 Nov 2026",
    "examDate": "January 2027",
    "qualification": "Graduation Degree in any stream from recognized University",
    "qualificationTier": "graduate",
    "sector": "banking",
    "minAge": 20,
    "maxAge": 28,
    "ageLimit": "20 to 28 Years as on 01-08-2026 (SC/ST +5, OBC +3, PwBD +10)",
    "fees": "₹750 for General / OBC / EWS; Nil (₹0) for SC / ST / PwBD / ESM",
    "sourceNotice": {
      "title": "State Bank of India Careers Recruitment Page",
      "url": "https://sbi.co.in/web/careers",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "30 Sep 2026, 10:00 IST",
    "readTime": "9 min read",
    "summary": "State Bank of India invites online applications from eligible Indian citizens for appointment as Junior Associate (Customer Support & Sales) across 17 circles. Features enhanced starting salary under 12th Bipartite Settlement (Gross ~₹39,200/mo), comprehensive pension, and Pan-India postings.",
    "linkText": "Check Circle Vacancies & Apply Online",
    "calculatorToolType": "age",
    "importantDates": [
      {
        "event": "Detailed Notification Released",
        "date": "28 September 2026"
      },
      {
        "event": "Online Registration Opens",
        "date": "28 September 2026"
      },
      {
        "event": "Last Date for Online Submission",
        "date": "18 November 2026 (23:59 Hrs)"
      },
      {
        "event": "Last Date for Fee Payment",
        "date": "18 November 2026"
      },
      {
        "event": "Preliminary Examination Window",
        "date": "January 2027"
      },
      {
        "event": "Main Examination Window",
        "date": "February / March 2027"
      }
    ],
    "applicationFees": [
      {
        "category": "General / OBC / EWS Candidates",
        "fee": "₹750 (Application fee + Intimation charge)"
      },
      {
        "category": "SC / ST / PwBD / Ex-Servicemen",
        "fee": "Exempted (Nil / ₹0)"
      }
    ],
    "vacanciesTable": [
      {
        "postName": "Junior Associate (Customer Support & Sales)",
        "department": "State Bank of India - 17 Circles",
        "classification": "Clerical Cadre (Permanent)",
        "payScale": "Starting Basic ₹26,730 (Gross ₹39,200/mo + perks)",
        "vacancy": "12,500+",
        "eligibility": "Graduation in any discipline + Proficiency in local language of state"
      }
    ],
    "salaryStructure": {
      "payLevel": "Clerical Cadre (12th Bipartite Wage Settlement)",
      "basicPay": "₹26,730 per month (with 2 advance increments for graduates)",
      "daPercent": "15.7% of Basic Pay",
      "hraPercent": "₹2,600 to ₹3,800 depending on city tier",
      "grossMonthly": "₹39,200 – ₹42,500 per month",
      "inHandMonthly": "₹34,800 – ₹37,500 per month (Post NPS & professional tax deductions)",
      "benefits": [
        "Provident Fund & New Pension Scheme (NPS) with bank matching contribution",
        "Comprehensive Medical Aid covering 100% hospitalization for employee and 75% for dependents",
        "Leave Fare Concession (LFC) every 2 years across India",
        "Reimbursement for newspaper, tea/refreshment, and uniform allowance"
      ]
    },
    "whoShouldApply": [
      "Graduates in any discipline from a recognized university, or candidates in their final year of graduation who can produce proof of having passed on or before the document verification cutoff date.",
      "Aspirants proficient (reading, writing, speaking, and understanding) in the specified local language of the applied state/UT.",
      "Candidates aged 20 to 28 years (with statutory relaxations: up to 31 for OBC, 33 for SC/ST, and 38 for PwBD).",
      "Banking aspirants seeking permanent public sector clerical employment with revised 12th Bipartite wage scale and comprehensive healthcare benefits."
    ],
    "whoShouldSkip": [
      "Candidates who cannot produce proof of graduation degree completion on or before the prescribed eligibility date.",
      "Candidates lacking proficiency in the local language of the state they wish to apply for (SBI strictly conducts a mandatory Local Language Test prior to joining; failure leads to rejection).",
      "Candidates exceeding 28 years of age without eligible category relaxation.",
      "Candidates with an active adverse CIBIL / credit bureau score (SBI requires a clean credit history with CIBIL score of 650 or above at appointment)."
    ],
    "commonRejectionMistakes": [
      "Writing the handwritten declaration in CAPITAL LETTERS: SBI strictly rejects handwritten declarations not drafted in the candidate’s normal cursive English handwriting.",
      "Uploading a blurry left thumb impression: Smudged thumb impressions lead to application rejection or biometric failure at the exam center.",
      "Applying for a state without local language command: Unlike IBPS Clerk, SBI does not allow inter-circle transfer for Junior Associates for several initial years.",
      "Submitting incomplete credit score declarations: Failing to settle delinquent loans or credit card defaults prior to document verification."
    ],
    "documentsNeeded": [
      "Graduation Degree Certificate or provisional passing certificate and all semester mark sheets.",
      "Recent passport-size color photograph (20 KB to 50 KB, light background).",
      "Scanned signature in running handwriting on white paper with black ink (10 KB to 20 KB).",
      "Left Thumb Impression scan (20 KB to 50 KB, black or blue ink on white paper).",
      "Handwritten declaration written in candidate’s own English handwriting (50 KB to 100 KB).",
      "10th / 12th mark sheet showing studied local language of the opted state (exempts from Language Proficiency Test).",
      "Category Certificate (SC/ST/OBC-NCL/EWS) in prescribed format valid for the active financial year."
    ],
    "salaryArithmetic": {
      "basicPay": 26730,
      "daRate": 0.157,
      "daAmount": 4196,
      "hraRate": 0.1,
      "hraAmount": 2673,
      "transportAllowance": 1500,
      "grossMonthly": 39200,
      "npsDeduction": 3092,
      "otherDeductions": 450,
      "totalDeductions": 3542,
      "netInHandMonthly": 35658,
      "inputsDated": "01 October 2026 (12th Bipartite Wage Settlement Clerical Scale)",
      "isEstimate": false,
      "notes": "Calculated with 2 advance increments for graduates under 12th Bipartite wage revision. Special allowance (₹4,100) and conveyance allowance included."
    },
    "howToApplySteps": [
      "Navigate to the official SBI Careers portal at https://sbi.co.in/web/careers or https://bank.sbi/careers.",
      "Locate \"Recruitment of Junior Associates (Customer Support & Sales) 2026\" and click \"Apply Online\".",
      "Register your candidate profile to generate a unique Registration Number and Password.",
      "Select your Circle and applied State carefully (transfers outside the applied circle are strictly barred for initial 5 years).",
      "Fill in graduation marks, local language studied in 10th/12th, and reservation category details.",
      "Upload scanned passport photograph, signature, left thumb impression, and prescribed handwritten declaration in cursive English.",
      "Pay ₹750 online fee (exempt for SC/ST/PwBD) and download the final application printout with payment e-receipt."
    ],
    "examPattern": [
      {
        "subject": "Prelims: English Language (30 Qs / 20 Mins)",
        "questions": 30,
        "marks": 30,
        "time": "20 Minutes Sectional",
        "negativeMarking": "0.25 Negative Marks"
      },
      {
        "subject": "Prelims: Numerical Ability (35 Qs / 20 Mins)",
        "questions": 35,
        "marks": 35,
        "time": "20 Minutes Sectional",
        "negativeMarking": "0.25 Negative Marks"
      },
      {
        "subject": "Prelims: Reasoning Ability (35 Qs / 20 Mins)",
        "questions": 35,
        "marks": 35,
        "time": "20 Minutes Sectional",
        "negativeMarking": "0.25 Negative Marks"
      },
      {
        "subject": "Mains: General/Financial Awareness, English, Quant, Reasoning (Combined)",
        "questions": 190,
        "marks": 200,
        "time": "160 Minutes (Sectional Timings)",
        "negativeMarking": "0.25 Negative Marks"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "Financial & General Awareness",
        "weightage": "50 Marks (Mains)",
        "topics": [
          "Banking Awareness, Reserve Bank of India Monetary Directives, Priority Sector Lending",
          "Current Affairs (National & International), Union Budget, Economic Survey Insights",
          "Government Schemes: PMJDY, PMJJBY, PMSBY, Atal Pension Yojana, Mudra Loans",
          "Static GK: National Parks, International Financial HQs, Currencies & Capitals"
        ]
      },
      {
        "subject": "Quantitative Aptitude & Numerical Ability",
        "weightage": "50 Marks (Mains)",
        "topics": [
          "Simplification & Approximation, Missing & Wrong Number Series, Quadratic Equations",
          "Data Interpretation: Bar Graphs, Line Graphs, Pie Charts, Caselet DI, Radar Charts",
          "Arithmetic: Percentages, Profit & Loss, Ratio & Proportion, SI & CI, Time & Work, Speed Distance & Time"
        ]
      },
      {
        "subject": "Reasoning Ability & Computer Aptitude",
        "weightage": "60 Marks (Mains)",
        "topics": [
          "Seating Arrangements (Circular, Linear, Square), Floor & Box Puzzles, Scheduling Puzzles",
          "Syllogisms (Only a few / Possibility cases), Coding-Decoding, Inequalities, Blood Relations",
          "Computer Hardware & Architecture, Binary-to-Decimal conversions, Cloud Storage & Cyber Safety"
        ]
      }
    ],
    "cutOffTrends": [
      {
        "year": "2023 Prelims (Delhi Circle)",
        "totalMarks": 100,
        "general": 57.25,
        "obc": 53.5,
        "ews": 56,
        "sc": 48,
        "st": 42.5
      },
      {
        "year": "2023 Prelims (Uttar Pradesh Circle)",
        "totalMarks": 100,
        "general": 60.5,
        "obc": 57.25,
        "ews": 59,
        "sc": 51.5,
        "st": 44
      },
      {
        "year": "2022 Prelims (Delhi Circle)",
        "totalMarks": 100,
        "general": 72.75,
        "obc": 67.5,
        "ews": 70,
        "sc": 61.25,
        "st": 54
      },
      {
        "year": "2022 Prelims (Uttar Pradesh Circle)",
        "totalMarks": 100,
        "general": 77.5,
        "obc": 73.25,
        "ews": 75.5,
        "sc": 66,
        "st": 57.5
      }
    ],
    "faqs": [
      {
        "question": "Is there any personal interview for SBI Clerk (Junior Associates)?",
        "answer": "No. There is no personal interview round for clerical appointments in SBI. Final selection is based 100% on marks obtained in the Phase-II Main Examination, subject to qualifying the mandatory Local Language Test."
      },
      {
        "question": "What is the Local Language Test (LPT) in SBI Clerk?",
        "answer": "Candidates who did not study the specified official local language of their applied state in 10th or 12th standard must take and clear a local language test conducted by SBI prior to final joining. Failure to clear the test results in cancellation of candidature."
      },
      {
        "question": "Is there sectional cut-off in SBI Clerk Prelims or Mains?",
        "answer": "No. State Bank of India does not apply minimum sectional cut-offs in either the Preliminary or the Main examination. Selection is decided strictly based on total aggregate score."
      },
      {
        "question": "What is the starting in-hand salary of an SBI Junior Associate?",
        "answer": "Under the revised 12th Bipartite wage scale with two graduate increments, the starting basic pay is ₹26,730, yielding gross monthly earnings of approximately ₹39,200 and net in-hand pay between ₹34,800 and ₹37,500 depending on circle city tier."
      }
    ],
    "officialLinks": [
      {
        "title": "SBI Careers Portal",
        "label": "Apply Online (sbi.co.in/careers)",
        "url": "https://sbi.co.in/web/careers",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Age Calculator",
        "label": "Verify Age on 01-08-2026",
        "url": "/tools/age",
        "linkType": "tool"
      },
      {
        "title": "Salary Calculator",
        "label": "Calculate 12th Bipartite In-Hand Pay",
        "url": "/tools/salary",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Master 20-minute sectional time management: aim for 28+ attempts in Reasoning, 25+ in Quantitative Aptitude, and 22+ in English.",
      "Focus on High-Yield Puzzle Formats (Floor with Flat, Box, Square seating with vacant seats) to guarantee 15-20 marks within 10 minutes.",
      "Practice Simplification, Quadratic Inequalities, and Number Series daily for effortless 12-15 score banking.",
      "Read daily editorial columns to improve reading comprehension skimming speed and contextual vocabulary identification.",
      "Strictly avoid spending more than 2.5 minutes on a single arithmetic word problem or unfamiliar puzzle arrangement."
    ]
  },
  {
    "id": "isro-scientist-sc-2026",
    "slug": "isro-scientist-engineer-sc-recruitment-2026",
    "category": "jobs",
    "title": "ISRO Scientist Engineer SC 2026 Notification",
    "organization": "Indian Space Research Organisation (ISRO)",
    "examName": "ISRO Centralised Recruitment Board (ICRB) Scientist SC Exam",
    "postCount": "303",
    "publishDate": "29 Sep 2026",
    "lastDate": "04 Nov 2026",
    "examDate": "December 2026",
    "qualification": "B.E. / B.Tech in Electronics, Mechanical, or Computer Science (Min 65% or 6.84 CGPA)",
    "qualificationTier": "graduate",
    "sector": "other",
    "minAge": 18,
    "maxAge": 28,
    "ageLimit": "18 to 28 Years as on 04-11-2026 (OBC 31, SC/ST 33)",
    "fees": "₹250 (₹250 refund for Women / SC / ST / PwBD on CBT attendance)",
    "sourceNotice": {
      "title": "ISRO Centralised Recruitment Board (ICRB) Notice Board",
      "url": "https://www.isro.gov.in/Careers.html",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "11 Oct 2026, 15:00 IST",
    "readTime": "8 min read",
    "summary": "Indian Space Research Organisation invites applications for 303 Scientist/Engineer \"SC\" vacancies across premier centers including URSC Bengaluru, VSSC Thiruvananthapuram, SDSC SHAR Sriharikota, and SAC Ahmedabad with 7th CPC Level 10 pay matrix (₹56,100 starting basic + DA + HRA).",
    "linkText": "Check Discipline Vacancies & Apply Online",
    "calculatorToolType": "marking",
    "importantDates": [
      {
        "event": "Notification Released on ISRO Portal",
        "date": "29 September 2026"
      },
      {
        "event": "Online Application Portal Opens",
        "date": "29 September 2026"
      },
      {
        "event": "Last Date for Online Submission",
        "date": "04 November 2026 (17:00 Hrs)"
      },
      {
        "event": "Last Date for Online Fee Payment",
        "date": "06 November 2026"
      },
      {
        "event": "Written CBT Examination",
        "date": "December 2026"
      }
    ],
    "applicationFees": [
      {
        "category": "Application Processing Fee (All Candidates)",
        "fee": "₹250 (Non-refundable)"
      },
      {
        "category": "Refundable Exam Fee (General/OBC)",
        "fee": "₹500 (Refundable ₹400 on attending CBT)"
      },
      {
        "category": "Women, SC, ST, PwBD, ESM Candidates",
        "fee": "Full Refund of ₹500 on attending CBT"
      }
    ],
    "vacanciesTable": [
      {
        "postName": "Scientist / Engineer \"SC\" (Mechanical)",
        "department": "ISRO Centers (URSC / VSSC / LPSC / SDSC)",
        "classification": "Central Civil Services Group A (Gazetted)",
        "payScale": "Level 10 (₹56,100 – ₹1,77,500)",
        "vacancy": "128",
        "eligibility": "B.E./B.Tech in Mechanical Engg with First Class (min 65% aggregate or 6.84 CGPA)"
      },
      {
        "postName": "Scientist / Engineer \"SC\" (Electronics)",
        "department": "ISRO Centers (SAC / URSC / ISTRAC)",
        "classification": "Central Civil Services Group A (Gazetted)",
        "payScale": "Level 10 (₹56,100 – ₹1,77,500)",
        "vacancy": "105",
        "eligibility": "B.E./B.Tech in ECE / Electronics with First Class (min 65% aggregate or 6.84 CGPA)"
      },
      {
        "postName": "Scientist / Engineer \"SC\" (Computer Science)",
        "department": "ISRO Centers (NRSC / URSC / IIRS)",
        "classification": "Central Civil Services Group A (Gazetted)",
        "payScale": "Level 10 (₹56,100 – ₹1,77,500)",
        "vacancy": "70",
        "eligibility": "B.E./B.Tech in Computer Science / IT with First Class (min 65% aggregate or 6.84 CGPA)"
      }
    ],
    "whoShouldApply": [
      "Engineering graduates (B.E./B.Tech or equivalent) in Mechanical, Electrical, Electronics, or Computer Science with minimum 65% aggregate or 6.84 CGPA.",
      "Candidates seeking Level 10 Scientist/Engineer SC career paths in national space research centers (VSSC, URSC, SAC, LPSC)."
    ],
    "whoShouldSkip": [
      "Candidates with aggregate engineering marks below 65% or CGPA below 6.84 (strict cut-off with no rounding off allowed).",
      "Candidates awaiting final semester results without provisional degree clearance before the application closing date."
    ],
    "commonRejectionMistakes": [
      "Uploading CGPA conversion certificates without the official university conversion formula attached.",
      "Selecting the incorrect engineering discipline code during ICRB online registration.",
      "Submitting blurry GATE scorecards or identity documents."
    ],
    "documentsNeeded": [
      "B.E. / B.Tech Degree Certificate or Provisional Degree Certificate (PDC)",
      "Consolidated marks transcript covering all 8 semesters",
      "Official CGPA-to-Percentage conversion formula certificate issued by Registrar",
      "Valid Government Photo ID (Aadhaar Card, Passport, or Voter ID)",
      "Category / PwBD Certificate (if claiming fee exemption)"
    ],
    "salaryArithmetic": {
      "basicPay": 56100,
      "daRate": 0.5,
      "daAmount": 28050,
      "hraRate": 0.27,
      "hraAmount": 15147,
      "transportAllowance": 7200,
      "grossMonthly": 106497,
      "npsDeduction": 8415,
      "otherDeductions": 800,
      "totalDeductions": 9215,
      "netInHandMonthly": 97282,
      "inputsDated": "01 July 2026 (7th CPC Level 10 Pay Matrix)",
      "isEstimate": false,
      "notes": "Calculated for ISRO research centers in Class-X cities (Bengaluru URSC, SAC Ahmedabad). Subsidized residential accommodation and medical benefits (CHSS) provided."
    },
    "howToApplySteps": [
      "Access the official ISRO Centralised Recruitment Board portal at https://www.isro.gov.in/Careers.html.",
      "Select the active advertisement for Scientist/Engineer \"SC\" Recruitment 2026.",
      "Register your candidate profile by entering matriculation details, primary email, and mobile number.",
      "Fill in discipline details (Mechanical, Electronics, Computer Science) and academic marks across all 8 engineering semesters.",
      "Upload recent photograph (10 KB to 40 KB) and scanned signature strictly according to portal format specifications.",
      "Complete online fee payment of ₹250 application fee plus ₹500 test fee via SBI payment gateway and download confirmation receipt."
    ],
    "examPattern": [
      {
        "subject": "Part A: Core Discipline Engineering Knowledge",
        "questions": 80,
        "marks": 80,
        "time": "Combined 120 Minutes",
        "negativeMarking": "0.33 Negative Marks per incorrect answer"
      },
      {
        "subject": "Part B: Aptitude & Reasoning Ability",
        "questions": 15,
        "marks": 20,
        "time": "Combined 120 Minutes",
        "negativeMarking": "No Negative Marking in Part B"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "Core Engineering Discipline (GATE Equivalent Standard)",
        "weightage": "80 Marks",
        "topics": [
          "Mechanical: Applied Mechanics and Design, Fluid Mechanics & Thermal Sciences, Materials & Manufacturing Processes, Industrial Engineering",
          "Electronics: Networks, Electronic Devices, Analog & Digital Circuits, Control Systems, Communications, Electromagnetics",
          "Computer Science: Algorithms, Data Structures, Theory of Computation, Operating Systems, Databases, Computer Networks, Software Engineering"
        ]
      },
      {
        "subject": "General Aptitude & Technical Comprehension",
        "weightage": "20 Marks",
        "topics": [
          "Numerical Reasoning, Data Interpretation, Spatial Aptitude, Verbal Reasoning, Technical Abstract Problem Solving"
        ]
      }
    ],
    "faqs": [
      {
        "question": "What is the selection process and interview weightage for ISRO Scientist SC?",
        "answer": "Selection involves a computer-based screening test followed by a personal interview. The written test shortlists candidates in a 1:5 ratio per vacancy. Final selection is based 50% on the written test score and 50% on the personal interview, subject to scoring at least 60% in the interview."
      },
      {
        "question": "Can final semester engineering students apply for ISRO ICRB?",
        "answer": "No. Candidates must possess their provisional degree certificate or final consolidated marksheet declaring First Class graduation (min 65% aggregate or 6.84 CGPA) on or before the application closing date."
      },
      {
        "question": "Is a GATE scorecard compulsory for ISRO Scientist Engineer SC recruitment?",
        "answer": "No. The ICRB Scientist SC recruitment is an independent national direct recruitment drive conducted via ISRO written examination; GATE qualification is not mandatory."
      },
      {
        "question": "What is the starting monthly take-home salary of an ISRO Scientist SC?",
        "answer": "Under 7th CPC Level 10, the starting basic pay is ₹56,100. With 50% DA, 27% HRA, and Transport Allowance, gross monthly earnings reach ₹1,06,497, resulting in approx ₹97,282 in-hand take-home after statutory NPS and tax deductions."
      }
    ],
    "officialLinks": [
      {
        "title": "ISRO ICRB Portal",
        "label": "Apply Online (isro.gov.in)",
        "url": "https://www.isro.gov.in/Careers.html",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Marking Calculator",
        "label": "Calculate ISRO 0.33 Negative Marks",
        "url": "/tools/marking",
        "linkType": "tool"
      },
      {
        "title": "Salary Calculator",
        "label": "View 7th CPC Level 10 Pay Breakdown",
        "url": "/tools/salary",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Download and print the official gazette syllabus to tick off every individual sub-topic systematically during your study schedule.",
      "Dedicate the first 2 hours of daily study to your weakest subject before moving to familiar revision topics.",
      "Conduct weekly timed self-assessment tests and compute your net score strictly applying the official negative marking formula.",
      "Review official commission corrigenda and model answer keys to understand recurring question structures and accepted representations.",
      "Ensure all mandatory identity documents and category certificates are renewed within the prescribed financial year validity window."
    ],
    "cutOffTrends": [
      {
        "year": "2024 ICRB Scientist SC (Screening CBT)",
        "general": 68.25,
        "obc": 62.5,
        "ews": 60.75,
        "sc": 54,
        "st": 51.5,
        "totalMarks": 100
      },
      {
        "year": "2023 ICRB Scientist SC (Screening CBT)",
        "general": 64,
        "obc": 58.75,
        "ews": 57.25,
        "sc": 50.5,
        "st": 48,
        "totalMarks": 100
      },
      {
        "year": "2021 ICRB Written Test Benchmark",
        "general": 61.5,
        "obc": 56,
        "ews": 54.5,
        "sc": 48,
        "st": 45.5,
        "totalMarks": 100
      }
    ]
  },
  {
    "id": "rbi-grade-b-officers-2026",
    "slug": "rbi-grade-b-officers-recruitment-2026",
    "category": "jobs",
    "title": "RBI Grade B Officers 2026 Recruitment Notice",
    "organization": "Reserve Bank of India (RBI)",
    "examName": "RBI Officers in Grade B (Direct Recruit) Examination 2026",
    "postCount": "94",
    "publishDate": "25 Sep 2026",
    "lastDate": "25 Oct 2026",
    "examDate": "Phase-I: 28 Nov 2026 | Phase-II: Dec 2026",
    "qualification": "Graduation with min 60% marks (50% for SC/ST/PwBD) or Post-Graduation with min 55% marks",
    "qualificationTier": "graduate",
    "sector": "banking",
    "minAge": 21,
    "maxAge": 30,
    "ageLimit": "21 to 30 Years as on 01-10-2026 (Up to 32 for M.Phil, 34 for Ph.D.)",
    "fees": "₹850 for General / OBC / EWS; ₹100 for SC / ST / PwBD (Intimation charges)",
    "sourceNotice": {
      "title": "Reserve Bank of India Opportunities Portal",
      "url": "https://opportunities.rbi.org.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "11 Oct 2026, 15:30 IST",
    "readTime": "9 min read",
    "summary": "Reserve Bank of India invites online applications for Officers in Grade B (DR) (General), DEPR (Department of Economic and Policy Research), and DSIM (Department of Statistics and Information Management). Selected officers draw starting basic pay of ₹55,200 and initial gross monthly emoluments of ₹1,16,000+ plus premier bank quarters.",
    "linkText": "Check RBI Grade B Syllabus & Apply",
    "calculatorToolType": "age",
    "importantDates": [
      {
        "event": "Official Web Notification Released",
        "date": "25 September 2026"
      },
      {
        "event": "Online Application Portal Opens",
        "date": "25 September 2026"
      },
      {
        "event": "Last Date for Online Submission",
        "date": "25 October 2026 (18:00 Hrs)"
      },
      {
        "event": "Phase-I Online Examination (General)",
        "date": "28 November 2026"
      },
      {
        "event": "Phase-II Examination (General)",
        "date": "27 December 2026"
      }
    ],
    "applicationFees": [
      {
        "category": "General / OBC / EWS Candidates",
        "fee": "₹850 (Application Fee + Intimation Charges)"
      },
      {
        "category": "SC / ST / PwBD Candidates",
        "fee": "₹100 (Intimation Charges only)"
      },
      {
        "category": "RBI Staff Candidates",
        "fee": "Nil (₹0)"
      }
    ],
    "whoShouldApply": [
      "Graduates in any discipline with minimum 60% marks (50% for SC/ST/PwBD) or post-graduates with 55% marks, aged 21 to 30 years.",
      "Aspirants seeking direct officer entry into India central banking authority with comprehensive pay and allowances (Gross ₹1,16,000+/mo)."
    ],
    "whoShouldSkip": [
      "Unreserved (General) candidates who have already exhausted the maximum 6 allowable Phase-I preliminary exam attempts.",
      "Candidates not meeting the exact 60% graduation aggregate (marks of all semesters and subjects must be combined)."
    ],
    "commonRejectionMistakes": [
      "Overlooking the 6-attempt limit for General category candidates (appearing for Phase-I counts as a consumed attempt).",
      "Calculating graduation percentage by excluding optional or foundation subjects.",
      "Uploading caste/category certificates not formatted according to Central Government standards."
    ],
    "documentsNeeded": [
      "Graduation Degree Certificate and semester-wise consolidated marksheets",
      "10th and 12th certificates for Date of Birth verification",
      "Valid Photo Identity Card (Aadhaar, PAN Card, Passport)",
      "Central Format SC/ST/OBC-NCL/EWS Certificate",
      "Recent passport-size colour photograph and digital signature scan"
    ],
    "salaryArithmetic": {
      "basicPay": 55200,
      "daRate": 0.52,
      "daAmount": 28704,
      "hraRate": 0.15,
      "hraAmount": 8280,
      "transportAllowance": 6400,
      "grossMonthly": 116284,
      "npsDeduction": 8390,
      "otherDeductions": 1200,
      "totalDeductions": 9590,
      "netInHandMonthly": 106694,
      "inputsDated": "01 October 2026 (RBI Officer Scale-I Pay Structure)",
      "isEstimate": false,
      "notes": "Gross emoluments include Grade Allowance (₹11,500), Special Allowance (₹9,750), and Local Allowance. Bank lease accommodation up to ₹55,000/mo provided in Mumbai."
    },
    "howToApplySteps": [
      "Open the official RBI opportunities portal at https://opportunities.rbi.org.in.",
      "Click on \"Vacancies\" -> \"Recruitment for the post of Officers in Grade B (Direct Recruit) 2026\".",
      "Click \"Online Application Form\" to launch the IBPS-hosted registration gateway.",
      "Register with your active email and mobile number to receive provisional registration credentials.",
      "Enter graduation marks (strict 60% minimum aggregate across all subjects and semesters for General/OBC).",
      "Upload scanned passport photograph, signature, left thumb impression, and prescribed handwritten declaration.",
      "Pay the online application fee (₹850 for General/OBC/EWS, ₹100 for SC/ST/PwBD) and download the e-receipt and application summary."
    ],
    "examPattern": [
      {
        "subject": "Phase-I: General Awareness, Reasoning, English, Quant (Combined)",
        "questions": 200,
        "marks": 200,
        "time": "120 Minutes (Sectional Timings)",
        "negativeMarking": "0.25 Negative Marks per wrong answer"
      },
      {
        "subject": "Phase-II Paper 1: Economic and Social Issues (ESI - 50% Obj + 50% Desc)",
        "questions": 30,
        "marks": 100,
        "time": "120 Minutes",
        "negativeMarking": "0.25 for objective section"
      },
      {
        "subject": "Phase-II Paper 2: Descriptive English (Writing Skills - Essay, Précis, Letter)",
        "questions": 3,
        "marks": 100,
        "time": "90 Minutes",
        "negativeMarking": "Evaluated on grammar, structure & analysis"
      },
      {
        "subject": "Phase-II Paper 3: Finance and Management (FM - 50% Obj + 50% Desc)",
        "questions": 30,
        "marks": 100,
        "time": "120 Minutes",
        "negativeMarking": "0.25 for objective section"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "Economic and Social Issues (ESI)",
        "weightage": "100 Marks (Phase-II)",
        "topics": [
          "Growth and Development: Measurement of Growth, National Income, Per Capita Income, Poverty Alleviation",
          "Indian Economy: Economic History, Industrial & Services Policy, Monetary & Fiscal Policy Reforms, Five-Year Plans",
          "Globalization: Balance of Payments, Foreign Trade Policy, International Financial Institutions (IMF, World Bank, WTO)",
          "Social Structure in India: Multiculturalism, Demographic Trends, Urbanization, Gender Issues, Social Justice"
        ]
      },
      {
        "subject": "Finance and Management (FM)",
        "weightage": "100 Marks (Phase-II)",
        "topics": [
          "Financial System: Structure of Financial Institutions, Functions of Reserve Bank of India, Banking System Evolution",
          "Financial Markets: Money Market, Forex Market, Capital Market, Debt Market, Primary & Secondary Markets",
          "General Management: Management Role & Functions, Human Resource Development, Motivation Theories, Leadership, Corporate Governance",
          "Fintech & Digital Banking: Central Bank Digital Currency (CBDC), Unified Payments Interface (UPI), Cybersecurity in Banking"
        ]
      }
    ],
    "cutOffTrends": [
      {
        "year": "2023 Phase-I General (Out of 200)",
        "totalMarks": 200,
        "general": 54.25,
        "obc": 54.25,
        "ews": 54.25,
        "sc": 52.75,
        "st": 44.75
      },
      {
        "year": "2022 Phase-I General (Out of 200)",
        "totalMarks": 200,
        "general": 63.75,
        "obc": 60.25,
        "ews": 63.75,
        "sc": 55.25,
        "st": 50.75
      },
      {
        "year": "2021 Phase-I General (Out of 200)",
        "totalMarks": 200,
        "general": 66.75,
        "obc": 66.75,
        "ews": 66.75,
        "sc": 63.5,
        "st": 52.75
      }
    ],
    "faqs": [
      {
        "question": "What is the attempt limit for General category candidates in RBI Grade B?",
        "answer": "Candidates belonging to the Unreserved / General category who have already appeared six times for the Phase-I examination in the past are not eligible to apply. Appearing in the Phase-I exam consumes an attempt. No such restriction applies to SC, ST, OBC, or PwBD candidates."
      },
      {
        "question": "Are engineering graduates eligible to appear for RBI Grade B Officers?",
        "answer": "Yes. Any candidate holding a Bachelor degree in any discipline with at least 60% aggregate marks (50% for SC/ST/PwBD) or a Master degree with at least 55% aggregate marks from a recognized university is eligible."
      },
      {
        "question": "What is the gross monthly salary and perks of an RBI Grade B Officer?",
        "answer": "The starting basic pay is ₹55,200. Initial gross monthly emoluments exceed ₹1,16,000. In addition, officers are entitled to bank lease accommodation up to ₹55,000/month in Mumbai, interest-free housing loans, leave fare concessions, and medical benefits."
      },
      {
        "question": "What is the ratio of selection in Phase-I and Phase-II?",
        "answer": "Phase-I is an online qualifying screening test with sectional cut-offs. Approximately 15 times the number of vacancies are shortlisted for Phase-II. Final merit is determined solely on Phase-II written marks (300 Marks) plus Personal Interview marks (75 Marks)."
      }
    ],
    "officialLinks": [
      {
        "title": "RBI Opportunities Portal",
        "label": "Apply Online (rbi.org.in)",
        "url": "https://opportunities.rbi.org.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Age Calculator",
        "label": "Verify Age on 01-10-2026",
        "url": "/tools/age",
        "linkType": "tool"
      },
      {
        "title": "Salary Calculator",
        "label": "View RBI Officer Compensation",
        "url": "/tools/salary",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Master 20-minute sectional time management: aim for 28+ attempts in Reasoning, 25+ in Quantitative Aptitude, and 22+ in English.",
      "Focus on High-Yield Puzzle Formats (Floor with Flat, Box, Square seating with vacant seats) to guarantee 15-20 marks within 10 minutes.",
      "Practice Simplification, Quadratic Inequalities, and Number Series daily for effortless 12-15 score banking.",
      "Read daily editorial columns to improve reading comprehension skimming speed and contextual vocabulary identification.",
      "Strictly avoid spending more than 2.5 minutes on a single arithmetic word problem or unfamiliar puzzle arrangement."
    ]
  },
  {
    "id": "drdo-rac-scientist-b-2026",
    "slug": "drdo-rac-scientist-b-recruitment-2026-gate",
    "category": "jobs",
    "title": "DRDO RAC Scientist B 2026 Recruitment Notice",
    "organization": "Defence Research & Development Organisation (DRDO)",
    "examName": "Recruitment & Assessment Centre (RAC) Scientist B Advt 147",
    "postCount": "248",
    "publishDate": "30 Sep 2026",
    "lastDate": "15 Dec 2026",
    "examDate": "Personal Interview Jan–Feb 2027",
    "qualification": "First Class Bachelor Degree in Engg / Technology + Valid GATE Score",
    "qualificationTier": "graduate",
    "sector": "defence",
    "minAge": 18,
    "maxAge": 28,
    "ageLimit": "18 to 28 Years as on closing date 15-12-2026 (OBC 31, SC/ST 33)",
    "fees": "₹100 (Exempted for SC / ST / PwBD / Women candidates)",
    "sourceNotice": {
      "title": "DRDO Recruitment & Assessment Centre (RAC) Portal",
      "url": "https://rac.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "11 Oct 2026, 16:00 IST",
    "readTime": "7 min read",
    "summary": "Ministry of Defence, Government of India announces 248 Scientist B vacancies in DRDO laboratories and ADA across India in Electronics, Mechanical, Computer Science, Electrical, Physics, and Chemistry. Selection is based on valid GATE score (2024, 2025, or 2026) followed by Personal Interview in Defence Pay Level 10.",
    "linkText": "Check Discipline Seats & Apply Online",
    "importantDates": [
      {
        "event": "Official Advertisement Issued",
        "date": "30 September 2026"
      },
      {
        "event": "Online Application Portal Active",
        "date": "30 September 2026"
      },
      {
        "event": "Last Date for Online Submission",
        "date": "15 December 2026 (23:59 Hrs)"
      },
      {
        "event": "Shortlisted Candidates List",
        "date": "January 2027"
      },
      {
        "event": "Personal Interviews at RAC Delhi",
        "date": "February – March 2027"
      }
    ],
    "whoShouldApply": [
      "First-Class engineering graduates (B.E./B.Tech) or postgraduates in Science/Technology holding a valid GATE score (2024, 2025, or 2026) in relevant discipline.",
      "Candidates seeking Level 10 Scientist B defence research careers in DRDO premier laboratories (starting basic ₹56,100 + DA + HRA)."
    ],
    "whoShouldSkip": [
      "Candidates without a valid GATE score or those scoring below First Class standards as prescribed by the university.",
      "Candidates exceeding 28 years of age (UR) as on the application deadline, unless eligible for category relaxations."
    ],
    "commonRejectionMistakes": [
      "Submitting expired or unauthenticated GATE scorecards during RAC registration.",
      "Failing to convert CGPA into percentage using the exact approved university formula.",
      "Leaving mandatory project/thesis summary sections blank in the RAC portal."
    ],
    "documentsNeeded": [
      "Valid GATE Scorecard PDF (2024, 2025, or 2026 cycle)",
      "First-Class Engineering Degree Certificate and marks transcript",
      "Matriculation Certificate for Date of Birth proof",
      "Equivalence Certificate if engineering degree nomenclature differs from advertised discipline",
      "Central Government format Caste/Category certificate"
    ],
    "salaryArithmetic": {
      "basicPay": 56100,
      "daRate": 0.5,
      "daAmount": 28050,
      "hraRate": 0.27,
      "hraAmount": 15147,
      "transportAllowance": 7200,
      "grossMonthly": 106497,
      "npsDeduction": 8415,
      "otherDeductions": 800,
      "totalDeductions": 9215,
      "netInHandMonthly": 97282,
      "inputsDated": "01 October 2026 (7th CPC Level 10 Defence Pay Matrix)",
      "isEstimate": false,
      "notes": "Scientists receive Professional Update Allowance (₹22,500/yr), Children Education Allowance, subsidized defence campus housing, and comprehensive medical cover."
    },
    "howToApplySteps": [
      "Visit the official DRDO Recruitment & Assessment Centre portal at https://rac.gov.in.",
      "Register using your valid GATE registration number, qualifying examination cycle (2024, 2025, or 2026), and primary email.",
      "Complete biodata, academic qualifications from matriculation to engineering degree, and university percentage conversion.",
      "Upload valid GATE Score Card PDF, recent passport-size photograph, and scanned signature.",
      "Upload self-attested copies of B.E./B.Tech degree or provisional certificate and category/PwBD proof if claiming reservation.",
      "Pay ₹100 online application fee (exempt for SC/ST/PwBD/Women) and lock final submission before the closing deadline."
    ],
    "examPattern": [
      {
        "subject": "Item 1 Disciplines: Shortlisting via Valid GATE Score",
        "questions": 65,
        "marks": 100,
        "time": "3 Hours (GATE Benchmark)",
        "negativeMarking": "80% weightage given to GATE score in final merit"
      },
      {
        "subject": "Technical Personal Interview (RAC Board, Delhi)",
        "questions": 1,
        "marks": 100,
        "time": "45–60 Minutes in-depth technical board viva",
        "negativeMarking": "Min 70% qualifying cutoff for UR (60% for SC/ST)"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "Core Defence Research Disciplines (GATE Equivalent Standard)",
        "weightage": "80% Final Weightage",
        "topics": [
          "Electronics & Communication: Semiconductor Devices, Analog Circuits, Digital Systems, Control Engineering, Microwave & Antennas, Radar Principles",
          "Mechanical Engineering: Fluid Mechanics, Thermodynamics, Heat Transfer, Machine Design, Kinematics, Manufacturing Processes, Aerodynamics",
          "Computer Science: Algorithms, Data Structures, Operating Systems, Cryptography, Cybersecurity, Embedded Systems, Machine Learning"
        ]
      },
      {
        "subject": "Personal Technical Interview Evaluation Rubric",
        "weightage": "20% Final Weightage",
        "topics": [
          "Undergraduate Project Defense, Domain Engineering Problem Solving, Defense Technology Fundamentals, Experimental Research Aptitude"
        ]
      }
    ],
    "faqs": [
      {
        "question": "Is a separate written examination conducted for DRDO Scientist B under Item 1?",
        "answer": "No. For disciplines listed under Item 1, candidates are shortlisted directly based on valid GATE scores in a 1:5 ratio per vacancy, followed by an in-person technical personal interview conducted at RAC, Delhi."
      },
      {
        "question": "Can candidates appearing in the final semester apply for DRDO RAC?",
        "answer": "Candidates must possess their final degree or provisional degree certificate along with consolidated marksheets on or before the closing date of application (15 December 2026)."
      },
      {
        "question": "What is the minimum qualifying score in the technical personal interview?",
        "answer": "Candidates must secure at least 70% marks (60% for SC/ST/PwBD) in the personal interview to be considered eligible for final selection, regardless of their GATE score ranking."
      },
      {
        "question": "What is the starting salary and allowances of a DRDO Scientist B?",
        "answer": "Under 7th CPC Level 10, the starting basic pay is ₹56,100, leading to a monthly gross of approx ₹1,06,497 and net in-hand take-home of ₹97,282 in Class-X cities (Delhi, Bengaluru, Hyderabad) plus annual Professional Update Allowance and medical cover."
      }
    ],
    "officialLinks": [
      {
        "title": "DRDO RAC Portal",
        "label": "Apply Online (rac.gov.in)",
        "url": "https://rac.gov.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Salary Calculator",
        "label": "View Level 10 In-Hand Salary Breakdown",
        "url": "/tools/salary",
        "linkType": "tool"
      },
      {
        "title": "Age Relaxation Tool",
        "label": "Check DRDO Cut-off Age",
        "url": "/tools/age",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Combine academic preparation with daily physical conditioning (1600m running, push-ups, chin-ups) to maintain high PFT readiness.",
      "Develop strong English language command and current affairs articulation for the 5-day Services Selection Board (SSB) interview.",
      "Practice speed mathematics formulas for NDA/CDS: focus on trigonometry, matrices, coordinate geometry, and calculus shortcuts.",
      "Review military organization hierarchy, gallantry decorations, and current geopolitical developments for the General Knowledge paper.",
      "Maintain consistent sleep and hydration habits to ensure peak mental clarity during prolonged written examination sessions."
    ],
    "cutOffTrends": [
      {
        "year": "2024 RAC Item-1 Mechanical/Electronics",
        "general": 72.5,
        "obc": 66.25,
        "ews": 64,
        "sc": 58,
        "st": 54.5,
        "totalMarks": 100
      },
      {
        "year": "2023 RAC Item-1 GATE Score Normalized",
        "general": 69,
        "obc": 63.5,
        "ews": 61.25,
        "sc": 55,
        "st": 52,
        "totalMarks": 100
      },
      {
        "year": "2022 RAC Recruitment Cycle",
        "general": 66.75,
        "obc": 61,
        "ews": 59.5,
        "sc": 53.25,
        "st": 50,
        "totalMarks": 100
      }
    ]
  },
  {
    "id": "bel-project-trainee-engineer-2026",
    "slug": "bel-project-trainee-engineer-recruitment-2026",
    "category": "jobs",
    "title": "BEL Project & Trainee Engineer 2026 Notice",
    "organization": "Bharat Electronics Limited (Govt of India Enterprise)",
    "examName": "BEL Pan-India Strategic Business Units Recruitment 2026",
    "postCount": "415",
    "publishDate": "29 Sep 2026",
    "lastDate": "28 Nov 2026",
    "examDate": "CBT December 2026",
    "qualification": "B.E. / B.Tech / B.Sc Engg (4 Years) in Electronics, Mechanical, Electrical, Computer Science",
    "qualificationTier": "diploma-engg",
    "sector": "other",
    "minAge": 18,
    "maxAge": 32,
    "ageLimit": "Max 28 Years for Trainee Engineer; Max 32 Years for Project Engineer as on 01-11-2026",
    "fees": "₹472 for Project Engineer, ₹177 for Trainee Engineer (SC/ST/PwBD Nil)",
    "sourceNotice": {
      "title": "Bharat Electronics Limited Recruitment Section",
      "url": "https://bel-india.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "11 Oct 2026, 16:15 IST",
    "readTime": "6 min read",
    "summary": "Navratna defence PSU Bharat Electronics Limited seeks 415 engineering professionals for missile systems, radar networks, electronic warfare, and military communication projects. Consolidated remuneration up to ₹55,000 per month with annual increments.",
    "linkText": "Check Engineering Branches & Apply",
    "importantDates": [
      {
        "event": "Notification Released on BEL Portal",
        "date": "29 September 2026"
      },
      {
        "event": "Online Application Portal Opens",
        "date": "29 September 2026"
      },
      {
        "event": "Last Date for Online Submission",
        "date": "28 November 2026"
      },
      {
        "event": "Written CBT Exam Date",
        "date": "December 2026"
      }
    ],
    "whoShouldApply": [
      "Engineering graduates (B.E./B.Tech in Electronics, Mechanical, Computer Science, or Electrical) with 2 years industrial experience (for Project Engineer) or freshers (for Trainee Engineer).",
      "Candidates seeking employment in Navratna defence public sector enterprise with consolidated remuneration (₹30,000–₹55,000/mo)."
    ],
    "whoShouldSkip": [
      "Candidates without verifiable post-qualification industrial experience for the Project Engineer cadre.",
      "Candidates with distance-mode or correspondence engineering degrees."
    ],
    "commonRejectionMistakes": [
      "Submitting internship or pre-graduation training certificates as post-qualification work experience.",
      "Uploading experience certificates lacking formal company letterhead, official seal, or authorized signatory stamp.",
      "Miscalculating total aggregate percentage across all 4 years of engineering."
    ],
    "documentsNeeded": [
      "B.E. / B.Tech Degree Certificate & consolidated marks memo",
      "Formal appointment letters and relieving letters for all past employments",
      "Current employment experience certificate with exact role description and duration",
      "Latest 3 months salary slips or bank statements demonstrating salary credit",
      "Valid Photo ID and Caste Certificate (SC/ST/OBC/EWS)"
    ],
    "salaryArithmetic": {
      "basicPay": 40000,
      "daRate": 0,
      "daAmount": 0,
      "hraRate": 0,
      "hraAmount": 0,
      "transportAllowance": 0,
      "grossMonthly": 40000,
      "npsDeduction": 1800,
      "otherDeductions": 200,
      "totalDeductions": 2000,
      "netInHandMonthly": 38000,
      "inputsDated": "01 October 2026 (Navratna PSU Contract Scale)",
      "isEstimate": false,
      "notes": "Project Engineers receive ₹40,000 (1st yr), ₹45,000 (2nd yr), ₹50,000 (3rd yr), and ₹55,000 (4th yr) plus ₹12,000 annual reimbursement for medical and attire expenses."
    },
    "howToApplySteps": [
      "Navigate to the Bharat Electronics Limited careers portal at https://bel-india.in/CareersGrid.aspx.",
      "Download the official recruitment notification for the respective Strategic Business Unit (Missile Systems, Radars, Network Centric Systems).",
      "Register your candidate profile and upload consolidated 4-year engineering marksheets with final degree.",
      "Upload post-qualification work experience certificates showing clear employment dates on formal organization letterhead.",
      "Upload self-attested copies of 10th marksheet for age verification and Central format Caste/EWS certificate if claiming reservation.",
      "Pay application fee via SBI Collect (₹472 for Project Engineer, ₹177 for Trainee Engineer) and save transaction receipt."
    ],
    "examPattern": [
      {
        "subject": "Written Computer-Based Test (85% Weightage)",
        "questions": 100,
        "marks": 100,
        "time": "90 Minutes (85 Technical + 15 Aptitude)",
        "negativeMarking": "No Negative Marking in written test"
      },
      {
        "subject": "Personal Technical Interview (15% Weightage)",
        "questions": 1,
        "marks": 100,
        "time": "30 Minutes Technical Board Viva",
        "negativeMarking": "Evaluated on domain problem solving & project defense"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "Core Engineering Domain (Electronics / Mechanical / CS)",
        "weightage": "85 Marks",
        "topics": [
          "Electronics: Radar Principles, Microwave Engineering, Digital Signal Processing, Embedded Systems, Circuit Analysis, FPGA Design",
          "Mechanical: Fluid Mechanics, Thermodynamics, Machine Design, CAD/CAM, Precision Manufacturing, Hydraulic Control Systems",
          "Computer Science: Data Structures, Algorithms, Linux Kernel Architecture, Network Protocols, Cryptography, RTOS Programming"
        ]
      },
      {
        "subject": "General Aptitude & Reasoning Ability",
        "weightage": "15 Marks",
        "topics": [
          "Numerical Reasoning, Data Interpretation, Logical Deduction, Professional English Comprehension"
        ]
      }
    ],
    "faqs": [
      {
        "question": "What is the maximum duration of engagement in BEL for Project Engineers?",
        "answer": "The engagement is initially for a period of two years, extendable up to a maximum total period of four years based on project milestones and individual candidate performance."
      },
      {
        "question": "Is industrial work experience required for Trainee Engineer posts?",
        "answer": "No. Trainee Engineer vacancies require 0 years of experience (fresh engineering graduates are eligible). Project Engineer vacancies require a minimum of 2 years of relevant post-qualification industrial experience."
      },
      {
        "question": "Does teaching or academic research count as valid experience for BEL Project Engineers?",
        "answer": "No. BEL recruitment regulations strictly stipulate that only industrial experience in engineering design, manufacturing, testing, or maintenance will be considered. Teaching or academic project work is excluded."
      },
      {
        "question": "What is the annual pay increment for BEL contract engineers?",
        "answer": "Project Engineers receive a consolidated monthly stipend of ₹40,000 in Year 1, increasing to ₹45,000 in Year 2, ₹50,000 in Year 3, and ₹55,000 in Year 4, plus an annual allowance of ₹12,000 for medical and uniform expenses."
      }
    ],
    "officialLinks": [
      {
        "title": "BEL Careers Portal",
        "label": "Apply Online (bel-india.in)",
        "url": "https://bel-india.in/CareersGrid.aspx",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Marking Score Calculator",
        "label": "Simulate Written Test Scores",
        "url": "/tools/marking",
        "linkType": "tool"
      },
      {
        "title": "Age Relaxation Checker",
        "label": "Verify Cut-off Age Eligibility",
        "url": "/tools/age",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Download and print the official gazette syllabus to tick off every individual sub-topic systematically during your study schedule.",
      "Dedicate the first 2 hours of daily study to your weakest subject before moving to familiar revision topics.",
      "Conduct weekly timed self-assessment tests and compute your net score strictly applying the official negative marking formula.",
      "Review official commission corrigenda and model answer keys to understand recurring question structures and accepted representations.",
      "Ensure all mandatory identity documents and category certificates are renewed within the prescribed financial year validity window."
    ],
    "cutOffTrends": [
      {
        "year": "2024 Project Engineer CBT",
        "general": 71,
        "obc": 65.5,
        "ews": 63.25,
        "sc": 56.5,
        "st": 53,
        "totalMarks": 100
      },
      {
        "year": "2023 Trainee Engineer CBT",
        "general": 67.5,
        "obc": 62,
        "ews": 59.75,
        "sc": 53,
        "st": 50.5,
        "totalMarks": 100
      },
      {
        "year": "2022 Technical Selection Benchmark",
        "general": 64.25,
        "obc": 59,
        "ews": 57,
        "sc": 50.5,
        "st": 47.75,
        "totalMarks": 100
      }
    ]
  },
  {
    "id": "rpf-si-constable-2026",
    "slug": "rpf-si-constable-recruitment-2026",
    "category": "jobs",
    "title": "RPF Sub-Inspector & Constable 2026 Notice",
    "organization": "Ministry of Railways (Railway Protection Force & RPSF)",
    "examName": "RPF Centralized Employment Notice CEN 01/2026 & 02/2026",
    "postCount": "4,660",
    "publishDate": "28 Sep 2026",
    "lastDate": "28 Oct 2026",
    "examDate": "Dec 2026 – Jan 2027",
    "qualification": "10th Pass (Matriculation) for Constable; Bachelor’s Degree in any discipline for Sub-Inspector",
    "qualificationTier": "10th",
    "sector": "railways",
    "minAge": 18,
    "maxAge": 28,
    "ageLimit": "18 to 28 Years for Constable; 20 to 28 Years for SI (Includes official 3-year Railway age relaxation; OBC +3, SC/ST +5)",
    "fees": "₹500 (₹400 refunded on CBT attendance) / ₹250 for Women, SC, ST, Minorities, ESM (₹250 refunded)",
    "sourceNotice": {
      "title": "Railway Protection Force / Railway Recruitment Board",
      "url": "https://www.rrbapply.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "11 Oct 2026, 16:30 IST",
    "readTime": "8 min read",
    "summary": "The Ministry of Railways, Government of India, has notified 4,660 vacancies for Sub-Inspector (Executive) and Constable (Executive) in the Railway Protection Force (RPF) and Railway Protection Special Force (RPSF). Featuring 7th CPC Level 3 and Level 6 pay structures, comprehensive 3-year age relaxation, and standardized Physical Efficiency Test (PET) criteria.",
    "linkText": "Check RPF Details & Apply Online",
    "calculatorToolType": "height",
    "calculatorPresetId": "rpf-constable",
    "importantDates": [
      {
        "event": "Official Centralized Notice Published",
        "date": "28 September 2026"
      },
      {
        "event": "Online Application Portal Opens",
        "date": "28 September 2026"
      },
      {
        "event": "Last Date for Online Registration",
        "date": "28 October 2026 (23:59 Hrs)"
      },
      {
        "event": "Online Fee Payment Deadline",
        "date": "29 October 2026"
      },
      {
        "event": "Application Modification Window",
        "date": "31 October to 04 November 2026"
      },
      {
        "event": "Computer Based Test (CBT) Tentative Dates",
        "date": "December 2026 – January 2027"
      }
    ],
    "applicationFees": [
      {
        "category": "General / OBC / EWS Male Candidates",
        "fee": "₹500 (₹400 refunded after appearing in CBT)"
      },
      {
        "category": "Female Candidates (All Categories)",
        "fee": "₹250 (Full ₹250 refunded after appearing in CBT)"
      },
      {
        "category": "SC / ST / Ex-Servicemen / EBC Candidates",
        "fee": "₹250 (Full ₹250 refunded after appearing in CBT)"
      },
      {
        "category": "Payment Gateways",
        "fee": "Internet Banking, Debit/Credit Card, UPI"
      }
    ],
    "vacanciesTable": [
      {
        "postName": "Constable (Executive) - Male",
        "department": "Railway Protection Force (RPF / RPSF)",
        "classification": "Group C Technical & Security",
        "payScale": "Level 3 (₹21,700 – ₹69,100)",
        "vacancy": "3,577",
        "eligibility": "10th Pass (Matriculation) from a recognized Board; Physical PET required"
      },
      {
        "postName": "Constable (Executive) - Female",
        "department": "Railway Protection Force (RPF / RPSF)",
        "classification": "Group C Technical & Security",
        "payScale": "Level 3 (₹21,700 – ₹69,100)",
        "vacancy": "631",
        "eligibility": "10th Pass (Matriculation); 800m run in 3m 40s, Long Jump 9ft, High Jump 3ft"
      },
      {
        "postName": "Sub-Inspector (Executive) - Male & Female",
        "department": "Railway Protection Force (RPF)",
        "classification": "Group C Executive / Subordinate Officer",
        "payScale": "Level 6 (₹35,400 – ₹1,12,400)",
        "vacancy": "452",
        "eligibility": "Graduation Degree from recognized University; Physical measurement mandatory"
      }
    ],
    "salaryStructure": {
      "payLevel": "Level 3 (Constable) & Level 6 (Sub-Inspector)",
      "basicPay": "₹21,700 (Constable) | ₹35,400 (Sub-Inspector)",
      "daPercent": "50% of Basic Pay (DA revised bi-annually)",
      "hraPercent": "27% in X-Category Cities (₹5,859 for Constable, ₹9,558 for SI)",
      "grossMonthly": "₹37,800/mo (Constable) | ₹61,200/mo (Sub-Inspector)",
      "inHandMonthly": "₹33,200 (Constable) | ₹54,500 (SI) after statutory NPS & Railway Medical deductions",
      "benefits": [
        "Free Railway Passes (Privilege Pass & PTO) across all Indian Railway zones",
        "Railway Medical Attendance & Cashless Hospitalization for self and family",
        "Uniform and Kit Maintenance Allowance (₹10,000 annually)",
        "Risk & Hardship Allowance for special territorial deployments",
        "National Pension System (NPS) with 14% Central Government co-contribution"
      ]
    },
    "selectionProcess": [
      {
        "stageNumber": "Phase I",
        "stageName": "Computer Based Test (CBT)",
        "description": "120 Multiple Choice Questions (35 Arithmetic, 35 General Intelligence & Reasoning, 50 General Awareness) for 120 marks in 90 minutes. Negative marking 1/3rd mark.",
        "qualifyingNature": "Determines merit ranking for Phase II calling ratio (10 times vacancies)."
      },
      {
        "stageNumber": "Phase II",
        "stageName": "Physical Efficiency Test (PET) & PMT",
        "description": "Constable: 1600m in 5m 45s (Male) / 800m in 3m 40s (Female). SI: 1600m in 6m 30s (Male) / 800m in 4m 00s (Female). Mandatory Long Jump and High Jump.",
        "qualifyingNature": "Strictly qualifying in nature. No marks awarded."
      },
      {
        "stageNumber": "Phase III",
        "stageName": "Document Verification & Medical Fitness",
        "description": "Verification of 10th/Graduation certificates, category certificates, followed by B-1 category eye vision and fitness test in Railway hospitals.",
        "qualifyingNature": "Final appointment authorization."
      }
    ],
    "examPattern": [
      {
        "subject": "Basic Arithmetic & Numerical Ability",
        "questions": 35,
        "marks": 35,
        "time": "90 Minutes (Combined)",
        "negativeMarking": "1/3rd (0.33 mark)"
      },
      {
        "subject": "General Intelligence & Logical Reasoning",
        "questions": 35,
        "marks": 35,
        "time": "90 Minutes (Combined)",
        "negativeMarking": "1/3rd (0.33 mark)"
      },
      {
        "subject": "General Awareness & Indian Railways GK",
        "questions": 50,
        "marks": 50,
        "time": "90 Minutes (Combined)",
        "negativeMarking": "1/3rd (0.33 mark)"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "General Awareness (50 Marks)",
        "weightage": "50 Questions / 50 Marks",
        "topics": [
          "Indian History, Art & Culture, Freedom Struggle",
          "Geography of India & Railway Networks",
          "Indian Constitution & Fundamental Rights",
          "General Science (Physics, Chemistry, Life Sciences up to 10th standard)",
          "National & International Current Events, Sports & Awards"
        ]
      },
      {
        "subject": "Arithmetic (35 Marks)",
        "weightage": "35 Questions / 35 Marks",
        "topics": [
          "Number Systems, Whole Numbers, Decimals & Fractions",
          "Percentages, Ratio & Proportion, Averages",
          "Simple & Compound Interest, Profit and Loss",
          "Time and Distance, Time and Work, Menstruation 2D",
          "Use of Tables and Graphs, Data Interpretation"
        ]
      },
      {
        "subject": "General Intelligence & Reasoning (35 Marks)",
        "weightage": "35 Questions / 35 Marks",
        "topics": [
          "Analogies, Spatial Visualization & Orientation",
          "Problem Solving, Analysis, Judgment & Decision Making",
          "Visual Memory, Discriminating Observation, Relationship Concepts",
          "Arithmetical Reasoning, Figural Classification & Arithmetic Number Series",
          "Coding and Decoding, Statement Conclusion & Syllogistic Reasoning"
        ]
      }
    ],
    "cutOffTrends": [
      {
        "year": "2024 Group D/RPF",
        "general": 83.2,
        "obc": 78.4,
        "ews": 76.5,
        "sc": 69.8,
        "st": 64.2,
        "totalMarks": 120
      },
      {
        "year": "2022 RPF Constable",
        "general": 79.8,
        "obc": 75.3,
        "ews": 73.1,
        "sc": 66.5,
        "st": 61.4,
        "totalMarks": 120
      },
      {
        "year": "2019 RPF SI",
        "general": 94.5,
        "obc": 88.2,
        "ews": 86,
        "sc": 81.3,
        "st": 75.6,
        "totalMarks": 120
      }
    ],
    "faqs": [
      {
        "question": "What is the age relaxation for RPF Constable and SI in 2026?",
        "answer": "The Ministry of Railways granted a statutory 3-year one-time age relaxation beyond normal limits due to recruitment delays. As a result, Constable upper age is 28 years and SI upper age is 28 years for UR/EWS, with an extra 3 years for OBC (31 years) and 5 years for SC/ST (33 years)."
      },
      {
        "question": "Is there negative marking in the RPF Computer Based Test?",
        "answer": "Yes, 1/3rd (0.33) of the marks allocated to each question are deducted for every incorrect response. There is no penalty for unattempted questions."
      },
      {
        "question": "Can 10th pass candidates apply for the Sub-Inspector post?",
        "answer": "No. Sub-Inspector requires a completed Bachelor’s degree in any discipline from a UGC recognized university. 10th Pass candidates can apply for Constable (Executive)."
      },
      {
        "question": "What is the examination pattern for RPF Sub-Inspector & Constable CBT?",
        "answer": "The Computer Based Test (CBT) consists of 120 multiple choice questions carrying 120 marks for 90 minutes: General Awareness (50 Qs), Arithmetic (35 Qs), and General Intelligence & Reasoning (35 Qs). A negative marking of 1/3rd mark applies for every wrong answer."
      },
      {
        "question": "What are the physical efficiency benchmarks for RPF Sub-Inspector?",
        "answer": "For Male SI: 1600m run in 6 minutes 30 seconds, Long Jump 12 feet, High Jump 3 feet 9 inches. For Female SI: 800m run in 4 minutes, Long Jump 9 feet, High Jump 3 feet. PET is qualifying in nature."
      },
      {
        "question": "Is 3-year age relaxation applicable for RPF Recruitment 2026?",
        "answer": "Yes! The Ministry of Railways granted a one-time 3-year upper age relaxation across all categories (UR up to 28 for Constable, up to 28 for SI before category concessions) due to the COVID-19 pandemic hiatus."
      },
      {
        "question": "What is the monthly in-hand salary for RPF Sub-Inspector in 2026?",
        "answer": "RPF SI is appointed in 7th CPC Pay Matrix Level 6 (Starting Basic Pay ₹35,400). With 50% DA (₹17,700), HRA (₹9,558 in X cities), Transport Allowance, and Ration Money, gross monthly salary is ₹69,500+, with net in-hand pay approximately ₹62,000."
      }
    ],
    "howToApplySteps": [
      "Visit the official RRB recruitment portal or regional railway recruitment board website.",
      "Complete One Time Registration (OTR) with valid Mobile Number and Aadhar-linked Email.",
      "Select CEN RPF 01/2026 (SI) or CEN RPF 02/2026 (Constable).",
      "Upload recent passport photograph with white background and digital signature.",
      "Pay online examination fee (₹500/₹250) via UPI or Net Banking.",
      "Submit the finalized application and preserve printed copy of application acknowledgement."
    ],
    "whoShouldApply": [
      "Indian citizens with Graduation (for Sub-Inspector) or 10th Pass (for Constable) meeting Ministry of Railways CEN RPF 01/2026 & 02/2026 requirements.",
      "Candidates fulfilling physical measurement standards (Male UR/OBC: 165 cm height, 80-85 cm chest; Female UR/OBC: 157 cm height) with 3-year age relaxation."
    ],
    "whoShouldSkip": [
      "Candidates unable to meet minimum physical height criteria (relaxation only applicable for Garhwalis, Gorkhas, Marathas, Dogras, and ST).",
      "Candidates with color blindness or failing Railway Medical Category B-1 standards."
    ],
    "commonRejectionMistakes": [
      "Selecting the incorrect Railway zone or language preference for the Computer Based Test.",
      "Uploading live webcam selfies instead of clear, front-facing passport photos with neutral expressions.",
      "Submitting state-specific caste certificates lacking Central Government format certification."
    ],
    "documentsNeeded": [
      "10th Matriculation certificate (mandatory DOB and Constable qualification proof)",
      "Graduation Degree Certificate (mandatory for RPF Sub-Inspector)",
      "Central OBC-NCL / SC / ST / EWS Certificate",
      "Valid Government Photo ID (Aadhaar Card preferred)",
      "Scanned signature and clear passport photograph"
    ],
    "officialLinks": [
      {
        "title": "RRB Official Recruitment Portal",
        "label": "Apply Online (RRB Central Portal)",
        "url": "https://www.rrbapply.gov.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "RPF Centralized Gazette Notification PDF",
        "label": "Download CEN 01 & 02/2026 PDF",
        "url": "https://indianrailways.gov.in",
        "isPrimary": false,
        "linkType": "pdf"
      },
      {
        "title": "RPF Physical Standards & Height Checker",
        "label": "Check RPF Height & Chest Standards",
        "url": "/calculators?tool=height",
        "isPrimary": false,
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Focus heavily on NCERT Class 9 and 10 General Science fundamentals (Physics numericals, Chemical reactions, and Human anatomy).",
      "Practice daily non-verbal reasoning questions including mirror images, paper folding, and embedded figure recognition.",
      "Familiarize yourself with TCS exam interface shortcuts to rapidly navigate between answered, unread, and flagged questions.",
      "Under the 1/3rd negative deduction rule, skip questions where you cannot eliminate at least two plausible distractor options.",
      "Build endurance for Computer Based Tests through uninterrupted 90-minute full mock exam simulations."
    ]
  },
  {
    "id": "ssc-je-2026",
    "slug": "ssc-je-2026-junior-engineer-recruitment",
    "category": "jobs",
    "title": "SSC Junior Engineer 2026 Recruitment Notice",
    "organization": "Staff Selection Commission (SSC)",
    "examName": "Junior Engineer (Civil, Mechanical & Electrical) Examination 2026",
    "postCount": "1,765",
    "publishDate": "25 Sep 2026",
    "lastDate": "25 Oct 2026",
    "examDate": "Jan 2027",
    "qualification": "Diploma or Degree in Civil, Electrical, or Mechanical Engineering from a recognized Institute",
    "qualificationTier": "diploma-engg",
    "sector": "ssc",
    "minAge": 18,
    "maxAge": 32,
    "ageLimit": "Up to 30 Years for MES/BRO/CWC; Up to 32 Years for CPWD (OBC +3 yrs, SC/ST +5 yrs)",
    "fees": "₹100 (Exempted for Women, SC, ST, PwBD, and Ex-Servicemen)",
    "sourceNotice": {
      "title": "Staff Selection Commission (SSC JE Notice)",
      "url": "https://ssc.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "11 Oct 2026, 16:45 IST",
    "readTime": "7 min read",
    "summary": "Staff Selection Commission has announced 1,765 Group B (Non-Gazetted) Junior Engineer posts in Central Public Works Department (CPWD), Military Engineer Services (MES), Border Roads Organisation (BRO), and Central Water Commission (CWC) under Level 6 (₹35,400 – ₹1,12,400).",
    "linkText": "Read SSC JE Gazette & Syllabus",
    "calculatorToolType": "marking",
    "calculatorPresetId": "ssc-cgl",
    "importantDates": [
      {
        "event": "Official Gazette Notification Issued",
        "date": "25 September 2026"
      },
      {
        "event": "Online Application Window Opens",
        "date": "25 September 2026"
      },
      {
        "event": "Last Date for Online Submission",
        "date": "25 October 2026 (23:00 Hrs IST)"
      },
      {
        "event": "Last Date for Online Fee Payment",
        "date": "26 October 2026"
      },
      {
        "event": "Application Correction Window",
        "date": "28 October to 30 October 2026"
      },
      {
        "event": "Paper-I Computer Based Test (CBT)",
        "date": "January 2027"
      }
    ],
    "applicationFees": [
      {
        "category": "General / OBC / EWS Male Candidates",
        "fee": "₹100 (Non-refundable)"
      },
      {
        "category": "Women Candidates (All Categories)",
        "fee": "Exempted (Nil / ₹0)"
      },
      {
        "category": "SC / ST / PwBD / ESM Candidates",
        "fee": "Exempted (Nil / ₹0)"
      },
      {
        "category": "Payment Modes",
        "fee": "BHIM UPI, Net Banking, Visa, MasterCard, RuPay Card"
      }
    ],
    "vacanciesTable": [
      {
        "postName": "Junior Engineer (Civil)",
        "department": "Central Public Works Department (CPWD)",
        "classification": "Group B (Non-Gazetted)",
        "payScale": "Level 6 (₹35,400 – ₹1,12,400)",
        "vacancy": "738",
        "eligibility": "Diploma or Degree in Civil Engineering from recognized University/Institute"
      },
      {
        "postName": "Junior Engineer (Electrical & Mechanical)",
        "department": "CPWD & Military Engineer Services (MES)",
        "classification": "Group B (Non-Gazetted)",
        "payScale": "Level 6 (₹35,400 – ₹1,12,400)",
        "vacancy": "482",
        "eligibility": "Degree in Electrical/Mechanical OR 3-year Diploma + 2 years experience"
      },
      {
        "postName": "Junior Engineer (Civil & Electrical)",
        "department": "Border Roads Organisation (BRO) & CWC",
        "classification": "Group B (Non-Gazetted)",
        "payScale": "Level 6 (₹35,400 – ₹1,12,400)",
        "vacancy": "545",
        "eligibility": "Degree or Diploma in relevant engineering branch; Medical standards applicable"
      }
    ],
    "salaryStructure": {
      "payLevel": "Pay Level 6 (7th CPC Matrix)",
      "basicPay": "₹35,400 per month",
      "daPercent": "50% of Basic Pay (₹17,700)",
      "hraPercent": "27% in X-Category Cities (₹9,558)",
      "grossMonthly": "₹65,400 per month",
      "inHandMonthly": "₹57,500 – ₹59,200 per month after statutory deductions",
      "benefits": [
        "Central Government Health Scheme (CGHS) medical coverage",
        "Dearness Allowance revised bi-annually per CPI-IW index",
        "Transport Allowance of ₹3,600 + DA in classified cities",
        "Leave Travel Concession (LTC) and annual paid vacation",
        "Government accommodation or full House Rent Allowance"
      ]
    },
    "selectionProcess": [
      {
        "stageNumber": "Paper-I",
        "stageName": "Computer Based Test (CBT)",
        "description": "200 Objective questions: 50 General Intelligence & Reasoning, 50 General Awareness, 100 General Engineering (Civil/Electrical/Mechanical) in 2 hours.",
        "qualifyingNature": "Shortlists candidates for Paper-II CBT technical examination."
      },
      {
        "stageNumber": "Paper-II",
        "stageName": "Computer Based Technical Examination",
        "description": "100 Technical questions in core engineering discipline (300 Marks, 2 hours). Negative marking of 1 mark per incorrect answer.",
        "qualifyingNature": "Marks combined with Paper-I to decide final All-India Merit Ranking."
      },
      {
        "stageNumber": "Document Scrutiny",
        "stageName": "Document Verification by User Departments",
        "description": "Verification of diploma/degree marks sheets, caste authenticity, and physical criteria for BRO.",
        "qualifyingNature": "Final joining clearance."
      }
    ],
    "examPattern": [
      {
        "subject": "General Intelligence and Reasoning",
        "questions": 50,
        "marks": 50,
        "time": "2 Hours (Combined)",
        "negativeMarking": "0.25 Mark"
      },
      {
        "subject": "General Awareness",
        "questions": 50,
        "marks": 50,
        "time": "2 Hours (Combined)",
        "negativeMarking": "0.25 Mark"
      },
      {
        "subject": "Part A: Civil / Part B: Electrical / Part C: Mechanical",
        "questions": 100,
        "marks": 100,
        "time": "2 Hours (Combined)",
        "negativeMarking": "0.25 Mark"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "General Intelligence & Reasoning",
        "weightage": "50 Marks",
        "topics": [
          "Analogies & Similarities",
          "Space Visualization & Spatial Orientation",
          "Analysis, Judgment & Problem Solving",
          "Arithmetical Reasoning & Number Series",
          "Coding-Decoding & Non-verbal Patterns"
        ]
      },
      {
        "subject": "General Awareness",
        "weightage": "50 Marks",
        "topics": [
          "Current Affairs & Science in Everyday Life",
          "Indian Polity & Constitution",
          "History & Culture of India",
          "Geography & Environmental Studies",
          "Economics & Five Year Planning Framework"
        ]
      },
      {
        "subject": "Core Engineering (Civil / Electrical / Mechanical)",
        "weightage": "100 Marks (Paper 1) + 300 Marks (Paper 2)",
        "topics": [
          "Civil: Building Materials, Surveying, Estimating & Costing, Soil Mechanics, Hydraulics, RCC & Steel Design",
          "Electrical: Basic concepts, Circuit law, Magnetic Circuit, AC Fundamentals, Electrical Machines, Power Generation",
          "Mechanical: Theory of Machines, Machine Design, Engineering Mechanics, Thermodynamics, Fluid Mechanics"
        ]
      }
    ],
    "cutOffTrends": [
      {
        "year": "2024 Civil (Paper 1)",
        "general": 110.5,
        "obc": 107.8,
        "ews": 98.4,
        "sc": 89.2,
        "st": 87.5,
        "totalMarks": 200
      },
      {
        "year": "2024 Electrical/Mech (Paper 1)",
        "general": 132.8,
        "obc": 130.4,
        "ews": 125.6,
        "sc": 116.5,
        "st": 105.8,
        "totalMarks": 200
      },
      {
        "year": "2023 Civil (Paper 1)",
        "general": 108.2,
        "obc": 106.1,
        "ews": 96.2,
        "sc": 86.5,
        "st": 85,
        "totalMarks": 200
      }
    ],
    "faqs": [
      {
        "question": "Are final year engineering students eligible for SSC JE 2026?",
        "answer": "Candidates must possess the essential educational qualification degree or diploma on or before the crucial closing date specified in the official gazette notification."
      },
      {
        "question": "Is work experience required for Diploma holders in CPWD?",
        "answer": "For CPWD, a 3-year Diploma in Civil or Electrical Engineering is eligible directly without mandatory work experience. For MES, diploma holders require 2 years of relevant experience."
      },
      {
        "question": "What is the marking scheme and negative deduction in SSC JE Paper-1 and Paper-2?",
        "answer": "Paper-1 has 200 objective questions (200 marks, 2 hours) with 0.25 negative marking. Paper-2 is also a computer-based objective test with 100 questions (300 marks, 2 hours) carrying 1.00 negative mark per incorrect response."
      },
      {
        "question": "Are diploma engineers eligible for SSC Junior Engineer without experience?",
        "answer": "In Central Public Works Department (CPWD) and Central Water Commission (CWC), a 3-year Diploma in Civil/Electrical/Mechanical Engineering is eligible without prior experience. In Military Engineer Services (MES) and BRO, diploma holders require 2 years of relevant professional experience."
      },
      {
        "question": "What is the 7th CPC pay scale and in-hand salary for SSC Junior Engineer?",
        "answer": "Junior Engineers are recruited under Pay Matrix Level 6 (Basic Pay ₹35,400). Adding 50% DA (₹17,700), HRA (₹9,558 in X cities), and Transport Allowance, gross monthly compensation is ₹69,800, with net in-hand salary around ₹62,500."
      },
      {
        "question": "Can candidates appear in SSC JE using virtual calculators?",
        "answer": "In Paper-1, calculators are strictly prohibited. In Paper-2 (Core Engineering), an on-screen virtual scientific calculator is integrated into the computer examination interface for technical computation."
      }
    ],
    "howToApplySteps": [
      "Visit the new SSC official portal (ssc.gov.in) and complete your One-Time Registration (OTR).",
      "Log in with your OTR credentials and navigate to the \"Live Examinations\" tab.",
      "Select Junior Engineer (Civil, Mechanical & Electrical) Examination 2026.",
      "Choose your examination branch (Civil, Electrical, or Mechanical).",
      "Upload a live photo via webcam/mobile and digital signature.",
      "Pay ₹100 application fee online (exempted categories bypass) and download the confirmation slip."
    ],
    "whoShouldApply": [
      "Degree or Diploma holders in Civil, Electrical, or Mechanical Engineering seeking Group B Non-Gazetted Level 6 posts (₹35,400–₹1,12,400) in CPWD, MES, BRO, and CWC.",
      "Candidates aged up to 30 years (MES/BRO/CWC) or up to 32 years (CPWD) with standard category relaxations."
    ],
    "whoShouldSkip": [
      "Diploma holders applying for Military Engineer Services (MES) or Border Roads Organisation (BRO) without 2 years of post-diploma experience.",
      "Candidates holding non-engineering degrees or non-aligned polytechnic diplomas."
    ],
    "commonRejectionMistakes": [
      "Diploma holders selecting MES or BRO vacancies without holding 2 years of verifiable industrial experience.",
      "Live webcam capture errors: wearing spectacles with glare, hats, or uneven lighting during SSC portal photo capture.",
      "Choosing wrong engineering stream code for Paper-I and Paper-II."
    ],
    "documentsNeeded": [
      "Engineering Degree or 3-Year Diploma Certificate with marks transcript",
      "2-Year Experience Certificate on formal letterhead (for Diploma holders opting for MES/BRO)",
      "10th Matriculation Certificate for Date of Birth proof",
      "Central Government Category / EWS / PwBD Certificate",
      "Aadhaar Card or alternate Government Photo ID"
    ],
    "officialLinks": [
      {
        "title": "SSC Official Portal",
        "label": "Apply Online at ssc.gov.in",
        "url": "https://ssc.gov.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "SSC JE Official Notification PDF",
        "label": "Download Official Gazette Notice",
        "url": "https://ssc.gov.in",
        "isPrimary": false,
        "linkType": "pdf"
      },
      {
        "title": "Negative Marking Tool",
        "label": "Calculate SSC JE Marks & Penalties",
        "url": "/calculators?tool=marking",
        "isPrimary": false,
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Complete at least 25 full-length Tier-1 CBT mock tests under strict 60-minute countdown constraints to develop cognitive stamina.",
      "Maintain an error log detailing calculation slips in Quantitative Aptitude and misread grammar rules in General English.",
      "Focus on high-yield General Awareness topics including 7th Schedule constitutional articles, 5-Year Plans, and current economic budget highlights.",
      "Avoid blind guessing: under a 0.50 negative penalty, 2 incorrect guesses erase the net credit earned by 1 correct answer.",
      "Practice daily 15-minute mental arithmetic drills (tables up to 30, squares up to 50, cubes up to 25) to save scratchpad time."
    ]
  },
  {
    "id": "ibps-po-clerk-xv-2026",
    "slug": "ibps-po-clerk-xv-recruitment-2026",
    "category": "jobs",
    "title": "IBPS PO & Clerk XV 2026 Recruitment Notice",
    "organization": "Institute of Banking Personnel Selection (IBPS)",
    "examName": "Common Recruitment Process (CRP PO/MT-XV & Clerks-XV)",
    "postCount": "5,800+",
    "publishDate": "26 Sep 2026",
    "lastDate": "26 Oct 2026",
    "examDate": "Nov – Dec 2026",
    "qualification": "A Degree (Graduation) in any discipline from a University recognized by the Govt. of India",
    "qualificationTier": "graduate",
    "sector": "banking",
    "minAge": 20,
    "maxAge": 30,
    "ageLimit": "20 to 30 Years for Probationary Officers; 20 to 28 Years for Clerks (+3 OBC, +5 SC/ST, +10 PwBD)",
    "fees": "₹850 for General/OBC/EWS candidates; ₹175 for SC/ST/PwBD candidates",
    "sourceNotice": {
      "title": "Institute of Banking Personnel Selection Official Portal",
      "url": "https://www.ibps.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "28 Sep 2026, 14:15 IST",
    "readTime": "8 min read",
    "summary": "Official notification released for 5,800+ Probationary Officer (PO/MT) and Customer Support Associate (Clerk) vacancies across 11 nationalized public sector banks including Bank of Baroda, Canara Bank, Punjab National Bank, and Union Bank of India with enhanced pay under the 12th Bipartite Wage Settlement.",
    "linkText": "Apply Online & Check Exam Pattern",
    "calculatorToolType": "marking",
    "calculatorPresetId": "bank-po",
    "importantDates": [
      {
        "event": "Detailed Notification Released",
        "date": "26 September 2026"
      },
      {
        "event": "Online Registration and Payment Commences",
        "date": "26 September 2026"
      },
      {
        "event": "Last Date to Submit Application",
        "date": "26 October 2026 (23:59 Hrs)"
      },
      {
        "event": "Preliminary Online Examination",
        "date": "November 2026"
      },
      {
        "event": "Main Online Examination",
        "date": "December 2026 / January 2027"
      },
      {
        "event": "Interviews & Provisional Allotment",
        "date": "February – April 2027"
      }
    ],
    "applicationFees": [
      {
        "category": "General / EWS / OBC Candidates",
        "fee": "₹850 (Inclusive of GST)"
      },
      {
        "category": "SC / ST / PwBD Candidates",
        "fee": "₹175 (Intimation charges only)"
      },
      {
        "category": "Payment Method",
        "fee": "Online Debit/Credit Cards, Net Banking, IMPS, UPI"
      }
    ],
    "vacanciesTable": [
      {
        "postName": "Probationary Officer / Management Trainee (PO/MT)",
        "department": "11 Participating Public Sector Commercial Banks",
        "classification": "Junior Management Grade Scale I (JMGS-I)",
        "payScale": "₹48,480 – ₹85,920 (12th BPS Pay Scale)",
        "vacancy": "3,950",
        "eligibility": "Graduation Degree in any stream; Computer literacy certificate required"
      },
      {
        "postName": "Customer Support Associate (Clerk-XV)",
        "department": "11 Participating Public Sector Banks",
        "classification": "Clerical Cadre",
        "payScale": "₹24,050 – ₹64,480 (12th BPS Scale)",
        "vacancy": "1,850",
        "eligibility": "Graduation Degree with proficiency in official state language of chosen state"
      }
    ],
    "salaryStructure": {
      "payLevel": "Scale-I Officer (12th Bipartite Settlement)",
      "basicPay": "₹48,480 per month",
      "daPercent": "15.7% of Basic Pay (Quarterly CPI Revision)",
      "hraPercent": "8% to 10% or Company Lease Accommodation",
      "grossMonthly": "₹75,500 – ₹78,200 per month",
      "inHandMonthly": "₹67,000 – ₹69,500 per month after PF & NPS deductions",
      "benefits": [
        "Bank Leased Accommodation or enhanced House Rent Allowance",
        "Comprehensive 100% Medical Hospitalization coverage for employee & family",
        "Concessional Staff Loans for Home, Vehicle, and Higher Education",
        "Monthly Petrol/Conveyance allowance & Newspaper allowance",
        "Contributory Pension Fund / NPS matching contribution"
      ]
    },
    "selectionProcess": [
      {
        "stageNumber": "Prelims",
        "stageName": "Preliminary CBT Exam (100 Marks)",
        "description": "English Language (30 Qs), Quantitative Aptitude (35 Qs), Reasoning Ability (35 Qs) with sectional 20-minute timers.",
        "qualifyingNature": "Qualifying screening test to appear in Mains Examination."
      },
      {
        "stageNumber": "Mains",
        "stageName": "Mains Objective Exam & Descriptive Test",
        "description": "200 Marks Objective test (Reasoning, Data Analysis, General Banking Awareness, English) + 25 Marks English Essay & Letter writing.",
        "qualifyingNature": "Mains score carries 80% weightage in final provisional allotment."
      },
      {
        "stageNumber": "Interview",
        "stageName": "Common Personal Interview (PO Only)",
        "description": "100 Marks interview conducted by participating banks. Minimum qualifying score 40% (35% for SC/ST/OBC/PwBD).",
        "qualifyingNature": "Carries 20% weightage in final combined score."
      }
    ],
    "examPattern": [
      {
        "subject": "English Language",
        "questions": 30,
        "marks": 30,
        "time": "20 Minutes (Sectional)",
        "negativeMarking": "0.25 Mark"
      },
      {
        "subject": "Quantitative Aptitude",
        "questions": 35,
        "marks": 35,
        "time": "20 Minutes (Sectional)",
        "negativeMarking": "0.25 Mark"
      },
      {
        "subject": "Reasoning Ability",
        "questions": 35,
        "marks": 35,
        "time": "20 Minutes (Sectional)",
        "negativeMarking": "0.25 Mark"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "Reasoning & Computer Aptitude",
        "weightage": "45 Qs / 60 Marks (Mains)",
        "topics": [
          "Puzzles & Seating Arrangements (Circular, Linear, Floor-Flat)",
          "Machine Input-Output & Data Sufficiency",
          "Inequalities & Syllogism",
          "Logical Reasoning & Coding-Decoding",
          "Computer Networking & DBMS Fundamentals"
        ]
      },
      {
        "subject": "General / Economy / Banking Awareness",
        "weightage": "40 Qs / 40 Marks (Mains)",
        "topics": [
          "RBI Monetary Policy & Repo Rates",
          "Current Financial & Banking Affairs (Past 6 Months)",
          "Government Social Security Schemes (PMJJBY, PMSBY, APY)",
          "Financial Inclusion & Capital Markets",
          "Static GK & Headquarters of International Organizations"
        ]
      },
      {
        "subject": "Data Analysis & Interpretation",
        "weightage": "35 Qs / 60 Marks (Mains)",
        "topics": [
          "Pie Charts, Radar & Funnel Graphs",
          "Missing DI, Caselets & Tabular Analysis",
          "Probability, Permutations & Combinations",
          "Arithmetic Word Problems & Data Inequalities"
        ]
      }
    ],
    "cutOffTrends": [
      {
        "year": "2024 Prelims",
        "general": 54.25,
        "obc": 54.25,
        "ews": 54.25,
        "sc": 48.75,
        "st": 41.5,
        "totalMarks": 100
      },
      {
        "year": "2023 Prelims",
        "general": 54,
        "obc": 54,
        "ews": 54,
        "sc": 49,
        "st": 43,
        "totalMarks": 100
      },
      {
        "year": "2022 Prelims",
        "general": 49.75,
        "obc": 49.75,
        "ews": 49.75,
        "sc": 46.75,
        "st": 40.5,
        "totalMarks": 100
      }
    ],
    "faqs": [
      {
        "question": "Is there sectional cut-off in IBPS PO Prelims and Mains?",
        "answer": "Yes, candidates must qualify both the sectional cut-off in each of the three tests and the overall aggregate cut-off score decided by IBPS."
      },
      {
        "question": "Are marks of IBPS Prelims counted in final selection?",
        "answer": "No. The preliminary examination is purely for shortlisting candidates for the main examination. Final merit is prepared on the basis of Mains + Interview score (80:20 ratio)."
      },
      {
        "question": "What are the participating public sector banks in IBPS CRP PO/MT XV?",
        "answer": "Eleven nationalized banks participate: Bank of Baroda, Bank of India, Bank of Maharashtra, Canara Bank, Central Bank of India, Indian Bank, Indian Overseas Bank, Punjab National Bank, Punjab & Sind Bank, UCO Bank, and Union Bank of India."
      },
      {
        "question": "Is there negative marking in IBPS PO Prelims and Mains?",
        "answer": "Yes. A penalty of 0.25 (1/4th of the marks assigned to the question) is deducted for each incorrect answer in both the Preliminary and Main examinations."
      },
      {
        "question": "What is the revision under the 12th Bipartite Wage Settlement for IBPS PO?",
        "answer": "Under the revised bipartite wage agreement, starting basic pay has been revised to ₹48,480. Gross monthly salary in metropolitan branches exceeds ₹75,000 to ₹82,000 depending on city allowances and leased quarters."
      },
      {
        "question": "How is the final merit list calculated for IBPS PO XV?",
        "answer": "Final merit combines Mains Examination marks (normalized out of 80) and Personal Interview marks (normalized out of 20) in an 80:20 ratio. Preliminary exam scores are purely for screening and are not counted."
      }
    ],
    "howToApplySteps": [
      "Navigate to IBPS official portal (ibps.in) and click on CRP PO/MT-XV or CRP Clerks-XV.",
      "Click on \"New Registration\" and enter basic personal and contact details.",
      "Upload Left Thumb Impression, Handwritten Declaration, Photo, and Signature as per specifications.",
      "Provide educational marks and preference order of 11 participating public sector banks.",
      "Pay fees online through payment gateway and print receipt."
    ],
    "whoShouldApply": [
      "Graduates in any discipline from a recognized university seeking Scale-I Probationary Officer or Customer Support Associate (Clerk) positions in 11 public sector commercial banks.",
      "Candidates aged 20 to 30 years for PO/MT (or up to 33 for OBC, 35 for SC/ST) and 20 to 28 years for Clerks.",
      "Aspirants with strong calculation speed in Quantitative Aptitude, English Comprehension, and Reasoning looking for structured bank promotion ladders up to General Manager.",
      "Candidates holding computer literacy operating certificates or who studied computer science in high school or college."
    ],
    "whoShouldSkip": [
      "Candidates awaiting final year graduation results whose results will not be officially declared on or before the application cutoff date.",
      "Candidates exceeding 30 years (for PO) or 28 years (for Clerk) as on the cutoff date without category relaxations.",
      "Candidates applying for Clerk vacancies in states whose official language they cannot read, write, and speak proficiently.",
      "Candidates with an active adverse loan default or delinquent credit score below standard banking norms."
    ],
    "commonRejectionMistakes": [
      "Submitting handwritten declaration in capital letters: IBPS strictly rejects applications where the declaration is typed or printed in block capitals.",
      "Selecting wrong bank preference list: Bank preference order cannot be altered post submission and determines career posting prospects for decades.",
      "Blurry left thumb impression: Left thumb scan must be distinct on white paper with black/blue ink without ink bleeding.",
      "Failing to verify transaction debit: Exiting the browser before the payment confirmation screen generates the E-Receipt."
    ],
    "documentsNeeded": [
      "Graduation Degree Certificate or final semester mark sheet proving successful completion.",
      "Recent passport-size color photograph (20 KB to 50 KB, light background, no red-eye or glare).",
      "Scanned signature in running handwriting on white paper with black ink (10 KB to 20 KB).",
      "Left Thumb Impression scan (20 KB to 50 KB, clean clear impression).",
      "Handwritten declaration in candidate’s own English handwriting (50 KB to 100 KB).",
      "Caste / Category Certificate (SC/ST/OBC-NCL/EWS) in prescribed Central Government format."
    ],
    "officialLinks": [
      {
        "title": "IBPS Official Portal",
        "label": "Apply Online at ibps.in",
        "url": "https://www.ibps.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Official IBPS Notification PDF",
        "label": "Download CRP PO/MT Notification",
        "url": "https://www.ibps.in",
        "isPrimary": false,
        "linkType": "pdf"
      },
      {
        "title": "Banking Marks Calculator",
        "label": "Calculate Bank PO Test Marks",
        "url": "/calculators?tool=marking",
        "isPrimary": false,
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Master 20-minute sectional time management: aim for 28+ attempts in Reasoning, 25+ in Quantitative Aptitude, and 22+ in English.",
      "Focus on High-Yield Puzzle Formats (Floor with Flat, Box, Square seating with vacant seats) to guarantee 15-20 marks within 10 minutes.",
      "Practice Simplification, Quadratic Inequalities, and Number Series daily for effortless 12-15 score banking.",
      "Read daily editorial columns to improve reading comprehension skimming speed and contextual vocabulary identification.",
      "Strictly avoid spending more than 2.5 minutes on a single arithmetic word problem or unfamiliar puzzle arrangement."
    ]
  },
  {
    "id": "defence-afcat-nda-2026",
    "slug": "defence-afcat-nda-recruitment-2026",
    "category": "jobs",
    "title": "IAF AFCAT 01/2026 & UPSC NDA I Notification",
    "organization": "Indian Air Force & Union Public Service Commission",
    "examName": "Air Force Common Admission Test & National Defence Academy 2026",
    "postCount": "717",
    "publishDate": "27 Sep 2026",
    "lastDate": "27 Oct 2026",
    "examDate": "Feb – April 2027",
    "qualification": "10+2 with 60% in Physics & Math (NDA/Air Force Flying); Graduation/B.E./B.Tech for AFCAT Ground Duty",
    "qualificationTier": "12th",
    "sector": "defence",
    "minAge": 16,
    "maxAge": 26,
    "ageLimit": "16.5 to 19.5 Years for NDA (10+2 Entry); 20 to 24 Years for AFCAT Flying; 20 to 26 Years for Ground Duty",
    "fees": "₹550 for AFCAT (IAF Portal); ₹100 for NDA (Exempted for Female/SC/ST)",
    "sourceNotice": {
      "title": "UPSC & Indian Air Force CDAC Portal",
      "url": "https://afcat.cdac.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "11 Oct 2026, 17:00 IST",
    "readTime": "8 min read",
    "summary": "Indian Armed Forces have opened registrations for commissioned officer entries through AFCAT 01/2026 (Flying, Technical, Weapon Systems & Administration) and UPSC NDA-1 2026 for Army, Navy, and Air Force cadet wings with Level 10 Pay Matrix (₹56,100 + ₹15,500 Military Service Pay).",
    "linkText": "Check Eligibility & Apply for Defence Commission",
    "calculatorToolType": "height",
    "calculatorPresetId": "defence-cds",
    "importantDates": [
      {
        "event": "Notification Released for AFCAT & NDA",
        "date": "27 September 2026"
      },
      {
        "event": "Online Application Portal Active",
        "date": "27 September 2026"
      },
      {
        "event": "Last Date for Online Submission",
        "date": "27 October 2026 (18:00 Hrs)"
      },
      {
        "event": "AFCAT Written Examination Date",
        "date": "February 2027"
      },
      {
        "event": "UPSC NDA & NA 1 Written Examination",
        "date": "April 2027"
      },
      {
        "event": "SSB Interview Calls",
        "date": "June – August 2027"
      }
    ],
    "applicationFees": [
      {
        "category": "AFCAT Exam Registration Fee (IAF Portal)",
        "fee": "₹550 (Non-refundable for all candidates)"
      },
      {
        "category": "NDA General / OBC Male Candidates",
        "fee": "₹100 (UPSC Portal)"
      },
      {
        "category": "NDA Female, SC & ST Candidates",
        "fee": "Exempted (Nil / ₹0)"
      }
    ],
    "vacanciesTable": [
      {
        "postName": "Flying Branch (Short Service Commission / Permanent)",
        "department": "Indian Air Force",
        "classification": "Commissioned Officer (Flying Officer)",
        "payScale": "Level 10 (₹56,100 – ₹1,77,500 + ₹15,500 MSP)",
        "vacancy": "142",
        "eligibility": "10+2 with min 50% in Math & Physics + Graduation with min 60% OR B.E./B.Tech"
      },
      {
        "postName": "Ground Duty (Technical & Non-Technical) & Weapon Systems",
        "department": "Indian Air Force",
        "classification": "Commissioned Officer (Flying Officer)",
        "payScale": "Level 10 (₹56,100 – ₹1,77,500 + ₹15,500 MSP)",
        "vacancy": "175",
        "eligibility": "Engineering Degree for Technical; Graduation in any stream for Administration / Logistics"
      },
      {
        "postName": "National Defence Academy (Army, Navy, Air Force) & Naval Academy",
        "department": "Ministry of Defence (Joint Services)",
        "classification": "Officer Cadet (Stipend ₹56,100/mo in final year)",
        "payScale": "Cadet Stipend Level 10 on commissioning",
        "vacancy": "400",
        "eligibility": "12th Class pass (10+2 pattern) of State Education Board or equivalent"
      }
    ],
    "salaryStructure": {
      "payLevel": "Pay Level 10 (Defence Services Pay Rules)",
      "basicPay": "₹56,100 per month (Flying Officer / Lieutenant)",
      "daPercent": "50% of Basic Pay (₹28,050)",
      "hraPercent": "Military Service Pay (MSP) ₹15,500 per month (Fixed)",
      "grossMonthly": "₹1,05,500 – ₹1,30,000 per month (depending on Flying Allowance)",
      "inHandMonthly": "₹92,000 – ₹1,12,000 per month (Flying allowance up to ₹25,000/mo extra)",
      "benefits": [
        "Military Service Pay (MSP) of ₹15,500 monthly across all officer ranks",
        "Flying Allowance for Flying Officers / High Altitude Allowance",
        "Complete Free Medical Facilities for Officer and Dependents (ECHS/Military Hospitals)",
        "Officers Mess, Subsidized CSD Canteen, and Defence Club facilities",
        "Defence Service Officers Group Insurance Scheme (DSOP) ₹1 Crore coverage"
      ]
    },
    "selectionProcess": [
      {
        "stageNumber": "Stage 1",
        "stageName": "Written Examination",
        "description": "AFCAT: 100 questions (300 Marks, 2 hours) on Verbal, Reasoning, Military Aptitude, Numerical, GK. NDA: Mathematics (300 Marks) + General Ability Test (600 Marks).",
        "qualifyingNature": "Shortlists candidates for 5-day SSB interview call."
      },
      {
        "stageNumber": "Stage 2",
        "stageName": "5-Day Services Selection Board (SSB) Interview",
        "description": "Stage I (Screening test, OIR, PPDT) followed by Stage II (Psychological tests, Group Testing Officer GTO tasks, and Personal Interview).",
        "qualifyingNature": "Recommendation by SSB Board is mandatory."
      },
      {
        "stageNumber": "Stage 3",
        "stageName": "CPSS / Medical Examination Board",
        "description": "Computerized Pilot Selection System (CPSS, once in a lifetime test for Flying Branch) and special military aviation medical fitness examination.",
        "qualifyingNature": "Final All-India Merit list allotment."
      }
    ],
    "examPattern": [
      {
        "subject": "General Awareness",
        "questions": 25,
        "marks": 75,
        "time": "2 Hours (Combined)",
        "negativeMarking": "1 Mark"
      },
      {
        "subject": "Verbal Ability in English",
        "questions": 30,
        "marks": 90,
        "time": "2 Hours (Combined)",
        "negativeMarking": "1 Mark"
      },
      {
        "subject": "Numerical Ability",
        "questions": 20,
        "marks": 60,
        "time": "2 Hours (Combined)",
        "negativeMarking": "1 Mark"
      },
      {
        "subject": "Reasoning and Military Aptitude Test",
        "questions": 25,
        "marks": 75,
        "time": "2 Hours (Combined)",
        "negativeMarking": "1 Mark"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "English Verbal Ability",
        "weightage": "30 Qs / 90 Marks",
        "topics": [
          "Comprehension Passages",
          "Error Detection in Sentences",
          "Sentence Completion & Fill in the Blanks",
          "Synonyms, Antonyms and Contextual Vocabulary",
          "Idioms and Phrases & Analogy"
        ]
      },
      {
        "subject": "General Awareness",
        "weightage": "25 Qs / 75 Marks",
        "topics": [
          "Defence Forces Strategy & Operations",
          "Indian History, National Geography & Environment",
          "Basic Science & Everyday Technology",
          "International Geopolitics & Summits",
          "Sports, National Honours & Personalities"
        ]
      },
      {
        "subject": "Reasoning & Military Aptitude",
        "weightage": "25 Qs / 75 Marks",
        "topics": [
          "Verbal & Non-Verbal Reasoning",
          "Spatial Ability & Embedded Figures",
          "Pattern Completion & Dot Situations",
          "Rotated Blocks & Analogy Figures"
        ]
      }
    ],
    "cutOffTrends": [
      {
        "year": "AFCAT 02/2024",
        "general": 141,
        "obc": 141,
        "ews": 141,
        "sc": 141,
        "st": 141,
        "totalMarks": 300
      },
      {
        "year": "AFCAT 01/2024",
        "general": 137,
        "obc": 137,
        "ews": 137,
        "sc": 137,
        "st": 137,
        "totalMarks": 300
      },
      {
        "year": "NDA 1 2024 (Written)",
        "general": 301,
        "obc": 301,
        "ews": 301,
        "sc": 301,
        "st": 301,
        "totalMarks": 900
      }
    ],
    "faqs": [
      {
        "question": "Can girls and women candidates apply for NDA and AFCAT?",
        "answer": "Yes! Female candidates are eligible to apply for all branches of NDA (Army, Navy, Air Force) as well as AFCAT (Flying, Technical, and Ground Duty) with identical testing standards."
      },
      {
        "question": "What is the CPSS test for the Flying branch?",
        "answer": "The Computerized Pilot Selection System (CPSS) tests psychomotor skills, spatial coordination, and instrument reading. It can only be attempted once in a lifetime by any candidate."
      },
      {
        "question": "What is the examination pattern and duration for AFCAT 2026?",
        "answer": "AFCAT is an online test with 100 multiple choice questions carrying 300 marks for 2 hours (120 minutes). Marking scheme: +3 for correct answer, -1 for wrong answer, and 0 for unattempted questions."
      },
      {
        "question": "Can 12th appearing students apply for UPSC NDA & NA Examination?",
        "answer": "Yes. Candidates appearing in their 12th standard examination under the 10+2 pattern can apply. For the Air Force and Navy wings, Physics, Chemistry, and Mathematics (PCM) at 10+2 level are mandatory."
      },
      {
        "question": "What is the Computerised Pilot Selection System (CPSS)?",
        "answer": "CPSS is an intelligent psychomotor evaluation administered once in a candidate lifetime for the Flying Branch at Air Force Selection Boards (AFSB). Candidates failing CPSS cannot re-apply for flying branches."
      },
      {
        "question": "What is the training stipend received by cadets at NDA / AFA?",
        "answer": "During officer cadet training at NDA Khadakwasla, IMA Dehradun, or AFA Dundigal, gentleman/lady cadets receive a fixed monthly training stipend of ₹56,100 (Level 10 starting basic)."
      }
    ],
    "howToApplySteps": [
      "For AFCAT: Register on afcat.cdac.in using an active email ID and mobile number.",
      "For NDA: Register on UPSC OTR portal at upsconline.nic.in.",
      "Upload qualifying certificates (10th/12th/Graduation), photograph, and signature.",
      "Select preferred exam centres and SSB interview centres.",
      "Pay online registration fee and download the completed application form."
    ],
    "whoShouldApply": [
      "Unmarried male and female candidates aged 16.5–19.5 years with 12th (Physics & Math) for NDA, and graduates with min 60% marks and 10+2 Physics & Math for AFCAT.",
      "Aspirants seeking commissioned officer entry into the Indian Armed Forces (Army, Navy, Air Force) with permanent and short service commissions."
    ],
    "whoShouldSkip": [
      "Candidates who have previously failed the Computerised Pilot Selection System (CPSS / PABT) test seeking AFCAT Flying Branch.",
      "Candidates exceeding strict age limits (20–24 years for AFCAT Flying; 19.5 years for NDA)."
    ],
    "commonRejectionMistakes": [
      "Miscalculating aggregate percentage in 10+2 Physics and Mathematics (minimum 50% in each required for AFCAT Flying/Ground Duty Tech).",
      "Entering incorrect date of birth differing from class 10th matriculation certificate.",
      "Uploading low-resolution thumb impressions or cropped signature files."
    ],
    "documentsNeeded": [
      "10th Matriculation Certificate and Marks Sheet",
      "12th Intermediate Mark Sheet with Physics and Mathematics scores",
      "Graduation Degree Certificate or final-year Bonafide Certificate (for AFCAT)",
      "Valid Government Photo ID (Aadhaar Card, Passport, Voter ID)",
      "Recent passport-size colour photographs conforming to Armed Forces standards"
    ],
    "officialLinks": [
      {
        "title": "Indian Air Force AFCAT Portal",
        "label": "Apply Online (afcat.cdac.in)",
        "url": "https://afcat.cdac.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "UPSC NDA Application Portal",
        "label": "Apply on UPSC Portal (upsconline.nic.in)",
        "url": "https://upsconline.nic.in",
        "isPrimary": false,
        "linkType": "apply"
      },
      {
        "title": "Armed Forces Height Checker",
        "label": "Check Defence Height & Physical Criteria",
        "url": "/calculators?tool=height",
        "isPrimary": false,
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Combine academic preparation with daily physical conditioning (1600m running, push-ups, chin-ups) to maintain high PFT readiness.",
      "Develop strong English language command and current affairs articulation for the 5-day Services Selection Board (SSB) interview.",
      "Practice speed mathematics formulas for NDA/CDS: focus on trigonometry, matrices, coordinate geometry, and calculus shortcuts.",
      "Review military organization hierarchy, gallantry decorations, and current geopolitical developments for the General Knowledge paper.",
      "Maintain consistent sleep and hydration habits to ensure peak mental clarity during prolonged written examination sessions."
    ]
  },
  {
    "id": "ssc-cgl-2026",
    "slug": "ssc-cgl-2026-recruitment-notification",
    "category": "jobs",
    "title": "SSC CGL 2026 Recruitment Notification",
    "organization": "Staff Selection Commission (SSC)",
    "examName": "Combined Graduate Level Examination 2026",
    "postCount": "17,727",
    "publishDate": "24 Sep 2026",
    "lastDate": "24 Oct 2026",
    "examDate": "Dec 2026",
    "qualification": "Bachelor’s Degree in any discipline from a recognized University",
    "qualificationTier": "graduate",
    "sector": "ssc",
    "minAge": 18,
    "maxAge": 32,
    "ageLimit": "18 to 32 Years (Crucial cutoff date: 01-08-2026 as per DOP&T guidelines)",
    "fees": "₹100 (Exempted for All Women, SC, ST, PwBD, and Ex-Servicemen)",
    "sourceNotice": {
      "title": "Staff Selection Commission (SSC CGL Notice)",
      "url": "https://ssc.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "28 Sep 2026, 18:30 IST",
    "readTime": "7 min read",
    "summary": "The Staff Selection Commission has officially notified 17,727 Group B and Group C officer vacancies across Central Ministries, Central Board of Direct Taxes (CBDT), Central Board of Indirect Taxes and Customs (CBIC), Central Bureau of Investigation (CBI), Enforcement Directorate, and Comptroller and Auditor General (CAG) of India.",
    "linkText": "Read Full Notification & Apply Online",
    "calculatorToolType": "age",
    "calculatorPresetId": "ssc-cgl",
    "syllabusTopics": [
      {
        "subject": "General Intelligence & Reasoning",
        "weightage": "25 Qs / 50 Marks (Tier 1)",
        "topics": [
          "Analogies & Similarities",
          "Blood Relations & Direction Sense",
          "Venn Diagrams & Syllogism",
          "Matrix & Number Series",
          "Coding-Decoding & Paper Folding"
        ]
      },
      {
        "subject": "General Awareness & Current Affairs",
        "weightage": "25 Qs / 50 Marks (Tier 1)",
        "topics": [
          "Indian Constitution & Polity",
          "Modern History & National Movements",
          "Macro Economics & Union Budget",
          "Physical & Indian Geography",
          "General Science (Physics, Chemistry, Biology)"
        ]
      },
      {
        "subject": "Quantitative Aptitude",
        "weightage": "25 Qs / 50 Marks (Tier 1)",
        "topics": [
          "Number Systems & Divisibility",
          "Percentages, Profit & Loss, Discount",
          "Time, Work & Distance",
          "Algebra & Linear Equations",
          "Trigonometry, Heights & Distances",
          "Geometry & Menstruation 2D/3D"
        ]
      },
      {
        "subject": "English Comprehension",
        "weightage": "25 Qs / 50 Marks (Tier 1)",
        "topics": [
          "Reading Comprehension & Cloze Test",
          "Spotting Errors & Sentence Correction",
          "Idioms, Phrases & One Word Substitutions",
          "Active-Passive Voice & Direct-Indirect Speech"
        ]
      }
    ],
    "cutOffTrends": [
      {
        "year": "2025 Tier-1",
        "general": 153.25,
        "obc": 148.5,
        "ews": 145.2,
        "sc": 128.75,
        "st": 119.5,
        "totalMarks": 200
      },
      {
        "year": "2024 Tier-1",
        "general": 150.05,
        "obc": 145.9,
        "ews": 143.4,
        "sc": 126.68,
        "st": 118.16,
        "totalMarks": 200
      },
      {
        "year": "2023 Tier-1",
        "general": 149.63,
        "obc": 145.93,
        "ews": 143.44,
        "sc": 126.69,
        "st": 118.16,
        "totalMarks": 200
      }
    ],
    "importantDates": [
      {
        "event": "Official Gazette Notification Issued",
        "date": "24 September 2026"
      },
      {
        "event": "Online Application Portal Opens",
        "date": "24 September 2026"
      },
      {
        "event": "Last Date for Online Submission",
        "date": "24 October 2026 (23:00 Hrs IST)"
      },
      {
        "event": "Last Date for Online Fee Payment",
        "date": "25 October 2026 (23:00 Hrs IST)"
      },
      {
        "event": "Application Form Correction Window",
        "date": "28 October to 30 October 2026"
      },
      {
        "event": "Tier-1 CBT All-India Exam Window",
        "date": "December 2026 (Multiple Shifts)"
      },
      {
        "event": "Tier-2 CBT Mains Exam Window",
        "date": "February – March 2027"
      }
    ],
    "applicationFees": [
      {
        "category": "General / OBC / EWS Male Candidates",
        "fee": "₹100 (Non-refundable)"
      },
      {
        "category": "All Female Candidates (All Categories)",
        "fee": "Exempted (Nil / ₹0)"
      },
      {
        "category": "SC / ST / PwBD / Ex-Servicemen (ESM)",
        "fee": "Exempted (Nil / ₹0)"
      },
      {
        "category": "Permitted Payment Modes",
        "fee": "BHIM UPI, Net Banking, Visa, MasterCard, RuPay Card"
      }
    ],
    "vacanciesTable": [
      {
        "postName": "Assistant Section Officer (ASO)",
        "department": "Central Secretariat Service (CSS) / Ministry of External Affairs (MEA) / IB",
        "classification": "Group B (Non-Gazetted)",
        "payScale": "Level 7 (₹44,900 – ₹1,42,400)",
        "vacancy": "2,840",
        "eligibility": "Bachelor Degree in any discipline; CPT Computer Proficiency qualifying test required"
      },
      {
        "postName": "Inspector of Income Tax (CBDT)",
        "department": "Central Board of Direct Taxes, Ministry of Finance",
        "classification": "Group C",
        "payScale": "Level 7 (₹44,900 – ₹1,42,400)",
        "vacancy": "1,420",
        "eligibility": "Graduation Degree; Age 18–30 Years"
      },
      {
        "postName": "Inspector (Central Excise, GST & Preventive)",
        "department": "Central Board of Indirect Taxes & Customs (CBIC)",
        "classification": "Group B",
        "payScale": "Level 7 (₹44,900 – ₹1,42,400)",
        "vacancy": "3,110",
        "eligibility": "Graduation Degree + Physical walking (1600m in 15 mins) and cycling test"
      },
      {
        "postName": "Sub-Inspector (CBI)",
        "department": "Central Bureau of Investigation (Department of Personnel & Training)",
        "classification": "Group B",
        "payScale": "Level 7 (₹44,900 – ₹1,42,400)",
        "vacancy": "420",
        "eligibility": "Graduation Degree; Physical standards mandatory (165cm Male, 150cm Female)"
      },
      {
        "postName": "Tax Assistant & Auditor",
        "department": "CBDT, CBIC & Offices under C&AG",
        "classification": "Group C",
        "payScale": "Level 4 & Level 5 (₹25,500 – ₹92,300)",
        "vacancy": "9,937",
        "eligibility": "Bachelor’s Degree with Data Entry Speed of 8,000 key depressions per hour"
      }
    ],
    "salaryStructure": {
      "payLevel": "Pay Level 7 (7th CPC Matrix)",
      "basicPay": "₹44,900 per month",
      "daPercent": "50% of Basic Pay (₹22,450)",
      "hraPercent": "27% in X-Category Cities / Delhi / Mumbai (₹12,123)",
      "grossMonthly": "₹84,873 per month",
      "inHandMonthly": "₹74,200 – ₹76,500 per month (after NPS & CGHS statutory deductions)",
      "benefits": [
        "Central Government Health Scheme (CGHS) cashless medical coverage for self and dependants",
        "Dearness Allowance (DA) revised bi-annually per Consumer Price Index (CPI-IW)",
        "Transport Allowance (₹3,600 + DA thereon in classified cities)",
        "National Pension System (NPS) with 14% Government contribution",
        "Leave Travel Concession (LTC) and All-India / Home Town airfare reimbursement"
      ]
    },
    "selectionProcess": [
      {
        "stageNumber": "Tier 1",
        "stageName": "Computer Based Examination (CBT)",
        "description": "Objective multiple-choice screening exam covering Reasoning, General Awareness, Quantitative Aptitude, and English (100 questions, 200 marks, 60 minutes).",
        "qualifyingNature": "Purely qualifying in nature; marks not added to the final merit ranking list."
      },
      {
        "stageNumber": "Tier 2",
        "stageName": "Mains Examination (Paper 1 & Paper 2)",
        "description": "Session I (Mathematical Abilities, Reasoning, English Language, General Awareness, Computer Knowledge) + Session II (Data Entry Speed Test).",
        "qualifyingNature": "Marks determine final All-India Merit Ranking and post allocation."
      },
      {
        "stageNumber": "Stage 3",
        "stageName": "Physical Standards & PET (Specific Posts)",
        "description": "Walking and cycling tests for Central Excise Inspector, Sub-Inspector in CBI, and NIA officers.",
        "qualifyingNature": "Strictly qualifying physical benchmarks."
      },
      {
        "stageNumber": "Stage 4",
        "stageName": "Document Verification (DV) by User Ministries",
        "description": "Scrutiny of original graduation certificates, caste certificates (OBC-NCL / EWS), and biometric identity verification.",
        "qualifyingNature": "Final appointment clearance."
      }
    ],
    "examPattern": [
      {
        "subject": "General Intelligence & Reasoning",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "-0.50 Marks per wrong response"
      },
      {
        "subject": "General Awareness & Current Affairs",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "-0.50 Marks per wrong response"
      },
      {
        "subject": "Quantitative Aptitude (Mathematics)",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "-0.50 Marks per wrong response"
      },
      {
        "subject": "English Comprehension",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "-0.50 Marks per wrong response"
      }
    ],
    "faqs": [
      {
        "question": "What is the crucial cut-off date for age calculation in SSC CGL 2026?",
        "answer": "As per the official SSC gazette notification, the crucial date for determining the age limit is 01-08-2026. Candidates must have been born between 02-08-1994 and 01-08-2008 for posts having an age limit of 18–32 years (General category). Official category relaxations apply: 3 years for OBC and 5 years for SC/ST."
      },
      {
        "question": "Are final year college students eligible to apply for SSC CGL 2026?",
        "answer": "Yes, candidates appearing in their final year of graduation may apply, provided they acquire the essential educational qualification degree certificate or provisional degree on or before the crucial cut-off date specified in the notification."
      },
      {
        "question": "Are Tier-1 marks counted in the final merit list for SSC CGL?",
        "answer": "No. Following the revised examination scheme, Tier-1 CBT is purely qualifying in nature. The final merit list for post allocation is prepared strictly based on normalized marks scored by candidates in Tier-2 (Paper-I Sections 1 and 2)."
      },
      {
        "question": "Is Computer Knowledge Test and Typing Test mandatory for all posts?",
        "answer": "Computer Knowledge Module and Data Entry Speed Test (DEST) are qualifying in nature for all posts. However, higher qualifying benchmark standards are set for posts like Assistant Section Officer, Assistant in MEA, and Tax Assistant."
      }
    ],
    "howToApplySteps": [
      "Visit the official SSC portal (https://ssc.gov.in) and complete your One Time Registration (OTR) with personal and educational details.",
      "Log in using your Registration Number and Password to access the Candidate Dashboard.",
      "Click on \"Apply\" under the Combined Graduate Level Examination 2026 header.",
      "Verify pre-filled information from your OTR and choose your preferred Examination Cities (up to 3 preferences).",
      "Upload a live webcam passport photograph following the revised SSC guidelines (clear background, no spectacles/cap) and candidate signature (10KB–20KB).",
      "Pay the nominal application fee of ₹100 online (if applicable) through Net Banking or UPI.",
      "Submit the application and download the confirmation PDF acknowledgement for future reference."
    ],
    "whoShouldApply": [
      "Graduates in any discipline from a recognized university seeking prestigious Group B and C positions across central ministries and departments (Income Tax Inspector, ASO in CSS/MEA, Excise Inspector, Sub-Inspector in CBI).",
      "Candidates aged 18 to 30/32 years (post-wise) as on 01-08-2026 (eligible for statutory relaxations: up to 33/35 for OBC, 35/37 for SC/ST, and 40+ for PwBD).",
      "Aspirants with strong aptitude across General Intelligence, Quantitative Aptitude, English Comprehension, and General Awareness preparing for single-day Tier-1 qualifying and Tier-2 decisive stages.",
      "Candidates with foundational computer operations knowledge seeking 7th CPC Level 4 to Level 8 salaries (Gross ₹45,000 to ₹1,15,000/mo)."
    ],
    "whoShouldSkip": [
      "Candidates awaiting final year graduation results whose qualifying degree will not be awarded on or before the crucial cutoff date (01-08-2026).",
      "Candidates exceeding 30 or 32 years of age without eligible category relaxation.",
      "Candidates seeking uniformed posts (Central Excise Inspector, CBI SI, NIA SI) who do not meet physical measurement standards (157.5 cm height for males, 152 cm for females) or physical walking endurance tests.",
      "Candidates unwilling to serve anywhere in India or relocate across central administrative cadres."
    ],
    "commonRejectionMistakes": [
      "Live photo webcam non-compliance: Uploading pictures wearing spectacles, caps, or having shadows on the face; SSC OTR uses AI face-matching that rejects improper lighting and glare.",
      "Signature uploaded in capital letters: Signatures must be executed in running handwriting with black/blue ink on white paper.",
      "Wrong post preferences during Tier-2 option-cum-preference: Submitting post choices without verifying physical standards for specific inspector cadres.",
      "Ignoring the Computer Knowledge Module (CKM) qualifying cutoff: Failing CKM invalidates candidates from consideration even with top Tier-2 paper scores."
    ],
    "documentsNeeded": [
      "Matriculation (10th) Certificate & Mark Sheet (crucial for exact name, father’s name, and date of birth).",
      "Graduation Degree Certificate / Provisional Passing Certificate from recognized University.",
      "Live Webcam Photograph captured on SSC portal (plain background, ears visible, neutral expression).",
      "Scanned Signature in running handwriting (10 KB to 20 KB, JPEG/JPG format).",
      "Central Format Category Certificate (OBC-NCL / EWS / SC / ST) valid for the active financial year.",
      "Valid Government Photo ID (Aadhaar Card, Voter ID, Passport, Driving License, PAN Card)."
    ],
    "officialLinks": [
      {
        "title": "Online Application Portal",
        "label": "Apply Online (Official SSC OTR Portal)",
        "url": "https://ssc.gov.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Official Gazette Notification",
        "label": "Download SSC Notification PDF",
        "url": "https://ssc.gov.in",
        "linkType": "pdf"
      },
      {
        "title": "Govt Exam Age Calculator",
        "label": "Verify Age on 01-08-2026",
        "url": "/tools/age",
        "linkType": "tool"
      },
      {
        "title": "CBT-Style Practice Test",
        "label": "Practice CBT Test",
        "url": "/mock-test/ssc-cgl-tier1",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Complete at least 25 full-length Tier-1 CBT mock tests under strict 60-minute countdown constraints to develop cognitive stamina.",
      "Maintain an error log detailing calculation slips in Quantitative Aptitude and misread grammar rules in General English.",
      "Focus on high-yield General Awareness topics including 7th Schedule constitutional articles, 5-Year Plans, and current economic budget highlights.",
      "Avoid blind guessing: under a 0.50 negative penalty, 2 incorrect guesses erase the net credit earned by 1 correct answer.",
      "Practice daily 15-minute mental arithmetic drills (tables up to 30, squares up to 50, cubes up to 25) to save scratchpad time."
    ]
  },
  {
    "id": "upsc-cse-2026",
    "slug": "upsc-civil-services-cse-2026-notification",
    "category": "jobs",
    "title": "UPSC Civil Services Examination 2026 Notice",
    "organization": "Union Public Service Commission (UPSC)",
    "examName": "Civil Services (Preliminary) Examination 2026",
    "postCount": "1,056",
    "publishDate": "28 Sep 2026",
    "lastDate": "24 Nov 2026",
    "examDate": "14 Feb 2027",
    "qualification": "Graduation Degree in any stream from recognized University",
    "qualificationTier": "graduate",
    "sector": "upsc",
    "minAge": 21,
    "maxAge": 32,
    "ageLimit": "21 to 32 Years as on 01-08-2026 (Max 6 attempts for General, 9 for OBC, Unlimited for SC/ST)",
    "fees": "₹100 (Female / SC / ST / PwBD Exempted)",
    "sourceNotice": {
      "title": "Union Public Service Commission Examination Portal",
      "url": "https://upsc.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "28 Sep 2026, 17:45 IST",
    "readTime": "9 min read",
    "summary": "The Union Public Service Commission conducts the Civil Services and Central Engineering recruitments for Group A and Group B civil services under the 7th Central Pay Commission.",
    "linkText": "Check Eligibility, Exam Pattern & Syllabus",
    "calculatorToolType": "age",
    "calculatorPresetId": "upsc-prelims",
    "importantDates": [
      {
        "event": "Gazette Notification Release",
        "date": "28 September 2026"
      },
      {
        "event": "Online Application Last Date",
        "date": "24 November 2026 (18:00 Hrs IST)"
      },
      {
        "event": "Preliminary Examination",
        "date": "14 February 2027 (Sunday)"
      },
      {
        "event": "Main Examination",
        "date": "June 2027 (5 Days)"
      },
      {
        "event": "Personality Test (Interviews)",
        "date": "Late 2027"
      }
    ],
    "applicationFees": [
      {
        "category": "General / OBC / EWS Male Candidates",
        "fee": "₹100"
      },
      {
        "category": "Female / SC / ST / PwBD Candidates",
        "fee": "Exempted (Nil / ₹0)"
      }
    ],
    "vacanciesTable": [
      {
        "postName": "Indian Administrative Service (IAS)",
        "department": "Department of Personnel and Training (DOP&T)",
        "classification": "All India Service (Group A)",
        "payScale": "Level 10 (₹56,100 – ₹1,77,500) to Cabinet Secretary (₹2,50,000)",
        "vacancy": "180",
        "eligibility": "Must be a Citizen of India; Graduation degree in any discipline"
      },
      {
        "postName": "Indian Foreign Service (IFS)",
        "department": "Ministry of External Affairs",
        "classification": "Central Group A Service",
        "payScale": "Level 10 (₹56,100 + Foreign Allowance as per posting)",
        "vacancy": "55",
        "eligibility": "Must be a Citizen of India; Bachelor Degree in any stream"
      },
      {
        "postName": "Indian Police Service (IPS)",
        "department": "Ministry of Home Affairs",
        "classification": "All India Service (Group A)",
        "payScale": "Level 10 (₹56,100 – ₹1,77,500)",
        "vacancy": "150",
        "eligibility": "Graduation + Physical Standard (165cm Male, 150cm Female; Eye 6/6 & 6/9)"
      },
      {
        "postName": "Indian Revenue Service (IRS IT & Customs)",
        "department": "Ministry of Finance (CBDT & CBIC)",
        "classification": "Central Group A Service",
        "payScale": "Level 10 (₹56,100 – ₹1,77,500)",
        "vacancy": "280",
        "eligibility": "Bachelor Degree in any discipline from recognized University"
      },
      {
        "postName": "Other Group A & Group B Services",
        "department": "DANICS, DANIPS, P&T Accounts, Defence Accounts, etc.",
        "classification": "Central Group A & B",
        "payScale": "Level 8 to Level 10 (₹47,600 – ₹1,77,500)",
        "vacancy": "391",
        "eligibility": "Bachelor Degree in any discipline from recognized University"
      }
    ],
    "salaryStructure": {
      "payLevel": "Pay Level 10 (Entry Level Junior Scale)",
      "basicPay": "₹56,100 per month",
      "daPercent": "50% (₹28,050)",
      "hraPercent": "27% in Tier-1 Metro Cities (₹15,147)",
      "grossMonthly": "₹1,06,200 per month (plus official transport/driver facility)",
      "inHandMonthly": "₹91,000 – ₹94,500 per month (after NPS & GPF deductions)",
      "benefits": [
        "Designated Government Bungalow / Official Accommodation in state capital or district HQ",
        "Official vehicle with chauffeur and security escort (for field postings)",
        "Electricity, water, and telephone allowances as per entitlement",
        "Cashless medical coverage under Central Government or State Health Scheme",
        "Study Leave of up to 2 years for pursuing master programs in reputed global universities"
      ]
    },
    "selectionProcess": [
      {
        "stageNumber": "Stage 1",
        "stageName": "Preliminary Examination (Objective 400 Marks)",
        "description": "Paper 1 (General Studies 1 - 200 Marks) + Paper 2 (CSAT - 200 Marks, qualifying with minimum 33% / 66 marks).",
        "qualifyingNature": "Screening only; GS-1 marks determine qualification for Mains at 1:12 ratio."
      },
      {
        "stageNumber": "Stage 2",
        "stageName": "Main Examination (Written 1750 Marks)",
        "description": "9 Descriptive papers: 2 Qualifying Language papers (English + Indian Language, 300 marks each) + 7 Merit Papers (Essay, GS 1, GS 2, GS 3, GS 4, Optional Paper 1 & 2 - 250 marks each).",
        "qualifyingNature": "Scores are directly added to the final merit list."
      },
      {
        "stageNumber": "Stage 3",
        "stageName": "Personality Test / Interview (275 Marks)",
        "description": "Conducted at Dholpur House, New Delhi by a board of competent observers assessing mental alertness, critical judgment, and integrity.",
        "qualifyingNature": "Final ranking: Written (1750) + Interview (275) = 2025 Grand Total."
      }
    ],
    "examPattern": [
      {
        "subject": "General Studies Paper-I (History, Polity, Economy, Geo, Env, Current Affairs)",
        "questions": 100,
        "marks": 200,
        "time": "2 Hours (09:30 AM – 11:30 AM)",
        "negativeMarking": "1/3rd (-0.66 Marks) per wrong answer"
      },
      {
        "subject": "General Studies Paper-II (CSAT: Comprehension, Logical Reasoning, Basic Numeracy)",
        "questions": 80,
        "marks": 200,
        "time": "2 Hours (02:30 PM – 04:30 PM)",
        "negativeMarking": "1/3rd (-0.83 Marks) per wrong answer (Qualifying 33% mandatory)"
      }
    ],
    "faqs": [
      {
        "question": "What is the attempt limit for different categories in UPSC Civil Services?",
        "answer": "As per official UPSC CSE regulations: General / EWS candidates are permitted a maximum of 6 attempts until age 32. OBC candidates are permitted 9 attempts until age 35. SC and ST candidates have unlimited attempts up to age 37. PwBD candidates of General/OBC have 9 attempts."
      },
      {
        "question": "Is CSAT paper marks counted for clearing UPSC Prelims?",
        "answer": "No. CSAT (GS Paper-II) is strictly qualifying in nature. Candidates must score at least 33% (66 marks out of 200). The merit list for shortlisting candidates for the Civil Services Mains Examination is calculated solely based on GS Paper-I marks."
      },
      {
        "question": "What is the minimum qualifying score for CSAT Paper-II in UPSC CSE 2026?",
        "answer": "As per official UPSC CSE examination rules, CSAT (Paper-II) is strictly a qualifying paper. Candidates must score a minimum of 33% (66 marks out of 200). Only candidates securing 66+ marks in CSAT have their General Studies Paper-I evaluated for Prelims merit and shortlisting to the Mains examination."
      },
      {
        "question": "How many attempts are permitted for UPSC Civil Services Examination?",
        "answer": "General/UR and EWS candidates are permitted up to 6 attempts until age 32. OBC candidates are permitted 9 attempts until age 35. SC and ST candidates have unlimited attempts until the upper age limit of 37 years. PwBD candidates in General/OBC receive 9 attempts."
      },
      {
        "question": "Can final year degree students apply for UPSC CSE 2026 Prelims?",
        "answer": "Yes. Candidates appearing in their final degree examination are eligible to sit for the Preliminary Examination. However, they must produce proof of passing their qualifying bachelor’s degree examination while submitting the Detailed Application Form-I (DAF-I) for the Mains examination."
      },
      {
        "question": "What are the marks allocation and selection stages in UPSC CSE?",
        "answer": "UPSC CSE comprises three distinct stages: (1) Preliminary Examination (Screening only, 400 marks), (2) Mains Examination (9 written descriptive papers, 1,750 marks), and (3) Personality Test / Interview (275 marks). The final all-India merit ranking is determined out of a grand total of 2,025 marks."
      }
    ],
    "howToApplySteps": [
      "Visit the official UPSC application portal at https://upsconline.nic.in.",
      "Complete One Time Registration (OTR) with personal bio-data, 10th certificate details, and Aadhaar card.",
      "Fill Part-I registration: select examination centers for both Prelims and Mains and select your Optional Subject.",
      "Upload a scanned photograph (white background, taken within 10 days with candidate name & date printed) and signature.",
      "Pay ₹100 online (or verify category exemption).",
      "Download the final confirmation acknowledgement slip."
    ],
    "whoShouldApply": [
      "Graduates in any discipline from a recognized central, state, or deemed university seeking appointment to premier All India Services (IAS, IPS) and Central Group A services (IFS, IRS, IA&AS).",
      "Candidates aged 21 to 32 years as on 01-08-2026 (eligible for statutory extensions: up to 35 for OBC, 37 for SC/ST, 42 for PwBD).",
      "Aspirants who have completed foundational General Studies syllabus coverage and formulated a coherent strategy for their 500-mark Optional Subject.",
      "Candidates who have remaining attempts under UPSC guidelines (up to 6 attempts for General/EWS, 9 for OBC, unlimited for SC/ST within age limits)."
    ],
    "whoShouldSkip": [
      "Candidates who have exhausted their maximum permissible attempt quota (6 attempts for General category).",
      "Candidates exceeding 32 years of age as on 01-08-2026 without eligible category relaxations.",
      "Candidates awaiting undergraduate degree results whose final degree or provisional mark sheet cannot be produced before the Mains DAF-I closing window.",
      "Candidates seeking uniformed police cadres (IPS, DANIPS) who do not satisfy physical standards (165 cm for males, 150 cm for females; chest expansion 5 cm)."
    ],
    "commonRejectionMistakes": [
      "UPSC photo guideline mismatch: Under revised UPSC rules, the photo must be taken within 10 days of filling the form, with the candidate’s name and date of photo printed clearly at the bottom.",
      "Discrepancies in OTR bio-data: Discrepancies between One Time Registration records and Matriculation certificate roll numbers cannot be edited after final submission.",
      "Choosing unfeasible examination centers: UPSC allocates preliminary exam centers on a \"First-Apply-First-Allot\" basis; late applicants often find nearby city quotas exhausted.",
      "Failing to verify community certificate format: Non-compliance with the Central DoPT Annexure format for OBC-NCL or EWS invalidates category claims during interview scrutiny."
    ],
    "documentsNeeded": [
      "UPSC One Time Registration (OTR) profile ID and password.",
      "Matriculation (10th) Certificate (mandatory for Date of Birth & Father’s name verification).",
      "Graduation Degree Certificate or provisional degree certificate from recognized University.",
      "Government Photo ID Card (Aadhaar, Voter ID, PAN, Passport, Driving License) used during OTR.",
      "Recent color passport photograph with candidate name and date printed at the base (20 KB to 300 KB).",
      "Scanned signature in running handwriting (20 KB to 300 KB, clear black ink on white background).",
      "Category Certificate (SC/ST/OBC-NCL/EWS) in prescribed Central Government Annexure format."
    ],
    "officialLinks": [
      {
        "title": "UPSC Online Portal",
        "label": "Apply Online (upsconline.nic.in)",
        "url": "https://upsconline.nic.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Official UPSC Website",
        "label": "Visit Official Commission Portal",
        "url": "https://upsc.gov.in",
        "linkType": "official"
      },
      {
        "title": "Age Eligibility Calculator",
        "label": "Check Age on 01-08-2026",
        "url": "/tools/age",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Integrate static syllabus concepts with dynamic newspaper coverage from The Hindu and Indian Express.",
      "Solve at least 10 previous years official UPSC preliminary papers to decode commission question phrasing and elimination mechanics.",
      "Do not neglect CSAT Paper-II: practice daily comprehension passages and basic arithmetic to comfortably cross the 33% (66 marks) barrier.",
      "Maintain crisp, handwritten revision micro-notes organized by GS paper themes (Polity, Economy, Geography, Environment, Modern History).",
      "Follow a disciplined 3-cycle revision schedule: first revision within 7 days, second within 30 days, and third during the final month."
    ],
    "cutOffTrends": [
      {
        "year": "2024 Prelims GS Paper-I (Official)",
        "general": 75.41,
        "obc": 74.75,
        "ews": 68.02,
        "sc": 59.25,
        "st": 47.82,
        "totalMarks": 200
      },
      {
        "year": "2023 Prelims GS Paper-I (Official)",
        "general": 88.22,
        "obc": 87.54,
        "ews": 81.55,
        "sc": 74.08,
        "st": 69.35,
        "totalMarks": 200
      },
      {
        "year": "2022 Prelims GS Paper-I (Official)",
        "general": 88.22,
        "obc": 87.54,
        "ews": 82.83,
        "sc": 74.08,
        "st": 69.35,
        "totalMarks": 200
      }
    ],
    "syllabusTopics": [
      {
        "subject": "General Studies Paper-I (Preliminary Examination)",
        "weightage": "200 Marks / 100 Questions",
        "topics": [
          "Current events of national and international importance, bilateral summits, and multilateral accords",
          "History of India and Indian National Movement: Ancient, Medieval, Modern freedom struggle, and administrative evolution",
          "Indian and World Geography: Physical, Social, Economic Geography of India and the World",
          "Indian Polity and Governance: Constitution, Political System, Panchayati Raj, Public Policy, Rights Issues",
          "Economic and Social Development: Sustainable Development, Poverty, Inclusion, Demographics, Social Sector Initiatives",
          "General issues on Environmental Ecology, Bio-diversity and Climate Change, Wildlife Protection Acts, and Ramsar Sites",
          "General Science: Everyday scientific applications, biotechnology, space missions (Chandrayaan/Gaganyaan), and nanotechnology"
        ]
      },
      {
        "subject": "CSAT Paper-II (Civil Services Aptitude Test)",
        "weightage": "200 Marks / 80 Questions (33% Qualifying)",
        "topics": [
          "Reading Comprehension: Philosophical, analytical, and socio-economic editorial passages",
          "Interpersonal skills including communication skills and ethical decision-making scenarios",
          "Logical reasoning and analytical ability, syllogisms, linear and circular arrangements",
          "General mental ability, basic numeracy (numbers and relations, orders of magnitude - Class X level)",
          "Data interpretation (charts, graphs, tables, data sufficiency - Class X level)"
        ]
      }
    ]
  },
  {
    "id": "sbi-po-clerk-2026",
    "slug": "sbi-po-clerk-2026-recruitment-notification",
    "category": "jobs",
    "title": "SBI PO & Clerk 2026 Recruitment Notice",
    "organization": "State Bank of India (SBI)",
    "examName": "SBI PO & Junior Associates (Customer Support & Sales)",
    "postCount": "10,283",
    "publishDate": "10 Sep 2026",
    "lastDate": "30 Nov 2026",
    "examDate": "Nov – Dec 2026",
    "qualification": "Graduation in any discipline from a recognized University",
    "qualificationTier": "graduate",
    "sector": "banking",
    "minAge": 20,
    "maxAge": 30,
    "ageLimit": "20 to 28 Years (Clerk) / 21 to 30 Years (PO) with standard banking relaxations",
    "fees": "₹750 (SC / ST / PwBD Candidates Exempted)",
    "sourceNotice": {
      "title": "State Bank of India Recruitment Announcements",
      "url": "https://sbi.co.in/web/careers",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "11 Oct 2026, 17:15 IST",
    "readTime": "6 min read",
    "summary": "State Bank of India announces nationwide recruitment for 2,000 Probationary Officers and 8,283 Junior Associates across all SBI administrative circles with attractive compensation and leased accommodation allowances.",
    "linkText": "Check State-Wise Vacancies & Apply Online",
    "calculatorToolType": "marking",
    "calculatorPresetId": "bank-po",
    "importantDates": [
      {
        "event": "Online Registration Opens",
        "date": "10 September 2026"
      },
      {
        "event": "Registration Last Date",
        "date": "06 October 2026"
      },
      {
        "event": "Preliminary Online Examination",
        "date": "November 2026"
      },
      {
        "event": "Main Online Examination",
        "date": "December 2026 – January 2027"
      },
      {
        "event": "Psychometric Test & Interview (PO)",
        "date": "February 2027"
      }
    ],
    "applicationFees": [
      {
        "category": "General / EWS / OBC Candidates",
        "fee": "₹750"
      },
      {
        "category": "SC / ST / PwBD Candidates",
        "fee": "Exempted (Nil)"
      }
    ],
    "vacanciesTable": [
      {
        "postName": "Probationary Officer (PO)",
        "department": "All India SBI Management Cadre",
        "classification": "Junior Management Grade Scale I (JMGS-I)",
        "payScale": "Basic ₹41,960 (with 4 advance increments in ₹36,000 – ₹63,840 scale)",
        "vacancy": "2,000",
        "eligibility": "Graduation in any discipline; 3 Tier recruitment process"
      },
      {
        "postName": "Junior Associate (Customer Support & Sales)",
        "department": "Circle-wise Branches (Delhi, Mumbai, Bengaluru, Lucknow, etc.)",
        "classification": "Clerical Cadre",
        "payScale": "Basic ₹19,900 (in ₹17,900 – ₹47,920 scale)",
        "vacancy": "8,283",
        "eligibility": "Graduation Degree; Proficiency in local state language mandatory"
      }
    ],
    "salaryStructure": {
      "payLevel": "SBI JMGS-I Scale (Probationary Officer)",
      "basicPay": "₹41,960 per month",
      "daPercent": "46.92% of Basic Pay (₹19,687)",
      "hraPercent": "Leased Housing Accommodation of ₹15,000 to ₹29,500/month in lieu of HRA",
      "grossMonthly": "₹65,780 to ₹82,000 per month (including Leased Accommodation)",
      "inHandMonthly": "₹58,000 – ₹64,000 per month",
      "benefits": [
        "Leased accommodation reimbursement (up to ₹29,500 in Mumbai)",
        "Monthly petrol allowance (45 to 55 liters per month)",
        "Newspaper, cleansing, and mobile reimbursement allowances",
        "100% Medical coverage under SBI Medical Benefit Scheme",
        "Concessional home loans and car loans at special staff interest rates"
      ]
    },
    "selectionProcess": [
      {
        "stageNumber": "Phase 1",
        "stageName": "Preliminary Online Examination",
        "description": "100 marks objective test (English 30, Quantitative Aptitude 35, Reasoning Ability 35) with 20 minutes sectional timing each.",
        "qualifyingNature": "Shortlists candidates for Mains at approximately 10 times the vacancy."
      },
      {
        "stageNumber": "Phase 2",
        "stageName": "Main Examination (Objective 200 + Descriptive 50)",
        "description": "Reasoning & Computer, Data Analysis, General & Banking Awareness, English Language, plus 30-minute letter and essay typing test.",
        "qualifyingNature": "Scores carry 75% weightage in final merit calculation."
      },
      {
        "stageNumber": "Phase 3",
        "stageName": "Psychometric Test, Group Discussion & Interview",
        "description": "Psychometric profile assessment followed by Group Exercise (20 marks) and Interview (30 marks).",
        "qualifyingNature": "Carries 25% weightage in final merit list."
      }
    ],
    "examPattern": [
      {
        "subject": "English Language",
        "questions": 30,
        "marks": 30,
        "time": "20 Minutes Sectional",
        "negativeMarking": "1/4th (-0.25 Marks) penalty"
      },
      {
        "subject": "Quantitative Aptitude",
        "questions": 35,
        "marks": 35,
        "time": "20 Minutes Sectional",
        "negativeMarking": "1/4th (-0.25 Marks) penalty"
      },
      {
        "subject": "Reasoning Ability",
        "questions": 35,
        "marks": 35,
        "time": "20 Minutes Sectional",
        "negativeMarking": "1/4th (-0.25 Marks) penalty"
      }
    ],
    "faqs": [
      {
        "question": "Is there any sectional cut-off in SBI PO Examination?",
        "answer": "No. As per official SBI policy, there is NO sectional minimum qualifying mark in either the Preliminary or Main Examination. Selection is based purely on the aggregate overall cut-off mark in each phase."
      },
      {
        "question": "Can candidates apply for SBI Clerk in multiple states?",
        "answer": "No. A candidate can apply for vacancies in only ONE state under the Junior Associate recruitment. Additionally, candidates must pass a Local Language Test (LPT) of the specified state before final appointment."
      },
      {
        "question": "Is there sectional cut-off in SBI PO Examination?",
        "answer": "No! Unlike IBPS exams, State Bank of India does NOT enforce minimum qualifying sectional cut-offs in either Prelims or Mains. Selection is based purely on aggregate total marks. However, overall category cut-offs apply."
      },
      {
        "question": "How many attempts are permitted for SBI PO?",
        "answer": "General/UR candidates are allowed up to 4 attempts in the SBI PO Mains examination. General (PwBD) and OBC candidates are permitted up to 7 attempts. SC and ST candidates have no restriction on attempts subject to age eligibility."
      },
      {
        "question": "What is the in-hand salary of an SBI Probationary Officer in 2026?",
        "answer": "Under the 12th Bipartite Wage Settlement, starting basic pay is ₹48,480 (with 4 advance increments). Adding DA (52%), Special Allowance, and Lease Accommodation allowance (up to ₹30,000 in Mumbai), gross monthly compensation exceeds ₹85,000 to ₹95,000."
      },
      {
        "question": "What is the role of the Psychometric Test in SBI PO Phase-III?",
        "answer": "The Psychometric Test is personality profiling administered to all Mains-shortlisted candidates prior to the Interview. The test results are shared with the interview panel to assess behavioral suitability, emotional intelligence, and leadership competencies."
      }
    ],
    "howToApplySteps": [
      "Visit the official SBI Careers portal at https://sbi.co.in/web/careers.",
      "Click on \"Join SBI\" -> Current Openings -> \"RECRUITMENT OF PROBATIONARY OFFICERS\".",
      "Register with active Mobile Number and Email ID on the IBPS candidate portal.",
      "Upload passport photograph, signature, left thumb impression, and handwritten declaration.",
      "Pay application fee of ₹750 via online payment gateway."
    ],
    "whoShouldApply": [
      "Graduates in any discipline from a recognized university seeking appointment as Probationary Officers or Junior Associates in State Bank of India.",
      "Final-year graduation students eligible to produce proof of passing before interview/joining stages."
    ],
    "whoShouldSkip": [
      "Candidates with adverse credit history (CIBIL score below 650 or default on commercial/student loans).",
      "Candidates exceeding the maximum age limit of 30 years (PO) or 28 years (Clerk) without reservation relaxations."
    ],
    "commonRejectionMistakes": [
      "Typing the handwritten declaration instead of writing it in the candidate own handwriting.",
      "Writing the handwritten declaration in CAPITAL LETTERS (strictly leads to immediate application rejection).",
      "Selecting an SBI circle without proficiency (reading, writing, speaking) in the specified local language."
    ],
    "documentsNeeded": [
      "Graduation Degree Certificate and all semester marks sheets",
      "10th certificate for Date of Birth verification",
      "Scanned Left Thumb Impression (LTI) in blue or black ink",
      "Scanned Handwritten Declaration in English written in running handwriting",
      "Caste / EWS / PwBD Certificate in Central Government prescribed format"
    ],
    "officialLinks": [
      {
        "title": "SBI Official Careers Portal",
        "label": "Apply on SBI Careers",
        "url": "https://sbi.co.in/web/careers",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "IBPS Online Portal",
        "label": "IBPS Registration Gateway",
        "url": "https://ibps.in",
        "linkType": "official"
      },
      {
        "title": "Negative Marking Calculator",
        "label": "Calculate Bank 1/4th Score",
        "url": "/tools/marking",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Master 20-minute sectional time management: aim for 28+ attempts in Reasoning, 25+ in Quantitative Aptitude, and 22+ in English.",
      "Focus on High-Yield Puzzle Formats (Floor with Flat, Box, Square seating with vacant seats) to guarantee 15-20 marks within 10 minutes.",
      "Practice Simplification, Quadratic Inequalities, and Number Series daily for effortless 12-15 score banking.",
      "Read daily editorial columns to improve reading comprehension skimming speed and contextual vocabulary identification.",
      "Strictly avoid spending more than 2.5 minutes on a single arithmetic word problem or unfamiliar puzzle arrangement."
    ],
    "cutOffTrends": [
      {
        "year": "2024 SBI PO Prelims (Official)",
        "general": 58.5,
        "obc": 56.75,
        "ews": 55.25,
        "sc": 50,
        "st": 46.5,
        "totalMarks": 100
      },
      {
        "year": "2023 SBI PO Prelims (Official)",
        "general": 59.5,
        "obc": 58.25,
        "ews": 56.5,
        "sc": 51.25,
        "st": 47.75,
        "totalMarks": 100
      },
      {
        "year": "2022 SBI PO Prelims (Official)",
        "general": 59.5,
        "obc": 58.25,
        "ews": 57,
        "sc": 52.5,
        "st": 47.75,
        "totalMarks": 100
      }
    ],
    "syllabusTopics": [
      {
        "subject": "Reasoning & Computer Aptitude",
        "weightage": "40% Weightage",
        "topics": [
          "High-level Puzzles (Floor with variable, Box scheduling, Year-based calculations with age limits)",
          "Seating Arrangements (Circular, Linear parallel rows, Uncertain number of persons)",
          "Syllogism (Only a few cases, Reverse syllogisms), Machine Input-Output logic flows",
          "Data Sufficiency (2-statement and 3-statement evaluations), Logical & Critical Reasoning (Course of action, Assumptions)"
        ]
      },
      {
        "subject": "Quantitative Aptitude & Data Analysis",
        "weightage": "35% Weightage",
        "topics": [
          "Data Interpretation (Caselet DI, Missing DI, Radar charts, Funnel charts, and Arithmetic-based DI)",
          "Number Series (Wrong number identification, Pattern recognition), Quadratic Equations with roots comparison",
          "Commercial Arithmetic: Profit & Loss, Simple & Compound Interest, Time & Work, Speed Time Distance, Mixtures & Alligations"
        ]
      },
      {
        "subject": "English Language & General / Banking Awareness",
        "weightage": "25% Weightage",
        "topics": [
          "Reading Comprehension (Financial, Macroeconomic & ESG themes with inference questions)",
          "Sentence rearrangement, Cloze test, Error detection, Word swap, and Column-based matching",
          "RBI monetary policy rates, Banking terminology, Priority Sector Lending (PSL), Union Budget allocations, Current financial news"
        ]
      }
    ]
  },
  {
    "id": "up-police-constable-2026",
    "slug": "up-police-constable-60244-posts-notification",
    "category": "jobs",
    "title": "UP Police Constable Recruitment 2026 Notice",
    "organization": "Uttar Pradesh Police Recruitment & Promotion Board (UPPRPB)",
    "examName": "UP Police Civil Police Constable Recruitment",
    "postCount": "60,244",
    "publishDate": "08 Sep 2026",
    "lastDate": "25 Nov 2026",
    "examDate": "Nov 2026",
    "qualification": "10+2 Intermediate from recognized Board (Open to All-India candidates)",
    "qualificationTier": "12th",
    "sector": "police",
    "minAge": 18,
    "maxAge": 25,
    "ageLimit": "18 to 25 Years for Male (with 3-year age relaxation) / 18 to 28 Years for Female",
    "fees": "₹400 for All Categories",
    "sourceNotice": {
      "title": "Uttar Pradesh Police Recruitment & Promotion Board (UPPRPB)",
      "url": "https://uppbpb.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "11 Oct 2026, 17:30 IST",
    "readTime": "6 min read",
    "summary": "The Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB) invites online applications for 60,244 Civil Police Constable positions with nationwide eligibility in Pay Band 5200-20200, Grade Pay 2000 (Level 3).",
    "linkText": "Check Physical Standards & Exam Pattern",
    "calculatorToolType": "height",
    "calculatorPresetId": "up-police-constable",
    "importantDates": [
      {
        "event": "Official Notification Published",
        "date": "08 September 2026"
      },
      {
        "event": "Online Application Portal Opens",
        "date": "08 September 2026"
      },
      {
        "event": "Application Submission Deadline",
        "date": "10 October 2026"
      },
      {
        "event": "Fee Adjustment & Form Correction",
        "date": "12 October to 14 October 2026"
      },
      {
        "event": "Offline OMR Written Examination",
        "date": "November 2026 (Multiple Shifts)"
      },
      {
        "event": "Physical Efficiency Test (PET/PST)",
        "date": "January 2027"
      }
    ],
    "applicationFees": [
      {
        "category": "All Candidates (General / OBC / SC / ST / EWS)",
        "fee": "₹400"
      },
      {
        "category": "Payment Modes",
        "fee": "SBI e-Pay, UPI, Internet Banking, Debit Cards"
      }
    ],
    "vacanciesTable": [
      {
        "postName": "Constable Civil Police (Male)",
        "department": "Uttar Pradesh Civil Police",
        "classification": "Group C (Non-Gazetted)",
        "payScale": "Level 3 (₹21,700 – ₹69,100)",
        "vacancy": "48,195",
        "eligibility": "12th Pass; Height: 168 cm (General/OBC/SC), 160 cm (ST); Run: 4.8 km in 25 mins"
      },
      {
        "postName": "Constable Civil Police (Female)",
        "department": "Uttar Pradesh Civil Police",
        "classification": "Group C (20% Horizontal Reservation)",
        "payScale": "Level 3 (₹21,700 – ₹69,100)",
        "vacancy": "12,049",
        "eligibility": "12th Pass; Height: 152 cm (General/OBC/SC), 147 cm (ST); Run: 2.4 km in 14 mins"
      }
    ],
    "salaryStructure": {
      "payLevel": "Pay Matrix Level 3 (Grade Pay ₹2,000)",
      "basicPay": "₹21,700 per month",
      "daPercent": "50% of Basic Pay (₹10,850)",
      "hraPercent": "₹1,200 to ₹3,600 (Class A, B, C cities in UP)",
      "grossMonthly": "₹35,200 – ₹38,500 per month",
      "inHandMonthly": "₹30,800 – ₹33,200 per month",
      "benefits": [
        "Monthly Ration Allowance (Paushtik Aahar Bhatta)",
        "Annual Uniform Washing and Maintenance Allowance",
        "UP Government Cashless Health Scheme card for family",
        "New Defined Contributory Pension Scheme (NPS)"
      ]
    },
    "selectionProcess": [
      {
        "stageNumber": "Stage 1",
        "stageName": "OMR Based Written Examination",
        "description": "150 Questions for 300 Marks (General Knowledge, General Hindi, Numerical & Mental Ability, Mental Aptitude/Reasoning). Time: 2 Hours.",
        "qualifyingNature": "Scores directly determine merit list for Document Verification and PST at 2.5x ratio."
      },
      {
        "stageNumber": "Stage 2",
        "stageName": "Document Scrutiny & PST (Physical Standards)",
        "description": "Height measurement (Male: 168cm, Female: 152cm) and Chest measurement for males (79-84cm). Weight requirement of minimum 40kg for females.",
        "qualifyingNature": "Strictly qualifying."
      },
      {
        "stageNumber": "Stage 3",
        "stageName": "Physical Efficiency Test (PET Running)",
        "description": "Male candidates: 4.8 km run in 25 minutes. Female candidates: 2.4 km run in 14 minutes.",
        "qualifyingNature": "Qualifying nature. No marks assigned."
      },
      {
        "stageNumber": "Stage 4",
        "stageName": "Medical Examination & Character Scrutiny",
        "description": "Conducted at District Reserve Police Lines by Chief Medical Officer (CMO).",
        "qualifyingNature": "Final appointment hurdle."
      }
    ],
    "examPattern": [
      {
        "subject": "General Knowledge (Samanya Gyan)",
        "questions": 38,
        "marks": 76,
        "time": "Combined 2 Hours",
        "negativeMarking": "-0.50 Marks penalty for each wrong answer"
      },
      {
        "subject": "General Hindi (Samanya Hindi)",
        "questions": 37,
        "marks": 74,
        "time": "Combined 2 Hours",
        "negativeMarking": "-0.50 Marks penalty for each wrong answer"
      },
      {
        "subject": "Numerical & Mental Ability",
        "questions": 38,
        "marks": 76,
        "time": "Combined 2 Hours",
        "negativeMarking": "-0.50 Marks penalty for each wrong answer"
      },
      {
        "subject": "Mental Aptitude, I.Q. and Reasoning",
        "questions": 37,
        "marks": 74,
        "time": "Combined 2 Hours",
        "negativeMarking": "-0.50 Marks penalty for each wrong answer"
      }
    ],
    "faqs": [
      {
        "question": "Can candidates from other states (outside Uttar Pradesh) apply for UP Police Constable?",
        "answer": "Yes. Candidates from all Indian states and Union Territories are fully eligible to apply under the Unreserved (UR / General) category quota."
      },
      {
        "question": "What is the negative marking deduction in UP Police Constable Exam?",
        "answer": "Each correct answer awards 2.0 marks. For each wrong answer, a negative penalty of 0.50 marks (0.25 negative fraction) is deducted from the candidate score."
      },
      {
        "question": "What is the examination mode for UP Police Constable 60,244 recruitment?",
        "answer": "The UP Police Constable recruitment is conducted in Pen-and-Paper (OMR-based) offline mode. The question paper contains 150 bilingual (Hindi & English) objective multiple-choice questions carrying a total of 300 marks for 2 hours."
      },
      {
        "question": "What are the physical efficiency standards (running test) for UP Police?",
        "answer": "Physical Efficiency Test (PET) requires: Male candidates to complete a 4.8 km run within 25 minutes. Female candidates must complete a 2.4 km run within 14 minutes. PET is strictly qualifying in nature."
      },
      {
        "question": "Are other state candidates eligible for UP Police Constable?",
        "answer": "Yes. Candidates from all Indian states are eligible to apply under the Unreserved (General) category. However, age relaxations and category reservation quotas (OBC, SC, ST, EWS) are strictly restricted to bonafide residents holding a UP domicile certificate."
      },
      {
        "question": "What is the starting in-hand salary for UP Police Constable in 2026?",
        "answer": "UP Police Constables are appointed in Pay Matrix Level 3 (Pay Band ₹5,200 – ₹20,200, Grade Pay ₹2,000, Starting Basic Pay ₹21,700). Adding 50% DA, HRA, Uniform Allowance, and Diet Allowance, the gross monthly salary is approximately ₹35,000–₹38,000, with net in-hand pay around ₹31,500."
      }
    ],
    "howToApplySteps": [
      "Visit the official UPPRPB application portal at https://uppbpb.gov.in.",
      "Click on \"Direct Recruitment for Constable Civil Police 2026 - Apply Online\".",
      "Fill in applicant personal bio-data, 10th and 12th board marks, and domicile details.",
      "Upload Digilocker-verified certificates or scan copies of educational marksheets, caste certificate, and domicile.",
      "Upload a recent color photograph with white or light grey background and candidate signature.",
      "Pay application fee of ₹400 online and download the submitted application form."
    ],
    "whoShouldApply": [
      "10+2 Intermediate qualified male and female candidates aged 18 to 25 years (with 3-year government relaxation) seeking Civil Police Constable posts in Uttar Pradesh.",
      "Aspirants meeting physical standards: 168 cm height (male) / 152 cm height (female) and capable of clearing the 4.8 km run in 25 minutes."
    ],
    "whoShouldSkip": [
      "Candidates unable to meet physical height and chest expansion measurements.",
      "Non-domicile candidates seeking state-specific reservation benefits (outside state candidates are considered General/UR)."
    ],
    "commonRejectionMistakes": [
      "Submitting OBC-NCL or EWS certificates issued prior to the prescribed cut-off date (must be issued in current financial year).",
      "Uploading blurry signatures or photos with colored or busy backgrounds.",
      "Discrepancies in father name spelling between 10th and 12th marksheets."
    ],
    "documentsNeeded": [
      "10th and 12th Marksheets and Passing Certificates",
      "Uttar Pradesh Domicile Certificate (Niwas Praman Patra)",
      "OBC-NCL / SC / ST / EWS Certificate issued by UP Tehsil authority",
      "DigiLocker verified educational and identity records",
      "Aadhaar Card and recent passport-size photograph"
    ],
    "officialLinks": [
      {
        "title": "UPPRPB Official Portal",
        "label": "Apply on uppbpb.gov.in",
        "url": "https://uppbpb.gov.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Height Standards Checker",
        "label": "Check 168cm Male / 152cm Female Criteria",
        "url": "/tools/height",
        "linkType": "tool"
      },
      {
        "title": "Negative Marking Tool",
        "label": "Calculate UP Police Score (-0.50 penalty)",
        "url": "/tools/marking",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Master General Hindi / Regional Language: language papers carry high scoring predictability; aim for 90%+ accuracy.",
      "Practice OMR sheet bubbling drills: offline testing requires bubble shading speed to avoid losing 15-20 minutes in marking.",
      "Do not take risks under the negative penalty: skip doubtful questions to protect your positive score tally.",
      "Begin physical fitness training simultaneously: practice endurance running daily to comfortably clear physical efficiency standards.",
      "Solve at least 20 official previous year question papers to recognize recurring syllabus question structures."
    ],
    "cutOffTrends": [
      {
        "year": "2024 Written Re-Exam Normalized (Official)",
        "general": 198.5,
        "obc": 189.75,
        "ews": 182.25,
        "sc": 165.5,
        "st": 142,
        "totalMarks": 300
      },
      {
        "year": "2023 Written Test Cycle",
        "general": 193,
        "obc": 184.5,
        "ews": 177,
        "sc": 160,
        "st": 138.5,
        "totalMarks": 300
      },
      {
        "year": "2019 Selection Benchmark Cycle",
        "general": 185.34,
        "obc": 172.32,
        "ews": 168,
        "sc": 145.39,
        "st": 114.19,
        "totalMarks": 300
      }
    ],
    "syllabusTopics": [
      {
        "subject": "General Knowledge & UP Special (सामान्य ज्ञान)",
        "weightage": "76 Marks / 38 Questions",
        "topics": [
          "History, Culture, Geography, and Economy of Uttar Pradesh; UP Police administrative system and revenue administration",
          "Indian Constitution, Fundamental Rights, Panchayati Raj, Human Rights, Internal Security and Cyber Crime basics",
          "Indian Economy, Agriculture, Commerce & Trade, GST and Demonetization impacts, National & International Awards",
          "Current National & International Affairs, Neighboring countries, Books and Authors, Important Days and Capitals"
        ]
      },
      {
        "subject": "General Hindi (सामान्य हिन्दी)",
        "weightage": "74 Marks / 37 Questions",
        "topics": [
          "Hindi Grammar fundamentals: Varna, Sandhi, Samas, Tatsam-Tadbhav, Paryayvachi, Vilom, Anekarthi shabd",
          "Vakyansh ke liye ek shabd, Samrupi bhinnarthak shabd, Ashuddh vakyon ko shuddh karna, Ling, Vachan, Karak, Sarvanam",
          "Visheshan, Kriya, Kaal, Vachya, Avyay, Upsarg, Pratyay, Ras, Chhand, Alankar, Hindi Sahitya award winners"
        ]
      },
      {
        "subject": "Numerical Ability & Mental Reasoning",
        "weightage": "150 Marks / 75 Questions",
        "topics": [
          "Number System, Simplification, Decimals & Fractions, HCF & LCM, Ratio & Proportion, Percentage, Profit & Loss, Discount",
          "Simple & Compound Interest, Partnership, Average, Time & Work, Time & Distance, Mensuration (Area and Volume)",
          "Logical diagrams, Symbol-relationship interpretation, Codification, Direction sense test, Letter and number series, Blood relations"
        ]
      }
    ]
  },
  {
    "id": "army-agniveer-rally-2026",
    "slug": "indian-army-agniveer-rally-2026-recruitment",
    "category": "jobs",
    "title": "Indian Army Agniveer Rally 2026 Notice",
    "organization": "Indian Army (Ministry of Defence)",
    "examName": "Agnipath Scheme Rally Recruitment 2026",
    "postCount": "30,000+",
    "publishDate": "01 Sep 2026",
    "lastDate": "28 Oct 2026",
    "examDate": "Nov 2026",
    "qualification": "8th / 10th Pass (GD & Tradesmen) or 10+2 with PCM (Tech) / 10+2 with English (Clerk)",
    "qualificationTier": "10th",
    "sector": "defence",
    "minAge": 17,
    "maxAge": 21,
    "ageLimit": "17½ to 21 Years (Born between 01-10-2005 and 01-04-2009)",
    "fees": "₹250 (Online CEE Exam Fee)",
    "sourceNotice": {
      "title": "Join Indian Army Official Recruitment Portal",
      "url": "https://joinindianarmy.nic.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "11 Oct 2026, 17:45 IST",
    "readTime": "6 min read",
    "summary": "Join Indian Army opens online registration for Agniveer General Duty, Agniveer Technical, Agniveer Office Assistant / Clerk, and Agniveer Tradesmen across all Army Recruiting Offices (AROs) and Regimental Centers.",
    "linkText": "Check Rally Physical Criteria & Apply",
    "calculatorToolType": "height",
    "calculatorPresetId": "army-agniveer-gd",
    "importantDates": [
      {
        "event": "Online Registration Opens",
        "date": "01 September 2026"
      },
      {
        "event": "Closing Date of Online Registration",
        "date": "15 October 2026"
      },
      {
        "event": "Online Common Entrance Exam (CEE)",
        "date": "November 2026"
      },
      {
        "event": "Physical Fitness Test (PFT) Rallies",
        "date": "December 2026 to February 2027"
      }
    ],
    "applicationFees": [
      {
        "category": "All Candidates Appearing for Online CEE",
        "fee": "₹250 (plus banking charges)"
      },
      {
        "category": "Payment Methods",
        "fee": "Credit/Debit Card, Net Banking, UPI"
      }
    ],
    "vacanciesTable": [
      {
        "postName": "Agniveer General Duty (All Arms)",
        "department": "Infantry, Artillery, Armoured Corps",
        "classification": "Enrolled Soldier Cadre",
        "payScale": "1st Year ₹30,000 -> 4th Year ₹40,000 + Seva Nidhi Package (₹11.71 Lakhs)",
        "vacancy": "22,000+",
        "eligibility": "10th / Matric with 45% marks in aggregate and 33% in each subject; 1.6 km run in 5m 30s"
      },
      {
        "postName": "Agniveer Technical (All Arms)",
        "department": "Corps of Electronics & Mechanical Engineers, Signals",
        "classification": "Technical Cadre",
        "payScale": "1st Year ₹30,000 -> 4th Year ₹40,000 + Seva Nidhi",
        "vacancy": "4,500",
        "eligibility": "10+2 Intermediate with Physics, Chemistry, Maths & English with min 50% marks"
      },
      {
        "postName": "Agniveer Office Assistant / Store Keeper Technical",
        "department": "Army Service Corps, Ordnance",
        "classification": "Clerical Cadre",
        "payScale": "1st Year ₹30,000 -> 4th Year ₹40,000 + Seva Nidhi",
        "vacancy": "3,500",
        "eligibility": "10+2 Intermediate in any stream (Arts, Commerce, Science) with 60% aggregate & 50% in English/Maths"
      }
    ],
    "salaryStructure": {
      "payLevel": "Agnipath Scheme Customized Monthly Package",
      "basicPay": "1st Yr: ₹30,000 | 2nd Yr: ₹33,000 | 3rd Yr: ₹36,500 | 4th Yr: ₹40,000",
      "daPercent": "Included in consolidated package + Risk and Hardship allowances as per deployment",
      "hraPercent": "Provided with military barracks / cantonment accommodation + messing",
      "grossMonthly": "₹30,000 to ₹40,000 per month (plus field area allowances up to ₹17,300)",
      "inHandMonthly": "1st Year In-Hand: ₹21,000/month (30% deposited in Agniveer Corpus Fund)",
      "benefits": [
        "₹11.71 Lakhs Tax-Free \"Seva Nidhi\" Corpus upon completion of 4 years",
        "Life Insurance Cover of ₹48 Lakhs non-contributory during engagement period",
        "25% of Agniveers enrolled into Regular Army Cadre based on merit and performance",
        "Skill Certificate and 10% reservation in CAPFs (BSF, CISF, CRPF, ITBP, SSB) and State Police"
      ]
    },
    "selectionProcess": [
      {
        "stageNumber": "Phase 1",
        "stageName": "Online Computer Based Common Entrance Exam (CEE)",
        "description": "Objective test conducted across 176 test cities nationwide.",
        "qualifyingNature": "Shortlists candidates for Physical Rally at designated ARO centers."
      },
      {
        "stageNumber": "Phase 2",
        "stageName": "Recruitment Rally Physical Fitness Test (PFT)",
        "description": "1.6 Km Run: Group I (under 5 min 30 sec, 60 marks), Group II (5 min 31 sec to 5 min 45 sec, 48 marks). Beam Pull-ups: 10 pull-ups (40 marks). 9 Feet Ditch Jump & Zig-Zag Balance.",
        "qualifyingNature": "Total 100 Physical Marks."
      },
      {
        "stageNumber": "Phase 3",
        "stageName": "Physical Measurement Test (PMT) & Adaptability",
        "description": "Height and chest measurement as per regional criteria followed by Adaptability Test for military life.",
        "qualifyingNature": "Mandatory standard."
      },
      {
        "stageNumber": "Phase 4",
        "stageName": "Medical Examination by Military Doctors",
        "description": "Conducted by Army Medical Corps at designated military base hospitals.",
        "qualifyingNature": "Final clearance."
      }
    ],
    "faqs": [
      {
        "question": "What is the upper age limit for Indian Army Agniveer 2026?",
        "answer": "The age bracket is strictly 17½ to 21 years. Candidates must have been born between 01 October 2005 and 01 April 2009 (both days inclusive). There is no age relaxation for reserved categories in military combat soldier enrolment."
      },
      {
        "question": "What is the running standard for Group 1 in the Army Rally?",
        "answer": "Candidates completing the 1.6-kilometer (1600m) run in 5 minutes 30 seconds or less are classified into Group I and awarded the maximum 60 physical marks."
      },
      {
        "question": "What is the Seva Nidhi financial package received after 4 years of Agniveer service?",
        "answer": "Upon completion of the 4-year tenure, Agniveers receive an exempt lump-sum Seva Nidhi package of approximately ₹11.71 Lakh (comprising candidate monthly contribution of 30% matched equally by Central Government plus accrued interest), which is completely income-tax exempt."
      },
      {
        "question": "What percentage of Agniveers are absorbed into the regular permanent cadre?",
        "answer": "Up to 25% of each enrolled Agniveer batch are selected for retention in the regular cadre of the Indian Armed Forces based on objective centralized evaluation, physical fitness assessments, and organizational requirements."
      },
      {
        "question": "What are the two phases of Indian Army Agniveer selection?",
        "answer": "The selection comprises: Phase 1: Online Computer Based Common Entrance Examination (CEE) conducted across designated testing centers nationwide. Phase 2: Recruitment Rally covering Physical Fitness Test (PFT), Physical Measurement Test (PMT), Adaptability Test, and Medical Examination for CEE-shortlisted candidates."
      },
      {
        "question": "What age eligibility applies for Agniveer General Duty (GD) rally?",
        "answer": "Candidates must be between 17.5 to 21 years of age as on the crucial notification date (born between 01 October 2005 and 01 April 2009 for the 2026 intake cycle)."
      }
    ],
    "howToApplySteps": [
      "Visit the official Join Indian Army portal at https://joinindianarmy.nic.in.",
      "Enter the captcha and navigate to the \"Agnipath\" tab -> \"Login / Apply Online\".",
      "Register with Aadhaar Number and personal bio-data.",
      "Select your relevant Army Recruiting Office (ARO) based on your permanent domicile district.",
      "Choose the desired trade (Agniveer GD, Technical, Clerk, or Tradesmen).",
      "Pay the online examination fee of ₹250 through SBI e-Pay."
    ],
    "whoShouldApply": [
      "Unmarried male candidates aged 17.5 to 21 years with 10th Matriculation (min 45% aggregate and 33% in each subject) seeking Agniveer General Duty / Tradesman entry.",
      "12th pass aspirants with Physics, Chemistry, Math, and English (50% aggregate) seeking Agniveer Technical entry."
    ],
    "whoShouldSkip": [
      "Candidates exceeding 21 years of age on rally date (no age relaxation applicable for Agniveer scheme).",
      "Candidates with permanent body tattoos (except inner face of forearms or tribal communities)."
    ],
    "commonRejectionMistakes": [
      "Name discrepancies between Aadhaar Card and 10th marksheet leading to biometric mismatch.",
      "Failing to bring original Sarpanch/Municipal Character Certificate and Unmarried Certificate to the rally site.",
      "Attempting rally attendance with duplicate or laminated academic certificates."
    ],
    "documentsNeeded": [
      "Original 10th and 12th Marksheets and Board Certificates",
      "Aadhaar Card linked with active mobile number for biometric authentication",
      "Character Certificate with photograph issued by Village Sarpanch / Ward Member within 6 months",
      "Unmarried Certificate with photograph issued by Village Sarpanch within 6 months",
      "20 copies of recent passport-size photographs (white background, clean shaven)"
    ],
    "officialLinks": [
      {
        "title": "Join Indian Army Portal",
        "label": "Apply on joinindianarmy.nic.in",
        "url": "https://joinindianarmy.nic.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Physical Standards Tool",
        "label": "Check 1.6 Km Run & 170cm Height Criteria",
        "url": "/tools/height",
        "linkType": "tool"
      },
      {
        "title": "Age Eligibility Checker",
        "label": "Verify 17½ – 21 Years Eligibility",
        "url": "/tools/age",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Combine academic preparation with daily physical conditioning (1600m running, push-ups, chin-ups) to maintain high PFT readiness.",
      "Develop strong English language command and current affairs articulation for the 5-day Services Selection Board (SSB) interview.",
      "Practice speed mathematics formulas for NDA/CDS: focus on trigonometry, matrices, coordinate geometry, and calculus shortcuts.",
      "Review military organization hierarchy, gallantry decorations, and current geopolitical developments for the General Knowledge paper.",
      "Maintain consistent sleep and hydration habits to ensure peak mental clarity during prolonged written examination sessions."
    ],
    "cutOffTrends": [
      {
        "year": "2024 CEE Online Written Benchmark",
        "general": 135,
        "obc": 132.5,
        "ews": 130,
        "sc": 122.5,
        "st": 118,
        "totalMarks": 200
      },
      {
        "year": "2023 CEE Online Written Test",
        "general": 130,
        "obc": 128,
        "ews": 125.5,
        "sc": 118,
        "st": 114.5,
        "totalMarks": 200
      },
      {
        "year": "2022 Rally Combined Merit Benchmark",
        "general": 125,
        "obc": 122.5,
        "ews": 120,
        "sc": 112.5,
        "st": 108,
        "totalMarks": 200
      }
    ],
    "examPattern": [
      {
        "subject": "General Knowledge (सामान्य ज्ञान)",
        "questions": 15,
        "marks": 30,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Deduction"
      },
      {
        "subject": "General Science (सामान्य विज्ञान)",
        "questions": 15,
        "marks": 30,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Deduction"
      },
      {
        "subject": "Mathematics (गणित)",
        "questions": 15,
        "marks": 30,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Deduction"
      },
      {
        "subject": "Logical Reasoning (तार्किक क्षमता)",
        "questions": 5,
        "marks": 10,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Deduction"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "General Knowledge & Military Awareness",
        "weightage": "30 Marks / 15 Questions",
        "topics": [
          "Indian Armed Forces: Commands, Ranks, Regimental centers, Gallantry awards (Param Vir Chakra, Mahavir Chakra)",
          "Indian History, Landmarks, Major Battles, Freedom Struggle, and National Heroes",
          "Geography of India and World: Major Rivers, Peaks, Borders, neighboring countries (LOC, LAC), and Capitals",
          "Constitution of India, National Symbols, International Organizations (UN, SAARC, G20), and Current Sports"
        ]
      },
      {
        "subject": "General Science (Class 10 NCERT Standard)",
        "weightage": "30 Marks / 15 Questions",
        "topics": [
          "Physics: Motion, Force, Gravity, Work & Energy, Heat & Temperature, Light (Reflection/Refraction), Electricity",
          "Chemistry: Elements, Compounds & Mixtures, Acids, Bases & Salts, Metals & Non-metals, Chemical reactions",
          "Biology: Human Anatomy, Digestive/Respiratory systems, Diseases & Prevention, Vitamins & Balanced Diet"
        ]
      },
      {
        "subject": "Mathematics & Basic Reasoning",
        "weightage": "40 Marks / 20 Questions",
        "topics": [
          "Arithmetic: Number systems, HCF & LCM, Decimal fractions, Square roots, Percentage, Average, Ratio & Proportion",
          "Commercial Math: Profit & Loss, Simple Interest, Time & Work, Time & Distance",
          "Algebra & Geometry: Basic algebraic identities, Lines, Angles, Triangles, Circles, Perimeter and Area of 2D shapes",
          "Logical Reasoning: Number patterns, Alphabet series, Coding-Decoding, Blood relations, and Direction sense"
        ]
      }
    ]
  },
  {
    "id": "guide-army-1600m-running-standards",
    "slug": "army-1600-meter-running-standards-agniveer-guide",
    "category": "jobs",
    "title": "Army 1600 Meter Running Standards & Agniveer Physical Fitness Guide",
    "organization": "Indian Army (Ministry of Defence)",
    "examName": "Physical Fitness Test (PFT) & Agnipath Scheme Rally",
    "postCount": "All ZRO / ARO Rallies",
    "publishDate": "03 Oct 2026",
    "lastDate": "31 Dec 2026",
    "examDate": "Rallies Conducted Nationwide",
    "qualification": "8th / 10th / 10+2 Pass (Agniveer GD, Technical, Clerk/SKT, Tradesmen)",
    "qualificationTier": "10th",
    "sector": "defence",
    "minAge": 17,
    "maxAge": 21,
    "ageLimit": "17½ to 21 Years (Born between 01-10-2005 and 01-04-2009)",
    "fees": "Exempt for Physical Rally Participation",
    "sourceNotice": {
      "title": "Join Indian Army Official Recruitment Portal & DG Recruiting Orders",
      "url": "https://joinindianarmy.nic.in",
      "checkedOn": "03 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "03 Oct 2026, 09:15 IST",
    "readTime": "9 min read",
    "summary": "Authoritative guide to Indian Army 1600-meter running benchmarks: Group I (up to 5m 30s — 60 marks) vs Group II (5m 31s to 5m 45s — 48 marks), pull-up scoring, interval training splits, age criteria, and physical height & chest standards.",
    "linkText": "View 1600m Timing Charts & PFT Guide",
    "calculatorToolType": "height",
    "calculatorPresetId": "army-agniveer-gd",
    "importantDates": [
      {
        "event": "Phase 1 Computer-Based Written Test (CEE)",
        "date": "Conducted Nationwide"
      },
      {
        "event": "Phase 2 Physical Fitness Rallies (PFT)",
        "date": "ZRO / ARO Scheduled"
      },
      {
        "event": "1600m Running Benchmark Testing",
        "date": "Rally Day Early Morning"
      },
      {
        "event": "Physical Measurement & Document Scrutiny",
        "date": "Immediately Post-PFT"
      }
    ],
    "selectionProcess": [
      {
        "stageNumber": "1",
        "stageName": "Common Entrance Exam (CEE)",
        "description": "Computer-based objective test evaluating General Knowledge, Science, Maths, and English/Technical subjects.",
        "qualifyingNature": "Merit Determining (100 Marks for GD/Tradesmen, 200 Marks for Tech/Clerk)"
      },
      {
        "stageNumber": "2",
        "stageName": "1600m Run (1.6 Km)",
        "description": "Group I (Up to 5:30 min = 60 Marks), Group II (5:31 to 5:45 min = 48 Marks). Candidates exceeding 5:45 min are failed.",
        "qualifyingNature": "Mandatory Qualifying & Merit Scored (GD/Tradesmen)"
      },
      {
        "stageNumber": "3",
        "stageName": "Pull-Ups on Beam",
        "description": "Underhand grip pull-ups on horizontal beam: 10 reps = 40 Marks, 9 reps = 33 Marks, 8 = 27, 7 = 21, 6 = 16 (Min. 6 reps to pass).",
        "qualifyingNature": "Mandatory Qualifying & Merit Scored"
      },
      {
        "stageNumber": "4",
        "stageName": "9-Ft Ditch & Zig-Zag Balance",
        "description": "Jumping over a 9-foot open ditch in single leap and traversing an elevated zigzag wooden balance beam.",
        "qualifyingNature": "Strictly Qualifying (Zero Marks)"
      }
    ],
    "whatsDifferentThisYear": [
      {
        "parameter": "1600m Timing Recording",
        "currentCycle": "Biometric RFID bib chips + synchronized camera at finish line",
        "previousCycle": "Manual stopwatch with physical finish rope barrier",
        "sourceOrVerify": "https://joinindianarmy.nic.in"
      },
      {
        "parameter": "Physical Marks in Final Merit",
        "currentCycle": "100 Marks (60 Run + 40 Pull-Ups) directly added for GD & Tradesmen",
        "previousCycle": "100 Marks added for GD & Tradesmen (Unchanged)",
        "sourceOrVerify": "DG Recruiting Rally Guidelines"
      },
      {
        "parameter": "Clerk / SKT Physical Evaluation",
        "currentCycle": "1600m run and beam pull-ups are strictly qualifying (CEE + Typing decides merit)",
        "previousCycle": "Physical was qualifying (Unchanged)",
        "sourceOrVerify": "Indian Army Recruitment Directorate"
      },
      {
        "parameter": "Height & Chest Measurement (PST)",
        "currentCycle": "Digital stadiometer and electronic chest measurement sensors at rally gates",
        "previousCycle": "Manual height bar and measuring tape",
        "sourceOrVerify": "Army Medical & Recruitment Protocol"
      }
    ],
    "whoShouldApply": [
      "Candidates between 17½ and 21 years of age on the rally cutoff date seeking enrolment in Indian Army as Agniveer GD, Tech, Clerk, or Tradesmen.",
      "Aspirants who can achieve a 1600m timing below 5 minutes 45 seconds (optimally under 5:30 for maximum 60 marks).",
      "Candidates fulfilling minimum regional physical standards: height (163–170 cm) and chest (77 cm + 5 cm expansion)."
    ],
    "whoShouldSkip": [
      "Candidates below 17½ or exceeding 21 years of age on the prescribed crucial date (no age relaxation for General or reserved categories).",
      "Candidates with permanent tattoos on prohibited body parts or uncorrected medical conditions (knock-knees, flat foot, color blindness).",
      "Candidates unable to achieve the minimum statutory 6 beam pull-ups or 5 cm chest expansion."
    ],
    "commonRejectionMistakes": [
      "Disqualification at the initial height bar before reaching the 1600m track due to inaccurate home measurements.",
      "Sprinting the first 200m at 100% effort in crowd panic, causing severe lactic acidosis on laps 3 and 4.",
      "Neglecting dead-hang military pull-up form (kipping, kicking legs, or failing to clear chin cleanly over the beam).",
      "Arriving dehydrated or starved after sitting for hours in cold overnight rally holding enclosures.",
      "Failing to verify state and category domicile certificates before reporting to the rally ground."
    ],
    "documentsNeeded": [
      "Matriculation (10th) Admit Card, Marks Sheet, and Board Certificate (character-for-character name and DOB match).",
      "Indian Army Rally Admit Card printed on good quality laser paper.",
      "Valid Government Photo ID (Aadhaar Card linked to mobile number for biometric attendance).",
      "Domicile / Resident Certificate with photograph issued by Tehsildar / District Magistrate.",
      "Caste Certificate with photograph issued by authorized revenue authority.",
      "Affidavit duly notarized on ₹10 non-judicial stamp paper in the prescribed Join Indian Army format.",
      "20 passport size photographs with white background (not older than 3 months, without spectacles/caps)."
    ],
    "examPattern": [
      {
        "subject": "1600m Run Group I (Up to 5m 30s)",
        "questions": 1,
        "marks": 60,
        "time": "Max 5m 30s",
        "negativeMarking": "0 (Below 5:45 = 48M, Exceeding 5:45 = Fail)"
      },
      {
        "subject": "1600m Run Group II (5m 31s to 5m 45s)",
        "questions": 1,
        "marks": 48,
        "time": "5m 31s - 5m 45s",
        "negativeMarking": "0 (Exceeding 5:45 = Disqualified)"
      },
      {
        "subject": "Beam Pull-Ups (10 repetitions)",
        "questions": 10,
        "marks": 40,
        "time": "Self-Paced / Commanded",
        "negativeMarking": "9 reps = 33M, 8 = 27M, 7 = 21M, 6 = 16M"
      },
      {
        "subject": "9-Foot Ditch Jump",
        "questions": 1,
        "marks": 0,
        "time": "Single Attempt",
        "negativeMarking": "Strictly Qualifying (Touch Edge = Elimination)"
      },
      {
        "subject": "Zig-Zag Balance Beam",
        "questions": 1,
        "marks": 0,
        "time": "Single Attempt",
        "negativeMarking": "Strictly Qualifying (Slip/Fall = Elimination)"
      }
    ],
    "faqs": [
      {
        "question": "What is the cutoff time for Group 1 in the Army 1600m run?",
        "answer": "Candidates who complete the 1.6 km run in 5 minutes 30 seconds or less qualify in Group I and earn the maximum 60 physical marks."
      },
      {
        "question": "Do 1600m running marks affect the final merit list for Agniveer GD?",
        "answer": "Yes. For Agniveer General Duty and Agniveer Tradesmen, the 100 marks from the Physical Fitness Test (60 Run + 40 Pull-Ups) are added directly to the CEE written examination score to determine final recruitment ranking."
      },
      {
        "question": "Are running marks counted for Agniveer Technical and Clerk / SKT?",
        "answer": "No. For Technical and Clerk/SKT trades, the 1600m run and beam pull-ups are strictly qualifying. As long as you finish within 5:45 and complete 6 pull-ups, your final merit depends entirely on written exam marks."
      },
      {
        "question": "What should I do if my height is borderline (e.g. exactly 169.5 cm for a 170 cm cutoff)?",
        "answer": "Use our verified Physical Standards Tool (/tools/height) to check if your domicile zone or category grants height concessions (e.g. 165 cm for hill areas or 162.5 cm for ST candidates). Focus on core posture exercises to avoid slouching at the measurement stand."
      }
    ],
    "officialLinks": [
      {
        "title": "Physical Standards Tool",
        "label": "Check 163–170cm Height & 77cm Chest Criteria",
        "url": "/tools/height",
        "linkType": "tool"
      },
      {
        "title": "Application Masterclass Guide",
        "label": "Read In-Depth 8-Week Training Blueprint",
        "url": "/guides/army-1600-meter-running-time-agniveer-pft-standards",
        "linkType": "tool"
      },
      {
        "title": "Join Indian Army Portal",
        "label": "joinindianarmy.nic.in",
        "url": "https://joinindianarmy.nic.in",
        "isPrimary": true,
        "linkType": "official"
      }
    ],
    "preparationTips": [
      "Combine academic preparation with daily physical conditioning (1600m running, push-ups, chin-ups) to maintain high PFT readiness.",
      "Develop strong English language command and current affairs articulation for the 5-day Services Selection Board (SSB) interview.",
      "Practice speed mathematics formulas for NDA/CDS: focus on trigonometry, matrices, coordinate geometry, and calculus shortcuts.",
      "Review military organization hierarchy, gallantry decorations, and current geopolitical developments for the General Knowledge paper.",
      "Maintain consistent sleep and hydration habits to ensure peak mental clarity during prolonged written examination sessions."
    ],
    "cutOffTrends": [
      {
        "year": "PFT Group-I Standard (Timing up to 5 min 30 sec)",
        "general": 60,
        "obc": 60,
        "ews": 60,
        "sc": 60,
        "st": 60,
        "totalMarks": 60
      },
      {
        "year": "PFT Group-II Standard (Timing 5 min 31 sec to 5 min 45 sec)",
        "general": 48,
        "obc": 48,
        "ews": 48,
        "sc": 48,
        "st": 48,
        "totalMarks": 60
      },
      {
        "year": "Beam / Pull-ups (10 Clean Repetitions)",
        "general": 40,
        "obc": 40,
        "ews": 40,
        "sc": 40,
        "st": 40,
        "totalMarks": 40
      }
    ],
    "syllabusTopics": [
      {
        "subject": "Physical Efficiency Test (PFT) Parameter Architecture",
        "weightage": "100 Marks Full Score",
        "topics": [
          "1600 Meters Endurance Run: Pacing strategy across four 400m laps, breathing rhythm, stride economy",
          "Beam (Pull-ups): Underhand grip, clean chin elevation above horizontal bar, leg swinging disqualification rules",
          "9-Foot Ditch Jump: Approach acceleration, single-foot takeoff, soft landing balance without touching ground with hands",
          "Zig-Zag Balance Beam: Core stability, foot alignment, rapid recovery maneuvers under rally timer pressure"
        ]
      }
    ]
  },
  {
    "id": "rrb-ntpc-2026",
    "slug": "rrb-ntpc-2026-recruitment-apply-online",
    "category": "jobs",
    "title": "RRB NTPC CEN 05/2026 Recruitment Notice",
    "organization": "Railway Recruitment Boards (RRB)",
    "examName": "Non-Technical Popular Categories (NTPC)",
    "postCount": "11,558",
    "publishDate": "18 Sep 2026",
    "lastDate": "20 Oct 2026",
    "examDate": "Nov 2026 – Jan 2027",
    "qualification": "12th Pass (UG Posts) or Graduate Degree (Graduate Posts)",
    "qualificationTier": "12th",
    "sector": "railways",
    "minAge": 18,
    "maxAge": 36,
    "ageLimit": "18 to 36 Years (3 Years COVID age relaxation factored in)",
    "fees": "₹500 (₹400 refundable on CBT-1 attendance)",
    "sourceNotice": {
      "title": "Railway Recruitment Boards Unified Portal",
      "url": "https://www.rrbapply.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "27 Sep 2026, 14:15 IST",
    "readTime": "6 min read",
    "summary": "Ministry of Railways has issued CEN 05/2026 & CEN 06/2026 inviting online applications for 11,558 vacancies across Indian Railway zones for Station Master, Goods Train Manager, Commercial Apprentice, and Accounts Clerk.",
    "linkText": "Check Eligibility & Apply RRB Zone Wise",
    "calculatorToolType": "age",
    "calculatorPresetId": "rrb-ntpc",
    "importantDates": [
      {
        "event": "Detailed CEN Notification Release",
        "date": "18 September 2026"
      },
      {
        "event": "Online Application Opening Date",
        "date": "19 September 2026"
      },
      {
        "event": "Closing Date for Submission",
        "date": "20 October 2026 (23:59 Hrs)"
      },
      {
        "event": "Final Online Fee Payment Date",
        "date": "22 October 2026"
      },
      {
        "event": "Application Status & Modification Window",
        "date": "25 October to 04 November 2026"
      },
      {
        "event": "1st Stage Computer Based Test (CBT-1)",
        "date": "November 2026 to January 2027"
      }
    ],
    "applicationFees": [
      {
        "category": "UR / OBC Male Candidates",
        "fee": "₹500 (₹400 refunded after appearing in CBT-1)"
      },
      {
        "category": "SC / ST / Female / PwBD / Transgender / Minorities",
        "fee": "₹250 (Full ₹250 refunded on CBT-1 appearance)"
      }
    ],
    "vacanciesTable": [
      {
        "postName": "Station Master",
        "department": "Operating Department",
        "classification": "Level 6 (Graduate Post)",
        "payScale": "₹35,400 + Allowances",
        "vacancy": "3,860",
        "eligibility": "Degree from recognized University; Computer Based Aptitude Test (CBAT) mandatory"
      },
      {
        "postName": "Goods Train Manager",
        "department": "Operating Department",
        "classification": "Level 5 (Graduate Post)",
        "payScale": "₹29,200 + Running Allowance",
        "vacancy": "2,940",
        "eligibility": "Bachelor Degree in any stream; A-2 Medical Standard"
      },
      {
        "postName": "Junior Account Assistant cum Typist",
        "department": "Accounts Department",
        "classification": "Level 5 (Graduate Post)",
        "payScale": "₹29,200 + Allowances",
        "vacancy": "1,500",
        "eligibility": "Degree in any discipline with English 30 wpm or Hindi 25 wpm typing"
      }
    ],
    "salaryStructure": {
      "payLevel": "Pay Level 6 (Station Master)",
      "basicPay": "₹35,400 per month",
      "daPercent": "50% (₹17,700)",
      "hraPercent": "27% (₹9,558)",
      "grossMonthly": "₹68,450 per month (plus Night Duty & Running Allowance)",
      "inHandMonthly": "₹58,500 – ₹62,000 per month",
      "benefits": [
        "Free Railway Privilege Passes and Privilege Ticket Orders (PTOs)",
        "Running Allowance for Goods Guard & Train Managers based on mileage",
        "Railway Central Hospital medical coverage",
        "Contributory Pension Scheme (NPS)"
      ]
    },
    "selectionProcess": [
      {
        "stageNumber": "CBT 1",
        "stageName": "First Stage Computer Based Test",
        "description": "Screening test of 100 questions (40 General Awareness, 30 Mathematics, 30 General Intelligence).",
        "qualifyingNature": "Shortlists candidates for CBT-2 at a 1:15 vacancy ratio."
      },
      {
        "stageNumber": "CBT 2",
        "stageName": "Second Stage Computer Based Test",
        "description": "120 questions in 90 minutes. Marks scored determine merit ranking.",
        "qualifyingNature": "Final merit score."
      },
      {
        "stageNumber": "CBAT / Typing",
        "stageName": "Computer Aptitude Test or Typing Skill",
        "description": "Aptitude test for Station Masters (min T-score 42) or typing speed test for Clerks.",
        "qualifyingNature": "Qualifying requirement."
      }
    ],
    "whoShouldApply": [
      "Candidates holding 12th Pass (10+2) with 50% marks for Undergraduate posts (Junior Clerk, Accounts Clerk, Trains Clerk) OR a Bachelor Degree for Graduate posts (Station Master, Goods Train Manager, Senior Clerk).",
      "Aspirants aged between 18 and 33/36 years (factoring in the special 3-year age relaxation granted by the Ministry of Railways).",
      "Candidates aiming for prestigious non-technical railway operations with 7th CPC Level 2 to Level 6 pay scales (Basic ₹19,900 to ₹35,400) and railway travel privilege passes.",
      "Aspirants with strong aptitude across General Awareness, Mathematics, and General Intelligence & Reasoning."
    ],
    "whoShouldSkip": [
      "Candidates failing the A-2 Medical Standard (Station Master and Goods Guard require 6/9 distance vision without glasses and normal color vision; LASIK surgery is disqualified).",
      "Candidates planning to register for multiple RRB zones simultaneously (applicants may choose only ONE Railway Recruitment Board zone across all CEN posts).",
      "Candidates seeking Station Master posts who cannot achieve the mandatory T-score of 42 in each test battery of the Computer Based Aptitude Test (CBAT).",
      "Candidates awaiting 12th or graduation results whose final certificates are not issued before the application cutoff."
    ],
    "commonRejectionMistakes": [
      "Applying across multiple RRB regional portals: Submitting more than one application leads to computerized duplicate detection, permanent debarment, and forfeiture of fees.",
      "Selecting incorrect post-preference priorities: Post preference is irreversible post submission and dictates cadre allotment regardless of high merit score.",
      "Uploading photographs with dark sunglasses, hats, or improper background: Photos must adhere to strict white-background guidelines without specular glare.",
      "Neglecting the psycho CBAT battery: Over 40% of shortlisted Station Master candidates fail CBAT due to lack of mock practice on the RDSO aptitude format."
    ],
    "documentsNeeded": [
      "10th Matriculation Certificate for Name, Father’s Name, and Date of Birth validation.",
      "12th Higher Secondary Mark Sheet (for Undergraduate posts) or Graduation Degree Certificate (for Graduate posts).",
      "Aadhaar Card for biometric authentication on the rrbapply.gov.in portal.",
      "Recent color passport photograph on plain white background (30 KB to 70 KB).",
      "Scanned signature in running handwriting with black/blue ink (30 KB to 70 KB).",
      "Community Certificate (SC/ST/OBC-NCL/EWS) in prescribed Central Railway Annexure format.",
      "Valid Savings Bank Account details for processing the ₹400 / ₹250 CBT-1 examination fee refund."
    ],
    "salaryArithmetic": {
      "basicPay": 35400,
      "daRate": 0.5,
      "daAmount": 17700,
      "hraRate": 0.27,
      "hraAmount": 9558,
      "transportAllowance": 3600,
      "grossMonthly": 66258,
      "npsDeduction": 5310,
      "otherDeductions": 650,
      "totalDeductions": 5960,
      "netInHandMonthly": 60298,
      "inputsDated": "01 October 2026 (7th CPC Level 6 Railway Pay Matrix)",
      "isEstimate": false,
      "notes": "Calculated for Station Master (Level 6) in Class-X cities. Goods Train Managers receive additional running mileage allowances averaging ₹12,000 to ₹18,000 monthly."
    },
    "howToApplySteps": [
      "Navigate to the official unified railway recruitment portal at https://www.rrbapply.gov.in.",
      "Create your RRB account using Aadhaar verification, valid email address, and mobile number.",
      "Select only ONE RRB zone (e.g. RRB Allahabad, RRB Mumbai, RRB Chandigarh, RRB Kolkata); multiple zone applications lead to automatic cancellation.",
      "Fill in post preferences in order of personal priority (Station Master, Goods Guard, Senior Clerk, Junior Accounts Assistant).",
      "Enter 10th, 12th, and graduation marks accurately matching original mark sheets.",
      "Upload passport photograph (30-70 KB) and signature (30-70 KB) meeting official technical specifications.",
      "Provide accurate Bank Account details for the ₹400 examination fee refund post CBT-1 and submit payment."
    ],
    "examPattern": [
      {
        "subject": "CBT-1 Screening: General Awareness (40 Qs / 40 Marks)",
        "questions": 40,
        "marks": 40,
        "time": "Combined 90 Minutes",
        "negativeMarking": "0.33 Negative Marks (1/3rd penalty)"
      },
      {
        "subject": "CBT-1 Screening: Mathematics (30 Qs / 30 Marks)",
        "questions": 30,
        "marks": 30,
        "time": "Combined 90 Minutes",
        "negativeMarking": "0.33 Negative Marks (1/3rd penalty)"
      },
      {
        "subject": "CBT-1 Screening: General Intelligence & Reasoning (30 Qs / 30 Marks)",
        "questions": 30,
        "marks": 30,
        "time": "Combined 90 Minutes",
        "negativeMarking": "0.33 Negative Marks (1/3rd penalty)"
      },
      {
        "subject": "CBT-2 Main Examination (120 Qs / 120 Marks)",
        "questions": 120,
        "marks": 120,
        "time": "90 Minutes (50 GA + 35 Math + 35 Reasoning)",
        "negativeMarking": "0.33 Negative Marks (1/3rd penalty)"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "Mathematics (CBT-1 & CBT-2)",
        "weightage": "30 Marks (CBT-1) / 35 Marks (CBT-2)",
        "topics": [
          "Number System, Decimals, Fractions, LCM and HCF, Ratio and Proportions, Percentages",
          "Mensuration, Time and Work, Time and Distance, Simple and Compound Interest, Profit and Loss",
          "Elementary Algebra, Geometry and Trigonometry, Elementary Statistics (Mean, Median, Mode)"
        ]
      },
      {
        "subject": "General Intelligence and Reasoning",
        "weightage": "30 Marks (CBT-1) / 35 Marks (CBT-2)",
        "topics": [
          "Analogies, Completion of Number and Alphabetical Series, Coding and Decoding, Mathematical Operations",
          "Relationships, Syllogism, Jumbling, Venn Diagrams, Data Interpretation and Sufficiency",
          "Conclusions and Decision Making, Similarities and Differences, Analytical Reasoning, Direction Sense"
        ]
      },
      {
        "subject": "General Awareness",
        "weightage": "40 Marks (CBT-1) / 50 Marks (CBT-2)",
        "topics": [
          "Current Events of National and International Importance, Games and Sports, Art and Culture of India",
          "Indian Literature, Monuments and Places of India, General Science and Life Science (up to 10th CBSE)",
          "History of India and Freedom Struggle, Physical, Social and Economic Geography of India and World",
          "Indian Polity and Governance - Constitution and Political System, General Scientific and Technological Developments"
        ]
      }
    ],
    "cutOffTrends": [
      {
        "year": "2022 CBT-1 Normalized (RRB Allahabad Level 6)",
        "totalMarks": 100,
        "general": 77.25,
        "obc": 72.1,
        "ews": 71.5,
        "sc": 65.8,
        "st": 56.4
      },
      {
        "year": "2022 CBT-1 Normalized (RRB Mumbai Level 6)",
        "totalMarks": 100,
        "general": 72.8,
        "obc": 67.4,
        "ews": 66.2,
        "sc": 61.1,
        "st": 52.3
      },
      {
        "year": "2022 CBT-1 Normalized (RRB Chandigarh Level 6)",
        "totalMarks": 100,
        "general": 74.6,
        "obc": 69.2,
        "ews": 68.9,
        "sc": 63.4,
        "st": 54.8
      }
    ],
    "faqs": [
      {
        "question": "Can I apply to more than one RRB zone for CEN 05/2026?",
        "answer": "No. Candidates can apply to only ONE RRB zone across all posts. Submitting applications to multiple zones will lead to computerized duplicate rejection and lifetime debarment."
      },
      {
        "question": "Is the CBT-1 score counted towards final merit in RRB NTPC?",
        "answer": "No. CBT-1 is purely a screening test to shortlist candidates for CBT-2 at a ratio of 1:15 times the notified vacancies. Final merit is determined strictly by CBT-2 scores and CBAT/Typing performance."
      },
      {
        "question": "What medical standard is required for Station Master posts?",
        "answer": "Station Master requires A-2 medical classification: 6/9, 6/9 distance vision without glasses, normal color vision, and absence of night blindness. Candidates who have undergone LASIK surgery are disqualified."
      },
      {
        "question": "When is the examination fee refund credited?",
        "answer": "After attending the CBT-1 examination, the refund of ₹400 (for UR/OBC) or ₹250 (for SC/ST/Women) is credited back to the bank account entered during online registration."
      }
    ],
    "officialLinks": [
      {
        "title": "RRB Official Apply Portal",
        "label": "Apply Online (rrbapply.gov.in)",
        "url": "https://rrbapply.gov.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Official CEN Notification",
        "label": "Download RRB CEN Notification",
        "url": "https://indianrailways.gov.in",
        "linkType": "pdf"
      },
      {
        "title": "Negative Marking Tool",
        "label": "Calculate Railway 1/3rd Score",
        "url": "/tools/marking",
        "linkType": "tool"
      },
      {
        "title": "Salary Calculator",
        "label": "View 7th CPC Level 6 Pay Breakdown",
        "url": "/tools/salary",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Focus heavily on NCERT Class 9 and 10 General Science fundamentals (Physics numericals, Chemical reactions, and Human anatomy).",
      "Practice daily non-verbal reasoning questions including mirror images, paper folding, and embedded figure recognition.",
      "Familiarize yourself with TCS exam interface shortcuts to rapidly navigate between answered, unread, and flagged questions.",
      "Under the 1/3rd negative deduction rule, skip questions where you cannot eliminate at least two plausible distractor options.",
      "Build endurance for Computer Based Tests through uninterrupted 90-minute full mock exam simulations."
    ]
  },
  {
    "id": "delhi-police-si-2026",
    "slug": "ssc-delhi-police-capf-si-2026",
    "category": "jobs",
    "title": "SSC Delhi Police & CAPFs SI 2026 Notice",
    "organization": "SSC & Ministry of Home Affairs",
    "examName": "Delhi Police & Central Armed Police Forces SI",
    "postCount": "4,187",
    "publishDate": "12 Sep 2026",
    "lastDate": "15 Oct 2026",
    "examDate": "Nov 2026",
    "qualification": "Graduate Degree with valid Driving License (for Male DP SI)",
    "qualificationTier": "graduate",
    "sector": "police",
    "minAge": 20,
    "maxAge": 25,
    "ageLimit": "20 to 25 Years (Relaxation as per central rules)",
    "fees": "₹100 (Exempted for Women & Reserved Categories)",
    "sourceNotice": {
      "title": "Staff Selection Commission (SSC CPO Notice)",
      "url": "https://ssc.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "26 Sep 2026, 11:20 IST",
    "readTime": "6 min read",
    "summary": "Staff Selection Commission announces recruitment for Executive Sub-Inspectors in Delhi Police, BSF, CISF, CRPF, ITBP, and SSB with Level-6 pay scale (₹35,400 to ₹1,12,400).",
    "linkText": "View Physical Standards & Syllabus",
    "calculatorToolType": "height",
    "calculatorPresetId": "delhi-police-si",
    "importantDates": [
      {
        "event": "Notification Date",
        "date": "12 September 2026"
      },
      {
        "event": "Application Last Date",
        "date": "15 October 2026"
      },
      {
        "event": "Paper-1 CBT Exam Date",
        "date": "November 2026"
      },
      {
        "event": "Physical Standard (PST) & PET Test",
        "date": "January 2027"
      }
    ],
    "whoShouldApply": [
      "Graduates in any discipline from a recognized University seeking Sub-Inspector appointments in Delhi Police Executive or Central Armed Police Forces (BSF, CISF, CRPF, ITBP, SSB).",
      "Male candidates possessing a valid Light Motor Vehicle (LMV) Driving License (mandatory on the date of Physical Endurance and Measurement Tests for Delhi Police SI).",
      "Candidates aged 20 to 25 years as on the crucial cutoff (eligible for central relaxations: up to 28 for OBC, 30 for SC/ST).",
      "Aspirants meeting physical standards: Minimum height 170 cm (80–85 cm chest) for General males, and 157 cm for General females."
    ],
    "whoShouldSkip": [
      "Male candidates without a valid LMV Driving License who solely wish to join Delhi Police (such candidates are considered only for CAPF posts).",
      "Candidates falling below the prescribed Physical Standards (170 cm male / 157 cm female); no height relaxation is granted for plain areas.",
      "Candidates exceeding 25 years of age without eligible category reservations.",
      "Candidates with permanent visible tattoos on saluting arm, inner aspect of forearm, or knuckle areas violating MHA uniform guidelines."
    ],
    "commonRejectionMistakes": [
      "Lack of valid LMV Driving License for male candidates on PET day: Driving learners license is not accepted; candidates must hold a permanent LMV license.",
      "Failing the high jump / long jump in 3 chances: PET disqualifications are final on the spot and cannot be appealed.",
      "Spectacles and vision non-conformance: CAPFs require 6/6 and 6/9 eye vision without glasses; laser eye correction (LASIK) within 6 months is rejected.",
      "Uploading live photo with spectacles on SSC OTR portal."
    ],
    "documentsNeeded": [
      "Graduation Degree Certificate / Provisional Passing Mark Sheet from recognized University.",
      "Valid LMV (Car & Motorcycle) Driving License (mandatory for male candidates opting for Delhi Police).",
      "10th Matriculation Certificate for Date of Birth & Parents’ name proof.",
      "Live Webcam Photograph on plain white background without caps/glare.",
      "Scanned signature in running handwriting (10 KB to 20 KB).",
      "Caste Certificate (OBC-NCL / EWS / SC / ST) in Central Government Annexure format."
    ],
    "salaryArithmetic": {
      "basicPay": 35400,
      "daRate": 0.5,
      "daAmount": 17700,
      "hraRate": 0.27,
      "hraAmount": 9558,
      "transportAllowance": 3600,
      "grossMonthly": 66258,
      "npsDeduction": 5310,
      "otherDeductions": 650,
      "totalDeductions": 5960,
      "netInHandMonthly": 60298,
      "inputsDated": "01 October 2026 (7th CPC Level 6 Police Pay Matrix)",
      "isEstimate": false,
      "notes": "Calculated for Delhi Police Sub-Inspector in Delhi (Class-X). Personnel in Delhi Police receive 13 months salary per year (extra 1 month pay in lieu of unavailed holidays)."
    },
    "howToApplySteps": [
      "Open the Staff Selection Commission one-time registration portal at https://ssc.gov.in.",
      "Fill or verify your SSC OTR credentials using Aadhaar Card or government identity proof.",
      "Navigate to \"Active Applications -> Sub-Inspector in Delhi Police and CAPFs Examination 2026\".",
      "Capture a live webcam photograph against a plain, well-lit white background (no caps, spectacles, or facial coverings).",
      "Upload a clear scanned signature in cursive running handwriting (10 KB to 20 KB).",
      "Indicate your post-preference order among Delhi Police (Executive), BSF, CISF, CRPF, ITBP, and SSB.",
      "Pay ₹100 online fee (exempt for Women, SC, ST, ESM) and download the final PDF confirmation page."
    ],
    "examPattern": [
      {
        "subject": "Paper 1: General Intelligence, GK, Quant, English (50 Qs each)",
        "questions": 200,
        "marks": 200,
        "time": "2 Hours (120 Minutes)",
        "negativeMarking": "0.25 Negative Marks per wrong answer"
      },
      {
        "subject": "Physical Endurance Test (PET): 100m, 1.6km / 800m run, Long Jump, High Jump",
        "questions": 1,
        "marks": 100,
        "time": "Qualifying Only (Must clear on-spot benchmarks)",
        "negativeMarking": "No marks; failure results in immediate disqualification"
      },
      {
        "subject": "Paper 2: English Language & Comprehension",
        "questions": 200,
        "marks": 200,
        "time": "2 Hours (120 Minutes)",
        "negativeMarking": "0.25 Negative Marks per wrong answer"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "General Intelligence & Reasoning (Paper 1)",
        "weightage": "50 Marks",
        "topics": [
          "Analogies, Similarities & Differences, Spatial Visualization, Spatial Orientation, Problem Solving",
          "Analysis, Judgment, Decision Making, Visual Memory, Discriminating Observation, Relationship Concepts",
          "Arithmetical Reasoning, Figural Classification, Arithmetic Number Series, Non-verbal Series, Coding and Decoding"
        ]
      },
      {
        "subject": "Quantitative Aptitude (Paper 1)",
        "weightage": "50 Marks",
        "topics": [
          "Computation of Whole Numbers, Decimals, Fractions, Percentage, Ratio and Proportion, Square Roots, Averages",
          "Interest (Simple & Compound), Profit and Loss, Discount, Partnership Business, Mixture and Alligation, Time & Distance",
          "Basic Algebraic Identities, Elementary Surds, Graphs of Linear Equations, Triangles, Circles, Mensuration, Trigonometry"
        ]
      },
      {
        "subject": "English Language & Comprehension (Paper 1 & Paper 2)",
        "weightage": "50 Marks (Paper 1) / 200 Marks (Paper 2)",
        "topics": [
          "Error Recognition, Fill in the Blanks, Vocabulary, Spellings, English Grammar, Sentence Structure",
          "Synonyms, Antonyms, Sentence Completion, Idiomatic Phrases, Active/Passive Voice, Direct/Indirect Speech, Comprehension Passages"
        ]
      }
    ],
    "cutOffTrends": [
      {
        "year": "2023 Paper-1 (Male UR Delhi Police SI)",
        "totalMarks": 200,
        "general": 138.99,
        "obc": 131.9,
        "ews": 133.5,
        "sc": 110.85,
        "st": 109.5
      },
      {
        "year": "2023 Paper-1 (Female UR Delhi Police SI)",
        "totalMarks": 200,
        "general": 143.83,
        "obc": 137.1,
        "ews": 138.4,
        "sc": 115.2,
        "st": 110
      },
      {
        "year": "2022 Paper-1 (Male UR Delhi Police SI)",
        "totalMarks": 200,
        "general": 115.04,
        "obc": 102.96,
        "ews": 103.97,
        "sc": 79.31,
        "st": 78
      }
    ],
    "faqs": [
      {
        "question": "Is a driving license mandatory for all posts in SSC CPO / Delhi Police?",
        "answer": "No. A valid Light Motor Vehicle (LMV) driving license (motorcycle and car) is mandatory ONLY for male candidates opting for Sub-Inspector in Delhi Police, to be produced on the date of PET/PST. For CAPF posts (BSF, CISF, CRPF, ITBP, SSB), a driving license is not required."
      },
      {
        "question": "Do Delhi Police Sub-Inspectors receive 13 months salary?",
        "answer": "Yes. Delhi Police executive personnel receive 13 months of salary per calendar year (one extra month basic pay + DA) as compensation for unavailed gazetted holidays and round-the-clock emergency duties."
      },
      {
        "question": "Can female candidates apply for Sub-Inspector in CAPFs and Delhi Police?",
        "answer": "Yes. Both male and female candidates are eligible for Sub-Inspector posts in Delhi Police Executive and all Central Armed Police Forces (BSF, CISF, CRPF, ITBP, SSB)."
      },
      {
        "question": "What is the starting in-hand salary of an SSC CPO Sub-Inspector?",
        "answer": "Under 7th CPC Level 6, the starting basic pay is ₹35,400. In Delhi (Class-X city), gross monthly pay is ₹66,258, resulting in approx ₹60,298 net take-home salary after NPS deductions, plus uniform and ration allowances."
      }
    ],
    "officialLinks": [
      {
        "title": "SSC Official Portal",
        "label": "Apply on ssc.gov.in",
        "url": "https://ssc.gov.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Physical Standards Checker",
        "label": "Check Delhi Police Height (170cm)",
        "url": "/tools/height",
        "linkType": "tool"
      },
      {
        "title": "Salary Calculator",
        "label": "View Level 6 In-Hand Salary Breakdown",
        "url": "/tools/salary",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Master General Hindi / Regional Language: language papers carry high scoring predictability; aim for 90%+ accuracy.",
      "Practice OMR sheet bubbling drills: offline testing requires bubble shading speed to avoid losing 15-20 minutes in marking.",
      "Do not take risks under the negative penalty: skip doubtful questions to protect your positive score tally.",
      "Begin physical fitness training simultaneously: practice endurance running daily to comfortably clear physical efficiency standards.",
      "Solve at least 20 official previous year question papers to recognize recurring syllabus question structures."
    ]
  },
  {
    "id": "ssc-gd-constable-2026",
    "slug": "ssc-gd-constable-2026-mega-recruitment",
    "category": "jobs",
    "title": "SSC GD Constable 2026 Recruitment Notice",
    "organization": "Staff Selection Commission (SSC)",
    "examName": "Constable (GD) in CAPFs, SSF and Rifleman (GD) in Assam Rifles",
    "postCount": "39,481",
    "publishDate": "05 Sep 2026",
    "lastDate": "14 Oct 2026",
    "examDate": "Jan – Feb 2027",
    "qualification": "Matriculation (10th Class Pass)",
    "qualificationTier": "10th",
    "sector": "ssc",
    "minAge": 18,
    "maxAge": 23,
    "ageLimit": "18 to 23 Years as on 01-01-2026",
    "fees": "₹100 (Exempted for Women/SC/ST)",
    "sourceNotice": {
      "title": "Staff Selection Commission (SSC GD Notice)",
      "url": "https://ssc.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "26 Sep 2026, 09:45 IST",
    "readTime": "6 min read",
    "summary": "Massive uniformed recruitment for General Duty constables across BSF (15,654), CISF (13,632), CRPF (9,410), ITBP (3,120), and SSB (1,850) in Pay Level-3.",
    "linkText": "Check Height & Physical Running Criteria",
    "calculatorToolType": "height",
    "calculatorPresetId": "ssc-gd-constable",
    "importantDates": [
      {
        "event": "Notification Release Date",
        "date": "05 September 2026"
      },
      {
        "event": "Last Date to Apply Online",
        "date": "14 October 2026"
      },
      {
        "event": "Computer Based Exam (CBT)",
        "date": "January – February 2027"
      }
    ],
    "whoShouldApply": [
      "Candidates who have completed 10th Class Matriculation from a recognized Central or State Board.",
      "Aspirants aged 18 to 23 years as on 01-01-2026 (eligible for statutory extensions: up to 26 for OBC, 28 for SC/ST).",
      "Male candidates meeting 170 cm height (162.5 cm for ST) and female candidates meeting 157 cm height (150 cm for ST).",
      "Aspirants capable of clearing the 5 km running endurance test in 24 minutes (1.6 km in 8.5 mins for females) seeking soldier career in paramilitary forces."
    ],
    "whoShouldSkip": [
      "Candidates below 170 cm height (male) or 157 cm (female) who do not possess domicile in designated hill/tribal districts.",
      "Candidates exceeding 23 years of age as on 01-01-2026 without eligible category relaxations.",
      "Candidates lacking a valid State/UT Domicile Certificate (vacancies are strictly state-wise and border/militancy area-wise; applying from another state leads to immediate cancellation).",
      "Candidates with active tattoos on the saluting hand/forearm violating MHA armed forces standards."
    ],
    "commonRejectionMistakes": [
      "Selecting the wrong State / District Domicile: SSC GD vacancies are apportioned based on candidate domicile. Submitting false domicile leads to cancellation and debarment.",
      "Failing the physical height/chest measurement during PST: Exactly 170 cm is enforced digitally with sensor-based stadiometers.",
      "Submitting live webcam photo with background disturbances or spectacles.",
      "Mismatches between 10th Board roll number and OTR entry."
    ],
    "documentsNeeded": [
      "10th Matriculation Mark Sheet & Passing Certificate (verifying Date of Birth).",
      "Permanent Resident / Domicile Certificate issued by designated Revenue Authority (mandatory for state quota).",
      "Live photo captured on SSC portal following official camera guidelines.",
      "Clear scanned signature in running handwriting (10 KB to 20 KB).",
      "Category Certificate (SC/ST/OBC-NCL/EWS) in Central Government Annexure format.",
      "Valid Government Photo Identity Card (Aadhaar, Voter ID, PAN)."
    ],
    "salaryArithmetic": {
      "basicPay": 21700,
      "daRate": 0.5,
      "daAmount": 10850,
      "hraRate": 0.18,
      "hraAmount": 3906,
      "transportAllowance": 1800,
      "grossMonthly": 38256,
      "npsDeduction": 3255,
      "otherDeductions": 450,
      "totalDeductions": 3705,
      "netInHandMonthly": 34551,
      "inputsDated": "01 October 2026 (7th CPC Level 3 Paramilitary Pay Matrix)",
      "isEstimate": false,
      "notes": "Calculated for General Duty Constable in Level 3. Personnel deployed in high-risk border outposts receive Additional Hardship Allowance ranging from ₹6,000 to ₹17,300/month plus monthly Ration Money Allowance."
    },
    "howToApplySteps": [
      "Visit the official Staff Selection Commission website at https://ssc.gov.in.",
      "Complete or login to your SSC One-Time Registration (OTR) profile using your registered credentials.",
      "Select \"Apply -> Constable (GD) in Central Armed Police Forces Examination 2026\".",
      "Indicate your domicile State, UT, and District carefully (District categorization as General, Border, or Militancy-affected directly governs cut-off benchmarks).",
      "Select your force preference priority order among BSF, CISF, CRPF, ITBP, SSB, SSF, and Assam Rifles.",
      "Capture a live webcam photograph in full accordance with illumination and plain background rules, and upload your scanned signature (10-20 KB).",
      "Pay ₹100 online application fee (exempt for Women, SC, and ST candidates) and download the completed application PDF."
    ],
    "examPattern": [
      {
        "subject": "Part A: General Intelligence and Reasoning",
        "questions": 20,
        "marks": 40,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.25 Negative Marks per incorrect answer"
      },
      {
        "subject": "Part B: General Knowledge and General Awareness",
        "questions": 20,
        "marks": 40,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.25 Negative Marks per incorrect answer"
      },
      {
        "subject": "Part C: Elementary Mathematics",
        "questions": 20,
        "marks": 40,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.25 Negative Marks per incorrect answer"
      },
      {
        "subject": "Part D: English or Hindi (Candidate Choice)",
        "questions": 20,
        "marks": 40,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.25 Negative Marks per incorrect answer"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "General Intelligence and Reasoning (Part A)",
        "weightage": "40 Marks",
        "topics": [
          "Analogies, Similarities and Differences, Spatial Visualization, Spatial Orientation, Visual Memory",
          "Discrimination, Observation, Relationship Concepts, Arithmetical Reasoning and Figural Classification",
          "Arithmetic Number Series, Non-verbal Series, Coding and Decoding"
        ]
      },
      {
        "subject": "General Knowledge and General Awareness (Part B)",
        "weightage": "40 Marks",
        "topics": [
          "Current Affairs (National and International), India and Neighboring Countries, Sports, History, Culture",
          "Geography, Economic Scene, General Polity, Indian Constitution, Scientific Research"
        ]
      },
      {
        "subject": "Elementary Mathematics (Part C)",
        "weightage": "40 Marks",
        "topics": [
          "Number Systems, Computation of Whole Numbers, Decimals and Fractions, Relationship between Numbers",
          "Percentages, Ratio and Proportion, Averages, Interest (Simple & Compound), Profit and Loss, Discount",
          "Mensuration, Time and Distance, Ratio and Time, Time and Work"
        ]
      },
      {
        "subject": "English / Hindi Language (Part D)",
        "weightage": "40 Marks",
        "topics": [
          "Basic Comprehension, Error Spotting, Fill in the Blanks, Synonyms & Antonyms, Idioms & Phrases, One Word Substitution"
        ]
      }
    ],
    "cutOffTrends": [
      {
        "year": "2024 Final Normalized (UP General Area Male UR)",
        "totalMarks": 160,
        "general": 134.42,
        "obc": 132.8,
        "ews": 130.65,
        "sc": 121.2,
        "st": 111.4
      },
      {
        "year": "2024 Final Normalized (Bihar General Area Male UR)",
        "totalMarks": 160,
        "general": 126.85,
        "obc": 124.5,
        "ews": 122.3,
        "sc": 106.4,
        "st": 114.2
      },
      {
        "year": "2024 Final Normalized (Rajasthan General Area Male UR)",
        "totalMarks": 160,
        "general": 132.1,
        "obc": 131.4,
        "ews": 129.8,
        "sc": 118.6,
        "st": 119.5
      }
    ],
    "faqs": [
      {
        "question": "Can I take the SSC GD examination in my mother tongue?",
        "answer": "Yes. In addition to Hindi and English, the SSC GD Computer Based Test is administered in 13 regional languages: Assamese, Bengali, Gujarati, Kannada, Konkani, Malayalam, Manipuri, Marathi, Odia, Punjabi, Tamil, Telugu, and Urdu."
      },
      {
        "question": "Can I change my domicile state during document verification?",
        "answer": "No. Vacancies are strictly allotted according to state and border/militancy district domicile quotas. Producing a domicile certificate differing from your application will lead to outright cancellation and potential debarment."
      },
      {
        "question": "What is the running requirement in the Physical Efficiency Test (PET)?",
        "answer": "Male candidates must complete 5 kilometers in 24 minutes. Female candidates must complete 1.6 kilometers in 8 minutes and 30 seconds."
      },
      {
        "question": "What is the starting take-home salary of an SSC GD Constable?",
        "answer": "Under 7th CPC Level 3, basic pay is ₹21,700. With 50% DA, HRA, Transport Allowance, and Ration Money Allowance, gross monthly earnings reach approx ₹38,256, yielding around ₹34,551 in-hand take-home."
      }
    ],
    "officialLinks": [
      {
        "title": "SSC Apply Portal",
        "label": "Apply Online",
        "url": "https://ssc.gov.in",
        "isPrimary": true,
        "linkType": "apply"
      },
      {
        "title": "Physical Standards Tool",
        "label": "Check 170cm Male / 157cm Female Standards",
        "url": "/tools/height",
        "linkType": "tool"
      },
      {
        "title": "Salary Calculator",
        "label": "Calculate Level 3 Take-Home Pay",
        "url": "/tools/salary",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Complete at least 25 full-length Tier-1 CBT mock tests under strict 60-minute countdown constraints to develop cognitive stamina.",
      "Maintain an error log detailing calculation slips in Quantitative Aptitude and misread grammar rules in General English.",
      "Focus on high-yield General Awareness topics including 7th Schedule constitutional articles, 5-Year Plans, and current economic budget highlights.",
      "Avoid blind guessing: under a 0.50 negative penalty, 2 incorrect guesses erase the net credit earned by 1 correct answer.",
      "Practice daily 15-minute mental arithmetic drills (tables up to 30, squares up to 50, cubes up to 25) to save scratchpad time."
    ]
  },
  {
    "id": "admit-ssc-cgl-tier1",
    "slug": "ssc-cgl-2026-tier-1-admit-card-download",
    "category": "admit-card",
    "title": "SSC CGL 2026 Tier-1 Hall Ticket Status",
    "organization": "Staff Selection Commission (SSC)",
    "examName": "CGL Tier-1 Computer Based Test",
    "publishDate": "26 Sep 2026",
    "examDate": "09 Oct to 26 Oct 2026",
    "qualification": "Tier-1 Registered Candidates",
    "sourceNotice": {
      "title": "Staff Selection Commission Regional Portals",
      "url": "https://ssc.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "11 Oct 2026, 18:00 IST",
    "readTime": "4 min read",
    "summary": "Candidates can download their admission certificate using Registration Number and Date of Birth. Exam shift timings and exam center address verified.",
    "linkText": "Download Tier-1 Admit Card (All Regions)",
    "importantDates": [
      {
        "event": "Application Status Live",
        "date": "20 September 2026"
      },
      {
        "event": "City Intimation Slip Live",
        "date": "26 September 2026"
      },
      {
        "event": "Admit Card Download (4 Days Prior)",
        "date": "05 October 2026"
      },
      {
        "event": "Tier-1 CBT Exam Dates",
        "date": "09 October to 26 October 2026"
      }
    ],
    "whoShouldApply": [
      "Candidates registered for SSC Combined Graduate Level (CGL) 2026 Tier-1 examination checking regional portal application status and shift timings.",
      "Aspirants allocated to Southern, Eastern, Northern, Central, Western, MPR, KKR, NWR, or NER regional zones."
    ],
    "whoShouldSkip": [
      "Candidates whose applications were rejected during provisional scrutiny due to webcam photo or fee payment errors."
    ],
    "commonRejectionMistakes": [
      "Failing to carry original Government Photo ID containing the exact Date of Birth as printed on the admission certificate.",
      "Reaching the examination center after gate closure time (entry strictly barred even 1 minute past scheduled closure).",
      "Bringing prohibited electronic items, smartwatches, or metallic ornaments into the exam hall."
    ],
    "documentsNeeded": [
      "Printed SSC CGL Tier-1 Admission Certificate / Admit Card",
      "Original Government Photo Identity Card (Aadhaar, Voter ID, Driving Licence, Passport)",
      "Two recent passport-size colour photographs for verification counter",
      "Transparent ballpoint pen and transparent water bottle"
    ],
    "howToApplySteps": [
      "Visit the official Staff Selection Commission website at https://ssc.gov.in or your respective Regional Portal.",
      "Click on the \"Admit Card\" navigation tab on the top menu and select your regional jurisdictional link.",
      "Click on \"STATUS / DOWNLOAD ADMIT CARD FOR COMBINED GRADUATE LEVEL EXAMINATION (TIER-I) 2026\".",
      "Enter your Registration ID and Date of Birth (DD/MM/YYYY) or Roll Number and Date of Birth.",
      "If you have misplaced your Registration ID, use the alternate search option with Candidate Name, Father Name, and Date of Birth.",
      "Check your allocated exam center address, shift timing, and reporting instructions, and print at least 2 clear copies on clean A4 paper."
    ],
    "admitCardDetails": {
      "officialNoticeSummary": "Staff Selection Commission has activated the regional portal links for downloading the Admission Certificate (e-Admit Card) for Combined Graduate Level Examination (Tier-1) 2026. The examination is conducted in multiple daily computer-based test shifts across nationwide designated centers. Gates close strictly 30 minutes before shift commencement.",
      "downloadSteps": [
        "Visit https://ssc.gov.in and click \"Admit Card\" on the top header navigation.",
        "Choose your regional network (NR Delhi, CR Prayagraj, ER Kolkata, WR Mumbai, SR Chennai, KKR Bengaluru, MPR Raipur, NWR Chandigarh, NER Guwahati).",
        "Click on \"Download e-Admission Certificate for CGL Tier-1 2026\".",
        "Enter Registration Number and Date of Birth or Candidate Name and Father Name.",
        "Review exam date, allotted venue address, shift time, and gate closure hour before printing."
      ],
      "detailsToCheck": [
        "Candidate Full Name and Roll Number matching original 10th certificate",
        "Examination Date and Shift Timings (Shift 1: 09:00 AM, Shift 2: 12:30 PM, Shift 3: 04:00 PM)",
        "Exact Reporting Time and strict Gate Closure Time (no entry 1 minute past closure)",
        "Examination Venue Name, Center Code, and Complete Street Address with Landmark",
        "Candidate Photograph, Signature, and Category (UR/OBC/EWS/SC/ST/PwBD)"
      ],
      "itemsToCarry": [
        "Printed copy of SSC CGL Tier-1 Admission Certificate hardcopy",
        "Original valid Government Photo ID with complete Date of Birth (Aadhaar, Voter ID, Driving License, Passport, or PAN)",
        "Two recent identical passport-size colour photographs matching application upload",
        "Original 10th Matriculation Marksheet if Government Photo ID lacks exact DD/MM/YYYY",
        "Simple transparent ballpoint pen with blue or black ink"
      ],
      "prohibitedItems": [
        "Mobile phones, smartwatches, digital bands, Bluetooth earphones, electronic calculators",
        "Wallets, handbags, belts with large metallic buckles, metallic jewellery, hairpins with metal clasp",
        "Notebooks, textbooks, rough paper sheets, geometry boxes, pencil pouches"
      ],
      "ifDownloadFailsAdvice": "If the regional website is unresponsive due to high traffic, clear browser cookies or switch to private browsing mode. If your application status was marked \"Accepted\" but the admit card is not available 4 days prior to exam, email your SSC Regional Director with your application registration number, fee transaction reference, and identity proof.",
      "officialHelpdesk": {
        "phone": "011-24361359 (SSC HQ) / Regional Helplines",
        "email": "enquiry-ssc@nic.in",
        "portalUrl": "https://ssc.gov.in"
      }
    },
    "examPattern": [
      {
        "subject": "General Intelligence and Reasoning",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Marks per incorrect answer"
      },
      {
        "subject": "General Awareness (Current Affairs, Science, Polity)",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Marks per incorrect answer"
      },
      {
        "subject": "Quantitative Aptitude (Arithmetic & Advanced Math)",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Marks per incorrect answer"
      },
      {
        "subject": "English Comprehension",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Marks per incorrect answer"
      }
    ],
    "cutOffTrends": [
      {
        "year": "2024 Tier-1 Normalized (General Posts List-3)",
        "totalMarks": 200,
        "general": 153.48,
        "obc": 152.12,
        "ews": 148.95,
        "sc": 136.2,
        "st": 125.6
      },
      {
        "year": "2023 Tier-1 Normalized (General Posts List-3)",
        "totalMarks": 200,
        "general": 150.04,
        "obc": 145.93,
        "ews": 143.44,
        "sc": 126.68,
        "st": 118.16
      },
      {
        "year": "2022 Tier-1 Normalized (General Posts List-3)",
        "totalMarks": 200,
        "general": 114.27,
        "obc": 114.27,
        "ews": 102.35,
        "sc": 89.08,
        "st": 77.56
      }
    ],
    "faqs": [
      {
        "question": "When can candidates download their printable SSC CGL Tier-1 Admit Card?",
        "answer": "Application status is published 14 days prior to exam, city intimation is released 10 days prior, and the final printable Admission Certificate specifying the exact test lab and center address becomes downloadable exactly 4 days before your specific exam date."
      },
      {
        "question": "What happens if my Photo ID has only the year of birth printed on it?",
        "answer": "If your official photo identity card (e.g. Aadhaar or Voter ID) displays only the birth year rather than the full Date of Birth (DD/MM/YYYY), you MUST carry your original 10th Matriculation certificate or Birth Certificate as proof of date of birth; otherwise exam entry is strictly prohibited."
      },
      {
        "question": "Are Tier-1 marks added to the final merit score?",
        "answer": "No. Tier-1 is purely a qualifying examination to filter candidates for Tier-2. Final merit ranking and post allotment for all Group B and Group C posts are calculated solely on Tier-2 marks."
      },
      {
        "question": "What are the daily shift timings for SSC CGL Tier-1 examination?",
        "answer": "Shift 1: 09:00 AM to 10:00 AM (Reporting 07:45 AM, Gate Closure 08:30 AM); Shift 2: 12:30 PM to 01:30 PM (Reporting 11:15 AM, Gate Closure 12:00 PM); Shift 3: 04:00 PM to 05:00 PM (Reporting 02:45 PM, Gate Closure 03:30 PM)."
      }
    ],
    "officialLinks": [
      {
        "title": "Regional SSC Portals",
        "label": "Download Admit Card",
        "url": "https://ssc.gov.in",
        "isPrimary": true,
        "linkType": "official"
      },
      {
        "title": "CBT-Style Practice Test",
        "label": "Take CBT Practice Test with Timer",
        "url": "/mock-test/ssc-cgl-tier1",
        "linkType": "tool"
      },
      {
        "title": "Marking Score Calculator",
        "label": "Simulate -0.50 Marking Trajectory",
        "url": "/tools/marking",
        "linkType": "tool"
      },
      {
        "title": "Rank & Normalization Tool",
        "label": "Check Normalization Forecast",
        "url": "/tools/rank",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Print at least two clear copies of your e-Admit Card on clean A4 paper well in advance; do not wait until the exam morning.",
      "Locate your exact examination center on Google Maps one day prior to avoid last-minute transit delays or wrong center confusion.",
      "Carry strictly the original valid government photo ID card matching the exact name and DOB on your registration form.",
      "Adhere strictly to the gate closure schedule: entry gates close permanently 30 to 45 minutes prior to test commencement.",
      "Carry two passport photographs matching the application form for emergency verification at the facilitation counter."
    ],
    "syllabusTopics": [
      {
        "subject": "Tier-1 CBT Core Sections",
        "weightage": "200 Marks / 100 Questions",
        "topics": [
          "General Intelligence & Reasoning (50 Marks / 25 Qs): Analogies, series, syllogism, non-verbal matrices",
          "General Awareness (50 Marks / 25 Qs): Indian history, polity, geography, general science, economic survey",
          "Quantitative Aptitude (50 Marks / 25 Qs): Arithmetic, algebra, geometry, mensuration, trigonometry",
          "English Comprehension (50 Marks / 25 Qs): Grammar error spotting, idioms, synonyms, cloze passage"
        ]
      }
    ]
  },
  {
    "id": "res-ssc-cgl-cutoff",
    "slug": "ssc-cgl-2025-tier-1-official-category-cutoff-marks",
    "category": "cut-off",
    "title": "SSC CGL Tier-1 Category Cut-Off Marks",
    "organization": "Staff Selection Commission",
    "examName": "CGL Tier-1 Normalization & Cut-off List",
    "publishDate": "27 Sep 2026",
    "qualification": "Candidates Qualified for Tier-2 Evaluation",
    "sourceNotice": {
      "title": "Staff Selection Commission Results & Cut-off Write-up",
      "url": "https://ssc.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "27 Sep 2026, 20:00 IST",
    "readTime": "5 min read",
    "summary": "Staff Selection Commission has declared normalized cut-off marks for Tier-1. Over 1,24,000 aspirants qualified across List-1 (AAO), List-2 (JSO), and List-3 (General Group B/C).",
    "linkText": "Download Complete Merit List PDF",
    "cutOffs": [
      {
        "category": "UR (General / Unreserved)",
        "cutOffMarks": 153.48,
        "qualifiedCandidates": 14210
      },
      {
        "category": "OBC (Other Backward Class)",
        "cutOffMarks": 152.12,
        "qualifiedCandidates": 28540
      },
      {
        "category": "EWS (Economically Weaker Section)",
        "cutOffMarks": 148.95,
        "qualifiedCandidates": 12450
      },
      {
        "category": "SC (Scheduled Caste)",
        "cutOffMarks": 136.2,
        "qualifiedCandidates": 18920
      },
      {
        "category": "ST (Scheduled Tribe)",
        "cutOffMarks": 125.6,
        "qualifiedCandidates": 9840
      },
      {
        "category": "ESM (Ex-Servicemen)",
        "cutOffMarks": 98.4,
        "qualifiedCandidates": 4120
      }
    ],
    "importantDates": [
      {
        "event": "Tier-1 CBT Conducted",
        "date": "July 2025"
      },
      {
        "event": "Official Result Declaration",
        "date": "27 September 2026"
      },
      {
        "event": "Tier-2 Written Examination",
        "date": "November 2026"
      }
    ],
    "whoShouldApply": [
      "Candidates who scored equal to or above the category-wise normalized cut-off marks in List-1 (AAO), List-2 (JSO), or List-3 (General Posts) preparing for Tier-2 CBT.",
      "Aspirants needing to calibrate their Tier-2 preparation strategy based on category competition ratios."
    ],
    "whoShouldSkip": [
      "Candidates scoring below category cut-off marks (advised to redirect preparation toward upcoming SSC CGL 2026 and CHSL cycles)."
    ],
    "commonRejectionMistakes": [
      "Assuming Tier-1 score carries over to final selection: Tier-1 is purely qualifying; final merit for all posts is calculated strictly from Tier-2 marks.",
      "Neglecting Computer Knowledge Module (CKM): Over 15% of high-scoring candidates fail CKM qualifying benchmark and lose allotment.",
      "Ignoring daily typing practice: The Data Entry Speed Test (DEST) is conducted on the same day as Tier-2; typing errors exceeding allowable percentage lead to immediate disqualification."
    ],
    "documentsNeeded": [
      "Tier-1 Roll Number and Registration Number.",
      "Official Tier-1 Cutoff Write-up and Merit List PDF.",
      "SSC OTR credentials for downloading Tier-2 admission certificate."
    ],
    "howToApplySteps": [
      "Open the Staff Selection Commission official portal at https://ssc.gov.in.",
      "Navigate to the \"Results\" section on the top right navigation bar and click the \"CGL\" tab.",
      "Click on the link titled \"Combined Graduate Level Examination (Tier-I) – Declaration of Result & Category-Wise Cut-Off Marks\".",
      "Download the official Write-up PDF containing normalized cut-off marks and qualified candidate headcounts across Lists 1, 2, and 3.",
      "Download the separate Merit Roll Number PDF and search for your 10-digit Roll Number using Ctrl+F.",
      "Log into the SSC candidate dashboard with your Registration Number and Password to inspect subject-wise raw marks and normalized score."
    ],
    "cutOffTrends": [
      {
        "year": "2024 Tier-1 Normalized (General Posts List-3)",
        "totalMarks": 200,
        "general": 153.48,
        "obc": 152.12,
        "ews": 148.95,
        "sc": 136.2,
        "st": 125.6
      },
      {
        "year": "2023 Tier-1 Normalized (General Posts List-3)",
        "totalMarks": 200,
        "general": 150.04,
        "obc": 145.93,
        "ews": 143.44,
        "sc": 126.68,
        "st": 118.16
      },
      {
        "year": "2022 Tier-1 Normalized (General Posts List-3)",
        "totalMarks": 200,
        "general": 114.27,
        "obc": 114.27,
        "ews": 102.35,
        "sc": 89.08,
        "st": 77.56
      },
      {
        "year": "2021 Tier-1 Normalized (General Posts List-3)",
        "totalMarks": 200,
        "general": 130.18,
        "obc": 117.87,
        "ews": 109.64,
        "sc": 94.58,
        "st": 81.52
      }
    ],
    "examPattern": [
      {
        "subject": "Tier-2 Section-1: Math (30 Qs) & Reasoning (30 Qs) [60 Qs / 180 Marks]",
        "questions": 60,
        "marks": 180,
        "time": "60 Minutes Sectional",
        "negativeMarking": "1.00 Negative Mark per incorrect answer"
      },
      {
        "subject": "Tier-2 Section-2: English (45 Qs) & General Awareness (25 Qs) [70 Qs / 210 Marks]",
        "questions": 70,
        "marks": 210,
        "time": "60 Minutes Sectional",
        "negativeMarking": "1.00 Negative Mark per incorrect answer"
      },
      {
        "subject": "Tier-2 Section-3: Computer Knowledge Module (20 Qs / 60 Marks)",
        "questions": 20,
        "marks": 60,
        "time": "15 Minutes",
        "negativeMarking": "1.00 Negative Mark (Qualifying with post-wise standards)"
      },
      {
        "subject": "Tier-2 DEST: Data Entry Speed Test (2,000 Key Depressions)",
        "questions": 1,
        "marks": 100,
        "time": "15 Minutes",
        "negativeMarking": "Qualifying Only (Max 5% error for UR in designated posts)"
      }
    ],
    "faqs": [
      {
        "question": "How many candidates qualified for SSC CGL Tier-2 in this result write-up?",
        "answer": "Over 1,24,000 aspirants qualified across the three notified lists: List-1 for Assistant Audit Officer (AAO), List-2 for Junior Statistical Officer (JSO), and List-3 for all general Executive Group B and Group C posts."
      },
      {
        "question": "How is score normalization calculated across multiple CBT shifts?",
        "answer": "SSC applies a standard equi-percentile normalization formula that balances varying paper difficulty levels across multiple examination days. The formula scales raw shift marks against the mean and standard deviation of top performers."
      },
      {
        "question": "Is the Computer Knowledge Module (CKM) mandatory for all posts in Tier-2?",
        "answer": "Yes. CKM is mandatory for all shortlisted candidates. While it is qualifying in nature, higher qualifying cut-off standards are strictly enforced for premium posts such as Assistant Section Officer in CSS, MEA, Inspector of Central Excise, and Postal Assistant."
      },
      {
        "question": "When will individual raw marks and scorecards be published by SSC?",
        "answer": "Individual candidate scorecards showing shift date, category, raw marks across all four sections, and the final normalized score are hosted on the ssc.gov.in candidate login portal approximately 10 to 14 days following the declaration of results."
      }
    ],
    "officialLinks": [
      {
        "title": "Result Write-up PDF",
        "label": "Download Official Cut-off PDF",
        "url": "https://ssc.gov.in",
        "isPrimary": true,
        "linkType": "pdf"
      },
      {
        "title": "Rank Predictor",
        "label": "Predict Normalization & Percentile",
        "url": "/tools/rank",
        "linkType": "tool"
      },
      {
        "title": "Marking Calculator",
        "label": "Simulate Tier-2 Sectional Deductions",
        "url": "/tools/marking",
        "linkType": "tool"
      },
      {
        "title": "Salary Calculator",
        "label": "View 7th CPC Level 7 & 8 Pay Bands",
        "url": "/tools/salary",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Download and print the official gazette syllabus to tick off every individual sub-topic systematically during your study schedule.",
      "Dedicate the first 2 hours of daily study to your weakest subject before moving to familiar revision topics.",
      "Conduct weekly timed self-assessment tests and compute your net score strictly applying the official negative marking formula.",
      "Review official commission corrigenda and model answer keys to understand recurring question structures and accepted representations.",
      "Ensure all mandatory identity documents and category certificates are renewed within the prescribed financial year validity window."
    ],
    "syllabusTopics": [
      {
        "subject": "Tier-1 & Tier-2 Evaluation Parameters",
        "weightage": "Historical Normalized Score Metric",
        "topics": [
          "Mathematical Abilities, Reasoning & General Intelligence, English Language & Comprehension, General Awareness",
          "Computer Knowledge Module (Qualifying) and Data Entry Speed Test (DEST 2000 key depressions in 15 mins)"
        ]
      }
    ]
  },
  {
    "id": "ans-ssc-chsl-tier1",
    "slug": "ssc-chsl-10-plus-2-tier-1-final-answer-key",
    "category": "answer-key",
    "title": "SSC CHSL Tier-1 Answer Key & Responses",
    "organization": "Staff Selection Commission",
    "examName": "Combined Higher Secondary (10+2) Level Exam",
    "publishDate": "25 Sep 2026",
    "qualification": "Candidates appeared in Tier-1 CBT",
    "sourceNotice": {
      "title": "Staff Selection Commission Answer Key Representation Portal",
      "url": "https://ssc.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "25 Sep 2026, 17:00 IST",
    "readTime": "4 min read",
    "summary": "Final answer key released along with question papers and candidate response sheets. Calculate your negative marks and raw score using our tool.",
    "linkText": "Check Final Answer Key & Calculate Score",
    "importantDates": [
      {
        "event": "Answer Key Objection Window Opens",
        "date": "25 September 2026"
      },
      {
        "event": "Last Date to Submit Challenges",
        "date": "30 September 2026 (18:00 Hrs)"
      }
    ],
    "whoShouldApply": [
      "Candidates who appeared in the CHSL Tier-1 Computer Based Examination wishing to verify marked responses against the official master key.",
      "Aspirants estimating raw scores using the official -0.50 negative marking formula for Tier-2 preparation planning."
    ],
    "whoShouldSkip": [
      "Candidates who remained absent during Tier-1 CBT shifts (response sheets are not generated for absentees)."
    ],
    "commonRejectionMistakes": [
      "Miscalculating negative marking penalty: SSC CHSL deducts 0.50 marks per incorrect response (not 0.25).",
      "Submitting objections without authoritative reference material: Representations without standard book / gazette citations are summarily dismissed.",
      "Missing the representation fee payment window (₹100 per question challenged)."
    ],
    "documentsNeeded": [
      "CHSL Tier-1 Examination Roll Number.",
      "Candidate Password (as printed on original Tier-1 Admission Certificate).",
      "Downloaded Master Question Paper and Response Sheet PDF."
    ],
    "howToApplySteps": [
      "Open the official Staff Selection Commission website at https://ssc.gov.in.",
      "Click on the notice titled \"Uploading of Tentative Answer Keys along with Candidate Response Sheets of CHSL (Tier-I) 2026\".",
      "Click the designated representation login gateway link provided at the bottom of the notification write-up.",
      "Enter your Examination Roll Number and User Password (as printed on your original Tier-1 Admission Certificate).",
      "Download and save the complete Question Paper and Response Sheet PDF locally (the portal link is terminated permanently after 5 days).",
      "To challenge an answer: Select the specific Question ID, state valid grounds, upload standard textbook citation proofs, and pay ₹100 fee per challenge."
    ],
    "examPattern": [
      {
        "subject": "English Language (Basic Knowledge)",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Marks per incorrect answer"
      },
      {
        "subject": "General Intelligence (Reasoning Ability)",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Marks per incorrect answer"
      },
      {
        "subject": "Quantitative Aptitude (Basic Arithmetic Skill)",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Marks per incorrect answer"
      },
      {
        "subject": "General Awareness (Polity, History, Science)",
        "questions": 25,
        "marks": 50,
        "time": "Combined 60 Minutes",
        "negativeMarking": "0.50 Negative Marks per incorrect answer"
      }
    ],
    "cutOffTrends": [
      {
        "year": "2024 Tier-1 Projected Normalized",
        "totalMarks": 200,
        "general": 154.5,
        "obc": 151.8,
        "ews": 149.2,
        "sc": 136.4,
        "st": 125.1
      },
      {
        "year": "2023 Tier-1 Normalized (General UR)",
        "totalMarks": 200,
        "general": 153.91,
        "obc": 152.26,
        "ews": 151.02,
        "sc": 136.41,
        "st": 124.52
      },
      {
        "year": "2022 Tier-1 Normalized (General UR)",
        "totalMarks": 200,
        "general": 157.72,
        "obc": 153.25,
        "ews": 151.02,
        "sc": 135.46,
        "st": 125.79
      }
    ],
    "faqs": [
      {
        "question": "What is the fee to submit an objection against an answer key question in SSC CHSL?",
        "answer": "Candidates must pay a statutory fee of ₹100 per question/answer challenged through the online portal. If the objection is upheld by the subject expert committee, the question is corrected or marks are awarded to all candidates in that shift."
      },
      {
        "question": "Can I download my response sheet after the objection window deadline?",
        "answer": "No. SSC strictly closes the response sheet portal after the 5-day representation period. Candidates are urged to download and archive their PDF copies immediately during the active window."
      },
      {
        "question": "How is the raw score calculated using the tentative answer key?",
        "answer": "Candidates receive +2 marks for every question where their chosen option matches the official key, and -0.50 marks are deducted for every wrong answer. Unattempted questions receive zero marks. The net score out of 200 forms the raw score prior to normalization."
      },
      {
        "question": "When is the final answer key and Tier-1 result announced?",
        "answer": "After evaluating candidate challenges, SSC publishes the final normalized result write-up and merit list within 3 to 4 weeks, accompanied by the final validated answer key."
      }
    ],
    "officialLinks": [
      {
        "title": "Response Sheet Portal",
        "label": "Login & Check Response Sheet",
        "url": "https://ssc.gov.in",
        "isPrimary": true,
        "linkType": "official"
      },
      {
        "title": "Negative Marking Tool",
        "label": "Calculate Net Score (-0.50 Penalty)",
        "url": "/tools/marking",
        "linkType": "tool"
      },
      {
        "title": "Rank Predictor",
        "label": "Predict Tier-1 Normalization Trajectory",
        "url": "/tools/rank",
        "linkType": "tool"
      },
      {
        "title": "Mock Test Simulator",
        "label": "Practice Tier-2 CBT Test",
        "url": "/mock-test/ssc-cgl-tier1",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Download and print the official gazette syllabus to tick off every individual sub-topic systematically during your study schedule.",
      "Dedicate the first 2 hours of daily study to your weakest subject before moving to familiar revision topics.",
      "Conduct weekly timed self-assessment tests and compute your net score strictly applying the official negative marking formula.",
      "Review official commission corrigenda and model answer keys to understand recurring question structures and accepted representations.",
      "Ensure all mandatory identity documents and category certificates are renewed within the prescribed financial year validity window."
    ],
    "syllabusTopics": [
      {
        "subject": "Tier-1 Examination Subjects",
        "weightage": "200 Marks / 100 Questions",
        "topics": [
          "English Language (Basic Knowledge), General Intelligence, Quantitative Aptitude (Basic Arithmetic Skill), General Awareness"
        ]
      }
    ]
  },
  {
    "id": "admit-rrb-technician",
    "slug": "rrb-technician-grade-1-3-admit-card",
    "category": "admit-card",
    "title": "RRB Technician Grade-I & III City Slip",
    "organization": "Railway Recruitment Boards",
    "examName": "CEN 02/2024 Technician CBT Examination",
    "publishDate": "22 Sep 2026",
    "examDate": "16 Oct to 28 Oct 2026",
    "qualification": "Matric + ITI / Diploma in Engineering",
    "sourceNotice": {
      "title": "Railway Recruitment Boards Technician Portal",
      "url": "https://www.rrbapply.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki (Founder & Editor)",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "11 Oct 2026, 18:15 IST",
    "readTime": "4 min read",
    "summary": "City intimation slips and travel pass for SC/ST candidates are active on official railway regional portals.",
    "linkText": "Check Exam City & Download Call Letter",
    "whoShouldApply": [
      "Candidates registered under Centralised Employment Notice (CEN) 02/2026 for Technician Grade-I (Signal) and Grade-III posts downloading E-Call Letters.",
      "Applicants verifying exam city intimation, travel pass, and shift reporting hours across 16 Railway Recruitment Boards."
    ],
    "whoShouldSkip": [
      "Candidates whose applications were invalid due to multiple zone submissions or non-payment of fee."
    ],
    "commonRejectionMistakes": [
      "Arriving at the exam center without original Aadhaar card for mandatory biometric verification.",
      "Attempting to present soft copy (PDF on mobile) instead of a clear printed A4 hardcopy.",
      "Forgetting to sign the declaration box in the presence of the invigilator during the exam."
    ],
    "documentsNeeded": [
      "Printed RRB Technician E-Call Letter (clear printout on A4 sheet)",
      "Original Aadhaar Card for mandatory pre-exam biometric verification",
      "Two recent passport-size color photographs matching application upload",
      "Original SC/ST Railway Travel Pass (if booked under free travel facility)"
    ],
    "howToApplySteps": [
      "Access the official unified Railway Recruitment Boards application portal at https://www.rrbapply.gov.in.",
      "Log into the portal using your registered Mobile Number / Email and Account Password.",
      "Navigate to \"View Application -> Download E-Call Letter & City Intimation Slip\".",
      "Select your post category: Technician Grade-I (Signal) [Level 5] or Technician Grade-III [Level 2].",
      "Download the Exam City Intimation slip and the official SC/ST Railway Travel Authority Pass (if applicable).",
      "Download your final printable E-Call Letter exactly 4 days prior to your scheduled examination date.",
      "Print 2 copies on clean A4 paper; do NOT sign or fill the self-declaration box prior to reaching the examination lab."
    ],
    "admitCardDetails": {
      "officialNoticeSummary": "Railway Recruitment Boards have activated Exam City Intimation Slips and Free Travel Passes for Centralised Employment Notice (CEN) 02/2024 Technician Grade-I (Signal) and Grade-III posts across all 16 railway zones. The single-stage CBT examination is conducted nationwide from 16 to 28 October 2026. Center gates close strictly 45 minutes before shift commencement.",
      "downloadSteps": [
        "Open the unified RRB application portal at https://www.rrbapply.gov.in.",
        "Click on \"CEN 02/2024 - Download Exam City Intimation & E-Call Letter\".",
        "Log in with your Registration Number and User Password / Date of Birth.",
        "Download the Exam City Slip and printable E-Call Letter.",
        "Print the call letter ensuring barcode and photo clarity on clean A4 paper."
      ],
      "detailsToCheck": [
        "Candidate Full Name, Roll Number, and Registration Number",
        "Post Cadre: Technician Grade-I (Signal) or Technician Grade-III Trade",
        "Exam Center Name, Test Center Code, and Complete Street Address",
        "Exam Date, Shift Timing, Reporting Time, and Gate Closure Hour",
        "Candidate Photograph, Barcode, and Aadhaar Biometric Verification Status"
      ],
      "itemsToCarry": [
        "Printed RRB Technician E-Call Letter on clean A4 sheet",
        "Original Aadhaar Card (mandatory for pre-exam biometric verification at gate)",
        "Two recent colour passport photographs matching application upload",
        "Original SC/ST Railway Free Travel Pass alongside photo ID (if booked under free travel)",
        "Simple transparent blue or black ballpoint pen"
      ],
      "prohibitedItems": [
        "Mobile phones, Bluetooth earphones, smartwatches, digital fitness bands, calculators",
        "Bags, wallets, metallic jewellery, hair clips with metal pins, belts with heavy buckles",
        "Textbooks, notebooks, loose paper sheets, stationery boxes"
      ],
      "ifDownloadFailsAdvice": "If you cannot generate your admit card, verify that your application was not cancelled due to multiple zonal submissions or fee payment failure. In case of login errors, email your respective RRB Zonal Helpdesk with your registration ID, registered phone number, and payment confirmation proof.",
      "officialHelpdesk": {
        "phone": "011-23381125 / RRB Zonal Helplines",
        "email": "rrb.helpdesk@gov.in",
        "portalUrl": "https://www.rrbapply.gov.in"
      }
    },
    "examPattern": [
      {
        "subject": "Technician Grade-I (Signal): GA, Reasoning, Computers, Math, Science & Engg",
        "questions": 100,
        "marks": 100,
        "time": "90 Minutes (Single Stage CBT)",
        "negativeMarking": "0.33 Negative Marks (1/3rd penalty)"
      },
      {
        "subject": "Technician Grade-III: Math (25 Qs), Reasoning (25 Qs), General Science (40 Qs), GA (10 Qs)",
        "questions": 100,
        "marks": 100,
        "time": "90 Minutes (Single Stage CBT)",
        "negativeMarking": "0.33 Negative Marks (1/3rd penalty)"
      }
    ],
    "cutOffTrends": [
      {
        "year": "2024 Technician Gr-I Projected CBT",
        "totalMarks": 100,
        "general": 79.5,
        "obc": 75.8,
        "ews": 73.2,
        "sc": 67.4,
        "st": 60.1
      },
      {
        "year": "2024 Technician Gr-III Projected CBT",
        "totalMarks": 100,
        "general": 70.8,
        "obc": 66.2,
        "ews": 63.5,
        "sc": 57.8,
        "st": 50.4
      }
    ],
    "faqs": [
      {
        "question": "Is physical Aadhaar card biometric authentication mandatory at the RRB exam gate?",
        "answer": "Yes. In strict compliance with Railway Recruitment Board rules, candidates must undergo Aadhaar-based biometric verification at the venue gate before entering the examination lab. Candidates without original Aadhaar card will not be permitted to sit for the CBT."
      },
      {
        "question": "Is there a second stage CBT (CBT-2) or trade test for RRB Technician recruitment?",
        "answer": "No. Under CEN 02/2024, the Railway Board abolished the two-stage examination model. Selection is decided strictly based on marks scored in the single 100-mark Computer Based Test, followed directly by Document Verification and Medical Examination."
      },
      {
        "question": "Can SC/ST candidates travel free on Indian Railways using the admit card travel pass?",
        "answer": "Yes. Eligible SC/ST candidates who requested the travel facility can book and travel in Sleeper Class trains by presenting the printed travel authority pass along with an original government photo ID at railway ticket reservation counters."
      },
      {
        "question": "What are the daily shift timings for RRB Technician CBT examination?",
        "answer": "Shift 1: 09:00 AM to 10:30 AM (Reporting 07:30 AM, Gate Closure 08:15 AM); Shift 2: 12:45 PM to 02:15 PM (Reporting 11:15 AM, Gate Closure 12:00 PM); Shift 3: 04:30 PM to 06:00 PM (Reporting 03:00 PM, Gate Closure 03:45 PM)."
      }
    ],
    "officialLinks": [
      {
        "title": "RRB Regional Portals",
        "label": "Download E-Call Letter",
        "url": "https://indianrailways.gov.in",
        "isPrimary": true,
        "linkType": "official"
      },
      {
        "title": "Marking Score Calculator",
        "label": "Calculate Railway 1/3rd Negative Marks",
        "url": "/tools/marking",
        "linkType": "tool"
      },
      {
        "title": "Salary Calculator",
        "label": "View Level 2 & 5 Pay Structure",
        "url": "/tools/salary",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Print at least two clear copies of your e-Admit Card on clean A4 paper well in advance; do not wait until the exam morning.",
      "Locate your exact examination center on Google Maps one day prior to avoid last-minute transit delays or wrong center confusion.",
      "Carry strictly the original valid government photo ID card matching the exact name and DOB on your registration form.",
      "Adhere strictly to the gate closure schedule: entry gates close permanently 30 to 45 minutes prior to test commencement.",
      "Carry two passport photographs matching the application form for emergency verification at the facilitation counter."
    ],
    "syllabusTopics": [
      {
        "subject": "Technician Grade-I Signal & Grade-III CBT",
        "weightage": "100 Marks / 100 Questions (90 Mins)",
        "topics": [
          "General Awareness, General Intelligence & Reasoning, Basic of Computers and Applications, Mathematics, Basic Science & Engineering"
        ]
      }
    ]
  },
  {
    "id": "res-upsc-cds-result",
    "slug": "upsc-cds-2-written-exam-final-result-ssb",
    "category": "result",
    "title": "UPSC CDS-II Written Exam Result & SSB",
    "organization": "Union Public Service Commission (UPSC)",
    "examName": "Combined Defence Services Examination (II)",
    "publishDate": "23 Sep 2026",
    "qualification": "Graduates for IMA, INA, AFA, and OTA",
    "sourceNotice": {
      "title": "Union Public Service Commission Written Results Desk",
      "url": "https://upsc.gov.in",
      "checkedOn": "02 Oct 2026"
    },
    "verifiedBy": "Akash Singh Solanki",
    "status": "verified",
    "author": "Akash Singh Solanki",
    "reviewedDate": "23 Sep 2026, 19:15 IST",
    "readTime": "5 min read",
    "summary": "8,421 candidates qualify for Services Selection Board (SSB) interviews. Verification of original certificates scheduled at respective selection centers.",
    "linkText": "Check Roll Number in Qualified Merit List",
    "whoShouldApply": [
      "Candidates who appeared in the Combined Defence Services (II) written examination and whose roll numbers appear in the qualified list for IMA, INA, AFA, or OTA.",
      "Aspirants preparing for the 5-day Services Selection Board (SSB) interview process including Stage-I Screening (OIR & PPDT), Psychological Testing, GTO tasks, and Personal Interview."
    ],
    "whoShouldSkip": [
      "Candidates who did not clear the minimum 20% sectional qualifying mark in each paper (English, General Knowledge, Elementary Mathematics) or the aggregate cutoff.",
      "Candidates exceeding the maximum upper age limit for specific academies (24 for IMA/INA/AFA, 25 for OTA)."
    ],
    "commonRejectionMistakes": [
      "Failing to register on official service portals: Candidates MUST register on joinindianarmy.nic.in within 2 weeks of result declaration; failure forfeits SSB call-up.",
      "Discrepancies in Matriculation Date of Birth or Degree mark sheets.",
      "Failing medical standard checks (permanent tattoos outside forearm guidelines or vision defects outside academy limits)."
    ],
    "documentsNeeded": [
      "CDS-II Written Exam Roll Number and Admit Card.",
      "Original Matriculation Certificate & Mark Sheet (DOB verification).",
      "Original Degree Certificate or provisional degree passing certificate.",
      "20 recent passport-size photographs on plain white background for SSB documentation."
    ],
    "howToApplySteps": [
      "Open the Union Public Service Commission official portal at https://upsc.gov.in.",
      "Navigate to \"Written Results -> Examination Written Results\" on the right sidebar navigation.",
      "Click on \"Combined Defence Services Examination (II) – Written Result with Roll Numbers\".",
      "Download the official PDF document containing the 8,421 shortlisted roll numbers and commission press release.",
      "Search using Ctrl+F for your 7-digit CDS Roll Number to verify your academy qualification status.",
      "Mandatory Registration: Register online on the Indian Army recruiting portal at https://joinindianarmy.nic.in within 2 weeks to receive your SSB interview date and selection board allocation."
    ],
    "selectionProcess": [
      {
        "stageNumber": "Stage 1",
        "stageName": "UPSC Written Examination",
        "description": "Objective test of English, GK, and Math (300 marks for IMA/INA/AFA; 200 marks for OTA without Math).",
        "qualifyingNature": "Qualifying threshold (minimum 20% sectional in each paper plus aggregate cut-off)."
      },
      {
        "stageNumber": "Stage 2",
        "stageName": "SSB Stage-I Screening",
        "description": "Officer Intelligence Rating (OIR) tests and Picture Perception & Discussion Test (PPDT) on Day 1.",
        "qualifyingNature": "Screening round (approx 60-70% candidates screened out on Day 1)."
      },
      {
        "stageNumber": "Stage 3",
        "stageName": "SSB Stage-II (4-Day Comprehensive Evaluation)",
        "description": "Psychological Battery (TAT, WAT, SRT, SDT), Group Testing Officer (GTO) Obstacle Tasks, and Personal Interview.",
        "qualifyingNature": "Evaluates 15 Officer Like Qualities (OLQs); assessed by Interviewing Officer, Psychologist & GTO."
      },
      {
        "stageNumber": "Stage 4",
        "stageName": "Special Medical Board (SMB)",
        "description": "Rigorous medical examination at military command hospitals covering vision, physical deformities, and clinical tests.",
        "qualifyingNature": "Medical fitness mandatory for commissioning."
      }
    ],
    "cutOffTrends": [
      {
        "year": "2023 CDS-II Written (Indian Military Academy - IMA)",
        "totalMarks": 300,
        "general": 126,
        "obc": 126,
        "ews": 126,
        "sc": 126,
        "st": 126
      },
      {
        "year": "2023 CDS-II Written (Indian Naval Academy - INA)",
        "totalMarks": 300,
        "general": 118,
        "obc": 118,
        "ews": 118,
        "sc": 118,
        "st": 118
      },
      {
        "year": "2023 CDS-II Written (Air Force Academy - AFA)",
        "totalMarks": 300,
        "general": 142,
        "obc": 142,
        "ews": 142,
        "sc": 142,
        "st": 142
      },
      {
        "year": "2023 CDS-II Written (Officers Training Academy - OTA Men)",
        "totalMarks": 200,
        "general": 98,
        "obc": 98,
        "ews": 98,
        "sc": 98,
        "st": 98
      }
    ],
    "faqs": [
      {
        "question": "What is the mandatory next step after clearing the CDS-II written exam?",
        "answer": "Candidates who cleared the written examination must register online on the Indian Army recruiting website joinindianarmy.nic.in within two weeks of result declaration. Candidates failing to register on the service portal will NOT be allotted SSB interview dates."
      },
      {
        "question": "What is the sectional qualifying cut-off mark in each CDS paper?",
        "answer": "UPSC mandates a strict minimum score of 20% in EACH individual paper (English, General Knowledge, and Elementary Mathematics). Even if your aggregate exceeds the cutoff, failing to score at least 20% in any single paper leads to disqualification."
      },
      {
        "question": "How is final merit computed for CDS commissioning?",
        "answer": "Final merit is determined by combining marks scored in the UPSC Written Examination (300 marks for IMA/INA/AFA, 200 marks for OTA) and marks awarded in the 5-day SSB Interview (300 marks for IMA/INA/AFA, 200 marks for OTA)."
      },
      {
        "question": "Can candidates apply for OTA without studying Mathematics?",
        "answer": "Yes. Candidates opting solely for the Officers Training Academy (OTA) are required to appear for only two papers: English (100 Marks) and General Knowledge (100 Marks). Mathematics is not included in the OTA examination syllabus."
      }
    ],
    "officialLinks": [
      {
        "title": "UPSC Press Note PDF",
        "label": "Download Merit List PDF",
        "url": "https://upsc.gov.in",
        "isPrimary": true,
        "linkType": "pdf"
      },
      {
        "title": "Join Indian Army Portal",
        "label": "SSB Registration (joinindianarmy.nic.in)",
        "url": "https://joinindianarmy.nic.in",
        "linkType": "official"
      },
      {
        "title": "Marking Score Calculator",
        "label": "Simulate UPSC Written Score",
        "url": "/tools/marking",
        "linkType": "tool"
      },
      {
        "title": "Physical Standards Tool",
        "label": "Check Defence Height & Chest Standards",
        "url": "/tools/height",
        "linkType": "tool"
      }
    ],
    "preparationTips": [
      "Download and print the official gazette syllabus to tick off every individual sub-topic systematically during your study schedule.",
      "Dedicate the first 2 hours of daily study to your weakest subject before moving to familiar revision topics.",
      "Conduct weekly timed self-assessment tests and compute your net score strictly applying the official negative marking formula.",
      "Review official commission corrigenda and model answer keys to understand recurring question structures and accepted representations.",
      "Ensure all mandatory identity documents and category certificates are renewed within the prescribed financial year validity window."
    ],
    "examPattern": [
      {
        "subject": "English (IMA, INA, AFA & OTA)",
        "questions": 120,
        "marks": 100,
        "time": "2 Hours (120 Mins)",
        "negativeMarking": "0.33 Negative Deduction"
      },
      {
        "subject": "General Knowledge (IMA, INA, AFA & OTA)",
        "questions": 120,
        "marks": 100,
        "time": "2 Hours (120 Mins)",
        "negativeMarking": "0.33 Negative Deduction"
      },
      {
        "subject": "Elementary Mathematics (IMA, INA & AFA only)",
        "questions": 100,
        "marks": 100,
        "time": "2 Hours (120 Mins)",
        "negativeMarking": "0.33 Negative Deduction"
      }
    ],
    "syllabusTopics": [
      {
        "subject": "English & Verbal Comprehension",
        "weightage": "100 Marks / 120 Questions",
        "topics": [
          "Reading Comprehension passages, Spotting errors, Ordering of words in a sentence, Ordering of sentences (Jumbled paras)",
          "Idioms and Phrases, Synonyms and Antonyms, Fill in the blanks with appropriate prepositions and vocabulary, Parts of speech"
        ]
      },
      {
        "subject": "General Knowledge & Current Defence Affairs",
        "weightage": "100 Marks / 120 Questions",
        "topics": [
          "Current events of national and international importance, military warfare technology, and joint bilateral drills",
          "History of India and Indian National Movement; Physical, Political, and Economic Geography of India",
          "Indian Constitution, Parliament, President powers, Supreme Court rulings; NCERT Class 9-10 Physics, Chemistry, Biology"
        ]
      },
      {
        "subject": "Elementary Mathematics (Arithmetic, Algebra, Geometry, Trigonometry)",
        "weightage": "100 Marks / 100 Questions",
        "topics": [
          "Number System, Unitary method, Time & Distance, Time & Work, Percentages, Profit & Loss, Simple & Compound Interest",
          "Basic algebraic identities, Remainder theorem, HCF & LCM of polynomials, Linear equations, Quadratic equations",
          "Trigonometry (Sin x, Cos x, Tan x, Simple heights & distances), Plane geometry (Theorems on triangles, circles, tangents)",
          "Mensuration: Areas of squares, rectangles, triangles, circles; Surface areas and volumes of spheres, cones, cylinders"
        ]
      }
    ]
  }
];

export const MARKING_PRESETS: MarkingPreset[] = [
  {
    id: 'nicl-ao-prelims',
    name: 'NICL AO Prelims 2026 (100 Qs / 100 Marks)',
    category: 'Insurance (NICL Scale-I)',
    correctMarks: 1.0,
    negativePenalty: 0.25,
    totalQuestionsDefault: 100,
    maxScoreDefault: 100,
  },
  {
    id: 'nicl-ao-mains',
    name: 'NICL AO Mains 2026 (250 Qs / 250 Marks)',
    category: 'Insurance (NICL Scale-I)',
    correctMarks: 1.0,
    negativePenalty: 0.25,
    totalQuestionsDefault: 250,
    maxScoreDefault: 250,
  },
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
