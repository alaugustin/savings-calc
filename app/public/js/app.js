let saleItemAmount,
  locationFlag,
  taxRate,
  taxType,
  locationName,
  setUserWashPrice;

const cleanGasData = cleanData.gasData,
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
  app = {
    version: "1.0",
    author: "CAASCO Digital Operations",
    project: "",
    Date: "2022",

    // -------------------- INITIALIZATION --------------------
    init: function () {
      let context = this;

      // GLOBAL VARIABLES --------------------
      context.config = {
        mainForm: document.getElementById("mainForm"),
        resultsDiv: document.getElementById("results"),
        mbGasPriceCad: mbGasPriceUs * exchangeRate,
        onGasPriceCad: onGasPriceUs * exchangeRate,
        form: document.querySelector("form"),
        selectElement: document.getElementById("wash"),
        washTypeHolderDiv: document.getElementById("washTypeHolder"),
        resultsCollection: document.getElementById("resultsCollection"),
        gasResult: document.getElementById("gasResult"),
        washResult: document.getElementById("washResult"),
        sundriesResult: document.getElementById("sundriesResult"),
        totalResult: document.getElementById("totalResult"),
        locationOn: "on",
        locationMb: "mb",
        discountAmount: 0.05,
        cleanData: cleanData,
      };

      // CALL DOM INVOKING FUNCTIONS HERE --------------------
      app.onDomReady();
      app.eventHandlers();
    },

    onDomReady: () => {
      app.hideShowWashType();
      resultsCollection.style.display = "none";
      console.log(app.config.cleanData);
    },

    hideShowWashType: () => {
      const eventTypes = ['change', 'blur', 'keyup'];

      app.config.selectElement > 1
        ? app.config.washTypeHolderDiv.style.display = "block"
        : app.config.washTypeHolderDiv.style.display = "none";

      eventTypes.forEach(eventType => {
        app.config.selectElement.addEventListener(eventType, (event) => {
          event.target.value > 0
            ? app.config.washTypeHolderDiv.style.display = "block"
            : app.config.washTypeHolderDiv.style.display = "none";
        });
      });
    },

    hideFormShowResults: () => {
      resultsCollection.style.display = "block";
      mainForm.style.display = "none";
    },

    showFormHideResults: () => {
      resultsCollection.style.display = "none";
      mainForm.style.display = "block";
      app.config.washTypeHolderDiv.style.display = "block";
    },

    resultComment: (costPerYear, discountPY, prodType) => {
      totalResult.innerHTML = ``;
      totalResult.innerHTML = `
      <h3>Total savings</h3>
      `;

      return `
        <p style="background: yellow">User buys $${costPerYear} in ${prodType} per year before discount</p>
        <p style="background: yellow">User saves a total of $${discountPY} per year</p>
      `;
    },

    fuelDiscountPerYear: (userSelectedNumberOfTanks, userSelectedGasPrice) => {
      let fuelCostPerYear = ((cleanData.fullTankPerWeek * userSelectedNumberOfTanks) * userSelectedGasPrice) * cleanData.weeksPerYear,
        fuelDiscountPerYear = ((cleanData.fullTankPerWeek * userSelectedNumberOfTanks) * cleanData.fuelDiscount) * cleanData.weeksPerYear,
        fuelSavingsPerYear = fuelCostPerYear - fuelDiscountPerYear;

      const fuel = "fuel";

      gasResult.innerHTML = ``;
      gasResult.innerHTML = `
      <h3>Fuel</h3>
      <p>User buys ${userSelectedNumberOfTanks} tank(s) of gas a week at an average price of $${userSelectedGasPrice}</p>
      <p>The standard fuel discount is $${cleanData.fuelDiscount} per litre</p>
      ${app.resultComment(fuelCostPerYear.toFixed(2), fuelDiscountPerYear.toFixed(2), fuel)}
      <hr />`;
    },

    washDiscountPerYear: (userSelectedWashesPerWeek, washType, userTaxRate) => {
      let washWithTax = (userSelectedWashesPerWeek * washType) * (1 + userTaxRate);

      const carWash = "car washes",
        washData = (washPrice) => {
          userSelectedWashPrice = washPrice
          washWithTax = (userSelectedWashesPerWeek * userSelectedWashPrice) * (1 + userTaxRate);
          washCostPerYear = washWithTax * cleanData.weeksPerYear;
          washDiscount = washCostPerYear - (washCostPerYear * (cleanData.purchaseDiscount));
          withDiscount = (washCostPerYear * cleanData.purchaseDiscount);
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
      <h3>Car wash</h3>
      <p>User purchases ${userSelectedWashesPerWeek} ${washType} car wash(es) per week at $${userSelectedWashPrice}</p>
      <p>One week of car washes with tax is: $${washWithTax.toFixed(2)}</p>
      ${app.resultComment(washCostPerYear.toFixed(2), withDiscount.toFixed(2), carWash)}
      <hr />`;
    },

    instoreDiscountPerYear: (userInstorePerWeek, userTaxRate) => {
      const store = "store",
        instorePerWeekWitTax = userInstorePerWeek * (1 + userTaxRate),
        instoreCostPerYear = instorePerWeekWitTax * cleanData.weeksPerYear,
        withDiscount = (instoreCostPerYear * cleanData.purchaseDiscount);

      sundriesResult.innerHTML = ``;
      sundriesResult.innerHTML = `
      <h3>In-store</h3>
      <p>User spends $${instorePerWeekWitTax.toFixed(2)} in store per week with tax</p>
      ${app.resultComment(instoreCostPerYear.toFixed(2), withDiscount.toFixed(2), store)}
      <hr />`;
    },

    resultsDisplay: (locationFlag, fullTankPerWeek, fuelDiscount, weeksPerYear, numberOfTanks, gasPriceCadFixed, numberOfWash, washType, sundries, taxRate, taxType) => {

      app.fuelDiscountPerYear(numberOfTanks, gasPriceCadFixed);
      app.washDiscountPerYear(numberOfWash, washType, taxRate);
      app.instoreDiscountPerYear(sundries, taxRate);
    },

    setTaxData: (location) => {
      switch (location) {
        case "mb":
          (taxRate = taxRateMb), (taxType = taxTypeMb);
          break;

        default:
          (taxRate = taxRateOn), (taxType = taxTypeOn);
          return;
      }
    },

    calcTotalPurchasePrice: (taxAmount) => {
      totalPurchasePrice = (
        (saleItemAmount / (1 + app.config.discountAmount)) * (1 + taxAmount)
      ).toFixed(2);
    },

    calcTaxAfterDiscount: (taxAmount) => {
      taxAfterDiscount = (
        (saleItemAmount - saleItemAmount * app.config.discountAmount) * taxAmount
      ).toFixed(2);
    },

    consolodateRequest: (location, taxRate) => {
      app.setTaxData(location);
      app.calcTotalPurchasePrice(taxRate);
      app.calcTaxAfterDiscount(taxRate);
    },

    calculateTax: (location, taxRate) => {
      switch (location) {
        case "mb":
          (locationFlag = location),
          (locationName = mbData.name),
          (taxRate = taxRate);
          app.consolodateRequest(location, taxRate);
          break;

        default:
          (locationFlag = location),
          (locationName = onData.name),
          (taxRate = taxRate);
          app.consolodateRequest(location, taxRate);
          return;
      }
    },

    handleSubmit: (event) => {
      event.preventDefault();

      const data = new FormData(event.target),
        userData = Object.fromEntries(data.entries()),
        appData = {
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

      app.hideShowWashType(appData.numberOfWash);
      app.hideFormShowResults();

      app.calculateTax(
        appData.userLocation,
        appData.userLocation === "on"
          ? cleanData.taxData.on.applicable
          : cleanData.taxData.mb.applicable
      );

      app.resultsDisplay(
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
    },

  // -------------------- HANDLE ALL PAGE LEVEL EVENTS --------------------
  eventHandlers: () => {
    app.config.form.addEventListener("submit", app.handleSubmit);
  },
};

// -------------------- LOAD init() --------------------
window.addEventListener("load", () => {
  app.init();
});
