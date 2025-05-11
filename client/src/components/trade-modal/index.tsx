import React from "react";

import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import Footer from "./components/footer";
import Header from "./components/header";
import Main from "./components/main";
import { TradeCreatorTokenContext } from "./hook";

export default function Component() {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const contextValue: iTradeCreatorTokenContext = {
        setIsOpen,
        token: "token",
    };

    return (
        <TradeCreatorTokenContext.Provider value={contextValue}>
            <AlertDialog open={!isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger asChild>
                    <Button variant="default" className="bg-green100 h-6 w-15 rounded-[.125rem]">
                        <span className="text-green200 capitalize">trade</span>
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="gap-8 rounded-none border-none p-0">
                    <Header />
                    <Main />
                    <Footer />
                </AlertDialogContent>
            </AlertDialog>
        </TradeCreatorTokenContext.Provider>
    );
}
