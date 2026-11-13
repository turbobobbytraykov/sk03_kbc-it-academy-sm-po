import { bootstrapApplication } from '@angular/platform-browser';
import { IgcThemeProviderComponent, IgcTileManagerComponent, defineComponents } from 'igniteui-webcomponents';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// The Panels grid is a web component (MIT, igniteui-webcomponents). Its dark Material theme is scoped to the ops
// view with <igc-theme-provider> in app.html, not set for the whole page with configureTheme(). Grid Lite did not
// react to the provider when tried (a bootstrap/light provider changed the tiles and left the grids as they were);
// it takes its colours from the --ig-* palette variables, which the page's own theme sets.
defineComponents(IgcTileManagerComponent, IgcThemeProviderComponent);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
