import { useWallets } from "@privy-io/react-auth";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader, Projector } from "lucide-react";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { toast } from "sonner";
import { Address } from "viem";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TextInput } from "@/components/ui/text-field";
import { useServer } from "@/hooks/server";
import { API_ENDPOINTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
// import { createCreatorToken } from "@/lib/flaunch";
import { useAuthenticationStore } from "#~/store/authentication.ts";

export function StreamNowForm() {
    const navigate = useNavigate({ from: "/stream" });
    const { wallets } = useWallets();

    const user = useAuthenticationStore((state) => state.user);
    const [isCreatingToken, setIsCreatingToken] = useState<boolean>(false);

    const [formState, setFormState] = useState<CreateStreamFormState>(() => ({
        creatorToken: undefined,
        creatorTokenEnabled: false,
        date: "",
        username: "",
        walletAddress: undefined,
    }));

    const { isPending, mutate } = useServer<CreateStreamFormRequest, CreateStreamFormResponse>(
        { METHOD: "POST", URL: API_ENDPOINTS.STREAMS.CREATE_STREAM },

        {
            onSuccess(response) {
                toast.success(response.data.message);
                navigate({ to: `/live/$room`, params: { room: response.data.roomId } });
            },
        },
    );

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        await wallets[0].switchChain(84532);
        const provider = await wallets[0].getEthereumProvider();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries()) as CreateStreamFormRequest;

        try {
            if (!formState.creatorToken && formState.creatorTokenEnabled) {
                if (!provider) throw new Error("No provider found");

                const toastId = toast.loading("Creating creator token...");
                setIsCreatingToken(true);

                try {
                    // const tokenAddress = await createCreatorToken(formState.username, provider);
                    // toast.success("Creator token created!", { id: toastId });
                    // setFormState((state) => ({ ...state, creatorToken: tokenAddress.creatorToken }));
                } catch (error) {
                    toast.error("Failed to create token: " + ((error as Error).message || "Unknown error"), {
                        id: toastId,
                    });
                    setIsCreatingToken(false);
                    return;
                } finally {
                    setIsCreatingToken(false);
                }
            }

            mutate(data);
        } catch (error) {
            toast.error("Unexpected error: " + ((error as Error).message || "Unknown error"));
            setIsCreatingToken(false);
        }
    }

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
        </section>
    );
}
