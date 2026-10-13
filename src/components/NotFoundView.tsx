import React, { useState } from 'react';
import { Search, Home, Briefcase, FileText, Calculator, ArrowRight, AlertCircle, Compass } from 'lucide-react';
import { RECRUITMENT_ALERTS } from '../data/gazetteData';
import { isAlertActive } from '../utils/alertStatus';

interface NotFoundViewProps {
  onNavigate: (path: string) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const activeAlerts = RECRUITMENT_ALERTS.filter((a) => isAlertActive(a)).slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`/jobs?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* 404 Header Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-5 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold uppercase tracking-wider">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>404 Error · Page or Notice Not Found</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          We Couldn't Find the Requested Page
        </h1>

        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          The recruitment notification, exam guide, or tool URL you requested may have been relocated, updated under the latest official gazette cycle, or mistyped.
        </p>

        {/* In-page Search Box */}
        <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recruitment notices, tools, or cut-offs..."
            className="w-full pl-10 pr-24 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-3.5 px-3 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Quick Hub Navigation Cards */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="p-3 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200 rounded-xl transition-all text-center space-y-1.5 cursor-pointer group"
          >
            <Home className="w-4 h-4 text-blue-700 mx-auto group-hover:scale-110 transition-transform" />
            <span className="font-bold text-slate-900 block">Home</span>
            <span className="text-[10px] text-slate-500 block">Portal Overview</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/jobs')}
            className="p-3 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200 rounded-xl transition-all text-center space-y-1.5 cursor-pointer group"
          >
            <Briefcase className="w-4 h-4 text-blue-700 mx-auto group-hover:scale-110 transition-transform" />
            <span className="font-bold text-slate-900 block">Govt Jobs</span>
            <span className="text-[10px] text-slate-500 block">Latest Vacancies</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/admit-card')}
            className="p-3 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200 rounded-xl transition-all text-center space-y-1.5 cursor-pointer group"
          >
            <FileText className="w-4 h-4 text-emerald-700 mx-auto group-hover:scale-110 transition-transform" />
            <span className="font-bold text-slate-900 block">Admit Cards</span>
            <span className="text-[10px] text-slate-500 block">Hall Tickets</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/tools')}
            className="p-3 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200 rounded-xl transition-all text-center space-y-1.5 cursor-pointer group"
          >
            <Calculator className="w-4 h-4 text-indigo-700 mx-auto group-hover:scale-110 transition-transform" />
            <span className="font-bold text-slate-900 block">Calculators</span>
            <span className="text-[10px] text-slate-500 block">Salary & Age Tools</span>
          </button>
        </div>
      </div>

      {/* Recommended Active Notices (No dead-end) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <Compass className="w-4 h-4 text-blue-600" />
          <span>Trending Public Recruitment Notices</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {activeAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => onNavigate(`/article/${alert.slug}`)}
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-2 group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="font-semibold text-blue-700">{alert.organization}</span>
                  <span>{alert.publishDate}</span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                  {alert.title}
                </h3>
              </div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-blue-700 pt-2 border-t border-slate-100">
                <span>View Full Details</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
