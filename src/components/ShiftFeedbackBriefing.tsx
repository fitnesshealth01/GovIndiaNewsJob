import React, { useState } from 'react';
import { MessageSquare, BarChart2, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react';

interface ShiftReview {
  shiftNumber: string;
  shiftName: string;
  time: string;
  overallDifficulty: 'Easy to Moderate' | 'Moderate' | 'Moderate to Calculative';
  goodAttempts: string;
  safeScoreTarget: string;
  sections: {
    name: string;
    level: string;
    goodAttempts: string;
    keyTopics: string;
  }[];
  studentConsensus: string;
}

const SHIFT_REVIEWS: ShiftReview[] = [
  {
    shiftNumber: '1',
    shiftName: 'Shift 1 (Morning Session)',
    time: '09:00 AM – 10:00 AM',
    overallDifficulty: 'Easy to Moderate',
    goodAttempts: '76 – 82 Questions',
    safeScoreTarget: '142 – 148 Raw Marks',
    sections: [
      { name: 'General Intelligence & Reasoning', level: 'Easy', goodAttempts: '22 – 24', keyTopics: 'Coding-Decoding (3), Syllogism (2), Mirror Image (2), Series (3)' },
      { name: 'General Awareness & Current Affairs', level: 'Moderate', goodAttempts: '14 – 17', keyTopics: 'Article 51A, Classical Dances, Khelo India Games 2026, Census 2011' },
      { name: 'Quantitative Aptitude', level: 'Moderate (Calculative)', goodAttempts: '19 – 21', keyTopics: 'CI/SI Difference, Geometry Circles, Trigonometry Heights & Distances' },
      { name: 'English Comprehension', level: 'Easy', goodAttempts: '22 – 24', keyTopics: 'Cloze Test on Climate, Idiom "Bite the Bullet", Direct/Indirect speech' },
    ],
    studentConsensus: 'Math section featured 3 calculative arithmetic problems in compound interest and time-work, but Reasoning and English were very scoring with high direct repetition from 2024-2025 PYQs.',
  },
  {
    shiftNumber: '2',
    shiftName: 'Shift 2 (Noon Session)',
    time: '11:45 AM – 12:45 PM',
    overallDifficulty: 'Moderate',
    goodAttempts: '73 – 79 Questions',
    safeScoreTarget: '138 – 144 Raw Marks',
    sections: [
      { name: 'General Intelligence & Reasoning', level: 'Easy to Moderate', goodAttempts: '21 – 23', keyTopics: 'Blood Relations statement type, Seating arrangement circular (6 persons)' },
      { name: 'General Awareness & Current Affairs', level: 'Moderate to Tricky', goodAttempts: '13 – 16', keyTopics: 'Green Revolution phases, Fundamental Duties amendments, G20 outcomes' },
      { name: 'Quantitative Aptitude', level: 'Moderate', goodAttempts: '18 – 20', keyTopics: 'DI Bar Chart (4 questions), Successive Discount, Mensuration Cylinder cone' },
      { name: 'English Comprehension', level: 'Easy', goodAttempts: '21 – 23', keyTopics: 'Reading Comprehension technology theme, Antonym "Ephemeral", Spelling errors' },
    ],
    studentConsensus: 'Slightly higher calculation load in Quantitative Aptitude DI graphs. GK was balanced between polity articles and sports awards.',
  },
  {
    shiftNumber: '3',
    shiftName: 'Shift 3 (Afternoon Session)',
    time: '02:30 PM – 03:30 PM',
    overallDifficulty: 'Moderate to Calculative',
    goodAttempts: '71 – 77 Questions',
    safeScoreTarget: '135 – 142 Raw Marks',
    sections: [
      { name: 'General Intelligence & Reasoning', level: 'Moderate', goodAttempts: '20 – 22', keyTopics: 'Matrix puzzle, Analogy numbers, Dice folding orientation' },
      { name: 'General Awareness & Current Affairs', level: 'Moderate', goodAttempts: '13 – 15', keyTopics: 'Mughal Architecture monuments, Nobel Prize in Physics, River tributaries' },
      { name: 'Quantitative Aptitude', level: 'Calculative', goodAttempts: '17 – 19', keyTopics: 'Partnership profit sharing with time fractions, Algebra $x+1/x$, Speed-Boat upstream' },
      { name: 'English Comprehension', level: 'Easy to Moderate', goodAttempts: '21 – 23', keyTopics: 'Para Jumbles (4 sentences), One Word Substitution, Active-Passive voice' },
    ],
    studentConsensus: 'Shift 3 candidate reports show higher algebraic calculations and multi-step arithmetic, making time management decisive. Will receive positive normalization adjustment.',
  },
  {
    shiftNumber: '4',
    shiftName: 'Shift 4 (Evening Session)',
    time: '05:15 PM – 06:15 PM',
    overallDifficulty: 'Easy to Moderate',
    goodAttempts: '75 – 81 Questions',
    safeScoreTarget: '140 – 146 Raw Marks',
    sections: [
      { name: 'General Intelligence & Reasoning', level: 'Easy', goodAttempts: '22 – 24', keyTopics: 'Embedded figures, Venn diagrams 3 entities, Alphabetical series' },
      { name: 'General Awareness & Current Affairs', level: 'Moderate', goodAttempts: '14 – 16', keyTopics: 'Cabinet Ministers 2026, 73rd Constitutional Amendment, Biosphere reserves' },
      { name: 'Quantitative Aptitude', level: 'Moderate', goodAttempts: '18 – 21', keyTopics: 'Profit & Loss marked price markup, Simple Interest installment, Triangle similarity' },
      { name: 'English Comprehension', level: 'Easy', goodAttempts: '22 – 24', keyTopics: 'Synonym "Perseverance", Error spotting in Subject-Verb agreement, Narration' },
    ],
    studentConsensus: 'Standard balanced evening paper. Candidates who attempted English and Reasoning first finished 15 minutes ahead of schedule.',
  },
];

export const ShiftFeedbackBriefing: React.FC<{ examName?: string }> = ({ examName = 'CBT Examination' }) => {
  const [activeShiftIndex, setActiveShiftIndex] = useState<number>(0);

  const activeShift = SHIFT_REVIEWS[activeShiftIndex];

  return (
    <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-2xs">
            <BarChart2 className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Live Shift Feedback, Difficulty Analysis & Good Attempts Benchmark
            </h3>
            <p className="text-[11px] text-slate-500">
              Aggregated candidate exit polls, section weightage & safe score targets for {examName}.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Multi-Shift Verified
        </span>
      </div>

      {/* Shift Switcher Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {SHIFT_REVIEWS.map((shift, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveShiftIndex(idx)}
            className={`p-2 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
              activeShiftIndex === idx
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
            }`}
          >
            <div className="font-bold text-[11px]">Shift {shift.shiftNumber}</div>
            <div className={`text-[10px] truncate ${activeShiftIndex === idx ? 'text-indigo-100' : 'text-slate-500'}`}>
              {shift.time.split('–')[0].trim()}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Shift Analysis Card */}
      <div className="border border-indigo-100 bg-indigo-50/20 rounded-xl p-4 space-y-4">
        {/* Top Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Overall Paper Level</span>
            <span className="font-bold text-slate-900 text-xs text-indigo-700">{activeShift.overallDifficulty}</span>
          </div>

          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Consensus Good Attempts</span>
            <span className="font-bold text-slate-900 text-xs text-emerald-700">{activeShift.goodAttempts}</span>
          </div>

          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Safe Raw Score Target</span>
            <span className="font-bold text-slate-900 text-xs text-amber-700">{activeShift.safeScoreTarget}</span>
          </div>
        </div>

        {/* Section Table */}
        <div className="border border-slate-200 rounded-xl overflow-x-auto bg-white shadow-2xs">
          <table className="w-full text-left text-xs min-w-[500px]">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-2.5">Section Name</th>
                <th className="p-2.5">Difficulty Level</th>
                <th className="p-2.5">Good Attempts</th>
                <th className="p-2.5">High Frequency Topics Reported</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[11px]">
              {activeShift.sections.map((sec, sidx) => (
                <tr key={sidx} className="hover:bg-slate-50/60">
                  <td className="p-2.5 font-bold text-slate-900">{sec.name}</td>
                  <td className="p-2.5">
                    <span
                      className={`px-1.5 py-0.5 rounded font-medium text-[10px] ${
                        sec.level.includes('Easy')
                          ? 'bg-emerald-100 text-emerald-800'
                          : sec.level.includes('Calculative') || sec.level.includes('Tricky')
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {sec.level}
                    </span>
                  </td>
                  <td className="p-2.5 font-semibold text-slate-800">{sec.goodAttempts}</td>
                  <td className="p-2.5 text-slate-600">{sec.keyTopics}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Student Exit Consensus Quote */}
        <div className="p-3 bg-white rounded-xl border border-indigo-200 text-xs space-y-1">
          <strong className="text-indigo-950 font-bold block flex items-center gap-1.5 text-[11px]">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
            <span>Candidate Exit Feedback Summary ({activeShift.shiftName}):</span>
          </strong>
          <p className="text-slate-700 text-[11px] leading-relaxed italic">
            "{activeShift.studentConsensus}"
          </p>
        </div>
      </div>
    </div>
  );
};
