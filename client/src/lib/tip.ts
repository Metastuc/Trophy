/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable simple-import-sort/imports */
import { Addresses } from "@/lib/contracts";
// import {
//     createMeeClient,
//     getMEEVersion,
//     greaterThanOrEqualTo,
//     MEEVersion,
//     runtimeERC20BalanceOf,
//     toMultichainNexusAccount,
// } from "@biconomy/abstractjs";
import { EIP1193Provider } from "@privy-io/react-auth";
import { type Address, parseAbi, parseEther, parseUnits } from "viem";
import { network } from "./constants";
import { getWalletClient } from "./viem";

type tokenType = "USDC" | "DEGEN" | "ZORA" | "BNKR" | "FLAY";

export const ethTip = async ({
    recipient,
    amount,
    provider,
}: {
    recipient: string;
    amount: string;
    provider: EIP1193Provider;
}) => {
    const walletClient = getWalletClient(provider);

    const hash = await walletClient.sendTransaction({
        account: walletClient.account!,
        chain: walletClient.chain,
        to: recipient as Address,
        value: parseEther(amount),
    });

    return hash;
};

export const tipUser = async ({
    recipient,
    amount,
    userAddress,
    provider,
    token,
    wallet
}: {
    recipient: string;
    amount: string;
    userAddress: Address;
    provider: EIP1193Provider;
    token: tokenType;
    wallet?: string;
}) => {
    const tokenAddress = Addresses[token];
    const decimals = token === "USDC" ? 6 : 18;
    return await tipERC20Token(recipient, tokenAddress, amount, userAddress, provider, decimals);
};

export const tipCreatorToken = async ({
    recipient,
    amount,
    userAddress,
    provider,
    contractAddress,
    wallet
}: {
    recipient: string;
    amount: string;
    userAddress: Address;
    provider: EIP1193Provider;
    contractAddress: string;
    wallet?: string;
}) => {
    return await tipERC20Token(recipient, contractAddress, amount, userAddress, provider, 18);
};


const tipERC20Token = async (
    recipient: string,
    contractAddress: string,
    amount: string,
    accountAddress: Address,
    signer: EIP1193Provider,
    decimals: number,
    wallet?: string,
) => {
    const walletClient = getWalletClient(signer, accountAddress);

    const amountInUnits = parseUnits(amount, decimals);

    const hash = await walletClient.writeContract({
        address: contractAddress as Address,
        functionName: "transfer",
        abi: parseAbi(["function transfer(address to, unit256 amount) payable"]),
        args: [recipient as Address, amountInUnits],
        chain: network,
        account: accountAddress
    });

    return hash;
}

// const tipToken = async (
//     recipient: string,
//     contractAddress: string,
//     amount: string,
//     accountAddress: Address,
//     signer: EIP1193Provider,
//     wallet: string,
//     decimals: number,
// ) => {
//     const nexusAccount = await toMultichainNexusAccount({
//         chainConfigurations: [
//             {
//                 chain: network,
//                 transport: custom(signer),
//                 version: getMEEVersion(MEEVersion.V2_1_0),
//             },
//         ],
//         signer,
//         accountAddress,
//     });

//     const MeeClient = await createMeeClient({ account: nexusAccount });
//     const tokenAddress = contractAddress as unknown as Address;
//     const recieverAddress = recipient as unknown as Address;

//     const chainId = network.id as unknown as number;
//     const tokenInUnits = parseUnits(amount, decimals);

//     const sendTokenIx = await nexusAccount.buildComposable({
//         type: "default",
//         data: {
//             abi: parseAbi(["function transfer(address to, uint256 amount) nonpayable"]),
//             chainId,
//             to: tokenAddress,
//             functionName: "transfer",
//             args: [
//                 recieverAddress,
//                 runtimeERC20BalanceOf({
//                     tokenAddress,
//                     targetAddress: nexusAccount.addressOn(chainId, true),
//                     constraints: [greaterThanOrEqualTo(tokenInUnits)],
//                 }),
//             ],
//         },
//     });

//     if (wallet !== "privy") {
//         const fusionQuote = await MeeClient.getFusionQuote({
//             trigger: {
//                 chainId,
//                 tokenAddress,
//                 amount: tokenInUnits,
//             },
//             instructions: [sendTokenIx],
//             feeToken: {
//                 address: tokenAddress,
//                 chainId,
//             },
//         });

//         const { hash } = await MeeClient.executeFusionQuote({ fusionQuote });

//         const { hash: superHash } = await MeeClient.waitForSupertransactionReceipt({ hash });

//         return superHash;
//     }

//     const quote = await MeeClient.getQuote({
//         instructions: [sendTokenIx],
//         delegate: true,

//         feeToken: {
//             address: tokenAddress,
//             chainId,
//         },
//     });

//     const { hash } = await MeeClient.executeQuote({ quote });

//     const { hash: superHash } = await MeeClient.waitForSupertransactionReceipt({ hash });

//     return superHash;
// };
