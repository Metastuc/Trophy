import { Drawer } from "@/components/ui/drawer";

import { useLiveStreamContext } from "../hooks";

export function LiveStreamInvitationDrawer() {
    const { closeInvitationDrawer, openInvitationDrawer, isInvitationDrawerOpen } = useLiveStreamContext();

    return (
        <Drawer
            open={isInvitationDrawerOpen}
            onOpenChange={(isOpen) => (isOpen ? openInvitationDrawer() : closeInvitationDrawer())}
            dismissible={false}
            repositionInputs={false}
        ></Drawer>
    );
}
