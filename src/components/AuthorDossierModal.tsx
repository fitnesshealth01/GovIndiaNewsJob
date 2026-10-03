import React, { useEffect } from 'react';
import { X, Mail, Copy, Check } from 'lucide-react';
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
        className="relative w-full max-w-xl flex flex-col bg-white rounded-2xl border border-stone-200 shadow-2xl overflow-hidden text-stone-900"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl ${author.avatarBg} text-white flex items-center justify-center text-lg font-serif font-bold shadow-xs border ${author.avatarBorder}`}
            >
              {author.initials}
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                {author.name}
              </h3>
              <p className="text-xs text-stone-600 font-medium">
                {author.designation}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs text-stone-700">
          <div>
            <span className="font-semibold text-stone-900 block mb-1">Beat / Focus:</span>
            <p className="text-stone-600">{author.beat}</p>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
            <span className="font-semibold text-stone-900 block mb-1">Biography:</span>
            <p className="font-mono text-stone-600">{author.biography}</p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-stone-500" />
              <span className="font-medium text-stone-800">{author.contactEmail}</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
