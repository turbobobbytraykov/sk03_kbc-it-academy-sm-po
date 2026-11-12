// No Angular in this file: charts.ts imports it, and scripts/validate-charts.mjs bundles that for Node,
// where there is no page and the language is English.

export type Lang = 'en' | 'bg';

/**
 * The page's `<html lang>` decides the language: the build writes a copy of index.html to `bg/`
 * with `lang="bg"`, so `/bg/` is Bulgarian with the same bundle. `?lang=bg` overrides it, for `ng serve`.
 */
function detectLang(): Lang {
  if (typeof document === 'undefined') return 'en';
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'bg' || q === 'en') return q;
  return document.documentElement.lang === 'bg' ? 'bg' : 'en';
}

export const LANG = detectLang();

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

const EN = {
  brandTitle: 'Payment outage',
  brandSub: 'M3 L5 · Incident simulation',
  screens: { case: 'The case', action: 'Action', log: 'Log', reveal: 'Reveal' },
  langSwitch: 'БГ',
  langSwitchLabel: 'Български',
  backToAction: 'Back to the action screen',
  stateTime: 'time is up',
  stateRunning: 'running',
  statePaused: 'paused',
  stateRemaining: 'remaining',
  theCase: 'The case',
  /** Accessible name of the overlay button, so it differs from the tab of the same name. */
  theCaseOverlay: 'The case, over this screen',
  goToAction: 'Go to the action screen',
  shortcuts: 'Space starts and pauses the clock · 1 to 4 switch screens',
  resetEllipsis: 'Reset…',
  storyTimeInline: 'story time',
  close: 'Close (Esc)',
  resetTitle: 'Reset',
  resetClock: 'Reset the clock',
  resetClockText: 'Back to 25:00 and Moment 1, paused. Severity and classification are cleared. Logged decisions are kept.',
  resetAll: 'Reset everything',
  resetAllText: 'The same, and every logged decision is deleted. Use this between groups.',
  cancel: 'Cancel',

  // case view
  premise: 'Premise',
  goal: 'Goal',
  whoDoesWhat: 'Who does what',
  role: 'Role',
  may: 'May',
  mayNot: 'May not',

  // action screen
  elapsed: (t: string) => `${t} elapsed`,
  storyTime: 'Story time',
  weekday: 'Wednesday',
  resetClockButton: 'Reset clock…',
  failing: 'Failing',
  failingTrend: (rates: string) => `Failure rate at each moment so far: ${rates}.`,
  spaceKey: 'Space',
  clockAria: 'Time remaining on the 25-minute clock',
  timelineAria: 'Time elapsed on the 25-minute clock',
  severity: 'Severity',
  notSet: 'not set',
  classified: 'Classified',
  classifiedYes: (at: string) => `yes, ${at}`,
  no: 'no',
  reportClock: (due: string) => `Four-hour reporting clock runs to ${due}`,
  severityInput: 'Severity, as the room decided',
  openReveal: 'Open the reveal',
  start: 'Start',
  pause: 'Pause',
  resume: 'Resume',
  hold: 'Hold next moment',
  releaseHold: 'Release hold',
  advance: 'Advance now',
  next: 'Next:',
  held: 'Held:',
  momentAt: (id: number, clock: string) => `Moment ${id} at ${clock}`,
  lastMoment: 'Last moment',
  momentOf: (id: number, of: number) => `Moment ${id} of ${of}`,
  markerPrefix: 'M',
  justArrived: 'Just arrived',
  decisionRequired: 'Decision required',
  whatDecided: 'What was decided',
  whoDecided: 'Who decided',
  authorised: 'Authorised',
  notAuthorised: 'Not authorised',
  countLine: (moment: number, total: number) => `${moment} logged for this moment · ${total} in total`,
  pickRole: 'Now pick who decided',

  // notices
  undo: 'Undo',
  logged: (authorised: boolean, role: string) => `Logged: ${authorised ? 'authorised' : 'not authorised'} · ${role}`,
  pulledForward: (id: number) => `Moment ${id} pulled forward`,
  deleted: 'Decision deleted',

  // log
  logTitle: 'Incident log',
  logIntro: 'This is the live incident document: every decision, when it was made, and who made it.',
  tallyDecisions: 'decisions',
  tallyAuthorised: 'authorised',
  tallyNotAuthorised: 'not authorised',
  logEmpty: 'No decisions logged yet. Log them from the action screen as the room makes them.',
  colClock: 'Clock',
  colStory: 'Story',
  colMoment: 'Moment',
  colVerdict: 'Verdict',
  colActions: 'Actions',
  editTitle: 'Correct a decision',
  chartClock: 'Who decided, and when',
  chartClockAria: (n: number) => `${n} decisions placed on the 25-minute clock, one lane per role, marked authorised or not authorised.`,
  chartMoment: 'Decisions per moment',
  chartMomentAria: 'Authorised and not authorised decisions, counted for each of the four moments.',
  save: 'Save',
  correct: 'Correct',
  delete: 'Delete',

  // reveal
  revealTitle: 'What happened',
  revealProgress: (n: number, of: number) => `${n} of ${of}`,
  back: 'Back',
  startReveal: 'Start the reveal',
  nextPoint: 'Next point',
  tallyAria: (authorised: number, notAuthorised: number) => `${authorised} authorised, ${notAuthorised} not authorised.`,
  tallyLine: (total: number, notAuthorised: number) =>
    `You made ${plural(total, '1 decision', `${total} decisions`)}, ${notAuthorised} of them by somebody who was not authorised to make ${plural(total, 'it', 'them')}.`,
};

export type UiText = typeof EN;

const BG: UiText = {
  brandTitle: 'Срив в плащанията',
  brandSub: 'M3 L5 · Симулация на инцидент',
  screens: { case: 'Казусът', action: 'Действие', log: 'Дневник', reveal: 'Развръзка' },
  langSwitch: 'EN',
  langSwitchLabel: 'English',
  backToAction: 'Обратно към екрана за действие',
  stateTime: 'край',
  stateRunning: 'тече',
  statePaused: 'пауза',
  stateRemaining: 'остават',
  theCase: 'Казусът',
  theCaseOverlay: 'Казусът, върху този екран',
  goToAction: 'Към екрана за действие',
  shortcuts: 'Интервал пуска и спира часовника · 1 до 4 сменят екраните',
  resetEllipsis: 'Нулиране…',
  storyTimeInline: 'време в историята',
  close: 'Затвори (Esc)',
  resetTitle: 'Нулиране',
  resetClock: 'Нулирай часовника',
  resetClockText: 'Обратно на 25:00 и Момент 1, на пауза. Тежестта и класификацията се изчистват. Записаните решения се запазват.',
  resetAll: 'Нулирай всичко',
  resetAllText: 'Същото, и всички записани решения се изтриват. За използване между групите.',
  cancel: 'Отказ',

  premise: 'Изходна ситуация',
  goal: 'Цел',
  whoDoesWhat: 'Кой какво прави',
  role: 'Роля',
  may: 'Може',
  mayNot: 'Не може',

  elapsed: (t) => `изминали ${t}`,
  storyTime: 'Време в историята',
  weekday: 'Сряда',
  resetClockButton: 'Нулирай часовника…',
  failing: 'Неуспешни',
  failingTrend: (rates) => `Дял на неуспешните във всеки момент досега: ${rates}.`,
  spaceKey: 'Интервал',
  clockAria: 'Оставащо време на 25-минутния часовник',
  timelineAria: 'Изминало време на 25-минутния часовник',
  severity: 'Тежест',
  notSet: 'не е зададена',
  classified: 'Класифициран',
  classifiedYes: (at) => `да, ${at}`,
  no: 'не',
  reportClock: (due) => `Четиричасовият срок за докладване изтича в ${due}`,
  severityInput: 'Тежест според залата',
  openReveal: 'Към развръзката',
  start: 'Старт',
  pause: 'Пауза',
  resume: 'Продължи',
  // Short: the controls column is as wide as its longest label, and that width comes out of the status zone.
  hold: 'Задръж следващия',
  releaseHold: 'Пусни задържания',
  advance: 'Пусни го веднага',
  next: 'Следва:',
  held: 'Задържан:',
  momentAt: (id, clock) => `Момент ${id} в ${clock}`,
  lastMoment: 'Последен момент',
  momentOf: (id, of) => `Момент ${id} от ${of}`,
  markerPrefix: 'М',
  justArrived: 'Ново',
  decisionRequired: 'Необходимо решение',
  whatDecided: 'Какво беше решено',
  whoDecided: 'Кой реши',
  authorised: 'Има право',
  notAuthorised: 'Няма право',
  countLine: (moment, total) => `${moment} за този момент · ${total} общо`,
  pickRole: 'Сега изберете кой реши',

  undo: 'Отмени',
  // No "Записано:" prefix: with the longest role it would need a third line. The coloured edge and Undo say it was logged.
  logged: (authorised, role) => `${authorised ? 'Има право' : 'Няма право'} · ${role}`,
  pulledForward: (id) => `Момент ${id} е пуснат по-рано`,
  deleted: 'Решението е изтрито',

  logTitle: 'Дневник на инцидента',
  logIntro: 'Това е живият документ на инцидента: всяко решение, кога е взето и кой го е взел.',
  tallyDecisions: 'решения',
  tallyAuthorised: 'с право',
  tallyNotAuthorised: 'без право',
  logEmpty: 'Още няма записани решения. Записвайте ги от екрана за действие, докато залата ги взема.',
  colClock: 'Време',
  colStory: 'История',
  colMoment: 'Момент',
  colVerdict: 'Право',
  colActions: 'Действия',
  editTitle: 'Корекция на решение',
  chartClock: 'Кой реши и кога',
  chartClockAria: (n) => `${n} решения върху 25-минутния часовник, по един ред за всяка роля, отбелязани с право или без право.`,
  chartMoment: 'Решения по моменти',
  chartMomentAria: 'Решенията с право и без право, преброени за всеки от четирите момента.',
  save: 'Запази',
  correct: 'Коригирай',
  delete: 'Изтрий',

  revealTitle: 'Какво се случи',
  revealProgress: (n, of) => `${n} от ${of}`,
  back: 'Назад',
  startReveal: 'Започни',
  nextPoint: 'Следваща точка',
  tallyAria: (authorised, notAuthorised) => `${authorised} с право, ${notAuthorised} без право.`,
  tallyLine: (total, notAuthorised) =>
    `Взехте ${plural(total, '1 решение', `${total} решения`)}, ${notAuthorised} от тях от човек, който нямаше право да ${plural(total, 'го', 'ги')} взема.`,
};

/** Interface text in the page's language. Case content is in case.ts. */
export const T: UiText = LANG === 'bg' ? BG : EN;
