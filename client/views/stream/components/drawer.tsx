import { Loader, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TOKENS } from "@/components/ui/tokens";
import { formatUSD } from "@/lib/utils";
import { TOKEN_CONFIG } from "#~/store/supported-tokens.ts";

export function CreateStreamDrawer({
    isOpen,
    isSubmitting,
    onClose,
    onSubmit,
    formState,
    setFormState,
}: CreateStreamDrawerProps) {
    function handleAllocationPercentage(value: string) {
        console.log(value);
    }

    return (
        <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DrawerContent className="">
                <DrawerHeader className="flex">
                    <DrawerTitle className="flex justify-end">
                        <DrawerClose asChild>
                            <Button variant="outline" className="bg-white200 ml-auto size-5 rounded-full p-0">
                                <i className="size-3">
                                    <X />
                                </i>
                            </Button>
                        </DrawerClose>
                    </DrawerTitle>

                    <DrawerDescription className="text-xs font-medium">
                        You can choose to acquire up to 5% of your coin supply, before it goes live.
                    </DrawerDescription>
                </DrawerHeader>

                <main className="p-4">
                    <section className="flex flex-col items-center justify-center">
                        <aside className="mt-8.5 mb-2.5 w-full">
                            <span className="text-blue100 pl-5 text-xs">Enter amount</span>

                            <div className="border-blue100 flex h-25 items-center justify-between rounded-xl border-2 p-4">
                                <aside className="flex flex-col items-start justify-center">
                                    <div className="flex items-center justify-center gap-1 text-2xl">
                                        <input
                                            value={formState.allocationInPercentage}
                                            // onChange={handleAmountChange}
                                            style={{
                                                width: `${formState.allocationInPercentage || 1}ch`,
                                                color: formState?.allocationInPercentage ? "black" : "gray",
                                            }}
                                            className="max-w-[7.5rem] outline-none"
                                            placeholder="0"
                                        />
                                        <span>%</span>
                                    </div>

                                    <span className="text-base text-[#060606]/50">~{formatUSD("0")}</span>
                                </aside>

                                <aside className="flex flex-col items-center justify-center">
                                    <Select
                                        value={formState?.token}
                                        onValueChange={(value) =>
                                            setFormState({
                                                token: value,
                                                tokenAddress: TOKEN_CONFIG[value as keyof typeof TOKEN_CONFIG].address,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="border-blue100 h-10.5! min-w-28 rounded-lg bg-[#1B1B1B] p-0 px-2">
                                            <SelectValue>
                                                {TOKENS.find((token) => token.value === formState.token)?.title}
                                            </SelectValue>
                                        </SelectTrigger>

                                        <SelectContent>
                                            {TOKENS.map((token, index) => (
                                                <SelectItem key={index} value={token.value}>
                                                    {token.render}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <span className="text-blue100 mt-1 mr-auto text-xs">Balance: 0.00</span>
                                </aside>
                            </div>
                        </aside>

                        <div className="flex items-center justify-center gap-4">
                            {["10%", "25%", "50%", "100%"].map((value, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAllocationPercentage(value)}
                                    className="border-blue100 rounded-xs border px-4 py-1 text-sm font-light"
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                    </section>
                </main>

                <DrawerFooter>
                    <Button disabled={isSubmitting} onClick={onSubmit} className="bg-blue100">
                        {isSubmitting ? <Loader className="size-5 animate-spin" /> : "Continue"}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
