# apexcharts / apexcharts_validate_config

Called 2026-11-13T17:18:06.714Z

## Arguments

```json
{
  "config": {
    "chart": {
      "type": "heatmap",
      "height": "100%",
      "parentHeightOffset": 0,
      "background": "transparent",
      "foreColor": "#C7D4DE",
      "fontFamily": "\"Roboto\", \"Segoe UI\", Arial, sans-serif",
      "toolbar": {
        "show": false
      },
      "zoom": {
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
    "theme": {
      "mode": "dark"
    },
    "series": [
      {
        "name": "Manila",
        "data": [
          {
            "x": "Thu 4 Feb",
            "y": 1,
            "label": "Open"
          },
          {
            "x": "Fri 5 Feb",
            "y": 1,
            "label": "Open"
          },
          {
            "x": "Sat 6 Feb",
            "y": -1,
            "label": "Not in sources"
          },
          {
            "x": "Sun 7 Feb",
            "y": -1,
            "label": "Not in sources"
          },
          {
            "x": "Mon 8 Feb",
            "y": 0,
            "label": "Closed: Chinese New Year"
          }
        ]
      },
      {
        "name": "New York",
        "data": [
          {
            "x": "Thu 4 Feb",
            "y": 1,
            "label": "Open"
          },
          {
            "x": "Fri 5 Feb",
            "y": 1,
            "label": "Open"
          },
          {
            "x": "Sat 6 Feb",
            "y": 0,
            "label": "Closed: Weekend"
          },
          {
            "x": "Sun 7 Feb",
            "y": 0,
            "label": "Closed: Weekend"
          },
          {
            "x": "Mon 8 Feb",
            "y": 1,
            "label": "Open"
          }
        ]
      },
      {
        "name": "Dhaka",
        "data": [
          {
            "x": "Thu 4 Feb",
            "y": 1,
            "label": "Open"
          },
          {
            "x": "Fri 5 Feb",
            "y": 0,
            "label": "Closed: Weekend"
          },
          {
            "x": "Sat 6 Feb",
            "y": 0,
            "label": "Closed: Weekend"
          },
          {
            "x": "Sun 7 Feb",
            "y": 1,
            "label": "Open"
          },
          {
            "x": "Mon 8 Feb",
            "y": 1,
            "label": "Open"
          }
        ]
      }
    ],
    "plotOptions": {
      "heatmap": {
        "enableShades": false,
        "radius": 4,
        "colorScale": {
          "ranges": [
            {
              "from": -1.5,
              "to": -0.5,
              "color": "#0E2231",
              "name": "Not in sources"
            },
            {
              "from": -0.5,
              "to": 0.5,
              "color": "#1A72A6",
              "name": "Closed"
            },
            {
              "from": 0.5,
              "to": 1.5,
              "color": "#26404F",
              "name": "Open"
            }
          ]
        }
      }
    },
    "dataLabels": {
      "enabled": true,
      "style": {
        "fontSize": "16px",
        "fontWeight": 700,
        "colors": [
          "#FFFFFF"
        ]
      }
    },
    "stroke": {
      "width": 4,
      "colors": [
        "#002033"
      ]
    },
    "legend": {
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
    },
    "grid": {
      "padding": {
        "top": -16,
        "right": 8,
        "bottom": -4,
        "left": 8
      }
    },
    "xaxis": {
      "type": "category",
      "labels": {
        "style": {
          "fontSize": "16px",
          "colors": "#EEF4F8"
        }
      },
      "axisBorder": {
        "show": false
      },
      "axisTicks": {
        "show": false
      }
    },
    "yaxis": {
      "labels": {
        "style": {
          "fontSize": "16px",
          "colors": "#EEF4F8"
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
