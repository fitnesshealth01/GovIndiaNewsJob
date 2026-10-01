import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  UserCheck,
  AlertTriangle,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Award,
  CheckCircle,
  Building,
  Scale
} from 'lucide-react';
import { AuthorsSection } from './AuthorsSection';

interface TrustHubProps {
  initialTab?: 'editorial' | 'grievance' | 'factcheck' | 'authors';
  selectedAuthorId?: string;
  onNavigate?: (path: string) => void;
}

export const TrustHub: React.FC<TrustHubProps> = ({ initialTab = 'editorial', selectedAuthorId, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'editorial' | 'grievance' | 'factcheck' | 'authors'>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-widest mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>E-E-A-T & Google AdSense Publisher Trust Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
          Editorial Integrity, Fact-Checking & Statutory Compliance
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          GovIndiaNews is committed to absolute journalistic rigor, non-partisan civil service reportage, and zero-error verification directly sourced from the Gazette of India, Union Public Service Commission, Staff Selection Commission, and Central Ministries.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 mb-8">
        <button
          onClick={() => setActiveTab('editorial')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'editorial'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Editorial Policy</span>
        </button>

        <button
          onClick={() => setActiveTab('factcheck')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'factcheck'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Fact-Checking & Corrections</span>
        </button>

        <button
          onClick={() => setActiveTab('grievance')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'grievance'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Grievance Redressal (IT Rules)</span>
        </button>

        <button
          onClick={() => setActiveTab('authors')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'authors'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Editorial Board & Authors</span>
        </button>
      </div>

      {/* Tab 1: Editorial Policy */}
      {activeTab === 'editorial' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Editorial Code of Ethics & Gazette Standard</h2>
              <p className="text-xs text-slate-500">Last Reviewed & Certified: 30 September 2026</p>
            </div>
          </div>

          <p>
            GovIndiaNews operates as an independent educational portal tracking government recruitment, competitive examination schedules, official answer keys, and public policy gazettes. Our mission is to protect 30+ million Indian civil service aspirants from fraudulent recruitment rumors, unverified clickbait dates, and misleading salary claims.
          </p>

          <h3 className="text-base font-bold text-slate-900 pt-2">1. Official Primary Source Mandate</h3>
          <p>
            Every single job notification, syllabus syllabus breakdown, admit card release, or cut-off table published on our platform must be verified against at least one of the following primary official statutory instruments:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs text-slate-600">
            <li><strong>The Gazette of India (Extraordinary / Weekly)</strong> published by the Directorate of Printing, Ministry of Housing and Urban Affairs.</li>
            <li><strong>Official Employment News (Rozgar Samachar)</strong> published weekly by the Publications Division, Ministry of Information and Broadcasting.</li>
            <li><strong>Direct Press Releases & Advisories</strong> from Union Public Service Commission (upsc.gov.in), Staff Selection Commission (ssc.gov.in), Railway Recruitment Control Board (indianrailways.gov.in), or State Public Service Commissions.</li>
            <li><strong>Official Banking Personnel Notifications</strong> issued by the Institute of Banking Personnel Selection (ibps.in) and State Bank of India (sbi.co.in).</li>
          </ul>

          <h3 className="text-base font-bold text-slate-900 pt-2">2. Non-Affiliation and Public Service Disclaimer</h3>
          <p>
            GovIndiaNews is not affiliated with the Union Public Service Commission, Staff Selection Commission, Ministry of Defence, or any central/state government body. We publish authentic informational summaries and educational tools free of charge for Indian students and job seekers. Official notifications remain the sole legal authority.
          </p>

          <h3 className="text-base font-bold text-slate-900 pt-2">3. Google AdSense Publisher Compliance Statement</h3>
          <p>
            Our publication strictly complies with the Google Publisher Policies, including transparency of authorship, non-deceptive navigational cues, strict user privacy, and authentic editorial value. We do not use intrusive popups, deceptive download buttons, or artificial content generators.
          </p>
        </div>
      )}

      {/* Tab 2: Fact-Checking & Corrections Policy */}
      {activeTab === 'factcheck' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Fact-Checking & Rapid Correction Policy</h2>
              <p className="text-xs text-slate-500">2-Hour SLA for Exam Date & Discrepancy Rectification</p>
            </div>
          </div>

          <p>
            In government recruitment examinations, a single date error or incorrect mark deduction factor can harm an applicant's preparation strategy. We enforce a four-tiered verification framework before any alert goes live:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <span className="text-xs font-bold text-blue-700 block mb-1">STAGE 1: GAZETTE DISCOVERY</span>
              <p className="text-xs text-slate-600">
                Notification text is sourced directly from gazette.nic.in or ministry press conferences. Social media claims without official file numbers are rejected immediately.
              </p>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <span className="text-xs font-bold text-emerald-700 block mb-1">STAGE 2: PARAMETER VERIFICATION</span>
              <p className="text-xs text-slate-600">
                Eligibility criteria, cut-off dates, physical standard tests (PST/PET), and reservation quota rules are verified line-by-line against DOP&T guidelines.
              </p>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <span className="text-xs font-bold text-purple-700 block mb-1">STAGE 3: LIVE LINK INTEGRITY</span>
              <p className="text-xs text-slate-600">
                All external application links are tested to confirm they point directly to secure (.gov.in / .nic.in) domains, not referral networks or third-party forms.
              </p>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <span className="text-xs font-bold text-amber-700 block mb-1">STAGE 4: CORRECTION LOGGING</span>
              <p className="text-xs text-slate-600">
                If an official agency issues a corrigendum, our editors update the article within 120 minutes with a timestamped "Corrigendum Alert" banner.
              </p>
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900 pt-2">How to Report an Error or Discrepancy</h3>
          <p>
            If you notice any typo, date change, or broken commission link, please email our fact-checking desk at <strong>corrections@govindianews.org</strong> with the page URL and screenshot. Corrections are reviewed within 2 hours.
          </p>
        </div>
      )}

      {/* Tab 3: Statutory Grievance Redressal (IT Rules 2021) */}
      {activeTab === 'grievance' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Statutory Grievance Redressal Mechanism</h2>
              <p className="text-xs text-slate-500">In Compliance with Rule 4(1)(d) of the Information Technology Rules, 2021</p>
            </div>
          </div>

          <p>
            Under the provisions of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, GovIndiaNews has appointed a dedicated Resident Grievance Officer to address user complaints, editorial discrepancies, and copyright inquiries.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Appointed Resident Grievance Officer
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block font-medium">Officer Name</span>
                <strong className="text-slate-900 text-sm">Akash Singh Solanki</strong>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Designation</span>
                <span className="text-slate-800">Compliance & Resident Grievance Officer</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Official Contact Email</span>
                <a href="mailto:grievance@govindianews.org" className="text-blue-600 font-semibold underline">
                  grievance@govindianews.org
                </a>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Acknowledgment Period</span>
                <span className="text-slate-800 font-semibold text-emerald-700">Within 24 Hours</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block font-medium">Physical Office Address for Legal Communication</span>
                <p className="text-slate-800">
                  GovIndiaNews Secretariat, Press Enclave Road, Saket Institutional Area, New Delhi - 110017, India
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900 pt-2">Grievance Escalation Process</h3>
          <ol className="list-decimal pl-6 space-y-2 text-xs text-slate-600">
            <li><strong>Submission:</strong> Email details of the grievance along with your name, phone number, and evidence to grievance@govindianews.org.</li>
            <li><strong>Acknowledgment:</strong> A unique grievance ticket number is emailed back within 24 hours.</li>
            <li><strong>Resolution:</strong> The matter is investigated and a written resolution is provided within 15 working days.</li>
          </ol>
        </div>
      )}

      {/* Tab 4: Authors & Editorial Board */}
      {activeTab === 'authors' && (
        <AuthorsSection
          selectedAuthorId={selectedAuthorId}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};
