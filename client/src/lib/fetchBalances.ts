/* eslint-disable simple-import-sort/imports */
import { moralisTokenFetch } from "./utils";
import { supportedTokens } from "./constants";

type balanceType = {
    tokens: {
        [key: string]: {
            token_price_usd: string;
            arrow: string;
            balance_price_usd: string;
            balance: string;
            H24_change?: string;
        };
    };
    portfolio_percent: string;
    portfolioArrow: string;
    totalMoney: string;
};

export const toFixed = (value: string | number) => {
    if (typeof value === "string") {
        return parseInt(value).toFixed(2);
    }

    return value.toFixed(2);
};

export default async function GetTokenBalances(address: string): Promise<balanceType> {
    try {
        const tokens = await moralisTokenFetch(address);

        const balances: balanceType = {
            tokens: {},
            portfolio_percent: "",
            portfolioArrow: "",
            totalMoney: "",
        };
        let arrow = "down";
        let portfolioArrow = "";
        let portfolioPercent = 0;
        let totalMoney = 0;

        for (const token of tokens) {
            if (!supportedTokens.includes(token.symbol)) continue;
            const H24_change = parseInt(token.usdValue24hrUsdChange ?? "0");
            if (H24_change > 0) arrow = "up";
            balances.tokens[token.symbol] = {
                balance: toFixed(token.balanceFormatted),
                balance_price_usd: toFixed(token.usdValue),
                token_price_usd: toFixed(token.usdPrice),
                arrow,
                H24_change: H24_change.toFixed(2),
            };
            totalMoney += token.usdValue;
            portfolioPercent += token.portfolioPercentage;
        }

        if (portfolioPercent > 0) {
            portfolioArrow = "up"
        } else if (portfolioPercent < 0) {
            portfolioArrow = "down"
        };

        balances.portfolio_percent = toFixed(portfolioPercent);
        balances.portfolioArrow = portfolioArrow;
        balances.totalMoney = toFixed(totalMoney);

        return balances;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching token balances");
    }
}
