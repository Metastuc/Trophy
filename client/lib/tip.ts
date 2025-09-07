import { parseEther } from "viem";

import { CLIENT_CONSTANTS } from "./constants";
import { getWalletClient } from "./viem";

export async function tipEther({ amount, provider, recipientAddress, senderAddress }: TipETH) {
    const walletClient = getWalletClient({ address: senderAddress, provider });

    return await walletClient.sendTransaction({
        account: walletClient.account,
        chain: CLIENT_CONSTANTS.CURRENT_NETWORK,
        to: recipientAddress,
        value: parseEther(amount),
    });
}
