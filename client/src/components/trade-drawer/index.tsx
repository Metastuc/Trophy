import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import Header from "./components/header";
import { TradeCreatorTokenContext } from "./hook";

export default function Component() {
    const contextValue: iTradeCreatorTokenContext = {
        username: "@defaultUser",
        title: "Default Stream",
        watching: 0,
    };

    return (
        <TradeCreatorTokenContext.Provider value={contextValue}>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="default" className="bg-green100 h-6 w-15 rounded-[.125rem]">
                        <span className="text-green200 capitalize">trade</span>
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <Header />
                </AlertDialogContent>
            </AlertDialog>
        </TradeCreatorTokenContext.Provider>
    );
}

function _() {
    return (
        <>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove your data from our servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </>
    );
}
