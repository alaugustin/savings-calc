let savingsCalculator = {
  version: '1.0',
  author: '',
  project: 'Savings Calculator',
  Date: '2022',

  // -------------------- INITIALIZATION --------------------
  init: function () {
    let context = this;

    // GLOBAL VARIABLES --------------------
    context.config = {
      // let
      resultsDiv: document.getElementById("results"),
      fuelDiscount: 0.03,
      washDiscount: 0.10,
      sundriesDiscount: 0.10,
      fullTankLitres: 55,
      weeksPerYear: 52,
      // exchangeRate: exchangeRate,
      // exchangeRateDate: ratesAsOf,
      // userLocation: userData.location,
      // numberOfTanks: userData.gas,
      // numberOfWash: userData.wash,
      // washType: userData.washType,
      // sundries: userData.sundries,
      // weeksPerYear: weeksPerYear,
      // fullTankLitres: fullTankLitres,
      // fuelDiscount: fuelDiscount,
      // washDiscount: washDiscount,
      // sundriesDiscount: sundriesDiscount,
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

    // CALL DOM INVOKING FUNCTIONS HERE --------------------
    savingsCalculator.onDomReady();
    savingsCalculator.eventHandlers();
    console.log(savingsCalculator.config);
  },

  onDomReady: () => {
    console.log("Works");
  },

  // -------------------- HANDLE ALL PAGE LEVEL EVENTS --------------------
  eventHandlers: () => {
    // -----
    const form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);

    // startButton.addEventListener("click", () => {
    //   savingsCalculator.startGame();
    // });
  },
};

// -------------------- LOAD init() --------------------
window.addEventListener("load", () => {
  savingsCalculator.init();
});





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