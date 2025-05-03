import React from "react";

import { EMAIL, FARCASTER, WALLET } from "./icons";
import { Button } from "./ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer";

interface iAuthenticationButton {
    label: string;
    icon: () => React.ReactNode;
}

const BUTTONS: Array<iAuthenticationButton> = [
    {
        icon: FARCASTER,
        label: "Continue with farcaster",
    },
    {
        icon: WALLET,
        label: "Login with wallet",
    },
    {
        icon: EMAIL,
        label: "Continue with email",
    },
];

export default function Component() {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    return (
        <Drawer dismissible={false} open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
                <Button className="rounded-sm h-6 w-15 bg-blue100">
                    <span className="text-xs">login</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[]">
                <DrawerHeader>
                    <DrawerTitle className="text-center font-normal">Log in or sign up</DrawerTitle>
                    <DrawerDescription className="text-center mt-7.5 font-light text-black200">
                        welcome to <span className="font-normal text-black100">trophy</span>.
                        Continue with <span className="font-normal text-black100">farcaster</span>,
                        your <span className="font-normal text-black100">wallet</span> or sign up
                        with your <span className="font-normal text-black100">email</span>
                    </DrawerDescription>
                </DrawerHeader>

                <section className="flex flex-col gap-5 p-4">
                    {BUTTONS.map((button, index) => (
                        <AuthenticationButton key={index} {...button} />
                    ))}
                </section>

                <DrawerFooter>
                    <DrawerClose onClick={() => setIsDrawerOpen(false)}>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function AuthenticationButton({ icon, label }: iAuthenticationButton) {
    return (
        <Button
            variant="outline"
            className="border-blue100/30 border h-15 flex justify-start items-center"
        >
            <i className="size-7">{icon()}</i>
            <span className="text-sm">{label}</span>
        </Button>
    );
}
