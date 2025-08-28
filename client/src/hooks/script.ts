import { useEffect, useState } from "react";

type tScriptStatus = "loading" | "idle" | "ready" | "error";

interface iUseCustomScriptLoader {
    attributes?: Record<string, string>;
    src: string;
}

/**
 * Custom hook to load a script with additional attributes.
 * @param {iUseCustomScriptLoader} options - The options for the custom script loader.
 * @returns {tScriptStatus} - The status of the script.
 */
export function useCustomScriptLoader({ attributes, src }: iUseCustomScriptLoader): tScriptStatus {
    const [status, setStatus] = useState<tScriptStatus>(src ? "loading" : "idle");

    useEffect(
        function () {
            if (!src) {
                setStatus("idle");
                return;
            }

            let script: HTMLScriptElement | null = document.querySelector(`script[src="${src}"]`);

            if (!script) {
                script = document.createElement("script");
                script.src = src;
                script.async = true;
                script.setAttribute("data-status", "loading");

                /**
                 * add attributes to the script
                 */
                if (attributes) {
                    Object.entries(attributes).forEach(([key, value]) => {
                        script?.setAttribute(key, value);
                    });
                }

                document.head.appendChild(script);

                /**
                 * event listeners
                 */
                script.onload = function () {
                    script?.setAttribute("data-status", "ready");
                    setStatus("ready");
                };

                script.onerror = function () {
                    script?.setAttribute("data-status", "error");
                    setStatus("error");
                };
            } else {
                /**
                 * update status if the script is already loaded
                 */
                setStatus((script.getAttribute("data-status") as tScriptStatus) || "loading");
            }

            /**
             * return cleanup function to remove the script from the DOM
             */
            return function () {
                if (script && document.head.contains(script)) {
                    document.head.removeChild(script);
                }
            };
        },
        [attributes, src],
    );

    return status;
}
