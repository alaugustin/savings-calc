const locationOn = "on",
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

let saleItemAmount = 100,
  locationFlag,
  taxRate,
  taxType,
  locationName;

let setTaxData = (location) => {
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

let calcTotalPurchasePrice = (taxAmount) => {
  totalPurchasePrice = (
    (saleItemAmount / (1 + discountAmount)) *
    (1 + taxAmount)
  ).toFixed(2);
};

let calcTaxAfterDiscount = (taxAmount) => {
  taxAfterDiscount = (
    (saleItemAmount - saleItemAmount * discountAmount) *
    taxAmount
  ).toFixed(2);
};

let consolodateRequest = (location, taxRate) => {
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

  // console.log(
  //   `Total purchase price in ${locationFlag} is $${totalPurchasePrice} ||||| Tax after discount is: $${taxAfterDiscount} at a rate of ${taxRate * 100
  //   }% ${taxType}`
  // );
};
