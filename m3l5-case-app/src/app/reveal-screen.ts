import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { IGX_CARD_DIRECTIVES } from 'igniteui-angular/card';
import { IgxButtonDirective } from 'igniteui-angular/directives';
import { AppChart } from './app-chart';
import { REVEAL, TALLY_POINT_INDEX } from './case';
import { tallyBar } from './charts';
import { T } from './i18n';
import { SimService } from './sim.service';

@Component({
  selector: 'app-reveal-screen',
  imports: [IGX_CARD_DIRECTIVES, IgxButtonDirective, AppChart],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'onKey($event)' },
  template: `
    <header class="reveal-head">
      <h1>{{ t.revealTitle }}</h1>
      <div class="reveal-controls">
        <span class="progress">{{ t.revealProgress(sim.revealCount(), points.length) }}</span>
        <button igxButton="outlined" [disabled]="sim.revealCount() === 0" (click)="step(-1)">{{ t.back }}</button>
        <button igxButton="contained" class="btn-next" [disabled]="done()" (click)="step(1)">
          {{ sim.revealCount() === 0 ? t.startReveal : t.nextPoint }}
        </button>
      </div>
    </header>

    <ol class="points">
      @for (p of points; track $index; let i = $index) {
        @if (i >= sim.revealCount()) {
          <!-- Still to come: the number only, so the room sees how many points there are and nothing of what they say. -->
          <li class="pending" aria-hidden="true"><span class="point-num">{{ i + 1 }}</span></li>
        } @else {
          <li>
            <igx-card class="point card-pale" [class.point--current]="i === sim.revealCount() - 1" [class.card-dark]="i === sim.revealCount() - 1">
              <igx-card-content class="point-body">
                <span class="point-num">{{ i + 1 }}</span>
                <div class="point-main">
                  <p class="point-text"><strong>{{ p.head }}</strong> {{ p.body }}</p>
                  @if (i === tallyIndex) {
                    <p class="tally-line">{{ tallyLine() }}</p>
                    @if (sim.tally().total) {
                      <div class="tally-chart">
                        <app-chart [options]="tally()" [label]="t.tallyAria(sim.tally().authorised, sim.tally().notAuthorised)" />
                      </div>
                    }
                  }
                </div>
              </igx-card-content>
            </igx-card>
          </li>
        }
      }
    </ol>
  `,
  styleUrl: './reveal-screen.scss',
})
export class RevealScreen {
  readonly sim = inject(SimService);
  readonly t = T;
  readonly points = REVEAL;
  readonly tallyIndex = TALLY_POINT_INDEX;
  readonly done = computed(() => this.sim.revealCount() >= this.points.length);

  readonly tallyLine = computed(() => {
    const { total, notAuthorised } = this.sim.tally();
    return T.tallyLine(total, notAuthorised);
  });

  /** The same tally as a bar, from the live log. */
  readonly tally = computed(() => tallyBar(this.sim.tally().authorised, this.sim.tally().notAuthorised));

  step(delta: number) {
    this.sim.revealCount.update((n) => Math.min(this.points.length, Math.max(0, n + delta)));
  }

  onKey(e: KeyboardEvent) {
    if ((e.target as HTMLElement | null)?.closest('input, textarea, igx-select, igx-dialog')) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { this.step(1); e.preventDefault(); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { this.step(-1); e.preventDefault(); }
  }
}
