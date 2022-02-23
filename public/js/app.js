// data from data.js
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
    onGasPriceUs: onGasPriceUs,
    mbGasPriceUs: mbGasPriceUs,
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

  console.log(`> ------------------------- <}`);
  console.log(`Location: ${appData.userLocation}`);

  console.log(`----------}`);
  console.log(`Tanks of gas: ${appData.numberOfTanks}`);
  console.log(
    `Ontario gas price (total): ${
    }`
  );

  console.log(
    `Manitoba gas price (total): ${
    }`
  );
    console.log(
      `Ontario gas price: ${appData.location.on.GasPriceCad.toFixed(2)}`
    );
        (appData.location.on.GasPriceCad * appData.numberOfTanks).toFixed(2)
    console.log(
      `Manitoba gas price: ${appData.location.mb.GasPriceCad.toFixed(2)}`
    );
        appData.location.mb.GasPriceCad * appData.numberOfTanks).toFixed(2)
  
  console.log(`Exchange rate as of: ${appData.exchangeRateDate}`);

  console.log(`----------}`);
  console.log(`Carwashes: ${appData.numberOfWash}`);
  console.log(`Wash type: ${appData.washType}`);

  console.log(`> ------------------------- <}`);
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
