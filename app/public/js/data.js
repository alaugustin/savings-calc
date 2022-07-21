// API ENDPOINTS FOR TAX
// https://api.salestaxapi.ca/v2/province/ON
const onTaxDataApi = {
  "start": "2008-01-01 00:00:00",
  "type": "hst",
  "pst": 0.08,
  "hst": 0.13,
  "gst": 0.05,
  "applicable": 0.13,
  "source": "Wikipedia (https:\/\/en.wikipedia.org\/wiki\/Sales_taxes_in_Canada), accessed May 31 2019.",
  "updated_at": "2019-05-31T14:57:21.000000Z",
  "incoming_changes": false
},
mbTaxDataApi = { // https://api.salestaxapi.ca/v2/province/MB
  "start": "2019-07-01 00:00:00",
  "type": "gst,pst",
  "pst": 0.07,
  "hst": 0,
  "gst": 0.05,
  "applicable": 0.12,
  "source": "Wikipedia (https:\/\/en.wikipedia.org\/wiki\/Sales_taxes_in_Canada), accessed May 31 2019.",
  "updated_at": "2019-05-31T14:58:06.000000Z",
  "incoming_changes": false
},
options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'gas-price.p.rapidapi.com',
    'X-RapidAPI-Key': '<enter key here>'
  }
},
gasPriceApi = { // https://rapidapi.com/collectapi/api/gas-price/
  success: true,
    result: [
      {
        "name": "Alberta",
        "currency": "usd",
        "gasoline": "1.79"
      },
      {
        "name": "British Columbia",
        "currency": "usd",
        "gasoline": "2.01"
      },
      {
        "name": "Manitoba",
        "currency": "usd",
        "gasoline": "1.85"
      },
      {
        "name": "New Brunswick",
        "currency": "usd",
        "gasoline": "1.91"
      },
      {
        "name": "Newfoundland and Labrador",
        "currency": "usd",
        "gasoline": "2.02"
      },
      {
        "name": "Nova Scotia",
        "currency": "usd",
        "gasoline": "1.85"
      },
      {
        "name": "Ontario",
        "currency": "usd",
        "gasoline": "1.77"
      },
      {
        "name": "Prince Edward Island",
        "currency": "usd",
        "gasoline": "1.92"
      },
      {
        "name": "Quebec",
        "currency": "usd",
        "gasoline": "1.92"
      },
      {
        "name": "Saskatchewan",
        "currency": "usd",
        "gasoline": "1.88"
      }
    ]
},
USD = "USD",
currencyApi = { // https://fixer.io/
  "base": USD,
  "date": "2018-02-13",
  "rates": {
     "CAD": 1.260046,
     "CHF": 0.933058,
     "EUR": 0.806942,
     "GBP": 0.719154,
  }
},
washPrice = {
  "bronze": 9.99,
  "silver": 11.99,
  "gold": 13.99,
},
cleanData = {
  "fuelDiscount": 0.03,
  "purchaseDiscount": 0.10,
  "fullTankPerWeek": 55,
  "weeksPerYear": 52,
  "taxData": {
    "on": onTaxDataApi,
    "mb": mbTaxDataApi
  },
  "gasData": gasPriceApi,
  "exchangeData": currencyApi,
  "washData": washPrice
};

fetch('https://gas-price.p.rapidapi.com/canada', options)
  .then(response => response.json())
  .then(response => console.log(response.result))
  .catch(err => console.error(err));