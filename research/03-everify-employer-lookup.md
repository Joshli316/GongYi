# E-Verify Employer Verification for F-1 OPT Students

**Research Date:** April 7, 2026
**Purpose:** Comprehensive guide for F-1 OPT/STEM OPT students to verify employer E-Verify enrollment status

---

## 1. What Is E-Verify and Why It Matters for STEM OPT

E-Verify is a web-based system operated by USCIS (U.S. Citizenship and Immigration Services) in partnership with the Social Security Administration (SSA). It allows employers to electronically confirm the employment eligibility of newly hired employees by matching Form I-9 information against government databases.

### Why It Matters for F-1 Students

- **Initial OPT (12 months):** E-Verify enrollment is **not required** for employers hiring students on standard post-completion OPT.
- **STEM OPT Extension (24 months):** E-Verify enrollment is **mandatory**. Employers must be enrolled in E-Verify before a student can apply for or begin the STEM OPT extension.
- **Consequence of non-compliance:** If the employer is not enrolled, USCIS will deny the student's STEM OPT Form I-765 application, resulting in immediate loss of work authorization and potentially loss of lawful F-1 status.

This makes E-Verify verification a critical pre-employment step for any F-1 student pursuing the 24-month STEM OPT extension.

---

## 2. How to Check If an Employer Is Enrolled in E-Verify

### Step-by-Step Process

1. **Go to the official E-Verify Employer Search tool:** [https://www.e-verify.gov/e-verify-employer-search](https://www.e-verify.gov/e-verify-employer-search)
2. **Search by company name** (exact or partial match)
3. **Filter by state** if needed to narrow results
4. **Review the results** for matching employer records
5. **Confirm directly with the employer** even if you find a match (the search tool has known limitations)

### Important Caveats

- Finding a company in the search tool does **not** guarantee that the specific office or subsidiary where you will work is covered.
- **Not finding** a company does **not** necessarily mean they are not enrolled --- they may be enrolled under a different name, through a parent company, or via an E-Verify employer agent.
- Always ask the employer directly to confirm enrollment and provide their E-Verify Company ID number.

---

## 3. The Official E-Verify Employer Search Tool

### URL
[https://www.e-verify.gov/e-verify-employer-search](https://www.e-verify.gov/e-verify-employer-search)

### Data Fields Returned

| Field | Description |
|---|---|
| **Employer Name** | The name used when the employer enrolled in E-Verify |
| **Doing Business As (DBA)** | Public-facing trade name, if different from legal name |
| **Account Status** | Active (currently enrolled) or Terminated |
| **Enrollment Date** | Date the E-Verify Memorandum of Understanding (MOU) was signed |
| **Termination Date** | MOU termination date, if applicable |
| **Workforce Size** | Reported employee count (only shown for employers with 5+ employees) |
| **Number of Hiring Sites** | Total locations where the employer hires and completes Form I-9 |
| **Hiring Site Locations** | Geographic locations of hiring sites, listed by state |

### Data Characteristics

- **Update frequency:** Daily at approximately 2:00 AM ET
- **Scope:** Only includes employers, E-Verify employer agents, and federal contractors who self-reported 5+ employees
- **Self-reported:** All data is submitted by employers themselves; USCIS does not independently verify company names or workforce sizes
- **No Company ID:** The E-Verify Company ID number (4--7 digits) is **not** displayed in public search results. It appears only on the employer's MOU document.

---

## 4. Public Data Sources for E-Verify Enrollment Data

### Official Government Sources

| Source | URL | What It Provides |
|---|---|---|
| **E-Verify Employer Search** | [e-verify.gov/e-verify-employer-search](https://www.e-verify.gov/e-verify-employer-search) | Interactive search of enrolled employers |
| **E-Verify Data Page** | [e-verify.gov/about-e-verify/e-verify-data](https://www.e-verify.gov/about-e-verify/e-verify-data) | Aggregate statistics (usage by state, fiscal year) |
| **E-Verify Employer Data Parameters** | [e-verify.gov/employer-data-parameters](https://www.e-verify.gov/employer-data-parameters) | Definitions of all data fields in the search tool |
| **Data.gov Catalog** | [catalog.data.gov/dataset/e-verify](https://catalog.data.gov/dataset/e-verify) | Dataset listing (restricted access, no public download) |

### Third-Party Aggregators

| Platform | URL | Data Scope |
|---|---|---|
| **MyVisaJobs** | [myvisajobs.com/employers/e-verify.aspx](https://www.myvisajobs.com/employers/e-verify.aspx) | E-Verify employer database + H-1B sponsor data |
| **H1BGrader** | [h1bgrader.com](https://h1bgrader.com/) | H-1B sponsorship history (implies E-Verify for STEM OPT employers) |
| **USCIS H-1B Employer Data Hub** | [uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub](https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub) | Official H-1B petition data by employer |

---

## 5. API Access and Downloadable Datasets

### Public API

**There is no public API for the E-Verify employer search database.** The search tool is a web-only interface with no documented REST or JSON endpoint for external developers.

### E-Verify Web Services (Employer-Only)

E-Verify does offer a **Web Services access method** for enrolled employers to integrate E-Verify into their HR systems. This is governed by an Interface Control Agreement (ICA) and is only available to:
- Enrolled employers
- E-Verify employer agents
- Federal contractors with E-Verify obligations

This API is for submitting and managing verification cases, **not** for searching the employer enrollment database.

### Downloadable Datasets

- **Data.gov listing:** The E-Verify dataset on data.gov (via SSA) is marked as **restricted access** --- no public CSV or bulk download is available.
- **No bulk export:** USCIS does not provide a downloadable file of all enrolled employers. The publisher notes that "no file downloads have been provided" and "may provide downloads in the future."
- **DOL OFLC disclosure files:** The Department of Labor publishes Labor Condition Application (LCA) data for H-1B, which can serve as a proxy for identifying employers likely to be E-Verify enrolled, but this is **not** the same as the E-Verify enrollment list.

### Bottom Line for Developers

If you want to build a tool that checks E-Verify status programmatically, you would need to scrape the public search tool (which may violate terms of service) or use third-party aggregated data from sources like MyVisaJobs. There is no supported, legitimate API for this purpose.

---

## 6. Limitations of E-Verify Employer Lookup

### Company Name Variations

The single biggest challenge with E-Verify lookup is **inconsistent naming**:

- **No naming convention required:** Employers can enroll using their legal name, trade name, DBA name, abbreviation, or a location-specific name.
- **Franchise confusion:** A franchise operator may enroll under the franchisee's legal entity name (e.g., "Smith Holdings LLC"), while the public knows it as the franchise brand (e.g., "McDonald's").
- **Abbreviations:** "International Business Machines" vs. "IBM" --- searching one may not return the other.

### Subsidiary and Parent Company Issues

- A large corporation may enroll the **parent company** in E-Verify, but subsidiaries operate under different names. Searching for the subsidiary will return no results.
- Conversely, a subsidiary may be independently enrolled while the parent is not.
- There is no linking between parent and subsidiary records in the public search tool.

### Multi-Location Coverage

- Employers with multiple offices can choose **which hiring sites** participate in E-Verify.
- Finding "Acme Corp" in E-Verify with hiring sites in California does not mean their New York office is covered.
- The search tool shows hiring site locations by state but does not list specific office addresses.

### Data Freshness and Self-Reporting

- All data is **self-reported** by employers; USCIS does not audit or verify the information.
- Employers who recently enrolled may not appear for up to 24 hours.
- Employers who terminated their enrollment may still appear briefly until the daily update runs.

### Small Employer Exclusion

- Employers with **fewer than 5 employees** are excluded from the public search tool entirely, even if they are enrolled in E-Verify.

---

## 7. What Students Should Do If They Cannot Find Their Employer

### Immediate Steps

1. **Try alternate name searches:** Search using the employer's legal name, DBA name, parent company name, and any abbreviations. Check the company's SEC filings, state business registration, or LinkedIn for the exact legal entity name.

2. **Ask the employer directly:** Request one of the following:
   - Their **E-Verify Company ID number** (4--7 digits, found on their MOU)
   - Their **E-Verify Client Company ID number** (if they use an employer agent)
   - A **screenshot** of their active E-Verify employer profile

3. **Contact your DSO (Designated School Official):** Your school's international student office can advise on next steps and may have experience verifying employers.

4. **Check if they use an E-Verify Employer Agent:** Some companies outsource E-Verify to third-party agents. In this case, the company may not appear in the search tool under its own name, but it is still compliant.

### Red Flags

- Employer says they "plan to enroll" but have not yet --- enrollment must be complete **before** the STEM OPT application is filed.
- Employer cannot provide any E-Verify Company ID or documentation.
- Employer has fewer than 5 employees and cannot provide direct proof of enrollment.

### Timing Considerations

- Report any employment changes or issues to your DSO within **10 days**.
- If employment ends due to E-Verify non-compliance, immediately consult your DSO to avoid status violations.
- The 60-day unemployment grace period on OPT is strict; do not delay finding compliant employment.

---

## 8. E-Verify Requirements Specific to STEM OPT Employers

### Mandatory Requirements

| Requirement | Detail |
|---|---|
| **E-Verify enrollment** | Must have a valid E-Verify Company ID or Client Company ID |
| **Active MOU** | Must have a signed and active E-Verify Memorandum of Understanding |
| **Good standing** | Must remain a participant in good standing, as determined by USCIS |
| **Valid EIN** | Must have a valid IRS Employer Identification Number |
| **Form I-983** | Must complete the Training Plan (Form I-983) with the student |
| **Consistent use** | Once enrolled, must use E-Verify for **all** new hires, not just OPT students |

### Employer Obligations Under STEM OPT

- Provide **structured training** with measurable goals (documented on Form I-983)
- Ensure **comparable compensation** to similarly situated U.S. workers
- May **not replace** a U.S. worker with a STEM OPT student
- Must report material changes in training to the student's DSO
- Must allow USCIS site visits for verification

### What "Good Standing" Means

USCIS considers an employer in good standing if they:
- Consistently create E-Verify cases for all new hires within 3 business days of the employee's start date
- Resolve Tentative Nonconfirmation (TNC) cases properly
- Do not use E-Verify for pre-employment screening
- Do not discriminate based on citizenship or national origin

---

## 9. Common Issues with E-Verify Verification

### For Students

| Issue | Impact | Solution |
|---|---|---|
| Employer enrolled under different name | Cannot find in search tool | Ask employer for Company ID directly |
| Employer enrolled only at certain locations | Student's work site may not be covered | Confirm specific location is included |
| Employer recently enrolled | Not yet in daily-updated database | Wait 24--48 hours and re-check |
| Employer uses agent | Does not appear under own name | Ask for Client Company ID |
| Small employer (<5 employees) | Excluded from public search | Request direct proof of enrollment |

### For Employers (Relevant Context for Students)

- **Late Form I-9 completion:** Section 2 must be completed within 3 business days of start date.
- **Status Change Reports (new in 2025):** Employers must monitor for revoked EADs and re-verify affected employees.
- **Duplicate cases:** Creating a new case instead of correcting an existing one causes system confusion.
- **Pre-hire screening violations:** Using E-Verify before a job offer is accepted and I-9 is completed is prohibited.
- **State mandate confusion:** As of 2026, different states have varying E-Verify requirements, and employers may be compliant in one state but not another.

### Emerging Issues in 2025--2026

- **Increased enforcement:** DHS has increased desk audits and worksite enforcement actions.
- **TPS volatility:** Frequent changes to Temporary Protected Status designations create reverification uncertainty.
- **Expanding state mandates:** More states are passing laws requiring E-Verify for all employers or specific industries, which may change the landscape for STEM OPT students.

---

## 10. Free Tools and Databases That Aggregate E-Verify Data

### Recommended Free Resources

| Tool | URL | What It Does | Limitation |
|---|---|---|---|
| **E-Verify Employer Search** (official) | [e-verify.gov/e-verify-employer-search](https://www.e-verify.gov/e-verify-employer-search) | Authoritative source for enrollment status | Name matching issues, no API |
| **MyVisaJobs E-Verify Search** | [myvisajobs.com/employers/e-verify.aspx](https://www.myvisajobs.com/employers/e-verify.aspx) | Aggregated E-Verify + H-1B data | May lag behind official source |
| **H1BGrader** | [h1bgrader.com](https://h1bgrader.com/) | H-1B sponsor history, approval rates | H-1B data only, not E-Verify directly |
| **USCIS H-1B Data Hub** | [uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub](https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub) | Official H-1B petition counts by employer | No E-Verify status field |
| **DOL OFLC Disclosure Data** | [dol.gov/agencies/eta/foreign-labor/performance](https://www.dol.gov/agencies/eta/foreign-labor/performance) | LCA filings, wages, job titles | Raw data, requires processing |

### Using H-1B Data as a Proxy

While H-1B sponsorship data is not the same as E-Verify enrollment, there is significant overlap:
- Companies that sponsor H-1B visas are very likely to be enrolled in E-Verify (since many also hire STEM OPT students).
- H-1B data can help identify **immigration-friendly employers** who are more likely to support international students.
- However, H-1B sponsorship does not guarantee current E-Verify enrollment --- always verify directly.

### What Is NOT Available

- No free bulk download of all E-Verify employers exists.
- No public API for E-Verify employer search.
- The data.gov E-Verify dataset is restricted and not downloadable.
- No third-party tool can guarantee 100% accuracy --- always cross-reference with the official search tool and direct employer confirmation.

---

## Key Takeaways for F-1 STEM OPT Students

1. **Always verify E-Verify enrollment before accepting a STEM OPT position.** Use the official search tool first, then confirm directly with the employer.
2. **The official search tool is imperfect.** Company name variations, subsidiaries, and employer agents can cause false negatives.
3. **Ask for the E-Verify Company ID number.** This is the most reliable proof of enrollment.
4. **No public API or bulk download exists.** You must use the web-based search tool or third-party aggregators.
5. **Your DSO is your best resource.** If you cannot verify enrollment, consult your school's international student office immediately.
6. **Do not start STEM OPT employment without confirmed E-Verify enrollment.** Non-compliance can result in denial of your OPT extension and loss of F-1 status.

---

## Sources

- [E-Verify Employer Search Tool](https://www.e-verify.gov/e-verify-employer-search) -- USCIS
- [E-Verify Employer Data Parameters](https://www.e-verify.gov/employer-data-parameters) -- USCIS
- [E-Verify Data](https://www.e-verify.gov/about-e-verify/e-verify-data) -- USCIS
- [E-Verify FAQ: STEM OPT Employer Requirements](https://www.e-verify.gov/faq/am-i-required-to-participate-in-e-verify-in-order-to-hire-f-1-students-who-seek-a-stem-opt) -- USCIS
- [STEM OPT Extension Requirements](https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-extension-for-stem-students-stem-opt) -- USCIS
- [Understanding E-Verify](https://studyinthestates.dhs.gov/students/work/understanding-e-verify) -- Study in the States / DHS
- [E-Verify Requirements for STEM OPT Extensions](https://www.rnlawgroup.com/e-verify-requirements-for-stem-opt-extensions-and-i-9-compliance/) -- Reddy Neumann Brown PC
- [MyVisaJobs E-Verify Employer Database](https://www.myvisajobs.com/employers/e-verify.aspx) -- MyVisaJobs
- [H-1B Employer Data Hub](https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub) -- USCIS
- [Data.gov E-Verify Dataset](https://catalog.data.gov/dataset/e-verify) -- SSA / Data.gov
- [E-Verify Web Services](https://www.e-verify.gov/employers/web-services) -- USCIS
- [E-Verify Search Tool Updated](https://www.e-verify.gov/about-e-verify/whats-new/e-verify-employer-search-tool-updated) -- USCIS
- [NAFSA E-Verify Employer Lists](https://www.nafsa.org/professional-resources/browse-by-interest/e-verify-employer-lists) -- NAFSA
- [I-9 and E-Verify Shifts in 2026](https://hrdailyadvisor.hci.org/2026/03/16/the-new-reality-of-worksite-enforcement-navigating-i-9-and-e-verify-shifts-in-2026-2/) -- HR Daily Advisor
- [Form I-9 & E-Verify Updates 2026](https://lifthcm.com/article/form-i-9-e-verify-updates-2026) -- LiftHCM
