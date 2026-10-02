import React, { useState } from 'react';
import { Layers, Briefcase, Award, MapPin, TrendingUp, CheckCircle2, ChevronRight } from 'lucide-react';

interface CadreComparison {
  id: string;
  postName: string;
  ministry: string;
  payLevel: string;
  postingZone: 'Delhi Only' | 'Pan India Transferable' | 'Coastal / Customs' | 'State Capitals';
  workNature: 'Pure Administrative Desk' | 'Field & Executive Duties' | 'Investigative & Uniform' | 'Auditing & Inspection';
  uniform: boolean;
  promotionSpeed: 'Fast (Gazetted in 5-7 yrs)' | 'Moderate (8-10 yrs)' | 'Slow (Seniority based)';
  bestFor: string;
  pros: string;
  cons: string;
}

const CADRES: CadreComparison[] = [
  {
    id: 'aso-css',
    postName: 'Assistant Section Officer (ASO)',
    ministry: 'Central Secretariat Service (DoPT, Delhi)',
    payLevel: 'Pay Level 7 (₹44,900 - ₹1,42,400)',
    postingZone: 'Delhi Only',
    workNature: 'Pure Administrative Desk',
    uniform: false,
    promotionSpeed: 'Fast (Gazetted in 5-7 yrs)',
    bestFor: 'Candidates seeking fixed Delhi life, zero transfer hassles & UPSC Civil Services preparation.',
    pros: 'Fixed 9-to-5 working hours, weekends off, high prestige in central ministries, no transfers outside New Delhi.',
    cons: 'Purely file work, routine desk administration, no field executive authority.',
  },
  {
    id: 'aso-mea',
    postName: 'Assistant Section Officer (ASO in MEA)',
    ministry: 'Ministry of External Affairs',
    payLevel: 'Pay Level 7 (₹44,900 - ₹1,42,400)',
    postingZone: 'Pan India Transferable',
    workNature: 'Pure Administrative Desk',
    uniform: false,
    promotionSpeed: 'Moderate (8-10 yrs)',
    bestFor: 'Candidates aspiring for foreign postings, diplomatic passport, and global exposure.',
    pros: 'Foreign allowance in USD during embassy tenures (₹3-4 Lakhs/month effective), diplomatic status, high social respect.',
    cons: 'Mandatory rotational posting to hard stations, family relocation disruptions.',
  },
  {
    id: 'iti-cbdt',
    postName: 'Inspector of Income Tax (ITI)',
    ministry: 'Central Board of Direct Taxes (CBDT)',
    payLevel: 'Pay Level 7 (₹44,900 - ₹1,42,400)',
    postingZone: 'Pan India Transferable',
    workNature: 'Field & Executive Duties',
    uniform: false,
    promotionSpeed: 'Fast (Gazetted in 5-7 yrs)',
    bestFor: 'Candidates prioritizing high societal respect, investigation work, and balance of desk/field.',
    pros: 'High executive respect, search and seizure powers, fast promotion to Income Tax Officer (Group B Gazetted).',
    cons: 'Inter-charge transfer restrictions, heavy assessment workload during quarterly tax filing windows.',
  },
  {
    id: 'po-cbic',
    postName: 'Preventive Officer / Examiner (PO)',
    ministry: 'Central Board of Indirect Taxes & Customs (CBIC)',
    payLevel: 'Pay Level 7 (₹44,900 - ₹1,42,400)',
    postingZone: 'Coastal / Customs',
    workNature: 'Field & Executive Duties',
    uniform: true,
    promotionSpeed: 'Fast (Gazetted in 5-7 yrs)',
    bestFor: 'Candidates who love smart white uniform, seaport/airport anti-smuggling, and coastal cities.',
    pros: 'Smart white uniform with epaulettes, anti-smuggling authority at major international airports & ports.',
    cons: 'Postings restricted to coastal maritime zones (Mumbai, Chennai, Kolkata, Goa, Kochi, Vizag); shift duties.',
  },
  {
    id: 'si-cbi',
    postName: 'Sub-Inspector (SI in CBI)',
    ministry: 'Central Bureau of Investigation',
    payLevel: 'Pay Level 7 (₹44,900 - ₹1,42,400)',
    postingZone: 'Pan India Transferable',
    workNature: 'Investigative & Uniform',
    uniform: true,
    promotionSpeed: 'Moderate (8-10 yrs)',
    bestFor: 'Candidates driven by criminal investigation, raids, and high-impact national cases.',
    pros: '25% Special Security Allowance (SSA), 13 months pay per year, immense investigative prestige.',
    cons: 'Unpredictable working hours, frequent overnight travel, high operational stress, pan-India transfers.',
  },
  {
    id: 'aao-cag',
    postName: 'Assistant Audit Officer (AAO)',
    ministry: 'Comptroller & Auditor General of India (CAG)',
    payLevel: 'Pay Level 8 (₹47,600 - ₹1,51,100)',
    postingZone: 'State Capitals',
    workNature: 'Auditing & Inspection',
    uniform: false,
    promotionSpeed: 'Moderate (8-10 yrs)',
    bestFor: 'Candidates wanting highest starting basic pay directly as Group B Gazetted officer.',
    pros: 'Only direct Gazetted recruitment in SSC CGL (Level 8 starting salary), high travel allowance during field audit tours.',
    cons: 'Continuous outstation touring (100-120 days/year), mandatory SAS departmental exam clearance required.',
  },
];

export const PostPreferenceMatrix: React.FC = () => {
  const [selectedCadreId, setSelectedCadreId] = useState<string>('aso-css');

  const selectedCadre = CADRES.find((c) => c.id === selectedCadreId) || CADRES[0];

  return (
    <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-2xs">
            <Layers className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Post Preference & Career Growth Comparison Matrix
            </h3>
            <p className="text-[11px] text-slate-500">
              Compare posting locations, promotion speed, desk vs. field duty before filling commission option forms.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200 self-start sm:self-auto">
          7th CPC Gazette Pay Bands
        </span>
      </div>

      {/* Cadre Selection Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {CADRES.map((cadre) => (
          <button
            key={cadre.id}
            type="button"
            onClick={() => setSelectedCadreId(cadre.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCadreId === cadre.id
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cadre.postName.split('(')[0].trim()}
          </button>
        ))}
      </div>

      {/* Selected Cadre Deep-Dive Card */}
      <div className="border border-indigo-100 bg-indigo-50/30 rounded-xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 pb-2.5">
          <div>
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>{selectedCadre.postName}</span>
              {selectedCadre.uniform && (
                <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 font-bold px-1.5 py-0.5 rounded">
                  Uniform Cadre
                </span>
              )}
            </h4>
            <span className="text-xs text-indigo-900 font-medium">{selectedCadre.ministry}</span>
          </div>
          <span className="text-xs font-bold text-slate-800 bg-white px-3 py-1 rounded-lg border border-indigo-200 shadow-2xs">
            {selectedCadre.payLevel}
          </span>
        </div>

        {/* 4-Box Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-500" /> Posting Zone
            </span>
            <span className="font-bold text-slate-900 block text-[11px]">{selectedCadre.postingZone}</span>
          </div>

          <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-emerald-500" /> Duty Nature
            </span>
            <span className="font-bold text-slate-900 block text-[11px]">{selectedCadre.workNature}</span>
          </div>

          <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-amber-500" /> Promotion Speed
            </span>
            <span className="font-bold text-slate-900 block text-[11px]">{selectedCadre.promotionSpeed}</span>
          </div>

          <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <Award className="w-3 h-3 text-purple-500" /> Classification
            </span>
            <span className="font-bold text-slate-900 block text-[11px]">
              {selectedCadre.id === 'aao-cag' ? 'Group B Gazetted' : 'Group B Non-Gazetted'}
            </span>
          </div>
        </div>

        {/* Best For Recommendation */}
        <div className="p-3 bg-white rounded-xl border border-indigo-200 text-xs space-y-1">
          <strong className="text-indigo-950 font-bold block flex items-center gap-1.5 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Recommended For Candidates Seeking:</span>
          </strong>
          <p className="text-slate-700 text-[11px] leading-relaxed">{selectedCadre.bestFor}</p>
        </div>

        {/* Pros vs Cons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-1">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              ✓ Key Career Advantages:
            </span>
            <p className="text-[11px] text-slate-700 leading-snug">{selectedCadre.pros}</p>
          </div>

          <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200 space-y-1">
            <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
              ✕ Career Trade-Offs / Constraints:
            </span>
            <p className="text-[11px] text-slate-700 leading-snug">{selectedCadre.cons}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
