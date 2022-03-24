const gasResult = document.getElementById("gasResult"),
  washResult = document.getElementById("washResult"),
  sundriesResult = document.getElementById("sundriesResult");

let fuelDiscountPerYear = (userSelectedNumberOfTanks, userSelectedGasPrice) => {
  let fuelCostPerYear = ((cleanData.fullTankPerWeek * userSelectedNumberOfTanks) * userSelectedGasPrice) * cleanData.weeksPerYear;
  let fuelDiscountPerYear = ((cleanData.fullTankPerWeek * userSelectedNumberOfTanks) * cleanData.fuelDiscount) * cleanData.weeksPerYear;
  let fuelSavingsPerYear = fuelCostPerYear - fuelDiscountPerYear;

  gasResult.innerHTML = ``;
  gasResult.innerHTML = `
    <p>Standard full tank of gas per week: ${cleanData.fullTankPerWeek}</p>
    <p>User buys "${userSelectedNumberOfTanks}" tank(s) of gas a week</p>
    <p>User selected gas price is: ${userSelectedGasPrice}</p>
    <p>There are ${cleanData.weeksPerYear} weeks per year</p>
    <p>The standard fuel discount is ${cleanData.fuelDiscount}</p>
    <p>User spends "$${fuelCostPerYear.toFixed(2)}" per year</p>
    <p>Fuel discount per year is ${fuelDiscountPerYear.toFixed(2)}</p>
    <p>Fuel savings per year is ${fuelSavingsPerYear.toFixed(2)}</p>
    <hr />
  `;
}

// 🚨 TODO: CONSTRUCT DATA FOR userSelectedWashPrice
let washDiscountPerYear = (userSelectedWashesPerWeek, userSelectedWashPrice, userTaxRate) => {
  let washWithTax = (userSelectedWashesPerWeek * userSelectedWashPrice) * (1 + userTaxRate);
  let washCostPerYear = washWithTax * cleanData.weeksPerYear;
  let washDiscount = washCostPerYear - (washCostPerYear * (cleanData.purchaseDiscount));

  washResult.innerHTML = ``;
  washResult.innerHTML = `
    <p>User selected washes per week: ${userSelectedWashesPerWeek}</p>
    <p>User selected wash price is: ${userSelectedWashPrice}</p>
    <p>User's regional tax rate is: ${userTaxRate}</p>
    <p>One car wash with tax is: ${washWithTax.toFixed(2)}</p>
    <p>User buys "$${washCostPerYear.toFixed(2)}" in washes a year</p>
    <p>User saves a total of $${washDiscount.toFixed(2)} per year on washes a year</p>
    <hr />
  `;
}

let instoreDiscountPerYear = (userInstorePerWeek, userTaxRate) => {
  let instorePerWeekWitTax = userInstorePerWeek * (1 + userTaxRate);
  let instoreCostPerYear = instorePerWeekWitTax * cleanData.weeksPerYear;
  let instoreDiscount = instoreCostPerYear - (instoreCostPerYear * cleanData.purchaseDiscount);

  sundriesResult.innerHTML = ``;
  sundriesResult.innerHTML = `
    <p>User spends per week: ${userInstorePerWeek}</p>
    <p>User's regional tax rate is: ${userTaxRate}</p>
    <p>User spends "$${instorePerWeekWitTax.toFixed(2)}" per week with tax</p>
    <p>User buys "$${instoreCostPerYear.toFixed(2)}" in store a year</p>
    <p>User saves a total of "$${(instoreCostPerYear * cleanData.purchaseDiscount).toFixed(2)}" in store a year</p>
    <p>After discount user spends a total of "$${instoreDiscount.toFixed(2)}" in store a year</p>
    <hr />
  `;
};

let resultsDisplay = (locationFlag, fullTankPerWeek, fuelDiscount, weeksPerYear, numberOfTanks, gasPriceCadFixed, numberOfWash, washType, sundries, taxRate, taxType) => {

  fuelDiscountPerYear(numberOfTanks, gasPriceCadFixed);

  washDiscountPerYear(numberOfWash, 10.00, taxRate);

  instoreDiscountPerYear(sundries, taxRate);
}