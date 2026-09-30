import React, { useState } from 'react';
import { RECRUITMENT_ALERTS, RecruitmentAlert } from '../data/gazetteData';
import { Search, Globe, Smartphone, Monitor, Code, ExternalLink, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { buildJobPostingSchema, buildNewsArticleSchema } from '../utils/seoSchema';

interface GoogleSnippetPreviewProps {
  onNavigate?: (path: string) => void;
}

export const GoogleSnippetPreview: React.FC<GoogleSnippetPreviewProps> = ({ onNavigate }) => {
  const [selectedAlertId, setSelectedAlertId] = useState<string>(RECRUITMENT_ALERTS[0]?.id || '');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('mobile');
  const [activeTab, setActiveTab] = useState<'serp' | 'jsonld'>('serp');

  const selectedAlert = RECRUITMENT_ALERTS.find((a) => a.id === selectedAlertId) || RECRUITMENT_ALERTS[0];

  const titleLength = selectedAlert?.title?.length || 0;
  const summaryLength = selectedAlert?.summary?.length || 0;

  const schemaJson = selectedAlert?.category === 'jobs'
    ? buildJobPostingSchema(selectedAlert)
    : buildNewsArticleSchema(selectedAlert);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>SEO & Search Engine Dominance Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Google Rich Snippet & SERP Simulator
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Inspect how official recruitment alerts render on Google Search with Schema.org JSON-LD rich cards, breadcrumbs, salary badges, and publication timestamps.
        </p>
      </div>

      {/* Select Alert Dropdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
          Select Notification / Admit Card to Inspect
        </label>
        <select
          value={selectedAlertId}
          onChange={(e) => setSelectedAlertId(e.target.value)}
          className="w-full text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          {RECRUITMENT_ALERTS.map((alert) => (
            <option key={alert.id} value={alert.id}>
              [{alert.category.toUpperCase()}] {alert.organization} - {alert.title}
            </option>
          ))}
        </select>
      </div>

      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('serp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'serp'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Google SERP Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('jsonld')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'jsonld'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Schema.org JSON-LD Code</span>
          </button>
        </div>

        {activeTab === 'serp' && (
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                viewMode === 'mobile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile SERP</span>
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                viewMode === 'desktop' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop SERP</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Preview Container */}
      {activeTab === 'serp' ? (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
          <div className="text-xs text-slate-500 flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Simulated Search Query:</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-800">
                "{selectedAlert.title.split(' ').slice(0, 5).join(' ')}"
              </span>
            </div>
            <span className="hidden sm:inline-block text-emerald-600 font-semibold text-[11px]">
              ✓ Validated with Google Rich Results Standard
            </span>
          </div>

          {/* Google Search Card Preview */}
          <div className={`mx-auto ${viewMode === 'mobile' ? 'max-w-md' : 'max-w-2xl'} font-sans`}>
            {/* Sitelink / Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-700 mb-1">
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                G
              </div>
              <div className="flex items-center gap-1 text-[12px] truncate">
                <span className="font-medium text-slate-800">govindianews.org</span>
                <span className="text-slate-400">›</span>
                <span className="text-slate-500">article</span>
                <span className="text-slate-400">›</span>
                <span className="text-slate-500 truncate">{selectedAlert.slug}</span>
              </div>
            </div>

            {/* SERP Title */}
            <h2 className="text-lg sm:text-xl font-medium text-blue-800 hover:underline cursor-pointer leading-snug mb-1">
              {selectedAlert.title}
            </h2>

            {/* Date + Description Snippet */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              <span className="text-slate-400 font-medium mr-1.5">{selectedAlert.publishDate} —</span>
              {selectedAlert.summary}
            </p>

            {/* Google Jobs Rich Card Features */}
            {selectedAlert.category === 'jobs' && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{selectedAlert.organization}</span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Full-time Government Post
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-600">
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                    📍 Location: All India
                  </span>
                  {selectedAlert.salaryStructure && (
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium text-emerald-800">
                      💰 {selectedAlert.salaryStructure.payLevel}
                    </span>
                  )}
                  {selectedAlert.lastDate && (
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-rose-700 font-medium">
                      ⏱ Deadline: {selectedAlert.lastDate}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Audit Metrics */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block mb-1">Title Length</span>
              <strong className={`text-sm ${titleLength > 65 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {titleLength} characters
              </strong>
              <p className="text-[11px] text-slate-500 mt-0.5">Optimal range: 45–65 chars</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block mb-1">Description Length</span>
              <strong className={`text-sm ${summaryLength > 165 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {summaryLength} characters
              </strong>
              <p className="text-[11px] text-slate-500 mt-0.5">Optimal range: 120–160 chars</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block mb-1">Schema Type</span>
              <strong className="text-sm text-blue-600 uppercase">
                {selectedAlert.category === 'jobs' ? 'JobPosting' : 'NewsArticle'}
              </strong>
              <p className="text-[11px] text-slate-500 mt-0.5">Active JSON-LD in DOM</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 text-slate-100 rounded-xl p-6 font-mono text-xs overflow-x-auto">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
            <span>&lt;script type="application/ld+json"&gt;</span>
            <span className="text-emerald-400 font-sans text-xs">Valid Schema.org Payload</span>
          </div>
          <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed">
            {JSON.stringify(schemaJson, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
