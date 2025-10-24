import { sdk } from "@farcaster/miniapp-sdk";
import { ReactNode, useEffect } from "react";

export function FarcasterMiniAppProvider({ children }: { children: ReactNode }) {
    useEffect(function () {
        (async function () {
            await sdk.actions.ready();
        })();
    }, []);

    return children;
}

// import sdk from "@farcaster/miniapp-sdk";
// import { usePrivy } from "@privy-io/react-auth";
// import { useLoginToMiniApp } from "@privy-io/react-auth/farcaster";
// import { ReactNode, useEffect } from "react";

// export function FarcasterMiniAppProvider({ children }: { children: ReactNode }) {
//     const { ready, authenticated } = usePrivy();
//     const { initLoginToMiniApp, loginToMiniApp } = useLoginToMiniApp();

//     useEffect(
//         function () {
//             if (ready || !authenticated)
//                 (async function () {
//                     const { nonce } = await initLoginToMiniApp();
//                     const result = await sdk.actions.signIn({ nonce });

//                     await loginToMiniApp({
//                         message: result.message,
//                         signature: result.signature,
//                     });
//                 })();
//         },
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         [ready, authenticated],
//     );

//     return children;
// }
