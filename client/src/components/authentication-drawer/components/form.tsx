import { PencilLine } from "lucide-react";
import React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { makeRequest } from "@/lib/axios";
import { useAuthenticationDrawerContext } from "../context";
import { AuthenticationProfileSchema, type tAuthenticationProfileSchema } from "../utils";

export function AuthenticationProfile() {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [profileImage, setProfileImage] = React.useState<string | null>(null);
    const { state } = useAuthenticationDrawerContext();

    console.log({ state });

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) setProfileImage(URL.createObjectURL(file));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let profile: tAuthenticationProfileSchema, file: FormDataEntryValue | null;

        const formData = new FormData(event.currentTarget);
        file = formData.get("profileImage");

        profile = {
            bio: formData.get("bio")?.toString() ?? "",
            email: formData.get("email")?.toString() ?? "",
            profileImage: file instanceof File && file.name ? file : "default-pfp.svg",
            username: formData.get("username")?.toString() ?? "",
        };

        const result = AuthenticationProfileSchema.safeParse(profile);

        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;

            toast.error("Form Submission Error", {
                description: (
                    <pre className="mt-1 max-h-25 overflow-auto rounded bg-gray-950 text-left text-xs text-white">
                        {JSON.stringify(errors, null, 1)}
                    </pre>
                ),
                duration: 5000,
            });

            return;
        }

        profile = result.data;

        if (profile.profileImage instanceof File) {
            const request = new FormData();
            request.append("bio", profile.bio ?? "");
            request.append("email", profile.email);
            request.append("pfp", profile.profileImage);
            request.append("username", profile.username);

            await makeRequest({
                method: "POST",
                url: "/sign-up",
                data: Object.fromEntries(request),
            }).then(function (response) {
                console.log(response);
            });
        } else {
            await makeRequest({
                method: "POST",
                url: "/sign-up",
                data: {
                    bio: profile.bio,
                    email: profile.email,
                    pfp: "default-pfp.svg",
                    username: profile.username,
                },
            }).then(function (response) {
                console.log(response);
            });
        }
    }

    React.useEffect(() => {
        return () => {
            URL.revokeObjectURL(profileImage || "");
        };
    }, [profileImage]);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <section className="space-y-4">
                <div className="flex items-center justify-start gap-2">
                    <aside
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue100 relative flex size-11 cursor-pointer items-center justify-center rounded-full p-0.25"
                    >
                        <img
                            src={profileImage || "default-pfp.svg"}
                            alt="profile-image"
                            className="rounded-full object-cover"
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
                    className="border-blue100/40 h-11 w-full rounded-[.125rem] border p-2.5 text-xs lowercase"
                    name="email"
                    placeholder="enter email"
                    type="email"
                />

                <TextInput
                    className="border-blue100/40 h-11 w-full rounded-[.125rem] border p-2.5 text-xs lowercase"
                    name="username"
                    placeholder="enter username"
                />

                <TextInput
                    className="border-blue100/40 h-15 w-full resize-none rounded-[.125rem] border p-2.5 text-xs lowercase"
                    name="bio"
                    placeholder="enter bio (say something about yourself, this is optional)"
                    type="textarea"
                />
            </section>

            <Button type="submit" variant="default" className="bg-blue100 h-12 w-full">
                <span className="font-extralight tracking-[.0625rem]">Finish setup</span>
            </Button>
        </form>
    );
}

type TextInputProps =
    | React.ComponentPropsWithRef<"input">
    | (Omit<React.ComponentPropsWithRef<"textarea">, "ref"> & {
          ref?: React.Ref<HTMLTextAreaElement>;
      });

function TextInput(props: TextInputProps) {
    if ("type" in props && props.type === "textarea") {
        const { ref, ...rest } = props as React.ComponentPropsWithRef<"textarea">;
        return <textarea ref={ref} {...rest} />;
    } else {
        const { ref, ...rest } = props as React.ComponentPropsWithRef<"input">;
        return <input ref={ref} {...rest} />;
    }
}
