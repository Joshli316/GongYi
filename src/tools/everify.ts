import { t } from '../i18n';
import { renderDisclaimerBanner } from '../app';
import { LINK_EVERIFY_SEARCH } from '../data/rules';

export function renderEverify(container: HTMLElement): void {
  container.innerHTML = `
    <a href="#dashboard" style="font-size:var(--text-label);color:var(--color-primary);text-decoration:none;display:inline-flex;align-items:center;gap:4px;margin-bottom:16px;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      ${t('common.back')}
    </a>
    <h1 style="font-size:var(--text-page-title);font-weight:700;margin-bottom:8px;">${t('everify.title')}</h1>
    <p style="color:var(--color-text-secondary);margin-bottom:24px;">${t('everify.intro')}</p>

    <a href="${LINK_EVERIFY_SEARCH}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display:inline-flex;gap:8px;margin-bottom:32px;text-decoration:none;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      ${t('everify.searchLink')}
    </a>

    <!-- How to Search -->
    <div class="card" style="margin-bottom:20px;">
      <h2 style="font-size:var(--text-section);font-weight:600;margin-bottom:16px;">${t('everify.stepsTitle')}</h2>
      <ol style="display:flex;flex-direction:column;gap:12px;padding-left:20px;">
        <li style="font-size:0.875rem;color:var(--color-text-secondary);">${t('everify.step1')}</li>
        <li style="font-size:0.875rem;color:var(--color-text-secondary);">${t('everify.step2')}</li>
        <li style="font-size:0.875rem;color:var(--color-text-secondary);">${t('everify.step3')}</li>
        <li style="font-size:0.875rem;color:var(--color-text-secondary);">${t('everify.step4')}</li>
      </ol>
    </div>

    <!-- Tips -->
    <div class="card" style="margin-bottom:20px;">
      <h2 style="font-size:var(--text-section);font-weight:600;margin-bottom:16px;">${t('everify.tipsTitle')}</h2>
      <ul style="display:flex;flex-direction:column;gap:10px;padding-left:20px;">
        <li style="font-size:0.875rem;color:var(--color-text-secondary);">${t('everify.tip1')}</li>
        <li style="font-size:0.875rem;color:var(--color-text-secondary);">${t('everify.tip2')}</li>
        <li style="font-size:0.875rem;color:var(--color-text-secondary);">${t('everify.tip3')}</li>
        <li style="font-size:0.875rem;color:var(--color-text-secondary);">${t('everify.tip4')}</li>
      </ul>
    </div>

    <!-- Why E-Verify Matters -->
    <div class="card" style="margin-bottom:20px;">
      <h2 style="font-size:var(--text-section);font-weight:600;margin-bottom:12px;">${t('everify.whyTitle')}</h2>
      <p style="font-size:0.875rem;color:var(--color-text-secondary);line-height:1.6;">${t('everify.whyText')}</p>
    </div>

    <!-- Checklist -->
    <div class="card" style="margin-bottom:20px;">
      <h2 style="font-size:var(--text-section);font-weight:600;margin-bottom:16px;">${t('everify.checklistTitle')}</h2>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${[1,2,3,4,5].map(i => `
          <label style="display:flex;align-items:center;gap:10px;font-size:0.875rem;color:var(--color-text-secondary);">
            <input type="checkbox" style="width:18px;height:18px;accent-color:var(--color-status-safe);flex-shrink:0;">
            ${t('everify.check' + i)}
          </label>
        `).join('')}
      </div>
    </div>

    <div id="everify-disclaimer"></div>
  `;

  renderDisclaimerBanner(document.getElementById('everify-disclaimer')!);
}
