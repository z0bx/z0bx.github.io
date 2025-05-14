let display = document.getElementById("display");
let fromSelect = document.getElementById("fromCurrency");
let toSelect = document.getElementById("toCurrency");
let exchangeRates = [];

fetch("exchangeRates.json")
  .then(res => res.json())
  .then(data => {
    exchangeRates = data;
    populateDropdowns();
  })
  .catch(err => {
    display.textContent = "Error loading rates";
    console.error(err);
  });

function populateDropdowns() {
  exchangeRates.forEach(currency => {
    let option1 = document.createElement("option");
    option1.value = currency.value;
    option1.textContent = currency.name;

    let option2 = option1.cloneNode(true);

    fromSelect.appendChild(option1);
    toSelect.appendChild(option2);
  });

  fromSelect.value = 1;      // USD
  toSelect.value = 0.88;     // EUR
}

function appendNumber(num) {
  let current = display.textContent;

  // Prevent multiple leading zeros
  if (current === "0" && num === "0") return;

  // Replace "0" with non-dot number (e.g., "05" -> "5")
  if (current === "0" && num !== ".") {
    display.textContent = num;
    return;
  }

  // Prevent multiple decimals
  if (num === "." && current.includes(".")) return;

  display.textContent += num;
}

function clearDisplay() {
  display.textContent = "0";
}

function backspace() {
  let current = display.textContent;
  if (current.length > 1) {
    display.textContent = current.slice(0, -1);
  } else {
    display.textContent = "0";
  }
}

function convertCurrency() {
  let amount = parseFloat(display.textContent);
  if (isNaN(amount)) {
    display.textContent = "Error";
    return;
  }

  let fromRate = parseFloat(fromSelect.value);
  let toRate = parseFloat(toSelect.value);
  let result = (amount * toRate / fromRate).toFixed(2);

  // Display result in a new paragraph element
  let resultz = document.createElement("p");
  resultz.innerHTML = `Converted amount: ${result}`;
  
  // Assuming you want to display it in a specific container or below the display
  let resultContainer = document.getElementById("resultContainer"); // Make sure to create this container in your HTML
  if (!resultContainer) {
    resultContainer = document.createElement("div");
    resultContainer.id = "resultContainer";
    document.body.appendChild(resultContainer);
  }
  resultContainer.innerHTML = ""; // Clear any previous results
  resultContainer.appendChild(resultz);
}
