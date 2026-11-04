# igniteui-cli / get_doc

Called 2026-11-01T22:03:44.314Z

## Arguments

```json
{
  "framework": "angular",
  "name": "grid-lite-theming"
}
```

## Result

---
component: IgxGridLiteComponent, IgxGridLiteColumnComponent, IgxSwitchComponent
toc_name: Styling & Theming
keywords: grid-lite, theming, styling, themes, custom themes, palettes, typography
summary: Learn how to load Grid Lite’s built-in themes and create custom themes with palettes and typography. The example demonstrates switching between custom light and dark themes.
---

# Styles and Themes

Grid Lite includes Bootstrap, Material, Fluent, and Indigo themes. The grid and its UI components include theme styles, but require a global stylesheet for palettes, typography, and other global configuration.

## Loading a Base Themes

How you include a theme depends on your project and build configuration. You can copy the `themes` folder to your assets directory and link the theme in `index.html`:

```html
<link rel="stylesheet" href="./assets/themes/light/bootstrap.css">
```

| Theme     | Variant | Path                                                           |
| :-------- | :------ | :------------------------------------------------------------- |
| Bootstrap | Light   | node_modules/igniteui-webcomponents/themes/light/bootstrap.css |
| Bootstrap | Dark    | node_modules/igniteui-webcomponents/themes/dark/bootstrap.css  |
| Material  | Light   | node_modules/igniteui-webcomponents/themes/light/material.css  |
| Material  | Dark    | node_modules/igniteui-webcomponents/themes/dark/material.css   |
| Fluent    | Light   | node_modules/igniteui-webcomponents/themes/light/fluent.css    |
| Fluent    | Dark    | node_modules/igniteui-webcomponents/themes/dark/fluent.css     |
| Indigo    | Light   | node_modules/igniteui-webcomponents/themes/light/indigo.css    |
| Indigo    | Dark    | node_modules/igniteui-webcomponents/themes/dark/indigo.css     |

## Creating Custom Themes

You can create or modify themes to match your project’s branding. See the <a href="https://github.com/IgniteUI/igniteui-theming#readme" target="_blank">Ignite UI theming package</a> wiki for SCSS and CSS usage.

```scss
@use 'node_modules/igniteui-theming' as *;

// Our dark theme
$my_dark_palette: palette(
  $primary: #dab785,
  $secondary: #d5896f,
  $surface: #031d44,
  $gray: #04395e,
);

// Our light theme
$my-light-palette: palette(
  $primary: #c1292e,
  $secondary: #f1d302,
  $surface: #fdfffc,
  $gray: #235789,
);

.custom-light {
  @include palette($my_light_palette);
  @include typography('"Roboto Condensed", sans-serif', $bootstrap-type-scale);
}

.custom-dark {
  @include palette($my_dark_palette);
  @include typography('"Merriweather Sans", sans-serif', $bootstrap-type-scale);
}
```

The example applies custom themes to Grid Lite and switches between them.

```typescript
import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { defineComponents, IgcSwitchComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, ProductInfo } from '../grid-lite-data.service';
import { IgxGridLiteComponent, IgxGridLiteColumnComponent } from 'igniteui-angular/grids/lite';
import { IgxSwitchComponent } from 'igniteui-angular/switch';

defineComponents(IgcSwitchComponent);

@Component({
  selector: 'app-grid-lite-styling-custom',
  templateUrl: './grid-lite-styling-custom.component.html',
  styleUrls: ['./grid-lite-styling-custom.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    IgxGridLiteComponent,
    IgxGridLiteColumnComponent,
    IgxSwitchComponent
  ]
})
export class GridLiteStylingCustomComponent implements OnInit {
  private dataService = inject(GridLiteDataService);

  public data: ProductInfo[] = [];
  public theme: 'dark' | 'light' = 'dark';

  ngOnInit() {
    this.data = this.dataService.generateProducts(50);
  }

  switchTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
  }
}
```

```html
<div class="grid-lite-wrapper">
    <section class="theme-switcher">
        <igx-switch labelPosition="before" [checked]="theme === 'light'" (change)="switchTheme()">
             Switch to {{ theme === 'dark' ? 'light' : 'dark' }} theme
        </igx-switch>
    </section>

    <igx-grid-lite [class.custom-light]="theme === 'light'" [class.custom-dark]="theme === 'dark'" [data]="data">
        <igx-grid-lite-column field="name" header="Product" sortable filterable></igx-grid-lite-column>
        <igx-grid-lite-column field="price" header="Price" dataType="number" sortable filterable></igx-grid-lite-column>
        <!-- ... additional columns -->
    </igx-grid-lite>
</div>
```

```scss
@use "igniteui-angular/theming" as *;

:host {
    --ig-size: 2;
    contain: content;
}

$my-light-palette: palette(
    $primary: #c1292e,
    $secondary: #f1d302,
    $surface: #fdfffc,
    $gray: #235789,
);

$my_dark_palette: palette(
    $primary: #ddd020,
    $secondary: #d5896f,
    $surface: #031d44,
    $gray: #04395e,
);

.custom-light {
    @include palette($my_light_palette);
    @include typography('"Roboto", sans-serif', $bootstrap-type-scale);
}

.custom-dark {
    @include palette($my_dark_palette);
    @include typography(
        '"Merriweather Sans", sans-serif',
        $bootstrap-type-scale
    );
}
```

## API References

- [`IgxGridLite`](mcp:get_api_reference?platform=angular&component=IgxGridLiteComponent)
- [`IgxGridLiteColumn`](mcp:get_api_reference?platform=angular&component=IgxGridLiteColumnComponent)

## Additional Resources

- [Column Configuration](/grid-lite/column-configuration)
- [Filtering](/grid-lite/filtering)
- [Sorting](/grid-lite/sorting)

- [Grid Lite **GitHub**](https://github.com/IgniteUI/igniteui-grid-lite)
