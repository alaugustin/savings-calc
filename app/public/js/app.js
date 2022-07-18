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
        gasSavings: document.getElementById("gasSavings"),
        washSavings: document.getElementById("washSavings"),
        storeSavings: document.getElementById("storeSavings"),
        savingsTotal: document.getElementById("savingsTotal"),
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
      // console.log(app.config.purchaseDiscount);
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

    resultsDisplay: (locationFlag, fullTankPerWeek, fuelDiscount, weeksPerYear, numberOfTanks, gasPriceCadFixed, numberOfWash, washType, sundries, taxRate, taxType) => {

      const appConfig = app.config;

      let gasPriceNUM = Number(gasPriceCadFixed),
        tanksNUM = Number(numberOfTanks),
        fuelCostPerYear = ((appConfig.fullTankPerWeek * numberOfTanks) * gasPriceNUM) * appConfig.weeksPerYear,
        fuelDiscountPerYear = ((appConfig.fullTankPerWeek * tanksNUM) * appConfig.fuelDiscount) * appConfig.weeksPerYear,
        fuelDiscountNUM = Number(fuelDiscountPerYear.toFixed(2));

      const washData = (washPrice) => {
        userSelectedWashPrice = washPrice
        washWithTax = (numberOfWash * userSelectedWashPrice) * (1 + taxRate);
        washCostPerYear = washWithTax * appConfig.weeksPerYear;
        washDiscount = washCostPerYear - (washCostPerYear * (appConfig.purchaseDiscount));
        withDiscount = (washCostPerYear * appConfig.purchaseDiscount),
          washDiscountNUM = Number(withDiscount);
      },
      instorePerWeekWitTax = sundries * (1 + taxRate),
      instoreCostPerYear = instorePerWeekWitTax * appConfig.weeksPerYear,
      instoreDiscount = (instoreCostPerYear * appConfig.purchaseDiscount),
        storeDiscountNUM = Number(instoreDiscount);

      switch (washType) {
        case "silver":
          washData(washPrice.silver);
          selectedWash = "Silver"
          break;

        case "gold":
          washData(washPrice.gold);
          selectedWash = "Gold"
          break;

        default:
          washData(washPrice.bronze);
          selectedWash = "Bronze"
          break;
      }

      // ----------
      gasResult.innerHTML = ``;
      gasResult.innerHTML = `
      <p>User purchases ${tanksNUM} tank(s) of gas a week at an average price of $${gasPriceNUM} per litre</p>
      <p>User spent $${fuelCostPerYear.toFixed(2)} in fuel per year</p>
      <p>User saves $${fuelDiscountPerYear.toFixed(2)} per year after fuel discount of $${app.config.fuelDiscount} per litre</p>
      <hr />`;

      gasSavings.innerHTML = ``;
      gasSavings.innerHTML = fuelDiscountNUM;

      // ----------

      washResult.innerHTML = ``;
      washResult.innerHTML = `
      <p>User purchases ${numberOfWash} ${washType} car wash(es) per week for $${washWithTax.toFixed(2)} after tax.</p>
      <p>User spent $${washCostPerYear.toFixed(2)} in car washes per year</p>
      <p>User saves $${washDiscountNUM.toFixed(2)} per year after discount of $${app.config.purchaseDiscount * 100}% per litre</p>
      <hr />`;

      washSavings.innerHTML = ``;
      washSavings.innerHTML = washDiscountNUM;

      // ----------

      sundriesResult.innerHTML = ``;
      sundriesResult.innerHTML = `
      <p>User purchases $${instorePerWeekWitTax.toFixed(2)} in store per week after tax.</p>
      <p>User saves $${instoreDiscount.toFixed(2)} per year after fuel discount of $${app.config.purchaseDiscount * 100}%</p>
      <hr />`;

      storeSavings.innerHTML = ``;
      storeSavings.innerHTML = storeDiscountNUM.toFixed(2);
      // ----------

      let calcTotalSavings = (fuelDiscountPY, washDiscountPY, storeDiscountPY) => {
        let totalSavings = fuelDiscountPY + washDiscountPY + storeDiscountPY;

        savingsTotal.innerHTML = ``;
        savingsTotal.innerHTML = totalSavings.toFixed(2);
      };

      calcTotalSavings(fuelDiscountNUM, washDiscountNUM, storeDiscountNUM);
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
