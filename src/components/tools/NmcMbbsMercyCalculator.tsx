import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Clock,
  Calendar,
  Building2,
  ShieldCheck,
  FileText,
  RotateCcw,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Info,
} from 'lucide-react';
import { NavLink } from '../NavLink';

interface NmcMbbsMercyCalculatorProps {
  onNavigate?: (path: string) => void;
  embedded?: boolean;
}

export const NmcMbbsMercyCalculator: React.FC<NmcMbbsMercyCalculatorProps> = ({
  onNavigate,
  embedded = false,
}) => {
  const [admissionBatch, setAdmissionBatch] = useState<string>('2019-20');
  const [attemptsTaken, setAttemptsTaken] = useState<number>(4);
  const [priorMercyAvailed, setPriorMercyAvailed] = useState<'no' | 'yes'>('no');
  const [admissionStatus, setAdmissionStatus] = useState<'active' | 'cancelled'>('active');

  // Calculation Logic grounded strictly in NMC 15 October 2026 Public Notice
  const batchYear = parseInt(admissionBatch.split('-')[0], 10);
  const isPost2019 = batchYear >= 2019;
  const maxCompletionYear = batchYear + 10;

  // Evaluation
  let isEligible = false;
  let statusBadge = '';
  let reasonHeading = '';
  let reasonDescription = '';
  let nextSteps: string[] = [];

  if (admissionStatus === 'cancelled') {
    isEligible = false;
    statusBadge = 'Ineligible: Admission Terminated';
    reasonHeading = 'University/College Admission Not Active';
    reasonDescription =
      'The NMC circular strictly mandates that students must have a valid admission that has not been revoked or cancelled by their respective medical college or affiliated health university.';
    nextSteps = [
      'Contact your College Dean / Academic Registrar to confirm if admission can be restored.',
      'Check university statutes regarding maximum sabbatical or break of study permissions.',
    ];
  } else if (!isPost2019) {
    isEligible = false;
    statusBadge = 'Ineligible: Pre-CBME 2018 Batch';
    reasonHeading = 'Batch Admitted Prior to 2019–20 Academic Year';
    reasonDescription =
      'The one-time mercy attempt under the October 15, 2026 notice is explicitly restricted to MBBS students admitted from the 2019–20 academic year onwards under CBME regulations.';
    nextSteps = [
      'Pre-2019 batches are governed by earlier MCI Graduate Medical Education Regulations (1997).',
      'Submit a formal representation to your university syndicate or state medical council if applicable.',
    ];
  } else if (priorMercyAvailed === 'yes') {
    isEligible = false;
    statusBadge = 'Ineligible: 5 Attempts Already Availed';
    reasonHeading = 'Prior Mercy Attempt Already Exhausted';
    reasonDescription =
      'Students who have already availed a mercy attempt and exhausted five attempts under any previous NMC circular or High Court / Supreme Court judicial order are barred from this relaxation.';
    nextSteps = [
      'NMC guidelines enforce a strict ceiling of 5 maximum attempts for First Professional MBBS.',
      'Review your previous court order or university notifications for further legal remedies.',
    ];
  } else if (attemptsTaken < 4) {
    isEligible = false;
    statusBadge = 'Standard Attempts Still Available';
    reasonHeading = `You Have ${4 - attemptsTaken} Regular Attempt(s) Remaining`;
    reasonDescription =
      'You have not yet exhausted the standard four attempts permitted under Regulation 11.1.2 of GMER-2019. You do not need this extraordinary mercy relaxation yet and can appear in your next scheduled university exam as a regular repeater.';
    nextSteps = [
      'Register for the upcoming supplementary or regular first-professional university examination.',
      'Verify internal assessment scores and ensure attendance requirements are fulfilled.',
      `Keep in mind your 10-year outer course completion deadline is ${maxCompletionYear}.`,
    ];
  } else {
    // Exactly 4 attempts taken, active admission, 2019+ batch, no prior mercy attempt
    isEligible = true;
    statusBadge = 'Eligible: One-Time Mercy 5th Attempt Granted';
    reasonHeading = 'You Meet All NMC Eligibility Criteria for 5th Attempt';
    reasonDescription =
      'Under the NMC Under-Graduate Medical Education Board (UGMEB) public notice dated 15 October 2026, you are granted one additional mercy attempt over and above the four previously prescribed attempts. You are permitted to appear in the First Professional MBBS Examination even if you have crossed the 4-year limit, provided your degree is completed within 10 years of admission.';
    nextSteps = [
      'Obtain an official copy of your enrollment record from your medical college Academic Cell.',
      'Draft a notarized non-judicial affidavit declaring you have not previously availed a 5th attempt under any earlier NMC or court directive.',
      'Submit the formal examination application form along with prescribed university fee to the Controller of Examinations.',
      `Plan your remaining MBBS phases (2nd, 3rd Part-1, 3rd Part-2 + 1 Year CRMI) to graduate before ${maxCompletionYear}.`,
    ];
  }

  const handleReset = () => {
    setAdmissionBatch('2019-20');
    setAttemptsTaken(4);
    setPriorMercyAvailed('no');
    setAdmissionStatus('active');
  };

  return (
    <div
      className={`rounded-2xl border transition-all ${
        embedded
          ? 'bg-white border-slate-200 p-5 sm:p-7 shadow-xs'
          : 'bg-white border-slate-200 p-6 sm:p-8 shadow-sm max-w-4xl mx-auto'
      }`}
    >
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-2xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                Official NMC October 15, 2026 Regulation Tool
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              1st Professional MBBS Mercy Attempt Eligibility Checker
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Inputs</span>
        </button>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-xs">
        {/* Input 1: Admission Batch */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 block">
            MBBS Admission Academic Year:
          </label>
          <select
            value={admissionBatch}
            onChange={(e) => setAdmissionBatch(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="2018-19">2018–19 or Earlier (Pre-CBME)</option>
            <option value="2019-20">2019–20 (First CBME Batch)</option>
            <option value="2020-21">2020–21 (COVID-Affected Batch)</option>
            <option value="2021-22">2021–22 (COVID-Affected Batch)</option>
            <option value="2022-23">2022–23 Batch</option>
            <option value="2023-24">2023–24 Batch</option>
            <option value="2024-25">2024–25 Batch</option>
          </select>
          <span className="text-[10px] text-slate-500 block">
            Eligibility starts from 2019–20 onwards.
          </span>
        </div>

        {/* Input 2: Attempts Taken */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 block">
            1st Prof Attempts Taken So Far:
          </label>
          <select
            value={attemptsTaken}
            onChange={(e) => setAttemptsTaken(Number(e.target.value))}
            className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value={1}>1 Attempt Taken (3 Regular Left)</option>
            <option value={2}>2 Attempts Taken (2 Regular Left)</option>
            <option value={3}>3 Attempts Taken (1 Regular Left)</option>
            <option value={4}>4 Attempts Taken (Cap Exhausted)</option>
            <option value={5}>5 or More Attempts Taken</option>
          </select>
          <span className="text-[10px] text-slate-500 block">
            Regular cap is 4 attempts (GMER 11.1.2).
          </span>
        </div>

        {/* Input 3: Prior Mercy Availed */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 block">
            Availed Court/NMC Mercy Earlier?
          </label>
          <select
            value={priorMercyAvailed}
            onChange={(e) => setPriorMercyAvailed(e.target.value as 'no' | 'yes')}
            className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="no">No, never availed prior mercy</option>
            <option value="yes">Yes, availed 5th attempt earlier</option>
          </select>
          <span className="text-[10px] text-slate-500 block">
            Those who exhausted 5 attempts are excluded.
          </span>
        </div>

        {/* Input 4: College Admission Status */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 block">
            Medical College Admission Status:
          </label>
          <select
            value={admissionStatus}
            onChange={(e) => setAdmissionStatus(e.target.value as 'active' | 'cancelled')}
            className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="active">Active On University Roll</option>
            <option value="cancelled">Cancelled / Discharged by College</option>
          </select>
          <span className="text-[10px] text-slate-500 block">
            Admission must not be formally revoked.
          </span>
        </div>
      </div>

      {/* Dynamic Results Card */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 transition-all space-y-4 ${
          isEligible
            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
            : 'bg-amber-50/70 border-amber-300 text-amber-950'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-current/15 pb-3">
          <div className="flex items-center gap-2">
            {isEligible ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            )}
            <h4 className="font-extrabold text-base tracking-tight">
              {reasonHeading}
            </h4>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              isEligible
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}
          >
            {statusBadge}
          </span>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed font-sans">
          {reasonDescription}
        </p>

        {/* Timeline & Statutory Math Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-white/80 rounded-xl border border-current/10 space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Admission Batch Year
            </span>
            <strong className="text-slate-900 text-sm block">
              {admissionBatch}
            </strong>
            <span className="text-[10px] text-slate-500">
              CBME Regulation Framework
            </span>
          </div>

          <div className="p-3 bg-white/80 rounded-xl border border-current/10 space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              1st Prof 4-Year Cap
            </span>
            <strong className="text-blue-700 text-sm block">
              {isPost2019 ? 'Relaxed as One-Time Exception' : 'Strict 4-Year Limit'}
            </strong>
            <span className="text-[10px] text-slate-500">
              Transitional relief measure
            </span>
          </div>

          <div className="p-3 bg-white/80 rounded-xl border border-current/10 space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Absolute 10-Year Outer Limit
            </span>
            <strong className="text-rose-700 text-sm block">
              Year {maxCompletionYear}
            </strong>
            <span className="text-[10px] text-slate-500">
              Includes Final MBBS &amp; CRMI
            </span>
          </div>
        </div>

        {/* Actionable Protocol Checklist */}
        <div className="pt-2 border-t border-current/15 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wide block">
            Recommended Actionable Protocol:
          </span>
          <ul className="space-y-1.5 text-xs">
            {nextSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span className="leading-snug">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Statutory Footer Callout */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Statutory Authority: <strong>National Medical Commission (NMC)</strong> · Under-Graduate Medical Education Board Public Notice (15 Oct 2026)
          </span>
        </div>
        <a
          href="https://www.nmc.org.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 font-bold hover:underline"
        >
          Visit Official NMC Server (nmc.org.in) →
        </a>
      </div>
    </div>
  );
};
