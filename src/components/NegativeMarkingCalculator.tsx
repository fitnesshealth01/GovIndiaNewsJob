import React, { useState, useMemo } from 'react';
import { MARKING_PRESETS, MarkingPreset } from '../data/gazetteData';
import { Calculator, CheckCircle2, XCircle, MinusCircle, Award, Target, TrendingUp, Info } from 'lucide-react';

export const NegativeMarkingCalculator: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('ssc-cgl');
  const [totalQuestions, setTotalQuestions] = useState<number>(100);
  const [correctCount, setCorrectCount] = useState<number>(68);
  const [incorrectCount, setIncorrectCount] = useState<number>(16);
  const [customMarksPerCorrect, setCustomMarksPerCorrect] = useState<number>(2.0);
  const [customNegativePenalty, setCustomNegativePenalty] = useState<number>(0.50);

  const activePreset: MarkingPreset = useMemo(() => {
    return (
      MARKING_PRESETS.find((p) => p.id === selectedPresetId) || {
        id: 'custom',
        name: 'Custom Marking Scheme',
        category: 'Custom',
        correctMarks: customMarksPerCorrect,
        negativePenalty: customNegativePenalty,
        totalQuestionsDefault: totalQuestions,
        maxScoreDefault: totalQuestions * customMarksPerCorrect,
      }
    );
  }, [selectedPresetId, customMarksPerCorrect, customNegativePenalty, totalQuestions]);

  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = MARKING_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setTotalQuestions(preset.totalQuestionsDefault);
      // Sensible defaults relative to total questions
      setCorrectCount(Math.round(preset.totalQuestionsDefault * 0.65));
      setIncorrectCount(Math.round(preset.totalQuestionsDefault * 0.15));
    }
  };

  // Calculations
  const calculatedStats = useMemo(() => {
    const marksPerCorrect = selectedPresetId === 'custom' ? customMarksPerCorrect : activePreset.correctMarks;
    const penaltyPerWrong = selectedPresetId === 'custom' ? customNegativePenalty : activePreset.negativePenalty;

    const attempted = correctCount + incorrectCount;
    const unattempted = Math.max(0, totalQuestions - attempted);

    const grossScore = correctCount * marksPerCorrect;
    const negativePenalty = incorrectCount * penaltyPerWrong;
    const netScore = Math.max(0, grossScore - negativePenalty);
    const maxScore = totalQuestions * marksPerCorrect;

    const accuracyRate = attempted > 0 ? (correctCount / attempted) * 100 : 0;
    const scorePercentage = maxScore > 0 ? (netScore / maxScore) * 100 : 0;

    // Performance Band
    let band = { label: 'High Potential / Safe Cut-off Zone', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' };
    if (scorePercentage < 40 || accuracyRate < 60) {
      band = { label: 'Needs Improvement / High Penalty Risk', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' };
    } else if (scorePercentage < 65 || accuracyRate < 78) {
      band = { label: 'Moderate / Borderline Cut-off', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' };
    }

    return {
      marksPerCorrect,
      penaltyPerWrong,
      attempted,
      unattempted,
      grossScore,
      negativePenalty,
      netScore,
      maxScore,
      accuracyRate,
      scorePercentage,
      band,
    };
  }, [selectedPresetId, activePreset, totalQuestions, correctCount, incorrectCount, customMarksPerCorrect, customNegativePenalty]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden max-w-full">
      <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Negative Marking & Raw Score Calculator
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Compute gross marks, negative deduction penalties, net raw score, and accuracy percentage across SSC, Railway, UPSC, and Banking patterns.
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-md px-2.5 py-1 self-start sm:self-auto">
            1/3rd, 1/4th & Custom Penalty
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Input Parameters */}
        <div className="lg:col-span-6 space-y-5">
          {/* Exam Pattern Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Select Exam Marking Pattern
            </label>
            <select
              value={selectedPresetId}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full text-sm font-medium border border-slate-300 rounded-lg px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            >
              {MARKING_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (+{p.correctMarks} / -{p.negativePenalty.toFixed(2)})
                </option>
              ))}
              <option value="custom">Custom Marking Scheme...</option>
            </select>
          </div>

          {/* If Custom Scheme */}
          {selectedPresetId === 'custom' && (
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Marks per Correct Question (+)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="10"
                  value={customMarksPerCorrect}
                  onChange={(e) => setCustomMarksPerCorrect(Number(e.target.value))}
                  className="w-full text-sm border border-slate-300 rounded-md px-3 py-1.5"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Negative Penalty per Wrong (-)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="5"
                  value={customNegativePenalty}
                  onChange={(e) => setCustomNegativePenalty(Number(e.target.value))}
                  className="w-full text-sm border border-slate-300 rounded-md px-3 py-1.5"
                />
              </div>
            </div>
          )}

          {/* Total Questions */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Total Questions in Paper
              </label>
              <span className="text-xs font-bold text-slate-900 tabular-nums">
                {totalQuestions} Questions
              </span>
            </div>
            <input
              type="number"
              min="10"
              max="300"
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(Math.max(1, Number(e.target.value)))}
              className="w-full text-sm border border-slate-300 rounded-lg px-3.5 py-2 text-slate-900"
            />
          </div>

          {/* Correct Questions */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Correct Answers
              </label>
              <span className="text-xs font-bold text-emerald-700 tabular-nums">
                {correctCount}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max={totalQuestions}
                value={correctCount}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCorrectCount(val);
                  if (val + incorrectCount > totalQuestions) {
                    setIncorrectCount(totalQuestions - val);
                  }
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <input
                type="number"
                min="0"
                max={totalQuestions}
                value={correctCount}
                onChange={(e) => {
                  const val = Math.min(totalQuestions, Math.max(0, Number(e.target.value)));
                  setCorrectCount(val);
                  if (val + incorrectCount > totalQuestions) {
                    setIncorrectCount(totalQuestions - val);
                  }
                }}
                className="w-20 text-sm border border-slate-300 rounded-lg px-2.5 py-1.5 text-center font-bold text-emerald-700"
              />
            </div>
          </div>

          {/* Incorrect Questions */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-rose-800 flex items-center gap-1.5 uppercase tracking-wider">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                Incorrect / Wrong Answers
              </label>
              <span className="text-xs font-bold text-rose-700 tabular-nums">
                {incorrectCount}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max={totalQuestions - correctCount}
                value={incorrectCount}
                onChange={(e) => setIncorrectCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
              <input
                type="number"
                min="0"
                max={totalQuestions - correctCount}
                value={incorrectCount}
                onChange={(e) => {
                  const maxAllowed = totalQuestions - correctCount;
                  setIncorrectCount(Math.min(maxAllowed, Math.max(0, Number(e.target.value))));
                }}
                className="w-20 text-sm border border-slate-300 rounded-lg px-2.5 py-1.5 text-center font-bold text-rose-700"
              />
            </div>
          </div>

          {/* Visual Bar Breakdown */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>Attempted: {calculatedStats.attempted}</span>
              <span>Unattempted: {calculatedStats.unattempted}</span>
            </div>
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${(correctCount / totalQuestions) * 100}%` }}
                className="bg-emerald-500 h-full transition-all duration-300"
                title={`Correct: ${correctCount}`}
              />
              <div
                style={{ width: `${(incorrectCount / totalQuestions) * 100}%` }}
                className="bg-rose-500 h-full transition-all duration-300"
                title={`Incorrect: ${incorrectCount}`}
              />
              <div
                style={{ width: `${(calculatedStats.unattempted / totalQuestions) * 100}%` }}
                className="bg-slate-300 h-full transition-all duration-300"
                title={`Unattempted: ${calculatedStats.unattempted}`}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Correct ({correctCount})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Wrong ({incorrectCount})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-400" /> Skipped ({calculatedStats.unattempted})
              </span>
            </div>
          </div>
        </div>

        {/* Right Output Scorecard */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Primary Net Score Display */}
            <div className="p-6 rounded-xl bg-slate-900 text-white shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Final Net Raw Marks
                </span>
                <span className="text-xs text-blue-400 font-medium">
                  Out of {calculatedStats.maxScore.toFixed(1)} Marks
                </span>
              </div>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white tabular-nums">
                  {calculatedStats.netScore.toFixed(2)}
                </span>
                <span className="text-sm text-slate-400">marks</span>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                  <span className="text-[11px] text-slate-400 block">Gross Marks (+)</span>
                  <span className="text-lg font-bold text-emerald-400 tabular-nums">
                    +{calculatedStats.grossScore.toFixed(2)}
                  </span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                  <span className="text-[11px] text-slate-400 block">Negative Deducted (-)</span>
                  <span className="text-lg font-bold text-rose-400 tabular-nums">
                    -{calculatedStats.negativePenalty.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance & Accuracy Card */}
            <div className={`p-4 rounded-xl border ${calculatedStats.band.bg}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Accuracy & Efficiency
                  </span>
                </div>
                <span className={`text-xs font-bold ${calculatedStats.band.color}`}>
                  {calculatedStats.accuracyRate.toFixed(1)}% Accuracy
                </span>
              </div>

              <div className="mt-2 text-xs text-slate-700 leading-relaxed">
                <strong>Status:</strong> {calculatedStats.band.label}. You scored{' '}
                <strong>{calculatedStats.scorePercentage.toFixed(1)}%</strong> of total available marks in this simulation.
              </div>
            </div>

            {/* Step-by-Step Mathematical Gazette Formula */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/60 text-xs space-y-2">
              <div className="font-semibold text-slate-800 mb-2 flex items-center justify-between">
                <span>Official Scoring Formula Breakdown</span>
                <span className="text-slate-500 font-normal">Formula Check</span>
              </div>
              <div className="font-mono text-[11px] bg-white p-2.5 rounded border border-slate-200 text-slate-800 space-y-1">
                <div>Net Score = (Correct × {calculatedStats.marksPerCorrect}) − (Wrong × {calculatedStats.penaltyPerWrong.toFixed(2)})</div>
                <div>Net Score = ({correctCount} × {calculatedStats.marksPerCorrect}) − ({incorrectCount} × {calculatedStats.penaltyPerWrong.toFixed(2)})</div>
                <div className="font-bold text-blue-700 pt-0.5">
                  Net Score = {calculatedStats.grossScore.toFixed(2)} − {calculatedStats.negativePenalty.toFixed(2)} = {calculatedStats.netScore.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
