import React, { useState, useMemo } from 'react';
import { Calendar, UserCheck, AlertTriangle, ShieldCheck, HelpCircle, Check, Info } from 'lucide-react';

interface ExamPreset {
  id: string;
  name: string;
  minAge: number;
  maxAge: number;
  crucialDateDefault: string; // YYYY-MM-DD
}

const EXAM_PRESETS: ExamPreset[] = [
  { id: 'nicl-ao', name: 'NICL AO 2026 (Scale-I)', minAge: 21, maxAge: 30, crucialDateDefault: '2026-10-01' },
  { id: 'ssc-cgl', name: 'SSC CGL 2026 (Group B & C)', minAge: 18, maxAge: 32, crucialDateDefault: '2026-08-01' },
  { id: 'ssc-gd', name: 'SSC GD Constable 2026', minAge: 18, maxAge: 23, crucialDateDefault: '2026-01-01' },
  { id: 'delhi-police', name: 'Delhi Police Sub-Inspector', minAge: 20, maxAge: 25, crucialDateDefault: '2026-08-01' },
  { id: 'rrb-ntpc', name: 'RRB NTPC Graduate / UG', minAge: 18, maxAge: 36, crucialDateDefault: '2026-07-01' },
  { id: 'upsc-cse', name: 'UPSC Civil Services (CSE)', minAge: 21, maxAge: 32, crucialDateDefault: '2026-08-01' },
  { id: 'bank-po', name: 'IBPS / SBI PO & Clerk', minAge: 20, maxAge: 30, crucialDateDefault: '2026-04-01' },
  { id: 'custom', name: 'Custom Govt Exam / Post', minAge: 18, maxAge: 30, crucialDateDefault: '2026-08-01' },
];

const CATEGORIES = [
  { id: 'ur', label: 'General / UR / EWS', relaxation: 0 },
  { id: 'obc', label: 'OBC (Non-Creamy Layer)', relaxation: 3 },
  { id: 'sc-st', label: 'SC / ST (Scheduled Castes/Tribes)', relaxation: 5 },
  { id: 'pwbd-ur', label: 'PwBD (General / EWS)', relaxation: 10 },
  { id: 'pwbd-obc', label: 'PwBD (OBC-NCL)', relaxation: 13 },
  { id: 'pwbd-scst', label: 'PwBD (SC / ST)', relaxation: 15 },
  { id: 'esm', label: 'Ex-Servicemen (ESM)', relaxation: 3 },
];

export const AgeCalculator: React.FC = () => {
  const [selectedExamId, setSelectedExamId] = useState<string>('ssc-cgl');
  const [dob, setDob] = useState<string>('2001-05-15');
  const [cutoffDate, setCutoffDate] = useState<string>('2026-08-01');
  const [category, setCategory] = useState<string>('ur');
  const [customMinAge, setCustomMinAge] = useState<number>(18);
  const [customMaxAge, setCustomMaxAge] = useState<number>(30);

  const selectedPreset = EXAM_PRESETS.find((p) => p.id === selectedExamId) || EXAM_PRESETS[0];
  const selectedCategory = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];

  const handleExamChange = (examId: string) => {
    setSelectedExamId(examId);
    const preset = EXAM_PRESETS.find((p) => p.id === examId);
    if (preset) {
      setCutoffDate(preset.crucialDateDefault);
      if (preset.id !== 'custom') {
        setCustomMinAge(preset.minAge);
        setCustomMaxAge(preset.maxAge);
      }
    }
  };

  // Precise age computation between two dates
  const ageResult = useMemo(() => {
    if (!dob || !cutoffDate) return null;

    const birth = new Date(dob);
    const target = new Date(cutoffDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return null;
    if (birth > target) {
      return { invalid: true, message: 'Date of birth cannot be after the crucial cutoff date.' };
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      // Days in previous month of target
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total days calculation
    const diffTime = Math.abs(target.getTime() - birth.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    // Eligibility check
    const minAge = selectedExamId === 'custom' ? customMinAge : selectedPreset.minAge;
    const baseMaxAge = selectedExamId === 'custom' ? customMaxAge : selectedPreset.maxAge;
    const relaxedMaxAge = baseMaxAge + selectedCategory.relaxation;

    // Decimal age for comparison
    const decimalAge = years + months / 12 + days / 365.25;

    let isEligible = false;
    let statusText = '';
    let statusType: 'success' | 'warning' | 'error' = 'success';

    if (decimalAge < minAge) {
      isEligible = false;
      statusType = 'warning';
      const underYears = minAge - 1 - years;
      const underMonths = 11 - months;
      statusText = `Under-aged for this exam. You must be at least ${minAge} years old on ${cutoffDate}.`;
    } else if (decimalAge <= relaxedMaxAge) {
      isEligible = true;
      statusType = 'success';
      if (selectedCategory.relaxation > 0 && decimalAge > baseMaxAge) {
        statusText = `Eligible under Category Age Relaxation! (${selectedCategory.label} allows up to ${relaxedMaxAge} years).`;
      } else {
        statusText = `Eligible! You fall strictly within the permissible age window (${minAge} to ${relaxedMaxAge} years).`;
      }
    } else {
      isEligible = false;
      statusType = 'error';
      statusText = `Over-aged. Maximum permissible age for ${selectedCategory.label} is ${relaxedMaxAge} years.`;
    }

    // Days until next birthday from today
    const today = new Date();
    let nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (today > nextBday) {
      nextBday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysToNextBday = Math.ceil((nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return {
      invalid: false,
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      minAge,
      baseMaxAge,
      relaxedMaxAge,
      isEligible,
      statusText,
      statusType,
      daysToNextBday,
    };
  }, [dob, cutoffDate, selectedExamId, selectedPreset, selectedCategory, customMinAge, customMaxAge]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden max-w-full">
      <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Government Exam Age Calculator
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Accurate age calculation down to years, months, and days with official Central Govt Category Relaxations.
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-md px-2.5 py-1 self-start sm:self-auto">
            DOP&T Rules 2026 Compliant
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Exam Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Select Exam / Notification
            </label>
            <select
              value={selectedExamId}
              onChange={(e) => handleExamChange(e.target.value)}
              className="w-full text-sm font-medium border border-slate-300 rounded-lg px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            >
              {EXAM_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Date of Birth (DOB)
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>
            </div>

            {/* Crucial Cut-off Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Crucial Cut-off Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={cutoffDate}
                  onChange={(e) => setCutoffDate(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Social Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Candidate Social Category (Age Relaxation)
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-lg px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label} {cat.relaxation > 0 ? `(+${cat.relaxation} Years Relaxation)` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Age Range if selected */}
          {selectedExamId === 'custom' && (
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Minimum Age Required
                </label>
                <input
                  type="number"
                  min="16"
                  max="40"
                  value={customMinAge}
                  onChange={(e) => setCustomMinAge(Number(e.target.value))}
                  className="w-full text-sm border border-slate-300 rounded-md px-3 py-1.5"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Maximum Age (UR)
                </label>
                <input
                  type="number"
                  min="18"
                  max="60"
                  value={customMaxAge}
                  onChange={(e) => setCustomMaxAge(Number(e.target.value))}
                  className="w-full text-sm border border-slate-300 rounded-md px-3 py-1.5"
                />
              </div>
            </div>
          )}

          <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900 leading-relaxed">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Crucial Date Note:</strong> Central examinations (SSC, UPSC, RRB) strictly calculate eligibility age based on the crucial date mentioned in their official gazette notification (e.g. 1st Aug for autumn exams or 1st Jan for spring exams).
            </span>
          </div>
        </div>

        {/* Right Output Results Column */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          {ageResult && !ageResult.invalid ? (
            <div className="space-y-5">
              {/* Primary Age Display Box */}
              <div className="p-5 rounded-xl bg-slate-900 text-white shadow-sm">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Age on Crucial Cutoff Date ({cutoffDate})
                </span>
                <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700/60">
                    <div className="text-3xl font-bold tracking-tight text-white tabular-nums">
                      {ageResult.years}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">Years</div>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700/60">
                    <div className="text-3xl font-bold tracking-tight text-blue-400 tabular-nums">
                      {ageResult.months}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">Months</div>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700/60">
                    <div className="text-3xl font-bold tracking-tight text-emerald-400 tabular-nums">
                      {ageResult.days}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">Days</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <span>Total Days Lived: <strong className="text-white font-mono">{(ageResult.totalDays ?? 0).toLocaleString()}</strong> days</span>
                  <span>Next Birthday in: <strong className="text-white font-mono">{ageResult.daysToNextBday ?? 0}</strong> days</span>
                </div>
              </div>

              {/* Eligibility Verdict Banner */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  ageResult.statusType === 'success'
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                    : ageResult.statusType === 'warning'
                    ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                    : 'bg-rose-50/80 border-rose-200 text-rose-900'
                }`}
              >
                {ageResult.statusType === 'success' ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-sm font-bold flex items-center gap-1.5">
                    {ageResult.isEligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
                    <span className="text-xs font-normal opacity-85">
                      · {selectedPreset.name}
                    </span>
                  </div>
                  <p className="text-xs mt-1 leading-relaxed">{ageResult.statusText}</p>
                </div>
              </div>

              {/* Age Limits Matrix Card */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/60 text-xs space-y-2">
                <div className="font-semibold text-slate-800 mb-2 flex items-center justify-between">
                  <span>Official Age Relaxation Matrix</span>
                  <span className="text-slate-500 font-normal">Central Rules</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-600">Standard Age Limit (General/UR)</span>
                  <span className="font-semibold text-slate-900">
                    {ageResult.minAge} – {ageResult.baseMaxAge} Years
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-600">{selectedCategory.label} Relaxation</span>
                  <span className="font-semibold text-blue-700">
                    +{selectedCategory.relaxation} Years
                  </span>
                </div>
                <div className="flex justify-between py-1 font-semibold">
                  <span className="text-slate-800">Your Maximum Permissible Age</span>
                  <span className="text-slate-900 font-bold">
                    {ageResult.relaxedMaxAge} Years
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 border border-slate-200 rounded-xl bg-slate-50 text-center flex flex-col items-center justify-center h-full">
              <Calendar className="w-10 h-10 text-slate-400 mb-2" />
              <p className="text-sm font-medium text-slate-700">Select your Date of Birth</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Enter your date of birth and examine the live eligibility breakdown against official SSC, RRB, and UPSC criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
