import { EIP1193Provider } from "@privy-io/react-auth";
import { parseAbi, parseEther, parseUnits } from "viem";

import { DEGEN, USDC, ZORA } from "@/lib/tipContracts";
import { getWalletClient } from "./viem";

export const ethTip = async (recipient: string, amount: string, provider: EIP1193Provider) => {
    const walletClient = await getWalletClient(provider);

    // ignore the lint error, code is correct
    const hash = await walletClient.sendTransaction({
        account: walletClient.account!,
        chain: walletClient.chain,

        to: recipient as `0x${string}`,
        value: parseEther(amount),
    });

    return hash;
};

export const tipUSDC = async (recipient: string, amount: string, provider: EIP1193Provider) => {
    return await tipToken(recipient, USDC, amount, provider, true);
};

export const tipZORA = async (recipient: string, amount: string, provider: EIP1193Provider) => {
    return await tipToken(recipient, ZORA, amount, provider);
};

export const tipDEGEN = async (recipient: string, amount: string, provider: EIP1193Provider) => {
    return await tipToken(recipient, DEGEN, amount, provider);
};

export const tipCreatorToken = async (
    recipient: string,
    contractAddress: string,
    amount: string,
    provider: EIP1193Provider,
) => {
    return await tipToken(recipient, contractAddress, amount, provider);
};

const tipToken = async (
    recipient: string,
    contractAddress: string,
    amount: string,
    provider: EIP1193Provider,
    usdc?: boolean,
) => {
    const walletClient = await getWalletClient(provider);

    // same here code is correct, ignore lint error
    const hash = await walletClient.writeContract({
        account: walletClient.account!,
        chain: walletClient.chain,

        address: contractAddress as `0x${string}`,
        args: [recipient as `0x${string}`, parseUnits(amount, usdc ? 6 : 18)],
        abi: parseAbi(["function transfer(address to, uint256 amount) nonpayable"]),
        functionName: "transfer",
    });

    return hash;
};
