# igniteui-theming / get_component_design_tokens

Called 2026-11-01T21:21:15.677Z

## Arguments

```json
{
  "component": "navbar"
}
```

## Result

Implement a theme for the `navbar` component using the following guidance.

**Theme Function:** `navbar-theme()`

**✅ Primary Tokens — USE THESE:**

Use ONLY these tokens when creating the initial theme. The framework auto-derives all other tokens from these.

| Token Name | Type | Description |
|------------|------|-------------|
| `background` | Color | The navbar background color. PRIMARY - derives text-color and icon colors. |

Setting just `$background` will create a complete navbar theme with proper contrast.

**Compound Component:**
The navbar contains buttons and icons-buttons for navigation.

**Related themes:** `flat-button`, `outlined-button`, `contained-button`, `flat-icon-button`, `outlined-icon-button`, `contained-icon-button`
Scope all related themes under the parent component selector:
- **Angular:** `igx-navbar`
- **Web Components / React / Blazor:** `igc-navbar`

**Token derivations:**
None.

**Guidance:**
Make sure to theme all button and icon-button variants in the navbar to visually coordinate with the navbar background.

**📖 Available Tokens (6) — DO NOT USE unless the user explicitly requests a specific customization:**

`text-color`, `border-color`, `shadow`, `idle-icon-color`, `hover-icon-color`, `disable-shadow`

**Renamed tokens:** pass the token name to the theme function, but when writing CSS custom properties by hand use the emitted variable name:
| Token | CSS variable |
| --- | --- |
| `shadow` | `--ig-navbar-elevation` |

---
**Next step:** Use `create_component_theme` with ONLY the **primary tokens** above. Do NOT add available tokens unless the user explicitly asks for a specific one.
