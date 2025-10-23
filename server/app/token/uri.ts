import { NextFunction, Request, Response } from "express";

import { getPinataClient } from "#config/pinata.ts";
import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";

export async function createTokenUri(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;

    try {
        const user = await prisma.user.findUnique({ where: { username: userId } });
        if (!user) return next(new HttpError({ message: "User not found", code: 404, data: { userId } }));

        const { cid: imageCID } = await getPinataClient().upload.public.url(user.profileImage);
        const { cid: tokenCID } = await getPinataClient().upload.public.json({
            description: `${user.username}'s creator token on Trophy`,
            image: `ipfs://${imageCID}`,
            name: user.username,
            symbol: user.username.toUpperCase(),
        });

        response.customResponse<CreateTokenUriData>({
            code: 200,
            data: {
                tokenUri: `ipfs://${tokenCID}`,
            },
        });
    } catch (error) {
        next(error);
    }
}
