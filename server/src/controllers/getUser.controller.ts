import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { db } from '../utils/firebase.js';
import { getEpicStream } from './epicStream.controller.js';
import { ethers, Network } from "ethers";
import { erc20ABI } from "../utils/ERC20ABI.js";
// import { createFlaunch, ReadFlaunchSDK } from "@flaunch/sdk";
// import { createPublicClient, createWalletClient, http } from "viem";
// import { privateKeyToAccount } from 'viem/accounts';
// import { baseSepolia } from "viem/chains";

interface TopHolderInfo {
    holder: string;
    amount: bigint;
    percentage: number;
}

interface UserResponse {
    totalStreams: number;
    epicStream: string | null;
    topHolders: TopHolderInfo[];
    username: string;
    pfp: string;
}

const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
};

// const getTokenInfo = async (tokenAddress: string): Promise<string> => {
//     const publicClient = createPublicClient({
//         chain: baseSepolia,
//         transport: http(),
//     });

//     const flaunchRead = createFlaunch({ publicClient }) as ReadFlaunchSDK;

//     const formattedAddress = tokenAddress.startsWith('0x') ? tokenAddress.slice(2) : tokenAddress;
//     const marketCap = await flaunchRead.coinMarketCapInUSD({ coinAddress: `0x${formattedAddress}` });
//     return marketCap;
// };

export const getUser = async (
    req: Request,
    res: Response<TypedResponse<UserResponse>>
): Promise<void> => {
    try {
        const { address } = req.body;

        if (!address) {
            res.status(400).json({
                status: "error",
                message: "Address is required"
            });
            return;
        }

        // Get user data from Firestore
        const userQuery = await db.collection('users')
            .where('address', '==', address)
            .limit(1)
            .get();

        if (userQuery.empty) {
            res.status(404).json({
                status: "error",
                message: "User not found"
            });
            return;
        }

        const userData = userQuery.docs[0].data();
        const totalStreams = userData.totalStreams || 0;
        const creatorToken = userData.creatorToken;
        const username = userData.username;
        const pfp = userData.uploadedPfp;

        // Get epic stream value and format it
        const epicStreamValue = await getEpicStream(address);
        const epicStream = epicStreamValue !== null ? formatNumber(epicStreamValue) : null;

        // Get token total supply and holder information
        let topHolders: TopHolderInfo[] = [];
        if (creatorToken) {
            const baseSepolia = new Network("base-sepolia", 84532);
            const provider = new ethers.JsonRpcProvider("https://sepolia.base.org", baseSepolia);
            const tokenContract = new ethers.Contract(creatorToken, erc20ABI, provider);
            
            // Get total supply
            const totalSupply = await tokenContract.totalSupply();
            
            // Get holder information
            const rawTopHolders = userData.topHolders || [];
            
            // Get user information for each holder
            const holderPromises = rawTopHolders.map(async (holder: { holder: string; amount: bigint }) => {
                const percentage = Number(holder.amount * BigInt(10000) / totalSupply) / 100; // Calculate percentage with 2 decimal places

                return {
                    holder: holder.holder,
                    amount: holder.amount,
                    percentage
                };
            });

            topHolders = await Promise.all(holderPromises);
        }

        res.status(200).json({
            status: "success",
            data: {
                totalStreams,
                epicStream,
                topHolders,
                username,
                pfp
            }
        });
    } catch (error) {
        console.error("Error in getUser:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to get user data"
        });
    }
};