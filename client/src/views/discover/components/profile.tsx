import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useLeaderboardStreamerContext } from "../hooks";
import { MarketCapHeader } from "./market-cap-header";
import { User } from "./user";

export function LeaderboardStreamerProfile() {
    const { isModalOpen, setIsModalOpen } = useLeaderboardStreamerContext();

    return (
        <section>
            <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <AlertDialogTrigger>
                    <User />
                </AlertDialogTrigger>

                <AlertDialogContent className="gap-8 rounded-none border-none p-0">
                    <MarketCapHeader />

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
}
