# igniteui-theming / get_component_design_tokens

Called 2026-11-01T21:21:15.647Z

## Arguments

```json
{
  "component": "banner"
}
```

## Result

Implement a theme for the `banner` component using the following guidance.

**Theme Function:** `banner-theme()`

**✅ Primary Tokens — USE THESE:**

Use ONLY these tokens when creating the initial theme. The framework auto-derives all other tokens from these.

| Token Name | Type | Description |
|------------|------|-------------|
| `banner-background` | Color | The color used for the banner background. PRIMARY - derives message and illustration colors. |

Derived colors are auto-calculated for contrast.

**Compound Component:**
The banner component uses flat-buttons for the actions

**Related themes:** `flat-button`
Scope all related themes under the parent component selector:
- **Angular:** `igx-banner`
- **Web Components / React / Blazor:** `igc-banner`

**Token derivations:**
None.

**Guidance:**
The banner action buttons should visually coordinate with the banner background. If customizing the banner background, ensure flat-button foreground contrasts against it.

**📖 Available Tokens (4) — DO NOT USE unless the user explicitly requests a specific customization:**

`banner-message-color`, `banner-border-color`, `banner-illustration-color`, `border-radius`

---
**Next step:** Use `create_component_theme` with ONLY the **primary tokens** above. Do NOT add available tokens unless the user explicitly asks for a specific one.
