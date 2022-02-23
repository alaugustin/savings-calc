// data from data.js
const resultsDiv = document.getElementById("results");

let onGasPriceUs = gasPrice.result[6].gasoline;
let mbGasPriceUs = gasPrice.result[2].gasoline;
let exchangeRate = currency.rates.CAD;
let ratesAsOf = currency.date;

let onGasPriceCad = onGasPriceUs * exchangeRate;
let mbGasPriceCad = mbGasPriceUs * exchangeRate;

function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const userData = Object.fromEntries(data.entries());

  let appData = {
    exchangeRate: exchangeRate,
    exchangeRateDate: ratesAsOf,
    userLocation: userData.location,
    numberOfTanks: userData.gas,
    numberOfWash: userData.wash,
    washType: userData.washType,
    location: {
      on: {
        GasPriceUs: onGasPriceUs,
        GasPriceCad: onGasPriceCad,
      },
      mb: {
        GasPriceUs: mbGasPriceUs,
        GasPriceCad: mbGasPriceCad,
      },
    },
  };

  // console.log(userData.gas);  
  resultsDiv.innerHTML += `
    Location: ${appData.userLocation} <br>
    Tanks of gas: ${appData.numberOfTanks}<br>
  `;

  if (appData.userLocation === "on") {
    resultsDiv.innerHTML += `
      Ontario gas price: ${appData.location.on.GasPriceCad.toFixed(2)}<br>
      Ontario gas price (total): ${(
        appData.location.on.GasPriceCad * appData.numberOfTanks
      ).toFixed(2)}<br>
    `;
  }

  if (appData.userLocation === "mb") {
    resultsDiv.innerHTML += `
      Manitoba gas price: ${appData.location.mb.GasPriceCad.toFixed(2)} <br>
      Manitoba gas price (total): ${(
        appData.location.mb.GasPriceCad * appData.numberOfTanks
      ).toFixed(2)}<br>
    `;
  }

  resultsDiv.innerHTML += `
    Carwashes: ${appData.numberOfWash} <br>
    Wash type: ${appData.washType}<br>
  `;

  console.log(`Exchange rate as of ${appData.exchangeRateDate}`);
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
