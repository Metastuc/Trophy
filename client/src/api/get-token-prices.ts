import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { APPLICATION_CONSTANTS } from "@/lib/constants";
import MoralisClient from "@/lib/moralis";

export function useTokenPrice(address: Address) {
    return useQuery({
        queryKey: ["moralis-token-price", address],
        queryFn: async function () {
            const moralis = await MoralisClient();

            return await moralis.EvmApi.token
                .getTokenPrice({
                    chain: APPLICATION_CONSTANTS.CURRENT_MORALIS_CHAIN,
                    address,
                })
                .then((response) => response.result);
        },
        refetchInterval: false,
        staleTime: 60_000,
    });
}
