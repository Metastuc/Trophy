import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { db } from '../utils/firebase.js';
import { ethers, Network } from "ethers";
import { erc20ABI } from "../utils/ERC20ABI.js";
import Moralis from 'moralis';
import dotenv from 'dotenv';

dotenv.config();

interface TokenBalance {
    symbol: string;
    balance: string;
    usdValue: number;
    priceChange24h: string | undefined;
}

interface ProfileResponse {
    username: string;
    uploadedPfp: string;
    bio: string;
    tokenBalances: TokenBalance[];
    totalUsdValue: number;
}



export const getProfile = async (
    req: Request,
    res: Response<TypedResponse<ProfileResponse>>
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
        const { username, uploadedPfp, bio } = userData;

        // Initialize token balances array
        let tokenBalances: TokenBalance[] = [];
        let totalUsdValue = 0;

        // Hardcoded tokens array with decimals and addresses
        const tokens = [
            { 
                testnetAddress: "0xd08d9ff04a610897106A2B5bbE715F0BEA64217F", 
                mainnetAddress: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed",
                symbol: "DEGEN", 
                decimals: 18 
            },
            { 
                testnetAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", 
                mainnetAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
                symbol: "USDC", 
                decimals: 6 
            }
        ];

        // Get balances for each token
        const baseSepolia = new Network("base-sepolia", 84532);
        const provider = new ethers.JsonRpcProvider("https://sepolia.base.org", baseSepolia);

        // Get ETH balance
        const ethBalance = await provider.getBalance(address);
        const formattedEthBalance = ethers.formatEther(ethBalance);

        // Get ETH price
        const ethPriceResponse = await Moralis.EvmApi.token.getTokenPrice({
            chain: "0x2105",
            include: "percent_change",
            address: "0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A"
        });

        const ethUsdPrice = ethPriceResponse.raw.usdPrice;
        const ethUsdValue = parseFloat(formattedEthBalance) * ethUsdPrice;

        // Get balances and prices for each token
        const balancePromises = tokens.map(async (token: { 
            testnetAddress: string; 
            mainnetAddress: string;
            symbol: string; 
            decimals: number 
        }) => {
            const tokenContract = new ethers.Contract(token.testnetAddress, erc20ABI, provider);
            const balance = await tokenContract.balanceOf(address);
            const formattedBalance = ethers.formatUnits(balance, token.decimals);

            // Get token price
            const priceResponse = await Moralis.EvmApi.token.getTokenPrice({
                chain: "0x2105",
                include: "percent_change",
                address: token.mainnetAddress
            });

            const usdPrice = priceResponse.raw.usdPrice;
            const priceChange24h = priceResponse.raw["24hrPercentChange"] || undefined;
            const usdValue = parseFloat(formattedBalance) * usdPrice;

            return {
                symbol: token.symbol,
                balance: formattedBalance,
                usdValue,
                priceChange24h
            };
        });

        tokenBalances = [
            { 
                symbol: "ETH", 
                balance: formattedEthBalance, 
                usdValue: ethUsdValue,
                priceChange24h: ethPriceResponse.raw["24hrPercentChange"] ? ethPriceResponse.raw["24hrPercentChange"] : undefined
            },
            ...(await Promise.all(balancePromises))
        ];

        // Calculate total USD value
        totalUsdValue = tokenBalances.reduce((sum, token) => sum + token.usdValue, 0);

        res.status(200).json({
            status: "success",
            data: {
                username,
                uploadedPfp,
                bio: bio || "",
                tokenBalances,
                totalUsdValue
            }
        });
    } catch (error) {
        console.error("Error in getProfile:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to get profile data"
        });
    }
};