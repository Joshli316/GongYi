import { t } from '../i18n';
import { renderDisclaimerBanner } from '../app';
import { LINK_I983_FORM } from '../data/rules';

interface Section {
  titleKey: string;
  contentKey: string;
}

const SECTIONS: Section[] = [
  { titleKey: 'i983.section1Title', contentKey: 'i983.section1Content' },
  { titleKey: 'i983.section2Title', contentKey: 'i983.section2Content' },
  { titleKey: 'i983.section3Title', contentKey: 'i983.section3Content' },
  { titleKey: 'i983.section4Title', contentKey: 'i983.section4Content' },
  { titleKey: 'i983.section5Title', contentKey: 'i983.section5Content' },
  { titleKey: 'i983.evalTitle', contentKey: 'i983.evalContent' },
];

const MATERIAL_CHANGES = [
  'i983.materialChange1',
  'i983.materialChange2',
  'i983.materialChange3',
  'i983.materialChange4',
  'i983.materialChange5',
  'i983.materialChange6',
];

interface FAQ {
  qKey: string;
  aKey: string;
}

const FAQS: FAQ[] = [
  { qKey: 'i983.faq1q', aKey: 'i983.faq1a' },
  { qKey: 'i983.faq2q', aKey: 'i983.faq2a' },
  { qKey: 'i983.faq3q', aKey: 'i983.faq3a' },
];

export function renderI983Guide(container: HTMLElement): void {
  const sectionsHtml = SECTIONS.map((s, i) => `
    <details class="card" style="margin-bottom:8px;overflow:hidden;padding:0;">
      <summary style="padding:16px 20px;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:8px;">
        <span style="color:var(--color-primary);font-family:var(--font-mono);font-size:var(--text-mono);">${i + 1}</span>
        ${t(s.titleKey)}
      </summary>
      <div style="padding:0 20px 16px;">
        <p style="font-size:0.875rem;color:var(--color-text-secondary);line-height:1.6;">${t(s.contentKey)}</p>
      </div>
    </details>
  `).join('');

  const changesHtml = MATERIAL_CHANGES.map(key => `
    <li style="font-size:0.875rem;color:var(--color-text-secondary);">${t(key)}</li>
  `).join('');

  const faqsHtml = FAQS.map(faq => `
    <details style="border-bottom:1px solid var(--color-border);padding:12px 0;">
      <summary style="cursor:pointer;font-weight:600;font-size:0.875rem;">${t(faq.qKey)}</summary>
      <p style="font-size:0.875rem;color:var(--color-text-secondary);line-height:1.6;margin-top:8px;">${t(faq.aKey)}</p>
    </details>
  `).join('');

  container.innerHTML = `
    <a href="#dashboard" style="font-size:var(--text-label);color:var(--color-primary);text-decoration:none;display:inline-flex;align-items:center;gap:4px;margin-bottom:16px;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      ${t('common.back')}
    </a>
    <h1 style="font-size:var(--text-page-title);font-weight:700;margin-bottom:8px;">${t('i983.title')}</h1>
    <p style="color:var(--color-text-secondary);margin-bottom:16px;">${t('i983.intro')}</p>

    <a href="${LINK_I983_FORM}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="display:inline-flex;gap:8px;margin-bottom:24px;text-decoration:none;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      ${t('i983.formLink')}
    </a>

    <!-- Sections -->
    <div style="margin-bottom:32px;">
      ${sectionsHtml}
    </div>

    <!-- Learning Objective Template -->
    <div class="card" style="margin-bottom:20px;">
      <h2 style="font-size:var(--text-section);font-weight:600;margin-bottom:12px;">${t('i983.objectiveTemplate')}</h2>
      <div style="background:var(--color-surface-alt);border-radius:var(--radius-card);padding:16px;font-style:italic;color:var(--color-text-secondary);font-size:0.875rem;">
        "${t('i983.objectiveExample')}"
      </div>
    </div>

    <!-- Material Changes -->
    <div class="card" style="margin-bottom:20px;">
      <h2 style="font-size:var(--text-section);font-weight:600;margin-bottom:12px;">${t('i983.materialChangesTitle')}</h2>
      <ul style="display:flex;flex-direction:column;gap:8px;padding-left:20px;">
        ${changesHtml}
      </ul>
    </div>

    <!-- Employer FAQ -->
    <div class="card" style="margin-bottom:20px;">
      <h2 style="font-size:var(--text-section);font-weight:600;margin-bottom:12px;">${t('i983.employerFaqTitle')}</h2>
      ${faqsHtml}
    </div>

    <div id="i983-disclaimer"></div>
  `;

  renderDisclaimerBanner(document.getElementById('i983-disclaimer')!);
}
