# GongYi 工易 — Design Document

## Problem Statement
International students on F-1 OPT have no free tool to track unemployment days, check STEM OPT eligibility, verify E-Verify employers, or manage reporting deadlines — miscounting means losing immigration status.

## Target Users
- F-1 international students on post-completion OPT (primarily Chinese nationals, the largest F-1 population at ~290,000)
- Ages 22-30, recent graduates
- High stress about immigration compliance
- Need bilingual (EN/ZH) support
- Many use mobile devices as primary screen

## User Journey
1. **Discovery:** Student hears about GongYi from a friend, WeChat group, or university DSO referral
2. **First visit:** Sees dashboard with empty state cards. Prompted to set up their OPT dates.
3. **Setup:** Enters OPT type (Standard/STEM), EAD dates, and first employment period. Takes ~2 minutes.
4. **Daily use:** Opens app to check unemployment day countdown. Glances at dashboard status indicators.
5. **Event-driven use:** When changing jobs, moving, or approaching a deadline — uses specific tools (reporting checklist, timeline calculator, calendar export).
6. **Periodic use:** Runs status check wizard before travel or DSO appointments to make sure everything is in order.

## What This Product Is
- A free, bilingual compliance dashboard for F-1 OPT students
- An educational tool that explains OPT rules with citations
- A calculator for unemployment days, deadlines, and eligibility
- A .ics calendar export tool for key immigration deadlines
- A checklist for DSO reporting requirements
- A guide to the I-983 Training Plan form
- 100% client-side — no accounts, no servers, no data leaves the browser

## What This Product Is NOT
- Not legal advice — every screen says so
- Not a replacement for DSO consultation
- Not a USCIS case tracker (existing tools do this well)
- Not a job board or employer database
- Not an E-Verify search engine (we link to the official tool)
- Not a form filler (we guide, not generate I-983 or I-765)
- Not a paid service — free forever, no premium tier

## Key Design Rationale

### Why "Mission Control" aesthetic?
Students managing OPT are anxious. A compliance dashboard with clear status indicators (green/amber/red) reduces anxiety by making the invisible visible. "You have 67 days remaining" is more calming than "Are you tracking your days?"

### Why client-side only?
Immigration data is extremely sensitive. Students won't trust a random website with their employment history and visa dates. localStorage means zero risk of data breaches. It also means zero server costs.

### Why bilingual?
Chinese nationals are the largest F-1 population in the US (~290,000 students). No existing OPT tracking tool offers Chinese language support. This is the single biggest competitive gap.

### Why not E-Verify search?
E-Verify has no public API and restricts automated access. Instead of building a fragile scraper, we link to the official tool and provide step-by-step guidance on how to use it effectively.

### Why embed CIP codes instead of querying an API?
The DHS STEM list is ~500 codes that change ~1-2 times per year. Embedding as static data means instant search, offline support, and no API dependency. We include a "last updated" date so users know the data freshness.

### Why .ics export instead of Google Calendar API?
.ics files work with every calendar app (Google, Apple, Outlook) without OAuth integration. No accounts needed. Simpler, more universal, more private.

## Competitive Position
| Feature | GongYi | TrackMyOPT | GoElite | TrackUS |
|---------|--------|------------|---------|---------|
| Free | Yes | Freemium | Yes (iOS only) | Yes |
| Bilingual EN/ZH | Yes | No | No | No |
| Unemployment counter | Yes | Yes (basic) | No | Yes |
| STEM CIP checker | Yes | No | No | No |
| I-983 guide | Yes | No | No | No |
| Calendar export | Yes | No | Yes | No |
| Reporting checklist | Yes | No | No | No |
| Status wizard | Yes | No | Yes (basic) | No |
| Privacy-first | Yes | No (account) | No (account) | Yes |
| Web + mobile | PWA | Web + Chrome ext | iOS only | Web |
| Open source | Possible | No | No | Yes |
