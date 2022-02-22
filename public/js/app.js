let onGasPriceUs = gasPrice.result[6].gasoline;
let mbGasPriceUs = gasPrice.result[2].gasoline;
let exchangeRate = currency.rates.CAD;

let onGasPriceCad = (onGasPriceUs * exchangeRate).toFixed(2);
let mbGasPriceCad = (mbGasPriceUs * exchangeRate).toFixed(2);

function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const value = Object.fromEntries(data.entries());

  console.log({ value });

  console.log(`Ontario gas price: ${onGasPriceCad}`);
  console.log(`Ontario gas price (total): ${onGasPriceCad * value.gas}`);

  console.log(`Manitoba gas price: ${mbGasPriceCad}`);  
  console.log(`Manitoba gas price (total): ${mbGasPriceCad * value.gas}`);
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);