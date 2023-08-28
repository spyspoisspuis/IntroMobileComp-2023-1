//* Toggle Task
function SwitchMode(event) {
    var body = document.getElementById("body");
    var toggle = document.getElementById("toggle");
    if (toggle.innerHTML == "Toggle Dark Mode") {
        body.style.backgroundColor = "#000000";
        body.style.color = "#ffffff";
        toggle.innerHTML = 'Toggle Light Mode';
    }else {
        body.style.backgroundColor = "#ffffff";
        body.style.color = "#000000";
        toggle.innerHTML = 'Toggle Dark Mode';
    }
}

//* Use to validate input field to only accept user to type numerics
function validateNumber(evt,id) {
    var currentValue = evt.value.charAt(evt.value.length-1);
    var currentASCII = evt.value.charCodeAt(evt.value.length - 1);

    if (currentASCII >= 48 && currentASCII <= 57) {
        var alertDiv = document.getElementById(id+'-alert');
        if (alertDiv) {
            alertDiv.remove();
        }

    } else if (currentValue != "") {
        evt.value = evt.value.slice(0, evt.value.length - 1);
        var salariesDiv = document.getElementById(id);
        var alertDiv = document.getElementById(id + '-alert');
        if (alertDiv) return;

        var p = document.createElement('p');
        salariesDiv.appendChild(p);
        p.id = id + "-alert"
        p.style.color = "#FF0000"; 
        p.innerHTML = "Allow only numberic values";
    }
    //TODO : update salary
    UpdateSalaries();
   
}

let inputFieldAmount = 1; //* current amount of salary input field 
function AddSalariesInput() {
    if (inputFieldAmount == 3)
        return;
    inputFieldAmount += 1;
    var salariesDiv = document.getElementById("salaries");

    //* Items setup ; add id to able it to use with validate number function
    //* add classList to apply the style
    //* add oninput function to call validate number when user type
    var newDiv = document.createElement('div');
    var newInput = document.createElement('input');
    newDiv.id = "salaries-"+inputFieldAmount;
    newDiv.classList.add("add-salaries-class");
    // Create an event listener for the input's "input" event
    newInput.addEventListener('input', function () {
        validateNumber(newInput, newDiv.id);  // Call the function with correct arguments
    });
    newInput.id = newDiv.id+"-input";
    newInput.classList.add("typable-input");

    //* Append Items to html
    salariesDiv.appendChild(newDiv);
    newDiv.appendChild(newInput);
}

function RemoveSalariesInput() {
    if (inputFieldAmount == 1) return;
    var lastetInput = document.getElementById("salaries-" + inputFieldAmount);
    lastetInput.remove();
    inputFieldAmount -= 1;

    //TODO : remove salaries summation 
    UpdateSalaries();
}


function UpdateSalaries() {
    var summation = 0;
    for (var i = 1; i <= inputFieldAmount;i++) {
        var saralyInput = document.getElementById("salaries-" +i+"-input");
        var salary = parseInt(saralyInput.value);
        if (isNaN(salary)) continue;
        summation += salary;
    }
    var summationField = document.getElementById("summation-salaries");
    summationField.value = summation;

    //TODO : update tax rate
    UpdateTaxRate(summation);
}

function UpdateTaxRate(summation) {
    var taxRateField = document.getElementById("tax-rate");
    var taxRate = "กรุณากรอกรายรับ";
    if (isNaN(summation)) return;
    else if (summation < 150000) {
        taxRate = "ได้รับการยกเว้น";
    } else if (summation < 300000) {
        taxRate = '5%';
    } else if (summation < 500000) {
        taxRate = '10%';
    } else if (summation < 750000) {
        taxRate = '15%';
    } else if (summation < 1000000) {
        taxRate = '20%';
    } else if (summation < 2000000) {
        taxRate = '25%';
    } else if (summation < 5000000) {
        taxRate = '30%';
    } else {
        taxRate = '35%';
    }
    taxRateField.value = taxRate;
    CalculateTaxToPaid(summation,taxRate);
}

function CalculateTaxToPaid(summation,taxRate) {
    var rate; 
    if (taxRate === "ได้รับการยกเว้น") {
        rate = 0; //* Such that paid will equal to 0
    } else {
        //TODO : trim string from tax rate to retrieve the numeric rate 
        rate = parseInt(taxRate, 10);
    }
    var paid = (summation * rate) / 100;
    var toPaidField = document.getElementById("to-paid");
    toPaidField.value = paid;
}