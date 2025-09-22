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
    DrawerTrigger,
} from "@/components/ui/drawer";

import { useUserProfileDrawerStore } from "../store";

export function UserProfileDrawer() {
    const { drawerView, closeDrawer } = useUserProfileDrawerStore(
        useShallow((state) => ({
            drawerView: state.drawerView,
            closeDrawer: state.closeDrawer,
        })),
    );

    return (
        <Drawer open={!!drawerView} onOpenChange={(isOpen) => !isOpen && closeDrawer()}>
            <DrawerTrigger>Open</DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
