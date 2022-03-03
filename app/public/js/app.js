const resultsDiv = document.getElementById("results"),
  fuelDiscount = 0.03,
  washDiscount = 0.10,
  sundriesDiscount = 0.10,
  fullTankLitres = 55,
  weeksPerYear = 52;

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
let handleSubmit = (event) => {
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
    sundries: userData.sundries,
    weeksPerYear: weeksPerYear,
    fullTankLitres: fullTankLitres,
    fuelDiscount: fuelDiscount,
    washDiscount: washDiscount,
    sundriesDiscount: sundriesDiscount,
    location: {
      on: {
        taxRate: ontaxDataRate,
        taxType: ontaxDataType,
        GasPriceCad: onGasPriceCad,
        carWash: {
          basic: {
            price: 9.99,
          },
          deluxe: {
            price: 11.99,
          },
          ultimate: {
            price: 13.99,
          },
        },
      },
      mb: {
        taxRate: mbTaxDataRate,
        taxType: mbTaxDataType,
        GasPriceCad: mbGasPriceCad,
        carWash: {
          basic: {
            price: 7.99,
          },
          deluxe: {
            price: 9.99,
          },
          ultimate: {
            price: 11.99,
          },
        },
      },
    },
  };

  hideShowWashType(appData.numberOfWash);

  resultsDisplay(
    appData.userLocation,
    appData.fullTankLitres,
    appData.fuelDiscount,
    appData.weeksPerYear,
    appData.numberOfTanks,
    appData.userLocation === "on"
      ? appData.location.on.GasPriceCad.toFixed(2)
      : appData.location.mb.GasPriceCad.toFixed(2),
    appData.numberOfWash,
    appData.washType,
    appData.sundries,
    appData.userLocation === "on"
      ? appData.location.on.taxRate
      : appData.location.mb.taxRate,
    appData.userLocation === "on"
      ? appData.location.on.taxType
      : appData.location.mb.taxType,
    appData.washDiscount,
    appData.sundriesDiscount
  );  

  console.log(`Exchange rate as of ${appData.exchangeRateDate}`);
}

// -----
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);