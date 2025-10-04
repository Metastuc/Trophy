import { DeleteObjectCommand } from "@aws-sdk/client-s3";

import { SERVER_ENV } from "#config/constants.ts";
import { getS3Client } from "#config/s3.ts";

export async function deleteFromS3(keyOrUrl: string): Promise<boolean> {
    const key = keyOrUrl.includes(SERVER_ENV.AWS_S3_BUCKET)
        ? keyOrUrl.split(`${SERVER_ENV.AWS_S3_BUCKET}/`)[1]
        : keyOrUrl;

    if (!key) throw new Error("Invalid S3 key or URL provided");

    await getS3Client().send(new DeleteObjectCommand({ Bucket: SERVER_ENV.AWS_S3_BUCKET, Key: key }));
    return true;
}
