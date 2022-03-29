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