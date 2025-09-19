// import { Button } from "@/components/ui/button";
// import {
//     Drawer,
//     DrawerContent,
//     DrawerDescription,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "@/components/ui/drawer";

// import { Swap } from "./components/swap";
// import { TradeDrawerContextProvider } from "./context";
// import { useTradeDrawerContext } from "./hooks";

// export function TradeDrawer(props: TradeDrawer) {
//     return (
//         <TradeDrawerContextProvider {...props}>
//             <TradeDrawerInner />
//         </TradeDrawerContextProvider>
//     );
// }

// function TradeDrawerInner() {
//     const { closeDrawer, isDrawerOpen, openDrawer, handleSwap, isSwapped } = useTradeDrawerContext();

//     return (
//         <Drawer open={isDrawerOpen} onOpenChange={(isOpen) => (isOpen ? openDrawer() : closeDrawer())}>
//             <DrawerTrigger asChild>
//                 <Button variant="default" className="bg-green100 h-6 w-15 rounded-xs">
//                     <span className="text-green200 capitalize">trade</span>
//                 </Button>
//             </DrawerTrigger>

//             <DrawerContent>
//                 <DrawerHeader>
//                     <DrawerTitle className="text-blue100 text-xl font-normal">Trade</DrawerTitle>
//                     <DrawerDescription className="text-xs font-light">
//                         Kindly select the token you wish to trade with below
//                     </DrawerDescription>
//                 </DrawerHeader>

//                 <main>
//                     <Swap />

//                     <p className="flex items-center justify-center gap-1 text-black/70">
//                         <i className="size-2.5">
//                             <svg
//                                 width={10}
//                                 height={10}
//                                 viewBox="0 0 10 10"
//                                 fill="none"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <g clipPath="url(#clip0_341_1152)">
//                                     <path
//                                         d="M1.25 4.34c0-1.332 0-1.998.157-2.222.158-.224.784-.439 2.037-.868l.238-.081C4.335.945 4.662.833 5 .833c.338 0 .665.112 1.318.336l.238.081c1.253.43 1.88.644 2.037.868.157.224.157.89.157 2.222v.656c0 2.35-1.766 3.49-2.874 3.974-.301.131-.451.197-.876.197s-.575-.066-.876-.197C3.016 8.486 1.25 7.346 1.25 4.996V4.34z"
//                                         stroke="#060606"
//                                         strokeOpacity={0.7}
//                                         strokeWidth={0.7}
//                                     />
//                                     <path
//                                         d="M5 3.333V5"
//                                         stroke="#060606"
//                                         strokeOpacity={0.7}
//                                         strokeWidth={0.7}
//                                         strokeLinecap="round"
//                                     />
//                                     <circle cx={4.99998} cy={6.24998} r={0.416667} fill="#060606" fillOpacity={0.7} />
//                                 </g>
//                                 <defs>
//                                     <clipPath id="clip0_341_1152">
//                                         <path fill="#fff" d="M0 0H10V10H0z" />
//                                     </clipPath>
//                                 </defs>
//                             </svg>
//                         </i>

//                         <span className="text-[.625rem]">
//                             please ensure you review your trade inputs above before you swap
//                         </span>
//                     </p>
//                 </main>

//                 <DrawerFooter>
//                     <Button className="bg-blue100 mx-auto h-13.5 w-3/4 rounded-lg" onClick={handleSwap}>
//                         <span className="text-xl font-normal">{isSwapped ? "Sell" : "Buy"}</span>
//                     </Button>
//                 </DrawerFooter>
//             </DrawerContent>
//         </Drawer>
//     );
// }

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

import { Swap } from "./components/swap";
import { TradeDrawerContextProvider } from "./context";
import { useTradeDrawerContext } from "./hooks";

export function TradeDrawer(props: TradeDrawer) {
    return (
        <TradeDrawerContextProvider {...props}>
            <TradeDrawerInner />
        </TradeDrawerContextProvider>
    );
}

function TradeDrawerInner() {
    const { closeDrawer, isDrawerOpen, openDrawer, handleSwap, drawerData } = useTradeDrawerContext();

    return (
        <Drawer open={isDrawerOpen} onOpenChange={(isOpen) => (isOpen ? openDrawer() : closeDrawer())}>
            <DrawerTrigger asChild>
                <Button variant="default" className="bg-green100 h-6 w-15 rounded-xs">
                    <span className="text-green200 capitalize">trade</span>
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-blue100 text-xl font-normal">Trade</DrawerTitle>
                    <DrawerDescription className="text-xs font-light">
                        Kindly select the token you wish to trade with below
                    </DrawerDescription>
                </DrawerHeader>

                <main>
                    <Swap />

                    <p className="flex items-center justify-center gap-1 text-black/70">
                        <i className="size-2.5">
                            <svg
                                width={10}
                                height={10}
                                viewBox="0 0 10 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_341_1152)">
                                    <path
                                        d="M1.25 4.34c0-1.332 0-1.998.157-2.222.158-.224.784-.439 2.037-.868l.238-.081C4.335.945 4.662.833 5 .833c.338 0 .665.112 1.318.336l.238.081c1.253.43 1.88.644 2.037.868.157.224.157.89.157 2.222v.656c0 2.35-1.766 3.49-2.874 3.974-.301.131-.451.197-.876.197s-.575-.066-.876-.197C3.016 8.486 1.25 7.346 1.25 4.996V4.34z"
                                        stroke="#060606"
                                        strokeOpacity={0.7}
                                        strokeWidth={0.7}
                                    />
                                    <path
                                        d="M5 3.333V5"
                                        stroke="#060606"
                                        strokeOpacity={0.7}
                                        strokeWidth={0.7}
                                        strokeLinecap="round"
                                    />
                                    <circle cx={4.99998} cy={6.24998} r={0.416667} fill="#060606" fillOpacity={0.7} />
                                </g>
                                <defs>
                                    <clipPath id="clip0_341_1152">
                                        <path fill="#fff" d="M0 0H10V10H0z" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </i>

                        <span className="text-[.625rem]">
                            please ensure you review your trade inputs above before you swap
                        </span>
                    </p>
                </main>

                <DrawerFooter>
                    <Button className="bg-blue100 mx-auto h-13.5 w-3/4 rounded-lg" onClick={handleSwap}>
                        <span className="text-xl font-normal">
                            {drawerData.from.type === "native" ? "Buy" : "Sell"}
                        </span>
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
