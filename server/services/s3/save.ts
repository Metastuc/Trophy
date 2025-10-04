import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { v7 as uuid } from "uuid";

import { SUPPORTED_FILE_CONTENT_TYPES } from "#~/store/file-limits.ts";
import { toSize } from "#~/utils/size.ts";
import { SERVER_ENV } from "#config/constants.ts";
import { getS3Client } from "#config/s3.ts";

import { buildS3Url } from "./utils";

interface SaveToS3Params {
    file: Buffer;
    fileName: string;
    folder: string;
    contentType?: (typeof SUPPORTED_FILE_CONTENT_TYPES)[number];
    maxSize?: number;
    resize?: { width: number; height: number };
}

export async function saveToS3({
    file,
    fileName,
    folder,
    contentType = "image/jpeg",
    maxSize = toSize({ unit: "megabytes", value: 1 }),
    resize,
}: SaveToS3Params): Promise<string> {
    const image = sharp(file);
    const key = `${folder}/${uuid()}-${fileName}`;

    if (resize) image.resize(resize.width, resize.height);

    let quality = 80;
    let buffer = await image.jpeg({ quality }).toBuffer();

    while (buffer.length > maxSize && quality > 10) {
        quality -= 10;
        buffer = await image.jpeg({ quality }).toBuffer();
    }

    await getS3Client().send(
        new PutObjectCommand({
            ACL: "public-read",
            Body: buffer,
            Bucket: SERVER_ENV.AWS_S3_BUCKET,
            ContentType: contentType,
            Key: key,
        }),
    );

    return buildS3Url(key);
}
