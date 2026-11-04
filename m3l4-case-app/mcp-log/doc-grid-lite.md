# igniteui-cli / get_doc

Called 2026-11-01T21:59:12.549Z

## Arguments

```json
{
  "framework": "angular",
  "name": "grid-lite-overview"
}
```

## Result

---
component: IgxGridLiteComponent, IgxGridLiteColumnComponent, IgxGridLiteCellTemplateDirective, IgxAvatarComponent, IgxChipComponent
toc_name: Grid Lite
keywords: grid-lite, data-grid, filtering, sorting, column hiding, resizing, virtualization, keyboard navigation
summary: Covers Grid Lite’s core features, setup, and a sample with custom column templates. Learn how to install the required package and use sorting, filtering, virtualization, and theming.
---

# Free & Open-Source Angular Data Grid (Grid Lite)

Ignite UI for Angular Grid Lite is a lightweight, open-source data grid for Angular applications. It provides essential data presentation features with minimal overhead.

Grid Lite is built as a Web Component and can be used with or without a web framework.

## What You Get with our Free Angular Data Grid

Grid Lite supports column sorting, filtering, hiding, and resizing; predefined data types; row virtualization; keyboard navigation; and theming through the [Ignite UI Theming Framework](/themes).

Angular [supports](https://custom-elements-everywhere.com/#angular) custom elements, so you can use Grid Lite in Angular applications.

## Grid Lite in Action

```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, User } from '../grid-lite-data.service';
import { IgxGridLiteComponent, IgxGridLiteColumnComponent, IgxGridLiteCellTemplateDirective } from 'igniteui-angular/grids/lite';
import { IgxAvatarComponent } from 'igniteui-angular/avatar';
import { IgxChipComponent } from 'igniteui-angular';

defineComponents(IgcRatingComponent);

@Component({
    selector: 'app-grid-lite-overview',
    templateUrl: './grid-lite-overview.component.html',
    styleUrls: ['./grid-lite-overview.component.scss'],
    imports: [
        CommonModule,
        IgxGridLiteComponent,
        IgxGridLiteColumnComponent,
        IgxAvatarComponent,
        IgxGridLiteCellTemplateDirective,
        IgxChipComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GridLiteOverviewComponent implements OnInit {
    private dataService = inject(GridLiteDataService);
    public data: User[] = [];

    ngOnInit() {
        this.data = this.dataService.generateUsers(1000);
    }

    public getDepartmentBadgeVariant = (status: string): string => {
        switch (status) {
            case "Engineering":
                return "primary";
            case "Marketing":
                return "warning";
            case "Sales":
                return "error";
            case "Finance":
                return "success";
            default:
                return "primary";
        }
    };

    public getEmploymentTypeOutline = (type: string): string => {
        switch (type) {
            case 'Full-Time': return 'outline-success';
            case 'Part-Time': return 'outline-warning';
            case 'Contract': return 'outline-primary';
            default: return 'outline-primary';
        }
    };
}
```

```html
<div class="grid-lite-wrapper">
    <igx-grid-lite [data]="data">
        <igx-grid-lite-column field="avatar" header="Avatar">
            <ng-template igxGridLiteCell let-value>
                <igx-avatar shape="circle" alt="User avatar" [src]="value"></igx-avatar>
            </ng-template>
        </igx-grid-lite-column>

        <igx-grid-lite-column field="firstName" header="First Name" sortable filterable
            resizable></igx-grid-lite-column>
        <!-- ... additional columns -->

        <igx-grid-lite-column field="satisfaction" header="Satisfaction Rating" dataType="number" sortable filterable
            resizable>
            <ng-template igxGridLiteCell let-value>
                <igc-rating [value]="value" [readonly]="true" [min]="0" [max]="5" [step]="0.01"></igc-rating>
            </ng-template>
        </igx-grid-lite-column>

        <igx-grid-lite-column field="employmentType" header="Employment Type" sortable filterable resizable>
            <ng-template igxGridLiteCell let-value>
                <igx-chip [ngClass]="getEmploymentTypeOutline(value)">
                    {{ value }}
                </igx-chip>
            </ng-template>
        </igx-grid-lite-column>

        <igx-grid-lite-column field="department" header="Department" sortable filterable resizable>
            <ng-template igxGridLiteCell let-value>
                <igx-chip [ngClass]="getDepartmentBadgeVariant(value)">
                    {{ value }}
                </igx-chip>
            </ng-template>
        </igx-grid-lite-column>
        <!-- ... additional columns -->
    </igx-grid-lite>
</div>
```

```scss
:host {
  contain: strict;
  min-height: 400px;
  --ig-size: 1;
}

.grid-lite-wrapper {
  width: 100%;
  height: 100%;
}

igx-grid-lite {
  min-height: 75vh;
}

igc-rating {
  display: block;
  margin: 0 auto;
}

/* ... additional styles */
```

## Installation and Setup

Import Grid Lite from `igniteui-angular/grids/lite` and install the `igniteui-grid-lite` package that renders the UI. [`IgxGridLite`](mcp:get_api_reference?platform=angular&component=IgxGridLiteComponent) provides Angular bindings for events, templates, dependency injection, change detection, and pipes.

```shell
npm install igniteui-grid-lite
```

Import the Grid Lite components in your application:

```typescript
// app.component.ts

import { Component } from '@angular/core';
import { IgxGridLiteComponent, IgxGridLiteColumnComponent } from 'igniteui-angular/grids/lite';

@Component({
  ...
  imports: [IgxGridLiteComponent, IgxGridLiteColumnComponent],
  template: `
    <div>
      <igx-grid-lite [data]="products">
        <igx-grid-lite-column field="id" header="ID" dataType="number"></igx-grid-lite-column>
        <igx-grid-lite-column field="name" header="Name"></igx-grid-lite-column>
        {/* Additional columns */}
      </igx-grid-lite>
    
</div>
  `
})
export class AppComponent {
  products: Products[] = [...];
}
```

## Features

### Performance Built In

Row virtualization enables smooth scrolling through large amounts of data.

### Automatic Column Types

Column types are generated based on the data source, with filtering based on column type.

### Custom Column Templates

Column templates let you render custom content and UX in grid columns.

### Interactive Features

Grid Lite supports column filtering, hiding, resizing, and sorting.

### Beautiful UX & Branding

Built-in themes include Bootstrap, Material, and Fluent, with options for branding, fonts, elevation, and display density.

### Rich Keyboard Navigation

Excel-style keyboard navigation provides a familiar, responsive experience.

## Is Grid Lite a Free & Open-Source Angular Data Grid?

Yes. Grid Lite is MIT-licensed and free for commercial or personal projects, with no feature gating. If your project grows to require enterprise functionality, you can transition to the full-featured Data Grid.

Angular supports custom elements, so you can use Grid Lite with ease.
