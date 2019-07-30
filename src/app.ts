import { totalToBePaid, getTipPercent, totalTipAmount } from "./utils";

//let msgBillAmount: HTMLElement;
//let txtBillAmt: HTMLElement;
let tipPercentageString: string = '0';

export function runApp() {

    console.log('making your request');
    setUp();

    function setUp() {
        let txtBillAmt = document.getElementById('txtBillAmt');
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
    let billAmtValue = <HTMLInputElement>document.getElementById('txtBillAmt');
    let msgBillAmount = document.getElementById('msgBillAmount');
    msgBillAmount.innerText = billAmtValue.value;
    updateDisplay();
}

function isValidBillAmount(billAmtValue: number) {
    if (billAmtValue < 0) {
        return false;
    }
    else {
        return true;
    }
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
        txtBillAmt.classList.remove('error');

        msgBillAmount.innerText = '$' + billAmtValue.toFixed(2);
        msgTipPercentage.innerText = tipPercentageString;
        msgTip.innerText = tipPercentageString;

        let totalTip = totalTipAmount(tipPrct, billAmtValue);
        msgTipAmount.innerText = '$' + totalTip.toFixed(2);

        let grandTotal = totalToBePaid(tipPrct, billAmtValue);
        msgTotalPaid.innerText = '$' + grandTotal.toFixed(2);

    }
    else {
        txtBillAmt.classList.add('error');
        msgBillAmount.innerText = '';
        msgTipAmount.innerText = '';
        msgTotalPaid.innerText = '';
    }

}

