import { SUPPORTED_FILE_CONTENT_TYPES } from "#~/store/file-limits.ts";

declare global {
    interface BaseS3Params {
        file: Buffer;
        fileName: string;
        folder: string;
        contentType?: (typeof SUPPORTED_FILE_CONTENT_TYPES)[number];
        maxSize?: number;
        resize?: { width: number; height: number };
    }

    interface SaveToS3Params extends BaseS3Params {
        overwriteKey?: string;
    }

    interface ReplaceInS3Params extends BaseS3Params {
        oldKeyOrUrl: string;
    }
}

export {};
