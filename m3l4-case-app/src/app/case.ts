// The case wording in the page's language. case.en.ts stays the deck's wording and the source of every
// id, number, day and reveal count; case.bg.ts holds only the Bulgarian text.

import * as bg from './case.bg';
import * as en from './case.en';
import { LANG } from './i18n';

export * from './case.en';

const isBg = LANG === 'bg';

interface Lesson {
  first: readonly string[];
  secondHead: string;
  second: readonly string[];
  homework: string;
}
type Readings = Record<'device' | 'finding', { head: string; lines: readonly string[] }>;

export const PREMISE: readonly string[] = isBg ? bg.PREMISE : en.PREMISE;
export const WHAT_WAS_WATCHED: readonly string[] = isBg ? bg.WHAT_WAS_WATCHED : en.WHAT_WAS_WATCHED;
export const AFTERWARDS: readonly string[] = isBg ? bg.AFTERWARDS : en.AFTERWARDS;
export const LESSON: Lesson = isBg ? bg.LESSON : en.LESSON;
export const DECISION_INTRO = isBg ? bg.DECISION_INTRO : en.DECISION_INTRO;
export const QUESTIONS: readonly string[] = isBg ? bg.QUESTIONS : en.QUESTIONS;
export const PRINTER_READINGS: Readings = isBg ? bg.PRINTER_READINGS : en.PRINTER_READINGS;
export const HONESTY_BANNER = isBg ? bg.HONESTY_BANNER : en.HONESTY_BANNER;
export const HOW_TO_READ: readonly string[] = isBg ? bg.HOW_TO_READ : en.HOW_TO_READ;

export const PROPOSALS: typeof en.PROPOSALS = isBg
  ? en.PROPOSALS.map((p) => ({ ...p, ...bg.PROPOSAL_TEXT[p.id] }))
  : en.PROPOSALS;

export const REVEALS: typeof en.REVEALS = isBg ? en.REVEALS.map((r) => ({ ...r, ...bg.REVEAL_TEXT[r.id] })) : en.REVEALS;

export const SCENES: typeof en.SCENES = isBg ? en.SCENES.map((s) => ({ ...s, ...bg.SCENE_TEXT[s.n] })) : en.SCENES;
