import { t, getLang } from '../i18n';
import { renderDisclaimerBanner } from '../app';
import { getTimelineSetup, getOPTSetup } from '../utils/storage';
import { addDays, formatDate } from '../utils/dates';
import { downloadICS, type ICSEvent } from '../utils/ics';
import { STEM_EXTENSION_BEFORE_OPT_END, GRACE_PERIOD_DAYS, VALIDATION_REPORT_MONTHS, I983_EVAL_12_MONTHS, I983_EVAL_24_MONTHS, CAP_GAP_MONTH, CAP_GAP_DAY } from '../data/rules';

function buildEvents(): ICSEvent[] {
  const timeline = getTimelineSetup();
  const optSetup = getOPTSetup();
  if (!timeline) return [];

  const events: ICSEvent[] = [];
  const optStart = new Date(timeline.optStart + 'T00:00:00');
  const isStem = timeline.optType === 'stem' || optSetup?.optType === 'stem';

  // OPT end date
  let optEnd: Date;
  if (isStem && timeline.stemStart) {
    optEnd = addDays(new Date(timeline.stemStart + 'T00:00:00'), 730);
  } else {
    optEnd = addDays(optStart, 365);
  }

  // OPT Expiration
  events.push({
    title: 'OPT Expiration Date',
    titleZh: 'OPT到期日',
    description: 'Your OPT authorization expires today. Ensure you have filed for STEM extension or have alternative plans.',
    descriptionZh: '你的OPT授权今天到期。请确保你已申请STEM延期或有其他计划。',
    date: optEnd,
    reminderDays: [30, 7, 1],
  });

  // STEM filing deadline (90 days before OPT end)
  if (!isStem) {
    const stemDeadline = addDays(optEnd, -STEM_EXTENSION_BEFORE_OPT_END);
    events.push({
      title: 'STEM OPT Filing Deadline',
      titleZh: 'STEM OPT申请截止日',
      description: 'Last day to file STEM OPT extension with USCIS (90 days before OPT expiration).',
      descriptionZh: '向USCIS提交STEM OPT延期的最后日期（OPT到期前90天）。',
      date: stemDeadline,
      reminderDays: [14, 7, 1],
    });
  }

  // Grace period end
  const graceEnd = addDays(optEnd, GRACE_PERIOD_DAYS);
  events.push({
    title: '60-Day Grace Period Ends',
    titleZh: '60天宽限期结束',
    description: 'Your 60-day grace period ends today. You must depart the U.S. or have changed to another status.',
    descriptionZh: '你的60天宽限期今天结束。你必须离开美国或已转换为其他身份。',
    date: graceEnd,
    reminderDays: [14, 7, 1],
  });

  // STEM-specific deadlines
  if (isStem && timeline.stemStart) {
    const stemStart = new Date(timeline.stemStart + 'T00:00:00');

    // Validation reports every 6 months
    for (let m = VALIDATION_REPORT_MONTHS; m <= I983_EVAL_24_MONTHS; m += VALIDATION_REPORT_MONTHS) {
      const valDate = addDays(stemStart, Math.round(m * 30.44));
      events.push({
        title: `6-Month Validation Report #${m / VALIDATION_REPORT_MONTHS}`,
        titleZh: `6个月验证报告 #${m / VALIDATION_REPORT_MONTHS}`,
        description: 'Complete your 6-month validation report via SEVP Portal or DSO. Confirm name, address, employer, and employment status.',
        descriptionZh: '通过SEVP门户或DSO完成6个月验证报告。确认姓名、地址、雇主和就业状态。',
        date: valDate,
        reminderDays: [30, 7, 1],
      });
    }

    // I-983 12-month evaluation
    const eval12 = addDays(stemStart, Math.round(I983_EVAL_12_MONTHS * 30.44));
    events.push({
      title: 'I-983 12-Month Evaluation Due',
      titleZh: 'I-983 12个月评估到期',
      description: 'Submit your 12-month self-evaluation for Form I-983 to your DSO within 10 days. Both you and your supervisor must sign.',
      descriptionZh: '在10天内向DSO提交I-983表格的12个月自我评估。你和你的主管都必须签名。',
      date: eval12,
      reminderDays: [14, 7, 1],
    });

    // I-983 24-month evaluation
    const eval24 = addDays(stemStart, Math.round(I983_EVAL_24_MONTHS * 30.44));
    events.push({
      title: 'I-983 24-Month Final Evaluation Due',
      titleZh: 'I-983 24个月最终评估到期',
      description: 'Submit your final self-evaluation for Form I-983 to your DSO within 10 days of STEM OPT ending.',
      descriptionZh: '在STEM OPT结束后10天内向DSO提交I-983表格的最终自我评估。',
      date: eval24,
      reminderDays: [14, 7, 1],
    });
  }

  // Cap-gap
  if (timeline.h1bFiled) {
    const fyYear = optEnd.getMonth() >= 9 ? optEnd.getFullYear() + 2 : optEnd.getFullYear() + 1;
    const capGapEnd = new Date(fyYear, CAP_GAP_MONTH, CAP_GAP_DAY);
    events.push({
      title: 'Cap-Gap Extension Ends',
      titleZh: 'Cap-Gap延期结束',
      description: 'Your cap-gap extension ends April 1. If H-1B was not selected or approved, you must depart or change status.',
      descriptionZh: '你的Cap-Gap延期在4月1日结束。如果H-1B未被抽中或批准，你必须离开或转换身份。',
      date: capGapEnd,
      reminderDays: [30, 7, 1],
    });
  }

  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function renderCalendar(container: HTMLElement): void {
  const events = buildEvents();

  container.innerHTML = `
    <a href="#dashboard" style="font-size:var(--text-label);color:var(--color-primary);text-decoration:none;display:inline-flex;align-items:center;gap:4px;margin-bottom:16px;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      ${t('common.back')}
    </a>
    <h1 style="font-size:var(--text-page-title);font-weight:700;margin-bottom:8px;">${t('calendar.title')}</h1>
    <p style="color:var(--color-text-secondary);margin-bottom:24px;">${t('calendar.intro')}</p>
    <div id="cal-content"></div>
    <div id="cal-disclaimer"></div>
  `;

  const contentDiv = document.getElementById('cal-content')!;

  if (events.length === 0) {
    contentDiv.innerHTML = `
      <div class="card" style="text-align:center;padding:32px;">
        <p style="color:var(--color-text-secondary);margin-bottom:16px;">${t('calendar.noData')}</p>
        <a href="#timeline" class="btn-primary" style="text-decoration:none;">${t('calendar.goToTimeline')}</a>
      </div>
    `;
  } else {
    const isZh = getLang() === 'zh';
    const eventsHtml = events.map((e, i) => `
      <div class="card" style="margin-bottom:8px;display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-weight:600;font-size:0.875rem;">${isZh ? e.titleZh : e.title}</div>
          <div style="font-family:var(--font-mono);font-size:var(--text-mono);color:var(--color-text-tertiary);" class="tabular-nums">${formatDate(e.date)}</div>
        </div>
        <button class="btn-secondary download-single" data-index="${i}" style="padding:6px 12px;min-height:36px;font-size:0.8125rem;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          ${t('calendar.downloadSingle')}
        </button>
      </div>
    `).join('');

    contentDiv.innerHTML = `
      <button id="download-all" class="btn-primary" style="margin-bottom:20px;display:flex;gap:8px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        ${t('calendar.downloadAll')}
      </button>
      ${eventsHtml}
    `;

    document.getElementById('download-all')!.addEventListener('click', () => {
      downloadICS('gongyi-opt-deadlines.ics', events);
    });

    contentDiv.querySelectorAll('.download-single').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt((btn as HTMLElement).dataset.index!);
        const event = events[idx];
        downloadICS(`gongyi-${event.title.toLowerCase().replace(/\s+/g, '-')}.ics`, [event]);
      });
    });
  }

  renderDisclaimerBanner(document.getElementById('cal-disclaimer')!);
}
