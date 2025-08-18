import { useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { ProfileForm } from "@/components/profile-form";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useServer } from "@/hooks/server";

import { useUserProfileContext } from "../context";
import { EditProfileSchema } from "../utils";

export function EditProfile() {
    const router = useRouter();

    const { user } = useUserProfileContext();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const formInitialValues = useMemo(
        () => ({
            bio: user?.bio || "",
            email: user?.email || "",
            profilePicture: user?.userPfp || "",
            xUrl: user?.xUrl || "",
            YTUrl: user?.YTUrl || "",
        }),
        [user],
    );

    const { mutate, isPending } = useServer<tProfileFormValues, unknown>(
        { METHOD: "PATCH", URL: "/update-profile" },

        {
            async onSuccess() {
                toast.success("Profile updated successfully!", {
                    duration: 3000,
                });

                router.invalidate();
                setIsOpen(false);
            },
        },

        function (variables) {
            if (variables.profilePicture instanceof File) {
                const formData = new FormData();

                formData.append("bio", variables.bio as string);
                formData.append("email", variables.email as string);
                formData.append("profilePicture", variables.profilePicture);
                formData.append("username", variables.username as string);

                return formData;
            }

            return variables;
        },
    );

    function handleSubmit(values: tProfileFormValues) {
        const request = EditProfileSchema.safeParse(values);

        if (!request.success) {
            const errors = z.flattenError(request.error).fieldErrors;

            toast.error("Form Submission Error", {
                description: (
                    <pre className="mt-1 max-h-25 overflow-auto rounded bg-gray-950 p-2 text-left text-xs text-white">
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

        mutate(values);
    }

    return (
        <Drawer dismissible={false} open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger className="bg-blue100 ml-auto flex items-center justify-center rounded-xs px-2">
                <span className="text-[0.5rem] text-white">Edit Profile</span>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader className="flex items-center justify-center">
                    <DrawerTitle className="text-blue100 text-center font-normal">Edit Profile</DrawerTitle>
                    <DrawerDescription className="max-w-[15.75rem] text-center text-sm font-light text-[#000000B2]">
                        GM! Kindly input the changes you want to make on your profile below.
                    </DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                    <ProfileForm
                        onSubmit={handleSubmit}
                        fields={["profilePicture", "email", "bio", "xUrl", "YTUrl"] as const}
                        initialValues={formInitialValues}
                        isSubmitting={isPending}
                    />

                    <Button
                        className="rounded tracking-[.0625rem]"
                        variant={"outline"}
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
