import { isAddress } from "viem";
import { z } from "zod";

export const CREATE_TOKEN_URI_RESPONSE_SCHEMA = z.object({
    tokenUri: z.string(),
});

export const GET_TOKEN_PRICE_REQUEST_SCHEMA = z.object({
    address: z.string().refine(isAddress, "Invalid token address"),
});
