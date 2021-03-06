
export interface IBillData {
    billBeforeTip: number,
    tipPercentageTxt: string,
    tipPercentage: number,
    tipAmount: number,
    totalBill: number
}

export const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

export function getSelectionStart(element) {
    return element.selectionStart
}

export function getTipPercentage(tipBtnClickedId: string) {
    let tipPercent = 0;
    switch (tipBtnClickedId) {
        case '10':
            tipPercent = 10;
            break;
        case '15':
            tipPercent = 15;
            break;
        case '20':
            tipPercent = 20;
            break;
        default:
            tipPercent = 0;
    }
    return tipPercent;
}

export function updateBillData(billAmount: number, tipPercentage: number) {
    let billNoTip = 0;
    let tipPrctTxt = '';
    let tipPrct = 0;
    let tipAmt = 0;
    let totBill = 0;

    if (!isNaN(billAmount)) {
        billNoTip = billAmount;
    }
    else {
        billNoTip = 0;
    }

    if (!isNaN(tipPercentage)) {
        tipPrctTxt = tipPercentage.toString() + '%';
        tipPrct = (tipPercentage / 100);
    }
    else {
        tipPrctTxt = '0%';
        tipPrct = 0;
    }

    tipAmt = tipPrct * billNoTip;

    totBill = tipAmt + billNoTip;

    let newBillData = { billBeforeTip: billNoTip, tipPercentageTxt: tipPrctTxt, tipPercentage: tipPrct, tipAmount: tipAmt, totalBill: totBill };
    return newBillData;
}