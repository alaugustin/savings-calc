const mainForm = document.getElementById("mainForm"),
  resultsDiv = document.getElementById("results"),
  cleanGasData = cleanData.gasData,
  cleanExchangeData = cleanData.exchangeData,
  cleanTaxData = cleanData.taxData,
  exchangeRate = cleanExchangeData.rates.CAD,
  ratesAsOf = cleanExchangeData.date,
  onGasPriceUs = cleanGasData.result[6].gasoline,
  mbGasPriceUs = cleanGasData.result[2].gasoline,
  ontaxDataRate = cleanTaxData.on.applicable,
  mbTaxDataRate = cleanTaxData.mb.applicable,
  ontaxDataType = cleanTaxData.on.type,
  mbTaxDataType = cleanTaxData.mb.type,
  mbGasPriceCad = mbGasPriceUs * exchangeRate,
  onGasPriceCad = onGasPriceUs * exchangeRate,
  form = document.querySelector("form");

// ----- hideShowElements.js
hideShowWashType();
resultsCollection.style.display = "none";

// -----
form.addEventListener("submit", handleSubmit);