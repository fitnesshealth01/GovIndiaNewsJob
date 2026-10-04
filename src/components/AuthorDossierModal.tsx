import React, { useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Award,
  BookOpen,
  GraduationCap,
  Mail,
  ExternalLink,
  FileText,
  Building,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { AuthorProfile } from '../data/authorData';

interface AuthorDossierModalProps {
  author: AuthorProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateAlert?: (alertId: string) => void;
}

export const AuthorDossierModal: React.FC<AuthorDossierModalProps> = ({
  author,
  isOpen,
  onClose,
  onNavigateAlert
}) => {
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !author) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(author.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-2xl border border-stone-200 shadow-2xl overflow-hidden text-stone-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="author-dossier-title"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 tracking-wide">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>GovIndiaNews Gazette Editorial Verification Registry</span>
            <span className="text-stone-300">·</span>
            <span className="font-mono text-stone-500 tabular-nums">Ref: {author.registrationNumber}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
            aria-label="Close dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8 space-y-6">
          {/* Hero Profile Block */}
          <div className="flex flex-col sm:flex-row items-start gap-5 border-b border-stone-200 pb-6">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl ${author.avatarBg} text-white flex items-center justify-center text-3xl font-serif font-bold shadow-md shrink-0 border-2 ${author.avatarBorder}`}
            >
              {author.initials}
            </div>
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="author-dossier-title" className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
                  {author.name}
                </h2>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {author.verificationBadge}
                </span>
              </div>

              <p className="text-sm font-semibold text-stone-700">{author.designation}</p>

              <div className="flex items-center gap-2 text-xs text-stone-500 flex-wrap">
                <span className="font-medium text-stone-700">Beat: {author.beat}</span>
                <span>·</span>
                <span>{author.yearsOfExperience} Years Specialized Research</span>
                <span>·</span>
                <span>{author.officeDesk}</span>
              </div>

              <div className="pt-1 flex items-center gap-3 text-xs text-stone-600">
                <span className="font-medium text-stone-900">{author.accreditationBadge}</span>
                <span>·</span>
                <span className="font-mono text-stone-600">Reg: {author.registrationNumber}</span>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Curatorial Bio & Editorial Jurisdiction
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed font-sans">
              {author.extendedBiography}
            </p>
          </div>

          {/* Academic Provenance & Degrees */}
          <div className="space-y-3 bg-stone-50/70 p-4 rounded-xl border border-stone-200">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-800">
              <GraduationCap className="w-4 h-4 text-blue-700" />
              <span>Academic Credentials & Institutional Provenance</span>
            </div>
            <div className="space-y-2">
              {author.education.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs border-b border-stone-200/60 pb-2 last:border-none last:pb-0">
                  <div>
                    <strong className="text-stone-900 font-semibold">{edu.degree}</strong>
                    <span className="text-stone-600 block sm:inline sm:ml-2">({edu.institution})</span>
                  </div>
                  <span className="font-mono text-stone-500 tabular-nums shrink-0">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Statutory Focus Areas */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Statutory Roster & Compliance Focus
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {author.statutoryFocusAreas.map((focus, i) => (
                <div key={i} className="flex items-start gap-2 text-stone-700 bg-white p-2.5 rounded-lg border border-stone-200">
                  <Award className="w-3.5 h-3.5 text-stone-500 mt-0.5 shrink-0" />
                  <span>{focus}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Past Publications & Statutory Citations */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-800">
              <BookOpen className="w-4 h-4 text-stone-700" />
              <span>Verified Past Scholarly & Journalistic Publications</span>
            </div>
            <div className="space-y-3">
              {author.pastPublications.map((pub, idx) => (
                <div key={idx} className="border border-stone-200 rounded-xl p-3.5 bg-white space-y-1">
                  <h4 className="text-sm font-semibold text-stone-900 leading-snug">
                    "{pub.title}"
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-stone-500 flex-wrap">
                    <span className="font-medium text-stone-700">{pub.publisher}</span>
                    <span>·</span>
                    <span className="font-mono tabular-nums">{pub.year}</span>
                    <span>·</span>
                    <span className="text-stone-600">Category: {pub.topic}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Authored Alerts on GovIndiaNews */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-stone-700" />
                <span>Recent Gazette Alerts Authored & Verified</span>
              </span>
              <span className="text-stone-400 font-normal text-[11px]">Primary Source Verified</span>
            </div>
            <div className="space-y-2">
              {author.recentAuthoredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => {
                    if (onNavigateAlert) {
                      onClose();
                      onNavigateAlert(alert.id);
                    }
                  }}
                  className={`p-3 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-100 hover:border-stone-300 transition-colors flex items-center justify-between gap-3 ${
                    onNavigateAlert ? 'cursor-pointer' : ''
                  }`}
                >
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-stone-900 truncate">
                      {alert.title}
                    </h5>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                      <span>{alert.category}</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums">{alert.date}</span>
                      {alert.viewsCount && (
                        <>
                          <span>·</span>
                          <span className="font-mono text-stone-600">{alert.viewsCount} readers</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-700 shrink-0">
                    Read Alert →
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Transparency Drawer */}
          <div className="bg-stone-100 p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-stone-900 block">Direct Editorial Desk Contact</span>
              <span className="text-stone-600">For academic inquiries, corrections, or official press dispatches.</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-800 font-medium hover:bg-stone-50 transition-colors cursor-pointer text-xs"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-600" />}
                <span>{copiedEmail ? 'Email Copied' : 'Copy Email'}</span>
              </button>
              <a
                href={`mailto:${author.contactEmail}`}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors cursor-pointer text-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Dispatch</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>Certified under GovIndiaNews Editorial Integrity Charter</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-stone-700 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
