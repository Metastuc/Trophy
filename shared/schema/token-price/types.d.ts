import type { GetTokenPriceResponseAdapter } from "@moralisweb3/common-evm-utils";

declare global {
    type TokenPriceData = GetTokenPriceResponseAdapter["raw"];
    type TokenPriceResponse = ApiResponse<TokenPriceData>;
}

export {};
