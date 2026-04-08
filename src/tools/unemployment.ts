import { t } from '../i18n';
import { renderDisclaimerBanner } from '../app';
import { getOPTSetup, saveOPTSetup, getEmploymentPeriods, saveEmploymentPeriods, generateId, type OPTSetup, type EmploymentPeriod } from '../utils/storage';
import { escapeHtml, flashInvalid } from '../utils/dates';
import { MIN_WORK_HOURS } from '../data/rules';
import { calculateUnemployment, getStatusClass, renderProgressRing } from '../utils/unemployment-calc';

export function renderUnemployment(container: HTMLElement): void {
  const setup = getOPTSetup();
  const periods = getEmploymentPeriods();

  container.innerHTML = `
    <a href="#dashboard" style="font-size:var(--text-label);color:var(--color-primary);text-decoration:none;display:inline-flex;align-items:center;gap:4px;margin-bottom:16px;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      ${t('common.back')}
    </a>
    <h1 style="font-size:var(--text-page-title);font-weight:700;margin-bottom:24px;">${t('unemployment.title')}</h1>
    <div id="unemp-display"></div>
    <div id="unemp-setup" class="card" style="margin-bottom:24px;"></div>
    <div id="unemp-periods" style="margin-bottom:24px;"></div>
    <div id="unemp-rules" style="margin-bottom:24px;"></div>
    <div id="unemp-disclaimer"></div>
  `;

  renderSetupForm(setup);
  renderEmploymentList(periods);
  renderDisplay(setup, periods);
  renderRules();
  renderDisclaimerBanner(document.getElementById('unemp-disclaimer')!);
}

function renderDisplay(setup: OPTSetup | null, periods: EmploymentPeriod[]): void {
  const el = document.getElementById('unemp-display')!;
  if (!setup) {
    el.innerHTML = '';
    return;
  }

  const result = calculateUnemployment(setup, periods);
  const status = getStatusClass(result.used, result.limit);

  let bannerHtml = '';
  if (result.remaining <= 0) {
    bannerHtml = `<div role="alert" style="background:var(--color-status-critical-bg);border:1px solid var(--color-status-critical);border-radius:var(--radius-card);padding:12px 16px;margin-bottom:16px;color:var(--color-status-critical);font-weight:600;">${t('unemployment.criticalBanner')}</div>`;
  } else if (result.remaining <= 15) {
    bannerHtml = `<div role="alert" style="background:var(--color-status-warn-bg);border:1px solid var(--color-status-warn);border-radius:var(--radius-card);padding:12px 16px;margin-bottom:16px;color:var(--color-status-warn);font-weight:600;">${t('unemployment.warningBanner')}</div>`;
  }

  el.innerHTML = `
    ${bannerHtml}
    <div class="card" style="margin-bottom:24px;display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
      <div style="flex-shrink:0;position:relative;">
        ${renderProgressRing(result.used, result.limit, 120)}
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(0deg);text-align:center;">
          <div style="font-size:var(--text-status-num);font-weight:700;color:var(--color-status-${status});" class="tabular-nums">${result.remaining}</div>
        </div>
      </div>
      <div>
        <div style="font-size:var(--text-countdown);font-weight:700;color:var(--color-status-${status});" class="tabular-nums">${result.remaining}</div>
        <div style="font-size:var(--text-body);color:var(--color-text-secondary);">${t('unemployment.daysRemaining')}</div>
        <div style="margin-top:8px;font-family:var(--font-mono);font-size:var(--text-mono);color:var(--color-text-tertiary);" class="tabular-nums">
          ${result.used} ${t('unemployment.daysUsed')} &middot; ${result.limit} ${t('unemployment.limit')}
        </div>
        <div style="margin-top:4px;">
          <span class="status-pill status-pill-${status}">${t('status.' + status)}</span>
        </div>
      </div>
    </div>
  `;
}

function renderSetupForm(setup: OPTSetup | null): void {
  const el = document.getElementById('unemp-setup')!;
  el.innerHTML = `
    <h2 style="font-size:var(--text-section);font-weight:600;margin-bottom:16px;">${t('unemployment.optType')}</h2>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div>
        <label for="opt-type" style="font-size:var(--text-label);color:var(--color-text-secondary);display:block;margin-bottom:4px;">${t('unemployment.optType')}</label>
        <select id="opt-type" class="form-input">
          <option value="standard" ${setup?.optType !== 'stem' ? 'selected' : ''}>${t('unemployment.standard')}</option>
          <option value="stem" ${setup?.optType === 'stem' ? 'selected' : ''}>${t('unemployment.stem')}</option>
        </select>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label for="ead-start" style="font-size:var(--text-label);color:var(--color-text-secondary);display:block;margin-bottom:4px;">${t('unemployment.eadStart')}</label>
          <input type="date" id="ead-start" class="form-input" value="${setup?.eadStart || ''}">
        </div>
        <div>
          <label for="ead-end" style="font-size:var(--text-label);color:var(--color-text-secondary);display:block;margin-bottom:4px;">${t('unemployment.eadEnd')}</label>
          <input type="date" id="ead-end" class="form-input" value="${setup?.eadEnd || ''}">
        </div>
      </div>
      <button id="save-setup" class="btn-primary" style="align-self:flex-start;">${t('unemployment.saveSetup')}</button>
    </div>
  `;

  document.getElementById('save-setup')!.addEventListener('click', () => {
    const eadStartEl = document.getElementById('ead-start') as HTMLInputElement;
    const eadEndEl = document.getElementById('ead-end') as HTMLInputElement;
    if (!flashInvalid(eadStartEl, eadEndEl)) return;
    const optType = (document.getElementById('opt-type') as HTMLSelectElement).value as 'standard' | 'stem';
    const newSetup: OPTSetup = { optType, eadStart: eadStartEl.value, eadEnd: eadEndEl.value };
    saveOPTSetup(newSetup);
    renderDisplay(newSetup, getEmploymentPeriods());
  });
}

function renderEmploymentList(periods: EmploymentPeriod[]): void {
  const el = document.getElementById('unemp-periods')!;

  const periodsHtml = periods.map(p => {
    const isQualifying = p.hoursPerWeek >= MIN_WORK_HOURS && p.relatedToField;
    return `
      <div class="card status-border-${isQualifying ? 'safe' : 'warn'}" style="margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <div style="font-weight:600;">${escapeHtml(p.employer)}</div>
            <div style="font-size:var(--text-label);color:var(--color-text-secondary);">
              ${p.startDate} — ${p.endDate || t('common.current')} &middot; ${p.hoursPerWeek} hrs/wk
            </div>
            <span class="status-pill ${isQualifying ? 'status-pill-safe' : 'status-pill-warn'}" style="margin-top:4px;">
              ${isQualifying ? t('unemployment.qualifying') : t('unemployment.nonQualifying')}
            </span>
            ${!isQualifying ? `<div style="font-size:0.75rem;color:var(--color-status-warn);margin-top:4px;">${p.hoursPerWeek < MIN_WORK_HOURS ? t('unemployment.nonQualifyingReason') : ''}</div>` : ''}
          </div>
          <button class="delete-period" data-id="${p.id}" style="background:none;border:none;color:var(--color-text-tertiary);cursor:pointer;padding:4px;" aria-label="${t('common.delete')}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  el.innerHTML = `
    <h2 style="font-size:var(--text-section);font-weight:600;margin-bottom:12px;">${t('unemployment.employment')}</h2>
    ${periodsHtml}
    <div id="add-form" class="card" style="margin-top:12px;">
      <h3 style="font-size:var(--text-label);font-weight:600;margin-bottom:12px;">${t('unemployment.addEmployment')}</h3>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <input type="text" id="new-employer" class="form-input" placeholder="${t('unemployment.employer')}">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div>
            <label style="font-size:0.75rem;color:var(--color-text-tertiary);">${t('unemployment.startDate')}</label>
            <input type="date" id="new-start" class="form-input">
          </div>
          <div>
            <label style="font-size:0.75rem;color:var(--color-text-tertiary);">${t('unemployment.endDate')}</label>
            <input type="date" id="new-end" class="form-input">
          </div>
        </div>
        <label style="font-size:var(--text-label);display:flex;align-items:center;gap:8px;">
          <input type="checkbox" id="new-current"> ${t('unemployment.currentJob')}
        </label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div>
            <label style="font-size:0.75rem;color:var(--color-text-tertiary);">${t('unemployment.hoursPerWeek')}</label>
            <input type="number" id="new-hours" class="form-input" min="1" max="80" value="40">
          </div>
          <div>
            <label style="font-size:0.75rem;color:var(--color-text-tertiary);">${t('unemployment.relatedToField')}</label>
            <select id="new-related" class="form-input">
              <option value="yes">${t('common.yes')}</option>
              <option value="no">${t('common.no')}</option>
            </select>
          </div>
        </div>
        <button id="add-period" class="btn-primary" style="align-self:flex-start;">${t('common.add')}</button>
      </div>
    </div>
  `;

  // Toggle end date disabled when "current" is checked
  const currentCheckbox = document.getElementById('new-current') as HTMLInputElement;
  const endInput = document.getElementById('new-end') as HTMLInputElement;
  currentCheckbox.addEventListener('change', () => {
    endInput.disabled = currentCheckbox.checked;
    if (currentCheckbox.checked) endInput.value = '';
  });

  // Add period
  document.getElementById('add-period')!.addEventListener('click', () => {
    const employerEl = document.getElementById('new-employer') as HTMLInputElement;
    const startEl = document.getElementById('new-start') as HTMLInputElement;
    if (!flashInvalid(employerEl, startEl)) return;
    const employer = employerEl.value.trim();
    const startDate = startEl.value;
    const endDate = currentCheckbox.checked ? null : endInput.value || null;
    const hoursPerWeek = parseInt((document.getElementById('new-hours') as HTMLInputElement).value) || 40;
    const relatedToField = (document.getElementById('new-related') as HTMLSelectElement).value === 'yes';

    const newPeriod: EmploymentPeriod = {
      id: generateId(),
      employer,
      startDate,
      endDate,
      hoursPerWeek,
      relatedToField,
    };

    const allPeriods = [...getEmploymentPeriods(), newPeriod];
    saveEmploymentPeriods(allPeriods);
    renderEmploymentList(allPeriods);
    renderDisplay(getOPTSetup(), allPeriods);
  });

  // Delete periods
  el.querySelectorAll('.delete-period').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.id!;
      const updated = getEmploymentPeriods().filter(p => p.id !== id);
      saveEmploymentPeriods(updated);
      renderEmploymentList(updated);
      renderDisplay(getOPTSetup(), updated);
    });
  });
}

function renderRules(): void {
  const el = document.getElementById('unemp-rules')!;
  el.innerHTML = `
    <details style="border:1px solid var(--color-border);border-radius:var(--radius-card);overflow:hidden;">
      <summary style="padding:16px;cursor:pointer;font-weight:600;background:var(--color-surface);color:var(--color-text-primary);">
        ${t('unemployment.rulesTitle')}
      </summary>
      <div style="padding:16px;background:var(--color-surface-alt);display:flex;flex-direction:column;gap:10px;">
        <p style="font-size:0.875rem;color:var(--color-text-secondary);">${t('unemployment.rule1')}</p>
        <p style="font-size:0.875rem;color:var(--color-text-secondary);">${t('unemployment.rule2')}</p>
        <p style="font-size:0.875rem;color:var(--color-text-secondary);">${t('unemployment.rule3')}</p>
        <p style="font-size:0.875rem;color:var(--color-text-secondary);">${t('unemployment.rule4')}</p>
        <p style="font-size:0.875rem;color:var(--color-text-secondary);">${t('unemployment.rule5')}</p>
        <p style="font-size:0.875rem;color:var(--color-text-secondary);">${t('unemployment.rule6')}</p>
        <p style="font-size:0.75rem;color:var(--color-text-tertiary);font-style:italic;">${t('unemployment.citation')}</p>
      </div>
    </details>
  `;
}
