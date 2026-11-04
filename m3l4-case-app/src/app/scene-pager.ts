import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { IgxAvatarComponent } from 'igniteui-angular/avatar';
import { IGX_BUTTON_GROUP_DIRECTIVES } from 'igniteui-angular/button-group';
import { IGX_CARD_DIRECTIVES } from 'igniteui-angular/card';
import { IgxButtonDirective } from 'igniteui-angular/directives';
import { IgxGridLiteCellTemplateDirective, IgxGridLiteColumnComponent, IgxGridLiteComponent } from 'igniteui-angular/grids/lite';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { PRINTER_READINGS } from './case';
import { FACTS } from './case-facts';
import { T } from './i18n';
import { INCIDENTS, Incident, ON_CALL, PRINTER_AS_FINDING, dhakaLabel } from './ops-data';
import { FaultReading, StateService } from './state.service';
import { StatusChip } from './status-chip';

interface Row {
  urgency: string;
  id: string;
  title: string;
  routedTo: string;
  opened: string;
  status: string;
  printer: boolean;
}

/**
 * Scene 3, "What a stopped printer looks like": the Pager incident list on the Friday morning. The
 * toggle re-reads one alert, INC-4127, and re-routes it; nothing else on the screen changes.
 */
@Component({
  selector: 'app-scene-pager',
  imports: [
    IgxGridLiteComponent,
    IgxGridLiteColumnComponent,
    IgxGridLiteCellTemplateDirective,
    IGX_BUTTON_GROUP_DIRECTIVES,
    IGX_CARD_DIRECTIVES,
    IgxButtonDirective,
    IgxAvatarComponent,
    IgxIconComponent,
    StatusChip,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scene-pager.html',
  styleUrl: './scene-pager.scss',
})
export class ScenePager {
  readonly state = inject(StateService);
  readonly t = T;
  readonly onCall = ON_CALL;
  readonly printerSource = FACTS.printer.source;

  readonly readings: { id: FaultReading; label: string }[] = [
    { id: 'device', label: T.readAsDevice },
    { id: 'finding', label: T.readAsFinding },
  ];

  readonly asFinding = computed(() => this.state.faultReading() === 'finding');
  readonly reading = computed(() => PRINTER_READINGS[this.state.faultReading()]);

  /** The printer alert as currently read. Only urgency, routing and status change. */
  readonly printer = computed<Incident>(() => {
    const base = INCIDENTS.find((i) => i.printer)!;
    return this.asFinding() ? { ...base, ...PRINTER_AS_FINDING } : base;
  });

  readonly rows = computed<Row[]>(() =>
    INCIDENTS.map((i) => (i.printer ? this.printer() : i)).map((i) => ({
      urgency: i.urgency,
      id: i.id,
      title: i.title,
      routedTo: i.routedTo,
      // The printer is a real event: by the day only. Invented alerts may carry a minute.
      opened: i.opened === null ? T.dayLevelOpened : dhakaLabel(i.opened),
      status: i.status,
      printer: !!i.printer,
    })),
  );

  /** The on-call role the alert reaches: payments when read as a finding, desktop support otherwise. */
  readonly routedRole = computed(() => ON_CALL[this.asFinding() ? 2 : 0].role);
}
