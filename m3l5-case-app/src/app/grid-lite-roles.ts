import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/** The ARIA role each Grid Lite part should carry. */
const ROLES: Record<string, string> = {
  'igc-grid-lite-header-row': 'row',
  'igc-grid-lite-header': 'columnheader',
  'igc-grid-lite-row': 'row',
  'igc-grid-lite-cell': 'gridcell',
};

/**
 * Grid Lite 0.11 gives its scroll area `role="rowgroup"` but declares no grid above it and no roles
 * on its rows, headers and cells, which axe reports as two critical violations (aria-required-parent,
 * aria-required-children) and leaves a screen reader without a table to announce. This directive sets
 * the missing roles. The parts live in nested shadow roots and rows are created as the list scrolls, so
 * every shadow root is watched and the roles are applied again when its children change.
 *
 * Remove it when the library sets the roles itself.
 */
@Directive({ selector: 'igx-grid-lite[appGridRoles]' })
export class GridLiteRoles {
  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const watched = new WeakSet<Node>();
    const observer = new MutationObserver(() => apply(host));

    const watch = (root: Node) => {
      if (watched.has(root)) return;
      watched.add(root);
      observer.observe(root, { childList: true, subtree: true });
    };

    const apply = (el: Element) => {
      const role = ROLES[el.localName];
      if (role && el.getAttribute('role') !== role) el.setAttribute('role', role);
      if (el.shadowRoot) {
        watch(el.shadowRoot);
        for (const child of el.shadowRoot.children) apply(child);
      }
      for (const child of el.children) apply(child);
    };

    host.setAttribute('role', 'grid');
    afterNextRender(() => {
      watch(host);
      apply(host);
    });
    inject(DestroyRef).onDestroy(() => observer.disconnect());
  }
}
