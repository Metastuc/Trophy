import { CircleDollarSign, MessageCircle, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Address } from "viem";
import { useShallow } from "zustand/shallow";

import { useAuthenticationStore } from "@/hooks/authentication";
import { useSocket } from "@/hooks/socket";
import { cn } from "@/lib/utils";
import { AuthenticationDrawer } from "@/views/authentication-drawer";
import { TipDrawer } from "@/views/tip-token-drawer";
import { TradeDrawer } from "@/views/trade-token-drawer";

import { useLiveStreamContext } from "../hooks";
import { LiveStreamProfile } from "./profile";

export function LiveStreamChats() {
    const { roomId, creatorProfileImage, creatorUsername, creatorWalletAddress, creatorToken } = useLiveStreamContext();
    const { isAuthenticated, profileImage, username } = useAuthenticationStore(
        useShallow((state) => ({
            profileImage: state.user?.backendUserData.user.profilePicture as string,
            username: state.user?.backendUserData.user.username as string,
            isAuthenticated: state.isAuthenticated,
        })),
    );

    const socket = useSocket();
    const messagesEndRef = useRef<HTMLElement>(null);
    const mainContainerRef = useRef<HTMLElement>(null);

    const [liveStreamChatRoomState, setLiveStreamChatRoomState] = useState<LiveStreamChatRoomState>(() => ({
        chatContents: [],
        mainContainerHeight: 0,
        text: "",
    }));

    function sendMessage() {
        if (!liveStreamChatRoomState.text.trim()) return;

        const payload: LiveStreamChatMessagesState = {
            message: liveStreamChatRoomState.text,
            type: "chat",
            user: { profileImage, username },
        };

        socket.emit("chat.send.text", { roomId, payload });
        setLiveStreamChatRoomState((state) => ({ ...state, text: "" }));
    }

    useEffect(
        function () {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        },
        [liveStreamChatRoomState.chatContents],
    );

    useEffect(function () {
        if (!mainContainerRef.current) return;
        const observer = new ResizeObserver(function ([entry]) {
            setLiveStreamChatRoomState((state) => ({
                ...state,
                mainContainerHeight: entry.contentRect.height,
            }));
        });
        observer.observe(mainContainerRef.current);

        return function () {
            observer.disconnect();
        };
    }, []);

    useEffect(
        function () {
            socket.emit("chat.history", { roomId });

            function handleChatHistory(data: { roomId: string; messages: Array<LiveStreamChatMessagesState> }) {
                if (data.roomId !== roomId) return;
                setLiveStreamChatRoomState((state) => ({
                    ...state,
                    chatContents: data.messages,
                }));
            }

            function handleChatReceiveText(data: { roomId: string; payload: LiveStreamChatMessagesState }) {
                if (data.roomId !== roomId) return;
                setLiveStreamChatRoomState((state) => ({
                    ...state,
                    chatContents: [...state.chatContents, data.payload],
                }));
            }

            function handleChatReceiveTip(data: { roomId: string; payload: LiveStreamChatMessagesState }) {
                if (data.roomId !== roomId) return;
                setLiveStreamChatRoomState((state) => ({
                    ...state,
                    chatContents: [...state.chatContents, data.payload],
                }));
            }

            socket.on("chat.history", handleChatHistory);
            socket.on("chat.receive.text", handleChatReceiveText);
            socket.on("chat.receive.tip", handleChatReceiveTip);

            return function () {
                socket.off("chat.history", handleChatHistory);
                socket.off("chat.receive.text", handleChatReceiveText);
                socket.off("chat.receive.tip", handleChatReceiveTip);
            };
        },
        [socket, roomId],
    );

    return (
        <section className="relative flex flex-1 flex-col px-4">
            <header className="flex items-center justify-start gap-3 py-2">
                <div className="text-blue100 flex items-center gap-1 ">
                    <span className="text-base">Chatroom</span>
                    <i className="size-4">
                        <MessageCircle />
                    </i>
                </div>

                <TipDrawer
                    trigger={
                        <button className="flex items-center gap-1 rounded-xs bg-gradient-to-b from-[#2D57FF] to-[#1B3499] px-2 py-1 text-white">
                            <i className="size-3">
                                <CircleDollarSign />
                            </i>

                            <span className="text-sm">Send tip</span>
                        </button>
                    }
                    streamer={{
                        profilePicture: creatorProfileImage,
                        username: creatorUsername,
                        walletAddress: creatorWalletAddress as Address,
                    }}
                />

                {creatorToken ? (
                    <TradeDrawer
                        streamer={{
                            tokenAddress: creatorToken as Address,
                            profilePicture: creatorProfileImage,
                            username: creatorUsername,
                        }}
                    />
                ) : null}
            </header>

            <main className="relative flex-1 overflow-hidden scroll-smooth" ref={mainContainerRef}>
                <div
                    className="space-y-3 overflow-auto"
                    style={{ maxHeight: liveStreamChatRoomState.mainContainerHeight }}
                >
                    {liveStreamChatRoomState.chatContents.map((value, index) => (
                        <ChatBubble key={index} {...value} />
                    ))}

                    {/* <span className="absolute -top-1.25 flex h-5 w-full bg-gradient-to-t from-transparent to-white" /> */}
                    <span ref={messagesEndRef} />
                </div>
            </main>

            <footer className="flex items-center justify-center">
                {isAuthenticated ? (
                    <div className="bg-blue100/90 absolute -bottom-14.75 flex w-11/12 rounded-lg p-2">
                        <input
                            type="text"
                            className="flex-1 bg-transparent p-2 text-sm text-white outline-none"
                            placeholder="Send a message"
                            value={liveStreamChatRoomState.text}
                            onChange={(event) =>
                                setLiveStreamChatRoomState((state) => ({ ...state, text: event.target.value }))
                            }
                            onKeyDown={(event) => {
                                if (event.key === "Enter") sendMessage();
                            }}
                        />

                        <button
                            onClick={sendMessage}
                            className="flex size-10 items-center justify-center rounded-md bg-gradient-to-b from-[#2D57FF] to-[#1B3499] text-white"
                        >
                            <Send />
                        </button>
                    </div>
                ) : (
                    <AuthenticationDrawer
                        trigger={
                            <button className="bg-blue100/90 absolute -bottom-14.75 flex h-14 w-11/12 items-center justify-center rounded-lg p-2">
                                <p className="text-sm text-white">Login to chat</p>
                            </button>
                        }
                    />
                )}
            </footer>
        </section>
    );
}

function ChatBubble({ message, type = "chat", user }: LiveStreamChatMessagesState) {
    return (
        <article
            className={cn(
                "flex items-center px-2",
                type === "tip" && "rounded-xs bg-gradient-to-r from-[#2D57FF] to-[#1B3499] p-2 text-white",
            )}
        >
            <LiveStreamProfile
                imgSrc={user.profileImage || undefined}
                username={user.username}
                styles={{ imageContainer: "size-7", imageWrapper: "size-6" }}
                isInvitation={type === "tip"}
            />
            : <span className="ml-1">{message}</span>
        </article>
    );
}
