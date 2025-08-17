/* eslint-disable simple-import-sort/imports */
import { EIP1193Provider } from "@privy-io/react-auth";
import { http, parseAbi, parseEther, parseUnits } from "viem";
import { DEGEN, USDC, ZORA } from "@/lib/contracts";
import { getWalletClient } from "./viem";
import {
    createMeeClient,
    greaterThanOrEqualTo,
    runtimeERC20BalanceOf,
    toMultichainNexusAccount
} from "@biconomy/abstractjs";
import { network } from "./constants";

type walletType = "privy" | "external";

export const ethTip = async (recipient: string, amount: string, provider: EIP1193Provider) => {
    const walletClient = getWalletClient(provider);

    // ignore the lint error, code is correct
    const hash = await walletClient.sendTransaction({
        account: walletClient.account!,
        chain: walletClient.chain,

        to: recipient as `0x${string}`,
        value: parseEther(amount),
    });

    return hash;
};

export const tipUSDC = async (recipient: string, amount: string, userAddress: `0x${string}`, wallet: walletType, provider: EIP1193Provider) => {
    return await tipToken(recipient, USDC, amount, userAddress, provider, wallet, true);
};

export const tipZORA = async (recipient: string, amount: string, userAddress: `0x${string}`, provider: EIP1193Provider, wallet: walletType) => {
    return await tipToken(recipient, ZORA, amount, userAddress, provider, wallet);
};

export const tipDEGEN = async (recipient: string, amount: string, userAddress: `0x${string}`, provider: EIP1193Provider, wallet: walletType) => {
    return await tipToken(recipient, DEGEN, amount, userAddress, provider, wallet);
};

export const tipCreatorToken = async (
    recipient: string,
    contractAddress: string,
    amount: string,
    userAddress: `0x${string}`,
    provider: EIP1193Provider,
    wallet: walletType
) => {
    return await tipToken(recipient, contractAddress, amount, userAddress, provider, wallet);
};

const tipToken = async (
    recipient: string,
    contractAddress: string,
    amount: string,
    accountAddress: `0x${string}`,
    signer: EIP1193Provider,
    wallet: walletType,
    usdc?: boolean,
) => {

    const nexusAccount = await toMultichainNexusAccount({
        chains: [network],
        transports: [http()],
        signer,
        accountAddress,
    });

    const MeeClient = await createMeeClient({ account: nexusAccount });
    const tokenAddress = contractAddress as unknown as `0x${string}`;
    const recieverAddress = recipient as unknown as `0x${string}`;

    const decimals = usdc ? 6 : 18;
    const chainId = network.id as unknown as number;
    const tokenInUnits = parseUnits(amount, decimals);

    const sendTokenIx = await nexusAccount.buildComposable({
        type: 'default',
        data: {
            abi: parseAbi(["function transfer(address to, uint256 amount) nonpayable"]),
            chainId,
            to: tokenAddress,
            functionName: 'transfer',
            args: [
                recieverAddress,
                runtimeERC20BalanceOf({
                    tokenAddress,
                    targetAddress: nexusAccount.addressOn(chainId, true),
                    constraints: [greaterThanOrEqualTo(tokenInUnits)],
                }),
            ],
        }
    });

    if (wallet === "external") {

        const fusionQuote = await MeeClient.getFusionQuote({
            trigger: {
                chainId,
                tokenAddress,
                amount: tokenInUnits
            },
            instructions: [sendTokenIx],
            feeToken: {
                address: tokenAddress,
                chainId
            }
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
            chainId
        },
    });

    const { hash } = await MeeClient.executeQuote({ quote });

    const { hash: superHash } = await MeeClient.waitForSupertransactionReceipt({ hash });

    return superHash;
};
