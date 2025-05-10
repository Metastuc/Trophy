import { useLogin, useLoginWithEmail } from "@privy-io/react-auth";
import React from "react";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { sleep } from "@/lib/utils";

import { EMAIL, PRIVY } from "../icons";
import DefaultButtons from "./components/buttons";
import EmailAuthentication from "./components/email";
import OtpAuthentication from "./components/otp";
import { AuthenticationReducer } from "./utils";

export default function Component() {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
    const hasLoggedInRef = React.useRef<boolean>(false);

    const [state, dispatch] = React.useReducer(AuthenticationReducer, {
        type: "default",
        screenStack: ["default"],
    });

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

    const { login } = useLogin({
        onComplete({ user, isNewUser }) {
            console.log("Login successful:", { user, isNewUser });
            setIsDrawerOpen(false);
            dispatch({ type: "GO_TO_DEFAULT" });
        },
        onError(error) {
            console.error("Wallet error:", error);

            if (error.includes("exited")) {
                dispatch({ type: "GO_TO_DEFAULT" });
            }
        },
    });

    React.useEffect(() => {
        if (state.type === "wallet" && !hasLoggedInRef.current) {
            hasLoggedInRef.current = true;
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
                        <i className="text-black size-10">{EMAIL()}</i>
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
                    <DrawerDescription className="text-center mt-7.5 font-light text-black200">
                        welcome to <span className="font-normal text-black100">trophy</span>.
                        Continue with <span className="font-normal text-black100">farcaster</span>,
                        your <span className="font-normal text-black100">wallet</span> or sign up
                        with your <span className="font-normal text-black100">email</span>
                    </DrawerDescription>
                );

            case "email":
            case "farcaster":

            case "otp":
                return (
                    <DrawerDescription className="text-center font-light text-black200">
                        Please check{" "}
                        <span className="font-normal text-black100">{state.email}</span> for an
                        email from <span className="font-normal text-black100">privy.io</span> and
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

    return (
        <Drawer dismissible={false} open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
                <Button className="rounded-sm h-6 w-15 bg-blue100">
                    <span className="text-xs">login</span>
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerFooter className="flex items-center justify-between flex-row">
                    {state.type !== "default" && state.type !== "wallet" ? (
                        <Button
                            variant="ghost"
                            className="border border-blue100 text-blue100 hover:bg-blue100/10"
                            onClick={() => dispatch({ type: "BACK" })}
                        >
                            Back
                        </Button>
                    ) : null}

                    <DrawerClose asChild onClick={handleDrawerState}>
                        <Button variant="default" className=" bg-blue100 ml-auto">
                            Cancel
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
