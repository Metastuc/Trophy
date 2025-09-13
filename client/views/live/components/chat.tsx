import { MessageCircle, Send } from "lucide-react";

import { useAuthenticationStore } from "#~/store/authentication.ts";
import { useSocket } from "@/hooks/socket";
import { cn } from "@/lib/utils";
import { AuthenticationDrawer } from "@/views/authentication-drawer";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useLiveStreamContext } from "../hooks";
import { LiveStreamProfile } from "./profile";

export function LiveStreamChats() {
    const { roomId } = useLiveStreamContext();
    const { isAuthenticated, profileImage, username } = useAuthenticationStore(
        useShallow((state) => ({
            profileImage: state.user?.backendUserData.user.profilePicture as string,
            username: state.user?.backendUserData.user.username as string,
            isAuthenticated: state.isAuthenticated,
        })),
    );

    const socket = useSocket();
    const [text, setText] = useState<string>("");
    const [chatContents, setChatContents] = useState<Array<LiveStreamChatMessagesState>>([]);

    function sendMessage() {
        if (!text.trim()) return;

        const payload: LiveStreamChatMessagesState = {
            message: text,
            type: "chat",
            user: {
                profileImage,
                username,
            },
        };

        socket.emit("chat.send.text", { roomId, payload });
        setText("");
    }

    useEffect(
        function () {
            function handleChatReceiveText(data: { roomId: string; payload: LiveStreamChatMessagesState }) {
                if (data.roomId !== roomId) return;

                console.log("Received chat message:", data.payload);

                setChatContents((state) => [...state, data.payload]);
            }

            function handleChatReceiveTip(data: { roomId: string }) {
                if (data.roomId !== roomId) return;
            }

            socket.on("chat.receive.text", handleChatReceiveText);
            socket.on("chat.receive.tip", handleChatReceiveTip);

            return function () {
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

                {/* <TipDrawer
                    trigger={
                        <button className="flex items-center gap-1 rounded-xs bg-gradient-to-b from-[#2D57FF] to-[#1B3499] px-2 py-1 text-white">
                            <i className="size-3">
                                <CircleDollarSign />
                            </i>

                            <span className="text-sm">Send tip</span>
                        </button>
                    }
                /> */}

                {/* <TradeDrawer /> */}
            </header>

            <main className="relative flex-1 space-y-3.5 overflow-y-scroll">
                {chatContents.map((value, index) => (
                    <ChatBubble key={index} {...value} />
                ))}

                {/* <span className="absolute top-0 flex h-4 w-full bg-gradient-to-t from-transparent to-white" /> */}
            </main>

            <footer className="flex items-center justify-center">
                {isAuthenticated ? (
                    <div className="bg-blue100/90 absolute -bottom-14.75 flex w-11/12 rounded-lg p-2">
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
                type === "tip" && "bg-gradient-to-r from-[#2D57FF] to-[#1B3499] p-2 rounded-xs text-white",
            )}
        >
            <LiveStreamProfile
                imgSrc={user.profileImage}
                username={user.username}
                styles={{ imageContainer: "size-7", imageWrapper: "size-6" }}
                isInvitation={type === "tip"}
            />
            : <span className="ml-1">{message}</span>
        </article>
    );
}
