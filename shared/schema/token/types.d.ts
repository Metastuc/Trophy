import type { GetTokenPriceResponseAdapter } from "@moralisweb3/common-evm-utils";
import { z } from "zod";

import { CREATE_TOKEN_URI_RESPONSE_SCHEMA } from ".";

declare global {
    type CreateTokenUriData = z.infer<typeof CREATE_TOKEN_URI_RESPONSE_SCHEMA>;
    type CreateTokenUriResponse = ApiResponse<CreateTokenUriData>;

    type TokenPriceData = GetTokenPriceResponseAdapter["raw"];
    type TokenPriceResponse = ApiResponse<TokenPriceData>;
}

export {};
