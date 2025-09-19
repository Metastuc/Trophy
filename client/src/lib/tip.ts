// import {
//     createMeeClient,
//     getMEEVersion,
//     greaterThanOrEqualTo,
//     MEEVersion,
//     runtimeERC20BalanceOf,
//     toMultichainNexusAccount,
// } from "@biconomy/abstractjs";
import { EIP1193Provider } from "@privy-io/react-auth";
import { type Account, type Address, parseAbi, parseEther, parseUnits } from "viem";

import { network } from "./constants";
import { TOKEN_ADDRESSES } from "./contracts";
import { getWalletClient } from "./viem";

interface TipETH {
    amount: string;
    provider: EIP1193Provider;
    recipientAddress: Address;
    senderAddress: Address;
}

interface TipUser extends TipETH {
    token: TokenAddresses;
    wallet: string;
}

type TipToken = Omit<TipUser, "token"> & {
    contractAddress: Address;
    isUSDC?: boolean;
};

export async function tipETH({ amount, provider, recipientAddress, senderAddress }: TipETH) {
    const walletClient = getWalletClient(provider, senderAddress);

    return await walletClient.sendTransaction({
        account: walletClient.account as Account,
        chain: network,
        to: recipientAddress,
        value: parseEther(amount),
    });
}

export async function tipUser({ amount, provider, recipientAddress, token, senderAddress, wallet }: TipUser) {
    return await tipERC20Token(
        recipientAddress,
        TOKEN_ADDRESSES[token] as Address,
        amount,
        senderAddress,
        provider,
        token === "USDC" ? 8 : 18,
        wallet,
    );
}

export const tipCreatorToken = async ({
    recipientAddress,
    amount,
    senderAddress,
    provider,
    contractAddress,
    wallet
}: TipToken) => {
    return await tipERC20Token(recipientAddress, contractAddress, amount, senderAddress, provider, 18, wallet);
};


const tipERC20Token = async (
    recipient: string,
    contractAddress: string,
    amount: string,
    senderAddress: Address,
    signer: EIP1193Provider,
    decimals: number,
    wallet?: string,
) => {
    if (!wallet) {
        console.log("hehe")
    }
    const walletClient = getWalletClient(signer, senderAddress);

    const amountInUnits = parseUnits(amount, decimals);

    const hash = await walletClient.writeContract({
        address: contractAddress as Address,
        functionName: "transfer",
        abi: parseAbi(["function transfer(address to, uint amount)"]),
        args: [recipient as Address, amountInUnits],
        chain: network,
        account: senderAddress
    });

    return hash;
}

// const tipToken = async (
//     recipient: string,
//     contractAddress: string,
//     amount: string,
//     senderAddress: Address,
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
//         senderAddress,
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
