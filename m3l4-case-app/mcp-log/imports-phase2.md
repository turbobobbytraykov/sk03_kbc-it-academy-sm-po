# igniteui-cli / resolve_import

Called 2026-11-01T22:04:21.583Z

## Arguments

```json
{
  "symbols": [
    "IgxAvatarComponent",
    "IgxGridLiteComponent",
    "IgxGridLiteColumnComponent",
    "IgxGridLiteCellTemplateDirective",
    "IgcTileManagerComponent",
    "IgcTileComponent"
  ]
}
```

## Result

## Angular

```ts
import { IgxAvatarComponent } from 'igniteui-angular/avatar';
import { IgxGridLiteCellTemplateDirective, IgxGridLiteColumnComponent, IgxGridLiteComponent } from 'igniteui-angular/grids/lite';
```

Notes:
- If package.json depends on the `@infragistics/`-scoped (licensed) build of a package, keep that scope with the same path, e.g. `@infragistics/igniteui-angular/avatar`.

## Web Components

```ts
import { IgcTileComponent, IgcTileManagerComponent } from 'igniteui-webcomponents';
```

Notes:
- Import `defineComponents` from `igniteui-webcomponents`, then register the elements once at startup: `defineComponents(IgcTileManagerComponent, IgcTileComponent);`.
- If package.json depends on the `@infragistics/`-scoped (licensed) build of a package, keep that scope with the same path, e.g. `@infragistics/igniteui-webcomponents`.
