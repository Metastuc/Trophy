import { X } from "lucide-react";
import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

import { useStreamingUIContext } from "../hooks";
import { AuthenticatedPeer } from "./peers-in-list";

export function CoHostDrawer() {
    const { isCoHostDrawerOpen, setIsCoHostDrawerOpen, allPeers } = useStreamingUIContext();
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <Drawer
            open={isCoHostDrawerOpen}
            onOpenChange={setIsCoHostDrawerOpen}
            dismissible={false}
            repositionInputs={false}
        >
            <DrawerContent>
                <DrawerHeader className="flex flex-row items-center justify-start">
                    <DrawerTitle className="flex">
                        <Button variant="ghost" onClick={() => setIsCoHostDrawerOpen(false)}>
                            <X />
                        </Button>
                    </DrawerTitle>
                    <DrawerDescription className="text-blue100 text-base font-medium">
                        Add co-streamers
                    </DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                    <header>
                        <div>display</div>
                        <div>
                            <i></i>
                            <input
                                type="text"
                                placeholder="Search by username"
                                value={searchQuery.trim()}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)}
                            />
                        </div>
                    </header>

                    <footer>
                        <div>
                            <span>People on your livestream</span>
                            <i>icon</i>
                        </div>

                        <ul className="flex max-h-90 flex-col gap-2 overflow-auto">
                            {allPeers.map((value, index) => (
                                <AuthenticatedPeer key={index} peerId={value} search={searchQuery} />
                            ))}
                        </ul>
                    </footer>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
