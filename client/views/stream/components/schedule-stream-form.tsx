import { Link } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { toast } from "sonner";
import { Address } from "viem";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TextInput } from "@/components/ui/text-field";
import { useServer } from "@/hooks/server";
import { cn } from "@/lib/utils";
import { useAuthenticationStore } from "#~/store/authentication.ts";

import { DateTimePicker } from "./date-time-picker";

export function ScheduleStreamForm() {
    const user = useAuthenticationStore((state) => state.user);

    const { isPending, mutate } = useServer<CreateStreamFormRequest, CreateStreamFormResponse>(
        { METHOD: "POST", URL: "/create-stream" },

        {
            onSuccess(response) {
                console.log(`token: ${response.data.token}`, `roomId: ${response.data.roomId}`);

                toast.success(response.data.message);
            },
        },
    );

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries()) as CreateStreamFormRequest;

        mutate(data);
    }

    const [formState, setFormState] = useState<CreateStreamFormState>(() => ({
        creatorToken: undefined,
        creatorTokenEnabled: false,
        date: "",
        username: "",
        walletAddress: undefined,
    }));

    useEffect(
        function () {
            if (!user) return;

            setFormState({
                creatorToken: user.backendUserData.user.creatorToken as Address,
                creatorTokenEnabled: !!user.backendUserData.user.creatorToken,
                date: new Date().toISOString(),
                username: user.backendUserData.user.username,
                walletAddress: user.wallet?.address as Address,
            });
        },
        [user],
    );

    return (
        <section className="space-y-5">
            <h5 className="text-center">Schedule Livestream</h5>

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

                <div>
                    <DateTimePicker onChange={(date) => console.log(date)} />
                </div>

                {!formState.creatorToken ? (
                    <div className="flex items-center justify-between">
                        <label htmlFor="creatorTokenSwitch">Activate creator token</label>
                        <Switch
                            id="creatorTokenSwitch"
                            className="data-[state=checked]:bg-blue100"
                            checked={formState.creatorTokenEnabled}
                            onCheckedChange={(checked) =>
                                setFormState((state) => ({ ...state, creatorTokenEnabled: checked }))
                            }
                        />
                    </div>
                ) : null}

                <p className="text-xs">
                    You can brodcast your livestreams to X and YouTube by including the RMTP URL to your{" "}
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
                        <Fragment>
                            <Loader className="animate-spin" />
                            <span>Please wait...</span>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {/* <i>{STREAM_NOW()}</i> */}
                            <span>Generate stream link</span>
                        </Fragment>
                    )}
                </Button>
            </form>
        </section>
    );
}
