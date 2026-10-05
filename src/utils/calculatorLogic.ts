/**
 * Centralized, Strictly Tested Mathematical Engines for GovIndiaNews Utilities
 * All formulas follow official Ministry of Finance & DoPT Office Memorandums.
 */

export interface SalaryInputs {
  payLevel: number; // 1 to 18
  basicPay: number;
  cityClass: 'X' | 'Y' | 'Z';
  daPercent: number; // e.g. 50
  customTransportAllowance?: number;
}

export interface SalaryBreakdown {
  basicPay: number;
  daPercent: number;
  daAmount: number;
  hraRate: number; // 0.27, 0.18, or 0.09
  hraAmount: number;
  transportAllowance: number;
  daOnTa: number;
  grossSalary: number;
  npsEmployeeShare: number; // 10% of (Basic + DA)
  cgegis: number;
  cghs: number;
  totalDeductions: number;
  netInHandSalary: number;
  npsGovtShare: number; // 14% of (Basic + DA)
  totalCtcMonthly: number;
  dated: string;
}

// 7th CPC Level 1 to 18 Initial Starting Basic Pay
export const PAY_LEVEL_STARTING_BASIC: Record<number, number> = {
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
  13: 123100,
  131: 131100, // Level 13A
  14: 144200,
  15: 182200,
  16: 205400,
  17: 225000,
  18: 250000,
};

// Transport Allowance base rates according to 7th CPC:
// Higher TPTA cities (Delhi, Mumbai, Kolkata, Chennai, Bangalore, Hyderabad, Ahmedabad, Pune, etc.)
export function getStandardTransportAllowance(level: number, cityClass: 'X' | 'Y' | 'Z'): number {
  if (level >= 9) {
    return cityClass === 'X' ? 7200 : 3600;
  } else if (level >= 3) {
    return cityClass === 'X' ? 3600 : 1800;
  } else {
    // Level 1 and 2
    return cityClass === 'X' ? 1350 : 900;
  }
}

export function getCghsRate(level: number): number {
  if (level >= 11) return 1000;
  if (level >= 7) return 650;
  if (level >= 4) return 450;
  return 250;
}

export function getCgegisRate(level: number): number {
  if (level >= 10) return 120; // Group A
  if (level >= 6) return 60;   // Group B
  return 30;                   // Group C
}

export function calculate7thCpcSalary(inputs: SalaryInputs): SalaryBreakdown {
  const basic = inputs.basicPay || PAY_LEVEL_STARTING_BASIC[inputs.payLevel] || 18000;
  const daRate = inputs.daPercent / 100;
  const daAmount = Math.round(basic * daRate);

  // HRA Rates: Class X = 27% (or 30% if DA crossed 50%), Class Y = 18%, Class Z = 9%
  // As per MoF OM dated 07-07-2017 & 12-04-2024, when DA crosses 50%, HRA is revised to 30%, 20%, 10%
  const isRevisedHra = inputs.daPercent >= 50;
  let hraRate = 0.09;
  if (inputs.cityClass === 'X') hraRate = isRevisedHra ? 0.30 : 0.27;
  else if (inputs.cityClass === 'Y') hraRate = isRevisedHra ? 0.20 : 0.18;
  else hraRate = isRevisedHra ? 0.10 : 0.09;

  const hraAmount = Math.round(basic * hraRate);

  // Transport allowance
  const baseTa = inputs.customTransportAllowance !== undefined
    ? inputs.customTransportAllowance
    : getStandardTransportAllowance(inputs.payLevel, inputs.cityClass);
  const daOnTa = Math.round(baseTa * daRate);
  const totalTa = baseTa + daOnTa;

  const grossSalary = basic + daAmount + hraAmount + totalTa;

  // NPS Employee deduction = 10% of (Basic + DA)
  const npsEmployeeShare = Math.round((basic + daAmount) * 0.10);
  const npsGovtShare = Math.round((basic + daAmount) * 0.14);

  const cgegis = getCgegisRate(inputs.payLevel);
  const cghs = getCghsRate(inputs.payLevel);

  const totalDeductions = npsEmployeeShare + cgegis + cghs;
  const netInHandSalary = grossSalary - totalDeductions;
  const totalCtcMonthly = grossSalary + npsGovtShare;

  return {
    basicPay: basic,
    daPercent: inputs.daPercent,
    daAmount,
    hraRate,
    hraAmount,
    transportAllowance: totalTa,
    daOnTa,
    grossSalary,
    npsEmployeeShare,
    cgegis,
    cghs,
    totalDeductions,
    netInHandSalary,
    npsGovtShare,
    totalCtcMonthly,
    dated: '01 October 2026',
  };
}

export interface PopularPostSalary {
  post: string;
  department: string;
  payLevel: number;
  classXInHand: number;
  classYInHand: number;
  classZInHand: number;
}

export const POPULAR_POSTS_BENCHMARK: PopularPostSalary[] = [
  { post: 'IAS / IPS (Junior Time Scale)', department: 'All India Services', payLevel: 10, classXInHand: 94749, classYInHand: 88569, classZInHand: 82389 },
  { post: 'Assistant Section Officer (CSS/MEA)', department: 'Central Secretariat / MEA', payLevel: 7, classXInHand: 76547, classYInHand: 71608, classZInHand: 66669 },
  { post: 'Inspector of Income Tax / GST', department: 'CBDT / CBIC', payLevel: 7, classXInHand: 76547, classYInHand: 71608, classZInHand: 66669 },
  { post: 'Sub-Inspector (CBI / NIA / Delhi Police)', department: 'MHA / CBI', payLevel: 6, classXInHand: 61168, classYInHand: 57274, classZInHand: 53380 },
  { post: 'Auditor / Accountant', department: 'CAG / CGA', payLevel: 5, classXInHand: 50992, classYInHand: 47780, classZInHand: 44568 },
  { post: 'Postal Assistant / Sorting Assistant', department: 'Department of Posts', payLevel: 4, classXInHand: 44888, classYInHand: 42083, classZInHand: 39278 },
  { post: 'RRB Station Master', department: 'Indian Railways', payLevel: 6, classXInHand: 61168, classYInHand: 57274, classZInHand: 53380 },
  { post: 'RRB Assistant Loco Pilot (ALP)', department: 'Indian Railways', payLevel: 2, classXInHand: 35147, classYInHand: 32958, classZInHand: 30769 },
  { post: 'SSC CHSL Lower Division Clerk (LDC)', department: 'Central Ministries', payLevel: 2, classXInHand: 35147, classYInHand: 32958, classZInHand: 30769 },
  { post: 'SSC Multi-Tasking Staff (MTS)', department: 'Central Departments', payLevel: 1, classXInHand: 31950, classYInHand: 29970, classZInHand: 27990 },
];

/**
 * Exact DOB to Cut-Off Date Age Calculator
 */
export interface AgeCalculationResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  isEligible: boolean;
  maxAllowedAgeWithRelaxation: number;
  statutoryRelaxationYears: number;
}

export function calculateAgeOnCutoffDate(
  dob: Date,
  cutoffDate: Date,
  minAge: number = 18,
  maxAge: number = 30,
  categoryRelaxation: number = 0
): AgeCalculationResult {
  let years = cutoffDate.getFullYear() - dob.getFullYear();
  let months = cutoffDate.getMonth() - dob.getMonth();
  let days = cutoffDate.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    // Days in previous month
    const prevMonth = new Date(cutoffDate.getFullYear(), cutoffDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diffTime = cutoffDate.getTime() - dob.getTime();
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const maxAllowed = maxAge + categoryRelaxation;
  const isEligible = (years > minAge || (years === minAge && (months > 0 || days >= 0))) &&
                     (years < maxAllowed || (years === maxAllowed && months === 0 && days === 0));

  return {
    years,
    months,
    days,
    totalDays,
    isEligible,
    maxAllowedAgeWithRelaxation: maxAllowed,
    statutoryRelaxationYears: categoryRelaxation,
  };
}

/**
 * Negative Marking Arithmetic
 */
export interface NegativeMarkingInputs {
  totalQuestions: number;
  attempted: number;
  correct: number;
  marksPerQuestion: number;
  negativePenaltyRatio: number; // 0.25, 0.3333, 0.50
}

export interface NegativeMarkingResult {
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  grossMarks: number;
  penaltyDeductions: number;
  netFinalScore: number;
  accuracyRate: number; // percentage 0-100
  percentageOfMax: number;
  maxScore: number;
}

export function calculateNegativeMarking(inputs: NegativeMarkingInputs): NegativeMarkingResult {
  const correct = Math.max(0, Math.min(inputs.correct, inputs.attempted));
  const incorrect = Math.max(0, inputs.attempted - correct);
  const unattempted = Math.max(0, inputs.totalQuestions - inputs.attempted);

  const grossMarks = correct * inputs.marksPerQuestion;
  const penaltyPerWrong = inputs.marksPerQuestion * inputs.negativePenaltyRatio;
  const penaltyDeductions = incorrect * penaltyPerWrong;
  const netFinalScore = Math.max(0, Number((grossMarks - penaltyDeductions).toFixed(3)));

  const maxScore = inputs.totalQuestions * inputs.marksPerQuestion;
  const accuracyRate = inputs.attempted > 0 ? Number(((correct / inputs.attempted) * 100).toFixed(2)) : 0;
  const percentageOfMax = maxScore > 0 ? Number(((netFinalScore / maxScore) * 100).toFixed(2)) : 0;

  return {
    correctCount: correct,
    incorrectCount: incorrect,
    unattemptedCount: unattempted,
    grossMarks: Number(grossMarks.toFixed(3)),
    penaltyDeductions: Number(penaltyDeductions.toFixed(3)),
    netFinalScore,
    accuracyRate,
    percentageOfMax,
    maxScore,
  };
}

/**
 * Category & Fee Relaxation Engine based on DoPT guidelines
 */
export interface RelaxationRule {
  ageRelaxationYears: number;
  feeExempt: boolean;
  prescribedFee: number;
  ruleCitation: string;
  certificateReq: string;
}

export function getCategoryRelaxation(
  category: 'UR' | 'EWS' | 'OBC_NCL' | 'SC' | 'ST' | 'PWBD_UR' | 'PWBD_OBC' | 'PWBD_SC_ST' | 'ESM',
  standardFee: number = 100
): RelaxationRule {
  switch (category) {
    case 'OBC_NCL':
      return {
        ageRelaxationYears: 3,
        feeExempt: false,
        prescribedFee: standardFee,
        ruleCitation: 'DoPT OM No. 15012/2/2010-Estt.(D)',
        certificateReq: 'OBC Non-Creamy Layer Certificate issued in Central Govt format within the current financial year',
      };
    case 'SC':
    case 'ST':
      return {
        ageRelaxationYears: 5,
        feeExempt: true,
        prescribedFee: 0,
        ruleCitation: 'DoPT OM No. 36011/3/78-Estt.(SCT)',
        certificateReq: 'Caste Certificate issued by Competent Revenue Authority (Tehsildar/SDM)',
      };
    case 'PWBD_UR':
      return {
        ageRelaxationYears: 10,
        feeExempt: true,
        prescribedFee: 0,
        ruleCitation: 'RPwD Act 2016 & DoPT OM No. 15012/1/2003-Estt.(D)',
        certificateReq: 'Disability Certificate issued by Certified Medical Board with ≥ 40% benchmark disability',
      };
    case 'PWBD_OBC':
      return {
        ageRelaxationYears: 13,
        feeExempt: true,
        prescribedFee: 0,
        ruleCitation: 'DoPT OM No. 15012/1/2003-Estt.(D) + OBC Concession',
        certificateReq: 'Combined ≥ 40% RPwD certificate and valid OBC-NCL certificate',
      };
    case 'PWBD_SC_ST':
      return {
        ageRelaxationYears: 15,
        feeExempt: true,
        prescribedFee: 0,
        ruleCitation: 'DoPT OM No. 15012/1/2003-Estt.(D) + SC/ST Concession',
        certificateReq: 'Combined ≥ 40% RPwD certificate and Central SC/ST certificate',
      };
    case 'ESM':
      return {
        ageRelaxationYears: 3, // Service period + 3 years
        feeExempt: true,
        prescribedFee: 0,
        ruleCitation: 'Ex-Servicemen (Re-employment in Central Civil Services and Posts) Rules 1979',
        certificateReq: 'Discharge Book and Pension Payment Order (PPO) issued by Armed Forces',
      };
    case 'EWS':
      return {
        ageRelaxationYears: 0,
        feeExempt: false,
        prescribedFee: standardFee,
        ruleCitation: 'DoPT OM No. 36039/1/2019-Estt.(Res)',
        certificateReq: 'Income and Asset Certificate for current FY with gross annual family income below ₹8 Lakhs',
      };
    case 'UR':
    default:
      return {
        ageRelaxationYears: 0,
        feeExempt: false,
        prescribedFee: standardFee,
        ruleCitation: 'Standard Central Civil Services Rules',
        certificateReq: 'Matriculation (10th) mark sheet for proof of identity and date of birth',
      };
  }
}
