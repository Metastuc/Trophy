import { createFlaunch, ReadWriteFlaunchSDK, RevenueManagerAbi } from "@flaunch/sdk";
import { EIP1193Provider } from "@privy-io/react-auth";
import { Address, encodeAbiParameters, encodeFunctionData, parseAbi, parseEther, parseUnits, zeroHash } from "viem";

import { FLAUNCH_ZAP_ABI } from "./abi";
import { makeRequest } from "./axios";
import { ENV_SCHEMA, network } from "./constants";
import { claimTokenParams, createTokenParams, SignTypedData } from "./types";
import { getWalletClient, publicClient } from "./viem";
import { zeroDevSA } from "./zerodev";

let WriteClient: ReadWriteFlaunchSDK | undefined;

const supply = 100_000_000_000;

export const flaunchClient = (provider: EIP1193Provider, address?: Address) => {
    if (!WriteClient) {
        const walletClient = getWalletClient(provider, address);

        WriteClient = createFlaunch({ publicClient, walletClient }) as ReadWriteFlaunchSDK;
    }

    return WriteClient;
};

const readClient = createFlaunch({ publicClient });

export const ethRequiredToGetAllocation = async ({ tokenPercent }: { tokenPercent: string }) => {
    const AllocationPercent = Number(tokenPercent) / 100;
    const tokenPercentAllocation = supply * AllocationPercent;

    const premineAmount = parseEther(tokenPercentAllocation.toString());

    const ethRequiredToBuy = await readClient.ethRequiredToFlaunch({
        initialMarketCapUSD: 5000,
        premineAmount,
        slippagePercent: 1,
    });

    return { tokens: premineAmount, ethAmount: ethRequiredToBuy };
};

export const claimToken = async ({ provider, coinAddress, address, username }: claimTokenParams) => {
    const zeroDevClient = await zeroDevSA({ provider });

    const { amountOfTokens } = await makeRequest<{ amountOfTokens: number }>({
        method: "GET",
        url: `/get-token-allocation-percent`,
        data: { username },
    }).then((response) => response.data);

    const transferData = encodeFunctionData({
        functionName: "transfer",
        abi: parseAbi(["function transfer(address to, uint amount)"]),
        args: [address as Address, BigInt(amountOfTokens)],
    });

    const hash = await zeroDevClient.sendTransaction({
        to: coinAddress,
        data: transferData,
    });

    return hash as string;
};

export const createCreatorToken = async ({ name, provider, ethAmount, tokens, address }: createTokenParams) => {
    try {
        const zeroDevClient = await zeroDevSA({ provider });

        const initialMCapInUSDCWei = parseUnits("5000", 6);
        const initialPriceParams = encodeAbiParameters([{ type: "uint256" }], [initialMCapInUSDCWei]);

        const creatorFeeAllocationInBps = 70 * 100;

        const initialTokenFairLaunch = (parseEther(supply.toString()) * 45n) / 100n;

        const { tokenUri } = await makeRequest<{ tokenUri: string }>({
            method: "POST",
            url: `/create-token-uri`,
            data: { username: name },
        }).then((response) => response.data);

        const sa_address = zeroDevClient.account.address;

        const flaunchParams = {
            _flaunchParams: {
                name,
                symbol: name.toUpperCase(),
                tokenUri,
                initialTokenFairLaunch,
                fairLaunchDuration: BigInt(30 * 60),
                premineAmount: tokens,
                creator: sa_address as Address,
                creatorFeeAllocation: creatorFeeAllocationInBps,
                flaunchAt: 0n,
                initialPriceParams,
                feeCalculatorParams: "0x" as Address,
            },
            _treasuryManagerParams: {
                manager: ENV_SCHEMA.REVENUE_MANAGER_ADDRESS,
                permissions: "0x0000000000000000000000000000000000000000" as Address,
                initializeData: "0x" as Address,
                depositData: "0x" as Address,
            },
            _whitelistParams: {
                merkleRoot: zeroHash,
                merkleIPFSHash: "",
                maxTokens: 0n,
            },
            _airdropParams: {
                airdropIndex: 0n,
                airdropAmount: 0n,
                airdropEndTime: 0n,
                merkleRoot: zeroHash,
                merkleIPFSHash: "",
            },
        };

        const data = encodeFunctionData({
            abi: FLAUNCH_ZAP_ABI,
            functionName: "flaunch",
            args: [
                flaunchParams._flaunchParams,
                "0x",
                flaunchParams._whitelistParams,
                flaunchParams._airdropParams,
                flaunchParams._treasuryManagerParams,
            ],
        });

        let creatorToken: string;

        if (ethAmount !== 0n) {
            const walletClient = getWalletClient(provider, address);

            const hash = await walletClient.sendTransaction({
                to: ENV_SCHEMA.FLAUNCH_CA,
                data,
                value: ethAmount,
                account: address,
                chain: network,
                gas: 5000000n,
            });

            const { logs } = await publicClient.getTransactionReceipt({ hash });

            creatorToken = logs[4].address;

            await makeRequest({
                method: "POST",
                url: "/set-date",
                data: { username: name, tokenGotten: tokens },
            });
        } else {
            const uoHash = await zeroDevClient.sendUserOperation({
                callData: await zeroDevClient.account.encodeCalls([
                    {
                        to: ENV_SCHEMA.FLAUNCH_CA,
                        data,
                    },
                ]),
            });

            const { logs } = await zeroDevClient.waitForUserOperationReceipt({
                hash: uoHash,
            });

            creatorToken = logs[4].address;
        }

        await makeRequest({
            method: "POST",
            url: `/save-creator-token`,
            data: { creatorToken, sa_address, username: name },
        });

        return { creatorToken, sa_address };
    } catch (error: unknown) {
        console.error(error);
        throw new Error((error as Error).message);
    }
};

const checkTx = async (hash: Address, flaunch = WriteClient) => {
    const txReceipt = await flaunch?.drift.waitForTransaction({ hash });

    if (txReceipt?.status !== "success") {
        throw new Error("Transaction failed");
    }

    return hash;
};

export const buyCreatorToken = async (
    coinAddress: Address,
    amount: string,
    provider: EIP1193Provider,
    address: Address,
) => {
    console.log({ coinAddress, amount, address });
    const flaunch = flaunchClient(provider, address);
    const hash = await flaunch.buyCoin(
        {
            coinAddress,
            slippagePercent: 4,
            swapType: "EXACT_IN",
            amountIn: parseEther(amount),
        },
        "V1_1",
    );

    return await checkTx(hash);
};

export const getCreatorTokenPrice = async (coinAddress: Address) => {
    return await readClient.coinPriceInUSD({ coinAddress });
};

export const getSwapQuote = async (ethToCreatorToken: boolean, amount: string, coinAddress: Address) => {
    if (ethToCreatorToken) {
        return await readClient.getBuyQuoteExactInput(coinAddress, parseEther(amount));
    }

    return await readClient.getSellQuoteExactInput(coinAddress, parseEther(amount));
};

export type PermitDetails = {
    token: Address;
    amount: bigint;
    expiration: number;
    nonce: number;
};

export type PermitSingle = {
    details: PermitDetails;
    spender: Address;
    sigDeadline: bigint;
};

export const sellCreatorToken = async (
    coinAddress: Address,
    amount: string,
    provider: EIP1193Provider,
    signTypedData: SignTypedData,
    address: Address,
) => {
    const flaunch = flaunchClient(provider, address);
    const amountInUnits = parseEther(amount.replace(/,/g, ""));
    const { allowance } = await flaunch.getPermit2AllowanceAndNonce(coinAddress);

    let hash: Address;

    if (allowance < amountInUnits) {
        const { typedData, permitSingle } = await flaunch.getPermit2TypedData(coinAddress);

        typedData.message.details.amount = typedData.message.details.amount.toString();
        typedData.message.sigDeadline = typedData.message.sigDeadline.toString();

        const { signature } = await signTypedData(typedData, { address });
        hash = await flaunch.sellCoin(
            {
                coinAddress,
                slippagePercent: 4,
                amountIn: amountInUnits,
                permitSingle,
                signature: signature as Address,
            },
            "V1_1",
        );
    } else {
        hash = await flaunch.sellCoin(
            {
                coinAddress,
                amountIn: amountInUnits,
                slippagePercent: 4,
            },
            "V1_1",
        );
    }

    return await checkTx(hash);
};

export const fetchFeeBalance = async (provider: EIP1193Provider) => {
    const flaunch = flaunchClient(provider);
    const smartWalletClient = await zeroDevSA({ provider });

    return await flaunch.revenueManagerBalance({
        recipient: smartWalletClient.account.address,
        revenueManagerAddress: ENV_SCHEMA.REVENUE_MANAGER_ADDRESS,
    });
};

type claimType = "claim";

export const claimCreatorFees = async (provider: EIP1193Provider) => {
    try {
        const smartWalletClient = await zeroDevSA({ provider });

        const tx = {
            abi: RevenueManagerAbi,
            functionName: "claim" as claimType,
            to: ENV_SCHEMA.REVENUE_MANAGER_ADDRESS,
        };

        return await smartWalletClient.sendTransaction({ calls: [tx] });
    } catch (error: unknown) {
        console.error(error);
        throw new Error((error as Error).message);
    }
};

export const claimApplicationFees = async (provider: EIP1193Provider) => {
    const flaunch = flaunchClient(provider);

    return await flaunch.revenueManagerProtocolClaim({
        revenueManagerAddress: ENV_SCHEMA.REVENUE_MANAGER_ADDRESS,
    });
};
