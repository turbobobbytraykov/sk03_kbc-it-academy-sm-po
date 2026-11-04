import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DecisionBlock } from './decision-block';
import { T } from './i18n';

/**
 * Scene 4, "Your decision": the same decision block as Tab 1, with a vote counter on each proposal.
 * Nothing from the reveal is reachable from here; the deck's notes say not to give an answer while
 * the rooms are working.
 */
@Component({
  selector: 'app-scene-decision',
  imports: [DecisionBlock],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="decision-scene">
      <app-decision-block [voting]="true" />
      <p class="votes-note">{{ t.votesNote }}</p>
    </div>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .decision-scene {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      max-width: 110rem;
      margin-inline: auto;
    }

    .votes-note {
      margin: 0;
      font-size: var(--app-small);
      color: var(--ops-muted);
    }
  `,
})
export class SceneDecision {
  readonly t = T;
}
