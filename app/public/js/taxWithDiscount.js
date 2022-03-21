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


const litresPerWeek = 55,
  discountPerLitre = 0.03,
  washesPerWeek = 2,
  discountOnPurchase = 0.1,
  weeksPerYear = 52;

let selectedGasPrice = 1.60,
  washPrice = 9.99,
  instorePurchases = 20;

// ----------
let getLocation = (locationFlag) => {

  switch (locationFlag) {
    case 'on':
      return regionalTaxRate = 0.13;
      break;

    case 'mb':
      return regionalTaxRate = 0.12;
      break;

    default:
      break;
  }
}
getLocation("on");

// ----------
let fuelDiscountPerYear = () => {
  let fuelCostPerYear = (litresPerWeek * selectedGasPrice) * weeksPerYear;
  let fuelDiscountPerYear = (litresPerWeek * discountPerLitre) * weeksPerYear;
  let fuelDiscount = fuelCostPerYear - fuelDiscountPerYear

  console.log(`1️⃣ Fuel cost per year: ${fuelCostPerYear}`);
  console.log(`2️⃣ Fuel yearly discount amount: ${fuelDiscountPerYear}`);
  console.log(`3️⃣ Fuel cost after discount per year: ${fuelDiscount.toFixed(2)}`);
  console.log(`// ----------`);
}
fuelDiscountPerYear();

// ----------
let washDiscountPerYear = () => {
  let washWithTax = (washesPerWeek * washPrice) * (1 + regionalTaxRate);
  let washCostPerYear = washWithTax * weeksPerYear;
  let washDiscount = washCostPerYear - (washCostPerYear * (discountOnPurchase));

  console.log(`1️⃣ Car wash per week with tax: ${washWithTax}`);
  console.log(`2️⃣ Car wash per year: ${Number(washCostPerYear.toFixed(2))}`);
  console.log(`3️⃣ Car wash per year after discount: ${Number(washDiscount.toFixed(2))}`);
  console.log(`// ----------`);
}
washDiscountPerYear();

// ----------
let instoreDiscountPerYear = () => {
  let instorePerWeek = instorePurchases * (1 + regionalTaxRate);
  let instoreCostPerYear = instorePerWeek * weeksPerYear;
  let instoreDiscount = instoreCostPerYear - instoreCostPerYear * discountOnPurchase;

  console.log(`1️⃣ In store cost per week: ${instorePerWeek}`);
  console.log(`2️⃣ In store cost per year: ${Number(instoreCostPerYear.toFixed(2))}`);
  console.log(`3️⃣ In store cost per year after discount: ${Number(instoreDiscount.toFixed(2))}`);
  console.log(`// ----------`);
};
instoreDiscountPerYear();