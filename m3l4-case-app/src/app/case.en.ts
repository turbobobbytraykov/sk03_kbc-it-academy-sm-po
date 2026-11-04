import type { DayIso } from './case-facts.en';

/*
 * The deck's wording, from _deck-generator/content_m3l4.py (THE CASE block). Verbatim where the
 * brief says verbatim: the premise, the four proposals and the three questions. Do not edit these
 * here without editing the deck.
 */

/** Deck slide "The case". */
export const PREMISE = [
  'A central bank, a Thursday evening, and about nine hundred and fifty million dollars of payment instructions that nobody at the bank had made.',
  'The control that would have shown them was working exactly as designed. It printed onto paper, and the paper stopped coming.',
] as const;

/** Deck slide "What was watched". The fourth bullet is the intrusion's one line (CLAUDE.md section 3, rule 7). */
export const WHAT_WAS_WATCHED = [
  'The bank did have a control. Every outgoing payment message produced a confirmation, and the confirmations printed automatically onto paper.',
  'Somebody had decided, correctly, that confirmations were the thing to watch. The design was sound.',
  'What nobody watched was the control itself. There was no signal for the printer being quiet, and no count of messages sent against confirmations received.',
  'Reporting at the time described malware on the bank\'s payment software that suppressed those printed confirmations.',
] as const;

/**
 * Deck slide "What happened afterwards", the first three bullets. The fourth (the payments network's
 * security programme) is not in FACTS.md, so it stays off the page (CLAUDE.md section 12, item 4).
 */
export const AFTERWARDS = [
  'The transfer to Sri Lanka was stopped by a bank in the chain because Foundation had been spelled Fandation. A spelling mistake did more than the monitoring did.',
  'Thirty of the thirty-five instructions were stopped in New York for reasons of their own, which is the only reason the number is 81 million and not 951.',
  'In August 2016 the Philippine central bank fined the receiving bank one billion pesos, about 53 million dollars, the largest penalty it had imposed.',
] as const;

/** Deck slide "The lesson": its two blocks. */
export const LESSON = {
  first: [
    'This was not a monitoring failure. The bank had a control, and the control was the right one.',
    'What was missing was anybody having decided what it would mean if that control went quiet, and anybody counting both ends of the process.',
  ],
  secondHead: 'Which is a decision, not a purchase',
  second: [
    'An absence needs an owner in the same way a number does. Somebody has to say what silence means before the silence starts.',
    'That decision is made in a refinement, in a backlog, or in a conversation about who is on call. All three are rooms you sit in.',
  ],
  /** From the deck's notes on "What each one really is". */
  homework: 'The same measurement as the 61 and 60 in this lesson\'s homework, at a different scale.',
} as const;

/** Deck slide "Your decision". */
export const DECISION_INTRO =
  'You own the payment platform after an incident like this. Four proposals are on the table. Discuss all four in your group and pick one.';

export type ProposalId = 'A' | 'B' | 'C' | 'D';

export const PROPOSALS: { id: ProposalId; name: string; text: string }[] = [
  { id: 'A', name: 'Second approver', text: 'Another person signs every outbound payment above a threshold' },
  { id: 'B', name: 'Printer alert', text: 'Raise an alert when the confirmation printer stops' },
  { id: 'C', name: 'Sent against confirmed', text: 'Count instructions sent and confirmations received, every hour' },
  { id: 'D', name: 'Balance anomaly', text: 'Alert on any movement on the account outside its normal pattern' },
];

export const QUESTIONS = [
  'Which would have shown this on the Friday morning?',
  'Which is cheapest to promise and hardest to keep?',
  'And which of them is a detection change at all?',
] as const;

/** Deck slide "What a stopped printer looks like": its two blocks, one per reading. */
export const PRINTER_READINGS = {
  device: {
    head: 'What a stopped printer looks like',
    lines: [
      'On the Friday morning, staff found the printer was not producing anything. They treated it as a printer problem, because that is what it looks like.',
      'It is a reasonable reading. Printers stop. Most of the time the printer really is the problem.',
    ],
  },
  finding: {
    head: 'The same fact, read the other way',
    lines: [
      'A control that has gone quiet is either broken or being prevented from speaking, and you cannot tell which from the silence itself.',
      'The reading you take depends on whether anyone decided in advance that silence from that control was a finding.',
    ],
  },
} as const;

/** Deck slide "What each one really is", in the order the slide reveals them. */
export const REVEALS: { id: ProposalId; caption: string; note?: string }[] = [
  {
    id: 'A',
    caption:
      'A is a control, not a signal. Lesson 3 ended with three people approving the same misleading screen, which is one pair of eyes three times.',
  },
  {
    id: 'B',
    caption:
      'B fires, and it tells you a device is down. It says nothing about money, and it is the answer that feels most obviously right.',
  },
  {
    id: 'D',
    caption:
      'D works, and most institutions could buy it. It needs a definition of normal for an account whose normal is large and irregular.',
    note: 'The shaded band is that definition. Someone has to write it, and keep it right.',
  },
  {
    id: 'C',
    caption:
      'C is the counter this whole course keeps arriving at. It is the only one that is a statement about the business, and no supplier can produce it for you.',
    note: 'Assumes both counts are read from places the attacker did not control.',
  },
];

// ---------------------------------------------------------------- the ops view

export type Tool = 'Panels' | 'Pager' | 'Proposals';

export interface Scene {
  /** 1-based, as in the brief. */
  n: number;
  /** The deck slide's kicker, so the scene can be matched to the slide. */
  kicker: string;
  /** Shorter form for the scene stepper, where seven sit side by side. */
  stepTitle: string;
  tool: Tool;
  screen: string;
  /** The calendar day the world clocks show for this scene. Day level only. */
  day: DayIso;
  /** Items the R key reveals one at a time. */
  reveals: number;
}

export const SCENES: Scene[] = [
  {
    n: 1,
    kicker: 'The case · Bangladesh Bank, February 2016',
    stepTitle: 'The case',
    tool: 'Panels',
    screen: 'Payments overview',
    day: '2016-02-04',
    reveals: 0,
  },
  { n: 2, kicker: 'What was watched', stepTitle: 'What was watched', tool: 'Panels', screen: 'Controls', day: '2016-02-04', reveals: 0 },
  {
    n: 3,
    kicker: 'What a stopped printer looks like',
    stepTitle: 'What a stopped printer looks like',
    tool: 'Pager',
    screen: 'Incidents',
    day: '2016-02-05',
    reveals: 0,
  },
  { n: 4, kicker: 'Your decision', stepTitle: 'Your decision', tool: 'Proposals', screen: 'The four proposals', day: '2016-02-05', reveals: 0 },
  {
    n: 5,
    kicker: 'What each one really is',
    stepTitle: 'What each one really is',
    tool: 'Panels',
    screen: 'Each proposal, added in turn',
    day: '2016-02-05',
    reveals: 4,
  },
  {
    n: 6,
    kicker: 'What happened afterwards',
    stepTitle: 'What happened afterwards',
    tool: 'Pager',
    screen: 'Incident timeline',
    day: '2016-02-08',
    reveals: 0,
  },
  {
    n: 7,
    kicker: 'The lesson',
    stepTitle: 'The lesson',
    tool: 'Panels',
    screen: 'The dashboard after the decision',
    day: '2016-02-05',
    reveals: 0,
  },
];

/** CLAUDE.md section 3, rule 1: on every ops scene, not dismissible. */
export const HONESTY_BANNER =
  'Illustrative reconstruction. These are not the bank\'s systems or data. Real facts are marked with a source.';

/** Tab 1, "How to read the ops screens". */
export const HOW_TO_READ = [
  'These screens are a reconstruction for teaching, not the bank\'s systems or data. Real facts carry a Source line and are placed by the day, never the hour. Everything else is invented and marked Illustrative.',
  'Panels is modelled on dashboard tools such as Grafana, and Pager on on-call and paging tools such as PagerDuty.',
] as const;
