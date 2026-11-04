# igniteui-cli / resolve_import

Called 2026-11-01T22:46:46.691Z

## Arguments

```json
{
  "symbols": [
    "IgxBadgeComponent",
    "IGX_INPUT_GROUP_DIRECTIVES"
  ]
}
```

## Result

## Angular

```ts
import { IgxBadgeComponent } from 'igniteui-angular/badge';
import { IGX_INPUT_GROUP_DIRECTIVES } from 'igniteui-angular/input-group';
```

Notes:
- If package.json depends on the `@infragistics/`-scoped (licensed) build of a package, keep that scope with the same path, e.g. `@infragistics/igniteui-angular/badge`.
