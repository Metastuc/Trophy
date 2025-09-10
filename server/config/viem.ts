import { createPublicClient, http } from "viem";

import { SERVER_CONSTANTS } from "./constants";

export const client = createPublicClient({
    chain: SERVER_CONSTANTS.CURRENT_NETWORK,
    transport: http(),
});
