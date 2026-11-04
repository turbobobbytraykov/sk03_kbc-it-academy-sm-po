import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';
import { IgxBadgeComponent } from 'igniteui-angular/badge';
import { IGX_LIST_DIRECTIVES } from 'igniteui-angular/list';
import { WHAT_WAS_WATCHED } from './case';
import { FACTS } from './case-facts';
import { printedPerHour } from './charts';
import { T, tr } from './i18n';
import { OpsChart } from './ops-chart';
import { StatusChip } from './status-chip';

/** The devices Panels knows about on the Thursday. Invented; every one reports fine. */
const DEVICES = [
  { name: tr('Payment terminal', 'Платежен терминал'), detail: tr('Messaging software, sending', 'Софтуер за съобщения, изпраща') },
  { name: tr('Confirmation printer', 'Принтер за потвърждения'), detail: tr('Printing confirmations as they arrive', 'Печата потвържденията, докато пристигат') },
  { name: tr('Back-office workstations', 'Работни станции в бек офиса'), detail: tr('12 of 12 online', '12 от 12 на линия') },
  { name: tr('Link to the payments network', 'Връзка с платежната мрежа'), detail: tr('Connected', 'Свързана') },
];

/**
 * Scene 2, "What was watched": the controls dashboard. The design was sound, and the printer is on the
 * device list. The one panel that would have counted both ends has no query behind it.
 */
@Component({
  selector: 'app-scene-controls',
  imports: [IgxBadgeComponent, IGX_LIST_DIRECTIVES, OpsChart, StatusChip],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="controls-scene">
      <igc-tile-manager class="panels" column-count="3" gap="16px" resize-mode="none">
        <igc-tile class="panel-tile" disable-maximize disable-fullscreen>
          <span slot="title" class="panel-title">{{ t.devicesTitle }} <app-status-chip status="ok" [detail]="t.devicesDetail(devices.length, devices.length)" /></span>
          <div class="panel-body">
            <igx-list class="devices">
              @for (d of devices; track d.name) {
                <igx-list-item>
                  <igx-badge igxListThumbnail type="success" icon="status_ok" iconSet="app" aria-hidden="true" />
                  <span igxListLineTitle class="device-name">{{ d.name }} <span class="ok-word">OK</span></span>
                  <span igxListLineSubTitle class="device-detail">{{ d.detail }}</span>
                </igx-list-item>
              }
            </igx-list>
            <p class="panel-note"><span class="tag">{{ t.illustrative }}</span></p>
          </div>
        </igc-tile>

        <igc-tile class="panel-tile" col-span="2" disable-maximize disable-fullscreen>
          <span slot="title" class="panel-title">{{ t.printedTitle }} <app-status-chip status="ok" /></span>
          <div class="panel-body">
            <div class="panel-chart">
              <app-ops-chart [options]="printed" [label]="t.chart.printed" />
            </div>
            <p class="panel-note"><span class="tag">{{ t.illustrative }}</span> {{ t.hoursIllustrative }}</p>
          </div>
        </igc-tile>

        <igc-tile class="panel-tile empty-tile" col-span="3" disable-maximize disable-fullscreen>
          <span slot="title" class="panel-title">{{ t.noQueryTitle }} <app-status-chip status="nodata" /></span>
          <div class="panel-body no-data">
            <p class="no-data-text">{{ t.noQueryText }}</p>
          </div>
        </igc-tile>
      </igc-tile-manager>

      <figure class="deck-strip">
        <figcaption class="deck-head">{{ t.watchedHead }}</figcaption>
        @for (line of watched; track $index) {
          <p>{{ line }}</p>
        }
        <p class="panel-source">{{ t.source }} {{ malwareSource }}</p>
      </figure>
    </div>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .controls-scene {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      height: 100%;
      min-height: 0;
    }

    .panels {
      flex: 1;

      &::part(base) {
        grid-template-rows: minmax(0, 2.4fr) minmax(0, 1fr);
      }
    }

    .devices {
      --ig-size: 1;
      flex: 1;
      min-height: 0;
      overflow: hidden;
      background: transparent;
    }

    .device-name {
      font-weight: 700;
      color: var(--ops-text);
    }

    .ok-word {
      margin-left: 0.4rem;
      font-size: var(--app-small);
      font-weight: 700;
      color: var(--ops-ok);
    }

    .device-detail {
      font-size: var(--app-small);
      color: var(--ops-muted);
    }

    .no-data {
      display: grid;
      place-content: center;
      border: 2px dashed var(--ops-line);
      border-radius: 6px;
    }

    .no-data-text {
      margin: 0;
      font-family: var(--app-mono-font);
      font-size: 1.2rem;
      text-align: center;
      color: var(--ops-muted);
    }

    .deck-strip p:nth-of-type(3) {
      font-weight: 700;
    }
  `,
})
export class SceneControls {
  readonly t = T;
  readonly devices = DEVICES;
  readonly printed = printedPerHour();
  readonly watched = WHAT_WAS_WATCHED;
  readonly malwareSource = FACTS.malware.source;
}
