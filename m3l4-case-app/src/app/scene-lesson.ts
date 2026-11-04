import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';
import { IGX_CHIPS_DIRECTIVES } from 'igniteui-angular/chips';
import { IGX_INPUT_GROUP_DIRECTIVES } from 'igniteui-angular/input-group';
import { LESSON } from './case';
import { FACTS } from './case-facts';
import { builtPanel } from './charts';
import { T } from './i18n';
import { OpsChart } from './ops-chart';
import { ALERT_AFTER_MINUTES } from './ops-data';
import { StatusChip } from './status-chip';

/**
 * Scene 7, "The lesson": the dashboard after the decision. The panel scene 2 had no query for now
 * exists and has an owner, and next to it is an alert that fires because nothing happened.
 */
@Component({
  selector: 'app-scene-lesson',
  imports: [IGX_CHIPS_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, OpsChart, StatusChip],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="lesson">
      <igc-tile-manager class="panels" column-count="3" gap="16px" resize-mode="none">
        <igc-tile class="panel-tile" col-span="2" disable-maximize disable-fullscreen>
          <span slot="title" class="panel-title">
            {{ t.builtTitle }}
            <app-status-chip status="alert" [detail]="t.gap(realCount.value)" />
            <igx-chips-area class="owner-area" [attr.aria-label]="t.ownerLabel(owner)">
              <igx-chip class="owner-chip" [tabIndex]="-1">{{ t.ownerLabel(owner) }}</igx-chip>
            </igx-chips-area>
          </span>
          <div class="panel-body">
            <div class="panel-chart">
              <app-ops-chart [options]="built" [label]="t.chart.built" />
            </div>
            <p class="panel-note">
              <span class="tag">{{ t.illustrative }}</span> {{ t.hoursIllustrative }}
              {{ t.realCount(realCount.value) }} {{ t.source }} {{ realCount.source }}
            </p>
          </div>
        </igc-tile>

        <igc-tile class="panel-tile" disable-maximize disable-fullscreen>
          <span slot="title" class="panel-title">{{ t.ruleTitle }} <app-status-chip status="alert" [detail]="t.firing" /></span>
          <div class="panel-body rule-body">
            <igx-input-group type="border" class="rule-input">
              <label igxLabel for="rule-text">{{ t.ruleLabel }}</label>
              <textarea igxInput id="rule-text" readonly rows="3" [value]="rule"></textarea>
            </igx-input-group>
            <igx-input-group type="border" class="rule-input">
              <label igxLabel for="rule-routes">{{ t.ruleRoutes }}</label>
              <input igxInput id="rule-routes" readonly [value]="t.ruleRoutesValue" />
            </igx-input-group>
            <igx-chips-area [attr.aria-label]="t.ownerLabel(owner)">
              <igx-chip class="owner-chip" [tabIndex]="-1">{{ t.ownerLabel(owner) }}</igx-chip>
            </igx-chips-area>
            <p class="panel-note"><span class="tag">{{ t.illustrative }}</span></p>
          </div>
        </igc-tile>
      </igc-tile-manager>

      <figure class="deck-strip lesson-strip">
        <p class="big-line">{{ caption }}</p>
        <p>{{ rest }}</p>
        <p class="homework">{{ lesson.homework }}</p>
      </figure>
    </div>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .lesson {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      height: 100%;
      min-height: 0;
    }

    .panels {
      flex: 1;
    }

    .owner-area {
      margin-left: auto;
    }

    .owner-chip {
      font-size: var(--app-small);
      font-weight: 700;
    }

    /* Ignite caps chip text at 32ch, which cuts the Bulgarian role name. */
    :host-context(html[lang='bg']) .owner-chip ::ng-deep .igx-chip__content {
      max-width: none;
    }

    .rule-body {
      gap: 0.8rem;
    }

    .rule-input ::ng-deep .igx-input-group__label {
      font-size: var(--app-small);
    }

    .rule-input textarea,
    .rule-input input {
      font-family: var(--app-mono-font);
      font-size: 1rem;
      line-height: 1.35;
      resize: none;
    }

    .lesson-strip {
      border-left-color: var(--ops-ok);
    }

    .big-line {
      font-family: var(--app-heading-font);
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--ops-text);
    }

    .homework {
      font-size: var(--app-small);
      color: var(--ops-muted);
    }
  `,
})
export class SceneLesson {
  readonly t = T;
  readonly lesson = LESSON;
  /** "An absence needs an owner in the same way a number does." on its own line, then the rest. */
  readonly caption = LESSON.second[0].slice(0, LESSON.second[0].indexOf('.') + 1);
  readonly rest = `${LESSON.second[0].slice(this.caption.length).trim()} ${LESSON.second[1]}`;
  readonly built = builtPanel();
  readonly realCount = FACTS.instructions;
  readonly owner = T.ownerRole;
  readonly rule = T.ruleText(ALERT_AFTER_MINUTES);
}
