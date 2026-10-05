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
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Editorial Standards & Verification Desk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
          Editorial Integrity, Fact-Checking & Public Sources
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          GovIndiaNews is an independent news and educational portal. All notifications, schedules, and recruitment data are cross-referenced directly against official public government gazettes, commission portals, and central ministries.
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
          <Mail className="w-4 h-4" />
          <span>Contact Desk</span>
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
          <span>Founder & Editor</span>
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
              <h2 className="text-lg font-bold text-slate-900">Editorial Standards & Source Verification</h2>
              <p className="text-xs text-slate-500">Committed to accurate public recruitment reporting</p>
            </div>
          </div>

          <p>
            GovIndiaNews operates as an independent educational portal tracking government recruitment, competitive examination schedules, and official answer keys. Our goal is to provide students and aspirants with clear, organized information and useful utilities.
          </p>

          <h3 className="text-base font-bold text-slate-900 pt-2">1. Official Primary Source Mandate</h3>
          <p>
            Every job notification, syllabus summary, admit card notice, or cut-off table published on our platform is cross-referenced against primary official statutory instruments:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs text-slate-600">
            <li><strong>Official Commission Portals:</strong> Union Public Service Commission (upsc.gov.in), Staff Selection Commission (ssc.gov.in), Railway Recruitment Control Board (rrbapply.gov.in), and State Public Service Commissions.</li>
            <li><strong>Official Employment News (Rozgar Samachar)</strong> and central ministry press releases.</li>
            <li><strong>Public Sector Bank Announcements:</strong> Institute of Banking Personnel Selection (ibps.in) and State Bank of India (sbi.co.in).</li>
          </ul>

          <h3 className="text-base font-bold text-slate-900 pt-2">2. Non-Affiliation and Public Service Disclaimer</h3>
          <p>
            GovIndiaNews is an independent news and information website. We are NOT affiliated with the Union Public Service Commission, Staff Selection Commission, Ministry of Railways, or any central or state government body. Official notifications issued by the respective authorities remain the sole legal authority.
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
              <h2 className="text-lg font-bold text-slate-900">Fact-Checking & Correction Protocol</h2>
              <p className="text-xs text-slate-500">Rapid review of reported discrepancies</p>
            </div>
          </div>

          <p>
            Accuracy is our top priority. We verify eligibility criteria, dates, and official notification PDFs before publishing:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <span className="text-xs font-bold text-blue-700 block mb-1">OFFICIAL NOTICE DISCOVERY</span>
              <p className="text-xs text-slate-600">
                Data is checked against official notification PDFs released on government (.gov.in / .nic.in) domains.
              </p>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <span className="text-xs font-bold text-emerald-700 block mb-1">CRITERIA AUDITING</span>
              <p className="text-xs text-slate-600">
                Dates, vacancy breakdowns, age limits, and fees are verified directly from published recruitment brochures.
              </p>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <span className="text-xs font-bold text-amber-700 block mb-1">CORRECTION LOGGING</span>
              <p className="text-xs text-slate-600">
                When an official agency issues a corrigendum, we update our articles and note the revision.
              </p>
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900 pt-2">How to Report an Error</h3>
          <p>
            If you notice any typo, date change, or broken link, please email us at <strong>contact@govindianews.com</strong> with the page URL and relevant details.
          </p>
        </div>
      )}

      {/* Tab 3: Contact Desk */}
      {activeTab === 'grievance' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Contact & Feedback Desk</h2>
              <p className="text-xs text-slate-500">Reach the editorial team directly</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Editorial Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block font-medium">Founder & Editor</span>
                <strong className="text-slate-900 text-sm">Akash Singh Solanki</strong>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Official Contact Email</span>
                <a href="mailto:contact@govindianews.com" className="text-blue-600 font-semibold underline">
                  contact@govindianews.com
                </a>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600">
            You can also submit inquiries, factual errata, or corrections via our dedicated <button onClick={() => onNavigate?.('/contact')} className="text-blue-600 font-semibold underline cursor-pointer">Contact Form</button>.
          </p>
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
