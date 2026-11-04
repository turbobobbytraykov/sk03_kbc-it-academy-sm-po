import { bootstrapApplication } from '@angular/platform-browser';
import { IgcTileManagerComponent, configureTheme, defineComponents } from 'igniteui-webcomponents';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// The Panels grid is a web component (MIT, igniteui-webcomponents). The ops view is the only place it
// and Grid Lite appear, so their theme is the dark Material one; colours come from the --ig-* palette.
defineComponents(IgcTileManagerComponent);
configureTheme('material', 'dark');

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
