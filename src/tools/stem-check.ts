import { t } from '../i18n';
import { renderDisclaimerBanner } from '../app';
import { STEM_CIP_CODES, STEM_LIST_LAST_UPDATED } from '../data/stem-cip';
import { LINK_STEM_LIST_PDF } from '../data/rules';

export function renderStemCheck(container: HTMLElement): void {
  container.innerHTML = `
    <a href="#dashboard" style="font-size:var(--text-label);color:var(--color-primary);text-decoration:none;display:inline-flex;align-items:center;gap:4px;margin-bottom:16px;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      ${t('common.back')}
    </a>
    <h1 style="font-size:var(--text-page-title);font-weight:700;margin-bottom:8px;">${t('stem.title')}</h1>
    <p style="color:var(--color-text-tertiary);font-size:var(--text-label);margin-bottom:24px;">${t('stem.lastUpdated')}</p>

    <div style="position:relative;margin-bottom:24px;">
      <label style="font-size:var(--text-label);color:var(--color-text-secondary);display:block;margin-bottom:4px;">${t('stem.search')}</label>
      <input type="text" id="cip-search" class="form-input" placeholder="${t('stem.searchPlaceholder')}" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="cip-dropdown" aria-autocomplete="list">
      <div id="cip-dropdown" role="listbox" style="display:none;position:absolute;top:100%;left:0;right:0;z-index:20;max-height:300px;overflow-y:auto;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-card);box-shadow:var(--shadow-md);margin-top:4px;"></div>
    </div>

    <div id="cip-result" style="margin-bottom:24px;"></div>
    <div id="cip-additional" style="display:none;margin-bottom:24px;"></div>
    <div style="margin-bottom:24px;">
      <a href="${LINK_STEM_LIST_PDF}" target="_blank" rel="noopener noreferrer" style="color:var(--color-primary);font-size:var(--text-label);">
        ${t('stem.sourceLink')} &rarr;
      </a>
    </div>
    <div id="stem-disclaimer"></div>
  `;

  const searchInput = document.getElementById('cip-search') as HTMLInputElement;
  const dropdown = document.getElementById('cip-dropdown')!;
  const resultDiv = document.getElementById('cip-result')!;
  const additionalDiv = document.getElementById('cip-additional')!;

  let debounceTimer: number;

  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      const query = searchInput.value.trim().toLowerCase();
      if (query.length < 2) {
        dropdown.style.display = 'none';
        return;
      }

      const matches = STEM_CIP_CODES.filter(c =>
        c.code.toLowerCase().includes(query) ||
        c.title.toLowerCase().includes(query)
      ).slice(0, 20);

      if (matches.length === 0) {
        dropdown.innerHTML = `<div style="padding:12px;color:var(--color-text-tertiary);font-size:var(--text-label);">${t('stem.noResults')}</div>`;
        dropdown.style.display = 'block';
        return;
      }

      dropdown.innerHTML = matches.map((m, i) => `
        <div class="cip-option" data-code="${m.code}" role="option" id="cip-opt-${i}" style="padding:10px 14px;cursor:pointer;border-bottom:1px solid var(--color-border);transition:background-color 150ms ease-out;">
          <span style="font-family:var(--font-mono);font-size:var(--text-mono);color:var(--color-primary);">${m.code}</span>
          <span style="margin-left:8px;font-size:0.875rem;color:var(--color-text-secondary);">${m.title}</span>
        </div>
      `).join('');
      dropdown.style.display = 'block';
      searchInput.setAttribute('aria-expanded', 'true');

      dropdown.querySelectorAll('.cip-option').forEach(opt => {
        opt.addEventListener('mouseenter', () => {
          (opt as HTMLElement).style.background = 'var(--color-surface-alt)';
        });
        opt.addEventListener('mouseleave', () => {
          (opt as HTMLElement).style.background = '';
        });
        opt.addEventListener('click', () => {
          selectOption(opt as HTMLElement);
        });
      });
    }, 200);
  });

  let activeIndex = -1;

  function selectOption(opt: HTMLElement): void {
    const code = opt.dataset.code!;
    const match = STEM_CIP_CODES.find(c => c.code === code)!;
    searchInput.value = `${match.code} — ${match.title}`;
    closeDropdown();
    showResult(match);
  }

  function closeDropdown(): void {
    dropdown.style.display = 'none';
    searchInput.setAttribute('aria-expanded', 'false');
    activeIndex = -1;
    highlightOption();
  }

  function highlightOption(): void {
    const opts = dropdown.querySelectorAll('.cip-option');
    opts.forEach((o, i) => {
      (o as HTMLElement).style.background = i === activeIndex ? 'var(--color-surface-alt)' : '';
    });
    if (activeIndex >= 0 && opts[activeIndex]) {
      (opts[activeIndex] as HTMLElement).scrollIntoView({ block: 'nearest' });
      searchInput.setAttribute('aria-activedescendant', `cip-opt-${activeIndex}`);
    } else {
      searchInput.removeAttribute('aria-activedescendant');
    }
  }

  searchInput.addEventListener('keydown', (e) => {
    const opts = dropdown.querySelectorAll('.cip-option');
    const isOpen = dropdown.style.display !== 'none';

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (isOpen && opts.length > 0) {
        activeIndex = Math.min(activeIndex + 1, opts.length - 1);
        highlightOption();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isOpen && opts.length > 0) {
        activeIndex = Math.max(activeIndex - 1, 0);
        highlightOption();
      }
    } else if (e.key === 'Escape') {
      closeDropdown();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (isOpen && activeIndex >= 0 && opts[activeIndex]) {
        selectOption(opts[activeIndex] as HTMLElement);
      } else {
        const query = searchInput.value.trim().toLowerCase();
        const exactMatch = STEM_CIP_CODES.find(c => c.code === query || c.code.replace('.', '') === query.replace('.', ''));
        if (exactMatch) {
          searchInput.value = `${exactMatch.code} — ${exactMatch.title}`;
          closeDropdown();
          showResult(exactMatch);
        } else {
          const codePattern = /^\d{2}\.\d{4}$/;
          if (codePattern.test(query)) {
            showNotEligible(query);
            closeDropdown();
          }
        }
      }
    }
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('#cip-search') && !(e.target as HTMLElement).closest('#cip-dropdown')) {
      closeDropdown();
    }
  });

  function showResult(match: { code: string; title: string; series: string }): void {
    resultDiv.innerHTML = `
      <div class="card status-border-safe">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
          <span class="status-pill status-pill-safe">${t('stem.eligible')}</span>
        </div>
        <div style="font-weight:600;font-size:var(--text-section);">${match.code} — ${match.title}</div>
        <div style="font-size:var(--text-label);color:var(--color-text-tertiary);margin-top:4px;">Series ${match.series}</div>
      </div>
    `;
    showAdditionalChecks();
  }

  function showNotEligible(code: string): void {
    resultDiv.innerHTML = `
      <div class="card status-border-warn">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
          <span class="status-pill status-pill-warn">${t('stem.notEligible')}</span>
        </div>
        <div style="font-weight:600;">${code}</div>
        <p style="font-size:0.875rem;color:var(--color-text-secondary);margin-top:8px;">${t('stem.notEligibleDesc')}</p>
      </div>
    `;
    additionalDiv.style.display = 'none';
  }

  function showAdditionalChecks(): void {
    additionalDiv.style.display = 'block';
    additionalDiv.innerHTML = `
      <div class="card">
        <h3 style="font-size:var(--text-section);font-weight:600;margin-bottom:16px;">${t('stem.additionalChecks')}</h3>
        <div style="display:flex;flex-direction:column;gap:12px;" id="additional-checks">
          <label style="display:flex;align-items:center;gap:10px;font-size:0.875rem;">
            <input type="checkbox" class="stem-check" data-q="sevp" style="width:18px;height:18px;accent-color:var(--color-status-safe);">
            ${t('stem.sevpSchool')}
          </label>
          <label style="display:flex;align-items:center;gap:10px;font-size:0.875rem;">
            <input type="checkbox" class="stem-check" data-q="everify" style="width:18px;height:18px;accent-color:var(--color-status-safe);">
            ${t('stem.employerEverify')}
            <a href="#everify" style="color:var(--color-primary);font-size:0.75rem;margin-left:auto;">${t('nav.everify')}</a>
          </label>
          <label style="display:flex;align-items:center;gap:10px;font-size:0.875rem;">
            <input type="checkbox" class="stem-check" data-q="related" style="width:18px;height:18px;accent-color:var(--color-status-safe);">
            ${t('stem.relatedJob')}
          </label>
        </div>
        <div id="check-summary" style="margin-top:16px;padding:12px;border-radius:var(--radius-card);"></div>
      </div>
    `;

    const summaryDiv = document.getElementById('check-summary')!;
    const updateSummary = () => {
      const checks = additionalDiv.querySelectorAll('.stem-check') as NodeListOf<HTMLInputElement>;
      const allChecked = Array.from(checks).every(c => c.checked);
      if (allChecked) {
        summaryDiv.style.background = 'var(--color-status-safe-bg)';
        summaryDiv.innerHTML = `<span style="color:var(--color-status-safe);font-weight:600;">${t('stem.likelyQualify')}</span>`;
      } else {
        summaryDiv.style.background = 'var(--color-status-warn-bg)';
        summaryDiv.innerHTML = `<span style="color:var(--color-status-warn);font-weight:600;">${t('stem.mayNotQualify')}</span>`;
      }
    };

    additionalDiv.querySelectorAll('.stem-check').forEach(cb => {
      cb.addEventListener('change', updateSummary);
    });
    updateSummary();
  }

  renderDisclaimerBanner(document.getElementById('stem-disclaimer')!);
}
