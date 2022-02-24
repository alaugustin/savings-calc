// data from data.js
const resultsDiv = document.getElementById("results"), 
  weeksPerYear = 52, 
  fullTankLitres = 55, 
  fuelSavings = 0.03;

let onGasPriceUs = gasPrice.result[6].gasoline, 
  mbGasPriceUs = gasPrice.result[2].gasoline, 
  exchangeRate = currency.rates.CAD, 
  ratesAsOf = currency.date;

let onGasPriceCad = onGasPriceUs * exchangeRate,
  mbGasPriceCad = mbGasPriceUs * exchangeRate;

function resultsDisplay(
  locationFlag,
  fullTankLitres,
  fuelSavings,
  weeksPerYear,
  numberOfTanks,
  gasPriceCadFixed,
  numberOfWash,
  washType,
  sundries) {
  resultsDiv.innerHTML += `
    <h2>Example of yearly savings	</h2>
    <p>Location: ${locationFlag}</p>
    <p>One Full Tank A Week: ${fullTankLitres} litres</p>
    <p>Fuel Savings: ${fuelSavings} per litre</p>
    <p>Weeks Per Year: ${weeksPerYear}</p>
    <hr>
    <p>How many tanks of gas per week?: ${numberOfTanks}</p>
    <p>${locationFlag} gas price: ${gasPriceCadFixed}</p >
    <p>How many car washes per week do you purchase along with gas?: ${numberOfWash}</p>
    <p>What type of car wash do you purchase?: ${washType}</p>
    <p>How much do you spend in-store per week?: ${sundries}</p>
    <hr>
    <p>Annual Savings: That's $XX.XX a year!</p>
    <p>Approx. total annual spending: $XXX.XX</p>
    <p>Approx. total annual savings: That’s $XXX.XX per year!</p>
  `;
}

function hideShowWashType(washAmount) {
  var washTrigger =
    washAmount > 1 ? document.getElementById("washTypeHolder").style.display = "block" : document.getElementById("washTypeHolder").style.display = "none";

  const selectElement = document.getElementById("wash");

  selectElement.addEventListener('change', (event) => {
    event.target.value > 0
      ? document.getElementById("washTypeHolder").style.display = "block"
      : document.getElementById("washTypeHolder").style.display = "none";
  });
}

hideShowWashType(0)

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
    sundries: userData.sundries,
    weeksPerYear: weeksPerYear,
    fullTankLitres: fullTankLitres,
    fuelSavings: fuelSavings,
    location: {
      on: {
        GasPriceUs: onGasPriceUs,
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
        GasPriceUs: onGasPriceUs,
        GasPriceCad: onGasPriceCad,
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
    appData.fuelSavings,
    appData.weeksPerYear,
    appData.numberOfTanks,
    appData.userLocation === "on"
      ? appData.location.on.GasPriceCad.toFixed(2)
      : appData.location.mb.GasPriceCad.toFixed(2),
    appData.numberOfWash,
    appData.washType,
    appData.sundries
  );

  console.log(
    appData.userLocation === "on"
      ? console.log(appData.location.on.carWash)
      : console.log(appData.location.mb.carWash)
  );
  console.log(`Exchange rate as of ${appData.exchangeRateDate}`);
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
