import React from 'react';
import { UserCheck, Mail, ExternalLink } from 'lucide-react';
import { EDITORIAL_AUTHORS } from '../data/authorData';

interface AuthorsSectionProps {
  selectedAuthorId?: string;
  onNavigate?: (path: string) => void;
}

export const AuthorsSection: React.FC<AuthorsSectionProps> = ({ onNavigate }) => {
  const author = EDITORIAL_AUTHORS[0];

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
              Editorial Desk & Leadership
            </h2>
            <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
              <span>GovIndiaNews</span>
              <span>·</span>
              <span>Founder & Editor</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed font-sans max-w-3xl">
          GovIndiaNews is an independent informational portal dedicated to reporting public government recruitment notifications, examination schedules, and educational utilities. All coverage is verified directly against official government gazettes and recruitment boards.
        </p>
      </div>

      {/* Author Profile Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div
            className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl ${author.avatarBg} text-white flex items-center justify-center text-2xl sm:text-3xl font-serif font-bold shadow-md shrink-0 border-2 ${author.avatarBorder}`}
          >
            {author.initials}
          </div>

          <div className="space-y-2 flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 tracking-tight">
              {author.name}
            </h3>

            <div className="text-xs font-semibold text-stone-700">
              {author.designation}
            </div>

            <div className="text-xs text-stone-500">
              <span>Beat: {author.beat}</span>
            </div>

            <div className="pt-2 text-xs text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200">
              <p className="font-mono text-stone-600 mb-2">{author.biography}</p>
              <div className="flex flex-wrap gap-4 pt-1">
                <a
                  href={`mailto:${author.contactEmail}`}
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:underline font-semibold"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{author.contactEmail}</span>
                </a>
                {author.links.website && (
                  <button
                    onClick={() => onNavigate?.('/about')}
                    className="inline-flex items-center gap-1 text-slate-700 hover:underline font-medium cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>About Page</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
