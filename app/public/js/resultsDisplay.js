let fuelDiscountPerYear = (userSelectedNumberOfTanks, userSelectedGasPrice) => {
  let fuelCostPerYear = ((cleanData.fullTankPerWeek * userSelectedNumberOfTanks) * userSelectedGasPrice) * cleanData.weeksPerYear;
  let fuelDiscountPerYear = ((cleanData.fullTankPerWeek * userSelectedNumberOfTanks) * cleanData.fuelDiscount) * cleanData.weeksPerYear;
  let fuelSavingsPerYear = fuelCostPerYear - fuelDiscountPerYear;

  console.log(`Fuel Savings: $${cleanData.fuelDiscount} p/L`);
  console.log(`${locationFlag} gas price: ${userSelectedGasPrice}`);
  console.log(`How many tanks of gas per week?: ${userSelectedNumberOfTanks}`);
  console.log(`One Full Tank A Week: ${cleanData.fullTankPerWeek} L`);
  console.log(`1️⃣ Fuel cost per year: ${fuelCostPerYear}`);
  console.log(`2️⃣ Fuel yearly discount amount: ${fuelDiscountPerYear}`);
  console.log(`3️⃣ Fuel cost after discount per year: ${fuelSavingsPerYear.toFixed(2)}`);
  console.log(`// ----------`);
}

let instoreDiscountPerYear = (userInstorePerWeek, userTaxRate) => {
  let instorePerWeek = userInstorePerWeek * (1 + userTaxRate);
  let instoreCostPerYear = instorePerWeek * cleanData.weeksPerYear;
  let instoreDiscount = instoreCostPerYear - (instoreCostPerYear * cleanData.purchaseDiscount);

  console.log(`1️⃣ In store cost per week: ${instorePerWeek}`);
  console.log(`2️⃣ In store cost per year: ${Number(instoreCostPerYear.toFixed(2))}`);
  console.log(`3️⃣ In store cost per year after discount: ${Number(instoreDiscount.toFixed(2))}`);
  console.log(`// ----------`);
};

let resultsDisplay = (locationFlag, fullTankPerWeek, fuelDiscount, weeksPerYear, numberOfTanks, gasPriceCadFixed, numberOfWash, washType, sundries, taxRate, taxType) => {

  fuelDiscountPerYear(numberOfTanks, gasPriceCadFixed);

  instoreDiscountPerYear(sundries, taxRate);

  resultsDiv.innerHTML = ``;
  resultsDiv.innerHTML += `
    <h2>Example of yearly savings	</h2>
    <p>Location: ${locationFlag}</p>
    <p>Tax rate: ${taxRate}${taxType}</p>
    <p>Wash and In-store discont: ${cleanData.purchaseDiscount}</p>
    <hr>
    <p>How many car washes per week do you purchase along with gas?: ${numberOfWash}</p>
    <p>What type of car wash do you purchase?: ${washType}</p>
    <hr>
    <p>Annual Savings: That's $XX.XX a year!</p>
    <p>Approx. total annual spending: $XXX.XX</p>
    <p>Approx. total annual savings: That’s $XXX.XX per year!</p>
  `;
}