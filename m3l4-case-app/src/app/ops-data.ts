import { FACTS } from './case-facts';
import { LANG, tr } from './i18n';

/*
 * Invented telemetry for the ops view. Nothing in this file happened: every number, row and minute is
 * illustrative, and every screen that shows it says so. The one real number used here, the 35
 * instructions, is read from case-facts.ts and shown with its source.
 *
 * Timestamps are stored in UTC and shown in Dhaka time (UTC+6). Invented times sit inside the right
 * real days: Thursday 4 February for the instructions, Friday 5 February for the printer.
 */

// =================================================================== parameters: tune here
// Bobby may want to change these in the room. Nothing else in the code needs to change with them.

/** Seed for the pseudo-random noise, so every run draws the same lines. */
export const SEED = 4_02_2016;

/** Ordinary outbound payment messages per business hour on the Thursday. */
export const BASELINE_PER_HOUR = 12;

/** Hour-to-hour noise on the baseline, as a share of it. */
export const BASELINE_NOISE = 0.3;

/** Thursday business hours in Dhaka, from (inclusive) to (exclusive). */
export const BUSINESS_HOURS: [number, number] = [9, 17];

/**
 * How the 35 instructions spread over the Thursday evening, by Dhaka hour. The split and the hours
 * are invented; the deck says "a Thursday evening" and reporting gives no clock time. The total must
 * stay the real count.
 */
export const FRAUD_SPLIT: Record<number, number> = { 19: 8, 20: 12, 21: 10, 22: 5 };

/**
 * Proposal D: half-width of the band of "normal" in business hours, in index points. Out of hours the
 * band is half as wide. This is the stored definition of normal, and the number to argue about.
 */
export const BAND_WIDTH = 4;

/** Proposal D: how far each instruction moves the balance index. */
export const DROP_PER_INSTRUCTION = 0.6;

/** Proposal C: minutes the gap must stay open, while messages are being sent, before the alert fires. */
export const ALERT_AFTER_MINUTES = 30;

// =================================================================== time

const HOUR = 3_600_000;
export const DHAKA_OFFSET_HOURS = 6;

/** UTC milliseconds for a Dhaka wall-clock time in February 2016. */
export const dhakaToUtc = (day: number, hour: number, minute = 0) =>
  Date.UTC(2016, 1, day, hour - DHAKA_OFFSET_HOURS, minute);

const DAY_NAMES = LANG === 'bg' ? ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const pad = (n: number) => String(n).padStart(2, '0');

/** "Thu 22:40", Dhaka time. */
export function dhakaLabel(utcMs: number): string {
  const d = new Date(utcMs + DHAKA_OFFSET_HOURS * HOUR);
  return `${DAY_NAMES[d.getUTCDay()]} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
}

/**
 * ApexCharts writes datetime labels in UTC. Shifting a UTC timestamp by the Dhaka offset makes the
 * axis read in Dhaka time while the data itself stays in UTC.
 */
export const toDhakaAxis = (utcMs: number) => utcMs + DHAKA_OFFSET_HOURS * HOUR;

/** The charts' window: Thursday 08:00 to Friday 12:00, Dhaka. */
export const WINDOW = { from: dhakaToUtc(4, 8), to: dhakaToUtc(5, 12) };

/** The Dhaka weekend starts at midnight on Friday. */
export const DHAKA_WEEKEND_FROM = dhakaToUtc(5, 0);

// =================================================================== seeded noise

/** mulberry32: small, fast, and the same sequence on every machine. */
function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}

// =================================================================== proposal C and D series

const fraudTotal = Object.values(FRAUD_SPLIT).reduce((s, n) => s + n, 0);
if (fraudTotal !== FACTS.instructions.value) {
  throw new Error(`FRAUD_SPLIT adds up to ${fraudTotal}; it must be the real count, ${FACTS.instructions.value}`);
}

export interface HourPoint {
  /** Start of the hour, UTC ms. */
  t: number;
  dhakaHour: number;
  /** Ordinary messages sent in this hour. */
  ordinary: number;
  /** Fraudulent instructions sent in this hour (the real 35, spread over invented hours). */
  fraud: number;
  sentTotal: number;
  confirmedTotal: number;
  /** Proposal D: balance index and its band of normal. */
  balance: number;
  bandLow: number;
  bandHigh: number;
}

function buildHours(): HourPoint[] {
  const rand = seeded(SEED);
  const firstFraudHour = Math.min(...Object.keys(FRAUD_SPLIT).map(Number));
  const points: HourPoint[] = [];
  let sentTotal = 0;
  let confirmedTotal = 0;
  let balance = 100;
  let confirmationsStopped = false;

  for (let t = WINDOW.from; t <= WINDOW.to; t += HOUR) {
    const local = new Date(t + DHAKA_OFFSET_HOURS * HOUR);
    const isThursday = local.getUTCDate() === 4;
    const dhakaHour = local.getUTCHours();
    const inBusiness = isThursday && dhakaHour >= BUSINESS_HOURS[0] && dhakaHour < BUSINESS_HOURS[1];

    const ordinary = inBusiness
      ? Math.round(BASELINE_PER_HOUR * (1 + (rand() * 2 - 1) * BASELINE_NOISE))
      : 0;
    const fraud = isThursday ? (FRAUD_SPLIT[dhakaHour] ?? 0) : 0;
    if (isThursday && dhakaHour === firstFraudHour) confirmationsStopped = true;

    sentTotal += ordinary + fraud;
    // Confirmed follows sent until the first suppressed confirmation, then stops.
    if (!confirmationsStopped) confirmedTotal += ordinary;

    // Ordinary movement stays inside the band; the instructions take the balance out of it.
    const width = inBusiness ? BAND_WIDTH : BAND_WIDTH / 2;
    if (inBusiness) {
      const ordinaryMove = (rand() * 2 - 1) * width * 0.35;
      balance = Math.max(100 - width * 0.8, Math.min(100 + width * 0.8, balance + ordinaryMove));
    } else if (!confirmationsStopped) {
      // Out of hours, before anything happens, the account settles back to where it closed.
      balance = Math.max(100 - width * 0.8, Math.min(100 + width * 0.8, balance));
    }
    balance -= fraud * DROP_PER_INSTRUCTION;

    points.push({
      t,
      dhakaHour,
      ordinary,
      fraud,
      sentTotal,
      confirmedTotal,
      balance: Math.round(balance * 10) / 10,
      bandLow: 100 - width,
      bandHigh: 100 + width,
    });
  }
  return points;
}

export const HOURS = buildHours();

/** When the C alert fires: the first hour with a gap, plus the waiting time. */
export const C_ALERT_AT = (() => {
  const first = HOURS.find((p) => p.sentTotal > p.confirmedTotal);
  return first ? first.t + ALERT_AFTER_MINUTES * 60_000 : null;
})();

/** When the D alert fires: the first hour outside the band. */
export const D_ALERT_AT = HOURS.find((p) => p.balance < p.bandLow || p.balance > p.bandHigh)?.t ?? null;

export const FINAL_GAP = HOURS[HOURS.length - 1].sentTotal - HOURS[HOURS.length - 1].confirmedTotal;

// =================================================================== scene 1: the week, and Thursday's queue

/** Scene 1's long window: Thursday 4 to the end of Monday 8 February, Dhaka. */
export const WEEK = { from: dhakaToUtc(4, 0), to: dhakaToUtc(9, 0) };

/** Dhaka working days in the window: Thursday, Sunday and Monday (the weekend is Friday and Saturday). */
const DHAKA_WORKING_DAYS = new Set([4, 7, 8]);

export interface WeekPoint {
  t: number;
  /** Payment messages sent in the hour: ordinary traffic plus, on the Thursday evening, the 35. */
  sent: number;
}

function buildWeek(): WeekPoint[] {
  const rand = seeded(SEED + 1);
  const points: WeekPoint[] = [];
  for (let t = WEEK.from; t < WEEK.to; t += HOUR) {
    const local = new Date(t + DHAKA_OFFSET_HOURS * HOUR);
    const day = local.getUTCDate();
    const hour = local.getUTCHours();
    const working = DHAKA_WORKING_DAYS.has(day) && hour >= BUSINESS_HOURS[0] && hour < BUSINESS_HOURS[1];
    // Thursday reuses the exact hours of scenes 5 and 7, so every scene tells the same Thursday.
    const thursday = day === 4 ? HOURS.find((p) => p.t === t) : undefined;
    const sent = thursday
      ? thursday.ordinary + thursday.fraud
      : day === 4
        ? 0
        : working
          ? Math.round(BASELINE_PER_HOUR * (1 + (rand() * 2 - 1) * BASELINE_NOISE))
          : 0;
    points.push({ t, sent });
  }
  return points;
}

export const WEEK_HOURS = buildWeek();

/** Messages waiting in the outbound queue on the Thursday, sampled hourly. Healthy all day. */
export const QUEUE_DEPTH = (() => {
  const rand = seeded(SEED + 2);
  return HOURS.filter((p) => p.t < DHAKA_WEEKEND_FROM).map((p) => ({
    t: p.t,
    depth: p.ordinary + p.fraud > 0 ? Math.round(rand() * 3) : 0,
  }));
})();

/** Thursday only, for the stat tiles. */
export const THURSDAY = HOURS.filter((p) => p.t < DHAKA_WEEKEND_FROM);

// =================================================================== scene 2: confirmations printed

/**
 * Confirmations printed per hour on the Thursday: whatever was confirmed in that hour. After the first
 * suppressed confirmation nothing prints, and in the evening that looks like any other evening.
 */
export const PRINTED = THURSDAY.map((p, i) => ({
  t: p.t,
  printed: p.confirmedTotal - (i ? THURSDAY[i - 1].confirmedTotal : 0),
}));

// =================================================================== scene 3: the Pager incident list

export type Urgency = 'low' | 'high';

export interface Incident {
  id: string;
  title: string;
  service: string;
  urgency: Urgency;
  routedTo: string;
  /** UTC ms for invented incidents; null for the printer, which is placed by the day only. */
  opened: number | null;
  status: string;
  /** The one alert the toggle re-reads. */
  printer?: true;
}

/** Ordinary Friday-morning noise, plus the printer. Invented, except that the printer stopped. */
export const INCIDENTS: Incident[] = [
  {
    id: 'INC-4122',
    title: tr('Disk 85% full: shared drive', 'Общ диск: 85% пълен'),
    service: 'File storage',
    urgency: 'low',
    routedTo: tr('Infrastructure queue', 'Опашка „Инфраструктура“'),
    opened: dhakaToUtc(4, 22, 41),
    status: tr('Queued', 'В опашка'),
  },
  {
    id: 'INC-4123',
    title: tr('Certificate expiring: intranet', 'Изтичащ сертификат на интранета'),
    service: 'Intranet',
    urgency: 'low',
    routedTo: tr('Web team queue', 'Опашка „Уеб екип“'),
    opened: dhakaToUtc(5, 1, 5),
    status: tr('Queued', 'В опашка'),
  },
  {
    id: 'INC-4125',
    title: tr('Backup late: HR database', 'Късен архив: БД „Персонал“'),
    service: 'Backups',
    urgency: 'low',
    routedTo: tr('Infrastructure queue', 'Опашка „Инфраструктура“'),
    opened: dhakaToUtc(5, 5, 12),
    status: tr('Queued', 'В опашка'),
  },
  {
    id: 'INC-4127',
    title: tr('Device offline: confirmation printer', 'Офлайн: принтер за потвърждения'),
    service: 'Payments back office',
    urgency: 'low',
    routedTo: tr('Desktop support queue', 'Опашка „Техн. поддръжка“'),
    opened: null,
    status: tr('Queued', 'В опашка'),
    printer: true,
  },
  {
    id: 'INC-4128',
    title: tr('Wi-Fi point offline: floor 3', 'Wi-Fi точка офлайн: етаж 3'),
    service: 'Office network',
    urgency: 'low',
    routedTo: tr('Desktop support queue', 'Опашка „Техн. поддръжка“'),
    opened: dhakaToUtc(5, 7, 48),
    status: tr('Queued', 'В опашка'),
  },
];

/** The same alert read as a finding: what changes, and nothing else does. */
export const PRINTER_AS_FINDING: Pick<Incident, 'urgency' | 'routedTo' | 'status'> = {
  urgency: 'high',
  routedTo: tr('Payments on-call', 'Дежурен по плащанията'),
  status: tr('Paging', 'Повиква'),
};

export interface OnCall {
  role: string;
  initials: string;
  cover: string;
  /** Takes pages over the Dhaka weekend. */
  pageable: boolean;
}

/**
 * Who covers Friday 5 and Saturday 6 February, the Dhaka weekend. Roles only, never names. The
 * Bulgarian roles drop "on call": the card's heading says it, and the names then fit on one line.
 */
export const ON_CALL: OnCall[] = [
  { role: tr('Desktop support', 'Техн. поддръжка'), initials: 'DS', cover: tr('Working days only. Back Sun 7 Feb', 'Работни дни; от нд 7 февр.'), pageable: false },
  { role: tr('Infrastructure on-call', 'Инфраструктура'), initials: 'IN', cover: tr('All weekend, high urgency', 'Уикенд, висока спешност'), pageable: true },
  { role: tr('Payments on-call', 'Плащания'), initials: 'PA', cover: tr('All weekend, high urgency', 'Уикенд, висока спешност'), pageable: true },
];

// =================================================================== scene 5, proposal A: the approvals queue

export interface Approval {
  ref: string;
  amount: string;
  maker: string;
  checker: string;
  status: string;
}

/** Thursday's outbound payments above the threshold, each signed twice. Invented. */
export const APPROVALS: Approval[] = [
  { ref: 'PAY-30871', amount: tr('2.4m', '2,4 млн.'), maker: tr('Payments officer', 'Служител „Плащания“'), checker: tr('Supervisor', 'Ръководител'), status: tr('Signed', 'Подписано') },
  { ref: 'PAY-30874', amount: tr('1.1m', '1,1 млн.'), maker: tr('Payments officer', 'Служител „Плащания“'), checker: tr('Supervisor', 'Ръководител'), status: tr('Signed', 'Подписано') },
  { ref: 'PAY-30880', amount: tr('5.0m', '5,0 млн.'), maker: tr('Payments officer', 'Служител „Плащания“'), checker: tr('Treasury head', 'Ръководител „Трезор“'), status: tr('Signed', 'Подписано') },
  { ref: 'PAY-30883', amount: tr('1.7m', '1,7 млн.'), maker: tr('Payments officer', 'Служител „Плащания“'), checker: tr('Supervisor', 'Ръководител'), status: tr('Signed', 'Подписано') },
  { ref: 'PAY-30889', amount: tr('3.2m', '3,2 млн.'), maker: tr('Payments officer', 'Служител „Плащания“'), checker: tr('Treasury head', 'Ръководител „Трезор“'), status: tr('Signed', 'Подписано') },
];
