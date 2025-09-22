import { X } from "lucide-react";
import { Fragment } from "react";
import { useShallow } from "zustand/shallow";

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
import { cn } from "@/lib/utils";

import { useUserProfileDrawerStore } from "../store";
import { Add } from "./add";
import { EditProfile } from "./edit";

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
                    className={cn("flex justify-center", drawerView === "add" ? "items-start" : "items-center")}
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

                <main>
                    <UserProfileDrawerMain />
                </main>

                <DrawerFooter className={cn(drawerView === "edit" && "pt-2", drawerView === "add" && "p-1")}>
                    <UserProfileDrawerFooter />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function UserProfileDrawerHeader() {
    const drawerView = useUserProfileDrawerStore((state) => state.drawerView);

    switch (drawerView) {
        case "add":
            return (
                <>
                    <DrawerTitle>Your balance</DrawerTitle>
                </>
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
                    <DrawerDescription className="max-w-[15.75rem] text-center text-sm font-light text-[#000000B2]">
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
            return <></>;

        default:
            return;
    }
}
function UserProfileDrawerFooter() {
    const drawerView = useUserProfileDrawerStore((state) => state.drawerView);

    switch (drawerView) {
        case "earned":
            return <Button variant="outline">Claim fees</Button>;

        case "edit":
            return (
                <DrawerClose asChild>
                    <Button className="w-full rounded tracking-[.0625rem]" variant={"outline"}>
                        Cancel
                    </Button>
                </DrawerClose>
            );

        case "withdraw":
            return <Button variant="outline">Withdraw</Button>;

        case "add":
        default:
            return;
    }
}
