import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IGX_CHIPS_DIRECTIVES, IgxChipTypeVariant } from 'igniteui-angular/chips';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { T } from './i18n';

export type Status = 'ok' | 'warn' | 'alert' | 'nodata';

const LOOK: Record<Status, { variant: IgxChipTypeVariant | null; icon: string }> = {
  ok: { variant: 'success', icon: 'status_ok' },
  warn: { variant: 'warning', icon: 'status_warn' },
  alert: { variant: 'danger', icon: 'status_alert' },
  nodata: { variant: null, icon: 'status_nodata' },
};

/**
 * A status is never colour alone: always an icon and a word (OK / WARN / ALERT / NO DATA), and an
 * optional detail after it. The chips area around the chip is the listbox an option chip needs.
 */
@Component({
  selector: 'app-status-chip',
  imports: [IGX_CHIPS_DIRECTIVES, IgxIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- A whole-value [class] binding is swallowed: igx-chip declares an unused input called "class", so
         Angular binds the expression to that input and never writes it to the element. A single-class
         binding, [class.name], is not an input and does reach the element. -->
    <igx-chips-area class="status-area" [attr.aria-label]="text()">
      <igx-chip class="status-chip" [class.chip-nodata]="status() === 'nodata'" [variant]="look().variant" [tabIndex]="-1">
        <igx-icon igxPrefix family="app" [name]="look().icon" aria-hidden="true" />
        <span class="word">{{ word() }}</span>
        @if (detail()) { <span class="detail">· {{ detail() }}</span> }
      </igx-chip>
    </igx-chips-area>
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    .status-chip {
      font-size: var(--app-small);
    }

    .word {
      font-weight: 700;
      letter-spacing: 0.04em;
    }

    .detail {
      margin-left: 0.3rem;
    }
  `,
})
export class StatusChip {
  readonly status = input.required<Status>();
  /** Replaces the status word, for the Pager's Low / High. */
  readonly label = input<string>();
  readonly detail = input<string>();

  readonly look = computed(() => LOOK[this.status()]);
  readonly word = computed(() => this.label() ?? T.status[this.status()]);
  readonly text = computed(() => (this.detail() ? `${this.word()}, ${this.detail()}` : this.word()));
}
