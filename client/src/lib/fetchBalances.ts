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
};

/**
 * Fetches the token balances for a given wallet address.
 * @param {string} address The wallet address.
 * @returns {balanceType} A promise that resolves
 * to an object where the keys are the token symbols(ETH, ZORA, DEGEN, USDC) and the values are objects with the properties
 * "balance", "H24_change", "balance_price_usd" and "token_price_usd". The "balance" property is the balance of the token in the wallet,
 * the "balance_price_usd" property is the current value of 1 unit of the token in USD, the "token_price_usd" property is the current value of the token in USD and the "H24_change property is the change in the last 24 hours".
 */
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

    const balances: balanceType = { tokens: {}, portfolio_percent: "" };
    let arrow = "down";
    let portfolioPercent = 0;

    for (let i = 0; i < response.result.length; i++) {
      const H24_change = parseInt(response.result[i].usdValue24hrUsdChange ?? "0");
      if (H24_change > 0) arrow = "up";
      balances.tokens[response.result[i].symbol] = {
        balance: response.result[i].balanceFormatted,
        balance_price_usd: response.result[i].usdValue.toString(),
        token_price_usd: response.result[i].usdPrice,
        arrow,
        H24_change: H24_change.toFixed(2),
      };
      portfolioPercent += response.result[i].portfolioPercentage;
    }
    balances.portfolio_percent = portfolioPercent.toFixed(2).toString();

    return balances;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching token balances");
  }
}
