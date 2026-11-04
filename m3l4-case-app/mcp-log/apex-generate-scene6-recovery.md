# apexcharts / apexcharts_generate_config

Called 2026-11-01T22:42:55.159Z

## Arguments

```json
{
  "type": "bar",
  "horizontal": true,
  "title": "Sent and recovered",
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
  "categories": [
    "Sri Lanka",
    "Manila"
  ]
}
```

## Result

{
  "chart": {
    "type": "bar",
    "height": 350
  },
  "title": {
    "text": "Sent and recovered"
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
  "plotOptions": {
    "bar": {
      "horizontal": true
    }
  },
  "xaxis": {
    "categories": [
      "Sri Lanka",
      "Manila"
    ]
  }
}
