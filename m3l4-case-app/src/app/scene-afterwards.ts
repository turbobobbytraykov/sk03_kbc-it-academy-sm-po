import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IGX_CARD_DIRECTIVES } from 'igniteui-angular/card';
import { IGX_LIST_DIRECTIVES } from 'igniteui-angular/list';
import { AFTERWARDS } from './case';
import { AFTERMATH, FACTS } from './case-facts';
import { instructionsOutcome, recovery } from './charts';
import { T } from './i18n';
import { OpsChart } from './ops-chart';
import { StatusChip } from './status-chip';

/** Where one source string starts, so "a; b" splits into sources rather than into clauses. */
const SOURCE_STARTS = ['Wikipedia', 'Bloomberg', 'bsp.gov.ph', 'BAE'];

/**
 * Scene 6, "What happened afterwards": the Pager's incident timeline, closed, and an outcome panel.
 * Everything on this screen is a real fact from case-facts.ts and carries its source.
 */
@Component({
  selector: 'app-scene-afterwards',
  imports: [IGX_CARD_DIRECTIVES, IGX_LIST_DIRECTIVES, OpsChart, StatusChip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="afterwards">
      <igx-card class="ops-panel timeline-card">
        <igx-card-content>
          <header class="card-head">
            <h2>{{ t.timelineTitle }}</h2>
            <app-status-chip status="ok" [label]="t.timelineStatus" />
          </header>
          <div class="timeline-scroll" tabindex="0" role="region" [attr.aria-label]="t.timelineTitle">
          <igx-list class="timeline">
            @for (e of aftermath; track e.when) {
              <igx-list-item>
                <span igxListThumbnail class="when">{{ e.when }}</span>
                <span igxListLineTitle class="what">{{ e.text }} <span class="ref">{{ refs(e.source) }}</span></span>
              </igx-list-item>
            }
          </igx-list>
          </div>
          <ol class="source-key" [attr.aria-label]="t.sources">
            @for (s of sourceList; track s) {
              <li><span class="ref">[{{ $index + 1 }}]</span> {{ s }}</li>
            }
          </ol>
        </igx-card-content>
      </igx-card>

      <igx-card class="ops-panel outcome-card">
        <igx-card-content>
          <header class="card-head"><h2>{{ t.outcomeTitle }}</h2></header>
          <div class="charts">
            <figure class="chart-fig">
              <figcaption>{{ t.instructionsTitle }}</figcaption>
              <div class="panel-chart">
                <app-ops-chart [options]="instructions" [label]="t.chart.instructions" />
              </div>
              <p class="figures">
                {{ f.stoppedNewYork.text }}. {{ t.completedLine(f.completed.value, f.manila.value, f.sriLanka.value) }}
              </p>
            </figure>
            <figure class="chart-fig">
              <figcaption>{{ t.recoveryTitle }}</figcaption>
              <div class="panel-chart">
                <app-ops-chart [options]="recovered" [label]="t.chart.recovery" />
              </div>
              <p class="figures">{{ f.sriLankaRecovered.text }}. {{ f.recovered2025.text }}.</p>
            </figure>
          </div>
          <ul class="deck-lines">
            @for (line of afterwards; track $index) {
              <li>{{ line }}</li>
            }
          </ul>
          <p class="panel-source">{{ t.source }} {{ f.instructions.source }}; {{ f.bspFine.source }}</p>
        </igx-card-content>
      </igx-card>
    </div>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .afterwards {
      display: grid;
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      gap: 1rem;
      height: 100%;
      min-height: 0;
    }

    .timeline-card,
    .outcome-card {
      margin: 0;
      min-height: 0;

      igx-card-content {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        height: 100%;
        padding: 0.8rem 1rem;
        box-sizing: border-box;
      }
    }

    .card-head {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      h2 {
        margin: 0;
        font-family: var(--app-heading-font);
        font-size: 1.2rem;
        line-height: 1.2;
        letter-spacing: normal;
        color: var(--ops-text);
      }
    }

    .timeline-scroll {
      flex: 1;
      min-height: 0;
      overflow: auto;
    }

    .timeline {
      --ig-size: 1;
      background: transparent;
    }

    .when {
      width: 8.5rem;
      flex-shrink: 0;
      font-family: var(--app-mono-font);
      font-weight: 500;
      color: var(--ops-accent);
      white-space: normal;
    }

    .what {
      white-space: normal;
      line-height: 1.3;
      color: var(--ops-text);
    }

    .ref {
      font-family: var(--app-mono-font);
      font-size: var(--app-small);
      color: var(--ops-accent);
      white-space: nowrap;
    }

    .source-key {
      display: grid;
      gap: 0.15rem;
      margin: 0;
      padding: 0.4rem 0 0;
      border-top: 1px solid var(--ops-line);
      list-style: none;
      font-size: var(--app-small);
      line-height: 1.3;
      color: var(--ops-muted);
    }

    .charts {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      flex: 1;
      min-height: 0;
    }

    .chart-fig {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      margin: 0;
      min-height: 0;

      figcaption {
        font-family: var(--app-heading-font);
        font-weight: 700;
        color: var(--ops-text);
      }
    }

    .figures {
      margin: 0;
      line-height: 1.3;
      color: var(--ops-text);
    }

    .deck-lines {
      display: grid;
      gap: 0.3rem;
      margin: 0;
      padding-left: 1.2rem;
      line-height: 1.35;
      color: var(--ops-text);
    }

    @media (max-height: 860px), (max-width: 1500px) {
      .afterwards {
        grid-template-columns: 1fr;
        height: auto;
      }

      .timeline-scroll {
        overflow: visible;
      }
    }
  `,
})
export class SceneAfterwards {
  readonly t = T;
  readonly f = FACTS;
  readonly aftermath = AFTERMATH;
  /** Every distinct source on the timeline, numbered once. Entries citing two sources list both numbers. */
  readonly sourceList = [...new Set(AFTERMATH.flatMap((e) => e.source.split('; ').reduce<string[]>(
    (acc, part) => (SOURCE_STARTS.some((s) => part.startsWith(s)) ? [...acc, part] : [...acc.slice(0, -1), `${acc.at(-1)}; ${part}`]),
    [],
  )))];

  refs(source: string) {
    return this.sourceList
      .map((s, i) => (source.includes(s) ? `[${i + 1}]` : ''))
      .filter(Boolean)
      .join(' ');
  }
  readonly afterwards = AFTERWARDS;
  readonly instructions = instructionsOutcome();
  readonly recovered = recovery();
}
