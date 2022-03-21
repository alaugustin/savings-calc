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
      console.log("Ontario");
      return regionalTaxRate = 0.13;
      break;

    case 'mb':
      console.log("Manitoba");
      return regionalTaxRate = 0.12;
      break;

    default:
      break;
  }
}
getLocation("mb");

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