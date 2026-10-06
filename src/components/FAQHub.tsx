import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Calendar,
  Calculator,
  Ruler,
  FileCheck,
  ShieldCheck,
  Building2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface FAQEntry {
  id: string;
  category: 'age' | 'marking' | 'physical' | 'certificates' | 'otr';
  categoryLabel: string;
  question: string;
  answer: string;
  officialRef: string;
}

const FAQ_DATABASE: FAQEntry[] = [
  // Category 1: Age Calculation & DOP&T Rules
  {
    id: 'age-1',
    category: 'age',
    categoryLabel: 'Age & DOP&T Rules',
    question: 'How is crucial cutoff date for age eligibility determined in central govt exams?',
    answer: 'Under Ministry of Personnel, Public Grievances and Pensions (DOP&T) OM No. 14017/70/87-Estt.(RR), for examinations held in the first half of a calendar year, the crucial date for age determination is fixed as 1st January of that exam year. For examinations held in the second half of the calendar year, the crucial cutoff date is uniformly fixed as 1st August. Exact dates are always specified in Para 5 of the statutory gazette notification.',
    officialRef: 'DOP&T O.M. No. 14017/70/87-Estt.(RR) & UPSC/SSC Gazette Regulations',
  },
  {
    id: 'age-2',
    category: 'age',
    categoryLabel: 'Age & DOP&T Rules',
    question: 'What is the upper age relaxation permissible across reserved categories?',
    answer: 'As per central civil service rules: Other Backward Classes (OBC-Non Creamy Layer) receive 3 years upper age relaxation; Scheduled Castes (SC) and Scheduled Tribes (ST) receive 5 years; Persons with Benchmark Disabilities (PwBD-General) receive 10 years; PwBD (OBC) receive 13 years; PwBD (SC/ST) receive 15 years; Ex-Servicemen (ESM) receive military service period + 3 years deduction from actual age.',
    officialRef: 'Central Civil Services (Relaxation of Age Limit) Rules 1997',
  },
  {
    id: 'age-3',
    category: 'age',
    categoryLabel: 'Age & DOP&T Rules',
    question: 'Can an OBC or SC/ST candidate apply under the Unreserved (General) category if overage?',
    answer: 'No. If a candidate avails age relaxation applicable to their reserved category (e.g. applying at age 31 when General max is 30), they can ONLY be considered against vacancies earmarked for that respective reserved category and cannot claim appointment against unreserved open merit vacancies, in accordance with Supreme Court rulings in Niravkumar Dilipbhai Makwana vs GPSC.',
    officialRef: 'Supreme Court Civil Appeal No. 5187 of 2019',
  },

  // Category 2: Negative Marking & Normalization
  {
    id: 'marking-1',
    category: 'marking',
    categoryLabel: 'Marking & Scores',
    question: 'How is negative marking deducted in SSC, Railway, and Banking exams?',
    answer: 'In SSC CGL/CHSL Tier-1, each correct answer yields +2 marks, and each wrong answer deducts 0.50 marks (25% penalty of question value). In Railway (RRB NTPC/Group D), each wrong answer deducts 1/3rd mark (-0.333). In Banking (IBPS/SBI), each wrong answer deducts 1/4th of the allotted mark (-0.25). Unattempted questions attract zero penalty.',
    officialRef: 'SSC & RRB Examination Scheme Guidelines',
  },
  {
    id: 'marking-2',
    category: 'marking',
    categoryLabel: 'Marking & Scores',
    question: 'How does multi-shift score normalization work in CBT exams?',
    answer: 'Multi-shift exams utilize the Mean-Standard Deviation or Equi-Percentile Normalization method adopted by recruiting agencies and testing bodies. If a candidate appears in a statistically tougher shift where the average score is low, their raw score receives positive normalization bonus points to balance inter-shift difficulty variations.',
    officialRef: 'SSC Normalization Notice No. 1-1/2018-P&P-I & RRB CEN Normalization Formula',
  },

  // Category 3: Physical Standards (PST/PMT)
  {
    id: 'physical-1',
    category: 'physical',
    categoryLabel: 'Physical Standards',
    question: 'What is the mandatory chest expansion standard in police and defence examinations?',
    answer: 'For almost all male uniformed services (SSC GD, Delhi Police, CAPF SI, Army, State Police), the candidate must possess minimum 5 centimeters of chest expansion between unexpanded and expanded measurements (e.g., 80 cm unexpanded to 85 cm expanded). Candidates with less than 5 cm expansion are disqualified even if their absolute measurement is high.',
    officialRef: 'MHA CAPF Recruitment Physical Standard Rules',
  },
  {
    id: 'physical-2',
    category: 'physical',
    categoryLabel: 'Physical Standards',
    question: 'Who is eligible for height relaxation in Central Armed Police Forces (CAPF)?',
    answer: 'Candidates hailing from the North-Eastern States (Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura), Gorkhas, Garhwalis, Kumaonis, Dogras, and Marathas receive standard height relaxation to 165 cm (Male) and 155 cm (Female). All candidates belonging to Scheduled Tribes (ST) across India are granted relaxation to 162.5 cm (Male) and 150 cm (Female).',
    officialRef: 'MHA Gazette Rules for Constable GD / SI in CAPFs',
  },

  // Category 4: Reservation Certificates & Document Verification
  {
    id: 'cert-1',
    category: 'certificates',
    categoryLabel: 'Certificates & DV',
    question: 'What is the validity period and format required for OBC-NCL certificate in Central Govt jobs?',
    answer: 'The OBC certificate must explicitly certify that the candidate does NOT belong to the Creamy Layer. For Central Government recruitment, it must strictly follow the Government of India format (referencing resolution numbers of National Commission for Backward Classes) and must be issued within the financial year of the application closing date (or as stipulated in the crucial date paragraph of the gazette notice). State-level OBC certificates are not valid for central posts.',
    officialRef: 'DOP&T O.M. No. 36036/2/2013-Estt.(Res) dated 30 May 2014',
  },
  {
    id: 'cert-2',
    category: 'certificates',
    categoryLabel: 'Certificates & DV',
    question: 'What is the crucial financial year criteria for EWS income and asset certificate?',
    answer: 'The Economically Weaker Section (EWS) certificate must be valid for the financial year in which the candidate applies, based on gross family income of the preceding financial year. For recruitment notifications published in 2026, the certificate must be issued on the basis of income for the Financial Year 2024–2025 and valid for the Year 2025–2026.',
    officialRef: 'DOP&T O.M. No. 36039/1/2019-Estt (Res) dated 31 January 2019',
  },

  // Category 5: OTR & Online Application Technical Issues
  {
    id: 'otr-1',
    category: 'otr',
    categoryLabel: 'OTR & Tech Guidelines',
    question: 'What are the revised live photograph guidelines on the new SSC portal (ssc.gov.in)?',
    answer: 'Under the new SSC portal guidelines, candidates must capture a live webcam photograph instead of uploading an old passport scan. Guidelines require: Plain white or light-coloured background; adequate daylight or white illumination; no caps, masks, spectacles, or tinted glasses; full frontal face alignment with ears clearly visible.',
    officialRef: 'SSC Official User Guide for One-Time Registration (OTR)',
  },
  {
    id: 'otr-2',
    category: 'otr',
    categoryLabel: 'OTR & Tech Guidelines',
    question: 'Can changes be made after submitting the online application form?',
    answer: 'Most recruiting commissions (SSC, UPSC, RRB) provide a dedicated 2-to-3 day "Application Correction Window" after registration closes. Candidates can modify incorrect entries by paying a nominal statutory correction fee (usually ₹200 for first modification). Once the correction window closes, no requests for changes in personal details or exam center preferences are entertained.',
    officialRef: 'SSC & UPSC Examination Notice Para: Correction Window Protocol',
  },
];

interface FAQHubProps {
  onNavigate: (path: string) => void;
}

export const FAQHub: React.FC<FAQHubProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('age-1');

  const categories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'age', label: 'Age & DOP&T Rules' },
    { id: 'marking', label: 'Marking & Scores' },
    { id: 'physical', label: 'Physical Standards' },
    { id: 'certificates', label: 'Certificates & DV' },
    { id: 'otr', label: 'OTR & Online Forms' },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATABASE.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' ? true : item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.officialRef.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Generate dynamic Schema.org FAQPage JSON-LD
  const faqSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_DATABASE.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
  }, []);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const scriptId = 'govindianews-faqhub-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(faqSchema);
  }, [faqSchema]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-md px-2.5 py-1">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>GovIndiaNews Official Candidate Knowledge Desk</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Government Examination Frequently Asked Questions (FAQs)
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Comprehensive, gazette-verified answers to common candidate queries regarding crucial age cutoffs, central category relaxations, negative marking deductions, physical measurement standards, and OBC/EWS certificate validity.
        </p>

        {/* Search Bar */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 mt-1" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. OBC Creamy layer, negative marking, chest expansion, age cutoff)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-300 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all hover:border-blue-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                >
                  <div>
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
                      {faq.categoryLabel}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 mt-1 transition-transform ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 space-y-3 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-700 leading-relaxed">
                    <p className="pt-3">{faq.answer}</p>
                    <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium border-t border-slate-200/60">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Statutory Citation: {faq.officialRef}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-10 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
            No FAQ entries matched your search query. Try typing another keyword or selecting "All FAQs".
          </div>
        )}
      </div>

      {/* Helpful Utilities Box */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-blue-900 to-slate-900 text-white space-y-3">
        <h4 className="font-bold text-sm">Need Instant Mathematical Calculations?</h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          Verify your eligibility immediately using our client-side smart calculators without waiting for manual customer support.
        </p>
        <div className="pt-1 flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => onNavigate('/tools/age')}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Check Age on Cut-off Date
          </button>
          <button
            onClick={() => onNavigate('/tools/marking')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Calculate Negative Marking
          </button>
          <button
            onClick={() => onNavigate('/tools/height')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Physical Standards (PST) Checker
          </button>
        </div>
      </div>
    </div>
  );
};
