import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useLeaderboardStreamerContext } from "../hooks";
import { User } from "./user";

export function LeaderboardStreamerProfile() {
    const { pfp, username, isModalOpen, setIsModalOpen } = useLeaderboardStreamerContext();

    return (
        <section>
            <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <AlertDialogTrigger>
                    <User pfp={pfp} username={username} />
                </AlertDialogTrigger>

                <AlertDialogContent className="gap-8 rounded-none border-none p-0">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data
                            from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
}
