import { t } from '../i18n';
import { renderDisclaimerBanner } from '../app';
import { WIZARD_QUESTIONS, WIZARD_ADVICE } from '../data/wizard-questions';
import { getOPTSetup } from '../utils/storage';

export function renderStatusWizard(container: HTMLElement): void {
  const setup = getOPTSetup();
  const isStem = setup?.optType === 'stem';
  const questions = WIZARD_QUESTIONS.filter(q => !q.stemOnly || isStem);
  const totalSteps = questions.length;

  let currentStep = -1; // -1 = intro screen
  const answers: Record<string, boolean> = {};

  function render(): void {
    if (currentStep === -1) {
      renderIntro();
    } else if (currentStep >= totalSteps) {
      renderResult();
    } else {
      renderQuestion();
    }
  }

  function renderIntro(): void {
    container.innerHTML = `
      <a href="#dashboard" style="font-size:var(--text-label);color:var(--color-primary);text-decoration:none;display:inline-flex;align-items:center;gap:4px;margin-bottom:16px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        ${t('common.back')}
      </a>
      <h1 style="font-size:var(--text-page-title);font-weight:700;margin-bottom:8px;">${t('wizard.title')}</h1>
      <p style="color:var(--color-text-secondary);margin-bottom:24px;">${t('wizard.intro')}</p>
      <button id="wizard-start" class="btn-primary">${t('wizard.start')}</button>
      <div id="wizard-disclaimer" style="margin-top:32px;"></div>
    `;
    document.getElementById('wizard-start')!.addEventListener('click', () => {
      currentStep = 0;
      render();
    });
    renderDisclaimerBanner(document.getElementById('wizard-disclaimer')!);
  }

  function renderQuestion(): void {
    const q = questions[currentStep];
    const progress = ((currentStep + 1) / totalSteps) * 100;

    container.innerHTML = `
      <a href="#dashboard" style="font-size:var(--text-label);color:var(--color-primary);text-decoration:none;display:inline-flex;align-items:center;gap:4px;margin-bottom:16px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        ${t('common.back')}
      </a>
      <div style="margin-bottom:24px;">
        <div style="font-size:var(--text-label);color:var(--color-text-tertiary);margin-bottom:8px;">${t('wizard.stepOf', { current: currentStep + 1, total: totalSteps })}</div>
        <div style="height:6px;background:var(--color-border);border-radius:3px;overflow:hidden;">
          <div style="height:100%;width:${progress}%;background:var(--color-primary);border-radius:3px;transition:width 300ms ease-out;"></div>
        </div>
      </div>
      <div class="card" style="margin-bottom:24px;">
        <h2 style="font-size:var(--text-section);font-weight:600;margin-bottom:24px;line-height:1.4;">${t(q.key)}</h2>
        <div style="display:flex;gap:12px;">
          <button id="ans-yes" class="btn-primary" style="flex:1;min-height:48px;">${t('common.yes')}</button>
          <button id="ans-no" class="btn-secondary" style="flex:1;min-height:48px;">${t('common.no')}</button>
        </div>
      </div>
      ${currentStep > 0 ? `<button id="wizard-back" class="btn-secondary" style="margin-top:8px;">${t('common.previous')}</button>` : ''}
      <div id="wizard-disclaimer" style="margin-top:32px;"></div>
    `;

    document.getElementById('ans-yes')!.addEventListener('click', () => {
      answers[q.id] = true;
      currentStep++;
      render();
    });

    document.getElementById('ans-no')!.addEventListener('click', () => {
      answers[q.id] = false;
      currentStep++;
      render();
    });

    document.getElementById('wizard-back')?.addEventListener('click', () => {
      currentStep--;
      render();
    });

    renderDisclaimerBanner(document.getElementById('wizard-disclaimer')!);
  }

  function renderResult(): void {
    const issues: { critical: boolean; text: string }[] = [];

    for (const q of questions) {
      if (answers[q.id] === false) {
        const adviceEntry = WIZARD_ADVICE[q.noAdviceKey];
        const lang = (document.documentElement.lang || 'en').startsWith('zh') ? 'zh' : 'en';
        const advice = adviceEntry ? adviceEntry[lang as 'en' | 'zh'] : '';
        issues.push({ critical: q.critical, text: advice });
      }
    }

    const hasCritical = issues.some(i => i.critical);
    const hasIssues = issues.length > 0;

    let statusClass: string;
    let titleKey: string;
    let descKey: string;
    if (hasCritical) {
      statusClass = 'critical';
      titleKey = 'wizard.resultRed';
      descKey = 'wizard.resultRedDesc';
    } else if (hasIssues) {
      statusClass = 'warn';
      titleKey = 'wizard.resultAmber';
      descKey = 'wizard.resultAmberDesc';
    } else {
      statusClass = 'safe';
      titleKey = 'wizard.resultGreen';
      descKey = 'wizard.resultGreenDesc';
    }

    const issuesHtml = issues.map(i => `
      <div style="padding:12px;background:var(--color-status-${i.critical ? 'critical' : 'warn'}-bg);border-radius:var(--radius-card);border-left:3px solid var(--color-status-${i.critical ? 'critical' : 'warn'});">
        <p style="font-size:0.875rem;color:var(--color-text-secondary);">${i.text}</p>
      </div>
    `).join('');

    container.innerHTML = `
      <a href="#dashboard" style="font-size:var(--text-label);color:var(--color-primary);text-decoration:none;display:inline-flex;align-items:center;gap:4px;margin-bottom:16px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        ${t('common.back')}
      </a>
      <div class="card status-border-${statusClass}" role="alert" style="margin-bottom:24px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <span class="status-pill status-pill-${statusClass}">${t(titleKey)}</span>
        </div>
        <p style="font-size:0.875rem;color:var(--color-text-secondary);margin-bottom:16px;">${t(descKey)}</p>
        ${issues.length > 0 ? `<div style="display:flex;flex-direction:column;gap:8px;">${issuesHtml}</div>` : ''}
      </div>
      <div class="card" style="margin-top:16px;">
        <div style="font-size:var(--text-label);font-weight:600;margin-bottom:8px;">${t('wizard.nextSteps')}</div>
        <div style="display:flex;flex-direction:column;gap:6px;">
          <a href="#unemployment" style="font-size:0.8125rem;color:var(--color-primary);">${t('card.unemployment.title')} &rarr;</a>
          <a href="#reporting" style="font-size:0.8125rem;color:var(--color-primary);">${t('card.reporting.title')} &rarr;</a>
          <a href="#everify" style="font-size:0.8125rem;color:var(--color-primary);">${t('card.everify.title')} &rarr;</a>
        </div>
      </div>
      <button id="wizard-restart" class="btn-secondary" style="margin-top:12px;">${t('wizard.restart')}</button>
      <div id="wizard-disclaimer" style="margin-top:32px;"></div>
    `;

    document.getElementById('wizard-restart')!.addEventListener('click', () => {
      currentStep = -1;
      Object.keys(answers).forEach(k => delete answers[k]);
      render();
    });

    renderDisclaimerBanner(document.getElementById('wizard-disclaimer')!);
  }

  render();
}
