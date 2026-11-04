# igniteui-cli / get_doc

Called 2026-11-01T21:59:12.549Z

## Arguments

```json
{
  "framework": "angular",
  "name": "grid-lite-cell-template"
}
```

## Result

---
component: IgxGridLiteCellTemplateDirective, IgxGridLiteColumnComponent, IgxGridLiteComponent
toc_name: Cell Template
keywords: grid-lite, grid, cell template, cell renderer, formatting, custom dom
summary: Learn to customize Grid Lite cell content with Angular templates, formatters, and custom DOM elements. Covers cell template context, required imports, and performance considerations.
---

# Column Cell Template

By default, a column renders its field value as a string. Use `<ng-template>` inside the column to customize cell output or combine values from multiple fields.

```html
<igx-grid-lite-column field="avatar" header="Avatar">
    <ng-template igxGridLiteCell let-value>
        <igx-avatar shape="circle" alt="User avatar" [src]="value">
        </igx-avatar>
    </ng-template>
</igx-grid-lite-column>
```

Import [`IgxGridLiteCellTemplateDirective`](mcp:get_api_reference?platform=angular&component=IgxGridLiteCellTemplateDirective) and add it to the `imports` array:

```typescript
import { IgxGridLiteComponent, IgxGridLiteColumnComponent, IgxGridLiteCellTemplateDirective } from 'igniteui-angular/grids/lite';
```

```typescript
imports: [ IgxGridLiteCellTemplateDirective ]
```

## Use as a Formatter Function

For simple formatting, return the formatted value. This example formats a number as a locale currency value:

```typescript
public formatter = new Intl.NumberFormat('en-150', {
  style: 'currency',
  currency: 'EUR'
});

/** Return the custom currency format for a value `value = 123456.789` */
protected formatCurrency = (value: number) => {
  return this.formatter.format(value); // => "€123,456.79"
};
```

A formatter can also combine values from different data fields:

```typescript
public formatter = new Intl.NumberFormat('en-150', {
  style: 'currency',
  currency: 'EUR'
});

/** Return the total earned money from a product in custom currency */
protected formatCurrency = (value: number, unitsSold: number) => {
  return this.formatter.format(value * unitsSold);
};
```

```html
<igx-grid-lite-column field="price" header="Price" dataType="number">
    <ng-template igxGridLiteCell let-value let-row="row">
        {{formatCurrency(value, row.data.sold)}}
    </ng-template>
</igx-grid-lite-column>
```

## Custom DOM Templates

Templates can contain Ignite UI components, standard DOM elements, or web components from other libraries. This example uses the rating component from `igniteui-webcomponents`:

```typescript
// Import external components for the custom template
import {
    defineComponents,
    IgcRatingComponent
} from 'igniteui-webcomponents';

// Define them so that we can use them in our sample
defineComponents(
    IgcRatingComponent
);
```

```html
{/* Use the rating component from Web Components in your template */}
<igx-grid-lite-column field="rating" header="Customer Rating" dataType="number">
    <ng-template igxGridLiteCell let-value>
        <igc-rating
            [value]="value"
            readonly
            min="0"
            max="5">
        </igc-rating>
    </ng-template>
</igx-grid-lite-column>
```

**Note:** More complex templates have greater performance costs. Avoid complex DOM structures when performance is important.

## Cell Context Object

The custom cell renderer receives an [`IgxGridLiteCellTemplateContext`](mcp:get_api_reference?platform=angular&component=IgxGridLiteCellTemplateContext) object:

```typescript
/**
 * Context object for the row cell template callback.
 */
export interface IgxGridLiteCellTemplateContext<T extends object> {
  /**
   * The cell element parent of the template.
   */
  parent: GridLiteCell<T>;
  /**
   * The row element containing the cell.
   */
  row: GridLiteRow<T>;
  /**
   * The current configuration for the column.
   */
  column: ColumnConfiguration<T, K>;
  /**
   * The value from the data source for this cell.
   */
  value: PropertyType<T, K>;
  
  $implicit: PropertyType<T, K>;
}
```

```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, ProductInfo } from '../grid-lite-data.service';
import { IgxGridLiteComponent, IgxGridLiteColumnComponent, IgxGridLiteCellTemplateDirective } from 'igniteui-angular/grids/lite';

defineComponents(IgcRatingComponent);

@Component({
  selector: 'app-grid-lite-column-config-simple',
  templateUrl: './grid-lite-column-config-simple.component.html',
  styleUrls: ['./grid-lite-column-config-simple.component.scss'],
  imports: [CommonModule, IgxGridLiteComponent, IgxGridLiteColumnComponent, IgxGridLiteCellTemplateDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GridLiteColumnConfigSimpleComponent implements OnInit {
  private dataService = inject(GridLiteDataService);

  public data: ProductInfo[] = [];

  public formatter = new Intl.NumberFormat('en-150', {
    style: 'currency',
    currency: 'EUR'
  });

  ngOnInit() {
    this.data = this.dataService.generateProducts(50);
  }

  protected formatCurrency = (value: number) => {
    return this.formatter.format(value);
  };
}
```

```html
<div class="grid-lite-wrapper">
  <igx-grid-lite [data]="data">
    <igx-grid-lite-column field="name" header="Product Name"></igx-grid-lite-column>
    <igx-grid-lite-column field="price" header="Price" dataType="number">
        <ng-template igxGridLiteCell let-value>
            {{formatCurrency(value)}}
        </ng-template>
    </igx-grid-lite-column>
    <igx-grid-lite-column field="sold" header="Units Sold" dataType="number"></igx-grid-lite-column>
    <igx-grid-lite-column field="total" header="Total sold">
        <ng-template igxGridLiteCell let-value>
            {{formatCurrency(value)}}
        </ng-template>
    </igx-grid-lite-column>
    <igx-grid-lite-column field="rating" header="Customer Rating" dataType="number">
        <ng-template igxGridLiteCell let-value>
            <igc-rating
                [value]="value"
                readonly
                min="0"
                max="5">
            </igc-rating>
        </ng-template>
    </igx-grid-lite-column>
  </igx-grid-lite>
</div>
```

```scss
:host {
  contain: content;
  --ig-size: 2;
}

.grid-lite-wrapper {
  width: 100%;
  height: 100%;
}

igx-grid-lite {
  min-height: 65vh;
}
```

## API References

- [`IgxGridLite`](mcp:get_api_reference?platform=angular&component=IgxGridLiteComponent)
- [`IgxGridLiteColumn`](mcp:get_api_reference?platform=angular&component=IgxGridLiteColumnComponent)
- [`IgxGridLiteCellTemplateDirective`](mcp:get_api_reference?platform=angular&component=IgxGridLiteCellTemplateDirective)

## Additional Resources

- [Column Configuration](/grid-lite/column-configuration)
- [Sorting](/grid-lite/sorting)
- [Filtering](/grid-lite/filtering)
- [Theming & Styling](/grid-lite/theming)

Our community is active and always welcoming to new ideas.

- [Grid Lite **GitHub**](https://github.com/IgniteUI/igniteui-grid-lite)
