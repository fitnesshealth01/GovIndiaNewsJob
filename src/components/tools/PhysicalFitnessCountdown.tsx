import React, { useState, useEffect, useMemo } from 'react';
import {
  Timer,
  Calendar,
  Flame,
  Award,
  ChevronRight,
  Sparkles,
  Zap,
  Activity,
  Heart,
  ShieldCheck,
  Ruler,
  AlertCircle,
  Share2,
  CheckCircle2,
} from 'lucide-react';

interface PhysicalFitnessCountdownProps {
  onNavigate?: (path: string) => void;
  embedded?: boolean;
}

interface ExamPreset {
  id: string;
  name: string;
  distance: string;
  group1Standard: string;
  group2Standard: string;
  pullUpsRequired: string;
}

const EXAM_PRESETS: ExamPreset[] = [
  {
    id: 'army-agniveer',
    name: 'Indian Army Agniveer Rally (GD / Tradesmen)',
    distance: '1600m (1.6 Km)',
    group1Standard: 'Up to 5 min 30 sec (60 Marks)',
    group2Standard: '5 min 31 sec to 5 min 45 sec (48 Marks)',
    pullUpsRequired: '10 Beam Pull-Ups (40 Marks)',
  },
  {
    id: 'ssc-gd',
    name: 'SSC GD Constable Physical Efficiency Test (PET)',
    distance: '5000m (5 Km) Male / 1600m Female',
    group1Standard: 'Within 24 minutes (Male)',
    group2Standard: 'Within 8 min 30 sec (Female 1.6 Km)',
    pullUpsRequired: 'Qualifying Standard Only',
  },
  {
    id: 'delhi-police-si',
    name: 'Delhi Police SI & CAPF (SSC CPO PET)',
    distance: '1600m (6 min 30 sec) + 100m sprint',
    group1Standard: '1600m in 6.5 mins (Male)',
    group2Standard: '800m in 4 mins (Female)',
    pullUpsRequired: 'Long Jump & High Jump Qualifying',
  },
  {
    id: 'up-police',
    name: 'UP Police Constable Physical Test',
    distance: '4800m (4.8 Km) Male / 2400m Female',
    group1Standard: 'Within 25 minutes (Male)',
    group2Standard: 'Within 14 minutes (Female)',
    pullUpsRequired: 'Qualifying Standard Only',
  },
  {
    id: 'rpf-constable',
    name: 'RPF Sub-Inspector & Constable PET',
    distance: '1600m in 5 min 45 sec (Constable)',
    group1Standard: '1600m in 5 min 45 sec (Male)',
    group2Standard: '800m in 3 min 40 sec (Female)',
    pullUpsRequired: 'Long Jump (14 ft) & High Jump (4 ft)',
  },
];

export const PhysicalFitnessCountdown: React.FC<PhysicalFitnessCountdownProps> = ({
  onNavigate = () => {},
  embedded = false,
}) => {
  // Default target date: 45 days from today
  const defaultDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 45);
    return d.toISOString().split('T')[0];
  }, []);

  const [targetDateStr, setTargetDateStr] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('govindianews_pft_date') || defaultDateStr;
    }
    return defaultDateStr;
  });

  const [selectedExamId, setSelectedExamId] = useState<string>('army-agniveer');
  const [targetGroup, setTargetGroup] = useState<'group1' | 'group2'>('group1');
  const [copiedShare, setCopiedShare] = useState(false);

  // Time left state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateStr + 'T06:00:00');
      const now = new Date();
      const diffMs = target.getTime() - now.getTime();

      if (diffMs <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 });
        return;
      }

      const totalSec = Math.floor(diffMs / 1000);
      const d = Math.floor(totalSec / 86400);
      const h = Math.floor((totalSec % 86400) / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s, totalSeconds: totalSec });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const handleDateChange = (newDate: string) => {
    setTargetDateStr(newDate);
    if (typeof window !== 'undefined') {
      localStorage.setItem('govindianews_pft_date', newDate);
    }
  };

  const handlePresetDays = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    const dateStr = d.toISOString().split('T')[0];
    handleDateChange(dateStr);
  };

  const selectedExam = useMemo(() => {
    return EXAM_PRESETS.find((e) => e.id === selectedExamId) || EXAM_PRESETS[0];
  }, [selectedExamId]);

  // Timeline Phase Engine
  const phaseInfo = useMemo(() => {
    const days = timeLeft.days;

    if (days > 60) {
      return {
        phaseNumber: 1,
        phaseName: 'Aerobic Base & Tendon Resilience',
        phaseColor: 'text-blue-700 bg-blue-50 border-blue-200',
        progressPercent: 20,
        focus: 'Zone 2 low-intensity continuous running to develop capillary density and prevent shin splints.',
        motivation: 'Championship running stamina is forged in the silent miles no one claps for. Build the unbreakable base now.',
        drill: '4 to 5 km easy jog at conversational pace (under 145 BPM). Conclude with 4x100m barefoot strides on soft grass.',
        recoveryTip: 'Roll your calves with a foam roller daily. Ensure 8+ hours of uninterrupted sleep for bone remodeling.',
      };
    } else if (days > 30) {
      return {
        phaseNumber: 2,
        phaseName: 'Lactate Threshold & 800m Intervals',
        phaseColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
        progressPercent: 45,
        focus: 'Escalating your anaerobic threshold so your body clears lactic acid efficiently during intense surges.',
        motivation: 'When your lungs burn on lap 3, your threshold training takes over. Push through the lactic barrier!',
        drill: '4 sets of 800m repeats at target 2:55 – 3:05 split pace, with exactly 2 minutes walking recovery between sets.',
        recoveryTip: 'Consume 25g protein within 30 minutes post-track workout. Keep hydration above 3.5 liters with electrolytes.',
      };
    } else if (days > 14) {
      return {
        phaseNumber: 3,
        phaseName: 'Track Speed Sharpness & 400m Splits',
        phaseColor: 'text-amber-700 bg-amber-50 border-amber-200',
        progressPercent: 70,
        focus: 'Locking down your exact 1600m lap pace (80-82 seconds per lap for Group I standard) with race cadence.',
        motivation: 'Every 400m lap is a calculated battle. Master the split clock and you own the finish line.',
        drill: '6 sets of 400m track laps targeting 78–82 seconds with 90 seconds active rest. Finish with 10 strict dead-hang pull-ups.',
        recoveryTip: 'Incorporate 15 minutes of dynamic groin and hamstring stretches. No heavy weight training this phase.',
      };
    } else if (days > 6) {
      return {
        phaseNumber: 4,
        phaseName: 'Rally Tapering & Neuromuscular Rest',
        phaseColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        progressPercent: 88,
        focus: 'Cutting mileage by 50% to allow glycogen supercompensation while maintaining sharp neural twitch speed.',
        motivation: 'The hard training is complete. Now trust your body, recover your muscles, and prepare for peak energy.',
        drill: '2.5 km light shakeout run + 4 short 80m accelerations. Practice 9-foot ditch leap approach drills without strain.',
        recoveryTip: 'Increase complex carbohydrate intake (rice, oats, sweet potatoes). Avoid trying new footwear or unfamiliar foods.',
      };
    } else if (days > 0) {
      return {
        phaseNumber: 5,
        phaseName: 'Rally Week Execution & Holding Pen Strategy',
        phaseColor: 'text-rose-700 bg-rose-50 border-rose-200',
        progressPercent: 96,
        focus: 'Mental composure, sleep hygiene, holding pen glucose management, and race-day pacing discipline.',
        motivation: 'You have worked for months for this exact morning. Stand tall at the rally line and run with military pride!',
        drill: '15-minute gentle jog + dynamic mobility routine. Pack your energy pouch: glucose, ORS, dates, and clean socks.',
        recoveryTip: 'Hydrate well the day before. On rally morning, sip glucose water slowly in the 2 AM holding enclosure.',
      };
    } else {
      return {
        phaseNumber: 6,
        phaseName: 'Rally Day: Execute With 100% Grit!',
        phaseColor: 'text-emerald-800 bg-emerald-100 border-emerald-300',
        progressPercent: 100,
        focus: 'Settle into lane 1 smoothly, do not panic sprint the first 200m, and kick all-out on the final 300 meters.',
        motivation: 'Today is your day. Claim your Group I timing and make your family proud!',
        drill: 'Warm up dynamically before reporting. Focus on rhythmic 2-in 2-out breathing and smooth arm swing.',
        recoveryTip: 'Hydrate immediately post-race and keep moving to flush lactic acid before medical scrutiny.',
      };
    }
  }, [timeLeft.days]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div className={`space-y-6 ${embedded ? '' : 'max-w-5xl mx-auto'}`}>
      {/* Container Wrapper */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Header Lockup */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-md px-2.5 py-1">
              <Timer className="w-3.5 h-3.5" />
              <span>Physical Fitness Test (PFT) Preparation Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Physical Fitness Test Countdown & Daily Strategy
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
              Input your scheduled recruitment rally or physical test date to unlock your live countdown clock,
              training phase roadmap, and daily military motivation tips.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedShare ? 'Copied!' : 'Share Tool'}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/tools/height')}
              className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5 text-blue-600" />
              <span>Check Height Criteria</span>
            </button>
          </div>
        </div>

        {/* Input Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200">
          {/* 1. Target Exam */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              1. Target Recruitment Examination
            </label>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="w-full text-xs font-medium bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {EXAM_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Target Test Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              2. Scheduled Physical Test Date
            </label>
            <input
              type="date"
              value={targetDateStr}
              onChange={(e) => handleDateChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full text-xs font-medium bg-white border border-slate-300 rounded-lg p-2 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* 3. Goal Pacing Tier */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              3. Target 1600m Running Benchmark
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTargetGroup('group1')}
                className={`p-2 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
                  targetGroup === 'group1'
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Group I (Sub-5:30)
              </button>
              <button
                type="button"
                onClick={() => setTargetGroup('group2')}
                className={`p-2 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
                  targetGroup === 'group2'
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Group II (Sub-5:45)
              </button>
            </div>
          </div>
        </div>

        {/* Quick Date Presets */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold">Quick Presets:</span>
          {[15, 30, 45, 60, 90].map((days) => (
            <button
              key={days}
              type="button"
              onClick={() => handlePresetDays(days)}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition-colors cursor-pointer text-[11px]"
            >
              +{days} Days
            </button>
          ))}
        </div>

        {/* LIVE COUNTDOWN DISPLAY CARD */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">
                {selectedExam.name}
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Rally Ground Fitness Countdown
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${phaseInfo.phaseColor}`}>
                Phase {phaseInfo.phaseNumber}: {phaseInfo.phaseName}
              </span>
            </div>
          </div>

          {/* Digital Timer Blocks */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto text-center">
            <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1 block">
                Days
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1 block">
                Hours
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1 block">
                Minutes
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-2xl sm:text-4xl font-extrabold font-mono text-emerald-400 tracking-tight">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1 block">
                Seconds
              </span>
            </div>
          </div>

          {/* Preparation Phase Progress Bar */}
          <div className="space-y-1.5 max-w-xl mx-auto">
            <div className="flex justify-between text-[11px] text-slate-300">
              <span>Preparation Timeline Progress</span>
              <strong className="text-blue-400">{phaseInfo.progressPercent}% Target Completed</strong>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${phaseInfo.progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Standards Pill Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Run Distance:</span>
              <strong className="text-white">{selectedExam.distance}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Target Split:</span>
              <strong className="text-emerald-400">
                {targetGroup === 'group1' ? selectedExam.group1Standard : selectedExam.group2Standard}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Beam Pull-Ups:</span>
              <strong className="text-blue-300">{selectedExam.pullUpsRequired}</strong>
            </div>
          </div>
        </div>

        {/* TIMELINE-SPECIFIC DAILY STRATEGY & MOTIVATION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Daily Motivation */}
          <div className="p-5 rounded-xl border border-slate-200 bg-amber-50/40 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Today's Rally Motivation</span>
            </div>
            <blockquote className="text-sm font-semibold text-slate-900 leading-snug italic border-l-2 border-amber-500 pl-3 py-0.5">
              "{phaseInfo.motivation}"
            </blockquote>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              <strong>Phase Objective:</strong> {phaseInfo.focus}
            </p>
          </div>

          {/* Card 2: Today's Recommended Workout Drill */}
          <div className="p-5 rounded-xl border border-slate-200 bg-blue-50/40 space-y-2.5">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4 text-blue-700" />
              <span>Today's Training Workout Drill</span>
            </div>
            <p className="text-xs font-semibold text-slate-900 leading-relaxed">
              {phaseInfo.drill}
            </p>
            <div className="pt-1.5 border-t border-blue-100 flex items-center gap-2 text-xs text-slate-600">
              <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span><strong>Recovery Tip:</strong> {phaseInfo.recoveryTip}</span>
            </div>
          </div>
        </div>

        {/* Action Callout Bar */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Need the full 8-week structured interval split chart? Read the comprehensive masterclass.
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/blog/army-1600-meter-running-time-agniveer-pft-standards')}
            className="text-blue-700 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Read 1600m PFT Guide →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
