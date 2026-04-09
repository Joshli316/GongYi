import { daysBetween, today } from './dates';
import { getOPTSetup, getEmploymentPeriods, type OPTSetup, type EmploymentPeriod } from './storage';
import { UNEMPLOYMENT_LIMIT_STANDARD, UNEMPLOYMENT_LIMIT_STEM, MIN_WORK_HOURS, THRESHOLD_SAFE, THRESHOLD_WARN } from '../data/rules';

export interface UnemploymentResult {
  used: number;
  limit: number;
  remaining: number;
}

export function calculateUnemployment(setup: OPTSetup, periods: EmploymentPeriod[]): UnemploymentResult {
  const eadStart = new Date(setup.eadStart + 'T00:00:00');
  const eadEnd = new Date(setup.eadEnd + 'T00:00:00');
  const now = today();
  const effectiveEnd = now < eadEnd ? now : eadEnd;
  const limit = setup.optType === 'stem' ? UNEMPLOYMENT_LIMIT_STEM : UNEMPLOYMENT_LIMIT_STANDARD;

  if (now < eadStart) {
    return { used: 0, limit, remaining: limit };
  }

  const totalDays = daysBetween(eadStart, effectiveEnd);

  // Filter to qualifying periods, clamp to EAD window
  const qualifying = periods
    .filter(p => p.hoursPerWeek >= MIN_WORK_HOURS && p.relatedToField)
    .map(p => ({
      start: new Date(p.startDate + 'T00:00:00'),
      end: p.endDate ? new Date(p.endDate + 'T00:00:00') : now,
    }))
    .map(p => ({
      start: p.start < eadStart ? eadStart : p.start,
      end: p.end > effectiveEnd ? effectiveEnd : p.end,
    }))
    .filter(p => p.start <= p.end)
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  // Merge overlapping ranges
  const merged: { start: Date; end: Date }[] = [];
  for (const p of qualifying) {
    if (merged.length > 0 && p.start <= merged[merged.length - 1].end) {
      const last = merged[merged.length - 1];
      if (p.end > last.end) last.end = p.end;
    } else {
      merged.push({ start: new Date(p.start), end: new Date(p.end) });
    }
  }

  let employedDays = 0;
  for (const m of merged) {
    employedDays += daysBetween(m.start, m.end);
  }

  const used = Math.max(0, totalDays - employedDays);
  const remaining = Math.max(0, limit - used);

  return { used, limit, remaining };
}

export function calculateFromStorage(): UnemploymentResult | null {
  const setup = getOPTSetup();
  if (!setup) return null;
  const now = today();
  const eadStart = new Date(setup.eadStart + 'T00:00:00');
  if (now < eadStart) return null;
  return calculateUnemployment(setup, getEmploymentPeriods());
}

export function getStatusClass(used: number, limit: number): string {
  const ratio = used / limit;
  if (ratio <= THRESHOLD_SAFE) return 'safe';
  if (ratio <= THRESHOLD_WARN) return 'warn';
  return 'critical';
}

export function renderProgressRing(used: number, limit: number, size: number = 80): string {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.min(used / limit, 1);
  const offset = circumference * (1 - ratio);
  const status = getStatusClass(used, limit);
  const color = status === 'safe' ? 'var(--color-status-safe)' : status === 'warn' ? 'var(--color-status-warn)' : 'var(--color-status-critical)';

  const remaining = Math.max(0, limit - used);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform:rotate(-90deg)" role="img" aria-label="${used} of ${limit} unemployment days used, ${remaining} remaining">
    <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="none" stroke="var(--color-border)" stroke-width="${size > 100 ? 8 : 6}"/>
    <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="none" stroke="${color}" stroke-width="${size > 100 ? 8 : 6}" stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" style="transition:stroke-dashoffset 500ms ease-out"/>
  </svg>`;
}
