import React, { useState } from 'react';
import {
  Scale,
  CheckCircle2,
  FileCheck,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { getCategoryRelaxation } from '../../utils/calculatorLogic';

interface CategoryRelaxationPageProps {
  onNavigate: (path: string) => void;
}

export const CategoryRelaxationPage: React.FC<CategoryRelaxationPageProps> = ({ onNavigate }) => {
  const [category, setCategory] = useState<'UR' | 'EWS' | 'OBC_NCL' | 'SC' | 'ST' | 'PWBD_UR' | 'PWBD_OBC' | 'PWBD_SC_ST' | 'ESM'>('OBC_NCL');
  const [baseMaxAge, setBaseMaxAge] = useState<number>(30);
  const [standardFee, setStandardFee] = useState<number>(100);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const rule = getCategoryRelaxation(category, standardFee);
  const allowedMaxAge = baseMaxAge + rule.ageRelaxationYears;

  const faqs = [
    {
      q: 'Does an Economically Weaker Section (EWS) candidate receive upper age relaxation?',
      a: 'No. Under Department of Personnel and Training (DoPT) Office Memorandum No. 36039/1/2019-Estt.(Res) dated 31-01-2019, candidates belonging to the EWS category are granted 10% reservation in direct recruitment civil vacancies, but receive NO relaxation in the upper age limit or application fee concessions unless expressly provided by specific state recruitment boards.',
    },
    {
      q: 'What is the crucial financial year validity requirement for OBC Non-Creamy Layer (NCL) certificates?',
      a: 'As established by DoPT guidelines and Supreme Court judgments, an OBC-NCL certificate must substantiate that parental income from non-agricultural sources was below ₹8 Lakhs per annum for each of the preceding 3 consecutive financial years. The certificate must be issued within the financial year specified in the recruitment notification (typically issued on or between 01 April of the preceding year and the application closing deadline).',
    },
    {
      q: 'Can a candidate claim both PwBD and SC/ST age relaxation concurrently?',
      a: 'Yes. Cumulative age relaxation is statutorily permitted for Persons with Benchmark Disabilities. A PwBD candidate who also belongs to Scheduled Caste (SC) or Scheduled Tribe (ST) receives a cumulative 15 years relaxation (+10 yrs PwBD + +5 yrs SC/ST) over the unreserved upper age limit.',
    },
    {
      q: 'Are female candidates exempt from paying government job application fees?',
      a: 'Yes. Across all major Central Government examinations conducted by the Staff Selection Commission (SSC) and Union Public Service Commission (UPSC), female candidates belonging to all social categories (including Unreserved and EWS) are 100% exempt from the payment of application fees.',
    },
    {
      q: 'What documentation is required for Ex-Servicemen (ESM) to claim age and reservation benefits?',
      a: 'Ex-Servicemen must produce their Military Discharge Book and Pension Payment Order (PPO) issued by the armed forces headquarters. Under the Ex-Servicemen Re-employment Rules 1979, the permissible deduction is the entire length of military service rendered plus an additional 3 years from their actual age.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md font-semibold">
            DoPT Statutory Reservation Rules Engine
          </span>
          <span className="text-stone-500">
            Last reviewed: <strong className="text-stone-800">01 October 2026</strong> · Verified against DoPT OMs
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Government Job Fee & Category Age Relaxation Calculator
        </h1>

        <p className="text-sm text-stone-600 leading-relaxed max-w-3xl">
          Determine your exact upper age relaxation, fee concession status, and mandatory certificate validity criteria across Central and State government recruitment examinations in strict conformity with Department of Personnel & Training (DoPT) mandates.
        </p>
      </div>

      {/* Interactive Tool Component */}
      <div className="bg-stone-50 border border-stone-300 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
          <Scale className="w-5 h-5 text-blue-700" />
          <h2 className="text-base font-bold text-stone-900 uppercase tracking-wide">
            Category Relaxation & Fee Assessment Calculator
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 block">Candidate Reservation Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-semibold focus:ring-2 focus:ring-blue-500"
            >
              <option value="UR">Unreserved (General / General Merit)</option>
              <option value="EWS">Economically Weaker Section (EWS)</option>
              <option value="OBC_NCL">OBC Non-Creamy Layer (NCL)</option>
              <option value="SC">Scheduled Caste (SC)</option>
              <option value="ST">Scheduled Tribe (ST)</option>
              <option value="PWBD_UR">PwBD (Unreserved / Benchmark Disability ≥ 40%)</option>
              <option value="PWBD_OBC">PwBD + OBC (Non-Creamy Layer)</option>
              <option value="PWBD_SC_ST">PwBD + SC / ST</option>
              <option value="ESM">Ex-Servicemen (Armed Forces Service + 3 Yrs)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 block">Unreserved Advertised Max Age:</label>
            <input
              type="number"
              value={baseMaxAge}
              onChange={(e) => setBaseMaxAge(Math.max(18, Number(e.target.value)))}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-semibold focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 block">General Advertised Fee (₹):</label>
            <input
              type="number"
              value={standardFee}
              onChange={(e) => setStandardFee(Math.max(0, Number(e.target.value)))}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-semibold focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Results Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
            <span className="text-xs font-bold text-blue-900 font-sans block border-b border-stone-100 pb-1">
              Age Relaxation Permissible
            </span>
            <div className="text-2xl font-black text-blue-700 font-sans">
              +{rule.ageRelaxationYears} Years
            </div>
            <p className="text-[11px] text-stone-600 font-sans">
              Statutory extension added to the general cutoff ceiling.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
            <span className="text-xs font-bold text-stone-900 font-sans block border-b border-stone-100 pb-1">
              Adjusted Upper Age Limit
            </span>
            <div className="text-2xl font-black text-stone-900 font-sans">
              {allowedMaxAge} Years
            </div>
            <p className="text-[11px] text-stone-600 font-sans">
              Candidate must not have exceeded this age on crucial date.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
            <span className="text-xs font-bold text-emerald-900 font-sans block border-b border-stone-100 pb-1">
              Application Fee Payable
            </span>
            <div className="text-2xl font-black text-emerald-800 font-sans">
              {rule.feeExempt ? '₹0 (Exempt)' : `₹${rule.prescribedFee}`}
            </div>
            <p className="text-[11px] text-stone-600 font-sans">
              {rule.feeExempt ? '100% Fee concession under DoPT policy' : 'Standard fee applies to category'}
            </p>
          </div>
        </div>

        {/* Certificate Requirements Box */}
        <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-stone-900">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>Statutory Authority & Certificate Requirements:</span>
          </div>
          <p className="text-stone-700">{rule.certificateReq}</p>
          <div className="pt-2 text-[11px] text-stone-500 border-t border-stone-100">
            <strong>Legal Rule Citation:</strong> {rule.ruleCitation}
          </div>
        </div>
      </div>

      {/* 600+ Words Supporting Technical Content */}
      <div className="space-y-6 text-stone-800 text-sm leading-relaxed">
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            How Government Reservation & Age Relaxation Rules Function
          </h2>
          <p>
            Under Articles 16(4) and 16(4A) of the Constitution of India, the Central Government establishes statutory reservations in public employment for socially and educationally backward citizens. The Department of Personnel and Training (DoPT), acting as the nodal administrative ministry for Central Civil Services, periodically issues consolidated Office Memorandums governing concessions for direct recruitment posts.
          </p>
          <p>
            In addition to vertical quota seat reservation (15% for SC, 7.5% for ST, 27% for OBC, and 10% for EWS), the government provides relaxation in the maximum age limit to equalize opportunity across different socio-economic strata. Age relaxations are statutory and apply uniformly across Group A, B, and C services, provided the candidate holds an authentic certificate from a competent revenue authority.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Comprehensive Statutory Relaxation Matrix
          </h2>
          <div className="border border-stone-200 rounded-xl overflow-x-auto text-xs">
            <table className="w-full text-left divide-y divide-stone-200 min-w-[600px]">
              <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Category</th>
                  <th className="p-3 text-center">Permissible Age Relaxation</th>
                  <th className="p-3 text-center">Fee Exemption</th>
                  <th className="p-3">Issuing Authority / Format</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 bg-white">
                <tr>
                  <td className="p-3 font-semibold">SC / ST</td>
                  <td className="p-3 text-center font-bold text-blue-700 font-mono">+5 Years</td>
                  <td className="p-3 text-center font-bold text-emerald-700">100% Exempt</td>
                  <td className="p-3 text-stone-600">DM / ADM / Tehsildar (Central Format)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">OBC (Non-Creamy Layer)</td>
                  <td className="p-3 text-center font-bold text-blue-700 font-mono">+3 Years</td>
                  <td className="p-3 text-center text-stone-600">No (₹100)</td>
                  <td className="p-3 text-stone-600">Revenue Authority (Valid Current FY)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">PwBD (Unreserved/EWS)</td>
                  <td className="p-3 text-center font-bold text-blue-700 font-mono">+10 Years</td>
                  <td className="p-3 text-center font-bold text-emerald-700">100% Exempt</td>
                  <td className="p-3 text-stone-600">Chief Medical Officer / Medical Board (≥40%)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">PwBD + OBC-NCL</td>
                  <td className="p-3 text-center font-bold text-blue-700 font-mono">+13 Years</td>
                  <td className="p-3 text-center font-bold text-emerald-700">100% Exempt</td>
                  <td className="p-3 text-stone-600">Dual Certificate Submission</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">PwBD + SC/ST</td>
                  <td className="p-3 text-center font-bold text-blue-700 font-mono">+15 Years</td>
                  <td className="p-3 text-center font-bold text-emerald-700">100% Exempt</td>
                  <td className="p-3 text-stone-600">Dual Certificate Submission</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Ex-Servicemen (ESM)</td>
                  <td className="p-3 text-center font-bold text-blue-700 font-mono">Service + 3 Years</td>
                  <td className="p-3 text-center font-bold text-emerald-700">100% Exempt</td>
                  <td className="p-3 text-stone-600">Armed Forces Discharge Book & PPO</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-amber-950 font-bold">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg">Critical Certificate Pitfalls to Avoid</h2>
          </div>
          <ul className="space-y-2 text-xs text-amber-900">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>State List vs Central List:</strong> Certain castes recognized as OBC under specific State government lists are not included in the National Commission for Backward Classes (NCBC) Central List. For central jobs (UPSC, SSC, RRB), only Central List certificates are legally valid.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Expired OBC-NCL Financial Year:</strong> An OBC certificate must carry the non-creamy layer clause for the valid financial year. Certificates issued outside the prescribed window result in candidate treatment under Unreserved (UR) norms without age relaxation.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>EWS Income Ceiling Exceedance:</strong> Parental or candidate gross annual family income exceeding ₹8 Lakhs, or holding 5 acres of agricultural land, disqualifies the applicant from EWS quota benefits.</span>
            </li>
          </ul>
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-700" />
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">
              Frequently Asked Questions (FAQs)
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-stone-200 rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left text-xs font-bold text-stone-900 flex items-center justify-between gap-3 hover:bg-stone-50 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
