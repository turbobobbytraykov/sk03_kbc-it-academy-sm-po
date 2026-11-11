import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { IgxButtonDirective } from 'igniteui-angular/directives';
import { SimService } from './sim.service';
import { T } from './i18n';

/**
 * The last change, with Undo, inline where it happened. Replaces a snackbar, which covered the
 * capture row and the timeline for several seconds. Shows `idle` when there is nothing to undo.
 */
@Component({
  selector: 'app-undo-note',
  imports: [IgxButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-live': 'polite' },
  template: `
    @if (sim.undoNotice(); as n) {
      <span class="note" [class]="'note note--' + n.tone">
        <span class="note-text">{{ n.message }}</span>
        <button igxButton="flat" type="button" class="note-undo" (click)="sim.undo()">{{ t.undo }}</button>
      </span>
    } @else if (idle()) {
      <span class="idle">{{ idle() }}</span>
    }
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      min-width: 0;
    }
    .note {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
      padding: 0.15rem 0.2rem 0.15rem 0.9rem;
      border-left: 0.35rem solid var(--app-mid);
      border-radius: 0.3rem;
      background: var(--app-white);
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--app-navy);
      animation: note-in 0.25s ease-out;
    }
    .note--auth { border-left-color: var(--app-mid); }
    .note--unauth { border-left-color: var(--ig-error-500); }
    /* Up to two lines, so a long role name is never cut off. */
    .note-text {
      min-width: 0;
      overflow: hidden;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .note-undo {
      flex: none;
      font-size: 1rem;
    }
    .idle {
      font-size: 0.95rem;
      color: var(--app-grey);
    }
    @keyframes note-in {
      from { opacity: 0; transform: translateY(0.4rem); }
      to { opacity: 1; transform: none; }
    }
  `,
})
export class UndoNote {
  readonly sim = inject(SimService);
  readonly t = T;
  /** Text shown when there is nothing to undo. */
  readonly idle = input('');
}
