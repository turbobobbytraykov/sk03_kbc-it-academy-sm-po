# igniteui-cli / resolve_import

Called 2026-11-01T21:22:48.179Z

## Arguments

```json
{
  "symbols": [
    "IGX_STEPPER_DIRECTIVES",
    "IGX_BANNER_DIRECTIVES",
    "IGX_CHIPS_DIRECTIVES",
    "IgxIconComponent",
    "IGX_CARD_DIRECTIVES",
    "IGX_DIALOG_DIRECTIVES",
    "IGX_BUTTON_GROUP_DIRECTIVES",
    "IGX_NAVBAR_DIRECTIVES",
    "IgxButtonDirective",
    "IgxIconService",
    "IGX_LIST_DIRECTIVES",
    "IgxTooltipTargetDirective",
    "IgxTooltipDirective",
    "IgxDividerDirective"
  ]
}
```

## Result

## Angular

```ts
import { IGX_BANNER_DIRECTIVES } from 'igniteui-angular/banner';
import { IGX_BUTTON_GROUP_DIRECTIVES } from 'igniteui-angular/button-group';
import { IGX_CARD_DIRECTIVES } from 'igniteui-angular/card';
import { IGX_CHIPS_DIRECTIVES } from 'igniteui-angular/chips';
import { IGX_DIALOG_DIRECTIVES } from 'igniteui-angular/dialog';
import { IgxButtonDirective, IgxTooltipDirective, IgxTooltipTargetDirective } from 'igniteui-angular/directives';
import { IgxIconComponent, IgxIconService } from 'igniteui-angular/icon';
import { IGX_LIST_DIRECTIVES } from 'igniteui-angular/list';
import { IGX_NAVBAR_DIRECTIVES } from 'igniteui-angular/navbar';
import { IGX_STEPPER_DIRECTIVES } from 'igniteui-angular/stepper';
```

Notes:
- If package.json depends on the `@infragistics/`-scoped (licensed) build of a package, keep that scope with the same path, e.g. `@infragistics/igniteui-angular/stepper`.

## Not resolved

- `IgxDividerDirective` — not found. Did you mean: IgxDividerComponent, IgxDividerModule, IgxDividerType, IgxFilterDirective?

Confirm the exact name with search_api before importing it.
