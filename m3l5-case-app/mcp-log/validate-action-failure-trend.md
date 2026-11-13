# apexcharts / apexcharts_validate_config

Called 2026-11-13T17:16:51.735Z

## Arguments

```json
{
  "config": {
    "chart": {
      "type": "line",
      "height": "100%",
      "parentHeightOffset": 0,
      "background": "transparent",
      "foreColor": "#516674",
      "fontFamily": "\"Roboto\", \"Segoe UI\", Arial, sans-serif",
      "toolbar": {
        "show": false
      },
      "zoom": {
        "enabled": false
      },
      "selection": {
        "enabled": false
      },
      "animations": {
        "enabled": false
      },
      "accessibility": {
        "enabled": true,
        "keyboard": {
          "enabled": false
        }
      }
    },
    "series": [
      {
        "name": "Failing",
        "data": [
          3,
          22,
          40,
          null
        ]
      }
    ],
    "colors": [
      "#FFFFFF"
    ],
    "stroke": {
      "width": 4,
      "curve": "straight"
    },
    "markers": {
      "size": 6,
      "colors": [
        "#FFFFFF"
      ],
      "strokeColors": "#003E61",
      "strokeWidth": 2
    },
    "dataLabels": {
      "enabled": true,
      "offsetY": -8,
      "style": {
        "fontSize": "16.0px",
        "fontWeight": 700,
        "colors": [
          "#003E61"
        ]
      },
      "background": {
        "enabled": true,
        "foreColor": "#FFFFFF",
        "padding": 4,
        "borderRadius": 3,
        "borderWidth": 0,
        "opacity": 1
      },
      "dropShadow": {
        "enabled": false
      }
    },
    "grid": {
      "show": false,
      "padding": {
        "top": 18,
        "right": 22,
        "bottom": 0,
        "left": 22
      }
    },
    "legend": {
      "show": false
    },
    "xaxis": {
      "categories": [
        "02:40",
        "03:20",
        "05:15",
        "07:50"
      ],
      "labels": {
        "style": {
          "fontSize": "16.0px",
          "colors": "#8EC9EB"
        }
      },
      "axisBorder": {
        "show": true,
        "color": "#8EC9EB"
      },
      "axisTicks": {
        "show": false
      }
    },
    "yaxis": {
      "min": 0,
      "max": 50,
      "show": false
    },
    "tooltip": {
      "enabled": false
    },
    "states": {
      "hover": {
        "filter": {
          "type": "none"
        }
      },
      "active": {
        "filter": {
          "type": "none"
        }
      }
    }
  }
}
```

## Result

{
  "ok": true,
  "errors": [],
  "warnings": [],
  "issues": []
}
