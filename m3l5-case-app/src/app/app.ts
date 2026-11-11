import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { IGX_BUTTON_GROUP_DIRECTIVES } from 'igniteui-angular/button-group';
import { IGX_DIALOG_DIRECTIVES } from 'igniteui-angular/dialog';
import { IgxButtonDirective } from 'igniteui-angular/directives';
import { IgxIconComponent, IgxIconService } from 'igniteui-angular/icon';
import { IGX_NAVBAR_DIRECTIVES } from 'igniteui-angular/navbar';
import { ActionScreen } from './action-screen';
import { CaseView } from './case-view';
import { LogScreen } from './log-screen';
import { RevealScreen } from './reveal-screen';
import { Screen, SimService } from './sim.service';
import { T } from './i18n';
import { otherLangHref } from './lang-switch';

/**
 * The material theme draws component icons from the Material Icons web font. The room's network may
 * block font CDNs and the app must run from file://, so the few icons the controls use are inline SVG.
 */
function registerOfflineIcons(icons: IgxIconService) {
  const svg = (d: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${d}"/></svg>`;
  const set: Record<string, string> = {
    input_expand: 'M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z',
    input_collapse: 'M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z',
    input_clear: 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    // layers: the case opens over the screen
    overlay: 'M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z',
    verdict_yes: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    verdict_no: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z',
  };
  for (const [name, d] of Object.entries(set)) {
    icons.addSvgIconFromText(name, svg(d), 'app');
    icons.setIconRef(name, 'default', { name, family: 'app' });
  }
}

@Component({
  selector: 'app-root',
  imports: [
    IGX_NAVBAR_DIRECTIVES,
    IGX_BUTTON_GROUP_DIRECTIVES,
    IGX_DIALOG_DIRECTIVES,
    IgxButtonDirective,
    IgxIconComponent,
    CaseView,
    ActionScreen,
    LogScreen,
    RevealScreen,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'onKey($event)' },
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly sim = inject(SimService);
  readonly t = T;
  readonly langHref = otherLangHref();

  readonly screens: { id: Screen; label: string }[] = [
    { id: 'case', label: T.screens.case },
    { id: 'action', label: T.screens.action },
    { id: 'log', label: T.screens.log },
    { id: 'reveal', label: T.screens.reveal },
  ];

  readonly caseOpen = signal(false);

  constructor() {
    registerOfflineIcons(inject(IgxIconService));
  }

  /** Clock only keeps the log and the current screen; everything goes back to The case. */
  confirmReset(everything: boolean) {
    if (everything) {
      this.sim.reset();
      this.sim.screen.set('case');
    } else {
      this.sim.resetClock();
    }
    this.sim.resetOpen.set(false);
  }

  /** Space pauses and resumes the clock from any screen; 1 to 4 switch screens. Not while someone is typing or a dialog is open. */
  onKey(e: KeyboardEvent) {
    if (this.sim.resetOpen() || this.sim.editing() || this.caseOpen() || e.ctrlKey || e.altKey || e.metaKey) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest?.('input, textarea, igx-select, igx-dialog, [contenteditable]')) return;
    const screen = this.screens[Number(e.key) - 1];
    if (screen) {
      this.sim.screen.set(screen.id);
      return;
    }
    // A focused button takes Space itself.
    if (e.key !== ' ' || target?.closest?.('button, a')) return;
    e.preventDefault();
    this.sim.toggleRunning();
  }
}
