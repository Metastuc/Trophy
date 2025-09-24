export function formatBalance({
    balance,
    decimals,
    fractionDigits = 6,
}: {
    balance: string;
    decimals: number;
    fractionDigits?: number;
}): string {
    if (!balance) return "0";
    const num = Number(balance) / 10 ** decimals;
    if (isNaN(num)) return "0";
    return num.toFixed(fractionDigits);
}
