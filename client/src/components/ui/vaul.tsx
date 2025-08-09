import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils"; // optional utility for conditional classNames

function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
    return <DrawerPrimitive.Root {...props} />;
}

function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
    return <DrawerPrimitive.Trigger {...props} />;
}

function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
    return <DrawerPrimitive.Portal {...props} />;
}

function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
    return <DrawerPrimitive.Overlay className={cn("fixed inset-0 bg-black/40", className)} {...props} />;
}

function DrawerContent({ className, children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content>) {
    return (
        <DrawerPortal>
            <DrawerOverlay />
            <DrawerPrimitive.Content
                className={cn(
                    "fixed right-0 bottom-0 left-0 flex max-h-[96%] flex-col rounded-t-[10px] bg-white",
                    className,
                )}
                {...props}
            >
                <div className="mx-auto flex w-full max-w-md flex-col overflow-auto rounded-t-[10px] p-4">
                    {children}
                </div>
            </DrawerPrimitive.Content>
        </DrawerPortal>
    );
}

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
    return <DrawerPrimitive.Close {...props} />;
}

export { Drawer, DrawerClose, DrawerContent, DrawerTrigger };
