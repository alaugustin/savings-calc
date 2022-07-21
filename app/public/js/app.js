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
        form: document.querySelector("form"),
        selectElement: document.getElementById("wash"),
        washTypeHolderDiv: document.getElementById("washTypeHolder"),
        resultsCollection: document.getElementById("resultsCollection"),
        totalTable: document.querySelector(".totalTable"),
        savingsTotal: document.getElementById("savingsTotal"),
        locationOn: "on",
        locationMb: "mb",
        eventTypes: ["change", "blur", "keyup"],
        fuelData: {
          mbGasPriceCad: mbGasPriceUs * exchangeRate,
          onGasPriceCad: onGasPriceUs * exchangeRate,
        },
        washData: {
          name: ["Bronze", "Silver", "Gold"],
        },
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
    },

    hideShowWashType: () => {
      const appConfig = app.config,
        eventTypes = appConfig.eventTypes;

      const toggleWashType = (selectElement, selectValue, washTypeHolderDivIf, washTypeHolderDivElse) => {
        const washTypeDiv = appConfig.washTypeHolderDiv;

        selectElement > selectValue
          ? (washTypeDiv.style.display = washTypeHolderDivIf)
          : (washTypeDiv.style.display = washTypeHolderDivElse);
      };

      toggleWashType(appConfig.selectElement, 1, "block", "none");

      eventTypes.forEach((eventType) => {
        appConfig.selectElement.addEventListener(eventType, (event) => {
          toggleWashType(event.target.value, 0, "block", "none");
        });
      });
    },

    hideShowResults: (resultsCollectionDisplay, mainFormDisplay) => {
      resultsCollection.style.display = resultsCollectionDisplay;
      mainForm.style.display = mainFormDisplay;
    },

    hideFormShowResults: () => {
      app.hideShowResults("block", "none");
    },

    showFormHideResults: () => {
      app.hideShowResults("none", "block");
      app.config.washTypeHolderDiv.style.display = "block";
    },

    calcTblBtmTreatment: () => {
      let totalTable = app.config.totalTable,
        calcBottom = totalTable.children[2],
        sumRow = totalTable.children[3],
        calcBottomClass = ["calcBottom", "mb-1"],
        sumRowClass = ["sumRow", "mb-1"];

        const addClass = (target, className) => {
          target.classList.add(...className);
        };

        addClass(calcBottom, calcBottomClass);
        addClass(sumRow, sumRowClass);
    },

    resultsDisplay: (numberOfTanks, numberOfWash, sundries, locationFlag, taxRate, fullTankPerWeek, fuelDiscount, weeksPerYear, washType) => {
      const appConfig = app.config,
        tanksNUM = Number(numberOfTanks),
        sundriesNUM = Number(sundries),
        bronzeWash = appConfig.washData.name[0],
        silverWash = appConfig.washData.name[1],
        goldWash = appConfig.washData.name[2],
        washData = (washPrice) => {
          userSelectedWashPrice = washPrice;
          washWithTax = (numberOfWash * userSelectedWashPrice) * (1 + taxRate);
          washCostPerYear = washWithTax * weeksPerYear;
          washDiscount = washCostPerYear - (washCostPerYear * (appConfig.purchaseDiscount));
          withDiscount = (washCostPerYear * appConfig.purchaseDiscount),
          washDiscountNUM = Number(withDiscount);
        },
        instorePerWeekWitTax = sundriesNUM * (1 + taxRate),
        instoreCostPerYear = instorePerWeekWitTax * weeksPerYear,
        instoreDiscount = (instoreCostPerYear * appConfig.purchaseDiscount),
        storeDiscountNUM = Number(instoreDiscount),
        gasPriceTreatment = (locationGasPrice) => {
          const calcFuel = (fuelMultiplier) => {
            return (fullTankPerWeek * tanksNUM * fuelMultiplier) * weeksPerYear
          };

          gasPriceNUM = Number(locationGasPrice.toFixed(2));
          fuelCostPerYear = calcFuel(gasPriceNUM);
          fuelDiscountPerYear = calcFuel(fuelDiscount);
          fuelDiscountNUM = fuelDiscountPerYear;
        },
        washDetails = (washPrice, washName) => {
          washData(washPrice);
          selectedWash = washName;
        };

      switch (locationFlag) {
        case "mb":
          gasPriceTreatment(appConfig.fuelData.mbGasPriceCad);
          break;

        default:
          gasPriceTreatment(appConfig.fuelData.onGasPriceCad);
          break;
      }

      switch (washType) {
        case "silver":
          washDetails(washPrice.silver, silverWash);
          break;

        case "gold":
          washDetails(washPrice.gold, goldWash);
          break;

        default:
          washDetails(washPrice.bronze, bronzeWash);
          break;
      }

      const displaySavings = (productHolder, productQty, productName, savingsHolder, savingsAmount, purchaseInfo, saveInfo, productPY) => {
        productHolder.innerHTML = ``;
        productHolder.innerHTML = `
        <p>User purchases <span class="font-weight-bold">${productQty}</span> ${productName} per week ${purchaseInfo} for around <span class="font-weight-bold">$${productPY}</span> per year and saves <span class="font-weight-bold">$${savingsAmount.toFixed(2)}</span> per year after ${saveInfo}</p>
        `;
        savingsHolder.innerHTML = ``;
        savingsHolder.innerHTML = savingsAmount.toFixed(2);
      };

      const tenPercent = app.config.purchaseDiscount * 100,
        gasPurchaseDesc = `tank(s) of gas`,
        washPurchaseDesc = `${selectedWash} car wash(es)`,
        storePurchaseDesc = `in store`,
        gasPurchaseInfo = `at an average price of <span class="font-weight-bold">$${gasPriceNUM}</span> per litre`,
        washPurchaseInfo = `for <span class="font-weight-bold">$${washWithTax.toFixed(2)}</span> after tax`,
        storePurchaseInfo = `after tax`,
        gasSavingsInfo = `fuel discount of <span class="font-weight-bold">$${app.config.fuelDiscount}</span> per litre.`,
        washStoreEnd = `discount of <span class="font-weight-bold">${tenPercent}%</span>.`,
        gasPY = fuelCostPerYear.toFixed(2),
        washPY = washCostPerYear.toFixed(2),
        storePY = instoreCostPerYear.toFixed(2);

      let washSavingsInfo = `car wash `,
        storeSavingsInfo = `in-store `;

      washSavingsInfo = washSavingsInfo + washStoreEnd;
      storeSavingsInfo = storeSavingsInfo + washStoreEnd;

      displaySavings(gasResult, tanksNUM, gasPurchaseDesc, gasSavings, fuelDiscountNUM, gasPurchaseInfo, gasSavingsInfo, gasPY);
      displaySavings(washResult, numberOfWash, washPurchaseDesc, washSavings, washDiscountNUM, washPurchaseInfo, washSavingsInfo, washPY);
      displaySavings(sundriesResult, `$${instorePerWeekWitTax.toFixed(2)}`, storePurchaseDesc, storeSavings, storeDiscountNUM, storePurchaseInfo, storeSavingsInfo, storePY);

      let calcTotalSavings = (fuelDiscountPY, washDiscountPY, storeDiscountPY) => {
        let totalSavings = fuelDiscountPY + washDiscountPY + storeDiscountPY;

        savingsTotal.innerHTML = ``;
        savingsTotal.innerHTML = totalSavings.toFixed(2);
      };

      calcTotalSavings(fuelDiscountNUM, washDiscountNUM, storeDiscountNUM);

      app.calcTblBtmTreatment();
    },

    setTaxData: (location) => {
      const rateAndType = (userTaxRate, userTaxtype) => {
        (taxRate = userTaxRate), (taxType = userTaxtype);
      };

      switch (location) {
        case "mb":
          rateAndType(taxRateMb, taxTypeMb)
          break;

        default:
          rateAndType(taxRateOn, taxTypeOn)
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
      const getLocationTax = (selectedLocationName) => {
        (locationFlag = location),
          (locationName = selectedLocationName.name),
          (taxRate = taxRate);
        app.consolodateRequest(location, taxRate);
      };

      switch (location) {
        case "mb":
          getLocationTax(mbData);
          break;

        default:
          getLocationTax(onData);
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
        appData.numberOfTanks,
        appData.numberOfWash,
        appData.sundries,
        appData.userLocation,
        appData.userLocation === "on"
          ? onData.applicable
          : mbData.applicable,
        appData.fullTankPerWeek,
        appConfig.fuelDiscount,
        appConfig.weeksPerYear,
        appData.washType,
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
