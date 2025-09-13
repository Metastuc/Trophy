import { Send } from "lucide-react";

import { useAuthenticationStore } from "#~/store/authentication.ts";
import { useSocket } from "@/hooks/socket";
import { AuthenticationDrawer } from "@/views/authentication-drawer";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useLiveStreamContext } from "../hooks";

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
    const [chatContents, setChatContents] = useState<LiveStreamChatMessagesState[]>([]);

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
        <section className="relative flex-1 border-2 border-red-600 px-4">
            <header></header>

            <main>
                {chatContents.map((value, index) => (
                    <ChatBubble key={index} {...value} />
                ))}
            </main>

            <footer className="flex items-center justify-center">
                {isAuthenticated ? (
                    <div className="bg-blue100/90 absolute -bottom-15.75 flex w-11/12 rounded-lg p-2">
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
                            <button className="bg-blue100/90 absolute -bottom-15.75 flex h-14 w-11/12 items-center justify-center rounded-lg p-2">
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
        <article>
            <div>pfp</div> <span>@{user.username}</span>: <span>message</span>
        </article>
    );
}
