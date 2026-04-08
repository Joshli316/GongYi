# Implementation Plan: GongYi 工易

## Overview
GongYi 工易 ("Work Made Easy") is a free, bilingual (EN/ZH), client-side work authorization tracker for F-1 international students on OPT. It solves the #1 pain point — no free tool exists for students to count unemployment days, check STEM OPT eligibility, or track reporting deadlines. All data stays in the browser (localStorage). No accounts, no server.

## Design Spec

### Direction
Minimal-Corporate, Balanced density, Slate monochrome + traffic-light accents, System stack + tabular numbers, Mixed shapes (sharp cards, rounded indicators). "Mission Control" — students see their compliance status at a glance and drill into tools.

### Colors (CSS custom properties)
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#F8FAFC` | Page background |
| `--surface` | `#FFFFFF` | Card backgrounds |
| `--surface-alt` | `#F1F5F9` | Hover, secondary sections |
| `--border` | `#E2E8F0` | Card borders, dividers |
| `--border-strong` | `#CBD5E1` | Focus/active borders |
| `--text-primary` | `#0F172A` | Headings, key numbers |
| `--text-secondary` | `#475569` | Body text, labels |
| `--text-tertiary` | `#94A3B8` | Hints, timestamps |
| `--primary` | `#2563EB` | Links, CTAs, active nav |
| `--primary-hover` | `#1D4ED8` | Button hover |
| `--primary-bg` | `#EFF6FF` | Selected/active highlight |
| `--status-safe` | `#16A34A` | On track (green) |
| `--status-safe-bg` | `#F0FDF4` | Safe tint |
| `--status-warn` | `#D97706` | Action needed (amber) |
| `--status-warn-bg` | `#FFFBEB` | Warning tint |
| `--status-critical` | `#DC2626` | Act now (red) |
| `--status-critical-bg` | `#FEF2F2` | Critical tint |

Dark mode: `--bg: #0F172A`, `--surface: #1E293B`, `--text-primary: #F1F5F9`, `--border: #334155`. Status colors unchanged. Use CSS custom properties, not `!important`.

### Typography
- System stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", sans-serif`
- Big countdown: 48px / bold / line-height 1.0 / `tabular-nums`
- Status number: 32px / bold / line-height 1.1
- Page title: 28px / bold
- Section heading: 20px / semibold
- Body: 16px / regular / line-height 1.6
- Label: 14px / medium
- Monospace data: `ui-monospace` / 14px

### Components
- **Status Card:** 1px border, 8px radius, shadow-sm, 3px left-border in status color. Hover: shadow-md. Unemployment card spans 2 cols.
- **Hero Countdown:** Centered 48px number + SVG progress ring (days used / total). Color transitions: 0-66% green, 67-88% amber, 89-100% red.
- **Navigation:** Top bar (logo + name left, lang/dark toggle right). Below: horizontal pill tabs for tools. Active: primary-bg + primary text.
- **Buttons:** Primary (primary bg, white text, 8px radius, 44px min-height). Secondary (transparent, primary text, 1px border).
- **Status Pill:** Full-round, 2px 10px padding, text-xs bold. Three variants: safe/warn/critical.
- **Form Input:** 1px border, 8px radius, 10px 14px padding. Focus: 2px primary border.
- **Disclaimer Banner:** surface-alt bg, AlertTriangle icon + text-xs tertiary. Bottom of every tool page.

### Layout
- Max-width: 1120px centered
- Page padding: 24px mobile / 32px tablet / 48px desktop
- Dashboard grid: 2 cols mobile / 3 cols tablet / 4 cols desktop
- Card padding: 20px mobile / 24px desktop
- Card gap: 16px mobile / 20px desktop
- Section gap: 32px vertical

### Shadows & Transitions
- shadow-sm: `0 1px 2px rgba(0,0,0,0.05)`
- shadow-md: `0 4px 6px rgba(0,0,0,0.07)`
- All transitions: 150ms ease-out on background-color, border-color, color, box-shadow, transform

### Responsive Breakpoints
- Mobile: < 640px (1-2 col, stacked)
- Tablet: 640-1023px (2-3 col)
- Desktop: 1024px+ (4 col, full nav)

### Icons (Lucide)
| Tool | Icon |
|------|------|
| Unemployment counter | `clock` |
| STEM OPT eligibility | `graduation-cap` |
| E-Verify | `building-2` |
| Timeline | `calendar-range` |
| Status wizard | `shield-check` |
| Reporting | `clipboard-list` |
| I-983 guide | `file-text` |
| Calendar export | `calendar-plus` |
| Language toggle | `languages` |
| Dark mode | `moon` / `sun` |
| Disclaimer | `alert-triangle` |

### Anti-AI Rules
1. No centered hero section — dashboard leads with status grid immediately
2. Left-aligned text throughout — only center countdown numbers
3. No gradients on buttons or backgrounds — solid colors only
4. Unemployment counter card is 2x wide (spans 2 cols), others 1x — asymmetric prominence
5. Varied spacing — 12px within cards, 32px between sections
6. Specific copy only — "67 of 90 days remaining" not "Track your status"
7. Every color communicates meaning — no decorative color
8. Sharp cards (8px) with fully-rounded status pills — deliberate contrast

---

## Steps

### Step 1: Project scaffolding
- Initialize npm project with package.json (name: gongyi, same devDeps as ShuiYi: esbuild, tailwindcss v4, @tailwindcss/cli, typescript, lucide)
- Create build.js (esbuild + Tailwind CLI, same pattern as ShuiYi)
- Create tsconfig.json (strict, es2020, dom)
- Create src/styles/main.css with Tailwind imports + CSS custom property definitions (all colors from Design Spec)
- Create manifest.json (PWA, name: "GongYi 工易", short_name: "GongYi")
- Create .gitignore (node_modules, dist)
- Verify: `npm install && npm run build` succeeds

### Step 2: App shell + router
- Create index.html with app shell: meta tags (viewport, charset, lang), Tailwind CSS link, app container div, script tag
- Include SEO meta (description, og:tags) in both EN/ZH
- Create src/app.ts with hash-based router (#dashboard, #unemployment, #stem-check, #everify, #timeline, #status-wizard, #reporting, #i983, #calendar)
- Build top nav bar: left side = app name "GongYi 工易" with logo, right side = language toggle (EN/中文) + dark mode toggle (moon/sun)
- Build horizontal pill tab navigation below nav bar for tool switching
- Default route: #dashboard
- Disclaimer footer on every page: "For informational purposes only. This is not legal advice."
- Verify: app loads, nav renders, routes switch content area

### Step 3: i18n system
- Create src/i18n.ts with all UI strings in {en, zh} format
- Implement language toggle: saves preference to localStorage, switches lang attribute on html element, re-renders current view
- Include ALL strings: nav labels, tool titles, descriptions, form labels, button text, status messages, disclaimers, error messages
- Verify: toggling language switches ALL visible text including disclaimers

### Step 4: Data layer
- Create src/data/stem-cip.ts: Parse DHS STEM Designated Degree Program List into a TypeScript array of {code: string, title: string, series: string} objects. Include all ~500 STEM-eligible CIP codes from the July 2024 list. Add a `STEM_LIST_LAST_UPDATED = '2024-07-23'` constant.
- Create src/data/rules.ts: OPT constants — unemployment limits (90/150 days), minimum work hours (20), application windows (90 days before / 60 days after), STEM extension window (90 days before expiration), grace period (60 days), reporting deadline (10 days), I-983 evaluation milestones (12mo, 24mo), cap-gap end date (April 1)
- Create src/data/wizard-questions.ts: Decision tree for "Am I in status?" wizard — questions about EAD validity, employment status, hours worked, reporting compliance, travel documents
- Create src/utils/storage.ts: localStorage wrapper with typed get/set/clear for employment periods, OPT dates, preferences
- Create src/utils/dates.ts: Date math helpers — daysBetween, addDays, isWithinWindow, formatDate (EN/ZH locale-aware)
- Verify: data imports correctly, no TypeScript errors

### Step 5: Dashboard home
- Build the dashboard at #dashboard route
- Render status card grid (responsive: 2/3/4 cols per breakpoint)
- Unemployment counter card: spans 2 columns, shows hero countdown number (days remaining), SVG progress ring, status color based on thresholds. If no data entered yet, show "Set up your tracker" CTA instead.
- Seven 1-column cards for remaining tools: icon + title + one-line description + status indicator (if applicable)
- Cards are clickable — navigate to tool route
- Status indicators update based on saved data (e.g., reporting checklist shows "3 of 7 items complete")
- Balanced grid: all rows complete, no empty trailing slots. On mobile (2 cols), unemployment card spans full width, remaining 7 cards fill 4 rows (7 cards = 3 full rows + 1 card in last row → add an "About" or "Resources" card to fill the grid)
- Verify: dashboard renders at 375px, 768px, 1024px with correct column counts

### Step 6: Unemployment day counter tool
- Build at #unemployment route
- **Setup form:** OPT type selector (Standard OPT / STEM OPT), EAD start date, EAD end date. Save to localStorage.
- **Employment periods:** Add/edit/delete employment entries (employer name, start date, end date or "current", hours per week, related to field of study yes/no). Stored in localStorage.
- **Calculation engine:**
  - Total days from EAD start to today (or EAD end, whichever is earlier)
  - Subtract days covered by qualifying employment (20+ hrs/week, related to field)
  - Result = unemployment days used
  - Limit = 90 (standard) or 150 (STEM)
  - Days remaining = limit - days used
- **Visual display:**
  - Hero countdown number (days remaining) with status color
  - SVG circular progress ring showing days used / total limit
  - Color thresholds: 0-66% green, 67-88% amber, 89-100% red
  - Timeline visualization showing employment periods as colored bars on a horizontal axis
  - Warning banner when < 15 days remaining
  - Critical banner when 0 days remaining
- **Edge cases:** Employment gaps, overlapping periods (merge), part-time < 20hrs flagged as non-qualifying, future dates handled
- **Rules reference:** Collapsible section explaining counting rules with citations to 8 CFR 214.2(f)(10)(ii)(E)
- Verify: enter test data, countdown calculates correctly, colors change at thresholds

### Step 7: STEM OPT eligibility checker
- Build at #stem-check route
- **CIP code search:** Text input with instant search (typeahead). Search by code number (e.g., "11.0101") or by title (e.g., "Computer Science"). Show matching results as a dropdown list.
- **Result display:** If CIP code is on the DHS STEM list → green status pill "STEM OPT Eligible" with the matched program title. If not → amber pill "Not on STEM List" with explanation of what this means.
- **Additional checks** (informational, after CIP match):
  - "Is your degree from a SEVP-certified school?" (yes/no)
  - "Is your employer enrolled in E-Verify?" (yes/no → links to E-Verify tool)
  - "Will your job be directly related to your STEM degree?" (yes/no)
  - Show summary: all-green = "You likely qualify for STEM OPT extension" / any-no = "You may not qualify — consult your DSO"
- **Data note:** Show "STEM list last updated: July 23, 2024" with link to ICE source
- Verify: search for "Computer Science" returns 11.0101, search for "English" returns no STEM match

### Step 8: E-Verify employer guidance
- Build at #everify route
- **Not a search tool** — we can't query E-Verify programmatically (no public API)
- **Instead, provide:**
  - Direct link to official E-Verify employer search: https://www.e-verify.gov/e-verify-employer-search
  - Step-by-step instructions with screenshots/descriptions of what to look for
  - Tips for common issues: company name variations, subsidiaries, multiple locations
  - What the results mean: "Active" = enrolled, check enrollment date
  - What to do if employer not found: ask HR, check parent company name, check DBA name
  - Why E-Verify matters for STEM OPT (required by regulation)
- **Checklist:** "Before accepting a STEM OPT position" — E-Verify enrolled, proper supervision, related to degree, 20+ hrs/week, commensurate compensation
- Verify: page renders with clear instructions and working external link

### Step 9: Timeline & deadline calculator
- Build at #timeline route
- **Input form:** Program end date, OPT start date, OPT type (Standard/STEM), STEM OPT start date (if applicable), H-1B petition filed? (yes/no + filing date)
- **Calculated dates** (displayed as a vertical timeline with markers):
  - OPT application window: [program end - 90 days] to [program end + 60 days]
  - OPT authorization period: [EAD start] to [EAD end]
  - STEM extension filing window: [OPT end - 90 days] to [OPT end]
  - 60-day grace period: [OPT end] to [OPT end + 60 days]
  - Cap-gap extension: if H-1B filed, [OPT end] to [April 1 of next FY]
  - Reporting deadlines: every 6 months from STEM OPT start (validation reports)
  - I-983 evaluations: 12 months and 24 months after STEM OPT start
- **Visual timeline:** Horizontal or vertical bar with date markers, color-coded by urgency (past = gray, upcoming = amber, future = blue)
- **Today marker:** Shows where "today" falls on the timeline
- **Alerts:** Flag any deadlines within 30 days in amber, within 7 days in red
- Save inputs to localStorage
- Verify: enter sample dates, timeline renders correctly, deadlines calculate properly

### Step 10: Status check wizard
- Build at #status-wizard route
- **Step-by-step questionnaire** — one question per screen with yes/no buttons:
  1. Do you have a valid EAD card? (If no → explain how to apply)
  2. Is today within your EAD authorization dates? (Auto-check if dates saved)
  3. Are you currently employed? (If no → check unemployment days)
  4. Is your employment 20+ hours per week? (If no → warn about unemployment accrual)
  5. Is your work related to your field of study? (If no → warn)
  6. Have you reported your current employer to your DSO? (If no → urgently recommend)
  7. Is your address up to date with your DSO? (If no → 10-day deadline warning)
  8. [STEM OPT only] Is your employer E-Verify enrolled? (If no → critical issue)
  9. [STEM OPT only] Do you have a current I-983 on file? (If no → required)
  10. Are you under 90/150 unemployment days? (Auto-check if data saved)
- **Result screen:** Overall status (green "Likely in status" / amber "Action needed" / red "Critical issues — contact DSO immediately") with list of specific issues found and recommended actions
- **Progress bar:** Shows step X of N
- Verify: complete wizard with all-yes (green result), complete with some-no (amber/red)

### Step 11: Reporting checklist
- Build at #reporting route
- **Interactive checklist** of all reportable events with deadlines:
  - [ ] Employment start — report within 10 days
  - [ ] Employment end — report within 10 days
  - [ ] Employer change — report within 10 days
  - [ ] Address change — report within 10 days (AR-11 + DSO)
  - [ ] Name change — report to DSO
  - [ ] Phone/email change — report to DSO
  - [ ] [STEM] 6-month validation report — every 6 months from STEM start
  - [ ] [STEM] 12-month self-evaluation — 10 days after 12-month mark
  - [ ] [STEM] 24-month final evaluation — 10 days after 24-month mark
  - [ ] [STEM] Material change to I-983 — report within 10 days
- **Each item:** Expandable with explanation of what to report, how (SEVP Portal + DSO), consequences of missing deadline
- **Deadline tracker:** If user enters STEM OPT start date, auto-calculate upcoming validation/evaluation dates and show countdown
- **Dual reporting reminder:** Prominent note that students must report to BOTH SEVP Portal AND their DSO separately
- Items checkable and saved to localStorage
- Verify: checklist renders, items toggle, STEM-specific items show/hide based on OPT type

### Step 12: I-983 Training Plan guide
- Build at #i983 route
- **Section-by-section guide** through Form I-983:
  - Section 1: Student Information (what to fill, where to find it)
  - Section 2: Student Certification (what you're agreeing to)
  - Section 3: Employer Information (what employer fills, E-Verify company ID)
  - Section 4: Training Plan Details (learning objectives tips, supervision plan, how to write goals)
  - Section 5: Employer Certification (what employer signs, what it means)
  - Evaluation pages: 12-month and 24-month evaluation requirements
- **Each section:** Collapsible accordion with field-by-field guidance, common mistakes, and tips
- **Learning objective templates:** Provide example frameworks: "Develop [skill] through [method] in the field of [STEM connection]"
- **Material changes list:** What changes require a new I-983 (employer change, job title change, hours change, location change, etc.)
- **Employer FAQ:** Answers to common employer concerns ("What is I-983?", "Am I liable?", "How much time does this take?")
- Link to official I-983 form PDF on ICE website
- Verify: all sections render, accordions expand/collapse, content is accurate per research

### Step 13: Calendar export
- Build at #calendar route
- Create src/utils/ics.ts: .ics file generator (VCALENDAR/VEVENT format)
- **Auto-generate events** based on saved data:
  - OPT expiration date (with 30-day and 7-day advance reminders)
  - STEM OPT filing deadline (90 days before OPT expiration)
  - Grace period end date
  - 6-month validation report deadlines (STEM OPT)
  - I-983 12-month evaluation deadline
  - I-983 24-month evaluation deadline
  - Cap-gap extension end date (if applicable)
- **Export options:**
  - "Download All Deadlines" — single .ics file with all events
  - Individual event download (click any deadline to download just that one)
- **Event format:** Summary in both EN/ZH, description includes what to do, VALARM reminders at 7 days and 1 day before
- If no dates saved yet, prompt user to fill in dates (link to Timeline tool)
- Verify: download .ics file, import into Apple Calendar or Google Calendar, events appear correctly

### Step 14: Dark mode
- Implement dark mode toggle (moon/sun icon in nav)
- Use CSS custom properties defined in Step 1 — swap values via `.dark` class on html element
- Dark values: bg #0F172A, surface #1E293B, text-primary #F1F5F9, border #334155
- Status colors (green/amber/red) stay the same — already readable on dark backgrounds
- Save preference to localStorage
- Respect system preference on first visit (`prefers-color-scheme: dark`)
- Verify: toggle works, all pages readable in dark mode, status colors have sufficient contrast

### Step 15: PWA + service worker + offline
- Create sw.js with cache-first strategy for static assets
- Register service worker in app.ts
- Cache: index.html, CSS, JS bundle, manifest, icons
- Offline fallback: app works fully offline (all data is local)
- Add to manifest.json: icons, theme_color, background_color, display: standalone
- Create assets/icons/ with 192x192 and 512x512 PNG icons
- Verify: app installs as PWA, works offline after first load

### Step 16: Deployment prep
- Create _headers file (security headers: CSP, X-Frame-Options, etc.)
- Create _redirects file (/* → /index.html 200 for SPA routing)
- Create robots.txt and sitemap.xml
- Create 404.html
- Production build: `NODE_ENV=production npm run build`
- Verify: dist/ contains all files, index.html loads from dist/

## Files to Create/Modify
- `package.json` — npm project config with build scripts
- `tsconfig.json` — TypeScript config (strict, es2020)
- `build.js` — esbuild + Tailwind build pipeline
- `index.html` — App shell, meta tags, container
- `manifest.json` — PWA manifest
- `sw.js` — Service worker
- `.gitignore` — node_modules, dist
- `_headers` — Security headers for Cloudflare Pages
- `_redirects` — SPA routing for Cloudflare Pages
- `robots.txt` — Search engine directives
- `sitemap.xml` — Site map
- `404.html` — 404 error page
- `src/styles/main.css` — Tailwind entry + CSS custom properties
- `src/app.ts` — Main app, router, nav
- `src/i18n.ts` — All bilingual strings
- `src/tools/unemployment.ts` — Unemployment day counter
- `src/tools/stem-check.ts` — STEM OPT eligibility checker
- `src/tools/everify.ts` — E-Verify employer guidance
- `src/tools/timeline.ts` — Timeline & deadline calculator
- `src/tools/status-wizard.ts` — Status check wizard
- `src/tools/reporting.ts` — Reporting checklist
- `src/tools/i983-guide.ts` — I-983 Training Plan guide
- `src/tools/calendar.ts` — Calendar export UI
- `src/data/stem-cip.ts` — STEM CIP code database
- `src/data/rules.ts` — OPT rules and constants
- `src/data/wizard-questions.ts` — Status wizard decision tree
- `src/utils/storage.ts` — localStorage wrapper
- `src/utils/dates.ts` — Date calculation helpers
- `src/utils/ics.ts` — .ics file generator
- `assets/icons/icon-192.png` — PWA icon 192x192
- `assets/icons/icon-512.png` — PWA icon 512x512

## Open Questions
None — research covered all domain questions. Build can proceed.
