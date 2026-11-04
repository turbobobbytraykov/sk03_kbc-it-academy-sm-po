import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';
import { IGX_CARD_DIRECTIVES } from 'igniteui-angular/card';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { CLOSED_PERIODS, FACTS } from './case-facts';
import { calendarHeatmap, queueSpark, throughputSpark, weekWithCalendars } from './charts';
import { T } from './i18n';
import { OpsChart } from './ops-chart';
import { QUEUE_DEPTH, THURSDAY } from './ops-data';
import { StatusChip } from './status-chip';

/**
 * Scene 1, "The case" and "Bangladesh Bank, February 2016": Panels on the Thursday. Every
 * infrastructure panel is green. Below them, the three calendars side by side, which is where the gap was.
 */
@Component({
  selector: 'app-scene-overview',
  imports: [IGX_CARD_DIRECTIVES, IgxIconComponent, OpsChart, StatusChip],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overview">
      <div class="stats">
        <igx-card class="ops-panel stat">
          <igx-card-content>
            <span class="stat-name">{{ t.statGateway }}</span>
            <app-status-chip status="ok" />
            <span class="stat-value">{{ t.statGatewayValue }}</span>
          </igx-card-content>
        </igx-card>
        <igx-card class="ops-panel stat">
          <igx-card-content>
            <span class="stat-name">{{ t.statQueue }}</span>
            <app-status-chip status="ok" />
            <span class="stat-value">{{ t.statQueueValue(maxDepth) }}</span>
            <div class="spark"><app-ops-chart [options]="queue" [label]="t.chart.queue" /></div>
          </igx-card-content>
        </igx-card>
        <igx-card class="ops-panel stat">
          <igx-card-content>
            <span class="stat-name">{{ t.statMessages }}</span>
            <app-status-chip status="ok" />
            <span class="stat-value">{{ t.statMessagesValue(sentThursday) }}</span>
            <div class="spark"><app-ops-chart [options]="throughput" [label]="t.chart.throughput" /></div>
          </igx-card-content>
        </igx-card>
        <igx-card class="ops-panel stat">
          <igx-card-content>
            <span class="stat-name">{{ t.statPrinter }}</span>
            <app-status-chip status="ok" />
            <span class="stat-value">{{ t.statPrinterValue }}</span>
          </igx-card-content>
        </igx-card>
      </div>

      <igc-tile-manager class="panels" column-count="1" gap="16px" resize-mode="none">
        <igc-tile class="panel-tile" disable-maximize disable-fullscreen>
          <span slot="title" class="panel-title">{{ t.calendarsTitle }}</span>
          <div class="panel-body">
            <div class="panel-chart">
              <app-ops-chart [options]="calendar" [label]="t.chart.calendar" />
            </div>
          </div>
        </igc-tile>
        <igc-tile class="panel-tile" disable-maximize disable-fullscreen>
          <span slot="title" class="panel-title">{{ t.weekTitle }}</span>
          <div class="panel-body">
            <div class="panel-chart">
              <app-ops-chart [options]="week" [label]="t.chart.week" />
            </div>
          </div>
        </igc-tile>
      </igc-tile-manager>
      <p class="panel-note footer">
        <span class="time-range">
          <igx-icon family="app" name="time_range" aria-hidden="true" />
          {{ t.thursday }}
        </span>
        <span class="tag">{{ t.illustrative }}</span> {{ t.weekNote }} {{ t.calendarsNote }}
        {{ t.source }} {{ calendarSource }}
      </p>
    </div>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .overview {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      height: 100%;
      min-height: 0;
    }

    .footer .time-range {
      margin-right: 0.4rem;
      padding-block: 0.05rem;
    }

    .time-range {
      display: inline-flex;
      vertical-align: middle;
      align-items: center;
      gap: 0.4rem;
      padding: 0.25rem 0.7rem;
      border-radius: 999px;
      background: var(--ops-raised);
      font-family: var(--app-mono-font);
      color: var(--ops-text);

      igx-icon {
        color: var(--ops-accent);
      }
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 16px;
    }

    .stat {
      margin: 0;

      // Name and status on top; the value with its sparkline beside it, to keep the cards short.
      igx-card-content {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        grid-template-rows: auto 2.6rem;
        grid-template-areas: 'name name chip' 'value spark spark';
        gap: 0.3rem 0.8rem;
        align-items: center;
        padding: 0.6rem 0.9rem;
      }
    }

    .stat-name {
      grid-area: name;
      font-family: var(--app-heading-font);
      font-weight: 700;
      color: var(--ops-text);
    }

    app-status-chip {
      grid-area: chip;
    }

    .stat-value {
      grid-area: value;
      white-space: nowrap;
      font-family: var(--app-heading-font);
      font-size: 1.45rem;
      font-weight: 700;
      color: var(--ops-text);
    }

    .spark {
      grid-area: spark;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .panels {
      flex: 1;

      // Two short panels share the height; their charts may be smaller than the usual minimum.
      .panel-chart {
        min-height: 6rem;
      }
    }
  `,
})
export class SceneOverview {
  readonly t = T;
  readonly queue = queueSpark();
  readonly throughput = throughputSpark();
  readonly calendar = calendarHeatmap();
  readonly week = weekWithCalendars();
  readonly maxDepth = Math.max(...QUEUE_DEPTH.map((p) => p.depth));
  readonly sentThursday = THURSDAY[THURSDAY.length - 1].sentTotal;
  readonly calendarSource = CLOSED_PERIODS[0].source;
  readonly facts = FACTS;
}
