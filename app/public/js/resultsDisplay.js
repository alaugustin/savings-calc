let resultsDisplay = (locationFlag, fullTankLitres, fuelDiscount, weeksPerYear, numberOfTanks, gasPriceCadFixed, numberOfWash, washType, sundries, taxRate, taxType, washDiscount, sundriesDiscount) => {
  resultsDiv.innerHTML = ``;
  resultsDiv.innerHTML += `
    <h2>Example of yearly savings	</h2>
    <p>Location: ${locationFlag}</p>
    <p>Tax rate: ${taxRate}${taxType}</p>
    <p>One Full Tank A Week: ${fullTankLitres} litres</p>
    <p>Fuel Savings: ${fuelDiscount} per litre</p>
    <p>Wash discont: ${washDiscount}</p>
    <p>In-store discont: ${sundriesDiscount}</p>
    <p>Weeks Per Year: ${weeksPerYear}</p>
    <hr>
    <p>How many tanks of gas per week?: ${numberOfTanks}</p>
    <p>${locationFlag} gas price: ${gasPriceCadFixed}</p >
    <p>How many car washes per week do you purchase along with gas?: ${numberOfWash}</p>
    <p>What type of car wash do you purchase?: ${washType}</p>
    <p>How much do you spend in-store per week?: ${sundries}</p>
    <hr>
    <p>Annual Savings: That's $XX.XX a year!</p>
    <p>Approx. total annual spending: $XXX.XX</p>
    <p>Approx. total annual savings: That’s $XXX.XX per year!</p>
  `;
}