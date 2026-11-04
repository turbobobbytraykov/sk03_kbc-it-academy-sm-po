import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IGX_BUTTON_GROUP_DIRECTIVES } from 'igniteui-angular/button-group';
import { IGX_DIALOG_DIRECTIVES } from 'igniteui-angular/dialog';
import { IgxButtonDirective } from 'igniteui-angular/directives';
import { IgxIconComponent, IgxIconService } from 'igniteui-angular/icon';
import { IGX_NAVBAR_DIRECTIVES } from 'igniteui-angular/navbar';
import { CaseView } from './case-view';
import { T } from './i18n';
import { registerOfflineIcons } from './icons';
import { otherLangHref } from './lang-switch';
import { OpsView } from './ops-view';
import { StateService, Tab } from './state.service';

@Component({
  selector: 'app-root',
  imports: [
    IGX_NAVBAR_DIRECTIVES,
    IGX_BUTTON_GROUP_DIRECTIVES,
    IGX_DIALOG_DIRECTIVES,
    IgxButtonDirective,
    IgxIconComponent,
    CaseView,
    OpsView,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'onKey($event)' },
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly state = inject(StateService);
  readonly t = T;
  readonly langHref = otherLangHref();

  readonly tabs: { id: Tab; label: string }[] = [
    { id: 'case', label: T.tabCase },
    { id: 'ops', label: T.tabOps },
  ];

  constructor() {
    registerOfflineIcons(inject(IgxIconService));
  }

  confirmReset() {
    this.state.reset();
    this.state.resetOpen.set(false);
    this.state.caseOpen.set(false);
  }

  /**
   * A presenter clicker sends Right / Left or Page Down / Page Up. R reveals. Nothing fires while a
   * dialog is open or someone is typing.
   */
  onKey(e: KeyboardEvent) {
    if (this.state.caseOpen() || this.state.resetOpen() || e.altKey || e.ctrlKey || e.metaKey) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest('input, textarea, select, [contenteditable]')) return;

    const forward = e.key === 'ArrowRight' || e.key === 'PageDown';
    const back = e.key === 'ArrowLeft' || e.key === 'PageUp';
    if (this.state.tab() === 'case') {
      // The first click from the case tab goes to the scene Bobby left.
      if (forward) {
        e.preventDefault();
        this.state.tab.set('ops');
      }
      return;
    }
    if (forward) {
      e.preventDefault();
      this.state.next();
    } else if (back) {
      e.preventDefault();
      this.state.prev();
    } else if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      this.state.reveal();
    }
  }
}
