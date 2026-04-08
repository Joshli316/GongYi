# GongYi 工易

Free, bilingual (EN/ZH) work authorization tracker for F-1 international students on OPT. Helps students count unemployment days, check STEM OPT eligibility, track reporting deadlines, and stay in compliance — without risking their immigration status.

## Tech Stack
- HTML/TypeScript single-page app
- Tailwind CSS v4 (CLI build)
- Lucide icons
- esbuild bundler
- Cloudflare Pages deployment
- PWA manifest for installability
- No server, no database, no user accounts — 100% client-side with localStorage

## Structure
```
GongYi/
├── index.html          # Entry point, app shell, nav container
├── plan.md             # Implementation plan
├── CLAUDE.md           # This file
├── manifest.json       # PWA manifest
├── build.js            # esbuild + Tailwind build script
├── sw.js               # Service worker for offline support
├── src/
│   ├── app.ts          # Main app logic, router, nav controller
│   ├── i18n.ts         # Bilingual strings (EN/ZH), toggle logic
│   ├── tools/
│   │   ├── unemployment.ts   # Unemployment day counter + visual countdown
│   │   ├── stem-check.ts     # STEM OPT eligibility checker (CIP lookup)
│   │   ├── everify.ts        # E-Verify employer search guidance
│   │   ├── timeline.ts       # OPT timeline & deadline calculator
│   │   ├── status-wizard.ts  # "Am I in status?" step-by-step questionnaire
│   │   ├── reporting.ts      # DSO reporting checklist with deadlines
│   │   ├── i983-guide.ts     # I-983 Training Plan section-by-section guide
│   │   └── calendar.ts       # .ics calendar export for key deadlines
│   ├── data/
│   │   ├── stem-cip.ts       # DHS STEM Designated CIP codes (~500 codes)
│   │   ├── rules.ts          # OPT rules, limits, deadlines as constants
│   │   └── wizard-questions.ts  # Status check wizard decision tree
│   ├── utils/
│   │   ├── storage.ts        # localStorage wrapper for saved data
│   │   ├── dates.ts          # Date calculation helpers
│   │   └── ics.ts            # .ics file generation utility
│   └── styles/
│       └── main.css          # Tailwind entry + custom CSS variables
├── assets/
│   └── icons/          # PWA icons (192x192, 512x512)
└── dist/               # Build output for deployment
```

## Entry Point
index.html

## Deployment
`wrangler pages deploy dist/`

## Conventions
- **Bilingual:** All user-facing strings go in i18n.ts. Keys are English, values are {en, zh} objects. Toggle switches ALL visible text.
- **Dashboard home:** Status cards with traffic-light indicators. Unemployment counter card spans 2 columns (hero position).
- **Tool pages:** Each tool renders into the main content area. Back button returns to dashboard.
- **Disclaimers:** Every tool output includes "For informational purposes only. This is not legal advice. Consult your DSO or an immigration attorney."
- **Tone:** Calm, authoritative, reassuring. "You have 67 days remaining" not "WARNING: Clock is ticking!" 6th-8th grade reading level.
- **Sources:** Every rule cites 8 CFR 214.2(f) or links to ICE/USCIS. Inline citations.
- **Privacy:** Zero server-side storage. localStorage for saved employment periods and preferences. No cookies. No analytics.
- **Accessibility:** WCAG AA contrast, keyboard navigation, ARIA labels, 44px touch targets, lang attribute switches on toggle.
- **Status colors:** Green (safe/on-track), Amber (warning/action-needed), Red (critical/act-now). Colors always convey meaning, never decoration.
- **Numbers:** Use tabular-nums for all counters. Big countdown numbers for unemployment days.
- **Data accuracy:** CIP code list based on DHS STEM Designated Degree Program List (July 2024 version). Include "last updated" date in the app.
