# apexcharts / apexcharts_validate_config

Called 2026-11-01T23:41:57.459Z

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
        "left": 8,
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
    "markers": {
      "size": 0
    },
    "legend": {
      "show": false
    },
    "xaxis": {
      "type": "datetime",
      "tickAmount": 6,
      "labels": {
        "datetimeUTC": true,
        "format": "HH:mm",
        "style": {
          "fontSize": "16px",
          "colors": "#C7D4DE"
        }
      },
      "axisBorder": {
        "show": true,
        "color": "#3A5466"
      },
      "axisTicks": {
        "show": true,
        "color": "#3A5466"
      }
    },
    "series": [
      {
        "name": "Confirmations printed",
        "data": [
          {
            "x": 1454572800000,
            "y": 0
          },
          {
            "x": 1454576400000,
            "y": 9
          },
          {
            "x": 1454580000000,
            "y": 12
          },
          {
            "x": 1454583600000,
            "y": 11
          },
          {
            "x": 1454587200000,
            "y": 12
          },
          {
            "x": 1454590800000,
            "y": 12
          },
          {
            "x": 1454594400000,
            "y": 12
          },
          {
            "x": 1454598000000,
            "y": 13
          },
          {
            "x": 1454601600000,
            "y": 11
          },
          {
            "x": 1454605200000,
            "y": 0
          },
          {
            "x": 1454608800000,
            "y": 0
          },
          {
            "x": 1454612400000,
            "y": 0
          },
          {
            "x": 1454616000000,
            "y": 0
          },
          {
            "x": 1454619600000,
            "y": 0
          },
          {
            "x": 1454623200000,
            "y": 0
          },
          {
            "x": 1454626800000,
            "y": 0
          }
        ]
      }
    ],
    "colors": [
      "#2A9FD6"
    ],
    "plotOptions": {
      "bar": {
        "columnWidth": "70%",
        "borderRadius": 2
      }
    },
    "yaxis": {
      "min": 0,
      "decimalsInFloat": 0,
      "tickAmount": 3,
      "title": {
        "text": "Printed",
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
