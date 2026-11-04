# igniteui-cli / get_doc

Called 2026-11-01T21:59:04.073Z

## Arguments

```json
{
  "framework": "angular",
  "name": "button-group"
}
```

## Result

---
component: IgxButtonGroupComponent, IgxButtonDirective, IgxRippleDirective, IgxIconComponent
toc_name: Button Group
keywords: button-group, toggle-buttons, selection, alignment, multi-select, single-select, styling, accessibility
summary: Learn how to group toggle buttons and configure their alignment, selection modes, states, content, and styling. The guide also covers accessibility, troubleshooting, and API references.
---

# Button Group Component

The Angular Button Group organizes buttons with the [`IgxButton`](mcp:get_api_reference?platform=angular&component=IgxButtonDirective) directive into groups with horizontal or vertical alignment, single or multiple selection, and toggling.

## Live Demo

```typescript
import { Component } from '@angular/core';
import { IgxButtonGroupComponent } from 'igniteui-angular/button-group';
import { IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular/directives';

type AlbumSource = 'device' | 'cloud';

@Component({
    selector: 'app-button-group-overview',
    styleUrls: ['./button-group-overview.component.scss'],
    templateUrl: './button-group-overview.component.html',
    imports: [IgxButtonGroupComponent, IgxButtonDirective, IgxRippleDirective]
})
export class ButtonGroupOverviewComponent {
    public rippleColor = 'gray';
    public source: AlbumSource = 'cloud';

    public albums: Record<AlbumSource, { title: string; photos: string[] }> = {
        device: {
            title: 'Trip around the world',
            photos: ['https://picsum.photos/id/1015/300/220', // ...
            ]
        },
        cloud: {
            title: 'Trip around the world',
            photos: ['https://picsum.photos/id/1036/300/220', // ...
            ]
        }
    };

    public get album() {
        return this.albums[this.source];
    }

    public selectSource(source: AlbumSource) {
        this.source = source;
    }
}
```

```html
<div class="sample-layout">
    <igx-buttongroup selectionMode="singleRequired">
        <button igxButton [igxRipple]="rippleColor" [selected]="source === 'device'" (click)="selectSource('device')">Device</button>
        <button igxButton [igxRipple]="rippleColor" [selected]="source === 'cloud'" (click)="selectSource('cloud')">Cloud</button>
    </igx-buttongroup>
    <div class="album">
        <p class="album-title">{{ album.title }}</p>
        <div class="album-photos">
            @for (photo of album.photos; track photo) {
                <img [src]="photo" [alt]="album.title" />
            }
        </div>
    </div>
</div>
```

```scss
@use 'igniteui-theming' as *;

.sample-layout {
    display: grid;
    width: rem(280px);
    gap: rem(8px);
}

.album-photos {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: rem(4px);
}
```

## Anatomy

The Button Group organizes Toggle Buttons in a shared container. Each button can include an icon and label.

**Button Group anatomy:** The container groups individual button items.

<span class="ig-typography__body-2" style="display: block; margin-bottom: 24px;"><strong>1. Container:</strong> Wraps the button's contents.<br />
<strong>2. Icon:</strong> Adds context to the button. Could be left, right, left and right or only icon.<br />
<strong>3. Label:</strong> The textual content that describes the button’s action to the user.</span>

```text
Button Group
└── Toggle Button
    ├── Icon
    └── Label
```

## Getting Started

Follow the [Ignite UI for Angular Getting Started](/general/getting-started) topic for project setup. Install the package and import `IGX_BUTTON_GROUP_DIRECTIVES` and any required standalone components:

```cmd
ng add igniteui-angular
```

```ts
import { IGX_BUTTON_GROUP_DIRECTIVES } from 'igniteui-angular/button-group';
import { IgxIconComponent } from 'igniteui-angular/icon';
```

The simplest usage is:

```html
<igx-buttongroup></igx-buttongroup>
```

## Usage

Wrap buttons using the [`IgxButton`](mcp:get_api_reference?platform=angular&component=IgxButtonDirective) directive. Set `selected` to select a button by default:

```html
<igx-buttongroup>
    <button igxButton><igx-icon>format_align_left</igx-icon></button>
    <button igxButton><igx-icon>format_align_center</igx-icon></button>
    <button igxButton selected><igx-icon>format_align_justify</igx-icon></button>
</igx-buttongroup>
```

### Alignment

Use the [`Alignment`](mcp:get_api_reference?platform=angular&component=IgxButtonGroupComponent&member=alignment) property to choose horizontal or vertical layout. In Angular, set `alignment` with the `ButtonGroupAlignment` enum:

```ts
import { ButtonGroupAlignment } from 'igniteui-angular/button-group';

public alignment = ButtonGroupAlignment.vertical;
```

```html
<igx-buttongroup [alignment]="alignment">
    <button igxButton>Sofia</button>
    <button igxButton>London</button>
    <button igxButton selected>New York</button>
    <button igxButton>Tokyo</button>
</igx-buttongroup>
```

The component also supports rendering multiple alignment options in a loop.

### Selection

Configure selection with the [`selectionMode`](mcp:get_api_reference?platform=angular&component=IgxButtonGroupComponent&member=selectionMode) property:

- **single** — One button can be selected or deselected.
- **single-required** — One button must remain selected after initial selection.
- **multiple** — Multiple buttons can be selected or deselected.

Angular modes are `single`, `singleRequired`, and `multi`:

```html
<igx-buttongroup [selectionMode]="'multi'">
    <button igxButton selected>Bold</button>
    <button igxButton>Italic</button>
    <button igxButton>Underline</button>
</igx-buttongroup>
```

The following example sets initial button selections for each mode:

```typescript
import { Component } from '@angular/core';
import { IgxButtonGroupComponent } from 'igniteui-angular/button-group';
import { IgxButtonDirective } from 'igniteui-angular/directives';

type SelectionMode = 'single' | 'singleRequired' | 'multi';

@Component({
    selector: 'app-button-group-selection',
    styleUrls: ['./button-group-selection.component.scss'],
    templateUrl: './button-group-selection.component.html',
    imports: [IgxButtonGroupComponent, IgxButtonDirective]
})
export class ButtonGroupSelectionComponent {
    public selectionModes: { label: string; value: SelectionMode }[] = [
        { label: 'Single', value: 'single' },
        { label: 'Single-Required', value: 'singleRequired' },
        { label: 'Multi', value: 'multi' }
    ];

    public isBoldSelected(mode: SelectionMode) {
        return mode === 'singleRequired' || mode === 'multi';
    }

    public isItalicSelected(mode: SelectionMode) {
        return mode === 'multi';
    }
}
```

```html
@for (mode of selectionModes; track mode.value) {
    <igx-buttongroup [selectionMode]="mode.value">
        <button igxButton [selected]="isBoldSelected(mode.value)">Bold</button>
        <button igxButton [selected]="isItalicSelected(mode.value)">Italic</button>
        <button igxButton>Underline</button>
    </igx-buttongroup>
}
```

An [`IgxButton`](mcp:get_api_reference?platform=angular&component=IgxButtonDirective) can be selected with its `selected` input or through the Button Group [`values`](mcp:get_api_reference?platform=angular&component=IgxButtonGroupComponent&member=values) input.

**Note:** Set a unique `value` for each button when initializing the group with `values`.

### States

Buttons support enabled and disabled states, and can be selected or unselected. State behavior comes from the contained [`IgxButton`](mcp:get_api_reference?platform=angular&component=IgxButtonDirective).

```typescript
import { Component } from '@angular/core';
import { IgxButtonGroupComponent } from 'igniteui-angular/button-group';
import { IgxButtonDirective } from 'igniteui-angular/directives';

@Component({
    selector: 'app-button-group-states',
    styleUrls: ['./button-group-states.component.scss'],
    templateUrl: './button-group-states.component.html',
    imports: [IgxButtonGroupComponent, IgxButtonDirective]
})
export class ButtonGroupStatesComponent {
    public rows: { label: string; selected: boolean }[] = [
        { label: 'Selected / Off', selected: false },
        { label: 'Selected / On', selected: true }
    ];
}
```

```html
@for (row of rows; track row.label) {
    <igx-buttongroup selectionMode="multi">
        <button igxButton [selected]="row.selected">Device</button>
        <button igxButton disabled [selected]="row.selected">Cloud</button>
    </igx-buttongroup>
}
```

### Interaction States

Enabled buttons support idle, hover, and focused states through their contained `IgxButton` components.

```typescript
import { Component } from '@angular/core';
import { IgxButtonGroupComponent } from 'igniteui-angular/button-group';
import { IgxButtonDirective } from 'igniteui-angular/directives';

@Component({
    selector: 'app-button-group-interaction-states',
    styleUrls: ['./button-group-interaction-states.component.scss'],
    templateUrl: './button-group-interaction-states.component.html',
    imports: [IgxButtonGroupComponent, IgxButtonDirective]
})
export class ButtonGroupInteractionStatesComponent {
    public rows: { label: string; selected: boolean }[] = [
        { label: 'Selected / Off', selected: false },
        { label: 'Selected / On', selected: true }
    ];

    public states = ['idle', 'hover', 'focused'];

    public getLabel(state: string) {
        return state.charAt(0).toUpperCase() + state.slice(1);
    }
}
```

```html
@for (row of rows; track row.label) {
    @for (state of states; track state) {
        <igx-buttongroup>
            <button igxButton [selected]="row.selected" [class]="'state-' + state" [class.state-selected]="row.selected">
                Button
            </button>
        </igx-buttongroup>
    }
}
```

Demo-only CSS can disable interaction and apply forced state classes to display these states.

### Layout Template

Buttons can contain text, an icon, or both. Keep the content pattern consistent across the group.

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'app-button-group-layout',
    styleUrls: ['./button-group-layout.component.scss'],
    templateUrl: './button-group-layout.component.html'
})
export class ButtonGroupLayoutComponent {
    public rippleColor = 'gray';

    public layouts = [
        { value: 'left', label: 'Left', icon: 'format_align_left' },
        { value: 'center', label: 'Center', icon: 'format_align_center' },
        { value: 'right', label: 'Right', icon: 'format_align_right' }
    ];
}
```

```html
<igx-buttongroup>
    @for (layout of layouts; track layout.value) {
        <button igxButton [igxRipple]="rippleColor">{{ layout.label }}</button>
    }
</igx-buttongroup>
<igx-buttongroup>
    @for (layout of layouts; track layout.value) {
        <button igxButton [igxRipple]="rippleColor"><igx-icon>{{ layout.icon }}</igx-icon></button>
    }
</igx-buttongroup>
```

### Custom Toggle Buttons

Use the `values` input to provide customized buttons with properties such as `label`, `icon`, `selected`, `disabled`, and `togglable`.

```typescript
import { Component, OnInit } from '@angular/core';
import { IgxButtonGroupComponent, IButtonGroupButton } from 'igniteui-angular/button-group';

interface IButton {
    ripple?: string;
    label?: string;
    disabled?: boolean;
    togglable?: boolean;
    selected?: boolean;
    color?: string;
    icon?: string;
}

class CustomToggle implements IButtonGroupButton {
    label: string;
    icon?: string;
    ripple?: string;
    selected?: boolean;
    disabled?: boolean;
    togglable?: boolean;
    color?: string;

    constructor(obj?: IButton) {
        this.ripple = obj.ripple || 'gray';
        this.label = obj.label;
        this.selected = obj.selected || false;
        this.togglable = obj.togglable || true;
        this.disabled = obj.disabled || false;
        this.color = obj.color;
        this.icon = obj.icon;
    }
}

@Component({
    selector: 'app-button-group-custom-toggle',
    styleUrls: ['./button-group-custom-toggle.component.scss'],
    templateUrl: './button-group-custom-toggle.component.html',
    imports: [IgxButtonGroupComponent]
})
export class ButtonGroupCustomToggleComponent implements OnInit {
    public bordersButtons: CustomToggle[];

    public ngOnInit() {
        this.bordersButtons = [
            new CustomToggle({ icon: 'border_top', selected: true }),
            new CustomToggle({ icon: 'border_right', selected: false }),
            // ...
        ];
    }
}
```

```html
<igx-buttongroup selectionMode="multi" [values]="bordersButtons"></igx-buttongroup>
```

### Size

Set the `--ig-size` CSS custom property to control group size:

```scss
igx-buttongroup {
    --ig-size: var(--ig-size-small);
}
```

```html
<igx-buttongroup></igx-buttongroup>
```

The sample also demonstrates small, medium, and large groups using `--ig-size-small`, `--ig-size-medium`, and `--ig-size-large`.

### Do/Don't

**When to use:** Group related toggle actions when users may select one or more options.

**When not to use:** Avoid using a Button Group for unrelated actions or a single toggle action; use a standalone `IgxToggleButton` instead.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [`alignment`](mcp:get_api_reference?platform=angular&component=IgxButtonGroupComponent&member=alignment) | `ButtonGroupAlignment` | `horizontal` | Sets the orientation of the buttons in the group. |
| [`values`](mcp:get_api_reference?platform=angular&component=IgxButtonGroupComponent&member=values) | `IButton[]` | `[]` | Defines the button items displayed in the group. |

## Styling

The Button Group theme exposes Sass parameters for group items and interaction states. Changing a primary theme property updates related state properties.

### Sass Theming

Import theming functions, create a `button-group-theme`, and include it in the component scope:

```scss
@use "igniteui-angular/theming" as *;

$custom-button-group: button-group-theme(
    $item-background: #57a5cd,
);

:host {
    @include tokens($custom-button-group);
}
```

### CSS Variables

Primary Sass parameters update related state tokens:

| Primary property | Dependent property | Description |
| --- | --- | --- |
| `$item-background` | `$item-hover-background` | Hover background for items. |
|  | `$item-selected-background` | Selected item background. |
|  | `$item-focused-background` | Focused item background. |
|  | `$disabled-background-color` | Disabled item background. |
|  | `$item-border-color` | Default item border color. |
|  | `$item-text-color` | Default item text color. |
|  | `$idle-shadow-color` | Idle item shadow color. |
| `$item-hover-background` | `$item-selected-hover-background` | Selected item hover background. |
|  | `$item-focused-hover-background` | Focused hover background. |
|  | `$item-hover-text-color` | Hovered item text color. |
|  | `$item-hover-icon-color` | Hovered item icon color. |
| `$item-selected-background` | `$item-selected-focus-background` | Selected item focus background. |
|  | `$disabled-selected-background` | Disabled selected background. |
|  | `$item-selected-text-color` | Selected item text color. |
|  | `$item-selected-icon-color` | Selected item icon color. |
|  | `$item-selected-hover-text-color` | Selected hovered item text color. |
|  | `$item-selected-hover-icon-color` | Selected hovered item icon color. |
| `$item-border-color` | `$item-hover-border-color` | Hovered item border color. |
|  | `$item-focused-border-color` | Focused item border color. |
|  | `$item-selected-border-color` | Selected item border color. |
|  | `$item-selected-hover-border-color` | Selected hovered item border color. |
|  | `$item-disabled-border` | Disabled item border color. |
|  | `$disabled-selected-border-color` | Disabled selected border color. |

### Style Parts

| Part | Component | What it styles |
| --- | --- | --- |
| `group` | [`IgxButtonGroup`](mcp:get_api_reference?platform=angular&component=IgxButtonGroupComponent) | The Button Group container. |
| `toggle` | `IgxToggleButton` | An individual Toggle Button. |

### Custom Styling

These selectors change the group background and padding, and the contained Toggle Button text color:

| Selector | Declaration | Effect |
| --- | --- | --- |
| `igx-button-group::part(group)` | `background-color`, `padding` | Changes the Button Group container background and spacing. |
| `igx-toggle-button::part(toggle)` | `color` | Changes the text color of an individual Toggle Button. |

```css
igx-button-group::part(group) {
    background-color: var(--ig-primary-500);
    padding: 8px;
}

igx-toggle-button::part(toggle) {
    color: var(--ig-secondary-300);
}
```

A Sass theme can also customize item colors:

```scss
$custom-button-group: button-group-theme(
    $border-radius: 4px,
    $item-text-color: #4a5a66,
    $item-background: #cfe8fb,
    $item-border-color: #4da3e8,
    $item-hover-text-color: #4a5a66,
    $item-hover-background: #b3daf8,
    $item-hover-border-color: #4da3e8,
    $item-selected-text-color: #2f4d6a,
    $item-selected-background: #6db3ea,
    $item-selected-border-color: #4da3e8,
    $item-selected-hover-text-color: #2f4d6a,
    $item-selected-hover-background: #6db3ea
);

:host {
    @include tokens($custom-button-group);
}
```

### Styling with Tailwind

[Set up Tailwind](/themes/misc/tailwind-classes), then import its utility file:

```scss
@import "tailwindcss";
@use 'igniteui-theming/tailwind/utilities/material.css';
```

Use `light-button-group` or `dark-button-group` and arbitrary properties to override generated CSS variables. The `!` makes utility classes important:

```html
<igx-button-group class="!light-button-group ![--item-background:#7B9E89]">
</igx-button-group>
```

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'app-button-group-tailwind-styling',
    styleUrls: ['./button-group-tailwind-styling.component.scss'],
    templateUrl: './button-group-tailwind-styling.component.html'
})
export class ButtonGroupTailwindStylingComponent {
    public rippleColor = 'gray';
    public views = ['Day', 'Week', 'Month'];
}
```

```html
<igx-buttongroup
    class="![--elevation:0] ![--item-text-color:#6d28d9] ![--item-background:#ffffff] ![--item-border-color:#c4b5fd] ![--item-hover-text-color:#6d28d9] ![--item-hover-background:#fae8ff] ![--item-hover-border-color:#c4b5fd] ![--item-selected-text-color:#ffffff] ![--item-selected-background:#7c3aed] ![--item-selected-border-color:#c4b5fd] ![--item-selected-hover-text-color:#ffffff] ![--item-selected-hover-background:#7c3aed]">
    @for (view of views; track view) {
        <button igxButton [igxRipple]="rippleColor" [selected]="view === 'Week'">{{ view }}</button>
    }
</igx-buttongroup>
```

## Accessibility

The Button Group organizes Toggle Buttons and exposes each button's selected and disabled state.

### Keyboard Interaction

Keyboard interaction is delegated to contained Toggle Buttons, which render native buttons.

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Moves focus to the next or previous enabled Toggle Button in the group. |
| Enter / Space | Activates the focused Toggle Button and selects or deselects it according to the configured selection mode. |

When the Button Group is disabled, it disables its contained buttons.

### Screen Readers / ARIA

- The group container uses `role="group"`.
- Each button exposes native button semantics; Angular updates `aria-pressed` when selection changes and disables child buttons when the group is disabled.
- The group emits `selected` and `deselected` when users change selection. Each event provides the selected Toggle Button and its index.
- Provide visible text, an `igxLabel`, or another accessible name for every icon-only button.

### Accessibility Compliance

See [Accessibility Compliance](../interactivity/accessibility-compliance.md) for Section 508 and WCAG 2.1 guidance.

| Criterion | How the component complies |
| -- | -- |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard) | Native buttons support standard keyboard activation. |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value) | The group exposes `role="group"`; buttons expose native semantics and update `aria-pressed` when selection changes. |

Your responsibilities:

- Give each Toggle Button a clear visible label or accessible name, especially when it contains only an icon.
- Choose a selection mode that communicates whether one or multiple options may be selected.
- Preserve logical button order and sufficient color contrast when customizing the group or selected state.

## Troubleshooting

Check common decisions before using Button Group as a single toggle, form field, or action group.

### Why does selectedItems not select a button?

Give every Toggle Button a unique `value` attribute. The `selectedItems` property depends on those values.

### Known Limitations

The Button Group coordinates Toggle Buttons but does not replace their individual labels or accessible names.

- Selection behavior depends on the configured `selection` mode.
- `selectedItems` depends on unique `value` attributes.
- Define each Toggle Button's content separately; the group does not provide labels or icons.

## API References

[`IgxButtonGroup`](mcp:get_api_reference?platform=angular&component=IgxButtonGroupComponent)  
[`IgxButton`](mcp:get_api_reference?platform=angular&component=IgxButtonDirective)  
[`IgxRipple`](mcp:get_api_reference?platform=angular&component=IgxRippleDirective)  
[`IgxIcon`](mcp:get_api_reference?platform=angular&component=IgxIconComponent)

## Dependencies

The Button Group requires the Angular package and its theme stylesheet. Examples also use [`IgxButton`](mcp:get_api_reference?platform=angular&component=IgxButtonDirective), [`IgxIcon`](mcp:get_api_reference?platform=angular&component=IgxIconComponent), and [`IgxRipple`](mcp:get_api_reference?platform=angular&component=IgxRippleDirective).

## Additional Resources

- [Ignite UI for Angular **Forums**](https://www.infragistics.com/community/forums/f/ignite-ui-for-angular)
- [Ignite UI for Angular **GitHub**](https://github.com/IgniteUI/igniteui-angular)

## Related Components

- [Button](./button.md) - Use Button for an individual action instead of a selectable group.

## FAQ

**Q: How do I set the selected buttons in a Button Group?**

Give every button item a unique value, then use the platform-specific selected-items setting to identify the items that should start selected. Unique values let the group track selection consistently.

**Q: Can I use icons and labels in a Button Group?**

Yes. Each button can contain an icon, a label, or both. Keep the content pattern consistent and provide a visible label or accessible name when an icon alone does not explain the option.

**Q: Can I display a Button Group vertically?**

Yes. Set the platform-specific alignment property to the vertical option. Use horizontal alignment to present related choices in a row.
