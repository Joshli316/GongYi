import { t } from '../i18n';
import { renderDisclaimerBanner } from '../app';
import { getReportingState, saveReportingState, getOPTSetup } from '../utils/storage';
import { addDays, formatDate, daysBetween, today } from '../utils/dates';
import { VALIDATION_REPORT_MONTHS, I983_EVAL_12_MONTHS, I983_EVAL_24_MONTHS, LINK_SEVP_PORTAL } from '../data/rules';

interface ReportItem {
  id: string;
  labelKey: string;
  detailKey: string;
  stemOnly: boolean;
}

const REPORT_ITEMS: ReportItem[] = [
  { id: 'item1', labelKey: 'reporting.item1', detailKey: 'reporting.item1Detail', stemOnly: false },
  { id: 'item2', labelKey: 'reporting.item2', detailKey: 'reporting.item2Detail', stemOnly: false },
  { id: 'item3', labelKey: 'reporting.item3', detailKey: 'reporting.item3Detail', stemOnly: false },
  { id: 'item4', labelKey: 'reporting.item4', detailKey: 'reporting.item4Detail', stemOnly: false },
  { id: 'item5', labelKey: 'reporting.item5', detailKey: 'reporting.item5Detail', stemOnly: false },
  { id: 'item6', labelKey: 'reporting.item6', detailKey: 'reporting.item6Detail', stemOnly: false },
  { id: 'item7', labelKey: 'reporting.item7', detailKey: 'reporting.item7Detail', stemOnly: true },
  { id: 'item8', labelKey: 'reporting.item8', detailKey: 'reporting.item8Detail', stemOnly: true },
  { id: 'item9', labelKey: 'reporting.item9', detailKey: 'reporting.item9Detail', stemOnly: true },
  { id: 'item10', labelKey: 'reporting.item10', detailKey: 'reporting.item10Detail', stemOnly: true },
];

export function renderReporting(container: HTMLElement): void {
  const setup = getOPTSetup();
  const isStem = setup?.optType === 'stem';
  const state = getReportingState();
  state.optType = isStem ? 'stem' : 'standard';

  const items = REPORT_ITEMS.filter(item => !item.stemOnly || isStem);

  function renderChecklist(): void {
    const totalItems = items.length;
    const checkedCount = state.checkedItems.filter(id => items.some(i => i.id === id)).length;

    // STEM deadline calculations
    let deadlineHtml = '';
    if (isStem && state.stemStartDate) {
      const stemStart = new Date(state.stemStartDate + 'T00:00:00');
      const now = today();
      const deadlines: { label: string; date: Date }[] = [];

      // 6-month validation reports
      for (let m = VALIDATION_REPORT_MONTHS; m <= I983_EVAL_24_MONTHS; m += VALIDATION_REPORT_MONTHS) {
        deadlines.push({ label: t('timeline.validation') + ` #${m / VALIDATION_REPORT_MONTHS}`, date: addDays(stemStart, m * 30.44) });
      }
      deadlines.push({ label: t('timeline.eval12'), date: addDays(stemStart, I983_EVAL_12_MONTHS * 30.44) });
      deadlines.push({ label: t('timeline.eval24'), date: addDays(stemStart, I983_EVAL_24_MONTHS * 30.44) });

      // Find next upcoming deadline
      const upcoming = deadlines.filter(d => d.date >= now).sort((a, b) => a.date.getTime() - b.date.getTime());
      if (upcoming.length > 0) {
        const next = upcoming[0];
        const daysAway = daysBetween(now, next.date);
        deadlineHtml = `
          <div class="card status-border-${daysAway <= 7 ? 'critical' : daysAway <= 30 ? 'warn' : 'safe'}" style="margin-bottom:20px;">
            <div style="font-size:var(--text-label);color:var(--color-text-tertiary);">${t('reporting.nextDeadline')}</div>
            <div style="font-weight:600;">${next.label}</div>
            <div style="font-family:var(--font-mono);font-size:var(--text-mono);" class="tabular-nums">${formatDate(next.date)} — ${daysAway} ${t('timeline.daysAway')}</div>
          </div>
        `;
      }
    }

    container.innerHTML = `
      <a href="#dashboard" style="font-size:var(--text-label);color:var(--color-primary);text-decoration:none;display:inline-flex;align-items:center;gap:4px;margin-bottom:16px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        ${t('common.back')}
      </a>
      <h1 style="font-size:var(--text-page-title);font-weight:700;margin-bottom:8px;">${t('reporting.title')}</h1>
      <p style="color:var(--color-text-secondary);margin-bottom:16px;">${t('reporting.intro')}</p>

      <!-- Dual reporting reminder -->
      <div role="alert" style="background:var(--color-status-warn-bg);border:1px solid var(--color-status-warn);border-radius:var(--radius-card);padding:12px 16px;margin-bottom:24px;">
        <p style="font-size:0.875rem;color:var(--color-status-warn);font-weight:600;">${t('reporting.dualReminder')}</p>
        <a href="${LINK_SEVP_PORTAL}" target="_blank" rel="noopener noreferrer" style="font-size:0.75rem;color:var(--color-primary);">SEVP Portal &rarr;</a>
      </div>

      <!-- Progress -->
      <div style="margin-bottom:16px;">
        <span class="status-pill ${checkedCount >= totalItems ? 'status-pill-safe' : 'status-pill-warn'}">
          ${t('reporting.completedOf', { done: checkedCount, total: totalItems })}
        </span>
      </div>

      ${deadlineHtml}

      ${isStem ? `
        <div style="margin-bottom:20px;">
          <label for="rpt-stem-start" style="font-size:var(--text-label);color:var(--color-text-secondary);display:block;margin-bottom:4px;">${t('reporting.stemStartDate')}</label>
          <input type="date" id="rpt-stem-start" class="form-input" value="${state.stemStartDate || ''}" style="max-width:220px;">
        </div>
      ` : ''}

      <!-- Standard items -->
      <div style="margin-bottom:24px;">
        <h2 style="font-size:var(--text-section);font-weight:600;margin-bottom:12px;">${t('reporting.standardTitle')}</h2>
        <div style="display:flex;flex-direction:column;gap:4px;" id="standard-items">
          ${items.filter(i => !i.stemOnly).map(item => renderCheckItem(item, state.checkedItems.includes(item.id))).join('')}
        </div>
      </div>

      ${isStem ? `
        <div style="margin-bottom:24px;">
          <h2 style="font-size:var(--text-section);font-weight:600;margin-bottom:12px;">${t('reporting.stemTitle')}</h2>
          <div style="display:flex;flex-direction:column;gap:4px;" id="stem-items">
            ${items.filter(i => i.stemOnly).map(item => renderCheckItem(item, state.checkedItems.includes(item.id))).join('')}
          </div>
        </div>
      ` : ''}

      <div id="rpt-disclaimer"></div>
    `;

    // Checkbox handlers
    container.querySelectorAll('.rpt-check').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = (cb as HTMLInputElement).dataset.id!;
        const checked = (cb as HTMLInputElement).checked;
        if (checked && !state.checkedItems.includes(id)) {
          state.checkedItems.push(id);
        } else if (!checked) {
          state.checkedItems = state.checkedItems.filter(i => i !== id);
        }
        saveReportingState(state);
        renderChecklist();
      });
    });

    // STEM start date handler
    document.getElementById('rpt-stem-start')?.addEventListener('change', (e) => {
      state.stemStartDate = (e.target as HTMLInputElement).value || null;
      saveReportingState(state);
      renderChecklist();
    });

    // Expandable details
    container.querySelectorAll('.rpt-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const detail = (btn as HTMLElement).nextElementSibling as HTMLElement;
        if (detail) {
          detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
        }
      });
    });

    renderDisclaimerBanner(document.getElementById('rpt-disclaimer')!);
  }

  renderChecklist();
}

function renderCheckItem(item: ReportItem, checked: boolean): string {
  return `
    <div style="border:1px solid var(--color-border);border-radius:var(--radius-card);overflow:hidden;">
      <div style="display:flex;align-items:center;gap:10px;padding:12px 16px;">
        <input type="checkbox" class="rpt-check" data-id="${item.id}" ${checked ? 'checked' : ''} style="width:18px;height:18px;accent-color:var(--color-status-safe);flex-shrink:0;">
        <span style="font-size:0.875rem;font-weight:500;${checked ? 'text-decoration:line-through;color:var(--color-text-tertiary);' : 'color:var(--color-text-primary);'}">${t(item.labelKey)}</span>
        <button class="rpt-toggle" style="margin-left:auto;background:none;border:none;color:var(--color-text-tertiary);cursor:pointer;padding:4px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>
      <div style="display:none;padding:0 16px 12px 44px;">
        <p style="font-size:0.8125rem;color:var(--color-text-secondary);line-height:1.5;">${t(item.detailKey)}</p>
      </div>
    </div>
  `;
}
