import React, { useState } from 'react';
import { CheckSquare, Square, AlertTriangle, ShieldCheck, Check, Sparkles, Shirt } from 'lucide-react';

export const ExamDayChecklist: React.FC<{ examName?: string }> = ({ examName = 'Commission Examination' }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'doc-1': true,
    'doc-2': true,
  });

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const mandatoryItems = [
    {
      id: 'doc-1',
      title: 'Original Government Photo Identity Card',
      desc: 'Original Aadhaar Card (with complete DOB visible), PAN Card, Passport, or Voter ID. Photocopies / mobile Digilocker screenshots are STRICTLY REJECTED at the gate.',
    },
    {
      id: 'doc-2',
      title: 'Printed Copy of e-Admission Certificate',
      desc: 'Clean, legible printed Admit Card on A4 paper with barcode and shift details clearly visible. Color print recommended.',
    },
    {
      id: 'doc-3',
      title: 'Two Identical Recent Passport Photographs',
      desc: 'Identical to the photograph uploaded during online registration, needed for commission attendance sheet and verification slip.',
    },
    {
      id: 'doc-4',
      title: 'Transparent Blue/Black Ballpoint Pen',
      desc: 'Transparent barrel only. Gel pens, marker pens, and fountain pens are barred inside the CBT hall.',
    },
    {
      id: 'doc-5',
      title: 'Transparent Water Bottle & Sanitizer (50ml)',
      desc: 'Strictly transparent bottle without any printed labels or insulation covers.',
    },
  ];

  const barredItems = [
    'Smartwatches, Digital Fitness Bands, Analog Wristwatches with metallic frames',
    'Bluetooth Headsets, Earphones, Spy Microphones, or Electronic Transmitters',
    'Belts with large metallic buckles, Wallets, Goggles, and Handbags',
    'Calculators, Geometry Boxes, Log Tables, and Paper Notes',
    'Digital Car Keys or Metallic Keychain Fobs',
  ];

  const totalMandatory = mandatoryItems.length;
  const completedCount = mandatoryItems.filter((m) => checkedItems[m.id]).length;
  const isAllReady = completedCount === totalMandatory;

  return (
    <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-2xs">
            <ShieldCheck className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Exam Hall Permitted vs. Barred Items & Frisking Checklist
            </h3>
            <p className="text-[11px] text-slate-500">
              Interactive preparation checklist to avoid last-minute gate disqualification for {examName}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
            {completedCount}/{totalMandatory} Items Checked
          </div>
          {isAllReady && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <Check className="w-3 h-3" /> Gate Ready
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Permitted & Mandatory Column */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
            ✓ Mandatory Allowed Items (Tap to Verify):
          </span>

          <div className="space-y-2">
            {mandatoryItems.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 text-xs ${
                    isChecked
                      ? 'bg-emerald-50/60 border-emerald-300 text-slate-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <button type="button" className="mt-0.5 text-emerald-600 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 fill-emerald-600 text-white" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  <div className="space-y-0.5">
                    <strong className={`font-semibold block ${isChecked ? 'text-slate-950' : 'text-slate-700'}`}>
                      {item.title}
                    </strong>
                    <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Barred Column & Dress Code */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-200 space-y-2">
            <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Strictly Barred Items (Confiscated at Entry):</span>
            </span>
            <ul className="text-[11px] text-rose-900/90 space-y-1 pl-4 list-disc">
              {barredItems.map((barred, idx) => (
                <li key={idx} className="leading-snug">
                  {barred}
                </li>
              ))}
            </ul>
            <div className="text-[10px] text-rose-700 font-semibold pt-1 border-t border-rose-200/70">
              * Note: Many test centers do not provide locker storage counters. Avoid bringing valuable items.
            </div>
          </div>

          {/* Strict Dress Code Rules */}
          <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-1.5 text-xs text-amber-950">
            <span className="font-bold flex items-center gap-1.5 text-amber-900 text-[11px] uppercase tracking-wider">
              <Shirt className="w-3.5 h-3.5 text-amber-600" />
              <span>Official Commission Dress Code Advisory:</span>
            </span>
            <p className="text-[11px] text-amber-900/90 leading-snug">
              • <strong>Clothing:</strong> Wear light, simple half-sleeve shirts/t-shirts without oversized metallic buttons, brooches, or excessive pockets.
            </p>
            <p className="text-[11px] text-amber-900/90 leading-snug">
              • <strong>Footwear:</strong> Slippers or flat open sandals are recommended. Thick-soled boots and high heels are subject to mandatory removal during frisking.
            </p>
            <p className="text-[11px] text-amber-900/90 leading-snug">
              • <strong>Religious Attire:</strong> Candidates wearing customary religious articles (e.g. Kara, Kirpan, Hijab) must report 1 hour before the reporting time for custom frisking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
