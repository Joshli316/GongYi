# Data Sources for OPT Tracking Tool

**Research Report #12 — CIP Codes, E-Verify, Government APIs & Open Data**
Date: 2026-04-07

---

## 1. DHS STEM Designated Degree Program List

The Department of Homeland Security maintains the authoritative list of CIP codes that qualify for the 24-month STEM OPT extension.

| Attribute | Detail |
|-----------|--------|
| **Current version** | 2024 (effective July 23, 2024) |
| **Format** | PDF only |
| **Download URL** | https://www.ice.gov/sites/default/files/documents/stem-list.pdf |
| **Versioned URL** | https://www.ice.gov/doclib/sevis/pdf/stemList2024.pdf |
| **Update frequency** | Ad hoc (no fixed schedule). Updates published via Federal Register notice. Recent cadence: 2022, 2023, 2024. |
| **Notification channel** | Federal Register + ICE SEVP Broadcast Messages |
| **Content** | CIP code (XX.XXXX format), program title, two-digit CIP series |
| **Machine-readable?** | No. PDF requires parsing/OCR. |

**Update history:**

- 2022: 22 new CIP codes added
- 2023: 8 fields added
- 2024: 1 field added (Environmental/Natural Resource Economics, CIP 03.0204)

**For the OPT tool:** Parse the PDF into a structured JSON/CSV lookup table. Monitor the Federal Register API (see Section 8) for updates containing "STEM Designated Degree Program List."

Sources:
- [ICE STEM List PDF](https://www.ice.gov/sites/default/files/documents/stem-list.pdf)
- [Study in the States — Eligible CIP Codes](https://studyinthestates.dhs.gov/stem-opt-hub/additional-resources/eligible-cip-codes-for-the-stem-opt-extension)
- [Federal Register Notice (July 2024)](https://www.federalregister.gov/documents/2024/07/23/2024-16127/update-to-the-department-of-homeland-security-stem-designated-degree-program-list)

---

## 2. CIP Code Database (NCES)

The Classification of Instructional Programs (CIP) is the national taxonomy for all instructional programs at postsecondary institutions. Managed by the National Center for Education Statistics (NCES).

| Attribute | Detail |
|-----------|--------|
| **Current version** | CIP 2020 |
| **Browse/search** | https://nces.ed.gov/ipeds/cipcode/ |
| **Download formats** | Text file (pipe-delimited), Excel crosswalk |
| **Resources page** | https://nces.ed.gov/ipeds/cipcode/resources.aspx?y=55 |
| **Historical versions** | 1985, 1990, 2000, 2010 (all on Resources page) |
| **Structure** | 3 levels: 2-digit series, 4-digit subseries, 6-digit specific program |
| **Total codes** | ~1,800 six-digit CIP codes |

**STEM vs Non-STEM classification:**

NCES itself does not officially label codes as "STEM" vs "non-STEM" in the CIP taxonomy. The STEM designation comes from two sources:

1. **DHS STEM Designated Degree Program List** (Section 1 above) — the definitive list for OPT purposes
2. **Washington State Open Data** — a machine-readable dataset with STEM and high-demand indicators for every CIP code, available in CSV, JSON, and XML at https://data.wa.gov/education/Classification-of-Instructional-Program-CIP-codes-/4x32-48q5

**For the OPT tool:** Download the NCES CIP text file for the full taxonomy. Cross-reference with the DHS STEM list to build a `cip_codes` table with columns: `cip_code`, `title`, `description`, `is_stem_opt_eligible`. Use the Washington State dataset as a supplementary reference for broader STEM classification.

Sources:
- [NCES CIP User Site](https://nces.ed.gov/ipeds/cipcode/)
- [NCES CIP Resources](https://nces.ed.gov/ipeds/cipcode/resources.aspx?y=55)
- [Washington State CIP STEM Dataset (data.gov)](https://catalog.data.gov/dataset/classification-of-instructional-program-cip-codes-with-stem-and-high-demand-indicators)

---

## 3. E-Verify Employer Database

E-Verify enrollment is required for employers of STEM OPT workers. The public search tool is the primary data source.

| Attribute | Detail |
|-----------|--------|
| **Search URL** | https://www.e-verify.gov/e-verify-employer-search |
| **Update frequency** | Daily at ~2:00 AM ET |
| **API available?** | No public API |
| **Bulk download?** | No. The data.gov E-Verify dataset is marked "restricted" with no downloadable files |
| **Data fields** | Company name, DBA name, account status (enrolled/terminated), enrollment date, termination date, workforce size (5+ employees), hiring site count, hiring site states |

**Practical access strategies:**

1. **Web scraping** — The search tool is browser-based. Scraping is technically feasible but check terms of service. Rate-limit requests to avoid blocks.
2. **FOIA request** — Submit a FOIA request to USCIS for a bulk extract of E-Verify employer enrollment data.
3. **Third-party aggregators** — Sites like MyVisaJobs maintain scraped E-Verify databases updated quarterly.
4. **Cross-reference with DOL data** — The H-1B LCA disclosure data (Section 9) includes employer names that are highly correlated with E-Verify enrollment.

**For the OPT tool:** Build a local cache by scraping the search tool for known employer names. Supplement with DOL LCA employer data. Provide a "check employer" feature that queries the E-Verify search in real time for individual lookups.

Sources:
- [E-Verify Employer Search](https://www.e-verify.gov/e-verify-employer-search)
- [E-Verify Data Page](https://www.e-verify.gov/about-e-verify/e-verify-data)
- [E-Verify on data.gov](https://catalog.data.gov/dataset/e-verify)

---

## 4. USCIS Processing Times Data

| Attribute | Detail |
|-----------|--------|
| **Current times** | https://egov.uscis.gov/processing-times/ |
| **Historical data** | https://egov.uscis.gov/processing-times/historic-pt |
| **Fact sheet** | FY2016-FY2024 historical median processing times (PDF) |
| **Data formats** | CSV (small files ~3.55 KB), PDF fact sheets |
| **Form of interest** | I-765 (Employment Authorization Document / OPT) |
| **Current OPT processing** | ~90-120 days typical; delays of 6+ months reported in early 2026 |
| **API available?** | No dedicated processing times API. The USCIS Case Status API (see Section 8) tracks individual cases, not aggregate times. |

**I-765 specific data:** USCIS publishes quarterly reports on pending I-765 petitions by days pending, broken out by EAD category. Available at https://www.uscis.gov/tools/reports-and-studies/immigration-and-citizenship-data.

**For the OPT tool:** Scrape the processing times page periodically (weekly) and store historical snapshots. Display trend charts showing processing time changes over time for I-765 at each service center.

Sources:
- [USCIS Processing Times](https://egov.uscis.gov/processing-times/)
- [USCIS Historical Processing Times](https://egov.uscis.gov/processing-times/historic-pt)
- [USCIS Immigration Data](https://www.uscis.gov/tools/reports-and-studies/immigration-and-citizenship-data)

---

## 5. Federal Register Rules (8 CFR 214.2(f))

The core regulation governing OPT and STEM OPT is 8 CFR 214.2(f), with the 2016 STEM OPT final rule as the most significant recent rulemaking.

| Document | URL |
|----------|-----|
| **Current regulation text** | https://www.ecfr.gov/current/title-8/chapter-I/subchapter-B/part-214/subpart-A/section-214.2 |
| **2016 STEM OPT Final Rule** | https://www.federalregister.gov/documents/2016/03/11/2016-04828 |
| **NAFSA annotated version** | https://www.nafsa.org/regulatory-information/8cfr2142f |
| **USCIS Policy Manual Ch. 5** | https://www.uscis.gov/policy-manual/volume-2-part-f-chapter-5 |

**Key regulatory provisions for the tool:**

- 12-month initial OPT, 24-month STEM extension (max 2 lifetime STEM extensions)
- 90-day unemployment limit (initial OPT) / 150-day limit (STEM OPT)
- Employer must be E-Verify enrolled for STEM OPT
- I-983 Training Plan required
- 6-month validation reporting
- 10-day reporting window for address/employer changes
- Cap-gap provisions for H-1B transition

Sources:
- [eCFR 8 CFR 214.2](https://www.ecfr.gov/current/title-8/chapter-I/subchapter-B/part-214/subpart-A/section-214.2)
- [2016 STEM OPT Final Rule](https://www.federalregister.gov/documents/2016/03/11/2016-04828)
- [USCIS OPT Page](https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students)

---

## 6. ICE SEVP Guidance Documents

SEVP publishes policy guidance and broadcast messages that affect OPT rules and procedures.

| Resource | URL |
|----------|-----|
| **What's New page** | https://www.ice.gov/sevis/whats-new |
| **SEVP governing regulations** | https://www.ice.gov/sevis/schools/reg |
| **Study in the States hub** | https://studyinthestates.dhs.gov/ |
| **Practical training overview** | https://www.ice.gov/sevis/practical-training |
| **SEVP Portal (student OPT)** | https://sevp.ice.gov/opt/ |
| **Broadcast message format** | PDF, posted at ice.gov/doclib/sevis/pdf/bcmYYMM-NN.pdf |

**Recent guidance (2025-2026):**

- **May 2025:** SEVP emailed F-1 OPT students who had not reported employment, giving 15-day deadline to update
- **August 2025:** New USCIS OPT processing policy effective Aug 19, 2025
- **December 2025:** Updated photo/biometrics policy — post-Dec 15 OPT applicants may need in-person biometrics
- **March 2026:** SEVP email box decommissioning; new address SEVP@ice.dhs.gov

**For the OPT tool:** Monitor the "What's New" page and broadcast message URLs for policy changes. Display relevant alerts to users. Parse broadcast message PDFs for OPT-related content.

Sources:
- [ICE SEVP What's New](https://www.ice.gov/sevis/whats-new)
- [Study in the States — OPT](https://studyinthestates.dhs.gov/sevis-help-hub/student-records/fm-student-employment/f-1-optional-practical-training-opt)
- [SEVP Portal](https://sevp.ice.gov/opt/)

---

## 7. NCES CIP Code Resources (Deep Dive)

Beyond the basic CIP taxonomy, NCES provides several resources useful for building a comprehensive program database.

| Resource | Format | URL |
|----------|--------|-----|
| **CIP 2020 full taxonomy** | Text (pipe-delimited) | Resources page download |
| **CIP 2020 Introduction** | PDF (33 pages) | https://nces.ed.gov/ipeds/cipcode/Files/2020_CIP_Introduction.pdf |
| **CIP crosswalk (2010 to 2020)** | Excel | Resources page download |
| **CIP Help Document** | PDF | https://nces.ed.gov/ipeds/cipcode/Files/CIP_Help_Document_2020.pdf |
| **IPEDS Completions data** | CSV | IPEDS data download center |
| **CIP STEM list (NCES hosted)** | PDF | https://nces.ed.gov/ipeds/cipcode/Files/stem-cip-codes2021.pdf |

**CIP code structure:**
```
XX       = Two-digit series (e.g., 11 = Computer and Information Sciences)
XX.XX    = Four-digit subseries (e.g., 11.01 = Computer and Information Sciences, General)
XX.XXXX  = Six-digit specific program (e.g., 11.0101 = Computer and Information Sciences, General)
```

**For the OPT tool:** Download the pipe-delimited text file and parse into a database table. Include the 2010-to-2020 crosswalk so users with older program codes can find their updated CIP code.

Sources:
- [NCES CIP Resources](https://nces.ed.gov/ipeds/cipcode/resources.aspx?y=55)
- [NCES CIP Browse](https://nces.ed.gov/ipeds/cipcode/browse.aspx?y=56)

---

## 8. Government APIs Related to Immigration Data

### Available APIs

| API | Provider | Auth Required | Format | URL |
|-----|----------|---------------|--------|-----|
| **Case Status API** | USCIS | Yes (API key + org verification) | JSON | https://developer.uscis.gov/api/case-status |
| **FOIA Request API** | USCIS | Yes (same portal) | JSON | https://developer.uscis.gov/api/foia-request-and-status |
| **Federal Register API** | NARA | No (public) | JSON, CSV | https://www.federalregister.gov/developers/documentation/api/v1 |
| **eCFR API** | GPO | No (public) | XML, JSON | https://www.ecfr.gov/developer/documentation/api/v1 |

### USCIS Developer Portal Details

- **Portal URL:** https://developer.uscis.gov/
- **Registration:** Must be a US-incorporated software development organization
- **Requirements:** Section 508 compliance, privacy policy, Form G-1595 for production access
- **Sandbox:** Available for testing before production approval
- **Rate limits:** Not publicly documented; shared upon production access approval

### Federal Register API (Most Useful)

The Federal Register API is free, requires no API key, and supports powerful search. Key capabilities:

- Search documents by agency (e.g., DHS, USCIS), keyword, CFR citation, date range
- Returns full text, metadata, PDF links in JSON format
- Pagination: up to 2,000 results per query; use date filters for larger sets
- Can monitor for new OPT/STEM OPT rules automatically

**Example query for OPT rules:**
```
GET https://www.federalregister.gov/api/v1/documents.json?conditions[term]=OPT+STEM+F-1&conditions[agencies][]=homeland-security-department
```

Sources:
- [USCIS Developer Portal](https://developer.uscis.gov/)
- [Federal Register API Docs](https://www.federalregister.gov/developers/documentation/api/v1)
- [USCIS API FAQs](https://developer.uscis.gov/faqs)

---

## 9. Open Data Sources for Employer Information

| Source | Data | Format | URL |
|--------|------|--------|-----|
| **DOL OFLC LCA Disclosure** | H-1B employer names, job titles, wages, locations | CSV (FY2012+) | https://www.dol.gov/agencies/eta/foreign-labor/performance |
| **USCIS H-1B Employer Data Hub** | Petition counts by employer, FY2009-FY2026 Q1 | CSV, Excel | https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub |
| **SEC EDGAR** | Public company filings, CIK numbers, addresses | JSON (REST API), bulk FTP | https://www.sec.gov/search-filings/edgar-search-assistance/accessing-edgar-data |
| **Data.gov LCA historical** | Complete LCA filing history | CSV | https://catalog.data.gov/dataset/labor-condition-application-for-nonimmigrant-workers-lca-program-historical-data |

**DOL LCA data is the gold mine for the OPT tool.** It contains:
- Employer name, address, NAICS code
- Job title, SOC code, prevailing wage
- Worksite location
- Case status and decision date

This data strongly correlates with E-Verify participation (H-1B employers must use E-Verify for STEM OPT employees). Use it to build a searchable employer database with hiring history and wage data.

Sources:
- [DOL OFLC Performance Data](https://www.dol.gov/agencies/eta/foreign-labor/performance)
- [USCIS H-1B Data Hub](https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub)
- [SEC EDGAR Access](https://www.sec.gov/search-filings/edgar-search-assistance/accessing-edgar-data)

---

## 10. Keeping Data Current

| Data Source | Recommended Update Strategy | Frequency |
|-------------|---------------------------|-----------|
| **DHS STEM List** | Monitor Federal Register API for new notices mentioning "STEM Designated Degree" | Weekly check |
| **CIP codes** | Download new NCES CIP version when released (next: CIP 2030?) | Every ~10 years |
| **E-Verify employers** | Scrape search tool or query individual employers | Daily (tool updates daily) |
| **USCIS processing times** | Scrape processing times page | Weekly |
| **Federal Register rules** | Federal Register API subscription/polling | Daily |
| **SEVP guidance** | Scrape ICE What's New page + broadcast message URLs | Weekly |
| **DOL LCA data** | Download quarterly disclosure files from OFLC | Quarterly |
| **H-1B employer data** | Download from USCIS H-1B Data Hub | Quarterly |

**Automation approach:**
1. Build a scheduled job (cron/launchd) that runs weekly
2. Check Federal Register API for new OPT-related documents
3. Compare current DHS STEM list PDF hash against stored hash — if changed, re-parse
4. Scrape USCIS processing times and store historical snapshots
5. Download quarterly DOL/USCIS datasets when new fiscal quarter data appears

---

## 11. Legal Considerations for Using Government Data

### What is freely usable

Under [17 U.S.C. Section 105](https://www.law.cornell.edu/uscode/text/17/105), works produced by federal government employees are **not subject to copyright** and are in the **public domain**. This covers:

- CIP code taxonomy (NCES/Dept. of Education)
- DHS STEM Designated Degree Program List
- Federal Register documents and rules
- USCIS processing times data
- DOL LCA disclosure data
- USCIS H-1B Employer Data Hub data

The [OPEN Government Data Act](https://resources.data.gov/open-licenses/) (2018) further requires agencies to publish data in open, machine-readable formats with no restrictions on reuse for any purpose, commercial or non-commercial.

### Restrictions to observe

| Restriction | Detail |
|-------------|--------|
| **No implied endorsement** | Cannot suggest the government endorses your tool |
| **No government logos/trademarks** | Cannot use DHS/USCIS/ICE logos without permission |
| **Terms of service** | E-Verify search, USCIS websites may have ToS restricting automated scraping |
| **API terms** | USCIS Developer Portal requires org registration, Section 508 compliance, privacy policy |
| **Third-party data within gov sites** | Some content on gov sites was created by contractors and may carry copyright |
| **Privacy** | Never store or display individual immigration case data; only aggregate/employer-level data |
| **Disclaimer** | Must clearly state the tool is not affiliated with or endorsed by any government agency |

### Recommended disclaimers

- "This tool uses publicly available government data and is not affiliated with, endorsed by, or operated by USCIS, DHS, ICE, or any government agency."
- "Data may not reflect the most recent updates. Always verify with official government sources."

Sources:
- [17 U.S.C. Section 105](https://www.law.cornell.edu/uscode/text/17/105)
- [Open Licenses — resources.data.gov](https://resources.data.gov/open-licenses/)
- [USAGov Copyright Info](https://www.usa.gov/government-copyright)

---

## 12. Data Format Summary

| Dataset | Native Format | Machine-Readable? | Conversion Needed |
|---------|--------------|-------------------|-------------------|
| DHS STEM List | PDF | No | Parse PDF to JSON/CSV |
| NCES CIP Taxonomy | Pipe-delimited text, Excel | Yes | Minimal — parse text file |
| WA State CIP+STEM | CSV, JSON, XML | Yes | None |
| E-Verify Employers | HTML (search tool) | No | Scrape to JSON |
| USCIS Processing Times | HTML + PDF | No | Scrape HTML to JSON |
| USCIS Historical PT | CSV, PDF | Partial | Parse CSV |
| Federal Register docs | JSON, CSV (via API) | Yes | None |
| eCFR regulation text | XML, JSON | Yes | None |
| DOL LCA Disclosure | CSV | Yes | None |
| USCIS H-1B Data Hub | CSV, Excel | Yes | None |
| SEC EDGAR | JSON (API), bulk FTP | Yes | None |
| SEVP Broadcast Messages | PDF | No | Parse PDF |

---

## Recommended Data Architecture for the OPT Tool

```
Data Layer:
├── cip_codes.json          ← NCES CIP 2020 full taxonomy (~1,800 codes)
├── stem_cip_codes.json     ← DHS STEM list mapped to CIP codes (~600 codes)
├── employers.json          ← DOL LCA + H-1B data, E-Verify status
├── processing_times.json   ← Weekly snapshots from USCIS
├── regulations.json        ← Key 8 CFR 214.2(f) provisions, parsed
└── alerts.json             ← Federal Register + SEVP broadcast updates

Update Jobs:
├── weekly: Federal Register API poll, processing times scrape
├── quarterly: DOL LCA download, H-1B data hub download
└── on-change: STEM list PDF hash check
```

**Total data volume estimate:** Under 50 MB for all structured data. The tool can run entirely client-side with bundled JSON files, updated via a simple build pipeline.

---

## Key Takeaways

1. **Best machine-readable sources:** DOL LCA data (CSV), Federal Register API (JSON), Washington State CIP+STEM dataset (CSV/JSON), and USCIS H-1B Data Hub (CSV) are the most tool-friendly.

2. **PDF parsing required:** The DHS STEM list and SEVP broadcast messages are PDF-only. Budget time for parsing and validation.

3. **No E-Verify bulk download exists.** Use DOL LCA employer data as a proxy for E-Verify enrollment. Supplement with targeted scraping of the E-Verify search tool.

4. **Federal Register API is the monitoring backbone.** Free, no auth, JSON output. Use it to detect regulatory changes in near-real-time.

5. **All federal data is public domain.** No licensing fees or copyright restrictions. Just avoid implying government endorsement and respect website terms of service.
