import { Link } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { FormEvent, Fragment, useCallback } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TextInput } from "@/components/ui/text-field";
import { useAuthenticationStore } from "@/hooks/authentication";
import { useServer } from "@/hooks/server";
import { API_ENDPOINTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { DateTimePicker } from "./date-time-picker";
import { CreateStreamDrawer } from "./drawer";
import { useStreamForm } from "./hooks";

export function ScheduleStreamForm() {
    const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated);

    const { isPending, mutate } = useServer<CreateStreamFormRequest, ScheduledStreamResponse>(
        { METHOD: "POST", URL: API_ENDPOINTS.STREAMS.CREATE_STREAM },

        {
            onSuccess(response) {
                toast.success(response.data.message);
            },
        },
    );

    const { drawerState, formState, handleDrawerSubmit, isCreating, setDrawerState, setFormState } =
        useStreamForm(mutate);

    const handleDateChange = useCallback(
        function (date: Date | undefined) {
            const dateString = date?.toISOString() ?? "";
            setFormState(function (state) {
                if (state.date === dateString) return state;
                return { ...state, date: dateString };
            });
        },
        [setFormState],
    );

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!isAuthenticated) {
            toast.error("You must be logged in to schedule a stream");
            return;
        }

        const data = Object.fromEntries(
            new FormData(event.target as HTMLFormElement).entries(),
        ) as CreateStreamFormRequest;

        if (formState.creatorTokenEnabled && !formState.creatorToken) {
            setDrawerState((state) => ({
                ...state,
                isDrawerOpen: true,
                pendingData: data,
            }));
            return;
        }

        mutate(data);
    }

    return (
        <section className="space-y-5">
            <h5 className="text-center">Schedule Livestream</h5>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input type="hidden" name="date" value={formState.date ?? ""} />
                <input type="hidden" name="username" value={formState.username ?? ""} />

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

                <div>
                    <DateTimePicker onChange={handleDateChange} />
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
                        isPending || isCreating ? "opacity-50" : "opacity-100",
                    )}
                    disabled={isPending || isCreating}
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

            <CreateStreamDrawer
                isOpen={drawerState.isDrawerOpen}
                onClose={() => setDrawerState((state) => ({ ...state, isDrawerOpen: false, pendingData: null }))}
                onSubmit={handleDrawerSubmit}
                isSubmitting={isCreating}
                formState={drawerState.form}
                setFormState={(form) => setDrawerState((state) => ({ ...state, form: { ...state.form, ...form } }))}
            />
        </section>
    );
}
