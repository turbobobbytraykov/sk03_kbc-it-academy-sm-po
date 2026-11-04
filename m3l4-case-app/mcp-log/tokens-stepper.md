# igniteui-theming / get_component_design_tokens

Called 2026-11-01T21:20:18.250Z

## Arguments

```json
{
  "component": "stepper"
}
```

## Result

Implement a theme for the `stepper` component using the following guidance.

**Theme Function:** `stepper-theme()`

**✅ Primary Tokens — USE THESE:**

Use ONLY these tokens when creating the initial theme. The framework auto-derives all other tokens from these.

| Token Name | Type | Description |
|------------|------|-------------|
| `step-background` | Color | The background of the step header. PRIMARY - derives all step states. |
| `indicator-background` | Color | The background color of the step indicator. PRIMARY for indicator - derives indicator-color, indicator-outline. Auto-derived from step-background. |
| `invalid-indicator-background` | Color | The background color of the invalid step indicator. PRIMARY for invalid state. |
| `current-indicator-background` | Color | The background color of the current step indicator. PRIMARY for current state. Auto-derived from current-step-background. |
| `complete-indicator-background` | Color | The background color of the completed step indicator. PRIMARY for complete state. Auto-derived from complete-step-background. |

Derived colors are auto-calculated for contrast.

**📖 Available Tokens (55) — DO NOT USE unless the user explicitly requests a specific customization:**

`content-foreground`, `step-hover-background`, `step-focus-background`, `title-color`, `title-hover-color`, `title-focus-color`, `subtitle-color`, `subtitle-hover-color`, `subtitle-focus-color`, `indicator-color`, `indicator-outline`, `invalid-step-background`, `invalid-step-hover-background`, `invalid-step-focus-background`, `invalid-title-color`, `invalid-title-hover-color`, `invalid-title-focus-color`, `invalid-subtitle-color`, `invalid-subtitle-hover-color`, `invalid-subtitle-focus-color`, `invalid-indicator-color`, `invalid-indicator-outline`, `current-step-background`, `current-step-hover-background`, `current-step-focus-background`, `current-title-color`, `current-title-hover-color`, `current-title-focus-color`, `current-subtitle-color`, `current-subtitle-hover-color`, `current-subtitle-focus-color`, `current-indicator-color`, `current-indicator-outline`, `complete-step-background`, `complete-step-hover-background`, `complete-step-focus-background`, `complete-title-color`, `complete-title-hover-color`, `complete-title-focus-color`, `complete-subtitle-color`, `complete-subtitle-hover-color`, `complete-subtitle-focus-color`, `complete-indicator-color`, `complete-indicator-outline`, `disabled-title-color`, `disabled-subtitle-color`, `disabled-indicator-color`, `disabled-indicator-background`, `disabled-indicator-outline`, `step-separator-color`, `complete-step-separator-color`, `step-separator-style`, `complete-step-separator-style`, `border-radius-indicator`, `border-radius-step-header`

---
**Next step:** Use `create_component_theme` with ONLY the **primary tokens** above. Do NOT add available tokens unless the user explicitly asks for a specific one.
