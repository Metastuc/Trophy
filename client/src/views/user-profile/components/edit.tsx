import { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

export function EditProfile() {
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return (
        <Drawer dismissible={false} open>
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

                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div></div>
                    </fieldset>
                </form>

                <DrawerFooter>
                    <Button className="bg-blue100 h-13.5 text-base font-stretch-normal">Save changes</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
