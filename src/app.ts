import { totalToBePaid, getTipPercent, totalTipAmount, getSelectionStart, isValidBillAmount } from "./utils";

let tipPercentageString: string = '0';
const billAmtValue = <HTMLInputElement>document.getElementById('txtBillAmt');

export function runApp() {

    setUp();

    function setUp() {
        let txtBillAmt = document.getElementById('txtBillAmt');
        txtBillAmt.addEventListener('keypress', isNumberKey);
        txtBillAmt.addEventListener('input', handleInput);

        let tipAmountButton = document.querySelectorAll('.list-group-item');

        tipAmountButton.forEach((tipButton, index) => {
            tipButton.addEventListener('click', handleClick)
        })
    }
}

function handleClick(evt) {
    let tipAmtBtnClickedOn = this as HTMLInputElement;
    tipPercentageString = tipAmtBtnClickedOn.innerText;
    tipAmtBtnClickedOn.disabled = true;
    tipAmtBtnClickedOn.classList.add('disabled');

    let tipAmountButton = document.querySelectorAll('.list-group-item.list-group-item-action.list-group-item-dark');

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
    let msgBillAmount = document.getElementById('msgBillAmount');
    msgBillAmount.innerText = billAmtValue.value;

    updateDisplay();
}

function isNumberKey(evt) {
    evt = (evt) ? evt : window.event;
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    let len = billAmtValue.value.length;

    if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode == 46 || charCode == 8))
        evt.preventDefault();
    else {
        let decimalIndex = billAmtValue.value.indexOf('.');

        if (decimalIndex > -1 && charCode == 46) {
            evt.preventDefault();
        }
        if ((decimalIndex > 0)) {
            let charAfterdot = (len + 1) - decimalIndex;
            let cursorPos = getSelectionStart(billAmtValue);
            console.log(cursorPos);
            if ((charAfterdot > 3) && (charCode >= 48 && charCode <= 57) && (cursorPos > decimalIndex)) {
                evt.preventDefault();
            }
        }

    }
    return true;
}

function updateDisplay() {
    let txtBillAmt = <HTMLInputElement>document.getElementById('txtBillAmt');
    let billAmtValue = parseFloat(txtBillAmt.value);

    let tipPrct = getTipPercent(tipPercentageString);

    let msgBillAmount = document.getElementById('msgBillAmount');
    let msgTipPercentage = document.getElementById('msgTipPercentage');

    let msgTipAmount = document.getElementById('msgTipAmount');
    let msgTotalPaid = document.getElementById('msgTotalPaid');
    let msgTip = document.getElementById('msgTip');

    if (isValidBillAmount(billAmtValue)) {

        msgBillAmount.innerText = '$' + billAmtValue.toFixed(2);
        msgTipPercentage.innerText = tipPercentageString;
        msgTip.innerText = tipPercentageString;

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

