const billElement = document.getElementById('bill-amount-input');
const tipElement = document.getElementById('tip-percentage-input');
const peopleElement = document.getElementById('number-of-people-input');
const calculateBtn = document.getElementById('calculate-btn');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total-amount');
const amountPerPersonDisplay = document.getElementById('amount-per-person');

function initialize() {
    billElement.value = '';
    tipElement.value = '';
    peopleElement.value = '';
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    amountPerPersonDisplay.textContent = '$0.00';
}

function readAndSanitize() {
    const billRaw = billElement.value.trim();
    let bill = parseFloat(billRaw);
    if (!Number.isFinite(bill) || bill < 0) {
        alert("Bill amount cannot be negative or non-numeric. Resetting to $0.00.");
        bill = 0;
    }

    const tipRaw = tipElement.value.trim();
    let tip = parseFloat(tipRaw);
    if (!Number.isFinite(tip) || tip < 0) {
        alert("Tip percentage cannot be negative or non-numeric. Resetting to 15%.");
        tip = 15;
    } else if (tip > 100) {
        alert("Tip percentage cannot exceed 100%. Resetting to 100%.");
        tip = 100;
    }

    const peopleRaw = peopleElement.value.trim();
    let people;

    if (peopleRaw === '') {
        people = 1;
    } else {
        const n = Number(peopleRaw);
        if (!Number.isFinite(n)) {
            alert("Number of people cannot be negative or non-numeric. Resetting to 1.");
            people = 1;
        } else if (n <= 0) {
            alert("Number of people must be a positive integer. Resetting to 1.");
            people = 1;
        } else {
            people = Math.round(n);
        }
    }

    document.getElementById('per-person-container').hidden = (people <= 1);

    billElement.value = String(bill);
    tipElement.value = String(tip);
    peopleElement.value = String(people);
    return { bill, tip, people };
}

function computeAndRender() {
    const { bill, tip, people } = readAndSanitize();
    const tipAmount = (bill * (tip / 100));
    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;

    const totalAmount = bill + tipAmount;
    totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;

    const perPerson = totalAmount / people;
    amountPerPersonDisplay.textContent = `$${perPerson.toFixed(2)}`;
}

calculateBtn.addEventListener('click', () => {
    computeAndRender();
});

initialize();