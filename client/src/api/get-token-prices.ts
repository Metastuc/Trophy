import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Address } from "viem";

import { APPLICATION_CONSTANTS, ENV_SCHEMA } from "@/lib/constants";
// import MoralisClient from "@/lib/moralis";

export function useTokenPrice(address: Address) {
    return useQuery({
        queryKey: ["moralis-token-price", address],
        queryFn: async function () {
            // const moralis = await MoralisClient();

            return await axios
                .get(
                    `https://deep-index.moralis.io/api/v2.2/erc20/${address}/price?chain=${APPLICATION_CONSTANTS.CURRENT_MORALIS_CHAIN}`,
                    {
                        headers: {
                            accept: "application/json",
                            "X-API-Key": ENV_SCHEMA.MORALIS_API_KEY,
                        },
                    },
                )
                .then((response) => response.data);
        },
        refetchInterval: false,
        staleTime: 60_000,
    });
}
