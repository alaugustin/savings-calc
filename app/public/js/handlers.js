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
    fullTankPerWeek: fullTankPerWeek,
    purchaseDiscount: purchaseDiscount,
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

  calculateTax(
    appData.userLocation,
    appData.userLocation === "on"
      ? appData.location.on.taxRate
      : appData.location.mb.taxRate
  );

  resultsDisplay(
    appData.userLocation,
    appData.fullTankPerWeek,
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

  // console.log(`Exchange rate as of ${appData.exchangeRateDate}`);
}