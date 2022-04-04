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

let hideFormShowResults = () => {
  resultsCollection.style.display = "block";
  mainForm.style.display = "none";
}

let showFormHideResults = (e) => {
  resultsCollection.style.display = "none";
  mainForm.style.display = "block";
  washTypeHolderDiv.style.display = "block";
}