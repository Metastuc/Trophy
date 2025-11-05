import { parseAbi, parseEther, parseUnits } from "viem";

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

export async function tipERC20({ amount, provider, recipientAddress, senderAddress, token, tokenAddress }: TipERC) {
    const walletClient = getWalletClient({ address: senderAddress, provider });

    return await walletClient.writeContract({
        abi: parseAbi(["function transfer(address to, uint amount)"]),
        account: walletClient.account,
        address: tokenAddress,
        args: [recipientAddress, parseUnits(amount, token === "USDC" ? 8 : 18)],
        chain: CLIENT_CONSTANTS.CURRENT_NETWORK,
        functionName: "transfer",
    });
}
