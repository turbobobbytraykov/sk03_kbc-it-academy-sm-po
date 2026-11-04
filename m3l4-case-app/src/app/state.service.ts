import { Injectable, computed, effect, signal } from '@angular/core';
import { ProposalId, SCENES } from './case';

export type Tab = 'case' | 'ops';
export type FaultReading = 'device' | 'finding';
export type Votes = Record<ProposalId, number>;

interface Persisted {
  tab: Tab;
  scene: number;
  revealIndex: number;
  votes: Votes;
  faultReading: FaultReading;
}

const STORAGE_KEY = 'm3l4-case-app/v1';

const initial = (): Persisted => ({
  tab: 'case',
  scene: 0,
  revealIndex: 0,
  votes: { A: 0, B: 0, C: 0, D: 0 },
  faultReading: 'device',
});

function load(): Persisted {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initial();
    const saved = JSON.parse(raw) as Partial<Persisted>;
    const base = initial();
    return {
      tab: saved.tab === 'ops' ? 'ops' : 'case',
      scene: Number.isInteger(saved.scene) ? Math.min(Math.max(saved.scene!, 0), SCENES.length - 1) : base.scene,
      revealIndex: Number.isInteger(saved.revealIndex) ? Math.max(saved.revealIndex!, 0) : base.revealIndex,
      votes: { ...base.votes, ...(saved.votes ?? {}) },
      faultReading: saved.faultReading === 'finding' ? 'finding' : 'device',
    };
  } catch {
    // Private window, blocked storage or a corrupt entry: start clean.
    return initial();
  }
}

/** Everything Bobby can change, in one place, saved in the browser so a refresh keeps the session. */
@Injectable({ providedIn: 'root' })
export class StateService {
  readonly scenes = SCENES;

  private readonly saved = load();
  readonly tab = signal<Tab>(this.saved.tab);
  readonly scene = signal(this.saved.scene);
  readonly revealIndex = signal(this.saved.revealIndex);
  readonly votes = signal<Votes>(this.saved.votes);
  readonly faultReading = signal<FaultReading>(this.saved.faultReading);

  readonly caseOpen = signal(false);
  readonly resetOpen = signal(false);

  readonly current = computed(() => this.scenes[this.scene()]);
  /** How many of the current scene's items are showing. Only scene 5 has any. */
  readonly revealed = computed(() => Math.min(this.revealIndex(), this.current().reveals));

  constructor() {
    effect(() => {
      const state: Persisted = {
        tab: this.tab(),
        scene: this.scene(),
        revealIndex: this.revealIndex(),
        votes: this.votes(),
        faultReading: this.faultReading(),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // Storage unavailable: the page still works, it just forgets on refresh.
      }
    });
  }

  goTo(index: number) {
    this.scene.set(Math.min(Math.max(index, 0), this.scenes.length - 1));
  }

  next() {
    this.goTo(this.scene() + 1);
  }

  prev() {
    this.goTo(this.scene() - 1);
  }

  /** R: the next hidden item on a scene that has reveals; nothing anywhere else. */
  reveal() {
    const max = this.current().reveals;
    if (max && this.revealIndex() < max) this.revealIndex.set(this.revealIndex() + 1);
  }

  hideLast() {
    this.revealIndex.set(Math.max(0, Math.min(this.revealIndex(), this.current().reveals) - 1));
  }

  vote(id: ProposalId, delta: 1 | -1) {
    this.votes.update((v) => ({ ...v, [id]: Math.max(0, v[id] + delta) }));
  }

  reset() {
    const base = initial();
    this.scene.set(base.scene);
    this.revealIndex.set(base.revealIndex);
    this.votes.set(base.votes);
    this.faultReading.set(base.faultReading);
    this.tab.set('case');
  }
}
