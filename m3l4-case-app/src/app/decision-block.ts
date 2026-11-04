import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { IGX_CARD_DIRECTIVES } from 'igniteui-angular/card';
import { IGX_CHIPS_DIRECTIVES } from 'igniteui-angular/chips';
import { IgxButtonDirective } from 'igniteui-angular/directives';
import { DECISION_INTRO, PROPOSALS, QUESTIONS } from './case';
import { T } from './i18n';
import { StateService } from './state.service';

/**
 * The decision: the four proposals and the three questions, verbatim from the deck's "Your decision"
 * slide. One component for Tab 1, the case overlay and scene 4, so it looks the same every time
 * (CLAUDE.md section 1, problem 1). Scene 4 adds the vote counters. Colours use the fixed --app
 * aliases, so the dark ops scope does not recolour it.
 */
@Component({
  selector: 'app-decision-block',
  imports: [IGX_CARD_DIRECTIVES, IGX_CHIPS_DIRECTIVES, IgxButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.voting]': 'voting()' },
  template: `
    <h2 class="head">{{ t.decision }}</h2>
    <p class="intro">{{ intro }}</p>
    <ol class="proposals">
      @for (p of proposals; track p.id) {
        <li>
          <igx-card class="proposal-card proposal" elevated="false">
            <igx-card-content class="proposal-content">
              <span class="proposal-id" aria-hidden="true">{{ p.id }}</span>
              <span class="proposal-body">
                <span class="proposal-name">{{ p.id }}. {{ p.name }}</span>
                <span class="proposal-text">{{ p.text }}</span>
              </span>
              @if (voting()) {
                <span class="votes">
                  <igx-chips-area [attr.aria-label]="t.votesFor(p.id)">
                    <igx-chip class="vote-chip" [tabIndex]="-1">{{ t.votes(state.votes()[p.id]) }}</igx-chip>
                  </igx-chips-area>
                  <button igxButton="contained" type="button" class="vote-btn" [igxLabel]="t.addVote(p.id)"
                          (click)="state.vote(p.id, 1)">+1</button>
                  <button igxButton="flat" type="button" class="unvote-btn" [igxLabel]="t.removeVote(p.id)"
                          [disabled]="!state.votes()[p.id]" (click)="state.vote(p.id, -1)">−1</button>
                </span>
              }
            </igx-card-content>
          </igx-card>
        </li>
      }
    </ol>
    <h3 class="questions-head">{{ t.questions }}</h3>
    <ol class="questions">
      @for (q of questions; track $index) {
        <li>{{ q }}</li>
      }
    </ol>
  `,
  styleUrl: './decision-block.scss',
})
export class DecisionBlock {
  /** Scene 4: a vote counter on each proposal, for the breakout rooms' picks. */
  readonly voting = input(false);

  readonly state = inject(StateService);
  readonly t = T;
  readonly intro = DECISION_INTRO;
  readonly proposals = PROPOSALS;
  readonly questions = QUESTIONS;
}
