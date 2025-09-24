import * as flaunch from "@flaunch/sdk";
import { AccessToken, Role, ROLE_PERMISSIONS } from "@huddle01/server-sdk/auth";
import { Address } from "viem";

import { log } from "#~/utils/logger.ts";
import { SERVER_ENV } from "#config/constants.ts";
import { huddleAPI, huddleRecorder } from "#config/huddle.ts";
import { client } from "#config/viem.ts";
import { HttpError } from "#middleware/error.ts";

export function isGuest(username: string): boolean {
    return /^[0-9a-fA-F-]{8}-[0-9a-fA-F-]{4}-[0-9a-fA-F-]{4}-[0-9a-fA-F-]{4}-[0-9a-fA-F-]{12}$/.test(username);
}

export async function createHuddleRoom(title: string) {
    const { roomId } = await huddleAPI.createRoom({ roomLocked: false, metadata: JSON.stringify({ title }) });
    return roomId;
}

export async function generateHuddleAccessToken({ roomId, role }: { roomId: string; role: Role }) {
    let permissions: (typeof ROLE_PERMISSIONS)[Role];

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

export async function getCreatorTokenDetails(address: Address) {
    const flaunchClient = flaunch.createFlaunch({ publicClient: client }) as flaunch.ReadFlaunchSDK;
    const { symbol, name, image } = await flaunchClient.getCoinMetadata("0xB28EbB68056D066fb23dc244d943f9712094bB51");

    log({ tag: "info", msg: "Fetched token metadata", data: { symbol, name, image }, module: "FLAUNCH" });

    const marketCap = await flaunchClient.coinMarketCapInUSD({
        coinAddress: "0xB28EbB68056D066fb23dc244d943f9712094bB51",
        version: "V1_1_1",
    });
    const price = await flaunchClient.coinPriceInUSD({ coinAddress: address });

    return { marketCap: marketCap.toString(), price: price.toString() };
}
