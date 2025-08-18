import html2canvas from "html2canvas-pro";
import { useEffect, useRef } from "react";

import { makeRequest } from "@/lib/axios";

import { useStreamingUIContext, useStreamingUIRoles } from "../hooks";

export function StreamThumbnailCapture() {
    const { roomId } = useStreamingUIContext();
    const { host } = useStreamingUIRoles();

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(
        function () {
            if (!host) return;

            const element = document.querySelector("#stream-layout") as HTMLElement;
            if (!element) return;

            intervalRef.current = setInterval(async function () {
                const canvas = await html2canvas(element, { useCORS: true, backgroundColor: null });

                canvas.toBlob(async function (blob) {
                    if (!blob) return;

                    const formData = new FormData();
                    formData.append("thumbnail", blob, `frame-${Date.now()}.jpg`);
                    formData.append("roomId", roomId);

                    await makeRequest({ method: "POST", url: "/save-thumbnail", data: formData });
                });
            }, 60000);

            return function () {
                if (intervalRef.current) clearInterval(intervalRef.current);
            };
        },
        [host, roomId],
    );

    return null;
}
