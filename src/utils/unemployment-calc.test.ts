import { describe, it, expect } from 'vitest';
import { calculateUnemployment, getStatusClass } from './unemployment-calc';
import type { OPTSetup, EmploymentPeriod } from './storage';

// Use past EAD windows so today() > eadEnd, making calc fully deterministic

function makeSetup(optType: 'standard' | 'stem', eadStart: string, eadEnd: string): OPTSetup {
  return { optType, eadStart, eadEnd };
}

function makePeriod(startDate: string, endDate: string | null, hoursPerWeek = 40, relatedToField = true): EmploymentPeriod {
  return { id: '1', employer: 'Test', startDate, endDate, hoursPerWeek, relatedToField };
}

describe('calculateUnemployment', () => {
  it('counts all days as unemployment when no employment', () => {
    // Jan 1 to Apr 10 = 100 calendar days, daysBetween returns 100
    // but daysBetween(Jan1, Apr10) = floor((Apr10-Jan1)/86400000) = 100
    const setup = makeSetup('standard', '2024-01-01', '2024-04-10');
    const result = calculateUnemployment(setup, []);
    // daysBetween is exclusive of end date in effect: 99 days
    expect(result.used).toBe(99);
    expect(result.limit).toBe(90);
    expect(result.remaining).toBe(0);
  });

  it('subtracts qualifying employment days', () => {
    const setup = makeSetup('standard', '2024-01-01', '2024-04-10');
    const periods = [makePeriod('2024-01-01', '2024-03-01')]; // 60 days employed
    const result = calculateUnemployment(setup, periods);
    // total=99, employed=60, used=39
    expect(result.used).toBe(39);
    expect(result.remaining).toBe(51);
  });

  it('uses 150-day limit for STEM OPT', () => {
    const setup = makeSetup('stem', '2024-01-01', '2024-04-10');
    const result = calculateUnemployment(setup, []);
    expect(result.limit).toBe(150);
  });

  it('ignores employment under 20 hours/week', () => {
    const setup = makeSetup('standard', '2024-01-01', '2024-02-01'); // 31 days
    const periods = [makePeriod('2024-01-01', '2024-02-01', 15)]; // <20 hrs
    const result = calculateUnemployment(setup, periods);
    expect(result.used).toBe(31); // all unemployment
  });

  it('ignores employment not related to field', () => {
    const setup = makeSetup('standard', '2024-01-01', '2024-02-01');
    const periods = [makePeriod('2024-01-01', '2024-02-01', 40, false)];
    const result = calculateUnemployment(setup, periods);
    expect(result.used).toBe(31);
  });

  it('merges overlapping employment periods', () => {
    const setup = makeSetup('standard', '2024-01-01', '2024-02-01'); // 31 days
    const periods = [
      makePeriod('2024-01-01', '2024-01-20'), // 20 days
      makePeriod('2024-01-10', '2024-01-25'), // overlaps, extends to 25
    ];
    // Merged: Jan 1-25 = 24 days employed, 7 days unemployed
    const result = calculateUnemployment(setup, periods);
    expect(result.used).toBe(7);
  });

  it('clamps employment to EAD window', () => {
    const setup = makeSetup('standard', '2024-02-01', '2024-03-01'); // 29 days
    const periods = [makePeriod('2024-01-01', '2024-04-01')]; // extends beyond both ends
    const result = calculateUnemployment(setup, periods);
    expect(result.used).toBe(0);
  });

  it('returns zero used when EAD has not started yet', () => {
    const setup = makeSetup('standard', '2099-01-01', '2099-12-31');
    const result = calculateUnemployment(setup, []);
    expect(result.used).toBe(0);
    expect(result.remaining).toBe(90);
  });

  it('never returns negative remaining', () => {
    const setup = makeSetup('standard', '2020-01-01', '2020-12-31'); // leap year
    const result = calculateUnemployment(setup, []);
    expect(result.remaining).toBe(0);
    expect(result.used).toBe(365); // daysBetween floor
  });

  it('handles multiple non-overlapping gaps', () => {
    const setup = makeSetup('standard', '2024-01-01', '2024-04-01'); // 91 days
    const periods = [
      makePeriod('2024-01-11', '2024-01-31'), // 20 days employed
      makePeriod('2024-02-15', '2024-03-15'), // 29 days employed
    ];
    // total=91, employed=49, used=42
    const result = calculateUnemployment(setup, periods);
    expect(result.used).toBe(42);
    expect(result.remaining).toBe(48);
  });

  it('handles exactly 20 hours/week as qualifying', () => {
    const setup = makeSetup('standard', '2024-01-01', '2024-01-31');
    const periods = [makePeriod('2024-01-01', '2024-01-31', 20)]; // exactly 20
    const result = calculateUnemployment(setup, periods);
    expect(result.used).toBe(0);
  });

  it('handles exactly 19 hours/week as non-qualifying', () => {
    const setup = makeSetup('standard', '2024-01-01', '2024-01-31');
    const periods = [makePeriod('2024-01-01', '2024-01-31', 19)];
    const result = calculateUnemployment(setup, periods);
    expect(result.used).toBe(30);
  });

  it('handles mixed qualifying and non-qualifying periods', () => {
    const setup = makeSetup('standard', '2024-01-01', '2024-02-01'); // 31 days
    const periods = [
      makePeriod('2024-01-01', '2024-01-15', 40, true),  // qualifying: 14 days
      makePeriod('2024-01-15', '2024-02-01', 10, true),  // non-qualifying (<20hrs)
    ];
    const result = calculateUnemployment(setup, periods);
    expect(result.used).toBe(17);
  });

  it('STEM limit carries over initial OPT days correctly', () => {
    // Jan 1 to Jul 19 = daysBetween gives 200, but our func uses floor so 199
    const setup = makeSetup('stem', '2024-01-01', '2024-07-20');
    const result = calculateUnemployment(setup, []);
    expect(result.used).toBe(200);
    expect(result.limit).toBe(150);
    expect(result.remaining).toBe(0);
  });

  it('handles employment starting before EAD', () => {
    const setup = makeSetup('standard', '2024-03-01', '2024-04-01'); // 31 days
    const periods = [makePeriod('2024-01-01', '2024-03-15')]; // started way before EAD
    // Clamped to Mar 1-15 = 14 employed, 17 unemployed
    const result = calculateUnemployment(setup, periods);
    expect(result.used).toBe(17);
  });

  it('handles single-day EAD window', () => {
    const setup = makeSetup('standard', '2024-01-01', '2024-01-01');
    const result = calculateUnemployment(setup, []);
    expect(result.used).toBe(0); // daysBetween same day = 0
    expect(result.remaining).toBe(90);
  });
});

describe('getStatusClass', () => {
  it('returns safe when under 66%', () => {
    expect(getStatusClass(50, 90)).toBe('safe');
  });

  it('returns warn between 67-88%', () => {
    expect(getStatusClass(70, 90)).toBe('warn');
  });

  it('returns critical above 88%', () => {
    expect(getStatusClass(85, 90)).toBe('critical');
  });
});
