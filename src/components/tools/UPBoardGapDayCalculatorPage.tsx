import React, { useState, useEffect } from 'react';
import { UPBoardGapDayCalculator } from './UPBoardGapDayCalculator';
import { Calendar, HelpCircle, ChevronDown, BookOpen, Clock, ShieldCheck } from 'lucide-react';
import { buildFAQPageSchema, injectSchema } from '../../utils/seoSchema';
import { Breadcrumb } from '../Breadcrumb';

interface UPBoardGapDayCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const UPBoardGapDayCalculatorPage: React.FC<UPBoardGapDayCalculatorPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How many gap days do UP Board Class 12 Science students get between Chemistry and Physics in 2027?',
      a: 'Students get only 1 free gap day (Tuesday, 16 February 2027) between Chemistry (15 Feb) and Physics (17 Feb). Because this window is very tight, Physics formulas and derivations must be revised completely before 15 February.',
    },
    {
      q: 'What is the longest preparation gap in the UP Board 2027 Class 12 Science schedule?',
      a: 'The longest preparation window is 3 full days (9, 10, and 11 February 2027) between English (8 Feb) and Mathematics/Biology (12 Feb). This window should be reserved for rigorous problem sets, previous year papers, and diagram practice.',
    },
    {
      q: 'Do Mathematics and Biology papers happen on the same day?',
      a: 'Yes, both Mathematics (for PCM stream) and Biology (for PCB stream) are scheduled on Friday, 12 February 2027 during the afternoon shift (2:00 pm to 5:15 pm). Each candidate appears for only one depending on their chosen stream.',
    },
    {
      q: 'What are the official shift timings for UP Board Class 12 examinations?',
      a: 'Class 12 Intermediate exams are conducted in the afternoon shift from 2:00 pm to 5:15 pm. The duration is 3 hours 15 minutes, which includes 15 minutes dedicated to reading the question paper.',
    },
    {
      q: 'When should I start syllabus revision for UP Board 2027 exams?',
      a: 'Phase 1 syllabus completion should be wrapped up by 30 November, followed by topic-wise question bank practice in December, and full 3-hour pre-board mock examinations in January before the final 5 February kickoff.',
    },
  ];

  useEffect(() => {
    injectSchema([buildFAQPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))]);
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      <Breadcrumb
        currentPath="/tools/up-board-gap-calculator"
        onNavigate={onNavigate}
        customTitle="UP Board Gap-Day Revision Calculator"
      />

      {/* Main Interactive Engine */}
      <UPBoardGapDayCalculator onNavigate={onNavigate} embedded={false} />

      {/* Structured FAQ Accordion */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <HelpCircle className="w-5 h-5 text-blue-700" />
          <span>Frequently Asked Questions: UP Board 2027 Gap-Day Strategy</span>
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
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-blue-700' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="p-4 bg-white text-xs text-slate-700 leading-relaxed border-t border-slate-200">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
