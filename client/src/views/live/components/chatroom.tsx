// import { useAuthenticationStore } from "@/store/authentication";
// import { useDataMessage, useLocalPeer, useRemotePeer } from "@huddle01/react";
// import { CircleDollarSign, MessageCircle } from "lucide-react";
// import React from "react";

// export type TMessage = {
//     text: string;
//     sender: string;
//     displayName?: string;
// };

// export function Chatroom() {
//     const [messages, setMessages] = React.useState<TMessage[]>([]);
//     const [text, setText] = React.useState<string>("");

//     const user = useAuthenticationStore((state) => state.user?.backendUserData.user.username);

//     const MAX_CHATS = 10;

//     const { peerId } = useLocalPeer();
//     const { sendData } = useDataMessage({
//         onMessage: (payload, from, label) => {
//             if (label === "chat") {
//                 setMessages((previous) => {
//                     const updated = [...previous, { text: payload, sender: from }];
//                     return updated.length > MAX_CHATS ? updated.slice(-MAX_CHATS) : updated;
//                 });
//             }
//         },
//     });

//     function sendMessage() {
//         sendData({
//             to: "*",
//             payload: text,
//             label: "chat",
//         });

//         setText("");
//     }

//     return (
//         <section className="flex flex-1 flex-col overflow-hidden">
//             <header className="flex items-center gap-3">
//                 <aside className="text-blue100 flex items-center gap-1">
//                     <span className="font-medium">Chatroom</span>
//                     <i className="size-4">
//                         <MessageCircle />
//                     </i>
//                 </aside>

//                 <aside className="flex items-center gap-3">
//                     <button className="flex h-6 w-20 items-center justify-center gap-1 rounded bg-gradient-to-b from-[#2D57FF] to-[#1B3499] text-white">
//                         <i className="size-4">
//                             <CircleDollarSign />
//                         </i>
//                         <span className="pt-0.5 text-xs">Send tip</span>
//                     </button>

//                     <button>Trade</button>
//                 </aside>
//             </header>

//             <footer className="relative flex flex-1 pb-14">
//                 <div className="justify-en flex w-full flex-col">
//                     <div className="border-blue-400 p-4">
//                         {messages.map((message, index) =>
//                             message.sender === peerId ? (
//                                 <LocalMessageBubble key={index} message={message} />
//                             ) : (
//                                 <RemoteMessageBubble key={index} message={message} />
//                             ),
//                         )}
//                     </div>
//                 </div>

//                 {user ? (
//                     <div className="bg-blue100/90 absolute bottom-0 flex w-full rounded-lg p-2">
//                         <input
//                             type="text"
//                             className="flex-1 bg-transparent p-2 text-sm text-white outline-none"
//                             placeholder="Send a message"
//                             value={text}
//                             onChange={(event) => setText(event.target.value)}
//                             onKeyDown={(event) => {
//                                 if (event.key === "Enter") {
//                                     sendMessage();
//                                 }
//                             }}
//                         />
//                         <button
//                             onClick={sendMessage}
//                             className="flex size-10 items-center justify-center rounded-md bg-gradient-to-b from-[#2D57FF] to-[#1B3499]"
//                         >
//                             <img src="/send-message.svg" alt="send" />
//                         </button>
//                     </div>
//                 ) : (
//                     <p>Login to chat</p>
//                 )}
//             </footer>
//         </section>
//     );
// }

// interface Props {
//     message: TMessage;
// }

// function LocalMessageBubble({ message }: Props) {
//     return (
//         <div className="flex w-full flex-col items-end rounded-lg">
//             <span className="text-sm text-black">{message.text}</span>
//         </div>
//     );
// }

// export type TPeerMetadata = {
//     displayName: string;
// };

// function RemoteMessageBubble({ message }: Props) {
//     const { metadata } = useRemotePeer<TPeerMetadata>({ peerId: message.sender });

//     return (
//         <div className="flex flex-col items-start">
//             <span className="rounded-t text-blue-300">{metadata?.displayName}</span>
//             <span className="text-sm text-black">{message.text}</span>
//         </div>
//     );
// }

import { useAuthenticationStore } from "@/store/authentication";
import { useDataMessage, useLocalPeer, useRemotePeer } from "@huddle01/react";
import { CircleDollarSign, MessageCircle } from "lucide-react";
import React from "react";

export type TMessage = {
    text: string;
    sender: string;
    displayName?: string;
};

export function Chatroom() {
    const [messages, setMessages] = React.useState<TMessage[]>([]);
    const [text, setText] = React.useState<string>("");

    const user = useAuthenticationStore((state) => state.user?.backendUserData.user.username);

    const MAX_CHATS = 10;

    const { peerId } = useLocalPeer();

    const { sendData } = useDataMessage({
        onMessage: (payload, from, label) => {
            if (label === "chat") {
                try {
                    const { text, displayName } = JSON.parse(payload);
                    setMessages((previous) => {
                        const updated = [...previous, { text, sender: from, displayName }];
                        return updated.length > MAX_CHATS ? updated.slice(-MAX_CHATS) : updated;
                    });
                } catch {
                    // fallback for legacy messages
                    setMessages((previous) => {
                        const updated = [...previous, { text: payload, sender: from }];
                        return updated.length > MAX_CHATS ? updated.slice(-MAX_CHATS) : updated;
                    });
                }
            }
        },
    });

    function sendMessage() {
        if (!text.trim() || !user || !peerId) return;

        const payload = {
            text,
            displayName: user,
        };

        sendData({
            to: "*",
            payload: JSON.stringify(payload),
            label: "chat",
        });

        setText("");
    }

    return (
        <section className="flex flex-1 flex-col overflow-hidden">
            <header className="flex items-center gap-3">
                <aside className="text-blue100 flex items-center gap-1">
                    <span className="font-medium">Chatroom</span>
                    <i className="size-4">
                        <MessageCircle />
                    </i>
                </aside>

                <aside className="flex items-center gap-3">
                    <button className="flex h-6 w-20 items-center justify-center gap-1 rounded bg-gradient-to-b from-[#2D57FF] to-[#1B3499] text-white">
                        <i className="size-4">
                            <CircleDollarSign />
                        </i>
                        <span className="pt-0.5 text-xs">Send tip</span>
                    </button>
                    <button>Trade</button>
                </aside>
            </header>

            <footer className="relative flex flex-1 pb-14">
                <div className="justify-en flex w-full flex-col">
                    <div className="border-blue-400 p-4">
                        {messages.map((message, index) =>
                            message.sender === peerId ? (
                                <LocalMessageBubble key={index} message={message} />
                            ) : (
                                <RemoteMessageBubble key={index} message={message} />
                            ),
                        )}
                    </div>
                </div>

                {user ? (
                    <div className="bg-blue100/90 absolute bottom-0 flex w-full rounded-lg p-2">
                        <input
                            type="text"
                            className="flex-1 bg-transparent p-2 text-sm text-white outline-none"
                            placeholder="Send a message"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                        />
                        <button
                            onClick={sendMessage}
                            className="flex size-10 items-center justify-center rounded-md bg-gradient-to-b from-[#2D57FF] to-[#1B3499]"
                        >
                            <img src="/send-message.svg" alt="send" />
                        </button>
                    </div>
                ) : (
                    <p className="absolute bottom-4 left-4 text-sm text-white">Login to chat</p>
                )}
            </footer>
        </section>
    );
}

interface Props {
    message: TMessage;
}

function LocalMessageBubble({ message }: Props) {
    return (
        <div className="flex w-full flex-col items-end rounded-lg">
            <span className="text-sm text-black">
                @{message.displayName ?? "You"}: {message.text}
            </span>
        </div>
    );
}

export type TPeerMetadata = {
    displayName: string;
};

function RemoteMessageBubble({ message }: Props) {
    const { metadata } = useRemotePeer<TPeerMetadata>({ peerId: message.sender });

    return (
        <div className="flex flex-col items-start">
            <span className="text-sm text-black">
                @{message.displayName ?? metadata?.displayName ?? "Anonymous"}: {message.text}
            </span>
        </div>
    );
}
