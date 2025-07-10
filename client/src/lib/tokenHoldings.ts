import { moralisChain } from "./constants";
import { toFixed } from "./fetchBalances";
import MoralisClient from "./moralis";
// name, price, up arrow and mcap

type tokenType = {
    name: string;
    price: string;
    logo: string | undefined;
    mcap: string;
    arrow: string;
    percentage: number;
}[];

export default async function tokenHoldings(address: string): Promise<tokenType> {
  const moralis = await MoralisClient();

  const { result: holdings } = await moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
    chain: moralisChain,
    address,
  });

  const tokens = ["ETH", "ZORA", "DEGEN", "USDC"];

  const tokenList: tokenType = [];

  for (const token of holdings) {
    if (!tokens.includes(token.symbol.toUpperCase())) {
      const percentage = Number(toFixed(token.portfolioPercentage));
      const arrow = percentage > 0 ? "up" : "down";
      tokenList.push({
        name: token.name,
        price: toFixed(token.usdPrice),
        logo: token.logo,
        mcap: "",
        arrow,
        percentage,
      });
    }
  }

  return tokenList;
}
