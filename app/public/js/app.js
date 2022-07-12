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
  form = document.querySelector("form"),
  selectElement = document.getElementById("wash"),
  washTypeHolderDiv = document.getElementById("washTypeHolder"),
  resultsCollection = document.getElementById("resultsCollection"),
  gasResult = document.getElementById("gasResult"),
  washResult = document.getElementById("washResult"),
  sundriesResult = document.getElementById("sundriesResult"),
  locationOn = "on",
  locationMb = "mb",
  onData = cleanData.taxData.on,
  mbData = cleanData.taxData.mb,
  taxRateOn = onData.applicable,
  taxRateMb = mbData.applicable,
  taxTypeOn = onData.taxType,
  taxTypeMb = mbData.taxType,
  gasOn = onData.gas,
  gasMb = mbData.gas,
  washOn = onData.wash,
  washMb = mbData.wash,
  discountAmount = 0.05;

let saleItemAmount,
  locationFlag,
  taxRate,
  taxType,
  locationName,
  setUserWashPrice;

const hideShowWashType = () => {
  const eventTypes = ['change', 'blur', 'keyup'];

  selectElement > 1
    ? washTypeHolderDiv.style.display = "block"
    : washTypeHolderDiv.style.display = "none";

  eventTypes.forEach(eventType => {
    selectElement.addEventListener(eventType, (event) => {
      event.target.value > 0
        ? washTypeHolderDiv.style.display = "block"
        : washTypeHolderDiv.style.display = "none";
    });
  });
}

const hideFormShowResults = () => {
  resultsCollection.style.display = "block";
  mainForm.style.display = "none";
}

const showFormHideResults = () => {
  resultsCollection.style.display = "none";
  mainForm.style.display = "block";
  washTypeHolderDiv.style.display = "block";
}

const getUserWashPrice = (selectedWashType) => {
  switch (selectedWashType) {
    case 'basic':
      setUserWashPrice = 9.99;
      break;

    case 'deluxe':
      setUserWashPrice = 11.99;
      break;

    case 'ultimate':
      setUserWashPrice = 13.99;
      break;

    default:
      break;
  }
}

const fuelDiscountPerYear = (userSelectedNumberOfTanks, userSelectedGasPrice) => {
  let fuelCostPerYear = ((cleanData.fullTankPerWeek * userSelectedNumberOfTanks) * userSelectedGasPrice) * cleanData.weeksPerYear,
    fuelDiscountPerYear = ((cleanData.fullTankPerWeek * userSelectedNumberOfTanks) * cleanData.fuelDiscount) * cleanData.weeksPerYear,
    fuelSavingsPerYear = fuelCostPerYear - fuelDiscountPerYear;

  gasResult.innerHTML = ``;
  gasResult.innerHTML = `
    <p>Standard full tank of gas per week: ${cleanData.fullTankPerWeek} litres</p>
    <p>User buys ${userSelectedNumberOfTanks} tank(s) of gas a week</p>
    <p>Average gas price for user is: $${userSelectedGasPrice}</p>
    <p>There are ${cleanData.weeksPerYear} weeks per year</p>
    <p>The standard fuel discount is $${cleanData.fuelDiscount} per litre</p>
    <p>User buys $${fuelCostPerYear.toFixed(2)} in fuel per year</p>
    <p>User saves a total of $${fuelDiscountPerYear.toFixed(2)}</p>
    <p style="background: yellow">Fuel savings $${fuelSavingsPerYear.toFixed(2)} per year after discount</p>
    <hr />
  `;
}

const washDiscountPerYear = (userSelectedWashesPerWeek, washType, userTaxRate) => {
  let washWithTax = (userSelectedWashesPerWeek * washType) * (1 + userTaxRate);
  const washData = (washPrice) => {
    userSelectedWashPrice = washPrice
    washWithTax = (userSelectedWashesPerWeek * userSelectedWashPrice) * (1 + userTaxRate);
    washCostPerYear = washWithTax * cleanData.weeksPerYear;
    washDiscount = washCostPerYear - (washCostPerYear * (cleanData.purchaseDiscount));
  };

  switch (washType) {
    case "silver":
      washData(washPrice.silver);
      break;

    case "gold":
      washData(washPrice.gold);
      break;

    default:
      washData(washPrice.bronze);
      break;
  }

  washResult.innerHTML = ``;
  washResult.innerHTML = `
    <p>User purchases ${userSelectedWashesPerWeek} car washe(s) per week</p>
    <p>User selected wash price is: $${userSelectedWashPrice}</p>
    <p>User's regional tax rate is: ${userTaxRate * 100}%</p>
    <p>One week of car washes with tax is: $${washWithTax.toFixed(2)}</p>
    <p>User buys $${washCostPerYear.toFixed(2)} in washes a year</p>
    <p>User saves a total of $${(washCostPerYear * cleanData.purchaseDiscount).toFixed(2)}</p>
    <p style="background: yellow">After discount user spends a total of $${washDiscount.toFixed(2)} in car washes a year</p>
    <hr />
  `;
}

const instoreDiscountPerYear = (userInstorePerWeek, userTaxRate) => {
  const instorePerWeekWitTax = userInstorePerWeek * (1 + userTaxRate),
    instoreCostPerYear = instorePerWeekWitTax * cleanData.weeksPerYear,
    instoreDiscount = instoreCostPerYear - (instoreCostPerYear * cleanData.purchaseDiscount);

  sundriesResult.innerHTML = ``;
  sundriesResult.innerHTML = `
    <p>User spends $${userInstorePerWeek} in store per week</p>
    <p>User's regional tax rate is: ${userTaxRate * 100}%</p>
    <p>User spends $${instorePerWeekWitTax.toFixed(2)} per week with tax</p>
    <p>User buys $${instoreCostPerYear.toFixed(2)} in store a year</p>
    <p>User saves a total of $${(instoreCostPerYear * cleanData.purchaseDiscount).toFixed(2)}</p>
    <p style="background: yellow">After discount user spends a total of $${instoreDiscount.toFixed(2)} in store a year</p>
    <hr />
  `;
};

const resultsDisplay = (locationFlag, fullTankPerWeek, fuelDiscount, weeksPerYear, numberOfTanks, gasPriceCadFixed, numberOfWash, washType, sundries, taxRate, taxType) => {

  fuelDiscountPerYear(numberOfTanks, gasPriceCadFixed);

  washDiscountPerYear(numberOfWash, washType, taxRate);

  instoreDiscountPerYear(sundries, taxRate);
};

const setTaxData = (location) => {
  switch (location) {
    case "on":
      (taxRate = taxRateOn), (taxType = taxTypeOn);

      break;
    case "mb":
      (taxRate = taxRateMb), (taxType = taxTypeMb);

      break;
    default:
      console.log(`Error`);
      return;
  }
};

const calcTotalPurchasePrice = (taxAmount) => {
  totalPurchasePrice = (
    (saleItemAmount / (1 + discountAmount)) *
    (1 + taxAmount)
  ).toFixed(2);
};

const calcTaxAfterDiscount = (taxAmount) => {
  taxAfterDiscount = (
    (saleItemAmount - saleItemAmount * discountAmount) *
    taxAmount
  ).toFixed(2);
};

const consolodateRequest = (location, taxRate) => {
  setTaxData(location);
  calcTotalPurchasePrice(taxRate);
  calcTaxAfterDiscount(taxRate);
};

const calculateTax = (location, taxRate) => {
  switch (location) {
    case "on":
      (locationFlag = location),
        (locationName = onData.name),
        (taxRate = taxRate);

      consolodateRequest(location, taxRate);

      break;
    case "mb":
      (locationFlag = location),
        (locationName = mbData.name),
        (taxRate = taxRate);

      consolodateRequest(location, taxRate);

      break;
    default:
      console.log(`Error`);
      return;
  }
};

const handleSubmit = (event) => {
  event.preventDefault();

  const data = new FormData(event.target),
    userData = Object.fromEntries(data.entries());

  const appData = {
    exchangeRate: exchangeRate,
    exchangeRateDate: ratesAsOf,
    userLocation: userData.location,
    numberOfTanks: userData.gas,
    numberOfWash: userData.wash,
    washType: userData.washType,
    sundries: userData.sundries,
    weeksPerYear: cleanData.weeksPerYear,
    fullTankPerWeek: cleanData.fullTankPerWeek,
    purchaseDiscount: cleanData.purchaseDiscount,
  };

  hideShowWashType(appData.numberOfWash);
  hideFormShowResults();
  getUserWashPrice(appData.washType);

  calculateTax(
    appData.userLocation,
    appData.userLocation === "on"
      ? cleanData.taxData.on.applicable
      : cleanData.taxData.mb.applicable
  );

  resultsDisplay(
    appData.userLocation,
    appData.fullTankPerWeek,
    cleanData.fuelDiscount,
    cleanData.weeksPerYear,
    appData.numberOfTanks,
    appData.userLocation === "on"
      ? cleanData.gasData.result[6].gasoline
      : cleanData.gasData.result[2].gasoline,
    appData.numberOfWash,
    appData.washType,
    appData.sundries,
    appData.userLocation === "on"
      ? cleanData.taxData.on.applicable
      : cleanData.taxData.mb.applicable,
    appData.userLocation === "on"
      ? cleanData.taxData.on.type
      : cleanData.taxData.mb.type,
    appData.washDiscount,
    appData.sundriesDiscount
  );
}

// ----- hideShowElements.js
hideShowWashType();
resultsCollection.style.display = "none";

// -----
form.addEventListener("submit", handleSubmit);