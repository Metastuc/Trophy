import React from "react";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import RenderMain from "./components/main";
import { TradeCreatorTokenContext } from "./hooks";

export default function Component() {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const contextValue: iTradeCreatorTokenContext = {
        setIsOpen,
        token: "token",
    };

    return (
        <TradeCreatorTokenContext.Provider value={contextValue}>
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <Button variant="default" className="bg-green100 h-6 w-15 rounded-[.125rem]">
                        <span className="text-green200 capitalize">trade</span>
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="">
                    <DrawerHeader>
                        <DrawerTitle>Trade</DrawerTitle>
                        <DrawerDescription>
                            Kindly select the token you wish to trade {contextValue.token} with
                            below
                        </DrawerDescription>
                    </DrawerHeader>

                    <main>
                        <RenderMain />
                    </main>

                    <DrawerFooter>
                        <Button>
                            <span className="capitalize">swap</span>
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </TradeCreatorTokenContext.Provider>
    );
}
