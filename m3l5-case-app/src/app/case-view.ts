import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IGX_CARD_DIRECTIVES } from 'igniteui-angular/card';
import { T } from './i18n';
import { GOAL, ILLUSTRATIVE_NOTE, PREMISE_FACTS, PREMISE_LEAD, ROLES, ROLES_CAPTION } from './case';

/** Premise, goal and roles on one screen. Used as the landing screen and inside the case overlay. */
@Component({
  selector: 'app-case-view',
  imports: [IGX_CARD_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="case-grid">
      <igx-card class="panel premise card-light" elevated>
        <igx-card-content>
          <h2 class="panel-head">{{ t.premise }}</h2>
          <p class="lead">{{ lead }}</p>
          <dl class="facts">
            @for (f of facts; track f.label) {
              <dt>{{ f.label }}</dt>
              <dd>{{ f.text }}</dd>
            }
          </dl>
          <p class="caption">{{ illustrative }}</p>
        </igx-card-content>
      </igx-card>

      <igx-card class="panel goal card-dark" elevated>
        <igx-card-content>
          <h2 class="panel-head">{{ t.goal }}</h2>
          <p class="goal-text">{{ goal }}</p>
        </igx-card-content>
      </igx-card>

      <igx-card class="panel roles card-light" elevated>
        <igx-card-content>
          <h2 class="panel-head">{{ t.whoDoesWhat }}</h2>
          <table class="roles-table">
            <thead>
              <tr><th>{{ t.role }}</th><th>{{ t.may }}</th><th>{{ t.mayNot }}</th></tr>
            </thead>
            <tbody>
              @for (r of roles; track r.id) {
                <tr>
                  <th scope="row">{{ r.name }}</th>
                  <td>{{ r.may }}</td>
                  <td class="may-not">{{ r.mayNot }}</td>
                </tr>
              }
            </tbody>
          </table>
          <p class="roles-caption">{{ rolesCaption }}</p>
        </igx-card-content>
      </igx-card>
    </div>
  `,
  styleUrl: './case-view.scss',
})
export class CaseView {
  readonly t = T;
  readonly lead = PREMISE_LEAD;
  readonly facts = PREMISE_FACTS;
  readonly illustrative = ILLUSTRATIVE_NOTE;
  readonly goal = GOAL;
  readonly roles = ROLES;
  readonly rolesCaption = ROLES_CAPTION;
}
