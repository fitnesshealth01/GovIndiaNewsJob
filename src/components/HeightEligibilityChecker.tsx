import React, { useState, useMemo } from 'react';
import { PHYSICAL_STANDARDS, PhysicalRequirement } from '../data/gazetteData';
import { Ruler, ShieldCheck, AlertCircle, ArrowRightLeft, User, Activity, Info } from 'lucide-react';

export const HeightEligibilityChecker: React.FC = () => {
  const [selectedExamId, setSelectedExamId] = useState<string>('ssc-gd-constable');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [category, setCategory] = useState<'general' | 'obc' | 'sc' | 'st' | 'hilly'>('general');
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm');

  // Input state
  const [heightCm, setHeightCm] = useState<number>(172);
  const [feet, setFeet] = useState<number>(5);
  const [inches, setInches] = useState<number>(8);

  const [chestUnexpanded, setChestUnexpanded] = useState<number>(82);
  const [chestExpanded, setChestExpanded] = useState<number>(87);

  const activePost: PhysicalRequirement = useMemo(() => {
    return PHYSICAL_STANDARDS.find((p) => p.id === selectedExamId) || PHYSICAL_STANDARDS[0];
  }, [selectedExamId]);

  // Handle unit conversions
  const handleUnitToggle = (newUnit: 'cm' | 'ft') => {
    if (newUnit === unit) return;
    setUnit(newUnit);
    if (newUnit === 'ft') {
      const totalInches = heightCm / 2.54;
      const ft = Math.floor(totalInches / 12);
      const inc = Math.round(totalInches % 12);
      setFeet(ft);
      setInches(inc);
    } else {
      const computedCm = Math.round((feet * 12 + inches) * 2.54);
      setHeightCm(computedCm);
    }
  };

  const currentHeightCm = useMemo(() => {
    if (unit === 'cm') {
      return heightCm;
    }
    return Math.round((feet * 12 + inches) * 2.54 * 10) / 10;
  }, [unit, heightCm, feet, inches]);

  // Minimum required height
  const requiredMinHeight = useMemo(() => {
    if (gender === 'male') {
      return activePost.maleHeight[category];
    } else {
      return activePost.femaleHeight[category];
    }
  }, [gender, category, activePost]);

  // Verification Results
  const evaluation = useMemo(() => {
    if (gender === 'female' && activePost.femaleHeight.general === 0) {
      return {
        isEligible: false,
        diff: 0,
        heightPassed: false,
        chestPassed: true,
        message: 'This post is strictly reserved for Male candidates only.',
        statusType: 'error' as const,
      };
    }

    const diff = Math.round((currentHeightCm - requiredMinHeight) * 10) / 10;
    const heightPassed = currentHeightCm >= requiredMinHeight;

    // Chest expansion check (Male only)
    let chestPassed = true;
    let chestMessage = '';
    if (gender === 'male' && activePost.chestMale) {
      const expansion = chestExpanded - chestUnexpanded;
      const baseMet = chestUnexpanded >= activePost.chestMale.unexpanded;
      const expMet = expansion >= activePost.chestMale.minExpansion;

      if (!baseMet || !expMet) {
        chestPassed = false;
        chestMessage = `Chest standard requires minimum ${activePost.chestMale.unexpanded} cm with ${activePost.chestMale.minExpansion} cm expansion (Current expansion: ${expansion} cm).`;
      }
    }

    const isEligible = heightPassed && chestPassed;

    let statusType: 'success' | 'warning' | 'error' = 'success';
    let message = '';

    if (isEligible) {
      statusType = 'success';
      message = `Eligible for ${activePost.postTitle}! Your height exceeds the cutoff standard by ${diff >= 0 ? '+' : ''}${diff} cm.`;
    } else if (!heightPassed) {
      statusType = 'error';
      message = `Short of height requirement by ${Math.abs(diff)} cm. Required minimum height is ${requiredMinHeight} cm for ${category.toUpperCase()} category.`;
    } else {
      statusType = 'warning';
      message = chestMessage || 'Physical parameters do not meet minimum gazette criteria.';
    }

    return {
      isEligible,
      diff,
      heightPassed,
      chestPassed,
      message,
      statusType,
    };
  }, [currentHeightCm, requiredMinHeight, gender, activePost, category, chestUnexpanded, chestExpanded]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden max-w-full">
      <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Physical Standard Test (PST / PMT) Height Checker
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Verify your physical eligibility for SSC GD, Delhi Police, Army Agniveer, RPF, and CAPF recruitment gazettes.
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-md px-2.5 py-1 self-start sm:self-auto">
            Official CAPF & Police Criteria
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-5">
          {/* Post Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Select Recruitment / Post
            </label>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="w-full text-sm font-medium border border-slate-300 rounded-lg px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            >
              {PHYSICAL_STANDARDS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.examName} - {p.postTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Gender & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Candidate Gender
              </label>
              <div className="flex rounded-lg border border-slate-300 p-1 bg-slate-50">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    gender === 'male' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    gender === 'female' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Candidate Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-900"
              >
                <option value="general">General / UR</option>
                <option value="obc">OBC</option>
                <option value="sc">SC</option>
                <option value="st">ST (Tribal Relaxation)</option>
                <option value="hilly">Hilly / Garhwali / Gorkha</option>
              </select>
            </div>
          </div>

          {/* Height Input with Unit Switch */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-blue-600" />
                Candidate Height
              </label>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md text-xs font-medium">
                <button
                  type="button"
                  onClick={() => handleUnitToggle('cm')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${unit === 'cm' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'}`}
                >
                  Centimeters (cm)
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitToggle('ft')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${unit === 'ft' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'}`}
                >
                  Feet & Inches
                </button>
              </div>
            </div>

            {unit === 'cm' ? (
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="140"
                  max="205"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex items-center gap-1 shrink-0">
                  <input
                    type="number"
                    min="130"
                    max="220"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-20 text-sm border border-slate-300 rounded-lg px-2.5 py-1.5 text-center font-bold text-slate-900"
                  />
                  <span className="text-xs text-slate-500 font-medium">cm</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Feet</label>
                  <input
                    type="number"
                    min="4"
                    max="7"
                    value={feet}
                    onChange={(e) => setFeet(Number(e.target.value))}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Inches</label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={inches}
                    onChange={(e) => setInches(Number(e.target.value))}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-900"
                  />
                </div>
              </div>
            )}
            <div className="text-[11px] text-slate-500 mt-1">
              Equivalent: {currentHeightCm} cm ≈ {(currentHeightCm / 2.54 / 12).toFixed(1)} feet
            </div>
          </div>

          {/* Chest Standards (Only for Male) */}
          {gender === 'male' && activePost.chestMale && (
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                <span>Male Chest Measurement (cm)</span>
                <span className="text-slate-500 font-normal">Min 5cm Expansion</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Unexpanded Chest</label>
                  <input
                    type="number"
                    min="65"
                    max="120"
                    value={chestUnexpanded}
                    onChange={(e) => setChestUnexpanded(Number(e.target.value))}
                    className="w-full text-sm border border-slate-300 rounded-md px-2.5 py-1 text-slate-900 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Expanded Chest</label>
                  <input
                    type="number"
                    min="70"
                    max="130"
                    value={chestExpanded}
                    onChange={(e) => setChestExpanded(Number(e.target.value))}
                    className="w-full text-sm border border-slate-300 rounded-md px-2.5 py-1 text-slate-900 font-semibold"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Output & Standards Comparison */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Primary Status Verdict Banner */}
            <div
              className={`p-5 rounded-xl border flex items-start gap-3.5 ${
                evaluation.statusType === 'success'
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50/80 border-rose-200 text-rose-950'
              }`}
            >
              {evaluation.statusType === 'success' ? (
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="text-base font-bold flex items-center gap-2">
                  {evaluation.isEligible ? 'HEIGHT & PHYSICAL STANDARDS CLEARED' : 'DOES NOT MEET HEIGHT REQUIREMENT'}
                </div>
                <p className="text-xs mt-1.5 leading-relaxed">{evaluation.message}</p>
              </div>
            </div>

            {/* Height Comparison Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 text-white">
                <span className="text-[11px] text-slate-400 block uppercase tracking-wider font-medium">
                  Your Entered Height
                </span>
                <div className="text-2xl font-bold mt-1 text-white tabular-nums">
                  {currentHeightCm} <span className="text-sm font-normal text-slate-400">cm</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {Math.floor(currentHeightCm / 2.54 / 12)}' {Math.round((currentHeightCm / 2.54) % 12)}" feet
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                <span className="text-[11px] text-slate-500 block uppercase tracking-wider font-medium">
                  Minimum Required Cutoff
                </span>
                <div className="text-2xl font-bold mt-1 text-slate-900 tabular-nums">
                  {requiredMinHeight} <span className="text-sm font-normal text-slate-500">cm</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  For {gender.toUpperCase()} · {category.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Physical Efficiency Test (PET) Benchmarks */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/60 text-xs space-y-2">
              <div className="font-semibold text-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-blue-600" />
                  Official Physical Efficiency Test (PET Running Standards)
                </span>
                <span className="text-slate-500 font-normal">Official Gazette</span>
              </div>
              <div className="p-3 bg-white rounded border border-slate-200 text-slate-700 space-y-1.5 text-xs">
                <div>
                  <strong>Male Candidates:</strong> {activePost.petCriteria.maleRun}
                </div>
                <div>
                  <strong>Female Candidates:</strong> {activePost.petCriteria.femaleRun}
                </div>
                {activePost.petCriteria.additional && (
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <strong>Note:</strong> {activePost.petCriteria.additional}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
