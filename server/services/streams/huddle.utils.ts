import { AccessToken } from "@huddle01/server-sdk/auth";

import { SERVER_ENV } from "#config/constants.ts";
import { huddleAPI, huddleRecorder } from "#config/huddle.ts";
import { HttpError } from "#middleware/error.ts";

export async function createHuddleRoom(title: string) {
    const { roomId } = await huddleAPI.createRoom({ roomLocked: false, metadata: JSON.stringify({ title }) });
    return roomId;
}

export async function generateHuddleAccessToken({ roomId, role }: { roomId: string; role: string }) {
    let permissions;

    if (role === "host" || role === "bot") {
        permissions = {
            admin: true,
            canConsume: true,
            canProduce: true,
            canProduceSources: { cam: true, mic: true, screen: true },
            canRecvData: true,
            canSendData: true,
            canUpdateMetadata: true,
        };
    } else if (role === "guest") {
        permissions = {
            admin: false,
            canConsume: true,
            canProduce: true,
            canProduceSources: { cam: true, mic: true, screen: true },
            canSendData: true,
            canRecvData: true,
            canUpdateMetadata: false,
        };
    } else {
        permissions = {
            admin: false,
            canConsume: true,
            canProduce: false,
            canProduceSources: { cam: false, mic: false, screen: false },
            canSendData: true,
            canRecvData: true,
            canUpdateMetadata: false,
        };
    }

    return await new AccessToken({ apiKey: SERVER_ENV.HUDDLE_API_KEY, permissions, role, roomId }).toJwt();
}

export async function startHuddleStream({
    rtmpUrls,
    roomId,
    token,
}: {
    rtmpUrls: Array<string>;
    roomId: string;
    token: string;
}) {
    try {
        await huddleRecorder.startLivestream({ roomId, token, rtmpUrls });
    } catch (error) {
        throw new HttpError({
            message: "Failed to start stream",
            code: 500,
            data: { error: (error as Error).message },
        });
    }
}
