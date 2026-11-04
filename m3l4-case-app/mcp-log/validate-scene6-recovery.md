# apexcharts / apexcharts_validate_config

Called 2026-11-01T23:42:02.125Z

## Arguments

```json
{
  "config": {
    "chart": {
      "type": "bar",
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
    "theme": {
      "mode": "dark"
    },
    "grid": {
      "show": false,
      "padding": {
        "right": 24
      }
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
    "dataLabels": {
      "enabled": false
    },
    "legend": {
      "show": true,
      "position": "top",
      "horizontalAlign": "left",
      "fontSize": "18px",
      "labels": {
        "colors": "#EEF4F8"
      },
      "onItemClick": {
        "toggleDataSeries": false
      },
      "onItemHover": {
        "highlightDataSeries": false
      }
    },
    "yaxis": {
      "labels": {
        "style": {
          "fontSize": "16px",
          "colors": "#EEF4F8"
        }
      }
    },
    "series": [
      {
        "name": "Sent",
        "data": [
          20,
          81
        ]
      },
      {
        "name": "Recovered",
        "data": [
          20,
          15
        ]
      }
    ],
    "colors": [
      "#2A9FD6",
      "#D55181"
    ],
    "plotOptions": {
      "bar": {
        "horizontal": true,
        "barHeight": "70%",
        "borderRadius": 2
      }
    },
    "stroke": {
      "width": 2,
      "colors": [
        "#002033"
      ]
    },
    "xaxis": {
      "categories": [
        "Sri Lanka",
        "Manila"
      ],
      "title": {
        "text": "USD million",
        "style": {
          "fontSize": "16px",
          "color": "#C7D4DE"
        }
      },
      "labels": {
        "style": {
          "fontSize": "16px",
          "colors": "#C7D4DE"
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
