import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { useLeaderboardStreamerContext } from "../hooks";
import { MarketCapFooter } from "./market-cap-footer";
import { MarketCapHeader } from "./market-cap-header";
import { MarketCapMain } from "./market-cap-main";
import { User } from "./user";

export function LeaderboardStreamerProfile() {
    const { isModalOpen, setIsModalOpen } = useLeaderboardStreamerContext();

    return (
        <section className="flex items-center">
            <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <AlertDialogTrigger>
                    <User />
                </AlertDialogTrigger>

                <AlertDialogContent className="max-w-screen gap-8 rounded-none border-none p-0">
                    <MarketCapHeader />
                    <MarketCapMain />
                    <MarketCapFooter />
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
}
