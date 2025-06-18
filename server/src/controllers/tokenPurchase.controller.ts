import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { ethers, Network } from "ethers";
import { db } from "../utils/firebase.js";
import { erc20ABI } from "../utils/ERC20ABI.js";

interface TopHolder {
  holder: string;
  amount: bigint;
}

export const tokenPurchase = async (
  req: Request,
  res: Response<TypedResponse<{ message?: string }>>,
): Promise<void> => {
  try {
    const baseSepolia = new Network("base-sepolia", 84532);
    const provider = new ethers.JsonRpcProvider("https://sepolia.base.org", baseSepolia);
    const { buyer, token, amount } = req.body;

    // check user balance
    const tokenContract = new ethers.Contract(token, erc20ABI, provider);
    const balance = await tokenContract.balanceOf(buyer);
    const buyerBalance = amount + balance;

    // Find the user document with matching creatorToken
    const userQuery = await db.collection("users").where("creatorToken", "==", token).limit(1).get();

    if (userQuery.empty) {
      res.status(404).json({
        status: "error",
        message: "No user found with this creator token",
      });
      return;
    }

    const userDoc = userQuery.docs[0];
    const userData = userDoc.data();
    const topHolders: TopHolder[] = userData.topHolders || [];

    // Create new holder entry
    const newHolder: TopHolder = {
      holder: buyer,
      amount: buyerBalance,
    };

    // Add new holder to array and sort in descending order
    topHolders.push(newHolder);
    topHolders.sort((a, b) => {
      if (a.amount > b.amount) return -1;
      if (a.amount < b.amount) return 1;
      return 0;
    });

    // Keep only top 10 holders if needed
    const updatedTopHolders = topHolders.slice(0, 4);

    // Update the document with new topHolders array
    await userDoc.ref.update({
      topHolders: updatedTopHolders,
    });

    res.status(201).json({
      status: "success",
      message: "Top holders updated successfully",
    });
  } catch (error) {
    console.error("Error in tokenPurchase:", error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to process token purchase",
    });
  }
};
