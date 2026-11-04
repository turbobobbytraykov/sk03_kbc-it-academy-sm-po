import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IGX_BANNER_DIRECTIVES } from 'igniteui-angular/banner';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { IGX_STEPPER_DIRECTIVES, IStepChangingEventArgs } from 'igniteui-angular/stepper';
import { HONESTY_BANNER } from './case';
import { T } from './i18n';
import { SceneAfterwards } from './scene-afterwards';
import { SceneControls } from './scene-controls';
import { SceneDecision } from './scene-decision';
import { SceneLesson } from './scene-lesson';
import { SceneOverview } from './scene-overview';
import { ScenePager } from './scene-pager';
import { SceneReveals } from './scene-reveals';
import { StateService } from './state.service';
import { WorldClock } from './world-clock';

const TOOL_ICON = { Panels: 'tool_panels', Pager: 'tool_pager', Proposals: 'tool_proposals' } as const;

/**
 * Tab 2. The scene stepper, the honesty banner, the tool's own top bar with the world clocks, and the
 * scene. The stepper only navigates: the scene renders below it, one at a time, so charts are never
 * drawn into a hidden container.
 */
@Component({
  selector: 'app-ops-view',
  imports: [
    IGX_STEPPER_DIRECTIVES,
    IGX_BANNER_DIRECTIVES,
    IgxIconComponent,
    WorldClock,
    SceneOverview,
    SceneControls,
    ScenePager,
    SceneDecision,
    SceneReveals,
    SceneAfterwards,
    SceneLesson,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ops' },
  template: `
    <igx-stepper class="scene-stepper" orientation="horizontal" titlePosition="end" [linear]="false"
                 [animationDuration]="0" [attr.aria-label]="t.scenesLabel" (activeStepChanging)="onStep($event)">
      @for (s of state.scenes; track s.n) {
        <igx-step [active]="state.scene() === $index">
          <!-- Explicit: steps made in a @for get no index of their own and show NaN. -->
          <span igxStepIndicator>{{ s.n }}</span>
          <span igxStepTitle class="step-title">{{ s.stepTitle }}</span>
        </igx-step>
      }
    </igx-stepper>

    <!-- Not dismissible: empty actions replace the default Dismiss button, and closing is cancelled. -->
    <igx-banner class="honesty-banner" [expanded]="true" (closing)="$event.cancel = true">
      <igx-icon family="app" name="info" aria-hidden="true" />
      <span class="honesty-text">{{ honesty }}</span>
      <igx-banner-actions><span></span></igx-banner-actions>
    </igx-banner>

    <header class="toolbar">
      <div class="tool">
        <igx-icon class="tool-icon" family="app" [name]="toolIcon[state.current().tool]" aria-hidden="true" />
        <div class="tool-names">
          <span class="tool-name">{{ state.current().tool }}</span>
          <h1 class="screen-name">{{ state.current().screen }}</h1>
        </div>
      </div>
      <div class="kicker">
        <span class="kicker-n">{{ t.sceneOf(state.current().n, state.scenes.length) }}</span>
        <span class="kicker-text">{{ state.current().kicker }}</span>
      </div>
      <app-world-clock [day]="state.current().day" />
    </header>

    <section class="scene" [attr.aria-label]="state.current().kicker">
      @switch (state.current().n) {
        @case (1) { <app-scene-overview /> }
        @case (2) { <app-scene-controls /> }
        @case (3) { <app-scene-pager /> }
        @case (4) { <app-scene-decision /> }
        @case (5) { <app-scene-reveals /> }
        @case (6) { <app-scene-afterwards /> }
        @case (7) { <app-scene-lesson /> }
      }
    </section>
  `,
  styleUrl: './ops-view.scss',
})
export class OpsView {
  readonly state = inject(StateService);
  readonly t = T;
  readonly honesty = HONESTY_BANNER;
  readonly toolIcon = TOOL_ICON;

  /**
   * On "changing", not "changed": the changed event waits for the step animation to finish, and a
   * clicker press in that window would be lost.
   */
  onStep(e: IStepChangingEventArgs) {
    if (e.newIndex !== this.state.scene()) this.state.goTo(e.newIndex);
  }
}
