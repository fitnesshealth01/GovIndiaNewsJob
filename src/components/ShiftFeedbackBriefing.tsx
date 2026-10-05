import React from 'react';
import { BookOpen, AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface ShiftFeedbackBriefingProps {
  examName: string;
}

export const ShiftFeedbackBriefing: React.FC<ShiftFeedbackBriefingProps> = ({ examName }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Official Examination Pattern & Scheme: {examName}
            </h3>
            <p className="text-[11px] text-slate-500">
              Structure and guidelines as prescribed in the official recruitment notification
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Exam Mode
          </span>
          <p className="text-slate-800 font-medium">Computer Based Test (CBT) / Written Exam</p>
        </div>
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Question Type
          </span>
          <p className="text-slate-800 font-medium">Multiple Choice Questions (Objective MCQs)</p>
        </div>
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Evaluation Standard
          </span>
          <p className="text-slate-800 font-medium">Negative marking applies as per commission scheme</p>
        </div>
      </div>

      <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Official Candidate Advisory:</strong> Candidates should refer strictly to the syllabus and marking scheme released with the official notification. Real-time shift feedback and answer keys are published only upon formal release by the examination authority.
        </p>
      </div>
    </div>
  );
};
