import { createFlaunch, ReadWriteFlaunchSDK } from "@flaunch/sdk";
import { useMemo } from "react";

import { getWalletClient, publicClient } from "./viem";

// let fClient: ReadWriteFlaunchSDK | undefined;
// let previousAddress: Address | undefined;

// function flaunchClient({ address, provider }: GetWalletClient) {
//     if (!fClient || previousAddress !== address) {
//         fClient = createFlaunch({
//             publicClient,
//             walletClient: getWalletClient({ address, provider }),
//         }) as ReadWriteFlaunchSDK;

//         previousAddress = address;
//     }

//     return fClient;
// }

function useFlaunchClient({ address, provider }: GetWalletClient) {
    return useMemo(
        function () {
            if (!address || !provider) return null;

            return createFlaunch({
                publicClient,
                walletClient: getWalletClient({ address, provider }),
            }) as ReadWriteFlaunchSDK;
        },
        [address, provider],
    );
}
