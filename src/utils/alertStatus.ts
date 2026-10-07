import { RecruitmentAlert } from '../data/gazetteData';

/**
 * Parses dates like "23 Oct 2026", "30 November 2026", "2026-10-23", etc.
 */
export function parseDateString(dateStr?: string): Date | null {
  if (!dateStr) return null;
  const clean = dateStr.replace(/\(.*?\)/g, '').trim();
  const d = new Date(clean);
  if (!isNaN(d.getTime())) {
    d.setHours(23, 59, 59, 999);
    return d;
  }
  const months: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  };
  const parts = clean.toLowerCase().split(/[\s-]+/);
  if (parts.length >= 3) {
    const day = parseInt(parts[0], 10);
    const monthKey = parts[1].substring(0, 3);
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && months[monthKey] !== undefined && !isNaN(year)) {
      return new Date(year, months[monthKey], day, 23, 59, 59);
    }
  }
  return null;
}

/**
 * Parses publish dates like "07 Oct 2026", "30 Sep 2026", "2026-10-07" into numeric timestamp
 * for reliable latest-to-oldest sorting.
 */
export function parsePublishDateToTimestamp(dateStr?: string): number {
  if (!dateStr) return 0;
  const clean = dateStr.replace(/\(.*?\)/g, '').trim();
  const parsed = Date.parse(clean);
  if (!isNaN(parsed)) return parsed;

  const months: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  };
  const parts = clean.toLowerCase().split(/[\s-]+/);
  if (parts.length >= 3) {
    const day = parseInt(parts[0], 10);
    const month = months[parts[1].slice(0, 3)] ?? 0;
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(year)) {
      return new Date(year, month, day).getTime();
    }
  }
  return 0;
}

/**
 * Auto-expiry check: an article whose lastDate or examDate has passed
 * relative to the current local date becomes expired.
 */
export function isAlertExpired(alert: RecruitmentAlert, referenceDate: Date = new Date('2026-10-03')): boolean {
  if (alert.status === 'expired') return true;

  if (alert.lastDate) {
    const lastD = parseDateString(alert.lastDate);
    if (lastD && lastD.getTime() < referenceDate.getTime()) {
      return true;
    }
  }

  if (alert.category === 'admit-card' && alert.examDate) {
    const dates = alert.examDate.split(/to|-/);
    const endStr = dates[dates.length - 1]?.trim();
    const endD = parseDateString(endStr);
    if (endD && endD.getTime() < referenceDate.getTime()) {
      return true;
    }
  }

  return false;
}

/**
 * Returns effective status:
 * - 'expired' if the deadline/exam date has passed
 * - otherwise the set status ('verified' or 'unverified')
 */
export function getEffectiveStatus(alert: RecruitmentAlert, referenceDate: Date = new Date('2026-10-03')): 'verified' | 'unverified' | 'expired' {
  if (isAlertExpired(alert, referenceDate)) {
    return 'expired';
  }
  return alert.status;
}

/**
 * Active alert predicate: an alert that has not expired.
 * Both 'verified' and 'unverified' active alerts can be discovered in listings,
 * with honest status pills indicating whether verification is complete or in progress.
 */
export function isAlertActive(alert: RecruitmentAlert, referenceDate: Date = new Date('2026-10-03')): boolean {
  return !isAlertExpired(alert, referenceDate);
}

/**
 * Predicate for alerts that are confirmed verified and non-expired.
 */
export function isAlertActiveAndVerified(alert: RecruitmentAlert, referenceDate: Date = new Date('2026-10-03')): boolean {
  return alert.status === 'verified' && !isAlertExpired(alert, referenceDate);
}

