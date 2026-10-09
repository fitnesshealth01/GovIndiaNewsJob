import React, { useState } from 'react';
import { EXAM_HUBS, ExamHub } from '../content/examHubsData';
import {
  Building2,
  Calendar,
  Award,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  BookOpen,
  AlertTriangle,
  HelpCircle,
  Briefcase,
  Layers,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { NavLink } from './NavLink';

interface ExamHubViewProps {
  slug?: string;
  onNavigate: (path: string) => void;
}

export const ExamHubView: React.FC<ExamHubViewProps> = ({ slug, onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const hub = slug ? EXAM_HUBS.find((h) => h.slug === slug) : null;

  // Directory Hub View
  if (!hub) {
    const filtered = EXAM_HUBS.filter(
      (h) =>
        h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.conductingBody.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-3 shadow-xs">
          <span className="text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md text-xs font-semibold">
            Central & State Competitive Examination Knowledge Hub
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Comprehensive Government Exam Reference Hubs
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed max-w-3xl">
            In-depth architectural blueprints for 15 premier Indian public recruitment examinations. Detailed eligibility criteria, multi-stage selection patterns, 7th CPC career hierarchies, and preparation strategies verified against official notifications.
          </p>

          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search exam hubs (e.g. CGL, NTPC, UPSC, PO)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <NavLink
              key={item.slug}
              href={`/exams/${item.slug}`}
              onNavigate={onNavigate}
              className="p-5 bg-white rounded-2xl border border-stone-200 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer space-y-3 flex flex-col justify-between block"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span className="font-semibold text-stone-800">{item.conductingBody}</span>
                  <span>Level: {item.payAndCareerGrowth.payLevel.split(' ')[0]}</span>
                </div>
                <h2 className="font-bold text-base text-stone-900 leading-snug">
                  {item.examName}
                </h2>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {item.overview}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-blue-700">
                <span>View Full Examination Blueprint</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

  // Standalone Deep-Dive 1,500+ Word Blueprint View
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hub.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const scriptId = 'govindianews-examhub-jsonld';
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
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md font-semibold">
              Official Examination Guide
            </span>
            <span className="text-stone-500">·</span>
            <span className="text-stone-700 font-semibold">{hub.conductingBody}</span>
          </div>
          <span className="text-stone-500">
            Last reviewed: <strong className="text-stone-800">{hub.lastReviewed}</strong>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
          {hub.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs border-t border-stone-100">
          <a
            href={hub.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Official Portal ({hub.conductingBody})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <NavLink
            href="/tools/salary"
            onNavigate={onNavigate}
            className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>7th CPC In-Hand Calculator</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </NavLink>
          <NavLink
            href="/exams"
            onNavigate={onNavigate}
            className="px-3.5 py-1.5 text-stone-600 hover:text-stone-900 font-medium cursor-pointer ml-auto"
          >
            ← All 15 Exam Hubs
          </NavLink>
        </div>
      </div>

      {/* 1. Overview */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-3 shadow-xs text-sm leading-relaxed text-stone-800">
        <h2 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-700" />
          <span>1. Examination Overview & Mandate</span>
        </h2>
        <p className="font-sans leading-relaxed">{hub.overview}</p>
      </section>

      {/* 2. Eligibility */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs text-sm leading-relaxed text-stone-800">
        <h2 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-700" />
          <span>2. Statutory Eligibility Criteria</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-900 uppercase block tracking-wider text-[11px]">Age Limit & Crucial Date:</span>
            <p className="text-stone-700">{hub.eligibility.ageLimit}</p>
          </div>
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-900 uppercase block tracking-wider text-[11px]">Educational Qualification:</span>
            <p className="text-stone-700">{hub.eligibility.educationalQualification}</p>
          </div>
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-900 uppercase block tracking-wider text-[11px]">Nationality:</span>
            <p className="text-stone-700">{hub.eligibility.nationality}</p>
          </div>
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-900 uppercase block tracking-wider text-[11px]">Attempt Limits:</span>
            <p className="text-stone-700">{hub.eligibility.attempts}</p>
          </div>
        </div>
      </section>

      {/* 3. Selection Stages */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs text-sm leading-relaxed text-stone-800">
        <h2 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-700" />
          <span>3. Multi-Stage Selection Framework</span>
        </h2>
        <div className="space-y-3">
          {hub.selectionStages.map((stage, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-1 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-blue-800 uppercase tracking-wider text-[11px] bg-blue-100 px-2 py-0.5 rounded">
                  {stage.stage}: {stage.name}
                </span>
                <span className="text-stone-500 font-medium">{stage.mode}</span>
              </div>
              <p className="text-stone-700 pt-1 leading-relaxed">{stage.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Syllabus & Pattern */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs text-sm leading-relaxed text-stone-800">
        <h2 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-700" />
          <span>4. Detailed Examination Scheme & Syllabus</span>
        </h2>
        <p className="text-xs text-stone-600">{hub.syllabusAndPattern.overview}</p>

        <div className="border border-stone-200 rounded-xl overflow-x-auto text-xs">
          <table className="w-full text-left divide-y divide-stone-200 min-w-[600px]">
            <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px]">
              <tr>
                <th className="p-3">Section / Paper</th>
                <th className="p-3 text-center">Questions</th>
                <th className="p-3 text-center">Marks</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Negative Penalty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white">
              {hub.syllabusAndPattern.patternTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-stone-50">
                  <td className="p-3 font-semibold text-stone-900">{row.section}</td>
                  <td className="p-3 text-center text-stone-800">{row.questions}</td>
                  <td className="p-3 text-center font-bold text-stone-900">{row.marks}</td>
                  <td className="p-3 text-stone-600">{row.duration}</td>
                  <td className="p-3 text-rose-700 font-mono text-[11px]">{row.negativeMarking}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
          <span className="font-bold text-stone-900 block">Syllabus Highlights:</span>
          <ul className="space-y-1 text-stone-700">
            {hub.syllabusAndPattern.syllabusHighlights.map((hl, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-700 font-bold">•</span>
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Pay & Career Growth */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs text-sm leading-relaxed text-stone-800">
        <h2 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-emerald-700" />
          <span>5. Salary Structure (7th CPC) & Career Hierarchy</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
            <span className="font-bold text-emerald-950 uppercase text-[10px] block">Pay Level & Scale:</span>
            <p className="font-semibold text-emerald-900">{hub.payAndCareerGrowth.payLevel}</p>
          </div>
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
            <span className="font-bold text-emerald-950 uppercase text-[10px] block">Starting Basic Pay:</span>
            <p className="font-bold text-emerald-900">{hub.payAndCareerGrowth.startingBasic}</p>
          </div>
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
            <span className="font-bold text-emerald-950 uppercase text-[10px] block">Approx. In-Hand Monthly:</span>
            <p className="font-bold text-emerald-900 font-mono">{hub.payAndCareerGrowth.inHandRange}</p>
          </div>
        </div>

        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
          <span className="font-bold text-stone-900 block">Promotional Hierarchy & Growth Ladder:</span>
          <div className="space-y-1 text-stone-700">
            {hub.payAndCareerGrowth.hierarchy.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{step}</span>
              </div>
            ))}
          </div>
          <p className="pt-2 text-[11px] text-stone-500 border-t border-stone-200 mt-2">
            <strong>Pension & Allowances:</strong> {hub.payAndCareerGrowth.pensionAndPerks}
          </p>
        </div>
      </section>

      {/* 6. Preparation Strategy */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs text-sm leading-relaxed text-stone-800">
        <h2 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>6. Evidence-Based Preparation Strategy</span>
        </h2>
        <ul className="space-y-2 text-xs text-stone-700">
          {hub.preparationStrategy.map((strat, idx) => (
            <li key={idx} className="flex items-start gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="w-5 h-5 rounded-full bg-blue-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{strat}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. Common Mistakes */}
      <section className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-3 text-xs text-amber-900">
        <div className="flex items-center gap-2 font-bold text-amber-950 text-base">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <span>7. Common Fatal Pitfalls Leading to Disqualification</span>
        </div>
        <ul className="space-y-2 pt-1">
          {hub.commonMistakes.map((mistake, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>{mistake}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. FAQs */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs text-xs">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-700" />
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            8. Frequently Asked Questions (FAQs)
          </h2>
        </div>
        <div className="space-y-2">
          {hub.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="border border-stone-200 rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-stone-900 flex items-center justify-between gap-3 hover:bg-stone-50 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-stone-600 leading-relaxed border-t border-stone-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Official Links */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-3 shadow-xs text-xs">
        <h2 className="text-base font-bold text-stone-900">
          9. Primary Official Commission Portals
        </h2>
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <strong className="text-stone-900 block">{hub.conductingBody} Official Recruitment Portal</strong>
            <span className="text-[11px] text-stone-500 font-mono">{hub.officialUrl}</span>
          </div>
          <a
            href={hub.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Visit Official Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
};
