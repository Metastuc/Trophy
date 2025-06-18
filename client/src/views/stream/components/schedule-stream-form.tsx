import { Link } from "@tanstack/react-router";
import React from "react";

import { STREAM_NOW } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-field";
import { useAuthenticationContext } from "@/contexts/authentication";
import { logger } from "@/utils/logger";

export function ScheduleStreamForm() {
    const { user } = useAuthenticationContext();

    logger({ user });

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
    }

    return (
        <section className="space-y-5">
            <h5 className="text-center">Schedule Livestream</h5>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input type="hidden" name="date" />
                <input type="hidden" name="username" />

                <div className="flex flex-col">
                    <label htmlFor="title">Title</label>
                    <TextInput
                        className="border-blue100/40 h-11 w-full rounded border p-2.5 text-xs"
                        type="text"
                        name="title"
                        id="title"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="record">Record livestream</label>
                    <input type="checkbox" name="record" id="record" />
                </div>

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
