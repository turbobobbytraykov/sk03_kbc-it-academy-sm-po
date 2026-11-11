import { isDevMode } from '@angular/core';
import { LANG, Lang } from './i18n';

/**
 * Where the БГ / EN button points. Both pages resolve links against the app root (bg/ uses
 * `<base href="../">`). Kept out of i18n.ts, which stays free of Angular for the chart validator.
 */
export function otherLangHref(): string {
  const other: Lang = LANG === 'bg' ? 'en' : 'bg';
  if (location.protocol === 'file:') {
    const file = location.pathname.split('/').pop() ?? '';
    return other === 'bg' ? file.replace(/\.html$/, '-bg.html') : file.replace(/-bg\.html$/, '.html');
  }
  if (isDevMode() || new URLSearchParams(location.search).has('lang')) return `?lang=${other}`;
  return other === 'bg' ? 'bg/' : './';
}
