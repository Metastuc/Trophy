// import { makeRequest } from "#~/utils/axios.ts";
// import { API_ENDPOINTS } from "@/lib/constants";
// import { useQuery } from "@tanstack/react-query";

// export function useTrophyCreatorTokens() {
//     return useQuery({
//         queryKey: ["trophyCreatorTokens"],
//         queryFn: async function () {
//             return await makeRequest({
//                 url: API_ENDPOINTS.TOKEN.GET_ALL_TOKENS,
//                 method: "GET",
//             }).then((response) => response.data.data);
//         },
//     });
// }
