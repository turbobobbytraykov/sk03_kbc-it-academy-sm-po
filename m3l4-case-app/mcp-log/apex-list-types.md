# apexcharts / apexcharts_list_types

Called 2026-11-01T22:00:34.937Z

## Arguments

```json
{}
```

## Result

{
  "count": 30,
  "types": [
    {
      "type": "line",
      "name": "Line",
      "description": "Continuous line chart for trends over a category or time axis.",
      "family": "cartesian",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [number | null] }] or [{ name, data: [{ x, y }] }]",
      "referenceFile": "cartesian-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "area",
      "name": "Area",
      "description": "Filled area chart, like line but with the area below the curve shaded.",
      "family": "cartesian",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [number | null] }] or [{ name, data: [{ x, y }] }]",
      "referenceFile": "cartesian-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "bar",
      "name": "Bar",
      "description": "Bar chart. Use plotOptions.bar.horizontal to toggle between vertical (column) and horizontal bars.",
      "family": "bar",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [number] }]",
      "referenceFile": "bar-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "column",
      "name": "Column",
      "description": "A plain synonym for 'bar' on chart.type (since v7.9). The library rewrites it to 'bar' on the way in, so every plotOptions.bar option applies, and it draws vertical bars by default. Releases before 7.9 cannot render chart.type 'column'; series[].type 'column' in a mixed chart has always worked.",
      "family": "bar",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [number] }] + xaxis: { categories: [...] } (same as bar)",
      "referenceFile": "bar-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "scatter",
      "name": "Scatter",
      "description": "Scatter plot of independent x/y data points. Always use the XY object format.",
      "family": "cartesian",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [{ x, y }] }]",
      "referenceFile": "cartesian-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "bubble",
      "name": "Bubble",
      "description": "Scatter plot where bubble size encodes a third dimension (z).",
      "family": "cartesian",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [{ x, y, z }] }] — z is required",
      "referenceFile": "cartesian-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "rangeArea",
      "name": "Range Area",
      "description": "Area chart drawn between a low and high y value at each x (e.g. min/max bands).",
      "family": "cartesian",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [{ x, y: [low, high] }] }]",
      "referenceFile": "cartesian-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "rangeBar",
      "name": "Range Bar / Timeline",
      "description": "Bar chart drawn between a start and end value. Used for timelines and Gantt charts.",
      "family": "bar",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [{ x, y: [start, end] }] }]",
      "referenceFile": "bar-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "funnel",
      "name": "Funnel",
      "description": "First-class funnel chart (new in v6). A bar alias for stage-by-stage drop-off. Order values largest-to-smallest.",
      "family": "bar",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [number] }] + xaxis: { categories: [...] } for stage labels",
      "referenceFile": "bar-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "pyramid",
      "name": "Pyramid",
      "description": "First-class pyramid chart (new in v6). A funnel with the wide base at the bottom. Order values smallest-to-largest.",
      "family": "bar",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [number] }] + xaxis: { categories: [...] } for stage labels",
      "referenceFile": "bar-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "waterfall",
      "name": "Waterfall",
      "description": "Waterfall chart (new in v7.1). The series carries signed DELTAS and the chart accumulates the running total for you; a row flagged isSubtotal or isTotal draws the running total from zero and omits y. Connectors bridge each bar to the next, and rising/falling/total bars take their own colors from plotOptions.waterfall.colors. Renders through the bar engine. Tier 2: not in the default bundle since v8.0. Add `import 'apexcharts/features/waterfall'` next to `import ApexCharts from 'apexcharts'`, load dist/features/waterfall.js with a script tag, or use the full bundle (`import ApexCharts from 'apexcharts/full'`, or apexcharts.full.min.js). Without it, the chart draws nothing and one console warning names the import. The default bundle already has its renderer, so add only the feature; on the lean core, 'apexcharts/waterfall' brings both.",
      "family": "bar",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [{ x, y }] }] where y is the signed delta, NOT a running total. A running-total row is { x, isSubtotal: true } or { x, isTotal: true } with no y.",
      "referenceFile": "bar-charts.md",
      "bundle": {
        "tier": 2,
        "import": "apexcharts/features/waterfall",
        "scripts": [
          "dist/features/waterfall.js"
        ],
        "since": "8.0.0",
        "failure": "draws-empty",
        "note": "The default bundle already has its renderer, so add only the feature; on the lean core, 'apexcharts/waterfall' brings both."
      }
    },
    {
      "type": "dumbbell",
      "name": "Dumbbell",
      "description": "Dumbbell chart (new in v7.1). Compares two or more measures per category, joined by a connector. One series per measure, all sharing the same x categories: do not zip values into [low, high] pairs (that is the older plotOptions.bar.isDumbbell range-bar form). Works horizontal (plotOptions.bar.horizontal) and as columns. Renders through the bar engine. Tier 2: not in the default bundle since v8.0. Add `import 'apexcharts/features/dumbbell'` next to `import ApexCharts from 'apexcharts'`, load dist/features/dumbbell.js with a script tag, or use the full bundle (`import ApexCharts from 'apexcharts/full'`, or apexcharts.full.min.js). Without it, the chart draws nothing and one console warning names the import. The default bundle already has its renderer, so add only the feature; on the lean core, 'apexcharts/dumbbell' brings both.",
      "family": "bar",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [{ x, y }] }, ...]: ONE SERIES PER MEASURE, sharing x categories. Not [low, high] pairs.",
      "referenceFile": "bar-charts.md",
      "bundle": {
        "tier": 2,
        "import": "apexcharts/features/dumbbell",
        "scripts": [
          "dist/features/dumbbell.js"
        ],
        "since": "8.0.0",
        "failure": "draws-empty",
        "note": "The default bundle already has its renderer, so add only the feature; on the lean core, 'apexcharts/dumbbell' brings both."
      }
    },
    {
      "type": "streamgraph",
      "name": "Streamgraph",
      "description": "Streamgraph (new in v7.1). Stacks the series as flowing bands around a baseline chosen for readability. The chart owns its stacking, baseline (plotOptions.streamgraph.offset) and band order (order), so do NOT set chart.stacked. Curves are monotoneCubic by default and each band is labelled inside itself. Renders through the rangeArea engine. Tier 2: not in the default bundle since v8.0. Add `import 'apexcharts/features/streamgraph'` next to `import ApexCharts from 'apexcharts'`, load dist/features/streamgraph.js with a script tag, or use the full bundle (`import ApexCharts from 'apexcharts/full'`, or apexcharts.full.min.js). Without it, the chart draws nothing and one console warning names the import. The default bundle already has its renderer, so add only the feature; on the lean core, 'apexcharts/streamgraph' brings both.",
      "family": "cartesian",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [{ x, y }] }]: same as area. Do not set chart.stacked.",
      "referenceFile": "cartesian-charts.md",
      "bundle": {
        "tier": 2,
        "import": "apexcharts/features/streamgraph",
        "scripts": [
          "dist/features/streamgraph.js"
        ],
        "since": "8.0.0",
        "failure": "draws-empty",
        "note": "The default bundle already has its renderer, so add only the feature; on the lean core, 'apexcharts/streamgraph' brings both."
      }
    },
    {
      "type": "raincloud",
      "name": "Raincloud",
      "description": "Raincloud plot (new in v7.1, premium). Shows a distribution three ways at once: a half-violin for the shape, a box for the summary, and the observations themselves as \"rain\" underneath. A preset over the violin engine, so it is configured through plotOptions.violin (it presets side, box.show, box.whiskers and points.position). Renders an APEXCHARTS watermark without a license. Tier 2: not in the default bundle since v7.1. Add `import 'apexcharts/raincloud'` next to `import ApexCharts from 'apexcharts'`, load dist/violin.js and then dist/features/raincloud.js with script tags, or use the full bundle (`import ApexCharts from 'apexcharts/full'`, or apexcharts.full.min.js). Without it, render() rejects and the console names the import. 'apexcharts/raincloud' brings the violin renderer and the raincloud statistics together; since v8.0 the default bundle has neither, so 'apexcharts/features/raincloud' alone works only where violin is already registered.",
      "family": "financial",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [{ x, points: [number] }] }]: the raw sample per category; density, box and rain are derived.",
      "referenceFile": "financial-charts.md",
      "bundle": {
        "tier": 2,
        "import": "apexcharts/raincloud",
        "scripts": [
          "dist/violin.js",
          "dist/features/raincloud.js"
        ],
        "since": "7.1.0",
        "failure": "throws",
        "note": "'apexcharts/raincloud' brings the violin renderer and the raincloud statistics together; since v8.0 the default bundle has neither, so 'apexcharts/features/raincloud' alone works only where violin is already registered."
      }
    },
    {
      "type": "histogram",
      "name": "Histogram",
      "description": "Histogram (new in v6.9). Series carries raw observations (one number per event); the chart bins and counts them. Binning is configured via plotOptions.histogram (bins rule or count, binWidth, range, normalize, cumulative, overlap). Requires the apexcharts/features/stats module in tree-shaken builds.",
      "family": "financial",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [number] }] — raw observations, not pre-aggregated counts",
      "referenceFile": "financial-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "candlestick",
      "name": "Candlestick",
      "description": "Financial OHLC chart showing open/high/low/close per period.",
      "family": "financial",
      "seriesFormat": "axis",
      "dataFormat": "[{ data: [{ x, y: [open, high, low, close] }] }]",
      "referenceFile": "financial-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "boxPlot",
      "name": "Box Plot",
      "description": "Statistical chart showing min, Q1, median, Q3, and max for each group.",
      "family": "financial",
      "seriesFormat": "axis",
      "dataFormat": "[{ data: [{ x, y: [min, Q1, median, Q3, max] }] }]",
      "referenceFile": "financial-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "violin",
      "name": "Violin",
      "description": "Statistical distribution chart (new in v6). Each category shows a density curve, optionally with the raw sample points as jitter. Tier 2: not in the default bundle since v8.0. Add `import 'apexcharts/violin'` next to `import ApexCharts from 'apexcharts'`, load dist/violin.js with a script tag, or use the full bundle (`import ApexCharts from 'apexcharts/full'`, or apexcharts.full.min.js). Without it, render() rejects and the console names the import. On the lean core (apexcharts/core), add 'apexcharts/bar' too.",
      "family": "financial",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [{ x, y: { density: [[value, weight], ...], points?: [number] } }] }]",
      "referenceFile": "financial-charts.md",
      "bundle": {
        "tier": 2,
        "import": "apexcharts/violin",
        "scripts": [
          "dist/violin.js"
        ],
        "since": "8.0.0",
        "failure": "throws",
        "note": "On the lean core (apexcharts/core), add 'apexcharts/bar' too."
      }
    },
    {
      "type": "heatmap",
      "name": "Heatmap",
      "description": "Grid of colored cells where color intensity encodes a value.",
      "family": "grid",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [{ x, y: number }] }] — y is the intensity",
      "referenceFile": "grid-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "treemap",
      "name": "Treemap",
      "description": "Hierarchical chart of nested rectangles whose area encodes value.",
      "family": "grid",
      "seriesFormat": "axis",
      "dataFormat": "[{ data: [{ x, y: number }] }] — y is the area/value",
      "referenceFile": "grid-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "icicle",
      "name": "Icicle",
      "description": "Hierarchical partition chart (new in v7.6): one band per depth level, each child sized inside its parent's extent. The sunburst's layout in cartesian coordinates, so labels stay horizontal and same-depth siblings line up across branches; plotOptions.icicle.direction 'up' is the flame-graph orientation. Not a premium type. Tier 2: not in the default bundle since v7.6. Add `import 'apexcharts/icicle'` next to `import ApexCharts from 'apexcharts'`, load dist/icicle.js with a script tag, or use the full bundle (`import ApexCharts from 'apexcharts/full'`, or apexcharts.full.min.js). Without it, render() rejects and the console names the import.",
      "family": "grid",
      "seriesFormat": "axis",
      "dataFormat": "[{ data: [{ x, y, children?: [{ x, y, children? }] }] }] — the same nested hierarchy a sunburst takes; a branch may omit y and be the sum of its children",
      "referenceFile": "grid-charts.md",
      "bundle": {
        "tier": 2,
        "import": "apexcharts/icicle",
        "scripts": [
          "dist/icicle.js"
        ],
        "since": "7.6.0",
        "failure": "throws"
      }
    },
    {
      "type": "radar",
      "name": "Radar",
      "description": "Multivariate chart drawn on radial axes, one axis per category.",
      "family": "radar",
      "seriesFormat": "axis",
      "dataFormat": "[{ name, data: [number] }] + xaxis: { categories: [...] }",
      "referenceFile": "radar-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "pie",
      "name": "Pie",
      "description": "Standard pie chart of proportional segments.",
      "family": "circular",
      "seriesFormat": "non-axis",
      "dataFormat": "series: [number, ...] + labels: [string, ...]",
      "referenceFile": "circular-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "donut",
      "name": "Donut",
      "description": "Pie chart with a hollow center, often used to display a total.",
      "family": "circular",
      "seriesFormat": "non-axis",
      "dataFormat": "series: [number, ...] + labels: [string, ...]",
      "referenceFile": "circular-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "polarArea",
      "name": "Polar Area",
      "description": "Radial chart where each segment has equal angle but varying radius.",
      "family": "circular",
      "seriesFormat": "non-axis",
      "dataFormat": "series: [number, ...] + labels: [string, ...]",
      "referenceFile": "circular-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "radialBar",
      "name": "Radial Bar",
      "description": "Circular progress chart with one or more concentric tracks. Values are percentages (0-100) unless plotOptions.radialBar.min/max set another domain.",
      "family": "circular",
      "seriesFormat": "non-axis",
      "dataFormat": "series: [number, ...] (0-100 by default) + labels: [string, ...]",
      "referenceFile": "circular-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "gauge",
      "name": "Gauge",
      "description": "First-class gauge chart (new in v6). A radialBar alias supporting arc/needle shapes, colored bands, ticks, and a custom min/max domain.",
      "family": "circular",
      "seriesFormat": "non-axis",
      "dataFormat": "series: [number] (single value) + labels: [string]; domain set via plotOptions.radialBar.min/max",
      "referenceFile": "circular-charts.md",
      "bundle": {
        "tier": 1
      }
    },
    {
      "type": "sunburst",
      "name": "Sunburst",
      "description": "Hierarchical radial chart (new in v6.7). A nested pie/donut where rings go from the center hole outward, one per hierarchy level, each child arc nested inside its parent wedge. Not a premium type. Tier 2: not in the default bundle since v8.0. Add `import 'apexcharts/sunburst'` next to `import ApexCharts from 'apexcharts'`, load dist/sunburst.js with a script tag, or use the full bundle (`import ApexCharts from 'apexcharts/full'`, or apexcharts.full.min.js). Without it, render() rejects and the console names the import.",
      "family": "circular",
      "seriesFormat": "axis",
      "dataFormat": "[{ data: [{ x, y, children?: [{ x, y, children? }] }] }] — a nested hierarchy; a leaf node carries its value in y, parent y can be omitted",
      "referenceFile": "circular-charts.md",
      "bundle": {
        "tier": 2,
        "import": "apexcharts/sunburst",
        "scripts": [
          "dist/sunburst.js"
        ],
        "since": "8.0.0",
        "failure": "throws"
      }
    },
    {
      "type": "unit",
      "name": "Unit",
      "description": "Unit chart (new in v6.6, premium). One mark per unit of value (dot/pictogram) arranged in layouts such as grouped, packed, columns, grid, or scatter. Renders an APEXCHARTS watermark without a license. Tier 2: not in the default bundle since v8.0. Add `import 'apexcharts/unit'` next to `import ApexCharts from 'apexcharts'`, load dist/unit.js with a script tag, or use the full bundle (`import ApexCharts from 'apexcharts/full'`, or apexcharts.full.min.js). Without it, render() rejects and the console names the import. 'apexcharts/unit' registers the waffle alias too.",
      "family": "unit",
      "seriesFormat": "non-axis",
      "dataFormat": "series: [number, ...] + labels: [string, ...]; layout via plotOptions.unit.layout",
      "referenceFile": "circular-charts.md",
      "bundle": {
        "tier": 2,
        "import": "apexcharts/unit",
        "scripts": [
          "dist/unit.js"
        ],
        "since": "8.0.0",
        "failure": "throws",
        "note": "'apexcharts/unit' registers the waffle alias too."
      }
    },
    {
      "type": "waffle",
      "name": "Waffle",
      "description": "Waffle chart (new in v6.6, premium). A unit-chart alias that presets the grid layout, a part-to-whole square grid of cells. Renders an APEXCHARTS watermark without a license. Tier 2: not in the default bundle since v8.0. Add `import 'apexcharts/unit'` next to `import ApexCharts from 'apexcharts'`, load dist/unit.js with a script tag, or use the full bundle (`import ApexCharts from 'apexcharts/full'`, or apexcharts.full.min.js). Without it, render() rejects and the console names the import. There is no apexcharts/waffle entry: the unit entry registers waffle.",
      "family": "unit",
      "seriesFormat": "non-axis",
      "dataFormat": "series: [number, ...] + labels: [string, ...]",
      "referenceFile": "circular-charts.md",
      "bundle": {
        "tier": 2,
        "import": "apexcharts/unit",
        "scripts": [
          "dist/unit.js"
        ],
        "since": "8.0.0",
        "failure": "throws",
        "note": "There is no apexcharts/waffle entry: the unit entry registers waffle."
      }
    }
  ]
}
