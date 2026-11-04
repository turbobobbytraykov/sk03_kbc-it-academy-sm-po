/**
 * Interface text in English and Bulgarian, the way the M3 L5 app does it. Case wording is not here: it
 * comes from the deck, in case.en.ts and case-facts.en.ts, with the Bulgarian in the matching .bg.ts files.
 *
 * No Angular in this file: charts.ts and ops-data.ts import it, and scripts/validate-charts.mjs bundles
 * those for Node, where there is no page and the language is English.
 */

export type Lang = 'en' | 'bg';

/**
 * The page's `<html lang>` decides the language: the build writes a copy of index.html to `bg/` with
 * `lang="bg"`, so `/bg/` is Bulgarian with the same bundle. `?lang=bg` overrides it, for `ng serve`.
 */
function detectLang(): Lang {
  if (typeof document === 'undefined') return 'en';
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'bg' || q === 'en') return q;
  return document.documentElement.lang === 'bg' ? 'bg' : 'en';
}

export const LANG = detectLang();

/** For invented telemetry and chart labels, where the pair reads best side by side. */
export const tr = (en: string, bg: string) => (LANG === 'bg' ? bg : en);

const EN = {
  brandTitle: 'Missed Signals',
  brandSub: 'Module 3 Lesson 4 · Observability & Monitoring',
  langSwitch: 'БГ',
  langSwitchLabel: 'Български',

  tabCase: 'The case',
  tabOps: 'The ops view',
  tabsLabel: 'Page',
  theCase: 'The case',
  /** Accessible name of the overlay button, so it differs from the tab of the same name. */
  theCaseOverlay: 'The case, over this scene',
  close: 'Close',

  premise: 'Premise',
  playOut: 'What will play out',
  playOutLead: 'Seven scenes in the ops view, one per case slide.',
  decision: 'Your decision',
  questions: 'Three questions',
  howToRead: 'How to read the ops screens',
  source: 'Source:',
  illustrative: 'Illustrative',
  timelineLabel: 'Timeline',

  resetEllipsis: 'Reset…',
  resetTitle: 'Reset for the next group?',
  resetText:
    'Clears the votes, the reveals and the device or finding reading, and goes back to scene 1. Use it between the two groups.',
  resetConfirm: 'Reset',
  cancel: 'Cancel',

  scenesLabel: 'Scenes',
  sceneOf: (n: number, total: number) => `Scene ${n} of ${total}`,

  worldClock: 'Business day',
  open: 'Open',
  closed: 'Closed',
  noRecord: 'Not in sources',
  noRecordTitle: 'The case sources do not say whether banks here were open on this day.',

  status: { ok: 'OK', warn: 'WARN', alert: 'ALERT', nodata: 'NO DATA' },
  gap: (n: number) => `gap ${n}`,
  realCount: (n: number) => `The ${n} is real.`,

  // scene 3, Pager
  incidents: 'Incidents',
  openCount: (n: number) => `${n} open`,
  incidentsLabel: 'Open incidents, Friday 5 February',
  colUrgency: 'Urgency',
  colId: 'ID',
  colTitle: 'Alert',
  colRouted: 'Routed to',
  colOpened: 'Opened (Dhaka)',
  colStatus: 'Status',
  urgencyLow: 'Low',
  urgencyHigh: 'High',
  dayLevelOpened: 'Fri 5 Feb, morning',
  readingLabel: 'How the printer alert is read',
  readAsDevice: 'Read as a device fault',
  readAsFinding: 'Read as a finding',
  sameAlert: 'The same alert, INC-4127',
  pageSent: 'Page sent',
  pageText: 'Confirmation printer silent. No confirmations are reaching the payments back office.',
  queued: 'In the queue',
  queuedText: 'Waits for desktop support on the next working day.',
  onCall: 'On call, Fri 5 – Sat 6 Feb',
  onCallSub: 'The Dhaka weekend. Roles, not people.',
  pageable: 'Takes pages',
  notPageable: 'No pages',

  // scene 5, Panels
  revealWindow: 'Thu 4 Feb 08:00 – Fri 5 Feb 12:00, Dhaka',
  revealProgress: (n: number, of: number) => `${n} of ${of}`,
  revealNext: 'Add the next proposal',
  revealKey: '(R)',
  hideLast: 'Remove the last',
  revealEmpty: 'Each proposal joins the dashboard in turn, in the deck\'s order: A, B, D, C. Press R.',
  approvalsLabel: 'Approvals queue, Thursday 4 February',
  colRef: 'Payment',
  colAmount: 'USD',
  colChecker: 'Second approver',
  everyRowSigned: 'every row signed',
  outsideBand: 'outside the band',
  cRule: 'Rule: nothing confirmed for 30 min while sending',
  // scene 4, votes
  votes: (n: number) => `${n} ${n === 1 ? 'vote' : 'votes'}`,
  votesFor: (id: string) => `Votes for ${id}`,
  addVote: (id: string) => `+1 vote for ${id}`,
  removeVote: (id: string) => `−1 vote for ${id}`,
  votesNote: 'Click +1 as each breakout room names its pick in the chat. The counts are kept until Reset.',

  // scene 1, payments overview
  thursday: 'Thu 4 Feb, Dhaka',
  statGateway: 'Payment gateway',
  statGatewayValue: 'Up all day',
  statQueue: 'Outbound queue',
  statQueueValue: (max: number) => `Depth 0–${max}`,
  statMessages: 'Payment messages',
  statMessagesValue: (n: number) => `${n} sent`,
  statPrinter: 'Confirmation printer',
  statPrinterValue: 'Printing',
  calendarsTitle: 'Business calendars, Thu 4 – Mon 8 Feb',
  calendarsNote: 'Manila\'s Saturday and Sunday are not in the sources.',
  weekTitle: 'Messages per hour, Thu 4 – Mon 8 Feb (Dhaka)',
  weekNote: 'Messages invented. The closed periods are the sources\' days, each city\'s own, drawn in Dhaka time.',

  // scene 2, controls
  devicesTitle: 'Devices',
  devicesDetail: (n: number, of: number) => `${n} of ${of}`,
  printedTitle: 'Confirmations printed per hour, Thu 4 Feb',
  noQueryTitle: 'Messages sent vs confirmations received',
  noQueryText: 'No data — no query defined: messages sent vs confirmations received',
  watchedHead: 'What was watched',

  // scene 6, afterwards
  timelineTitle: 'Incident timeline',
  sources: 'Sources',
  timelineStatus: 'Resolved',
  outcomeTitle: 'Outcome',
  instructionsTitle: 'The 35 instructions, USD million',
  recoveryTitle: 'Sent and recovered, USD million',
  completedLine: (n: number, manila: number, sriLanka: number) =>
    `${n} completed: USD ${manila}m to Manila, USD ${sriLanka}m to Sri Lanka.`,

  // scene 7, the lesson
  builtTitle: 'Messages sent vs confirmations received',
  ruleTitle: 'Alert rule',
  ruleLabel: 'Fires when',
  ruleText: (minutes: number) => `No confirmation received for ${minutes} minutes while messages are being sent`,
  ruleRoutes: 'Routes to',
  ruleRoutesValue: 'Payments on-call, as a page',
  ownerLabel: (role: string) => `Owner: ${role}`,
  ownerRole: 'Head of payment operations',
  firing: 'firing',

  hoursIllustrative: 'Hours invented: reporting gives the day, not the hour.',

  /** What each chart shows, for screen readers. */
  chart: {
    queue: 'Outbound queue depth through Thursday, never above three.',
    throughput: 'Payment messages per hour through Thursday, busy in office hours, with more in the evening.',
    calendar: 'Dhaka is closed Friday and Saturday, New York Saturday and Sunday, Manila Monday for Chinese New Year.',
    week: 'Messages per hour from Thursday to Monday, with the three cities\' closed periods overlapping from Friday to Monday.',
    printed: 'Confirmations printed per hour on Thursday: steady in office hours, nothing in the evening.',
    d: 'Account balance against its band of normal. The balance leaves the band on Thursday evening and stays below it.',
    c: 'Messages sent against confirmations received, running totals. They part on Thursday evening and stay apart; the gap ends at 35.',
    instructions: 'Thirty instructions, about USD 850m, were stopped in New York; five completed, USD 81m to Manila and USD 20m to Sri Lanka.',
    recovery: 'All USD 20m sent to Sri Lanka came back; about USD 15m of the USD 81m sent to Manila had been recovered as of 2025.',
    built: 'Messages sent against confirmations received, now a built panel. The lines part on Thursday evening and the alert fires.',
  },
};

export type UiText = typeof EN;

/** A translation only. Numbers, IDs, times and the sources stay as in the English. */
const BG: UiText = {
  brandTitle: 'Пропуснати сигнали',
  brandSub: 'Модул 3, урок 4 · Наблюдаемост и мониторинг',
  langSwitch: 'EN',
  langSwitchLabel: 'English',

  tabCase: 'Казусът',
  tabOps: 'Оперативен изглед',
  tabsLabel: 'Страница',
  theCase: 'Казусът',
  theCaseOverlay: 'Казусът, върху тази сцена',
  close: 'Затвори',

  premise: 'Изходна ситуация',
  playOut: 'Какво ще се разиграе',
  playOutLead: 'Седем сцени в оперативния изглед, по една за всеки слайд от казуса.',
  decision: 'Вашето решение',
  questions: 'Три въпроса',
  howToRead: 'Как да четете оперативните екрани',
  source: 'Източник:',
  illustrative: 'Илюстративно',
  timelineLabel: 'Хронология',

  resetEllipsis: 'Нулиране…',
  resetTitle: 'Нулиране за следващата група?',
  resetText:
    'Изчиства гласовете, разкритията и прочита на алармата като повреда или констатация и връща към сцена 1. За използване между двете групи.',
  resetConfirm: 'Нулирай',
  cancel: 'Отказ',

  scenesLabel: 'Сцени',
  sceneOf: (n, total) => `Сцена ${n} от ${total}`,

  worldClock: 'Работен ден',
  open: 'Отворено',
  closed: 'Затворено',
  noRecord: 'Няма в източниците',
  noRecordTitle: 'Източниците не казват дали банките тук са работили в този ден.',

  status: { ok: 'OK', warn: 'ВНИМАНИЕ', alert: 'АЛАРМА', nodata: 'НЯМА ДАННИ' },
  gap: (n) => `разлика ${n}`,
  realCount: (n) => `Числото ${n} е реално.`,

  incidents: 'Инциденти',
  openCount: (n) => `${n} отворени`,
  incidentsLabel: 'Отворени инциденти, петък, 5 февруари',
  colUrgency: 'Спешност',
  colId: 'ID',
  colTitle: 'Аларма',
  colRouted: 'Насочена към',
  colOpened: 'Открита (Дака)',
  colStatus: 'Статус',
  urgencyLow: 'Ниска',
  urgencyHigh: 'Висока',
  dayLevelOpened: 'Пт 5 февр., сутринта',
  readingLabel: 'Как се чете алармата за принтера',
  readAsDevice: 'Като повреда',
  readAsFinding: 'Като констатация',
  sameAlert: 'Същата аларма, INC-4127',
  pageSent: 'Изпратено повикване',
  pageText: 'Принтерът за потвърждения мълчи. Бек офисът не получава потвърждения.',
  queued: 'В опашката',
  queuedText: 'Чака техническата поддръжка в следващия работен ден.',
  onCall: 'Дежурни, пт 5 – сб 6 февр.',
  onCallSub: 'Уикендът в Дака. Роли, не хора.',
  // Short, so each on-call row stays on one line and the payments row is never scrolled out of view.
  pageable: 'Приема',
  notPageable: 'Не приема',

  revealWindow: 'Чт 4 февр. 08:00 – пт 5 февр. 12:00, Дака',
  revealProgress: (n, of) => `${n} от ${of}`,
  revealNext: 'Добави следващото предложение',
  revealKey: '(R)',
  hideLast: 'Махни последното',
  revealEmpty: 'Предложенията влизат в таблото едно по едно, в реда от слайдовете: A, B, D, C. Натиснете R.',
  approvalsLabel: 'Опашка за одобрение, четвъртък, 4 февруари',
  colRef: 'Плащане',
  colAmount: 'USD',
  colChecker: 'Втори одобряващ',
  everyRowSigned: 'всички подписани',
  outsideBand: 'извън коридора',
  cRule: 'Правило: нищо потвърдено 30 мин., докато се изпраща',
  votes: (n) => `${n} ${n === 1 ? 'глас' : 'гласа'}`,
  votesFor: (id) => `Гласове за ${id}`,
  addVote: (id) => `+1 глас за ${id}`,
  removeVote: (id) => `−1 глас за ${id}`,
  votesNote: 'Натискайте +1, когато всяка група напише избора си в чата. Броят се пази до нулиране.',

  thursday: 'Чт 4 февр., Дака',
  statGateway: 'Платежен шлюз',
  statGatewayValue: 'Работи цял ден',
  statQueue: 'Изходяща опашка',
  statQueueValue: (max) => `Дълбочина 0–${max}`,
  statMessages: 'Платежни съобщения',
  statMessagesValue: (n) => `${n} изпратени`,
  statPrinter: 'Принтер за потвърждения',
  statPrinterValue: 'Печата',
  calendarsTitle: 'Работни календари, чт 4 – пн 8 февр.',
  calendarsNote: 'Съботата и неделята в Манила не са в източниците.',
  weekTitle: 'Съобщения на час, чт 4 – пн 8 февр. (Дака)',
  weekNote:
    'Съобщенията са измислени. Затворените периоди са дните от източниците, всеки по местното време на града, начертани във времето на Дака.',

  devicesTitle: 'Устройства',
  devicesDetail: (n, of) => `${n} от ${of}`,
  printedTitle: 'Отпечатани потвърждения на час, чт 4 февр.',
  // Proposal C's name: the panel scene 2 lacks, scene 5 adds and scene 7 has built. Shorter than the
  // full phrase, which would push the owner chip off the scene 7 title.
  noQueryTitle: 'Изпратени срещу потвърдени',
  noQueryText: 'Няма данни — няма дефинирана заявка: изпратени съобщения срещу получени потвърждения',
  watchedHead: 'Какво се наблюдаваше',

  timelineTitle: 'Хронология на инцидента',
  sources: 'Източници',
  timelineStatus: 'Приключен',
  outcomeTitle: 'Резултат',
  instructionsTitle: '35-те нареждания, млн. USD',
  recoveryTitle: 'Изпратени и възстановени, млн. USD',
  completedLine: (n, manila, sriLanka) => `${n} изпълнени: ${manila} млн. USD за Манила, ${sriLanka} млн. USD за Шри Ланка.`,

  builtTitle: 'Изпратени срещу потвърдени',
  ruleTitle: 'Правило за аларма',
  ruleLabel: 'Задейства се, когато',
  ruleText: (minutes) => `Няма получено потвърждение ${minutes} минути, докато се изпращат съобщения`,
  ruleRoutes: 'Насочва към',
  ruleRoutesValue: 'Дежурния по плащанията, като повикване',
  ownerLabel: (role) => `Собственик: ${role}`,
  ownerRole: 'Ръководител „Платежни операции“',
  firing: 'задействана',

  hoursIllustrative: 'Часовете са измислени: източниците дават деня, не часа.',

  chart: {
    queue: 'Дълбочина на изходящата опашка през четвъртъка, никога над три.',
    throughput: 'Платежни съобщения на час през четвъртъка: натоварено в работното време и повече вечерта.',
    calendar: 'Дака е затворена в петък и събота, Ню Йорк в събота и неделя, Манила в понеделник заради Китайската нова година.',
    week: 'Съобщения на час от четвъртък до понеделник; затворените периоди на трите града се застъпват от петък до понеделник.',
    printed: 'Отпечатани потвърждения на час в четвъртък: равномерно в работното време, нищо вечерта.',
    d: 'Салдото по сметката спрямо коридора му на нормалност. В четвъртък вечерта салдото излиза от коридора и остава под него.',
    c: 'Изпратени съобщения срещу получени потвърждения, натрупано. Разделят се в четвъртък вечерта и не се събират; разликата стига 35.',
    instructions: 'Трийсет нареждания, около 850 млн. USD, са спрени в Ню Йорк; пет са изпълнени, 81 млн. USD за Манила и 20 млн. USD за Шри Ланка.',
    recovery: 'Всичките 20 млн. USD за Шри Ланка се връщат; към 2025 г. са възстановени около 15 от 81-те млн. USD за Манила.',
    built: 'Изпратени съобщения срещу получени потвърждения, вече като готов панел. Линиите се разделят в четвъртък вечерта и алармата се задейства.',
  },
};

export const T: UiText = LANG === 'bg' ? BG : EN;
