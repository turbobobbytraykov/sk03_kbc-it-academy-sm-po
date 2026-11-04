// The real facts in the page's language. case-facts.en.ts stays the record read from FACTS.md, and the
// source of every value, date and source string; case-facts.bg.ts holds only the Bulgarian text.

import * as bg from './case-facts.bg';
import * as en from './case-facts.en';
import { LANG } from './i18n';

export * from './case-facts.en';

const isBg = LANG === 'bg';

export const FACTS: typeof en.FACTS = isBg
  ? (Object.fromEntries(
      Object.entries(en.FACTS).map(([key, f]) => [key, { ...f, text: bg.FACT_TEXT[key] ?? f.text }]),
    ) as typeof en.FACTS)
  : en.FACTS;

export const TIMELINE: readonly { day: string; text: string }[] = isBg ? bg.TIMELINE : en.TIMELINE;
export const TIMELINE_CAPTION = isBg ? bg.TIMELINE_CAPTION : en.TIMELINE_CAPTION;

export const AFTERMATH: typeof en.AFTERMATH = isBg
  ? en.AFTERMATH.map((e, i) => ({ ...e, ...bg.AFTERMATH[i] }))
  : en.AFTERMATH;

export const CITIES: typeof en.CITIES = isBg ? en.CITIES.map((c) => ({ ...c, name: bg.CITY_NAMES[c.id] })) : en.CITIES;

export const CASE_DAYS = (isBg
  ? en.CASE_DAYS.map((d) => ({ ...d, label: bg.DAY_LABELS[d.iso] }))
  : en.CASE_DAYS) as unknown as typeof en.CASE_DAYS;

export const CLOSED_PERIODS = (isBg
  ? en.CLOSED_PERIODS.map((p, i) => ({ ...p, label: bg.CLOSED_PERIOD_LABELS[i] }))
  : en.CLOSED_PERIODS) as unknown as typeof en.CLOSED_PERIODS;

export const CALENDAR: typeof en.CALENDAR = isBg
  ? (Object.fromEntries(
      Object.entries(en.CALENDAR).map(([city, days]) => [
        city,
        Object.fromEntries(
          Object.entries(days).map(([iso, s]) => [iso, s.open === false ? { ...s, reason: bg.REASONS[s.reason] ?? s.reason } : s]),
        ),
      ]),
    ) as typeof en.CALENDAR)
  : en.CALENDAR;
