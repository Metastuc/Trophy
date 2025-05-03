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

import DefaultButtons from "./components/buttons";
import { AuthenticationReducer } from "./utils";

export default function Component() {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
    const [state, dispatch] = React.useReducer(AuthenticationReducer, { authOption: "default" });

    function render() {
        switch (state.authOption) {
            case "default":
                return <DefaultButtons dispatch={dispatch} />;

            default:
                return null;
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
                <DrawerHeader>
                    <DrawerTitle className="text-center font-normal">Log in or sign up</DrawerTitle>

                    <DrawerDescription className="text-center mt-7.5 font-light text-black200">
                        welcome to <span className="font-normal text-black100">trophy</span>.
                        Continue with <span className="font-normal text-black100">farcaster</span>,
                        your <span className="font-normal text-black100">wallet</span> or sign up
                        with your <span className="font-normal text-black100">email</span>
                    </DrawerDescription>
                </DrawerHeader>

                {render()}

                <DrawerFooter>
                    <DrawerClose onClick={() => setIsDrawerOpen(false)}>
                        <Button variant="default" className="w-1/2 bg-blue100">
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
