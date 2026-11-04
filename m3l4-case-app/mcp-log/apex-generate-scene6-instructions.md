# apexcharts / apexcharts_generate_config

Called 2026-11-01T22:42:55.614Z

## Arguments

```json
{
  "type": "bar",
  "horizontal": true,
  "stacked": true,
  "title": "The 35 instructions",
  "series": [
    {
      "name": "Stopped in New York",
      "data": [
        850,
        0
      ]
    },
    {
      "name": "To Manila",
      "data": [
        0,
        81
      ]
    },
    {
      "name": "To Sri Lanka",
      "data": [
        0,
        20
      ]
    }
  ],
  "categories": [
    "Stopped (30)",
    "Completed (5)"
  ]
}
```

## Result

{
  "chart": {
    "type": "bar",
    "height": 350,
    "stacked": true
  },
  "title": {
    "text": "The 35 instructions"
  },
  "series": [
    {
      "name": "Stopped in New York",
      "data": [
        850,
        0
      ]
    },
    {
      "name": "To Manila",
      "data": [
        0,
        81
      ]
    },
    {
      "name": "To Sri Lanka",
      "data": [
        0,
        20
      ]
    }
  ],
  "plotOptions": {
    "bar": {
      "horizontal": true
    }
  },
  "xaxis": {
    "categories": [
      "Stopped (30)",
      "Completed (5)"
    ]
  }
}
