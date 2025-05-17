import { BACK, CLOSE } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { sleep } from "@/lib/utils";

import { useAuthenticationDrawerContext } from "../context";

export function AuthenticationDrawerFooter() {
    const { dispatch, drawerState, setDrawerState, state } = useAuthenticationDrawerContext();

    async function handleDrawerState() {
        if (drawerState.isDrawerOpen) {
            setDrawerState((previous) => ({ ...previous, isDrawerOpen: false }));

            await sleep(150);
            dispatch({ type: "GO_TO_DEFAULT" });
        } else {
            setDrawerState((previous) => ({ ...previous, isDrawerOpen: true }));
        }
    }

    return (
        <DrawerFooter className="flex flex-row items-center justify-between">
            {state.type !== "default" && state.type !== "wallet" ? (
                <Button
                    variant="outline"
                    className="bg-white200 mr-auto size-5 rounded-full p-0"
                    onClick={() => dispatch({ type: "BACK" })}
                >
                    <i className="size-3">{BACK()}</i>
                </Button>
            ) : null}

            <DrawerClose asChild onClick={handleDrawerState}>
                <Button variant="outline" className="bg-white200 ml-auto size-5 rounded-full p-0">
                    <i className="size-3">{CLOSE()}</i>
                </Button>
            </DrawerClose>
        </DrawerFooter>
    );
}
