import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { IGX_BANNER_DIRECTIVES } from 'igniteui-angular/banner';
import { IgxButtonDirective } from 'igniteui-angular/directives';
import { IgxGridLiteColumnComponent, IgxGridLiteComponent } from 'igniteui-angular/grids/lite';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { PROPOSALS, ProposalId, REVEALS } from './case';
import { FACTS } from './case-facts';
import { balanceBand, sentVsConfirmed } from './charts';
import { T } from './i18n';
import { OpsChart } from './ops-chart';
import { APPROVALS, INCIDENTS } from './ops-data';
import { StateService } from './state.service';
import { StatusChip } from './status-chip';

/**
 * Scene 5, "What each one really is": the Panels dashboard, with each proposal added as R is pressed,
 * in the deck's order A, B, D, C. B is the scene 3 alert, so it arrives as a banner across the top
 * rather than as a panel. Nothing here is reachable from scene 4.
 */
@Component({
  selector: 'app-scene-reveals',
  imports: [
    IGX_BANNER_DIRECTIVES,
    IgxButtonDirective,
    IgxGridLiteComponent,
    IgxGridLiteColumnComponent,
    IgxIconComponent,
    OpsChart,
    StatusChip,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scene-reveals.html',
  styleUrl: './scene-reveals.scss',
})
export class SceneReveals {
  readonly state = inject(StateService);
  readonly t = T;
  readonly approvals = APPROVALS;
  readonly printerAlert = INCIDENTS.find((i) => i.printer)!;
  readonly realCount = FACTS.instructions;

  /**
   * True once the tile manager has finished its first render (its updateComplete promise). Tiles are added
   * only after this: a tile added to a connected but unrendered manager, with another DOM mutation pending
   * in the same task, makes the manager throw and stop observing. See the template.
   */
  readonly ready = signal(false);
  private readonly tileManager = viewChild.required<ElementRef<HTMLElement & { updateComplete?: Promise<unknown> }>>('tileManager');

  constructor() {
    afterNextRender(async () => {
      await this.tileManager().nativeElement.updateComplete;
      this.ready.set(true);
    });
  }

  readonly cOptions = sentVsConfirmed();
  readonly dOptions = balanceBand();

  private readonly names = Object.fromEntries(PROPOSALS.map((p) => [p.id, p.name])) as Record<ProposalId, string>;
  private readonly captions = Object.fromEntries(REVEALS.map((r) => [r.id, r])) as Record<ProposalId, (typeof REVEALS)[number]>;

  /** Which proposals are on the dashboard, from the reveal count and the deck's order. */
  readonly shown = computed(() => new Set(REVEALS.slice(0, this.state.revealed()).map((r) => r.id)));
  readonly total = REVEALS.length;
  readonly nextId = computed(() => REVEALS[this.state.revealed()]?.id ?? null);

  name(id: ProposalId) {
    return `${id}. ${this.names[id]}`;
  }

  caption(id: ProposalId) {
    return this.captions[id];
  }
}
