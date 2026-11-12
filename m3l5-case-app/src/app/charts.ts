import type { ApexOptions } from 'ng-apexcharts';
import { T } from './i18n';

/*
 * Every chart's options, in one place and free of Angular, so scripts/validate-charts.mjs can bundle
 * this file and send each config to the ApexCharts MCP server's apexcharts_validate_config.
 *
 * Set for a projector and a Teams share, as in the M3 L4 app: axis labels 16px, legends 18px, lines
 * 4px, no gridlines, no animation. Static on purpose: no toolbar, zoom, selection, tooltip or legend
 * toggling. Nobody in the room can hover the projection.
 */

/** ApexCharts needs literal colours. Each one is a token of the deck palette in styles.scss. */
export const CHART_COLORS = {
  authorised: '#1B7FB8', // MID, info-500
  notAuthorised: '#C62828', // error-500
  navy: '#003E61', // primary-500
  grey: '#516674', // gray-700
  line: '#8EC9EB', // primary-200
  white: '#FFFFFF',
} as const;

const FONT = '"Roboto", "Segoe UI", Arial, sans-serif';

/**
 * ApexCharts takes font sizes in pixels, and the page is drawn in rem with a root size that follows the
 * window (21px at 1920x1080). So chart text is sized from the root as the page loads: 16px axis labels
 * and 18px legends at the design size, and in proportion on a smaller window. In Node there is no page.
 */
const ROOT_PX = typeof document === 'undefined' ? 21 : parseFloat(getComputedStyle(document.documentElement).fontSize) || 21;
const px = (atDesignSize: number) => `${((atDesignSize * ROOT_PX) / 21).toFixed(1)}px`;
const AXIS_FONT = px(16);
const LEGEND_FONT = px(18);

/** Screen-reader descriptions stay on; chart keyboard navigation would add tab stops that toggle series. */
const STATIC_A11Y = { enabled: true, keyboard: { enabled: false } };

const STATIC = {
  tooltip: { enabled: false },
  states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } },
} satisfies ApexOptions;

function chart(type: 'line' | 'scatter' | 'bar', extra: ApexOptions['chart'] = {}): ApexOptions['chart'] {
  return {
    type,
    height: '100%',
    parentHeightOffset: 0,
    background: 'transparent',
    foreColor: CHART_COLORS.grey,
    fontFamily: FONT,
    toolbar: { show: false },
    zoom: { enabled: false },
    selection: { enabled: false },
    animations: { enabled: false },
    accessibility: STATIC_A11Y,
    ...extra,
  };
}

/**
 * Authorised is solid and not authorised is hatched, so the pair differs without colour. Labels sit
 * on a white pill, readable on either fill.
 */
const VERDICT_FILL: ApexOptions['fill'] = {
  type: ['solid', 'pattern'],
  opacity: 1,
  pattern: { style: 'slantedLines', width: 7, height: 7, strokeWidth: 3 },
};

const PILL_LABELS: ApexOptions['dataLabels'] = {
  enabled: true,
  // With a background, style.colors is the pill and background.foreColor the text.
  style: { fontSize: AXIS_FONT, fontWeight: 700, colors: [CHART_COLORS.white] },
  background: { enabled: true, foreColor: CHART_COLORS.navy, padding: 5, borderRadius: 4, borderWidth: 0, opacity: 1 },
  dropShadow: { enabled: false },
};

const LEGEND: ApexOptions['legend'] = {
  show: true,
  position: 'top',
  horizontalAlign: 'left',
  fontSize: LEGEND_FONT,
  labels: { colors: CHART_COLORS.navy },
  onItemClick: { toggleDataSeries: false },
  onItemHover: { highlightDataSeries: false },
};

// ---------------------------------------------------------------- action screen

export interface TrendPoint {
  /** Story time of the moment, HH:MM. */
  story: string;
  /** Failure rate in percent, or null for a moment that has not arrived: the line stops there. */
  rate: number | null;
}

/** The failure rate at each moment that has arrived. Later moments keep their place on the axis, empty. */
export function failureTrend(points: TrendPoint[]): ApexOptions {
  return {
    chart: chart('line'),
    series: [{ name: T.failing, data: points.map((p) => p.rate) }],
    colors: [CHART_COLORS.white],
    stroke: { width: 4, curve: 'straight' },
    markers: { size: 6, colors: [CHART_COLORS.white], strokeColors: CHART_COLORS.navy, strokeWidth: 2 },
    dataLabels: {
      enabled: true,
      offsetY: -8,
      formatter: (value) => (value === null || value === undefined ? '' : `${value}%`),
      style: { fontSize: AXIS_FONT, fontWeight: 700, colors: [CHART_COLORS.navy] },
      background: { enabled: true, foreColor: CHART_COLORS.white, padding: 4, borderRadius: 3, borderWidth: 0, opacity: 1 },
      dropShadow: { enabled: false },
    },
    grid: { show: false, padding: { top: 18, right: 22, bottom: 0, left: 22 } },
    legend: { show: false },
    xaxis: {
      categories: points.map((p) => p.story),
      labels: { style: { fontSize: AXIS_FONT, colors: CHART_COLORS.line } },
      axisBorder: { show: true, color: CHART_COLORS.line },
      axisTicks: { show: false },
    },
    yaxis: { min: 0, max: 50, show: false },
    ...STATIC,
  };
}

// ---------------------------------------------------------------- log screen

export interface ChartDecision {
  elapsedSeconds: number;
  momentId: number;
  /** Index into the role list. */
  role: number;
  authorised: boolean;
}

export interface ChartMoment {
  id: number;
  storyTime: string;
  /** Seconds on the clock at which it arrived, or null if it has not. */
  arrivedAt: number | null;
}

const clock = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(Math.round(seconds) % 60).padStart(2, '0')}`;

/** Who decided, and when: one lane per role across the 25 minutes, one mark per decision. */
export function decisionsOnClock(log: ChartDecision[], roles: string[], moments: ChartMoment[], duration: number): ApexOptions {
  const points = (authorised: boolean) =>
    log.filter((d) => d.authorised === authorised).map((d) => ({ x: d.elapsedSeconds, y: d.role }));
  return {
    chart: chart('scatter'),
    series: [
      { name: T.authorised, data: points(true) },
      { name: T.notAuthorised, data: points(false) },
    ],
    colors: [CHART_COLORS.authorised, CHART_COLORS.notAuthorised],
    // A circle and a square, so the verdict reads without colour.
    markers: { size: 11, shape: ['circle', 'square'], strokeWidth: 2, strokeColors: CHART_COLORS.white },
    dataLabels: { enabled: false },
    grid: {
      show: true,
      borderColor: CHART_COLORS.line,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      // Room above the first lane for the moment labels, and below the last for its marks.
      padding: { top: 22, right: 28, bottom: 6, left: 12 },
    },
    legend: LEGEND,
    xaxis: {
      type: 'numeric',
      min: 0,
      max: duration,
      tickAmount: 5,
      labels: { formatter: (value) => clock(Number(value)), style: { fontSize: AXIS_FONT, colors: CHART_COLORS.grey } },
      axisBorder: { show: true, color: CHART_COLORS.line },
      axisTicks: { show: true, color: CHART_COLORS.line },
    },
    yaxis: {
      min: 0,
      max: roles.length - 1,
      tickAmount: roles.length - 1,
      reversed: true,
      labels: {
        formatter: (value) => roles[Math.round(value)] ?? '',
        // Role names in full: the default 160px cuts "Head of Retail Banking".
        maxWidth: 320,
        style: { fontSize: AXIS_FONT, colors: CHART_COLORS.navy },
      },
    },
    annotations: {
      // Where each moment arrived on the clock, which differs from the plan if it was held or pulled forward.
      xaxis: moments
        .filter((m) => m.arrivedAt !== null)
        .map((m) => ({
          x: m.arrivedAt as number,
          borderColor: CHART_COLORS.grey,
          strokeDashArray: 6,
          label: {
            text: `${T.markerPrefix}${m.id} · ${m.storyTime}`,
            orientation: 'horizontal',
            position: 'top',
            textAnchor: 'start',
            offsetX: 4,
            offsetY: -24,
            borderColor: 'transparent',
            style: { fontSize: AXIS_FONT, color: CHART_COLORS.grey, background: 'transparent' },
          },
        })),
    },
    ...STATIC,
  };
}

/** Decisions per moment, authorised stacked on not authorised. */
export function decisionsByMoment(log: ChartDecision[], moments: ChartMoment[]): ApexOptions {
  const count = (authorised: boolean) =>
    moments.map((m) => log.filter((d) => d.momentId === m.id && d.authorised === authorised).length);
  const most = Math.max(1, ...moments.map((m) => log.filter((d) => d.momentId === m.id).length));
  return {
    chart: chart('bar', { stacked: true }),
    series: [
      { name: T.authorised, data: count(true) },
      { name: T.notAuthorised, data: count(false) },
    ],
    colors: [CHART_COLORS.authorised, CHART_COLORS.notAuthorised],
    fill: VERDICT_FILL,
    stroke: { width: 2, colors: [CHART_COLORS.white] },
    plotOptions: { bar: { columnWidth: '55%', borderRadius: 2 } },
    dataLabels: { ...PILL_LABELS, formatter: (value) => (Number(value) > 0 ? `${value}` : '') },
    grid: { show: false, padding: { top: 0, right: 8, bottom: 0, left: 8 } },
    legend: LEGEND,
    xaxis: {
      categories: moments.map((m) => `${T.markerPrefix}${m.id} · ${m.storyTime}`),
      labels: { style: { fontSize: AXIS_FONT, colors: CHART_COLORS.navy } },
      axisBorder: { show: true, color: CHART_COLORS.line },
      axisTicks: { show: false },
    },
    // Whole decisions only, with headroom so a label never touches the legend.
    yaxis: { min: 0, max: most + 1, show: false },
    ...STATIC,
  };
}

// ---------------------------------------------------------------- reveal

/** The tally as one bar: authorised against not authorised, each labelled with its count. */
export function tallyBar(authorised: number, notAuthorised: number): ApexOptions {
  const names = [T.tallyAuthorised, T.tallyNotAuthorised];
  return {
    chart: chart('bar', { stacked: true, sparkline: { enabled: true } }),
    series: [
      { name: names[0], data: [authorised] },
      { name: names[1], data: [notAuthorised] },
    ],
    colors: [CHART_COLORS.authorised, CHART_COLORS.notAuthorised],
    fill: VERDICT_FILL,
    stroke: { width: 2, colors: [CHART_COLORS.white] },
    plotOptions: { bar: { horizontal: true, barHeight: '100%', borderRadius: 4 } },
    dataLabels: {
      ...PILL_LABELS,
      formatter: (value, opts) => (Number(value) > 0 ? `${value} ${names[opts?.seriesIndex ?? 0]}` : ''),
    },
    grid: { show: false, padding: { top: 0, right: 0, bottom: 0, left: 0 } },
    legend: { show: false },
    xaxis: { categories: [''], max: Math.max(1, authorised + notAuthorised) },
    yaxis: { show: false },
    ...STATIC,
  };
}

// ---------------------------------------------------------------- validation samples

const SAMPLE_ROLES = ['Duty engineer', 'IT operations manager', 'Product owner', 'Head of Retail Banking', 'Incident recorder'];
const SAMPLE_MOMENTS: ChartMoment[] = [
  { id: 1, storyTime: '02:40', arrivedAt: 0 },
  { id: 2, storyTime: '03:20', arrivedAt: 360 },
  { id: 3, storyTime: '05:15', arrivedAt: 780 },
  { id: 4, storyTime: '07:50', arrivedAt: 1200 },
];
const SAMPLE_LOG: ChartDecision[] = [
  { elapsedSeconds: 95, momentId: 1, role: 0, authorised: false },
  { elapsedSeconds: 430, momentId: 2, role: 1, authorised: true },
  { elapsedSeconds: 520, momentId: 2, role: 1, authorised: false },
  { elapsedSeconds: 900, momentId: 3, role: 2, authorised: false },
  { elapsedSeconds: 1290, momentId: 4, role: 3, authorised: true },
];

/** Every chart that ships, by name, with sample data. validate-charts.mjs sends each to the MCP validator. */
export const CHARTS = {
  'action-failure-trend': () =>
    failureTrend([
      { story: '02:40', rate: 3 },
      { story: '03:20', rate: 22 },
      { story: '05:15', rate: 40 },
      { story: '07:50', rate: null },
    ]),
  'log-decisions-on-clock': () => decisionsOnClock(SAMPLE_LOG, SAMPLE_ROLES, SAMPLE_MOMENTS, 1500),
  'log-decisions-by-moment': () => decisionsByMoment(SAMPLE_LOG, SAMPLE_MOMENTS),
  'reveal-tally-bar': () => tallyBar(2, 3),
};
