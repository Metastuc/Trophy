import Moralis from "moralis";

import { ENV_SCHEMA, moralisChain, tokenAddresses } from "./constants";

let moralisStarted: boolean | undefined;
type balanceType = {
  tokens: {
    [key: string]: {
    token_price_usd: string;
    arrow: string;
    balance_price_usd: string;
    balance: string;
    H24_change?: string;
    }
  },
  portfolio_percent: string;
  portfolioArrow: string;
  totalMoney: string;
};

const toFixed = (value: string | number) => {
  if (typeof value === "string") {
    return parseInt(value).toFixed(2);
  }

  return value.toFixed(2);
}

export default async function GetTokenBalances(address: string): Promise<balanceType> {
  try {
    if (!moralisStarted) {
      await Moralis.start({
        apiKey: ENV_SCHEMA.MORALIS_API_KEY,
      });

      moralisStarted = true;
    }

    const response = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
      chain: moralisChain,
      address,
      tokenAddresses,
    });

    const balances: balanceType = { tokens: {}, portfolio_percent: "", portfolioArrow: "", totalMoney: "" };
    let arrow = "down";
    let portfolioArrow = "down";
    let portfolioPercent = 0;
    let totalMoney = 0;

    for (let i = 0; i < response.result.length; i++) {

      const H24_change = parseInt(response.result[i].usdValue24hrUsdChange ?? "0");
      if (H24_change > 0) arrow = "up";
      balances.tokens[response.result[i].symbol] = {
        balance: toFixed(response.result[i].balanceFormatted),
        balance_price_usd: toFixed(response.result[i].usdValue),
        token_price_usd: toFixed(response.result[i].usdPrice),
        arrow,
        H24_change: H24_change.toFixed(2),
      };
      totalMoney += response.result[i].usdValue;
      portfolioPercent += response.result[i].portfolioPercentage;
    }

    if (portfolioPercent > 0) portfolioArrow = "up"

    balances.portfolio_percent = toFixed(portfolioPercent);
    balances.portfolioArrow = portfolioArrow;
    balances.totalMoney = toFixed(totalMoney);

    return balances;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching token balances");
  }
}
