# igniteui-theming / get_component_design_tokens

Called 2026-11-01T21:21:15.664Z

## Arguments

```json
{
  "component": "card"
}
```

## Result

Implement a theme for the `card` component using the following guidance.

**Theme Function:** `card-theme()`

**✅ Primary Tokens — USE THESE:**

Use ONLY these tokens when creating the initial theme. The framework auto-derives all other tokens from these.

| Token Name | Type | Description |
|------------|------|-------------|
| `background` | Color | The card background color. PRIMARY - derives all text colors. |

Derived colors are auto-calculated for contrast.

**Compound Component:**
The card component can contain various child components like avatars, buttons, chips, and icons.

**Related themes:** `flat-button`, `flat-icon-button`, `chip`, `icon`
Scope all related themes under the parent component selector:
- **Angular:** `igx-card`
- **Web Components / React / Blazor:** `igc-card`

**Token derivations:**
None.

**Guidance:**
The card component can contain flat-button(s), flat-icon-button(s), and icon(s) that should harmonize visually well with the background of the card component.         For the flat-button and flat-icon-button themes, ensure the foreground color contrasts well with the card background.         For the icon theme, the color should also coordinate with the card background while maintaining sufficient contrast.

**📖 Available Tokens (8) — DO NOT USE unless the user explicitly requests a specific customization:**

`outline-color`, `header-text-color`, `subtitle-text-color`, `content-text-color`, `actions-text-color`, `resting-shadow`, `hover-shadow`, `border-radius`

**Renamed tokens:** pass the token name to the theme function, but when writing CSS custom properties by hand use the emitted variable name:
| Token | CSS variable |
| --- | --- |
| `resting-shadow` | `--ig-card-resting-elevation` |
| `hover-shadow` | `--ig-card-hover-elevation` |

---
**Next step:** Use `create_component_theme` with ONLY the **primary tokens** above. Do NOT add available tokens unless the user explicitly asks for a specific one.
