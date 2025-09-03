import { getAccessToken, usePrivy } from "@privy-io/react-auth";
import { ReactNode, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { authenticateUser } from "@/api/authenticate-user";
import {
    useAuthenticationDrawerFormStore,
    useAuthenticationDrawerNavigationStore,
    useAuthenticationDrawerStateStore,
} from "@/views/authentication-drawer/store";
import { useAuthenticationStore } from "#~/store/authentication.ts";
import { sleep } from "#~/utils/sleep.ts";

export function AuthenticationProvider({ children }: { children: ReactNode }) {
    const { authenticated, ready, user: privyUser } = usePrivy();

    const lastFetchedUserIdRef = useRef<string | null>(null);

    const goToFinish = useAuthenticationDrawerNavigationStore((state) => state.goToFinish);
    const openDrawer = useAuthenticationDrawerStateStore((state) => state.openDrawer);

    const { setIsNewUser, setFormField } = useAuthenticationDrawerFormStore(
        useShallow((state) => ({ setIsNewUser: state.setIsNewUser, setFormField: state.setField })),
    );

    const { setIsLoading, setToken, setUser } = useAuthenticationStore(
        useShallow((state) => ({
            setIsLoading: state.setIsLoading,
            setToken: state.setToken,
            setUser: state.setUser,
        })),
    );

    useEffect(
        function () {
            if (!ready) {
                console.log("⏸️ Privy not ready yet");
                return;
            }

            if (!authenticated || !privyUser) {
                console.log("⏸️ User not authenticated or no privyUser");

                console.log("⏸️ Blocked bootstrap because:", {
                    reason: !authenticated ? "Not authenticated" : "No privyUser",
                    authenticated,
                    privyUser,
                });

                lastFetchedUserIdRef.current = null;
                setIsLoading(false);
                return;
            }

            if (!privyUser.wallet?.address) {
                console.warn("User has no wallet yet, skipping auth bootstrap...");
                return;
            }

            if (lastFetchedUserIdRef.current === privyUser.id) {
                console.log("⏸️ Already fetched user, skipping");
                return;
            }
            lastFetchedUserIdRef.current = privyUser.id;

            console.log("✅ Running authenticateUser flow");
            (async function () {
                try {
                    setIsLoading(true);

                    const accessToken = await getAccessToken().catch((err) => {
                        console.error("❌ Failed to get access token:", err);
                        throw err;
                    });

                    setToken(accessToken as string);

                    const response = await authenticateUser();
                    if (!response) {
                        setIsNewUser(true);

                        setFormField("bio", privyUser.farcaster?.bio || null);
                        setFormField("email", privyUser.email?.address || null);
                        setFormField("fc", !!privyUser.farcaster);
                        setFormField("privyId", privyUser.id || null);
                        setFormField("profilePicture", privyUser.farcaster?.pfp || "default-pfp.svg");
                        setFormField("username", privyUser.farcaster?.username || null);
                        setFormField("walletAddress", privyUser.wallet?.address || null);

                        await sleep(3000);
                        goToFinish();
                        openDrawer();
                        return;
                    }

                    const backendUserData = response.data;

                    if (!backendUserData?.isBasicProfileComplete) {
                        setIsNewUser(false);

                        setFormField("bio", backendUserData?.user.bio || null);
                        setFormField("email", backendUserData?.user.email || null);
                        setFormField("profilePicture", backendUserData?.user.profilePicture || null);
                        setFormField("username", backendUserData?.user.username || null);

                        await sleep(3000);
                        goToFinish();
                        openDrawer();
                    }

                    setUser({ ...privyUser, backendUserData: response.data });
                } catch (error) {
                    toast.error((error as Error).message);
                } finally {
                    setIsLoading(false);
                }
            })();
        },
        [
            authenticated,
            privyUser,
            ready,
            goToFinish,
            openDrawer,
            setFormField,
            setIsLoading,
            setIsNewUser,
            setToken,
            setUser,
        ],
    );

    return children;
}
