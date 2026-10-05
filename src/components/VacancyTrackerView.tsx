import React, { useState, useMemo } from 'react';
import { VACANCY_HISTORY, VacancyRecord } from '../content/vacancyData';
import {
  Download,
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink,
  Building2,
  TrendingUp,
  BarChart3,
  Calendar,
} from 'lucide-react';

interface VacancyTrackerViewProps {
  onNavigate: (path: string) => void;
}

export const VacancyTrackerView: React.FC<VacancyTrackerViewProps> = ({ onNavigate }) => {
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<'year' | 'vacancies' | 'examName'>('year');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const exams = ['all', 'SSC CGL', 'SSC CHSL', 'UPSC CSE', 'IBPS PO', 'SBI PO', 'RRB NTPC', 'RRB ALP'];
  const years = ['all', '2026', '2025', '2024', '2023', '2022', '2021', '2020'];

  const handleSort = (field: 'year' | 'vacancies' | 'examName') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredData = useMemo(() => {
    return VACANCY_HISTORY.filter((item) => {
      const matchesExam = selectedExam === 'all' || item.examName === selectedExam;
      const matchesYear = selectedYear === 'all' || item.year.toString() === selectedYear;
      const matchesSearch =
        item.examName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.conductingBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.notes.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesExam && matchesYear && matchesSearch;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortField === 'year') comparison = a.year - b.year;
      else if (sortField === 'vacancies') comparison = a.vacancies - b.vacancies;
      else if (sortField === 'examName') comparison = a.examName.localeCompare(b.examName);
      return sortDirection === 'desc' ? -comparison : comparison;
    });
  }, [selectedExam, selectedYear, searchQuery, sortField, sortDirection]);

  const handleExportCsv = () => {
    const headers = ['ID', 'Exam Name', 'Conducting Body', 'Year', 'Vacancies', 'Source Title', 'Source URL', 'Notes'];
    const rows = filteredData.map((d) => [
      d.id,
      `"${d.examName}"`,
      `"${d.conductingBody}"`,
      d.year,
      d.vacancies,
      `"${d.sourceTitle}"`,
      d.sourceUrl,
      `"${d.notes.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `govindianews_vacancies_data_${selectedExam}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md font-semibold">
            Longitudinal Data Tracker (2020–2026)
          </span>
          <span className="text-stone-500">
            Last updated: <strong className="text-stone-800">01 October 2026</strong> · Sourced from official annual reports
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Central Government Recruitment Vacancy Tracker (2020–2026)
        </h1>

        <p className="text-sm text-stone-600 leading-relaxed max-w-3xl">
          Multi-year historical vacancy database tracking central civil, railway, banking, and defence recruitment trends. Sort, filter, search, audit direct commission citations, and export verified datasets as CSV.
        </p>

        {/* Action Controls */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Exam Filter */}
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="p-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-semibold focus:ring-2 focus:ring-blue-500"
            >
              {exams.map((ex) => (
                <option key={ex} value={ex}>
                  {ex === 'all' ? 'All Examinations' : ex}
                </option>
              ))}
            </select>

            {/* Year Filter */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="p-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-semibold focus:ring-2 focus:ring-blue-500"
            >
              {years.map((yr) => (
                <option key={yr} value={yr}>
                  {yr === 'all' ? 'All Years' : yr}
                </option>
              ))}
            </select>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportCsv}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV Dataset ({filteredData.length} Records)</span>
          </button>
        </div>
      </div>

      {/* Interactive Data Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left divide-y divide-stone-200 text-xs min-w-[700px]">
            <thead className="bg-stone-100 text-stone-700 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th
                  onClick={() => handleSort('examName')}
                  className="p-3.5 cursor-pointer hover:bg-stone-200 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Examination</span>
                    <ArrowUpDown className="w-3 h-3 text-stone-400" />
                  </div>
                </th>
                <th className="p-3.5">Conducting Body</th>
                <th
                  onClick={() => handleSort('year')}
                  className="p-3.5 text-center cursor-pointer hover:bg-stone-200 transition-colors"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>Year</span>
                    <ArrowUpDown className="w-3 h-3 text-stone-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('vacancies')}
                  className="p-3.5 text-right cursor-pointer hover:bg-stone-200 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Total Vacancies</span>
                    <ArrowUpDown className="w-3 h-3 text-stone-400" />
                  </div>
                </th>
                <th className="p-3.5">Verified Primary Source Link</th>
                <th className="p-3.5">Cadre Details / Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-500">
                    No matching vacancy records found. Adjust your filters above.
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-3.5 font-bold text-stone-900">{row.examName}</td>
                    <td className="p-3.5 text-stone-600">{row.conductingBody}</td>
                    <td className="p-3.5 text-center font-mono font-bold text-blue-800">{row.year}</td>
                    <td className="p-3.5 text-right font-mono font-extrabold text-emerald-900 text-sm">
                      {row.vacancies.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3.5 text-blue-700">
                      <a
                        href={row.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:underline font-medium"
                      >
                        <span className="truncate max-w-[180px]">{row.sourceTitle}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </td>
                    <td className="p-3.5 text-stone-500 text-[11px] leading-tight max-w-[220px]">
                      {row.notes}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supporting Editorial Analysis */}
      <div className="space-y-6 text-stone-800 text-sm leading-relaxed">
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Methodology & Longitudinal Recruitment Analysis
          </h2>
          <p>
            Vacancy figures in central government recruitment drives are subject to dynamic requisitioning. At the time of preliminary advertisement publication, commissions typically release <strong>tentative vacancies</strong>. Throughout the multi-stage examination lifecycle (often spanning 6 to 14 months), participating ministries, public sector banks, and zonal railway administrations adjust their cadre intakes based on retirements, promotion rosters, and departmental expansions.
          </p>
          <p>
            This tracker records both tentative gazette notices and <strong>final appointment allocations</strong> as authenticated in the official Annual Reports of the Staff Selection Commission, Union Public Service Commission, and the Ministry of Railways tabled in Parliament.
          </p>
        </section>
      </div>
    </div>
  );
};
