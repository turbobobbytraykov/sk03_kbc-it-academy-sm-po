# apexcharts / apexcharts_validate_config

Called 2026-11-13T17:16:55.764Z

## Arguments

```json
{
  "config": {
    "chart": {
      "type": "bar",
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
      },
      "stacked": true,
      "sparkline": {
        "enabled": true
      }
    },
    "series": [
      {
        "name": "authorised",
        "data": [
          2
        ]
      },
      {
        "name": "not authorised",
        "data": [
          3
        ]
      }
    ],
    "colors": [
      "#1B7FB8",
      "#C62828"
    ],
    "fill": {
      "type": [
        "solid",
        "pattern"
      ],
      "opacity": 1,
      "pattern": {
        "style": "slantedLines",
        "width": 7,
        "height": 7,
        "strokeWidth": 3
      }
    },
    "stroke": {
      "width": 2,
      "colors": [
        "#FFFFFF"
      ]
    },
    "plotOptions": {
      "bar": {
        "horizontal": true,
        "barHeight": "100%",
        "borderRadius": 4
      }
    },
    "dataLabels": {
      "enabled": true,
      "style": {
        "fontSize": "16.0px",
        "fontWeight": 700,
        "colors": [
          "#FFFFFF"
        ]
      },
      "background": {
        "enabled": true,
        "foreColor": "#003E61",
        "padding": 5,
        "borderRadius": 4,
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
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0
      }
    },
    "legend": {
      "show": false
    },
    "xaxis": {
      "categories": [
        ""
      ],
      "max": 5
    },
    "yaxis": {
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
