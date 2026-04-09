import { t } from '../i18n';
import { renderDisclaimerBanner } from '../app';
import { getReportingState, clearAllData } from '../utils/storage';
import { calculateFromStorage, getStatusClass, renderProgressRing } from '../utils/unemployment-calc';
import { LINK_USCIS_OPT, LINK_SEVP_PORTAL, LINK_STEM_LIST_PDF, LINK_EVERIFY_SEARCH, LINK_I983_FORM } from '../data/rules';

interface CardInfo {
  route: string;
  titleKey: string;
  descKey: string;
  icon: string;
  statusHtml?: string;
}

export function renderDashboard(container: HTMLElement): void {
  const unemployment = calculateFromStorage();
  const reportState = getReportingState();
  const totalReportItems = reportState.optType === 'stem' ? 10 : 6;
  const checkedCount = reportState.checkedItems.length;

  // Unemployment hero card
  let heroHtml: string;
  if (unemployment) {
    const status = getStatusClass(unemployment.used, unemployment.limit);
    heroHtml = `
      <a href="#unemployment" class="card status-border-${status}" style="grid-column:span 2;display:flex;align-items:center;gap:24px;cursor:pointer;text-decoration:none;color:inherit;">
        <div style="flex-shrink:0;">
          ${renderProgressRing(unemployment.used, unemployment.limit, 96)}
        </div>
        <div>
          <div style="font-size:var(--text-countdown);font-weight:700;line-height:1;color:var(--color-status-${status});" class="tabular-nums">${unemployment.remaining}</div>
          <div style="font-size:var(--text-label);color:var(--color-text-secondary);margin-top:4px;">${t('unemployment.daysRemaining')}</div>
          <div style="font-size:var(--text-mono);color:var(--color-text-tertiary);margin-top:2px;font-family:var(--font-mono);" class="tabular-nums">${unemployment.used} ${t('dashboard.daysUsed')} ${t('dashboard.of')} ${unemployment.limit}</div>
        </div>
      </a>
    `;
  } else {
    heroHtml = `
      <a href="#unemployment" class="card" style="grid-column:span 2;cursor:pointer;text-decoration:none;color:inherit;background:var(--color-primary-bg);border-color:var(--color-primary);border-width:1px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <div style="width:40px;height:40px;border-radius:10px;background:var(--color-primary);display:flex;align-items:center;justify-content:center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <span style="font-size:var(--text-section);font-weight:600;">${t('card.unemployment.title')}</span>
        </div>
        <p style="color:var(--color-text-secondary);margin-bottom:16px;">${t('dashboard.setupDesc')}</p>
        <span class="btn-primary" style="display:inline-flex;padding:12px 24px;">${t('dashboard.setupCta')}</span>
      </a>
    `;
  }

  // Tool cards
  const cards: CardInfo[] = [
    { route: 'stem-check', titleKey: 'card.stemCheck.title', descKey: 'card.stemCheck.desc', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>' },
    { route: 'everify', titleKey: 'card.everify.title', descKey: 'card.everify.desc', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/></svg>' },
    { route: 'timeline', titleKey: 'card.timeline.title', descKey: 'card.timeline.desc', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' },
    { route: 'status-wizard', titleKey: 'card.statusWizard.title', descKey: 'card.statusWizard.desc', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>' },
    { route: 'reporting', titleKey: 'card.reporting.title', descKey: 'card.reporting.desc', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="6" height="6" rx="1"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>', statusHtml: checkedCount > 0 ? `<span class="status-pill status-pill-${checkedCount >= totalReportItems ? 'safe' : 'warn'}">${t('reporting.completedOf', { done: checkedCount, total: totalReportItems })}</span>` : undefined },
    { route: 'i983', titleKey: 'card.i983.title', descKey: 'card.i983.desc', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>' },
    { route: 'calendar', titleKey: 'card.calendar.title', descKey: 'card.calendar.desc', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M10 14h4"/><path d="M12 12v4"/></svg>' },
  ];

  // Reference cards — lighter treatment, no card border
  const refStyle = 'background:var(--color-surface-alt);border-radius:var(--radius-card);padding:16px;display:flex;flex-direction:column;';

  const resourcesHtml = `
    <div style="${refStyle}">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="color:var(--color-text-tertiary);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></span>
        <span style="font-size:var(--text-label);font-weight:600;color:var(--color-text-secondary);">${t('card.resources.title')}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:4px;flex:1;">
        <a href="${LINK_USCIS_OPT}" target="_blank" rel="noopener noreferrer" style="font-size:0.8125rem;color:var(--color-primary);">${t('resources.uscis')} &rarr;</a>
        <a href="${LINK_SEVP_PORTAL}" target="_blank" rel="noopener noreferrer" style="font-size:0.8125rem;color:var(--color-primary);">${t('resources.sevpPortal')} &rarr;</a>
        <a href="${LINK_STEM_LIST_PDF}" target="_blank" rel="noopener noreferrer" style="font-size:0.8125rem;color:var(--color-primary);">${t('resources.stemList')} &rarr;</a>
        <a href="${LINK_EVERIFY_SEARCH}" target="_blank" rel="noopener noreferrer" style="font-size:0.8125rem;color:var(--color-primary);">${t('resources.everifySearch')} &rarr;</a>
        <a href="${LINK_I983_FORM}" target="_blank" rel="noopener noreferrer" style="font-size:0.8125rem;color:var(--color-primary);">${t('resources.i983Form')} &rarr;</a>
      </div>
    </div>`;

  const privacyHtml = `
    <div style="${refStyle}">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="color:var(--color-text-tertiary);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
        <span style="font-size:var(--text-label);font-weight:600;color:var(--color-text-secondary);">${t('card.privacy.title')}</span>
      </div>
      <p style="font-size:0.8125rem;color:var(--color-text-tertiary);line-height:1.5;flex:1;">${t('card.privacy.desc')}</p>
      <button id="clear-data-btn" style="margin-top:8px;font-size:0.75rem;min-height:32px;padding:4px 10px;align-self:flex-start;background:none;border:1px solid var(--color-border);border-radius:var(--radius-btn);color:var(--color-text-tertiary);cursor:pointer;">${t('privacy.clearData')}</button>
    </div>`;

  const aboutHtml = `
    <div style="${refStyle}">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="color:var(--color-text-tertiary);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
        <span style="font-size:var(--text-label);font-weight:600;color:var(--color-text-secondary);">${t('card.about.title')}</span>
      </div>
      <p style="font-size:0.8125rem;color:var(--color-text-tertiary);line-height:1.5;flex:1;">${t('about.description')}</p>
      <p style="font-size:0.6875rem;color:var(--color-text-tertiary);margin-top:4px;">${t('about.source')}</p>
    </div>`;

  const cardsHtml = cards.map(c => `
    <a href="#${c.route}" class="card" style="cursor:pointer;text-decoration:none;color:inherit;display:flex;flex-direction:column;">
      <div style="width:36px;height:36px;border-radius:8px;background:var(--color-surface-alt);display:flex;align-items:center;justify-content:center;margin-bottom:12px;color:var(--color-text-secondary);">
        ${c.icon}
      </div>
      <span style="font-size:var(--text-label);font-weight:600;margin-bottom:4px;">${t(c.titleKey)}</span>
      <p style="font-size:0.8125rem;color:var(--color-text-secondary);line-height:1.5;flex:1;">${t(c.descKey)}</p>
      ${c.statusHtml ? `<div style="margin-top:8px;">${c.statusHtml}</div>` : ''}
    </a>`).join('');

  container.innerHTML = `
    <div style="margin-bottom:24px;">
      <h1 style="font-size:var(--text-page-title);font-weight:700;">${t('dashboard.title')}</h1>
    </div>
    <div id="tools-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;">
      ${heroHtml}
      ${cardsHtml}
    </div>
    <div style="margin-top:32px;">
      <h2 style="font-size:var(--text-label);font-weight:600;color:var(--color-text-tertiary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">${t('dashboard.reference')}</h2>
      <div id="ref-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
        ${resourcesHtml}
        ${privacyHtml}
        ${aboutHtml}
      </div>
    </div>
  `;

  // Clear data button handler
  document.getElementById('clear-data-btn')?.addEventListener('click', () => {
    if (confirm(t('privacy.clearConfirm'))) {
      clearAllData();
      window.location.hash = 'dashboard';
      window.location.reload();
    }
  });

  // Responsive grid
  const toolsGrid = document.getElementById('tools-grid') as HTMLElement;
  const refGrid = document.getElementById('ref-grid') as HTMLElement;
  const updateGrid = () => {
    const w = window.innerWidth;
    if (w >= 1024) {
      toolsGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
      toolsGrid.style.gap = '20px';
      refGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
      refGrid.style.gap = '20px';
    } else if (w >= 640) {
      toolsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
      toolsGrid.style.gap = '16px';
      refGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
      refGrid.style.gap = '16px';
    } else {
      toolsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
      toolsGrid.style.gap = '16px';
      refGrid.style.gridTemplateColumns = '1fr';
      refGrid.style.gap = '12px';
    }
  };
  updateGrid();
  if ((window as any).__gongyi_resize) {
    window.removeEventListener('resize', (window as any).__gongyi_resize);
  }
  (window as any).__gongyi_resize = updateGrid;
  window.addEventListener('resize', updateGrid);

  renderDisclaimerBanner(container);
}
