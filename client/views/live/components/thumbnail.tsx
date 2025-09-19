import html2canvas from "html2canvas-pro";
import { useEffect, useRef } from "react";

import { API_ENDPOINTS } from "@/lib/constants";
import { makeRequest } from "#~/utils/axios.ts";
import { toTime } from "#~/utils/time.ts";

import { useLiveStreamContext, useLiveStreamRoles } from "../hooks";

export function LiveStreamThumbnail() {
    const { roomId } = useLiveStreamContext();
    const { host } = useLiveStreamRoles();

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(
        function () {
            if (!host) return;

            const element = document.querySelector("#live-stream-layout") as HTMLElement;
            if (!element) return;

            intervalRef.current = setInterval(
                async function () {
                    const canvas = await html2canvas(element, { useCORS: true, backgroundColor: null });

                    canvas.toBlob(async function (blob) {
                        if (!blob) return;

                        const formData = new FormData();
                        formData.append("thumbnail", blob, `thumbnail-${roomId}.jpg`);
                        formData.append("roomId", roomId);

                        await makeRequest({ method: "POST", url: API_ENDPOINTS.STREAMS.THUMBNAIL, data: formData });
                    });
                },
                toTime({ unit: "seconds", value: 60 }),
            );
        },
        [host, roomId],
    );

    return null;
}
