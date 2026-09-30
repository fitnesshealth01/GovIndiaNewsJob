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
    // Strip parenthetical text like "(23:00 Hrs IST)"
    const cleanDate = lastDateStr.replace(/\(.*?\)/g, '').trim();
    const targetDate = new Date(cleanDate);

    // If invalid date parsing
    if (isNaN(targetDate.getTime())) {
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

    const now = new Date();
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
        label: hours > 0 ? `Closes in ${hours}h!` : 'Closing Soon Today!',
        urgency: 'urgent',
      };
    } else if (days <= 2) {
      return {
        days,
        hours,
        isExpired: false,
        label: `${days}d ${hours}h left`,
        urgency: 'urgent',
      };
    } else if (days <= 7) {
      return {
        days,
        hours,
        isExpired: false,
        label: `${days} days left`,
        urgency: 'moderate',
      };
    } else {
      return {
        days,
        hours,
        isExpired: false,
        label: `${days} days left`,
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
