import { useDataMessage, useLocalPeer, useRemotePeer } from "@huddle01/react";
import { useRouteContext } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import React from "react";

import { useAuthenticationStore } from "@/store/authentication";
import { TipDrawer } from "@/views/tip-drawer";
import { TradeDrawer } from "@/views/trade-modal";

export type TMessage = {
    text: string;
    sender: string;
    displayName?: string;
};

export function Chatroom() {
    const [messages, setMessages] = React.useState<TMessage[]>([]);
    const [text, setText] = React.useState<string>("");

    const user = useAuthenticationStore((state) => state.user?.backendUserData?.user?.username);
    const isLoggedIn = useAuthenticationStore((state) => state.isAuthenticated);
    const { streamResponse, streamCreator } = useRouteContext({
        from: "/live/$id",
    });

    const streamer = {
        username: streamResponse?.streamer,
        walletAddress: streamResponse?.creatorAddress,
        profilePicture: streamCreator.user.userPfp,
    };

    const { peerId } = useLocalPeer();
    const MAX_CHATS = 10;

    const { sendData } = useDataMessage({
        onMessage: (payload, from, label) => {
            if (label !== "chat") return;

            if (typeof payload !== "string") {
                console.warn("Invalid payload type received:", payload);
                return;
            }

            try {
                const parsed = JSON.parse(payload);
                const { text, displayName } = parsed;

                if (typeof text !== "string") return;

                setMessages((prev) => {
                    const updated = [...prev, { text, sender: from ?? "unknown", displayName }];
                    return updated.length > MAX_CHATS ? updated.slice(-MAX_CHATS) : updated;
                });
            } catch {
                // fallback for legacy messages
                setMessages((prev) => {
                    const updated = [...prev, { text: payload, sender: from ?? "unknown" }];
                    return updated.length > MAX_CHATS ? updated.slice(-MAX_CHATS) : updated;
                });
            }
        },
    });

    const sendMessage = () => {
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
    };

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
                    <TipDrawer streamer={streamer} />
                    <TradeDrawer tokenAddress={streamResponse?.creatorToken} />
                </aside>
            </header>

            <footer className="relative flex flex-1 pb-14">
                <div className="flex w-full flex-col">
                    <div className="border-blue-400 p-4">
                        {messages.map((message, index) => {
                            const isLocal = peerId && message.sender === peerId;
                            return isLocal ? (
                                <LocalMessageBubble key={index} message={message} />
                            ) : (
                                <RemoteMessageBubble key={index} message={message} />
                            );
                        })}
                    </div>
                </div>

                {isLoggedIn ? (
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
                    <div className="bg-blue100/90 absolute bottom-0 flex h-14 w-full items-center justify-center rounded-lg p-2">
                        <p className="text-sm text-white">Login to chat</p>
                    </div>
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
