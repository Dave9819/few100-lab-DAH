import { getSelectionStart, formatter, updateBillData, IBillData } from "./utils";

let tipPercentage: number = 0;
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
        txtBillAmt.addEventListener('keypress', isNumberKey);
        txtBillAmt.addEventListener('input', handleInput);

        tipAmountButton.forEach((tipButton, index) => {
            tipButton.addEventListener('click', handleClick)
        })

        if (localStorage.length > 0) {
            let tipBtnSelectedId = localStorage.getItem('tipPercentageButtonClickedOnId');
            tipPercentage = parseFloat(tipBtnSelectedId);
            const tipAmtBtnClickedOn = <HTMLInputElement>document.getElementById(tipBtnSelectedId);
            tipAmtBtnClickedOn.disabled = true;
            tipAmtBtnClickedOn.classList.add('disabled');
        }

        let billAmt = parseFloat(txtBillAmt.value);
        let billData = updateBillData(billAmt, tipPercentage);
        updateDisplay(billData);
    }
}

function handleClick(evt) {
    const tipAmtBtnClickedOn = this as HTMLInputElement;

    let buttonClickedOnId = tipAmtBtnClickedOn.id;

    tipAmtBtnClickedOn.disabled = true;
    tipAmtBtnClickedOn.classList.add('disabled');

    tipPercentage = parseFloat(buttonClickedOnId);
    localStorage.setItem('tipPercentageButtonClickedOnId', buttonClickedOnId);

    tipAmountButton.forEach((tipButton, index) => {
        let tipBtn = <HTMLInputElement>tipButton;
        if (buttonClickedOnId != tipButton.id) {
            tipBtn.disabled = false;
            tipBtn.classList.remove('disabled');
        }
    })

    let billAmt = parseFloat(txtBillAmt.value);
    let billData = updateBillData(billAmt, tipPercentage);
    updateDisplay(billData);
}

function handleInput(evt) {

    msgBillAmount.innerText = txtBillAmt.value;
    let billAmt = parseFloat(txtBillAmt.value);
    let billData = updateBillData(billAmt, tipPercentage);
    updateDisplay(billData);
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

function updateDisplay(billData: IBillData) {
    msgTipPercentage.innerText = billData.tipPercentageTxt;
    msgTip.innerText = billData.tipPercentageTxt;
    msgBillAmount.innerText = '$' + formatter.format(billData.billBeforeTip);
    msgTipAmount.innerText = '$' + formatter.format(billData.tipAmount);
    msgTotalPaid.innerText = '$' + formatter.format(billData.totalBill);
}

