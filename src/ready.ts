export function ready(callback: any) {
    document.onreadystatechange = function () {
        if (document.readyState === 'interactive') {
            callback();
        }
    }
}