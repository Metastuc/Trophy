import { Link } from "@tanstack/react-router";
import React from "react";

import { createStream } from "@/api/create-stream";
import { STREAM_NOW } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-field";
import { useAuthenticationStore } from "@/store/authentication";
import { logger } from "@/utils/logger";

export function StreamNowForm() {
    const user = useAuthenticationStore((state) => state.user);
    logger({ user });

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        // logger(data);

        const response = await createStream(data as tCreateStreamFormRequest);
        logger({ response });
    }

    const [formState, setFormState] = React.useState<iFormState>(() => ({
        date: "",
        username: "",
    }));

    React.useEffect(
        function () {
            if (!user) return;

            setFormState({
                date: new Date().toISOString(),
                username: user.backendUserData.user.username,
            });
        },
        [user],
    );

    return (
        <section className="space-y-5">
            <h5 className="text-center">Start a livestream now</h5>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input type="hidden" name="date" value={formState.date} />
                <input type="hidden" name="username" value={formState.username} />

                <div className="flex flex-col">
                    <label htmlFor="title">Title</label>
                    <TextInput
                        className="border-blue100/40 h-11 w-full rounded border p-2.5 text-xs"
                        type="text"
                        name="title"
                        id="title"
                    />
                </div>

                {/* <div className="flex items-center justify-between">
                    <label htmlFor="record">Record livestream</label>
                    <input type="checkbox" name="record" id="record" />
                </div> */}

                <p className="text-xs">
                    You can brodcast your livestreams to X and YouTube by including the RMTP URL to
                    your{" "}
                    <Link to="/profile" className="text-blue100">
                        profile
                    </Link>
                </p>

                <Button type="submit" className="bg-blue100">
                    <i>{STREAM_NOW()}</i>
                    <span>Start stream</span>
                </Button>
            </form>
        </section>
    );
}
