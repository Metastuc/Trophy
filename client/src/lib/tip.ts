import {
    createMeeClient,
    getMEEVersion,
    greaterThanOrEqualTo,
    MEEVersion,
    runtimeERC20BalanceOf,
    toMultichainNexusAccount,
} from "@biconomy/abstractjs";
import { EIP1193Provider } from "@privy-io/react-auth";
import { type Account, type Address, custom, parseAbi, parseEther, parseUnits } from "viem";

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
    senderAddress: Address;
    wallet: string;
}

type TipToken = Omit<TipUser, "token"> & {
    contractAddress: Address;
    isUSDC?: boolean;
};

export async function tipETH({ amount, provider, recipientAddress, senderAddress }: TipETH) {
    const walletClient = getWalletClient(provider, senderAddress);
    if (recipientAddress) {
        console.log("ok")
    }

    return await walletClient.sendTransaction({
        account: walletClient.account as Account,
        chain: network,
        to: "0xAC4aD13D1e9816AfedE50272C68EA0c9D0E1F8a2",
        value: parseEther(amount),
    });
}

export async function tipUser({ amount, provider, recipientAddress, token, senderAddress, wallet }: TipUser) {
    return await tipToken({
        amount,
        contractAddress: TOKEN_ADDRESSES[token] as Address,
        isUSDC: token === "USDC",
        provider,
        recipientAddress,
        senderAddress,
        wallet,
    });
}

export async function tipCreatorToken({
    amount,
    contractAddress,
    provider,
    recipientAddress,
    senderAddress,
    wallet,
}: TipToken) {
    return await tipToken({ amount, contractAddress, provider, recipientAddress, senderAddress, wallet });
}

export async function tipToken({
    amount,
    contractAddress,
    isUSDC,
    provider,
    recipientAddress,
    senderAddress,
    wallet,
}: TipToken) {
    const nexusAccount = await toMultichainNexusAccount({
        chainConfigurations: [
            {
                chain: network,
                transport: custom(provider),
                version: getMEEVersion(MEEVersion.V2_1_0),
            },
        ],
        signer: provider,
        accountAddress: senderAddress,
    });

    console.log({ amount, contractAddress, isUSDC, provider, recipientAddress, senderAddress, wallet });

    const MeeClient = await createMeeClient({ account: nexusAccount });
    const tokenAddress = contractAddress;
    const recieverAddress = recipientAddress;
    const decimals = isUSDC ? 6 : 18;
    const chainId = network.id as unknown as number;
    const tokenInUnits = parseUnits(amount, decimals);
    const sendTokenIx = await nexusAccount.buildComposable({
        type: "default",
        data: {
            abi: parseAbi(["function transfer(address to, uint256 amount) nonpayable"]),
            chainId,
            to: tokenAddress,
            functionName: "transfer",
            args: [
                recieverAddress,
                runtimeERC20BalanceOf({
                    tokenAddress,
                    targetAddress: nexusAccount.addressOn(chainId, true),
                    constraints: [greaterThanOrEqualTo(tokenInUnits)],
                }),
            ],
        },
    });

    if (wallet !== "privy") {
        const fusionQuote = await MeeClient.getFusionQuote({
            trigger: {
                chainId,
                tokenAddress,
                amount: tokenInUnits,
            },
            instructions: [sendTokenIx],
            feeToken: {
                address: tokenAddress,
                chainId,
            },
        });

        const { hash } = await MeeClient.executeFusionQuote({ fusionQuote });
        const { hash: superHash } = await MeeClient.waitForSupertransactionReceipt({ hash });
        return superHash;
    }

    const quote = await MeeClient.getQuote({
        instructions: [sendTokenIx],
        delegate: true,
        feeToken: {
            address: tokenAddress,
            chainId,
        },
    });

    const { hash } = await MeeClient.executeQuote({ quote });
    const { hash: superHash } = await MeeClient.waitForSupertransactionReceipt({ hash });
    return superHash;
}
