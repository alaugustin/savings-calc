const resultsDiv = document.getElementById("results");

// data from data.js
let exchangeRate = currency.rates.CAD,
  mbGasPriceUs = gasPrice.result[2].gasoline,
  ratesAsOf = currency.date,
  onGasPriceUs = gasPrice.result[6].gasoline,
  ontaxDataRate = onTaxData.applicable,
  mbTaxDataRate = mbTaxData.applicable,
  ontaxDataType = onTaxData.type,
  mbTaxDataType = mbTaxData.type;

let mbGasPriceCad = mbGasPriceUs * exchangeRate,
  onGasPriceCad = onGasPriceUs * exchangeRate;

// ----- hideShowWash.js
hideShowWashType(0)

// -----
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);