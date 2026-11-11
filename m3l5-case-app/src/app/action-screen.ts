import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IGX_BUTTON_GROUP_DIRECTIVES } from 'igniteui-angular/button-group';
import { IGX_CARD_DIRECTIVES } from 'igniteui-angular/card';
import { IGX_CHIPS_DIRECTIVES } from 'igniteui-angular/chips';
import { IgxButtonDirective } from 'igniteui-angular/directives';
import { IGX_INPUT_GROUP_DIRECTIVES } from 'igniteui-angular/input-group';
import { IGX_CIRCULAR_PROGRESS_BAR_DIRECTIVES, IGX_LINEAR_PROGRESS_BAR_DIRECTIVES } from 'igniteui-angular/progressbar';
import { IgxSwitchComponent } from 'igniteui-angular/switch';
import { AppChart } from './app-chart';
import { failureTrend } from './charts';
import { T } from './i18n';
import { formatClock, SimService } from './sim.service';
import { UndoNote } from './undo-note';

/** How long a newly arrived moment is flagged. */
const NEW_MOMENT_MS = 8000;

@Component({
  selector: 'app-action-screen',
  imports: [
    FormsModule,
    IGX_BUTTON_GROUP_DIRECTIVES,
    IGX_CARD_DIRECTIVES,
    IGX_CHIPS_DIRECTIVES,
    IGX_INPUT_GROUP_DIRECTIVES,
    IGX_CIRCULAR_PROGRESS_BAR_DIRECTIVES,
    IGX_LINEAR_PROGRESS_BAR_DIRECTIVES,
    IgxButtonDirective,
    IgxSwitchComponent,
    AppChart,
    UndoNote,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './action-screen.html',
  styleUrl: './action-screen.scss',
})
export class ActionScreen {
  readonly sim = inject(SimService);
  readonly t = T;

  readonly draftText = signal('');
  readonly draftRole = signal<string | null>(null);
  readonly canLog = computed(() => this.draftText().trim().length > 0 && !!this.draftRole());

  /** True for a few seconds after a moment arrives, so the room notices the change. */
  readonly justArrived = signal(false);

  readonly markers = this.sim.moments.map((m) => ({
    id: m.id,
    left: (m.clockAt / this.sim.duration) * 100,
    clock: formatClock(m.clockAt),
    story: m.storyTime,
  }));

  readonly circularType = computed(() => {
    const p = this.sim.clockPhase();
    return p === 'normal' ? 'default' : p;
  });

  readonly startLabel = computed(() =>
    this.sim.running() ? T.pause : this.sim.elapsed() === 0 ? T.start : T.resume,
  );

  readonly nextLabel = computed(() => {
    const next = this.sim.nextMoment();
    return next ? T.momentAt(next.id, formatClock(next.clockAt)) : T.lastMoment;
  });

  readonly momentLog = computed(() =>
    this.sim.log().filter((e) => e.momentId === this.sim.activeMoment().id),
  );

  /** The role picked for the next decision, with its permissions. */
  readonly pickedRole = computed(() => this.sim.roles.find((r) => r.id === this.draftRole()) ?? null);

  /** With no role picked: what is still needed to log, or the count so far. */
  readonly idleLine = computed(() =>
    this.draftText().trim() ? T.pickRole : T.countLine(this.momentLog().length, this.sim.tally().total),
  );

  /** The failure rate at each moment that has arrived; later moments stay empty on the axis. */
  private readonly trendPoints = computed(() =>
    this.sim.moments.map((m, i) => ({
      story: m.storyTime,
      rate: i <= this.sim.activeIndex() ? parseFloat(m.failureRate) : null,
    })),
  );
  readonly trend = computed(() => failureTrend(this.trendPoints()));
  readonly trendLabel = computed(() =>
    T.failingTrend(
      this.trendPoints()
        .filter((p) => p.rate !== null)
        .map((p) => `${p.story} ${p.rate}%`)
        .join(', '),
    ),
  );

  constructor() {
    let first = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    effect(() => {
      this.sim.arrivals();
      // Opening the screen is not an arrival.
      if (first) { first = false; return; }
      untracked(() => this.justArrived.set(true));
      clearTimeout(timer);
      timer = setTimeout(() => this.justArrived.set(false), NEW_MOMENT_MS);
    });
  }

  private readonly decisionInput = viewChild.required<ElementRef<HTMLInputElement>>('decisionInput');

  pickRole(id: string) {
    this.draftRole.update((r) => (r === id ? null : id));
    // Role first, text second: the cursor goes where the missing half is.
    if (this.draftRole() && !this.draftText().trim()) this.decisionInput().nativeElement.focus();
  }

  log(authorised: boolean) {
    const role = this.draftRole();
    if (!this.canLog() || !role) return;
    this.sim.logDecision(this.draftText(), role, authorised);
    this.draftText.set('');
    this.draftRole.set(null);
  }
}
