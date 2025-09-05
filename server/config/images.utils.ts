import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { v4 as uuid } from "uuid";

import { SERVER_ENV } from "./constants";
import { getS3Client } from "./s3";

export async function saveProfileImage({ file, name }: { file: Buffer; name: string }) {
    const image = sharp(file);
    const key = `profile-pics/${uuid()}-${name}`;

    let quality = 80;
    let compressedBuffer = await image.jpeg({ quality }).toBuffer();

    while (compressedBuffer.length > 1024 * 1024 && quality > 10) {
        quality -= 10;
        compressedBuffer = await image.jpeg({ quality }).toBuffer();
    }

    await getS3Client().send(
        new PutObjectCommand({
            ACL: "public-read",
            Body: compressedBuffer,
            Bucket: SERVER_ENV.AWS_S3_BUCKET,
            ContentType: "image/jpeg",
            Key: key,
        }),
    );

    return `https://${SERVER_ENV.AWS_S3_BUCKET}.s3.${SERVER_ENV.AWS_REGION}.amazonaws.com/${key}`;
}
