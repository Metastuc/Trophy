import { S3Client } from "@aws-sdk/client-s3";

import { SERVER_ENV } from "./constants";

let s3 = null as S3Client | null;

export function getS3Client() {
    if (!s3) {
        s3 = new S3Client({
            credentials: {
                accessKeyId: SERVER_ENV.AWS_ACCESS_KEY_ID,
                secretAccessKey: SERVER_ENV.AWS_SECRET_ACCESS_KEY,
            },
            region: SERVER_ENV.AWS_REGION,
        });
    }

    return s3;
}
