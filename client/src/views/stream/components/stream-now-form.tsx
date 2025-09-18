import { useWallets } from "@privy-io/react-auth";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { toast } from "sonner";

import { STREAM_NOW } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TextInput } from "@/components/ui/text-field";
import { useServer } from "@/hooks/server";
import { network } from '@/lib/constants';
import { createCreatorToken } from "@/lib/flaunch";
import { cn } from "@/lib/utils";
import { useAuthenticationStore } from "@/store/authentication";

export function StreamNowForm() {
    const navigate = useNavigate({ from: "/stream" });
    const user = useAuthenticationStore((state) => state.user);
    const { wallets } = useWallets();
    const [isCreatingToken, setIsCreatingToken] = useState<boolean>(false);

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
        const data = Object.fromEntries(formData.entries()) as tCreateStreamFormRequest;

        try {
            if (!formState.creatorToken && formState.creatorTokenEnabled) {
                await wallets[0].switchChain(network.id);
                const provider = await wallets[0].getEthereumProvider();
                if (!provider) throw new Error("No provider found");

                const toastId = toast.loading("Creating creator token...");
                setIsCreatingToken(true);

                try {
                    const tokenAddress = await createCreatorToken(formState.username, provider);
                    toast.success("Creator token created!", { id: toastId });
                    setFormState((state) => ({ ...state, creatorToken: tokenAddress.creatorToken }));
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

    const [formState, setFormState] = useState<iFormState>(() => ({
        date: "",
        username: "",
        walletAddress: "",
        creatorToken: "",
        creatorTokenEnabled: false,
    }));

    useEffect(
        function () {
            if (!user) return;

            setFormState((state) => ({
                ...state,
                creatorToken: user.backendUserData.user.creatorToken as string,
                date: new Date().toISOString(),
                username: user.backendUserData.user.username,
                walletAddress: user.wallet?.address as string,
                creatorTokenEnabled: !!user.backendUserData.user.creatorToken,
            }));
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
                            <i>{STREAM_NOW()}</i>
                            <span>Start stream</span>
                        </Fragment>
                    )}
                </Button>
            </form>
        </section>
    );
}