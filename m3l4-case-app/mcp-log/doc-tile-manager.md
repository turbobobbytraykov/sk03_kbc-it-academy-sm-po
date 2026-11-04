# igniteui-cli / get_doc

Called 2026-11-01T21:59:03.634Z

## Arguments

```json
{
  "framework": "webcomponents",
  "name": "tile-manager"
}
```

## Result

---
component: IgcTileManagerComponent, IgcTileComponent, IgcIconComponent, IgcIconButtonComponent
toc_name: Tile Manager
keywords: tile-manager, tiles, layout, drag-and-drop, resizing, grid, serialization, styling
summary: Covers arranging, resizing, reordering, and customizing tiles with the Tile Manager. Learn to configure grid layout, tile actions, and saved layouts.
---

# Web Components Tile Manager Overview

The Tile Manager displays content in individual tiles that users can rearrange and resize to customize their layout.

## Web Components Tile Manager Example

**Warning:** The fullscreen button works only when the example is opened in standalone mode using **Expand to fullscreen**.

```css
igc-tile-manager {
  margin-bottom: 5px;
}

.group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
```

## Usage

[`IgcTileManager`](mcp:get_api_reference?platform=webcomponents&component=IgcTileManagerComponent) manages tile placement and layout. [`IgcTile`](mcp:get_api_reference?platform=webcomponents&component=IgcTileComponent) represents an individual tile. Tiles can have independent sizes and can be reordered by dragging and dropping.

### Getting Started

Install Ignite UI for Web Components:

```cmd
npm install igniteui-webcomponents
```

Import and define the Tile Manager:

```ts
import { defineComponents, IgcTileManagerComponent } from 'igniteui-webcomponents';

defineComponents(IgcTileManagerComponent);
```

Add tiles to the manager:

```html
<igc-tile-manager>
  <igc-tile>
    <p>Tile 1</p>
  </igc-tile>
  <igc-tile>
    <p>Tile 2</p>
  </igc-tile>
  <!-- ... -->
</igc-tile-manager>
```

For an introduction to Ignite UI for Web Components, see [Getting Started](../general-getting-started.md).

## Layout

### Columns and Rows

Set [`ColumnCount`](mcp:get_api_reference?platform=webcomponents&component=IgcTileManagerComponent&member=columnCount) to specify the number of columns. If it is less than one or unset, the manager fits as many columns as possible, each at least 200px wide. Tiles rearrange when the viewport changes.

```html
<igc-tile-manager column-count="2">
  <igc-tile>
    <span slot="title">Tile 1 header</span>
    <p>Tile 1 Content</p>
  </igc-tile>
  <igc-tile>
    <span slot="title">Tile 2 header</span>
    <p>Tile 2 Content</p>
  </igc-tile>
  <!-- ... -->
</igc-tile-manager>
```

### Gap

[`Gap`](mcp:get_api_reference?platform=webcomponents&component=IgcTileManagerComponent&member=gap) sets the horizontal and vertical spacing between tiles. Specify a number followed by a length unit.

```html
<igc-tile-manager gap="20px">
  <igc-tile>
    <span slot="title">Tile 1 header</span>
    <p>Tile 1 Content</p>
  </igc-tile>
  <!-- ... -->
</igc-tile-manager>
```

### Minimum width and height

[`MinColumnWidth`](mcp:get_api_reference?platform=webcomponents&component=IgcTileManagerComponent&member=minColumnWidth) and [`MinRowHeight`](mcp:get_api_reference?platform=webcomponents&component=IgcTileManagerComponent&member=minRowHeight) set minimum column widths and row heights. Values require a number followed by a length unit.

```html
<igc-tile-manager min-column-width="200px" min-row-height="150px">
  <igc-tile>
    <span slot="title">Tile 1 header</span>
    <p>Tile 1 Content</p>
  </igc-tile>
  <!-- ... -->
</igc-tile-manager>
```

### Example

```css
p {
  font-size: 20px;
  padding: 10px;
}

img {
  height: 100%;
  width: 100%;
}
```

## Tile component

Tile properties control its position, size, and actions:

- [`ColSpan`](mcp:get_api_reference?platform=webcomponents&component=IgcTileComponent&member=colSpan) and [`RowSpan`](mcp:get_api_reference?platform=webcomponents&component=IgcTileComponent&member=rowSpan) set the number of columns and rows spanned.
- [`ColStart`](mcp:get_api_reference?platform=webcomponents&component=IgcColumnState&member=colStart) and [`RowStart`](mcp:get_api_reference?platform=webcomponents&component=IgcTileComponent&member=rowStart) set the tile's starting position.
- [`DisableFullscreen`](mcp:get_api_reference?platform=webcomponents&component=IgcTileComponent&member=disableFullscreen) and [`DisableMaximize`](mcp:get_api_reference?platform=webcomponents&component=IgcTileComponent&member=disableMaximize) hide the corresponding default action buttons.
- [`DisableResize`](mcp:get_api_reference?platform=webcomponents&component=IgcTileComponent&member=disableResize) prevents user resizing.

```html
<igc-tile-manager>
  <igc-tile col-span="2" disable-resize>
    <span slot="title">Tile 1 header</span>
    <p>Tile 1 Content</p>
  </igc-tile>
  <igc-tile>
    <span slot="title">Tile 2 header</span>
    <p>Tile 2 Content</p>
  </igc-tile>
  <!-- ... -->
</igc-tile-manager>
```

Tile slots include:

| Slot name | Description |
| ---------|------------ |
| `title` | Tile header content. |
| `fullscreen-action` | Replaces the default fullscreen action. |
| `maximize-action` | Replaces the default maximize action. |
| `actions` | Custom content after the default actions. |
| `side-adorner` | Replaces the horizontal resize adorner. |
| `corner-adorner` | Replaces the diagonal resize adorner. |
| `bottom-adorner` | Replaces the vertical resize adorner. |

Use a `<span>` for the `title` slot to avoid heading elements' built-in styling. For custom action and adorner slots, an [`<igc-icon>`](../layouts/icon.md) or [`<igc-icon-button>`](../inputs/icon-button.md) is recommended.

### Header section actions

The header includes a maximize button, which expands the tile across the manager, and a fullscreen button. Disable either with `DisableMaximize` or `DisableFullscreen`; customize them with the `maximize-action` and `fullscreen-action` slots.

```html
<igc-tile-manager>
  <igc-tile disable-fullscreen>
    <igc-icon-button slot="maximize-actions" name="north_east" collection="material">
    </igc-icon-button>
    <p>Tile 1 Content</p>
  </igc-tile>
</igc-tile-manager>
```

Both default buttons can also be disabled and replaced with custom actions.

```css
igc-tile:nth-child(n + 3):nth-child(-n + 4)::part(actions) {
  padding: 13px 16px;
}
```

This example creates custom actions using the Ignite UI Icon Button component.

## Resizing

Tiles resize using three adorners: side adjusts width, bottom adjusts height, and corner adjusts both. A ghost element previews the dimensions while dragging; if it exceeds the available grid space, it adjusts to the largest possible span. The manager rearranges tiles to minimize empty space without overlap.

[`ResizeMode`](mcp:get_api_reference?platform=webcomponents&component=IgcTileManagerComponent&member=resizeMode) controls adorner visibility: `none` (default), `hover`, or `always`. With the default `none`, tiles cannot be resized.

```html
<igc-tile-manager resize-mode='hover'>
  <igc-tile>
    <p>Tile 1</p>
  </igc-tile>
  <igc-tile>
    <p>Tile 2</p>
  </igc-tile>
</igc-tile-manager>
```

```css
igc-radio-group {
  margin: 0 50px 0 22px;
  width: fit-content;
  padding: 4px 15px;
  border: 2px solid var(--ig-primary-700);
}
```

### Snapping

Tiles resize in whole grid units. The ghost snaps to the next or previous row or column after crossing the halfway point; grid gaps are included.

### Limitations

- Tiles cannot be smaller than [`MinColumnWidth`](mcp:get_api_reference?platform=webcomponents&component=IgcTileManagerComponent&member=minColumnWidth) or [`MinRowHeight`](mcp:get_api_reference?platform=webcomponents&component=IgcTileManagerComponent&member=minRowHeight).
- Tiles cannot exceed the grid's available horizontal space.

## Reorder

Tiles are not draggable by default. Set [`DragMode`](mcp:get_api_reference?platform=webcomponents&component=IgcTileManagerComponent&member=dragMode) to `tile` to drag from anywhere on a tile, or `tile-header` to drag from its header. Maximized and fullscreen tiles cannot be dragged. A ghost previews the layout as tiles move.

```html
<igc-tile-manager drag-mode="tile-header">
  <igc-tile>
    <span slot="title">Tile 1 header</span>
    <p>Tile 1 Content</p>
  </igc-tile>
  <igc-tile>
    <span slot="title">Tile 2 header</span>
    <p>Tile 2 Content</p>
  </igc-tile>
</igc-tile-manager>
```

```css
igc-tile::part(header) {
  border-bottom: 2px solid var(--ig-primary-700);
}

igc-tile::part(dragging) {
  color: yellow;
}
```

## Serialization

[`SaveLayout`](mcp:get_api_reference?platform=webcomponents&component=IgcTileManagerComponent&member=saveLayout) captures tile order, size, and position. [`LoadLayout`](mcp:get_api_reference?platform=webcomponents&component=IgcTileManagerComponent&member=loadLayout) restores a previously saved layout.

```css
.btnWrapper {
  margin: 0 0 8px 22px;
}

igc-button:nth-of-type(-n+3) {
  margin-right: 5px;;
}
```

## Styling

The [`IgcTileManager`](mcp:get_api_reference?platform=webcomponents&component=IgcTileManagerComponent) has a `base` CSS part. [`IgcTile`](mcp:get_api_reference?platform=webcomponents&component=IgcTileComponent) exposes these parts:

| Part name | Description |
| ---------|------------ |
| `base` | Tile wrapper. |
| `header` | Header, including title and actions. |
| `title` | Title container. |
| `actions` | Actions container. |
| `content-container` | Default-slot content container. |
| `trigger-side` | Horizontal resize adorner. |
| `trigger` | Diagonal resize adorner. |
| `trigger-bottom` | Vertical resize adorner. |

```css
igc-tile-manager::part(base) {
  background-color: var(--ig-surface-900);
}

igc-tile::part(content-container) {
  color: var(--ig-secondary-200);
}

igc-tile::part(header) {
  background-color: var(--ig-gray-300);
}
```

Use the `side-adorner`, `corner-adorner`, and `bottom-adorner` slots to customize adorner icons:

```html
<igc-tile>
  <igc-icon slot="side-adorner" class="side" name="indicator"></igc-icon>
  <igc-icon slot="corner-adorner" class="corner" name="indicator"></igc-icon>
  <igc-icon slot="bottom-adorner" class="bottom" name="indicator"></igc-icon>
  <span slot="title">Tile header</span>
</igc-tile>
```

```css
.side,
.corner,
.bottom {
  display: inline;
  width: 100%;
  height: 100%;
}

.corner {
  transform: rotate(220deg);
}
```

## API Reference

- [`IgcTileManager`](mcp:get_api_reference?platform=webcomponents&component=IgcTileManagerComponent)
- [`IgcTile`](mcp:get_api_reference?platform=webcomponents&component=IgcTileComponent)
- [`Styling & Themes`](../themes/overview.md)

## Additional Resources

- [`IgcTile`](mcp:get_api_reference?platform=webcomponents&component=IgcTileComponent)
- [`IgcTileManager`](mcp:get_api_reference?platform=webcomponents&component=IgcTileManagerComponent)
- [`IgcTile`](mcp:get_api_reference?platform=webcomponents&component=IgcTileComponent)
- [Ignite UI for Web Components **Forums**](https://www.infragistics.com/community/forums/f/ignite-ui-for-web-components)
- [Ignite UI for Web Components **GitHub**](https://github.com/IgniteUI/igniteui-webcomponents)
