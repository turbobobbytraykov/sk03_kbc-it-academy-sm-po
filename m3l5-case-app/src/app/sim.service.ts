import { Injectable, computed, effect, signal } from '@angular/core';
import { DURATION_SECONDS, MOMENTS, ROLES } from './case';
import { T } from './i18n';

export type Screen = 'case' | 'action' | 'log' | 'reveal';
export type MomentState = 'locked' | 'active' | 'past';

export interface LogEntry {
  id: number;
  elapsedSeconds: number;
  storyTime: string;
  momentId: number;
  text: string;
  role: string;
  authorised: boolean;
}

export interface UndoNotice {
  message: string;
  /** Colour of the notice: the verdict for a logged decision, neutral otherwise. */
  tone: 'auth' | 'unauth' | 'neutral';
  undo: () => void;
  stamp: number;
}

interface Persisted {
  elapsed: number;
  held: boolean;
  activeIndex: number;
  activatedAt: number[];
  log: LogEntry[];
  nextId: number;
  severity: string;
  classifiedAt: string | null;
  screen: Screen;
  revealCount: number;
}

const STORAGE_KEY = 'm3l5-case-app/v1';
const TICK_MS = 250;
/** How long an Undo stays on screen. */
const UNDO_MS = 12000;

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const toHHMM = (minutes: number) => {
  const m = ((Math.floor(minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
export const formatClock = (seconds: number) => {
  const s = Math.max(0, Math.round(seconds));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

/** The whole simulation: one continuous clock, the moments that arrive on it, and the log. */
@Injectable({ providedIn: 'root' })
export class SimService {
  readonly duration = DURATION_SECONDS;
  readonly moments = MOMENTS;
  readonly roles = ROLES;

  // --- clock
  readonly elapsed = signal(0);
  readonly running = signal(false);
  readonly held = signal(false);
  /** Changes once a second, so persistence does not write on every tick. */
  private readonly wholeSeconds = computed(() => Math.floor(this.elapsed()));
  readonly finished = computed(() => this.elapsed() >= this.duration);
  readonly remaining = computed(() => Math.max(0, this.duration - this.elapsed()));
  readonly remainingLabel = computed(() => formatClock(Math.ceil(this.remaining())));
  readonly elapsedLabel = computed(() => formatClock(Math.floor(this.elapsed())));
  /** Navy until 10:00 remaining, amber until 3:00, red after. */
  readonly clockPhase = computed<'normal' | 'warning' | 'error'>(() => {
    const r = this.remaining();
    return r <= 180 ? 'error' : r <= 600 ? 'warning' : 'normal';
  });

  // --- moments
  readonly activeIndex = signal(0);
  /** Elapsed seconds at which each moment actually arrived (pulled forward or held moments differ from clockAt). */
  readonly activatedAt = signal<number[]>([0]);
  readonly activeMoment = computed(() => this.moments[this.activeIndex()]);
  readonly nextMoment = computed(() => this.moments[this.activeIndex() + 1] ?? null);
  readonly momentStates = computed<MomentState[]>(() =>
    this.moments.map((_, i) => (i < this.activeIndex() ? 'past' : i === this.activeIndex() ? 'active' : 'locked')),
  );
  /** Next moment is due but held back. */
  readonly nextOverdue = computed(() => {
    const next = this.nextMoment();
    return !!next && this.held() && this.elapsed() >= next.clockAt;
  });

  /** Fictional time: interpolated between the active moment's story time and the next one's. */
  readonly storyTime = computed(() => {
    const i = this.activeIndex();
    const active = this.moments[i];
    const next = this.moments[i + 1];
    const from = toMinutes(active.storyTime);
    if (!next) return active.storyTime;
    const to = toMinutes(next.storyTime);
    const start = this.activatedAt()[i] ?? active.clockAt;
    const end = Math.max(next.clockAt, start + 1);
    const frac = Math.min(1, Math.max(0, (this.elapsed() - start) / (end - start)));
    return toHHMM(Math.min(to - 1, from + frac * (to - from)));
  });

  // --- world
  readonly severity = signal('');
  readonly classifiedAt = signal<string | null>(null);
  /** Classifying starts a four-hour regulatory reporting clock. */
  readonly reportDueBy = computed(() => {
    const at = this.classifiedAt();
    return at ? toHHMM(toMinutes(at) + 4 * 60) : null;
  });
  readonly failureRate = computed(() => this.activeMoment().failureRate);

  // --- log
  readonly log = signal<LogEntry[]>([]);
  private nextId = 1;
  readonly tally = computed(() => {
    const log = this.log();
    const authorised = log.filter((e) => e.authorised).length;
    return { total: log.length, authorised, notAuthorised: log.length - authorised };
  });
  readonly undoNotice = signal<UndoNotice | null>(null);
  /** Bumped whenever a moment arrives, on the clock or pulled forward; the action screen flags it. */
  readonly arrivals = signal(0);

  // --- navigation
  readonly screen = signal<Screen>('case');
  readonly revealCount = signal(0);
  readonly resetOpen = signal(false);
  /** A log entry is being corrected in its dialog: the keyboard shortcuts wait. */
  readonly editing = signal(false);

  private lastTick = 0;

  constructor() {
    this.restore();
    setInterval(() => this.tick(), TICK_MS);
    effect(() => this.persist());
  }

  roleName(id: string) {
    return this.roles.find((r) => r.id === id)?.name ?? id;
  }

  // --- clock controls
  toggleRunning() {
    if (this.finished()) return;
    this.lastTick = performance.now();
    this.running.update((r) => !r);
  }

  toggleHold() {
    this.held.update((h) => !h);
  }

  advanceNow() {
    const next = this.nextMoment();
    if (!next) return;
    const index = this.activeIndex();
    const activatedAt = this.activatedAt();
    this.activate(index + 1);
    this.notify(T.pulledForward(next.id), 'neutral', () => {
      this.activeIndex.set(index);
      this.activatedAt.set(activatedAt);
    });
  }

  /** Clock back to 25:00 and Moment 1, paused. The log is kept. */
  resetClock() {
    this.running.set(false);
    this.held.set(false);
    this.elapsed.set(0);
    this.activeIndex.set(0);
    this.activatedAt.set([0]);
    this.severity.set('');
    this.classifiedAt.set(null);
    this.revealCount.set(0);
    this.undoNotice.set(null);
  }

  /** The clock and the log: between groups. */
  reset() {
    this.resetClock();
    this.log.set([]);
    this.nextId = 1;
  }

  setClassified(on: boolean) {
    this.classifiedAt.set(on ? this.storyTime() : null);
  }

  // --- log
  logDecision(text: string, role: string, authorised: boolean) {
    const entry: LogEntry = {
      id: this.nextId++,
      elapsedSeconds: Math.floor(this.elapsed()),
      storyTime: this.storyTime(),
      momentId: this.activeMoment().id,
      text: text.trim(),
      role,
      authorised,
    };
    this.log.update((l) => [...l, entry]);
    // Verdict first: it is the part the room needs to see, and the end of a long line can be cut.
    this.notify(
      T.logged(authorised, this.roleName(role)),
      authorised ? 'auth' : 'unauth',
      () => this.log.update((l) => l.filter((e) => e.id !== entry.id)),
    );
  }

  updateEntry(id: number, patch: Partial<Pick<LogEntry, 'text' | 'role' | 'authorised'>>) {
    this.log.update((l) => l.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }

  deleteEntry(id: number) {
    const before = this.log();
    const removed = before.find((e) => e.id === id);
    if (!removed) return;
    this.log.set(before.filter((e) => e.id !== id));
    this.notify(T.deleted, 'neutral', () =>
      this.log.update((l) => [...l, removed].sort((a, b) => a.id - b.id)),
    );
  }

  undo() {
    this.undoNotice()?.undo();
    this.undoNotice.set(null);
  }

  private notify(message: string, tone: UndoNotice['tone'], undo: () => void) {
    const notice: UndoNotice = { message, tone, undo, stamp: Date.now() };
    this.undoNotice.set(notice);
    setTimeout(() => {
      if (this.undoNotice() === notice) this.undoNotice.set(null);
    }, UNDO_MS);
  }

  // --- internals
  private activate(index: number) {
    this.activeIndex.set(index);
    this.arrivals.update((n) => n + 1);
    this.activatedAt.update((a) => {
      const copy = a.slice(0, index);
      copy[index] = this.elapsed();
      return copy;
    });
  }

  private tick() {
    const now = performance.now();
    const dt = (now - this.lastTick) / 1000;
    this.lastTick = now;
    if (!this.running()) return;

    const elapsed = Math.min(this.duration, this.elapsed() + dt);
    this.elapsed.set(elapsed);

    const next = this.nextMoment();
    if (next && !this.held() && elapsed >= next.clockAt) this.activate(this.activeIndex() + 1);
    if (elapsed >= this.duration) this.running.set(false);
  }

  private persist() {
    const state: Persisted = {
      elapsed: this.wholeSeconds(),
      held: this.held(),
      activeIndex: this.activeIndex(),
      activatedAt: this.activatedAt(),
      log: this.log(),
      nextId: this.nextId,
      severity: this.severity(),
      classifiedAt: this.classifiedAt(),
      screen: this.screen(),
      revealCount: this.revealCount(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage blocked (private window, file:// in some browsers): the session still works
    }
  }

  /** Restores the last session paused, so a refresh never loses the log or the clock position. */
  private restore() {
    let state: Partial<Persisted> | null = null;
    try {
      state = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    } catch {
      state = null;
    }
    if (!state) return;
    this.elapsed.set(state.elapsed ?? 0);
    this.held.set(!!state.held);
    this.activeIndex.set(Math.min(state.activeIndex ?? 0, this.moments.length - 1));
    this.activatedAt.set(state.activatedAt ?? [0]);
    this.log.set(state.log ?? []);
    this.nextId = state.nextId ?? (state.log?.length ?? 0) + 1;
    this.severity.set(state.severity ?? '');
    this.classifiedAt.set(state.classifiedAt ?? null);
    this.screen.set(state.screen ?? 'case');
    this.revealCount.set(state.revealCount ?? 0);
  }
}
