// OPT Unemployment Limits
export const UNEMPLOYMENT_LIMIT_STANDARD = 90;
export const UNEMPLOYMENT_LIMIT_STEM = 150;

// Minimum qualifying work hours per week
export const MIN_WORK_HOURS = 20;

// Application windows (in days)
export const OPT_APPLICATION_BEFORE_PROGRAM_END = 90;
export const OPT_APPLICATION_AFTER_PROGRAM_END = 60;
export const STEM_EXTENSION_BEFORE_OPT_END = 90;

// Grace period after OPT ends
export const GRACE_PERIOD_DAYS = 60;

// Reporting deadlines
export const REPORTING_DEADLINE_DAYS = 10;

// STEM OPT validation report frequency (months)
export const VALIDATION_REPORT_MONTHS = 6;

// I-983 evaluation milestones (months from STEM OPT start)
export const I983_EVAL_12_MONTHS = 12;
export const I983_EVAL_24_MONTHS = 24;

// Cap-gap extension end date (April 1 of next fiscal year)
export const CAP_GAP_MONTH = 3; // April (0-indexed)
export const CAP_GAP_DAY = 1;

// Warning thresholds for unemployment counter (percentage of limit)
export const THRESHOLD_SAFE = 0.66;
export const THRESHOLD_WARN = 0.88;
// Above THRESHOLD_WARN = critical

// Warning thresholds for deadlines (days)
export const DEADLINE_WARN_DAYS = 30;
export const DEADLINE_CRITICAL_DAYS = 7;

// STEM OPT max lifetime extensions
export const MAX_STEM_EXTENSIONS = 2;

// Regulatory citations
export const CITATION_UNEMPLOYMENT = '8 CFR 214.2(f)(10)(ii)(E)';
export const CITATION_STEM_OPT = '8 CFR 214.16';
export const CITATION_REPORTING = '8 CFR 214.2(f)(12)';

// External links
export const LINK_EVERIFY_SEARCH = 'https://www.e-verify.gov/e-verify-employer-search';
export const LINK_STEM_LIST_PDF = 'https://www.ice.gov/doclib/sevis/pdf/stemList2024.pdf';
export const LINK_I983_FORM = 'https://www.ice.gov/doclib/sevis/pdf/i983.pdf';
export const LINK_SEVP_PORTAL = 'https://sevp.ice.gov/opt/';
export const LINK_USCIS_OPT = 'https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students';
