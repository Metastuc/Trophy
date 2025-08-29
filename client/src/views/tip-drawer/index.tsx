import { CircleDollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";

import { logger } from "@/utils/logger";
import { TipDrawerContextProvider } from "./context";
import { useTipDrawerContext } from "./hooks";

export function TipDrawer(props: TipDrawer) {
    logger({ props });

    return (
        <TipDrawerContextProvider {...props}>
            <TipDrawerInner />
        </TipDrawerContextProvider>
    );
}

function TipDrawerInner() {
    const { closeDrawer, isDrawerOpen, openDrawer, streamerWalletAddress } = useTipDrawerContext();

    logger({ streamerWalletAddress });

    return (
        <Drawer open={isDrawerOpen} onOpenChange={(isOpen) => (isOpen ? openDrawer() : closeDrawer())}>
            <DrawerTrigger asChild>
                <Button
                    variant="default"
                    className="flex h-6 w-20 items-center justify-center gap-1 rounded bg-gradient-to-b from-[#2D57FF] to-[#1B3499] p-0 text-white"
                >
                    <i className="size-4">
                        <CircleDollarSign />
                    </i>
                    <span className="pt-0.5 text-xs">Send tip</span>
                </Button>
            </DrawerTrigger>
        </Drawer>
    );
}
