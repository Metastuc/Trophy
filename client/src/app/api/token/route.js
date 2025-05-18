import { AccessToken, Role } from "@huddle01/server-sdk/auth";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");

    if (!roomId) return new Response("Missing roomId", { status: 400 });

    const accessToken = new AccessToken({
        apiKey: process.env.API_KEY,
        roomId,
        role: Role.HOST,
        permissions: { admin: true, canConsume: true, canProduce: true },
    });

    const token = await accessToken.toJwt();
    return new Response(token, { status: 200 });
}
