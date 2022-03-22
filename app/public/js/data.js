// API ENDPOINTS FOR TAX
// https://api.salestaxapi.ca/v2/province/ON
const onTaxData = {
  "start": "2008-01-01 00:00:00",
  "type": "hst",
  "pst": 0.08,
  "hst": 0.13,
  "gst": 0.05,
  "applicable": 0.13,
  "source": "Wikipedia (https:\/\/en.wikipedia.org\/wiki\/Sales_taxes_in_Canada), accessed May 31 2019.",
  "updated_at": "2019-05-31T14:57:21.000000Z",
  "incoming_changes": false
}

// https://api.salestaxapi.ca/v2/province/MB
const mbTaxData = {
  "start": "2019-07-01 00:00:00",
  "type": "gst,pst",
  "pst": 0.07,
  "hst": 0,
  "gst": 0.05,
  "applicable": 0.12,
  "source": "Wikipedia (https:\/\/en.wikipedia.org\/wiki\/Sales_taxes_in_Canada), accessed May 31 2019.",
  "updated_at": "2019-05-31T14:58:06.000000Z",
  "incoming_changes": false
}
//----------



// https://rapidapi.com/collectapi/api/gas-price/
let gasPrice = {
  success: true,
  result: [
    {
      "name": "Alberta",
      "currency": "usd",
      "gasoline": "1.64",
    },
    {
      "name": "British Columbia",
      "currency": "usd",
      "gasoline": "1.93",
    },
    {
      "name": "Manitoba",
      "currency": "usd",
      "gasoline": "1.68",
    },
    {
      "name": "New Brunswick",
      "currency": "usd",
      "gasoline": "1.72",
    },
    {
      "name": "Newfoundland and Labrador",
      "currency": "usd",
      "gasoline": "1.81",
    },
    {
      "name": "Nova Scotia",
      "currency": "usd",
      "gasoline": "1.68",
    },
    {
      "name": "Ontario",
      "currency": "usd",
      "gasoline": "1.76",
    },
    {
      "name": "Prince Edward Island",
      "currency": "usd",
      "gasoline": "1.74",
    },
    {
      "name": "Quebec",
      "currency": "usd",
      "gasoline": "1.79",
    },
    {
      "name": "Saskatchewan",
      "currency": "usd",
      "gasoline": "1.70",
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
