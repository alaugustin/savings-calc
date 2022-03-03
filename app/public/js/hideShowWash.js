const selectElement = document.getElementById("wash"), 
washTypeHolderDiv = document.getElementById("washTypeHolder");
  
console.log("test");
let hideShowWashType = () => {
  selectElement > 1
    ? washTypeHolderDiv.style.display = "block"
    : washTypeHolderDiv.style.display = "none";

  selectElement.addEventListener('change', (event) => {
    event.target.value > 0
      ? washTypeHolderDiv.style.display = "block"
      : washTypeHolderDiv.style.display = "none";
  });
}