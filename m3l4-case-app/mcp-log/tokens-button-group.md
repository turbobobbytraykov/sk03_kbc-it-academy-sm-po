# igniteui-theming / get_component_design_tokens

Called 2026-11-01T22:03:53.829Z

## Arguments

```json
{
  "component": "button-group"
}
```

## Result

Implement a theme for the `button-group` component using the following guidance.

**Theme Function:** `button-group-theme()`

**✅ Primary Tokens — USE THESE:**

Use ONLY these tokens when creating the initial theme. The framework auto-derives all other tokens from these.

| Token Name | Type | Description |
|------------|------|-------------|
| `item-background` | Color | The background color for button group items. PRIMARY - derives all state colors. |
| `item-selected-background` | Color | The background color for a selected item in the button group. PRIMARY for selected state. Auto-derived from item-background. |

Derived colors are auto-calculated for contrast.

**📖 Available Tokens (37) — DO NOT USE unless the user explicitly requests a specific customization:**

`shadow`, `item-text-color`, `item-icon-color`, `item-border-color`, `item-hover-text-color`, `item-hover-icon-color`, `item-hover-background`, `item-hover-border-color`, `item-focused-text-color`, `item-focused-background`, `item-focused-border-color`, `item-focused-hover-text-color`, `item-focused-hover-border-color`, `item-focused-hover-background`, `item-active-background`, `item-active-border-color`, `idle-shadow-color`, `selected-shadow-color`, `disabled-text-color`, `disabled-background-color`, `item-disabled-border`, `item-selected-text-color`, `item-selected-icon-color`, `item-selected-border-color`, `item-selected-hover-text-color`, `item-selected-hover-icon-color`, `item-selected-hover-background`, `item-selected-hover-border-color`, `item-selected-focus-background`, `item-selected-focus-hover-background`, `item-selected-active-background`, `item-selected-active-border-color`, `disabled-selected-text-color`, `disabled-selected-icon-color`, `disabled-selected-background`, `disabled-selected-border-color`, `border-radius`

**Renamed tokens:** pass the token name to the theme function, but when writing CSS custom properties by hand use the emitted variable name:
| Token | CSS variable |
| --- | --- |
| `shadow` | `--ig-button-group-elevation` |

---
**Next step:** Use `create_component_theme` with ONLY the **primary tokens** above. Do NOT add available tokens unless the user explicitly asks for a specific one.
