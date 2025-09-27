import { Link, useNavigate } from "@tanstack/react-router";
import { Loader, Projector } from "lucide-react";
import { FormEvent, Fragment, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TextInput } from "@/components/ui/text-field";
import { TOKENS } from "@/components/ui/tokens";
import { useServer } from "@/hooks/server";
import { API_ENDPOINTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { useStreamForm } from "../hooks";
import { CreateStreamDrawer } from "./drawer";

export function StreamNowForm() {
    const navigate = useNavigate({ from: "/stream" });
    const { formState, handleCreatorTokenCreation, isAuthenticated, isCreatingToken, setFormState } = useStreamForm();
    const [createStreamDrawerState, setCreateStreamDrawerState] = useState<CreateStreamDrawerState>(() => ({
        // isDrawerOpen: false,
        isDrawerOpen: true,
        pendingData: null,
        form: {
            allocationInPercentage: "",
            approximateAmountInUSD: "",
            approxmateAmountInToken: "",
            token: TOKENS[0].value,
            tokenAddress: TOKENS[0].address,
        },
    }));

    const { isPending, mutate } = useServer<CreateStreamFormRequest, CreatedStreamResponse>(
        { METHOD: "POST", URL: API_ENDPOINTS.STREAMS.CREATE_STREAM },

        {
            onSuccess(response) {
                const { data, message } = response.data;
                toast.success(message);
                navigate({ to: `/live/$room`, params: { room: data.roomId } });
            },
        },
    );

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!isAuthenticated) {
            toast.error("You must be logged in to create a stream");
            return;
        }

        const data = Object.fromEntries(
            new FormData(event.target as HTMLFormElement).entries(),
        ) as CreateStreamFormRequest;

        if (formState.creatorTokenEnabled && !formState.creatorToken) {
            setCreateStreamDrawerState((state) => ({
                ...state,
                isDrawerOpen: true,
                pendingData: data,
            }));
            return;
        }

        mutate(data);
    }

    async function handleDrawerSubmit() {
        try {
            await handleCreatorTokenCreation();

            if (!createStreamDrawerState.pendingData) {
                throw new Error("No pending stream data");
            }

            setCreateStreamDrawerState((state) => ({ ...state, isDrawerOpen: false }));
            mutate(createStreamDrawerState.pendingData);
        } catch (error) {
            toast.error("Failed to create creator token: " + (error as Error).message);
        }
    }

    return (
        <section className="space-y-5">
            <h5 className="text-center">Start a livestream now</h5>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input type="hidden" name="username" value={formState.username ?? ""} />
                <input type="hidden" name="walletAddress" value={formState.walletAddress ?? ""} />
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
                        isPending || isCreatingToken ? "opacity-50" : "opacity-100",
                    )}
                    disabled={isPending || isCreatingToken}
                >
                    {isPending ? (
                        <Fragment>
                            <Loader className="animate-spin" />
                            <span>Please wait...</span>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <i>
                                <Projector />
                            </i>
                            <span>Start stream</span>
                        </Fragment>
                    )}
                </Button>
            </form>

            <CreateStreamDrawer
                isOpen={createStreamDrawerState.isDrawerOpen}
                onClose={() =>
                    setCreateStreamDrawerState((state) => ({ ...state, isDrawerOpen: false, pendingData: null }))
                }
                onSubmit={handleDrawerSubmit}
                isSubmitting={isCreatingToken}
                formState={createStreamDrawerState.form}
                setFormState={(form) =>
                    setCreateStreamDrawerState((state) => ({ ...state, form: { ...state.form, ...form } }))
                }
            />
        </section>
    );
}
