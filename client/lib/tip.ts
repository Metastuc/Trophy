import { parseAbi, parseEther, parseUnits } from "viem";

import { CONTRACT_ADDRESSES } from "#~/store/supported-tokens.ts";

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

export async function tipERC20({ amount, provider, recipientAddress, senderAddress, token }: TipERC) {
    const walletClient = getWalletClient({ address: senderAddress, provider });

    return await walletClient.writeContract({
        abi: parseAbi(["function transfer(address to, uint amount)"]),
        account: walletClient.account,
        address: CONTRACT_ADDRESSES[token],
        args: [recipientAddress, parseUnits(amount, token === "USDC" ? 8 : 18)],
        chain: CLIENT_CONSTANTS.CURRENT_NETWORK,
        functionName: "transfer",
    });
}

// export async function tipToken({
//     amount,
//     contractAddress,
//     isUSDC,
//     provider,
//     recipientAddress,
//     senderAddress,
//     wallet,
// }: TipToken) {
//     const nexusAccount = await toMultichainNexusAccount({
//         chainConfigurations: [
//             {
//                 chain: CLIENT_CONSTANTS.CURRENT_NETWORK,
//                 transport: custom(provider),
//                 version: getMEEVersion(MEEVersion.V2_1_0),
//             },
//         ],
//         signer: provider,
//         accountAddress: senderAddress,
//     });

//     console.log({ amount, contractAddress, isUSDC, provider, recipientAddress, senderAddress, wallet });

//     const MeeClient = await createMeeClient({ account: nexusAccount });
//     const tokenAddress = contractAddress;
//     const recieverAddress = recipientAddress;
//     const decimals = isUSDC ? 6 : 18;
//     const chainId = CLIENT_CONSTANTS.CURRENT_NETWORK.id;
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
// }
