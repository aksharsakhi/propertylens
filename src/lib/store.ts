import { PropertyReport } from '../types';

const STORAGE_KEY_REPORTS = 'propertylens_saved_reports';

/**
 * Saves generated report into local storage cache
 */
export function saveReportToStore(report: PropertyReport): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getSavedReportsFromStore();
    const updated = [report, ...existing.filter(r => r.id !== report.id)].slice(0, 20);
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save report to local storage:', err);
  }
}

/**
 * Retrieves all saved property reports
 */
export function getSavedReportsFromStore(): PropertyReport[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REPORTS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

/**
 * Retrieves a single report by ID
 */
export function getReportByIdFromStore(id: string): PropertyReport | null {
  const reports = getSavedReportsFromStore();
  return reports.find(r => r.id === id) || null;
}

/**
 * Encodes report payload into URL-safe base64 string for zero-backend public link sharing
 */
export function encodeReportPayload(report: PropertyReport): string {
  try {
    const jsonStr = JSON.stringify(report);
    return btoa(encodeURIComponent(jsonStr));
  } catch (err) {
    return '';
  }
}

/**
 * Decodes URL-safe base64 string back into PropertyReport object
 */
export function decodeReportPayload(encoded: string): PropertyReport | null {
  try {
    const jsonStr = decodeURIComponent(atob(encoded));
    return JSON.parse(jsonStr);
  } catch (err) {
    return null;
  }
}
