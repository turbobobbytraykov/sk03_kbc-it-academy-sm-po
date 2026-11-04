import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IGX_CARD_DIRECTIVES } from 'igniteui-angular/card';
import { IGX_LIST_DIRECTIVES } from 'igniteui-angular/list';
import { HOW_TO_READ, PREMISE, SCENES } from './case';
import { TIMELINE, TIMELINE_CAPTION, TIMELINE_SOURCE } from './case-facts';
import { DecisionBlock } from './decision-block';
import { T } from './i18n';

/**
 * Tab 1: premise, what will play out, the decision and how to read the ops screens, on one screen.
 * The same component fills the case overlay, so the decision always looks the same.
 */
@Component({
  selector: 'app-case-view',
  imports: [IGX_CARD_DIRECTIVES, IGX_LIST_DIRECTIVES, DecisionBlock],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.compact]': 'compact()' },
  template: `
    @if (!compact()) {
      <h1 class="visually-hidden">{{ t.tabCase }}</h1>
    }
    <div class="case-grid">
      <igx-card class="panel premise card-pale">
        <igx-card-content>
          <h2 class="panel-head">{{ t.premise }}</h2>
          @for (p of premise; track $index) {
            <p class="lead">{{ p }}</p>
          }
          <igx-list class="timeline list-on-pale" [attr.aria-label]="t.timelineLabel">
            @for (e of timeline; track e.day) {
              <igx-list-item>
                <span igxListThumbnail class="tl-day">{{ e.day }}</span>
                <span igxListLineTitle class="tl-text">{{ e.text }}</span>
              </igx-list-item>
            }
          </igx-list>
          <p class="caption">{{ timelineCaption }}</p>
          <p class="source">{{ t.source }} {{ timelineSource }}</p>
        </igx-card-content>
      </igx-card>

      <igx-card class="panel play-out card-pale">
        <igx-card-content>
          <h2 class="panel-head">{{ t.playOut }}</h2>
          <p class="panel-lead">{{ t.playOutLead }}</p>
          <igx-list class="scene-list list-on-pale">
            @for (s of scenes; track s.n) {
              <igx-list-item>
                <span igxListThumbnail class="scene-n">{{ s.n }}</span>
                <span igxListLineTitle class="scene-kicker">{{ s.kicker }}</span>
                <span igxListLineSubTitle class="scene-screen">{{ s.tool === 'Proposals' ? s.screen : s.tool + ' · ' + s.screen }}</span>
              </igx-list-item>
            }
          </igx-list>
        </igx-card-content>
      </igx-card>

      <app-decision-block class="panel decision" />

      <igx-card class="panel how-to-read card-pale">
        <igx-card-content>
          <h2 class="panel-head">{{ t.howToRead }}</h2>
          @for (p of howToRead; track $index) {
            <p class="read-text">{{ p }}</p>
          }
        </igx-card-content>
      </igx-card>
    </div>
  `,
  styleUrl: './case-view.scss',
})
export class CaseView {
  /** Inside the overlay: the same panels, slightly tighter. */
  readonly compact = input(false);

  readonly t = T;
  readonly premise = PREMISE;
  readonly timeline = TIMELINE;
  readonly timelineCaption = TIMELINE_CAPTION;
  readonly timelineSource = TIMELINE_SOURCE;
  readonly scenes = SCENES;
  readonly howToRead = HOW_TO_READ;
}
