# igniteui-theming / get_component_design_tokens

Called 2026-11-01T21:20:18.282Z

## Arguments

```json
{
  "component": "chip"
}
```

## Result

Implement a theme for the `chip` component using the following guidance.

**Theme Function:** `chip-theme()`

**✅ Primary Tokens — USE THESE:**

Use ONLY these tokens when creating the initial theme. The framework auto-derives all other tokens from these.

| Token Name | Type | Description |
|------------|------|-------------|
| `background` | Color | The default (non-outlined) chip background color. |
| `outlined-background` | Color | The outlined chip background color. |
| `selected-background` | Color | The selected chip background color. Auto-derived from background. |
| `selected-outlined-background` | Color | The outlined chip background color. Auto-derived from outlined-background. |

Setting just `$background` will create a complete chip theme with all states properly derived. Chips with a `variant` (primary, info, success, warning, danger) use the variant colors, which override `$background`, `$text-color` and `$border-color`.

**📖 Available Tokens (44) — DO NOT USE unless the user explicitly requests a specific customization:**

`border-radius`, `text-color`, `outlined-text-color`, `border-color`, `disabled-text-color`, `disabled-background`, `disabled-outlined-background`, `disabled-outlined-text-color`, `disabled-border-color`, `ghost-background`, `ghost-text-color`, `ghost-shadow`, `hover-background`, `hover-text-color`, `hover-outlined-background`, `hover-outlined-text-color`, `hover-border-color`, `focus-background`, `focus-text-color`, `focus-outlined-background`, `focus-outlined-text-color`, `focus-border-color`, `focus-shadow-color`, `selected-text-color`, `selected-outlined-text-color`, `selected-border-color`, `hover-selected-background`, `hover-selected-text-color`, `hover-selected-outlined-background`, `hover-selected-outlined-text-color`, `hover-selected-border-color`, `focus-selected-background`, `focus-selected-text-color`, `focus-selected-outlined-background`, `focus-selected-outlined-text-color`, `focus-selected-border-color`, `focus-selected-shadow-color`, `disabled-selected-background`, `disabled-selected-text-color`, `disabled-selected-outlined-text-color`, `disabled-selected-outlined-background`, `disabled-selected-border-color`, `remove-icon-color`, `remove-icon-color-focus`

**Renamed tokens:** pass the token name to the theme function, but when writing CSS custom properties by hand use the emitted variable name:
| Token | CSS variable |
| --- | --- |
| `ghost-shadow` | `--ig-chip-ghost-elevation` |

---
**Next step:** Use `create_component_theme` with ONLY the **primary tokens** above. Do NOT add available tokens unless the user explicitly asks for a specific one.
