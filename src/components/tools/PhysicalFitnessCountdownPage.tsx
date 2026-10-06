import React, { useState, useEffect } from 'react';
import { PhysicalFitnessCountdown } from './PhysicalFitnessCountdown';
import { Timer, HelpCircle, ChevronDown, Ruler, Activity } from 'lucide-react';
import { buildFAQPageSchema, injectSchema } from '../../utils/seoSchema';

interface PhysicalFitnessCountdownPageProps {
  onNavigate: (path: string) => void;
}

export const PhysicalFitnessCountdownPage: React.FC<PhysicalFitnessCountdownPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How many days before an Indian Army Agniveer Rally should I start training for the 1600m run?',
      a: 'A minimum of 8 to 12 weeks (60 to 90 days) is recommended. Transitioning safely from a casual running pace down to a competitive sub-5:30 Group I timing requires 3 weeks of aerobic base building, 3 weeks of lactate threshold intervals, and 2 weeks of track pacing to avoid shin splints.',
    },
    {
      q: 'What is the cutoff time for Group I in the Army 1600-meter run?',
      a: 'Candidates completing the 1.6 km run in up to 5 minutes 30 seconds are placed in Group I and awarded the full 60 physical marks. Completing between 5:31 and 5:45 grants Group II (48 marks). Finishing above 5:45 results in elimination.',
    },
    {
      q: 'How does this countdown tool adapt its daily tips based on my test date?',
      a: 'The countdown engine calculates your remaining timeline across 5 structured phases: Phase 1 (>60 days: Aerobic Base), Phase 2 (31-60 days: Lactate Threshold & 800m repeats), Phase 3 (15-30 days: Track Speed 400m splits), Phase 4 (7-14 days: Tapering), and Phase 5 (1-6 days: Rally Week Protocol). Each phase provides distinct daily workouts and mental grit affirmations.',
    },
    {
      q: 'Should I continue heavy interval running during the final 7 days before the rally?',
      a: 'No. The final 7 days are the "Tapering Phase". Running mileage should be reduced by 50% to allow muscle glycogen replenishment and tendon recovery. Perform light 2 km shakeout runs and brief 80m accelerations to maintain neuromuscular sharpness without fatigue.',
    },
    {
      q: 'Are beam pull-up marks included in the Physical Fitness Test?',
      a: 'Yes. For Indian Army Agniveer GD and Tradesmen, beam pull-ups carry 40 marks (10 pull-ups = 40 marks, 9 = 33 marks, 8 = 27 marks, 7 = 21 marks, 6 = 16 marks). Together with the 60 running marks, the PFT total is 100 marks.',
    },
  ];

  useEffect(() => {
    injectSchema([buildFAQPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))]);
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Primary Interactive Engine */}
      <PhysicalFitnessCountdown onNavigate={onNavigate} />

      {/* Helpful FAQ Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <HelpCircle className="w-5 h-5 text-blue-700" />
          <span>Frequently Asked Questions: Physical Fitness & Rally Countdown</span>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100/80 font-semibold text-xs text-slate-900 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === idx && (
                <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
