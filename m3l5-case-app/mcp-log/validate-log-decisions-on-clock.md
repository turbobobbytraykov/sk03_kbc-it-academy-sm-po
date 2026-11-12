# apexcharts / apexcharts_validate_config

Called 2026-11-12T00:04:11.895Z

## Arguments

```json
{
  "config": {
    "chart": {
      "type": "scatter",
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
        "name": "Authorised",
        "data": [
          {
            "x": 430,
            "y": 1
          },
          {
            "x": 1290,
            "y": 3
          }
        ]
      },
      {
        "name": "Not authorised",
        "data": [
          {
            "x": 95,
            "y": 0
          },
          {
            "x": 520,
            "y": 1
          },
          {
            "x": 900,
            "y": 2
          }
        ]
      }
    ],
    "colors": [
      "#1B7FB8",
      "#C62828"
    ],
    "markers": {
      "size": 11,
      "shape": [
        "circle",
        "square"
      ],
      "strokeWidth": 2,
      "strokeColors": "#FFFFFF"
    },
    "dataLabels": {
      "enabled": false
    },
    "grid": {
      "show": true,
      "borderColor": "#8EC9EB",
      "xaxis": {
        "lines": {
          "show": false
        }
      },
      "yaxis": {
        "lines": {
          "show": true
        }
      },
      "padding": {
        "top": 22,
        "right": 28,
        "bottom": 6,
        "left": 12
      }
    },
    "legend": {
      "show": true,
      "position": "top",
      "horizontalAlign": "left",
      "fontSize": "18.0px",
      "labels": {
        "colors": "#003E61"
      },
      "onItemClick": {
        "toggleDataSeries": false
      },
      "onItemHover": {
        "highlightDataSeries": false
      }
    },
    "xaxis": {
      "type": "numeric",
      "min": 0,
      "max": 1500,
      "tickAmount": 5,
      "labels": {
        "style": {
          "fontSize": "16.0px",
          "colors": "#516674"
        }
      },
      "axisBorder": {
        "show": true,
        "color": "#8EC9EB"
      },
      "axisTicks": {
        "show": true,
        "color": "#8EC9EB"
      }
    },
    "yaxis": {
      "min": 0,
      "max": 4,
      "tickAmount": 4,
      "reversed": true,
      "labels": {
        "maxWidth": 320,
        "style": {
          "fontSize": "16.0px",
          "colors": "#003E61"
        }
      }
    },
    "annotations": {
      "xaxis": [
        {
          "x": 0,
          "borderColor": "#516674",
          "strokeDashArray": 6,
          "label": {
            "text": "M1 · 02:40",
            "orientation": "horizontal",
            "position": "top",
            "textAnchor": "start",
            "offsetX": 4,
            "offsetY": -24,
            "borderColor": "transparent",
            "style": {
              "fontSize": "16.0px",
              "color": "#516674",
              "background": "transparent"
            }
          }
        },
        {
          "x": 360,
          "borderColor": "#516674",
          "strokeDashArray": 6,
          "label": {
            "text": "M2 · 03:20",
            "orientation": "horizontal",
            "position": "top",
            "textAnchor": "start",
            "offsetX": 4,
            "offsetY": -24,
            "borderColor": "transparent",
            "style": {
              "fontSize": "16.0px",
              "color": "#516674",
              "background": "transparent"
            }
          }
        },
        {
          "x": 780,
          "borderColor": "#516674",
          "strokeDashArray": 6,
          "label": {
            "text": "M3 · 05:15",
            "orientation": "horizontal",
            "position": "top",
            "textAnchor": "start",
            "offsetX": 4,
            "offsetY": -24,
            "borderColor": "transparent",
            "style": {
              "fontSize": "16.0px",
              "color": "#516674",
              "background": "transparent"
            }
          }
        },
        {
          "x": 1200,
          "borderColor": "#516674",
          "strokeDashArray": 6,
          "label": {
            "text": "M4 · 07:50",
            "orientation": "horizontal",
            "position": "top",
            "textAnchor": "start",
            "offsetX": 4,
            "offsetY": -24,
            "borderColor": "transparent",
            "style": {
              "fontSize": "16.0px",
              "color": "#516674",
              "background": "transparent"
            }
          }
        }
      ]
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
