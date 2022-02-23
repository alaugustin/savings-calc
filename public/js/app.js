// data from data.js
let onGasPriceUs = gasPrice.result[6].gasoline;
let mbGasPriceUs = gasPrice.result[2].gasoline;
let exchangeRate = currency.rates.CAD;
let ratesAsOf = currency.date;

let onGasPriceCad = (onGasPriceUs * exchangeRate).toFixed(2);
let mbGasPriceCad = (mbGasPriceUs * exchangeRate).toFixed(2);

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
        onGasPriceUs: onGasPriceUs,
        onGasPriceCad: onGasPriceCad,
      },
      mb: {
        mbGasPriceUs: mbGasPriceUs,
        mbGasPriceCad: mbGasPriceCad,
      },
    },
  };

  // console.log(userData.gas);

  console.log(`> ------------------------- <}`);
  console.log(`Location: ${appData.userLocation}`);

  console.log(`----------}`);
  console.log(`Tanks of gas: ${appData.numberOfTanks}`);
  console.log(`Ontario gas price: ${appData.location.on.onGasPriceCad}`);
  console.log(
    `Ontario gas price (total): ${
      appData.location.on.onGasPriceCad * appData.numberOfTanks
    }`
  );

  console.log(`Manitoba gas price: ${appData.location.mb.mbGasPriceCad}`);
  console.log(
    `Manitoba gas price (total): ${
      appData.location.mb.mbGasPriceCad * appData.numberOfTanks
    }`
  );
  
  console.log(`Exchange rate as of: ${appData.exchangeRateDate}`);

  console.log(`----------}`);
  console.log(`Carwashes: ${appData.numberOfWash}`);
  console.log(`Wash type: ${appData.washType}`);

  console.log(`> ------------------------- <}`);
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
