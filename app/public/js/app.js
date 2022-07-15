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
        fuelDiscount: cleanData.fuelDiscount,
        fullTankPerWeek: cleanData.fullTankPerWeek,
        weeksPerYear: cleanData.weeksPerYear,
        purchaseDiscount: cleanData.purchaseDiscount,
        gasData: cleanData.gasData,
      };

      // CALL DOM INVOKING FUNCTIONS HERE --------------------
      app.onDomReady();
      app.eventHandlers();
    },

    onDomReady: () => {
      app.hideShowWashType();
      resultsCollection.style.display = "none";
      // console.log(app.config.gasData);
    },

    hideShowWashType: () => {
      const appConfig = app.config,
        eventTypes = ['change', 'blur', 'keyup'];

      appConfig.selectElement > 1
        ? appConfig.washTypeHolderDiv.style.display = "block"
        : appConfig.washTypeHolderDiv.style.display = "none";

      eventTypes.forEach(eventType => {
        appConfig.selectElement.addEventListener(eventType, (event) => {
          event.target.value > 0
            ? appConfig.washTypeHolderDiv.style.display = "block"
            : appConfig.washTypeHolderDiv.style.display = "none";
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

    fuelDiscountPerYear: (fuelCostPerYear, userSelectedNumberOfTanks, userSelectedGasPrice, fuelDiscountPerYear) => {
      const fuel = "fuel";

      gasResult.innerHTML = ``;
      gasResult.innerHTML = `
      <h3>Fuel</h3>
      <p>User buys ${userSelectedNumberOfTanks} tank(s) of gas a week at an average price of $${userSelectedGasPrice}</p>
      <p>The standard fuel discount is $${app.config.fuelDiscount} per litre</p>
      ${app.resultComment(fuelCostPerYear.toFixed(2), fuelDiscountPerYear.toFixed(2), fuel)}
      <hr />`;
    },

    calcFuelDiscount: (numberOfTanks, gasPriceCadFixed) => {
      const appConfig = app.config;

      let fuelCostPerYear = ((appConfig.fullTankPerWeek * numberOfTanks) * gasPriceCadFixed) * appConfig.weeksPerYear,
        fuelDiscountPerYear = ((appConfig.fullTankPerWeek * numberOfTanks) * appConfig.fuelDiscount) * appConfig.weeksPerYear,
        fuelSavingsPerYear = fuelCostPerYear - fuelDiscountPerYear;

      app.fuelDiscountPerYear(fuelCostPerYear, numberOfTanks, gasPriceCadFixed, fuelDiscountPerYear);
    },

    washDiscountPerYear: (userSelectedWashesPerWeek, washType, washWithTax) => {
      const carWash = "car washes";

      washResult.innerHTML = ``;
      washResult.innerHTML = `
      <h3>Car wash</h3>
      <p>User purchases ${userSelectedWashesPerWeek} ${washType} car wash(es) per week at $${userSelectedWashPrice}</p>
      <p>One week of car washes with tax is: $${washWithTax.toFixed(2)}</p>
      ${app.resultComment(washCostPerYear.toFixed(2), withDiscount.toFixed(2), carWash)}
      <hr />`;
    },

    calcWashDiscount: (numberOfWash, washType) => {
        washData = (washPrice) => {
          userSelectedWashPrice = washPrice
          washWithTax = (numberOfWash * userSelectedWashPrice) * (1 + taxRate);
          washCostPerYear = washWithTax * appConfig.weeksPerYear;
          washDiscount = washCostPerYear - (washCostPerYear * (appConfig.purchaseDiscount));
          withDiscount = (washCostPerYear * appConfig.purchaseDiscount);
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

      app.washDiscountPerYear(numberOfWash, washType, washWithTax); //userSelectedWashesPerWeek, washType, userTaxRate
    },

    instoreDiscountPerYear: (instorePerWeekWitTax, instoreCostPerYear) => {
      const store = "store";

      sundriesResult.innerHTML = ``;
      sundriesResult.innerHTML = `
      <h3>In-store</h3>
      <p>User spends $${instorePerWeekWitTax} in store per week with tax</p>
      ${app.resultComment(instoreCostPerYear.toFixed(2), withDiscount.toFixed(2), store)}
      <hr />`;
    },

    calcInstoreDiscount: (sundries) => {
      const appConfig = app.config;

      const instorePerWeekWitTax = sundries * (1 + taxRate),
        instoreCostPerYear = instorePerWeekWitTax * appConfig.weeksPerYear,
        withDiscount = (instoreCostPerYear * appConfig.purchaseDiscount);

      app.instoreDiscountPerYear(sundries, instoreCostPerYear);
    },

    resultsDisplay: (locationFlag, fullTankPerWeek, fuelDiscount, weeksPerYear, numberOfTanks, gasPriceCadFixed, numberOfWash, washType, sundries, taxRate, taxType) => {

      app.calcFuelDiscount(numberOfTanks, gasPriceCadFixed);
      app.calcWashDiscount(numberOfWash, washType);
      app.calcInstoreDiscount(sundries);
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

      const appConfig = app.config,
        data = new FormData(event.target),
        userData = Object.fromEntries(data.entries()),
        appData = {
        exchangeRate: exchangeRate,
        exchangeRateDate: ratesAsOf,
        userLocation: userData.location,
        numberOfTanks: userData.gas,
        numberOfWash: userData.wash,
        washType: userData.washType,
        sundries: userData.sundries,
        weeksPerYear: appConfig.weeksPerYear,
        fullTankPerWeek: appConfig.fullTankPerWeek,
        purchaseDiscount: appConfig.purchaseDiscount,
      };

      app.hideShowWashType(appData.numberOfWash);
      app.hideFormShowResults();

      app.calculateTax(
        appData.userLocation,
        appData.userLocation === "on"
          ? onData.applicable
          : mbData.applicable
      );

      app.resultsDisplay(
        appData.userLocation,
        appData.fullTankPerWeek,
        appConfig.fuelDiscount,
        appConfig.weeksPerYear,
        appData.numberOfTanks,
        appData.userLocation === "on"
          ? appConfig.gasData.result[6].gasoline
          : appConfig.gasData.result[2].gasoline,
        appData.numberOfWash,
        appData.washType,
        appData.sundries,
        appData.userLocation === "on"
          ? onData.applicable
          : mbData.applicable,
        appData.userLocation === "on"
          ? onData.type
          : mbData.type,
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
