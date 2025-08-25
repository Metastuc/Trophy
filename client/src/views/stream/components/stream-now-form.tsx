import { Link, useNavigate } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { toast } from "sonner";

import { STREAM_NOW } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TextInput } from "@/components/ui/text-field";
import { useServer } from "@/hooks/server";
import { cn } from "@/lib/utils";
import { useAuthenticationStore } from "@/store/authentication";

export function StreamNowForm() {
    const navigate = useNavigate({ from: "/stream" });
    const user = useAuthenticationStore((state) => state.user);

    const { isPending, mutate } = useServer<tCreateStreamFormRequest, tCreateStreamFormResponse>(
        { METHOD: "POST", URL: "/create-stream" },

        {
            onSuccess(response) {
                toast.success(response.data.message);
                navigate({ to: `/live/$id`, params: { id: response.data.roomId } });
            },
        },
    );

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        mutate(data as tCreateStreamFormRequest);
    }

    const [formState, setFormState] = useState<iFormState>(() => ({
        date: "",
        username: "",
        walletAddress: "",
    }));

    useEffect(
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
                <input type="hidden" name="username" value={formState.username} />
                <input type="hidden" name="walletAddress" value={formState.walletAddress} />
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

                <div className="flex items-center justify-between">
                    <label htmlFor="creatorToken">Activate creator token</label>
                    <input type="checkbox" name="record" id="record" />

                    <Switch checked={field.value} onCheckedChange={field.onChange} disabled aria-readonly />
                </div>

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
                            <i>{STREAM_NOW()}</i>
                            <span>Start stream</span>
                        </Fragment>
                    )}
                </Button>
            </form>
        </section>
    );
}
