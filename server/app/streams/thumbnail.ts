import { NextFunction, Request, Response } from "express";

import { FILE_SIZE_LIMITS, SUPPORTED_FILE_CONTENT_TYPES } from "#~/store/file-limits.ts";
import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";
import { saveToS3 } from "#services/s3/save.ts";

export async function updateThumbnail(request: Request, response: Response, next: NextFunction) {
    const { id: roomId } = request.params;
    const thumbnail = request.file?.buffer;
    const fileName = request.file?.originalname;
    const contentType = request.file?.mimetype as (typeof SUPPORTED_FILE_CONTENT_TYPES)[number];

    try {
        if (!thumbnail) return next(new HttpError({ message: "Thumbnail is required", code: 422 }));
        if (!roomId) return next(new HttpError({ message: "Room ID is required", code: 422 }));
        if (!fileName) return next(new HttpError({ message: "Invalid file name", code: 422 }));
        if (!contentType) return next(new HttpError({ message: "Invalid content type", code: 422 }));

        const stream = await prisma.stream.findUnique({
            where: { roomId, status: "LIVE" },
            include: { streamer: true },
        });

        if (!stream) return next(new HttpError({ message: "Stream not found", code: 404 }));
        if (stream.status !== "LIVE") return next(new HttpError({ message: "Stream is not live", code: 403 }));

        if (stream.streamer.privyId !== request.privyUser?.userId)
            return next(new HttpError({ message: "Unauthorized to update thumbnail", code: 403 }));

        const thumbnailUrl = await saveToS3({
            file: thumbnail,
            fileName,
            folder: "streamThumbnails",
            contentType,
            maxSize: FILE_SIZE_LIMITS.streamThumbnail,
            overwriteKey: `streamThumbnails/${roomId}.jpg`,
            resize: { width: 1280, height: 720 },
        });

        await prisma.stream.update({
            where: { roomId },
            data: {
                thumbnail: `${thumbnailUrl}?v=${Date.now()}`,
            },
        });

        response.customResponse<undefined>({ code: 200, message: "Thumbnail updated successfully", data: undefined });
    } catch (error) {
        next(error);
    }
}
