import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { v4 as uuid } from "uuid";

import { SERVER_ENV } from "#config/constants.ts";
import { getS3Client } from "#config/s3.ts";

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

export function validateUsername({ username, fc }: { username: string; fc: boolean }): string {
    if (!username) throw { status: 422, message: "username is required" };

    const formatRegex = /[ _-]/g;
    const hasNonAcceptableChars = formatRegex.test(username);

    if (String(fc) !== "false") return username.replace(formatRegex, "");
    if (hasNonAcceptableChars) throw { status: 400, message: "username cannot have spaces, underscores or space" };

    return username;
}

export async function getUserProfilePicture({
    profilePicture,
    fileBuffer,
    fileName,
}: {
    profilePicture: string;
    fileBuffer?: Buffer;
    fileName?: string;
}): Promise<string | undefined> {
    if (fileBuffer && fileName) return await saveProfileImage({ file: fileBuffer, name: fileName });
    if (profilePicture && profilePicture !== "default-pfp.svg") return profilePicture;
    return undefined;
}
