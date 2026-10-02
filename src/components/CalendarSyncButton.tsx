import React, { useState } from 'react';
import { Calendar, Download, ExternalLink, Check, Bell } from 'lucide-react';

interface CalendarSyncButtonProps {
  title: string;
  deadlineDate?: string;
  examDate?: string;
  organization: string;
  officialLink?: string;
}

export const CalendarSyncButton: React.FC<CalendarSyncButtonProps> = ({
  title,
  deadlineDate,
  examDate,
  organization,
  officialLink = 'https://govindianews.com'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Helper to parse dates like "24 Oct 2026", "30 September 2026"
  const parseDateToISO = (dateStr?: string): Date | null => {
    if (!dateStr) return null;
    try {
      // Clean string
      const clean = dateStr.replace(/\(.*?\)/g, '').split('to')[0].trim();
      const parsed = new Date(clean);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    } catch {
      // fallback
    }
    return new Date();
  };

  const targetDate = parseDateToISO(deadlineDate || examDate) || new Date();
  
  // Format for Google Calendar: YYYYMMDDTHHmmssZ
  const formatDateForGoogle = (d: Date): string => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const startDate = new Date(targetDate);
  startDate.setHours(9, 0, 0, 0); // 9:00 AM
  const endDate = new Date(targetDate);
  endDate.setHours(18, 0, 0, 0); // 6:00 PM

  const eventTitle = deadlineDate 
    ? `[DEADLINE] Last Date to Apply: ${title}`
    : `[EXAM DAY] ${title}`;

  const eventDescription = `Official Gazette Reminder by GovIndiaNews for ${organization}.\n\nTarget Date: ${deadlineDate || examDate || 'Important Date'}\nOfficial Link: ${officialLink}\n\nMake sure to submit applications / download admit cards ahead of server rush.`;

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventTitle
  )}&dates=${formatDateForGoogle(startDate)}/${formatDateForGoogle(
    endDate
  )}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(organization)}`;

  const generateICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//GovIndiaNews//Recruitment Portal//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@govindianews.com`,
      `DTSTAMP:${formatDateForGoogle(new Date())}`,
      `DTSTART:${formatDateForGoogle(startDate)}`,
      `DTEND:${formatDateForGoogle(endDate)}`,
      `SUMMARY:${eventTitle}`,
      `DESCRIPTION:${eventDescription.replace(/\n/g, '\\n')}`,
      `LOCATION:${organization}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'DESCRIPTION:Reminder: 24 Hours Remaining',
      'ACTION:DISPLAY',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `govindianews-alert-${Date.now()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors shadow-2xs cursor-pointer"
        title="Sync important date with Google or Apple Calendar"
      >
        <Calendar className="w-3.5 h-3.5 text-blue-600" />
        <span>Add to Calendar</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black/10 p-3 z-30 space-y-2.5 text-xs animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-amber-500" />
              <span>Calendar Event Sync</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 text-[11px] font-bold"
            >
              ✕
            </button>
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            Set an automated 24-hour and 3-day reminder for <strong>{deadlineDate ? 'Application Deadline' : 'Exam Date'}</strong> on your phone or computer.
          </p>

          <div className="space-y-1.5">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-between transition-colors shadow-2xs"
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Google Calendar</span>
              </span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <button
              type="button"
              onClick={generateICS}
              className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold flex items-center justify-between transition-colors border border-slate-200 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>Apple / Outlook (.ics)</span>
              </span>
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : null}
            </button>
          </div>

          <div className="text-[10px] text-slate-400 pt-1 text-center border-t border-slate-100">
            Works natively with Android, iOS, Windows & Mac
          </div>
        </div>
      )}
    </div>
  );
};
