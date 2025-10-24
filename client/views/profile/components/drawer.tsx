import { X } from "lucide-react";
import { Fragment } from "react";
import { useShallow } from "zustand/shallow";

import { ARROW_DOWN_FILLED } from "@/assets/icons";
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
import { cn, formatUSD } from "@/lib/utils";

import { useUserProfileDrawerStore } from "../store";
import { Add } from "./add";
import { EditProfile } from "./edit";
import { Withdraw } from "./withdraw";

export function UserProfileDrawer() {
    const { drawerView, closeDrawer } = useUserProfileDrawerStore(
        useShallow((state) => ({
            drawerView: state.drawerView,
            closeDrawer: state.closeDrawer,
        })),
    );

    return (
        <Drawer open={!!drawerView} onOpenChange={(isOpen) => !isOpen && closeDrawer()}>
            <DrawerContent>
                <DrawerHeader
                    className={cn(
                        "flex justify-center",
                        drawerView === "add" ? "items-start" : "items-center",
                        drawerView === "withdraw" ? "flex-row-reverse" : "flex-col",
                    )}
                >
                    <DrawerClose asChild>
                        <Button variant="outline" className="bg-white200 ml-auto size-5 rounded-full p-0">
                            <i className="size-3">
                                <X />
                            </i>
                        </Button>
                    </DrawerClose>

                    <UserProfileDrawerHeader />
                </DrawerHeader>

                <main className={cn(drawerView === "edit" && "overflow-y-auto pb-4")}>
                    <UserProfileDrawerMain />
                </main>

                <DrawerFooter className={cn(drawerView === "edit" && "hidden", drawerView === "add" && "p-1")}>
                    <UserProfileDrawerFooter />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function UserProfileDrawerHeader() {
    const { balanceInToken, balanceInUSD, drawerView, token, totalUsdBalance } = useUserProfileDrawerStore(
        useShallow((state) => ({
            balanceInToken: state.payload?.balanceInToken,
            balanceInUSD: state.payload?.balanceInUSD,
            drawerView: state.drawerView,
            token: state.payload?.token,
            totalUsdBalance: state.totalUsdBalance,
        })),
    );

    switch (drawerView) {
        case "add":
            return (
                <Fragment>
                    <DrawerTitle className="text-blue100 text-xs font-normal">Your balance</DrawerTitle>

                    <DrawerDescription asChild>
                        <section className="flex flex-col p-0">
                            <b className="text-black100 text-left text-2xl font-medium">
                                {balanceInUSD ? formatUSD(balanceInUSD) : totalUsdBalance}
                            </b>

                            <div className=" flex items-center justify-start gap-1">
                                <span className="text-xs text-gray-500">
                                    {balanceInToken} {token}
                                </span>

                                <i className="size-2 rotate-180 text-[#2DC24E]">
                                    <ARROW_DOWN_FILLED />
                                </i>

                                <span className="pt-0.5 text-[.5rem] text-black/50">0.00%</span>
                            </div>
                        </section>
                    </DrawerDescription>
                </Fragment>
            );

        case "earned":
            return (
                <>
                    <DrawerTitle>Claim creator fees</DrawerTitle>
                </>
            );

        case "edit":
            return (
                <Fragment>
                    <DrawerTitle className="text-blue100 text-center font-normal">Edit Profile</DrawerTitle>
                    <DrawerDescription className="max-w-63 text-center text-sm font-light text-[#000000B2]">
                        GM! Kindly input the changes you want to make on your profile below.
                    </DrawerDescription>
                </Fragment>
            );

        case "withdraw":
            return (
                <>
                    <DrawerTitle>Withdraw</DrawerTitle>
                </>
            );

        default:
            return;
    }
}
function UserProfileDrawerMain() {
    const drawerView = useUserProfileDrawerStore((state) => state.drawerView);

    switch (drawerView) {
        case "add":
            return <Add />;

        case "earned":
            return <></>;

        case "edit":
            return <EditProfile />;

        case "withdraw":
            return <Withdraw />;

        default:
            return;
    }
}
function UserProfileDrawerFooter() {
    const drawerView = useUserProfileDrawerStore((state) => state.drawerView);

    switch (drawerView) {
        case "earned":
            return <Button variant="outline">Claim fees</Button>;

        case "withdraw":
            return (
                <Button variant="outline" className="bg-blue100 mt-5 h-13.5 w-full">
                    <span className="text-white">Withdraw</span>
                </Button>
            );

        case "add":
        case "edit":
        default:
            return;
    }
}
