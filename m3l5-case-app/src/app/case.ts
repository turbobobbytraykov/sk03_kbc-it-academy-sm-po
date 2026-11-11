// The case content in the page's language. case-data.ts (English) stays the approved source;
// timings, story times and failure rates always come from it.

import * as bg from './case-data.bg';
import * as en from './case-data';
import type { Moment, Role } from './case-data';
import { LANG } from './i18n';

const isBg = LANG === 'bg';

export { DURATION_SECONDS, TALLY_POINT_INDEX } from './case-data';

export const PREMISE_LEAD = isBg ? bg.PREMISE_LEAD : en.PREMISE_LEAD;
export const PREMISE_FACTS = isBg ? bg.PREMISE_FACTS : en.PREMISE_FACTS;
export const ILLUSTRATIVE_NOTE = isBg ? bg.ILLUSTRATIVE_NOTE : en.ILLUSTRATIVE_NOTE;
export const GOAL = isBg ? bg.GOAL : en.GOAL;
export const ROLES_CAPTION = isBg ? bg.ROLES_CAPTION : en.ROLES_CAPTION;
export const REVEAL = isBg ? bg.REVEAL : en.REVEAL;

export const ROLES: Role[] = isBg ? en.ROLES.map((r) => ({ ...r, ...bg.ROLE_TEXT[r.id] })) : en.ROLES;

export const MOMENTS: Moment[] = isBg ? en.MOMENTS.map((m, i) => ({ ...m, ...bg.MOMENT_TEXT[i] })) : en.MOMENTS;
