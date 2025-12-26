const billInput = document.getElementById('bill-amount-input');
const tipInput = document.getElementById('tip-percentage-input');
const peopleInput = document.getElementById('number-of-people-input');
const calculateBtn = document.getElementById('calculate-btn');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total-amount');
const amountPerPersonDisplay = document.getElementById('amount-per-person');
let tipAmount;
let totalAmount;
let amountPerPerson;


function initialize() {
    billInput.value = ``;
    tipInput.value = ``;
    peopleInput.value = ``;
    tipAmount = 0;
    totalAmount = 0;
    amountPerPerson = 0;
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    amountPerPersonDisplay.textContent = '$0.00';
}

function checkInputValues() {
    if (parseFloat(tipInput.value) < 0) {
        alert("Tip percentage cannot be negative. Resetting to 15%.");
        tipInput.value = 15;
    } else if (parseFloat(tipInput.value) > 100) {
        alert("Tip percentage cannot exceed 100%. Resetting to 100%.");
        tipInput.value = 100;
    } else if (tipInput.value.trim() === '') {
        alert("Tip percentage cannot be empty. Resetting to 15%.");
        tipInput.value = 15;
    }

    if (parseFloat(billInput.value) < 0) {
        alert("Bill amount cannot be negative. Resetting to $0.00.");
        billInput.value = 0;
    } else if (billInput.value.trim() === '') {
        alert("Bill amount cannot be empty. Resetting to $0.00.");
        billInput.value = 0;
    }

    if (parseFloat(peopleInput.value) < 0) {
        alert("Number of people cannot be negative. Resetting to 1.");
        peopleInput.value = 1;
    } else if (parseFloat(peopleInput.value) === 0) {
        alert("Number of people cannot be zero. Resetting to 1.");
        peopleInput.value = 1;
    } else if (!Number.isInteger(parseFloat(peopleInput.value))) {
        alert("Number of people must be an integer. Rounding to nearest number.");
        peopleInput.value = Math.round(parseFloat(peopleInput.value));
    } else if (peopleInput.value === '') {
        peopleInput.value = 1;
        document.getElementById('per-person-container').hidden = true;
    } else {
        document.getElementById('per-person-container').hidden = false;
    }
}

function computeTip() {
    tipAmount = parseFloat(billInput.value) * (parseFloat(tipInput.value) / 100);
    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
}

function computeTotal() {
    totalAmount = parseFloat(billInput.value) + tipAmount;
    totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
}
function computePerPerson() {
    amountPerPerson = totalAmount / parseFloat(peopleInput.value);
    amountPerPersonDisplay.textContent = `$${amountPerPerson.toFixed(2)}`;
}

calculateBtn.addEventListener('click', () => {
    checkInputValues();
    computeTip();
    computeTotal();
    computePerPerson();
});

initialize();