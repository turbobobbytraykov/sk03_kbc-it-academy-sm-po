import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IGX_CHIPS_DIRECTIVES } from 'igniteui-angular/chips';
import { IgxTooltipDirective, IgxTooltipTargetDirective } from 'igniteui-angular/directives';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { CALENDAR, CASE_DAYS, CITIES, DayIso } from './case-facts';
import { T } from './i18n';

/**
 * Dhaka, New York and Manila on the scene's day: open or closed, with the reason and its source.
 * Day level only, never a clock time, because the real events in this case are known by the day.
 */
@Component({
  selector: 'app-world-clock',
  imports: [IGX_CHIPS_DIRECTIVES, IgxIconComponent, IgxTooltipDirective, IgxTooltipTargetDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="clocks" [attr.aria-label]="t.worldClock + ', ' + dayLabel()">
      @for (c of cities(); track c.id) {
        <li class="clock">
          <span class="city">
            <span class="city-name">{{ c.name }}</span>
            <span class="city-offset">{{ c.utcOffset }}</span>
          </span>
          <span class="day">{{ dayLabel() }}</span>
          <!-- A chip is an option: the chips area is the listbox it needs around it. -->
          <igx-chips-area class="day-area" [attr.aria-label]="c.name + ', ' + dayLabel()">
            @if (c.status.open === true) {
              <igx-chip class="day-chip" variant="success" [tabIndex]="-1">
                <igx-icon igxPrefix family="app" name="day_open" aria-hidden="true" />{{ t.open }}
              </igx-chip>
            } @else if (c.status.open === false) {
              <igx-chip class="day-chip chip-closed" [tabIndex]="-1" [igxTooltipTarget]="tip">
                <igx-icon igxPrefix family="app" name="day_closed" aria-hidden="true" />{{ t.closed }} · {{ c.status.reason }}
              </igx-chip>
            } @else {
              <igx-chip class="day-chip chip-nodata" [tabIndex]="-1" [igxTooltipTarget]="tip">
                <igx-icon igxPrefix family="app" name="day_unknown" aria-hidden="true" />{{ t.noRecord }}
              </igx-chip>
            }
          </igx-chips-area>
          <div #tip="tooltip" igxTooltip>{{ c.tip }}</div>
        </li>
      }
    </ul>
  `,
  styles: `
    .clocks {
      display: flex;
      gap: 0.6rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .clock {
      display: grid;
      grid-template-columns: auto auto;
      grid-template-areas: 'city day' 'chip chip';
      column-gap: 0.6rem;
      row-gap: 0.2rem;
      align-items: baseline;
      padding: 0.35rem 0.7rem;
      border-radius: 6px;
      background: var(--ops-raised);
    }

    .city {
      grid-area: city;
      display: flex;
      gap: 0.4rem;
      align-items: baseline;
    }

    .city-name {
      font-family: var(--app-heading-font);
      font-weight: 700;
      color: var(--ops-text);
    }

    .city-offset,
    .day {
      font-family: var(--app-mono-font);
      font-size: var(--app-small);
      color: var(--ops-muted);
    }

    .day {
      grid-area: day;
      justify-self: end;
      white-space: nowrap;
    }

    .day-area {
      grid-area: chip;
    }

    .day-chip {
      font-size: var(--app-small);
    }
  `,
})
export class WorldClock {
  readonly day = input.required<DayIso>();
  readonly t = T;

  readonly dayLabel = computed(() => CASE_DAYS.find((d) => d.iso === this.day())?.label ?? this.day());
  readonly cities = computed(() =>
    CITIES.map((c) => {
      const status = CALENDAR[c.id][this.day()];
      const tip = status.open === false ? `${T.source} ${status.source}` : status.open === null ? T.noRecordTitle : '';
      return { ...c, status, tip };
    }),
  );
}
