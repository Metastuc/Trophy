import type { GetTokenPriceResponseAdapter } from "@moralisweb3/common-evm-utils";

declare global {
    type TokenPriceData = GetTokenPriceResponseAdapter["result"];
    type TokenPriceResponse = ApiResponse<GetTokenPriceResponseAdapter["result"]>;
}

export {};
