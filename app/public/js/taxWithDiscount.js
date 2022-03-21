const data = [
  {
    name: "Ontario",
    taxRate: 0.13,
    taxType: "HST",
    gas: {
      price: 1.50,
    },
    wash: {
      aaa: "wash on aaa",
      bbb: "wash on bbb",
      ccc: "wash on ccc",
    }
  },
  {
    name: "Manitoba",
    taxRate: 0.12,
    taxType: "GST+PST",
    gas: {
      price: 1.75,
    },
    wash: {
      aaa: "wash mb xxx",
      bbb: "wash mb yyy",
      ccc: "wash mb zzz",
    }
  },
];

const locationOn = "on",
  locationMb = "mb",
  onData = data[0],
  mbData = data[1],
  taxRateOn = onData.taxRate,
  taxRateMb = mbData.taxRate,
  taxTypeOn = onData.taxType,
  taxTypeMb = mbData.taxType,
  gasOn = onData.gas,
  gasMb = mbData.gas,
  washOn = onData.wash,
  washMb = mbData.wash,
  discountAmount = 0.05;

// console.log(gasOn);
// console.log(washOn);
// console.log(gasMb);
// console.log(washMb);

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

  console.log(
    `Total purchase price in ${locationFlag} is $${totalPurchasePrice} ||||| Tax after discount is: $${taxAfterDiscount} at a rate of ${taxRate * 100
    }% ${taxType}`
  );
};
