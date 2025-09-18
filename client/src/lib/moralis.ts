import Moralis from "moralis";

import { APPLICATION_CONSTANTS, ENV_SCHEMA } from "./constants";

let moralisStarted: boolean = false;

export default async function MoralisClient() {
    if (moralisStarted) return Moralis;

    await Moralis.start({
        apiKey: ENV_SCHEMA.MORALIS_API_KEY,
    });

    moralisStarted = true;

    return Moralis;
}

export const moralisTokenFetch = async (address: string) => {
    const moralis = await MoralisClient();

    const { result } = await moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
        chain: APPLICATION_CONSTANTS.CURRENT_MORALIS_CHAIN,
        address,
    });

    return result;
};
