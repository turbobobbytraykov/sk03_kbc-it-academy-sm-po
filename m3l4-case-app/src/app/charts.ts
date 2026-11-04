import type { ApexOptions } from 'ng-apexcharts';
import { CALENDAR, CASE_DAYS, CITIES, CLOSED_PERIODS, FACTS } from './case-facts';
import {
  C_ALERT_AT,
  D_ALERT_AT,
  DHAKA_WEEKEND_FROM,
  FINAL_GAP,
  HOURS,
  PRINTED,
  QUEUE_DEPTH,
  THURSDAY,
  WEEK,
  WEEK_HOURS,
  WINDOW,
  toDhakaAxis,
} from './ops-data';
import { LANG, T, tr } from './i18n';

/*
 * Every chart's options, in one place and free of Angular, so scripts/validate-charts.mjs can bundle
 * this file and send each config to the ApexCharts MCP server's apexcharts_validate_config.
 *
 * Started from apexcharts_generate_config (mcp-log/apex-generate-*.md), then set for a Teams screen
 * share: axis labels 16px, lines 3px, no gridlines (compression erases hairlines), no animation.
 *
 * Static on purpose: no toolbar, zoom, selection, tooltip or legend toggling. Nobody in the room can
 * hover a shared screen, and ApexCharts' licence (LICENSE.md, "OEM / Redistribution") states that an
 * app which renders static charts its users cannot configure or interact with needs no OEM licence.
 */

/**
 * ApexCharts needs literal colours. Each is a palette token of the ops theme or a series colour checked
 * with the dataviz skill's validate_palette.js on #002033 (mcp-log/dataviz-validate-series.md).
 */
export const CHART_COLORS = {
  sent: '#2A9FD6', // deck blue stepped into the dark band (OKLCH L 0.48-0.67)
  confirmed: '#D55181', // magenta; dashed, so the pair also differs without colour
  gap: '#9DAFBD', // gray-700, neutral: the gap is a difference, not a third series
  balance: '#2A9FD6',
  text: '#EEF4F8', // gray-900
  muted: '#C7D4DE', // gray-800
  axis: '#3A5466', // gray-300
  weekend: '#1F5677', // surface-50
  labelBg: '#003E61', // surface-200
  alert: '#F0656B', // error-500
} as const;

const FONT = '"Roboto", "Segoe UI", Arial, sans-serif';

/**
 * Screen-reader descriptions stay on; keyboard navigation goes. With it on, every chart and legend item
 * is a tab stop that toggles series on Enter, which is the interaction the static-chart exemption in the
 * ApexCharts licence rules out, and noise in a presenter's tab order.
 */
const STATIC_A11Y = { enabled: true, keyboard: { enabled: false } };

/**
 * Bulgarian day and month names for the datetime axes, from apexcharts/dist/locales/bg.json with the
 * short days in the two-letter form the rest of the page uses. Spread into every chart's `chart`.
 */
const LOCALE =
  LANG === 'bg'
    ? {
        defaultLocale: 'bg',
        locales: [
          {
            name: 'bg',
            options: {
              months: ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
              shortMonths: ['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек'],
              days: ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'],
              shortDays: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            },
          },
        ],
      }
    : {};
const AXIS_FONT = '16px';
/** Legends are read like text, so they take the 18px body floor rather than the 16px axis one. */
const LEGEND_FONT = '18px';

/** What every ops chart shares. */
function base(type: 'line' | 'rangeArea'): ApexOptions {
  return {
    chart: {
      type,
      height: '100%',
      parentHeightOffset: 0,
      background: 'transparent',
      foreColor: CHART_COLORS.muted,
      fontFamily: FONT,
      toolbar: { show: false },
      zoom: { enabled: false },
      selection: { enabled: false },
      animations: { enabled: false },
      accessibility: STATIC_A11Y,
      ...LOCALE,
    },
    theme: { mode: 'dark' },
    grid: { show: false, padding: { left: 8, right: 24 } },
    tooltip: { enabled: false },
    states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } },
    dataLabels: { enabled: false },
    markers: { size: 0 },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontSize: LEGEND_FONT,
      labels: { colors: CHART_COLORS.text },
      onItemClick: { toggleDataSeries: false },
      onItemHover: { highlightDataSeries: false },
    },
    xaxis: {
      type: 'datetime',
      min: toDhakaAxis(WINDOW.from),
      max: toDhakaAxis(WINDOW.to),
      tickAmount: 5,
      labels: {
        // The data is shifted into Dhaka time (ops-data.ts, toDhakaAxis), so read it as UTC.
        datetimeUTC: true,
        format: 'ddd HH:mm',
        style: { fontSize: AXIS_FONT, colors: CHART_COLORS.muted },
      },
      axisBorder: { show: true, color: CHART_COLORS.axis },
      axisTicks: { show: true, color: CHART_COLORS.axis },
    },
  };
}

/** The Dhaka weekend as a shaded band from Friday 00:00. */
function weekendBand() {
  return {
    x: toDhakaAxis(DHAKA_WEEKEND_FROM),
    x2: toDhakaAxis(WINDOW.to),
    fillColor: CHART_COLORS.weekend,
    opacity: 0.35,
    borderColor: 'transparent',
    label: {
      text: tr('Dhaka weekend', 'Уикенд в Дака'),
      orientation: 'horizontal',
      position: 'top',
      textAnchor: 'start',
      offsetX: 8,
      borderColor: 'transparent',
      style: { fontSize: AXIS_FONT, color: CHART_COLORS.text, background: CHART_COLORS.labelBg },
    },
  };
}

/** A vertical alert marker. `low` puts its label left of the line, near the bottom. */
function alertLine(at: number | null, text: string, low = false) {
  return at === null
    ? []
    : [
        {
          x: toDhakaAxis(at),
          borderColor: CHART_COLORS.alert,
          strokeDashArray: 0,
          label: {
            text,
            orientation: 'horizontal',
            // Below the weekend label, or low and to the left, clear of the lines and the gap label.
            position: low ? 'bottom' : 'top',
            textAnchor: low ? 'end' : 'start',
            offsetY: low ? -28 : 34,
            borderColor: CHART_COLORS.alert,
            style: { fontSize: AXIS_FONT, color: '#001724', background: CHART_COLORS.alert },
          },
        },
      ];
}

/** Proposal C: messages sent against confirmations received, running totals, and the gap between them. */
export function sentVsConfirmed(): ApexOptions {
  const x = (t: number) => toDhakaAxis(t);
  const last = HOURS[HOURS.length - 1];
  const b = base('line');
  return {
    ...b,
    series: [
      { name: tr('Sent', 'Изпратени'), type: 'line', data: HOURS.map((p) => ({ x: x(p.t), y: p.sentTotal })) },
      { name: tr('Confirmed', 'Потвърдени'), type: 'line', data: HOURS.map((p) => ({ x: x(p.t), y: p.confirmedTotal })) },
      { name: tr('Gap', 'Разлика'), type: 'column', data: HOURS.map((p) => ({ x: x(p.t), y: p.sentTotal - p.confirmedTotal })) },
    ],
    colors: [CHART_COLORS.sent, CHART_COLORS.confirmed, CHART_COLORS.gap],
    stroke: { width: [4, 4, 0], dashArray: [0, 10, 0], curve: 'stepline' },
    fill: { opacity: [1, 1, 0.85] },
    plotOptions: { bar: { columnWidth: '55%', borderRadius: 2 } },
    yaxis: {
      min: 0,
      title: { text: tr('Messages', 'Съобщения'), style: { fontSize: AXIS_FONT, color: CHART_COLORS.muted } },
      decimalsInFloat: 0,
      labels: { style: { fontSize: AXIS_FONT, colors: CHART_COLORS.muted } },
    },
    annotations: {
      xaxis: [weekendBand(), ...alertLine(C_ALERT_AT, T.status.alert, true)],
      points: [
        {
          x: x(last.t),
          y: last.sentTotal - last.confirmedTotal,
          marker: { size: 0 },
          label: {
            text: `${tr('Gap', 'Разлика')} ${FINAL_GAP}`,
            textAnchor: 'end',
            borderColor: 'transparent',
            style: { fontSize: AXIS_FONT, color: '#001724', background: CHART_COLORS.gap },
          },
        },
      ],
    },
  };
}

/** Proposal D: the balance against its stored band of normal. */
export function balanceBand(): ApexOptions {
  const x = (t: number) => toDhakaAxis(t);
  const b = base('rangeArea');
  return {
    ...b,
    series: [
      { name: tr('Normal (a stored definition)', 'Нормално (записана дефиниция)'), type: 'rangeArea', data: HOURS.map((p) => ({ x: x(p.t), y: [p.bandLow, p.bandHigh] })) },
      { name: tr('Balance', 'Салдо'), type: 'line', data: HOURS.map((p) => ({ x: x(p.t), y: p.balance })) },
    ],
    colors: [CHART_COLORS.balance, CHART_COLORS.balance],
    stroke: { width: [0, 4], curve: 'straight' },
    fill: { opacity: [0.3, 1] },
    yaxis: {
      min: 70,
      max: 110,
      tickAmount: 4,
      title: { text: tr('Balance index', 'Индекс на салдото'), style: { fontSize: AXIS_FONT, color: CHART_COLORS.muted } },
      decimalsInFloat: 0,
      labels: { style: { fontSize: AXIS_FONT, colors: CHART_COLORS.muted } },
    },
    annotations: { xaxis: [weekendBand(), ...alertLine(D_ALERT_AT, T.status.alert)] },
  };
}

// ================================================================== Phase 3

/** A stat tile's sparkline: one line, no axes, no labels. */
function sparkline(name: string, points: { t: number; v: number }[]): ApexOptions {
  return {
    chart: {
      type: 'line',
      height: '100%',
      parentHeightOffset: 0,
      background: 'transparent',
      sparkline: { enabled: true },
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: false },
      accessibility: STATIC_A11Y,
      ...LOCALE,
    },
    series: [{ name, data: points.map((p) => ({ x: toDhakaAxis(p.t), y: p.v })) }],
    xaxis: { type: 'datetime' },
    colors: [CHART_COLORS.sent],
    stroke: { width: 3, curve: 'straight' },
    tooltip: { enabled: false },
    states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } },
  };
}

/** Scene 1: messages sent per hour on the Thursday. */
export const throughputSpark = () => sparkline(tr('Messages per hour', 'Съобщения на час'), THURSDAY.map((p) => ({ t: p.t, v: p.ordinary + p.fraud })));

/** Scene 1: outbound queue depth on the Thursday. */
export const queueSpark = () => sparkline(tr('Queue depth', 'Дълбочина на опашката'), QUEUE_DEPTH.map((p) => ({ t: p.t, v: p.depth })));

/** Scene 1: Thursday to Monday, with each city's closed days drawn as bands from the case facts. */
export function weekWithCalendars(): ApexOptions {
  const b = base('line');
  return {
    ...b,
    legend: { show: false },
    xaxis: {
      ...b.xaxis,
      min: toDhakaAxis(WEEK.from),
      max: toDhakaAxis(WEEK.to),
      tickAmount: 5,
      labels: { ...b.xaxis!.labels, format: 'ddd d' },
    },
    series: [{ name: tr('Messages per hour', 'Съобщения на час'), type: 'line', data: WEEK_HOURS.map((p) => ({ x: toDhakaAxis(p.t), y: p.sent })) }],
    colors: [CHART_COLORS.sent],
    stroke: { width: 3, curve: 'straight' },
    yaxis: {
      min: 0,
      decimalsInFloat: 0,
      tickAmount: 3,
      title: { text: tr('Messages / hour', 'Съобщения / час'), style: { fontSize: AXIS_FONT, color: CHART_COLORS.muted } },
      labels: { style: { fontSize: AXIS_FONT, colors: CHART_COLORS.muted } },
    },
    annotations: {
      // Three translucent bands: where two calendars overlap, the band is darker.
      xaxis: CLOSED_PERIODS.map((p, i) => ({
        x: toDhakaAxis(p.from),
        x2: toDhakaAxis(p.to),
        fillColor: CHART_COLORS.weekend,
        opacity: 0.4,
        borderColor: 'transparent',
        label: {
          text: p.label,
          orientation: 'horizontal',
          position: 'top',
          textAnchor: 'start',
          offsetX: 6,
          offsetY: i * 30,
          borderColor: 'transparent',
          style: { fontSize: AXIS_FONT, color: CHART_COLORS.text, background: CHART_COLORS.labelBg },
        },
      })),
    },
  };
}

/** Heatmap cell colours. Each cell is also labelled, so colour is never the only cue. */
export const CALENDAR_COLORS = {
  open: '#26404F', // gray-200; white text 10.9:1
  closed: '#1A72A6', // MID one step darker; white text 5.3:1
  unknown: '#0E2231', // gray-50; white text 16.3:1
} as const;

const CODE = { open: 1, closed: 0, unknown: -1 };

/** Scene 1: Dhaka, New York and Manila against Thursday to Monday, open or closed. */
export function calendarHeatmap(): ApexOptions {
  // ApexCharts draws the first heatmap series at the bottom; reverse so Dhaka reads first, on top.
  const rows = [...CITIES].reverse().map((c) => ({
    name: c.name,
    data: CASE_DAYS.map((d) => {
      const s = CALENDAR[c.id][d.iso];
      const kind = s.open === true ? 'open' : s.open === false ? 'closed' : 'unknown';
      const label = s.open === true ? T.open : s.open === false ? `${T.closed}: ${s.reason}` : T.noRecord;
      return { x: d.label, y: CODE[kind], label };
    }),
  }));
  return {
    chart: {
      type: 'heatmap',
      height: '100%',
      parentHeightOffset: 0,
      background: 'transparent',
      foreColor: CHART_COLORS.muted,
      fontFamily: FONT,
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: false },
      accessibility: STATIC_A11Y,
      ...LOCALE,
    },
    theme: { mode: 'dark' },
    series: rows,
    plotOptions: {
      heatmap: {
        enableShades: false,
        radius: 4,
        colorScale: {
          ranges: [
            { from: -1.5, to: -0.5, color: CALENDAR_COLORS.unknown, name: T.noRecord },
            { from: -0.5, to: 0.5, color: CALENDAR_COLORS.closed, name: T.closed },
            { from: 0.5, to: 1.5, color: CALENDAR_COLORS.open, name: T.open },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: { fontSize: AXIS_FONT, fontWeight: 700, colors: ['#FFFFFF'] },
      // Each cell says what it is, so colour is never the only cue.
      formatter: (_value, opts) => (opts ? rows[opts.seriesIndex].data[opts.dataPointIndex].label : ''),
    },
    stroke: { width: 4, colors: ['#002033'] },
    legend: { show: false },
    tooltip: { enabled: false },
    states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } },
    grid: { padding: { top: -16, right: 8, bottom: -4, left: 8 } },
    xaxis: {
      type: 'category',
      labels: { style: { fontSize: AXIS_FONT, colors: CHART_COLORS.text } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { labels: { style: { fontSize: AXIS_FONT, colors: CHART_COLORS.text } } },
  };
}

/** Scene 2: confirmations printed per hour on the Thursday. */
export function printedPerHour(): ApexOptions {
  const b = base('line');
  return {
    ...b,
    chart: { ...b.chart!, type: 'bar' },
    legend: { show: false },
    xaxis: { ...b.xaxis, min: undefined, max: undefined, tickAmount: 6, labels: { ...b.xaxis!.labels, format: 'HH:mm' } },
    series: [{ name: tr('Confirmations printed', 'Отпечатани потвърждения'), data: PRINTED.map((p) => ({ x: toDhakaAxis(p.t), y: p.printed })) }],
    colors: [CHART_COLORS.sent],
    plotOptions: { bar: { columnWidth: '70%', borderRadius: 2 } },
    yaxis: {
      min: 0,
      decimalsInFloat: 0,
      tickAmount: 3,
      title: { text: tr('Printed', 'Отпечатани'), style: { fontSize: AXIS_FONT, color: CHART_COLORS.muted } },
      labels: { style: { fontSize: AXIS_FONT, colors: CHART_COLORS.muted } },
    },
  };
}

/** Horizontal bars with category labels on the left. */
function hbars(): ApexOptions {
  return {
    chart: {
      type: 'bar',
      height: '100%',
      parentHeightOffset: 0,
      background: 'transparent',
      foreColor: CHART_COLORS.muted,
      fontFamily: FONT,
      toolbar: { show: false },
      zoom: { enabled: false },
      selection: { enabled: false },
      animations: { enabled: false },
      accessibility: STATIC_A11Y,
      ...LOCALE,
    },
    theme: { mode: 'dark' },
    grid: { show: false, padding: { right: 24 } },
    tooltip: { enabled: false },
    states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } },
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontSize: LEGEND_FONT,
      labels: { colors: CHART_COLORS.text },
      onItemClick: { toggleDataSeries: false },
      onItemHover: { highlightDataSeries: false },
    },
    yaxis: { labels: { style: { fontSize: AXIS_FONT, colors: CHART_COLORS.text } } },
  };
}

/** Scene 6: the 35 instructions, in USD millions. Real figures only; nothing is summed or derived. */
export function instructionsOutcome(): ApexOptions {
  const h = hbars();
  return {
    ...h,
    chart: { ...h.chart!, stacked: true },
    series: [
      { name: tr('Stopped in New York', 'Спрени в Ню Йорк'), data: [FACTS.stoppedValue.value, 0] },
      { name: tr('To Manila', 'За Манила'), data: [0, FACTS.manila.value] },
      { name: tr('To Sri Lanka', 'За Шри Ланка'), data: [0, FACTS.sriLanka.value] },
    ],
    colors: [CHART_COLORS.gap, CHART_COLORS.sent, CHART_COLORS.confirmed],
    plotOptions: { bar: { horizontal: true, barHeight: '55%', borderRadius: 2 } },
    stroke: { width: 2, colors: ['#002033'] },
    xaxis: {
      categories: [
        `${tr('Stopped', 'Спрени')} (${FACTS.stoppedNewYork.value})`,
        `${tr('Completed', 'Изпълнени')} (${FACTS.completed.value})`,
      ],
      title: { text: tr('USD million', 'млн. USD'), style: { fontSize: AXIS_FONT, color: CHART_COLORS.muted } },
      labels: { style: { fontSize: AXIS_FONT, colors: CHART_COLORS.muted } },
    },
  };
}

/** Scene 6: sent and recovered, per destination, in USD millions. */
export function recovery(): ApexOptions {
  const h = hbars();
  return {
    ...h,
    series: [
      { name: tr('Sent', 'Изпратени'), data: [FACTS.sriLanka.value, FACTS.manila.value] },
      { name: tr('Recovered', 'Възстановени'), data: [FACTS.sriLankaRecovered.value, FACTS.recovered2025.value] },
    ],
    colors: [CHART_COLORS.sent, CHART_COLORS.confirmed],
    plotOptions: { bar: { horizontal: true, barHeight: '70%', borderRadius: 2 } },
    stroke: { width: 2, colors: ['#002033'] },
    xaxis: {
      categories: [tr('Sri Lanka', 'Шри Ланка'), tr('Manila', 'Манила')],
      title: { text: tr('USD million', 'млн. USD'), style: { fontSize: AXIS_FONT, color: CHART_COLORS.muted } },
      labels: { style: { fontSize: AXIS_FONT, colors: CHART_COLORS.muted } },
    },
  };
}

/** Scene 7: the panel that scene 2 had no query for, now built. Two lines, no gap column. */
export function builtPanel(): ApexOptions {
  const o = sentVsConfirmed();
  return {
    ...o,
    series: (o.series as { name: string }[]).slice(0, 2) as ApexOptions['series'],
    colors: [CHART_COLORS.sent, CHART_COLORS.confirmed],
    stroke: { width: [4, 4], dashArray: [0, 10], curve: 'stepline' },
    fill: { opacity: [1, 1] },
    plotOptions: undefined,
    annotations: { xaxis: o.annotations!.xaxis },
  };
}

/** Every chart that ships, by name. validate-charts.mjs sends each one to the MCP validator. */
export const CHARTS = {
  'scene1-throughput-spark': throughputSpark,
  'scene1-queue-spark': queueSpark,
  'scene1-week-calendars': weekWithCalendars,
  'scene1-calendar-heatmap': calendarHeatmap,
  'scene2-printed-per-hour': printedPerHour,
  'scene5-c-sent-vs-confirmed': sentVsConfirmed,
  'scene5-d-balance-band': balanceBand,
  'scene6-instructions': instructionsOutcome,
  'scene6-recovery': recovery,
  'scene7-built-panel': builtPanel,
};
