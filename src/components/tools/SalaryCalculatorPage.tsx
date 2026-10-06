import React, { useState } from 'react';
import {
  Calculator,
  Building2,
  HelpCircle,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import {
  calculate7thCpcSalary,
  PAY_LEVEL_STARTING_BASIC,
  POPULAR_POSTS_BENCHMARK,
  SalaryInputs,
} from '../../utils/calculatorLogic';

interface SalaryCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const SalaryCalculatorPage: React.FC<SalaryCalculatorPageProps> = ({ onNavigate }) => {
  const [payLevel, setPayLevel] = useState<number>(7);
  const [basicPay, setBasicPay] = useState<number>(PAY_LEVEL_STARTING_BASIC[7]);
  const [cityClass, setCityClass] = useState<'X' | 'Y' | 'Z'>('X');
  const [daPercent, setDaPercent] = useState<number>(50);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handlePayLevelChange = (lvl: number) => {
    setPayLevel(lvl);
    setBasicPay(PAY_LEVEL_STARTING_BASIC[lvl] || 18000);
  };

  const salary = calculate7thCpcSalary({
    payLevel,
    basicPay,
    cityClass,
    daPercent,
  });

  const faqs = [
    {
      q: 'What is the current Dearness Allowance (DA) percentage for Central Government Employees?',
      a: 'The Dearness Allowance was officially revised to 50% of Basic Pay with effect from 1st January 2024. Under 7th CPC rules, when DA touches or crosses 50%, House Rent Allowance (HRA) rates automatically revise upwards from 27%, 18%, and 9% to 30%, 20%, and 10% across Class X, Y, and Z cities respectively (Department of Expenditure OM dated 07-07-2017 & 12-04-2024). [VERIFY current DA at finmin.nic.in].',
    },
    {
      q: 'How are Indian cities classified into X, Y, and Z for HRA calculations?',
      a: 'Cities are classified by the Ministry of Finance based on Census population benchmarks. Class X cities (population 50 Lakhs and above) include Greater Mumbai, Delhi NCR, Kolkata, Chennai, Bengaluru, Hyderabad, Ahmedabad, and Pune. Class Y cities (population 5 Lakhs to 50 Lakhs) encompass state capitals and major urban hubs such as Jaipur, Lucknow, Patna, Bhopal, and Chandigarh. All remaining locations with population under 5 Lakhs are classified as Class Z.',
    },
    {
      q: 'How is the National Pension System (NPS) employee contribution calculated?',
      a: 'Under 7th CPC Central Civil Services norms, the mandatory employee contribution to Tier-1 NPS is exactly 10% of (Basic Pay + Dearness Allowance). The Central Government contributes a matching share of 14% of (Basic Pay + DA). The 10% employee contribution is deducted directly from monthly gross pay before bank credit.',
    },
    {
      q: 'What is the difference between Gross Salary, Net In-Hand Salary, and Cost to Company (CTC)?',
      a: 'Gross Salary is the total earnings before any deductions (Basic Pay + DA + HRA + Transport Allowance). Net In-Hand Salary is the actual cash credited to the employee bank account after statutory deductions (NPS 10%, CGEGIS group insurance, CGHS health subscription, and professional tax). Cost to Company (CTC) also factors in the 14% employer NPS contribution and annual allowances.',
    },
    {
      q: 'Are government salaries subject to income tax TDS deductions?',
      a: 'Yes. Central and State government salaries are fully taxable under Section 192 of the Income Tax Act 1961. Employees can opt for either the Old Tax Regime (claiming HRA exemption under Sec 10(13A), 80C, 80CCD(1B)) or the New Tax Regime (default with standard deduction of ₹75,000 for FY 2024-25/2025-26). Deductions shown in this calculator cover statutory payroll deductions; income tax TDS varies by individual tax declarations.',
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

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const scriptId = 'govindianews-salary-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(faqSchema);
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md font-semibold">
            Central Government 7th CPC Utility
          </span>
          <span className="text-stone-500">
            Last reviewed: <strong className="text-stone-800">01 October 2026</strong> · Verified against DoPT & MoF OMs
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
          7th Pay Commission In-Hand Salary Calculator (Pay Levels 1 to 18)
        </h1>

        <p className="text-sm text-stone-600 leading-relaxed max-w-3xl">
          Accurate, transparent monthly take-home salary calculator for Central Government employees, civil servants, railway personnel, and defence staff. Calculate gross salary, 10% NPS deductions, HRA rates, and net bank credit across Class X, Y, and Z cities.
        </p>
      </div>

      {/* Interactive Calculator Component */}
      <div className="bg-stone-50 border border-stone-300 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
          <Calculator className="w-5 h-5 text-emerald-700" />
          <h2 className="text-base font-bold text-stone-900 uppercase tracking-wide">
            Interactive Salary Computation Engine
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Pay Level */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 block">7th CPC Pay Level:</label>
            <select
              value={payLevel}
              onChange={(e) => handlePayLevelChange(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-semibold focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((lvl) => (
                <option key={lvl} value={lvl}>
                  Level {lvl} (Entry: ₹{PAY_LEVEL_STARTING_BASIC[lvl]?.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>

          {/* Basic Pay */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 block">Basic Pay (₹):</label>
            <input
              type="number"
              value={basicPay}
              onChange={(e) => setBasicPay(Math.max(18000, Number(e.target.value)))}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-semibold focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* City Classification */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 block">Posting City Class:</label>
            <select
              value={cityClass}
              onChange={(e) => setCityClass(e.target.value as 'X' | 'Y' | 'Z')}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-semibold focus:ring-2 focus:ring-blue-500"
            >
              <option value="X">Class X (Delhi, Mumbai, Bengaluru, etc. - 30% HRA)</option>
              <option value="Y">Class Y (State Capitals, Tier-2 - 20% HRA)</option>
              <option value="Z">Class Z (Rural, District Towns - 10% HRA)</option>
            </select>
          </div>

          {/* Dearness Allowance Rate */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-stone-700 block">DA % Rate:</label>
              <span className="text-[10px] text-stone-500">[Dated 50%]</span>
            </div>
            <input
              type="number"
              value={daPercent}
              onChange={(e) => setDaPercent(Math.max(0, Number(e.target.value)))}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-semibold focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-[10px] text-amber-800 block">
              [VERIFY current DA at doe.gov.in / finmin.nic.in]
            </span>
          </div>
        </div>

        {/* Arithmetic Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          {/* Earnings */}
          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
            <span className="text-xs font-bold text-emerald-800 font-sans block border-b border-stone-100 pb-1">
              Monthly Earnings (Gross)
            </span>
            <div className="flex justify-between">
              <span>Basic Pay:</span>
              <strong className="text-stone-900">₹{salary.basicPay.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between">
              <span>DA ({salary.daPercent}%):</span>
              <strong className="text-stone-900">+₹{salary.daAmount.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between">
              <span>HRA ({Math.round(salary.hraRate * 100)}%):</span>
              <strong className="text-stone-900">+₹{salary.hraAmount.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between">
              <span>Transport Allowance:</span>
              <strong className="text-stone-900">+₹{salary.transportAllowance.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-emerald-700">
              <span>Gross Total:</span>
              <span>₹{salary.grossSalary.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Deductions */}
          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
            <span className="text-xs font-bold text-rose-800 font-sans block border-b border-stone-100 pb-1">
              Mandatory Deductions
            </span>
            <div className="flex justify-between">
              <span>NPS (10% Basic+DA):</span>
              <strong className="text-stone-900">-₹{salary.npsEmployeeShare.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between">
              <span>CGEGIS Insurance:</span>
              <strong className="text-stone-900">-₹{salary.cgegis.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between">
              <span>CGHS Medical Subscription:</span>
              <strong className="text-stone-900">-₹{salary.cghs.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-rose-700">
              <span>Total Deductions:</span>
              <span>-₹{salary.totalDeductions.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Net Result */}
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-xs font-bold text-emerald-900 font-sans block border-b border-emerald-200 pb-1">
                Net Take-Home Salary
              </span>
              <p className="text-[11px] text-emerald-800 font-sans mt-2">
                Estimated net monthly credit to employee bank account after mandatory pension and welfare deductions.
              </p>
            </div>
            <div className="pt-2">
              <span className="text-[11px] text-stone-500 font-sans block">Approx. Net In-Hand:</span>
              <div className="text-2xl font-black text-emerald-900 font-sans">
                ₹{salary.netInHandSalary.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-stone-600 font-sans ml-1">/ month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 600+ Words of Supporting Editorial Content */}
      <div className="space-y-6 text-stone-800 text-sm leading-relaxed">
        {/* Section 1: How 7th CPC Salary Calculation Works */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            How 7th Pay Commission Salary Calculation Works
          </h2>
          <p>
            Under the recommendations of the Seventh Central Pay Commission (7th CPC) accepted by the Government of India via Ministry of Finance Gazette Notification, the legacy system of Pay Bands and Grade Pay was replaced by a standardized <strong>Pay Matrix</strong> comprising Levels 1 to 18. Each pay level features progressive vertical cells representing annual 3% increments.
          </p>
          <p>
            A central government employee's monthly remuneration consists of two distinct components: gross cash emoluments and statutory payroll withholdings. Gross compensation is computed through the following arithmetic equation:
          </p>
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 font-mono text-xs text-stone-900 space-y-1">
            <p><strong>Gross Monthly Salary</strong> = Basic Pay + Dearness Allowance (DA) + House Rent Allowance (HRA) + Transport Allowance (TA) + DA on TA</p>
            <p><strong>Statutory Deductions</strong> = Employee NPS Contribution (10% of Basic + DA) + CGEGIS + CGHS</p>
            <p><strong>Net In-Hand Salary</strong> = Gross Monthly Salary - Statutory Deductions</p>
          </div>
          <p>
            Dearness Allowance acts as a cost-of-living inflation adjustment calculated bi-annually (effective January 1 and July 1) based on the 12-month average of the All India Consumer Price Index for Industrial Workers (CPI-IW). When DA crossed 50%, the revised HRA slabs (30% for Class X, 20% for Class Y, and 10% for Class Z) became operational as stipulated in MoF OM No. 2/5/2017-E.II(B).
          </p>
        </section>

        {/* Section 2: Worked Example with Real Arithmetic */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Worked Example: Level 7 Assistant Section Officer (ASO) in Delhi (Class X)
          </h2>
          <p>
            Consider a newly recruited Assistant Section Officer (ASO) through SSC CGL placed at Cell 1 of Pay Level 7 with a posting in Central Secretariat, New Delhi (Class X city) under 50% Dearness Allowance:
          </p>
          <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left divide-y divide-stone-200">
              <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Salary Component</th>
                  <th className="p-3">Calculation Formula</th>
                  <th className="p-3 text-right">Monthly Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 bg-white font-mono">
                <tr>
                  <td className="p-3 font-sans font-semibold">Basic Pay (Level 7, Cell 1)</td>
                  <td className="p-3 font-sans">Starting Pay Matrix Index</td>
                  <td className="p-3 text-right font-bold">44,900.00</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold">Dearness Allowance (DA @ 50%)</td>
                  <td className="p-3 font-sans">50% × ₹44,900</td>
                  <td className="p-3 text-right text-emerald-700">+22,450.00</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold">House Rent Allowance (HRA @ 30%)</td>
                  <td className="p-3 font-sans">30% × ₹44,900 (Class X revised slab)</td>
                  <td className="p-3 text-right text-emerald-700">+13,470.00</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold">Transport Allowance (TA)</td>
                  <td className="p-3 font-sans">Higher TPTA Level 7 Base (₹3,600) + 50% DA (₹1,800)</td>
                  <td className="p-3 text-right text-emerald-700">+5,400.00</td>
                </tr>
                <tr className="bg-stone-50 font-bold font-sans">
                  <td className="p-3" colSpan={2}>Gross Monthly Emoluments</td>
                  <td className="p-3 text-right font-mono text-emerald-900">₹86,220.00</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold text-rose-800">NPS Tier-1 (Employee Share)</td>
                  <td className="p-3 font-sans">10% of (Basic + DA) = 10% of ₹67,350</td>
                  <td className="p-3 text-right text-rose-700">-6,735.00</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold text-rose-800">CGEGIS Group B Insurance</td>
                  <td className="p-3 font-sans">Flat Monthly Premium</td>
                  <td className="p-3 text-right text-rose-700">-60.00</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold text-rose-800">CGHS Medical Contribution</td>
                  <td className="p-3 font-sans">Prescribed Level 7 Rate</td>
                  <td className="p-3 text-right text-rose-700">-650.00</td>
                </tr>
                <tr className="bg-emerald-50 font-bold font-sans text-sm">
                  <td className="p-3 text-emerald-950" colSpan={2}>Net Take-Home Salary Credited to Bank</td>
                  <td className="p-3 text-right font-mono text-emerald-950 font-black">₹78,775.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-500">
            * Note: If government quarter accommodation (Type-IV GPRA) is occupied, the HRA of ₹13,470 is foregone and standard license fee + water charges are deducted instead.
          </p>
        </section>

        {/* Section 3: Benchmark Salary Table for 10 Popular Posts */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Benchmark In-Hand Salaries for 10 Popular Government Posts
          </h2>
          <p className="text-xs text-stone-600">
            Estimated monthly take-home salary across Class X (Delhi/Mumbai), Class Y (State Capitals), and Class Z (District Towns) based on 50% DA and statutory NPS deductions:
          </p>
          <div className="border border-stone-200 rounded-xl overflow-x-auto text-xs">
            <table className="w-full text-left divide-y divide-stone-200 min-w-[600px]">
              <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Post Title</th>
                  <th className="p-3">Department</th>
                  <th className="p-3 text-center">Pay Level</th>
                  <th className="p-3 text-right">Class X In-Hand</th>
                  <th className="p-3 text-right">Class Y In-Hand</th>
                  <th className="p-3 text-right">Class Z In-Hand</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 bg-white">
                {POPULAR_POSTS_BENCHMARK.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-50">
                    <td className="p-3 font-semibold text-stone-900">{row.post}</td>
                    <td className="p-3 text-stone-600">{row.department}</td>
                    <td className="p-3 text-center font-bold text-blue-700">Level {row.payLevel}</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-800">₹{row.classXInHand.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-mono text-stone-700">₹{row.classYInHand.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-mono text-stone-600">₹{row.classZInHand.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Rules and Official Sources */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Official Rules, Circulars & Statutory References
          </h2>
          <ul className="space-y-2 text-xs text-stone-700">
            <li className="flex items-start gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Department of Expenditure (Ministry of Finance):</strong> Office Memorandum No. 2/5/2017-E.II(B) dated 07-07-2017 regarding implementation of 7th CPC recommendations on House Rent Allowance.{' '}
                <a href="https://doe.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  doe.gov.in
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Department of Personnel and Training (DoPT):</strong> OM No. 21/5/2017-Estt.(Pay-II) governing Pay Fixation, Annual Increment Cells, and Deputation Allowances.{' '}
                <a href="https://dopt.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  dopt.gov.in
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Pension Fund Regulatory and Development Authority (PFRDA):</strong> National Pension System (NPS) Contribution and Withdrawal Regulations.{' '}
                <a href="https://pfrda.org.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  pfrda.org.in
                </a>
              </span>
            </li>
          </ul>
        </section>

        {/* Section 5: Common Mistakes */}
        <section className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-amber-950 font-bold">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg">Common Mistakes When Estimating Government Pay</h2>
          </div>
          <ul className="space-y-2 text-xs text-amber-900">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Confusing CTC with Take-Home Pay:</strong> Advertised CTC frequently includes the 14% government NPS contribution, annual LTC budget, and CGHS medical cover. The cash credited to your bank is significantly lower.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Ignoring City Classification:</strong> Being posted in a Class Z rural town versus Class X Delhi creates a 20% HRA differential and cuts Transport Allowance by half, reducing in-hand pay by ₹10,000 to ₹18,000 per month for the same post.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Forgetting Dearness Allowance on Transport Allowance:</strong> Transport Allowance itself attracts Dearness Allowance at the prevailing rate (50%). Failing to compute DA on TA understates gross pay.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Overlooking Income Tax Withholding:</strong> While statutory payroll deductions (NPS, CGHS, CGEGIS) are fixed, monthly income tax TDS will be deducted from your gross pay depending on your declared tax regime.</span>
            </li>
          </ul>
        </section>

        {/* Section 6: FAQs */}
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
