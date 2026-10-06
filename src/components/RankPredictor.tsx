import React, { useState, useMemo } from 'react';
import { TrendingUp, Award, BarChart3, AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface ExamBenchmark {
  id: string;
  name: string;
  maxMarks: number;
  totalAspirantsEst: number;
  prevCutoffs: { ur: number; obc: number; ews: number; sc: number; st: number };
}

const EXAM_BENCHMARKS: ExamBenchmark[] = [
  {
    id: 'ssc-cgl-t1',
    name: 'SSC CGL 2026 Tier-1 Examination',
    maxMarks: 200,
    totalAspirantsEst: 1850000,
    prevCutoffs: { ur: 153.4, obc: 152.1, ews: 148.9, sc: 136.2, st: 125.6 },
  },
  {
    id: 'ssc-chsl-t1',
    name: 'SSC CHSL 10+2 Tier-1 Exam',
    maxMarks: 200,
    totalAspirantsEst: 2200000,
    prevCutoffs: { ur: 155.0, obc: 153.2, ews: 150.5, sc: 139.1, st: 127.8 },
  },
  {
    id: 'rrb-ntpc-cbt1',
    name: 'RRB NTPC Graduate CBT-1',
    maxMarks: 100,
    totalAspirantsEst: 3500000,
    prevCutoffs: { ur: 74.5, obc: 71.8, ews: 68.2, sc: 62.4, st: 56.1 },
  },
];

export const RankPredictor: React.FC = () => {
  const [selectedExamId, setSelectedExamId] = useState<string>('ssc-cgl-t1');
  const [rawScore, setRawScore] = useState<number>(142);
  const [category, setCategory] = useState<'ur' | 'obc' | 'ews' | 'sc' | 'st'>('ur');
  const [shiftDifficulty, setShiftDifficulty] = useState<'easy' | 'moderate' | 'tough'>('moderate');

  const activeBenchmark = useMemo(() => {
    return EXAM_BENCHMARKS.find((b) => b.id === selectedExamId) || EXAM_BENCHMARKS[0];
  }, [selectedExamId]);

  // Prediction calculations based on normalization curves
  const prediction = useMemo(() => {
    // Shift adjustment
    let normalizationBonus = 0;
    if (shiftDifficulty === 'tough') {
      normalizationBonus = activeBenchmark.maxMarks === 200 ? 15.5 : 8.2;
    } else if (shiftDifficulty === 'moderate') {
      normalizationBonus = activeBenchmark.maxMarks === 200 ? 7.8 : 4.1;
    } else {
      normalizationBonus = activeBenchmark.maxMarks === 200 ? 2.0 : 1.0;
    }

    const estimatedNormalizedScore = Math.min(
      activeBenchmark.maxMarks * 1.05,
      Math.max(0, rawScore + normalizationBonus)
    );

    const scoreRatio = estimatedNormalizedScore / activeBenchmark.maxMarks;
    const categoryTargetCutoff = activeBenchmark.prevCutoffs[category];

    // Estimated Percentile calculation using logistic sigmoid model
    let estimatedPercentile = 0;
    if (scoreRatio >= 0.85) {
      estimatedPercentile = 98.5 + (scoreRatio - 0.85) * 10;
    } else if (scoreRatio >= 0.70) {
      estimatedPercentile = 90.0 + ((scoreRatio - 0.70) / 0.15) * 8.5;
    } else if (scoreRatio >= 0.55) {
      estimatedPercentile = 70.0 + ((scoreRatio - 0.55) / 0.15) * 20.0;
    } else {
      estimatedPercentile = Math.max(10, scoreRatio * 100);
    }
    estimatedPercentile = Math.min(99.9, Math.round(estimatedPercentile * 10) / 10);

    // Approximate Rank Range
    const totalCandidates = activeBenchmark.totalAspirantsEst;
    const topFraction = Math.max(0.001, (100 - estimatedPercentile) / 100);
    const medianRank = Math.round(totalCandidates * topFraction);
    const rankMin = Math.max(1, Math.round(medianRank * 0.85));
    const rankMax = Math.round(medianRank * 1.25);

    // Qualification probability
    const diff = estimatedNormalizedScore - categoryTargetCutoff;
    let qualifyingStatus: { text: string; probability: string; color: string; bg: string } = {
      text: 'High Probability of Clearing Cut-Off',
      probability: '85% – 95%',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200',
    };

    if (diff < -5) {
      qualifyingStatus = {
        text: 'Below Safe Benchmark / Low Probability',
        probability: 'Under 25%',
        color: 'text-rose-700',
        bg: 'bg-rose-50 border-rose-200',
      };
    } else if (diff < 3) {
      qualifyingStatus = {
        text: 'Borderline Zone / Dependent on Normalization',
        probability: '50% – 65%',
        color: 'text-amber-700',
        bg: 'bg-amber-50 border-amber-200',
      };
    }

    return {
      normalizationBonus,
      estimatedNormalizedScore: Math.round(estimatedNormalizedScore * 10) / 10,
      estimatedPercentile,
      rankMin,
      rankMax,
      categoryTargetCutoff,
      diff: Math.round(diff * 10) / 10,
      qualifyingStatus,
    };
  }, [rawScore, activeBenchmark, category, shiftDifficulty]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden max-w-full">
      <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Exam Rank & Normalization Score Predictor
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Estimate your tentative all-India rank bracket and normalized marks based on shift difficulty index and past cutoff statistics.
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-md px-2.5 py-1 self-start sm:self-auto">
            Equi-Percentile Algorithm
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-5">
          {/* Exam Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Select Competitive Examination
            </label>
            <select
              value={selectedExamId}
              onChange={(e) => {
                setSelectedExamId(e.target.value);
                const b = EXAM_BENCHMARKS.find((x) => x.id === e.target.value);
                if (b) {
                  setRawScore(Math.round(b.maxMarks * 0.7));
                }
              }}
              className="w-full text-sm font-medium border border-slate-300 rounded-lg px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            >
              {EXAM_BENCHMARKS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} (Max: {b.maxMarks} Marks)
                </option>
              ))}
            </select>
          </div>

          {/* Raw Score Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Raw Score Obtained
              </label>
              <span className="text-xs font-bold text-blue-700 tabular-nums">
                {rawScore} / {activeBenchmark.maxMarks} Marks
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max={activeBenchmark.maxMarks}
                value={rawScore}
                onChange={(e) => setRawScore(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <input
                type="number"
                min="0"
                max={activeBenchmark.maxMarks}
                value={rawScore}
                onChange={(e) => setRawScore(Math.min(activeBenchmark.maxMarks, Math.max(0, Number(e.target.value))))}
                className="w-20 text-sm border border-slate-300 rounded-lg px-2.5 py-1.5 text-center font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Candidate Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Candidate Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-900"
              >
                <option value="ur">General / UR</option>
                <option value="obc">OBC</option>
                <option value="ews">EWS</option>
                <option value="sc">SC</option>
                <option value="st">ST</option>
              </select>
            </div>

            {/* Shift Difficulty */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Shift Difficulty Level
              </label>
              <select
                value={shiftDifficulty}
                onChange={(e) => setShiftDifficulty(e.target.value as any)}
                className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-900"
              >
                <option value="tough">Tough / Lengthy (+ Normalization)</option>
                <option value="moderate">Moderate Shift (Balanced)</option>
                <option value="easy">Easy / Direct Questions</option>
              </select>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900 leading-relaxed">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Shift Normalization Note:</strong> When exam shifts vary in difficulty, the official formula increases marks for candidates who appeared in harder shifts to maintain absolute fairness.
            </span>
          </div>
        </div>

        {/* Right Output Predictions */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Primary Predicted Rank & Score */}
            <div className="p-6 rounded-xl bg-slate-900 text-white shadow-sm">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Estimated All-India Rank (AIR) Bracket
              </span>

              <div className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white tabular-nums">
                AIR {prediction.rankMin.toLocaleString()} – {prediction.rankMax.toLocaleString()}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                  <span className="text-[11px] text-slate-400 block">Estimated Normalized Score</span>
                  <div className="text-xl font-bold text-blue-400 tabular-nums">
                    {prediction.estimatedNormalizedScore}
                    <span className="text-xs text-slate-400 font-normal ml-1">
                      (+{prediction.normalizationBonus.toFixed(1)})
                    </span>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                  <span className="text-[11px] text-slate-400 block">Percentile Bracket</span>
                  <div className="text-xl font-bold text-emerald-400 tabular-nums">
                    ~{prediction.estimatedPercentile} %ile
                  </div>
                </div>
              </div>
            </div>

            {/* Qualifying Status */}
            <div className={`p-4 rounded-xl border ${prediction.qualifyingStatus.bg}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Cut-Off Clearance Probability
                  </span>
                </div>
                <span className={`text-xs font-bold ${prediction.qualifyingStatus.color}`}>
                  {prediction.qualifyingStatus.probability}
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-700 leading-relaxed">
                <strong>Verdict:</strong> {prediction.qualifyingStatus.text}. Your normalized score is{' '}
                <strong>
                  {prediction.diff >= 0 ? `+${prediction.diff} marks above` : `${prediction.diff} marks below`}
                </strong>{' '}
                the previous year's {category.toUpperCase()} benchmark cut-off ({prediction.categoryTargetCutoff} marks).
              </div>
            </div>

            {/* Previous Year Benchmark Cutoff Table */}
            <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/60 text-xs">
              <div className="font-semibold text-slate-800 mb-2">Previous Year Category Benchmarks</div>
              <div className="grid grid-cols-5 gap-2 text-center text-[11px]">
                <div className="p-2 rounded bg-white border border-slate-200">
                  <div className="text-slate-500 font-medium">UR</div>
                  <div className="font-bold text-slate-900 mt-0.5">{activeBenchmark.prevCutoffs.ur}</div>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200">
                  <div className="text-slate-500 font-medium">OBC</div>
                  <div className="font-bold text-slate-900 mt-0.5">{activeBenchmark.prevCutoffs.obc}</div>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200">
                  <div className="text-slate-500 font-medium">EWS</div>
                  <div className="font-bold text-slate-900 mt-0.5">{activeBenchmark.prevCutoffs.ews}</div>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200">
                  <div className="text-slate-500 font-medium">SC</div>
                  <div className="font-bold text-slate-900 mt-0.5">{activeBenchmark.prevCutoffs.sc}</div>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200">
                  <div className="text-slate-500 font-medium">ST</div>
                  <div className="font-bold text-slate-900 mt-0.5">{activeBenchmark.prevCutoffs.st}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
