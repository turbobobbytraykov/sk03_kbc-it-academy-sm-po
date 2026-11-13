import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IGX_BUTTON_GROUP_DIRECTIVES } from 'igniteui-angular/button-group';
import { IGX_CARD_DIRECTIVES } from 'igniteui-angular/card';
import { IGX_DIALOG_DIRECTIVES } from 'igniteui-angular/dialog';
import { IgxButtonDirective } from 'igniteui-angular/directives';
import { IgxGridLiteCellTemplateDirective, IgxGridLiteColumnComponent, IgxGridLiteComponent } from 'igniteui-angular/grids/lite';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { IGX_INPUT_GROUP_DIRECTIVES } from 'igniteui-angular/input-group';
import { AppChart } from './app-chart';
import { ChartDecision, ChartMoment, decisionsByMoment, decisionsOnClock } from './charts';
import { T } from './i18n';
import { formatClock, SimService } from './sim.service';
import { UndoNote } from './undo-note';

interface Draft {
  id: number;
  text: string;
  role: string;
  authorised: boolean;
}

/** One row of the grid: the entry as shown. */
interface Row {
  id: number;
  clock: string;
  story: string;
  moment: number;
  text: string;
  role: string;
  authorised: boolean;
}

/**
 * The incident log: every decision in a Grid Lite, corrected in a dialog, and under it two charts
 * drawn from the same entries, for the debrief.
 */
@Component({
  selector: 'app-log-screen',
  imports: [
    FormsModule,
    IGX_BUTTON_GROUP_DIRECTIVES,
    IGX_CARD_DIRECTIVES,
    IGX_DIALOG_DIRECTIVES,
    IGX_INPUT_GROUP_DIRECTIVES,
    IgxButtonDirective,
    IgxGridLiteComponent,
    IgxGridLiteColumnComponent,
    IgxGridLiteCellTemplateDirective,
    IgxIconComponent,
    AppChart,
    UndoNote,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="log-head">
      <div>
        <h1>{{ t.logTitle }}</h1>
        <p class="log-intro">{{ t.logIntro }}</p>
        <app-undo-note />
      </div>
      <div class="tally">
        <igx-card class="card-light tally-card"><igx-card-content>
          <span class="tally-num">{{ sim.tally().total }}</span><span class="tally-label">{{ t.tallyDecisions }}</span>
        </igx-card-content></igx-card>
        <igx-card class="card-light tally-card tally-card--auth"><igx-card-content>
          <span class="tally-num">{{ sim.tally().authorised }}</span><span class="tally-label">{{ t.tallyAuthorised }}</span>
        </igx-card-content></igx-card>
        <igx-card class="card-light tally-card tally-card--unauth"><igx-card-content>
          <span class="tally-num">{{ sim.tally().notAuthorised }}</span><span class="tally-label">{{ t.tallyNotAuthorised }}</span>
        </igx-card-content></igx-card>
      </div>
    </header>

    @if (sim.log().length === 0) {
      <p class="empty">{{ t.logEmpty }}</p>
    } @else {
      <igx-grid-lite class="log-grid" [data]="rows()" [attr.aria-label]="t.logTitle">
        <igx-grid-lite-column field="clock" [header]="t.colClock" width="5.2rem" />
        <igx-grid-lite-column field="story" [header]="t.colStory" width="5.2rem" />
        <igx-grid-lite-column field="moment" [header]="t.colMoment" width="5.6rem" />
        <igx-grid-lite-column field="text" [header]="t.whatDecided">
          <ng-template igxGridLiteCell let-value>
            <span class="cell-text">{{ value }}</span>
          </ng-template>
        </igx-grid-lite-column>
        <igx-grid-lite-column field="role" [header]="t.whoDecided" width="12rem" />
        <igx-grid-lite-column field="authorised" [header]="t.colVerdict" width="10.5rem">
          <ng-template igxGridLiteCell let-value>
            <span [class]="value ? 'verdict' : 'verdict verdict--unauth'">
              <igx-icon family="app" [name]="value ? 'verdict_yes' : 'verdict_no'" aria-hidden="true" />
              {{ value ? t.authorised : t.notAuthorised }}
            </span>
          </ng-template>
        </igx-grid-lite-column>
        <igx-grid-lite-column field="id" [header]="t.colActions" width="11.5rem">
          <ng-template igxGridLiteCell let-value>
            <span class="row-actions">
              <button igxButton="flat" type="button" (click)="edit(value)">{{ t.correct }}</button>
              <button igxButton="flat" type="button" class="btn-delete" (click)="sim.deleteEntry(value)">{{ t.delete }}</button>
            </span>
          </ng-template>
        </igx-grid-lite-column>
      </igx-grid-lite>

      <div class="charts">
        <igx-card class="card-light chart-card chart-card--wide">
          <igx-card-content>
            <h2 class="chart-title">{{ t.chartClock }}</h2>
            <div class="chart-box"><app-chart [options]="onClock()" [label]="t.chartClockAria(sim.log().length)" /></div>
          </igx-card-content>
        </igx-card>
        <igx-card class="card-light chart-card">
          <igx-card-content>
            <h2 class="chart-title">{{ t.chartMoment }}</h2>
            <div class="chart-box"><app-chart [options]="byMoment()" [label]="t.chartMomentAria" /></div>
          </igx-card-content>
        </igx-card>
      </div>
    }

    <!-- Correcting an entry: the same three things as logging one. The clock and story time are never edited. -->
    <igx-dialog class="edit-dialog" [isOpen]="!!draft()" (isOpenChange)="$event || close()" [closeOnEscape]="true">
      <igx-dialog-title>{{ t.editTitle }}</igx-dialog-title>
      @if (draft(); as d) {
        <form class="edit-form" (submit)="$event.preventDefault(); save()">
          <igx-input-group type="border">
            <label igxLabel for="edit-text">{{ t.whatDecided }}</label>
            <input igxInput id="edit-text" name="edit-text" type="text" autocomplete="off"
                   [ngModel]="d.text" (ngModelChange)="patch({ text: $event })" />
          </igx-input-group>
          <div class="edit-row">
            <span class="edit-label" id="edit-who">{{ t.whoDecided }}</span>
            <igx-buttongroup class="role-picker" selectionMode="singleRequired" aria-labelledby="edit-who">
              @for (r of sim.roles; track r.id) {
                <button igxButton type="button" [selected]="d.role === r.id" (click)="patch({ role: r.id })">{{ r.name }}</button>
              }
            </igx-buttongroup>
          </div>
          <div class="edit-row">
            <span class="edit-label" id="edit-verdict">{{ t.colVerdict }}</span>
            <igx-buttongroup class="role-picker" selectionMode="singleRequired" aria-labelledby="edit-verdict">
              <button igxButton type="button" [selected]="d.authorised" (click)="patch({ authorised: true })">{{ t.authorised }}</button>
              <button igxButton type="button" [selected]="!d.authorised" (click)="patch({ authorised: false })">{{ t.notAuthorised }}</button>
            </igx-buttongroup>
          </div>
        </form>
      }
      <igx-dialog-actions>
        <button igxButton="flat" type="button" (click)="close()">{{ t.cancel }}</button>
        <button igxButton="contained" type="button" [disabled]="!draft()?.text?.trim()" (click)="save()">{{ t.save }}</button>
      </igx-dialog-actions>
    </igx-dialog>
  `,
  styleUrl: './log-screen.scss',
})
export class LogScreen {
  readonly sim = inject(SimService);
  readonly t = T;
  readonly draft = signal<Draft | null>(null);

  readonly rows = computed<Row[]>(() =>
    this.sim.log().map((e) => ({
      id: e.id,
      clock: formatClock(e.elapsedSeconds),
      story: e.storyTime,
      moment: e.momentId,
      text: e.text,
      role: this.sim.roleName(e.role),
      authorised: e.authorised,
    })),
  );

  private readonly decisions = computed<ChartDecision[]>(() =>
    this.sim.log().map((e) => ({
      elapsedSeconds: e.elapsedSeconds,
      momentId: e.momentId,
      role: this.sim.roles.findIndex((r) => r.id === e.role),
      authorised: e.authorised,
    })),
  );

  /** A moment's place on the chart is where it actually arrived, which a hold or an advance moves. */
  private readonly moments = computed<ChartMoment[]>(() =>
    this.sim.moments.map((m, i) => ({
      id: m.id,
      storyTime: m.storyTime,
      arrivedAt: i <= this.sim.activeIndex() ? (this.sim.activatedAt()[i] ?? m.clockAt) : null,
    })),
  );

  readonly onClock = computed(() =>
    decisionsOnClock(this.decisions(), this.sim.roles.map((r) => r.name), this.moments(), this.sim.duration),
  );
  readonly byMoment = computed(() => decisionsByMoment(this.decisions(), this.moments()));

  edit(id: number) {
    const e = this.sim.log().find((entry) => entry.id === id);
    if (!e) return;
    this.draft.set({ id: e.id, text: e.text, role: e.role, authorised: e.authorised });
    this.sim.editing.set(true);
  }

  patch(p: Partial<Draft>) {
    this.draft.update((d) => (d ? { ...d, ...p } : d));
  }

  close() {
    this.draft.set(null);
    this.sim.editing.set(false);
  }

  save() {
    const d = this.draft();
    if (!d || !d.text.trim()) return;
    this.sim.updateEntry(d.id, { text: d.text.trim(), role: d.role, authorised: d.authorised });
    this.close();
  }
}
