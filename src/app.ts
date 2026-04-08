import { t, setLang, toggleLang } from './i18n';
import { renderDashboard } from './tools/dashboard';
import { renderUnemployment } from './tools/unemployment';
import { renderStemCheck } from './tools/stem-check';
import { renderEverify } from './tools/everify';
import { renderTimeline } from './tools/timeline';
import { renderStatusWizard } from './tools/status-wizard';
import { renderReporting } from './tools/reporting';
import { renderI983Guide } from './tools/i983-guide';
import { renderCalendar } from './tools/calendar';

type Route = 'dashboard' | 'unemployment' | 'stem-check' | 'everify' | 'timeline' | 'status-wizard' | 'reporting' | 'i983' | 'calendar';

interface NavItem {
  route: Route;
  labelKey: string;
  icon: string;
}

const navItems: NavItem[] = [
  { route: 'dashboard', labelKey: 'nav.dashboard', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>' },
  { route: 'unemployment', labelKey: 'nav.unemployment', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
  { route: 'stem-check', labelKey: 'nav.stemCheck', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>' },
  { route: 'everify', labelKey: 'nav.everify', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/></svg>' },
  { route: 'timeline', labelKey: 'nav.timeline', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>' },
  { route: 'status-wizard', labelKey: 'nav.statusWizard', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>' },
  { route: 'reporting', labelKey: 'nav.reporting', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="6" height="6" rx="1"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>' },
  { route: 'i983', labelKey: 'nav.i983', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>' },
  { route: 'calendar', labelKey: 'nav.calendar', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M10 14h4"/><path d="M12 12v4"/></svg>' },
];

const routeRenderers: Record<Route, (container: HTMLElement) => void> = {
  dashboard: renderDashboard,
  unemployment: renderUnemployment,
  'stem-check': renderStemCheck,
  everify: renderEverify,
  timeline: renderTimeline,
  'status-wizard': renderStatusWizard,
  reporting: renderReporting,
  i983: renderI983Guide,
  calendar: renderCalendar,
};

function getRoute(): Route {
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  return (hash in routeRenderers) ? hash as Route : 'dashboard';
}

function renderNav(): void {
  const pills = document.getElementById('nav-pills');
  if (!pills) return;
  const currentRoute = getRoute();
  pills.innerHTML = navItems.map(item => `
    <a href="#${item.route}" class="nav-pill${item.route === currentRoute ? ' active' : ''}" data-route="${item.route}" aria-current="${item.route === currentRoute ? 'page' : 'false'}">
      <span aria-hidden="true">${item.icon}</span>
      <span>${t(item.labelKey)}</span>
    </a>
  `).join('');
}

function renderContent(): void {
  const content = document.getElementById('content');
  if (!content) return;
  const route = getRoute();
  content.innerHTML = '';
  const renderer = routeRenderers[route];
  if (renderer) {
    renderer(content);
  }
}

function updateLangToggle(): void {
  const label = document.getElementById('lang-label');
  if (label) {
    label.textContent = t('lang.switch');
  }
}

function initDarkMode(): void {
  const saved = localStorage.getItem('gongyi-dark');
  if (saved === 'true' || (saved === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
  updateDarkIcons();
}

function updateDarkIcons(): void {
  const isDark = document.documentElement.classList.contains('dark');
  const moon = document.getElementById('dark-icon-moon');
  const sun = document.getElementById('dark-icon-sun');
  if (moon) moon.style.display = isDark ? 'none' : 'block';
  if (sun) sun.style.display = isDark ? 'block' : 'none';
}

function toggleDarkMode(): void {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('gongyi-dark', String(isDark));
  updateDarkIcons();
}

export function renderDisclaimerBanner(container: HTMLElement): void {
  const banner = document.createElement('div');
  banner.className = 'disclaimer-banner';
  banner.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
    <p>${t('disclaimer.text')}<br>${t('disclaimer.government')}</p>
  `;
  container.appendChild(banner);
}

export function navigate(route: string): void {
  window.location.hash = route;
}

function render(): void {
  renderNav();
  renderContent();
  updateLangToggle();
}

// Init
function init(): void {
  const savedLang = localStorage.getItem('gongyi-lang');
  if (savedLang === 'zh' || savedLang === 'en') {
    setLang(savedLang);
  }

  initDarkMode();
  render();

  window.addEventListener('hashchange', render);

  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    toggleLang();
    render();
  });

  document.getElementById('dark-toggle')?.addEventListener('click', toggleDarkMode);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

init();
