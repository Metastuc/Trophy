import { PencilLine } from "lucide-react";
import React from "react";
import { useShallow } from "zustand/shallow";

import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-field";

import { cn } from "@/lib/utils";
import { useAuthenticationDrawerFormStore } from "../store";

export function CompleteProfile() {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [profileImagePreview, setProfileImagePreview] = React.useState<string | null>(null);

    const { bio, email, isNewUser, privyId, profilePicture, setFormField, username } =
        useAuthenticationDrawerFormStore(
            useShallow((state) => ({
                bio: state.bio,
                email: state.email,
                isNewUser: state.isNewUser,
                privyId: state.privyId,
                profilePicture: state.profilePicture,
                username: state.username,

                setFormField: state.setField,
            })),
        );

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        setProfileImagePreview(URL.createObjectURL(file));
        setFormField("profilePicture", file);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    React.useEffect(
        function () {
            if (typeof profilePicture === "string") {
                setProfileImagePreview(profilePicture);
            } else if (!profilePicture) {
                setProfileImagePreview(null);
            }
        },
        [profilePicture],
    );

    React.useEffect(() => {
        return () => {
            if (profileImagePreview?.startsWith("blob:")) {
                URL.revokeObjectURL(profileImagePreview);
            }
        };
    }, [profileImagePreview]);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="privyId" value={privyId as string} />

            <section className="space-y-4">
                <div className="flex items-center justify-start gap-2">
                    <aside
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue100 relative flex size-11 cursor-pointer items-center justify-center rounded-full p-0.25"
                    >
                        <img
                            src={
                                profileImagePreview ||
                                (typeof profilePicture === "string"
                                    ? profilePicture
                                    : "default-pfp.svg")
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
                        !!email && "opacity-50",
                    )}
                    name="email"
                    placeholder="enter email"
                    type="email"
                    value={email || ""}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setFormField("email", event.target.value)
                    }
                    disabled={!!email}
                />

                <TextInput
                    className={cn(
                        "border-blue100/40 h-11 w-full rounded-xs border p-2.5 text-xs lowercase",
                        !!username && "opacity-50",
                    )}
                    name="username"
                    placeholder="enter username"
                    value={username || ""}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setFormField("username", event.target.value)
                    }
                    required
                    disabled={!!username}
                />

                <TextInput
                    className="border-blue100/40 h-15 w-full resize-none rounded-xs border p-2.5 text-xs lowercase"
                    name="bio"
                    placeholder="enter bio (say something about yourself, this is optional)"
                    type="textarea"
                    value={bio || ""}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setFormField("bio", event.target.value)
                    }
                />
            </section>

            <Button
                type="submit"
                variant="default"
                className="bg-blue100 h-12 w-full rounded"
                // disabled={false}
            >
                <span className="font-extralight tracking-[.0625rem]">Finish setup</span>
            </Button>
        </form>
    );
}
