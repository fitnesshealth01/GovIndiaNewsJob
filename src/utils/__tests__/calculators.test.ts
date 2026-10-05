import { describe, it, expect } from 'vitest';
import {
  calculate7thCpcSalary,
  calculateAgeOnCutoffDate,
  calculateNegativeMarking,
  getCategoryRelaxation,
  PAY_LEVEL_STARTING_BASIC,
} from '../calculatorLogic';

describe('7th CPC Salary Calculation Engine', () => {
  it('correctly calculates Level 7 (ASO/Inspector) in Class X city at 50% DA', () => {
    const res = calculate7thCpcSalary({
      payLevel: 7,
      basicPay: 44900,
      cityClass: 'X',
      daPercent: 50,
    });

    expect(res.basicPay).toBe(44900);
    expect(res.daAmount).toBe(22450); // 50% of 44,900
    expect(res.hraRate).toBe(0.30); // Revised to 30% when DA >= 50%
    expect(res.hraAmount).toBe(13470); // 30% of 44,900
    // Transport allowance for Level 7 in Class X = 3600 + 50% DA = 5400
    expect(res.transportAllowance).toBe(5400);
    expect(res.grossSalary).toBe(44900 + 22450 + 13470 + 5400); // 86,220

    // Deductions: NPS (10% of 67350) = 6735, CGEGIS Group B = 60, CGHS Level 7 = 650
    expect(res.npsEmployeeShare).toBe(6735);
    expect(res.cgegis).toBe(60);
    expect(res.cghs).toBe(650);
    expect(res.totalDeductions).toBe(6735 + 60 + 650); // 7445

    expect(res.netInHandSalary).toBe(86220 - 7445); // 78,775
  });

  it('correctly calculates Level 1 (MTS) in Class Z city at 50% DA', () => {
    const res = calculate7thCpcSalary({
      payLevel: 1,
      basicPay: 18000,
      cityClass: 'Z',
      daPercent: 50,
    });

    expect(res.basicPay).toBe(18000);
    expect(res.daAmount).toBe(9000);
    expect(res.hraRate).toBe(0.10); // 10% in Z city when DA >= 50%
    expect(res.hraAmount).toBe(1800);
    // Base TA for Level 1 in Z city = 900, DA on TA = 450 -> Total TA = 1350
    expect(res.transportAllowance).toBe(1350);
    expect(res.grossSalary).toBe(18000 + 9000 + 1800 + 1350); // 30,150

    expect(res.npsEmployeeShare).toBe(2700); // 10% of (18000 + 9000)
    expect(res.cgegis).toBe(30); // Group C
    expect(res.cghs).toBe(250); // Level 1-3
    expect(res.netInHandSalary).toBe(30150 - (2700 + 30 + 250)); // 27,170
  });

  it('verifies that starting basic pay matrix matches official 7th CPC schedule for all 18 levels', () => {
    expect(PAY_LEVEL_STARTING_BASIC[1]).toBe(18000);
    expect(PAY_LEVEL_STARTING_BASIC[2]).toBe(19900);
    expect(PAY_LEVEL_STARTING_BASIC[6]).toBe(35400);
    expect(PAY_LEVEL_STARTING_BASIC[10]).toBe(56100);
    expect(PAY_LEVEL_STARTING_BASIC[14]).toBe(144200);
    expect(PAY_LEVEL_STARTING_BASIC[18]).toBe(250000);
  });
});

describe('DOB to Cut-Off Date Age Calculator', () => {
  it('accurately computes years, months, and days for exact cutoff date', () => {
    const dob = new Date('2000-08-15');
    const cutoff = new Date('2026-08-01');

    const result = calculateAgeOnCutoffDate(dob, cutoff, 18, 27, 0);

    // From 2000-08-15 to 2026-08-01 is 25 years, 11 months, 17 days
    expect(result.years).toBe(25);
    expect(result.months).toBe(11);
    expect(result.isEligible).toBe(true); // < 27
  });

  it('correctly applies OBC +3 years statutory relaxation', () => {
    const dob = new Date('1997-01-01');
    const cutoff = new Date('2026-08-01');

    // Age is 29 years, 7 months
    const unreservedResult = calculateAgeOnCutoffDate(dob, cutoff, 18, 27, 0);
    expect(unreservedResult.isEligible).toBe(false); // exceeds 27

    const obcResult = calculateAgeOnCutoffDate(dob, cutoff, 18, 27, 3);
    expect(obcResult.isEligible).toBe(true); // within 27 + 3 = 30
  });
});

describe('Negative Marking Score Calculator', () => {
  it('correctly penalizes 1/4th negative marking (e.g. SSC CGL Tier-1 with 2 marks per question and 0.50 penalty)', () => {
    const res = calculateNegativeMarking({
      totalQuestions: 100,
      attempted: 80,
      correct: 60,
      marksPerQuestion: 2,
      negativePenaltyRatio: 0.25, // 0.50 / 2 = 0.25
    });

    expect(res.correctCount).toBe(60);
    expect(res.incorrectCount).toBe(20);
    expect(res.unattemptedCount).toBe(20);
    expect(res.grossMarks).toBe(120); // 60 * 2
    expect(res.penaltyDeductions).toBe(10); // 20 * 0.50
    expect(res.netFinalScore).toBe(110);
    expect(res.accuracyRate).toBe(75); // 60 / 80
  });

  it('correctly penalizes 1/3rd negative marking (e.g. RRB NTPC with 1 mark per question and 0.3333 penalty)', () => {
    const res = calculateNegativeMarking({
      totalQuestions: 100,
      attempted: 90,
      correct: 75,
      marksPerQuestion: 1,
      negativePenaltyRatio: 0.33333333,
    });

    expect(res.grossMarks).toBe(75);
    expect(res.penaltyDeductions).toBeCloseTo(5, 1); // 15 * (1/3) = 5.0
    expect(res.netFinalScore).toBeCloseTo(70, 1);
  });
});

describe('Fee and Category Relaxation Engine', () => {
  it('applies DoPT rules for OBC, SC, ST, and PwBD', () => {
    const obc = getCategoryRelaxation('OBC_NCL', 100);
    expect(obc.ageRelaxationYears).toBe(3);
    expect(obc.feeExempt).toBe(false);
    expect(obc.prescribedFee).toBe(100);

    const sc = getCategoryRelaxation('SC', 100);
    expect(sc.ageRelaxationYears).toBe(5);
    expect(sc.feeExempt).toBe(true);
    expect(sc.prescribedFee).toBe(0);

    const pwbdSc = getCategoryRelaxation('PWBD_SC_ST', 100);
    expect(pwbdSc.ageRelaxationYears).toBe(15);
    expect(pwbdSc.feeExempt).toBe(true);

    const esm = getCategoryRelaxation('ESM', 100);
    expect(esm.ageRelaxationYears).toBe(3);
    expect(esm.feeExempt).toBe(true);
  });
});
