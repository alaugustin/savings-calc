let fuelDiscountPerYear = (userSelectedNumberOfTanks, userSelectedGasPrice) => {
  let fuelCostPerYear = ((fullTankPerWeek * userSelectedNumberOfTanks) * userSelectedGasPrice) * weeksPerYear;
  let fuelDiscountPerYear = ((fullTankPerWeek * userSelectedNumberOfTanks) * fuelDiscount) * weeksPerYear;
  let fuelSavingsPerYear = fuelCostPerYear - fuelDiscountPerYear;

  console.log(`Fuel Savings: $${fuelDiscount} p/L`);
  console.log(`${locationFlag} gas price: ${userSelectedGasPrice}`);
  console.log(`How many tanks of gas per week?: ${userSelectedNumberOfTanks}`);
  console.log(`One Full Tank A Week: ${fullTankPerWeek} L`);
  console.log(`1️⃣ Fuel cost per year: ${fuelCostPerYear}`);
  console.log(`2️⃣ Fuel yearly discount amount: ${fuelDiscountPerYear}`);
  console.log(`3️⃣ Fuel cost after discount per year: ${fuelSavingsPerYear.toFixed(2)}`);
  console.log(`// ----------`);
}

let resultsDisplay = (locationFlag, fullTankPerWeek, fuelDiscount, weeksPerYear, numberOfTanks, gasPriceCadFixed, numberOfWash, washType, sundries, taxRate, taxType, washDiscount, sundriesDiscount) => {

  fuelDiscountPerYear(numberOfTanks, gasPriceCadFixed);

  resultsDiv.innerHTML = ``;
  resultsDiv.innerHTML += `
    <h2>Example of yearly savings	</h2>
    <p>Location: ${locationFlag}</p>
    <p>Tax rate: ${taxRate}${taxType}</p>
    <p>Wash discont: ${washDiscount}</p>
    <p>In-store discont: ${sundriesDiscount}</p>
    <hr>
    <p>How many car washes per week do you purchase along with gas?: ${numberOfWash}</p>
    <p>What type of car wash do you purchase?: ${washType}</p>
    <p>How much do you spend in-store per week?: ${sundries}</p>
    <hr>
    <p>Annual Savings: That's $XX.XX a year!</p>
    <p>Approx. total annual spending: $XXX.XX</p>
    <p>Approx. total annual savings: That’s $XXX.XX per year!</p>
  `;
}