import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { API_ENDPOINTS, CLIENT_CONSTANTS } from "@/lib/constants";
import { makeRequest } from "#~/utils/axios.ts";

export function useTokenPrice(address: Address) {
    return useQuery({
        queryKey: [CLIENT_CONSTANTS.QUERY_KEYS.PRICE.KEY, address],
        queryFn: async function () {
            return await makeRequest<TokenPriceResponse>({
                method: "GET",
                url: API_ENDPOINTS.UTIL.GET_TOKEN_PRICE(address),
            }).then((response) => response.data.data);
        },
        refetchInterval: false,
        staleTime: CLIENT_CONSTANTS.QUERY_KEYS.PRICE.TTL,
    });
}
