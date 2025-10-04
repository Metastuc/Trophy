import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { API_ENDPOINTS } from "@/lib/constants";
import { makeRequest } from "#~/utils/axios.ts";
import { toTime } from "#~/utils/time.ts";

export function useTokenPrice(address: Address) {
    return useQuery({
        queryKey: ["moralis-token-price", address],
        queryFn: async function () {
            return await makeRequest<TokenPriceResponse>({
                method: "GET",
                url: API_ENDPOINTS.UTIL.GET_TOKEN_PRICE(address),
            }).then((response) => response.data.data);
        },
        refetchInterval: false,
        staleTime: toTime({ unit: "hours", value: 1, output: "milliseconds" }),
    });
}
