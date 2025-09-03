import { useUser } from "@privy-io/react-auth";
import { Loader, PencilLine } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useShallow } from "zustand/shallow";

import { authenticateUser } from "@/api/authenticate-user";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-field";
import { useServer } from "@/hooks/server";
import { API_ENDPOINTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuthenticationStore } from "#~/store/authentication.ts";
import { sleep } from "#~/utils/sleep.ts";

import {
    useAuthenticationDrawerFormStore,
    useAuthenticationDrawerNavigationStore,
    useAuthenticationDrawerStateStore,
} from "../store";
import { AuthenticationProfileSchema } from "../utils";

export function CompleteProfile() {
    const { user: privyUser } = useUser();

    const closeDrawer = useAuthenticationDrawerStateStore((state) => state.closeDrawer);
    const goToDefault = useAuthenticationDrawerNavigationStore((state) => state.goToDefault);
    const setAuthenticatedUser = useAuthenticationStore((state) => state.setUser);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

    const { bio, email, fc, isNewUser, profilePicture, setFormField, username, walletAddress, resetForm } =
        useAuthenticationDrawerFormStore(
            useShallow((state) => ({
                bio: state.bio,
                email: state.email,
                fc: state.fc,
                isNewUser: state.isNewUser,
                profilePicture: state.profilePicture,
                username: state.username,
                walletAddress: state.walletAddress,

                resetForm: state.resetForm,
                setFormField: state.setField,
            })),
        );

    const isEmailPreFilled = useRef(Boolean(email));
    const isUsernamePreFilled = useRef(Boolean(username));

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        setProfileImagePreview(URL.createObjectURL(file));
        setFormField("profilePicture", file);
    }

    const { mutate, isPending } = useServer<AuthenticationDrawerFormData, unknown>(
        {
            METHOD: isNewUser ? "POST" : "PATCH",
            URL: isNewUser ? API_ENDPOINTS.AUTHENTICATION.ONBOARD : "/update-profile",
        },

        {
            async onSuccess(response) {
                const backendUserData = await authenticateUser().then((response) => response?.data);

                if (response.status === 200) {
                    toast.success("Profile updated successfully!", {
                        duration: 3000,
                    });
                }

                if (response.status === 201) {
                    toast.success("Profile created successfully!", {
                        duration: 3000,
                    });
                }

                await sleep(1500);
                closeDrawer();
                resetForm();

                await sleep(300);
                goToDefault();

                if (privyUser && backendUserData) setAuthenticatedUser({ ...privyUser, backendUserData });
            },
        },

        function (variables) {
            if (variables.profilePicture instanceof File) {
                const formData = new FormData();

                formData.append("bio", variables.bio as string);
                formData.append("email", variables.email as string);
                formData.append("fc", String(variables.fc));
                formData.append("profilePicture", variables.profilePicture);
                formData.append("username", variables.username as string);
                formData.append("walletAddress", variables.walletAddress as string);

                return formData;
            }

            return variables;
        },
    );

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const request = AuthenticationProfileSchema.safeParse({
            bio: bio?.trim(),
            email: email?.trim(),
            fc,
            isNewUser,
            profilePicture,
            username: username?.trim(),
            walletAddress,
        });

        if (!request.success) {
            const errors = z.flattenError(request.error).fieldErrors;

            toast.error("Form Submission Error", {
                description: (
                    <pre className="mt-1 max-h-25 overflow-auto rounded bg-gray-950 text-left text-xs text-white">
                        {Object.entries(errors).map(function ([field, message]) {
                            return (
                                <div key={field} className="whitespace-pre">
                                    <span className="font-mono text-green-400">{`> ${field}`}</span>
                                    <span className="font-mono text-gray-400">: </span>
                                    <span className="font-mono text-red-400">{String(message)}</span>
                                </div>
                            );
                        })}
                    </pre>
                ),
                duration: 5000,
            });

            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { isNewUser: _, ...data } = request.data;
        mutate(data);
    }

    function buttonContent() {
        switch (true) {
            case isPending:
                return <Loader className="size-5 animate-spin" />;

            case isUsernamePreFilled.current:
                return <span className="font-extralight tracking-[.0625rem]">Update profile</span>;

            default:
                return <span className="font-extralight tracking-[.0625rem]">Finish setup</span>;
        }
    }

    useEffect(
        function () {
            if (typeof profilePicture === "string") {
                setProfileImagePreview(profilePicture);
            } else if (!profilePicture) {
                setProfileImagePreview(null);
            }
        },
        [profilePicture],
    );

    useEffect(() => {
        return () => {
            if (profileImagePreview?.startsWith("blob:")) {
                URL.revokeObjectURL(profileImagePreview);
            }
        };
    }, [profileImagePreview]);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <section className="space-y-4">
                <div className="flex items-center justify-start gap-2">
                    <aside
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue100 relative flex size-11 cursor-pointer items-center justify-center rounded-full p-0.25"
                    >
                        <img
                            src={
                                profileImagePreview ||
                                (typeof profilePicture === "string" ? profilePicture : "default-pfp.svg")
                            }
                            alt="profile-image"
                            className="size-full rounded-full object-cover"
                        />

                        <div className="absolute right-0 bottom-0 flex size-4.5 items-center justify-center rounded-full bg-white shadow">
                            <i className="size-2.5">
                                <PencilLine className="flex" />
                            </i>
                        </div>
                    </aside>

                    <span className="text-black200 text-xs font-light">
                        (c’mon add a <b className="font-normal">profile picture</b> fam)
                    </span>

                    <input
                        accept="image/*"
                        hidden
                        name="profileImage"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        type="file"
                    />
                </div>

                <TextInput
                    className={cn(
                        "border-blue100/40 h-11 w-full rounded-xs border p-2.5 text-xs lowercase",
                        isEmailPreFilled.current && "opacity-50",
                    )}
                    name="email"
                    placeholder="enter email"
                    type="email"
                    value={email || ""}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setFormField("email", event.target.value)}
                    disabled={isEmailPreFilled.current}
                />

                <TextInput
                    className={cn(
                        "border-blue100/40 h-11 w-full rounded-xs border p-2.5 text-xs",
                        isUsernamePreFilled.current && "opacity-50",
                    )}
                    name="username"
                    placeholder="enter username"
                    value={username || ""}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setFormField("username", event.target.value)}
                    required
                    disabled={isUsernamePreFilled.current}
                />

                <TextInput
                    className="border-blue100/40 h-15 w-full resize-none rounded-xs border p-2.5 text-xs"
                    name="bio"
                    placeholder="enter bio (say something about yourself, this is optional)"
                    type="textarea"
                    value={bio || ""}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setFormField("bio", event.target.value)}
                />
            </section>

            <Button
                type="submit"
                variant="default"
                className={cn("bg-blue100 h-12 w-full rounded transition-colors", isPending && "opacity-50")}
                disabled={isPending}
            >
                {buttonContent()}
            </Button>
        </form>
    );
}
