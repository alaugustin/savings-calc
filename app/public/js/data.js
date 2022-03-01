// https://rapidapi.com/collectapi/api/gas-price/
let gasPrice = {
  success: true,
  result: [
    {
      "name": "Alberta",
      "currency": "usd",
      "gasoline": "0.64",
    },
    {
      "name": "British Columbia",
      "currency": "usd",
      "gasoline": "0.93",
    },
    {
      "name": "Manitoba",
      "currency": "usd",
      "gasoline": "0.68",
    },
    {
      "name": "New Brunswick",
      "currency": "usd",
      "gasoline": "0.72",
    },
    {
      "name": "Newfoundland and Labrador",
      "currency": "usd",
      "gasoline": "0.81",
    },
    {
      "name": "Nova Scotia",
      "currency": "usd",
      "gasoline": "0.68",
    },
    {
      "name": "Ontario",
      "currency": "usd",
      "gasoline": "0.76",
    },
    {
      "name": "Prince Edward Island",
      "currency": "usd",
      "gasoline": "0.74",
    },
    {
      "name": "Quebec",
      "currency": "usd",
      "gasoline": "0.79",
    },
    {
      "name": "Saskatchewan",
      "currency": "usd",
      "gasoline": "0.70",
    },
  ],
};

// https://fixer.io/
const USD = "USD";
let currency = {
  "base": USD,
  "date": "2018-02-13",
  "rates": {
    "CAD": 1.260046,
    "CHF": 0.933058,
    "EUR": 0.806942,
    "GBP": 0.719154,
  }
};   