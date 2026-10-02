import React from 'react';
import { Send, Bell, Smartphone, ExternalLink } from 'lucide-react';

export const SocialAlertBanner: React.FC<{ category?: string }> = ({ category = 'recruitment' }) => {
  return (
    <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 text-white border border-emerald-800/80 shadow-md space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-2xs shrink-0">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div className="space-y-0.5">
            <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
              <span>Instant Gazette Alerts on WhatsApp & Telegram</span>
              <span className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                LIVE
              </span>
            </h3>
            <p className="text-[11px] text-emerald-200/90 leading-snug">
              Get immediate alerts when exam city slips, revised shift timetables, admit card links, and answer keys are uploaded by the commission.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://whatsapp.com/channel"
            target="_blank"
            rel="noreferrer"
            className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Join WhatsApp</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>

          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Join Telegram</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>
        </div>
      </div>
      <div className="flex items-center gap-4 text-[10px] text-slate-300 pt-1 border-t border-white/10">
        <span>✓ 100% Free Government Job Updates</span>
        <span>✓ Zero Spam / No Marketing Messages</span>
        <span>✓ Direct Regional Server Mirror Links</span>
      </div>
    </div>
  );
};
