import { createPublicClient, http, PublicClient } from "viem";

import { SERVER_CONSTANTS } from "./constants";

export const client = createPublicClient({
    chain: SERVER_CONSTANTS.CURRENT_NETWORK,
    transport: http(),
}) as PublicClient;
