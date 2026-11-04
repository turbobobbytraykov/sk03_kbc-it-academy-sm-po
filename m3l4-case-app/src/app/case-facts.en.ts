/**
 * Real facts about the case, and nothing else. Read from reference/FACTS.md, the Bangladesh Bank
 * lines (159-162 on 1 Nov 2026), each with that file's source string. Anything on screen that comes
 * from this file shows a "Source:" line. Invented telemetry lives in ops-data.ts and is captioned
 * "Illustrative".
 *
 * Real events are placed by the day only (FACTS.md, "do not claim"): reporting gives the day the
 * printer was found, not the hour. No entry here carries a clock time.
 */
export interface CaseFact {
  id: string;
  text: string;
  value?: number;
  unit?: string;
  /** ISO date, day level only. */
  date?: string;
  source: string;
}

const REPORTING = 'Wikipedia consolidation of Reuters/BBC reporting; ISACA Journal 2023 vol. 6';
const PRINTER =
  'Bloomberg, 16 Mar 2016, "Printer Error Triggered Bangladesh Race to Halt Cyber Heist"; isaca.org';
const BAE = 'BAE Systems research, reported by Reuters, 25 Apr 2016';
const BSP = 'bsp.gov.ph, reported widely';

export const FACTS = {
  instructions: {
    id: 'instructions',
    text: '35 fraudulent instructions against Bangladesh Bank\'s account at the Federal Reserve Bank of New York',
    value: 35,
    unit: 'instructions',
    date: '2016-02-04',
    source: REPORTING,
  },
  totalValue: {
    id: 'total-value',
    text: 'About USD 951m in all',
    value: 951,
    unit: 'USD m',
    source: REPORTING,
  },
  completed: {
    id: 'completed',
    text: '5 instructions completed',
    value: 5,
    unit: 'instructions',
    source: REPORTING,
  },
  manila: {
    id: 'manila',
    text: 'USD 81m to five accounts at RCBC\'s Jupiter Street branch, Makati City',
    value: 81,
    unit: 'USD m',
    source: REPORTING,
  },
  sriLanka: {
    id: 'sri-lanka',
    text: 'USD 20m to Sri Lanka',
    value: 20,
    unit: 'USD m',
    source: REPORTING,
  },
  stoppedNewYork: {
    id: 'stopped-new-york',
    text: '30 instructions, about USD 850m, stopped in New York',
    value: 30,
    unit: 'instructions',
    source: REPORTING,
  },
  stoppedValue: {
    id: 'stopped-value',
    text: 'About USD 850m stopped in New York',
    value: 850,
    unit: 'USD m',
    source: REPORTING,
  },
  fandation: {
    id: 'fandation',
    text: 'The Sri Lankan payment was halted by a routing bank after "Foundation" was spelled "Fandation"',
    source: REPORTING,
  },
  sriLankaRecovered: {
    id: 'sri-lanka-recovered',
    text: 'All USD 20m of the Sri Lankan payment recovered',
    value: 20,
    unit: 'USD m',
    source: REPORTING,
  },
  recovered2025: {
    id: 'recovered-2025',
    text: 'As of 2025, about USD 15m of the USD 81m recovered',
    value: 15,
    unit: 'USD m',
    source: REPORTING,
  },
  printer: {
    id: 'printer',
    text:
      'Confirmations printed automatically on a physical printer, which stopped working; it was treated as an ordinary printer fault (attributed to reporting)',
    date: '2016-02-05',
    source: PRINTER,
  },
  weekendDhaka: {
    id: 'weekend-dhaka',
    text: 'The Bangladeshi weekend is Friday and Saturday',
    source: PRINTER,
  },
  weekendNewYork: {
    id: 'weekend-new-york',
    text: 'New York\'s weekend is Saturday and Sunday',
    source: PRINTER,
  },
  chineseNewYear: {
    id: 'chinese-new-year',
    text: 'Monday 8 February 2016 was Chinese New Year, with banks in Manila closed',
    date: '2016-02-08',
    source: PRINTER,
  },
  malware: {
    id: 'malware',
    text: 'Reporting described malware that manipulated the bank\'s payment software and suppressed the printed confirmations',
    source: BAE,
  },
  bspFine: {
    id: 'bsp-fine',
    text: 'Bangko Sentral ng Pilipinas fined RCBC PHP 1 billion (about USD 53m), the largest fine it had imposed',
    value: 1,
    unit: 'PHP bn',
    date: '2016-08-05',
    source: BSP,
  },
} satisfies Record<string, CaseFact>;

/** The four-day timeline, in the deck's own words (content_m3l4.py, slide "Bangladesh Bank, February 2016"). */
export const TIMELINE = [
  { day: 'Thu 4 Feb', text: 'Thirty-five instructions leave the bank, about USD 951m' },
  { day: 'Fri 5 Feb', text: 'The confirmation printer stops. USD 81m reaches Manila' },
  { day: 'Fri and Sat', text: 'The bank\'s own weekend. New York\'s queries go unanswered' },
  { day: 'Mon 8 Feb', text: 'Chinese New Year. The banks in Manila are closed' },
] as const;

export const TIMELINE_CAPTION =
  'Thirty instructions, about USD 850m, were stopped in New York. Sri Lanka\'s USD 20m came back. About USD 15m of the USD 81m has been recovered.';

export const TIMELINE_SOURCE = `${REPORTING}; ${PRINTER}`;

/**
 * Scene 6, the incident timeline: what happened, by the day, each with its source. A row the sources
 * give no date for says so rather than borrowing one.
 */
export const AFTERMATH: { when: string; text: string; source: string }[] = [
  { when: 'Thu 4 Feb 2016', text: 'Thirty-five instructions leave the bank, about USD 951m.', source: REPORTING },
  {
    when: 'Fri 5 Feb',
    text: 'The confirmation printer is found not printing and is treated as a printer fault. USD 81m reaches Manila.',
    source: `${PRINTER}; ${REPORTING}`,
  },
  { when: 'Fri and Sat', text: 'The bank\'s own weekend. New York\'s queries go unanswered.', source: PRINTER },
  { when: 'Mon 8 Feb', text: 'Chinese New Year. The banks in Manila are closed.', source: PRINTER },
  {
    when: 'Not dated in the sources',
    text: 'A routing bank halts the Sri Lankan payment: "Foundation" was spelled "Fandation". All USD 20m is recovered.',
    source: REPORTING,
  },
  {
    when: '5 Aug 2016',
    text: 'Bangko Sentral ng Pilipinas fines RCBC PHP 1 billion, about USD 53m, the largest fine it had imposed.',
    source: BSP,
  },
  { when: 'As of 2025', text: 'About USD 15m of the USD 81m has been recovered.', source: REPORTING },
];

// ---------------------------------------------------------------- calendars

export type CityId = 'dhaka' | 'newYork' | 'manila';

export interface City {
  id: CityId;
  name: string;
  /** Standard offset in February 2016. */
  utcOffset: string;
}

export const CITIES: City[] = [
  { id: 'dhaka', name: 'Dhaka', utcOffset: 'UTC+6' },
  { id: 'newYork', name: 'New York', utcOffset: 'UTC−5' },
  { id: 'manila', name: 'Manila', utcOffset: 'UTC+8' },
];

/** The days of the case. */
export const CASE_DAYS = [
  { iso: '2016-02-04', label: 'Thu 4 Feb' },
  { iso: '2016-02-05', label: 'Fri 5 Feb' },
  { iso: '2016-02-06', label: 'Sat 6 Feb' },
  { iso: '2016-02-07', label: 'Sun 7 Feb' },
  { iso: '2016-02-08', label: 'Mon 8 Feb' },
] as const;

export type DayIso = (typeof CASE_DAYS)[number]['iso'];

export type DayStatus =
  | { open: true }
  | { open: false; reason: string; source: string }
  /** The sources say nothing about this city on this day. */
  | { open: null };

/**
 * The closed periods as whole local days, turned into UTC so a chart can draw them on one axis. Each is
 * a calendar fact from FACTS.md; only the conversion is computed. Offsets in February 2016: Dhaka +6,
 * New York -5, Manila +8.
 */
export const CLOSED_PERIODS = [
  {
    label: 'Dhaka weekend',
    from: Date.UTC(2016, 1, 5, 0 - 6),
    to: Date.UTC(2016, 1, 7, 0 - 6),
    source: FACTS.weekendDhaka.source,
  },
  {
    label: 'New York weekend',
    from: Date.UTC(2016, 1, 6, 0 + 5),
    to: Date.UTC(2016, 1, 8, 0 + 5),
    source: FACTS.weekendNewYork.source,
  },
  {
    label: 'Manila: Chinese New Year',
    from: Date.UTC(2016, 1, 8, 0 - 8),
    to: Date.UTC(2016, 1, 9, 0 - 8),
    source: FACTS.chineseNewYear.source,
  },
] as const;

/**
 * Open or closed, only as FACTS.md states it. Manila's Saturday and Sunday are not in the sources,
 * so they stay unknown rather than assumed.
 */
export const CALENDAR: Record<CityId, Record<DayIso, DayStatus>> = {
  dhaka: {
    '2016-02-04': { open: true },
    '2016-02-05': { open: false, reason: 'Weekend', source: FACTS.weekendDhaka.source },
    '2016-02-06': { open: false, reason: 'Weekend', source: FACTS.weekendDhaka.source },
    '2016-02-07': { open: true },
    '2016-02-08': { open: true },
  },
  newYork: {
    '2016-02-04': { open: true },
    '2016-02-05': { open: true },
    '2016-02-06': { open: false, reason: 'Weekend', source: FACTS.weekendNewYork.source },
    '2016-02-07': { open: false, reason: 'Weekend', source: FACTS.weekendNewYork.source },
    '2016-02-08': { open: true },
  },
  manila: {
    '2016-02-04': { open: true },
    '2016-02-05': { open: true },
    '2016-02-06': { open: null },
    '2016-02-07': { open: null },
    '2016-02-08': { open: false, reason: 'Chinese New Year', source: FACTS.chineseNewYear.source },
  },
};
