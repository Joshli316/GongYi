export interface OPTSetup {
  optType: 'standard' | 'stem';
  eadStart: string;
  eadEnd: string;
}

export interface EmploymentPeriod {
  id: string;
  employer: string;
  startDate: string;
  endDate: string | null; // null = current
  hoursPerWeek: number;
  relatedToField: boolean;
}

export interface TimelineSetup {
  programEnd: string;
  optStart: string;
  optType: 'standard' | 'stem';
  stemStart: string | null;
  h1bFiled: boolean;
  h1bDate: string | null;
}

export interface ReportingState {
  checkedItems: string[];
  stemStartDate: string | null;
  optType: 'standard' | 'stem';
}

const PREFIX = 'gongyi-';

function getItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setItem<T>(key: string, value: T): void {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

function removeItem(key: string): void {
  localStorage.removeItem(PREFIX + key);
}

// OPT Setup
export function getOPTSetup(): OPTSetup | null {
  return getItem<OPTSetup>('opt-setup');
}

export function saveOPTSetup(setup: OPTSetup): void {
  setItem('opt-setup', setup);
}

// Employment Periods
export function getEmploymentPeriods(): EmploymentPeriod[] {
  return getItem<EmploymentPeriod[]>('employment') || [];
}

export function saveEmploymentPeriods(periods: EmploymentPeriod[]): void {
  setItem('employment', periods);
}

export function addEmploymentPeriod(period: EmploymentPeriod): void {
  const periods = getEmploymentPeriods();
  periods.push(period);
  saveEmploymentPeriods(periods);
}

export function removeEmploymentPeriod(id: string): void {
  const periods = getEmploymentPeriods().filter(p => p.id !== id);
  saveEmploymentPeriods(periods);
}

export function updateEmploymentPeriod(updated: EmploymentPeriod): void {
  const periods = getEmploymentPeriods().map(p => p.id === updated.id ? updated : p);
  saveEmploymentPeriods(periods);
}

// Timeline Setup
export function getTimelineSetup(): TimelineSetup | null {
  return getItem<TimelineSetup>('timeline-setup');
}

export function saveTimelineSetup(setup: TimelineSetup): void {
  setItem('timeline-setup', setup);
}

// Reporting State
export function getReportingState(): ReportingState {
  return getItem<ReportingState>('reporting') || { checkedItems: [], stemStartDate: null, optType: 'standard' };
}

export function saveReportingState(state: ReportingState): void {
  setItem('reporting', state);
}

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Clear all data
export function clearAllData(): void {
  const keys = ['opt-setup', 'employment', 'timeline-setup', 'reporting'];
  keys.forEach(k => removeItem(k));
}
