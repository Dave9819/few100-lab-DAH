import { totalToBePaid, getTipPercent, totalTipAmount, getSelectionStart, isValidBillAmount } from "./utils";

let tipPercentageString: string = '0';
const txtBillAmt = <HTMLInputElement>document.getElementById('txtBillAmt');
const msgTip = document.getElementById('msgTip');
const msgBillAmount = document.getElementById('msgBillAmount');
const tipAmountButton = document.querySelectorAll('.list-group-item.list-group-item-action.list-group-item-dark');
const msgTipPercentage = document.getElementById('msgTipPercentage');
const msgTipAmount = document.getElementById('msgTipAmount');
const msgTotalPaid = document.getElementById('msgTotalPaid');

export function runApp() {

    setUp();

    function setUp() {
        const txtBillAmt = document.getElementById('txtBillAmt');
        txtBillAmt.addEventListener('keypress', isNumberKey);
        txtBillAmt.addEventListener('input', handleInput);

        tipAmountButton.forEach((tipButton, index) => {
            tipButton.addEventListener('click', handleClick)
        })

        msgTip.innerText = '0%';
    }
}

function handleClick(evt) {
    const tipAmtBtnClickedOn = this as HTMLInputElement;
    tipPercentageString = tipAmtBtnClickedOn.innerText;
    tipAmtBtnClickedOn.disabled = true;
    tipAmtBtnClickedOn.classList.add('disabled');

    tipAmountButton.forEach((tipButton, index) => {
        let tipBtn = <HTMLInputElement>tipButton;
        if (tipAmtBtnClickedOn.id != tipButton.id) {
            tipBtn.disabled = false;
            tipBtn.classList.remove('disabled');
        }
    })

    updateDisplay();
}

function handleInput(evt) {

    msgBillAmount.innerText = txtBillAmt.value;

    updateDisplay();
}

function isNumberKey(evt) {
    evt = (evt) ? evt : window.event;
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    let len = txtBillAmt.value.length;

    if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode == 46 || charCode == 8))
        evt.preventDefault();
    else {
        let decimalIndex = txtBillAmt.value.indexOf('.');

        if (decimalIndex > -1 && charCode == 46) {
            evt.preventDefault();
        }
        if ((decimalIndex > 0)) {
            let charAfterdot = (len + 1) - decimalIndex;
            let cursorPos = getSelectionStart(txtBillAmt);

            if ((charAfterdot > 3) && (charCode >= 48 && charCode <= 57) && (cursorPos > decimalIndex)) {
                evt.preventDefault();
            }
        }

    }
    return true;
}

function updateDisplay() {
    let billAmtValue = parseFloat(txtBillAmt.value);

    let tipPrct = getTipPercent(tipPercentageString);

    msgTipPercentage.innerText = tipPercentageString;
    msgTip.innerText = tipPercentageString;

    if (isValidBillAmount(billAmtValue)) {

        msgBillAmount.innerText = '$' + billAmtValue.toFixed(2);

        let totalTip = totalTipAmount(tipPrct, billAmtValue);
        msgTipAmount.innerText = '$' + totalTip.toFixed(2);

        let grandTotal = totalToBePaid(tipPrct, billAmtValue);
        msgTotalPaid.innerText = '$' + grandTotal.toFixed(2);
    }
    else {
        msgBillAmount.innerText = '';
        msgTipAmount.innerText = '';
        msgTotalPaid.innerText = '';
    }

}

