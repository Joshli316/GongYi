import { t } from '../i18n';
import { renderDisclaimerBanner } from '../app';
import { getTimelineSetup, saveTimelineSetup, type TimelineSetup } from '../utils/storage';
import { daysBetween, addDays, formatDate, today, flashInvalid } from '../utils/dates';
import { OPT_APPLICATION_BEFORE_PROGRAM_END, OPT_APPLICATION_AFTER_PROGRAM_END, STEM_EXTENSION_BEFORE_OPT_END, GRACE_PERIOD_DAYS, VALIDATION_REPORT_MONTHS, I983_EVAL_12_MONTHS, I983_EVAL_24_MONTHS, CAP_GAP_MONTH, CAP_GAP_DAY, DEADLINE_WARN_DAYS, DEADLINE_CRITICAL_DAYS } from '../data/rules';

interface TimelineEvent {
  label: string;
  date: Date;
  type: 'past' | 'upcoming' | 'future';
}

function calcEvents(setup: TimelineSetup): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const now = today();

  const programEnd = new Date(setup.programEnd + 'T00:00:00');
  const optStart = new Date(setup.optStart + 'T00:00:00');

  // OPT application window
  const optWindowStart = addDays(programEnd, -OPT_APPLICATION_BEFORE_PROGRAM_END);
  const optWindowEnd = addDays(programEnd, OPT_APPLICATION_AFTER_PROGRAM_END);
  events.push({ label: t('timeline.optWindow') + ' ' + t('unemployment.startDate'), date: optWindowStart, type: getType(optWindowStart, now) });
  events.push({ label: t('timeline.optWindow') + ' ' + t('unemployment.endDate'), date: optWindowEnd, type: getType(optWindowEnd, now) });

  // Guess OPT end based on type
  let optEnd: Date;
  if (setup.optType === 'stem' && setup.stemStart) {
    const stemStart = new Date(setup.stemStart + 'T00:00:00');
    optEnd = addDays(stemStart, 730); // ~24 months
    events.push({ label: t('timeline.stemWindow') + ' (start)', date: addDays(new Date(setup.optStart + 'T00:00:00'), 365 - STEM_EXTENSION_BEFORE_OPT_END), type: getType(addDays(new Date(setup.optStart + 'T00:00:00'), 365 - STEM_EXTENSION_BEFORE_OPT_END), now) });

    // Validation reports every 6 months from STEM start
    for (let m = VALIDATION_REPORT_MONTHS; m <= I983_EVAL_24_MONTHS; m += VALIDATION_REPORT_MONTHS) {
      const valDate = addDays(stemStart, m * 30.44);
      events.push({ label: t('timeline.validation') + ` #${m / VALIDATION_REPORT_MONTHS}`, date: valDate, type: getType(valDate, now) });
    }

    // I-983 evaluations
    const eval12 = addDays(stemStart, I983_EVAL_12_MONTHS * 30.44);
    const eval24 = addDays(stemStart, I983_EVAL_24_MONTHS * 30.44);
    events.push({ label: t('timeline.eval12'), date: eval12, type: getType(eval12, now) });
    events.push({ label: t('timeline.eval24'), date: eval24, type: getType(eval24, now) });
  } else {
    optEnd = addDays(optStart, 365);
  }

  // OPT period
  events.push({ label: t('timeline.optPeriod') + ' (start)', date: optStart, type: getType(optStart, now) });
  events.push({ label: t('timeline.optPeriod') + ' (end)', date: optEnd, type: getType(optEnd, now) });

  // Grace period
  const graceEnd = addDays(optEnd, GRACE_PERIOD_DAYS);
  events.push({ label: t('timeline.gracePeriod'), date: graceEnd, type: getType(graceEnd, now) });

  // Cap-gap
  if (setup.h1bFiled && setup.h1bDate) {
    const fyYear = optEnd.getMonth() >= 9 ? optEnd.getFullYear() + 2 : optEnd.getFullYear() + 1;
    const capGapEnd = new Date(fyYear, CAP_GAP_MONTH, CAP_GAP_DAY);
    events.push({ label: t('timeline.capGap'), date: capGapEnd, type: getType(capGapEnd, now) });
  }

  // Sort by date
  events.sort((a, b) => a.date.getTime() - b.date.getTime());
  return events;
}

function getType(date: Date, now: Date): 'past' | 'upcoming' | 'future' {
  const diff = daysBetween(now, date);
  if (diff < 0) return 'past';
  if (diff <= DEADLINE_WARN_DAYS) return 'upcoming';
  return 'future';
}

export function renderTimeline(container: HTMLElement): void {
  const setup = getTimelineSetup();

  container.innerHTML = `
    <a href="#dashboard" style="font-size:var(--text-label);color:var(--color-primary);text-decoration:none;display:inline-flex;align-items:center;gap:4px;margin-bottom:16px;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      ${t('common.back')}
    </a>
    <h1 style="font-size:var(--text-page-title);font-weight:700;margin-bottom:24px;">${t('timeline.title')}</h1>

    <div class="card" style="margin-bottom:24px;">
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label for="tl-program-end" style="font-size:var(--text-label);color:var(--color-text-secondary);display:block;margin-bottom:4px;">${t('timeline.programEnd')}</label>
            <input type="date" id="tl-program-end" class="form-input" value="${setup?.programEnd || ''}">
          </div>
          <div>
            <label for="tl-opt-start" style="font-size:var(--text-label);color:var(--color-text-secondary);display:block;margin-bottom:4px;">${t('timeline.optStart')}</label>
            <input type="date" id="tl-opt-start" class="form-input" value="${setup?.optStart || ''}">
          </div>
        </div>
        <div>
          <label for="tl-opt-type" style="font-size:var(--text-label);color:var(--color-text-secondary);display:block;margin-bottom:4px;">${t('timeline.optType')}</label>
          <select id="tl-opt-type" class="form-input">
            <option value="standard" ${setup?.optType !== 'stem' ? 'selected' : ''}>${t('unemployment.standard')}</option>
            <option value="stem" ${setup?.optType === 'stem' ? 'selected' : ''}>${t('unemployment.stem')}</option>
          </select>
        </div>
        <div id="tl-stem-fields" style="display:${setup?.optType === 'stem' ? 'block' : 'none'};">
          <label for="tl-stem-start" style="font-size:var(--text-label);color:var(--color-text-secondary);display:block;margin-bottom:4px;">${t('timeline.stemStart')}</label>
          <input type="date" id="tl-stem-start" class="form-input" value="${setup?.stemStart || ''}">
        </div>
        <div>
          <label style="display:flex;align-items:center;gap:8px;font-size:var(--text-label);color:var(--color-text-secondary);">
            <input type="checkbox" id="tl-h1b" ${setup?.h1bFiled ? 'checked' : ''}>
            ${t('timeline.h1bFiled')}
          </label>
        </div>
        <div id="tl-h1b-date-wrap" style="display:${setup?.h1bFiled ? 'block' : 'none'};">
          <label for="tl-h1b-date" style="font-size:var(--text-label);color:var(--color-text-secondary);display:block;margin-bottom:4px;">${t('timeline.h1bDate')}</label>
          <input type="date" id="tl-h1b-date" class="form-input" value="${setup?.h1bDate || ''}">
        </div>
        <button id="tl-calc" class="btn-primary" style="align-self:flex-start;">${t('timeline.calculate')}</button>
      </div>
    </div>

    <div id="tl-result"></div>
    <div id="tl-disclaimer"></div>
  `;

  // Show/hide STEM fields
  const optTypeSelect = document.getElementById('tl-opt-type') as HTMLSelectElement;
  optTypeSelect.addEventListener('change', () => {
    document.getElementById('tl-stem-fields')!.style.display = optTypeSelect.value === 'stem' ? 'block' : 'none';
  });

  // Show/hide H-1B date
  const h1bCheckbox = document.getElementById('tl-h1b') as HTMLInputElement;
  h1bCheckbox.addEventListener('change', () => {
    document.getElementById('tl-h1b-date-wrap')!.style.display = h1bCheckbox.checked ? 'block' : 'none';
  });

  // Calculate
  document.getElementById('tl-calc')!.addEventListener('click', () => {
    const programEndEl = document.getElementById('tl-program-end') as HTMLInputElement;
    const optStartEl = document.getElementById('tl-opt-start') as HTMLInputElement;
    if (!flashInvalid(programEndEl, optStartEl)) return;
    const programEnd = programEndEl.value;
    const optStart = optStartEl.value;

    const newSetup: TimelineSetup = {
      programEnd,
      optStart,
      optType: optTypeSelect.value as 'standard' | 'stem',
      stemStart: optTypeSelect.value === 'stem' ? (document.getElementById('tl-stem-start') as HTMLInputElement).value || null : null,
      h1bFiled: h1bCheckbox.checked,
      h1bDate: h1bCheckbox.checked ? (document.getElementById('tl-h1b-date') as HTMLInputElement).value || null : null,
    };

    saveTimelineSetup(newSetup);
    renderTimelineEvents(newSetup);
  });

  if (setup) {
    renderTimelineEvents(setup);
  }

  renderDisclaimerBanner(document.getElementById('tl-disclaimer')!);
}

function renderTimelineEvents(setup: TimelineSetup): void {
  const resultDiv = document.getElementById('tl-result')!;
  const events = calcEvents(setup);
  const now = today();

  const eventsHtml = events.map(e => {
    const diff = daysBetween(now, e.date);
    const diffText = diff === 0 ? t('timeline.today') : diff > 0 ? `${diff} ${t('timeline.daysAway')}` : `${Math.abs(diff)} ${t('timeline.daysAgo')}`;
    const color = e.type === 'past' ? 'var(--color-text-tertiary)' : e.type === 'upcoming' ? 'var(--color-status-warn)' : 'var(--color-primary)';
    const dotColor = e.type === 'past' ? 'var(--color-border-strong)' : e.type === 'upcoming' ? 'var(--color-status-warn)' : 'var(--color-primary)';
    const isUrgent = e.type === 'upcoming' && diff <= DEADLINE_CRITICAL_DAYS && diff >= 0;

    return `
      <div style="display:flex;gap:16px;padding:12px 0;${isUrgent ? 'background:var(--color-status-critical-bg);margin:-4px -12px;padding:8px 12px;border-radius:var(--radius-card);' : ''}">
        <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;">
          <div style="width:12px;height:12px;border-radius:50%;background:${dotColor};border:2px solid var(--color-surface);box-shadow:0 0 0 2px ${dotColor};"></div>
          <div style="width:2px;flex:1;background:var(--color-border);margin-top:4px;"></div>
        </div>
        <div style="flex:1;padding-bottom:8px;">
          <div style="font-weight:600;font-size:0.875rem;color:${color};">${e.label}</div>
          <div style="font-family:var(--font-mono);font-size:var(--text-mono);color:var(--color-text-secondary);" class="tabular-nums">${formatDate(e.date)}</div>
          <div style="font-size:0.75rem;color:${e.type === 'upcoming' ? 'var(--color-status-warn)' : 'var(--color-text-tertiary)'};">${diffText}</div>
        </div>
      </div>
    `;
  }).join('');

  resultDiv.innerHTML = `
    <div class="card">
      <h2 style="font-size:var(--text-section);font-weight:600;margin-bottom:16px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        ${t('timeline.title')}
      </h2>
      ${eventsHtml}
    </div>
  `;
}
