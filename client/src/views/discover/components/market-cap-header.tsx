import { Link } from "@tanstack/react-router";

import { CLOSE } from "@/assets/icons";
import { AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

import { useLeaderboardStreamerContext } from "../hooks";
import { User } from "./user";

export function MarketCapHeader() {
    const { setIsModalOpen, username } = useLeaderboardStreamerContext();

    return (
        <AlertDialogHeader className="relative flex items-center justify-between">
            <figure
                className="absolute h-[4.5rem] w-full"
                style={{ backgroundImage: "url(/market.svg)", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
            />

            <div className="z-10 flex h-[4.5rem] w-full items-center justify-between px-6">
                <AlertDialogTitle>
                    <Link to="/$username" params={{ username: username as string }}>
                        <User styles={{ text: "text-base font-normal text-white" }} />
                    </Link>
                </AlertDialogTitle>

                <AlertDialogDescription onClick={() => setIsModalOpen(false)}>
                    <i className="size-6 text-black">{CLOSE()}</i>
                </AlertDialogDescription>
            </div>
        </AlertDialogHeader>
    );
}
