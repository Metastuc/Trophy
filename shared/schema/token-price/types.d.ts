import type { GetTokenPriceResponseAdapter } from "@moralisweb3/common-evm-utils";

declare global {
    type TokenPriceData = GetTokenPriceResponseAdapter["raw"];
    type TokenPriceResponse = ApiResponse<TokenPriceData>;

    type ETHPriceData = {
        ethereum: {
            usd: number;
        };
    };
    type ETHPriceResponse = ApiResponse<ETHPriceData>;
}

export {};
