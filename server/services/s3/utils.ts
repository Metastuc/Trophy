import { SERVER_ENV } from "#config/constants.ts";

export function buildS3Url(key: string): string {
    return `https://${SERVER_ENV.AWS_S3_BUCKET}.s3.${SERVER_ENV.AWS_REGION}.amazonaws.com/${key}`;
}
