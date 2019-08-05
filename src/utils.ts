
export function add(a, b) {
    return a + b;
}


export function formatTotBillAmt() {

}

export function getTipPercent(tipBtnText: string) {
    let tipPct = 0;
    switch (tipBtnText) {
        case '10%':
            tipPct = 10;
            break;
        case '15%':
            tipPct = 15;
            break;
        case '20%':
            tipPct = 20;
            break;
    }
    return tipPct;
}

export function totalTipAmount(tipPct: number, totBillAmt: number) {
    return (tipPct / 100) * totBillAmt;
}

export function totalToBePaid(tipPct: number, totBillAmt: number) {
    return totalTipAmount(tipPct, totBillAmt) + totBillAmt;
}

export function isValidBillAmount(billAmtValue: number) {
    if ((billAmtValue < 0) || (isNaN(billAmtValue))) {
        return false;
    }
    else {
        return true;
    }
}

export function getSelectionStart(element) {
    return element.selectionStart
}