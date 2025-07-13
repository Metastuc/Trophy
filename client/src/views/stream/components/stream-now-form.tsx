import { Link } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import React from "react";
import { toast } from "sonner";

import { STREAM_NOW } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-field";
import { useServer } from "@/hooks/server";
import { cn } from "@/lib/utils";
import { useAuthenticationStore } from "@/store/authentication";
import { logger } from "@/utils/logger";

export function StreamNowForm() {
    const user = useAuthenticationStore((state) => state.user);
    logger(user);

    const { isPending, mutate } = useServer<tCreateStreamFormRequest, tCreateStreamFormResponse>(
        {
            METHOD: "POST",
            URL: "/create-stream",
        },
        {
            onSuccess(data) {
                logger({ data });
            },
        },
    );

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!user) {
            toast.error("You must be logged in to start a livestream.");
            return;
        }

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        logger(data);

        mutate(data as tCreateStreamFormRequest);
    }

    const [formState, setFormState] = React.useState<iFormState>(() => ({
        date: "",
        username: "",
        walletAddress: "",
    }));

    React.useEffect(
        function () {
            if (!user) return;

            setFormState({
                date: new Date().toISOString(),
                username: user.backendUserData.user.username,
                walletAddress: user.wallet?.address as string,
            });
        },
        [user],
    );

    return (
        <section className="space-y-5">
            <h5 className="text-center">Start a livestream now</h5>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* <input type="hidden" name="date" value={formState.date} /> */}
                <input type="hidden" name="username" value={formState.username} />

                <div className="flex flex-col">
                    <label htmlFor="title">Title</label>
                    <TextInput
                        className="border-blue100/40 h-11 w-full rounded border p-2.5 text-xs"
                        type="text"
                        name="title"
                        id="title"
                        required
                        minLength={3}
                    />
                </div>

                <p className="text-xs">
                    You can brodcast your livestreams to X and YouTube by including the RMTP URL to
                    your{" "}
                    <Link to="/profile" className="text-blue100">
                        profile
                    </Link>
                </p>

                <Button
                    type="submit"
                    className={cn(
                        "bg-blue100 transition-all duration-150 ease-in-out",
                        isPending ? "opacity-50" : "opacity-100",
                    )}
                    disabled={isPending}
                >
                    {isPending ? (
                        <React.Fragment>
                            <Loader className="animate-spin" />
                            <span>Please wait...</span>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <i>{STREAM_NOW()}</i>
                            <span>Start stream</span>
                        </React.Fragment>
                    )}
                </Button>
            </form>
        </section>
    );
}

// <div className="flex items-center justify-between">
//     <label htmlFor="record">Record livestream</label>
//     <input type="checkbox" name="record" id="record" />
// </div>;
