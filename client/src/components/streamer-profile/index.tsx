import React from "react";

import { cn } from "@/lib/utils";

import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "../ui/alert-dialog";
import { Skeleton } from "../ui/skeleton";
import { CreatorProfileContext, useCreatorProfileContext } from "./hooks";

export default function Component({ isButton }: iStreamerProfile) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const contextValue: iCreatorProfileContext = {
        isButton, // TODO: remove?
        setIsOpen,
        isOpen,
    };

    return (
        <CreatorProfileContext.Provider value={contextValue}>
            {isButton ? <RenderModal /> : <RenderUser />}
        </CreatorProfileContext.Provider>
    );
}

function RenderUser() {
    return (
        <aside className="flex items-center gap-0.5">
            <i className="size-8 rounded-full bg-gradient-to-b from-[#6055FF] to-[#3A3399]">
                {/* <img
                        src="https://www.dummyimage.com/200x200/000/fff"
                        alt="user-pfp"
                        className={cn("user-pfp", "rounded-full")}
                    /> */}

                <Skeleton className={cn("user-pfp", "rounded-full")} />
            </i>

            <span className="text-xs">@username</span>
        </aside>
    );
}

function RenderModal() {
    const { isOpen, setIsOpen } = useCreatorProfileContext();

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger>
                <RenderUser />
            </AlertDialogTrigger>

            <AlertDialogContent className="gap-8 rounded-none border-none p-0">hello</AlertDialogContent>
        </AlertDialog>
    );
}

// import React from "react";

// import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";

// import Footer from "./components/footer";
// import Header from "./components/header";
// import Main from "./components/main";
// import { TradeCreatorTokenContext } from "./hooks";

// export default function Component() {
//     const [isOpen, setIsOpen] = React.useState<boolean>(false);

//     const contextValue: iTradeCreatorTokenContext = {
//         setIsOpen,
//         token: "token",
//     };

//     return (
//         <TradeCreatorTokenContext.Provider value={contextValue}>
//             <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
//                 <AlertDialogTrigger asChild>
//                     <Button variant="default" className="bg-green100 h-6 w-15 rounded-xs">
//                         <span className="text-green200 capitalize">trade</span>
//                     </Button>
//                 </AlertDialogTrigger>

//                 <AlertDialogContent className="gap-8 rounded-none border-none p-0">
//                     <Header />
//                     <Main />
//                     <Footer />
//                 </AlertDialogContent>
//             </AlertDialog>
//         </TradeCreatorTokenContext.Provider>
//     );
// }
