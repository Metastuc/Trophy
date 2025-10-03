import { usePrivy,User as PrivyUser } from "@privy-io/react-auth";
import { useMemo } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { ProfileForm } from "@/components/layout/profile-form";
import { useAuthenticationStore } from "@/hooks/authentication";
import { useServer } from "@/hooks/server";
import { API_ENDPOINTS, queryClient } from "@/lib/constants";

import { useUserProfileContext } from "../hooks";
import { useUserProfileDrawerStore } from "../store";
import { EditProfileSchema } from "../utils";

export function EditProfile() {
    const { user } = usePrivy();
    const { profileData } = useUserProfileContext();

    const closeDrawer = useUserProfileDrawerStore((state) => state.closeDrawer);
    const refreshAuthenticatedUser = useAuthenticationStore((state) => state.refreshAuthenticatedUser);

    const formInitialValues = useMemo(
        () => ({
            bio: profileData?.bio || "",
            email: profileData?.email || "",
            profilePicture: profileData?.profilePicture || "",
            xUrl: profileData?.xUrl || "",
            YTUrl: profileData?.ytUrl || "",
        }),
        [profileData],
    );

    const { mutate, isPending } = useServer<ProfileFormValues, unknown>(
        { METHOD: "PATCH", URL: API_ENDPOINTS.USER.UPDATE_USER(profileData.username) },

        {
            async onSuccess() {
                toast.success("Profile updated successfully!", { duration: 3000 });
                queryClient.invalidateQueries({ queryKey: ["get-my-profile"] });
                await refreshAuthenticatedUser(user as PrivyUser);
                closeDrawer();
            },
        },

        function (variables) {
            if (variables.profilePicture instanceof File) {
                const formData = new FormData();

                formData.append("bio", variables.bio as string);
                formData.append("email", variables.email as string);
                formData.append("profilePicture", variables.profilePicture);
                formData.append("xUrl", variables.xUrl as string);
                formData.append("ytUrl", variables.YTUrl as string);

                return formData;
            }

            return variables;
        },
    );

    function handleSubmit(values: ProfileFormValues) {
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
        <div className="p-4 pb-0">
            <ProfileForm
                onSubmit={handleSubmit}
                fields={["profilePicture", "email", "bio", "xUrl", "YTUrl"] as const}
                initialValues={formInitialValues}
                isSubmitting={isPending}
            />
        </div>
    );
}
