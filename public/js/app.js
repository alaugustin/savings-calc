let onGasPriceUs = gasPrice.result[6].gasoline;
let mbGasPriceUs = gasPrice.result[2].gasoline;
let exchangeRate = currency.rates.CAD;

let onGasPriceCad = (onGasPriceUs * exchangeRate).toFixed(2);
let mbGasPriceCad = (mbGasPriceUs * exchangeRate).toFixed(2);

function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const userData = Object.fromEntries(data.entries());

  console.log(`> ------------------------- <}`);

  console.log(`Location: ${userData.location}`);
  console.log(`Tanks of gas: ${userData.gas}`);
  console.log(`----------}`);

  console.log(`Carwashes: ${userData.wash}`);
  console.log(`Wash type: ${userData.washType}`);
  console.log(`----------}`);
  
  console.log(`Ontario gas price: ${onGasPriceCad}`);
  console.log(`Ontario gas price (total): ${onGasPriceCad * userData.gas}`);
  console.log(`----------}`);

  console.log(`Manitoba gas price: ${mbGasPriceCad}`);  
  console.log(`Manitoba gas price (total): ${mbGasPriceCad * userData.gas}`);

  console.log(`> ------------------------- <}`);
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);