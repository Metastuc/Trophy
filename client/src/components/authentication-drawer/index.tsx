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

import React from "react";

import { EMAIL } from "../icons";
import DefaultButtons from "./components/buttons";
import EmailAuthentication from "./components/email";
import OtpAuthentication from "./components/otp";
import { AuthenticationReducer } from "./utils";

export default function Component() {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
    const [state, dispatch] = React.useReducer(AuthenticationReducer, {
        type: "default",
        screenStack: ["default"],
    });

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
        }
    }

    function renderBody() {
        switch (state.type) {
            case "default":
                return <DefaultButtons dispatch={dispatch} />;

            case "email":
                return <EmailAuthentication dispatch={dispatch} />;

            case "farcaster":
            case "otp":
                return <OtpAuthentication email={state.email as string} isSubmitting />;

            case "wallet":
        }
    }

    return (
        <Drawer dismissible={false} open={!isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
                <Button className="rounded-sm h-6 w-15 bg-blue100">
                    <span className="text-xs">login</span>
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    {renderHeader()}
                    {renderDescription()}
                </DrawerHeader>

                <section className="flex flex-col gap-5 p-4">{renderBody()}</section>

                <DrawerFooter className="flex items-center justify-center flex-row">
                    {state.type !== "default" ? (
                        <Button
                            variant="ghost"
                            className="w-1/2 border border-blue100 text-blue100 hover:bg-blue100/10"
                            onClick={() => dispatch({ type: "BACK" })}
                        >
                            Back
                        </Button>
                    ) : null}

                    <DrawerClose asChild onClick={() => setIsDrawerOpen(false)}>
                        <Button variant="default" className="w-1/2 bg-blue100">
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
