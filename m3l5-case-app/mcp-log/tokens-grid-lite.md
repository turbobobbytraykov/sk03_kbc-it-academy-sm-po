# igniteui-theming / get_component_design_tokens

Called 2026-11-11T23:35:04.887Z

## Arguments

```json
{
  "component": "grid-lite"
}
```

## Result

Implement a theme for the `grid-lite` component using the following guidance.

**Theme Function:** `grid-theme()`

**✅ Primary Tokens — USE THESE:**

Use ONLY these tokens when creating the initial theme. The framework auto-derives all other tokens from these.

| Token Name | Type | Description |
|------------|------|-------------|
| `background` | Color | The background color of the grid. |
| `foreground` | Color | The foreground color of the grid. |
| `accent-color` | Color | The accent color used for interactive elements in the grid. |

**Compound Component:**
The grid lite component is a compound component some themeable parts including chips and checkboxes.

**Related themes:** `checkbox`, `chip`
Scope all related themes under the parent component selector:
- **Angular:** `igx-grid-lite`
- **Web Components / React / Blazor:** `igc-grid-lite`

**Token derivations:**
None.

**📖 Available Tokens (93) — DO NOT USE unless the user explicitly requests a specific customization:**

`header-background`, `header-text-color`, `header-border-width`, `header-border-style`, `header-border-color`, `header-selected-background`, `header-selected-text-color`, `sorted-header-icon-color`, `sortable-header-icon-hover-color`, `content-background`, `content-text-color`, `ghost-header-text-color`, `ghost-header-icon-color`, `ghost-header-background`, `row-odd-background`, `row-even-background`, `row-odd-text-color`, `row-even-text-color`, `row-selected-background`, `row-selected-hover-background`, `row-selected-text-color`, `row-selected-hover-text-color`, `row-hover-background`, `row-hover-text-color`, `row-border-width`, `row-border-style`, `row-border-color`, `action-border-color`, `pinned-border-width`, `pinned-border-style`, `pinned-border-color`, `cell-active-border-width`, `cell-active-border-color`, `cell-selected-background`, `cell-selected-text-color`, `cell-editing-background`, `cell-editing-foreground`, `cell-editing-focus-foreground`, `cell-edited-value-color`, `cell-new-color`, `cell-disabled-color`, `cell-selected-within-background`, `cell-selected-within-text-color`, `edit-mode-color`, `edited-row-indicator`, `resize-line-color`, `drop-indicator-color`, `grouparea-background`, `grouparea-color`, `group-row-background`, `group-row-selected-background`, `group-label-column-name-text`, `group-label-icon`, `group-label-text`, `expand-all-icon-color`, `expand-all-icon-hover-color`, `expand-icon-color`, `expand-icon-hover-color`, `active-expand-icon-color`, `active-expand-icon-hover-color`, `group-count-background`, `group-count-text-color`, `drop-area-text-color`, `drop-area-icon-color`, `drop-area-background`, `drop-area-on-drop-background`, `filtering-header-background`, `filtering-header-text-color`, `filtering-row-background`, `filtering-row-text-color`, `filtering-dialog-background`, `excel-filtering-header-foreground`, `excel-filtering-subheader-foreground`, `excel-filtering-actions-foreground`, `excel-filtering-actions-hover-foreground`, `excel-filtering-actions-disabled-foreground`, `excel-filtering-border-color`, `tree-filtered-text-color`, `summaries-border-color`, `summaries-patch-background`, `row-highlight`, `grid-shadow`, `drag-shadow`, `row-ghost-background`, `row-drag-color`, `grid-border-color`, `drop-area-border-radius`, `active-state-border-style`, `body-column-border-color-odd`, `body-column-border-color-even`, `body-column-hover-border-color`, `body-column-hover-selected-border-color`, `body-column-selected-border-color`

**Renamed tokens:** pass the token name to the theme function, but when writing CSS custom properties by hand use the emitted variable name:
| Token | CSS variable |
| --- | --- |
| `grid-shadow` | `--ig-grid-grid-elevation` |
| `drag-shadow` | `--ig-grid-drag-elevation` |

---
**Next step:** Use `create_component_theme` with ONLY the **primary tokens** above. Do NOT add available tokens unless the user explicitly asks for a specific one.
