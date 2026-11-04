# igniteui-theming / get_component_design_tokens

Called 2026-11-01T22:03:53.871Z

## Arguments

```json
{
  "component": "avatar"
}
```

## Result

Implement a theme for the `avatar` component using the following guidance.

**Theme Function:** `avatar-theme()`

**✅ Primary Tokens — USE THESE:**

Use ONLY these tokens when creating the initial theme. The framework auto-derives all other tokens from these.

| Token Name | Type | Description |
|------------|------|-------------|
| `background` | Color | The background color used of the avatar. PRIMARY - derives color, icon-color. |

Derived colors are auto-calculated for contrast.

**📖 Available Tokens (4) — DO NOT USE unless the user explicitly requests a specific customization:**

`color`, `icon-color`, `border-radius`, `size`

---
**Next step:** Use `create_component_theme` with ONLY the **primary tokens** above. Do NOT add available tokens unless the user explicitly asks for a specific one.
