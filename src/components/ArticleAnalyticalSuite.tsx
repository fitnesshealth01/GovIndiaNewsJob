import React, { useState } from 'react';
import {
  Calculator,
  TrendingUp,
  ShieldAlert,
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Building2,
  ChevronRight,
  Layers,
  MapPin,
  Clock,
  ArrowRight,
  FileCheck,
  Scale,
  Flame,
  UserCheck,
  HelpCircle,
} from 'lucide-react';
import { RecruitmentAlert } from '../data/gazetteData';
import {
  getStartingBasicPay,
  calculateAllCitySalaries,
  getCareerPromotionLadder,
  getDocumentVerificationTraps,
  getEditorialBriefing,
  CitySalaryTier,
} from '../utils/articleEditorialEnhancer';
import {
  calculate7thCpcSalary,
  PAY_LEVEL_STARTING_BASIC,
  calculateNegativeMarking,
} from '../utils/calculatorLogic';
import { NavLink } from './NavLink';

interface ArticleAnalyticalSuiteProps {
  article: RecruitmentAlert;
  onNavigate: (path: string) => void;
  // Optional flag to suppress embedded calculator if template embeds its own
  hideCalculator?: boolean;
}

export const ArticleAnalyticalSuite: React.FC<ArticleAnalyticalSuiteProps> = ({
  article,
  onNavigate,
  hideCalculator = false,
}) => {
  // Analytical Modules
  const startingBasic = getStartingBasicPay(article.salary, article.salaryArithmetic?.basicPay);
  const citySalaries = calculateAllCitySalaries(startingBasic);
  const careerLadder = getCareerPromotionLadder(article);
  const dvTraps = getDocumentVerificationTraps(article);
  const briefing = getEditorialBriefing(article);

  // Embedded Salary Calculator State
  const initialLevel = React.useMemo(() => {
    const match = (article.salary || '').match(/level[- ]?(\d+)/i);
    return match ? parseInt(match[1], 10) : 7;
  }, [article.salary]);

  const [calcPayLevel, setCalcPayLevel] = useState<number>(initialLevel);
  const [calcCityClass, setCalcCityClass] = useState<'X' | 'Y' | 'Z'>('X');
  const [calcBasicPay, setCalcBasicPay] = useState<number>(() => PAY_LEVEL_STARTING_BASIC[initialLevel] || startingBasic);

  const handleCalcLevelChange = (lvl: number) => {
    setCalcPayLevel(lvl);
    setCalcBasicPay(PAY_LEVEL_STARTING_BASIC[lvl] || 35400);
  };

  const interactiveSalary = calculate7thCpcSalary({
    payLevel: calcPayLevel,
    basicPay: calcBasicPay,
    cityClass: calcCityClass,
    daPercent: 50,
  });

  // Embedded Exam Marking Calculator State (for Admit Cards, Answer Keys, Results, etc.)
  const isExamContext =
    article.category === 'admit-card' ||
    article.category === 'answer-key' ||
    article.category === 'result' ||
    article.category === 'cut-off';

  const [totalQuestions, setTotalQuestions] = useState<number>(100);
  const [attempted, setAttempted] = useState<number>(85);
  const [wrongAnswers, setWrongAnswers] = useState<number>(12);
  const [penaltyScheme, setPenaltyScheme] = useState<number>(0.25); // 0.25, 0.33, 0.50

  const markingResult = calculateNegativeMarking({
    totalQuestions,
    attempted,
    correct: Math.max(0, attempted - wrongAnswers),
    marksPerQuestion: 2,
    negativePenaltyRatio: penaltyScheme,
  });

  return (
    <div className="space-y-8 my-8 border-t border-slate-200 pt-8">
      {/* 1. EXPERT INSIGHTS & EXECUTIVE BRIEFING */}
      <section className="bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-slate-50 border border-blue-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-200/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-600 text-white rounded-lg shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 block">
                Editorial Board Dossier
              </span>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Executive Insights &amp; Strategic Cadre Briefing
              </h3>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-white text-blue-900 border border-blue-300 rounded-full text-[11px] font-bold shadow-2xs">
            {briefing.competitionIntensity}
          </span>
        </div>

        {/* Gazette & Authority Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white/70 p-3.5 rounded-xl border border-blue-100">
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">Gazette Authorization:</span>
            <span className="font-semibold text-slate-900 font-mono text-[11px]">{briefing.gazetteRef}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">Administrative Authority:</span>
            <span className="font-semibold text-slate-900 text-[11px]">{briefing.issuingAuthority}</span>
          </div>
        </div>

        {/* Lead Analyst Verdict */}
        <div className="p-4 bg-white rounded-xl border border-blue-100 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 uppercase tracking-wide text-[11px] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-700" />
              <span>Lead Educational Analyst Verdict</span>
            </span>
            <span className="text-[11px] text-slate-500 font-serif italic">Signed: {briefing.editorSignOff.name}</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            {briefing.applicationVerdict}
          </p>
        </div>

        {/* 4 Crucial Takeaways */}
        <div className="space-y-2 pt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block">
            Critical Takeaways for Candidates:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {briefing.crucialTakeaways.map((point, idx) => (
              <div key={idx} className="p-3 bg-white/80 rounded-xl border border-blue-100/80 flex items-start gap-2 text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                <span className="leading-snug">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. EMBEDDED CONTEXTUAL SMART CALCULATOR */}
      {!hideCalculator && (
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-md space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-600/30 rounded-xl border border-blue-500/40 text-blue-300">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">
                  Interactive Contextual Utility
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {isExamContext
                    ? 'Exam Score & Negative Marking Simulator'
                    : 'Interactive 7th CPC In-Hand Salary Calculator'}
                </h3>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-[11px] font-bold">
              Live Software Engine
            </span>
          </div>

          {isExamContext ? (
            /* CBT Negative Marking & Score Predictor Simulator */
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Simulate your examination marks under standard commission negative deduction rules (SSC, RRB, UPSC). Adjust your attempts and projected errors below:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="text-slate-400 text-[11px] block mb-1">Total Questions:</label>
                  <select
                    value={totalQuestions}
                    onChange={(e) => setTotalQuestions(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono cursor-pointer"
                  >
                    <option value={100}>100 Questions (Tier 1)</option>
                    <option value={130}>130 Questions (Tier 2)</option>
                    <option value={150}>150 Questions (State PSC)</option>
                    <option value={200}>200 Questions (Full Paper)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 text-[11px] block mb-1">Questions Attempted ({attempted}):</label>
                  <input
                    type="range"
                    min="1"
                    max={totalQuestions}
                    value={attempted}
                    onChange={(e) => setAttempted(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer mt-1"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-[11px] block mb-1">Projected Wrong Answers ({wrongAnswers}):</label>
                  <input
                    type="range"
                    min="0"
                    max={attempted}
                    value={wrongAnswers}
                    onChange={(e) => setWrongAnswers(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer mt-1"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-[11px] block mb-1">Negative Penalty Rule:</label>
                  <select
                    value={penaltyScheme}
                    onChange={(e) => setPenaltyScheme(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono cursor-pointer"
                  >
                    <option value={0.25}>0.25 (1/4th Penalty)</option>
                    <option value={0.33}>0.33 (1/3rd Penalty)</option>
                    <option value={0.50}>0.50 (1/2 Penalty - SSC CGL)</option>
                  </select>
                </div>
              </div>

              {/* Simulation Result Output Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Correct Answers</span>
                  <span className="text-lg font-extrabold text-emerald-400 mt-0.5 block">{attempted - wrongAnswers}</span>
                  <span className="text-[10px] text-slate-400">+{(attempted - wrongAnswers) * 2} raw marks</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Negative Penalty</span>
                  <span className="text-lg font-extrabold text-rose-400 mt-0.5 block">-{markingResult.penaltyDeductions.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-400">{wrongAnswers} incorrect</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Accuracy Rate</span>
                  <span className="text-lg font-extrabold text-blue-300 mt-0.5 block">{markingResult.accuracyRate.toFixed(1)}%</span>
                  <span className="text-[10px] text-slate-400">{attempted} attempts</span>
                </div>

                <div className="p-3 bg-blue-600/30 rounded-xl border border-blue-500/40">
                  <span className="text-[10px] text-blue-200 uppercase tracking-wider block">Net Projected Score</span>
                  <span className="text-2xl font-black text-white mt-0.5 block">{markingResult.netFinalScore.toFixed(2)}</span>
                  <span className="text-[10px] text-blue-200">Out of {totalQuestions * 2} marks</span>
                </div>
              </div>
            </div>
          ) : (
            /* 7th CPC Salary Calculator Simulator */
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Simulate monthly earnings and take-home pay across 7th Central Pay Commission Pay Levels (1 to 14) and posting cities:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-slate-400 text-[11px] block mb-1">Select 7th CPC Pay Level:</label>
                  <select
                    value={calcPayLevel}
                    onChange={(e) => handleCalcLevelChange(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((lvl) => (
                      <option key={lvl} value={lvl}>
                        Pay Level {lvl} (Starting Basic: ₹{PAY_LEVEL_STARTING_BASIC[lvl]?.toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 text-[11px] block mb-1">Posting City Classification:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['X', 'Y', 'Z'] as const).map((cls) => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => setCalcCityClass(cls)}
                        className={`p-2 rounded-lg text-center font-bold text-xs cursor-pointer border transition-all ${
                          calcCityClass === cls
                            ? 'bg-blue-600 border-blue-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        Class {cls}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 text-[11px] block mb-1">Starting Basic Pay:</label>
                  <div className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono font-bold text-sm">
                    ₹{calcBasicPay.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Calculated Salary Output Breakdown */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">DA (50%)</span>
                  <strong className="text-sm font-mono text-emerald-400">+₹{interactiveSalary.daAmount.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">HRA ({Math.round(interactiveSalary.hraRate * 100)}%)</span>
                  <strong className="text-sm font-mono text-emerald-400">+₹{interactiveSalary.hraAmount.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">NPS Deduction (10%)</span>
                  <strong className="text-sm font-mono text-rose-400">-₹{interactiveSalary.npsEmployeeShare.toLocaleString('en-IN')}</strong>
                </div>
                <div className="bg-emerald-500/20 p-2 rounded-lg border border-emerald-400/30">
                  <span className="text-[10px] text-emerald-200 uppercase font-bold block">Net In-Hand</span>
                  <strong className="text-base font-bold text-emerald-300">₹{interactiveSalary.netInHandSalary.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 3. CLASS X, Y, AND Z SALARY SLIP BREAKDOWN */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900">
              Official 7th CPC In-Hand Salary Slips (City Class X, Y &amp; Z)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">DA Rate: 50% · NPS: 10%</span>
        </div>

        <p className="text-xs text-slate-600">
          Statutory breakdown of monthly gross earnings and net take-home pay credited to bank accounts across major metropolitan regions, state capitals, and district postings:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {citySalaries.map((tier) => (
            <div
              key={tier.cityClass}
              className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-1.5 border-b border-slate-100 pb-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[10px] uppercase">
                    Class {tier.cityClass} Cities
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700">HRA: {tier.hraRatePct}%</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{tier.cityName}</h4>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-700">
                  <span>Basic Pay:</span>
                  <strong className="text-slate-900">₹{tier.basicPay.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Dearness Allowance (50%):</span>
                  <strong className="text-slate-900">+₹{tier.daAmount.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>HRA ({tier.hraRatePct}%):</span>
                  <strong className="text-slate-900">+₹{tier.hraAmount.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Transport Allowance:</span>
                  <strong className="text-slate-900">+₹{tier.transportAllowance.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between text-slate-900 font-bold border-t border-slate-100 pt-1">
                  <span>Gross Monthly:</span>
                  <span>₹{tier.grossMonthly.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-rose-700 pt-0.5">
                  <span>NPS &amp; CGHS Deductions:</span>
                  <span>-₹{tier.totalDeductions.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-center">
                <span className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider block">
                  Net In-Hand Bank Take-Home
                </span>
                <span className="text-xl font-extrabold text-emerald-900 font-sans mt-0.5 block">
                  ₹{tier.netInHandMonthly.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-emerald-700"> / month</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 15-YEAR HIERARCHICAL CAREER PROMOTION LADDER */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900">
              15-Year Cadre Hierarchy &amp; Career Progression Ladder
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">DoPT Cadre Rules</span>
        </div>

        <p className="text-xs text-slate-600">
          Typical chronological service career advancement through Departmental Promotion Committees (DPC) and Limited Departmental Competitive Exams (LDCE):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {careerLadder.map((stage) => (
            <div
              key={stage.stepNumber}
              className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-bold">
                    Stage {stage.stepNumber}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">{stage.yearsOfService}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs line-clamp-2 leading-snug">{stage.designation}</h4>
                <div className="text-[11px] font-mono text-blue-800 font-semibold">{stage.payLevel}</div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                <div className="text-[10px] font-bold text-slate-700 uppercase">{stage.cadreClassification}</div>
                <p className="line-clamp-3 leading-relaxed">{stage.keyResponsibilities}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DOCUMENT VERIFICATION & CERTIFICATE DISQUALIFICATION TRAPS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <h3 className="text-base font-bold text-slate-900">
              Document Verification Traps &amp; Disqualification Pitfalls
            </h3>
          </div>
          <span className="text-[11px] text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            High Rejection Vector
          </span>
        </div>

        <p className="text-xs text-slate-600">
          Statutory verification pitfalls identified by commission scrutiny panels. Failure to align certificate formats causes immediate cancellation of candidature:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dvTraps.map((trap, idx) => (
            <div
              key={idx}
              className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2.5 text-xs text-slate-800"
            >
              <div className="flex items-center gap-2 text-rose-900 font-bold text-xs border-b border-rose-200/80 pb-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>{trap.certificateType}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-800 block">The Rejection Trap:</span>
                <p className="text-rose-950 leading-relaxed font-sans mt-0.5">{trap.trapWarning}</p>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-rose-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">Official Resolution Protocol:</span>
                <p className="text-slate-700 text-[11px] leading-relaxed">{trap.officialResolution}</p>
              </div>
              <div className="text-[10px] text-slate-500 font-mono italic">
                Statutory Reference: {trap.statutoryRule}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
