const selectElement = document.getElementById("wash"),
  washTypeHolderDiv = document.getElementById("washTypeHolder"),
  resultsCollection = document.getElementById("resultsCollection");

let hideShowWashType = () => {
  const eventTypes = ['change', 'blur', 'keyup'];

  selectElement > 1
    ? washTypeHolderDiv.style.display = "block"
    : washTypeHolderDiv.style.display = "none";

  eventTypes.forEach(eventType => {
    selectElement.addEventListener(eventType, (event) => {
      event.target.value > 0
        ? washTypeHolderDiv.style.display = "block"
        : washTypeHolderDiv.style.display = "none";
    });
  });
}

let hideShowResultsDiv = (flag) => {

  (flag = 0) ? console.log("false") : console.log("true");



  // const eventTypes = ['change', 'blur', 'keyup'];

  // selectElement > 1
  //   ? washTypeHolderDiv.style.display = "block"
  //   : washTypeHolderDiv.style.display = "none";

  // eventTypes.forEach(eventType => {
  //   selectElement.addEventListener(eventType, (event) => {
  //     event.target.value > 0
  //       ? washTypeHolderDiv.style.display = "block"
  //       : washTypeHolderDiv.style.display = "none";
  //   });
  // });
}