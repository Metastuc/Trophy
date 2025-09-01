export function formatUSD(amount: string) {
    return `$${(parseFloat(amount.toString()) * 1).toFixed(2)}`;
}
