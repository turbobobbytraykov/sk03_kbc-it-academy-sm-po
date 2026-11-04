# igniteui-cli / get_doc

Called 2026-11-01T22:40:30.649Z

## Arguments

```json
{
  "framework": "angular",
  "name": "badge"
}
```

## Result

---
component: IgxBadgeComponent
toc_name: Badge
keywords: badge, status, notification, indicator, count, dot, label, avatar, outlined
summary: Explains how to display compact status, count, and notification indicators with the Badge. Covers content, types, sizing, shape, styling, accessibility, and common usage decisions.
---

# Badge Component

The Badge displays a short status, category, count, or notification indicator alongside another component. Its predefined styles communicate information, success, warnings, or errors.

## Live Demo

```typescript
import { Component } from '@angular/core';
import { IgxAvatarComponent } from 'igniteui-angular/avatar';
import { IgxBadgeComponent } from 'igniteui-angular/badge';
import { IgxChipComponent } from 'igniteui-angular/chips';
import { IgxIconComponent } from 'igniteui-angular/icon';

@Component({
    selector: 'app-badge-overview',
    templateUrl: './badge-overview.component.html',
    styleUrls: ['./badge-overview.component.scss'],
    imports: [IgxAvatarComponent, IgxBadgeComponent, IgxChipComponent, IgxIconComponent]
})
export class BadgeOverviewComponent { }
```

```html
<igx-avatar
    class="avatar-anchor"
    src="https://dl.infragistics.com/x/img/avatars/avatar-profile-04.png"
    shape="circle"
    size="small">
</igx-avatar>
<igx-badge icon="check" outlined type="success"></igx-badge>

<igx-icon class="mail-anchor">mail</igx-icon>
<igx-badge value="2" outlined type="error"></igx-badge>
<!-- ... additional badge examples -->
```

```scss
@use "sass:list";
@use "igniteui-theming/sass/typography" as *;

:host {
    display: grid;
    grid-auto-flow: column;
    place-content: center;
    place-items: center;
    column-gap: rem(60px);
    min-height: 7rem;
}

igx-badge {
    --ig-size: var(--ig-size-small);

    position: absolute;
    inset-block-start: anchor(10%);
    inset-inline-start: anchor(85.5%);
    translate: -50% -50%;
}

$anchors: avatar, mail, events, notifications;

@each $anchor in $anchors {
    $i: list.index($anchors, $anchor);

    .#{$anchor}-anchor {
        anchor-name: --#{$anchor};
    }

    igx-badge:nth-of-type(#{$i}) {
        position-anchor: --#{$anchor};
    }
}
```

## Anatomy

The Badge is a compact label or dot indicator that decorates another interface element.

1. **Dot indicator:** Shows a status or new update.
2. **Icon:** Represents a status or action.
3. **Container:** Holds and styles the icon or label.
4. **Label:** Displays text or a number.

The component renders its content inside the `base` CSS part. Use the default slot for text or other inline content; with `dot` enabled, the badge renders without content.

```text
<igc-badge>
└── ::part(base)
  └── default slot content
</igc-badge>
```

## Getting Started

Follow the [Ignite UI for Angular Getting Started](../general/getting-started.md) topic for project setup. Install the package and import `IgxBadgeComponent` in the component `imports` collection.

```cmd
npm install igniteui-angular
```

```ts
import { IgxBadgeComponent } from 'igniteui-angular/badge';
```

The simplest usage of the [`IgxBadge`](mcp:get_api_reference?platform=angular&component=IgxBadgeComponent) is:

```html
<igx-badge></igx-badge>
```

## Usage

Use the Badge to display a short status, category, count, or notification indicator alongside another component. A relatively positioned wrapper can anchor it over an avatar.

```typescript
import { IgxBadgeModule } from 'igniteui-angular/badge';
import { IgxAvatarModule } from 'igniteui-angular/avatar';
```

```html
<div class="wrapper">
  <igx-avatar icon="person" shape="circle" size="small"></igx-avatar>
  <igx-badge icon="check" type="success"></igx-badge>
</div>
```

```scss
.wrapper {
  position: relative;
  margin-top: 15px;
}

igx-badge {
  position: absolute;
  bottom: 0;
  left: 28px;
}
```

### Type

Use `[value]` for text or a count, `[icon]` for an icon, or set both to display them together. You can also project content; wrap text when projecting both an icon and text to preserve padding.

```html
<igx-badge [value]="model.value"></igx-badge>
<igx-badge icon="check" type="success"></igx-badge>
<igx-badge icon="check" value="5" type="success"></igx-badge>

<igx-badge>
  <igx-icon>bluetooth</igx-icon>
  <span>Bluetooth</span>
</igx-badge>
```

```typescript
import { Component } from '@angular/core';
import { IgxAvatarComponent } from 'igniteui-angular/avatar';
import { IgxBadgeComponent } from 'igniteui-angular/badge';

@Component({
    selector: 'app-badge-type',
    templateUrl: './badge-type.component.html',
    styleUrls: ['./badge-type.component.scss'],
    imports: [IgxAvatarComponent, IgxBadgeComponent]
})
export class BadgeTypeComponent { }
```

```html
<igx-avatar src="https://dl.infragistics.com/x/img/avatars/avatar-profile-04.png" shape="circle" size="small"></igx-avatar>
<igx-badge dot outlined type="success"></igx-badge>
<span>Dot</span>

<igx-avatar src="https://dl.infragistics.com/x/img/avatars/avatar-profile-04.png" shape="circle" size="small"></igx-avatar>
<igx-badge value="2" outlined type="success"></igx-badge>
<span>Text</span>
<!-- ... additional type example -->
```

```scss
@use "sass:list";
@use "igniteui-theming/sass/typography" as *;

$types: dot, icon, text;

:host {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: auto auto;
    place-content: center;
    place-items: center;
}

igx-badge {
    --ig-size: var(--ig-size-small);

    position: absolute;
    inset-block-start: anchor(85.5%);
    inset-inline-start: anchor(85.5%);
    translate: -50% -50%;
}

@each $type in $types {
    $i: list.index($types, $type);

    igx-avatar:nth-of-type(#{$i}) {
        anchor-name: --#{$type};
    }

    igx-badge:nth-of-type(#{$i}) {
        position-anchor: --#{$type};
    }
}
```

#### Icon

The Badge supports Material Icons, Material Icons Extended, and custom icon sets. Register a custom icon with `IgxIconService`, then specify its name and icon set.

```ts
this._iconService.addSvgIconFromText(heartMonitor.name, heartMonitor.value, 'imx-icons');
```

```html
<igx-badge icon="heart-monitor" iconSet="imx-icons"></igx-badge>
```

```typescript
import { Component } from '@angular/core';
import { IgxAvatarComponent } from 'igniteui-angular/avatar';
import { IgxBadgeComponent } from 'igniteui-angular/badge';

@Component({
    selector: 'app-badge-icon',
    styleUrls: ['./badge-icon.component.scss'],
    templateUrl: './badge-icon.component.html',
    imports: [IgxAvatarComponent, IgxBadgeComponent]
})
export class BadgeIconComponent {
    public badges = [
        { icon: 'check', type: 'success', label: 'check' },
        // ...
    ];
}
```

```html
@for (item of badges; track item.label) {
    <igx-badge [icon]="item.icon" [type]="item.type"></igx-badge>
    <span>{{ item.label }}</span>
}

<igx-avatar initials="AZ" shape="circle" size="small"></igx-avatar>
<igx-badge icon="close" type="error" outlined></igx-badge>
<span>on avatar</span>
```

```scss
@use "igniteui-theming/sass/typography" as *;

igx-avatar {
    grid-row: 1;
    anchor-name: --avatar;
}

igx-badge:last-of-type {
    --ig-size: var(--ig-size-small);

    position: absolute;
    position-anchor: --avatar;
    inset-block-start: anchor(14.5%);
    inset-inline-start: anchor(85.5%);
    translate: -50% -50%;
}
```

#### Dot

Set the [`dot`](mcp:get_api_reference?platform=angular&component=IgxBadgeComponent&member=dot) attribute for a minimal notification indicator. Dot badges do not support content, but can be outlined and use types such as `primary`, `success`, or `info`.

```html
<igx-badge dot></igx-badge>
```

```typescript
import { Component } from '@angular/core';
import { IgxAvatarComponent } from 'igniteui-angular/avatar';
import { IgxBadgeComponent } from 'igniteui-angular/badge';
import { IgxIconComponent, IgxIconService} from 'igniteui-angular/icon';
import { facebookMessenger } from '@igniteui/material-icons-extended';

@Component({
    selector: 'app-badge-dot',
    styleUrls: ['./badge-dot.component.scss'],
    templateUrl: './badge-dot.component.html',
    imports: [IgxAvatarComponent, IgxBadgeComponent, IgxIconComponent]
})
export class BadgeDotComponent {
    constructor(private iconService: IgxIconService) {
        this.iconService.addSvgIconFromText('facebookMessenger', facebookMessenger.value);
    }

    public notifications = [
        { title: 'Contract renewal', time: '09:12', unread: true },
        // ...
    ];

    public tabs = [
        { label: 'Home', icon: 'home', active: true, hasUpdates: false },
        // ...
    ];
}
```

```html
<igx-avatar class="icon-anchor" icon="notifications" shape="circle" size="small"></igx-avatar>
<igx-badge dot outlined type="error"></igx-badge>

<div class="notifications-card">
    @for (item of notifications; track item.title) {
        <div class="notification-row">
            <span class="row-indicator">
                @if (item.unread) {
                    <igx-badge dot type="info"></igx-badge>
                }
            </span>
            <span class="row-title">{{ item.title }}</span>
            <span class="row-time" [class.unread]="item.unread">{{ item.time }}</span>
            <igx-icon class="row-chevron">chevron_right</igx-icon>
        </div>
    }
</div>

<div class="nav-card">
    @for (tab of tabs; track tab.label) {
        <div class="nav-item" [class.active]="tab.active">
            <span class="nav-icon">
                <igx-icon [name]="tab.icon"></igx-icon>
                @if (tab.hasUpdates) {
                    <igx-badge dot type="info"></igx-badge>
                }
            </span>
            <span class="nav-label">{{ tab.label }}</span>
        </div>
    }
</div>
```

```scss
@use "sass:list";
@use "igniteui-theming/sass/typography" as *;

igx-badge {
    --ig-size: var(--ig-size-small);

    position: absolute;
    inset-block-start: anchor(14.5%);
    inset-inline-start: anchor(85.5%);
    translate: -50% -50%;
}

$anchors: icon, avatar;

@each $anchor in $anchors {
    $i: list.index($anchors, $anchor);

    .#{$anchor}-anchor {
        anchor-name: --#{$anchor};
    }

    :host > igx-badge:nth-of-type(#{$i}) {
        position-anchor: --#{$anchor};
    }
}
```

### Size

Control Badge size with the `--size` CSS variable. For text badges smaller than `16px`, also adjust the font size and line height.

```scss
igx-badge {
  --size: 12px;

  font-size: calc(var(--size) / 2);
  line-height: normal;
}
```

```typescript
import { Component } from '@angular/core';
import { IgxBadgeComponent } from 'igniteui-angular/badge';

@Component({
    selector: 'app-badge-size',
    templateUrl: './badge-size.component.html',
    styleUrls: ['./badge-size.component.scss'],
    imports: [IgxBadgeComponent]
})
export class BadgeSizeComponent { }
```

```html
<span>Small</span>
<igx-badge dot type="error"></igx-badge>
<igx-badge value="2" type="info"></igx-badge>
<igx-badge icon="check" type="success"></igx-badge>

<span>Medium</span>
<igx-badge dot type="error"></igx-badge>
<!-- ... additional sizes -->
```

```scss
@use "sass:list";
@use "igniteui-theming/sass/typography" as *;

$sizes: small, medium, large;

@each $size in $sizes {
    $i: list.index($sizes, $size);

    igx-badge:nth-of-type(n + #{($i - 1) * 3 + 1}):nth-of-type(-n + #{$i * 3}) {
        --ig-size: var(--ig-size-#{$size});
    }
}
```

### Shape

The Badge shape is `rounded` by default; set the [`shape`](mcp:get_api_reference?platform=angular&component=IgxBadgeComponent&member=shape) attribute to `square` for square corners. For square badges, set a custom border radius with `--border-radius`.

```html
<igx-badge icon="check" type="success" shape="square"></igx-badge>
```

```typescript
import { Component } from '@angular/core';
import { IgxBadgeComponent } from 'igniteui-angular/badge';

@Component({
    selector: 'app-badge-shape',
    templateUrl: './badge-shape.component.html',
    styleUrls: ['./badge-shape.component.scss'],
    imports: [IgxBadgeComponent]
})
export class BadgeShapeComponent { }
```

```html
<span>Rounded</span>
<igx-badge icon="check" type="success" shape="rounded"></igx-badge>
<!-- ... additional rounded and square examples -->
```

```scss
@use "sass:list";
@use "igniteui-theming/sass/typography" as *;

$sizes: small, medium, large;

@each $size in $sizes {
    $i: list.index($sizes, $size);

    igx-badge:nth-of-type(3n + #{$i}) {
        --ig-size: var(--ig-size-#{$size});
    }
}
```

### Variants

The Badge supports Primary, Info, Success, Warn, and Error types. Set the [`type`](mcp:get_api_reference?platform=angular&component=IgxBadgeComponent&member=type) attribute to choose a type.

```html
<igx-badge type="success"></igx-badge>
```

```typescript
import { Component } from '@angular/core';
import { IgxAvatarComponent } from 'igniteui-angular/avatar';
import { IgxBadgeComponent } from 'igniteui-angular/badge';

@Component({
    selector: 'app-badge-variants',
    styleUrls: ['./badge-variants.component.scss'],
    templateUrl: './badge-variants.component.html',
    imports: [IgxAvatarComponent, IgxBadgeComponent]
})
export class BadgeVariantsComponent { }
```

```html
<igx-avatar icon="notifications" shape="circle" size="small"></igx-avatar>
<igx-badge value="2" outlined type="primary"></igx-badge>
<span>Primary</span>

<igx-avatar initials="AZ" shape="circle" size="small"></igx-avatar>
<igx-badge icon="check" outlined type="info"></igx-badge>
<span>Info</span>
<!-- ... Success, Warn, and Error examples -->
```

```scss
@use "sass:list";
@use "igniteui-theming/sass/typography" as *;

$variants: primary, info, success, warning, error;

igx-badge {
    --ig-size: var(--ig-size-small);

    position: absolute;
    inset-block-start: anchor(85.5%);
    inset-inline-start: anchor(85.5%);
    translate: -50% -50%;
}

@each $variant in $variants {
    $i: list.index($variants, $variant);

    igx-avatar:nth-of-type(#{$i}) {
        anchor-name: --#{$variant};
    }

    igx-badge:nth-of-type(#{$i}) {
        position-anchor: --#{$variant};
    }
}
```

### Outlined

Set the [`outlined`](mcp:get_api_reference?platform=angular&component=IgxBadgeComponent&member=outlined) attribute to add a subtle border.

```html
<igx-badge outlined></igx-badge>
```

```typescript
import { Component } from '@angular/core';
import { IgxAvatarComponent } from 'igniteui-angular/avatar';
import { IgxBadgeComponent } from 'igniteui-angular/badge';
import { IGX_STEPPER_DIRECTIVES } from 'igniteui-angular/stepper';

@Component({
  selector: 'app-badge-outlined',
  styleUrls: ['./badge-outlined.component.scss'],
  templateUrl: './badge-outlined.component.html',
  imports: [IgxAvatarComponent, IgxBadgeComponent, IGX_STEPPER_DIRECTIVES]
})

export class BadgeOutlinedComponent {
  public steps = [
    { index: 1, label: 'Orders', completed: true, active: false, flagged: false },
    { index: 2, label: 'Payment', completed: false, active: true, flagged: true },
    // ...
  ];
}
```

```html
<igx-avatar class="icon-anchor" icon="favorite_border" shape="circle" size="small"></igx-avatar>
<igx-badge value="23" type="info" outlined></igx-badge>

<igx-stepper orientation="horizontal" stepType="full" titlePosition="bottom">
    @for (step of steps; track step.label) {
        <igx-step [active]="step.active" [completed]="step.completed">
            <span igxStepIndicator [class.flagged-anchor]="step.flagged">{{ step.index }}</span>
            <span igxStepTitle>{{ step.label }}</span>
        </igx-step>
    }
</igx-stepper>
<igx-badge class="flagged-badge" dot type="info" outlined></igx-badge>
```

```scss
@use "sass:list";
@use "igniteui-theming/sass" as *;

igx-badge {
    --ig-size: var(--ig-size-small);

    position: absolute;
    inset-block-start: anchor(14.5%);
    inset-inline-start: anchor(85.5%);
    translate: -50% -50%;
}

$anchors: icon, initials, flagged;

@each $anchor in $anchors {
    $i: list.index($anchors, $anchor);

    .#{$anchor}-anchor {
        anchor-name: --#{$anchor};
    }

    :host > igx-badge:nth-of-type(#{$i}) {
        position-anchor: --#{$anchor};
    }
}
```

### Do/Don't

**When to use:** Use a Badge for a short status, category, count, or notification state alongside another component. Use `dot` when the indicator needs no visible text.

**When not to use:** Do not use a Badge as an action control, a form validation message, or when its meaning is unclear from its content, context, or accessible label.

<div class="table-responsive">
  <table class="table" style="width: 100%; table-layout: fixed; border-collapse: collapse; border: 1px solid #d3d3d3; margin-bottom: 24px;">
    <thead>
      <tr>
        <th style="width: 50%; background-color: #d3d3d3; text-align: left; padding: 16px 20px; font-size: 18px; font-weight: 500;">Do</th>
        <th style="width: 50%; background-color: #d3d3d3; text-align: left; padding: 16px 20px; font-size: 18px; font-weight: 500;">Don't</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #d3d3d3; padding: 16px 20px;"></td>
        <td style="border: 1px solid #d3d3d3; padding: 16px 20px;"></td>
      </tr>
    </tbody>
  </table>
</div>

## Properties

The Angular Badge exposes properties for controlling its content, appearance, and indicator behavior. See the API reference for complete type definitions.

| name | type | default | description |
| --- | --- | --- | --- |
| [`dot`](mcp:get_api_reference?platform=angular&component=IgxBadgeComponent&member=dot) | boolean | `false` | Renders the Badge as a dot indicator without content. |
| [`outlined`](mcp:get_api_reference?platform=angular&component=IgxBadgeComponent&member=outlined) | boolean | `false` | Displays an outline around the Badge. |
| [`shape`](mcp:get_api_reference?platform=angular&component=IgxBadgeComponent&member=shape) | BadgeShape | `rounded` | Sets the Badge shape. |
| [`type`](mcp:get_api_reference?platform=angular&component=IgxBadgeComponent&member=type) | BadgeType | `default` | Sets the Angular Badge stylistic type. |
| [`cssClass`](mcp:get_api_reference?platform=angular&component=IgxBadgeComponent&member=cssClass) | string | — | Applies a custom CSS class. |

## Styling

The Angular Badge uses the [`IgxBadge`](mcp:get_api_reference?platform=angular&component=IgxBadgeComponent) component's `base` CSS part and documented styling variables.

### Sass Theming

Use the Ignite UI for Angular theme system to style the Badge consistently with your application.

### CSS Variables

| variable | what it changes |
| --- | --- |
| `--background-color` | The badge background color. |
| `--border-color` | The badge border color. |
| `--border-radius` | The badge corner radius. |
| `--elevation` | The badge shadow. |
| `--icon-color` | The badge icon color. |
| `--text-color` | The badge text color. |
| `--size` | The badge size. |
| `--dot-size` | The size of the dot-type badge. |

### Style Parts

| part | what it styles |
| --- | --- |
| `base` | The Badge root element. |

```css
igc-badge::part(base) {
  --background-color: var(--ig-error-A100);
  --border-radius: 2px;
}
```

```typescript
import { Component } from '@angular/core';
import { IgxAvatarComponent } from 'igniteui-angular/avatar';
import { IgxBadgeComponent } from 'igniteui-angular/badge';

@Component({
    selector: 'app-badge-styling',
    styleUrls: ['./badge-styling.component.scss'],
    templateUrl: './badge-styling.component.html',
    imports: [IgxAvatarComponent, IgxBadgeComponent]
})
export class BadgeStylingComponent { }
```

```html
<igx-avatar class="avatar-green" icon="person" shape="circle" size="small"></igx-avatar>
<igx-badge class="badge-teal" icon="photo_camera" outlined></igx-badge>

<igx-avatar src="https://dl.infragistics.com/x/img/avatars/avatar-profile-04.png" shape="circle" size="small"></igx-avatar>
<igx-badge class="badge-amber" icon="star_border" outlined></igx-badge>
<!-- ... additional styled badges -->
```

```scss
@use "sass:list";
@use "sass:map";
@use "igniteui-theming/sass/typography" as *;

.avatar-green {
    --ig-avatar-background: var(--ig-success-200);
    --ig-avatar-icon-color: var(--ig-success-700);
}

$badges: (
    teal: var(--ig-success-700),
    amber: #c97c00,
    // ...
);

@each $name, $color in $badges {
    $i: list.index(map.keys($badges), $name);

    igx-avatar:nth-of-type(#{$i}) {
        anchor-name: --#{$name};
    }

    .badge-#{$name} {
        --ig-badge-background-color: #{$color};

        position-anchor: --#{$name};
    }
}
```

### Styling with Tailwind

Set up [Tailwind](/themes/tailwind) first. Include its import and the Ignite UI utility file in your global stylesheet.

```scss
@import "tailwindcss";
@use 'igniteui-theming/tailwind/utilities/material.css';
```

Use `light-badge` and `dark-badge` for theme variants, and arbitrary properties to override CSS variables. The `!` prefix gives the utility class precedence over the component theme.

```html
<igx-badge
  class="!light-badge ![--background:#FF4E00] ![--border-radius:4px]">
</igx-badge>
```

```typescript
import { Component } from '@angular/core';
import { IgxAvatarComponent } from 'igniteui-angular/avatar';
import { IgxBadgeComponent } from 'igniteui-angular/badge';

@Component({
    selector: 'app-badge-tailwind-styling',
    styleUrls: ['./badge-tailwind-styling.component.scss'],
    templateUrl: './badge-tailwind-styling.component.html',
    imports: [IgxAvatarComponent, IgxBadgeComponent]
})
export class BadgeTailwindStylingComponent { }
```

```html
<igx-avatar initials="AZ" shape="rounded" size="small"></igx-avatar>
<igx-badge icon="close" outlined class="[--ig-badge-background-color:var(--ig-error-500)]"></igx-badge>
<!-- ... additional Tailwind examples -->
```

```scss
@use "sass:list";
@use "igniteui-theming/sass/typography" as *;

$anchors: close, volume, remove, check;

@each $anchor in $anchors {
    $i: list.index($anchors, $anchor);

    igx-avatar:nth-of-type(#{$i}) {
        anchor-name: --#{$anchor};
    }

    igx-badge:nth-of-type(#{$i}) {
        position-anchor: --#{$anchor};
    }
}
```

## Accessibility

The Badge is a non-interactive status visual that communicates a short count, state, or notification.

### Keyboard Interaction

The Badge does not receive focus, handle keyboard input, or expose component interaction events.

| Key | Action |
| -- | -- |
| n/a | The Badge is not keyboard interactive. |

### Screen Readers / ARIA

The Badge host uses `role="status"` to expose its content as status information.

- The component initializes with `role="status"` and `aria-label="badge"`.
- Angular derives `aria-roledescription` from the Badge type and its icon or value. Set the `label` input when `badge` is not a meaningful accessible name.
- Add a meaningful `label` for a Badge without text or a `dot` Badge when its status is not otherwise available to assistive technology.

### Accessibility Compliance

See [Accessibility Compliance](../interactivity/accessibility-compliance.md) for Ignite UI for Angular support for Section 508 and WCAG 2.1 guideline areas.

| Criterion | How the component complies |
| -- | -- |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html) | The Badge exposes the semantic `status` role. Angular also exposes an accessible label and a role description based on its type and content. |

Your responsibilities:

- Provide an accessible name that explains the status when the Badge has no meaningful text, especially for `dot` Badges.
- Do not use Badge color as the only indication of status; pair it with text, an icon, or another accessible cue.
- Keep sufficient contrast between the Badge foreground and background when overriding theme styles.

## Troubleshooting

Use these tips for common styling and usage decisions.

### Why does my custom background color not change the Badge?

The selected `variant` takes precedence over the `--background-color` CSS variable. To use a custom background color, avoid setting a variant that applies its own background color.

### Why is my dot Badge not displaying content?

The `dot` property renders the Badge as an indicator without content. Use a regular Badge to display text or other inline content.

### Known Limitations

- A dot Badge is an indicator only and cannot display text or an icon.
- Badge styling and variant/type names differ between Angular and other supported frameworks. Use platform-specific examples and API links rather than copying attributes between frameworks.
- The Badge is a visual status indicator and does not provide keyboard interaction.

## API References

The Angular Badge API reference lists the complete verified API surface for the target platform.

[`IgxBadge`](mcp:get_api_reference?platform=angular&component=IgxBadgeComponent)

## Dependencies

The Angular Badge requires a theme stylesheet for its visual styling. See **Getting Started** for framework-specific setup.

## Additional Resources

- [Ignite UI for Angular **Forums**](https://www.infragistics.com/community/forums/f/ignite-ui-for-angular)
- [Ignite UI for Angular **GitHub**](https://github.com/IgniteUI/igniteui-angular)

## Related Components

The Badge is commonly used with related components such as Avatar.

- [Avatar](../layouts/avatar.md) — combine an Avatar with a Badge to show a status indicator.

## FAQ

**Q: Can a Badge display both an icon and text?**

Yes. Use the Badge's content area for text and supported icon content for the visual indicator. Keep the combination short.

**Q: How do I display a notification dot without content?**

Set the platform-specific `dot` property or attribute. A dot Badge renders without text or other content.

**Q: When should I use a dot Badge instead of a text Badge?**

Use a dot when status is communicated by presence alone. Use text when users need to understand the status, category, or count without relying on color or position.

**Q: Which package should I install for Badge?**

Use `igniteui-angular` for Angular, `igniteui-react` for React, `igniteui-webcomponents` for Web Components, and `IgniteUI.Blazor` for Blazor. Keep related Ignite UI packages on the same release version.
