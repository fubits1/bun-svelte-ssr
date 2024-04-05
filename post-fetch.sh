#!/bin/bash

curl -X POST \
  'https://satori-dev.fubits.dev/ssr.png?title=title&width=630&height=800' \
  --header 'Accept: image/png' \
  --header 'Accept-Encoding: *' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "data": [
    {
      "id": "all",
      "value": 0
    },
    {
      "id": "RU",
      "value": 999999
    },
    {
      "id": "IR",
      "value": 8619
    },
    {
      "id": "US",
      "value": 4321
    },
    {
      "id": "AF",
      "value": 3627
    },
    {
      "id": "IN",
      "value": 2697
    },
    {
      "id": "BD",
      "value": 2213
    },
    {
      "id": "UA",
      "value": 2128
    },
    {
      "id": "DE",
      "value": 1772
    },
    {
      "id": "PK",
      "value": 1647
    },
    {
      "id": "KR",
      "value": 986
    },
    {
      "id": "BR",
      "value": 886
    },
    {
      "id": "FR",
      "value": 845
    },
    {
      "id": "NL",
      "value": 727
    },
    {
      "id": "ET",
      "value": 660
    },
    {
      "id": "GB",
      "value": 657
    },
    {
      "id": "TR",
      "value": 624
    },
    {
      "id": "IQ",
      "value": 604
    },
    {
      "id": "CU",
      "value": 554
    }
  ]
}' --output image.png
