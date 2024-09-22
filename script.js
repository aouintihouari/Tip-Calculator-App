const billInput = document.querySelector(".bill-box__input");
const fixedPercentage = document.querySelectorAll(".percentage-box-fixed");
const customPercentage = document.querySelector(".percentage-box-custom");
const peopleInput = document.querySelector(".people-box__input");
const errorMessage = document.querySelector(".error-message");
const resetBtn = document.querySelector(".reset-btn");

const tipAmount = document.querySelector(".tip-amount-box__person-amount");
const totalAmount = document.querySelector(".total-amount-box__person-amount");

let bill = 0;
let tip = 0;
let tipPercentage = 0;
let people = 1;
let total = 0;

function removeAllActive() {
  fixedPercentage.forEach((percentage) => {
    percentage.classList.remove("active");
  });
}

function calculateTipAndTotal() {
  tip = people > 0 ? (bill * tipPercentage) / 100 / people : 0;
  total = people > 0 ? bill / people + tip : 0;
  tipAmount.textContent = tip == 0 ? "0.00" : tip.toFixed(2);
  totalAmount.textContent = total == 0 ? "0.00" : total.toFixed(2);
}

function reset() {
  removeAllActive();
  billInput.value = "";
  customPercentage.value = "";
  peopleInput.value = "";
  errorMessage.textContent = "";
  bill = 0;
  tip = 0;
  tipPercentage = 0;
  people = 1;
  total = 0;
  calculateTipAndTotal();
}

function notNull(input) {
  return parseInt(input) != 0;
}

function getInteger(input) {
  const value = input.replace(/[^0-9]/g, "");
  return value;
}

function getNumber(input) {
  const value = input.replace(/[^0-9.]/g, "");
  return value;
}

function isValid(input) {
  const parts = input.split(".");
  return parts.length > 2 ? parts[0] + "." + parts[1] : input;
}

billInput.addEventListener("input", function () {
  const value = getNumber(this.value);
  this.value = isValid(value);
  bill = parseFloat(value);
  calculateTipAndTotal();
});

fixedPercentage.forEach(function (percentage) {
  percentage.addEventListener("click", function () {
    const isActive = this.classList.contains("active");
    customPercentage.value = "";
    removeAllActive();
    if (!isActive) {
      this.classList.toggle("active");
      tipPercentage = this.dataset.percentage;
    }
    calculateTipAndTotal();
  });
});

customPercentage.addEventListener("input", function () {
  const value = getNumber(this.value);
  this.value = isValid(value);
  removeAllActive();
  tipPercentage = parseFloat(value) || 0;
  calculateTipAndTotal();
});

peopleInput.addEventListener("input", function () {
  const value = getInteger(this.value);
  this.value = value;
  if (!notNull(value)) {
    this.value = "";
    errorMessage.textContent = "Can't be zero";
  } else {
    errorMessage.textContent = "";
    people = getInteger(this.value) ? value : 1;
    calculateTipAndTotal();
  }
});

resetBtn.addEventListener("click", reset);
