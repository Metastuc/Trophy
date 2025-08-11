import { useState } from "react";

import { ProfileForm } from "@/components/profile-form";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import { useUserProfileContext } from "../context";

export function EditProfile() {
    const { user } = useUserProfileContext();

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const formInitialValues: tProfileFormValues = {
        bio: user?.bio || "",
        email: user?.email || "",
        profilePicture: user?.userPfp || "",
        username: user?.username || "",
        walletAddress: user?.walletAddress || "",
        xUrl: user?.xUrl || "",
        YTUrl: user?.YTUrl || "",
    };

    function handleSubmit() {
        setIsOpen(false);
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
                        isSubmitting={false}
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
