/**
 * Candidate Bookmarking & Deadlines Utility
 * Provides localStorage persistence with fallback and real-time countdown analysis.
 */

const STORAGE_KEY = 'govindianews_bookmarked_alerts';

export function getBookmarks(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load bookmarks', e);
    return [];
  }
}

export function isBookmarked(id: string): boolean {
  const list = getBookmarks();
  return list.includes(id);
}

export function toggleBookmark(id: string): { bookmarked: boolean; all: string[] } {
  if (typeof window === 'undefined') return { bookmarked: false, all: [] };
  try {
    const current = getBookmarks();
    let updated: string[];
    let bookmarked: boolean;

    if (current.includes(id)) {
      updated = current.filter((item) => item !== id);
      bookmarked = false;
    } else {
      updated = [id, ...current];
      bookmarked = true;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('govindianews_bookmarks_changed', { detail: updated }));
    return { bookmarked, all: updated };
  } catch (e) {
    console.error('Failed to save bookmark', e);
    return { bookmarked: false, all: [] };
  }
}

export function clearAllBookmarks(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('govindianews_bookmarks_changed', { detail: [] }));
    return [];
  } catch (e) {
    return [];
  }
}

export interface CountdownInfo {
  days: number;
  hours: number;
  isExpired: boolean;
  label: string;
  urgency: 'urgent' | 'moderate' | 'plenty' | 'expired' | 'unknown';
}

/**
 * Parses Indian government date formats like "28 Oct 2026", "14-10-2026", "15/12/2026"
 */
function parseIndianDate(rawStr: string): Date | null {
  if (!rawStr) return null;
  const clean = rawStr.replace(/\(.*?\)/g, '').trim();

  // Try standard parsing first
  let parsed = new Date(clean);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }

  // Handle DD-MM-YYYY or DD/MM/YYYY
  const parts = clean.split(/[-/]/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      parsed = new Date(year, month, day, 23, 59, 59);
      if (!isNaN(parsed.getTime())) return parsed;
    }
  }

  // Handle "DD MonthName YYYY" with month names
  const monthMap: Record<string, number> = {
    jan: 0, january: 0,
    feb: 1, february: 1,
    mar: 2, march: 2,
    apr: 3, april: 3,
    may: 4,
    jun: 5, june: 5,
    jul: 6, july: 6,
    aug: 7, august: 7,
    sep: 8, sept: 8, september: 8,
    oct: 9, october: 9,
    nov: 10, november: 10,
    dec: 11, december: 11
  };

  const words = clean.toLowerCase().split(/\s+/);
  if (words.length >= 3) {
    const day = parseInt(words[0], 10);
    const monthStr = words[1].replace(/[^a-z]/g, '');
    const year = parseInt(words[2], 10);
    if (!isNaN(day) && monthMap[monthStr] !== undefined && !isNaN(year)) {
      return new Date(year, monthMap[monthStr], day, 23, 59, 59);
    }
  }

  return null;
}

/**
 * Calculates remaining time until application deadline
 */
export function calculateDeadlineCountdown(lastDateStr?: string): CountdownInfo {
  if (!lastDateStr || lastDateStr.toLowerCase().includes('expected') || lastDateStr.toLowerCase().includes('tba')) {
    return {
      days: 0,
      hours: 0,
      isExpired: false,
      label: lastDateStr || 'Announced Soon',
      urgency: 'unknown',
    };
  }

  try {
    const targetDate = parseIndianDate(lastDateStr);

    // If invalid date parsing
    if (!targetDate || isNaN(targetDate.getTime())) {
      return {
        days: 0,
        hours: 0,
        isExpired: false,
        label: lastDateStr,
        urgency: 'unknown',
      };
    }

    // Set end of day if no specific hour was parsed
    if (targetDate.getHours() === 0 && targetDate.getMinutes() === 0) {
      targetDate.setHours(23, 59, 59, 999);
    }

    // Current reference time: default to now; if current year < 2026, anchor to 30 Sep 2026
    let now = new Date();
    if (now.getFullYear() < 2026) {
      now = new Date('2026-09-30T09:00:00');
    }

    const diffMs = targetDate.getTime() - now.getTime();

    if (diffMs <= 0) {
      return {
        days: 0,
        hours: 0,
        isExpired: true,
        label: 'Window Closed',
        urgency: 'expired',
      };
    }

    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    if (days === 0) {
      return {
        days: 0,
        hours,
        isExpired: false,
        label: hours > 0 ? `Closes in ${hours}h!` : 'Ends Today!',
        urgency: 'urgent',
      };
    } else if (days <= 3) {
      return {
        days,
        hours,
        isExpired: false,
        label: `${days} Days Left · Apply Fast!`,
        urgency: 'urgent',
      };
    } else if (days <= 10) {
      return {
        days,
        hours,
        isExpired: false,
        label: `${days} Days Left · Closing Soon`,
        urgency: 'moderate',
      };
    } else {
      return {
        days,
        hours,
        isExpired: false,
        label: `${days} Days Left`,
        urgency: 'plenty',
      };
    }
  } catch {
    return {
      days: 0,
      hours: 0,
      isExpired: false,
      label: lastDateStr,
      urgency: 'unknown',
    };
  }
}
