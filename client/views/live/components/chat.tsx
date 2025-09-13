import { Send } from "lucide-react";

import { useAuthenticationStore } from "#~/store/authentication.ts";

export function LiveStreamChats() {
    const isLoggedIn = useAuthenticationStore((state) => state.isAuthenticated);

    return (
        <section className="relative flex-1 border-2 border-red-600">
            <header></header>
            <main></main>
            <footer>
                {isLoggedIn ? (
                    <div className="bg-blue100/90 absolute -bottom-15.75 flex w-full rounded-lg p-2">
                        <input
                            type="text"
                            className="flex-1 bg-transparent p-2 text-sm text-white outline-none"
                            placeholder="Send a message"
                            // value={text}
                            // onChange={(event) => setText(event.target.value)}
                            // onKeyDown={(event) => {
                            //     if (event.key === "Enter") {
                            //         sendMessage();
                            //     }
                            // }}
                        />
                        <button
                            // onClick={sendMessage}
                            className="flex size-10 items-center justify-center rounded-md bg-gradient-to-b from-[#2D57FF] to-[#1B3499] text-white"
                        >
                            {/* <img src="/send-message.svg" alt="send" /> */}
                            <Send />
                        </button>
                    </div>
                ) : (
                    <div className="bg-blue100/90 absolute -bottom-15.75 flex h-14 w-full items-center justify-center rounded-lg p-2">
                        <p className="text-sm text-white">Login to chat</p>
                    </div>
                )}
            </footer>
        </section>
    );
}
