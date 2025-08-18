export function formatUSD(amount: number) {
    return `$${(parseFloat(amount.toString()) * 1).toFixed(2)}`;
}
