// Case content for the M3 L5 payment-outage simulation.
// Final and approved (CLAUDE.md section 4). Do not alter any number, name, time or quotation.

export interface Fact {
  label: string;
  text: string;
}

export interface Role {
  id: string;
  name: string;
  may: string;
  mayNot: string;
}

export interface Moment {
  id: number;
  /** Seconds on the 25:00 clock at which the moment arrives. */
  clockAt: number;
  /** Fictional time, HH:MM. */
  storyTime: string;
  /** Situation, as paragraphs. Segments marked `strong` render bold. */
  situation: Segment[];
  decision: string;
  decisionNote?: string;
  /** Failure rate shown in the status chips while this moment is active. */
  failureRate: string;
}

export interface Segment {
  text: string;
  strong?: boolean;
}

export interface RevealPoint {
  head: string;
  body: string;
}

export const DURATION_SECONDS = 25 * 60;

export const PREMISE_LEAD =
  "You are the incident team for a retail bank's card authorisation platform. It is 02:40 on a Wednesday.";

export const PREMISE_FACTS: Fact[] = [
  { label: 'The product', text: 'Card authorisations for a retail bank. Roughly 400 000 transactions on a normal day.' },
  { label: 'The dependency', text: 'Every authorisation calls an external fraud-scoring service, provided by a supplier.' },
  { label: 'The promise', text: '99.95% availability, written into the agreement with the card schemes.' },
  { label: 'The people', text: 'One engineer on call. Everyone else is asleep and can be woken.' },
];

export const ILLUSTRATIVE_NOTE =
  'All figures are illustrative and were chosen to make the decisions real.';

export const GOAL =
  'Nobody here fixes anything technical. Every decision you make is one that belongs to people who do your jobs. Four moments, four decisions, and a record of who made them.';

export const ROLES: Role[] = [
  { id: 'engineer', name: 'Duty engineer', may: 'Change the system. Report what is true.', mayNot: 'Decide, or speak outside the call' },
  { id: 'opsmgr', name: 'IT operations manager', may: 'Direct the engineer. Inform inside the bank.', mayNot: 'Accept a business risk or a loss' },
  { id: 'po', name: 'Product owner', may: 'Decide product and customer risk. Inform.', mayNot: 'Touch the system' },
  { id: 'head', name: 'Head of Retail Banking', may: 'Decide anything, a loss included. Speak outside the bank.', mayNot: 'Touch the system, or run the call' },
  { id: 'recorder', name: 'Incident recorder', may: 'Write every decision and its time into the log', mayNot: 'Decide, act, or inform anybody' },
];

export const ROLES_CAPTION =
  'The one person with no authority is the one whose output outlives the incident.';

export const MOMENTS: Moment[] = [
  {
    id: 1,
    clockAt: 0,
    storyTime: '02:40',
    failureRate: '3%',
    situation: [
      { text: 'The counter fires: authorisations accepted minus authorisations completed has diverged, and about ' },
      { text: '3%', strong: true },
      { text: ' of card authorisations are failing. Every dashboard is green. The platform\'s own health checks all pass. The duty engineer has looked for ten minutes and has no explanation.' },
    ],
    decision: 'Is this an incident? Who is woken, and who is allowed to make that call?',
  },
  {
    id: 2,
    clockAt: 6 * 60,
    storyTime: '03:20',
    failureRate: '22%',
    situation: [
      { text: 'Failures are at ' },
      { text: '22%', strong: true },
      { text: '. The fraud-scoring service is timing out — it is a supplier\'s system, not the bank\'s. Fraud scoring can be switched off; payments would then go through unscored.' },
    ],
    decision: 'What severity, do you classify it, and who is permitted to switch scoring off?',
    decisionNote: 'Classifying starts a four-hour regulatory reporting clock.',
  },
  {
    id: 3,
    clockAt: 13 * 60,
    storyTime: '05:15',
    failureRate: '40%',
    situation: [
      { text: 'Failures at ' },
      { text: '40%', strong: true },
      { text: '. The contact centre opens at 08:00 and there are already 900 complaints queued. A journalist has telephoned the press office. Operations still has no restoration time. ' },
      { text: 'The Head of Retail Banking is on a flight and cannot be reached for two hours.', strong: true },
    ],
    decision: 'What is said publicly, who is allowed to say it, and how do you hand over?',
  },
  {
    id: 4,
    clockAt: 20 * 60,
    storyTime: '07:50',
    failureRate: '0%',
    situation: [
      { text: 'The supplier restores service without explanation. Failures drop to ' },
      { text: 'zero', strong: true },
      { text: ' within two minutes. Operations wants to close the incident. 41 000 transactions were declined overnight. An unknown number of customers were debited without being credited. Reconciliation has not run. The contact centre opens in ten minutes.' },
    ],
    decision: 'Is this incident over, and who gets to say so?',
  },
];

export const REVEAL: RevealPoint[] = [
  { head: 'Nobody fixed anything.', body: 'Every decision that mattered was made on incomplete information, at speed, by people who were not engineers.' },
  { head: 'The tally.', body: 'Read the log: how many decisions were taken by somebody not authorised to take them. Usually two of four.' },
  { head: 'Twice it needed somebody who was not there', body: '— once to accept a risk at 03:20, once to speak outside the bank at 05:15. The fix is not a faster approval. It is a second name, written down in advance.' },
  { head: 'Most teams classify late,', body: 'so the four-hour reporting clock starts late. The signal worked at 02:40; the decision about what to do when it fired did not exist.' },
  { head: 'The supplier caused it', body: '— where almost a third of major incidents reported in the EU in 2025 began. You cannot fix a supplier\'s system.' },
  { head: 'It was not over when the system came back.', body: 'The money had not moved and nobody had been told.' },
  { head: 'The log is the first draft of a post-mortem,', body: 'and it was written by the one person with no authority.' },
];

/** Index of the reveal point that carries the live tally. */
export const TALLY_POINT_INDEX = 1;
