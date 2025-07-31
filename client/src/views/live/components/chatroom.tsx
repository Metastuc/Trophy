import { useDataMessage, useLocalPeer, useRemotePeer } from "@huddle01/react";
import { CircleDollarSign, MessageCircle } from "lucide-react";
import React from "react";

export type TMessage = {
    text: string;
    sender: string;
};

export function Chatroom() {
    const [messages, setMessages] = React.useState<TMessage[]>([]);
    const [text, setText] = React.useState<string>("");

    const { peerId } = useLocalPeer();
    const { sendData } = useDataMessage({
        onMessage: (payload, from, label) => {
            if (label === "chat") {
                setMessages((previous) => [...previous, { text: payload, sender: from }]);
            }
        },
    });

    function sendMessage() {
        sendData({
            to: "*",
            payload: text,
            label: "chat",
        });
        setText("");
    }

    return (
        <section className="flex flex-1 flex-col border border-green-600">
            <header className="flex items-center gap-3">
                <aside className="text-blue100 flex items-center gap-1">
                    <span className="font-medium">Chatroom</span>
                    <i className="size-4">
                        <MessageCircle />
                    </i>
                </aside>

                <aside className="flex items-center gap-3">
                    <button className="flex h-6 w-20 items-center justify-center rounded bg-gradient-to-b from-[#2D57FF] to-[#1B3499] text-white gap-1">
                        <i className="size-4">
                            <CircleDollarSign />
                        </i>
                        <span className="text-xs pt-0.5">Send tip</span>
                    </button>

                    <button>Trade</button>
                </aside>
            </header>

            <footer className="relative flex-1">
                <div className="flex flex-col rounded-lg border-2 border-blue-400">
                    <div className="flex-1 border-b border-blue-400 p-4">
                        {messages.map((message, index) =>
                            message.sender === peerId ? (
                                <LocalMessageBubble key={index} message={message} />
                            ) : (
                                <RemoteMessageBubble key={index} message={message} />
                            ),
                        )}
                    </div>
                </div>

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
            <span className="text-sm text-white">{message.text}</span>
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
            <span className="rounded-t text-blue-300">{metadata?.displayName}</span>
            <span className="text-sm text-white">{message.text}</span>
        </div>
    );
}
