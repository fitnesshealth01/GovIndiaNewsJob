import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Briefcase,
  Calculator,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock,
  Award,
  Search,
  RotateCcw,
  Building2,
  ArrowRight,
  Flame,
  Info,
} from 'lucide-react';
import { NavLink } from '../NavLink';

export interface CareerExamMatch {
  examName: string;
  conductingBody: string;
  entryStage: 'After 10th' | 'After 12th' | 'After Graduation';
  minAge: number;
  maxAgeGen: number;
  qualificationRequired: string[];
  sector: 'defence' | 'civil' | 'ministry' | 'police' | 'railway' | 'banking';
  sectorLabel: string;
  payLevel: string;
  startingBasic: number;
  monthlyTakeHomeEstimate: string;
  selectionPhases: string;
  curiosityHook: string;
  targetLink: string;
  badge: string;
}

const CAREER_EXAM_DATABASE: CareerExamMatch[] = [
  {
    examName: 'National Defence Academy (NDA & NA)',
    conductingBody: 'Union Public Service Commission (UPSC)',
    entryStage: 'After 12th',
    minAge: 16.5,
    maxAgeGen: 19.5,
    qualificationRequired: ['12th-pcm', '12th-pcb', '12th-arts-comm'],
    sector: 'defence',
    sectorLabel: 'Armed Forces (Officer Cadre)',
    payLevel: 'Pay Level 10 (Lieutenant / Flying Officer)',
    startingBasic: 56100,
    monthlyTakeHomeEstimate: '₹95,000 – ₹1,15,000 (with MSP & Flying/Field Pay)',
    selectionPhases: 'UPSC Written Exam (Maths + GAT) + 5-Day SSB Interview + Medicals',
    curiosityHook: 'Commissioned as a Class-A Gazetted Officer at age 21 with lifetime prestige, free furnished housing, and military perks.',
    targetLink: '/blog/nda-vs-cds-vs-afcat-ssb-selection-secrets-officer-salary-reality',
    badge: 'Premier Officer Entry',
  },
  {
    examName: 'Combined Higher Secondary Level (SSC CHSL)',
    conductingBody: 'Staff Selection Commission (SSC)',
    entryStage: 'After 12th',
    minAge: 18,
    maxAgeGen: 27,
    qualificationRequired: ['12th-pcm', '12th-pcb', '12th-arts-comm', 'engineering', 'general-grad', 'medical'],
    sector: 'ministry',
    sectorLabel: 'Central Ministries & Secretariats',
    payLevel: 'Pay Level 4 / 5 (Data Entry Operator & LDC)',
    startingBasic: 25500,
    monthlyTakeHomeEstimate: '₹48,000 – ₹54,000 (Class X Metro Cities)',
    selectionPhases: 'Tier 1 Computer Based Exam + Tier 2 Objective/Typing Test',
    curiosityHook: 'Desk job in Central Ministries (Cabinet Secretariat, Home Affairs, Defence) straight after Class 12 with full study leave permissions.',
    targetLink: '/blog/skip-college-for-central-govt-jobs-after-12th-salary-reality-check',
    badge: 'High Intake',
  },
  {
    examName: 'Combined Defence Services (UPSC CDS)',
    conductingBody: 'Union Public Service Commission (UPSC)',
    entryStage: 'After Graduation',
    minAge: 19,
    maxAgeGen: 24,
    qualificationRequired: ['engineering', 'general-grad', 'medical'],
    sector: 'defence',
    sectorLabel: 'Armed Forces (IMA / OTA / INA / AFA)',
    payLevel: 'Pay Level 10 (Captain/Major Career Track)',
    startingBasic: 56100,
    monthlyTakeHomeEstimate: '₹1,02,000 – ₹1,20,000 (Inclusive of MSP)',
    selectionPhases: 'Written Exam (English, GK, Maths) + 5-Day SSB Interview',
    curiosityHook: 'Direct entry for college graduates into Indian Military Academy (IMA Dehradun) or Officers Training Academy (OTA Chennai).',
    targetLink: '/blog/nda-vs-cds-vs-afcat-ssb-selection-secrets-officer-salary-reality',
    badge: 'Graduate Officer',
  },
  {
    examName: 'Air Force Common Admission Test (AFCAT)',
    conductingBody: 'Indian Air Force (IAF)',
    entryStage: 'After Graduation',
    minAge: 20,
    maxAgeGen: 24,
    qualificationRequired: ['engineering', '12th-pcm-grad'],
    sector: 'defence',
    sectorLabel: 'Indian Air Force (Flying / Ground Duty)',
    payLevel: 'Pay Level 10 (Flying Officer)',
    startingBasic: 56100,
    monthlyTakeHomeEstimate: '₹1,15,000 – ₹1,35,000 (Flying Branch Package)',
    selectionPhases: 'AFCAT Online Test + AFSB Psychological Interview + CPSS (for Pilots)',
    curiosityHook: 'Pilot supersonic fighter jets or lead aerospace logistics engineering with subsidized officer lifestyle and premier club memberships.',
    targetLink: '/blog/nda-vs-cds-vs-afcat-ssb-selection-secrets-officer-salary-reality',
    badge: 'Aviation Elite',
  },
  {
    examName: 'Combined Graduate Level (SSC CGL)',
    conductingBody: 'Staff Selection Commission (SSC)',
    entryStage: 'After Graduation',
    minAge: 18,
    maxAgeGen: 30,
    qualificationRequired: ['engineering', 'general-grad', 'medical'],
    sector: 'ministry',
    sectorLabel: 'Central Executive & Tax Inspectorates',
    payLevel: 'Pay Level 7 / 8 (GST, Income Tax Inspector & ASO)',
    startingBasic: 44900,
    monthlyTakeHomeEstimate: '₹78,000 – ₹88,000 (Class X Metro Cities)',
    selectionPhases: 'Tier 1 Computer Test + Tier 2 Merit Test + Data Entry/Doc Verification',
    curiosityHook: 'The most popular alternative to UPSC: fixed metro postings, raid authority, zero midnight political calls, and predictable promotions.',
    targetLink: '/blog/upsc-ias-vs-ssc-cgl-inspector-brutal-salary-power-workload-reality',
    badge: 'Top Choice',
  },
  {
    examName: 'Civil Services Examination (UPSC CSE)',
    conductingBody: 'Union Public Service Commission (UPSC)',
    entryStage: 'After Graduation',
    minAge: 21,
    maxAgeGen: 32,
    qualificationRequired: ['engineering', 'general-grad', 'medical'],
    sector: 'civil',
    sectorLabel: 'All India Services (IAS / IPS / IFS / IRS)',
    payLevel: 'Pay Level 10 (Junior Scale SDM / ASP)',
    startingBasic: 56100,
    monthlyTakeHomeEstimate: '₹92,000 – ₹1,05,000 + Official Bungalow & Staff',
    selectionPhases: 'Preliminary (GS + CSAT) + 9 Descriptive Mains Papers + Personality Interview',
    curiosityHook: 'Pinnacle administrative power in India: head entire districts, command police forces, or represent India diplomatically abroad.',
    targetLink: '/blog/upsc-ias-vs-ssc-cgl-inspector-brutal-salary-power-workload-reality',
    badge: 'Apex Prestige',
  },
  {
    examName: 'Railway Assistant Loco Pilot (RRB ALP)',
    conductingBody: 'Railway Recruitment Boards (RRB)',
    entryStage: 'After 10th',
    minAge: 18,
    maxAgeGen: 30,
    qualificationRequired: ['10th-iti', 'engineering', '12th-pcm'],
    sector: 'railway',
    sectorLabel: 'Indian Railways (Operations)',
    payLevel: 'Pay Level 2 + Running Allowances',
    startingBasic: 19900,
    monthlyTakeHomeEstimate: '₹46,000 – ₹62,000 (Kilometer Mileage Allowances)',
    selectionPhases: 'CBT 1 + CBT 2 (Technical) + CBAT Aptitude + Medical A-1 Standard',
    curiosityHook: 'Running kilometer allowances double the base salary, making ALP the highest-earning Group C technical job in government service.',
    targetLink: '/exams/rrb-alp',
    badge: 'High Mileage Pay',
  },
  {
    examName: 'Delhi Police Executive Constable',
    conductingBody: 'Staff Selection Commission (SSC)',
    entryStage: 'After 12th',
    minAge: 18,
    maxAgeGen: 25,
    qualificationRequired: ['12th-pcm', '12th-pcb', '12th-arts-comm', 'engineering', 'general-grad'],
    sector: 'police',
    sectorLabel: 'Capital Law Enforcement (Central Home Ministry)',
    payLevel: 'Pay Level 3 (Basic: ₹21,700 – ₹69,100)',
    startingBasic: 21700,
    monthlyTakeHomeEstimate: '₹42,000 – ₹48,000 (Delhi Metro Postings)',
    selectionPhases: 'Computer Examination + 1600m Physical Endurance & Measurement (PE&MT)',
    curiosityHook: 'Stationed exclusively in the National Capital with Central Government Dearness Allowance and medical treatment under CGHS.',
    targetLink: '/guides/army-1600-meter-running-time-agniveer-pft-standards',
    badge: 'Metro Police',
  },
  {
    examName: 'Probationary Officer (IBPS PO & SBI PO)',
    conductingBody: 'Institute of Banking Personnel Selection & State Bank of India',
    entryStage: 'After Graduation',
    minAge: 20,
    maxAgeGen: 30,
    qualificationRequired: ['engineering', 'general-grad', 'medical'],
    sector: 'banking',
    sectorLabel: 'Public Sector Commercial Banks',
    payLevel: 'Junior Management Grade Scale-I',
    startingBasic: 48480,
    monthlyTakeHomeEstimate: '₹72,000 – ₹84,000 + Leased Accommodation & Petrol',
    selectionPhases: 'Prelims + Mains (Objective + Descriptive) + Group Discussion & Interview',
    curiosityHook: 'Rapid promotions: reach Assistant General Manager (AGM) by age 38 with leased city apartments, petrol reimbursements, and concessional loans.',
    targetLink: '/exams/ibps-po',
    badge: 'Banking Fast Track',
  },
  {
    examName: 'Multi-Tasking Staff & Havaldar (SSC MTS)',
    conductingBody: 'Staff Selection Commission (SSC)',
    entryStage: 'After 10th',
    minAge: 18,
    maxAgeGen: 25,
    qualificationRequired: ['10th', '12th-pcm', '12th-pcb', '12th-arts-comm', 'engineering', 'general-grad'],
    sector: 'ministry',
    sectorLabel: 'Central Government Ministries',
    payLevel: 'Pay Level 1 (Basic: ₹18,000 – ₹56,900)',
    startingBasic: 18000,
    monthlyTakeHomeEstimate: '₹34,000 – ₹39,000 (Class X Metro Cities)',
    selectionPhases: 'Single Phase Computer Based Test (Maths, Reasoning, English, General Awareness)',
    curiosityHook: 'Zero interview or descriptive paper; 100% objective computer test providing permanent central government job security at age 18.',
    targetLink: '/exams/ssc-mts',
    badge: 'Entry Friendly',
  },
];

interface CareerPathMatcherProps {
  onNavigate?: (path: string) => void;
  embedded?: boolean;
}

export const CareerPathMatcher: React.FC<CareerPathMatcherProps> = ({
  onNavigate,
  embedded = false,
}) => {
  const [candidateAge, setCandidateAge] = useState<number>(18);
  const [qualification, setQualification] = useState<string>('12th-pcm');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const matches = useMemo(() => {
    return CAREER_EXAM_DATABASE.filter((exam) => {
      // Age Filter
      if (candidateAge < exam.minAge || candidateAge > exam.maxAgeGen) {
        return false;
      }

      // Qualification Filter
      if (qualification !== 'all') {
        const hasQual = exam.qualificationRequired.some((q) => {
          if (q === qualification) return true;
          if (qualification === '12th-pcm' && (q === '12th-pcm' || q === '12th-arts-comm' || q === '10th')) return true;
          if (qualification === '12th-pcb' && (q === '12th-pcb' || q === '12th-arts-comm' || q === '10th')) return true;
          if (qualification === '12th-arts-comm' && (q === '12th-arts-comm' || q === '10th')) return true;
          if (qualification === 'engineering' && (q === 'engineering' || q === 'general-grad' || q === '12th-pcm' || q === '10th')) return true;
          if (qualification === 'general-grad' && (q === 'general-grad' || q === '12th-arts-comm' || q === '10th')) return true;
          if (qualification === '10th' && q === '10th') return true;
          return false;
        });
        if (!hasQual) return false;
      }

      // Sector Filter
      if (selectedSector !== 'all' && exam.sector !== selectedSector) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = exam.examName.toLowerCase().includes(query);
        const matchesBody = exam.conductingBody.toLowerCase().includes(query);
        const matchesHook = exam.curiosityHook.toLowerCase().includes(query);
        if (!matchesName && !matchesBody && !matchesHook) return false;
      }

      return true;
    });
  }, [candidateAge, qualification, selectedSector, searchQuery]);

  return (
    <div className={`space-y-6 ${embedded ? 'my-8 p-5 sm:p-7 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl border border-blue-800 shadow-md' : 'text-slate-900'}`}>
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-wider block ${embedded ? 'text-blue-300' : 'text-blue-700'}`}>
                Algorithmic Career Diagnostic Engine
              </span>
              <h3 className={`text-lg sm:text-xl font-extrabold tracking-tight ${embedded ? 'text-white' : 'text-slate-900'}`}>
                Youngster Career Path &amp; 7th CPC Salary Matcher
              </h3>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${embedded ? 'bg-blue-500/20 text-blue-200 border-blue-400/30' : 'bg-blue-50 text-blue-800 border-blue-200'}`}>
            {matches.length} Careers Eligible
          </span>
        </div>
        <p className={`text-xs sm:text-sm leading-relaxed ${embedded ? 'text-slate-300' : 'text-slate-600'}`}>
          Select your current age and highest qualification to instantly uncover verified government career options, starting pay levels, take-home salary calculations, and direct selection roadmaps.
        </p>
      </div>

      {/* Control Filters Grid */}
      <div className={`p-4 sm:p-5 rounded-xl border grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs ${embedded ? 'bg-slate-800/80 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
        {/* Age Selector */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="font-bold">Your Current Age:</label>
            <span className="font-extrabold text-blue-400 text-sm">{candidateAge} Years</span>
          </div>
          <input
            type="range"
            min="15"
            max="32"
            value={candidateAge}
            onChange={(e) => setCandidateAge(parseInt(e.target.value, 10))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] opacity-70">
            <span>15 yrs (School)</span>
            <span>21 yrs (Grad)</span>
            <span>32 yrs (Cap)</span>
          </div>
        </div>

        {/* Qualification Selector */}
        <div className="space-y-1.5">
          <label className="font-bold">Highest Qualification:</label>
          <select
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className={`w-full p-2 rounded-lg font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${embedded ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'}`}
          >
            <option value="all">Any / View All Qualifications</option>
            <option value="10th">10th Pass (Matriculation)</option>
            <option value="12th-pcm">12th Science (Physics, Chemistry, Maths)</option>
            <option value="12th-pcb">12th Science (Physics, Chemistry, Biology)</option>
            <option value="12th-arts-comm">12th Arts / Humanities / Commerce</option>
            <option value="engineering">Engineering Graduate (B.Tech / B.E.)</option>
            <option value="general-grad">General Graduate (B.A., B.Com, B.Sc, BBA, BCA)</option>
            <option value="medical">Medical / Allied (MBBS, BDS, Nursing)</option>
          </select>
          <span className="text-[10px] opacity-70 block">
            Matches minimum statutory educational requisites.
          </span>
        </div>

        {/* Sector Preference */}
        <div className="space-y-1.5">
          <label className="font-bold">Preferred Career Sector:</label>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className={`w-full p-2 rounded-lg font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${embedded ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'}`}
          >
            <option value="all">All Government Sectors</option>
            <option value="defence">Armed Forces &amp; Defence Officer</option>
            <option value="ministry">Central Ministries &amp; Secretariats</option>
            <option value="civil">Civil Administration (IAS / State PCS)</option>
            <option value="police">Police &amp; Uniformed Law Enforcement</option>
            <option value="railway">Indian Railways &amp; Operations</option>
            <option value="banking">Public Sector Commercial Banking</option>
          </select>
          <span className="text-[10px] opacity-70 block">
            Filter by working environment and cadre nature.
          </span>
        </div>
      </div>

      {/* Dynamic Results Grid */}
      <div className="space-y-3">
        {matches.length === 0 ? (
          <div className={`p-8 text-center rounded-xl border ${embedded ? 'bg-slate-800/50 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
            <Info className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <h4 className="font-bold text-sm">No Matching Portals for this Combination</h4>
            <p className="text-xs mt-1">Try adjusting your age or changing the qualification dropdown to view broader entries.</p>
            <button
              onClick={() => {
                setCandidateAge(18);
                setQualification('12th-pcm');
                setSelectedSector('all');
              }}
              className="mt-3 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Reset to Recommended Settings
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {matches.map((exam, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                  embedded
                    ? 'bg-slate-800/90 border-slate-700 hover:border-blue-500 hover:shadow-lg'
                    : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      {exam.entryStage}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${embedded ? 'bg-amber-400/20 text-amber-300' : 'bg-amber-50 text-amber-800'}`}>
                      {exam.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className={`font-extrabold text-sm sm:text-base leading-snug ${embedded ? 'text-white' : 'text-slate-900'}`}>
                      {exam.examName}
                    </h4>
                    <span className={`text-xs block ${embedded ? 'text-slate-400' : 'text-slate-500'}`}>
                      Conducting Body: <strong>{exam.conductingBody}</strong>
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed italic ${embedded ? 'text-slate-300' : 'text-slate-600'}`}>
                    "{exam.curiosityHook}"
                  </p>

                  {/* Financial & Age Snapshot */}
                  <div className={`p-2.5 rounded-lg text-xs space-y-1 ${embedded ? 'bg-slate-900/80 border border-slate-700/60' : 'bg-slate-50 border border-slate-200'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] opacity-75">Pay Level:</span>
                      <strong className="text-emerald-400 font-semibold">{exam.payLevel}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] opacity-75">Estimated In-Hand:</span>
                      <strong className={`font-bold ${embedded ? 'text-emerald-300' : 'text-emerald-700'}`}>
                        {exam.monthlyTakeHomeEstimate}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] opacity-75">General Age Bracket:</span>
                      <span className="font-semibold">{exam.minAge} – {exam.maxAgeGen} Years</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-current/10 flex items-center justify-between">
                  <span className={`text-[11px] truncate max-w-[190px] ${embedded ? 'text-slate-400' : 'text-slate-500'}`}>
                    {exam.selectionPhases}
                  </span>
                  {onNavigate ? (
                    <button
                      onClick={() => onNavigate(exam.targetLink)}
                      className="px-2.5 py-1 text-xs font-bold text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <a
                      href={exam.targetLink}
                      className="px-2.5 py-1 text-xs font-bold text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
                    >
                      <span>Read Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info Callout */}
      <div className={`pt-3 border-t text-[11px] flex flex-wrap items-center justify-between gap-2 ${embedded ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Pay and age criteria corroborated against 7th Central Pay Commission gazette schedules.</span>
        </div>
        <span className="italic font-medium">Updated for 2026/2027 Recruitment Cycles</span>
      </div>
    </div>
  );
};
