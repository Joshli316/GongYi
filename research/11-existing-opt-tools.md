# Existing OPT Tracking Tools & Competitive Landscape

> Market analysis of tools, apps, and resources that help F-1 students manage OPT -- covering what exists, what works, what's broken, and what's missing.

---

## 1. Dedicated OPT Tracking Platforms

### TrackMyOPT (trackmyopt.com)

The most feature-complete dedicated OPT tool on the market, trusted by 2,500+ students from Carnegie Mellon, Stanford, MIT, and Harvard.

| Feature | Free Plan | Pro ($4.99/mo) | Dedicated ($14.99/mo) |
|---|---|---|---|
| OPT timeline calculator | Yes | Yes | Yes |
| 90-day unemployment tracker | Yes | Yes | Yes |
| STEM extension calculator | Yes | Yes | Yes |
| USCIS case tracking | 1 case | Unlimited | Unlimited |
| Daily automated reminders | No | Yes | Yes |
| Job CRM (kanban board) | No | Yes | Yes |
| AI resume generation | No | No | 1,000/month |
| Monthly lawyer consultation | No | No | 1 hour/month |

Also offers a Chrome extension with a live unemployment clock, USCIS checklists, and one-click job saving. Database of 25,000+ verified H-1B employers.

**Strengths:** Comprehensive feature set, freemium model, browser extension.
**Weaknesses:** English-only. Paid tiers required for most useful features (reminders, job CRM). No bilingual support for Chinese students.

Source: [TrackMyOPT](https://www.trackmyopt.com/)

---

### Optimize by GoElite (iOS app)

Free iOS app launched January 2026. The newest entrant in the space.

**Key features:**
- OPT planner supporting all degree levels (Associate through Doctorate)
- Personalized timelines with automatic date-rule application (e.g., 60-day application window)
- Calendar integration -- exports milestones directly to personal calendars
- Extension of status check to prevent accidental violations
- USCIS case tracker for up to 4 cases simultaneously (ad-free, real-time via USCIS APIs)
- Immigration & industry news feed (layoffs, policy changes)

**Strengths:** Completely free. Calendar integration is unique. Clean UX.
**Weaknesses:** iOS only (no Android or web). No unemployment day counter. No bilingual support. No STEM OPT I-983 tracking.

Source: [GoElite Optimize](https://goelite.com/blogs/optimize-opt-tool)

---

### OPT/STEM OPT Unemployment Tracker (trackus.vercel.app)

Open-source Vue.js app. Privacy-first design -- all data stored locally in the browser.

**Key features:**
- Visual timeline of employment history
- OPT and STEM OPT unemployment day tracking
- Warnings when approaching limits
- No account required, no data sent to servers

**Strengths:** Open source. Privacy-first. Free. No signup friction.
**Weaknesses:** Minimal features beyond the counter. No USCIS case tracking. No deadline reminders. No mobile app. Basic UI.

Source: [TrackUS](https://trackus.vercel.app/)

---

## 2. Crowdsourced Processing Time Trackers

### OPT Timeline (opttimeline.com)

Community-driven platform that aggregates USCIS case data from users to show processing trends.

**Key features:**
- Status graphs showing current USCIS lockbox processing speed (updated every few hours)
- Receipt-date processing graph showing which dates are being worked on
- Card shipping timeline (approval to USPS delivery)
- Individual case status lookup

**Strengths:** Real-time crowdsourced data reduces anxiety. Helps set realistic expectations.
**Weaknesses:** Only tracks EAD processing. No unemployment tracking, no compliance features, no deadline management.

Source: [OPT Timeline](https://opttimeline.com/)

---

### OPTnation Tracker (optnation.com/opt-tracker)

Forum-based platform where applicants share OPT application statuses and experiences.

**Key features:**
- Crowdsourced timeline tracking from submission to EAD receipt
- Processing time estimates based on community data
- Discussion forums for Q&A

**Strengths:** Community support reduces isolation and anxiety.
**Weaknesses:** Data quality depends on user participation. Not a real tracking tool -- more of a forum. No automated features.

Source: [OPTnation](https://www.optnation.com/opt-tracker/)

---

### VisaGrader (visagrader.com)

Aggregates published government data (State Department visa bulletin, USCIS processing times, issuance/refusal statistics).

**Key features:**
- Comparative processing time analysis across visa types
- Trend graphs showing how processing times change over time
- Service request filing for delays

**Strengths:** Uses official government data. Covers many visa types beyond OPT.
**Weaknesses:** Not OPT-specific. No unemployment tracking. Read-only dashboard.

Source: [VisaGrader](https://visagrader.com/uscis-processing-times/opt-ead)

---

## 3. Government Tools

### SEVP Portal (sevp.ice.gov/opt)

The official government portal for F-1 students on post-completion OPT and STEM OPT.

**What students can do:**
- View OPT authorization terms
- Update physical address and phone number
- Add/remove employers and employment information (standard OPT only)
- Edit existing employer details (STEM OPT -- cannot add new employers)

**What students cannot do:**
- Track unemployment days (counter is in SEVIS, not exposed to students in real time)
- Set reminders or receive deadline alerts
- Submit I-983 forms
- View their own SEVIS unemployment counter directly

**Critical limitations:**
- Data entered goes to SEVIS immediately, but SEVIS-to-portal sync happens only once per day
- STEM OPT students cannot add new employers (DSO must do this after I-983 verification)
- If a student misses the 10-day reporting window, the system blocks updates
- Schools discourage relying solely on the portal -- students must also report to their DSO separately
- Portal information can sometimes be incorrect, potentially causing future problems

Source: [Study in the States](https://studyinthestates.dhs.gov/sevp-portal-help/getting-started/sevp-portal-overview)

---

### SEVIS Unemployment Counter

Built into SEVIS (the backend system), not directly accessible to students. DSOs can view it. Students can sometimes see it through their school's portal.

- Tracks days without a reported employer in SEVIS
- Automated -- every day without an employer logged counts
- No student-facing dashboard or alerts

Source: [Study in the States - Unemployment Counter](https://studyinthestates.dhs.gov/sevis-help-hub/student-records/fm-student-employment/unemployment-counter)

---

## 4. University-Provided Tools

### University OPT Timeline Calculators

Several universities provide simple web calculators:

| University | Tool | What It Does |
|---|---|---|
| UPenn ISSS | [OPT Calculator](https://global.upenn.edu/isss/opt-calculator/) | Calculates post-completion OPT timeline based on graduation date |
| Interstride (used by 100+ schools) | OPT Calculator | Finds ideal OPT start date and application deadline |
| UCLA International Center | OPT Workshop | Online workshop with timeline guidance |

**Common pattern:** Universities provide static calculators and workshop materials, not ongoing tracking tools. Once a student graduates and leaves campus, they lose access to most institutional support.

Source: [UPenn ISSS](https://global.upenn.edu/isss/opt-calculator/), [Interstride](https://www.interstride.com/)

---

## 5. Browser Extensions

| Extension | Platform | Features | Limitations |
|---|---|---|---|
| OPT Clock Tracker | Chrome | Basic OPT timeline tracking | Minimal features, 1 developer, open source on GitHub |
| USCIS Case Status Checker | Chrome | Auto-fills receipt number on USCIS site, saves multiple cases locally | Only checks case status, no OPT-specific features |
| glancejobs LinkedIn OPT Checker | Chrome | Highlights companies accepting EAD on LinkedIn | Job search only, no compliance tracking |
| TrackMyOPT Extension | Chrome | Live unemployment clock, USCIS checklists, one-click job saving | Requires TrackMyOPT account for full features |

Source: [Chrome Web Store](https://chromewebstore.google.com/detail/opt-clock-tracker/ecbjeifepemahjlopahjpkkhoclpclmc)

---

## 6. Open-Source Projects on GitHub

| Project | Tech | Stars | Description |
|---|---|---|---|
| [OPT-Case-Tracker](https://github.com/AayushGithub/OPT-Case-Tracker) | Python | 1 | Scrapes USCIS for case statuses; shows approval/denial/pending stats with matplotlib charts |
| [OPT-Clock-Tracker](https://github.com/rao-dhruv/OPT-Clock-Tracker) | JS (Chrome ext) | Low | Basic Chrome extension for OPT timeline |
| [opt-processing-times-analysis](https://github.com/linanqiu/opt-processing-times-analysis) | Python/Jupyter | Low | Data analysis of I-765 processing times |
| [F1Startup](https://github.com/forrestbao/F1Startup) | Docs | Low | Guide for F-1 students starting companies on OPT |
| TrackUS (trackus.vercel.app) | Vue.js | Low | Privacy-first unemployment day tracker |

**Assessment:** The open-source ecosystem is extremely thin. No project has significant traction (stars, forks, contributors). Most are single-developer side projects.

---

## 7. Bilingual / Chinese-Language Resources

### SEVIS Savvy (sevissavvy.com)

AI-powered platform endorsed by Duke, Purdue, and SUNY Oswego. Provides guidance in **English, Korean, and Mandarin Chinese**.

**Key features:**
- AI-powered CPT/OPT/STEM OPT eligibility checker (ChatGPT integration)
- Blog posts in Chinese covering OPT topics
- Consultation booking

**Strengths:** Trilingual. AI eligibility checker is novel.
**Weaknesses:** Informational only -- no tracking, no counters, no reminders. Blog-style content, not an app.

Source: [SEVIS Savvy](https://sevissavvy.com/)

---

## 8. Commercial Immigration Platforms (Attorney/Enterprise)

These are built for law firms and employers, not individual students:

| Platform | Pricing | Target User |
|---|---|---|
| Docketwise | $69-$119/user/month | Immigration law firms |
| eimmigration | From $55/user/month | Law firms, nonprofits |
| CampLegal | From $80/user/month | Law firms |
| AILaw.ai | $3,000/year + $99 setup | Law firms |
| Lista.io | From $20/user/month | Immigration workflows |
| Boundless | Enterprise pricing | Corporate HR/legal teams |
| Interstride | Institutional licensing | University career centers |

**Key insight:** These platforms manage hundreds of cases for organizations. None are designed for individual F-1 students managing their own OPT. The pricing alone ($55-$119/month) makes them inaccessible to students.

Sources: [eimmigration](https://get.eimmigration.com/blog/best-immigration-software-for-law-firms-in-2025-the-complete-comparison-guide), [Docketwise](https://www.docketwise.com/)

---

## 9. Spreadsheet Templates

No OPT-specific spreadsheet templates were found in the research. Students are commonly advised by university ISS offices to "track unemployment days on a simple spreadsheet or calendar" and save resignation/start date emails as proof. Generic job application tracker templates exist on Google Sheets (from Jobscan, BeamJobs, SpreadsheetPoint), but none address OPT-specific fields like:

- Unemployment day counter
- EAD start/end dates
- I-983 validation deadlines (6/12/18/24 months)
- SEVP Portal reporting deadlines
- Grace period tracking

---

## 10. User Pain Points (Synthesized from Research)

### High-anxiety pain points:
1. **Unemployment day uncertainty** -- Students cannot directly see their SEVIS unemployment counter in real time. They must track it themselves or ask their DSO.
2. **10-day reporting deadline** -- If you miss the 10-day window to report employer changes, the SEVP Portal blocks updates. This can spiral into status termination.
3. **ICE enforcement warnings** -- As of 2025-2026, ICE is sending formal alerts to students with 90+ days of unreported employment, giving only 15 days to respond before SEVIS termination.
4. **STEM OPT I-983 complexity** -- Validations due at 6, 12, 18, and 24 months. No tool tracks these automatically.
5. **Dual reporting burden** -- Students must update both the SEVP Portal AND their school's DSO. Updating one does not update the other.

### Procedural confusion:
6. **30-day post-graduation window** -- Students have just 30 days after degree completion to act, creating enormous pressure.
7. **Part-time work ambiguity** -- Whether volunteer work, 1099 contracts, or part-time roles "count" as employment is poorly understood.
8. **STEM OPT employer restrictions** -- Students cannot add new employers themselves; DSO must do it after I-983 review.

### Tool frustration:
9. **SEVP Portal data lag** -- Updates from SEVIS appear in the portal only the next day, creating confusion about whether changes were saved.
10. **No single source of truth** -- Information is scattered across SEVP Portal, school portals, USCIS case status page, personal spreadsheets, and DSO emails.

---

## 11. Gap Analysis: What's Missing in the Market

| Unmet Need | Closest Existing Tool | Gap |
|---|---|---|
| **Real-time unemployment day counter with warnings** | TrackMyOPT (basic), TrackUS (local only) | No tool connects to actual SEVIS data; all require manual input. No push notifications for approaching limits. |
| **Bilingual (English/Chinese) OPT dashboard** | SEVIS Savvy (blog only) | No tracking tool supports Chinese. Chinese students are the largest F-1 population (~290,000). |
| **I-983 validation deadline tracker** | None | No tool tracks the 6/12/18/24-month I-983 validation schedule or sends reminders. |
| **10-day reporting deadline alerts** | None | No tool warns students that they have X days left to report an employer change before the portal locks them out. |
| **Unified compliance dashboard** | None | No single tool combines unemployment counter + employer reporting + USCIS case status + I-983 deadlines + grace period tracking. |
| **Offline-first / privacy-first mobile app** | TrackUS (web only) | No mobile app stores data locally. GoElite Optimize is iOS-only and lacks unemployment tracking. |
| **DSO-student shared view** | SEVP Portal (one-way) | No tool lets students and DSOs see the same compliance dashboard. |
| **Post-OPT transition planning** | TrackMyOPT (H-1B database) | No tool maps the full OPT-to-H1B-to-green-card timeline with decision points. |
| **Free, open-source, comprehensive tool** | TrackUS (minimal) | Nothing remotely close to a full-featured open-source OPT management tool exists. |
| **Android app** | None with full features | GoElite Optimize is iOS-only. TrackMyOPT is web + Chrome extension. No dedicated Android app. |

---

## 12. Key Takeaways

1. **The market is fragmented.** No single tool covers the full OPT compliance lifecycle. Students cobble together 3-5 tools (SEVP Portal + university calculator + spreadsheet + TrackMyOPT + OPT Timeline).

2. **Chinese-language support is virtually nonexistent** in tracking tools, despite Chinese nationals being the single largest F-1 student population in the United States.

3. **The SEVP Portal is necessary but insufficient.** It handles basic reporting but provides no proactive alerts, no unemployment counter visibility, and no deadline tracking.

4. **No tool tracks I-983 deadlines.** This is a critical STEM OPT compliance requirement that every student must manage manually.

5. **The open-source ecosystem is empty.** Every GitHub project has fewer than 5 stars. There is no community-maintained OPT tool.

6. **Privacy is undervalued.** Most tools require accounts and store immigration data on external servers. Only TrackUS keeps data local, but it lacks features.

7. **Commercial tools are priced for institutions, not students.** The gap between free (limited) and paid ($55+/month for law firm tools) is enormous.

8. **Mobile coverage is weak.** One iOS-only app (GoElite Optimize). Zero Android-native apps. No offline-capable progressive web apps.

9. **Post-2025 enforcement changes make tracking more urgent.** ICE is actively sending termination warnings. The stakes of poor tracking have increased.

10. **A free, bilingual, privacy-first OPT compliance tool would have no direct competitor.**

---

## Sources

- [TrackMyOPT](https://www.trackmyopt.com/)
- [GoElite Optimize](https://goelite.com/blogs/optimize-opt-tool)
- [TrackUS](https://trackus.vercel.app/)
- [OPT Timeline](https://opttimeline.com/)
- [OPTnation Tracker](https://www.optnation.com/opt-tracker/)
- [VisaGrader](https://visagrader.com/uscis-processing-times/opt-ead)
- [SEVP Portal Overview](https://studyinthestates.dhs.gov/sevp-portal-help/getting-started/sevp-portal-overview)
- [SEVIS Unemployment Counter](https://studyinthestates.dhs.gov/sevis-help-hub/student-records/fm-student-employment/unemployment-counter)
- [UPenn ISSS OPT Calculator](https://global.upenn.edu/isss/opt-calculator/)
- [SEVIS Savvy](https://sevissavvy.com/)
- [Interstride](https://www.interstride.com/)
- [OPT Case Tracker (GitHub)](https://github.com/AayushGithub/OPT-Case-Tracker)
- [OPT Clock Tracker (Chrome)](https://chromewebstore.google.com/detail/opt-clock-tracker/ecbjeifepemahjlopahjpkkhoclpclmc)
- [ICE OPT Warnings](https://www.santoslloydlaw.com/ice-issues-opt-warnings-to-f-1-students-for-unreported-employment)
- [USCIS OPT Page](https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students)
- [Study in the States](https://studyinthestates.dhs.gov/sevis-help-hub/student-records/fm-student-employment/f-1-optional-practical-training-opt)
- [Docketwise](https://www.docketwise.com/)
- [eimmigration](https://get.eimmigration.com/blog/best-immigration-software-for-law-firms-in-2025-the-complete-comparison-guide)
- [NAFSA Unemployment Guidance](https://www.nafsa.org/regulatory-information/guidance-unemployment-during-opt)
- [F-1 Visa 2026 Changes](https://immigrationfleet.com/articles/f-1-student-visa-2026-major-changes-to-duration-of-status-opt-deadlines-and-what-every-international-student-must-know/)
