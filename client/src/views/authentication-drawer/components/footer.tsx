import { useShallow } from "zustand/shallow";

import { BACK, CLOSE } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { sleep } from "@/lib/utils";

import {
    useAuthenticationDrawerNavigationStore,
    useAuthenticationDrawerStateStore,
} from "../store";

export function AuthenticationDrawerFooter() {
    const { closeDrawer, isOpen, openDrawer } = useAuthenticationDrawerStateStore(
        useShallow((state) => ({
            closeDrawer: state.closeDrawer,
            isOpen: state.isOpen,
            openDrawer: state.openDrawer,
        })),
    );

    const { goBack, goToDefault } = useAuthenticationDrawerNavigationStore(
        useShallow((state) => ({ goBack: state.back, goToDefault: state.goToDefault })),
    );

    async function handleDrawerClose() {
        if (isOpen) {
            closeDrawer();

            await sleep(300);
            goToDefault();
        } else {
            openDrawer();
        }
    }

    return (
        <DrawerFooter className="flex flex-row items-center justify-between">
            {!["default", "wallet", "finish"].includes(
                useAuthenticationDrawerNavigationStore.getState().screen,
            ) ? (
                <Button
                    variant="outline"
                    className="bg-white200 mr-auto size-5 rounded-full p-0"
                    onClick={goBack}
                >
                    <i className="size-3">{BACK()}</i>
                </Button>
            ) : null}

            <DrawerClose asChild onClick={handleDrawerClose}>
                <Button variant="outline" className="bg-white200 ml-auto size-5 rounded-full p-0">
                    <i className="size-3">{CLOSE()}</i>
                </Button>
            </DrawerClose>
        </DrawerFooter>
    );
}
