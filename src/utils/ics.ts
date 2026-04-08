import { getLang } from '../i18n';

interface ICSEvent {
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  date: Date;
  reminderDays?: number[];
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function formatICSDate(date: Date): string {
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
}

function escapeICS(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function generateUID(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}@gongyi`;
}

function createVEVENT(event: ICSEvent): string {
  const lang = getLang();
  const title = lang === 'zh' ? event.titleZh : event.title;
  const desc = lang === 'zh' ? event.descriptionZh : event.description;
  const dateStr = formatICSDate(event.date);
  const nextDay = new Date(event.date);
  nextDay.setDate(nextDay.getDate() + 1);
  const endStr = formatICSDate(nextDay);

  let vevent = `BEGIN:VEVENT
UID:${generateUID()}
DTSTART;VALUE=DATE:${dateStr}
DTEND;VALUE=DATE:${endStr}
SUMMARY:${escapeICS(title)}
DESCRIPTION:${escapeICS(desc)}`;

  const reminders = event.reminderDays || [7, 1];
  for (const days of reminders) {
    vevent += `
BEGIN:VALARM
TRIGGER:-P${days}D
ACTION:DISPLAY
DESCRIPTION:${escapeICS(title)} - ${days} day${days > 1 ? 's' : ''} away
END:VALARM`;
  }

  vevent += '\nEND:VEVENT';
  return vevent;
}

export function generateICS(events: ICSEvent[]): string {
  const vevents = events.map(e => createVEVENT(e)).join('\n');
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//GongYi//OPT Tracker//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:GongYi OPT Deadlines
${vevents}
END:VCALENDAR`;
}

export function downloadICS(filename: string, events: ICSEvent[]): void {
  const content = generateICS(events);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export type { ICSEvent };
