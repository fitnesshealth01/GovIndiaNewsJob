import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Printer,
  Copy,
  Check,
  Flame,
  ArrowRight,
  ShieldAlert,
  Info,
  Layers,
  Award,
} from 'lucide-react';

interface UPBoardGapDayCalculatorProps {
  onNavigate?: (path: string) => void;
  embedded?: boolean;
}

interface ExamPaper {
  id: string;
  subject: string;
  stream: 'both' | 'pcm' | 'pcb';
  dateStr: string;
  examDate: string; // ISO string for countdown
  shift: string;
  gapBeforeDays: number;
  gapDatesText: string;
  riskLevel: 'critical' | 'extended' | 'normal';
  riskLabel: string;
  coreAction: string;
}

const SCIENCE_EXAMS: ExamPaper[] = [
  {
    id: 'hindi',
    subject: 'General Hindi / Sahityik Hindi',
    stream: 'both',
    dateStr: 'Friday, 5 February 2027',
    examDate: '2027-02-05T14:00:00+05:30',
    shift: 'Afternoon (2:00 pm – 5:15 pm)',
    gapBeforeDays: 0,
    gapDatesText: 'First Core Paper',
    riskLevel: 'normal',
    riskLabel: 'First Paper',
    coreAction: 'Sets psychological momentum. Finish prose, poetry, and character sketches before 4 Feb.',
  },
  {
    id: 'english',
    subject: 'English (General & Core)',
    stream: 'both',
    dateStr: 'Monday, 8 February 2027',
    examDate: '2027-02-08T14:00:00+05:30',
    shift: 'Afternoon (2:00 pm – 5:15 pm)',
    gapBeforeDays: 2,
    gapDatesText: '2 Free Days (Sat 6, Sun 7 Feb)',
    riskLevel: 'normal',
    riskLabel: '2-Day Gap',
    coreAction: 'Literature + Grammar + 2 bonus maintenance hours for Physics derivations or Chemistry.',
  },
  {
    id: 'maths',
    subject: 'Mathematics (PCM)',
    stream: 'pcm',
    dateStr: 'Friday, 12 February 2027',
    examDate: '2027-02-12T14:00:00+05:30',
    shift: 'Afternoon (2:00 pm – 5:15 pm)',
    gapBeforeDays: 3,
    gapDatesText: '3 Free Days (Tue 9, Wed 10, Thu 11 Feb)',
    riskLevel: 'extended',
    riskLabel: 'Longest Gap (3 Days)',
    coreAction: 'Deep-dive sprint: Calculus (Integration & Differential Eq.), Vectors & 3D Geometry, Linear Programming.',
  },
  {
    id: 'biology',
    subject: 'Biology (PCB)',
    stream: 'pcb',
    dateStr: 'Friday, 12 February 2027',
    examDate: '2027-02-12T14:00:00+05:30',
    shift: 'Afternoon (2:00 pm – 5:15 pm)',
    gapBeforeDays: 3,
    gapDatesText: '3 Free Days (Tue 9, Wed 10, Thu 11 Feb)',
    riskLevel: 'extended',
    riskLabel: 'Longest Gap (3 Days)',
    coreAction: 'Deep-dive sprint: Genetics & Evolution, Biotechnology principles, Human Physiology diagrams.',
  },
  {
    id: 'chemistry',
    subject: 'Chemistry (Physical, Organic, Inorganic)',
    stream: 'both',
    dateStr: 'Monday, 15 February 2027',
    examDate: '2027-02-15T14:00:00+05:30',
    shift: 'Afternoon (2:00 pm – 5:15 pm)',
    gapBeforeDays: 2,
    gapDatesText: '2 Free Days (Sat 13, Sun 14 Feb)',
    riskLevel: 'normal',
    riskLabel: '2-Day Gap',
    coreAction: 'Name reactions + Colligative/Nernst formulas + Mandatory 90-min Physics formula pass Sunday evening.',
  },
  {
    id: 'physics',
    subject: 'Physics (Core Derivations & Ray Optics)',
    stream: 'both',
    dateStr: 'Wednesday, 17 February 2027',
    examDate: '2027-02-17T14:00:00+05:30',
    shift: 'Afternoon (2:00 pm – 5:15 pm)',
    gapBeforeDays: 1,
    gapDatesText: '1 Single Day (Tuesday, 16 Feb)',
    riskLevel: 'critical',
    riskLabel: 'CRITICAL BOTTLENECK (1 Day)',
    coreAction: 'HIGH RISK: Only 24 hours between Chem and Physics. Zero new topics! Formula pass and derivations only.',
  },
];

export const UPBoardGapDayCalculator: React.FC<UPBoardGapDayCalculatorProps> = ({
  onNavigate,
  embedded = false,
}) => {
  const [stream, setStream] = useState<'pcm' | 'pcb'>('pcm');
  const [dailyHours, setDailyHours] = useState<number>(10);
  const [copied, setCopied] = useState<boolean>(false);

  // Checked items stored in localStorage
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('upboard_2027_checklist');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const toggleCheck = (key: string) => {
    setCheckedMap((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('upboard_2027_checklist', JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  };

  const resetChecklist = () => {
    setCheckedMap({});
    try {
      localStorage.removeItem('upboard_2027_checklist');
    } catch {
      // ignore
    }
  };

  // Filter exams by selected stream
  const activeExams = useMemo(() => {
    return SCIENCE_EXAMS.filter(
      (exam) => exam.stream === 'both' || exam.stream === stream
    );
  }, [stream]);

  // Live countdown state calculated against 5 Feb 2027
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2027-02-05T14:00:00+05:30').getTime();

    const calculate = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalGapDays = useMemo(() => {
    return activeExams.reduce((acc, curr) => acc + curr.gapBeforeDays, 0);
  }, [activeExams]);

  const totalStudyHoursInGaps = totalGapDays * dailyHours;

  const handleCopyPlan = () => {
    const text = `GovIndiaNews — UP Board 2027 Class 12 Science (${stream.toUpperCase()}) Gap-Day Revision Schedule:
Exam Period: 5 Feb – 17 Feb 2027 (Afternoon Shift 2:00 PM - 5:15 PM)
Total Free Gap Days: ${totalGapDays} Days (~${totalStudyHoursInGaps} Revision Hours at ${dailyHours}h/day)

Schedule Sequence:
1. Fri 5 Feb: Hindi (Kickoff)
2. Mon 8 Feb: English (2 Days Gap: Sat 6, Sun 7 Feb)
3. Fri 12 Feb: ${stream === 'pcm' ? 'Mathematics' : 'Biology'} (3 Days Gap: Tue 9, Wed 10, Thu 11 Feb — Longest Sprint)
4. Mon 15 Feb: Chemistry (2 Days Gap: Sat 13, Sun 14 Feb + Physics Pre-Pass)
5. Wed 17 Feb: Physics (1 Day Gap: Tue 16 Feb — CRITICAL BOTTLENECK: No new topics!)

Official Source & Calculator: https://govindianews.com/blog/up-board-2027-class-12-science-gap-day-revision-plan`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-6 p-5 sm:p-7 print:border-none print:shadow-none">
      {/* Tool Header & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Gap-Day Revision Calculator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            UP Board 2027 Class 12 Science Gap Planner
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Simulate your study runway, monitor critical bottlenecks, and allocate gap-day revision hours.
          </p>
        </div>

        {/* Stream Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200">
          <button
            type="button"
            onClick={() => setStream('pcm')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              stream === 'pcm'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            PCM (Maths)
          </button>
          <button
            type="button"
            onClick={() => setStream('pcb')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              stream === 'pcb'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            PCB (Biology)
          </button>
        </div>
      </div>

      {/* Live Countdown Grid to 5 February 2027 */}
      <div className="bg-linear-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Countdown to First Board Paper (Friday, 5 Feb 2027)
            </span>
          </div>
          <span className="text-xs text-amber-300 font-semibold bg-amber-950/60 border border-amber-700/50 px-2.5 py-0.5 rounded">
            Afternoon Shift · 2:00 pm – 5:15 pm
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center pt-4">
          <div className="bg-white/10 rounded-lg p-2.5 sm:p-3 border border-white/10">
            <div className="text-2xl sm:text-4xl font-black text-amber-400 font-mono">
              {timeLeft.days}
            </div>
            <div className="text-[10px] sm:text-xs font-medium text-slate-300 uppercase tracking-wide mt-1">
              Days Left
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-2.5 sm:p-3 border border-white/10">
            <div className="text-2xl sm:text-4xl font-black text-white font-mono">
              {timeLeft.hours}
            </div>
            <div className="text-[10px] sm:text-xs font-medium text-slate-300 uppercase tracking-wide mt-1">
              Hours
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-2.5 sm:p-3 border border-white/10">
            <div className="text-2xl sm:text-4xl font-black text-white font-mono">
              {timeLeft.minutes}
            </div>
            <div className="text-[10px] sm:text-xs font-medium text-slate-300 uppercase tracking-wide mt-1">
              Minutes
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-2.5 sm:p-3 border border-white/10">
            <div className="text-2xl sm:text-4xl font-black text-emerald-400 font-mono">
              {timeLeft.seconds}
            </div>
            <div className="text-[10px] sm:text-xs font-medium text-slate-300 uppercase tracking-wide mt-1">
              Seconds
            </div>
          </div>
        </div>
      </div>

      {/* Daily Study Hours Slider & Calculated Capacity */}
      <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Daily Study Target During Exam Gaps
          </div>
          <div className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <span>{dailyHours} Hours / Day</span>
            <span className="text-xs font-normal text-slate-500">
              (Total Gap Budget: <strong className="text-blue-700">{totalStudyHoursInGaps} Hours</strong> across {totalGapDays} free days)
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Adjust your daily target to see exact recommended hour allocations per subject gap.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="range"
            min="6"
            max="14"
            step="1"
            value={dailyHours}
            onChange={(e) => setDailyHours(Number(e.target.value))}
            className="w-36 sm:w-44 accent-blue-700 cursor-pointer"
          />
          <div className="px-3 py-1 bg-white border border-slate-300 rounded-md font-mono text-sm font-bold text-slate-900">
            {dailyHours}h
          </div>
        </div>
      </div>

      {/* Visual Sequence of Exams & Real Gaps */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-700" />
            <span>Interactive Exam Sequence & Gap Intensity Visualizer</span>
          </h3>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Shift: 2:00 PM – 5:15 PM (All Papers)
          </span>
        </div>

        <div className="space-y-3">
          {activeExams.map((exam, idx) => {
            const hoursForThisGap = exam.gapBeforeDays * dailyHours;

            return (
              <div
                key={exam.id}
                className={`rounded-xl border p-4 transition-all ${
                  exam.riskLevel === 'critical'
                    ? 'border-red-300 bg-red-50/60'
                    : exam.riskLevel === 'extended'
                    ? 'border-emerald-300 bg-emerald-50/50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                        <span>{exam.subject}</span>
                        {exam.riskLevel === 'critical' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-red-600 text-white animate-pulse">
                            <AlertTriangle className="w-3 h-3" />
                            <span>1-Day Bottleneck</span>
                          </span>
                        )}
                        {exam.riskLevel === 'extended' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-700 text-white">
                            <Sparkles className="w-3 h-3" />
                            <span>Sprint Window</span>
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-600 flex items-center gap-2 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-800">{exam.dateStr}</span>
                        <span>·</span>
                        <span>{exam.shift}</span>
                      </div>
                    </div>
                  </div>

                  {/* Free days badge */}
                  <div className="sm:text-right pl-9 sm:pl-0">
                    <div className="text-xs font-bold text-slate-800">
                      {exam.gapDatesText}
                    </div>
                    {exam.gapBeforeDays > 0 && (
                      <div className="text-[11px] font-semibold text-blue-700">
                        Allocated Budget: ~{hoursForThisGap} Hours
                      </div>
                    )}
                  </div>
                </div>

                {/* Core Tactical Action */}
                <div className="mt-3 pt-3 border-t border-slate-200/60 pl-9 text-xs text-slate-700 flex items-start gap-2">
                  <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Tactical Strategy: </strong>
                    {exam.coreAction}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Critical Bottleneck Alert Banner */}
      <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-xl space-y-1">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Strategic Alert for Chemistry $\to$ Physics (15 Feb to 17 Feb)</span>
        </div>
        <p className="text-xs text-amber-800 leading-relaxed">
          Chemistry ends at 5:15 PM on Monday, 15 February, and Physics starts at 2:00 PM on Wednesday, 17 February.
          You have strictly <strong>one preparation day (Tuesday, 16 Feb)</strong>. Physics is the heaviest derivation paper in the curriculum.
          <strong> Rule of Thumb:</strong> Complete 100% of your Physics derivation handbook and ray diagrams before 15 February. Never use the single gap day to learn new material.
        </p>
      </div>

      {/* Interactive Gap-Day Checklist with LocalStorage */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Candidate Milestone & Gap-Day Checklist
            </h3>
          </div>
          <button
            type="button"
            onClick={resetChecklist}
            className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
          >
            Reset Checklist
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {[
            {
              id: 'c1',
              label: 'Printed official UPMSP 2027 admit card & confirmed afternoon shift (2:00 pm).',
            },
            {
              id: 'c2',
              label: 'Completed and bound all Physics & Chemistry practical laboratory records.',
            },
            {
              id: 'c3',
              label: 'Compiled one-page formula reference summaries for Physics & Physical Chemistry.',
            },
            {
              id: 'c4',
              label: 'Solved last 5 years UP Board question papers (2020–2026) for all 5 subjects.',
            },
            {
              id: 'c5',
              label: 'Practiced 3 full-length 3 hr 15 min mock tests strictly between 2:00 pm – 5:15 pm.',
            },
            {
              id: 'c6',
              label: stream === 'pcm'
                ? 'Mastered Calculus (Integration, Diff. Eq.) and 3D skew lines for 12 Feb paper.'
                : 'Mastered Genetics, Molecular Basis of Inheritance & labeled reproductive diagrams.',
            },
            {
              id: 'c7',
              label: 'Memorized all 25 core organic name reactions and chemical distinction tests.',
            },
            {
              id: 'c8',
              label: 'Locked in Physics derivations by 14 Feb to survive the 1-day Chemistry-to-Physics gap.',
            },
          ].map((item) => {
            const isDone = !!checkedMap[item.id];
            return (
              <label
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer select-none transition-colors ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-medium'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => {}}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 shrink-0"
                />
                <span>{item.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Export & Action Buttons */}
      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="text-slate-500">
          Stream: <strong>{stream.toUpperCase()}</strong> · Free Days: <strong>{totalGapDays}</strong> · Hours: <strong>~{totalStudyHoursInGaps}h</strong>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyPlan}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Plan!' : 'Copy Study Plan'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Schedule</span>
          </button>
        </div>
      </div>
    </div>
  );
};
