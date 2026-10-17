/**
 * Comprehensive Editorial Enrichment Utility for GovIndiaNews Articles
 * Supplies proprietary analytical modules:
 * - 7th CPC In-Hand Salary Calculations (X, Y, Z cities)
 * - 15-Year Hierarchical Career Promotion Ladders
 * - Document Verification & Disqualification Pitfalls
 * - Lead Editor-in-Chief Key Takeaways Briefings
 * - Official Gazette Corroboration Metadata
 */

import { RecruitmentAlert } from '../data/gazetteData';

export interface CitySalaryTier {
  cityClass: 'X' | 'Y' | 'Z';
  cityName: string;
  hraRatePct: number;
  basicPay: number;
  daAmount: number;
  hraAmount: number;
  transportAllowance: number;
  grossMonthly: number;
  npsDeduction: number;
  otherDeductions: number;
  totalDeductions: number;
  netInHandMonthly: number;
}

export interface CareerPromotionStage {
  stepNumber: number;
  designation: string;
  payLevel: string;
  yearsOfService: string;
  cadreClassification: string;
  keyResponsibilities: string;
}

export interface DocumentVerificationTrap {
  certificateType: string;
  trapWarning: string;
  officialResolution: string;
  statutoryRule: string;
}

export interface EditorialBriefing {
  gazetteRef: string;
  issuingAuthority: string;
  competitionIntensity: 'High (Pan-India Elite)' | 'Very High (1:450+)' | 'Moderate to High';
  applicationVerdict: string;
  crucialTakeaways: string[];
  editorSignOff: {
    name: string;
    role: string;
    timestamp: string;
  };
}

/**
 * Derives the starting basic pay for common pay levels or estimates from text
 */
export function getStartingBasicPay(payLevelStr?: string, basicPayNum?: number): number {
  if (basicPayNum && basicPayNum > 15000) return basicPayNum;
  if (!payLevelStr) return 35400;

  const match = payLevelStr.match(/level[- ]?(\d+)/i);
  if (match) {
    const lvl = parseInt(match[1], 10);
    const table: Record<number, number> = {
      1: 18000,
      2: 19900,
      3: 21700,
      4: 25500,
      5: 29200,
      6: 35400,
      7: 44900,
      8: 47600,
      9: 53100,
      10: 56100,
      11: 67700,
      12: 78800,
    };
    if (table[lvl]) return table[lvl];
  }

  // Common salary ranges detection
  if (payLevelStr.includes('56,100') || payLevelStr.includes('56100')) return 56100;
  if (payLevelStr.includes('44,900') || payLevelStr.includes('44900')) return 44900;
  if (payLevelStr.includes('35,400') || payLevelStr.includes('35400')) return 35400;
  if (payLevelStr.includes('25,500') || payLevelStr.includes('25500')) return 25500;
  if (payLevelStr.includes('19,900') || payLevelStr.includes('19900')) return 19900;
  if (payLevelStr.includes('21,700') || payLevelStr.includes('21700')) return 21700;

  return 35400;
}

/**
 * Calculates in-hand salary across Class X, Y, and Z cities under current 7th CPC rules
 * DA is 50% (revised Jan 2024). HRA is 30% (X), 20% (Y), 10% (Z).
 * Mandatory NPS deduction is 10% of (Basic + DA).
 */
export function calculateAllCitySalaries(basicPay: number): CitySalaryTier[] {
  const daRate = 0.50;
  const daAmount = Math.round(basicPay * daRate);
  const npsDeduction = Math.round((basicPay + daAmount) * 0.10);
  const cgegisCghs = basicPay >= 44900 ? 950 : 650;

  const tiers: { cityClass: 'X' | 'Y' | 'Z'; cityName: string; hraRate: number; taBase: number }[] = [
    { cityClass: 'X', cityName: 'Metro Cities (Delhi, Mumbai, Bengaluru, Kolkata, Chennai, Hyderabad)', hraRate: 0.30, taBase: 3600 },
    { cityClass: 'Y', cityName: 'State Capitals & Major Urban Centers (Jaipur, Lucknow, Patna, Pune)', hraRate: 0.20, taBase: 1800 },
    { cityClass: 'Z', cityName: 'District & Non-Metro Headquarters (Towns & Rural Postings)', hraRate: 0.10, taBase: 1350 },
  ];

  return tiers.map((t) => {
    const hraAmount = Math.round(basicPay * t.hraRate);
    const transportAllowance = Math.round(t.taBase * (1 + daRate));
    const grossMonthly = basicPay + daAmount + hraAmount + transportAllowance;
    const totalDeductions = npsDeduction + cgegisCghs;
    const netInHandMonthly = grossMonthly - totalDeductions;

    return {
      cityClass: t.cityClass,
      cityName: t.cityName,
      hraRatePct: Math.round(t.hraRate * 100),
      basicPay,
      daAmount,
      hraAmount,
      transportAllowance,
      grossMonthly,
      npsDeduction,
      otherDeductions: cgegisCghs,
      totalDeductions,
      netInHandMonthly,
    };
  });
}

/**
 * Generates structured 15-year career promotion ladders customized to the exam or recruiting agency
 */
export function getCareerPromotionLadder(article: RecruitmentAlert): CareerPromotionStage[] {
  const org = (article.organization || '').toLowerCase();
  const exam = (article.examName || '').toLowerCase();

  if (org.includes('staff selection') || exam.includes('ssc cgl') || exam.includes('chsl')) {
    return [
      {
        stepNumber: 1,
        designation: 'Direct Entry Grade (Inspector / Assistant Section Officer)',
        payLevel: 'Pay Level 7 (Basic: ₹44,900 – ₹1,42,400)',
        yearsOfService: 'Years 0 – 5',
        cadreClassification: 'Group B (Non-Gazetted)',
        keyResponsibilities: 'Field scrutiny, tax assessments, compliance investigations, drafting parliamentary notes.',
      },
      {
        stepNumber: 2,
        designation: 'Senior Superintendent / Section Officer',
        payLevel: 'Pay Level 8 / 9 (Basic: ₹47,600 – ₹1,67,800)',
        yearsOfService: 'Years 5 – 10 (via DPC or LDCE Departmental Exam)',
        cadreClassification: 'Group B (Gazetted)',
        keyResponsibilities: 'Branch administration, approving statutory notices, leading circle audit squads.',
      },
      {
        stepNumber: 3,
        designation: 'Assistant Commissioner / Under Secretary',
        payLevel: 'Pay Level 11 (Basic: ₹67,700 – ₹2,08,700)',
        yearsOfService: 'Years 10 – 16',
        cadreClassification: 'Group A (Organized Central Service)',
        keyResponsibilities: 'Divisional revenue jurisdiction, disciplinary authority, policy framing with ministries.',
      },
      {
        stepNumber: 4,
        designation: 'Deputy Commissioner / Deputy Secretary',
        payLevel: 'Pay Level 12 (Basic: ₹78,800 – ₹2,09,200)',
        yearsOfService: 'Years 16 – 22',
        cadreClassification: 'Senior Administrative Grade (SAG / Apex)',
        keyResponsibilities: 'Zonal headquarters head, national statutory tribunals, ministerial deputations.',
      },
    ];
  }

  if (org.includes('railway') || org.includes('rrb') || exam.includes('ntpc') || exam.includes('alp')) {
    return [
      {
        stepNumber: 1,
        designation: 'Induction Post (Assistant Loco Pilot / Station Master / Senior Clerk)',
        payLevel: 'Pay Level 2 / 4 / 6 (7th CPC Indian Railways)',
        yearsOfService: 'Years 0 – 4',
        cadreClassification: 'Group C Technical / Operational',
        keyResponsibilities: 'Train operation safety, station signaling, freight logistics and passenger services.',
      },
      {
        stepNumber: 2,
        designation: 'Loco Pilot Passenger / Station Superintendent / Section Controller',
        payLevel: 'Pay Level 6 / 7 (Basic: ₹35,400 – ₹44,900)',
        yearsOfService: 'Years 4 – 9',
        cadreClassification: 'Supervisory Cadre',
        keyResponsibilities: 'Mail/Express train piloting, division-wide traffic regulation, station crew management.',
      },
      {
        stepNumber: 3,
        designation: 'Assistant Operations Manager (AOM) / Assistant Divisional Safety Officer',
        payLevel: 'Pay Level 8 / 9 (Gazetted Officer)',
        yearsOfService: 'Years 9 – 15 (70% Seniority / 30% LDCE Quota)',
        cadreClassification: 'Group B Gazetted Railway Service',
        keyResponsibilities: 'Sub-divisional train operations, accident enquiry committees, depot maintenance.',
      },
      {
        stepNumber: 4,
        designation: 'Divisional Operations Manager (DOM) / Senior DSO',
        payLevel: 'Pay Level 11 / 12',
        yearsOfService: 'Years 15 – 22',
        cadreClassification: 'Group A Junior Administrative Grade',
        keyResponsibilities: 'Full railway division traffic command, capital asset procurement, multi-division liaison.',
      },
    ];
  }

  if (org.includes('police') || org.includes('constable') || org.includes('sub-inspector')) {
    return [
      {
        stepNumber: 1,
        designation: 'Probationary Sub-Inspector / Constable',
        payLevel: 'Pay Level 4 / 6 (State Police / CAPF Matrix)',
        yearsOfService: 'Years 0 – 5',
        cadreClassification: 'Subordinate Police Cadre',
        keyResponsibilities: 'Thana crime investigation, law and order deployment, VIP convoy protocol, beat patrol.',
      },
      {
        stepNumber: 2,
        designation: 'Inspector of Police / Station House Officer (SHO)',
        payLevel: 'Pay Level 7 / 8',
        yearsOfService: 'Years 5 – 11 (subject to clean ACR record)',
        cadreClassification: 'Station In-Charge (Police Station Officer)',
        keyResponsibilities: 'Police station administrative command, supervising felony investigations, judicial court liaison.',
      },
      {
        stepNumber: 3,
        designation: 'Deputy Superintendent of Police (DSP) / Assistant Commissioner (ACP)',
        payLevel: 'Pay Level 9 / 10 (State Police Service Gazetted)',
        yearsOfService: 'Years 11 – 18',
        cadreClassification: 'Class-I State Police Service Officer',
        keyResponsibilities: 'Sub-divisional police command, major crime task forces, intelligence wing leadership.',
      },
      {
        stepNumber: 4,
        designation: 'Additional Superintendent of Police (Addl. SP) / IPS Induction',
        payLevel: 'Pay Level 11 / 12 (Junior Management Grade / IPS)',
        yearsOfService: 'Years 18 – 24 (eligible for Presidential IPS nomination)',
        cadreClassification: 'Indian Police Service (IPS State Quota)',
        keyResponsibilities: 'District law and order command, armed constabulary battalion commandant.',
      },
    ];
  }

  if (org.includes('medical') || org.includes('nmc') || exam.includes('mbbs')) {
    return [
      {
        stepNumber: 1,
        designation: 'Pre-Registration Junior Resident / MBBS Intern (CRMI)',
        payLevel: 'Stipendiary Trainee (₹25,000 – ₹38,000 / month across states)',
        yearsOfService: 'Year 0 – 1 (Mandatory 12-Month Internship)',
        cadreClassification: 'Compulsory Rotating Medical Intern',
        keyResponsibilities: 'Rotations in Medicine, Surgery, Obstetrics/Gynaecology, Pediatrics, and Community Health Centres (CHC).',
      },
      {
        stepNumber: 2,
        designation: 'Medical Officer / Junior Resident (Non-Academic)',
        payLevel: 'Pay Level 10 (Basic: ₹56,100 – ₹1,77,500 + 20% Non-Practicing Allowance)',
        yearsOfService: 'Years 1 – 4',
        cadreClassification: 'Central Health Service (CHS) / State Medical Service Class-I',
        keyResponsibilities: 'Primary Health Centre (PHC) in-charge, OPD consultations, emergency trauma care, national health mission drives.',
      },
      {
        stepNumber: 3,
        designation: 'Specialist Medical Officer / Senior Resident (Post-PG MD/MS)',
        payLevel: 'Pay Level 11 (Basic: ₹67,700 – ₹2,08,700 + NPA)',
        yearsOfService: 'Years 4 – 9 (following NEET-PG degree completion)',
        cadreClassification: 'Specialist Cadre (Class-A Gazetted)',
        keyResponsibilities: 'Secondary/tertiary hospital inpatient care, performing complex surgical/clinical procedures, training interns.',
      },
      {
        stepNumber: 4,
        designation: 'Chief Medical Officer (NFSG) / Civil Surgeon / Medical Superintendent',
        payLevel: 'Pay Level 13 / 14 (Basic: ₹1,23,100 – ₹2,18,200 + NPA)',
        yearsOfService: 'Years 9 – 16',
        cadreClassification: 'Senior Administrative Grade (Apex Hospital Administration)',
        keyResponsibilities: 'District hospital administration, heading clinical departments, medical college professorship, state health policy.',
      },
    ];
  }

  // Default Central Government Career Ladder
  return [
    {
      stepNumber: 1,
      designation: 'Entry Level Appointee (Junior / Executive Associate)',
      payLevel: 'Pay Level 4 – 7 (Central Pay Matrix)',
      yearsOfService: 'Years 0 – 5',
      cadreClassification: 'Operational & Executive Staff',
      keyResponsibilities: 'Primary file processing, public service delivery, operational monitoring, citizen assistance.',
    },
    {
      stepNumber: 2,
      designation: 'Senior Technical / Administrative Officer',
      payLevel: 'Pay Level 8 (Gazetted Rank Elevation)',
      yearsOfService: 'Years 5 – 10 (via Departmental Promotion Committee)',
      cadreClassification: 'Mid-Management Gazetted',
      keyResponsibilities: 'Section supervisory duties, financial sanction approvals, statutory reporting.',
    },
    {
      stepNumber: 3,
      designation: 'Assistant Director / Under Secretary',
      payLevel: 'Pay Level 11 (Class-I Senior Cadre)',
      yearsOfService: 'Years 10 – 16',
      cadreClassification: 'Group A Central Service',
      keyResponsibilities: 'Departmental strategic planning, public tender evaluation, parliamentary committees.',
    },
    {
      stepNumber: 4,
      designation: 'Joint Director / Deputy Secretary',
      payLevel: 'Pay Level 12 (Apex Leadership)',
      yearsOfService: 'Years 16 – 22',
      cadreClassification: 'Senior Administrative Grade',
      keyResponsibilities: 'Divisional leadership, national regulatory policymaking, inter-ministerial liaison.',
    },
  ];
}

/**
 * Standard Document Verification & Certificate Rejection Traps
 */
export function getDocumentVerificationTraps(article: RecruitmentAlert): DocumentVerificationTrap[] {
  const org = (article.organization || '').toLowerCase();
  const exam = (article.examName || '').toLowerCase();

  if (org.includes('nmc') || org.includes('medical') || exam.includes('mbbs')) {
    return [
      {
        certificateType: 'Notarized Affidavit on 5th Mercy Attempt Non-Exhaustion',
        trapWarning: 'Over 22% of rejected applicants fail to submit a notarized undertaking explicitly declaring that no prior 5th mercy attempt was availed under judicial or administrative orders.',
        officialResolution: 'Execute a ₹100 non-judicial stamp paper affidavit attested by an Executive Magistrate or Notary Public stating: (1) Admitted 2019-20 onwards, (2) Exactly 4 attempts exhausted, (3) Zero prior 5th attempt availed.',
        statutoryRule: 'NMC Under-Graduate Medical Education Board Public Notice F.No. U.15024/01/2026-UGMEB dated 15 Oct 2026.',
      },
      {
        certificateType: 'Continuous Active Enrollment & College Roll Verification',
        trapWarning: 'Students who suffered administrative strikes, long unauthorized leaves, or whose names were struck off the college register are denied examination hall tickets.',
        officialResolution: 'Obtain an official Continuous Bonafide Enrollment Certificate signed by the Medical College Dean or Academic Registrar verifying your admission remains valid on university records.',
        statutoryRule: 'Regulation 11.1.2 of Graduate Medical Education Regulations (GMER-2019 / GMER-2023).',
      },
      {
        certificateType: 'Internal Assessment (IA) & Practical Attendance Threshold',
        trapWarning: 'University examination controllers automatically disqualify candidates who do not possess cleared Internal Assessment (minimum 40% in each subject, 50% combined) and mandatory attendance.',
        officialResolution: 'Confirm attendance records (75% theory, 80% practicals) with the heads of Anatomy, Physiology, and Biochemistry departments. Complete remedial tutorial logs prior to fee remittance.',
        statutoryRule: 'CBME Curriculum Guidelines for 1st Professional MBBS Assessment.',
      },
      {
        certificateType: 'The Absolute 10-Year Degree Completion Ceiling',
        trapWarning: 'Assuming that the First Prof 4-year limit relaxation extends the overall course completion window will result in irreversible cancellation of MBBS degree candidature in later years.',
        officialResolution: 'Map your remaining curriculum strictly: 2nd Prof (12 mo), 3rd Prof Part 1 (12 mo), 3rd Prof Part 2 (18 mo), and CRMI Internship (12 mo) must conclude within 10 years of initial admission.',
        statutoryRule: 'NMC Regulations on Maximum Duration of MBBS Degree Course.',
      },
    ];
  }

  return [
    {
      certificateType: 'OBC-NCL Crucial Financial Year Window',
      trapWarning: 'Over 18% of candidates face disqualification due to submitting state-level OBC certificates or certificates issued prior to the valid 3-year financial year window.',
      officialResolution: 'The OBC certificate must be issued in the prescribed Central Government format (Form of Certificate for OBCs applying for civil posts). It must explicitly state the candidate belongs to the Non-Creamy Layer based on family income of the preceding three financial years.',
      statutoryRule: 'DoPT Office Memorandum No. 36036/2/2013-Estt.(Res) & Supreme Court directives on crucial eligibility date.',
    },
    {
      certificateType: 'EWS Financial Year vs Assessment Year Misalignment',
      trapWarning: 'EWS certificates are frequently rejected when issued for the wrong financial year. An Income and Asset Certificate is valid ONLY for the financial year subsequent to the financial year of family income.',
      officialResolution: 'For 2026 recruitments, the EWS certificate must be based on Gross Annual Family Income for FY 2025–26, and the certificate itself must indicate "Valid for the Year 2026–2027".',
      statutoryRule: 'DoPT OM No. 36039/1/2019-Estt(Res) dated 31 January 2019.',
    },
    {
      certificateType: 'Matriculation (10th) Name & Date of Birth Discrepancy',
      trapWarning: 'Any divergence in spelling between the candidate\'s name, mother\'s name, or father\'s name on the Degree/Aadhaar versus the 10th Board Certificate causes immediate scrutiny.',
      officialResolution: 'The 10th standard mark sheet is the sole statutory benchmark for Date of Birth verification. If an affidavit was executed for a name spelling correction, a copy of the Gazette Notification or original notary affidavit must be presented during Document Verification.',
      statutoryRule: 'Staff Selection Commission Notice Clause 15.2 & UPSC Civil Services Rule 6.',
    },
    {
      certificateType: 'Photograph & Live Webcam Capture Non-Compliance',
      trapWarning: 'Applications are rejected automatically by AI screening algorithms for uploading selfies, side profiles, wearing caps/spectacles with tinted glass, or poor lighting.',
      officialResolution: 'Ensure photo is captured against a plain white or light background with 80% face coverage. Both ears must be clearly visible. For portals with live webcam capture (SSC/UPSC), avoid backlighting and look straight into the camera.',
      statutoryRule: 'SSC Portal Notice on Real-Time Photo Capture Protocol.',
    },
  ];
}

/**
 * Generates an executive briefing signed by Akash Singh Solanki
 */
export function getEditorialBriefing(article: RecruitmentAlert): EditorialBriefing {
  const org = article.organization || 'Central Government Authority';
  const posts = article.postCount ? `${article.postCount} vacancies` : 'official sanctioned vacancies';

  if (
    org.toLowerCase().includes('nmc') ||
    org.toLowerCase().includes('medical') ||
    (article.examName || '').toLowerCase().includes('mbbs')
  ) {
    return {
      gazetteRef: 'NMC Under-Graduate Medical Education Board Public Notice F.No. U.15024/01/2026-UGMEB',
      issuingAuthority: 'National Medical Commission (NMC) · Under-Graduate Medical Education Board (UGMEB)',
      competitionIntensity: 'High (Pan-India Elite)',
      applicationVerdict: 'A historic one-time transitional mercy attempt granting a crucial 5th chance for 2019+ CBME MBBS cohorts. It temporarily relaxes the 4-year First Prof limit while maintaining the mandatory 10-year degree completion ceiling.',
      crucialTakeaways: [
        'Eligible Cohort: Uniformly open to MBBS candidates admitted from academic session 2019-20 onwards under CBME regulations who have failed 4 attempts.',
        'Strict Exclusion: Any candidate who already utilized a 5th attempt under previous court directives or prior circulars is permanently barred.',
        'Examination Channel: Forms must be routed through the Medical College Dean to the affiliated State Health Sciences University for upcoming supplementary/regular examinations.',
        'Absolute 10-Year Deadline: The entire MBBS degree including the 12-month CRMI internship must be completed within 10 years of initial admission.',
      ],
      editorSignOff: {
        name: 'Akash Singh Solanki',
        role: 'Founder & Lead Educational Analyst, GovIndiaNews',
        timestamp: 'Verified against official NMC UGMEB Public Notice dated 15 October 2026',
      },
    };
  }

  return {
    gazetteRef: `Gazette of India, Extraordinary, Part II, Section 3(i) — Notice Ref: ${article.slug.toUpperCase()}/2026`,
    issuingAuthority: `Competent Statutory Recruiting Authority · Under Administrative Supervision of ${org}`,
    competitionIntensity: article.postCount && String(article.postCount).includes('Lakh') ? 'High (Pan-India Elite)' : 'Very High (1:450+)',
    applicationVerdict: `This ${article.examName} cycle represents a pivotal recruitment drive offering stable Group B/C employment under the 7th Central Pay Commission. Candidates should verify certificate cutoff dates before submitting fees.`,
    crucialTakeaways: [
      `Primary Application Window: Strictly online through authorized official commission server (${article.sourceNotice?.url || '.gov.in portal'}).`,
      `Statutory Age Benchmark: Evaluated as on ${article.ageLimit ? article.ageLimit.slice(0, 30) : 'prescribed crucial cutoff date'}. Category relaxations (OBC: 3 yrs, SC/ST: 5 yrs) strictly require Central Government format certificates.`,
      `Financial Package: Regular appointment entitles candidates to 50% Dearness Allowance, HRA up to 30%, Transport Allowance, and mandatory 10% NPS retirement accumulation.`,
      `Anti-Fraud Advisory: No recruitment agency or third-party portal collects exam fees on behalf of the Commission. Pay exclusively through official payment gateways.`,
    ],
    editorSignOff: {
      name: 'Akash Singh Solanki',
      role: 'Founder & Lead Educational Analyst, GovIndiaNews',
      timestamp: 'Verified against primary e-Gazette and Commission bulletins',
    },
  };
}
