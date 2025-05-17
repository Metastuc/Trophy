import { useLogin, useLoginWithEmail } from "@privy-io/react-auth";
import React from "react";

import { BACK, CLOSE, EMAIL, PRIVY } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { cn, sleep } from "@/lib/utils";

import { useAuthenticationContext } from "@/contexts/authentication";
import { Loader } from "lucide-react";
import DefaultButtons from "./components/buttons";
import EmailAuthentication from "./components/email";
import OtpAuthentication from "./components/otp";
import { AuthenticationReducer } from "./utils";

export default function Component() {
    const { isAuthenticated, logout, user } = useAuthenticationContext();
    console.log({ isAuthenticated, user });

    const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

    const [drawerState, setDrawerState] = React.useState(() => ({
        isDrawerOpen: false,
        isLoggingOut: false,
    }));

    const hasLoggedInRef = React.useRef<boolean>(false);

    const [state, dispatch] = React.useReducer(AuthenticationReducer, {
        type: "default",
        screenStack: ["default"],
    });

    /**
     * authenticate with otp
     */
    const {
        loginWithCode,
        sendCode,
        state: otpFlow,
    } = useLoginWithEmail({
        onComplete({ user, isNewUser }) {
            console.log("Login successful:", { user, isNewUser });
        },
        onError(error) {
            console.error("Email error:", error);

            if (error.includes("exited")) {
                dispatch({ type: "GO_TO_DEFAULT" });
            }
        },
    });

    /**
     * authenticate with wallet
     */
    const { login } = useLogin({
        onComplete({ user, isNewUser }) {
            console.log("Login successful:", { user, isNewUser });
            dispatch({ type: "GO_TO_DEFAULT" });
            setIsDrawerOpen(false);
        },
        onError(error) {
            console.error("Wallet error:", error);

            if (error.includes("exited")) {
                dispatch({ type: "GO_TO_DEFAULT" });
            }
            setIsDrawerOpen(true);
        },
    });

    React.useEffect(() => {
        if (state.type === "wallet" && !hasLoggedInRef.current) {
            hasLoggedInRef.current = true;
            setIsDrawerOpen(false);

            login({
                loginMethods: ["wallet"],
                walletChainType: "ethereum-only",
            });
        }

        if (state.type !== "wallet") {
            hasLoggedInRef.current = false;
        }
    }, [state.type, login]);

    async function handleDrawerState() {
        if (isDrawerOpen) {
            setIsDrawerOpen(false);

            await sleep(150);
            dispatch({ type: "GO_TO_DEFAULT" });
        } else {
            setIsDrawerOpen(true);
        }
    }

    function renderHeader() {
        switch (state.type) {
            case "default":
                return (
                    <DrawerTitle className="text-center font-normal">Log in or sign up</DrawerTitle>
                );

            case "email":
                return (
                    <DrawerTitle className="text-center font-normal">
                        Log in or sign up with email
                    </DrawerTitle>
                );

            case "farcaster":

            case "otp":
                return (
                    <DrawerTitle className="text-center font-normal">
                        <i className="size-10 text-black">{EMAIL()}</i>
                    </DrawerTitle>
                );

            case "wallet":
                return;
        }
    }

    function renderDescription() {
        switch (state.type) {
            case "default":
                return (
                    <DrawerDescription className="text-black200 mt-7.5 text-center font-light">
                        welcome to <span className="text-black100 font-normal">trophy</span>.
                        Continue with <span className="text-black100 font-normal">farcaster</span>,
                        your <span className="text-black100 font-normal">wallet</span> or sign up
                        with your <span className="text-black100 font-normal">email</span>
                    </DrawerDescription>
                );

            case "email":
            case "farcaster":

            case "otp":
                return (
                    <DrawerDescription className="text-black200 text-center font-light">
                        Please check{" "}
                        <span className="text-black100 font-normal">{state.email}</span> for an
                        email from <span className="text-black100 font-normal">privy.io</span> and
                        enter your code below.
                    </DrawerDescription>
                );

            case "wallet":
                return;
        }
    }

    function renderBody() {
        switch (state.type) {
            case "default":
                return <DefaultButtons dispatch={dispatch} />;

            case "email":
                return <EmailAuthentication dispatch={dispatch} sendCode={sendCode} />;

            case "farcaster":
            case "otp":
                return (
                    <OtpAuthentication
                        email={state.email as string}
                        isSubmitting={otpFlow.status === "submitting-code"}
                        onSubmit={(code: string) => {
                            loginWithCode({ code });
                        }}
                        onResend={() => sendCode({ email: state.email as string })}
                    />
                );

            case "wallet":
                return;
        }
    }

    async function handleAuthentication() {
        if (isAuthenticated) {
            setDrawerState((previous) => ({ ...previous, isLoggingOut: true }));

            try {
                await logout();
            } catch (error) {
                console.error("Logout error:", error);
            } finally {
                setDrawerState((previous) => ({ ...previous, isLoggingOut: false }));
            }
        } else {
            setIsDrawerOpen(true);
        }
    }

    return (
        <Drawer dismissible={false} open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <Button
                className={cn("bg-blue100 h-6 w-15 rounded-[.125rem]")}
                onClick={handleAuthentication}
                disabled={drawerState.isLoggingOut}
            >
                <span className="text-xs">
                    {drawerState.isLoggingOut ? (
                        <i className="size-4">
                            <Loader className="animate-spin" />
                        </i>
                    ) : isAuthenticated ? (
                        "Log out"
                    ) : (
                        "Log in"
                    )}
                </span>
            </Button>

            <DrawerContent>
                <DrawerFooter className="flex flex-row items-center justify-between">
                    {state.type !== "default" && state.type !== "wallet" ? (
                        <Button
                            variant="outline"
                            className="bg-white200 mr-auto size-5 rounded-full p-0"
                            onClick={() => dispatch({ type: "BACK" })}
                        >
                            <i className="size-3">{BACK()}</i>
                        </Button>
                    ) : null}

                    <DrawerClose asChild onClick={handleDrawerState}>
                        <Button
                            variant="outline"
                            className="bg-white200 ml-auto size-5 rounded-full p-0"
                        >
                            <i className="size-3">{CLOSE()}</i>
                        </Button>
                    </DrawerClose>
                </DrawerFooter>

                <DrawerHeader>
                    {renderHeader()}
                    {renderDescription()}
                </DrawerHeader>

                <section className="flex flex-col gap-5 p-4">{renderBody()}</section>

                <i className="my-4">
                    <a href="https://privy.io/" target="_blank">
                        {PRIVY()}
                    </a>
                </i>
            </DrawerContent>
        </Drawer>
    );
}
